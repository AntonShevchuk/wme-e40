import { describe, it, expect, beforeAll } from 'vitest'
import { GeoUtils } from '../../geo.utils/src/geo-utils'
import { normalizeRightAngles } from '../src/geometry'
import { pieOrthogonalize } from './pie-orthogonalize'

beforeAll(() => {
  ;(globalThis as any).GeoUtils = GeoUtils
})

// Helpers
function poly(points: number[][]): any {
  return { type: 'Polygon', coordinates: [[...points, points[0]]] }
}

function coords(points: number[][]): number[][][] {
  return [[...points, points[0]]]
}

function angleAt(points: number[][], i: number): number {
  const prev = points[(i - 1 + points.length) % points.length]
  const curr = points[i]
  const next = points[(i + 1) % points.length]
  return GeoUtils.findAngle(prev, curr, next)
}

function allAnglesE40(result: any): number[] {
  const c = result.coordinates[0]
  const pts = c.slice(0, -1)
  return pts.map((_: any, i: number) => angleAt(pts, i))
}

function allAnglesPIE(result: number[][]): number[] {
  const closed = result[0][0] === result[result.length - 1][0]
    && result[0][1] === result[result.length - 1][1]
  const pts = closed ? result.slice(0, -1) : result
  return pts.map((_: any, i: number) => angleAt(pts, i))
}

function maxDeviation(angles: number[], target = 90): number {
  return Math.max(...angles.map(a => Math.min(Math.abs(a - 0), Math.abs(a - 90), Math.abs(a - 180))))
}

function avgDeviation(angles: number[]): number {
  const devs = angles.map(a => Math.min(Math.abs(a - 0), Math.abs(a - 90), Math.abs(a - 180)))
  return devs.reduce((s, d) => s + d, 0) / devs.length
}

// Test cases: [name, points]
const cases: [string, number[][]][] = [
  // Rectangles with various distortions
  ['Rect: one corner shifted 3m', [
    [30.52000, 50.45000],
    [30.52050, 50.45000],
    [30.52052, 50.45030],  // shifted ~1.5m east
    [30.52000, 50.45030],
  ]],
  ['Rect: rotated 15 degrees', [
    [30.52000, 50.45000],
    [30.52048, 50.45013],
    [30.52035, 50.45043],
    [30.51987, 50.45030],
  ]],
  ['Rect: rotated 30 degrees', [
    [30.52000, 50.45000],
    [30.52043, 50.45025],
    [30.52018, 50.45068],
    [30.51975, 50.45043],
  ]],
  ['Rect: rotated 45 degrees', [
    [30.52000, 50.45000],
    [30.52035, 50.45035],
    [30.52000, 50.45070],
    [30.51965, 50.45035],
  ]],
  ['Rect: two corners shifted', [
    [30.52000, 50.45000],
    [30.52050, 50.45002],  // shifted ~2m north
    [30.52048, 50.45030],  // shifted ~1.5m west
    [30.52000, 50.45030],
  ]],
  ['Rect: all corners slightly off', [
    [30.52001, 50.45001],
    [30.52049, 50.44999],
    [30.52051, 50.45031],
    [30.51999, 50.45029],
  ]],

  // Complex building shapes
  ['T-shape (8 vertices)', [
    [30.52000, 50.45000],
    [30.52030, 50.45000],
    [30.52030, 50.45010],
    [30.52020, 50.45010],
    [30.52020, 50.45030],
    [30.52010, 50.45030],
    [30.52010, 50.45010],
    [30.52000, 50.45010],
  ]],
  ['Plus/cross shape (12 vertices)', [
    [30.52010, 50.45000],
    [30.52020, 50.45000],
    [30.52020, 50.45010],
    [30.52030, 50.45010],
    [30.52030, 50.45020],
    [30.52020, 50.45020],
    [30.52020, 50.45030],
    [30.52010, 50.45030],
    [30.52010, 50.45020],
    [30.52000, 50.45020],
    [30.52000, 50.45010],
    [30.52010, 50.45010],
  ]],
  ['Step/staircase (10 vertices)', [
    [30.52000, 50.45000],
    [30.52010, 50.45000],
    [30.52010, 50.45010],
    [30.52020, 50.45010],
    [30.52020, 50.45020],
    [30.52030, 50.45020],
    [30.52030, 50.45030],
    [30.52000, 50.45030],
    [30.52000, 50.45020],
    [30.52000, 50.45010],  // collinear — should be removed
  ]],

  // Real-world digitization errors
  ['Building with zigzag error', [
    [30.52000, 50.45000],
    [30.52050, 50.45001],  // ~1m Y error
    [30.52049, 50.45028],  // ~1m X error
    [30.52001, 50.45030],  // ~1m X + Y error
  ]],
  ['Large building (100x50m)', [
    [30.52000, 50.45000],
    [30.52130, 50.45003],  // slight drift
    [30.52127, 50.45048],
    [30.51998, 50.45045],
  ]],
  ['Small kiosk (5x5m)', [
    [30.52000, 50.45000],
    [30.52007, 50.45000],
    [30.52007, 50.45005],
    [30.52000, 50.45005],
  ]],

  // Tricky angles
  ['Trapezoid (no right angles)', [
    [30.52000, 50.45000],
    [30.52050, 50.45000],
    [30.52040, 50.45030],
    [30.52010, 50.45030],
  ]],
  ['Parallelogram', [
    [30.52000, 50.45000],
    [30.52050, 50.45000],
    [30.52060, 50.45030],
    [30.52010, 50.45030],
  ]],
  ['Pentagon regular-ish', [
    [30.52025, 50.45000],
    [30.52050, 50.45018],
    [30.52040, 50.45045],
    [30.52010, 50.45045],
    [30.52000, 50.45018],
  ]],

  // Edge cases
  ['Very thin sliver', [
    [30.52000, 50.45000],
    [30.52100, 50.45000],
    [30.52100, 50.45001],
    [30.52000, 50.45001],
  ]],
  ['Nearly degenerate (3 almost collinear + 1)', [
    [30.52000, 50.45000],
    [30.52025, 50.45000],
    [30.52050, 50.45001],  // almost collinear
    [30.52025, 50.45020],
  ]],
  ['Equilateral triangle', [
    [30.52000, 50.45000],
    [30.52050, 50.45000],
    [30.52025, 50.45043],
  ]],
  ['Hexagon', [
    [30.52015, 50.45000],
    [30.52035, 50.45000],
    [30.52050, 50.45015],
    [30.52035, 50.45030],
    [30.52015, 50.45030],
    [30.52000, 50.45015],
  ]],
]

describe('E40 vs PIE: side-by-side comparison', () => {
  cases.forEach(([name, points]) => {
    describe(name, () => {
      const input = poly(points)
      const inputCoords = coords(points)
      const anglesBefore = points.map((_, i) => angleAt(points, i))

      it('E40 should produce valid output', () => {
        const result = normalizeRightAngles(input)
        expect(result.type).toBe('Polygon')
        expect(result.coordinates[0].length).toBeGreaterThanOrEqual(4)
        // First == last (closed)
        const c = result.coordinates[0]
        expect(c[0][0]).toBe(c[c.length - 1][0])
        expect(c[0][1]).toBe(c[c.length - 1][1])
      })

      it('PIE should produce valid output', () => {
        const result = pieOrthogonalize(inputCoords)
        expect(result.length).toBeGreaterThanOrEqual(3)
        result.forEach((coord, i) => {
          expect(coord.length, `coord ${i}`).toBe(2)
          expect(typeof coord[0]).toBe('number')
          expect(typeof coord[1]).toBe('number')
          expect(Number.isNaN(coord[0]), `coord ${i}[0] NaN`).toBe(false)
          expect(Number.isNaN(coord[1]), `coord ${i}[1] NaN`).toBe(false)
        })
      })

      it('E40 should not make angles significantly worse', () => {
        const result = normalizeRightAngles(input)
        const anglesAfter = allAnglesE40(result)
        const avgBefore = avgDeviation(anglesBefore)
        const avgAfter = avgDeviation(anglesAfter)
        // Tolerance of 5 — point removal can shift averages
        expect(avgAfter, `E40 avg deviation: ${avgAfter.toFixed(2)} vs before: ${avgBefore.toFixed(2)}`).toBeLessThanOrEqual(avgBefore + 5)
      })

      it('PIE should not make angles significantly worse', () => {
        const result = pieOrthogonalize(inputCoords)
        const anglesAfter = allAnglesPIE(result)
        const avgBefore = avgDeviation(anglesBefore)
        const avgAfter = avgDeviation(anglesAfter)
        expect(avgAfter, `PIE avg deviation: ${avgAfter.toFixed(2)} vs before: ${avgBefore.toFixed(2)}`).toBeLessThanOrEqual(avgBefore + 5)
      })
    })
  })
})
