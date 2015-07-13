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
   * _toggleModal
   * Will handle click events for when the trigger is clicked.
   *
   * @param {Object} evt event object
   * @private
   */
  Modal.prototype._toggleModal = function(evt) {

    // set if the modal is active versus not.
    this._isActive = !this._isActive;

    if (this._isActive) {
      this._openModal();
    } else {
      this._closeModal();
    }

  };

  /**
   * _openModal
   * Will open and display the modal based on if 
   * its active.
   *
   * @private
   */
  Modal.prototype._openModal = function() {
    console.log('this._openModal');

    this._createOverlay();
    this._createModalBindings();
    this._$el.removeClass(
      Modal.Selectors.DISABLED);

  };

  /**
   * _closeModal
   * Will close and hide the modal based on
   * if its active.
   *
   * @private
   */
  Modal.prototype._closeModal = function() {
    console.log('this._closeModal');
    this._$el.addClass (
      Modal.Selectors.DISABLED);

  };

  /**
   * _createOverlay
   * Will create an overlay instance on the app.
   *
   * @private
   */
  Modal.prototype._createOverlay = function() {

  };

  /**
   * _destroyOverlay
   * Will destroy the overlay elements within the app.
   *
   * @private
   */
  Modal.prototype._destroyOverlay = function() {

  };

  /**
   * _createModalBindings
   * Creates bindings specifically to the modal element.
   *
   * @private
   */
  Modal.prototype._createModalBindings = function() {

  };

  /**
   * _destroyModalBindings
   * Will destroy the bindings to the modal elements.
   *
   * @private
   */
  Modal.prototype._destroyModalBindings = function() {

  };
  

  // quickly instaniate the Module class.
  app._Modules.Modal = module;
  app._Modules.Modal.init();

})(jQuery);

