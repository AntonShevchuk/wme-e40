/**
 * Extracted from WME Place Interface Enhancements script
 * https://greasyfork.org/scripts/26340
 *
 * iD editor orthogonalize algorithm adapted for GeoJSON coordinates.
 * Input: polygon coordinates array (e.g. geometry.coordinates)
 * Returns: outer ring coordinate array after orthogonalization
 */
export function pieOrthogonalize(coordinates: number[][][], threshold = 12): number[][] {
  const nomthreshold = threshold
  const lowerThreshold = Math.cos(((90 - nomthreshold) * Math.PI) / 180)
  const upperThreshold = Math.cos((nomthreshold * Math.PI) / 180)

  function Orthogonalize(): number[][] {
    let nodes = structuredClone(coordinates[0]) as any[]
    let points = nodes.slice(0, -1).map((n: number[]) => {
      const p = [...n]
      p[1] = lat2latp(p[1])
      return p
    })
    let corner = { i: 0, dotp: 1 }
    let epsilon = 1e-4
    let i: number, j: number, score: number, motions: number[][]

    if (points.length === 3) {
      for (i = 0; i < 1000; i++) {
        motions = points.map(calcMotion)
        const tmp = addPoints(points[corner.i], motions[corner.i])
        points[corner.i][0] = tmp[0]
        points[corner.i][1] = tmp[1]
        score = corner.dotp
        if (score < epsilon) break
      }
      const n = points[corner.i]
      n[1] = latp2lat(n[1])
      const id = nodes[corner.i].toString()
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].toString() !== id) continue
        nodes[i][0] = n[0]
        nodes[i][1] = n[1]
      }
      return nodes
    }

    const originalPoints = nodes.slice(0, -1).map((n: number[]) => {
      const p = [...n]
      p[1] = lat2latp(p[1])
      return p
    })
    score = Number.POSITIVE_INFINITY
    for (i = 0; i < 1000 && !(score < epsilon); i++) {
      motions = points.map(calcMotion)
      for (j = 0; j < motions.length; j++) {
        const tmp = addPoints(points[j], motions[j])
        points[j][0] = tmp[0]
        points[j][1] = tmp[1]
      }
      const newScore = squareness(points)
      if (newScore < score) score = newScore
    }
    for (i = 0; i < points.length; i++) {
      if (originalPoints[i][0] !== points[i][0] || originalPoints[i][1] !== points[i][1]) {
        const n = points[i]
        n[1] = latp2lat(n[1])
        const id = nodes[i].toString()
        for (j = 0; j < nodes.length; j++) {
          if (nodes[j].toString() !== id) continue
          nodes[j][0] = n[0]
          nodes[j][1] = n[1]
        }
      }
    }
    for (i = 0; i < points.length; i++) {
      const dotp = normalizedDotProduct(i, points)
      if (dotp < -1 + epsilon) {
        const id = nodes[i].toString()
        for (j = 0; j < nodes.length; j++) {
          if (nodes[j].toString() !== id) continue
          nodes[j] = false as any
        }
      }
    }
    return nodes.filter((item: any) => item !== false)

    function calcMotion(b: number[], i: number, array: number[][]) {
      let a = array[(i - 1 + array.length) % array.length]
      let c = array[(i + 1) % array.length]
      let p = subtractPoints(a, b)
      let q = subtractPoints(c, b)
      let scale = 2 * Math.min(euclideanDistance(p, [0, 0]), euclideanDistance(q, [0, 0]))
      p = normalizePoint(p, 1.0)
      q = normalizePoint(q, 1.0)
      let dotp = filterDotProduct(p[0] * q[0] + p[1] * q[1])
      if (array.length > 3) {
        if (dotp < -Math.SQRT1_2) dotp += 1.0
      } else if (dotp && Math.abs(dotp) < corner.dotp) {
        corner.i = i
        corner.dotp = Math.abs(dotp)
      }
      return normalizePoint(addPoints(p, q), 0.1 * dotp * scale)
    }
  }

  function lat2latp(lat: number) {
    return (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * (Math.PI / 180)) / 2))
  }
  function latp2lat(a: number) {
    return (180 / Math.PI) * (2 * Math.atan(Math.exp((a * Math.PI) / 180)) - Math.PI / 2)
  }
  function squareness(points: number[][]) {
    return points.reduce((sum, _val, i, array) => {
      let dotp = filterDotProduct(normalizedDotProduct(i, array))
      return sum + 2.0 * Math.min(Math.abs(dotp - 1.0), Math.min(Math.abs(dotp), Math.abs(dotp + 1)))
    }, 0)
  }
  function normalizedDotProduct(i: number, points: number[][]) {
    let a = points[(i - 1 + points.length) % points.length]
    let b = points[i]
    let c = points[(i + 1) % points.length]
    let p = normalizePoint(subtractPoints(a, b), 1.0)
    let q = normalizePoint(subtractPoints(c, b), 1.0)
    return p[0] * q[0] + p[1] * q[1]
  }
  function subtractPoints(a: number[], b: number[]) {
    return [a[0] - b[0], a[1] - b[1]]
  }
  function addPoints(a: number[], b: number[]) {
    return [a[0] + b[0], a[1] + b[1]]
  }
  function euclideanDistance(a: number[], b: number[]) {
    const x = a[0] - b[0], y = a[1] - b[1]
    return Math.sqrt(x * x + y * y)
  }
  function normalizePoint(point: number[], scale: number) {
    const length = Math.sqrt(point[0] * point[0] + point[1] * point[1])
    if (length === 0) return [0, 0]
    return [(point[0] / length) * scale, (point[1] / length) * scale]
  }
  function filterDotProduct(dotp: number) {
    if (lowerThreshold > Math.abs(dotp) || Math.abs(dotp) > upperThreshold) return dotp
    return 0
  }

  return Orthogonalize()
}
