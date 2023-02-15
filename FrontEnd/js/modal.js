/* OUVERTURE ET FERMETURE DE LA MODALE */

let modal = null

const modalButton = document.querySelector('#modal-button')
const modalBox = document.querySelector('#modal')
const modalHeader = document.querySelector('.header-modal')

const stopPropagation = function (e) {
    e.stopPropagation()
}

const openModal = function (e) {
    const target = document.querySelector('#modal')
    target.classList.remove('hidden')
    modalFirstPage.classList.remove("hidden")
    modalSecondPage.classList.add("hidden")
    target.setAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', true)
    
    modal = target
    modal.addEventListener("click", closeModal)

    const stopCloseModal = modal.querySelector("[modal-close]")
    stopCloseModal.addEventListener('click', stopPropagation)
}

function resetForm() {
    document.querySelector(".modal-wrapper-page-2 form").reset()
    imgPreview.innerHTML = ""
    changePicture.classList.remove('hidden')
    fileDetails.classList.remove('hidden')
    imgPreview.classList.add('hidden')
    imgIcon.classList.remove('hidden')
    addPicModal.style.padding = "30px 120px"
}

const closeModal = function (e) {
    if (modal === null) return
    modal.classList.add('hidden')
    modal.setAttribute('aria-hidden', true)
    modal.setAttribute('aria-modal', false)
    resetForm()
    modal = null
}

modalButton.addEventListener('click', openModal)


/* Fermer la modale sur la croix */

const closeIcons = document.querySelectorAll('.cross')

closeIcons.forEach(closeIcon => {

    closeIcon.addEventListener('click', e => {
        modalBox.classList.add('hidden')
        modalBox.setAttribute('aria-hidden', true)
        modalBox.setAttribute('aria-modal', false)
        resetForm()
    })

})


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
    resetForm()
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

/* AJOUT DE TRAVAUX */

/* Charger la miniature */

const chooseFile = document.getElementById("chosePicture")
const imgPreview = document.getElementById("img-preview")
const imgIcon = document.getElementById("add-pic")
const addPicModal = document.querySelector(".modal-wrapper-page-2-add-pic")
const changePicture = document.querySelector(".modal-wrapper-page-2-add-pic label")
const fileDetails = document.querySelector(".modal-wrapper-page-2-add-pic p")

function getImgData () {
    const files = chooseFile.files[0]
    if(files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
        addPicModal.style.padding = "0 120px"
          imgIcon.classList.add('hidden')
          imgPreview.classList.remove('hidden');
          imgPreview.innerHTML = '<img src="' + this.result + '" />'
          changePicture.classList.add('hidden')
          fileDetails.classList.add('hidden')
        })
    }
}

chooseFile.addEventListener("change", e => {
    getImgData()
} )

/* Charger la miniature */

const addWork = document.querySelector(".modal-wrapper-page-2 form")

addWork.addEventListener("submit", async e => {
  e.preventDefault()

  const workData = new FormData(addWork)
  const image = workData.get("image")
  const imageUrl = URL.createObjectURL(image)

  const workInfos = {
    /*id: Date.now(),*/
    title: workData.get("title"),
    imageUrl,
    categoryId: workData.get("category"),
    /*userId: sessionStorage.getItem("userId")*/
  }

  console.log(workInfos)

  const chargeUtile = JSON.stringify(workInfos)

  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { "Content-Type": "application/json", "accept": "application/json"},
    body: chargeUtile
  })

  let result = await response.json()
  resetForm()
})




/* ANCIEN CODE ET ESSAIS

------------- Faire apparaitre la modale 

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

------------- Fermer la modale en dehors 

const modalWrapper = document.querySelector('.modal-wrapper')

document.addEventListener('click', e => {

    if (!modalBox.classList.contains('hidden')) {
    const target = e.currentTarget
  
    if (target !== modalWrapper) {
      modalBox.classList.add('hidden')
    }
}
  
})


------------- Supprimer un travail de la liste totale 


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

}) */


 
