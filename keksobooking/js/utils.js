'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var filter = document.querySelector('.map__filters');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var main = document.querySelector('main');

  window.utils = {
    fragment: fragment,
    map: map,
    adForm: adForm,
    mainPin: mainPin,
    filter: filter,
    adFormFieldsets: adFormFieldsets,
    main: main,

    typesList: {
      palace: {
        type: 'Дворец',
        minprice: '10000'
      },
      flat: {
        type: 'Квартира',
        minprice: '1000'
      },
      house: {
        type: 'Дом',
        minprice: '5000'
      },
      bungalo: {
        type: 'Бунгало',
        minprice: 0
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };
})();
