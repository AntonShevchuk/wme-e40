import { describe, it, expect, beforeAll } from 'vitest'
import { GeoUtils } from '../../geo.utils/src/geo-utils'
import { pieOrthogonalize } from './pie-orthogonalize'

beforeAll(() => {
  ;(globalThis as any).GeoUtils = GeoUtils
})

// Helper: create closed coordinate array from points
function coords(points: number[][]): number[][][] {
  return [[...points, points[0]]]
}

// Helper: calculate angle at vertex i using GeoUtils
function angleAt(points: number[][], i: number): number {
  const prev = points[(i - 1 + points.length) % points.length]
  const curr = points[i]
  const next = points[(i + 1) % points.length]
  return GeoUtils.findAngle(prev, curr, next)
}

// Helper: get all angles from a result coordinate array (exclude closing point)
function allAngles(result: number[][]): number[] {
  const points = isClosed(result) ? result.slice(0, -1) : result
  return points.map((_: any, i: number) => angleAt(points, i))
}

// Helper: check polygon is closed
function isClosed(result: number[][]): boolean {
  return result[0][0] === result[result.length - 1][0]
    && result[0][1] === result[result.length - 1][1]
}

describe('PIE: GeoJSONOrthogonalizeGeometry', () => {
  // ============================================================
  // Case 1: Perfect rectangle — should not change
  // ============================================================
  it('should not modify a perfect rectangle', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `angle ${i}: ${a}`).toBeCloseTo(90, 0)
    })
  })

  // ============================================================
  // Case 2: Slightly skewed rectangle
  // ============================================================
  it('should fix a slightly skewed rectangle', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.00105, 50.001],
      [30.0, 50.001],
    ])
    const anglesBefore = allAngles(input[0].slice(0, -1))
    const result = pieOrthogonalize(input)
    const anglesAfter = allAngles(result)

    const improvementCount = anglesAfter.filter((a, i) =>
      i < anglesBefore.length && Math.abs(a - 90) < Math.abs(anglesBefore[i] - 90)
    ).length
    expect(improvementCount).toBeGreaterThan(0)
  })

  // ============================================================
  // Case 3: L-shaped polygon (6 vertices)
  // ============================================================
  it('should handle L-shaped polygon with near-90 angles', () => {
    const input = coords([
      [30.0, 50.0],
      [30.002, 50.0],
      [30.002, 50.0005],
      [30.001, 50.0005],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `L-shape angle ${i}: ${a}`).toBeCloseTo(90, -1)
    })
  })

  // ============================================================
  // Case 4: Diamond/rhombus
  // ============================================================
  it('should handle a diamond shape', () => {
    const input = coords([
      [30.0005, 50.0],
      [30.001, 50.0005],
      [30.0005, 50.001],
      [30.0, 50.0005],
    ])
    const result = pieOrthogonalize(input)
    expect(result.length).toBeGreaterThanOrEqual(4)
  })

  // ============================================================
  // Case 5: Right triangle
  // ============================================================
  it('should handle a right triangle', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    // PIE has special triangle handling — should still return valid coords
    expect(result.length).toBeGreaterThanOrEqual(3)
  })

  // ============================================================
  // Case 6: Pentagon with one near-90 angle
  // ============================================================
  it('should handle a pentagon', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.00105, 50.0005],
      [30.0008, 50.001],
      [30.0, 50.0008],
    ])
    const result = pieOrthogonalize(input)
    expect(result.length).toBeGreaterThanOrEqual(4)
  })

  // ============================================================
  // Case 7: Building footprint (~50x30m)
  // ============================================================
  it('should orthogonalize a building-sized polygon', () => {
    const input = coords([
      [30.52000, 50.45000],
      [30.52065, 50.45002],
      [30.52063, 50.45028],
      [30.52000, 50.45027],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `building angle ${i}: ${a}`).toBeCloseTo(90, 0)
    })
  })

  // ============================================================
  // Case 8: Perfect square — verify no significant modification
  // ============================================================
  it('should preserve a perfect square', () => {
    const input = coords([
      [30.0, 50.0],
      [30.0005, 50.0],
      [30.0005, 50.0005],
      [30.0, 50.0005],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `square angle ${i}: ${a}`).toBeCloseTo(90, 0)
    })
  })

  // ============================================================
  // Case 9: Narrow rectangle (10:1)
  // ============================================================
  it('should handle a narrow rectangle', () => {
    const input = coords([
      [30.0, 50.0],
      [30.005, 50.0],
      [30.005, 50.0003],
      [30.0, 50.0003],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `narrow angle ${i}: ${a}`).toBeCloseTo(90, 0)
    })
  })

  // ============================================================
  // Case 10: U-shaped polygon (8 vertices)
  // ============================================================
  it('should handle U-shaped polygon', () => {
    const input = coords([
      [30.0, 50.0],
      [30.002, 50.0],
      [30.002, 50.001],
      [30.0015, 50.001],
      [30.0015, 50.0003],
      [30.0005, 50.0003],
      [30.0005, 50.001],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    const angles = allAngles(result)

    angles.forEach((a, i) => {
      expect(a, `U-shape angle ${i}: ${a}`).toBeCloseTo(90, -1)
    })
  })

  // ============================================================
  // Case 11: Angles in 75-105 range
  // ============================================================
  it('should fix angles in the near-90 range', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.00003],
      [30.00095, 50.001],
      [30.0, 50.001],
    ])
    const anglesBefore = allAngles(input[0].slice(0, -1))
    const result = pieOrthogonalize(input)
    const anglesAfter = allAngles(result)

    const maxBefore = Math.max(...anglesBefore.map(a => Math.abs(a - 90)))
    const maxAfter = Math.max(...anglesAfter.map(a => Math.abs(a - 90)))
    expect(maxAfter, `max deviation: ${maxAfter} should be < ${maxBefore}`).toBeLessThan(maxBefore)
  })

  // ============================================================
  // Case 12: Sharp angle (outside threshold)
  // ============================================================
  it('should handle a polygon with sharp angles', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.0015, 50.0008],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    // PIE may still modify — it targets 0/90/180 multiples
    expect(result.length).toBeGreaterThanOrEqual(3)
  })

  // ============================================================
  // Case 13: Collinear point removal
  // PIE should remove points that become collinear (angle ~180)
  // ============================================================
  it('should handle near-collinear points', () => {
    const input = coords([
      [30.0, 50.0],
      [30.0005, 50.0],    // midpoint on bottom edge
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)
    // PIE may remove the collinear midpoint, resulting in 4+1 or 4 points
    expect(result.length).toBeLessThanOrEqual(6)
    expect(result.length).toBeGreaterThanOrEqual(4)
  })

  // ============================================================
  // Output format
  // ============================================================
  it('should return a valid coordinate array', () => {
    const input = coords([
      [30.0, 50.0],
      [30.001, 50.0],
      [30.001, 50.001],
      [30.0, 50.001],
    ])
    const result = pieOrthogonalize(input)

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThanOrEqual(4)
    result.forEach((coord, i) => {
      expect(Array.isArray(coord), `coord ${i} should be array`).toBe(true)
      expect(coord.length, `coord ${i} should have 2 elements`).toBe(2)
    })
  })
})
