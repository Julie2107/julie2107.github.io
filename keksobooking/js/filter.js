'use strict';

(function () {
  var ADS_AMOUNT = 5;
  var ANY_TYPE = 'any';
  var priceValues = {
    middle: 10000 - 50000,
    low: 10000,
    high: 50000
  };

  var filter = window.utils.filter;
  var typeFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-rooms');
  var guestsFilter = filter.querySelector('#housing-guests');
  var featuresList = filter.querySelector('#housing-features');
  var filteredAds = [];

  var setTypeFilter = function (ad) {
    return (typeFilter.value === ANY_TYPE) ? true : ad.offer.type === typeFilter.value;
  };

  var setPriceFilter = function (ad) {
    var priceMap = {
      'high': ad.offer.price > priceValues.high,
      'low': ad.offer.price < priceValues.low,
      'middle': ad.offer.price >= priceValues.low && ad.offer.price <= priceValues.high
    };
    return (priceFilter.value === ANY_TYPE) ? true : priceMap[priceFilter.value];
  };

  var setRoomsFilter = function (ad) {
    return (roomsFilter.value === ANY_TYPE) ? true : ad.offer.rooms.toString() === roomsFilter.value;
  };

  var setGuestsFilter = function (ad) {
    return (guestsFilter.value === ANY_TYPE) ? true : ad.offer.guests.toString() === guestsFilter.value;
  };

  var setFeaturesFilter = function (ad) {
    var checkedFeatures = Array.from(featuresList.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (featureValue) {
      return ad.offer.features.includes(featureValue.value);
    });
  };

  var setFilter = function () {
    filteredAds = window.activation.offers.filter(function (ad) {
      return ad.offer &&
             setTypeFilter(ad) &&
             setPriceFilter(ad) &&
             setRoomsFilter(ad) &&
             setGuestsFilter(ad) &&
             setFeaturesFilter(ad);
    })
    .slice(0, ADS_AMOUNT);
    window.desactivation.deletePins();
    window.desactivation.closeOpenedPopup();
    window.pins.paintPins(filteredAds);
  };

  filter.addEventListener('change', window.debounce(setFilter));
})();
