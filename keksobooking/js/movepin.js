'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_AFTER_HEIGHT = 22;
  var TOP_MAX = 630;
  var TOP_MIN = 130;

  var map = window.utils.map;
  var adForm = window.utils.adForm;
  var mainPin = window.utils.mainPin;
  var mapWidth = map.offsetWidth;
  var addressInput = adForm.querySelector('input#address');
  var mainPinX = mainPin.offsetLeft;
  var mainPinY = mainPin.offsetTop;

  var getPinLeftValue = function (coord) {
    if (coord < 0 - Math.floor(MAIN_PIN_SIZE / 2)) {
      mainPin.style.left = -Math.floor(MAIN_PIN_SIZE / 2) + 'px';
    } else if (coord > mapWidth - Math.floor(MAIN_PIN_SIZE / 2)) {
      mainPin.style.left = (mapWidth - Math.floor(MAIN_PIN_SIZE / 2)) + 'px';
    } else {
      mainPin.style.left = coord + 'px';
    }
  };

  var getPinTopValue = function (coord) {
    if (coord < TOP_MIN - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) {
      mainPin.style.top = (TOP_MIN - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) + 'px';
    } else if (coord > TOP_MAX - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) {
      mainPin.style.top = (TOP_MAX - MAIN_PIN_SIZE - MAIN_PIN_AFTER_HEIGHT) + 'px';
    } else {
      mainPin.style.top = coord + 'px';
    }
  };

  var getAdress = function (pinParameterX, pinParameterY) {
    var addressX = mainPinX + pinParameterX;
    var addressY = mainPinY + pinParameterY;
    var adressValue = addressX + ', ' + addressY;
    return adressValue;
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    addressInput.value = getAdress(Math.floor(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftFin = mainPin.offsetLeft - shift.x;
      var topFin = mainPin.offsetTop - shift.y;

      getPinLeftValue(leftFin);
      getPinTopValue(topFin);

      addressInput.value = (leftFin + Math.floor(MAIN_PIN_SIZE / 2)) + ', ' + (topFin + MAIN_PIN_SIZE + MAIN_PIN_AFTER_HEIGHT);
    };

    var mainPinMouseUpHandler = function () {
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });
})();
