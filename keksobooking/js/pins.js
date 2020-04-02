'use strict';

(function () {
  var pinsList = document.querySelector('.map__pins');

  var createFragment = function (data, element) {
    data.forEach(function (item) {
      window.utils.fragment.appendChild(element(item));
    });
  };

  var renderPin = function (ads) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style.left = (ads.location.x - pinImage.width / 2) + 'px';
    pinElement.style.top = (ads.location.y - pinImage.height) + 'px';
    pinImage.src = ads.author.avatar;
    pinImage.alt = ads.offer.title;

    return pinElement;
  };

  var paintPins = function (data) {
    // создаем фрагмент из пинов
    createFragment(data, renderPin);
    // добавляем фрагмент из пинов в блок
    pinsList.appendChild(window.utils.fragment);
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');

    var checkPinActive = function () {
      var checkedPin = document.querySelector('.map__pin--active');
      if (checkedPin) {
        checkedPin.classList.remove('map__pin--active');
      }
    };

    pins.forEach(function (pin, i) {
      pin.addEventListener('click', function () {
        checkPinActive();
        pin.classList.add('map__pin--active');
        window.cards.openPopup(data[i]);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          checkPinActive();
          pin.classList.add('map__pin--active');
          window.cards.openPopup(data[i]);
        }
      });
    });
  };

  window.pins = {
    paintPins: paintPins,
    createFragment: createFragment
  };
})();
