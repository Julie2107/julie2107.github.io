var linkItemAdded = document.querySelectorAll(".tocart");
var popupItemAdded = document.querySelector(".item-added");
var closeItemAdded = popupItemAdded.querySelector(".modal-close");
var closeButton = popupItemAdded.querySelector(".button-close");
var popupOpen = function(link) {
  link.addEventListener("click", function (evt) {
  evt.preventDefault();

  popupItemAdded.classList.add("modal-show");
});
}

for (var i=0; i<linkItemAdded.length; i++) {
  popupOpen(linkItemAdded[i]);
}

closeItemAdded.addEventListener("click", function (evt) { evt.preventDefault();
popupItemAdded.classList.remove("modal-show");
});

closeButton.addEventListener("click", function (evt) { evt.preventDefault();
popupItemAdded.classList.remove("modal-show");
});
