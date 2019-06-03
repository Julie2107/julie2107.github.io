var linkOrderItem = document.querySelector('.popup-button');
var popupOrderItem = document.querySelector('.modal-box');

linkOrderItem.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupOrderItem.classList.add('modal-box--show');
});

popupOrderItem.addEventListener('click', function (evt) {
  if (evt.target.tagName === 'SECTION') {
    popupOrderItem.classList.remove('modal-box--show');
  }
});

window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popupOrderItem.classList.contains('modal-box--show')) {
        popupOrderItem.classList.remove('modal-box--show');
      }
    }
  });
