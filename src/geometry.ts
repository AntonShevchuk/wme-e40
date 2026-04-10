/**
 * Creates a GeoJSON Polygon representing a circle centered at a given point
 * with a radius calculated from a desired area in square meters.
 *
 * @param {object} centerPoint - A GeoJSON Point feature (e.g., turf.point([lon, lat])).
 * @param {number} areaSqMeters - The desired area of the circle in square meters (m²).
 * @param {number} [steps=64] - The number of steps/segments to create the circle (higher = smoother).
 * @returns {object} A GeoJSON Polygon Feature representing the circle.
 */
export function createCirclePolygon(centerPoint: any, areaSqMeters: number, steps = 64) {
  if (centerPoint.type !== 'Point') {
    throw new Error('Invalid centerPoint: Must be a GeoJSON Point feature.');
  }
  if (typeof areaSqMeters !== 'number' || areaSqMeters <= 0) {
    throw new Error('Invalid areaSqMeters: Must be a positive number.');
  }

  // 1. Calculate the required radius (R) from the Area (A)
  // The formula for the area of a circle is: A = π * R²
  // Rearranging for the radius: R = sqrt(A / π)
  const radiusMeters = Math.sqrt(areaSqMeters / Math.PI);

  // 2. Convert the radius from meters to kilometers (Turf.js default unit)
  const radiusKilometers = radiusMeters / 1000;

  // 3. Use turf.circle to create the polygon
  return turf.circle(centerPoint, radiusKilometers, {
    steps: steps,
    units: 'kilometers' // Explicitly set units, though it's the default
  });
}

/**
 * Creates a GeoJSON Polygon representing a square centered at a given point
 * with a side length calculated from a desired area in square meters.
 *
 * @param {object} centerPoint - A GeoJSON Point feature (e.g., turf.point([lon, lat])).
 * @param {number} areaSqMeters - The desired area of the square in square meters (m²).
 * @returns {object} A GeoJSON Polygon Feature representing the square.
 */
export function createSquarePolygon(centerPoint: any, areaSqMeters: number) {
  if (centerPoint.type !== 'Point') {
    throw new Error('Invalid centerPoint: Must be a GeoJSON Point feature.');
  }
  if (typeof areaSqMeters !== 'number' || areaSqMeters <= 0) {
    throw new Error('Invalid areaSqMeters: Must be a positive number.');
  }

  // 1. Calculate the required Side Length (S) from the Area (A)
  // The formula for the area of a square is: A = S²
  // Rearranging for the side length: S = sqrt(A)
  const sideLengthMeters = Math.sqrt(areaSqMeters);

  // 2. Calculate the distance from the center to any edge of the square
  // This is half the side length: HalfSide = S / 2
  const halfSideMeters = sideLengthMeters / 2;

  // 3. Since Turf.js typically handles distances in kilometers, convert the half-side.
  const halfSideKilometers = halfSideMeters / 1000;

  // 4. Calculate the bounding box (bbox) coordinates
  // We can use a combination of `turf/destination` or, more simply for a centered square,
  // manually calculate the offsets using Turf's distance handling for min/max coordinates.
  // However, a simpler approach is to calculate the bounding box for the square's corners.

  // A centered square's extent is defined by its center coordinates +/- (half-side in distance units).
  // The `turf/bbox` function is often used to get the extent of a feature, but here we need
  // to calculate the BBOX based on a distance from the center point.

  // Calculate the geographic bounding box [west, south, east, north]
  // Due to the complexities of Earth's curvature, calculating precise coordinates
  // by simply adding/subtracting distances (especially for large squares) is difficult.
  // A robust, though slightly over-engineered, way is to use the `turf/buffer` function
  // to approximate the square's corners.

  // A simpler approach for small, localized areas is to calculate the min/max coordinates
  // by using the `turf/transformScale` on a unit square. However, this is more complex.

  // A common and practical approximation for *small* areas:
  // const [lon, lat] = centerPoint.coordinates;

  // For simplicity, we'll use an approximation based on latitude/longitude differences.
  // WARNING: This approximation is only accurate for very small areas or near the equator.
  // For a highly accurate square, you would use geodesic distance functions (like turf/destination)
  // to find the four corners based on the center point and the half-side distance.

  // --- Robust Geodesic Calculation for the Four Corners ---
  const options = { units: 'kilometers' };

  // 45 degrees: Northeast, 135 degrees: Northwest, 225 degrees: Southwest, 315 degrees: Southeast
  const cornerNE = turf.destination(centerPoint, halfSideKilometers * Math.SQRT2, 45, options);
  const cornerSW = turf.destination(centerPoint, halfSideKilometers * Math.SQRT2, 225, options);

  const minLon = cornerSW.geometry.coordinates[0];
  const minLat = cornerSW.geometry.coordinates[1];
  const maxLon = cornerNE.geometry.coordinates[0];
  const maxLat = cornerNE.geometry.coordinates[1];

  // The BBOX format is [minX, minY, maxX, maxY] => [west, south, east, north]
  const calculatedBbox = [minLon, minLat, maxLon, maxLat];

  // 5. Use turf.bboxPolygon to create the square polygon from the bounding box
  return turf.bboxPolygon(calculatedBbox);
}

/**
 * Iteratively simplifies a GeoJSON Polygon ring by removing points that form
 * an angle between 175° and 180° with their neighbors.
 * @param {object} geojsonObject A GeoJSON Feature<Polygon> or Polygon geometry object.
 * @returns {object} The simplified GeoJSON Polygon geometry object (type: "Polygon").
 */
export function simplifyPolygon(geojsonObject: any) {
  let points = geojsonObject.coordinates[0].slice()
  const MIN_UNIQUE_POINTS = 4; // A, B, C, A (length 4) means 3 unique points (a triangle)
  const MIN_ANGLE = 175.0;
  const MAX_ANGLE = 185.0;
  let pointsRemoved = 0;
  let iteration = 0;

  console.log("--- Starting Polygon Simplification (175° to 185° removal) ---");

  while (points.length > MIN_UNIQUE_POINTS) {
    iteration++;
    let pointIndexToRemove = -1;

    // Check points from index 1 up to length - 2.
    for (let i = 1; i < points.length - 1; i++) {
      const angle = GeoUtils.findAngle(points[i - 1], points[i], points[i + 1]);

      if (angle >= MIN_ANGLE && angle <= MAX_ANGLE) {
        pointIndexToRemove = i;
        console.log(`[Iter ${iteration}] Found point to remove at index ${i} (${points[i].map((c: number) => c.toFixed(2)).join(', ')}). Angle: ${angle.toFixed(4)}°`);
        break; // Remove only one point per iteration
      }
    }

    if (pointIndexToRemove !== -1) {
      points.splice(pointIndexToRemove, 1);
      pointsRemoved++;

      // Update the closure point
      points[points.length - 1] = points[0];
      console.log(`[Iter ${iteration}] Point removed. New length: ${points.length}. Unique points remaining: ${points.length - 1}.`);
    } else {
      console.log(`[Iter ${iteration}] No point found in the angle range [${MIN_ANGLE}°, ${MAX_ANGLE}°]. Stopping.`);
      break;
    }
  }

  if (points.length <= MIN_UNIQUE_POINTS) {
    console.log(`Reached minimum size of 3 unique points (array length ${points.length}). Stopping.`);
  }

  console.log(`--- Simplification Finished. Total points removed: ${pointsRemoved} ---`);

  return {
    type: "Polygon",
    coordinates: [points]
  };
}

/**
 * Orthogonalize polygon geometry using iterative gradient descent.
 * Adjusts vertices to make angles multiples of 90° while preserving shape.
 * Based on the iD editor algorithm (used in OpenStreetMap).
 *
 * @param geojsonObject - GeoJSON Polygon object
 * @param threshold - Angle threshold in degrees (default 12)
 * @returns GeoJSON Polygon with orthogonalized coordinates
 */
export function normalizeRightAngles(geojsonObject: any, threshold = 12) {
  const lowerThreshold = Math.cos(((90 - threshold) * Math.PI) / 180)
  const upperThreshold = Math.cos((threshold * Math.PI) / 180)
  const epsilon = 1e-4

  let nodes = structuredClone(geojsonObject.coordinates[0]) as any[]

  // Work in Mercator projection to avoid lat/lon distortion
  let points = nodes.slice(0, -1).map((n: number[]) => [n[0], lat2latp(n[1])])

  let corner = { i: 0, dotp: 1 }

  // Special case: triangles — only move the least-square corner
  if (points.length === 3) {
    for (let i = 0; i < 1000; i++) {
      let motions = points.map((b, i, arr) => calcMotion(b, i, arr))
      let tmp = addPts(points[corner.i], motions[corner.i])
      points[corner.i][0] = tmp[0]
      points[corner.i][1] = tmp[1]
      if (corner.dotp < epsilon) break
    }
    let n = points[corner.i]
    n[1] = latp2lat(n[1])
    let id = nodes[corner.i].toString()
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].toString() === id) {
        nodes[i][0] = n[0]
        nodes[i][1] = n[1]
      }
    }
    return { type: 'Polygon', coordinates: [nodes] }
  }

  // General case: gradient descent minimizing squareness
  const originalPoints = nodes.slice(0, -1).map((n: number[]) => [n[0], lat2latp(n[1])])
  let score = Number.POSITIVE_INFINITY

  for (let i = 0; i < 1000 && !(score < epsilon); i++) {
    let motions = points.map((b, i, arr) => calcMotion(b, i, arr))
    for (let j = 0; j < motions.length; j++) {
      let tmp = addPts(points[j], motions[j])
      points[j][0] = tmp[0]
      points[j][1] = tmp[1]
    }
    let newScore = squareness(points)
    if (newScore < score) score = newScore
  }

  // Apply changes back to nodes
  for (let i = 0; i < points.length; i++) {
    if (originalPoints[i][0] !== points[i][0] || originalPoints[i][1] !== points[i][1]) {
      let n = points[i]
      n[1] = latp2lat(n[1])
      let id = nodes[i].toString()
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].toString() === id) {
          nodes[j][0] = n[0]
          nodes[j][1] = n[1]
        }
      }
    }
  }

  // Remove collinear points (angle ~180°)
  for (let i = 0; i < points.length; i++) {
    let dotp = normalizedDotProduct(i, points)
    if (dotp < -1 + epsilon) {
      let id = nodes[i].toString()
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].toString() === id) {
          nodes[j] = false as any
        }
      }
    }
  }

  nodes = nodes.filter((item: any) => item !== false)

  return { type: 'Polygon', coordinates: [nodes] }

  function calcMotion(b: number[], i: number, array: number[][]) {
    let a = array[(i - 1 + array.length) % array.length]
    let c = array[(i + 1) % array.length]
    let p = subPts(a, b)
    let q = subPts(c, b)
    let scale = 2 * Math.min(dist(p, [0, 0]), dist(q, [0, 0]))
    p = normPt(p, 1.0)
    q = normPt(q, 1.0)
    let dotp = filterDotProduct(p[0] * q[0] + p[1] * q[1])
    if (array.length > 3) {
      if (dotp < -Math.SQRT1_2) dotp += 1.0
    } else if (dotp && Math.abs(dotp) < corner.dotp) {
      corner.i = i
      corner.dotp = Math.abs(dotp)
    }
    return normPt(addPts(p, q), 0.1 * dotp * scale)
  }

  function squareness(pts: number[][]) {
    return pts.reduce((sum, _, i, arr) => {
      let dotp = filterDotProduct(normalizedDotProduct(i, arr))
      return sum + 2.0 * Math.min(Math.abs(dotp - 1.0), Math.min(Math.abs(dotp), Math.abs(dotp + 1)))
    }, 0)
  }

  function normalizedDotProduct(i: number, pts: number[][]) {
    let a = pts[(i - 1 + pts.length) % pts.length]
    let b = pts[i]
    let c = pts[(i + 1) % pts.length]
    let p = normPt(subPts(a, b), 1.0)
    let q = normPt(subPts(c, b), 1.0)
    return p[0] * q[0] + p[1] * q[1]
  }

  function filterDotProduct(dotp: number) {
    if (lowerThreshold > Math.abs(dotp) || Math.abs(dotp) > upperThreshold) return dotp
    return 0
  }

  function addPts(a: number[], b: number[]) { return [a[0] + b[0], a[1] + b[1]] }
  function subPts(a: number[], b: number[]) { return [a[0] - b[0], a[1] - b[1]] }
  function dist(a: number[], b: number[]) { return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2) }
  function normPt(p: number[], s: number) {
    let l = Math.sqrt(p[0]*p[0] + p[1]*p[1])
    return l === 0 ? [0, 0] : [p[0]/l*s, p[1]/l*s]
  }
}

function lat2latp(lat: number) {
  return (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * (Math.PI / 180)) / 2))
}

function latp2lat(a: number) {
  return (180 / Math.PI) * (2 * Math.atan(Math.exp((a * Math.PI) / 180)) - Math.PI / 2)
}
