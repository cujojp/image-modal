/**
 * @fileoverview Module Information
 * @author Kaleb White
 */
(function($) {

  'use strict';

  var Module = function () {
    var $modules = $('');

    return $modules.map(function (i, element) {
      return new Carousel(element);
    });
  };


  /**
   * @param {HTMLDOMElement} element - The root element for this module.
   * @constructor
   */
  var Carousel = function (element) {
    this._element = element;
    this._$el = $(element);

    this._init();
  };


  /**
   * _init
   * initializes the carousel module.
   *
   * @return
   */
  Carousel.prototype._init = function() {

  };

})(jQuery);
