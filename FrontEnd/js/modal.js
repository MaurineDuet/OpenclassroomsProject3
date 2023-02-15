/* OUVERTURE ET FERMETURE DE LA MODALE */

/* Faire apparaitre la modale */

const modalButton = document.querySelector('#modal-button')
const modalBox = document.querySelector('#modal')
const modalHeader = document.querySelector('.header-modal')

modalButton.addEventListener('click', e => {
    if (modalBox.classList.contains('hidden')) {
    modalBox.classList.remove('hidden')
    modalFirstPage.classList.remove("hidden")
    modalSecondPage.classList.add("hidden")
    modalBox.setAttribute('aria-hidden', false)
    modalBox.setAttribute('aria-modal', true)

} else {
    modalBox.classList.add('hidden')
    modalBox.setAttribute('aria-hidden', true)
    modalBox.setAttribute('aria-modal', false)
}
})

/* Fermer la modale sur la croix */

const closeIcons = document.querySelectorAll('.cross')

closeIcons.forEach(closeIcon => {

    closeIcon.addEventListener('click', e => {
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


/* IMPORT DES ELEMENTS DE LA GALERIE DE LA MODALE DEPUIS L'API */

class Work {
    constructor(jsonWork) {
        this.id = jsonWork.id
        this.title = jsonWork.title
        this.img = jsonWork.imageUrl
        this.category = jsonWork.category.id
    }
}

await fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {

        for (let jsonWork of jsonListWorks) {
            let work = new Work(jsonWork)
            document.querySelector(".modal-img").innerHTML +=
                `<figure data-miniature data-piece-of-work data-piece-of-work-id="${work.id}">
                <div class="modal-minia">
                    <img src="assets/icons/bin.svg" class="modal-bin" data-bin data-bin-id="${work.id}">
                    <img src="${work.img}" class="modal-miniature-img">
                </div>
                <p>éditer</p>
            </figure>`
        }
    })


/* NAVIGATION ENTRE LES DEUX PAGES DE LA MODALE */

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

/* SUPPRESSION DE TRAVAUX DEPUIS LA MODALE */

const pieceOfWorks = document.querySelectorAll("[data-piece-of-work]")
const bins = document.querySelectorAll("[data-bin]")

if (bins) {

    bins.forEach(bin => {
        bin.addEventListener('click', e => {
            const binId = bin.getAttribute("data-bin-id")

            pieceOfWorks.forEach(pieceOfWork  => {
            const pieceOfWorkId = pieceOfWork.getAttribute("data-piece-of-work-id")
            if (binId === pieceOfWorkId) {
                pieceOfWork.classList.add("hidden")
            }
        
        })

    })
})

}

const pieceOfFigures = document.querySelectorAll("[data-figure]")

modalButton.addEventListener("click", e => {

    if (modalBox.classList.contains('hidden')) {

    pieceOfFigures.forEach(pieceOfFigure  => {
        const pieceOfFigureId = pieceOfFigure.getAttribute("data-figure-id")
        console.log(pieceOfFigureId)

        pieceOfWorks.forEach(pieceOfWork  => {
            const pieceOfWorkId = pieceOfWork.getAttribute("data-piece-of-work-id")
            if(pieceOfFigureId == pieceOfWorkId && pieceOfWork.classList.contains("hidden")) {
                pieceOfWork.classList.add("hidden")
            }

        })
       
    })

}

})






 
