// ==UserScript==
// @name         WME E40 Geometry
// @version      0.5.2
// @description  Setup POI geometry properties in one click
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e40/issues
// @match        https://www.waze.com/editor*
// @match        https://www.waze.com/*/editor*
// @match        https://beta.waze.com/editor*
// @match        https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @exclude      https://beta.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @require      https://greasyfork.org/scripts/450160-wme-bootstrap/code/WME-Bootstrap.js?version=1090054
// @require      https://greasyfork.org/scripts/450221-wme-base/code/WME-Base.js?version=1090055
// @require      https://greasyfork.org/scripts/450320-wme-ui/code/WME-UI.js?version=1091627
// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global $ */
/* global W */
/* global I18n */
/* global OpenLayers */
/* global WME, WMEBase, WMEUI, WMEUIHelper */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  // Script name, uses as unique index
  const NAME = 'E40'

  // Translations
  const TRANSLATION = {
    'en': {
      title: 'Geometry',
      description: 'Change geometry in the current view area',
      orthogonalize: 'Orthogonalize',
      simplify: 'Simplify',
      scale: 'Scale',
      copy: 'Copy',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    },
    'uk': {
      title: 'Геометрія',
      description: 'Змінити геометрію об’єктів у поточному розташуванні',
      orthogonalize: 'Вирівняти',
      simplify: 'Спростити',
      scale: 'Масштабувати',
      copy: 'Копіювати',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    },
    'ru': {
      title: 'Геометрия',
      description: 'Изменить геометрию объектов в текущем расположении',
      orthogonalize: 'Выровнять',
      simplify: 'Упростить',
      scale: 'Масштабировать',
      copy: 'Копировать',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    }
  }

  const STYLE =
    'button.waze-btn.e40 { margin: 0 4px 4px 0; padding: 2px; width: 42px; } ' +
    'button.waze-btn.e40:hover { box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 0 100px 100px rgba(255, 255, 255, 0.3); } ' +
    'p.e40-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(STYLE)

  const panelButtons = {
    A: {
      title: '🔲',
      description: I18n.t(NAME).orthogonalize,
      shortcut: 'S+49',
      callback: () => orthogonalize()
    },
    B: {
      title: '〽️',
      description: I18n.t(NAME).simplify,
      shortcut: 'S+50',
      callback: () => simplify()
    },
    C: {
      title: '500m²',
      description: I18n.t(NAME).scale,
      shortcut: 'S+51',
      callback: () => scaleSelected(500)
    },
    D: {
      title: '650m²',
      description: I18n.t(NAME).scale,
      shortcut: 'S+52',
      callback: () => scaleSelected(650)
    },
    E: {
      title: '>650',
      description: I18n.t(NAME).scale,
      shortcut: 'S+53',
      callback: () => scaleSelected(650, true)
    },
    F: {
      title: '<i class="fa fa-clone" aria-hidden="true"></i>',
      description: I18n.t(NAME).copy,
      shortcut: 'S+54',
      callback: () => copyPlaces()
    }
  }

  const tabButtons = {
    A: {
      title: '🔲',
      description: I18n.t(NAME).orthogonalize,
      shortcut: null,
      callback: () => orthogonalizeAll()
    },
    B: {
      title: '〽️',
      description: I18n.t(NAME).simplify,
      shortcut: null,
      callback: () => simplifyAll()
    },
    C: {
      title: '>500',
      description: I18n.t(NAME).scale,
      shortcut: null,
      callback: () => scaleAll(500, true)
    }
  }

  let WazeActionUpdateFeatureGeometry
  let WazeActionUpdateFeatureAddress
  let WazeFeatureVectorLandmark
  let WazeActionAddLandmark

  class E40 extends WMEBase {
    constructor (name) {
      super(name)

      this.helper = new WMEUIHelper(name)

      this.panel = this.helper.createPanel(I18n.t(name).title)
      this.panel.addButtons(panelButtons)

      if (W.loginManager.user.getRank() > 2) {
        this.tab = this.helper.createTab(
          I18n.t(name).title,
          I18n.t(name).description,
          {
            'icon': '<i class="w-icon panel-header-component-icon w-icon-polygon"></i>'
          }
        )
        this.tab.addButtons(tabButtons)
        this.tab.addText(
          'info',
          '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
        )
        this.tab.inject()
      }
    }

    /**
     * Handler for `place.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {W.model} model
     * @return {Null}
     */
    onPlace (event, element, model) {
      this.createPanel(event, element)
    }

    /**
     * Handler for `venues.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Array} models
     * @return {Null}
     */
    onVenues (event, element, models) {
      models = models.filter(el => !el.isPoint())
      if (models.length > 0) {
        this.createPanel(event, element)
      }
    }

    /**
     * Create panel with buttons
     * @param event
     * @param element
     */
    createPanel (event, element) {
      if (element.querySelector('div.form-group.e40')) {
        return
      }

      element.prepend(this.panel.html())
      this.updateLabel()
    }

    /**
     * Updated label
     */
    updateLabel () {
      let places = getSelectedPlaces()
      if (places.length === 0) {
        return
      }
      let info = []
      for (let i = 0; i < places.length; i++) {
        let selected = places[i]
        info.push(Math.round(selected.geometry.getGeodesicArea(W.map.getProjectionObject())) + 'm²')
      }
      let label = I18n.t(NAME).title
      if (info.length) {
        label += ' (' + info.join(', ') + ')'
      }

      document.querySelector('div.form-group.e40 label').innerText = label
    }
  }

  $(document).on('bootstrap.wme', () => {
    // Require Waze components
    WazeActionUpdateFeatureGeometry = require('Waze/Action/UpdateFeatureGeometry')
    WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')
    WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
    WazeActionAddLandmark = require('Waze/Action/AddLandmark')

    // Workaround for shortcuts title
    I18n.translations[I18n.currentLocale()].keyboard_shortcuts.groups.e40 = {
      description: I18n.t(NAME).title,
      members: []
    }

    let E40Instance = new E40(NAME)

    W.model.actionManager.events.register('afterundoaction', null, E40Instance.updateLabel)
    W.model.actionManager.events.register('afterclearactions', null, E40Instance.updateLabel)
    W.model.actionManager.events.register('afteraction', null, E40Instance.updateLabel)
  })

  /**
   * Get selected Area POI
   * @return {Array}
   */
  function getSelectedPlaces () {
    let selected
    selected = WME.getSelectedVenues()
    selected = selected.filter(el => !el.isPoint())
    return selected
  }

  // Scale selected place(s) to X m²
  function scaleSelected (x, orMore = false) {
    scaleArray(getSelectedPlaces(), x, orMore)
    return false
  }

  // Scale all places in the editor area to X m²
  function scaleAll (x = 650, orMore = true) {
    scaleArray(WME.getVenues().filter(el => !el.isPoint()), x, orMore)
    return false
  }

  function scaleArray (elements, x, orMore = false) {
    console.group(
      '%c' + NAME + ': 📏 %c try to scale ' + (elements.length) + ' element(s) to ' + x + 'm²',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i]
      try {
        let oldGeometry = selected.geometry.clone()
        let newGeometry = selected.geometry.clone()

        let scale = Math.sqrt((x + 5) / oldGeometry.getGeodesicArea(W.map.getProjectionObject()))
        if (scale < 1 && orMore) {
          continue
        }
        newGeometry.resize(scale, newGeometry.getCentroid())

        let action = new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, newGeometry)
        W.model.actionManager.add(action)
        total++
      } catch (e) {
        console.log('skipped', e)
      }
    }
    console.log(total + ' element(s) was scaled')
    console.groupEnd()
  }

  // Orthogonalize selected place(s)
  function orthogonalize () {
    orthogonalizeArray(getSelectedPlaces())
    return false
  }

  // Orthogonalize all places in the editor area
  function orthogonalizeAll () {
    // skip parking, natural and outdoors
    // TODO: make options for filters
    orthogonalizeArray(WME.getVenues(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']).filter(el => !el.isPoint()))
    return false
  }

  function orthogonalizeArray (elements) {
    console.group(
      '%c' + NAME + ': 🔲 %c try to orthogonalize ' + (elements.length) + ' element(s)',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    // skip points
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i]
      try {
        let oldGeometry = selected.geometry.clone()
        let newGeometry = orthogonalizeGeometry(selected.geometry.clone().components[0].components)

        if (!compare(oldGeometry.components[0].components, newGeometry)) {
          selected.geometry.components[0].components = [].concat(newGeometry)
          selected.geometry.components[0].clearBounds()

          let action = new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, selected.geometry)
          W.model.actionManager.add(action)
          total++
        }
      } catch (e) {
        console.log('skipped')
        console.log(e)
      }
    }
    console.log(total + ' element(s) was orthogonalized')
    console.groupEnd()
  }

  function orthogonalizeGeometry (geometry, threshold = 12) {
    let nomthreshold = threshold, // degrees within right or straight to alter
      lowerThreshold = Math.cos((90 - nomthreshold) * Math.PI / 180),
      upperThreshold = Math.cos(nomthreshold * Math.PI / 180)

    function Orthogonalize () {
      let nodes = geometry,
        points = nodes.slice(0, -1).map(function (n) {
          let p = n.clone().transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
          p.y = lat2latp(p.y)
          return p
        }),
        corner = { i: 0, dotp: 1 },
        epsilon = 1e-4,
        i, j, score, motions

      // Triangle
      if (nodes.length === 4) {
        for (i = 0; i < 1000; i++) {
          motions = points.map(calcMotion)

          let tmp = addPoints(points[corner.i], motions[corner.i])
          points[corner.i].x = tmp.x
          points[corner.i].y = tmp.y

          score = corner.dotp
          if (score < epsilon) {
            break
          }
        }

        let n = points[corner.i]
        n.y = latp2lat(n.y)
        let pp = n.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'))

        let id = nodes[corner.i].id
        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].id != id) {
            continue
          }

          nodes[i].x = pp.x
          nodes[i].y = pp.y
        }

        return nodes
      } else {
        let best,
          originalPoints = nodes.slice(0, -1).map(function (n) {
            let p = n.clone().transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
            p.y = lat2latp(p.y)
            return p
          })
        score = Infinity

        for (i = 0; i < 1000; i++) {
          motions = points.map(calcMotion)
          for (j = 0; j < motions.length; j++) {
            let tmp = addPoints(points[j], motions[j])
            points[j].x = tmp.x
            points[j].y = tmp.y
          }
          let newScore = squareness(points)
          if (newScore < score) {
            best = [].concat(points)
            score = newScore
          }
          if (score < epsilon) {
            break
          }
        }

        points = best

        for (i = 0; i < points.length; i++) {
          // only move the points that actually moved
          if (originalPoints[i].x !== points[i].x || originalPoints[i].y !== points[i].y) {
            let n = points[i]
            n.y = latp2lat(n.y)
            let pp = n.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'))

            let id = nodes[i].id
            for (j = 0; j < nodes.length; j++) {
              if (nodes[j].id != id) {
                continue
              }

              nodes[j].x = pp.x
              nodes[j].y = pp.y
            }
          }
        }

        // remove empty nodes on straight sections
        for (i = 0; i < points.length; i++) {
          let dotp = normalizedDotProduct(i, points)
          if (dotp < -1 + epsilon) {
            let id = nodes[i].id
            for (j = 0; j < nodes.length; j++) {
              if (nodes[j].id != id) {
                continue
              }

              nodes[j] = false
            }
          }
        }

        return nodes.filter(item => item !== false)
      }

      function calcMotion (b, i, array) {
        let a = array[(i - 1 + array.length) % array.length],
          c = array[(i + 1) % array.length],
          p = subtractPoints(a, b),
          q = subtractPoints(c, b),
          scale, dotp

        scale = 2 * Math.min(euclideanDistance(p, { x: 0, y: 0 }), euclideanDistance(q, { x: 0, y: 0 }))
        p = normalizePoint(p, 1.0)
        q = normalizePoint(q, 1.0)

        dotp = filterDotProduct(p.x * q.x + p.y * q.y)

        // nasty hack to deal with almost-straight segments (angle is closer to 180 than to 90/270).
        if (array.length > 3) {
          if (dotp < -0.707106781186547) {
            dotp += 1.0
          }
        } else if (dotp && Math.abs(dotp) < corner.dotp) {
          corner.i = i
          corner.dotp = Math.abs(dotp)
        }

        return normalizePoint(addPoints(p, q), 0.1 * dotp * scale)
      }
    }

    function lat2latp (lat) {
      return 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * (Math.PI / 180) / 2))
    }

    function latp2lat (a) {
      return 180 / Math.PI * (2 * Math.atan(Math.exp(a * Math.PI / 180)) - Math.PI / 2)
    }

    function squareness (points) {
      return points.reduce(function (sum, val, i, array) {
        let dotp = normalizedDotProduct(i, array)

        dotp = filterDotProduct(dotp)
        return sum + 2.0 * Math.min(Math.abs(dotp - 1.0), Math.min(Math.abs(dotp), Math.abs(dotp + 1)))
      }, 0)
    }

    function normalizedDotProduct (i, points) {
      let a = points[(i - 1 + points.length) % points.length],
        b = points[i],
        c = points[(i + 1) % points.length],
        p = subtractPoints(a, b),
        q = subtractPoints(c, b)

      p = normalizePoint(p, 1.0)
      q = normalizePoint(q, 1.0)

      return p.x * q.x + p.y * q.y
    }

    function subtractPoints (a, b) {
      return { x: a.x - b.x, y: a.y - b.y }
    }

    function addPoints (a, b) {
      return { x: a.x + b.x, y: a.y + b.y }
    }

    function euclideanDistance (a, b) {
      let x = a.x - b.x, y = a.y - b.y
      return Math.sqrt((x * x) + (y * y))
    }

    function normalizePoint (point, scale) {
      let vector = { x: 0, y: 0 }
      let length = Math.sqrt(point.x * point.x + point.y * point.y)
      if (length !== 0) {
        vector.x = point.x / length
        vector.y = point.y / length
      }

      vector.x *= scale
      vector.y *= scale

      return vector
    }

    function filterDotProduct (dotp) {
      if (lowerThreshold > Math.abs(dotp) || Math.abs(dotp) > upperThreshold) {
        return dotp
      }

      return 0
    }

    function isDisabled (nodes) {
      let points = nodes.slice(0, -1).map(function (n) {
        let p = n.toLonLat().transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
        return { x: p.lat, y: p.lon }
      })

      return squareness(points)
    }

    return Orthogonalize()
  }

  // Simplify selected place(s)
  function simplify (factor = 8) {
    simplifyArray(getSelectedPlaces(), factor)
    return false
  }

  // Simplify all places in the editor area
  function simplifyAll () {
    // skip parking, natural and outdoors
    // TODO: make options for filters
    simplifyArray(WME.getVenues(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']).filter(el => !el.isPoint()))
    return false
  }

  function simplifyArray (elements, factor = 8) {
    console.group(
      '%c' + NAME + ': 〽️ %c try to simplify ' + (elements.length) + ' element(s)',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i]
      try {
        let oldGeometry = selected.geometry.clone()
        let ls = new OpenLayers.Geometry.LineString(oldGeometry.components[0].components)
        ls = ls.simplify(factor)
        let newGeometry = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(ls.components))

        if (newGeometry.components[0].components.length < oldGeometry.components[0].components.length) {
          W.model.actionManager.add(new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, newGeometry))
          total++
        }
      } catch (e) {
        console.log('skipped', e)
      }
    }
    console.log(total + ' element(s) was simplified')
    console.groupEnd()
  }

  /**
   * Compare two polygons point-by-point
   *
   * @return boolean
   */
  function compare (geo1, geo2) {
    if (geo1.length !== geo2.length) {
      return false
    }
    for (let i = 0; i < geo1.length; i++) {
      if (Math.abs(geo1[i].x - geo2[i].x) > .1
        || Math.abs(geo1[i].y - geo2[i].y) > .1) {
        return false
      }
    }
    return true
  }

  /**
   * Copy selected places
   * Last of them will be chosen
   */
  function copyPlaces () {
    let venues = getSelectedPlaces()

    for (let i = 0; i < venues.length; i++) {
      copyPlace(venues[i])
    }
  }

  /**
   * Create copy for place
   * @param oldPlace
   */
  function copyPlace (oldPlace) {
    let newPlace = new WazeFeatureVectorLandmark
    newPlace.attributes.name = oldPlace.attributes.name + ' (copy)'
    newPlace.attributes.phone = oldPlace.attributes.phone
    newPlace.attributes.url = oldPlace.attributes.url
    newPlace.attributes.categories = [].concat(oldPlace.attributes.categories)
    newPlace.attributes.aliases = [].concat(oldPlace.attributes.aliases)
    newPlace.attributes.description = oldPlace.attributes.description
    newPlace.attributes.houseNumber = oldPlace.attributes.houseNumber
    newPlace.attributes.lockRank = oldPlace.attributes.lockRank
    newPlace.attributes.geometry = oldPlace.attributes.geometry.clone()

    if (oldPlace.attributes.geometry.toString().match(/^POLYGON/)) {
      for (let i = 0; i < newPlace.attributes.geometry.components[0].components.length - 1; i++) {
        newPlace.attributes.geometry.components[0].components[i].x += 5
        newPlace.attributes.geometry.components[0].components[i].y += 5
      }
    } else {
      // Geometry not used for points as is
      // But you can use select multiple venues, and then click "copy"
      newPlace.attributes.geometry.x += 5
      newPlace.attributes.geometry.y += 5
    }

    newPlace.attributes.services = [].concat(oldPlace.attributes.services)
    newPlace.attributes.openingHours = [].concat(oldPlace.attributes.openingHours)
    newPlace.attributes.streetID = oldPlace.attributes.streetID

    if (oldPlace.attributes.categories.includes('GAS_STATION')) {
      newPlace.attributes.brand = oldPlace.attributes.brand
    }

    if (oldPlace.attributes.categories.includes('PARKING_LOT')) {
      newPlace.attributes.categoryAttributes.PARKING_LOT = {}

      let attributes = oldPlace.attributes.categoryAttributes.PARKING_LOT
      if ((attributes.lotType != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.lotType = [].concat(oldPlace.attributes.categoryAttributes.PARKING_LOT.lotType)
      }
      if ((attributes.canExitWhileClosed != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.canExitWhileClosed = oldPlace.attributes.categoryAttributes.PARKING_LOT.canExitWhileClosed
      }
      if ((attributes.costType != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.costType = oldPlace.attributes.categoryAttributes.PARKING_LOT.costType
      }
      if ((attributes.estimatedNumberOfSpots != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.estimatedNumberOfSpots = oldPlace.attributes.categoryAttributes.PARKING_LOT.estimatedNumberOfSpots
      }
      if ((attributes.hasTBR != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.hasTBR = oldPlace.attributes.categoryAttributes.PARKING_LOT.hasTBR
      }
      if ((attributes.lotType != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.lotType = [].concat(oldPlace.attributes.categoryAttributes.PARKING_LOT.lotType)
      }
      if ((attributes.parkingType != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.parkingType = oldPlace.attributes.categoryAttributes.PARKING_LOT.parkingType
      }
      if ((attributes.paymentType != null)) {
        newPlace.attributes.categoryAttributes.PARKING_LOT.paymentType = [].concat(oldPlace.attributes.categoryAttributes.PARKING_LOT.paymentType)
      }
    }

    W.model.actionManager.add(new WazeActionAddLandmark(newPlace))
    W.selectionManager.setSelectedModels(newPlace)
  }

})()
