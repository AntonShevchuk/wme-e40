/**
 * A utility class for spherical geometry (geodesy).
 * Assumes points are [longitude, latitude] in degrees.
 */
export class GeoUtils {
  /**
   * @param {number} degrees
   * @return {number} radians
   * @private
   */
  static _toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  /**
   * @param {number} radians
   * @return {number} degrees
   * @private
   */
  static _toDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  /**
   * Normalizes an angle to the range -180 to +180 degrees.
   *
   * @param {number} degrees
   * @return {number} degrees
   */
  static _normalizeAngle(degrees: number) {
    return (degrees + 540) % 360 - 180;
  }

  /**
   * Calculates the initial bearing from pA to pB.
   *
   * @param {[number,number]} pA - [lon, lat] of start point.
   * @param {[number,number]} pB - [lon, lat] of end point.
   * @returns {number} Initial bearing in degrees (0-360).
   */
  static getBearing(pA: number[], pB: number[]) {
    const latA = GeoUtils._toRadians(pA[1]);
    const lonA = GeoUtils._toRadians(pA[0]);
    const latB = GeoUtils._toRadians(pB[1]);
    const lonB = GeoUtils._toRadians(pB[0]);

    const deltaLon = lonB - lonA;

    const y = Math.sin(deltaLon) * Math.cos(latB);
    const x = Math.cos(latA) * Math.sin(latB) -
      Math.sin(latA) * Math.cos(latB) * Math.cos(deltaLon);

    const bearingRad = Math.atan2(y, x);

    // Convert from -180/+180 to 0-360
    return (GeoUtils._toDegrees(bearingRad) + 360) % 360;
  }

  /**
   * Calculates the interior angle at vertex p2.
   *
   * @param {[number,number]} p1
   * @param {[number,number]} p2
   * @param {[number,number]} p3
   */
  static findAngle(p1: number[], p2: number[], p3: number[]) {
    const bearing21 = GeoUtils.getBearing(p2, p1);
    const bearing23 = GeoUtils.getBearing(p2, p3);
    let angle = Math.abs(bearing21 - bearing23);

    if (angle > 180) {
      angle = 360 - angle;
    }
    return angle;
  }

  /**
   * Calculate the approximate distance between two coordinates (lat/lon)
   *
   * @param {[number,number]} pA - [lon, lat] of start point.
   * @param {[number,number]} pB - [lon, lat] of end point.
   * @return {number} The distance in meters.
   */
  static getDistance (pA: number[], pB: number[]) {
    return GeoUtils.getAngularDistance(pA, pB) * 6371000
  }

  /**
   * Calculates the angular distance between two points using the Haversine formula.
   *
   * @param {[number,number]} pA - [lon, lat] of start point.
   * @param {[number,number]} pB - [lon, lat] of end point.
   * @returns {number} The angular distance in radians.
   */
  static getAngularDistance(pA: number[], pB: number[]) {
    const latA = GeoUtils._toRadians(pA[1]);
    const lonA = GeoUtils._toRadians(pA[0]);
    const latB = GeoUtils._toRadians(pB[1]);
    const lonB = GeoUtils._toRadians(pB[0]);

    const deltaLat = latB - latA;
    const deltaLon = lonB - lonA;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(latA) * Math.cos(latB) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    // c is the angular distance in radians
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /**
   * Calculates the destination point given a start point, bearing, and distance.
   * @param {[number,number]} startPoint - [lon, lat] of start point.
   * @param {number} bearing - Bearing in degrees (0-360).
   * @param {number} distanceRad - Angular distance in radians.
   * @returns {number[]} The destination point [lon, lat] in degrees.
   */
  static getDestination(startPoint: number[], bearing: number, distanceRad: number) {
    const lat1 = GeoUtils._toRadians(startPoint[1]);
    const lon1 = GeoUtils._toRadians(startPoint[0]);
    const brng = GeoUtils._toRadians(bearing);
    const d = distanceRad;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) +
      Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
    );

    const lon2 = lon1 + Math.atan2(
      Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

    // Normalize longitude to -180 to +180
    const lon2Deg = GeoUtils._toDegrees(lon2);
    const lat2Deg = GeoUtils._toDegrees(lat2);

    return [(lon2Deg + 540) % 360 - 180, lat2Deg];
  }

  /**
   * Finds a point D on the great circle path AB such that the angle ADC equals the specified angle.
   *
   * @param {[number,number]} pA - Start of line [lon, lat]
   * @param {[number,number]} pB - End of line [lon, lat]
   * @param {[number,number]} pC - The third point [lon, lat]
   * @param {number} angle - The desired intersection angle at D in degrees (e.g., 90 for perpendicular).
   * @returns {[number,number] | null} The coordinates of D, or null if no such intersection exists.
   */
  static findIntersection(pA: number[], pB: number[], pC: number[], angle: number) {
    const angleRad = GeoUtils._toRadians(angle);

    // 1. Calculate Angle A (difference in bearings)
    const bearingAB = GeoUtils.getBearing(pA, pB);
    const bearingAC = GeoUtils.getBearing(pA, pC);
    const angleA_rad = GeoUtils._toRadians(bearingAC - bearingAB);

    // 2. Calculate Side b (distance AC)
    const distb_rad = GeoUtils.getAngularDistance(pA, pC);

    // 3. Solve for distance AD (Side c) using the Four-Part Formula (Cotangent Law)
    // The relation for parts (Side b, Angle A, Side c, Angle D) is:
    // sin(c) * cot(b) - cos(c) * cos(A) = sin(A) * cot(D)

    // We solve this linear combination of sin(c) and cos(c) by transforming it into:
    // R * sin(c - phi) = K

    const cot_b = 1.0 / Math.tan(distb_rad);
    const cot_D = 1.0 / Math.tan(angleRad);

    // Coefficients for harmonic addition
    // sin(c)*X - cos(c)*Y = Z
    // X = cot_b, Y = cos(angleA), Z = sin(angleA) * cot_D
    const X = cot_b;
    const Y = Math.cos(angleA_rad);
    const Z = Math.sin(angleA_rad) * cot_D;

    // Calculate auxiliary angle phi and magnitude R
    // We match form: R * sin(c - phi) = Z
    // where R * cos(phi) = X and R * sin(phi) = Y
    const R = Math.hypot(X, Y);
    const phi = Math.atan2(Y, X); // atan2(y, x) -> atan2(cosA, cot_b)

    // Check if solution exists (Z/R must be between -1 and 1)
    const sin_c_minus_phi = Z / R;

    if (Math.abs(sin_c_minus_phi) > 1) {
      return null; // The requested angle is impossible to form (e.g., triangle inequality violation)
    }

    // 4. Calculate final distance c (distAD)
    // c - phi = asin(...)
    const distAD_rad = phi + Math.asin(sin_c_minus_phi);

    // 5. Calculate coordinates of D
    return GeoUtils.getDestination(pA, bearingAB, distAD_rad);
  }

  /**
   * Calculates the coordinates of point D in a right-angled spherical triangle ADC,
   * using Angle A and the hypotenuse AC.
   * Triangle ADC has a right angle at D (angle D = 90 deg),
   * and angle A and side AC are preserved from the original triangle ABC.
   *
   * @param {[number,number]} pA - [lon, lat] of point A.
   * @param {[number,number]} pB - [lon, lat] of point B (used to calculate angle A).
   * @param {[number,number]} pC - [lon, lat] of point C.
   * @returns {[number,number]} The coordinates [lon, lat] of point D.
   */
  static findRightAngleIntersection(pA: number[], pB: number[], pC: number[]) {
    // 1. Calculate the required angle at A (angle A_ABC)
    // The angle at A in triangle ABC is the interior angle at pA.
    const angleA_deg = GeoUtils.findAngle(pB, pA, pC);
    const angleA_rad = GeoUtils._toRadians(angleA_deg);

    // 2. Calculate the common side AC (side 'b' in spherical triangle ADC)
    // This is the hypotenuse of the right triangle ADC.
    const distAC_rad = GeoUtils.getAngularDistance(pA, pC);

    // 3. Use Napier's Rules to find side 'c' (distance AD)
    // In right triangle ADC: D = 90 deg, angle A is known, hypotenuse b (AC) is known.
    // We want to find side 'c' (distance AD), which is adjacent to angle A.
    // The correct spherical formula relating adjacent side 'c', hypotenuse 'b', and angle 'A' is:
    // cos(A) = tan(c) / tan(b)

    // Therefore, tan(c) = cos(A) * tan(b)
    // Where:
    // c = distAD_rad (unknown side)
    // b = distAC_rad (hypotenuse)
    // A = angleA_rad (known angle)

    const tan_c = Math.cos(angleA_rad) * Math.tan(distAC_rad);
    const distAD_rad = Math.atan(tan_c);

    // 4. Determine the bearing from A to D
    // The bearing from A to D is the bearing from A to C, adjusted by the angle A.
    const bearingAC_deg = GeoUtils.getBearing(pA, pC);

    // The bearing A->D must be rotated from A->C such that D forms a right angle with CD.
    // This requires D to be along the great circle arc that is perpendicular to C->D.

    // Bearing from A to B
    const bearingAB_deg = GeoUtils.getBearing(pA, pB);

    // Calculate the signed difference: bearingAC - bearingAB
    const angleCAB_raw_diff = GeoUtils._normalizeAngle(bearingAC_deg - bearingAB_deg);

    let bearingAD_deg;

    // The point D is found by rotating the bearing A->C away from B, by the interior angle A.
    if (angleCAB_raw_diff >= 0) {
      // B is counter-clockwise from AC (left side)
      // D needs to be on the other side of AC
      bearingAD_deg = GeoUtils._normalizeAngle(bearingAC_deg - angleA_deg);
    } else {
      // B is clockwise from AC (right side)
      // D needs to be on the other side of AC
      bearingAD_deg = GeoUtils._normalizeAngle(bearingAC_deg + angleA_deg);
    }

    // 5. Calculate the destination point D
    // Start point: pA
    // Bearing: bearingAD_deg
    // Distance: distAD_rad
    return GeoUtils.getDestination(pA, bearingAD_deg, distAD_rad);
  }
}
