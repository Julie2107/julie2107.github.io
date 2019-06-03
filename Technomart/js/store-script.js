
var linkItemAdded = document.querySelector(".tocart");
var popupItemAdded = document.querySelector(".item-added");
var closeItemAdded = popupItemAdded.querySelector(".modal-close");
var closeButton = popupItemAdded.querySelector(".button-close");

/*feedback modal block*/
linkItemAdded.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupItemAdded.classList.add("modal-show");
});

closeItemAdded.addEventListener("click", function (evt) { evt.preventDefault();
popupItemAdded.classList.remove("modal-show");
});

closeButton.addEventListener("click", function (evt) { evt.preventDefault();
popupItemAdded.classList.remove("modal-show");
});
