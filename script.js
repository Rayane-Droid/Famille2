let currentLanguage = "fr"; // Langue par défaut

const properties = [
  {
    key: "villa",
    photo: "https://exemple.com/villa-photo.jpg",
    video: "https://exemple.com/villa-video.mp4",
    titles: {
      fr: "Belle Villa moderne",
      en: "Beautiful Modern Villa",
      ar: "فيلا جميلة وحديثة",
      es: "Hermosa villa moderna",
      de: "Schöne moderne Villa",
      it: "Bella villa moderna"
    },
    descriptions: {
      fr: "Grande villa avec piscine et jardin.",
      en: "Large villa with pool and garden.",
      ar: "فيلا كبيرة مع مسبح وحديقة.",
      es: "Amplia villa con piscina y jardín.",
      de: "Große Villa mit Pool und Garten.",
      it: "Grande villa con piscina e giardino."
    },
    areas: {
      fr: "350 m²",
      en: "350 sqm",
      ar: "350 متر مربع",
      es: "350 m²",
      de: "350 m²",
      it: "350 m²"
    },
    prices: {
      fr: "3 000 000 DH",
      en: "3,000,000 DH",
      ar: "3,000,000 درهم",
      es: "3.000.000 DH",
      de: "3.000.000 DH",
      it: "3.000.000 DH"
    }
  },
  {
    key: "garage",
    photo: "https://exemple.com/garage-photo.jpg",
    video: "https://exemple.com/garage-video.mp4",
    titles: {
      fr: "Garage sécurisé",
      en: "Secure Garage",
      ar: "كراج آمن",
      es: "Garaje seguro",
      de: "Sichere Garage",
      it: "Garage sicuro"
    },
    descriptions: {
      fr: "Garage spacieux avec système de sécurité.",
      en: "Spacious garage with security system.",
      ar: "كراج واسع مع نظام أمني.",
      es: "Garaje espacioso con sistema de seguridad.",
      de: "Geräumige Garage mit Sicherheitssystem.",
      it: "Garage spazioso con sistema di sicurezza."
    },
    areas: {
      fr: "50 m²",
      en: "50 sqm",
      ar: "50 متر مربع",
      es: "50 m²",
      de: "50 m²",
      it: "50 m²"
    },
    prices: {
      fr: "500 000 DH",
      en: "500,000 DH",
      ar: "500,000 درهم",
      es: "500.000 DH",
      de: "500.000 DH",
      it: "500.000 DH"
    }
  },
  // Ajoutez d'autres propriétés ici
];

const translations = {
  fr: {
    welcome: "Bienvenue !",
    username: "Nom d'utilisateur :",
    phone: "Numéro de téléphone :",
    continue: "Continuer",
    back: "Retour au menu des langues",
    propertyTitle: "Nos biens disponibles :",
    save: "Enregistrer en PDF",
    fillAll: "Veuillez remplir tous les champs.",
    invalidPhone: "Numéro de téléphone invalide.",
    tableHeaders: [
      "N°",
      "Bien",
      "Titre",
      "Description",
      "Superficie",
      "Prix",
      "Photo",
      "Vidéo",
      "Valider",
      "Proposition",
      "Annuler"
    ],
    validate: "Valider",
    propose: "Proposer",
    cancel: "Annuler",
    noDesire: "Bien non désiré",
    actionRequired: "Veuillez sélectionner une action pour chaque bien.",
    pdfSaved: "PDF enregistré sous le nom :",
    purchaseProcedureTitle: "Procédure d'achat :",
    purchaseProcedure:
      "1. Vérifiez les biens et les choix dans le tableau.\n" +
      "2. Contactez notre service commercial au numéro indiqué.\n" +
      "3. Un conseiller vous accompagnera pour finaliser la transaction.\n" +
      "4. Vous recevrez une confirmation par email avec les détails.\n" +
      "Merci de votre confiance.",
    summaryTitle: "Résumé des choix",
    nameLabel: "Nom :",
    phoneLabel: "Téléphone :",
    dateLabel: "Date de saisie :",
    photoText: "Photo",
    videoText: "Vidéo"
  },
  // Ajoutez d'autres traductions pour les autres langues ici
};

function selectLanguage() {
  const lang = document.getElementById("language").value;
  if (!lang) return;
  currentLanguage = lang;
  const t = translations[lang];

  // Met à jour les éléments visibles et textes
  document.getElementById("language-selection").classList.add("hidden");
  document.getElementById("user-form").classList.remove("hidden");
  document.getElementById("welcome-message").innerText = t.welcome;
  document.getElementById("label-username").innerText = t.username;
  document.getElementById("label-phone").innerText = t.phone;
  document.getElementById("btn-continue").innerText = t.continue;
  document.getElementById("btn-back").innerText = t.back;
  document.getElementById("property-title").innerText = t.propertyTitle;
  document.getElementById("btn-save").innerText = t.save;

  // Met à jour les en-têtes du tableau
  const tableHeaders = document.querySelectorAll("#property-table th");
  t.tableHeaders.forEach((header, index) => {
    tableHeaders[index].innerText = header;
  });
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
  document.getElementById("user-form").classList.add("hidden");
  document.getElementById("content").classList.remove("hidden");
  generatePropertyTable();
}

function resetApp() {
  currentLanguage = "fr";
  document.getElementById("language-selection").classList.remove("hidden");
  document.getElementById("user-form").classList.add("hidden");
  document.getElementById("content").classList.add("hidden");
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
    tbody.appendChild(row);
  });
}

function saveToPDF() {
  const t = translations[currentLanguage];
  const rows = document.querySelectorAll("#property-body tr");
  for (let row of rows) {
    if (row.getAttribute("data-checked") !== "true") {
      alert(t.actionRequired);
      return;
    }
  }
  const nomUtilisateur = document.getElementById("username").value || t.nameLabel + " " + "Non renseigné";
  const telephoneUtilisateur = document.getElementById("phone").value || t.phoneLabel + " " + "Non renseigné";
  const commentaires = document.getElementById("comments").value || "Aucun commentaire";

  if (commentaires.length > 300) {
    alert("Les commentaires ne doivent pas dépasser 300 caractères...");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date = new Date();
  const localeForDate = currentLanguage === "ar" ? "ar-EG" : currentLanguage + '-' + currentLanguage.toUpperCase();
  const dateStr = date.toLocaleDateString(localeForDate, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const pad = (n) => n.toString().padStart(2, "0");
  const filenameDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  const filename = `Offre_${filenameDate}.pdf`;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(t.summaryTitle, 105, 15, null, null, "center");

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`${t.dateLabel} ${dateStr}`, 14, 30);
  doc.text(`${t.nameLabel} ${nomUtilisateur}`, 14, 38);
  doc.text(`${t.phoneLabel} ${telephoneUtilisateur}`, 14, 46);

  const bodyData = [];
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const bien = cells[1].innerText.trim();
    const titre = cells[2].innerText.trim();
    const description = cells[3].innerText.trim();
    const superficie = cells[4].innerText.trim();
    const prix = cells[5].innerText.trim();
    let choix = "";
    if (cells[8].innerText.trim()) choix = cells[8].innerText.trim();
    else if (cells[9].innerText.trim()) choix = cells[9].innerText.trim();
    else if (cells[10].innerText.trim()) choix = cells[10].innerText.trim();
    bodyData.push([bien, titre, description, superficie, prix, choix]);
  });

  doc.autoTable({
    startY: 55,
    head: [[t.tableHeaders[1], t.tableHeaders[2], t.tableHeaders[3], t.tableHeaders[4], t.tableHeaders[5], "Choix"]],
    body: bodyData,
    styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    },
  });

  const lastY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const commentsTitleYPosition = lastY - 3;
  doc.text("Commentaires:", 14, commentsTitleYPosition);
  const commentsYPosition = commentsTitleYPosition + 7;
  const marginRight = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextDimensions(commentaires).w;

  if (textWidth + marginRight > pageWidth) {
    const splitComments = doc.splitTextToSize(commentaires, pageWidth - 39);
    doc.text(splitComments, 14, commentsYPosition);
  } else {
    doc.text(commentaires, 14, commentsYPosition);
  }

  const splitText = doc.splitTextToSize(t.purchaseProcedure, 180);
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text(t.purchaseProcedureTitle, 14, lastY + 65);
  doc.text(splitText, 14, lastY + 72);
  doc.save(filename);
  alert(`${t.pdfSaved} ${filename}`);
  resetApp();
}

window.addEventListener("load", () => {
  document.getElementById("languageSelection").classList.remove("hidden");
});
