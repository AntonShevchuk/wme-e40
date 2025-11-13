// ==UserScript==
// @name         WME E40 Geometry
// @name:uk      WME 🇺🇦 E40 Geometry
// @name:ru      WME 🇺🇦 E40 Geometry
// @version      0.8.1
// @description  A script that allows aligning, scaling, and copying POI geometry
// @description:uk За допомогою цього скрипта ви можете легко змінювати площу та вирівнювати POI
// @description:ru Данный скрипт позволяет изменять площадь POI, выравнивать и копировать геометрию
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e40/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1691572/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1691071/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1688694/WME-UI.js
//
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js
// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global $, jQuery */
/* global I18n */
/* global WMEBase, WMEUI, WMEUIHelper */
/* global Container, Settings, SimpleCache, Tools */
/* global Node$1, Segment, Venue, VenueAddress, WmeSDK */
/* global turf */

(function () {
  'use strict'

  // Script name, uses as unique index
  const NAME = 'E40'

  // User level required for apply geometry for all entities in the view area
  const REQUIRED_LEVEL = 2

  // Translations
  const TRANSLATION = {
    'en': {
      title: 'POI Geometry',
      description: 'Change geometry in the current view area',
      warning: '⚠️ This option is available for editors with a rank higher than ' + REQUIRED_LEVEL,
      help: 'You can use the <strong>Keyboard shortcuts</strong> to apply the settings. It\'s more convenient than clicking on the buttons.',
      orthogonalize: 'Orthogonalize',
      smooth: 'Smooth',
      simplify: 'Simplify',
      scale: 'Scale',
      rotate: 'Rotate',
      copy: 'Copy',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    },
    'uk': {
      title: 'Геометрія POI',
      description: 'Змінити геометрію об’єктів у поточному розташуванні',
      warning: '⚠️ Ця опція доступна лише для редакторів з рангом вищім ніж ' + REQUIRED_LEVEL,
      help: 'Використовуйте <strong>гарячі клавіши</strong>, це значно швидше ніж використовувати кнопки',
      orthogonalize: 'Вирівняти',
      smooth: 'Згладити',
      simplify: 'Спростити',
      scale: 'Масштабувати',
      rotate: 'Повернути',
      copy: 'Копіювати',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    },
    'ru': {
      title: 'Геометрия POI',
      description: 'Изменить геометрию объектов в текущем расположении',
      warning: '⚠️ Эта опция доступна для редакторов с рангов выше ' + REQUIRED_LEVEL,
      help: 'Используйте <strong>комбинации клавиш</strong>, и не надо будет клацать кнопки',
      orthogonalize: 'Выровнять',
      smooth: 'Сгладить',
      simplify: 'Упростить',
      scale: 'Масштабировать',
      rotate: 'Повернуть',
      copy: 'Копировать',
      about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
    }
  }

  WMEUI.addTranslation(NAME, TRANSLATION)

  const STYLE =
    'button.waze-btn.e40 { margin: 0 4px 4px 0; padding: 2px; width: 45px; border: 1px solid #ddd; } ' +
    'p.e40-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }' +
    'p.e40-warning { color: #f77 }' +
    '#sidebar p.e40-blue { background-color:#0057B8;color:white;height:32px;text-align:center;line-height:32px;font-size:24px;margin:0; }' +
    '#sidebar p.e40-yellow { background-color:#FFDD00;color:black;height:32px;text-align:center;line-height:32px;font-size:24px;margin:0; }'

  WMEUI.addStyle(STYLE)

  // https://fontawesome.com/v4/icons/
  const panelButtons = {
    A: {
      title: '<i class="fa fa-circle-o" aria-hidden="true"></i>',
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
      shortcut: 'S+51',
      callback: () => simplify(0.00001)
    },
    D: {
      title: '3️⃣ 📐',
      description: I18n.t(NAME).simplify + ' (tolerance = 0.00003)',
      shortcut: 'S+52',
      callback: () => simplify(0.00003)
    },
    E: {
      title: '5️⃣ 📐',
      description: I18n.t(NAME).simplify + ' (tolerance = 0.00005)',
      shortcut: 'S+53',
      callback: () => simplify(0.00005)
    },
    F: {
      title: '<i class="fa fa-clone" aria-hidden="true"></i>',
      description: I18n.t(NAME).copy,
      shortcut: 'S+54',
      callback: () => copyPlaces()
    },
    G: {
      title: '<i class="fa fa-repeat" aria-hidden="true"></i>',
      description: I18n.t(NAME).rotate,
      shortcut: 'S+55',
      callback: () => enablePolygonRotation()
    },
    H: {
      title: '<i class="fa fa-expand" aria-hidden="true"></i>',
      description: I18n.t(NAME).scale,
      shortcut: 'S+56',
      callback: () => enablePolygonResize()
    },
    I: {
      title: '500m²',
      description: I18n.t(NAME).scale + ' 500m²',
      shortcut: 'S+57',
      callback: () => scaleSelected(500)
    },
    J: {
      title: '650m²',
      description: I18n.t(NAME).scale + ' 650m²',
      shortcut: 'S+58',
      callback: () => scaleSelected(650)
    },
    K: {
      title: '650+',
      description: I18n.t(NAME).scale + ' 650+',
      shortcut: 'S+59',
      callback: () => scaleSelected(650, true)
    },

  }

  const tabButtons = {
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

  class E40 extends WMEBase {
    constructor (name, tabButtons, panelButtons) {
      super(name)

      this.initHelper()

      this.initTab(tabButtons)

      this.initPanel(panelButtons)

      this.initShortcuts(panelButtons)
    }

    initHelper() {
      this.helper = new WMEUIHelper(this.name)
    }

    initTab (buttons) {
      let tab = this.helper.createTab(
        I18n.t(this.name).title,
        {
          sidebar: this.wmeSDK.Sidebar,
          image: GM_info.script.icon
        }
      )
      tab.addText('description', I18n.t(this.name).description)
      if (this.wmeSDK.State.getUserInfo().rank >= REQUIRED_LEVEL) {
        tab.addButtons(buttons)
      } else {
        tab.addText('warning', I18n.t(this.name).warning)
      }
      tab.addDiv('text', I18n.t(this.name).help)
      tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )
      tab.addText('blue', 'made in')
      tab.addText('yellow', 'Ukraine')
      tab.inject()
    }

    initPanel (buttons) {
      this.panel = this.helper.createPanel(
        I18n.t(this.name).title
      )
      this.panel.addButtons(buttons)
    }

    initShortcuts (buttons) {
      for (let btn in buttons) {
        if (buttons.hasOwnProperty(btn)) {
          let button = buttons[btn]
          if (button.shortcut) {
            let shortcut = {
              callback: button.callback,
              description: button.description,
              shortcutId: this.id + '-' + btn,
              shortcutKeys: button.shortcut,
            };

            if (this.wmeSDK.Shortcuts.areShortcutKeysInUse({ shortcutKeys: shortcut.shortcutKeys })) {
              this.log('Shortcut already in use')
              shortcut.shortcutKeys = null
            }
            this.wmeSDK.Shortcuts.createShortcut(shortcut);
          }
        }
      }
    }

    /**
     * Handler for `place.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Venue} model
     */
    onPlace (event, element, model) {
      if (this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: model.id })) {
        this.createPanel(event, element)
      }
    }

    /**
     * Handler for `venues.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Venue[]} models
     * @return {Null}
     */
    onVenues (event, element, models) {
      models = models.filter(model => !model.isResidential
        && this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: model.id }))

      if (models.length > 0) {
        this.createPanel(event, element)
      }
    }

    /**
     * @param {String[]} except
     * @return {Venue[]} models
     */
    getAllPlaces(except = []) {
      let venues = this.getAllVenues(except)
      return venues.filter(venue => venue.geometry.type === 'Polygon')
    }

    /**
     * @return {Venue[]} models
     */
    getSelectedPlaces() {
      let venues = this.getSelectedVenues()
      return venues.filter(venue => venue.geometry.type === 'Polygon')
    }

    /**
     * Create panel with buttons
     * @param event
     * @param {HTMLElement} element
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
      let places = this.getSelectedPlaces()

      if (places.length === 0) {
        return
      }
      let info = []
      for (let i = 0; i < places.length; i++) {
        info.push(Math.round(turf.area(places[i].geometry)) + 'm²')
      }
      let label = I18n.t(NAME).title
      if (info.length) {
        label += ' (' + info.join(', ') + ')'
      }

      let elm = document.querySelector('div.form-group.e40 wz-label')
      if (elm) elm.innerText = label
    }
  }

  let E40Instance

  $(document).on('bootstrap.wme', () => {
    E40Instance = new E40(NAME, tabButtons, panelButtons)

    E40Instance.wmeSDK.Events.trackDataModelEvents({ dataModelName: "venues" })
    E40Instance.wmeSDK.Events.on({
      eventName: "wme-data-model-objects-changed",
      eventHandler: ({dataModelName, objectIds}) => {
        // console.log(dataModelName)
        // console.log(objectIds)
        E40Instance.updateLabel()
      }
    });
  })

  /**
   * Scale selected place(s) to X m²
   * @param {Number} x square meters
   * @param {Boolean} orMore flag
   * @return {boolean}
   */
  function scaleSelected (x, orMore = false) {
    scaleArray(E40Instance.getSelectedPlaces(), x, orMore)
    return false
  }

  /**
   * Scale all places in the editor area to X m²
   * @param {Number} x square meters
   * @param {Boolean} orMore flag
   * @return {boolean}
   */
  function scaleAll (x = 650, orMore = true) {
    scaleArray(E40Instance.getAllPlaces(), x, orMore)
    return false
  }

  /**
   * Scale places to X m²
   * @param {Venue[]} elements
   * @param {Number} x square meters
   * @param {Boolean} orMore flag
   */
  function scaleArray (elements, x, orMore = false) {
    console.groupCollapsed(
      '%c' + NAME + ': 📏 %c try to scale ' + (elements.length) + ' element(s) to ' + x + 'm²',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let scale = Math.sqrt((x + 5) / turf.area(elements[i].geometry))
        if (scale < 1 && orMore) {
          continue
        }

        let geometry = turf.transformScale(elements[i].geometry, scale)

        E40Instance.wmeSDK.DataModel.Venues.updateVenue({
          venueId: elements[i].id, geometry
        })

        total++
      } catch (e) {
        console.log('skipped', e)
      }
    }
    console.log(total + ' element(s) was scaled')
    console.groupEnd()
  }

  /**
   * Orthogonalize selected place(s)
   * @return {boolean}
   */
  function orthogonalize () {
    orthogonalizeArray(E40Instance.getSelectedPlaces())
    return false
  }

  /**
   * Orthogonalize all places in the editor area
   * @return {boolean}
   */
  function orthogonalizeAll () {
    // skip parking, natural and outdoors
    // TODO: make options for filters
    orthogonalizeArray(
      E40Instance.getAllPlaces(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES'])
    )
    return false
  }

  /**
   * Orthogonalize place(s)
   * @param {Venue[]} elements
   */
  function orthogonalizeArray (elements) {
    console.groupCollapsed(
      '%c' + NAME + ': ⬛️ %c try to orthogonalize ' + (elements.length) + ' element(s)',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    // skip points
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = orthogonalizeGeometry(elements[i].geometry)

        // console.log(elements[i].geometry.coordinates[0], geometry.coordinates[0])

        if (!compare(elements[i].geometry.coordinates[0], geometry.coordinates[0])) {
          E40Instance.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
          total++
        }
      } catch (e) {
        console.log('skipped', e)
      }
    }
    console.log(total + ' element(s) was orthogonalized')
    console.groupEnd()
  }

  /**
   * Orthogonalizes a polygon's geometry by iteratively snapping angles
   * to be closer to 90 or 180 degrees.
   *
   * This is a refactor of your original algorithm to use Turf.js for
   * projections and data handling.
   *
   * @param {Feature<Polygon>|Polygon} geojsonPolygon The polygon to modify.
   * @param {number} [threshold=12] Degrees within 90 or 180 to "snap".
   * @returns {Feature<Polygon>} A new polygon with snapped vertices.
   */
  function orthogonalizeGeometry(geojsonPolygon, threshold = 12) {

    // --- Threshold setup (from original) ---
    const nomThreshold = threshold; // degrees within right or straight to alter
    const lowerThreshold = Math.cos((90 - nomThreshold) * Math.PI / 180);
    const upperThreshold = Math.cos(nomThreshold * Math.PI / 180);

    // --- Vector Math Helpers (unchanged from original) ---
    function subtractPoints(a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }
    function addPoints(a, b) {
      return { x: a.x + b.x, y: a.y + b.y };
    }
    function euclideanDistance(a, b) {
      let x = a.x - b.x, y = a.y - b.y;
      return Math.sqrt((x * x) + (y * y));
    }
    function normalizePoint(point, scale) {
      let vector = { x: 0, y: 0 };
      let length = Math.sqrt(point.x * point.x + point.y * point.y);
      if (length !== 0) {
        vector.x = point.x / length;
        vector.y = point.y / length;
      }
      vector.x *= scale;
      vector.y *= scale;
      return vector;
    }

    // --- Algorithm Helpers (unchanged from original) ---
    function filterDotProduct(dotp) {
      if (lowerThreshold > Math.abs(dotp) || Math.abs(dotp) > upperThreshold) {
        return dotp;
      }
      return 0;
    }

    function normalizedDotProduct(i, points) {
      let a = points[(i - 1 + points.length) % points.length],
        b = points[i],
        c = points[(i + 1) % points.length],
        p = subtractPoints(a, b),
        q = subtractPoints(c, b);

      p = normalizePoint(p, 1.0);
      q = normalizePoint(q, 1.0);

      return p.x * q.x + p.y * q.y;
    }

    function squareness(points) {
      return points.reduce(function (sum, val, i, array) {
        let dotp = normalizedDotProduct(i, array);
        dotp = filterDotProduct(dotp);
        return sum + 2.0 * Math.min(Math.abs(dotp - 1.0), Math.min(Math.abs(dotp), Math.abs(dotp + 1)));
      }, 0);
    }

    // --- Core iterative function, rewritten to use Turf ---
    function Orthogonalize(polygon) {
      // 1. Project to Mercator (EPSG:3857) to work with planar {x, y} coordinates
      const projectedPoly = turf.toMercator(polygon);
      const coords = turf.getCoords(projectedPoly)[0];

      // 2. Convert to algorithm's {x, y} format, remove closing point
      let points = coords.slice(0, -1).map(c => ({ x: c[0], y: c[1] }));

      let corner = { i: 0, dotp: 1 };
      const epsilon = 1e-4;
      let i, j, score, motions;

      // This helper must be in this scope to access `corner`
      function calcMotion(b, i, array) {
        let a = array[(i - 1 + array.length) % array.length],
          c = array[(i + 1) % array.length],
          p = subtractPoints(a, b),
          q = subtractPoints(c, b),
          scale, dotp;

        scale = 2 * Math.min(euclideanDistance(p, { x: 0, y: 0 }), euclideanDistance(q, { x: 0, y: 0 }));
        p = normalizePoint(p, 1.0);
        q = normalizePoint(q, 1.0);

        dotp = filterDotProduct(p.x * q.x + p.y * q.y);

        // Nasty hack from original
        if (array.length > 3) {
          if (dotp < -0.707106781186547) {
            dotp += 1.0;
          }
        } else if (dotp && Math.abs(dotp) < corner.dotp) {
          corner.i = i;
          corner.dotp = Math.abs(dotp);
        }
        return normalizePoint(addPoints(p, q), 0.1 * dotp * scale);
      }

      // 3. Run the iterative algorithm

      // --- Handle 3-point case (Triangle) ---
      // (Original checks nodes.length === 4, which is 3 unique points)
      if (points.length === 3) {
        for (i = 0; i < 1000; i++) {
          motions = points.map(calcMotion);

          // Only move the "sharpest" corner
          let tmp = addPoints(points[corner.i], motions[corner.i]);
          points[corner.i].x = tmp.x;
          points[corner.i].y = tmp.y;

          score = corner.dotp;
          if (score < epsilon) {
            break;
          }
        }
      }
      // --- Handle N-point case ---
      else {
        let best;
        score = Infinity;

        for (i = 0; i < 1000; i++) {
          motions = points.map(calcMotion);
          for (j = 0; j < motions.length; j++) {
            let tmp = addPoints(points[j], motions[j]);
            points[j].x = tmp.x;
            points[j].y = tmp.y;
          }

          let newScore = squareness(points);
          if (newScore < score) {
            best = points.map(p => ({ ...p })); // Store a copy of the best points
            score = newScore;
          }
          if (score < epsilon) {
            break;
          }
        }
        points = best;
      }

      // 4. Remove collinear points (original's final loop)
      let finalCoords = [];
      if (points) {
        for (i = 0; i < points.length; i++) {
          let dotp = normalizedDotProduct(i, points);
          // if angle is not ~180 degrees, keep the point
          if (dotp > -1 + epsilon) {
            finalCoords.push([points[i].x, points[i].y]);
          }
        }
      } else {
        // Algorithm failed or points was undefined
        return polygon;
      }

      // 5. Convert back to GeoJSON
      if (finalCoords.length < 3) {
        console.warn("Orthogonalization failed, returning original polygon.");
        return polygon; // Algorithm failed
      }

      finalCoords.push(finalCoords[0]); // Close the polygon ring

      // Create a new polygon from the modified (and still projected) coords
      const newProjectedPoly = turf.polygon([finalCoords]);

      // Project back to WGS84 (lat/lon)
      const newGeoJsonPoly = turf.toWgs84(newProjectedPoly);

      // Preserve properties from the original
      newGeoJsonPoly.properties = turf.getType(geojsonPolygon) === 'Feature' ?
        geojsonPolygon.properties : {};

      return newGeoJsonPoly;
    }

    // --- Entry point of the main function ---
    let polygon = Orthogonalize(geojsonPolygon);
    return polygon.geometry
  }

  /**
   * Smooth selected place(s)
   * @return {boolean}
   */
  function smooth () {
    smoothArray(
      E40Instance.getSelectedPlaces()
    )
    return false
  }

  /**
   * Smooth place(s)
   * @param {Venue[]} elements
   */
  function smoothArray (elements) {
    console.groupCollapsed(
      '%c' + NAME + ': ⚫️ %c try to smooth ' + (elements.length) + ' element(s)',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = turf.polygonSmooth(elements[i].geometry).features[0].geometry;

        if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
          E40Instance.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
          total++
        }
      } catch (e) {
        console.log('skipped', e)
      }
    }
    console.log(total + ' element(s) was smoothed')
    console.groupEnd()
  }

  /**
   * Simplify selected place(s)
   * @param {Number} tolerance
   * @return {boolean}
   */
  function simplify (tolerance = 0.00001) {
    simplifyArray(
      E40Instance.getSelectedPlaces(), tolerance
    )
    return false
  }

  /**
   * Simplify all places in the editor area
   * @param {Number} tolerance
   * @return {boolean}
   */
  function simplifyAll (tolerance = 0.00001) {
    // skip parking, natural and outdoors
    simplifyArray(
      E40Instance.getAllPlaces(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']),
      tolerance
    )
    return false
  }

  /**
   * Simplify place(s)
   * @param {Venue[]} elements
   * @param {Number} tolerance
   */
  function simplifyArray (elements, tolerance = 0.00001) {
    console.groupCollapsed(
      '%c' + NAME + ': < tolerance=' + tolerance + ' > %c try to simplify ' + (elements.length) + ' element(s)',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = turf.simplify(elements[i].geometry, { tolerance })

        if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
          E40Instance.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
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
   * Copy selected places
   * Last of them will be chosen
   */
  function copyPlaces () {
    let venues = E40Instance.getSelectedPlaces()

    for (let i = 0; i < venues.length; i++) {
      copyPlace(venues[i])
    }
  }

  /**
   * Compare two polygons point-by-point
   *
   * @param {Array} coordinates1
   * @param {Array} coordinates2
   * @return boolean
   */
  function compare (coordinates1, coordinates2) {
    if (coordinates1.length !== coordinates2.length) {
      return false
    }
    for (let i = 0; i < coordinates1.length; i++) {
      if (Math.abs(coordinates1[i][0] - coordinates2[i][0]) > .00001
        || Math.abs(coordinates1[i][1] - coordinates2[i][1]) > .00001) {
        return false
      }
    }
    return true
  }

  /**
   * wmeSDK.Map.enablePolygonResize()
   */
  function enablePolygonResize () {
    console.log('%c' + NAME + ': %c enable resize')
    E40Instance.wmeSDK.Map.enablePolygonResize()
  }

  /**
   * wmeSDK.Map.enablePolygonRotation()
   */
  function enablePolygonRotation() {
    console.log('%c' + NAME + ': %c enable rotation')
    E40Instance.wmeSDK.Map.enablePolygonRotation()
  }

  /**
   * Create copy for place
   * @param {Venue} venue
   */
  function copyPlace (venue) {
    console.log(
      '%c' + NAME + ': %c created a copy of the POI ' + venue.name,
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )

    let geometry = turf.transformTranslate(venue.geometry, 0.01, 0.005)

    let venueId = E40Instance.wmeSDK.DataModel.Venues.addVenue(
      {
        category: venue.categories[0],
        geometry: geometry
      }
    )

    let newVenue = {
      // isAdLocked: venue.isAdLocked,
      // isResidential: venue.isResidential,
      name: venue.name + ' (copy)',
      venueId: String(venueId),
    }

    E40Instance.wmeSDK.DataModel.Venues.updateVenue(newVenue)

    let address = E40Instance.wmeSDK.DataModel.Venues.getAddress( { venueId: venue.id } )

    if (address?.street?.id) {
      E40Instance.wmeSDK.DataModel.Venues.updateAddress(
        {
          venueId: String(venueId),
          streetId: address.street.id,
        }
      )
    }
  }

})()
