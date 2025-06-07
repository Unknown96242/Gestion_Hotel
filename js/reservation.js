// import { getReservations} from './api.js';
import { showToast } from "./utils.js";
import { recupererDonnee, redirection, estEmailValide, afficherErreurSimple  } from './utils.js';

const reservationTable = document.getElementById('reservation-table-body');
//afficher le spinner pendant le chargement des données
function afficherSpinner() {
  const spinnerRow = document.createElement('tr');
  const spinnerCell = document.createElement('td');
  spinnerCell.colSpan = 8; // adapte selon le nombre de colonnes de ton tableau
  spinnerCell.style.textAlign = 'center';
  spinnerCell.innerHTML = `
    <div class="spinner">
      <img src="assets/spinner.svg" alt="Loading..." style="display:inline-block;">
      <div class="spinner-border" role="status" style="display:inline-block;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
  spinnerRow.appendChild(spinnerCell);
  reservationTable.innerHTML = '';
  reservationTable.appendChild(spinnerRow);
}
// Afficher le spinner avant de récupérer les données
afficherSpinner();
const MIN_SPINNER_TIME = 2000; // 2 secondes
const startTime = Date.now();

fetch('http://localhost/projet-php/api/reservation_api.php')
  .then(response => response.json())
  .then(reservations => {
    const elapsed = Date.now() - startTime;
    const waitTime = Math.max(0, MIN_SPINNER_TIME - elapsed);
    setTimeout(() => {
      if (reservations && reservations.length > 0) {
        // Vider le tableau avant d'ajouter les nouvelles réservations
        reservationTable.innerHTML = '';
        reservations.forEach(reservation => {
          const statusColor = getStatusBgColor(reservation.status);
          // Utilise uniquement les clés utiles (pas les clés numériques)
          const row = document.createElement('tr');
          row.classList.add('border-t', 'border-t-[#dde1e3]');
          row.innerHTML = `
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  ${reservation.reservation_id}</td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-240 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  ${reservation.client_nom} ${reservation.client_prenom}
              </td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-360 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  Hôtel du Lac
              </td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  ${reservation.date_deb}
              </td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-600 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  ${reservation.date_fin}
              </td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-720 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                  <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 ${statusColor} font-medium leading-normal w-full">
                      <span class="truncate">${reservation.status}</span>
                  </button>
              </td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-840 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                  ${reservation.cout_total} fcfa</td>
              <td class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-960 h-[72px] px-4 py-2 w-60 text-[#6a7781] text-sm font-bold leading-normal tracking-[0.015em]">
                  Voir
              </td>
              <td>
                  <button class="btn text-blue-500 bg-white edit-btn" data-id="${reservation.reservation_id}">Modifier</button>
                  <button class="btn text-red-500 bg-white delete-btn" data-id="${reservation.reservation_id}">Supprimer</button>
              </td>`;
          reservationTable.appendChild(row);
        });
      } else {
        reservationTable.innerHTML = '<tr><td colspan="8">Aucune réservation trouvée.</td></tr>';
      }
    }, waitTime);
  })
  .catch(error => {
    const elapsed = Date.now() - startTime;
    const waitTime = Math.max(0, MIN_SPINNER_TIME - elapsed);
    setTimeout(() => {
      console.error('Erreur lors de la récupération des réservations:', error);
      reservationTable.innerHTML = '<tr class="border-t border-t-[#dde1e3]"><td colspan="8">Erreur lors de la récupération des réservations.</td></tr>';
    }, waitTime);
  });

function getStatusBgColor(status) {
  switch (status.toLowerCase()) {
    case 'en attente':
      return 'bg-yellow-300 text-black';
    case 'annuler':
      return 'bg-red-400 text-white';
    case 'valider':
      return 'bg-green-400 text-white';
    default:
      return 'bg-[#f1f2f4] text-[#121516]';
  }
}

// Ajoute un écouteur d'événement sur le tableau pour la suppression
reservationTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    showConfirmToast(
      "Voulez-vous vraiment supprimer cette réservation ?",
      () => {
        // Si confirmé
        fetch('http://localhost/projet-php/api/reservation_api.php', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `id=${encodeURIComponent(id)}`
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            e.target.closest('tr').remove();
            showToast('Réservation supprimée avec succès !', 3000, 'success');
          } else {
            showToast(result.error || 'Erreur.', 3000, 'error');
          }
        })
        .catch(() => showToast('Erreur lors de la suppression.', 3000, 'error'));
      },
      () => {
        // Si annulé
        showToast('Suppression annulée.', 3000, 'error');
      }
    );
  } else if (e.target.classList.contains('edit-btn')) {
    const id = e.target.getAttribute('data-id');
    // Redirige vers la page de modification avec l'id en paramètre
    window.location.href = `modifier_reservation.html?id=${id}`;
  }
});

// Ajoute ceci en bas de reservation.js ou dans utils.js
function showConfirmToast(message, onConfirm, onCancel) {
    let toast = document.getElementById('toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-message';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <div style="margin-bottom:12px;">${message}</div>
        <button id="toast-confirm-btn" style="margin-right:10px;padding:6px 16px;background:#22c55e;color:#fff;border:none;border-radius:6px;cursor:pointer;">Confirmer</button>
        <button id="toast-cancel-btn" style="padding:6px 16px;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;">Annuler</button>
    `;
    toast.style.display = 'block';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '16px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '200px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    toast.style.fontSize = '16px';
    toast.style.textAlign = 'center';

    document.getElementById('toast-confirm-btn').onclick = () => {
        toast.style.display = 'none';
        if (onConfirm) onConfirm();
    };
    document.getElementById('toast-cancel-btn').onclick = () => {
        toast.style.display = 'none';
        if (onCancel) onCancel();
    };
}
