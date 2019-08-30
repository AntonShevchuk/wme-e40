// ==UserScript==
// @name         WME E40
// @version      0.1.3
// @description  Setup POI geometry properties in one click
// @author       Anton Shevchuk
// @license      MIT License
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @exclude      https://beta.waze.com/user/editor*
// @grant        none
// @icon         data:image/png;base64,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
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require      https://greasyfork.org/scripts/389117-apihelper/code/APIHelper.js?version=729389
// @require      https://greasyfork.org/scripts/389577-apihelperui/code/APIHelperUI.js?version=729353
// @supportURL   https://github.com/AntonShevchuk/wme-e40/issues
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/* jshint esversion: 6 */
/* global require, W, I18n, OL, WazeWrap, APIHelper, APIHelperUI */

(function ($) {
  'use strict';

  let helper;
  let panel;
  let tab;

  // Script name, uses as unique index
  const NAME = 'E40';

  // Translations
  const TRANSLATION = {
    'en': {
      title: 'Geometry',
      orthogonalize: 'Orthogonalize',
      simplify: 'Simplify',
      scale: 'Scale',
    },
    'uk': {
      title: 'Геометрія',
      orthogonalize: 'Вирівняти',
      simplify: 'Спростити',
      scale: 'Масштабувати',
    },
    'ru': {
      title: 'Геометрия',
      orthogonalize: 'Выровнять',
      simplify: 'Упростить',
      scale: 'Масштабировать',
    }
  };

  APIHelper.bootstrap();
  APIHelper.addTranslation(NAME, TRANSLATION);
  APIHelper.addStyle(
    'button.waze-btn.e40 { margin: 0 4px 4px 0; padding: 2px; width: 42px; } ' +
    'button.waze-btn.e40:hover { box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 0 100px 100px rgba(255, 255, 255, 0.3); } '
  );

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
    }
  };

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
      title: '>650',
      description: I18n.t(NAME).scale,
      shortcut: null,
      callback: () => scaleAll(650, true)
    }
  };

  let WazeActionUpdateFeatureGeometry = require('Waze/Action/UpdateFeatureGeometry');

  /**
   * Get selected Area POI
   * @return {Array}
   */
  function getSelectedPlaces() {
    let selected;
    selected = APIHelper.getSelectedVenues();
    selected = selected.filter((el) => !el.isPoint());
    return selected;
  }
  // Scale selected place(s) to X m²
  function scaleSelected(x, orMore = false) {
    scaleArray(getSelectedPlaces(), x, orMore);
    return false;
  }
  // Scale all places in the editor area to X m²
  function scaleAll(x = 650, orMore = true) {
    scaleArray(APIHelper.getVenues(), x, orMore);
    return false;
  }
  function scaleArray(elements, x, orMore = false) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      try {
        let oldGeometry = selected.geometry.clone();
        let newGeometry = selected.geometry.clone();

        let scale = Math.sqrt((x + 5) / oldGeometry.getGeodesicArea(W.map.getProjectionObject()));
        if (scale < 1 && orMore) {
          continue;
        }
        newGeometry.resize(scale, newGeometry.getCentroid());

        let action = new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, newGeometry);
        W.model.actionManager.add(action);
      } catch (e) {
        log('skipped');
      }
    }
  }
  // Orthogonalize selected place(s)
  function orthogonalize() {
    orthogonalizeArray(getSelectedPlaces());
    return false;
  }
  // Orthogonalize all places in the editor area
  function orthogonalizeAll() {
    // skip parking, natural and outdoors
    // TODO: make options for filters
    orthogonalizeArray(APIHelper.getVenues(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']));
    return false;
  }
  function orthogonalizeArray(elements) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      try {
        let oldGeometry = selected.geometry.clone();
        let newGeometry = WazeWrap.Util.OrthogonalizeGeometry(selected.geometry.clone().components[0].components);

        if (!compare(oldGeometry.components[0].components, newGeometry)) {
          selected.geometry.components[0].components = [].concat(newGeometry);
          selected.geometry.components[0].clearBounds();

          let action = new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, selected.geometry);
          W.model.actionManager.add(action);
        }
      } catch (e) {
        log('skipped');
      }
    }
    return false;
  }
  // Simplify selected place(s)
  function simplify(factor = 8) {
    simplifyArray(getSelectedPlaces(), factor);
    return false;
  }
  // Simplify all places in the editor area
  function simplifyAll() {
    // skip parking, natural and outdoors
    // TODO: make options for filters
    simplifyArray(APIHelper.getVenues(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']));
    return false;
  }
  function simplifyArray(elements, factor = 8) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      try {
        let oldGeometry = selected.geometry.clone();
        let ls = new OL.Geometry.LineString(oldGeometry.components[0].components);
        ls = ls.simplify(factor);
        let newGeometry = new OL.Geometry.Polygon(new OL.Geometry.LinearRing(ls.components));

        if (newGeometry.components[0].components.length < oldGeometry.components[0].components.length) {
          W.model.actionManager.add(new WazeActionUpdateFeatureGeometry(selected, W.model.venues, oldGeometry, newGeometry));
        }
      } catch (e) {
        log('skipped');
      }
    }
    return false;
  }
  // Compare two polygons point-by-point
  function compare(geo1, geo2) {
    if (geo1.length !== geo2.length) {
      return false;
    }
    for (let i = 0; i < geo1.length; i++) {
      if (Math.abs(geo1[i].x - geo2[i].x) > .1
        || Math.abs(geo1[i].y - geo2[i].y) > .1) {
        return false;
      }
    }
    return true;
  }

  // Simple console.log wrapper
  function log(message) {
    console.log(NAME + ': ' + message);
  }

  $(document)
      .on('ready.apihelper', ready)
      .on('landmark.apihelper', createPanel)
      .on('landmark-collection.apihelper', createPanel)
  ;

  function ready() {
    helper = new APIHelperUI(NAME);

    panel = helper.createPanel(I18n.t(NAME).title);
    panel.addButtons(panelButtons);

    if (W.loginManager.user.getRank() > 2) {
      tab = helper.createTab(I18n.t(NAME).title);
      tab.addButtons(tabButtons);
      tab.init();
    }

    WazeWrap.Events.register('selectionchanged', null, updateLabel);
    WazeWrap.Events.register('afterundoaction', null, updateLabel);
    WazeWrap.Events.register('afterclearactions', null, updateLabel);
    WazeWrap.Events.register('afteraction', null, updateLabel);
  }
  function createPanel(event, element) {
    if (element.querySelector('div.form-group.e40')) {
      return;
    }
    let places = getSelectedPlaces();
    if (places.length === 0) {
      return;
    }

    element.prepend(panel.toHTML());
    updateLabel();
  }

  function updateLabel() {
    let places = getSelectedPlaces();
    if (places.length === 0) {
      return;
    }
    let info = [];
    for (let i = 0; i < places.length; i++) {
      let selected = places[i];
      info.push(Math.round(selected.geometry.getGeodesicArea(W.map.getProjectionObject())) + 'm²');
    }
    let label = I18n.t(NAME).title;
    if (info.length) {
      label += ' (' + info.join(', ') + ')';
    }
    $('div.form-group.e40 label.control-label').text(label);
  }

  // external API
  window.E40 = {
    scale: function (x) {
      scaleSelected(x);
    }
  };
})(window.jQuery);
