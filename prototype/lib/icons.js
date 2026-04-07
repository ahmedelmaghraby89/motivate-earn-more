/**
 * Breadfast Design System — Icon Helper
 * ======================================
 *
 * Provides utility functions for rendering SVG icons from the
 * Breadfast icon sprite (icons.svg).
 *
 * Usage:
 *   bfIcon('home-outline')
 *   // => '<svg class="bf-icon" aria-hidden="true" …><use href="icons.svg#icon-home-outline"></use></svg>'
 *
 *   bfIcon('home-outline', 'icon icon-sm icon-primary')
 *   // => '<svg class="icon icon-sm icon-primary" aria-hidden="true" …><use href="icons.svg#icon-home-outline"></use></svg>'
 *
 *   bfIcon('cart-default', { class: 'icon-lg', size: 32, label: 'Shopping cart' })
 *   // => '<svg class="icon-lg" role="img" aria-label="Shopping cart" width="32" height="32" …>…</svg>'
 *
 * DOM insertion:
 *   bfIconEl('home-outline', 'icon icon-sm')
 *   // => returns an actual SVGElement ready for appendChild / insertBefore
 *
 * @module icons
 * @version 1.0.0
 * @generated 2026-02-23
 */

(function (root, factory) {
  // UMD – works as CommonJS, AMD, or a plain browser global.
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var api = factory();
    root.bfIcon   = api.bfIcon;
    root.bfIconEl = api.bfIconEl;
    root.BF_ICONS = api.BF_ICONS;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------------

  /**
   * Path to the SVG sprite file.  Override via BF_ICON_SPRITE_PATH
   * before loading this script, or call bfIconConfig({ spritePath }).
   */
  var _spritePath =
    (typeof BF_ICON_SPRITE_PATH !== 'undefined' && BF_ICON_SPRITE_PATH) ||
    'icons.svg';

  /**
   * Default CSS class applied when no custom class is provided.
   */
  var _defaultClass = 'bf-icon';

  // ---------------------------------------------------------------
  // Icon catalogue
  // ---------------------------------------------------------------

  /**
   * Complete list of available icon names.
   * Useful for validation, auto-complete helpers, or building
   * documentation / icon galleries.
   */
  var BF_ICONS = [
    'activity-history',
    'add',
    'alert',
    'alert-circle',
    'bell',
    'cart-default',
    'cart-filled',
    'checkmark-circle',
    'checkmark-circle-filled',
    'chevron-left',
    'chevron-right',
    'close-outline',
    'delete',
    'dropdown',
    'heart',
    'heart-filled',
    'home-filled',
    'home-outline',
    'info',
    'loading',
    'location-pin',
    'minus',
    'more',
    'navigate',
    'pay',
    'search-filled',
    'search-outline',
    'settings',
    'star'
  ];

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------

  /**
   * Normalise the second argument into an options object.
   *
   * @param {string|object} [opts] – either a class-name string or an
   *   options hash with { class, size, label, spritePath }.
   * @returns {object}
   */
  function _normalise(opts) {
    if (!opts) return {};
    if (typeof opts === 'string') return { class: opts };
    return opts;
  }

  // ---------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------

  /**
   * Update global configuration values.
   *
   * @param {object} cfg
   * @param {string} [cfg.spritePath]   – relative or absolute URL to icons.svg
   * @param {string} [cfg.defaultClass] – CSS class used when none is supplied
   */
  function bfIconConfig(cfg) {
    if (cfg.spritePath)   _spritePath   = cfg.spritePath;
    if (cfg.defaultClass) _defaultClass = cfg.defaultClass;
  }

  /**
   * Return an HTML string for a given icon.
   *
   * @param {string} name – icon name without the "icon-" prefix
   *   (e.g. 'home-outline', 'cart-default').
   * @param {string|object} [opts] – CSS class string, or options object:
   *   - class      {string}  CSS class(es) for the <svg> element
   *   - size       {number}  sets both width and height attributes
   *   - width      {number}  explicit width (overrides size)
   *   - height     {number}  explicit height (overrides size)
   *   - label      {string}  accessible label (adds role="img" + aria-label)
   *   - spritePath {string}  override the sprite URL for this call only
   * @returns {string} SVG markup ready for innerHTML / insertAdjacentHTML
   *
   * @example
   *   document.getElementById('nav-icon').innerHTML = bfIcon('home-outline');
   *
   * @example
   *   var html = bfIcon('cart-default', { class: 'icon-lg text-primary', size: 24 });
   */
  function bfIcon(name, opts) {
    var o         = _normalise(opts);
    var cls       = o.class || _defaultClass;
    var sprite    = o.spritePath || _spritePath;
    var href      = sprite + '#icon-' + name;
    var sizeAttrs = '';
    var a11y;

    // Dimensions ---------------------------------------------------
    var w = o.width  || o.size;
    var h = o.height || o.size;
    if (w) sizeAttrs += ' width="'  + w + '"';
    if (h) sizeAttrs += ' height="' + h + '"';

    // Accessibility ------------------------------------------------
    if (o.label) {
      a11y = 'role="img" aria-label="' + o.label + '"';
    } else {
      a11y = 'aria-hidden="true"';
    }

    return (
      '<svg class="' + cls + '" ' + a11y +
      ' focusable="false"' + sizeAttrs + '>' +
      '<use href="' + href + '"></use>' +
      '</svg>'
    );
  }

  /**
   * Return a real SVGElement for a given icon (useful for
   * programmatic DOM manipulation).
   *
   * @param {string} name – icon name (same rules as bfIcon)
   * @param {string|object} [opts] – same options as bfIcon
   * @returns {SVGElement}
   *
   * @example
   *   document.querySelector('.btn').prepend(bfIconEl('add', 'btn-icon'));
   */
  function bfIconEl(name, opts) {
    var SVG_NS  = 'http://www.w3.org/2000/svg';
    var XLINK   = 'http://www.w3.org/1999/xlink';

    var o       = _normalise(opts);
    var cls     = o.class || _defaultClass;
    var sprite  = o.spritePath || _spritePath;
    var href    = sprite + '#icon-' + name;

    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', cls);
    svg.setAttribute('focusable', 'false');

    // Accessibility
    if (o.label) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', o.label);
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }

    // Dimensions
    var w = o.width  || o.size;
    var h = o.height || o.size;
    if (w) svg.setAttribute('width',  w);
    if (h) svg.setAttribute('height', h);

    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttributeNS(XLINK, 'xlink:href', href);   // legacy compat
    use.setAttribute('href', href);                     // modern browsers
    svg.appendChild(use);

    return svg;
  }

  // ---------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------

  return {
    bfIcon:       bfIcon,
    bfIconEl:     bfIconEl,
    bfIconConfig: bfIconConfig,
    BF_ICONS:     BF_ICONS
  };
}));
