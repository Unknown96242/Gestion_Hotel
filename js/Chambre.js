const tbodyDisplayRoom = document.getElementById('tbodyDisplayRoom')
const trierBtn = document.getElementById('trieInput')

const API_URL = "http://localhost/gestionhotelerie/api/chambre_api.php"

//Recuperation de toute les chambre trier par defaut
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(d => {
            const row = document.createElement('tr')
            const dispo = d.status ? "Libre" : "Occupée"
            row.innerHTML = `<td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td ><p class="status">${dispo}</p></td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>`
            tbodyDisplayRoom.append(row)
        });
    })

trierBtn.addEventListener('change', () => {
    const value = trierBtn.value.toLowerCase()
    tbodyDisplayRoom.innerHTML = ""

    if (value === "nolibre") {
        fetch("http://localhost/gestionhotelerie/api/chambre_api.php?dispo=0")
            .then(response => response.json())
            .then(data => {
                data.forEach(d => {
                    const row = document.createElement('tr')
                    const dispo = d.status ? "Libre" : "Occupée"
                    row.innerHTML = `<td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td ><p class="status">${dispo}</p></td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>`
                    tbodyDisplayRoom.append(row)
                });
            })
    } else if (value === "libre") {
        fetch("http://localhost/gestionhotelerie/api/chambre_api.php?dispo=1")
            .then(response => response.json())
            .then(data => {
                data.forEach(d => {
                    const row = document.createElement('tr')
                    const dispo = d.status ? "Libre" : "Occupée"
                    row.innerHTML = `<td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td ><p class="status">${dispo}</p></td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>`
                    tbodyDisplayRoom.append(row)
                });
            })
    } else if (value == "nul") {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                data.forEach(d => {
                    const row = document.createElement('tr')
                    const dispo = d.status ? "Libre" : "Occupée"
                    row.innerHTML = `<td>${d.num_chambre}</td>
                        <td class="informationText typeRoom">${d.description}</td>
                        <td ><p class="status">${dispo}</p></td>
                        <td class="btnAction">
                            <a href="#">voir details</a>
                        </td>`
                    tbodyDisplayRoom.append(row)
                });
            })
    }

})