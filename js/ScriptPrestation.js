import { RACINE } from "./config_general.js";
import { showToast, showConfirm } from "./utils.js";

// Récupérer l'id depuis l'URL
function getPrestationIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Préremplir le formulaire avec la prestation sélectionnée
const prestationId = getPrestationIdFromUrl();
if (prestationId) {
  fetch(`http://localhost/${RACINE}/api/prestation_api.php?id=${prestationId}`)
    .then(res => res.json())
    .then(data => {
      // Si l'API retourne un tableau, prends le premier élément
      const prestation = Array.isArray(data) ? data[0] : data;
      if (prestation) {
        document.getElementById("prestation-id").value = prestation.id || prestation.id_prestation;
        document.getElementById("description").value = prestation.description || "";
        document.getElementById("prix").value = prestation.prix || "";
      } else {
        showToast("Prestation introuvable.", 4000, "error");
      }
    })
    .catch(() => showToast("Erreur lors du chargement de la prestation.", 4000, "error"));
}

// Gestion de la soumission du formulaire
const editForm = document.getElementById("editForm");
if (editForm) {
  editForm.addEventListener("submit", function(e) {
    e.preventDefault();
    showConfirm(
      "Voulez-vous vraiment modifier cette prestation ?",
      () => {
        const id = document.getElementById("prestation-id").value;
        const description = document.getElementById("description").value.trim();
        const prix = document.getElementById("prix").value.trim();

        if (!description || !prix) {
          showToast("Veuillez remplir tous les champs.", 3000, "error");
          return;
        }

        fetch(`http://localhost/${RACINE}/api/prestation_api.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, description, prix })
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              showToast("Prestation modifiée avec succès !", 3000, "success");
              setTimeout(() => window.location.href = "indexPrestation.html", 1200);
            } else {
              showToast(result.error || "Erreur lors de la modification.", 4000, "error");
            }
          })
          .catch(() => showToast("Erreur réseau lors de la modification.", 4000, "error"));
      }
    );
  });
}

// Afficher la liste des prestations
function afficherPrestations() {
  fetch(`http://localhost/${RACINE}/api/prestation_api.php`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("prestationTableBody");
      tbody.innerHTML = "";
      data.forEach(prestation => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="py-2 px-4">${prestation.id}</td>
          <td class="py-2 px-4">${prestation.description}</td>
          <td class="py-2 px-4">${prestation.prix} FCFA</td>
          <td class="py-2 px-4 flex gap-2">
            <button class="bg-green-100 text-green-700 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-green-200 transition" onclick="window.location.href='editPrestation.html?id=${prestation.id}'">Modifier</button>
            <button class="bg-red-100 text-red-700 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-red-200 transition" onclick="supprimerPrestation(${prestation.id})">Supprimer</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// Ajout d'une prestation avec showConfirm et showToast
const addForm = document.getElementById("addForm");
if (addForm) {
  addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    showConfirm(
      "Voulez-vous vraiment ajouter cette prestation ?",
      () => {
        const description = document.getElementById("description").value.trim();
        const prix = document.getElementById("prix").value.trim();

        if (!description || !prix) {
          showToast("Veuillez remplir tous les champs.", 3000, "error");
          return;
        }

        fetch(`http://localhost/${RACINE}/api/prestation_api.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, prix })
        })
          .then(res => res.json())
          .then(result => {
            if (result.success) {
              showToast("Prestation ajoutée avec succès !", 3000, "success");
              addForm.reset();
              setTimeout(() => window.location.href = "indexPrestation.html", 1200);
            } else {
              showToast(result.error || "Erreur lors de l'ajout.", 4000, "error");
            }
          })
          .catch(() => showToast("Erreur réseau lors de l'ajout.", 4000, "error"));
      }
    );
  });
}

// Suppression d'une prestation avec showConfirm
window.supprimerPrestation = function(id) {
  showConfirm(
    `Voulez-vous vraiment supprimer cette prestation ${id} ?`,
    () => {
      fetch(`http://localhost/${RACINE}/api/prestation_api.php?id=${id}`, {
        method: "DELETE"
        
      })
        .then(res => res.json())
        .then(result => {

          if (result.success) {
            showToast("Prestation supprimée avec succès !", 3000, "success");
            afficherPrestations();
          } else {
            showToast(result.error || "Erreur lors de la suppression.", 4000, "error");
          }
        })
        .catch(() => showToast("Erreur réseau lors de la suppression.", 4000, "error"));
    }
  );
};

// Initialisation
afficherPrestations();
