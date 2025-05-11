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
