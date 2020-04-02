'use strict';

(function () {
  var main = window.utils.main;
  var StatusMessage = {
    200: 'Форма отправлена успешно',
    301: 'Данные временно перемещены на другой сервер, попробуйте позже',
    302: 'Данные удалены или перемещены на другой сервер.',
    400: 'Неверный запрос. Попробуйте еще раз.',
    401: 'Вы не авторизованы.',
    403: 'У вас нет прав на данный контент',
    404: 'Данные не найены',
    408: 'Время ожидания запроса истекло. Попробуйте еще раз или проверьте соединение.',
    500: 'Произошла внутренняя ошибка сервера. Попробуйте позже',
    503: 'Сервис недоступен. Попробуйте позже.',
  };

  var errorHandler = function (errorText) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    var hideErrorMessage = function () {
      errorMessage.classList.add('visually-hidden');
      errorMessage.removeEventListener('click', hideErrorMessage);
      document.removeEventListener('keydown', window.utils.isEscEvent);
    };
    if (main.querySelector('.error')) {
      main.querySelector('.error').classList.remove('visually-hidden');
    } else {
      main.appendChild(errorMessage);
    }
    errorMessage.addEventListener('click', function () {
      hideErrorMessage();
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, hideErrorMessage);
    });
    errorMessage.querySelector('.error__message').textContent = errorText;
  };

  window.error = {
    errorHandler: errorHandler,
    StatusMessage: StatusMessage
  };
})();
