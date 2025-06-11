import { RACINE } from "./config_general.js"
const tbodyDisplayRoom = document.getElementById('tbodyDisplayRoom')
const trierBtn = document.getElementById('trieInput')

const API_URL = `http://localhost/${RACINE}/api/chambre_api.php`

//Recuperation de toute les chambre trier par defaut
function afficherChambres() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(d => {
                const row = document.createElement('tr')
                const dispo = d.status
                // Ajout de la couleur selon le statut
                let statusClass = ""
                let statusLabel = ""
                if (dispo.toLowerCase() === "libre") {
                    statusClass = "bg-blue-100 text-blue-700"
                    statusLabel = "Libre"
                } else if (dispo.toLowerCase() === "occupe") {
                    statusClass = "bg-red-100 text-red-700"
                    statusLabel = "Occupée"
                } else {
                    statusClass = "bg-gray-100 text-gray-700"
                    statusLabel = dispo
                }
                row.innerHTML = `
                    <td>${d.num_chambre}</td>
                    <td class="informationText typeRoom">${d.description}</td>
                    <td>
                        <span class="status px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                            ${statusLabel}
                        </span>
                    </td>
                    <td class="btnAction">
                        <a href="#">voir details</a>
                    </td>
                `
                tbodyDisplayRoom.append(row)
            });
        })
}

afficherChambres()

trierBtn.addEventListener('change', () => {
    const value = trierBtn.value.toLowerCase()
    tbodyDisplayRoom.innerHTML = ""

    if (value === "occupe") {
        fetch(`http://localhost/${RACINE}/api/chambre_api.php?status=occupe`)
            .then(response => response.json())
            .then(data => {
                data.forEach(d => {
                    const row = document.createElement('tr')
                    const dispo = d.status
                    // Ajout de la couleur selon le statut
                    let statusClass = ""
                    let statusLabel = ""
                    if (dispo.toLowerCase() === "libre") {
                        statusClass = "bg-blue-100 text-blue-700"
                        statusLabel = "Libre"
                    } else if (dispo.toLowerCase() === "occupe") {
                        statusClass = "bg-red-100 text-red-700"
                        statusLabel = "Occupée"
                    } else {
                        statusClass = "bg-gray-100 text-gray-700"
                        statusLabel = dispo
                    }
                    row.innerHTML = `
                        <td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td>
                            <span class="status px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                                ${statusLabel}
                            </span>
                        </td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>
                    `
                    tbodyDisplayRoom.append(row)
                });
            })
    } else if (value === "libre") {
        fetch(`http://localhost/${RACINE}/api/chambre_api.php?status=libre`)
            .then(response => response.json())
            .then(data => {
                data.forEach(d => {
                    const row = document.createElement('tr')
                    const dispo = d.status
                    // Ajout de la couleur selon le statut
                    let statusClass = ""
                    let statusLabel = ""
                    if (dispo.toLowerCase() === "libre") {
                        statusClass = "bg-blue-100 text-blue-700"
                        statusLabel = "Libre"
                    } else if (dispo.toLowerCase() === "occupe") {
                        statusClass = "bg-red-100 text-red-700"
                        statusLabel = "Occupée"
                    } else {
                        statusClass = "bg-gray-100 text-gray-700"
                        statusLabel = dispo
                    }
                    row.innerHTML = `
                        <td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td>
                            <span class="status px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                                ${statusLabel}
                            </span>
                        </td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>
                    `
                    tbodyDisplayRoom.append(row)
                });
            })
    } else if (value == "nul") {
        afficherChambres()
    }

})