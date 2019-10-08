var lexiqueElt = document.getElementById("lexique");

function displayContent(letter) {
	ajaxGet("https://oc-jswebsrv.herokuapp.com/api/lexique/" + letter, function(response) {
		var dico = JSON.parse(response);
		lexiqueElt.innerHTML = "";
		if (dico.length > 0) {
			dico.forEach(function(def) {
				var termeElt = document.createElement("h2");
				termeElt.textContent = def.term;
				var defElt = document.createElement("p");
				defElt.textContent = def.definition;

				lexiqueElt.appendChild(termeElt);
				lexiqueElt.appendChild(defElt);
			});
		}
		else {
			var msgElt = document.createElement("p");
			msgElt.textContent = "Aucun mot trouvé pour " + letter;
			lexiqueElt.appendChild(msgElt);
		}
	});
}

var lettresElt = document.getElementById("lettres");

var lettres = ["A", "B", "C", "D", "E"];

// Lorsqu'on parcout un tableau ou une liste et qu'on ajoute un évènement sur
// chaque élément, il faut ABSOLUMENT utiliser une FONCTION comme ci-dessous

lettres.forEach(function(lettre) {
	var lettreElt = document.createElement("a");
	lettreElt.textContent = lettre;
	lettreElt.href = "#";
	lettreElt.addEventListener("click", function() {
		displayContent(lettre);
	});

	lettresElt.appendChild(lettreElt);
	lettresElt.appendChild(document.createTextNode(" | "));
});

lettresElt.appendChild(document.createTextNode("..."));