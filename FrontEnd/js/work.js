/* Création d'une classe work pour chaque travaux */

class Work {
    constructor(jsonWork) {
        this.id = jsonWork.id
        this.title = jsonWork.title
        this.img = jsonWork.imageUrl
        this.category = jsonWork.category.id
    }
}

/* Récupère les différents travaux de l'architecte */

await fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {

        for (let jsonWork of jsonListWorks) {
            let work = new Work(jsonWork)
            document.querySelector(".gallery").innerHTML +=
                `<figure data-figure data-figure-cat="${work.category}">
                <img src="${work.img}" alt="${work.id}">
                <figcaption>${work.title}</figcaption>
            </figure>`
        }
    })

/* Les filtres */

const figures = document.querySelectorAll("[data-figure]")
const categories = document.querySelectorAll("[data-cat]")

if (categories) {

    categories.forEach(category => {
        category.addEventListener("click", e => {
            const type = category.getAttribute("data-cat-type")

            figures.forEach(figure => {
                figure.classList.remove("hidden")
                const categoryId = figure.getAttribute("data-figure-cat")
                if (type !== categoryId && type !== "all") {
                    figure.classList.add("hidden")
                }
            })
        })
    })

}
