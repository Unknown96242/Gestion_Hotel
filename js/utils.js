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
