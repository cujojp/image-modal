/**
 * @fileoverview The carousel file will load data via Flickr and
 * create a carousel with the data. The slides are generated via
 * this class and appended within the carousel wrapper element.
 *
 * @author Kaleb White
 */
(function($) {

  'use strict';

  var module = { 
    init: function() {
      var $modules = $('.carousel-wrapper');

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

    /**
     * Base carousel element.
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$carousel = null;

    /**
     * An array of photos and content from
     * the API call.
     *
     * @type {array}
     * @private
     */
    this._photoArray = [];

    /**
     * The total number of slides in the carousel.
     *
     * @type {Number}
     * @private
     */
    this._numSlides = 0;

    /**
     * The current slide index. 
     *
     * @type {Number}
     * @private
     */
    this._currentSlideIndex = 0;

    /**
     * Previous slide index.
     *
     * @type {Number}
     * @private
     */
    this._lastSlideIndex = 0;

    /**
     * Slide elements wihtin the carousel. 
     *
     * @type {Array|Element}
     * @private
     */
    this._slideElements = [];

    /**
     * Previous toggle element for the carousel.
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$previousToggle = null;

    /**
     * Next toggle element for the carousel.
     *
     * @type {jQuery|Element}
     * @private
     */
    this._$nextToggle = null;


    this._init();
  };



  /** @enum {string} */
  Carousel.Events = {
    CLICK: 'click',
  };

  /** @enum {string} */
  Carousel.Selectors = {
    APP: 'app',
    BASE: 'carousel-wrapper',
    CAROUSEL: 'carousel',
    SLIDE: 'carousel__slide',
    SLIDE_INNER: 'carousel__slide-inner',
    TOGGLE_NEXT: 'pagination--next',
    TOGGLE_PREV: 'pagination--prev',
    ACTIVE_SLIDE: 'slide--active',
    TITLE_WRAP: 'carousel__title-wrap',
    TITLE: 'carousel__title',
  };

  /** @enum {string} */
  Carousel.Data = {
    FLICKR_API: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=3dbee32548f1cd079ca529cd35388b9c&photoset_id=72157626579923453&format=json&nojsoncallback=1',
    IMAGE_URI: 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_b.jpg',
  };
  
  /**
   * _init
   * initializes the carousel module.
   *
   * @private
   */
  Carousel.prototype._init = function() {
    this._getPhotoArray();

    this._$carousel = this._$el.find(
      '.' + Carousel.Selectors.CAROUSEL);

    this._$previousToggle = this._$el.find(
      '.' + Carousel.Selectors.TOGGLE_PREV);

    this._$nextToggle = this._$el.find(
      '.' + Carousel.Selectors.TOGGLE_NEXT);
  };

  /**
   * _initializeCarouselBindings
   * Will create event listsners for the carousel.
   *
   * @private
   */
  Carousel.prototype._initializeCarouselBindings = function() {
    this._$previousToggle.on(
      Carousel.Events.CLICK,
      $.proxy(this._previousSlide, this));

    this._$nextToggle.on(
      Carousel.Events.CLICK,
      $.proxy(this._nextSlide, this));
  };

  /**
   * _getData
   * runs an ajax request and gets the data from the 
   * API call. Will fire a callback if success or failed.
   *
   * @private
   */
  Carousel.prototype._getPhotoArray = function() {
    $.ajax({
      url: Carousel.Data.FLICKR_API,
      data: {},
      success: $.proxy(this._handleDataSucces, this),
      dataType: 'json'
    });
  };

  /**
   * _handleDataSucces
   * Will handle the data that was successfully retrieved via
   * _getPhotoArray method.
   *
   * @param {Object} data
   * @private
   */
  Carousel.prototype._handleDataSucces = function(data) {
    if (data.photoset && data.photoset.photo.length) {
      this._populateImageObject(data.photoset.photo);
      this._createCarousel();
      this._initializeCarouselBindings();
    }
  };

  /**
   * _populateImageObject
   * Will populate an object with image URI's and image titles.
   * This will be used to populate the carousel with slides.
   *
   * @param {Array} arr // image array
   * @private
   */
  Carousel.prototype._populateImageObject = function(arr) {
    var i = 0;
    var len = arr.length;

    for (i; i < len; i++) {
      var imageObj = {};
      var currImage = arr[i];
      var imageURI = this._getImageURI(currImage);
              
      imageObj.src = imageURI;
      imageObj.title = currImage.title;

      this._photoArray.push(imageObj);
    }

  };

  /**
   * _getImageURI
   * Will create an image URI based on the image properties
   * and return it as a string.
   *
   * @param {Object} image
   * @return {string}
   * @private
   */
  Carousel.prototype._getImageURI  = function(image) {
    var uri = Carousel.Data.IMAGE_URI
          .replace('{farm-id}', image.farm)
          .replace('{server-id}', image.server)
          .replace('{id}', image.id)
          .replace('{secret}', image.secret);

    return uri;
  };

  /**
   * _createCarousel
   * Will delegate tasks and create a base carousel within the
   * base element.
   *
   * @private
   */
  Carousel.prototype._createCarousel = function() {
    var i = 0;
    var len = this._photoArray.length;

    for (i; i < len; i++) {
      var image = this._photoArray[i];
      var slide = this._createSlide(image, i);

      this._slideElements.push(slide);
      this._$carousel[0].appendChild(slide);
    }

    this._gotoSlide(0);
    this._numSlides = i-1;
  };

  /**
   * _createSlide
   * Will create a slide and append it within the base 
   * element.
   *
   * @param {Object} image
   * @param {Number} int
   * @private
   *
   * @return {Element}
   */
  Carousel.prototype._createSlide = function(image, int) {
    var slideElement = document.createElement('div');
    var imgElement = document.createElement('div');
    var $titleElement = $(
      '<div class="' + Carousel.Selectors.TITLE_WRAP + '"><span class="'+ Carousel.Selectors.TITLE + '">' + image.title + '</span></div>');

    slideElement.className = Carousel.Selectors.SLIDE;
    slideElement.id = 'slide-'+int;
    imgElement.style.backgroundImage = 'url("' + image.src + '")';
    imgElement.className = Carousel.Selectors.SLIDE_INNER;

    // append the elements to the slides.
    slideElement.appendChild(imgElement);
    slideElement.appendChild($titleElement[0]);

    return slideElement;
  };

  /**
   * _nextSlide
   * Will go to the next possible slide within the carousel.
   *
   * @private
   */
  Carousel.prototype._nextSlide = function() {
    var direction = this._currentSlideIndex+1;
    var possibleIndex = this._getPossibleIndex(direction);

    if (possibleIndex != this._lastSlideIndex) {
      this._gotoSlide(possibleIndex);
    }

    this._lastSlideIndex = this._currentSlideIndex;
    this._currentSlideIndex = possibleIndex;    
  };

  /**
   * _previousSlide
   * Goes to the previous slide on the carousel.
   *
   * @private
   */
  Carousel.prototype._previousSlide = function() {
    var direction = this._currentSlideIndex-1;
    var possibleIndex = this._getPossibleIndex(direction);

    if (possibleIndex != this._lastSlideIndex) {
      this._gotoSlide(possibleIndex);
    }

    this._lastSlideIndex = this._currentSlideIndex;
    this._currentSlideIndex = possibleIndex;    
  };


  /**
   * _gotoSlide
   * Will go to the specific slide if given an index.
   *
   * @param {Number} index
   * @private
   */
  Carousel.prototype._gotoSlide = function(index) {
    var $slides = $(this._slideElements);

    $slides.removeClass(
      Carousel.Selectors.ACTIVE_SLIDE);
    $slides.eq(index).addClass(
      Carousel.Selectors.ACTIVE_SLIDE);

    this._currentSlideIndex = index;
  };

  /**
   * _getPossibleIndex
   * Returns the next possible index of the carousel. 
   * And current number of slides within the carousel.
   *
   * @param {Number} dir 
   * @return {Object}
   * @private
   */
  Carousel.prototype._getPossibleIndex = function(dir) {
    var index;

    if (dir > this._numSlides) {
      index = this._numSlides;
    } else if (dir < 0) { 
      index = 0;
    } else {
      index = dir;
    }

    return index;
  };

  /**
   * getIndex
   * Will return the current index of the carousel.
   *
   * @return {Number}
   * @private
   */
  Carousel.prototype.getIndex = function() {
    return this._currentSlideIndex;
  };

  // quickly instaniate the Module class.
  app._Modules.Carousel = module;
  app._Modules.Carousel.init();

})(jQuery);
