import { showToast } from  "./utils.js";

let chambresData = [];
let prestationsData = [];
let categoriesData = [];
let clientsData = [];

// Remplir les listes déroulantes dynamiquement
document.addEventListener('DOMContentLoaded', () => {
    // Charger les clients
    fetch('http://localhost/projet-php/api/client_api.php')
        .then(res => res.json())
        .then(response => {
            // Si l'API retourne { data: [...] }
            const clients = Array.isArray(response) ? response : response.data;
            clientsData = clients || [];
            const datalist = document.getElementById('clients-list');
            datalist.innerHTML = '';
            if (clients) {
                clients.forEach(client => {
                    const opt = document.createElement('option');
                    opt.value = `${client.nom} ${client.prenom}`;
                    datalist.appendChild(opt);
                });
            }
        });

    // Charger les catégories
    fetch('http://localhost/projet-php/api/categorie_api.php')
        .then(res => res.json())
        .then(categories => {
            categoriesData = categories; // Stocke toutes les catégories
        });

    // Charger les chambres
    fetch('http://localhost/projet-php/api/chambre_api.php')
        .then(res => res.json())
        .then(chambres => {
            chambresData = chambres; // Stocke toutes les chambres
            const select = document.getElementById('chambre-select');
            chambres
                .filter(chambre => chambre.status !== 'valide')
                .forEach(chambre => {
                    const opt = document.createElement('option');
                    opt.value = chambre.id;
                    opt.textContent = `${chambre.num_chambre} - ${chambre.description || ''}`;
                    select.appendChild(opt);
                });
        });

    // Charger les prestations
    fetch('http://localhost/projet-php/api/prestation_api.php')
        .then(res => res.json())
        .then(prestations => {
            prestationsData = prestations; // Stocke toutes les prestations
            const select = document.getElementById('prestation-select');
            prestations.forEach(prestation => {
                const opt = document.createElement('option');
                opt.value = prestation.id;
                opt.textContent = `${prestation.description}- ${prestation.prix}fcfa`;
                select.appendChild(opt);
            });
        });

    // Ajoute les écouteurs pour le calcul automatique
    ['chambre-select', 'prestation-select'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calculerCoutTotal);
    });

    // Ajoute les écouteurs sur les champs de dates
    const dateDebInput = document.querySelector('input[name="date_deb"]');
    const dateFinInput = document.querySelector('input[name="date_fin"]');
    if (dateDebInput) dateDebInput.addEventListener('input', calculerCoutTotal);
    if (dateFinInput) dateFinInput.addEventListener('input', calculerCoutTotal);
});

// Fonction de calcul automatique du coût total
function calculerCoutTotal() {
    const chambreId = document.getElementById('chambre-select').value;
    const prestationId = document.getElementById('prestation-select').value;
    const dateDeb = document.querySelector('input[name="date_deb"]').value;
    const dateFin = document.querySelector('input[name="date_fin"]').value;

    // Vérifie que la date de début n'est pas supérieure à la date de fin
    if (dateDeb && dateFin) {
        const d1 = new Date(dateDeb);
        const d2 = new Date(dateFin);
        if (d1 > d2) {
            document.querySelector('input[name="cout_total"]').value = '';
            showToast("La date de début ne peut pas être supérieure à la date de fin.", 4000, 'error');
            return;
        }
    }

    // Prix chambre selon la catégorie
    let prixChambre = 0;
    if (chambreId) {
        const chambre = chambresData.find(c => c.id == chambreId);
        if (chambre && chambre.id_categorie_fk) {
            const categorie = categoriesData.find(cat => cat.id == chambre.id_categorie_fk);
            prixChambre = categorie ? parseFloat(categorie.prix_nuit) : 0;
        }
    }

    // Prix prestation
    let prixPrestation = 0;
    if (prestationId) {
        const prestation = prestationsData.find(p => p.id == prestationId);
        prixPrestation = prestation ? parseFloat(prestation.prix) : 0;
    }

    // Nombre de nuits
    let nbNuits = 1;
    if (dateDeb && dateFin) {
        const d1 = new Date(dateDeb);
        const d2 = new Date(dateFin);
        nbNuits = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
    }

    // Calcul du coût total
    const coutTotal = (prixChambre * nbNuits) + prixPrestation;
    document.querySelector('input[name="cout_total"]').value = coutTotal;
}

// Gestion de l'envoi du formulaire
document.getElementById('form-ajout-reservation').addEventListener('submit', function(e) {
    const dateDeb = document.querySelector('input[name="date_deb"]').value;
    const dateFin = document.querySelector('input[name="date_fin"]').value;
    if (dateDeb && dateFin) {
        const d1 = new Date(dateDeb);
        const d2 = new Date(dateFin);
        if (d2 < d1) {
            showToast("La date de fin ne peut pas être antérieure à la date de début.", 4000, 'error');
            e.preventDefault();
            return;
        }
    }

    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    const nomSaisi = data.nom_client.trim().toLowerCase();

    // Recherche du client par nom complet (nom + prénom)
    const clientTrouve = clientsData.find(client =>
        (`${client.nom} ${client.prenom}`).toLowerCase() === nomSaisi
    );

    if (!clientTrouve) {
        if (confirm("Ce client n'est pas enregistré dans nos locaux.\nVous devez créer son compte.\nVoulez-vous être redirigé vers l'enregistrement du client ?")) {
            window.location.href = 'ajouter_client.html';
        }
        return;
    }

    // Remplace le nom par l'id pour l'envoi à l'API
    data.id_client_fk = clientTrouve.id;
    delete data.nom_client;

    // Calcul automatique de la date limite (exemple : 5 jours avant date_deb)
    if (data.date_deb) {
        const dateDeb = new Date(data.date_deb);
        dateDeb.setDate(dateDeb.getDate() - 5);
        data.date_limite = dateDeb.toISOString().split('T')[0];
    }

    // Si aucune prestation choisie, mettre null
    if (!data.id_prestation_fk) data.id_prestation_fk = null;

    console.log(data);

    fetch('http://localhost/projet-php/api/reservation_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            showToast('Réservation ajoutée avec succès !', 4000, 'success');
            window.location.href = 'reservation.html';
        } else if (result.error && result.error.includes('client non enregistré')) {
            if (confirm("Ce client n'est pas enregistré dans nos locaux.\nVous devez créer son compte.\nVoulez-vous être redirigé vers l'enregistrement du client ?")) {
                window.location.href = 'ajouter_client.html';
            }
        } else {
            showToast(result.error || 'Erreur lors de l\'ajout.', 4000, 'error');
        }
    })
    .catch(() => showToast('Erreur lors de l\'ajout.', 4000, 'error'));
});