
const adminBar = document.querySelector('.header-modal')
const log = document.querySelector('#log')

if (sessionStorage.getItem("token")) {
    adminBar.classList.remove('hidden')
    log.textContent = "log out"
    log.addEventListener('click', e => {
        e.preventDefault()
        sessionStorage.removeItem("token")
        location.reload()
    })

}