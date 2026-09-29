const menuButton = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.nav')
const savedCount = document.querySelector('.saved-count')
const toast = document.querySelector('.toast')
let savedProjects = 0
let toastTimer

function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300)
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation')
  menuButton.textContent = isOpen ? '×' : '☰'
})

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open')
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.setAttribute('aria-label', 'Open navigation')
    menuButton.textContent = '☰'
  })
})

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    savedProjects += 1
    savedCount.textContent = savedProjects
    const title = button.closest('.project-card').querySelector('h3').textContent
    button.textContent = '✓ Added to my lab'
    showToast(`${title} added to your lab`)
  })
})

document.querySelector('.saved-button').addEventListener('click', () => {
  showToast(savedProjects ? `You saved ${savedProjects} ${savedProjects === 1 ? 'project' : 'projects'} to your lab` : 'Add a project to start your lab')
})

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const email = document.querySelector('#email')
  if (email.reportValidity()) {
    showToast('Thanks for joining the Blockwise community!')
    event.currentTarget.reset()
  }
})

document.querySelector('#year').textContent = new Date().getFullYear()

const header = document.querySelector('.header')
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 36)
window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()
