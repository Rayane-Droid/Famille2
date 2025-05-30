

//  <script>
      // ================================== dictionnaire   
   
     // ================================== 
    function selectLanguage() {
      const lang = document.getElementById("language").value;
      if (!lang) return;
      currentLanguage = lang;
      const t = translations[lang];
      // ================================== Met à jour les éléments visibles et textes
      document.getElementById("language-selection").classList.add("hidden");
      document.getElementById("user-form").classList.remove("hidden");
      document.getElementById("welcome-message").innerText = t.welcome;
      document.getElementById("label-username").innerText = t.username;
      document.getElementById("label-phone").innerText = t.phone;
      document.getElementById("btn-continue").innerText = t.continue;
      document.getElementById("btn-back").innerText = t.back;
      document.getElementById("property-title").innerText = t.propertyTitle;
      document.getElementById("btn-save").innerText = t.save;
      // ================================== Met à jour les en-têtes du tableau
      const tableHeaders = document.querySelectorAll("#property-table th");
      t.tableHeaders.forEach((header, index) => {
        tableHeaders[index].innerText = header;
      });
    }
    // ================================== 
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
    // ================================== 
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
    // ================================== 
    function generatePropertyTable() {
      const t = translations[currentLanguage];
      const tbody = document.getElementById("property-body");
      tbody.innerHTML = "";
      properties.forEach((property, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-checked", "false");
        const key = property.keys[currentLanguage] || property.keys.fr;
        const title = property.titles[currentLanguage] || property.titles.fr;
        const description = property.descriptions[currentLanguage] || property.descriptions.fr;
        const area = property.areas[currentLanguage] || property.areas.fr;
        const price = property.prices[currentLanguage] || property.prices.fr;
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${key}</td>
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
        const validateBtn = document.createElement("button");
        validateBtn.innerText = t.validate;
        validateBtn.className = "btn";
        validateBtn.onclick = () => {
          row.querySelector(".validate-cell").innerText = row.cells[5].innerText;
          row.querySelector(".proposal-cell").innerHTML = "";
          row.querySelector(".cancel-cell").innerHTML = "";
          row.setAttribute("data-checked", "true");
        };
        const proposeBtn = document.createElement("button");
        proposeBtn.innerText = t.propose;
        proposeBtn.className = "btn";
        proposeBtn.onclick = () => {
          const input = document.createElement("input");
          input.type = "number";
          input.placeholder = t.propose + " un prix";
          input.style.width = "120px";
          const sendBtn = document.createElement("button");
          sendBtn.innerText = t.continue;
          sendBtn.className = "btn";
          sendBtn.onclick = () => {
            const value = input.value;
            if (!value || isNaN(value)) {
              alert(t.invalidPrice);
              return;
            }
            row.querySelector(".proposal-cell").innerText = value + " DH";
            row.querySelector(".validate-cell").innerHTML = "";
            row.querySelector(".cancel-cell").innerHTML = "";
            row.setAttribute("data-checked", "true");
          };
          const proposalCell = row.querySelector(".proposal-cell");
          proposalCell.innerHTML = "";
          proposalCell.appendChild(input);
          proposalCell.appendChild(sendBtn);
          row.querySelector(".validate-cell").innerHTML = "";
          row.querySelector(".cancel-cell").innerHTML = "";
        };
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = t.cancel;
        cancelBtn.className = "btn";
        cancelBtn.onclick = () => {
          row.querySelector(".cancel-cell").innerText = t.noDesire;
          row.querySelector(".validate-cell").innerHTML = "";
          row.querySelector(".proposal-cell").innerHTML = "";
          row.setAttribute("data-checked", "true");
        };
        row.querySelector(".validate-cell").appendChild(validateBtn);
        row.querySelector(".proposal-cell").appendChild(proposeBtn);
        row.querySelector(".cancel-cell").appendChild(cancelBtn);
        tbody.appendChild(row);
      });
    }
    // ================================== 
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
      // ================================== Vérifiez la longueur des commentaires
      if (commentaires.length > 300) {
        alert("Les commentaires ne doivent pas dépasser 300 caractères...");
        return;
      }
      const {
        jsPDF
      } = window.jspdf;
      const doc = new jsPDF();
      // ================================== Ajoutez votre police arabe
      doc.addFileToVFS("Amiri.ttf", "data:font/ttf;base64,..."); // Remplacez par le contenu base64 de votre police
      doc.addFont("Amiri.ttf", "Amiri", "normal");
      doc.setFont("Amiri"); // Utilisez la police arabe
      // ================================== Date actuelle formatée pour affichage selon langue
      const date = new Date();
      const localeForDate = currentLanguage === "ar" ? "ar-EG" : currentLanguage + '-' + currentLanguage.toUpperCase();
      const dateStr = date.toLocaleDateString(localeForDate, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      // ================================== Date/heure pour nom fichier format YYYYMMDD_HHMMSS
      const pad = (n) => n.toString().padStart(2, "0");
      const filenameDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
      const filename = `Offre_${filenameDate}.pdf`;
      // ================================== Titre
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(t.summaryTitle, 105, 15, null, null, "center");
      // ================================== Infos utilisateur et date
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`${t.dateLabel} ${dateStr}`, 14, 30);
      doc.text(`${t.nameLabel} ${nomUtilisateur}`, 14, 38);
      doc.text(`${t.phoneLabel} ${telephoneUtilisateur}`, 14, 46);
      // ================================== Préparer les données du tableau
      const bodyData = [];
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const bien = cells[1].innerText.trim();
        const titre = cells[2].innerText.trim();
        const description = cells[3].innerText.trim();
        const superficie = cells[4].innerText.trim();
        const prix = cells[5].innerText.trim();
        // ================================== Choix (valider, proposer, annuler)
        let choix = "";
        if (cells[8].innerText.trim()) choix = cells[8].innerText.trim();
        else if (cells[9].innerText.trim()) choix = cells[9].innerText.trim();
        else if (cells[10].innerText.trim()) choix = cells[10].innerText.trim();
        bodyData.push([bien, titre, description, superficie, prix, choix]);
      });
      // ================================== Générer le tableau avec autoTable
      doc.autoTable({
        startY: 55,
        head: [
          [t.tableHeaders[1], t.tableHeaders[2], t.tableHeaders[3], t.tableHeaders[4], t.tableHeaders[5], "Choix"]
        ],
        body: bodyData,
        styles: {
          font: "helvetica",
          fontSize: 10,
          cellPadding: 3
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold"
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        margin: {
          left: 14,
          right: 14
        },
        columnStyles: {
          0: {
            cellWidth: 30
          },
          1: {
            cellWidth: 30
          },
          2: {
            cellWidth: 30
          },
          3: {
            cellWidth: 25
          },
          4: {
            cellWidth: 30
          },
          5: {
            cellWidth: 30
          },
        },
      });
      const lastY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
      // ================================== Ajout des commentaires au PDF
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      // ================================== Titre des commentaires
      const commentsTitleYPosition = lastY - 3; // Position pour le titre
      doc.text("Commentaires:", 14, commentsTitleYPosition);
      // ================================== Position pour les commentaires
      const commentsYPosition = commentsTitleYPosition + 7; // Position pour les commentaires
      const marginRight = 14; // Marge droite
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextDimensions(commentaires).w;
      // ================================== Vérifiez si le texte dépasse la marge droite
      if (textWidth + marginRight > pageWidth) {
        // Si le texte dépasse, utilisez splitTextToSize pour gérer le débordement
        const splitComments = doc.splitTextToSize(commentaires, pageWidth - 39); // 14px de chaque côté pour les marges
        doc.text(splitComments, 14, commentsYPosition);
      } else {
        doc.text(commentaires, 14, commentsYPosition);
      }
      // ================================== Texte procédure d'achat traduit
      const splitText = doc.splitTextToSize(t.purchaseProcedure, 180);
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.text(t.purchaseProcedureTitle, 14, lastY + 65);
      doc.text(splitText, 14, lastY + 72);
      doc.save(filename);
      alert(`${t.pdfSaved} ${filename}`);
      resetApp();
    }
    // ================================== 
    window.addEventListener("load", () => {
      document.getElementById("language-selection").classList.remove("hidden");
    });
 // </script>
