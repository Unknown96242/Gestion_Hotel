import { RACINE } from "./config_general.js";
import { showToast, showConfirm } from "./utils.js";

// Récupère l'id de la réservation depuis l'URL
function getReservationIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const reservationId = getReservationIdFromUrl();
let idClient = null;

// Préremplir le formulaire avec les données de la réservation
if (reservationId) {
  fetch(`http://localhost/${RACINE}/api/reservation_api.php?id=${reservationId}`)
    .then(res => res.json())
    .then(data => {
      if (data && data[0]) {
        data = data[0];
        window.dataReservation = data; // <-- Stocke temporairement
        idClient = data.id_client_fk;
        document.getElementById("client-input").value = data.nom + " " + data.prenom;
        document.getElementById("date-deb").value = data.date_deb;
        document.getElementById("date-fin").value = data.date_fin;
        document.getElementById("cout-total").value = data.cout_total;

        // Si les selects sont déjà remplis, sélectionne la bonne valeur
        if (chambres.length) document.getElementById("chambre-select").value = data.id_chambre_fk;
        if (prestations.length) document.getElementById("prestation-select").value = data.id_prestation_fk;
        document.getElementById("statut-select").value = data.status;
        document.getElementById("mode-paiement-select").value = data.mode_paiement;
      } else {
        alert("Réservation introuvable.");
        window.location.href = "reservation.html";
      }
    })
    .catch(() => alert("Erreur lors du chargement de la réservation."));
}

// Rendre le champ coût total readonly (grisé)
document.addEventListener("DOMContentLoaded", () => {
  const coutInput = document.getElementById("cout-total");
  if (coutInput) {
    coutInput.readOnly = true;
    coutInput.classList.add("bg-gray-100", "cursor-not-allowed");
  }
});

// Calcul automatique du coût total selon chambre et prestation
let chambres = [];
let prestations = [];
let categories = [];

// Charger les catégories
fetch(`http://localhost/${RACINE}/api/categorie_api.php`)
  .then(res => res.json())
  .then(data => { categories = data; });

// Charger les chambres
fetch(`http://localhost/${RACINE}/api/chambre_api.php`)
  .then(res => res.json())
  .then(data => {
    chambres = data;
    remplirSelect("chambre-select", chambres, c => `${c.num_chambre} - ${c.chambre_description || c.description || ""}`);
    if (window.dataReservation) {
      document.getElementById("chambre-select").value = window.dataReservation.id_chambre_fk;
    }
  });

// Charger les prestations
fetch(`http://localhost/${RACINE}/api/prestation_api.php`)
  .then(res => res.json())
  .then(data => {
    prestations = data;
    remplirSelect("prestation-select", prestations, p => p.description || p.nom || "");
    if (window.dataReservation) {
      document.getElementById("prestation-select").value = window.dataReservation.id_prestation_fk;
    }
  });

function calculerCoutTotal() {
  const chambreId = document.getElementById("chambre-select").value;
  const prestationId = document.getElementById("prestation-select").value;
  const dateDeb = document.getElementById("date-deb").value;
  const dateFin = document.getElementById("date-fin").value;

  let prixChambre = 0, prixPrestation = 0, nbJours = 1;

  // Trouver la chambre sélectionnée
  const chambre = chambres.find(c => c.id == chambreId);
  if (chambre && chambre.id_categorie_fk) {
    // Trouver la catégorie de la chambre
    const categorie = categories.find(cat => cat.id == chambre.id_categorie_fk);
    if (categorie && categorie.prix_nuit) prixChambre = parseFloat(categorie.prix_nuit);
  }

  const prestation = prestations.find(p => p.id == prestationId);
  if (prestation && prestation.prix) prixPrestation = parseFloat(prestation.prix);

  // Calcul du nombre de jours
  if (dateDeb && dateFin) {
    const d1 = new Date(dateDeb);
    const d2 = new Date(dateFin);
    const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
    nbJours = diff > 0 ? diff : 1;
  }

  const total = (prixChambre * nbJours) + prixPrestation;
  document.getElementById("cout-total").value = total;
}

// Met à jour le coût total à chaque changement de chambre ou prestation
document.addEventListener("DOMContentLoaded", () => {
  ["chambre-select", "prestation-select", "date-deb", "date-fin"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", calculerCoutTotal);
  });
});

// Gestion de la soumission du formulaire avec showConfirm et showToast
const form = document.getElementById("form-modifier-reservation");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const chambre_id = document.getElementById("chambre-select").value;
    const prestation_id = document.getElementById("prestation-select").value;
    const date_deb = document.getElementById("date-deb").value;
    const date_fin = document.getElementById("date-fin").value;
    const cout_total = document.getElementById("cout-total").value;
    const status = document.getElementById("statut-select").value;
    const mode_paiement = document.getElementById("mode-paiement-select").value;

    // Ajoute la date limite si nécessaire (ici on la met égale à date_fin, à adapter selon ta logique)
    const date_limite = date_fin;

    showConfirm(
      `Voulez-vous vraiment modifier cette réservation ? ${reservationId}, ${idClient}, ${status}, ${mode_paiement}, ${date_limite}, ${date_deb}, ${date_fin}, ${cout_total}, ${chambre_id}, ${prestation_id}`,
      () => {
        fetch(`http://localhost/${RACINE}/api/reservation_api.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: reservationId,
            id_client_fk: idClient,
            status,
            mode_paiement,
            date_limite,
            date_deb,
            date_fin,
            cout_total,
            id_chambre_fk: chambre_id,
            id_prestation_fk: prestation_id
          })
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              showToast("Réservation modifiée avec succès !", 3000, "success");
              setTimeout(() => window.location.href = "reservation.html", 1200);
            } else {
              showToast(result.error || "Erreur lors de la modification.", 4000, "error");
            }
          })
          .catch(() => showToast("Erreur réseau lors de la modification.", 4000, "error"));
      }
    );
  });
}

function remplirSelect(selectId, data, labelCallback) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = ""; // Vide les anciennes options
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = labelCallback(item);
    select.appendChild(option);
  });
}