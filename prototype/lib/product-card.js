/**
 * Breadfast Design System — Product Card Helper
 * =============================================
 *
 * Lightweight DOM behavior for the product card component.
 * It adds tap/click interactions for:
 *   - favorite toggle
 *   - add to cart -> quantity stepper
 *   - quantity increase / decrease
 *   - notify me toggle for OOS cards
 *
 * Usage:
 *   <script src="/ui/product-card.js"></script>
 *   <script>bfProductCardInit();</script>
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.bfProductCardInit = factory().bfProductCardInit;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function iconMarkup(name, variant) {
    var iconClass = 'icon icon-md ' + variant;
    var viewBox = name === 'bell' ? '0 0 17.58 19.96' : name === 'minus' ? '0 0 12 1.25' : '0 0 20.02 20.02';
    return '<span class="' + iconClass + '"><svg viewBox="' + viewBox + '"><use href="#icon-' + name + '"></use></svg></span>';
  }

  function find(card, selector) {
    return card.querySelector(selector);
  }

  function ensureStepper(card) {
    var stepper = find(card, '.product-card__stepper');
    if (stepper) return stepper;

    var wrap = find(card, '.product-card__image-wrap');
    if (!wrap) return null;

    stepper = document.createElement('div');
    stepper.className = 'product-card__stepper product-card__stepper--items-added';
    stepper.setAttribute('aria-label', 'Selected quantity');
    stepper.innerHTML =
      '<div class="product-card__stepper-shell">' +
        '<button class="product-card__stepper-btn product-card__stepper-btn--minus" type="button" aria-label="Decrease quantity">' +
          iconMarkup('minus', 'icon-error') +
        '</button>' +
        '<span class="product-card__stepper-value">1</span>' +
        '<button class="product-card__stepper-btn product-card__stepper-btn--plus" type="button" aria-label="Increase quantity">' +
          iconMarkup('add', 'icon-inverse') +
        '</button>' +
      '</div>';
    wrap.appendChild(stepper);
    return stepper;
  }

  function setFavorite(button, isFavorite) {
    if (!button) return;
    button.setAttribute('aria-pressed', isFavorite ? 'true' : 'false');
    button.classList.toggle('is-favorite', isFavorite);
    button.innerHTML = isFavorite
      ? iconMarkup('heart-filled', 'icon-primary')
      : iconMarkup('heart', 'icon-tertiary');
  }

  function renderActionButton(card, state) {
    var button = find(card, '.product-card__floating-action');
    if (!button) return;

    var icon = button.querySelector('.icon');
    if (!icon) return;

    button.classList.remove('product-card__floating-action--secondary', 'product-card__floating-action--success');

    if (state === 'oos') {
      button.hidden = false;
      button.classList.add('product-card__floating-action--secondary');
      button.setAttribute('aria-label', 'Notify me when this product is back in stock');
      button.innerHTML = iconMarkup('bell', 'icon-primary');
      return;
    }

    if (state === 'notified') {
      button.hidden = false;
      button.classList.add('product-card__floating-action--success');
      button.setAttribute('aria-label', 'Notification enabled for this product');
      button.innerHTML = iconMarkup('bell', 'icon-success');
      return;
    }

    button.hidden = false;
    button.setAttribute('aria-label', 'Add to cart');
    button.innerHTML = iconMarkup('add', 'icon-inverse');
  }

  function renderStepper(card, qty, max) {
    var stepper = ensureStepper(card);
    if (!stepper) return;

    var value = find(stepper, '.product-card__stepper-value');
    var plus = find(stepper, '.product-card__stepper-btn--plus');

    stepper.hidden = false;
    stepper.classList.toggle('product-card__stepper--limit', qty >= max);
    stepper.classList.toggle('product-card__stepper--items-added', qty < max);
    if (value) value.textContent = String(qty);
    if (plus) plus.disabled = qty >= max;
  }

  function render(card) {
    var state = card.dataset.state || 'default';
    var qty = Number(card.dataset.qty || 0);
    var max = Number(card.dataset.max || 2);
    var favorite = card.dataset.favorite === 'true';

    setFavorite(find(card, '.product-card__favorite'), favorite);

    var action = find(card, '.product-card__floating-action');
    var stepper = find(card, '.product-card__stepper');

    if (state === 'selected') {
      if (action) action.hidden = true;
      renderStepper(card, qty || 1, max);
      return;
    }

    if (stepper) stepper.hidden = true;
    renderActionButton(card, state);
  }

  function onCardClick(event) {
    var target = event.target.closest('button');
    if (!target) return;

    var card = event.currentTarget;

    if (target.classList.contains('product-card__favorite')) {
      card.dataset.favorite = card.dataset.favorite === 'true' ? 'false' : 'true';
      render(card);
      return;
    }

    if (target.classList.contains('product-card__floating-action')) {
      var currentState = card.dataset.state || 'default';
      if (currentState === 'oos') {
        card.dataset.state = 'notified';
      } else if (currentState === 'notified') {
        card.dataset.state = 'oos';
      } else {
        card.dataset.state = 'selected';
        card.dataset.qty = '1';
      }
      render(card);
      return;
    }

    if (target.classList.contains('product-card__stepper-btn--plus')) {
      var max = Number(card.dataset.max || 2);
      var qty = Number(card.dataset.qty || 1);
      card.dataset.qty = String(Math.min(qty + 1, max));
      card.dataset.state = 'selected';
      render(card);
      return;
    }

    if (target.classList.contains('product-card__stepper-btn--minus')) {
      var currentQty = Number(card.dataset.qty || 1) - 1;
      if (currentQty <= 0) {
        card.dataset.qty = '0';
        card.dataset.state = 'default';
      } else {
        card.dataset.qty = String(currentQty);
        card.dataset.state = 'selected';
      }
      render(card);
    }
  }

  function bfProductCardInit(rootNode) {
    var root = rootNode || document;
    var cards = root.querySelectorAll('[data-product-card]');

    cards.forEach(function (card) {
      if (!card.dataset.favorite) card.dataset.favorite = 'false';
      if (!card.dataset.max) card.dataset.max = '2';
      if (!card.__bfProductCardBound) {
        card.addEventListener('click', onCardClick);
        card.__bfProductCardBound = true;
      }
      render(card);
    });
  }

  return {
    bfProductCardInit: bfProductCardInit
  };
}));
