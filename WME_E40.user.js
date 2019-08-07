// ==UserScript==
// @name         WME E40
// @version      0.0.1
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
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// ==/UserScript==

/* jshint esversion: 6 */
/* global require, window, WazeWrap, OL */
(function ($, WazeApi, I18n) {
  'use strict';

  // Script name, uses as unique index
  const NAME = 'E40';

  // Translations
  const LOCALE = I18n.currentLocale();
  const translation = {
    'en': {
      title: 'Geometry'
    },
    'uk': {
      title: 'Геометрія',
    },
    'ru': {
      title: 'Геометрия'
    }
  };

  const buttons = {
    A: {
      title: '🔲',
      shortcut: 'S+49',
      callback: () => orthogonalize()
    },
    B: {
      title: '〽️',
      shortcut: 'S+50',
      callback: () => simplify()
    },
    C: {
      title: '500m²',
      shortcut: 'S+51',
      callback: () => scale(500)
    },
    D: {
      title: '650m²',
      shortcut: 'S+52',
      callback: () => scale(650)
    },
    E: {
      title: '>650m²',
      shortcut: 'S+53',
      callback: () => scale(650, true)
    }
  };

  let WazeActionUpdateFeatureGeometry = require('Waze/Action/UpdateFeatureGeometry');

  // Scale place to X m²
  function scale(x, orMore = false) {
    if (!WazeWrap.hasPlaceSelected()) {
      return;
    }
    let selected = WazeApi.selectionManager.getSelectedFeatures().map((x) => x.model);
    scaleArray(selected, x, orMore);
    return false;
  }
  function scaleArray(elements, x, orMore = false) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      if (!selected.isGeometryEditable() || selected.isPoint()) {
        continue;
      }
      let oldGeometry = selected.geometry.clone();
      let newGeometry = selected.geometry.clone();

      let scale = Math.sqrt((x + 5) / oldGeometry.getGeodesicArea(WazeApi.map.getProjectionObject()));
      if (scale < 1 && orMore) {
        continue;
      }
      newGeometry.resize(scale, newGeometry.getCentroid());

      let action = new WazeActionUpdateFeatureGeometry(selected, WazeApi.model.venues, oldGeometry, newGeometry);
      WazeApi.model.actionManager.add(action);
    }
  }
  // Orthogonalize place
  function orthogonalize() {
    if (!WazeWrap.hasPlaceSelected()) {
      return;
    }

    let selected = WazeApi.selectionManager.getSelectedFeatures().map((x) => x.model);
    orthogonalizeArray(selected);
    return false;
  }
  function orthogonalizeArray(elements) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      if (!selected.isGeometryEditable() || selected.isPoint()) {
        continue;
      }

      let oldGeometry = selected.geometry.clone();
      //console.log(selected);
      let newGeometry = WazeWrap.Util.OrthogonalizeGeometry(selected.geometry.clone().components[0].components);

      if (!compare(oldGeometry.components[0].components, newGeometry)){
        selected.geometry.components[0].components = [].concat(newGeometry);
        selected.geometry.components[0].clearBounds();

        let action = new WazeActionUpdateFeatureGeometry(selected, WazeApi.model.venues, oldGeometry, selected.geometry);
        WazeApi.model.actionManager.add(action);
      }
    }
    return false;
  }
  // Simplify place
  function simplify(factor = 8) {
    if (!WazeWrap.hasPlaceSelected()) {
      return;
    }

    let selected = WazeApi.selectionManager.getSelectedFeatures().map((x) => x.model);
    simplifyArray(selected, factor);
    return false;
  }
  function simplifyArray(elements, factor = 8) {
    for (let i = 0; i < elements.length; i++) {
      let selected = elements[i];
      if (!selected.isGeometryEditable() || selected.isPoint()) {
        continue;
      }

      let oldGeometry = selected.geometry.clone();
      let ls = new OL.Geometry.LineString(oldGeometry.components[0].components);
      ls = ls.simplify(factor);
      let newGeometry = new OL.Geometry.Polygon(new OL.Geometry.LinearRing(ls.components));

      if (newGeometry.components[0].components.length < oldGeometry.components[0].components.length) {
        WazeApi.model.actionManager.add(new WazeActionUpdateFeatureGeometry(selected, WazeApi.model.venues, oldGeometry, newGeometry));
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
  // Bootstrap plugin
  function bootstrap(tries = 1) {
    log('attempt ' + tries);
    if (WazeApi &&
      WazeApi.map &&
      WazeApi.model &&
      WazeApi.loginManager.user &&
      WazeWrap.Ready) {
      log('was initialized');
      init();
    } else if (tries < 100) {
      tries++;
      setTimeout(() => bootstrap(tries), 500);
    } else {
      console.error('initialization failed');
    }
  }

  function init() {
    // Initial Mutation Observer
    initObserver();
    // Initial Translation
    initTranslation();
    // Initial Tab
    initUI();
    // Initial Handlers
    initHandlers();
    // Initial Shortcuts
    initShortcuts();
    // Apply CSS styles
    appendStyle(
      'button.waze-btn.E40 { margin: 0 4px 4px 0; padding: 2px; width: 42px; } ' +
      'button.waze-btn.E40:hover { box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 0 100px 100px rgba(255, 255, 255, 0.3); } '
    );
  }

  // Initial Mutation Observer
  // #segment-edit-general - for segment tab
  // #landmark-edit-general - for POI tab
  function initObserver() {
    // Check for changes in the edit-panel
    let speedLimitsObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        for (let i = 0, total = mutation.addedNodes.length; i < total; i++) {
          let node = mutation.addedNodes[i];
          // Only fire up if it's a node
          if (node.nodeType === Node.ELEMENT_NODE &&
            node.querySelector('div.selection') &&
            (node.querySelector('#landmark-edit-general') || node.querySelector('#mergeLandmarksCollection')) && // segment or landmark tab
            !node.querySelector('div.form-group.' + NAME)) {
            createUI();
          }
        }
      });
    });

    speedLimitsObserver.observe(document.getElementById('edit-panel'), {childList: true, subtree: true});
    log('observer was run');
  }
  // Create UI controls everytime when updated DOM of sidebar
  // Uses native JS function for better performance
  function createUI() {
    // Container for buttons
    let controls = document.createElement('div');
    controls.className = 'controls';
    // Create buttons and append it to panel
    // Create buttons
    for (let btn in buttons) {
      let button = document.createElement('button');
          button.className = 'waze-btn waze-btn-small ' + NAME + ' ' + NAME + '-' + btn;
          button.innerHTML = buttons[btn].title;
          button.title = buttons[btn].title;
          button.dataset[NAME] = btn;
      controls.appendChild(button);
    }

    let label = document.createElement('label');
        label.className = 'control-label';
        label.innerHTML = I18n.translate(NAME).title;

    let group = document.createElement('div');
        group.className = 'form-group ' + NAME;
        group.appendChild(label);
        group.appendChild(controls);

    if (document.getElementById('landmark-edit-general')) {
      document.getElementById('landmark-edit-general').prepend(group)
    }

    if (document.getElementById('mergeLandmarksCollection')) {
      document.getElementById('mergeLandmarksCollection').prepend(group)
    }
  }
  // Initial Translation for UI and Shortcuts
  function initTranslation() {
    I18n.translations[LOCALE][NAME] = translation[LOCALE] || translation.en;

    // Translation for Shortcuts
    I18n.translations[LOCALE].keyboard_shortcuts.groups[NAME] = [];
    I18n.translations[LOCALE].keyboard_shortcuts.groups[NAME].description = NAME;
    I18n.translations[LOCALE].keyboard_shortcuts.groups[NAME].members = [];
  }
  // Initial UI
  function initUI() {
    let html =
      '<div class="form-group">'+
      '<label class="control-label">'+ NAME +'</label>' +
      '<div class="button-toolbar">' +
      '<button type="button" id="E40-orthogonalize" class="btn btn-default">🔲</button>' +
      '<button type="button" id="E40-simplify" class="btn btn-default">〽️</button>' +
      '<button type="button" id="E40-650" class="btn btn-default">&gt;650m²</button>' +
      '</div>' +
      '</div>'
    ;

    new WazeWrap.Interface.Tab(NAME, html, function() {
      log('tab');
    });
  }
  // Initial button handlers, init it once
  function initHandlers() {
    $('#edit-panel').on('click', 'button.'+NAME, function() {
      let btn = $(this).data(NAME);
      return buttons[btn].callback();
    });
    $('#E40-orthogonalize').on('click', function() {
      orthogonalizeArray(WazeApi.model.venues.getObjectArray());
      return false;
    });
    $('#simplify').on('click', function() {
      simplifyArray(WazeApi.model.venues.getObjectArray());
      return false;
    });
    $('#E40-650').on('click', function() {
      scaleArray(WazeApi.model.venues.getObjectArray(), 650, true);
      return false;
    })
  }
  // Initial shortcuts
  function initShortcuts() {
    WazeApi.accelerators.Groups[NAME] = [];
    WazeApi.accelerators.Groups[NAME].members = [];

    for (let btn in buttons) {
      let name = NAME + 'Button' + buttons[btn].title;
      WazeApi.accelerators.addAction(name, { group: NAME });
      WazeApi.accelerators.events.register(name, null, buttons[btn].callback);
      WazeApi.accelerators.registerShortcut(buttons[btn].shortcut, name);
    }
  }
  // Apply CSS styles
  function appendStyle(css) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  // Simple console.log wrapper
  function log(message) {
    console.log(NAME + ': ' + message);
  }
  log('initialization');
  bootstrap();
})(window.jQuery, window.W, window.I18n);
