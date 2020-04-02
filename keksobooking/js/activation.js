'use strict';

(function () {
  var ADS_AMOUNT = 5;

  var map = window.utils.map;
  var adForm = window.utils.adForm;
  var mainPin = window.utils.mainPin;
  var adFormFieldsets = window.utils.adFormFieldsets;
  var filter = window.utils.filter;
  var mapFilters = filter.children;
  var offers = [];

  var undoElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var filterOffersContent = function (advertisments) {
    var filteredAdvertisments = advertisments.filter(function (advert) {
      return advert.offer !== undefined;
    });
    return filteredAdvertisments;
  };

  var successHandler = function (ads) {
    var filteredByOffer = filterOffersContent(ads);
    window.pins.paintPins(filteredByOffer.slice(0, ADS_AMOUNT));
    undoElementsDisabled(mapFilters);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    undoElementsDisabled(adFormFieldsets);
    window.backend.download(successHandler, window.error.errorHandler);
    mainPin.removeEventListener('mousedown', window.desactivation.mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', window.desactivation.mainPinKeyDownHandler);
  };

  window.activation = {
    activateMap: activateMap,
    offers: offers
  };

})();
