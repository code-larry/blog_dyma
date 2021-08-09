import './assets/styles/styles.scss';
import './index.scss';

// On récupère une référence au conteneur de nos articles
const articleContainerElement = document.querySelector(".articles-container");

// Cette fonction va permettre de créer chaque article contenu dans le tableau renvoyé par l'API
const createArticle = (articles) => {

	// On itère sur chaque article du tableau pour en faire des noeuds à ajouter au DOM
	// On stocke tous les noeuds créés dans un tableau
	const articlesDOM = articles.map((article) => {

		// On créé la div qui contient l'article puis on lui ajoute sa classe
		const articleDOM = document.createElement("div");
		articleDOM.classList.add("article");

		// On créé le HTML et on retourne chaque article
		articleDOM.innerHTML = `
			<img src="${ article.img }" alt="profile">
			<h2>${ article.title }</h2>
			<p class="article-author">${ article.author } - ${ article.category }</p>
			<p class="article-content">${ article.content }</p>
			<div class="article-actions">
				<button class="btn btn-danger" data-id=${ article._id }>Supprimer</button>
				<button class="btn btn-primary">Modifier</button>
			</div>
		`;
		return articleDOM;
	});

	// On s'assure que notre container est vide
	// Puis on étale les éléments de notre tableau pour les ajouter au DOM
	articleContainerElement.innerHTML = '';
	articleContainerElement.append(...articlesDOM);

	// On va gérer la suppression en récupérant tous les boutons de suppression
	const deleteButtons = document.querySelectorAll(".btn-danger");

	// On écoute le click sur chaque bouton
	deleteButtons.forEach((button) => {
		button.addEventListener('click', async (event) => {
			try {
				// On récupère la cible du click
				const target = event.target;

				// On récupère l'id grâce à l'attribut dataset définit sur le bouton
				const articleId = target.dataset.id;
	
				// On envoie la requête DELETE à l'API
				const response = await fetch(`https://restapi.fr/api/articleslarry/${articleId}`, {
					method: "DELETE"
				});

				// On parse la réponse et on la récupère au format JSON
				const body = response.json();
				console.log(body);

				// On rafraichit la liste d'article en faisant une nouvelle requête GET
				fetchArticle();
			} catch (error) {
				console.log("error : " + error);
			}
		});
	});
};

// On récupère les articles depuis notre API
// En retour nous obtenons un tableau d'articles que nous passons à une fonction qui va créer chaque article
const fetchArticle = async () => {
	try {
		const response = await fetch("https://restapi.fr/api/articleslarry");
		const articles = await response.json();
	
		createArticle(articles);
	} catch (error) {
		console.log("error : " + error);
	}	
}

fetchArticle();