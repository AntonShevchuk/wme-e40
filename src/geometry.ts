import { GeoUtils } from './geo-utils'

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
 * Moves vertices (P_curr) that form a near-90° angle (85-89.9 or 90.1-95)
 * to a new position (P'_curr) that forms exactly 90°.
 * @param {object} geojsonObject A GeoJSON Feature<Polygon> or Polygon geometry object.
 * @returns {object} The angle-normalized GeoJSON Polygon geometry object.
 */
export function normalizeRightAngles(geojsonObject: any) {
  let points = geojsonObject.coordinates[0].slice()

  let pointsAdjusted = 0;
  let totalIterations = 0;
  let changedInPass = true;

  console.log("--- Starting Angle Normalization (Near 90° adjustment) ---");

  // Iterate until no points are adjusted in a full pass
  while (changedInPass && totalIterations < 10) { // Safety limit for iterations
    changedInPass = false;
    totalIterations++;

    console.log(`[Iter ${totalIterations}] Start`)

    // Check points from index 1 up to length - 2.
    for (let i = 1; i < points.length; i++) {
      const pPrev = points[i - 1];
      const pCurr = points[i];
      const pNext = (i === points.length - 1) ? points[1] : points[i + 1];

      const angle = GeoUtils.findAngle(pPrev, pCurr, pNext);

      console.log(`[Point ${i}] Angle:`, angle.toFixed(4))

      // Check if the angle is in the target normalization ranges
      const inRange1 = angle >= 75.0 && angle <= 89.9;
      const inRange2 = angle >= 90.1 && angle <= 105.0;

      if (inRange1 || inRange2) {

        // Round coordinates to 6 decimal places for GeoJSON compatibility
        points[i] = GeoUtils.findRightAngleIntersection(pPrev, pCurr, pNext)

        let new_angle = GeoUtils.findAngle(pPrev, points[i], pNext);

        pointsAdjusted++;
        changedInPass = true;
        console.log(`[Point ${i}] Angle ${angle.toFixed(4)}° adjusted to ${new_angle.toFixed(4)}°.`);

        // The loop continues in the same pass. If points[i] is adjusted,
        // it affects the angle calculations for P_{i-1} and P_{i+1} in the next passes.
      }
    }
  }

  // Ensure the closure point is updated after all adjustments
  points[points.length - 1] = points[0];

  console.log(`--- Normalization Finished. Total points adjusted: ${pointsAdjusted} in ${totalIterations} passes. ---`);

  return {
    type: "Polygon",
    coordinates: [points]
  };
}
