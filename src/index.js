import './styles.css';
const form = document.querySelector('form');
const email = document.querySelector('#mail');
const country = document.querySelector('select');
const postal = document.querySelector('#postal');
const passwd = document.querySelector('#password');
const confirm = document.querySelector('#confirm');
const submitBtn = document.querySelector('button[type="submit"]');
//
const isValidEmail = () => {
  return email.validity.valid;
};
const countrySelected = () => {
  return country.value;
};
const isPasswdMatch = () => {
  return passwd.value === confirm.value;
};
const isValidPasswd = () => {
  const result =
    passwd.value.match(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
    ) && !passwd.value.includes(' ');
  // passwd.validity.valid;
  return result;
};
const isInvalidPostal = () => {
  const selectedCountry = countrySelected();
  const v = postal.value;
  switch (selectedCountry) {
    case 'us': {
      return !v.match(/\D/g) && v.length === 6
        ? false
        : 'Invalid input, example: 201291';
    }
    case 'de': {
      return !v.match(/\D/g) && v.length === 5
        ? false
        : 'Invalid input, example: 21291';
    }
    case 'ca': {
      postal.value = postal.value.toUpperCase();
      return v.match(/^[abceghjklmnprstvwxyz]\d[a-z]\s*?\d[a-z]\d$/gi)
        ? false
        : 'Invalid input, example: T7T 9X1';
    }
    default: {
      return 'Please select a country first';
    }
  }
};
//
//
//
//
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
//
//
//
//
//
const update = (inputEl, callback, msg) => {
  const span = getErrorSpan(inputEl);
  const goodResult = callback();
  if (goodResult) {
    hideError(inputEl, span);
    return true;
  }
  displayError(inputEl, span, msg);
  return null;
};
//
//
//
//
//
//postal
const updatePostalError = () => {
  const span = getErrorSpan(postal);
  const msg = isInvalidPostal();
  if (msg) {
    span.textContent = msg;
    span.classList.add('show');
    return null;
  } else {
    hideError(postal, span);
    return true;
  }
};
//
const updateEmailError = () => {
  return update(email, isValidEmail, 'Please enter a correct email address');
};
const updatePasswdError = () => {
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
passwd.addEventListener('input', e => {
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
form.querySelectorAll('input').forEach(v => {
  v.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitting(e);
  });
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
