/**
 * Recupere des donnees a partir d'une api
 * @param {string} url - lien api.
 * @returns {Promise}.
 */
export function recupererDonnee(url){
    return fetch(url).then((response) =>{return response.json()} )
}


/**
 * Vérifie si un email est valide
 * @param {string} email - L'email à vérifier
 * @returns {boolean} True si l'email est valide
 */
export function estEmailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export function redirection(page){
    setTimeout(() => {
        window.location.replace(page);
    }, 2000);
}

/**
 * Affiche un message d'erreur dans un élément parent
 * @param {HTMLElement} parent - L'élément HTML dans lequel l'erreur sera insérée
 * @param {string} message - Le message d'erreur à afficher
 * @param {string} [balise="p"] - La balise HTML à créer (par défaut "p")
 * @param {string} [classe=""] - La/les classe(s) CSS à ajouter (optionnel)
 * @returns {HTMLElement} L'élément d'erreur créé
 */
export function afficherMessage(parent, message, balise = "p", classe = "") {
    // Crée l'élément d'erreur
    const elementErreur = document.createElement(balise);
    elementErreur.textContent = message;
    
    // Ajoute la classe si spécifiée
    if (classe) {
        elementErreur.className = classe;
    }
    
    // Vide le parent et ajoute le nouveau message
    parent.innerHTML = '';
    parent.appendChild(elementErreur);
    
    return elementErreur;
}

// Version simplifiée avec des paramètres par défaut
export function afficherErreurSimple(message, parent, classe = "erreur") {
    return afficherMessage(parent, message, "p", classe);
}


// Ajoute ceci en bas de reservation.js ou dans utils.js
export function showToast(message, duration = 3000, type = 'info') {
    let toast = document.getElementById('toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-message';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.color = '#fff';
    toast.style.padding = '16px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '200px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    toast.style.fontSize = '16px';
    toast.style.textAlign = 'center';
    if (type === 'success') {
        toast.style.background = '#22c55e';
    } else if (type === 'error') {
        toast.style.background = '#ef4444';
    } else {
        toast.style.background = '#333';
    }
    setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}

export function showConfirm(message, onConfirm, onCancel) {
  // Supprime un éventuel ancien confirm
  const old = document.getElementById("custom-confirm");
  if (old) old.remove();

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "custom-confirm";
  overlay.className = "fixed inset-0 bg-black/30 flex items-center justify-center z-50";

  // Boîte de dialogue
  const box = document.createElement("div");
  box.className = "bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center";
  box.innerHTML = `
    <div class="text-lg font-semibold text-slate-800 mb-6 text-center">${message}</div>
    <div class="flex gap-4 w-full justify-center">
      <button id="confirm-ok" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">Confirmer</button>
      <button id="confirm-cancel" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg transition">Annuler</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("confirm-ok").onclick = () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  };
  document.getElementById("confirm-cancel").onclick = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };
}

