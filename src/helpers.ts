import { NAME } from './translations'

let E40Instance: any

export function setE40Instance(instance: any) {
  E40Instance = instance
}

/**
 * Scale selected place(s) to X m²
 * @param {Number} x square meters
 * @param {Boolean} orMore flag
 * @return {boolean}
 */
export function scale (x: number, orMore = false) {
  E40Instance.scale(E40Instance.getSelectedPlaces(), x, orMore)
  return false
}

/**
 * Scale all places in the editor area to X m²
 * @param {Number} x square meters
 * @param {Boolean} orMore flag
 * @return {boolean}
 */
export function scaleAll (x = 650, orMore = true) {
  E40Instance.scale(E40Instance.getAllPlaces(), x, orMore)
  return false
}

/**
 * Orthogonalize selected place(s)
 * @return {boolean}
 */
export function orthogonalize () {
  E40Instance.orthogonalize(
    E40Instance.getSelectedPlaces()
  )
  return false
}

/**
 * Orthogonalize all places in the editor area
 * @return {boolean}
 */
export function orthogonalizeAll () {
  // skip parking, natural and outdoors
  // TODO: make options for filters
  E40Instance.orthogonalize(
    E40Instance.getAllPlaces([
      'CAMPING_TRAILER_PARK',
      'FOREST_GROVE',
      'JUNCTION_INTERCHANGE',
      'NATURAL_FEATURES',
      'OUTDOORS',
      'PARKING_LOT',
      'PLAYGROUND',
    ])
  )
  return false
}

/**
 * Smooth selected place(s)
 * @return {boolean}
 */
export function smooth () {
  E40Instance.smooth(
    E40Instance.getSelectedPlaces()
  )
  return false
}

/**
 * Simplify selected place(s)
 * @param {Number} tolerance
 * @return {boolean}
 */
export function simplify (tolerance = 0.00001) {
  E40Instance.simplify(
    E40Instance.getSelectedPlaces(),
    tolerance
  )
  return false
}

/**
 * Simplify all places in the editor area
 * @param {Number} tolerance
 * @return {boolean}
 */
export function simplifyAll (tolerance = 0.00001) {
  // skip parking, natural and outdoors
  E40Instance.simplify(
    E40Instance.getAllPlaces(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']),
    tolerance
  )
  return false
}

/**
 * Transform the Point to circle place
 * @param {Number} area in square meters
 * @param {Number} steps
 */
export function circle (area: number, steps = 64) {
  E40Instance.circle(
    E40Instance.getSelectedVenues(),
    area,
    steps
  )
  return false
}

/**
 * Transform the Point to square place
 * @param {Number} area in square meters
 */
export function square (area: number) {
  E40Instance.square(
    E40Instance.getSelectedVenues(),
    area
  )
  return false
}

/**
 * Copy selected places
 * Last of them will be chosen
 */
export function copyPlaces () {
  let venues = E40Instance.getSelectedPlaces()
  let ids = []
  for (let i = 0; i < venues.length; i++) {
    let id = E40Instance.copyPlace(venues[i])
    ids.push(id)
  }

  E40Instance.selectVenues(ids)
}

/**
 * wmeSDK.Map.enablePolygonResize()
 */
export function enablePolygonResize () {
  console.log(
    '%c' + NAME + ': %cenable resize for Polygon',
    'color: #0DAD8D; font-weight: bold',
    'color: dimgray; font-weight: normal'
  )
  let places = E40Instance.getSelectedPlaces()
  if (places.length) {
    E40Instance.wmeSDK.Map.enablePolygonResize()
  }
}

/**
 * wmeSDK.Map.enablePolygonRotation()
 */
export function enablePolygonRotation() {
  console.log(
    '%c' + NAME + ': %cenable rotation for Polygon',
    'color: #0DAD8D; font-weight: bold',
    'color: dimgray; font-weight: normal'
  )
  let places = E40Instance.getSelectedPlaces()
  if (places.length) {
    E40Instance.wmeSDK.Map.enablePolygonRotation()
  }
}
