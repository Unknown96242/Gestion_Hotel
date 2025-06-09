
export function getReservations(){
    return fetch('../api/reservation_api.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

const row = document.createElement('tr');
            row.innerHTML = `
                <tr class="border-t border-t-[#dde1e3]">
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        ${reservation.id}</td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-240 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        Sophie Martin
                    </td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-360 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        Hôtel du Lac
                    </td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        2024-07-15
                    </td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-600 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        2024-07-20
                    </td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-720 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-medium leading-normal w-full">
                            <span class="truncate">Confirmée</span>
                        </button>
                    </td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-840 h-[72px] px-4 py-2 w-[400px] text-[#6a7781] text-sm font-normal leading-normal">
                        500 €</td>
                    <td
                        class="table-9c4d128b-6f8e-48cf-a4c2-0908449781da-column-960 h-[72px] px-4 py-2 w-60 text-[#6a7781] text-sm font-bold leading-normal tracking-[0.015em]">
                        Voir
                    </td>
                </tr>

                <td>
                    <button class="btn btn-danger delete-btn" data-id="${reservation.id}">Supprimer</button>
                </td>`;

            reservationTable.appendChild(row);