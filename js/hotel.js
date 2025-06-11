import { RACINE } from "./config_general.js";

// Récupérer les infos de l'hôtel
fetch(`http://localhost/${RACINE}/api/hotel_api.php`)
  .then(res => res.json())
  .then(data => {
    // Suppose que data[0] contient les infos de l'hôtel
    const hotel = data[0] || {};
    document.getElementById("hotel-name").textContent = hotel.nom_hotel || "Nom de l'Hôtel";
    document.getElementById("total-chambres").textContent = hotel.nombres_chambres || "--";
    document.getElementById("hotel-address").textContent = hotel.adresse || "Adresse de l'Hôtel";
    document.getElementById("hotel-country").textContent = hotel.pays || "Pays de l'Hôtel";
    document.getElementById("hotel-image").src = hotel.image_hotel || "default_image.jpg"; // Si vous avez une image par défaut
  });

// Récupérer le nombre de chambres libres
Promise.all([
  fetch(`http://localhost/${RACINE}/api/hotel_api.php`),
  fetch(`http://localhost/${RACINE}/api/chambre_api.php?status=occupe`)])
  .then(([hotel, chambreReserve ]) => {
    return Promise.all([hotel.json(), chambreReserve.json()]);
  }
).then(([hotelData, chambreReserveData]) => {
   console.log(hotelData[0], chambreReserveData);
   console.log(hotelData[0].nombres_chambres, chambreReserveData.length);
   
   
    document.getElementById("chambres-libres").textContent = hotelData[0].nombres_chambres - chambreReserveData.length;
  });

  // .then(res => res.json())

// Récupérer le nombre total de clients
fetch(`http://localhost/${RACINE}/api/client_api.php`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("nb-clients").textContent = data.length;
  });

// Prestations disponibles
fetch(`http://localhost/${RACINE}/api/prestation_api.php`)
  .then(res => res.json())
  .then(data => {
    const span = document.getElementById("prestations-disponibles");
    if (!data || data.length === 0) {
      span.textContent = "--";
      return;
    }
    const descriptions = data.map(p => p.description);
    if (descriptions.length <= 3) {
      span.textContent = descriptions.join(", ");
    } else {
      span.innerHTML = `${descriptions.slice(0, 3).join(", ")} <span id="prestations-more" class="text-blue-600 cursor-pointer">...</span>`;
      span.onclick = (e) => {
        e.stopPropagation();
        if (!document.getElementById("prestations-list")) {
          const ul = document.createElement("ul");
          ul.id = "prestations-list";
          ul.className = "mt-2 bg-white border rounded shadow p-2 absolute z-10";
          descriptions.slice(3).forEach(desc => {
            const li = document.createElement("li");
            li.textContent = desc;
            li.className = "py-1 px-2 hover:bg-slate-100 rounded";
            ul.appendChild(li);
          });
          span.appendChild(ul);

          // Fermer la liste si on clique ailleurs
          setTimeout(() => {
            document.addEventListener("click", closePrestationsList);
          }, 0);
        }
      };

      function closePrestationsList(e) {
        if (!span.contains(e.target)) {
          const ul = document.getElementById("prestations-list");
          if (ul) ul.remove();
          document.removeEventListener("click", closePrestationsList);
        }
      }
    }
  });

// Types de chambres à disposition
fetch(`http://localhost/${RACINE}/api/categorie_api.php`)
  .then(res => res.json())
  .then(data => {
    const span = document.getElementById("types-chambres");
    if (!data || data.length === 0) {
      span.textContent = "--";
      return;
    }
    const noms = data.map(c => c.nom_categorie || c.nom || c.description);
    if (noms.length <= 3) {
      span.textContent = noms.join(", ");
    } else {
      span.innerHTML = `${noms.slice(0, 3).join(", ")} <span id="types-more" class="text-blue-600 cursor-pointer">...</span>`;
      span.onclick = (e) => {
        e.stopPropagation();
        if (!document.getElementById("types-list")) {
          const ul = document.createElement("ul");
          ul.id = "types-list";
          ul.className = "mt-2 bg-white border rounded shadow p-2 absolute z-10";
          noms.slice(3).forEach(nom => {
            const li = document.createElement("li");
            li.textContent = nom;
            li.className = "py-1 px-2 hover:bg-slate-100 rounded";
            ul.appendChild(li);
          });
          span.appendChild(ul);

          // Fermer la liste si on clique ailleurs
          setTimeout(() => {
            document.addEventListener("click", closeTypesList);
          }, 0);
        }
      };

      function closeTypesList(e) {
        if (!span.contains(e.target)) {
          const ul = document.getElementById("types-list");
          if (ul) ul.remove();
          document.removeEventListener("click", closeTypesList);
        }
      }
    }
  });
