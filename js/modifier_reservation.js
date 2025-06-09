import { showToast } from "./utils.js";

const urlParams = new URLSearchParams(window.location.search);
const reservationId = urlParams.get('id');

// Sélection des champs du formulaire
const clientInput = document.getElementById('client-input');
const chambreSelect = document.getElementById('chambre-select');
const prestationSelect = document.getElementById('prestation-select');
const dateDebInput = document.getElementById('date-deb');
const dateFinInput = document.getElementById('date-fin');
const coutTotalInput = document.getElementById('cout-total');
const statusSelect = document.getElementById('statut-select');
const modePaiementSelect = document.getElementById("mode-paiement-select");

document.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim().toLowerCase();
    if (txt.includes('annuler')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'reservation.html';
        });
    }
    if (txt.includes('enregistrer')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // ... (le code de soumission du formulaire ici)
        });
    }
});


let chambresData = [];
let prestationsData = [];
let categoriesData = [];

// Remplir les listes et pré-remplir le formulaire
Promise.all([
    fetch('http://localhost/projet-php/api/categorie_api.php').then(res => res.json()),
    fetch('http://localhost/projet-php/api/chambre_api.php').then(res => res.json()),
    fetch('http://localhost/projet-php/api/prestation_api.php').then(res => res.json()),
    fetch(`http://localhost/projet-php/api/reservation_api.php?id=${reservationId}`).then(res => res.json())
]).then(([categories, chambres, prestations, reservation]) => {
    categoriesData = categories;
    chambresData = chambres;
    prestationsData = prestations;

    // Remplir la liste des chambres
    chambreSelect.innerHTML = '';
    chambres.forEach(chambre => {
        const opt = document.createElement('option');
        opt.value = chambre.id;
        opt.textContent = `${chambre.num_chambre || chambre.numero || chambre.id} - ${chambre.description || ''}`;
        chambreSelect.appendChild(opt);
    });

    // Remplir la liste des prestations
    prestationSelect.innerHTML = '<option value="">Aucune</option>';
    prestations.forEach(prestation => {
        const opt = document.createElement('option');
        opt.value = prestation.id;
        opt.textContent = `${prestation.description} - ${prestation.prix}fcfa`;
        prestationSelect.appendChild(opt);
    });

    // Statut
    if (statusSelect) {
        statusSelect.innerHTML = `
            <option value="en attente">En attente</option>
            <option value="valider">Validée</option>
            <option value="annuler">Annulée</option>
        `;
    }

    // Mode de paiement
    if (modePaiementSelect) {
        modePaiementSelect.innerHTML = `
            <option value="Espèces">Espèces</option>
            <option value="carte bancaire">Carte bancaire</option>
            <option value="virement">Virement</option>
        `;
    }

    // Pré-remplir les champs
    clientInput.value = (reservation.client_nom || '') + ' ' + (reservation.client_prenom || '');
    chambreSelect.value = reservation.id_chambre_fk;
    prestationSelect.value = reservation.id_prestation_fk || '';
    dateDebInput.value = reservation.date_deb;
    dateFinInput.value = reservation.date_fin;
    coutTotalInput.value = reservation.cout_total;
    if (statusSelect) statusSelect.value = reservation.status;
    if (modePaiementSelect) modePaiementSelect.value = reservation.mode_paiement;
});

// Calcul automatique du coût total
function calculerCoutTotal() {
    const chambreId = chambreSelect.value;
    const prestationId = prestationSelect.value;
    const dateDeb = dateDebInput.value;
    const dateFin = dateFinInput.value;

    // Vérifie que la date de début n'est pas supérieure à la date de fin
    if (dateDeb && dateFin) {
        const d1 = new Date(dateDeb);
        const d2 = new Date(dateFin);
        if (d1 > d2) {
            coutTotalInput.value = '';
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
    coutTotalInput.value = coutTotal;
}

chambreSelect.addEventListener('change', calculerCoutTotal);
prestationSelect.addEventListener('change', calculerCoutTotal);
dateDebInput.addEventListener('input', calculerCoutTotal);
dateFinInput.addEventListener('input', calculerCoutTotal);

// Gestion du bouton Annuler
document.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim().toLowerCase();
    if (txt.includes('annuler')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'reservation.html';
        });
    }
    if (txt.includes('enregistrer')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Vérification des dates
            const dateDeb = dateDebInput.value;
            const dateFin = dateFinInput.value;
            if (dateDeb && dateFin) {
                const d1 = new Date(dateDeb);
                const d2 = new Date(dateFin);
                if (d2 < d1) {
                    showToast("La date de fin ne peut pas être antérieure à la date de début.", 4000, 'error');
                    return;
                }
            }

            const data = {
                id: reservationId,
                id_chambre_fk: chambreSelect.value,
                id_prestation_fk: prestationSelect.value || null,
                date_deb: dateDebInput.value,
                date_fin: dateFinInput.value,
                cout_total: coutTotalInput.value,
                status: statusSelect ? statusSelect.value : '',
                mode_paiement: modePaiementSelect ? modePaiementSelect.value : ''
            };

            fetch('http://localhost/projet-php/api/reservation_api.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString()
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    showToast('Réservation modifiée avec succès !', 4000, 'success');
                    setTimeout(() => window.location.href = 'reservation.html', 2000);
                } else {
                    showToast(result.error || 'Erreur lors de la modification.', 4000, 'error');
                }
            })
            .catch(() => showToast('Erreur lors de la modification.', 4000, 'error'));
        });
    }
});