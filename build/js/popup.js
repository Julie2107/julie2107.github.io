'use strict'

const page = document.querySelector('body');
const formButtonCorporate = document.querySelector('.section__reg-button--grey');
const formButtonPerson = document.querySelector('.section__reg-button--red');

const formCorporate = document.querySelector('.popup--form-corporate');
const formPerson = document.querySelector('.popup--form-person');

const closeButtonCorpForm = formCorporate.querySelector('.button__close');
const closeButtonPersonForm = formPerson.querySelector('.button__close');

const popupSubmit = document.querySelector('.popup--submit');
const closeButtonSubmit = popupSubmit.querySelector('.button__close');

const dataFieldsPerson = formPerson.querySelectorAll('.form__input-data');
const dataFieldsCorp = formCorporate.querySelectorAll('.form__input-data');

const approveCheckP = formPerson.querySelector('input[id=approval-p]');
const approveCheckC = formCorporate.querySelector('input[id=approval]');

const telInputP = formPerson.querySelector('input[type=tel]');
const telInputC = formCorporate.querySelector('input[type=tel]');

const dirsFieldsetP = formPerson.querySelector('.form__fieldset--dirs');
const dirsFieldsetC = formCorporate.querySelector('.form__fieldset--dirs');
const dirsCheckboxesP = dirsFieldsetP.querySelectorAll('input[type=checkbox]');
const dirsCheckboxesC = dirsFieldsetC.querySelectorAll('input[type=checkbox]');


const openPopupHandler = (popup) => {
  if (!popup.classList.contains('opened')) {
    popup.classList.add('opened');
    page.classList.add('popup-opened');
  };
}

const closePopupHandler = (popup) => {
  if (popup.classList.contains('opened')) {
    popup.classList.remove('opened');
    page.classList.remove('popup-opened');
  }
}

formButtonCorporate.addEventListener('click', () => { 
  openPopupHandler(formCorporate)}
);
formButtonPerson.addEventListener('click', () => {
  openPopupHandler(formPerson)
});

closeButtonCorpForm.addEventListener('click', () => {
  closePopupHandler(formCorporate)
});

closeButtonPersonForm.addEventListener('click', () => {
  closePopupHandler(formPerson)
});

closeButtonSubmit.addEventListener('click', () => {
  closePopupHandler(popupSubmit);
});

let telInputIsValid;
let approvalCheckboxIsValid;
let dirsFieldIsValid;
let dataFileldsIsValid;

const telInputCheck = function (input) {
  if (/[A-ZА-Яa-zа-я]/.test(input.value)) {
    input.classList.add('invalid');
    telInputIsValid = false;
  } else {
    input.classList.remove('invalid');
    telInputIsValid = true;
  }
}

const dataFieldsValidation = function (fields, telInput) {
  dataFileldsIsValid = true;
  fields.forEach(field => {
    if (field.value === '') {
      console.log(field.value);
      field.classList.add('invalid');
      dataFileldsIsValid = false;

      if (field !== telInput) {
        field.addEventListener('input', () => {
          field.classList.remove('invalid');
        });
      }
    } 
  });
}

const dirsFieldCheck = function (checkboxes, fieldset) {
  fieldset.querySelectorAll('.form__label--check').forEach(label => label.classList.add('invalid'));

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        dirsFieldIsValid = true;
        fieldset.querySelectorAll('.form__label--check').forEach(label => label.classList.remove('invalid'));
      }
    });
  });
}

const dirsFieldValidation = function (checkboxes, fieldset) {
  let fields = Array.from(checkboxes);
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].checked) {
      dirsFieldIsValid = true;

      break;
    } else {
      dirsFieldIsValid = false;
    }
  }

  if (!dirsFieldIsValid) {
    dirsFieldCheck(checkboxes, fieldset);
  }
}

const approvalValidation = function (checkbox, form) {
  if (!checkbox.checked) {
    form.querySelector('.form__approval').classList.add('invalid');

    checkbox.addEventListener('change', function () {
      form.querySelector('.form__approval').classList.remove('invalid');
      approvalCheckboxIsValid = false;
    });
  } else {
    approvalCheckboxIsValid = true;
  }
}

telInputP.addEventListener('input', () => telInputCheck(telInputP));
telInputC.addEventListener('input', () => telInputCheck(telInputC));

formPerson.addEventListener('submit', function (evt) {
  evt.preventDefault();
  dataFieldsValidation(dataFieldsPerson, telInputP);
  dirsFieldValidation(dirsCheckboxesP, dirsFieldsetP);
  approvalValidation(approveCheckP, formPerson);

  if (dataFileldsIsValid && telInputIsValid && approvalCheckboxIsValid && dirsFieldIsValid) {
    openPopupHandler(popupSubmit);
    closePopupHandler(formCorporate);
    closePopupHandler(formPerson);
    //telInputIsValid = false;
    //approvalCheckboxIsValid = false;
    //dirsFieldIsValid = false;
    //dataFileldsIsValid = false;
  }
});

formCorporate.addEventListener('submit', function (evt) {
  evt.preventDefault();
  dataFieldsValidation(dataFieldsCorp, telInputC);
  dirsFieldValidation(dirsCheckboxesC, dirsFieldsetC);
  approvalValidation(approveCheckC, formCorporate);

  if (dataFileldsIsValid && telInputIsValid && approvalCheckboxIsValid && dirsFieldIsValid) {
    openPopupHandler(popupSubmit);
    closePopupHandler(formCorporate);
    closePopupHandler(formPerson);
    //telInputIsValid = false;
    //approvalCheckboxIsValid = false;
    //dirsFieldIsValid = false;
    //dataFileldsIsValid = false;
  }
});

/*
const requiredFieldsCheck = function (fields, telInput) {
  fields.forEach(item => {
    console.log(item.value);
    if (item.value === '') {
      item.classList.add('invalid');
      requiredFieldsIsValid = false;

      if (item !== telInput) {
        item.addEventListener('input', () => {
          item.classList.remove('invalid');
        });
      }
    } else {
      requiredFileldsIsValid = true;
    }
  })
}

//requiredFieldsCheck(requiredFieldsCorp, telInputC);

const telInputCheck = function (input) {
  if (/[A-ZА-Яa-zа-я]/.test(input.value)) {
    input.classList.add('invalid');
    telInputIsValid = false;
  } else {
    input.classList.remove('invalid');
    telInputIsValid = true;
  }
};

telInputP.addEventListener('input', function() {
  telInputCheck(telInputP);
});

telInputC.addEventListener('input', function () {
  telInputCheck(telInputC);
});

const checkApproval = function (checkbox, form) {
  if (!checkbox.checked) {
    form.querySelector('.form__approval').classList.add('invalid');
    checkbox.addEventListener('change', function() {
    form.querySelector('.form__approval').classList.remove('invalid');
    approvalCheckboxIsValid = false;
    })
  } else {
    approvalCheckboxIsValid = true;
  }
}

const checkboxesCheck = function (checkboxes, fieldset) {
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      isDirsFieldIsValid = true;
      break;
    } else {
      fieldset.querySelectorAll('.form__label--check').forEach(item => item.classList.add('invalid'));
      isDirsFieldIsValid = false;
      setCheckboxesInvalid(dirsCheckboxesP, dirsFieldsetP);

    }
  }
}

const setCheckboxesInvalid = function (checkboxes, fieldset) {
  if (!isDirsFieldIsValid) {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          fieldset.querySelectorAll('.form__label--check').forEach(label => label.classList.remove('invalid'));
          isDirsFieldIsValid = true;
        }
      });
    });
  }
}

formPerson.addEventListener('submit', function(evt) {
  evt.preventDefault();
  requiredFieldsCheck(requiredFieldsPerson, telInputP);
  checkboxesCheck(dirsCheckboxesP, dirsFieldsetP);
  checkApproval(approveCheckP, formPerson);
  console.log(isDirsFieldIsValid);

  if (requiredFileldsIsValid && telInputIsValid && approvalCheckboxIsValid && isDirsFieldIsValid) {
    openPopupHandler(popupSubmit);
    closePopupHandler(formCorporate);
    closePopupHandler(formPerson);
  }
});

formCorporate.addEventListener('submit', function(evt) {
  evt.preventDefault();
  checkApproval(approveCheckC, formCorporate);
 
 
  if (telInputIsValid && approvalCheckboxIsValid) {
    openPopupHandler(popupSubmit);
    closePopupHandler(formCorporate);
    closePopupHandler(formPerson);
  }
});

  /*fields.forEach(item => {
    item.addEventListener('invalid', (evt) => {
      evt.preventDefault();
      item.classList.add('invalid');

      if (item !== telInput) {
        item.addEventListener('input', () => {
          item.classList.remove('invalid');
        });
      }
    });
  });*/
