const loginForm = document.querySelector('#login-form')

if (loginForm) {
  const username = document.querySelector('#username')
  const password = document.querySelector('#password')
  const usernameGroup = document.querySelector('#username-group')
  const passwordGroup = document.querySelector('#password-group')
  const message = document.querySelector('#form-message')
  const passwordToggle = document.querySelector('.show-password')

  function clearError(group) {
    group.classList.remove('invalid')
    group.querySelector('.field-error').textContent = ''
  }

  function setError(group, text) {
    group.classList.add('invalid')
    group.querySelector('.field-error').textContent = text
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    clearError(usernameGroup)
    clearError(passwordGroup)
    message.textContent = ''
    message.classList.remove('error')

    const userIsValid = username.value.trim().toLowerCase() === 'samin'
    const passwordIsValid = password.value === 'samin'

    if (!username.value.trim()) setError(usernameGroup, 'Enter your username.')
    if (!password.value) setError(passwordGroup, 'Enter your password.')
    if (!username.value.trim() || !password.value) return

    if (userIsValid && passwordIsValid) {
      window.location.href = 'home.html'
      return
    }

    message.textContent = 'That username or password doesn’t match. Try again.'
    message.classList.add('error')
  })

  passwordToggle.addEventListener('click', () => {
    const shouldShow = password.type === 'password'
    password.type = shouldShow ? 'text' : 'password'
    passwordToggle.textContent = shouldShow ? 'Hide' : 'Show'
    passwordToggle.setAttribute('aria-label', shouldShow ? 'Hide password' : 'Show password')
  })

  username.addEventListener('input', () => clearError(usernameGroup))
  password.addEventListener('input', () => clearError(passwordGroup))
}

const year = document.querySelector('#year')
if (year) year.textContent = new Date().getFullYear()

const signOutButton = document.querySelector('#sign-out')
if (signOutButton) signOutButton.addEventListener('click', () => { window.location.href = 'index.html' })

const pizzaNo = document.querySelector('#pizza-no')
const pizzaYes = document.querySelector('#pizza-yes')
const pizzaQuestion = document.querySelector('#pizza-question')
const pizzaActions = document.querySelector('#pizza-actions')
const dayPrompt = document.querySelector('#day-prompt')
const workspace = document.querySelector('.empty-workspace')
const sapphireArt = document.querySelector('.sapphire-art')
const sapphirePanel = document.querySelector('.sapphire-panel')

if (pizzaNo && pizzaYes && pizzaQuestion && workspace) {
  function moveNoButton(event) {
    if (pizzaNo.parentElement !== workspace) workspace.appendChild(pizzaNo)

    const maxLeft = workspace.clientWidth - pizzaNo.offsetWidth - 14
    const maxTop = workspace.clientHeight - pizzaNo.offsetHeight - 14
    const yesRect = pizzaYes.getBoundingClientRect()
    const workspaceRect = workspace.getBoundingClientRect()
    const yesLeft = yesRect.left - workspaceRect.left
    const yesTop = yesRect.top - workspaceRect.top
    let left = 0
    let top = 0
    let badPosition = true

    for (let attempt = 0; attempt < 80 && badPosition; attempt += 1) {
      left = 7 + Math.random() * Math.max(0, maxLeft - 7)
      top = 7 + Math.random() * Math.max(0, maxTop - 7)
      const overlapsYes = !(left + pizzaNo.offsetWidth < yesLeft - 18 || left > yesLeft + pizzaYes.offsetWidth + 18 || top + pizzaNo.offsetHeight < yesTop - 15 || top > yesTop + pizzaYes.offsetHeight + 15)
      const candidateLeft = workspaceRect.left + left
      const candidateTop = workspaceRect.top + top
      const nearestX = event && Math.max(candidateLeft, Math.min(event.clientX, candidateLeft + pizzaNo.offsetWidth))
      const nearestY = event && Math.max(candidateTop, Math.min(event.clientY, candidateTop + pizzaNo.offsetHeight))
      const nearPointer = event && Math.hypot(nearestX - event.clientX, nearestY - event.clientY) < 170
      badPosition = overlapsYes || nearPointer
    }

    pizzaNo.style.left = `${left}px`
    pizzaNo.style.top = `${top}px`
  }

  pizzaNo.addEventListener('mouseenter', moveNoButton)
  pizzaNo.addEventListener('click', moveNoButton)
  workspace.addEventListener('mousemove', (event) => {
    if (pizzaNo.parentElement !== workspace) return
    const rect = pizzaNo.getBoundingClientRect()
    const nearestX = Math.max(rect.left, Math.min(event.clientX, rect.right))
    const nearestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom))
    if (Math.hypot(event.clientX - nearestX, event.clientY - nearestY) < 105) moveNoButton(event)
  })

  pizzaYes.addEventListener('click', () => {
    pizzaQuestion.textContent = 'Pizza time it is! 🍕❤️'
    pizzaActions.hidden = true
    pizzaNo.hidden = true
    if (dayPrompt) dayPrompt.hidden = false
    if (sapphireArt) sapphireArt.classList.add('ruby-mode')
    if (sapphirePanel) {
      sapphirePanel.classList.add('ruby-mode')
      const caption = sapphirePanel.querySelector('.sapphire-caption p')
      if (caption) caption.textContent = 'THE RUBY SPACE'
    }
  })

}
