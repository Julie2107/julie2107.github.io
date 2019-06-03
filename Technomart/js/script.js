var linkFeedback = document.querySelector(".feedback-button");
var popupFeedback = document.querySelector(".feedback");
var formFeedback = popupFeedback.querySelector("form");
var nameFeedback = popupFeedback.querySelector("[name=name]");
var emailFeedback = popupFeedback.querySelector("[name=email]");
var textFeedback = popupFeedback.querySelector("[type=textarea]");
var closeFeedback = popupFeedback.querySelector(".modal-close");

var linkMap = document.querySelector (".map-link");
var popupMap = document.querySelector(".map");
var closeMap = popupMap.querySelector(".modal-close");

var linkItemAdded = document.querySelector(".tocart");
var popupItemAdded = document.querySelector(".item-added");
var closeItemAdded = popupItemAdded.querySelector(".modal-close");
var closeButton = popupItemAdded.querySelector(".button-close");

var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }

/*feedback modal block*/
linkFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupFeedback.classList.add("modal-show");
  if (storage) {
      nameFeedback.value = storage;
      emailFeedback.focus();
    } else {
      nameFeedback.focus();
    }
});

closeFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupFeedback.classList.remove("modal-show");
  popupFeedback.classList.remove("modal-error");
});

formFeedback.addEventListener("submit", function (evt) {
  if (!nameFeedback.value || !emailFeedback.value || !textFeedback) {
    evt.preventDefault();
    popupFeedback.classList.remove("modal-error");
    popupFeedback.offsetWidth = popupFeedback.offsetWidth;
    popupFeedback.classList.add("modal-error");
  } else {
      if (isStorageSupport) {
      localStorage.setItem("name", nameFeedback.value);
      }
    }
  });

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popupFeedback.classList.contains("modal-show")) {
        popupFeedback.classList.remove("modal-show");
        popupFeedback.classList.remove("modal-error");
      }
    }
  });

/*map modal window*/
linkMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.add("modal-show");
});

closeMap.addEventListener("click", function (evt) { evt.preventDefault();
popupMap.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popupMap.classList.contains("modal-show")) {
        popupMap.classList.remove("modal-show");
      }
    }
  });

/*ItemAdd modal block*/
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
