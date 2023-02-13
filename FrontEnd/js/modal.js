/* Faire apparaitre la modale */

const modalButton = document.querySelector('#modal-button')
const modalBox = document.querySelector('#modal')
const modalHeader = document.querySelector('.header-modal')

modalButton.addEventListener('click', e => {
    modalBox.style.display = null
    modalBox.setAttribute('aria-hidden', false)
    modalBox.setAttribute('aria-modal', true) 
} )

/* Fermer la modale */

const closeIcon = document.querySelector('#cross')

closeIcon.addEventListener('click' , e => {
    modalBox.style.display = "none"
    modalBox.setAttribute('aria-hidden', true)
    modalBox.setAttribute('aria-modal', false)
})