
let currentLanguage = "fr"; // Langue par défaut
const translations = {}; // Remplir avec les traductions appropriées
const properties = []; // Remplir avec les données des biens

function selectLanguage() {
  const lang = document.getElementById("language").value;
  if (!lang) return;
  currentLanguage = lang;
  const t = translations[lang];
  // Met à jour les éléments visibles et textes
  document.getElementById("languageSelection").classList.add("hidden");
  document.getElementById("userForm").classList.remove("hidden");
  document.getElementById("welcome-message").innerText = t.welcome;
  document.getElementById("label-username").innerText = t.username;
  document.getElementById("label-phone").innerText = t.phone;
  document.getElementById("btn-continue").innerText = t.continue;
}

function submitUserInfo() {
  const t = translations[currentLanguage];
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!username || !phone) {
    alert(t.fillAll);
    return;
  }
  const phoneRegex = /^\+?\d{8,15}$/;
  if (!phoneRegex.test(phone)) {
    alert(t.invalidPhone);
    return;
  }
  document.getElementById("userForm").classList.add("hidden");
  document.getElementById("propertyTableSection").classList.remove("hidden");
  generatePropertyTable();
}

function resetApp() {
  currentLanguage = "fr";
  document.getElementById("languageSelection").classList.remove("hidden");
  document.getElementById("userForm").classList.add("hidden");
  document.getElementById("propertyTableSection").classList.add("hidden");
  document.getElementById("language").value = "";
  document.getElementById("username").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("property-body").innerHTML = "";
}

function generatePropertyTable() {
  const t = translations[currentLanguage];
  const tbody = document.getElementById("property-body");
  tbody.innerHTML = "";
  properties.forEach((property, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-checked", "false");
    const title = property.titles[currentLanguage] || property.titles.fr;
    const description = property.descriptions[currentLanguage] || property.descriptions.fr;
    const area = property.areas[currentLanguage] || property.areas.fr;
    const price = property.prices[currentLanguage] || property.prices.fr;
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${title}</td>
      <td>${title}</td>
      <td>${description}</td>
      <td>${area}</td>
      <td>${price}</td>
      <td><a href="${property.photo}" target="_blank" rel="noopener">${t.photoText}</a></td>
      <td><a href="${property.video}" target="_blank" rel="noopener">${t.videoText}</a></td>
      <td class="validate-cell"></td>
      <td class="proposal-cell"></td>
      <td class="cancel-cell"></td>
    `;
    // Ajout des boutons pour valider, proposer et annuler
    // (Ajoutez ici le code pour les boutons comme dans votre code original)
    tbody.appendChild(row);
  });
}

function saveToPDF() {
  // (Ajoutez ici le code pour enregistrer en PDF comme dans votre code original)
}

// Événement de chargement de la page
window.addEventListener("load", () => {
  document.getElementById("languageSelection").classList.remove("hidden");
});
