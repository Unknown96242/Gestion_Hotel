  const apiUrl = "http://localhost/Gestion_Hotel/api/client_api.php";
//   pour le bouton modifier er supprimer
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById("clientTableBody");
        data.forEach(c => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nom}</td>
            <td>${c.prenom}</td>
            <td>${c.age}</td>
            <td>${c.login}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="editClient(${c.id}, '${c.nom}', '${c.prenom}', ${c.age}, '${c.login}')">✏️ Modifier</button>
              <button class="btn btn-danger btn-sm" onclick="deleteClient(${c.id})">🗑️ Supprimer</button>
            </td>`;
          tbody.appendChild(tr);
        });
      });

    function deleteClient(id) {
      if (confirm("Supprimer ce client ?")) {
        fetch(apiUrl, {
          method: "DELETE",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `id=${id}`
        }).then(() => location.reload());
      }
    }

    function editClient(id, nom, prenom, age, login) {
      localStorage.setItem("editClient", JSON.stringify({ id, nom, prenom, age, login }));
      window.location.href = "ClientModifier.html";
    }

    // Modifier un client
    const form = document.getElementById("editForm");
    const client = JSON.parse(localStorage.getItem("editClient"));
    form.id.value = client.id;
    form.nom.value = client.nom;
    form.prenom.value = client.prenom;
    form.age.value = client.age;
    form.login.value = client.login;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(() => {
        localStorage.removeItem("editClient");
        window.location.href = "indexClient.html";
      });
    });