var i = 0;
fetch("http://localhost/git/Gestion_HOTEL/api/client_api.php")
  .then((response) => response.json()) // Si ton PHP renvoie du JSON
  .then((data) => {
    // data.forEach((d) => {
    //   let p = document.createElement("p");
    //   p.textContent = `nom : ${d.nom}, prenom : ${d.prenom}`;
    //   document.getElementById("clients").append(p);
    //   i += 1;
    // });
    let p = document.createElement("p");
    p.textContent = `${data.length}`;
    document.getElementById("clients").append(p);
  })

  .catch((error) => console.error("Erreur :", error));

// Recuperation du nombre des chambres

var i = 0;
fetch("http://localhost/git/Gestion_HOTEL/api/chambre_api.php")
  .then((response) => response.json()) // Si ton PHP renvoie du JSON
  .then((data) => {
    // data.forEach((d) => {
    //   let p = document.createElement("p");
    //   p.textContent = `nom : ${d.nom}, prenom : ${d.prenom}`;
    //   document.getElementById("clients").append(p);
    //   i += 1;
    // });
    let p = document.createElement("p");
    p.textContent = `${data.length}`;
    document.getElementById("chambre").append(p);
  })

  .catch((error) => console.error("Erreur :", error));

// let p = document.createElement("p");
// p.textContent = i;
// document.getElementById("clients").append(p);
//console.log("Liste des clients :", data);

//recuperation du nom de l'hotel
//var p = 0
fetch("http://localhost/git/Gestion_HOTEL/api/hotel_api.php", { method: "GET" })
  .then((response) => response.json()) // Si ton PHP renvoie du JSON
  .then((data) => {
    data.forEach((d) => {
      let p = document.createElement("p");
      p.textContent = `${d.nom_hotel}`;
      document.getElementById("hotel").append(p);
    });
    // let p = document.createElement("p");
    // p.textContent = `${data[0].nom_hotel}`;
    // document.getElementById("hotel").append(p);
  })

  .catch((error) => console.error("Erreur :", error));

// bouton d'enregistrement de l'hotel
// let bouton = document.getElementById("bouton");
// let form = document.getElementById("form");
// let hotelName = document.getElementById("nom");
// let nbChambres = document.getElementById("chambres");
// form.addEventListener('click', (e) => {
//   e.preventDefault()
//   fetch("http://localhost/git/Gestion_HOTEL/api/hotel_api.php", { method: "PUT", headers : {'content-type' : 'application/json'}, body :  })
//   .then((response) => response.json())
//   .then((data) => {

//   })

//   .catch((error) => console.error("Erreur :", error));
// })

let bouton = document.getElementById("bouton");
let form = document.getElementById("form");
let hotelName = document.getElementById("nom");
let nbChambres = document.getElementById("chambres");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // éviter le rechargement de la page

  const dataToSend = {
    nom: hotelName.value,
    nb_chambres: nbChambres.value,
  };

  fetch("http://localhost/git/Gestion_HOTEL/api/hotel_api.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Modification réussie :", data);
      alert("Hôtel modifié avec succès !");
    })
    .catch((error) => console.error("Erreur :", error));
});
