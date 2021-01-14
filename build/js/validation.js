'use strict'

const formCorporate = document.querySelector('.popup--form-corporate');
const formPerson = document.querySelector('.popup--form-person');
const requiredFieldsPerson = formPerson.querySelectorAll('input:required');
const requiredFieldsCorp = formCorporate.querySelectorAll('input:required');

const approveCheckP = formPerson.querySelector('input[id=approval-p]');
const approveCheckC = formCorporate.querySelector('input[id=approval]');

const telInputP = formPerson.querySelector('input[type=tel]');
const telInputC = formCorporate.querySelector('input[type=tel]');


const requiredFieldsCheck = function (fields) {
  fields.forEach(item => {
    item.addEventListener('invalid', (evt) => {
      evt.preventDefault();
      item.classList.add('invalid');
      item.addEventListener('input', () => {
        item.classList.remove('invalid');
      });
    });
  });
}

requiredFieldsCheck(requiredFieldsPerson);
requiredFieldsCheck(requiredFieldsCorp);