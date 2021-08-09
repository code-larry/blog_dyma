// On récupèe une réf à l'icône
const iconMobile = document.querySelector('.header-menu-icon');

// On récupère une réf à la div qui contient notre menu
const headerMenu = document.querySelector('.header-menu');

// Cette variabale indique si le menu est ouvert

let isMenuOpen = false;

// On stocke le noeud à ajouter au menu mobile
let mobileMenuDOM;

// On supprime la classe qui permet l'affiche du menu mobile
const closeMenu = () => {
	mobileMenuDOM.classList.remove("open");
}

// On créé la div dans laquelle se trouvera le menu mobile
// On écoute l'event click sur la div afin de pouvoir stopper la propagation sinon cela se propage jusqu'au click
// sur Window qui déclenche la fermeture du menu
const createMobileMenu = () => {
	mobileMenuDOM = document.createElement("div");
	mobileMenuDOM.classList.add("mobile-menu");
	mobileMenuDOM.addEventListener('click', event => {
		event.stopPropagation();
	})

	// Ici on récupère la liste de notre menu et on fait une copie dans le noeud de notre menu mobile
	// Puis on ajoute ce menu mobile dans le header menu
	mobileMenuDOM.append(headerMenu.querySelector('ul').cloneNode(true));
	headerMenu.append(mobileMenuDOM);
}

// Si le noeud existe alors rien à faire sinon on doit le créer
// Puis on ajoute la classe open qui permet l'affichage du menu mobile
const openMenu = () => {
	if (mobileMenuDOM) {
		
	} else {
		createMobileMenu();
	}

	mobileMenuDOM.classList.add("open");
}

// Fonction qui va permettre de déclencher l'affichage ou la fermeture du menu
const toggleMobileMenu = () => {
	if (isMenuOpen) {
		closeMenu();
	} else {
		openMenu();
	}

	// En fonction de l'action, on doit modifier l'état du menu
	// Si on ferme, alors on doit remettre à false
	// Si on ouvre alors on doit le mettre à true
	isMenuOpen = !isMenuOpen;
}

// On écoute l'event click sur l'icon, on stoppe la propag de l'event et on déclenche l'action
iconMobile.addEventListener('click', (event) => {
	event.stopPropagation();
	toggleMobileMenu();	
	}
)

// On écoute le click sur la window
// Si le menu est ouvert alors on le ferme
window.addEventListener('click', () => {
	if (isMenuOpen) {
		toggleMobileMenu();
	}
});

// On écoute l'event resize de la window qui permet de fermer le menu si la largeur > 480px
window.addEventListener('resize', (event) =>{
	if (window.innerWidth > 480 && isMenuOpen) {
		toggleMobileMenu();
	}
})