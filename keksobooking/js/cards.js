'use strict';

(function () {
  var map = window.utils.map;

  var removeBlocksFromArray = function (element, selector) {
    var collection = element.querySelector(selector).children;
    Array.from(collection).forEach(function (item) {
      item.remove();
    });
  };

  var appendBlocksFromArray = function (array, parentBlock) {
    array.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + item;
      parentBlock.appendChild(featureElement);
    });
  };

  var deleteUndefinedTextContent = function (block) {
    var elements = block.children;
    Array.from(elements).forEach(function (element) {
      if (element.textContent === undefined) {
        block.removeChild(element);
      }
    });
    return block;
  };

  var deleteUndefined = function (elementsArray, element) {
    if (elementsArray === undefined || elementsArray.length === 0) {
      element.classList.add('visually-hidden');
    }
  };

  var renderPhotos = function (element, selector, photos) {
    if (photos.length > 0) {
      element.querySelector(selector).src = photos[0];
      for (var i = 1; i < photos.length; i++) {
        var photoElement = element.querySelector(selector).cloneNode(true);
        photoElement.src = photos[i];
        element.querySelector('.popup__photos').appendChild(photoElement);
      }
    }
  };

  var getRoomsString = function (roomsNumber) {
    if (roomsNumber % 10 === 0 || roomsNumber % 10 >= 5) {
      return ' комнат для ';
    } else if (roomsNumber % 10 === 1) {
      return ' комната для ';
    }
    return ' комнаты для ';
  };
  var getGuestsString = function (guestsNumber) {
    if (guestsNumber % 10 === 1) {
      return ' гостя';
    }
    return ' гостей';
  };

  var renderCard = function (ads) {
    // ищем темплейт
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    // клонируем темплейт
    var cardElement = cardTemplate.cloneNode(true);
    // наполняем
    cardElement.querySelector('.popup__title').textContent = ads.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ads.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.utils.typesList[ads.offer.type].type;
    cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + getRoomsString(ads.offer.rooms) + ads.offer.guests + getGuestsString(ads.offer.guests);
    var times = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    cardElement.querySelector('.popup__text--time').textContent = times;
    removeBlocksFromArray(cardElement, '.popup__features');
    appendBlocksFromArray(ads.offer.features, cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__description').textContent = ads.offer.description;
    deleteUndefined(ads.offer.photos, cardElement.querySelector('.popup__photos'));
    renderPhotos(cardElement, '.popup__photo', ads.offer.photos);
    cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

    deleteUndefinedTextContent(cardElement);
    return cardElement;
  };

  var createCard = function (ads) {
    window.utils.fragment.appendChild(renderCard(ads));
    map.insertBefore(window.utils.fragment, map.querySelector('.map__filters-container'));
    var newCard = map.querySelector('article');
    var cardCloseButton = newCard.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      window.cards.closePopup();
    });
    document.addEventListener('keydown', closePopupEsc);
  };
  var openPopup = function (ads) {
    if (map.querySelector('article')) {
      window.cards.closePopup();
    }
    createCard(ads);
  };

  var closePopup = function () {
    map.querySelector('article').remove();
    document.removeEventListener('keydown', closePopupEsc);
  };

  var closePopupEsc = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  window.cards = {
    closePopup: closePopup,
    openPopup: openPopup
  };
})();
