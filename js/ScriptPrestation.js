const apiUrl = "http://localhost:8080/Projet-PHP/Gestion_Hotel/api/prestation_api.php";

// Ajouter
if (document.getElementById("addForm")) {
  document.getElementById("addForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) window.location.href = "indexPrestation.html"; 
      else alert("Erreur lors de l'ajout.");
    });
  });
}

// Liste
if (document.getElementById("prestationTableBody")) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("prestationTableBody");
      tbody.innerHTML = ""; // Réinitialise la table
      data.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.description}</td>
          <td>${p.prix}</td>
          <td>
            <button class="btn" onclick="editPrestation('${p.id}', '${p.description}', '${p.prix}')">Modifier</button>
            <button class="btn" onclick="deletePrestation('${p.id}')">Supprimer</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Erreur liste:", err));
}

// Supprimer
function deletePrestation(id) {
  if (confirm("Supprimer ?")) {
    fetch(apiUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}`
    }).then(() => location.reload());
  }
}

// Modifier
if (document.getElementById("editForm")) {
  const form = document.getElementById("editForm");
  const data = JSON.parse(localStorage.getItem("edit") || "{}");
  form.id.value = data.id;
  form.description.value = data.description;
  form.prix.value = data.prix;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then(() => {
      localStorage.removeItem("edit");
      window.location.href = "indexPrestation.html";
    });
  });
}

function editPrestation(id, description, prix) {
  localStorage.setItem("edit", JSON.stringify({ id, description, prix }));
  window.location.href = "editPrestation.html";
}
