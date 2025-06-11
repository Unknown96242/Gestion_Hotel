import { RACINE } from "./config_general.js";
import { showToast, showConfirm } from "./utils.js";

// Charger les infos de l'hôtel au chargement de la page
// document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost/${RACINE}/api/hotel_api.php`)
    .then(res => res.json())
    .then(data => {
      const hotel = data[0] || {};
      document.getElementById("nom").value = hotel.nom_hotel || "";
      document.getElementById("adresse").value = hotel.adresse || "";
      document.getElementById("pays").value = hotel.pays || "";
    //   document.getElementById("image").value = hotel.image_hotel || "";
      const chambreInput = document.getElementById("chambre");
      chambreInput.value = hotel.nombres_chambres || "";
      chambreInput.readOnly = true;
      chambreInput.classList.add("bg-slate-100", "cursor-not-allowed");

      // Après avoir récupéré hotel.image (URL de l'image déjà enregistrée)
      const preview = document.getElementById("image-preview");
      if (hotel.image_hotel) {
        preview.src = hotel.image_hotel;
        preview.classList.remove("hidden");
        console.log(`Image prévisualisée : ${hotel.image_hotel}`);
        
      }
    });
// });

// Aperçu de l'image sélectionnée
document.getElementById("image").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("image-preview");
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      preview.src = evt.target.result;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.classList.add("hidden");
  }
});



// Gestion de la soumission du formulaire
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  showConfirm(
    "Confirmer la modification des informations de l'hôtel ?",
    () => {
      const nom = document.getElementById("nom").value;
      const adresse = document.getElementById("adresse").value;
      const pays = document.getElementById("pays").value;
      const nombres_chambres = document.getElementById("chambre").value;
      const imageInput = document.getElementById("image");
      let imageToSend = window.oldImageUrl || "";

      // Fonction d'envoi après traitement image
      const sendUpdate = (imageValue) => {
        fetch(`http://localhost/${RACINE}/api/hotel_api.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom_hotel: nom,
            nombres_chambres: nombres_chambres,
            pays: pays,
            adresse: adresse,
            image_hotel: imageValue
          })
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              showToast("Modification enregistrée avec succès !", 3000, "success");
              setTimeout(() => window.location.href = "hotel.html", 1200);
            } else {
              showToast(result.error || "Erreur lors de la modification.", 4000, "error");
            }
          })
          .catch(() => showToast("Erreur réseau lors de la modification.", 4000, "error"));
      };

      // Si une nouvelle image est sélectionnée, la convertir en base64
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          sendUpdate(evt.target.result); // base64
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        sendUpdate(imageToSend);
      }
    }
  );
});