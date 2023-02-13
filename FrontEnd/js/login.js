/* Formulaire de connexion */

const userLogin = document.querySelector("#login form")
userLogin.addEventListener("submit", async e => {
  e.preventDefault()

  const data = new FormData(userLogin)

  const userInfos = {
    email: data.get("email"),
    password: data.get("password")
  }

  console.log(userInfos)

  const chargeUtile = JSON.stringify(userInfos)

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "accept": "application/json"},
    body: chargeUtile
  })

  let result = await response.json()

  if (result.userId) {
    sessionStorage.setItem("token", result.token)
    location = "index.html"
  } else {
    alert("Erreur dans l’identifiant ou le mot de passe.")
  }

})