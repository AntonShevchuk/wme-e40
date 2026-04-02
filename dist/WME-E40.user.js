// ==UserScript==
// @name         WME E40 Geometry
// @name:uk      WME 🇺🇦 E40 Geometry
// @name:ru      WME 🇺🇦 E40 Geometry
// @version      0.11.0
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
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4wgMCCcJi6hsjAAAB1lJREFUeNrtmn9QVNcVxz/v7Q8WcPmlAgs0wIgzVTYaLdHRjlGiNeZHZdJ0zGC1tkpsK2nStBkyWwnB2mLUNNHWSdKCyUyGODaSNGCM4xRDpnb8VU39AdgOmARlZZVxRX4v7L7XP3ZZ9smPfZCQkGW/Mzuz977z3r3n3HO+95z3LgQRRBBBBBFEEEEEEcQEx+YJpGth/1+BQp+OF4gDXga+LyAYA0lnGbkNOAj8mi1c7zOEFtkjYeHt9Nj01UVLi0iLSSNEExJQi+5wOYz19vrVlkrL6lpL7dtsY41Xdwo4lFOeI08UbKzYKFPAIXcI5LPEbDJXXdx0EYDjV4+TU5FDQ0sDAkKguD8p0SkUryxmYdJCAMyvmqlpqskUyKfMmmd9LMGYwOG6wzz01kMgQoDo7msFkODDdR/yYNqDWNusJO1Ielc0RZrujwuPA2B9+XrQBKDyeHTSwIbyDQDEh8cTHxmfKeq1+ug+hW3NtoDfAZuam7wGCdGGxGhVx3n3KEcUQdDTT7jDQfL8+qD1I+8CnB73Ft0rjEZFKHidQvA7BAAGnRF7YSuho9D/akMJd/3lCdD7l52VtopNM+6jR5IIk5vJObgVdIPLhupi2JT5O/IycokNh5aW8+w8uZ1dp9+hU3Kpnp9WHX/ItPdAqH7kBuhwdqviFI2oY39WMTMiIzw9l8l5fxADyJBkeoRz699jsr7/YlTUbP6wYh+bFxUxb880aroktQ46DuCCxffs9FEekAdXwGCcQcPPDyqUV3hGeArHfnYKncrQHnMDqOEYMeJujq58WtVWVrhs17CTFoDoqAzy081KPvkiITBwItfI3PtDNPowv6KdnY3DjyJBfuZWlZ5iYN3s5Yqu98+8yO7aI2xctJPs1Axvf8EPDrOjOomOMTEAnXxcfwIMI9iDh0BIxFyez8hStfozZ+UR7/Os85dLefTvFtDBxw3LWf5bO5P7dgFNIgtMCVTaro1nDtDzUc4HapmYteY1iq6y6n39JNlzi81njiiu32uaM45JUIbUxJXMjzJ5UwCHc5hkQzSwKnWqouti02mFJmU15Yrr34nzzwOjN4Ck8jfk/QYO/eSAN29paHiHanvj0FGkCydCUDJ/fctNRZjdtJ3ENwO4K8LkNwMbJQdE8avFuYja4d8ZyLKLkn//iTbXwFn8ePEOZnj1aWbum9kczf10yGeF6gxoNb7TdXC9447Mz3GDLmCSpxkXmeReBM2XbQBhCq88vEeV6Lvn9tDmuiMzkyfx+0VPeptvHttKi6Adliy1ogZRIWCno/cO5YQunD7NyJApXy8HOF2OgS4owZbHj/OtkD5lWnm+6s/+92tBiyj4TteJNMCx7HT7WCBSP8lvCHzlJBgbbSbv22Zv+5f7MrE6VWRsgoAoCCPkWf8l2Cg5wMFZ6wUEcfjSyyX10iP7TKIHtj5agUF0K9LWeoHi+nOqlkGSZSTZn0IaRB8buWRpjAwgXyVj1zx1iZCPjebc/RQbU1K97ScP3I/DJXliXx7orj5tp+xCUggM5g0R6H3Ga+/t9FuIaUfty2pq7zuU2b3sOW/zhv0U3cZlrJnt2QoELTGGcJ8bjGTPfQyNLoyzVyr5zNGLJLnoz3yiCdeDQzFGhKLqvu1oHqsQGGX8h8b0/4+Zz99W7R/aXkI8+x4vAyDvvRW8dOkMLkWdH058GNh9LWCYonhn0dza5De8vmISlFVL+npur+RC7u3ALvUoZJKNRsWjExPuU9xXd+vKeDPAF4DUTeX1TkXX0ukPKN4pZM9eq7h+1lY9VhwgQ+8I7vbInWioojF0iOxREJiXtBCjzuCtOCvrjyFodFztsIMAJRfe4hepFu8tWeYnePZYmXsZQxMpuEdZ/Pzn+vkx4gAhja7tXapEDVoDC14SONkOPz3w8DDP1HE2t465U5I9NrbyveIVeINagE9Ob6E5y0JfSZSWuBzrM5+w+9x+1s23oPiY6bhIldXmV8NReoCAQWtQLS2OOOqH6NI6KL1wlGdmLfV2JUyew/alA8vepw5kI4tf1tzGCwR49kgu7X5e+jbe+BevffpfVdp9swwASO3/I3mXmXbX4Fleh/0E5r8uwqny1biqEHC5etj+zwLCNCOfsF4TypUeVaPw+qmXiQ+LdJe/sn3w2Qlgb63BuG0quffm8kDKd4kNj+Zmaz3/+Owwe86U4pQF1VuukPxKsnz56ctoBA3CcwKj+vrxtbqE5yeq9OdukF+Ucckupu2ehtjj7LnVZyxTrIlvHESPH6sM5oSpCd6d3OF02MWm1qaPbB3uj6JvZL3h/t4mE3iQ3cnS3qy9ANjabdhu26oE8lmSbkqvqt5U7U5WGk+QU5HD57c+D7gDEiUrS1iQtACA9FfTqb1Wu8QtUUDFhvINE+2IzEE3p74AbAEslM5MnPmjomVFTI+ZHoiHpKi7WYflqIVL1kulbGMthYMfk/sj8IiAEBlYFCDfBj4AfuN7TK4fE+mg5ETSNYgggggiiCCCCCKIIAbH/wEkSypmWfyFAwAAAABJRU5ErkJggg==
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1785927/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/571719/1785947/GeoUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1785943/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1785960/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1785964/WME-UI.js
//
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js
// ==/UserScript==

(function () {
    'use strict';

    const NAME = 'E40';
    // User level required for apply geometry for all entities in the view area
    const REQUIRED_LEVEL = 2;
    // Translations
    const TRANSLATION = {
        'en': {
            title: 'POI Geometry',
            description: 'Change geometry in the current view area',
            options: {
                title: 'Navigation Points',
                navigationPoint: 'Highlight entrance for selected place',
                navigationPointAll: 'Highlight all entrances for selected place',
                navigationPointOnHover: 'Highlight entrance on hover',
            },
            warning: '⚠️ This option is available for editors with a rank higher than ' + REQUIRED_LEVEL,
            help: 'You can use the <strong>Keyboard shortcuts</strong> to apply the settings. It\'s more convenient than clicking on the buttons.',
            orthogonalize: 'Orthogonalize',
            smooth: 'Smooth',
            simplify: 'Simplify',
            scale: 'Scale',
            rotate: 'Rotate',
            circle: 'Circle',
            square: 'Square',
            copy: 'Copy',
            about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
        },
        'uk': {
            title: 'Геометрія POI',
            description: 'Змінити геометрію об\u2019єктів у поточному розташуванні',
            options: {
                title: 'Точки навігації',
                navigationPoint: 'Підсвічувати навігацію до місця',
                navigationPointAll: 'Підсвічувати навігацію до всіх точок входу',
                navigationPointOnHover: 'Підсвічувати навігацію за наведенням мишки',
            },
            warning: '⚠️ Ця опція доступна лише для редакторів з рангом вищім ніж ' + REQUIRED_LEVEL,
            help: 'Використовуйте <strong>гарячі клавіши</strong>, це значно швидше ніж використовувати кнопки',
            orthogonalize: 'Вирівняти',
            smooth: 'Згладити',
            simplify: 'Спростити',
            scale: 'Масштабувати',
            rotate: 'Повернути',
            circle: 'Круг',
            square: 'Квадрат',
            copy: 'Копіювати',
            about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
        },
        'ru': {
            title: 'Геометрия POI',
            description: 'Изменить геометрию объектов в текущем расположении',
            options: {
                title: 'Точки навигации',
                navigationPoint: 'Показывать навигацию до выбранного места',
                navigationPointAll: 'Показывать навигацию ко всем точкам входа',
                navigationPointOnHover: 'Подсвечивать навигацию при наведении мыши',
            },
            warning: '⚠️ Эта опция доступна для редакторов с рангов выше ' + REQUIRED_LEVEL,
            help: 'Используйте <strong>комбинации клавиш</strong>, и не надо будет клацать кнопки',
            orthogonalize: 'Выровнять',
            smooth: 'Сгладить',
            simplify: 'Упростить',
            scale: 'Масштабировать',
            rotate: 'Повернуть',
            circle: 'Круг',
            square: 'Квадрат',
            copy: 'Копировать',
            about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
        }
    };

    const SETTINGS = {
        options: {
            navigationPoint: true,
            navigationPointAll: false,
            navigationPointOnHover: false,
        },
    };

    let E40Instance;
    function setE40Instance(instance) {
        E40Instance = instance;
    }
    /**
     * Scale selected place(s) to X m²
     * @param {Number} x square meters
     * @param {Boolean} orMore flag
     * @return {boolean}
     */
    function scale(x, orMore = false) {
        E40Instance.scale(E40Instance.getSelectedPlaces(), x, orMore);
        return false;
    }
    /**
     * Scale all places in the editor area to X m²
     * @param {Number} x square meters
     * @param {Boolean} orMore flag
     * @return {boolean}
     */
    function scaleAll(x = 650, orMore = true) {
        E40Instance.scale(E40Instance.getAllPlaces(), x, orMore);
        return false;
    }
    /**
     * Orthogonalize selected place(s)
     * @return {boolean}
     */
    function orthogonalize() {
        E40Instance.orthogonalize(E40Instance.getSelectedPlaces());
        return false;
    }
    /**
     * Orthogonalize all places in the editor area
     * @return {boolean}
     */
    function orthogonalizeAll() {
        // skip parking, natural and outdoors
        // TODO: make options for filters
        E40Instance.orthogonalize(E40Instance.getAllPlaces([
            'CAMPING_TRAILER_PARK',
            'FOREST_GROVE',
            'JUNCTION_INTERCHANGE',
            'NATURAL_FEATURES',
            'OUTDOORS',
            'PARKING_LOT',
            'PLAYGROUND',
        ]));
        return false;
    }
    /**
     * Smooth selected place(s)
     * @return {boolean}
     */
    function smooth() {
        E40Instance.smooth(E40Instance.getSelectedPlaces());
        return false;
    }
    /**
     * Simplify selected place(s)
     * @param {Number} tolerance
     * @return {boolean}
     */
    function simplify(tolerance = 0.00001) {
        E40Instance.simplify(E40Instance.getSelectedPlaces(), tolerance);
        return false;
    }
    /**
     * Simplify all places in the editor area
     * @param {Number} tolerance
     * @return {boolean}
     */
    function simplifyAll(tolerance = 0.00001) {
        // skip parking, natural and outdoors
        E40Instance.simplify(E40Instance.getAllPlaces(['OUTDOORS', 'PARKING_LOT', 'NATURAL_FEATURES']), tolerance);
        return false;
    }
    /**
     * Transform the Point to circle place
     * @param {Number} area in square meters
     * @param {Number} steps
     */
    function circle(area, steps = 64) {
        E40Instance.circle(E40Instance.getSelectedVenues(), area, steps);
        return false;
    }
    /**
     * Transform the Point to square place
     * @param {Number} area in square meters
     */
    function square(area) {
        E40Instance.square(E40Instance.getSelectedVenues(), area);
        return false;
    }
    /**
     * Copy selected places
     * Last of them will be chosen
     */
    function copyPlaces() {
        let venues = E40Instance.getSelectedPlaces();
        let ids = [];
        for (let i = 0; i < venues.length; i++) {
            let id = E40Instance.copyPlace(venues[i]);
            ids.push(id);
        }
        E40Instance.selectVenues(ids);
    }
    /**
     * wmeSDK.Map.enablePolygonResize()
     */
    function enablePolygonResize() {
        console.log('%c' + NAME + ': %cenable resize for Polygon', 'color: #0DAD8D; font-weight: bold', 'color: dimgray; font-weight: normal');
        let places = E40Instance.getSelectedPlaces();
        if (places.length) {
            E40Instance.wmeSDK.Map.enablePolygonResize();
        }
    }
    /**
     * wmeSDK.Map.enablePolygonRotation()
     */
    function enablePolygonRotation() {
        console.log('%c' + NAME + ': %cenable rotation for Polygon', 'color: #0DAD8D; font-weight: bold', 'color: dimgray; font-weight: normal');
        let places = E40Instance.getSelectedPlaces();
        if (places.length) {
            E40Instance.wmeSDK.Map.enablePolygonRotation();
        }
    }

    // https://fontawesome.com/v4/icons/
    function getPlaceButtons() {
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
        };
    }
    function getPointButtons() {
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
        };
    }
    function getTabButtons() {
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
        };
    }

    const TYPES = {
        boardwalk: 10,
        stairway: 16,
        railroad: 18,
        runway: 19};

    const layerConfig = {
        styleContext: {},
        styleRules: [
            {
                predicate: (properties) => properties.styleName === "styleNode",
                style: {
                    pointRadius: 4,
                    fillColor: '#ffffff',
                    strokeColor: '#14e2d9',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    // graphicName: 'x',
                    graphicZIndex: 9999,
                },
            },
            {
                predicate: (properties) => properties.styleName === "styleLine",
                style: {
                    strokeWidth: 3,
                    strokeColor: '#14e2d9',
                    strokeLinecap: 'round',
                    graphicZIndex: 9999,
                }
            },
            {
                predicate: (properties) => properties.styleName === "styleSecondaryLine",
                style: {
                    strokeWidth: 2,
                    strokeColor: '#ffffff',
                    strokeLinecap: 'round',
                    graphicZIndex: 9999,
                }
            },
            {
                predicate: (properties) => properties.styleName === "styleDashedLine",
                style: {
                    strokeWidth: 2,
                    strokeColor: '#ffffff',
                    strokeLinecap: 'round',
                    strokeDashstyle: 'dash',
                    graphicZIndex: 9999,
                }
            },
            {
                predicate: (properties) => properties.styleName === "styleDashedSecondaryLine",
                style: {
                    strokeWidth: 1,
                    strokeColor: '#ffffff',
                    strokeLinecap: 'round',
                    strokeDashstyle: 'dash',
                    graphicZIndex: 9999,
                }
            }
        ],
    };

    /**
     * Creates a GeoJSON Polygon representing a circle centered at a given point
     * with a radius calculated from a desired area in square meters.
     *
     * @param {object} centerPoint - A GeoJSON Point feature (e.g., turf.point([lon, lat])).
     * @param {number} areaSqMeters - The desired area of the circle in square meters (m²).
     * @param {number} [steps=64] - The number of steps/segments to create the circle (higher = smoother).
     * @returns {object} A GeoJSON Polygon Feature representing the circle.
     */
    function createCirclePolygon(centerPoint, areaSqMeters, steps = 64) {
        if (centerPoint.type !== 'Point') {
            throw new Error('Invalid centerPoint: Must be a GeoJSON Point feature.');
        }
        if (typeof areaSqMeters !== 'number' || areaSqMeters <= 0) {
            throw new Error('Invalid areaSqMeters: Must be a positive number.');
        }
        // 1. Calculate the required radius (R) from the Area (A)
        // The formula for the area of a circle is: A = π * R²
        // Rearranging for the radius: R = sqrt(A / π)
        const radiusMeters = Math.sqrt(areaSqMeters / Math.PI);
        // 2. Convert the radius from meters to kilometers (Turf.js default unit)
        const radiusKilometers = radiusMeters / 1000;
        // 3. Use turf.circle to create the polygon
        return turf.circle(centerPoint, radiusKilometers, {
            steps: steps,
            units: 'kilometers' // Explicitly set units, though it's the default
        });
    }
    /**
     * Creates a GeoJSON Polygon representing a square centered at a given point
     * with a side length calculated from a desired area in square meters.
     *
     * @param {object} centerPoint - A GeoJSON Point feature (e.g., turf.point([lon, lat])).
     * @param {number} areaSqMeters - The desired area of the square in square meters (m²).
     * @returns {object} A GeoJSON Polygon Feature representing the square.
     */
    function createSquarePolygon(centerPoint, areaSqMeters) {
        if (centerPoint.type !== 'Point') {
            throw new Error('Invalid centerPoint: Must be a GeoJSON Point feature.');
        }
        if (typeof areaSqMeters !== 'number' || areaSqMeters <= 0) {
            throw new Error('Invalid areaSqMeters: Must be a positive number.');
        }
        // 1. Calculate the required Side Length (S) from the Area (A)
        // The formula for the area of a square is: A = S²
        // Rearranging for the side length: S = sqrt(A)
        const sideLengthMeters = Math.sqrt(areaSqMeters);
        // 2. Calculate the distance from the center to any edge of the square
        // This is half the side length: HalfSide = S / 2
        const halfSideMeters = sideLengthMeters / 2;
        // 3. Since Turf.js typically handles distances in kilometers, convert the half-side.
        const halfSideKilometers = halfSideMeters / 1000;
        // 4. Calculate the bounding box (bbox) coordinates
        // We can use a combination of `turf/destination` or, more simply for a centered square,
        // manually calculate the offsets using Turf's distance handling for min/max coordinates.
        // However, a simpler approach is to calculate the bounding box for the square's corners.
        // A centered square's extent is defined by its center coordinates +/- (half-side in distance units).
        // The `turf/bbox` function is often used to get the extent of a feature, but here we need
        // to calculate the BBOX based on a distance from the center point.
        // Calculate the geographic bounding box [west, south, east, north]
        // Due to the complexities of Earth's curvature, calculating precise coordinates
        // by simply adding/subtracting distances (especially for large squares) is difficult.
        // A robust, though slightly over-engineered, way is to use the `turf/buffer` function
        // to approximate the square's corners.
        // A simpler approach for small, localized areas is to calculate the min/max coordinates
        // by using the `turf/transformScale` on a unit square. However, this is more complex.
        // A common and practical approximation for *small* areas:
        // const [lon, lat] = centerPoint.coordinates;
        // For simplicity, we'll use an approximation based on latitude/longitude differences.
        // WARNING: This approximation is only accurate for very small areas or near the equator.
        // For a highly accurate square, you would use geodesic distance functions (like turf/destination)
        // to find the four corners based on the center point and the half-side distance.
        // --- Robust Geodesic Calculation for the Four Corners ---
        const options = { units: 'kilometers' };
        // 45 degrees: Northeast, 135 degrees: Northwest, 225 degrees: Southwest, 315 degrees: Southeast
        const cornerNE = turf.destination(centerPoint, halfSideKilometers * Math.SQRT2, 45, options);
        const cornerSW = turf.destination(centerPoint, halfSideKilometers * Math.SQRT2, 225, options);
        const minLon = cornerSW.geometry.coordinates[0];
        const minLat = cornerSW.geometry.coordinates[1];
        const maxLon = cornerNE.geometry.coordinates[0];
        const maxLat = cornerNE.geometry.coordinates[1];
        // The BBOX format is [minX, minY, maxX, maxY] => [west, south, east, north]
        const calculatedBbox = [minLon, minLat, maxLon, maxLat];
        // 5. Use turf.bboxPolygon to create the square polygon from the bounding box
        return turf.bboxPolygon(calculatedBbox);
    }
    /**
     * Iteratively simplifies a GeoJSON Polygon ring by removing points that form
     * an angle between 175° and 180° with their neighbors.
     * @param {object} geojsonObject A GeoJSON Feature<Polygon> or Polygon geometry object.
     * @returns {object} The simplified GeoJSON Polygon geometry object (type: "Polygon").
     */
    function simplifyPolygon(geojsonObject) {
        let points = geojsonObject.coordinates[0].slice();
        const MIN_UNIQUE_POINTS = 4; // A, B, C, A (length 4) means 3 unique points (a triangle)
        const MIN_ANGLE = 175.0;
        const MAX_ANGLE = 185.0;
        let pointsRemoved = 0;
        let iteration = 0;
        console.log("--- Starting Polygon Simplification (175° to 185° removal) ---");
        while (points.length > MIN_UNIQUE_POINTS) {
            iteration++;
            let pointIndexToRemove = -1;
            // Check points from index 1 up to length - 2.
            for (let i = 1; i < points.length - 1; i++) {
                const angle = GeoUtils.findAngle(points[i - 1], points[i], points[i + 1]);
                if (angle >= MIN_ANGLE && angle <= MAX_ANGLE) {
                    pointIndexToRemove = i;
                    console.log(`[Iter ${iteration}] Found point to remove at index ${i} (${points[i].map((c) => c.toFixed(2)).join(', ')}). Angle: ${angle.toFixed(4)}°`);
                    break; // Remove only one point per iteration
                }
            }
            if (pointIndexToRemove !== -1) {
                points.splice(pointIndexToRemove, 1);
                pointsRemoved++;
                // Update the closure point
                points[points.length - 1] = points[0];
                console.log(`[Iter ${iteration}] Point removed. New length: ${points.length}. Unique points remaining: ${points.length - 1}.`);
            }
            else {
                console.log(`[Iter ${iteration}] No point found in the angle range [${MIN_ANGLE}°, ${MAX_ANGLE}°]. Stopping.`);
                break;
            }
        }
        if (points.length <= MIN_UNIQUE_POINTS) {
            console.log(`Reached minimum size of 3 unique points (array length ${points.length}). Stopping.`);
        }
        console.log(`--- Simplification Finished. Total points removed: ${pointsRemoved} ---`);
        return {
            type: "Polygon",
            coordinates: [points]
        };
    }
    /**
     * Moves vertices (P_curr) that form a near-90° angle (85-89.9 or 90.1-95)
     * to a new position (P'_curr) that forms exactly 90°.
     * @param {object} geojsonObject A GeoJSON Feature<Polygon> or Polygon geometry object.
     * @returns {object} The angle-normalized GeoJSON Polygon geometry object.
     */
    function normalizeRightAngles(geojsonObject) {
        let points = geojsonObject.coordinates[0].slice();
        let pointsAdjusted = 0;
        let totalIterations = 0;
        let changedInPass = true;
        console.log("--- Starting Angle Normalization (Near 90° adjustment) ---");
        // Iterate until no points are adjusted in a full pass
        while (changedInPass && totalIterations < 10) { // Safety limit for iterations
            changedInPass = false;
            totalIterations++;
            console.log(`[Iter ${totalIterations}] Start`);
            // Check points from index 1 up to length - 2.
            for (let i = 1; i < points.length; i++) {
                const pPrev = points[i - 1];
                const pCurr = points[i];
                const pNext = (i === points.length - 1) ? points[1] : points[i + 1];
                const angle = GeoUtils.findAngle(pPrev, pCurr, pNext);
                console.log(`[Point ${i}] Angle:`, angle.toFixed(4));
                // Check if the angle is in the target normalization ranges
                const inRange1 = angle >= 75.0 && angle <= 89.9;
                const inRange2 = angle >= 90.1 && angle <= 105.0;
                if (inRange1 || inRange2) {
                    // Round coordinates to 6 decimal places for GeoJSON compatibility
                    points[i] = GeoUtils.findRightAngleIntersection(pPrev, pCurr, pNext);
                    let new_angle = GeoUtils.findAngle(pPrev, points[i], pNext);
                    pointsAdjusted++;
                    changedInPass = true;
                    console.log(`[Point ${i}] Angle ${angle.toFixed(4)}° adjusted to ${new_angle.toFixed(4)}°.`);
                    // The loop continues in the same pass. If points[i] is adjusted,
                    // it affects the angle calculations for P_{i-1} and P_{i+1} in the next passes.
                }
            }
        }
        // Ensure the closure point is updated after all adjustments
        points[points.length - 1] = points[0];
        console.log(`--- Normalization Finished. Total points adjusted: ${pointsAdjusted} in ${totalIterations} passes. ---`);
        return {
            type: "Polygon",
            coordinates: [points]
        };
    }

    class E40 extends WMEBase {
        constructor(name, settings, tabButtons, placeButtons, pointButtons) {
            super(name, settings);
            this.initHelper();
            this.initTab(tabButtons);
            this.initPlacePanel(placeButtons);
            this.initShortcuts(placeButtons);
            this.initPointPanel(pointButtons);
            this.initLayer();
            this.initHandlers();
        }
        /**
         * Initializes the helper instance for the class
         * by creating a new WMEUIHelper object.
         */
        initHelper() {
            this.helper = new WMEUIHelper(this.name);
        }
        /**
         * Initialize the tab with buttons
         * @param {Object} buttons
         */
        initTab(buttons) {
            let tab = this.helper.createTab(I18n.t(this.name).title, {
                sidebar: this.wmeSDK.Sidebar,
                image: GM_info.script.icon
            });
            tab.addText('description', I18n.t(this.name).description);
            if (this.wmeSDK.State.getUserInfo().rank >= REQUIRED_LEVEL) {
                tab.addButtons(buttons);
            }
            else {
                tab.addText('warning', I18n.t(this.name).warning);
            }
            /** @type {WMEUIHelperFieldset} */
            let fsOptions = this.helper.createFieldset(I18n.t(this.name).options.title);
            let options = this.settings.get('options');
            for (let item in options) {
                if (options.hasOwnProperty(item)) {
                    fsOptions.addCheckbox(item, I18n.t(this.name).options[item], (event) => this.settings.set(['options', item], event.target.checked), this.settings.get('options', item));
                }
            }
            tab.addElement(fsOptions);
            tab.addDiv('text', I18n.t(this.name).help);
            tab.addText('info', '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version);
            tab.addText('blue', 'made in');
            tab.addText('yellow', 'Ukraine');
            tab.inject();
        }
        initPlacePanel(buttons) {
            this.placePanel = this.helper.createPanel(I18n.t(this.name).title);
            this.placePanel.addButtons(buttons);
        }
        initPointPanel(buttons) {
            this.pointPanel = this.helper.createPanel(I18n.t(this.name).title);
            this.pointPanel.addButtons(buttons);
        }
        initShortcuts(buttons) {
            for (let btn in buttons) {
                if (buttons.hasOwnProperty(btn)) {
                    let button = buttons[btn];
                    if (button.hasOwnProperty('shortcut')) {
                        let shortcut = {
                            callback: button.callback,
                            description: button.description,
                            shortcutId: this.id + '-' + btn,
                            shortcutKeys: button.shortcut,
                        };
                        if (shortcut.shortcutKeys && this.wmeSDK.Shortcuts.areShortcutKeysInUse({ shortcutKeys: shortcut.shortcutKeys })) {
                            this.log('Shortcut already in use');
                            shortcut.shortcutKeys = null;
                        }
                        this.wmeSDK.Shortcuts.createShortcut(shortcut);
                    }
                }
            }
        }
        initLayer() {
            this.wmeSDK.Map.addLayer({
                layerName: this.name,
                styleRules: layerConfig.styleRules,
                styleContext: layerConfig.styleContext
            });
            this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
        }
        initHandlers() {
            this.wmeSDK.Events.trackDataModelEvents({ dataModelName: "venues" });
            this.wmeSDK.Events.on({
                eventName: "wme-data-model-objects-changed",
                eventHandler: ({ dataModelName, objectIds }) => {
                    this.refreshPanel();
                    let selected = this.getSelectedVenue();
                    if (dataModelName === 'venues'
                        && selected
                        && objectIds.length > 0
                        && objectIds.indexOf(selected.id) !== -1
                        && this.settings.get('options', 'navigationPoint')) {
                        this.removeVectors();
                        this.showVector(selected.id);
                    }
                }
            });
            if (this.settings.get('options', 'navigationPointOnHover')) {
                this.wmeSDK.Events.trackLayerEvents({ layerName: "venues" });
                this.wmeSDK.Events.on({
                    eventName: "wme-layer-feature-mouse-enter",
                    eventHandler: ({ featureId }) => {
                        this.showVector(featureId);
                    },
                });
                this.wmeSDK.Events.on({
                    eventName: "wme-layer-feature-mouse-leave",
                    eventHandler: ({ featureId }) => {
                        let selected = this.getSelectedVenue();
                        if (selected?.id !== featureId) {
                            this.removeVector(this.wmeSDK.DataModel.Venues.getById({ venueId: featureId }));
                        }
                    },
                });
            }
        }
        showVector(featureId) {
            let venue = this.wmeSDK.DataModel.Venues.getById({ venueId: featureId });
            let center;
            if (venue.geometry.type === 'Polygon') {
                center = turf.centroid(venue.geometry).geometry.coordinates;
            }
            else {
                center = venue.geometry.coordinates;
            }
            let segments = this.wmeSDK.DataModel.Segments.getAll();
            let except = [TYPES.boardwalk, TYPES.stairway, TYPES.railroad, TYPES.runway];
            segments = segments.filter((segment) => except.indexOf(segment.roadType) === -1);
            if (venue.navigationPoints.length) {
                for (let i = 0; i < venue.navigationPoints.length; i++) {
                    let point = venue.navigationPoints[i].point.coordinates;
                    let nearestPoint = this.findNearestPoint(segments, point);
                    this.createVector(featureId + '_' + i, center, point, (i === 0) ? 'styleDashedLine' : 'styleDashedSecondaryLine');
                    this.createVector(featureId + '_' + i, point, nearestPoint, (i === 0) ? 'styleLine' : 'styleSecondaryLine');
                    if (i === 0
                        && !this.settings.get('options', 'navigationPointAll')) {
                        break;
                    }
                }
            }
            else {
                let nearestPoint = this.findNearestPoint(segments, center);
                this.createVector(featureId, center, nearestPoint, 'styleLine');
            }
            this.showLayer();
        }
        /**
         * Finds the nearest point to a given point from a set of segments.
         *
         * @param {Array} segments - An array of segments where each segment contains a geometry property representing a line.
         * @param {Object} point - The reference point to find the nearest point to.
         * @return {Array} An array representing the coordinates of the nearest point to the given point.
         */
        findNearestPoint(segments, point) {
            let nearestPoint, nearestPointCoordinates = [], nearestPointDistance;
            for (let i = 0; i < segments.length; i++) {
                let segment = segments[i];
                try {
                    nearestPoint = turf.nearestPointOnLine(segment.geometry, point);
                    let distance = turf.distance(nearestPoint, point, {
                        units: 'meters'
                    });
                    if (nearestPointDistance === undefined || distance < nearestPointDistance) {
                        nearestPointDistance = distance;
                        nearestPointCoordinates = nearestPoint.geometry.coordinates;
                    }
                }
                catch (e) {
                    this.log('Error while finding nearest point');
                }
            }
            return nearestPointCoordinates;
        }
        /**
         * Create the vector by coordinates
         * @param {String} featureId
         * @param {[Number,Number]} from coordinates
         * @param {[Number,Number]} to coordinates
         * @param {String} styleName style name
         */
        createVector(featureId, from, to, styleName = 'styleLine') {
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
        removeVector(venue) {
            let featureIds = [];
            if (venue.navigationPoints?.length) {
                for (let i = 0; i < venue.navigationPoints.length; i++) {
                    let featureId = venue.id + '_' + i;
                    if (i === 0) {
                        featureIds.push(`styleLine_from_${featureId}`);
                        featureIds.push(`styleLine_to_${featureId}`);
                        featureIds.push(`styleLine_line_${featureId}`);
                        featureIds.push(`styleDashedLine_from_${featureId}`);
                        featureIds.push(`styleDashedLine_to_${featureId}`);
                        featureIds.push(`styleDashedLine_line_${featureId}`);
                    }
                    else {
                        featureIds.push(`styleSecondaryLine_from_${featureId}`);
                        featureIds.push(`styleSecondaryLine_to_${featureId}`);
                        featureIds.push(`styleSecondaryLine_line_${featureId}`);
                        featureIds.push(`styleDashedSecondaryLine_from_${featureId}`);
                        featureIds.push(`styleDashedSecondaryLine_to_${featureId}`);
                        featureIds.push(`styleDashedSecondaryLine_line_${featureId}`);
                    }
                }
            }
            else {
                let featureId = venue.id;
                featureIds = [
                    `styleLine_from_${featureId}`,
                    `styleLine_to_${featureId}`,
                    `styleLine_line_${featureId}`,
                ];
            }
            this.wmeSDK.Map.removeFeaturesFromLayer({ layerName: this.name, featureIds });
        }
        /**
         * Remove all vectors from the layer
         */
        removeVectors() {
            this.wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: this.name });
        }
        /**
         * Show the Layer
         */
        showLayer() {
            this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true });
        }
        /**
         * Hide the Layer
         */
        hideLayer() {
            this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
        }
        /**
         * Handler for `place.wme` event
         * @param {jQuery.Event} event
         * @param {HTMLElement} element
         * @param {Venue} model
         */
        onPlace(event, element, model) {
            if (this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: model.id })) {
                this.createPlacePanel(event, element);
            }
        }
        /**
         * Handler for `point.wme` event
         * @param {jQuery.Event} event
         * @param {HTMLElement} element
         * @param {Venue} model
         */
        onPoint(event, element, model) {
            if (this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: model.id })) {
                this.createPointPanel(event, element);
            }
        }
        /**
         * Handler for `venue.wme` event
         * @param {jQuery.Event} event
         * @param {HTMLElement} element
         * @param {Venue} model
         */
        onVenue(event, element, model) {
            if (this.settings.get('options', 'navigationPoint')) {
                this.showVector(model.id);
            }
        }
        /**
         * Handler for `venues.wme` event
         * @param {jQuery.Event} event
         * @param {HTMLElement} element
         * @param {Venue[]} models
         * @return {Null}
         */
        onVenues(event, element, models) {
            models = models.filter((model) => !model.isResidential
                && this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: model.id }));
            if (models.length > 0) {
                if (models[0].geometry.type === 'Polygon') {
                    this.createPlacePanel(event, element);
                }
                else {
                    this.createPointPanel(event, element);
                }
            }
        }
        /**
         * Handler for `none.wme` event
         * @return {Null}
         */
        onNone() {
            this.removeVectors();
            this.hideLayer();
        }
        /**
         * @param {String[]} except
         * @return {Venue[]} models
         */
        getAllPlaces(except = []) {
            let venues = this.getAllVenues(except);
            return venues.filter((venue) => venue.geometry.type === 'Polygon');
        }
        /**
         * @return {Venue[]} models
         */
        getSelectedPlaces() {
            let venues = this.getSelectedVenues();
            return venues.filter((venue) => venue.geometry.type === 'Polygon');
        }
        /**
         * Create the panel with buttons
         * @param event
         * @param {HTMLElement} element
         */
        createPlacePanel(event, element) {
            if (element?.querySelector('div.form-group.e40')) {
                return;
            }
            element?.prepend(this.placePanel.html());
            this.updateLabel();
        }
        /**
         * Create the panel with buttons
         * @param event
         * @param {HTMLElement} element
         */
        createPointPanel(event, element) {
            if (element?.querySelector('div.form-group.e40')) {
                return;
            }
            element?.prepend(this.pointPanel.html());
            this.updateLabel();
        }
        /**
         * Refresh the panel if something was changed
         */
        refreshPanel() {
            let venue = this.getSelectedVenue();
            let element = document.getElementById('venue-edit-general');
            element?.querySelector('div.form-group.e40')?.remove();
            if (venue) {
                if (venue.geometry.type === 'Polygon') {
                    this.createPlacePanel(null, element);
                }
                else {
                    this.createPointPanel(null, element);
                }
            }
        }
        /**
         * Updated label
         */
        updateLabel() {
            let places = this.getSelectedVenues();
            if (places.length === 0) {
                return;
            }
            let info = [];
            for (let i = 0; i < places.length; i++) {
                let place = places[i];
                if (place.geometry.type === 'Polygon') {
                    info.push(Math.round(turf.area(place.geometry)) + 'm²');
                }
            }
            let label = I18n.t(NAME).title;
            if (info.length) {
                label += ' (' + info.join(', ') + ')';
            }
            let elm = document.querySelector('div.form-group.e40 wz-label');
            if (elm)
                elm.innerText = label;
        }
        /**
         * Scale places to X m²
         * @param {Venue[]} elements
         * @param {Number} x square meters
         * @param {Boolean} orMore flag
         */
        scale(elements, x, orMore = false) {
            this.group('scale ' + (elements.length) + ' element(s) to ' + x + 'm²');
            let total = 0;
            for (let i = 0; i < elements.length; i++) {
                try {
                    let scale = Math.sqrt((x + 5) / turf.area(elements[i].geometry));
                    if (scale < 1 && orMore) {
                        continue;
                    }
                    let geometry = turf.transformScale(elements[i].geometry, scale);
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: elements[i].id, geometry
                    });
                    total++;
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was scaled');
            this.groupEnd();
        }
        /**
         * Orthogonalize place(s)
         * @param {Venue[]} elements
         */
        orthogonalize(elements) {
            this.group('orthogonalize ' + (elements.length) + ' element(s)');
            let total = 0;
            // skip points
            for (let i = 0; i < elements.length; i++) {
                try {
                    let geometry = elements[i].geometry;
                    let area = turf.area(elements[i].geometry);
                    geometry = simplifyPolygon(geometry);
                    geometry = normalizeRightAngles(geometry);
                    let scale = Math.sqrt(area / turf.area(geometry));
                    this.log('Apply scale ' + scale);
                    geometry = turf.transformScale(geometry, scale);
                    if (!this.compare(elements[i].geometry.coordinates[0], geometry.coordinates[0])) {
                        this.wmeSDK.DataModel.Venues.updateVenue({
                            venueId: elements[i].id, geometry
                        });
                        total++;
                    }
                    else {
                        this.log('The geometry is the same as before, skipped');
                    }
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was orthogonalized');
            this.groupEnd();
        }
        /**
         * Smooth place(s)
         * @param {Venue[]} elements
         */
        smooth(elements) {
            this.group('smooth ' + (elements.length) + ' element(s)');
            let total = 0;
            for (let i = 0; i < elements.length; i++) {
                try {
                    let geometry = turf.polygonSmooth(elements[i].geometry).features[0].geometry;
                    if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
                        this.wmeSDK.DataModel.Venues.updateVenue({
                            venueId: elements[i].id, geometry
                        });
                        total++;
                    }
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was smoothed');
            this.groupEnd();
        }
        /**
         * Simplify place(s)
         * @param {Venue[]} elements
         * @param {Number} tolerance
         */
        simplify(elements, tolerance = 0.00001) {
            this.group('simplify ' + (elements.length) + ' element(s) with < tolerance=' + tolerance + ' >');
            let total = 0;
            for (let i = 0; i < elements.length; i++) {
                try {
                    let geometry = turf.simplify(elements[i].geometry, { tolerance });
                    if (geometry.coordinates[0].length !== elements[i].geometry.coordinates[0].length) {
                        this.wmeSDK.DataModel.Venues.updateVenue({
                            venueId: elements[i].id, geometry
                        });
                        total++;
                    }
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was simplified');
            this.groupEnd();
        }
        /**
         * Transform the Point to circle place
         *
         * @param {Venue[]} elements
         * @param {Number} area in square meters
         * @param {Number} steps
         */
        circle(elements, area, steps = 64) {
            this.group('transform ' + (elements.length) + ' element(s) to circle');
            let total = 0;
            for (let i = 0; i < elements.length; i++) {
                try {
                    let place = elements[i];
                    let geometry = place.geometry;
                    if (geometry.type !== 'Point') {
                        geometry = turf.centroid(geometry).geometry;
                    }
                    let circle = createCirclePolygon(geometry, area, steps);
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: place.id, geometry: circle.geometry
                    });
                    total++;
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was transformed');
            this.groupEnd();
            this.selectVenues(elements.map((e) => String(e.id)));
        }
        /**
         * Transform the Point(s) to square place
         *
         * @param {Venue[]} elements
         * @param {Number} area in square meters
         */
        square(elements, area) {
            this.group('transform ' + (elements.length) + ' element(s) to square');
            let total = 0;
            for (let i = 0; i < elements.length; i++) {
                try {
                    let place = elements[i];
                    let geometry = place.geometry;
                    if (geometry.type !== 'Point') {
                        geometry = turf.centroid(geometry).geometry;
                    }
                    let square = createSquarePolygon(geometry, area);
                    this.wmeSDK.DataModel.Venues.updateVenue({
                        venueId: place.id, geometry: square.geometry
                    });
                    total++;
                }
                catch (e) {
                    this.log('skipped', e);
                }
            }
            this.log(total + ' element(s) was transformed');
            this.groupEnd();
            this.selectVenues(elements.map((e) => String(e.id)));
        }
        /**
         * @param {String[]} ids of venues
         */
        selectVenues(ids) {
            this.wmeSDK.Editing.clearSelection();
            // select changed elements
            setTimeout(() => this.wmeSDK.Editing.setSelection({ selection: {
                    ids: ids,
                    objectType: 'venue'
                } }), 100);
        }
        /**
         * Create copy for place
         * @param {Venue} venue
         * @return {String}
         */
        copyPlace(venue) {
            this.log('created a copy of the POI ' + venue.name);
            let geometry = turf.transformTranslate(venue.geometry, 0.01, 0.005);
            let venueId = this.wmeSDK.DataModel.Venues.addVenue({
                category: venue.categories[0],
                geometry: geometry
            });
            venueId = String(venueId);
            this.wmeSDK.DataModel.Venues.updateVenue({
                venueId,
                name: venue.name + ' (copy)',
                // isAdLocked: venue.isAdLocked,
                // isResidential: venue.isResidential,
            });
            let address = this.wmeSDK.DataModel.Venues.getAddress({ venueId: venue.id });
            if (address?.street?.id) {
                this.wmeSDK.DataModel.Venues.updateAddress({
                    venueId,
                    streetId: address.street.id,
                });
            }
            return venueId;
        }
        /**
         * Compare two polygons point-by-point
         *
         * @param {Array} coordinates1
         * @param {Array} coordinates2
         * @return boolean
         */
        compare(coordinates1, coordinates2) {
            if (coordinates1.length !== coordinates2.length) {
                return false;
            }
            for (let i = 0; i < coordinates1.length; i++) {
                if (Math.abs(coordinates1[i][0] - coordinates2[i][0]) > .000001
                    || Math.abs(coordinates1[i][1] - coordinates2[i][1]) > .000001) {
                    return false;
                }
            }
            return true;
        }
    }

    var css_248z = ".e40 .controls {\n  display: grid;\n  grid-template-columns: repeat(6, 44px);\n  gap: 6px;\n  padding: 0;\n}\n\n.e40 .button-toolbar {\n  padding: 8px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0 6px;\n  align-items: center;\n}\n\n.e40 .button-toolbar button.e40 {\n  min-height: 30px;\n  line-height: 25px;\n  margin-bottom: 16px;\n}\n\n.e40 button.e40 {\n  width: 44px;\n  margin: 0;\n  padding: 2px;\n  display: flex;\n  justify-content: center;\n  border: 1px solid #eee;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  white-space: nowrap;\n  color: #333;\n  flex-wrap: wrap;\n  align-content: center;\n}\n\n.e40 button.e40:hover {\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 0 100px 100px rgba(255, 255, 255, 0.3);\n}\n\n.e40 button.e40-M,\n.e40 button.e40-N,\n.e40 button.e40-O,\n.e40 button.e40-P,\n.e40 button.e40-R,\n.e40 button.e40-S {\n  min-height: 50px;\n}\n\n.form-group.e40 legend {\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: bold;\n  width: auto;\n  text-align: right;\n  border: 0;\n  margin: 0;\n  padding: 0 8px;\n}\n\n.form-group.e40 fieldset {\n  border: 1px solid #ddd;\n  padding: 8px;\n  width: 100%;\n  margin-bottom: 16px;\n}\n\nsection.tab-pane .form-group.e40 div.controls {\n  display: block;\n  padding: 8px;\n}\n\nsection.tab-pane .form-group.e40 div.controls:empty,\n#panel-container .archive-panel .body:empty {\n  min-height: 20px;\n}\n\nsection.tab-pane .form-group.e40 div.controls:empty::after,\n#panel-container .archive-panel .body:empty::after {\n  color: #ccc;\n  padding: 0 8px;\n  content: \"\\2014\";\n}\n\nsection.tab-pane .form-group.e40 div.controls label {\n  white-space: normal;\n  font-weight: normal;\n  margin-top: 5px;\n  line-height: 18px;\n  font-size: 13px;\n}\n\nsection.tab-pane .form-group.e40 div.controls input[type=\"text\"] {\n  float: right;\n}\n\nsection.tab-pane .form-group.e40 div.controls input[type=\"number\"] {\n  float: right;\n  width: 60px;\n  text-align: right;\n}\n\n#sidebar p.e40 {\n  width: 100%;\n}\n\n#sidebar p.e40-info {\n  border-top: 1px solid #ccc;\n  color: #777;\n  font-size: x-small;\n  margin-top: 15px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n#sidebar p.e40-warning {\n  color: #f77;\n}\n\n#sidebar p.e40-blue {\n  background-color: #0057B8;\n  color: white;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n\n#sidebar p.e40-yellow {\n  background-color: #FFDD00;\n  color: black;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n";

    WMEUI.addTranslation(NAME, TRANSLATION);
    WMEUI.addStyle(css_248z);
    $(document).on('bootstrap.wme', () => {
        let instance = new E40(NAME, SETTINGS, getTabButtons(), getPlaceButtons(), getPointButtons());
        setE40Instance(instance);
    });

})();
