/**
 * @fileoverview Module Information
 * @author Kaleb White
 */
(function($) {

  'use strict';

  var module = { 
    init: function() {
      var $modules = $('.modal');

      return $modules.map(function (i, element) {
        return new Modal(element);
      });
    }
  };

  /**
   * @param {Element} element - The root element for this module.
   * @constructor
   */
  var Modal = function (element) {

  /**
   * Base app selector
   *
   * @type {jQuery|Element}
   * @private
   */
    this._$app = null;

    /**
     * Base window element
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$window = $(window);

    /**
     * Base element.
     *
     * @type {Element}
     * @private
     */
    this._element = element;

    /**
     * Base jQuery element.
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$el = $(element);


    /**
     * Toggle element for the modal
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$toggle = null;

    /**
     * Boolean to determine if the modal is active
     * versus inactive
     *
     * @type {Boolean}
     * @private
     */
    this._isActive = false;

    /**
     * Document fragment of the modal.
     *
     * @type {Fragment|Element}
     * @private
     */
    this._modalFragment = null;

    /**
     * Overlay jQuery element.
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$overlay = null;

    /**
     * Overlay element.
     *
     * @type {Element}
     * @private
     */
    this._overlay = null;



    this._init();
  };

  

  /** @enum {string} */
  Modal.Events = {
    CLICK: 'click',
  };

  /** @enum {string} */
  Modal.Selectors = {
    APP: 'app',
    TOGGLE: 'modal-toggle',
    BASE: 'modal',
    OVERLAY:'modal-overlay',
    MODAL_INNER:'modal__inner',
    WRAP: 'modal--wrapper',
    DISABLED: 'modal--disabled',
  };

  /**
   * _init
   * initializes the carousel module.
   *
   * @private
   */
  Modal.prototype._init = function() {
    this._$app = $(
      '.' + Modal.Selectors.APP);
    this._$toggle = this._$app.find(
      '.' + Modal.Selectors.TOGGLE);
    this._$modalInner = this._$el.find(
      '.' + Modal.Selectors.MODAL_INNER);

    this._initalizeBindings();
  };

  /**
   * _initalizeBindings
   * initializes all the bindings and event listeners for
   * the modal.
   *
   * @private
   */
  Modal.prototype._initalizeBindings = function() {
    this._$toggle.on(
      Modal.Events.CLICK,
      $.proxy(this._toggleModal, this));

  };

  /**
   * _createModalFragment
   * Will create a document fragment of the modal to append
   * to the app when toggled.
   *
   * @private
   */
  Modal.prototype._createModalFragment = function() {
    var modalFragment = document.createDocumentFragment();

    modalFragment.appendChild(this._element);
    this._modalFragment = modalFragment;
  };

  /**
   * _toggleModal
   * Will handle click events for when the trigger is clicked.
   *
   * @param {Object} evt event object
   * @private
   */
  Modal.prototype._toggleModal = function(evt) {
    evt.preventDefault();

    // set if the modal is active versus not.
    this._isActive = !this._isActive;

    if (this._isActive) {
      this._openModal();
    } else {
      this._closeModal();
    }
  };

  /**
   * _styleModal
   * Will get the window height and width and style the
   * modal based on those properties.
   *
   * @private
   */
  Modal.prototype._styleModal = function() {
    var winHeight = this._$window.height();
    var winWidth = this._$window.width();
    var width = ((winWidth - 200) <= 320) ? 300 : (winWidth - 200);
    var height = width * 0.625; // 8x5 aspect

    this._$modalInner.css({
      height: height,
      width: width
    });
  };

  /**
   * _openModal
   * Will open and display the modal based on if 
   * its active.
   *
   * @private
   */
  Modal.prototype._openModal = function() {
    this._createModalFragment();
    this._styleModal();

    this._$app[0].appendChild(this._modalFragment);
    this._$el.removeClass(Modal.Selectors.DISABLED);

    this._createOverlay();
    this._createModalBindings();
  };



  /**
   * _closeModal
   * Will close and hide the modal based on
   * if its active.
   *
   * @private
   */
  Modal.prototype._closeModal = function() {
    this._$el.addClass(Modal.Selectors.DISABLED);
    this._modalFragment = null;

    this._$app[0].removeChild(this._element);
    this._destroyOverlay();
  };

  /**
   * _createOverlay
   * Will create an overlay instance on the app.
   *
   * @private
   */
  Modal.prototype._createOverlay = function() {
    var overlay = document.createElement('div');

    overlay.className = Modal.Selectors.OVERLAY;
    this._element.appendChild(overlay);
    this._$overlay = $(overlay);
  };

  /**
   * _destroyOverlay
   * Will destroy the overlay elements within the app.
   *
   * @private
   */
  Modal.prototype._destroyOverlay = function() {
    this._element.removeChild(this._$overlay[0]);
    this._overlay = null;
  };

  /**
   * _createModalBindings
   * Creates bindings specifically to the modal element.
   *
   * @private
   */
  Modal.prototype._createModalBindings = function() {
    this._$overlay.on(
      Modal.Events.CLICK,
      $.proxy(this._toggleModal, this));

  };

  /**
   * _destroyModalBindings
   * Will destroy the bindings to the modal elements.
   *
   * @private
   */
  Modal.prototype._destroyModalBindings = function() {
    this._$overlay.off(Modal.Events.CLICK);
  };
  

  // quickly instaniate the Module class.
  app._Modules.Modal = module;
  app._Modules.Modal.init();

})(jQuery);

