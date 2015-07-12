/**
 * @fileoverview Module Information
 * @author Kaleb White
 */
(function($) {

  'use strict';

  var Module = function () {
    var $modules = $('.' + app._Modules.Modal.Selectors.BASE);

    return $modules.map(function (i, element) {
      return new Modal(element);
    });
  };


  /**
   * @param {HTMLDOMElement} element - The root element for this module.
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

  /**
   * _init
   * initializes the carousel module.
   *
   * @private
   */
  Modal.prototype._init = function() {
    this._$app = $(
      '.' + app._Modules.Modal.Selectors.APP);

    this._$toggle = this._$app.find(
      '.' + app._Modules.Modal.Selectors.TOGGLE);
        
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
      app._Modules.Modal.Events.CLICK,
      $.proxy(this._handleTrigger, this));

  };

  /**
   * _handleTrigger
   * Will handle click events for when the trigger is clicked.
   *
   * @param {Object} evt event object
   * @private
   */
  Modal.prototype._handleTrigger = function(evt) {
    
    console.log('click');

  };

  // quickly instaniate the Module class.
  app._Modules.Modal = new Module();

})(jQuery);
