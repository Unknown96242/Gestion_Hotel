import { recupererDonnee, redirection, estEmailValide, afficherErreurSimple  } from './utils.js';

const select = document.getElementById("type-compte")
const retourTraitement = document.getElementById("foot-lnk")

function afficherSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.innerHTML = `
        <img src="assets/spinner.svg"></img>
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
    retourTraitement.innerHTML = ''; // Vider le contenu existant
    retourTraitement.appendChild(spinner);
}

// Recuperation des roles
recupererDonnee('http://localhost:3000/roles')
.then( data => {        
    for(const role of data){
        select.innerHTML += `<option value="${role.id}" id ='${role.id}'>${role.titre}</option>`    
    }
})
.catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
    afficherErreurSimple("rôles introuvables.", retourTraitement)
});


// Validation du formulaire de connexion
const form = document.getElementById("connexion")
form.addEventListener('submit', function(e){
    e.preventDefault();
    const currentUser = document.getElementById("user-email").value.trim();
    const password = document.getElementById("pass-c").value.trim()

    //validation des champs
    if (currentUser === "" || password === "") {
        afficherErreurSimple('Veuillez remplir tous les champs', retourTraitement )         
        return ;
    }
    if (!estEmailValide(currentUser)) {
        afficherErreurSimple("Email saisi invalide", retourTraitement)
        return ;
    }
    if (password.length < 8) {
        afficherErreurSimple("Le mot de passe doit contenir au moins 8 caractères", retourTraitement)
        return ;
    }
    //traitement de la connexion
    recupererDonnee('http://localhost:3000/users').then((data) => {
        const optionValue = select.value;
        let trouveEmail = false
        let pass = false;     
        let i = 0; //represente l'index de l'utilisateur
        //parcours de la liste des utilisateurs  
        for(const user of data){
            if (user.email === currentUser) {
                trouveEmail = true
                if (user.motDePasse === password) {
                    pass = true
                }
                break
            }  
            i++;
        }
        if (trouveEmail && pass) {
            // Vérification du rôle
            if (data[i].role == optionValue) {
                // Redirection en fonction du rôle
                if ( optionValue == 1) {
                    //admin
                    afficherSpinner()
                    redirection('admin.html');
                }else if(optionValue.toLowerCase() == 2){
                    //gestionnaire
                    afficherSpinner()
                    redirection('gestionnaire.html');
                }
                else{
                    //utilisateur
                    afficherSpinner()
                    redirection('acceuil.html');
                }
            } else {
                // Afficher un message d'erreur si le rôle ne correspond pas
                afficherErreurSimple( "Ce compte n'a pas ce role", retourTraitement)
                return;
            }
            
        }else{
            // Afficher un message d'erreur si l'email ou le mot de passe est incorrect
            trouveEmail?afficherErreurSimple('Mot de passe incorrect', retourTraitement ):afficherErreurSimple("Email non enregistre", retourTraitement);
        }
    })        
    .catch((error) => {
        // Gérer les erreurs de récupération des données
        console.error("Erreur lors de la récupération des données :", error);
        afficherErreurSimple("Une erreur s'est produite lors de la connexion.", retourTraitement)
    });
})












    
