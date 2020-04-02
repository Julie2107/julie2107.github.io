'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 70;
  var AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';
  var adForm = window.utils.adForm;
  var avatarInput = adForm.querySelector('#avatar');
  var photosInput = adForm.querySelector('#images');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview>img');
  var roomsPreviewBox = adForm.querySelector('.ad-form__photo');

  var resetPhoto = function () {
    var loadedPhotos = roomsPreviewBox.querySelectorAll('img');
    if (loadedPhotos) {
      loadedPhotos.forEach(function (photo) {
        photo.remove();
      });
    }
    avatarPreview.src = AVATAR_DEFAULT_SRC;
  };

  var avatarLoadHandler = function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var photosLoadHandler = function () {
    var file = photosInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var roomsPreview = document.createElement('img');
        roomsPreviewBox.style = 'display: flex; flex-wrap: wrap; justify-content: space-between; width: 270px';
        roomsPreviewBox.appendChild(roomsPreview);
        roomsPreview.src = reader.result;
        roomsPreview.width = PHOTO_SIZE;
        roomsPreview.height = PHOTO_SIZE;
      });
      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', avatarLoadHandler);
  photosInput.addEventListener('change', photosLoadHandler);

  window.photosupload = {
    resetPhoto: resetPhoto
  };
})();
