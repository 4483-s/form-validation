import './styles.css';
const form = document.querySelector('form');
const email = document.querySelector('#mail');
const country = document.querySelector('select');
const postal = document.querySelector('#postal');
const passwd = document.querySelector('#password');
const confirm = document.querySelector('#confirm');
const submitBtn = document.querySelector('button[type="submit"]');
//
const isValidEmail = () => email.validity.valid;
const countrySelected = () => country.value;
const isPasswdMatch = () => passwd.value === confirm.value;
const isValidPasswd = () =>
  !passwd.value.includes(' ') && passwd.validity.valid;
//
const isValidPostal = () => {
  const selectedCountry = countrySelected();
  const v = postal.value;
  switch (selectedCountry) {
    case 'us':
      return !v.match(/\D/g) && v.length === 6;
    case 'de':
      return !v.match(/\D/g) && v.length === 5;
    case 'ca':
      return v.match(/^[abceghj-nprstv-z]\d[a-z]\s*?\d[a-z]\d$/gi);
    default:
      return false;
  }
};
//
//
//helper
const hideError = (inputEl, span) => {
  span.textContent = '';
  span.classList.remove('show');
  inputEl.classList.add('valid');
  inputEl.classList.remove('invalid');
};
const displayError = (inputEl, span, msg) => {
  span.textContent = msg;
  span.classList.add('show');
  inputEl.classList.remove('valid');
  inputEl.classList.add('invalid');
};
const getErrorSpan = target => {
  return target.parentElement.querySelector('span[class*="error"]');
};
//
const update = (inputEl, callback, msg) => {
  const span = getErrorSpan(inputEl);
  const goodResult = callback();
  if (goodResult) {
    hideError(inputEl, span);
    return true;
  }
  displayError(inputEl, span, msg);
  return false;
};
//
//
//
//
//
//postal
const updatePostalError = () => {
  const selectedCountry = countrySelected();
  let msg;
  switch (selectedCountry) {
    case 'us':
      msg = 'Invalid input, example: 201291';
      break;
    case 'de':
      msg = 'Invalid input, example: 33232';
      break;
    case 'ca':
      msg = 'Invalid input, example: T8T 9R2';
      break;
    default:
      msg = 'Please select a country first';
  }
  return update(postal, isValidPostal, msg);
};
//
const updateEmailError = () => {
  return update(email, isValidEmail, 'Please enter a correct email address');
};
const updatePasswdError = () => {
  console.log(passwd.validity.valid);
  const msg =
    'At least one uppercase letter, one lowercase letter, one digit, one special character, and is at least 8 characters long';
  return update(passwd, isValidPasswd, msg);
};
const updateConfirmError = () => {
  const msg = `Passwords do not match`;
  return update(confirm, isPasswdMatch, msg);
};
//
const submitting = e => {
  const one = updatePasswdError();
  const two = updateEmailError();
  const three = updatePostalError();
  const four = updateConfirmError();
  if (!one || !two || !three || !four) {
    e.preventDefault();
  }
};
email.addEventListener('input', updateEmailError);
passwd.addEventListener('input', () => {
  updatePasswdError();
  updateConfirmError();
});
postal.addEventListener('input', () => {
  updatePostalError();
});
confirm.addEventListener('input', () => {
  updateConfirmError();
});
submitBtn.addEventListener('click', submitting);
form.addEventListener('keydown', e => {
  if (e.key === 'Enter') submitting(e);
});
country.addEventListener('change', updatePostalError);
form.addEventListener('focusout', e => {
  switch (e.target) {
    case email: {
      updateEmailError();
      break;
    }
    case country:
    case postal: {
      updatePostalError();
      break;
    }
    case passwd: {
      updatePasswdError();
      updateConfirmError();
      break;
    }
    case confirm: {
      updateConfirmError();
    }
  }
});
