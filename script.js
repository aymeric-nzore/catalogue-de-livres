// Sélection des éléments HTML
const searchInput = document.getElementById("search");
const catalogue = document.getElementById("catalogue");

// Charger le fichier XML
const xhr = new XMLHttpRequest();
xhr.open("GET", "livres.xml", true);
xhr.onload = function () {
  if (xhr.status === 200) {
    const xml = xhr.responseXML;
    const livres = xml.getElementsByTagName("livre");

    // Boucle sur chaque livre
    for (let i = 0; i < livres.length; i++) {
      const livre = livres[i];
      const titre = livre.getElementsByTagName("titre")[0].textContent;
      const auteur = livre.getElementsByTagName("auteur")[0].textContent;
      const annee = livre.getElementsByTagName("annee")[0].textContent;
      const genre = livre.getElementsByTagName("genre")[0].textContent;

      // Création du bloc HTML
      const div = document.createElement("div");
      div.className = "livre";
      div.innerHTML = `
        <h3>${titre}</h3>
        <p><strong>Auteur :</strong> ${auteur}</p>
        <p><strong>Année :</strong> ${annee}</p>
        <p><strong>Genre :</strong> ${genre}</p>
      `;
      catalogue.appendChild(div);
    }
  }
};
xhr.send();

// Recherche dynamique
searchInput.addEventListener("input", () => {
  const filtre = searchInput.value.toLowerCase();
  const livres = document.querySelectorAll(".livre");

  livres.forEach(livre => {
    const texte = livre.textContent.toLowerCase();
    livre.style.display = texte.includes(filtre) ? "block" : "none";
  });
});
