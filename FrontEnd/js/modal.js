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
        if (jsonWork.category && jsonWork.category.id) {
            this.category = jsonWork.category.id
        } else {
            this.category = jsonWork.categoryId
        }
    }
}

export function createWork(work, areWeInModal = true) {
    const newWork = document.createElement("figure")
    if (areWeInModal) {
        newWork.setAttribute("data-piece-of-work", "")
        newWork.setAttribute("data-piece-of-work-id", work.id)
        newWork.setAttribute("data-miniature", "")
        newWork.innerHTML +=
            `
            <div class="modal-minia">
                <img src="assets/icons/bin.svg" class="modal-bin" data-bin data-bin-id="${work.id}">
                <img src="${work.img}" class="modal-miniature-img">
            </div>
            <p>éditer</p>
        `
    } else {
        newWork.setAttribute("data-figure", "")
        newWork.setAttribute("data-figure-id", work.id)
        newWork.setAttribute("data-figure-cat", work.category)
        newWork.innerHTML +=
            `
            <img src="${work.img}" alt="${work.id}">
            <figcaption>${work.title}</figcaption>
        `
    }

    return newWork
}

await fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {

        for (let jsonWork of jsonListWorks) {
            let work = new Work(jsonWork)
            document.querySelector(".modal-img").append(createWork(work, true))
            /*`<figure data-miniature data-piece-of-work data-piece-of-work-id="${work.id}">
            <div class="modal-minia">
                <img src="assets/icons/bin.svg" class="modal-bin" data-bin data-bin-id="${work.id}">
                <img src="${work.img}" class="modal-miniature-img">
            </div>
            <p>éditer</p>
        </figure>`*/
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
        bin.addEventListener('click', async e => {
            e.preventDefault()
            const binId = bin.getAttribute("data-bin-id")

            for (const pieceOfWork of pieceOfWorks) {
                const pieceOfWorkId = pieceOfWork.getAttribute("data-piece-of-work-id")
                if (binId === pieceOfWorkId) {
                    const response = await fetch(`http://localhost:5678/api/works/${pieceOfWorkId}`, {
                        method: "DELETE",
                        headers: new Headers({
                            'Authorization': 'Basic ' + sessionStorage.getItem("token"),
                        }),

                    })
                    console.log(response)
                    if (response.status === 204) {
                        alert('Work Deleted Successfully')
                        pieceOfWork.remove()
                        document.querySelector(`[data-figure-id="${pieceOfWorkId}"]`).remove()
                    }

                }

            }

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

function getImgData() {
    const files = chooseFile.files[0]
    if (files) {
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
})

/* Ajouter un work */

const addWork = document.querySelector(".modal-wrapper-page-2 form")

addWork.addEventListener("submit", async e => {
    e.preventDefault()

    const workData = new FormData(addWork)
    console.log(workData)

    let response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: new Headers({
            'Authorization': 'Basic ' + sessionStorage.getItem("token"),
        }),
        body: workData
    })

    console.log(response)
    let result = await response.json()
    if (response.status === 201) {
        alert('Le formulaire a bien été envoyé !')
    } else {
        alert("Le formulaire n'est pas correctement rempli. Veuillez réessayer.")
    }

    resetForm()

    let work = new Work(result)
    document.querySelector(".gallery").append(createWork(work, false))
    document.querySelector(".modal-img").append(createWork(work, true))

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

})

------------- Ajouter un work depuis le formulaire

    /*const reader = new FileReader()
    reader.readAsDataURL(chooseFile.files[0])

    reader.addEventListener("load", async e => {

        
        const workInfos = {
            title: workData.get("title"),
            image:reader.result,
            category: workData.get("category"),
        }
    
        /* const chargeUtile = JSON.stringify(workInfos) 
    
        workData.append('image', reader.result)


*/



/*body: JSON.stringify({
    userId: sessionStorage.getItem("userId")
})*/