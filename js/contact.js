var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page [cite: 2]
    
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target); // Récupère les données [cite: 2]

    // Petit message de chargement optionnel
    status.innerHTML = '<div class="alert alert-info">Envoi en cours...</div>';

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json' // C'est la clé pour éviter la redirection 
        }
    }).then(response => {
        if (response.ok) {
            // Succès : Message vert Bootstrap + Reset du formulaire
            status.innerHTML = '<div class="alert alert-success">Merci ! Votre message a bien été envoyé.</div>';
            form.reset(); // Vide les champs 
        } else {
            // Erreur : On essaie de lire le message d'erreur JSON envoyé par Formspree
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    // Affiche les erreurs spécifiques (ex: Email invalide) [cite: 4]
                    status.innerHTML = '<div class="alert alert-danger">' + data["errors"].map(error => error["message"]).join(", ") + '</div>';
                } else {
                    // Erreur générique
                    status.innerHTML = '<div class="alert alert-danger">Oups ! Il y a eu un problème lors de l\'envoi du formulaire.</div>';
                }
            });
        }
    }).catch(error => {
        // Erreur réseau [cite: 5]
        status.innerHTML = '<div class="alert alert-danger">Oups ! Il y a eu un problème de connexion.</div>';
    });
}

form.addEventListener("submit", handleSubmit);