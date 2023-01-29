const emailInput: HTMLInputElement = document.getElementById('login-email') as HTMLInputElement;
const passwordInput: HTMLInputElement = document.getElementById('signup-password') as HTMLInputElement;
const passwordConfirmInput: HTMLInputElement = document.getElementById('signup-password-confirm') as HTMLInputElement;

const emailValidationMessage: HTMLElement = document.getElementById('signup-email-validation') as HTMLElement;
const passwordValidationMessage: HTMLElement = document.getElementById('signup-password-validation') as HTMLElement;
const passwordConfirmValidationMessage: HTMLElement = document.getElementById('signup-password-confirm-validation') as HTMLElement;

if (emailInput) {
  emailInput.addEventListener("input", checkEmail);
  passwordInput.addEventListener("input", checkPassword);
  passwordConfirmInput.addEventListener("input", checkPassword);
}

export function checkEmail() {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (emailInput.value.match(validRegex)) {
    emailValidationMessage.style.display = "";
    emailValidationMessage.innerHTML = "";

    emailInput.setCustomValidity("");
  }
  else {
    emailInput.setCustomValidity("Please enter a valid email address.");
    emailValidationMessage.innerHTML = "Please enter a valid email address.";

    emailValidationMessage.style.display = "block";
  }
}

export function checkPassword() {
  if (passwordInput.value !== passwordConfirmInput.value) {
    passwordInput.setCustomValidity("Passwords do not match.");
    passwordConfirmInput.setCustomValidity("Passwords do not match.");

    passwordConfirmValidationMessage.innerHTML = "Passwords do not match.";
    passwordValidationMessage.style.borderColor = 'var(--accent-color-tertiary)';
    passwordConfirmValidationMessage.style.borderColor = 'var(--accent-color-tertiary)';

    passwordValidationMessage.style.display = "block";
    passwordConfirmValidationMessage.style.display = "block";
  }
  else {
    passwordInput.setCustomValidity("");
    passwordConfirmInput.setCustomValidity("");

    passwordConfirmValidationMessage.innerHTML = "";
    passwordValidationMessage.style.borderColor = 'grey';
    passwordConfirmValidationMessage.style.borderColor = 'grey';

    passwordValidationMessage.style.display = "none";
    passwordConfirmValidationMessage.style.display = "none";
  }
}