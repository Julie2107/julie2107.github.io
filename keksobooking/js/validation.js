'use strict';

(function () {
  var main = window.utils.main;
  var adForm = window.utils.adForm;
  var inputRoomsNumber = adForm.querySelector('#room_number');
  var inputGuestsNumber = adForm.querySelector('#capacity');
  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var checkInInput = adForm.querySelector('#timein');
  var checkOutInput = adForm.querySelector('#timeout');

  var getCapacityValidationMessage = function (evt) {
    var guestValue = +inputGuestsNumber.value;
    var roomsValue = +inputRoomsNumber.value;
    if ((guestValue === 0 && roomsValue !== 100) || (guestValue !== 0 && roomsValue === 100)) {
      evt.preventDefault();
      inputRoomsNumber.setCustomValidity('Опция "100 комнат" предназначена не для гостей');
    } else if (guestValue > roomsValue) {
      evt.preventDefault();
      inputRoomsNumber.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      inputRoomsNumber.setCustomValidity('');
    }
  };
  var getPriceValidation = function () {
    var typeValue = typeInput.value;
    priceInput.setAttribute('min', window.utils.typesList[typeValue].minprice);
    priceInput.setAttribute('placeholder', window.utils.typesList[typeValue].minprice);
  };
  var checkInOutValidation = function () {
    checkOutInput.addEventListener('change', function () {
      checkInInput.value = checkOutInput.value;
    });

    checkInInput.addEventListener('change', function () {
      checkOutInput.value = checkInInput.value;
    });
  };

  adForm.addEventListener('input', function (evt) {
    getCapacityValidationMessage(evt);
    getPriceValidation();
    checkInOutValidation();
  });

  var formSuccessHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    var hideSuccessMessage = function () {
      successMessage.classList.add('visually-hidden');
    };
    if (main.querySelector('.success')) {
      main.querySelector('.success').classList.remove('visually-hidden');
    } else {
      main.appendChild(successMessage);
    }
    window.desactivation.deactivateMap();
    successMessage.addEventListener('click', function () {
      hideSuccessMessage();
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, hideSuccessMessage);
    });
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), formSuccessHandler, window.error.errorHandler);
  });

  adFormResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.desactivation.deactivateMap();
  });

})();
