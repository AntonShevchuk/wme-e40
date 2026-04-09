import { NAME } from './name'
import { REQUIRED_LEVEL } from './translations'
import { TYPES } from './types'
import { layerConfig } from './layers'
import { simplifyPolygon, normalizeRightAngles, createCirclePolygon, createSquarePolygon } from './geometry'

export class E40 extends WMEBase {
  placePanel: any
  pointPanel: any

  constructor (name: string, settings: any, tabButtons: any, placeButtons: any, pointButtons: any) {
    super(name, settings)

    this.initTab(tabButtons)

    this.initPlacePanel(placeButtons)

    this.initShortcuts(placeButtons)

    this.initPointPanel(pointButtons)

    this.initLayer()

    this.initHandlers()
  }

  /**
   * Initialize the tab with buttons
   * @param {Object} buttons
   */
  initTab (buttons: any) {
    let tab = this.helper.createTab(
      WMEUI.t(NAME).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )

    tab.addText('description', WMEUI.t(NAME).description)

    if (this.wmeSDK.State.getUserInfo().rank >= REQUIRED_LEVEL) {
      tab.addButtons(buttons)
    } else {
      tab.addText('warning', WMEUI.t(NAME).warning)
    }

    /** @type {WMEUIHelperFieldset} */
    let fsOptions = this.helper.createFieldset(WMEUI.t(NAME).options.title)
    let options = this.settings.get('options')
    let checkboxes: Record<string, any> = {}
    for (let item in options) {
      if (options.hasOwnProperty(item)) {
        checkboxes[item] = {
          title: WMEUI.t(NAME).options[item],
          callback: (event: any) => {
            this.settings.set('options', item, event.target.checked)
            if (item === 'navigationPointOnHover') {
              event.target.checked ? this.initHoverHandlers() : this.destroyHoverHandlers()
            }
          },
          checked: this.settings.get('options', item),
        }
      }
    }
    fsOptions.addCheckboxes(checkboxes)
    tab.addElement(fsOptions)

    tab.addDiv('text', WMEUI.t(NAME).help)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )
    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')
    tab.inject()
  }

  initPlacePanel (buttons: any) {
    this.placePanel = this.helper.createPanel(
      WMEUI.t(NAME).title
    )
    this.placePanel.addButtons(buttons)
  }

  initPointPanel (buttons: any) {
    this.pointPanel = this.helper.createPanel(
      WMEUI.t(NAME).title
    )
    this.pointPanel.addButtons(buttons)
  }

  initShortcuts (buttons: any) {
    for (let btn in buttons) {
      if (buttons.hasOwnProperty(btn)) {
        let button = buttons[btn]
        if (button.hasOwnProperty('shortcut')) {
          this.createShortcut(btn, button.description, button.shortcut, button.callback)
        }
      }
    }
  }

  initLayer () {
    this.wmeSDK.Map.addLayer({
      layerName: this.name,
      styleRules: layerConfig.styleRules,
      styleContext: layerConfig.styleContext
    });
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
  }

  initHandlers () {
    this.wmeSDK.Events.trackDataModelEvents({ dataModelName: "venues" });
    this.wmeSDK.Events.on({
      eventName: "wme-data-model-objects-changed",
      eventHandler: ({dataModelName, objectIds}: any) => {
        this.refreshPanel()

        let selected = this.getSelectedVenue()

        if (
          dataModelName === 'venues'
          && selected
          && objectIds.length > 0
          && objectIds.indexOf(selected.id) !== -1
          && this.settings.get('options', 'navigationPoint')
        ) {
          this.removeVectors()
          this.showVector(selected.id)
        }
      }
    });

    if (this.settings.get('options', 'navigationPointOnHover')) {
      this.initHoverHandlers()
    }
  }

  onMouseEnter = ({ featureId }: any) => {
    this.showVector(featureId)
  }

  onMouseLeave = ({ featureId }: any) => {
    let selected = this.getSelectedVenue()
    if (selected?.id !== featureId) {
      this.removeVector(
        this.wmeSDK.DataModel.Venues.getById({ venueId: featureId })
      )
    }
  }

  initHoverHandlers () {
    this.wmeSDK.Events.trackLayerEvents({ layerName: "venues" })
    this.wmeSDK.Events.on({ eventName: "wme-layer-feature-mouse-enter", eventHandler: this.onMouseEnter })
    this.wmeSDK.Events.on({ eventName: "wme-layer-feature-mouse-leave", eventHandler: this.onMouseLeave })
  }

  destroyHoverHandlers () {
    this.wmeSDK.Events.off({ eventName: "wme-layer-feature-mouse-enter", eventHandler: this.onMouseEnter })
    this.wmeSDK.Events.off({ eventName: "wme-layer-feature-mouse-leave", eventHandler: this.onMouseLeave })
    this.wmeSDK.Events.stopLayerEventsTracking({ layerName: "venues" })
  }

  showVector (featureId: any) {
    let venue = this.wmeSDK.DataModel.Venues.getById({ venueId : featureId })

    let center: any, entrance: any, intersection: any, intersectionDistance: any

    if (venue.geometry.type === 'Polygon') {
      center = turf.centroid(venue.geometry).geometry.coordinates
    } else {
      center = venue.geometry.coordinates
    }

    let segments = this.wmeSDK.DataModel.Segments.getAll()
    let except = [TYPES.boardwalk, TYPES.stairway, TYPES.railroad, TYPES.runway]

    segments = segments.filter((segment: any) => except.indexOf(segment.roadType) === -1)

    if (venue.navigationPoints.length) {

      for (let i = 0; i < venue.navigationPoints.length; i++) {
        let point = venue.navigationPoints[i].point.coordinates
        let nearestPoint = this.findNearestPoint(segments, point)

        this.createVector(featureId + '_' + i, center, point, (i === 0) ? 'styleDashedLine' : 'styleDashedSecondaryLine')
        this.createVector(featureId + '_' + i, point, nearestPoint, (i === 0) ? 'styleLine' : 'styleSecondaryLine')

        if (i === 0
          && !this.settings.get('options', 'navigationPointAll')) {
          break
        }
      }

    } else {
      let nearestPoint = this.findNearestPoint(segments, center)
      this.createVector(featureId, center, nearestPoint, 'styleLine')
    }
    this.showLayer()
  }

  /**
   * Finds the nearest point to a given point from a set of segments.
   *
   * @param {Array} segments - An array of segments where each segment contains a geometry property representing a line.
   * @param {Object} point - The reference point to find the nearest point to.
   * @return {Array} An array representing the coordinates of the nearest point to the given point.
   */
  findNearestPoint(segments: any, point: any) {
    let nearestPoint: any, nearestPointCoordinates: any[] = [], nearestPointDistance: any

    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i]

      try {
        nearestPoint = turf.nearestPointOnLine(segment.geometry, point)

        let distance = turf.distance(
          nearestPoint,
          point,
          {
            units: 'meters'
          }
        )

        if (nearestPointDistance === undefined || distance < nearestPointDistance) {
          nearestPointDistance = distance
          nearestPointCoordinates = nearestPoint.geometry.coordinates
        }
      } catch (e) {
        this.log('Error while finding nearest point')
      }
    }

    return nearestPointCoordinates
  }

  /**
   * Create the vector by coordinates
   * @param {String} featureId
   * @param {[Number,Number]} from coordinates
   * @param {[Number,Number]} to coordinates
   * @param {String} styleName style name
   */
  createVector (featureId: any, from: any, to: any, styleName = 'styleLine') {
    const A = turf.point(from, { styleName: "styleNode" }, { id: `${styleName}_from_${featureId}` });
    const B = turf.point(to, { styleName: "styleNode" }, { id: `${styleName}_to_${featureId}` });

    this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: A });
    this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: B });

    const lineCoordinates = [
      A.geometry.coordinates,
      B.geometry.coordinates,
    ];

    // https://www.waze.com/editor/sdk/interfaces/index.SDK.FeatureStyle.html
    const line = turf.lineString(lineCoordinates, {
      styleName: styleName,
    }, { id: `${styleName}_line_${featureId}` });

    this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: line });
  }

  /**
   * Remove all vectors from the layer for the current venue
   */
  removeVector (venue: any) {
    let featureIds: string[] = []

    if (venue.navigationPoints?.length) {
      for (let i = 0; i < venue.navigationPoints.length; i++) {
        let featureId = venue.id + '_' + i

        if (i === 0) {
          featureIds.push(`styleLine_from_${featureId}`)
          featureIds.push(`styleLine_to_${featureId}`)
          featureIds.push(`styleLine_line_${featureId}`)
          featureIds.push(`styleDashedLine_from_${featureId}`)
          featureIds.push(`styleDashedLine_to_${featureId}`)
          featureIds.push(`styleDashedLine_line_${featureId}`)
        } else {
          featureIds.push(`styleSecondaryLine_from_${featureId}`)
          featureIds.push(`styleSecondaryLine_to_${featureId}`)
          featureIds.push(`styleSecondaryLine_line_${featureId}`)
          featureIds.push(`styleDashedSecondaryLine_from_${featureId}`)
          featureIds.push(`styleDashedSecondaryLine_to_${featureId}`)
          featureIds.push(`styleDashedSecondaryLine_line_${featureId}`)
        }
      }
    } else {
      let featureId = venue.id
      featureIds = [
        `styleLine_from_${featureId}`,
        `styleLine_to_${featureId}`,
        `styleLine_line_${featureId}`,
      ]
    }

    this.wmeSDK.Map.removeFeaturesFromLayer({ layerName: this.name, featureIds });
  }

  /**
   * Remove all vectors from the layer
   */
  removeVectors () {
    this.wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: this.name });
  }

  /**
   * Show the Layer
   */
  showLayer () {
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true });
  }

  /**
   * Hide the Layer
   */
  hideLayer () {
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
  }

  /**
   * Handler for `place.wme` event
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue} model
   */
  onPlace (event: any, element: any, model: any) {
    if (this.canEditVenue(model)) {
      this.createPlacePanel(event, element)
    }
  }

  /**
   * Handler for `point.wme` event
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue} model
   */
  onPoint (event: any, element: any, model: any) {
    if (this.canEditVenue(model)) {
      this.createPointPanel(event, element)
    }
  }

  /**
   * Handler for `venue.wme` event
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue} model
   */
  onVenue (event: any, element: any, model: any) {
    if (this.settings.get('options', 'navigationPoint')) {
      this.showVector(model.id)
    }
  }

  /**
   * Handler for `venues.wme` event
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue[]} models
   * @return {Null}
   */
  onVenues (event: any, element: any, models: any) {
    models = models.filter((model: any) => !model.isResidential
      && this.canEditVenue(model))

    if (models.length > 0) {
      if (models[0].geometry.type === 'Polygon') {
        this.createPlacePanel(event, element)
      } else {
        this.createPointPanel(event, element)
      }
    }
  }

  /**
   * Handler for `none.wme` event
   * @return {Null}
   */
  onNone() {
    this.removeVectors()
    this.hideLayer()
  }

  /**
   * @param {String[]} except
   * @return {Venue[]} models
   */
  getAllPlaces(except: string[] = []) {
    let venues = this.getAllVenues(except)
    return venues.filter((venue: any) => venue.geometry.type === 'Polygon')
  }

  /**
   * @return {Venue[]} models
   */
  getSelectedPlaces() {
    let venues = this.getSelectedVenues()
    return venues.filter((venue: any) => venue.geometry.type === 'Polygon')
  }

  /**
   * Create the panel with buttons
   * @param event
   * @param {HTMLElement} element
   */
  createPlacePanel (event: any, element: any) {
    if (element?.querySelector('div.wme-ui-panel.e40')) {
      return
    }

    element?.prepend(this.placePanel.html())
    this.updateLabel()
  }

  /**
   * Create the panel with buttons
   * @param event
   * @param {HTMLElement} element
   */
  createPointPanel (event: any, element: any) {
    if (element?.querySelector('div.wme-ui-panel.e40')) {
      return
    }

    element?.prepend(this.pointPanel.html())
    this.updateLabel()
  }

  /**
   * Refresh the panel if something was changed
   */
  refreshPanel () {
    let venue = this.getSelectedVenue()

    let element = document.getElementById('venue-edit-general')

        element?.querySelector('div.wme-ui-panel.e40')?.remove()

    if (venue) {
      if (venue.geometry.type === 'Polygon') {
        this.createPlacePanel(null, element)
      } else {
        this.createPointPanel(null, element)
      }
    }
  }

  /**
   * Updated label
   */
  updateLabel () {
    let places = this.getSelectedVenues()

    if (places.length === 0) {
      return
    }
    let info = []
    for (let i = 0; i < places.length; i++) {
      let place = places[i]
      if (place.geometry.type === 'Polygon') {
        info.push(Math.round(turf.area(place.geometry)) + 'm²')
      }
    }
    let label = WMEUI.t(NAME).title
    if (info.length) {
      label += ' (' + info.join(', ') + ')'
    }

    let elm = document.querySelector('div.wme-ui-panel.e40 wz-label')
    if (elm) (elm as any).innerText = label
  }

  /**
   * Scale places to X m²
   * @param {Venue[]} elements
   * @param {Number} x square meters
   * @param {Boolean} orMore flag
   */
  scale (elements: any, x: number, orMore = false) {
    this.group('scale ' + (elements.length) + ' element(s) to ' + x + 'm²')

    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let scale = Math.sqrt((x + 5) / turf.area(elements[i].geometry))
        if (scale < 1 && orMore) {
          continue
        }

        let geometry = turf.transformScale(elements[i].geometry, scale)

        this.wmeSDK.DataModel.Venues.updateVenue({
          venueId: elements[i].id, geometry
        })

        total++
      } catch (e) {
        this.log('skipped', e)
      }
    }
    this.log(total + ' element(s) was scaled')
    this.groupEnd()
  }

  /**
   * Orthogonalize place(s)
   * @param {Venue[]} elements
   */
  orthogonalize (elements: any) {
    this.group('orthogonalize ' + (elements.length) + ' element(s)')
    let total = 0
    // skip points
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = elements[i].geometry
        let area = turf.area(elements[i].geometry)

        geometry = simplifyPolygon(geometry)
        geometry = normalizeRightAngles(geometry)

        let scale = Math.sqrt(area / turf.area(geometry))

        this.log('Apply scale ' + scale)

        geometry = turf.transformScale(geometry, scale)

        if (!this.compare(elements[i].geometry.coordinates[0], geometry.coordinates[0])) {
          this.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
          total++
        } else {
          this.log('The geometry is the same as before, skipped')
        }
      } catch (e) {
        this.log('skipped', e)
      }
    }
    this.log(total + ' element(s) was orthogonalized')
    this.groupEnd()
  }


  /**
   * Smooth place(s)
   * @param {Venue[]} elements
   */
  smooth (elements: any) {
    this.group('smooth ' + (elements.length) + ' element(s)')

    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = turf.polygonSmooth(elements[i].geometry).features[0].geometry;

        if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
          this.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
          total++
        }
      } catch (e) {
        this.log('skipped', e)
      }
    }
    this.log(total + ' element(s) was smoothed')
    this.groupEnd()
  }

  /**
   * Simplify place(s)
   * @param {Venue[]} elements
   * @param {Number} tolerance
   */
  simplify (elements: any, tolerance = 0.00001) {
    this.group('simplify ' + (elements.length) + ' element(s) with < tolerance=' + tolerance + ' >')

    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let geometry = turf.simplify(elements[i].geometry, { tolerance })

        if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
          this.wmeSDK.DataModel.Venues.updateVenue({
            venueId: elements[i].id, geometry
          })
          total++
        }
      } catch (e) {
        this.log('skipped', e)
      }
    }
    this.log(total + ' element(s) was simplified')
    this.groupEnd()
  }

  /**
   * Transform the Point to circle place
   *
   * @param {Venue[]} elements
   * @param {Number} area in square meters
   * @param {Number} steps
   */
  circle (elements: any, area: number, steps = 64) {
    this.group('transform ' + (elements.length) + ' element(s) to circle')

    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let place = elements[i]
        let geometry = place.geometry

        if (geometry.type !== 'Point') {
          geometry = turf.centroid(geometry).geometry
        }

        let circle = createCirclePolygon(geometry, area, steps)

        this.wmeSDK.DataModel.Venues.updateVenue({
          venueId: place.id, geometry: circle.geometry
        })
        total++
      } catch (e) {
        this.log('skipped', e)
      }
    }

    this.log(total + ' element(s) was transformed')
    this.groupEnd()

    this.selectVenues(elements.map((e: any) => String(e.id)))
  }

  /**
   * Transform the Point(s) to square place
   *
   * @param {Venue[]} elements
   * @param {Number} area in square meters
   */
  square (elements: any, area: number) {
    this.group('transform ' + (elements.length) + ' element(s) to square')

    let total = 0
    for (let i = 0; i < elements.length; i++) {
      try {
        let place = elements[i]

        let geometry = place.geometry

        if (geometry.type !== 'Point') {
          geometry = turf.centroid(geometry).geometry
        }

        let square = createSquarePolygon(geometry, area)

        this.wmeSDK.DataModel.Venues.updateVenue({
          venueId: place.id, geometry: square.geometry
        })

        total++
      } catch (e) {
        this.log('skipped', e)
      }
    }

    this.log(total + ' element(s) was transformed')
    this.groupEnd()

    this.selectVenues(elements.map((e: any) => String(e.id)))
  }

  /**
   * @param {String[]} ids of venues
   */
  selectVenues(ids: string[]) {
    this.wmeSDK.Editing.clearSelection()

    // select changed elements
    setTimeout(() =>
      this.wmeSDK.Editing.setSelection({ selection: {
          ids: ids,
          objectType: 'venue'
        }}), 100)
  }

  /**
   * Create copy for place
   * @param {Venue} venue
   * @return {String}
   */
  copyPlace (venue: any) {
    this.log('created a copy of the POI ' + venue.name)

    let geometry = turf.transformTranslate(venue.geometry, 0.01, 0.005)

    let venueId = this.wmeSDK.DataModel.Venues.addVenue(
      {
        category: venue.categories[0],
        geometry: geometry
      }
    )

    venueId = String(venueId)

    this.wmeSDK.DataModel.Venues.updateVenue({
      venueId,
      name: venue.name + ' (copy)',
      // isAdLocked: venue.isAdLocked,
      // isResidential: venue.isResidential,
    })

    let address = this.wmeSDK.DataModel.Venues.getAddress( { venueId: venue.id } )

    if (address?.street?.id) {
      this.wmeSDK.DataModel.Venues.updateAddress(
        {
          venueId,
          streetId: address.street.id,
        }
      )
    }

    return venueId
  }

  /**
   * Compare two polygons point-by-point
   *
   * @param {Array} coordinates1
   * @param {Array} coordinates2
   * @return boolean
   */
  compare (coordinates1: any, coordinates2: any) {
    if (coordinates1.length !== coordinates2.length) {
      return false
    }
    for (let i = 0; i < coordinates1.length; i++) {
      if (Math.abs(coordinates1[i][0] - coordinates2[i][0]) > .000001
        || Math.abs(coordinates1[i][1] - coordinates2[i][1]) > .000001) {
        return false
      }
    }
    return true
  }
}
