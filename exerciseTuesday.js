// Mängdträning: JSON

// -------------------------------------------------------------

// Övning 1 - Grundläggande JSON-struktur. Svårighetsgrad: Lätt

// Uppgift: Skapa JSON som representerar en bok med fälten titel, författare och antal sidor.

// -------------------------------------------------------------

// Övning 2 - Arrayer i JSON. Svårighetsgrad: Lätt

// Uppgift: Skapa en JSON-struktur som innehåller en lista över tre favoritfilmer.

// -------------------------------------------------------------

// Övning 3 - Nästlade objekt. Svårighetsgrad: Medel

// Uppgift: Skapa en JSON som representerar en student med namn, ålder och en adress som är ett objekt med gatuadress och stad.

// -------------------------------------------------------------

// Övning 4 - Parse JSON-sträng. Svårighetsgrad: Medel

// Uppgift: Givet en JSON-sträng: const jsonString = '{"namn": "Erik", "ålder": 25}';
// parse den och extrahera värdet av ett specifikt fält.

// -------------------------------------------------------------

// Övning 5 - Validera JSON. Svårighetsgrad: Medel

// Uppgift: Identifiera och rätta fel i en felaktig JSON-struktur.

// Felaktig JSON:
// {
//     namn: "Lisa",
//     "ålder": 30,
//     "stad": "Malmö",
//   }

// Rättad JSON:

// -------------------------------------------------------------

// Övning 6 - Konvertera JavaScript-objekt till JSON. Svårighetsgrad: Medel

// Uppgift: Konvertera ett givet JavaScript-objekt till en JSON-sträng med JSON.stringify().

// JavaScript-objekt:
// const person = {
//     name: "Oskar",
//     age: 28,
//     hobbies: ["musik", "sport"]
//   };

// Konvertering till JSON-sträng:

// -------------------------------------------------------------

// Övning 7 - Hantera JSON med arrayer och objekt. Svårighetsgrad: Medel

// Uppgift: Skapa en JSON-struktur för en musikspellista med flera låtar, där varje låt är ett objekt med titel och artist.

// -------------------------------------------------------------

// Övning 8 - Filtera data från JSON. Svårighetsgrad: Svår

// Uppgift: Givet en JSON-array av produkter, filtrera ut alla produkter som kostar över ett visst belopp.

// Exempeldata:
// const products = [
//     { "name": "Product A", "price": 100 },
//     { "name": "Product B", "price": 250 },
//     { "name": "Product C", "price": 150 },
//     { "name": "Product D", "price": 300 }
//   ];

//   const priceLimit = 200;

// Filtrering:

// -------------------------------------------------------------

// Övning 9 - Uppdatera JSON-data. Svårighetsgrad: Svår

// Uppgift: Uppdatera värdet på ett fält i en JSON-struktur och konvertera det tillbaka till en sträng.

// Given JSON-sträng:
// let jsonString = '{"namn": "Karin", "ålder": 30}';

// Uppdatering och konvertering:
// Parse JSON-strängen till ett objekt:

// Uppdatera fältet "ålder"

// Konvertera tillbaka till JSON-sträng

// console.log(jsonString);

// Output:
// '{"namn":"Karin","ålder":31}'
// -------------------------------------------------------------

// Övning 10 - Säker hantering av JSON-data. Svårighetsgrad: Avancerad

// Uppgift: Skriv en funktion som säkert parsar en JSON-sträng och hanterar fel vid ogiltig JSON.

// START: Skapa din funktion: safeParseJSON här:

// /SLUT på functionen safeParseJSON.

// Exempelanvändning:

// const korrektJSON = '{"namn": "Per", "ålder": 40}';
// const ogiltigJSON = '{namn: "Per", ålder: 40}';

// Parsar korrekt JSON:
// const data1 = safeParseJSON(korrektJSON);
// console.log(data1); // Output: { namn: 'Per', ålder: 40 }

// Försök att parsa ogiltig JSON:
// const data2 = safeParseJSON(ogiltigJSON);
// Output: Ogiltig JSON: Unexpected token n in JSON at position 1
// console.log(data2); // Output: null

// Tips: try/catch
