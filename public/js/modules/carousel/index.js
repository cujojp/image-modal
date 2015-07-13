/**
 * @fileoverview Module Information
 * @author Kaleb White
 */
(function($) {

  'use strict';

  var module = { 
    init: function() {
      var $modules = $('.carousel');

      return $modules.map(function (i, element) {
        return new Carousel(element);
      });
    }
  };    


  /**
   * @param {HTMLDOMElement} element - The root element for this module.
   * @constructor
   */
  var Carousel = function (element) {

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

    this._init();
  };



  /** @enum {string} */
  Carousel.Events = {
    CLICK: 'click',
  };

  /** @enum {string} */
  Carousel.Selectors = {
    APP: 'app',
    BASE: 'carousel',
    SLIDE: 'carousel__slide',
  };  

  /**
   * _init
   * initializes the carousel module.
   *
   * @return
   */
  Carousel.prototype._init = function() {

  };


  /**
   * _nextSlide
   * Will go to the next possible slide within the carousel.
   *
   * @private
   */
  Carousel.prototype._nextSlide = function() {

  };

  /**
   * _previousSlide
   * Goes to the previous slide on the carousel.
   *
   * @private
   */
  Carousel.prototype._previousSlide = function() {

  };

  /**
   * _isFirstSlide
   * Returns if the carousel is on the first possible slide.
   *
   * @return {Boolean}
   * @private
   */
  Carousel.prototype._isFirstSlide = function() {


  };

  /**
   * _isLastSlide
   * Returns if the carousel is on the last possible slide or not.
   *
   * @return {Boolean}
   * @private
   */
  Carousel.prototype._isLastSlide = function() {

  };

  /**
   * _getPossibleIndex
   * Returns the next possible index of the carousel. 
   * And current number of slides within the carousel.
   *
   * @return {Object}
   * @private
   */
  Carousel.prototype._getPossibleIndex = function() {

  };

  /**
   * getIndex
   * Will return the current index of the carousel.
   *
   * @return {Number}
   * @private
   */
  Carousel.prototype.getIndex = function() {

  };

  // quickly instaniate the Module class.
  app._Modules.Carousel = module;
  app._Modules.Carousel.init();

})(jQuery);
