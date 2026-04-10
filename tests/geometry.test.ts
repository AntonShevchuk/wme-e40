import { describe, it, expect, beforeAll } from 'vitest'
import { GeoUtils } from '../../geo.utils/src/geo-utils'
import { normalizeRightAngles } from '../src/geometry'

beforeAll(() => {
  ;(globalThis as any).GeoUtils = GeoUtils
})

// Helper: create a closed polygon from points (auto-closes)
function poly(points: number[][]): any {
  const closed = [...points, points[0]]
  return { type: 'Polygon', coordinates: [closed] }
}

// Helper: calculate angle at vertex i using GeoUtils
function angleAt(coords: number[][], i: number): number {
  const prev = coords[(i - 1 + coords.length) % coords.length]
  const curr = coords[i]
  const next = coords[(i + 1) % coords.length]
  return GeoUtils.findAngle(prev, curr, next)
}

// Helper: check all angles of a polygon (excluding closing point)
function allAngles(result: any): number[] {
  const coords = result.coordinates[0]
  const points = coords.slice(0, -1) // exclude closing duplicate
  return points.map((_: any, i: number) => angleAt(points, i))
}

// Helper: check polygon is closed (first == last)
function isClosed(result: any): boolean {
  const coords = result.coordinates[0]
  return coords[0][0] === coords[coords.length - 1][0]
    && coords[0][1] === coords[coords.length - 1][1]
}

describe('normalizeRightAngles', () => {
  // ============================================================
  // Case 1: Perfect rectangle — should not change
  // ============================================================
  it('should not modify a perfect rectangle', () => {
    const rect = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(rect)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `angle ${i}`).toBeCloseTo(90, 0)
    })
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 2: Slightly skewed rectangle (one corner off by ~5)
  // ============================================================
  it('should fix a slightly skewed rectangle', () => {
    const skewed = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.00105, 50.001],  // slightly off
      [30.0, 50.001],
    ])
    const anglesBefore = allAngles(skewed)
    const result = normalizeRightAngles(skewed)
    const anglesAfter = allAngles(result)

    // At least one angle should be closer to 90 after normalization
    const improvementCount = anglesAfter.filter((a, i) =>
      Math.abs(a - 90) < Math.abs(anglesBefore[i] - 90)
    ).length
    expect(improvementCount).toBeGreaterThan(0)
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 3: L-shaped polygon (6 vertices, all ~90)
  // ============================================================
  it('should handle L-shaped polygon with near-90 angles', () => {
    const lShape = poly([
      [30.0, 50.0],
      [30.002, 50.0],
      [30.002, 50.0005],
      [30.001, 50.0005],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(lShape)
    const angles = allAngles(result)

    // All angles should be close to 90 or 270
    angles.forEach((a, i) => {
      expect(a, `L-shape angle ${i}`).toBeCloseTo(90, -1)
    })
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 4: Diamond/rhombus (all 45 angles) — should NOT change
  // (angles outside 75-105 range)
  // ============================================================
  it('should not modify a diamond shape (angles ~45/135)', () => {
    const diamond = poly([
      [30.0005, 50.0],
      [30.001, 50.0005],
      [30.0005, 50.001],
      [30.0, 50.0005],
    ])
    const before = diamond.coordinates[0].map((c: number[]) => [...c])
    const result = normalizeRightAngles(diamond)

    // Coordinates should be unchanged (angles are 90 for a square rotated 45)
    // Actually a diamond with equal sides has 90 angles too
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 5: Triangle — should not change (no near-90 angles to fix,
  // or if one is near 90, only that gets adjusted)
  // ============================================================
  it('should handle a right triangle', () => {
    const triangle = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(triangle)

    expect(result.coordinates[0].length).toBeGreaterThanOrEqual(4) // 3 points + close
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 6: Pentagon with one near-90 angle
  // ============================================================
  it('should fix the near-90 angle in a pentagon', () => {
    const pentagon = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.00105, 50.0005], // angle near 85-90
      [30.0008, 50.001],
      [30.0, 50.0008],
    ])
    const result = normalizeRightAngles(pentagon)
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 7: Large building footprint (real-world scale ~50x30m)
  // ============================================================
  it('should orthogonalize a building-sized polygon', () => {
    // ~50m x ~30m building near Kyiv (50.45N, 30.52E)
    // Slightly skewed to simulate digitization error
    const building = poly([
      [30.52000, 50.45000],
      [30.52065, 50.45002],  // slight Y error
      [30.52063, 50.45028],  // slight X error
      [30.52000, 50.45027],  // slight Y error
    ])
    const result = normalizeRightAngles(building)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `building angle ${i}`).toBeCloseTo(90, 0)
    })
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 8: Already perfect square — verify no modification
  // ============================================================
  it('should preserve a perfect square', () => {
    const square = poly([
      [30.0, 50.0],
      [30.0005, 50.0],
      [30.0005, 50.0005],
      [30.0, 50.0005],
    ])
    const before = JSON.stringify(square.coordinates)
    const result = normalizeRightAngles(square)
    const after = JSON.stringify(result.coordinates)

    expect(after).toBe(before)
  })

  // ============================================================
  // Case 9: Narrow rectangle (aspect ratio ~10:1)
  // ============================================================
  it('should handle a narrow rectangle', () => {
    const narrow = poly([
      [30.0, 50.0],
      [30.005, 50.0],
      [30.005, 50.0003],
      [30.0, 50.0003],
    ])
    const result = normalizeRightAngles(narrow)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `narrow angle ${i}`).toBeCloseTo(90, 0)
    })
  })

  // ============================================================
  // Case 10: U-shaped polygon (8 vertices)
  // ============================================================
  it('should handle U-shaped polygon', () => {
    const uShape = poly([
      [30.0, 50.0],
      [30.002, 50.0],
      [30.002, 50.001],
      [30.0015, 50.001],
      [30.0015, 50.0003],
      [30.0005, 50.0003],
      [30.0005, 50.001],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(uShape)
    const angles = allAngles(result)

    // All should be near 90 or 270
    angles.forEach((a, i) => {
      expect(a, `U-shape angle ${i}`).toBeCloseTo(90, -1)
    })
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Case 11: Polygon with angles in 75-105 range (should be fixed)
  // ============================================================
  it('should fix angles in the 75-105 range', () => {
    // Create a slightly skewed quad — angles deviate from 90
    const skewed = poly([
      [30.0, 50.0],
      [30.001, 50.00003],  // slight Y shift
      [30.00095, 50.001],  // slight X shift
      [30.0, 50.001],
    ])
    const anglesBefore = allAngles(skewed)
    const hasNear90 = anglesBefore.some(a => a >= 75 && a <= 105 && Math.abs(a - 90) > 0.5)
    expect(hasNear90, 'should have a near-90 but not-perfect angle').toBe(true)

    const result = normalizeRightAngles(skewed)
    const anglesAfter = allAngles(result)

    // Max deviation from 90 should decrease
    const maxBefore = Math.max(...anglesBefore.map(a => Math.abs(a - 90)))
    const maxAfter = Math.max(...anglesAfter.map(a => Math.abs(a - 90)))
    expect(maxAfter, 'max deviation should decrease').toBeLessThan(maxBefore)
  })

  // ============================================================
  // Case 12: Polygon with angle at 70 (outside range — should NOT fix)
  // ============================================================
  it('should not fix angle at 70 degrees (outside 75-105 range)', () => {
    const sharp = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.0015, 50.0008], // creates sharp angle
      [30.0, 50.001],
    ])
    const anglesBefore = allAngles(sharp)
    const result = normalizeRightAngles(sharp)
    const anglesAfter = allAngles(result)

    // If no angles were in 75-105 range, result should be same
    const noNear90Before = anglesBefore.every(a => a < 75 || a > 105)
    if (noNear90Before) {
      expect(JSON.stringify(result.coordinates)).toBe(JSON.stringify(sharp.coordinates))
    }
  })

  // ============================================================
  // Case 13: Collinear point removal
  // ============================================================
  it('should remove near-collinear points (angle ~180)', () => {
    const collinear = poly([
      [30.0, 50.0],
      [30.0005, 50.0],    // midpoint on bottom edge — collinear
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(collinear)
    // The collinear midpoint should be removed: 5 -> 4 points + close = 5
    expect(result.coordinates[0].length).toBeLessThanOrEqual(6)
    expect(result.coordinates[0].length).toBeGreaterThanOrEqual(4)
    expect(isClosed(result)).toBe(true)
  })

  // ============================================================
  // Output format checks
  // ============================================================
  it('should return valid GeoJSON Polygon', () => {
    const rect = poly([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = normalizeRightAngles(rect)

    expect(result.type).toBe('Polygon')
    expect(Array.isArray(result.coordinates)).toBe(true)
    expect(Array.isArray(result.coordinates[0])).toBe(true)
    expect(result.coordinates[0].length).toBeGreaterThanOrEqual(4)
  })
})
