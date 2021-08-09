import '../assets/styles/styles.scss';
import './form.scss'

// On récupère une référence à notre formulaire
const form = document.querySelector('form');

// On récupère une réf à la liste qui affiche les erreurs
const errorElement = document.querySelector('#errors');
// On stocke les messages d'erreurs dans un tableau
let errors = [];

// On écoute la soumission du form
form.addEventListener('submit', async (event) => {

	// On bloque le comportement par défaut qui recharge la page après envoie des données du form
	event.preventDefault();

	// On doit récupérer les données
	const formData = new FormData(form);

	// On transforme les données récupérées en un objet
	const article = Object.fromEntries(formData.entries());

	// On vérifie qu'il n'y a pas d'erreurs
	if (formIsValid(article)) {
		// Notre fonction étant async, on peut utiliser un bloc try catch
		try {
			// On transforme l'objet au format JSON pour l'envoyer au backend
			const json = JSON.stringify(article);
					
			// On utilise fetch pour envoyer les données au backend
			const response = await fetch("https://restapi.fr/api/articleslarry", {
				method: "POST",
				body: json,
				headers: {
					"Content-Type": "application/json"
				}
			});

			// Une fois les données envoyées, le backend nous retourne une réponse 
			const body = await response.json();
			console.log(body);
		} catch (error) {
			console.log("erreur : " + e);
		}
	}
})

// On utilise une fonction gérer une erreur
const formIsValid = (article) => {

	// Si un des champs n'est pas rempli, on ajoute un message erreur dans notre tableau
	if (!article.author || !article.category || !article.content || !article.img || !article.title) {
		errors.push("Vous devez remplir tous les champs !");
	} else {
		errors = [];
	}

	// Si l'article est trop court
	if (article.content.length < 20) {
		errors.push("Le contenu de votre article est trop court !");
	}

	// Si notre tableau contient au moins 1 erreur alors on affiche cet élément dans notre formulaire et on renvoie false
	// Sinon, on s'assure qu'aucun message n'est affiché et notre fonction renvoie true
	if (errors.length) {
		let errorHTML = '';
		errors.forEach((el) => {
			errorHTML = `<li>${ el }</li>`;
		})
		errorElement.innerHTML = errorHTML;
		return false;
	} else {
		errorElement.innerHTML = '';
		return true;
	}
};