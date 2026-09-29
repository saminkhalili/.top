const form = document.querySelector('#login-form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const passwordGroup = document.querySelector('#password-group')
const emailGroup = document.querySelector('#email-group')
const passwordToggle = document.querySelector('.show-password')
const forgotLink = document.querySelector('#forgot-link')
const signupLink = document.querySelector('#signup-link')
const formTitle = document.querySelector('#form-title')
const formSubtitle = document.querySelector('#form-subtitle')
const submitLabel = document.querySelector('#submit-label')
const prompt = document.querySelector('#signup-prompt')
const message = document.querySelector('#form-message')
let mode = 'login'

function setMode(nextMode) {
  mode = nextMode
  form.classList.toggle('is-reset', mode === 'reset')
  formTitle.textContent = mode === 'reset' ? 'Reset your password.' : mode === 'signup' ? 'Start building.' : 'Welcome back.'
  formSubtitle.textContent = mode === 'reset'
    ? 'We’ll send you a link to get back into your account.'
    : mode === 'signup'
      ? 'Create an account and start your learning journey.'
      : 'Sign in to continue your learning journey.'
  submitLabel.textContent = mode === 'reset' ? 'Send reset link' : mode === 'signup' ? 'Create my account' : 'Sign in to your lab'
  forgotLink.hidden = mode !== 'login'
  if (mode === 'signup') {
    prompt.innerHTML = 'Already have an account? <button class="text-button" type="button" id="signup-link">Sign in</button>'
  } else if (mode === 'reset') {
    prompt.innerHTML = 'Remember your password? <button class="text-button" type="button" id="signup-link">Back to sign in</button>'
  } else if (mode === 'login') {
    prompt.innerHTML = 'New to Blockwise? <button class="text-button" type="button" id="signup-link">Create an account</button>'
  }
  const promptButton = document.querySelector('#signup-link')
  if (promptButton) promptButton.addEventListener('click', () => setMode(mode === 'login' ? 'signup' : 'login'))
  password.autocomplete = mode === 'signup' ? 'new-password' : 'current-password'
  password.placeholder = mode === 'signup' ? 'Create a password (8+ characters)' : 'Enter your password'
  passwordGroup.querySelector('label').textContent = mode === 'signup' ? 'Create password' : 'Password'
  message.textContent = ''
  message.classList.remove('error')
  clearErrors()
  form.reset()
  document.querySelector('.remember input').checked = true
}

function clearErrors() {
  for (const group of [emailGroup, passwordGroup]) {
    group.classList.remove('invalid')
    group.querySelector('.field-error').textContent = ''
  }
}

function setError(group, text) {
  group.classList.add('invalid')
  group.querySelector('.field-error').textContent = text
}

document.querySelector('.show-password').addEventListener('click', () => {
  const show = password.type === 'password'
  password.type = show ? 'text' : 'password'
  passwordToggle.textContent = show ? 'Hide' : 'Show'
  passwordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
})

forgotLink.addEventListener('click', () => setMode('reset'))
signupLink.addEventListener('click', () => setMode('signup'))

form.addEventListener('submit', (event) => {
  event.preventDefault()
  clearErrors()
  message.textContent = ''
  message.classList.remove('error')
  let valid = true

  if (!email.value.trim() || !email.validity.valid) {
    setError(emailGroup, 'Enter a valid email address.')
    valid = false
  }
  if (mode !== 'reset' && !password.value) {
    setError(passwordGroup, 'Enter your password.')
    valid = false
  } else if (mode === 'signup' && password.value.length < 8) {
    setError(passwordGroup, 'Use at least 8 characters.')
    valid = false
  }
  if (!valid) return

  if (mode === 'reset') {
    message.textContent = 'If there’s an account for this email, a reset link is on its way.'
  } else if (mode === 'signup') {
    message.textContent = 'Your account form is ready to connect to Blockwise.'
  } else {
    message.textContent = 'Your sign-in form is ready to connect to Blockwise.'
  }
})

email.addEventListener('input', () => {
  emailGroup.classList.remove('invalid')
  emailGroup.querySelector('.field-error').textContent = ''
})
password.addEventListener('input', () => {
  passwordGroup.classList.remove('invalid')
  passwordGroup.querySelector('.field-error').textContent = ''
})
document.querySelector('#year').textContent = new Date().getFullYear()
