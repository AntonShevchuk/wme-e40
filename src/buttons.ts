import { NAME } from './translations'
import { smooth, orthogonalize, simplify, copyPlaces, enablePolygonRotation, enablePolygonResize, scale, circle, square, orthogonalizeAll, simplifyAll, scaleAll } from './helpers'

// https://fontawesome.com/v4/icons/
export function getPlaceButtons() {
  return {
    A: {
      title: '<i class="fa fa-circle-thin" aria-hidden="true"></i>',
      description: I18n.t(NAME).smooth,
      shortcut: 'S+49',
      callback: () => smooth()
    },
    B: {
      title: '<i class="fa fa-square-o" aria-hidden="true"></i>',
      description: I18n.t(NAME).orthogonalize,
      shortcut: 'S+50',
      callback: () => orthogonalize()
    },
    C: {
      title: '1️⃣ 📐',
      description: I18n.t(NAME).simplify + ' (tolerance = 0.00001)',
      shortcut: null,
      callback: () => simplify(0.00001)
    },
    D: {
      title: '3️⃣ 📐',
      description: I18n.t(NAME).simplify + ' (tolerance = 0.00003)',
      shortcut: null,
      callback: () => simplify(0.00003)
    },
    E: {
      title: '5️⃣ 📐',
      description: I18n.t(NAME).simplify + ' (tolerance = 0.00005)',
      shortcut: null,
      callback: () => simplify(0.00005)
    },
    F: {
      title: '<i class="fa fa-clone" aria-hidden="true"></i>',
      description: I18n.t(NAME).copy,
      shortcut: null,
      callback: () => copyPlaces()
    },
    G: {
      title: '<i class="fa fa-repeat" aria-hidden="true"></i>',
      description: I18n.t(NAME).rotate,
      shortcut: 'S+51',
      callback: () => enablePolygonRotation()
    },
    H: {
      title: '<i class="fa fa-expand" aria-hidden="true"></i>',
      description: I18n.t(NAME).scale,
      shortcut: 'S+52',
      callback: () => enablePolygonResize()
    },
    I: {
      title: '500m²',
      description: I18n.t(NAME).scale + ' 500m²',
      shortcut: 'S+53',
      callback: () => scale(500)
    },
    J: {
      title: '650m²',
      description: I18n.t(NAME).scale + ' 650m²',
      shortcut: 'S+54',
      callback: () => scale(650)
    },
    K: {
      title: '650+',
      description: I18n.t(NAME).scale + ' 650+',
      shortcut: 'S+55',
      callback: () => scale(650, true)
    },
  }
}

export function getPointButtons() {
  return {
    M: {
      title: '<i class="fa fa-circle-thin fa-2x" aria-hidden="true"></i> 500m²',
      description: I18n.t(NAME).circle,
      shortcut: null,
      callback: () => circle(503, 32)
    },
    N: {
      title: '<i class="fa fa-circle-thin fa-2x" aria-hidden="true"></i> 650m²',
      description: I18n.t(NAME).circle,
      shortcut: null,
      callback: () => circle(651, 64)
    },
    O: {
      title: '<i class="fa fa-circle-thin fa-2x" aria-hidden="true"></i> R=20m',
      description: I18n.t(NAME).circle,
      shortcut: null,
      callback: () => circle(1256.64, 64)
    },
    P: {
      title: '<i class="fa fa-square-o fa-2x" aria-hidden="true"></i> 500m²',
      description: I18n.t(NAME).square,
      shortcut: null,
      callback: () => square(500)
    },
    R: {
      title: '<i class="fa fa-square-o fa-2x" aria-hidden="true"></i> 650m²',
      description: I18n.t(NAME).square,
      shortcut: null,
      callback: () => square(650)
    },
    S: {
      title: '<i class="fa fa-square-o fa-2x" aria-hidden="true"></i> 1000m²',
      description: I18n.t(NAME).square,
      shortcut: null,
      callback: () => square(1000)
    },
  }
}

export function getTabButtons() {
  return {
    A: {
      title: '<i class="fa fa-square-o" aria-hidden="true"></i>',
      description: I18n.t(NAME).orthogonalize,
      callback: () => orthogonalizeAll()
    },
    B: {
      title: '1️⃣ 📐',
      description: I18n.t(NAME).simplify,
      callback: () => simplifyAll(0.00001)
    },
    C: {
      title: '3️⃣ 📐',
      description: I18n.t(NAME).simplify,
      callback: () => simplifyAll(0.00003)
    },
    D: {
      title: '5️⃣ 📐',
      description: I18n.t(NAME).simplify,
      callback: () => simplifyAll(0.00005)
    },
    E: {
      title: '500+',
      description: I18n.t(NAME).scale + ' 500m²+',
      callback: () => scaleAll(500, true)
    }
  }
}
