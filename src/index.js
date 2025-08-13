import './styles.css';
const email = document.querySelector('#mail');
const country = document.querySelector('select');
const postal = document.querySelector('#postal');
const passwd = document.querySelector('#password');
const confirm = document.querySelector('#confirm');
const isValidEmail = () => {
  console.log(email.validity.valid);
  return email.validity.valid;
};
const passwdMatch = () => {
  return passwd.value === confirm.value;
};
const isValidPasswd = () => {
  console.log(passwd.validity.valid);
  passwd.value.match(/[A-Za-z\d]/g);
  return passwd.validity.valid;
};

email.addEventListener('input', isValidEmail);
passwd.addEventListener('input', isValidPasswd);
