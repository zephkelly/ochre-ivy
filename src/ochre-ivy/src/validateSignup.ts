const passwordInput: HTMLInputElement = document.getElementById('signup-password') as HTMLInputElement;
const passwordConfirmInput: HTMLInputElement = document.getElementById('signup-password-confirm') as HTMLInputElement;

const passwordValidationMessage: HTMLElement = document.getElementById('signup-password-validation') as HTMLElement;
const passwordConfirmValidationMessage: HTMLElement = document.getElementById('signup-password-confirm-validation') as HTMLElement;

passwordConfirmInput.addEventListener("input", checkPassword);

export function checkPassword() {
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (password !== passwordConfirm) {
    passwordInput.setCustomValidity("Passwords do not match.");
    passwordConfirmInput.setCustomValidity("Passwords do not match.");

    passwordConfirmValidationMessage.innerHTML = "Passwords do not match.";

    passwordValidationMessage.style.display = "block";
    passwordConfirmValidationMessage.style.display = "block";
  }
  else {
    passwordInput.setCustomValidity("");
    passwordConfirmInput.setCustomValidity("");

    passwordValidationMessage.innerHTML = "";
    passwordConfirmValidationMessage.innerHTML = "";

    passwordValidationMessage.style.display = "none";
    passwordConfirmValidationMessage.style.display = "none";
  }
}