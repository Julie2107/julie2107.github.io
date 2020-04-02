'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;
  var DEFAULT_PIN_COORDINATES = 'left: 570px; top: 375px;';

  var adForm = document.querySelector('.ad-form');
  var map = window.utils.map;
  var mainPin = window.utils.mainPin;
  var adFormFieldsets = window.utils.adFormFieldsets;
  var filter = window.utils.filter;
  var pinsList = document.querySelector('.map__pins');
  var mapFilters = filter.children;

  var doElementsDisabled = function (elementsCollection) {
    Array.from(elementsCollection).forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  var deletePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length !== 0) {
      pins.forEach(function (item) {
        item.remove();
      });
    }
  };

  // Помощник, переводящий страницу в активный режим по нажатию левой кнопки мыши
  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === LEFT_MOUSE_BUTTON) {
      window.activation.activateMap();
    }
  };

  // Помощник, переводящий страницу в активный режим по нажатию клавиши Энтер
  var mainPinKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, window.activation.activateMap);

  };

  var closeOpenedPopup = function () {
    if (map.querySelector('article')) {
      window.cards.closePopup();
    }
  };

  var deactivateMap = function () {
    mainPin.style = DEFAULT_PIN_COORDINATES;
    adForm.reset();
    filter.reset();
    window.photosupload.resetPhoto();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    doElementsDisabled(adFormFieldsets);
    doElementsDisabled(mapFilters);
    deletePins();
    closeOpenedPopup();
    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.addEventListener('keydown', mainPinKeyDownHandler);
  };

  deactivateMap();

  window.desactivation = {
    deactivateMap: deactivateMap,
    mainPinMouseDownHandler: mainPinMouseDownHandler,
    mainPinKeyDownHandler: mainPinKeyDownHandler,
    deletePins: deletePins,
    closeOpenedPopup: closeOpenedPopup
  };

})();
