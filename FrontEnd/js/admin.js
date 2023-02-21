/* Ajout du mode administrateur après le login */

const adminBar = document.querySelector('.header-modal')
const log = document.querySelector('#log')
const headerBase = document.querySelector('.header-base')

if (sessionStorage.getItem("token")) {
    adminBar.classList.remove('hidden')
    headerBase.style.padding = "100px 0 50px 0"
    log.textContent = "log out"
    log.addEventListener('click', e => {
        e.preventDefault()
        sessionStorage.removeItem("token")
        location.reload()
    })

}