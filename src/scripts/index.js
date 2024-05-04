import '../css/reset.css';
import '../css/style.css';

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const submitResponse = document.querySelector('.submit-response');

function showError(input, span, errorMsg) {
  const spanElement = span;
  input.classList.add('invalid');
  spanElement.textContent = errorMsg;
}

function removeError(input, span) {
  const spanElement = span;
  input.classList.remove('invalid');
  spanElement.textContent = '';
}

function showFormSubmitError() {
  submitResponse.textContent = 'Please fill out the form!';
  submitResponse.style.color = 'red';
}

function showFormAccepted() {
  submitResponse.textContent = 'Form submitted!';
  submitResponse.style.color = 'lightgreen';
}

function validateInput(event) {
  const input = event.target;
  const span = input.nextElementSibling;

  if (form.checkValidity()) {
    submitResponse.textContent = '';
  }

  if (input.checkValidity()) {
    removeError(input, span);
  }

  switch (input.id) {
    case 'email':
      if (input.validity.valueMissing) {
        showError(input, span, '* Required');
      } else if (input.validity.typeMismatch) {
        showError(input, span, '* Please enter a valid email');
      }
      break;

    case 'country':
      if (input.validity.valueMissing) {
        showError(input, span, '* Required');
      }
      break;

    case 'zip':
      if (input.validity.valueMissing) {
        showError(input, span, '* Required');
      } else if (input.validity.patternMismatch) {
        showError(input, span, '* Please enter a valid UK zip-code');
      }
      break;

    case 'password':
      if (input.validity.valueMissing) {
        showError(input, span, '* Required');
      } else if (input.validity.tooShort) {
        showError(input, span, '* Password must be 8 or more characters');
      }
      break;

    case 'confirm-password':
      if (input.validity.valueMissing) {
        showError(input, span, '* Required');
      } else if (input.value !== document.querySelector('#password').value) {
        showError(input, span, '* Passwords do not match');
        input.setCustomValidity('Error');
      } else {
        input.setCustomValidity('');
        removeError(input, span);
      }

      break;
    default:
      console.log('Default case reached');
      break;
  }
}

function validateForm(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.classList.add('invalid');
        showFormSubmitError();
      }
    });
  } else {
    showFormAccepted();
  }
}

form.addEventListener('input', validateInput);

inputs.forEach((input) => {
  input.addEventListener('blur', validateInput);
});

form.addEventListener('submit', validateForm);
