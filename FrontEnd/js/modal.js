/* Faire apparaitre la modale */

const modalButton = document.querySelector('#modal-button')
const modalBox = document.querySelector('#modal')
const modalHeader = document.querySelector('.header-modal')

modalButton.addEventListener('click', e => {
    modalBox.classList.remove('hidden')
    modalFirstPage.classList.remove("hidden")
    modalSecondPage.classList.add("hidden")
    modalBox.setAttribute('aria-hidden', false)
    modalBox.setAttribute('aria-modal', true) 
} )

/* Fermer la modale sur la croix */


const closeIcons = document.querySelectorAll('.cross')

closeIcons.forEach(closeIcon  => {

closeIcon.addEventListener('click' , e => {
    modalBox.classList.add('hidden')
    modalBox.setAttribute('aria-hidden', true)
    modalBox.setAttribute('aria-modal', false)
})

})

/* Fermer la modale en dehors 

const modalWrapper = document.querySelector('.modal-wrapper')

document.addEventListener('click', e => {

    if (!modalBox.classList.contains('hidden')) {
    const target = e.currentTarget
  
    if (target !== modalWrapper) {
      modalBox.classList.add('hidden')
    }
}
  
}) */


/* Passer à la seconde page de la modale */

const addPicButton = document.querySelector('.add-pic-button')
const modalFirstPage = document.querySelector('.modal-wrapper-page-1')
const modalSecondPage = document.querySelector('.modal-wrapper-page-2')

addPicButton.addEventListener("click", e => {
    modalFirstPage.classList.add("hidden")
    modalSecondPage.classList.remove("hidden")
})

/* Revenir à la première page de la modale */

const backToFirstPage = document.querySelector('.arrow')

backToFirstPage.addEventListener("click", e => {
    modalFirstPage.classList.remove("hidden")
    modalSecondPage.classList.add("hidden")
})