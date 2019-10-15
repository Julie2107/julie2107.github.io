    var popupOk = document.querySelector('.popup--success');
    var popupStart = document.querySelector('.feedback');

    popupStart.addEventListener("submit", function (evt) {
          evt.preventDefault();

          popupOk.classList.add("popup-show");
      })
    popupOk.addEventListener("click", function (evt) {
      evt.preventDefault();
      popupOk.classList.remove("popup-show");
      popupOk.classList.add("popup-close");

    });

    popupError.addEventListener("click", function (evt) {
      evt.preventDefault();
      popupError.classList.remove("popup-show");
      popupError.classList.add("popup-close");

    });
