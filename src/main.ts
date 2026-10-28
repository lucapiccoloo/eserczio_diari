type Giudizio = "Da evitare" | "Discreto" | "Bello" | "Imperdibile";

let sommaStelle = 0;
let numeroLibri = 0;
let stelleMax = 0;
let titoloMax = "";
let autoreMax = "";

function registra(): void {
  // Leggo i valori dal form
  const titolo = (document.getElementById("titolo") as HTMLInputElement).value.trim();
  const autore = (document.getElementById("autore") as HTMLInputElement).value.trim();
  
  // Leggo il genere dai radio button
  const radioGenere = document.querySelector('input[name="genere"]:checked') as HTMLInputElement | null;
  
  const stelle = Number((document.getElementById("stelle") as HTMLInputElement).value);
  const consigliato = (document.getElementById("consigliato") as HTMLInputElement).checked;
  const radioFormato = document.querySelector('input[name="formato"]:checked') as HTMLInputElement | null;

  const messaggio = document.getElementById("messaggio") as HTMLParagraphElement;

  // 1. Controlli
  if (titolo === "" || autore === "") {
    messaggio.textContent = "Inserisci titolo e autore";
    return;
  }
  if (radioGenere === null) {
    messaggio.textContent = "Scegli il genere";
    return;
  }
  if (radioFormato === null) {
    messaggio.textContent = "Scegli il formato";
    return;
  }
  if (!Number.isInteger(stelle) || stelle < 1 || stelle > 5) {
    messaggio.textContent = "Il voto deve essere un numero intero da 1 a 5";
    return;
  }
  messaggio.textContent = "";

  const genere = radioGenere.value;
  const formato = radioFormato.value;

  // 2. Giudizio
  let giudizio: Giudizio;
  if (stelle <= 2) {
    giudizio = "Da evitare";
  } else if (stelle === 3) {
    giudizio = "Discreto";
  } else if (stelle === 4) {
    giudizio = "Bello";
  } else {
    giudizio = "Imperdibile";
  }

  // 3. Immagine
  const immagine = document.getElementById("immagine") as HTMLImageElement;
  switch (genere) {
    case "Avventura":
      immagine.src = "img/avventura.jfif";
      immagine.alt = "Bussola";
      break;
    case "Giallo":
      immagine.src = "img/giallo.jfif";
      immagine.alt = "Lente d'ingrandimento";
      break;
    case "Fantasy":
      immagine.src = "img/fantasy.jfif";
      immagine.alt = "Stella";
      break;
    case "Storico":
      immagine.src = "img/storico.jfif";
      immagine.alt = "Colonna";
      break;
  }

  // Simbolo formato con switch (senza emoji)
  let simbolo = "";
  switch (formato) {
    case "Cartaceo": simbolo = "[Cartaceo]"; break;
    case "Ebook": simbolo = "[Ebook]"; break;
  }

  // 4. Elenco
  const li = document.createElement("li");
  let testo = simbolo + " " + titolo + " – " + autore + " (" + formato + ") – "
            + "★".repeat(stelle) + " " + giudizio;
  if (consigliato) {
    testo += " – Consigliato";
  }
  li.textContent = testo + " ";

  const link = document.createElement("a");
  link.href = "https://www.google.com/search?q=" + encodeURIComponent(titolo + " " + autore);
  link.target = "_blank";
  link.textContent = "Cerca";
  li.appendChild(link);

  (document.getElementById("elenco") as HTMLUListElement).appendChild(li);

  // 5. Conteggio
  const cella = document.getElementById("conta-" + genere.toLowerCase()) as HTMLTableCellElement;
  cella.textContent = String(Number(cella.textContent) + 1);

  // Media stelle
  sommaStelle += stelle;
  numeroLibri++;
  const media = sommaStelle / numeroLibri;
  const pMedia = document.getElementById("media") as HTMLParagraphElement;
  if (media >= 4) {
    pMedia.textContent = "Media stelle: " + media.toFixed(2) + " – Classe di lettori appassionati";
  } else {
    pMedia.textContent = "Media stelle: " + media.toFixed(2) + " – Si può leggere di più";
  }

  // Libro preferito
  if (stelle > stelleMax) {
    stelleMax = stelle;
    titoloMax = titolo;
    autoreMax = autore;
  }
  const pPreferito = document.getElementById("preferito") as HTMLParagraphElement;
  pPreferito.textContent = "Libro preferito della classe: " + titoloMax + " – " + autoreMax + " ";
  const linkPreferito = document.createElement("a");
  linkPreferito.href = "https://www.google.com/search?q=" + encodeURIComponent(titoloMax + " " + autoreMax);
  linkPreferito.target = "_blank";
  linkPreferito.textContent = "Cerca";
  pPreferito.appendChild(linkPreferito);

  // 6. Pulizia (svuoto solo titolo e autore, i radio restano selezionati)
  (document.getElementById("titolo") as HTMLInputElement).value = "";
  (document.getElementById("autore") as HTMLInputElement).value = "";
}