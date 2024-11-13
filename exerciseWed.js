// Övningar för JSON.parse() och JSON.stringify()

// Medel Svårighetsgrad

// Övning 1: Använda Replacer-funktionen i JSON.stringify()

// Du har följande objekt:

// const user = {
//   id: 1,
//   name: "Alice",
//   password: "secret123",
//   email: "alice@example.com"
// };

// Uppgift:
// Använd JSON.stringify() med en replacer-funktion för att exkludera password-fältet när du serialiserar objektet till en JSON-sträng.

// ------------------------------------------------------
// Övning 2: Använda Reviver-funktionen i JSON.parse()

// Du har följande JSON-sträng:
// const jsonString = '{"name":"Bob","birthdate":"1990-05-15T00:00:00.000Z"}';
// Uppgift:

// Använd JSON.parse() med en reviver-funktion för att konvertera birthdate-fältet till ett JavaScript Date-objekt.

// Tips: Använd new Date() funktionen och eventeuellt denna: instanceof Date

// ------------------------------------------------------
// Övning 3: Hantera Cirkelreferenser - Denna är okej att "hoppa över" jag tycker den är svår att förstå...

// Du har följande objekt med en cirkelreferens:
// const obj = {};
// obj.self = obj;
// Uppgift:

// Försök att serialisera objektet med JSON.stringify() och observera vad som händer.
// Modifiera objektet eller använd en teknik för att undvika felet och serialisera objektet korrekt.

// Första försöket:
// const jsonString = JSON.stringify(obj);
// Detta kommer att kasta ett TypeError: "Converting circular structure to JSON"

// ------------------------------------------------------
// Övning 4: Djupkopiering med JSON

// Du har följande objekt:
// const original = {
//   name: "Carol",
//   hobbies: ["reading", "gaming"],
//   address: {
//     city: "Stockholm",
//     country: "Sweden"
//   }
// };

// Uppgift:

// Skapa en djup kopia av objektet med JSON.parse() och JSON.stringify().
// Förklara eventuella begränsningar med denna metod.

// ------------------------------------------------------
// Övning 5: Hantera Specialvärden

// Du har följande objekt:
// const data = {
//   value1: NaN,
//   value2: Infinity,
//   value3: -Infinity,
//   value4: null
// };

// Uppgift:

// Serialisera objektet till en JSON-sträng och observera resultatet.
// Hur kan du bevara dessa specialvärden vid serialisering och deserialisering?

// Standard serialisering:
// const jsonString = JSON.stringify(data);
// console.log(jsonString);
// Output: {"value1":null,"value2":null,"value3":null,"value4":null}

// ------------------------------------------------------
// Svår Svårighetsgrad

// Övning 6: Serialisera och Deserialisera Karta (Map) och Mängd (Set)

// Du har följande objekt:
// const obj = {
//   myMap: new Map([["key1", "value1"], ["key2", "value2"]]),
//   mySet: new Set([1, 2, 3])
// };

// Uppgift:

// Skriv en funktion för att serialisera objektet till en JSON-sträng, där Map och Set konverteras till arrayrepresentationer.
// Skriv en funktion för att deserialisera JSON-strängen tillbaka till ett objekt med Map och Set återställda.

// ------------------------------------------------------
// Övning 7: Hantera Cirkelreferenser vid Serialisering

// Du ska skriva en funktion som serialiserar objekt med potentiella cirkelreferenser, där cirkelreferenser ersätts med en särskild sträng.

// Uppgift:

// Implementera en custom JSON.stringify() replacer-funktion som ersätter cirkelreferenser med "[Circular]".
// Testa funktionen med ett objekt som innehåller en cirkelreferens.

// ------------------------------------------------------
// Övning 8: Anpassad Klass Serialisering Även denna är okej att hoppa över, då vi inte pratat om classer tidigare

// Du har en anpassad klass:
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const person = new Person("Frank", 28);

// Uppgift:

// Serialisera person-objektet till en JSON-sträng, inklusive klassnamnet.
// Deserialisera JSON-strängen tillbaka till en instans av Person, så att instanceof Person är true.

// ------------------------------------------------------
// Övning 9: Serialisera Datum som Tidsstämpel

// Standardbeteendet för JSON.stringify() är att konvertera Date-objekt till ISO-strängar.

// Uppgift:

// Modifiera serialiseringsprocessen så att Date-objekt serialiseras som tidsstämpel (millisekunder sedan epoken).
// Använd en replacer-funktion för att uppnå detta.

// ------------------------------------------------------
// Övning 10: Bevara Prototyper vid Deserialisering

// Du har ett objekt som är en instans av en specifik klass.

// Uppgift:

// Visa hur du kan serialisera ett objekt och vid deserialisering bevara dess prototyp så att metoderna fungerar som förväntat.
// Använd Object.setPrototypeOf() eller Object.create() vid deserialisering.

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

// Localstorage övningar:

// ------------------------------------------------------
// Lätt Svårighetsgrad

// Övning 1: Spara och Hämta Enkla Värden

// Uppgift:

// Spara strängen "Välkommen till webbplatsen!" i localStorage under nyckeln "welcomeMessage".
// Hämta värdet och visa det i konsolen.

// ------------------------------------------------------
// Övning 2: Ta Bort Ett Objekt från LocalStorage

// Uppgift:

// Ta bort objektet med nyckeln "welcomeMessage" från localStorage.

// ------------------------------------------------------
// Övning 3: Rensa Hela LocalStorage

// Uppgift:

// Rensa all data från localStorage.

// ------------------------------------------------------
// Medel Svårighetsgrad

// Övning 4: Spara och Hämta Objekt

// Du har följande JavaScript-objekt:
// const settings = {
//   volume: 70,
//   brightness: 80,
//   theme: "dark"
// };

// Uppgift:

// Spara settings i localStorage under nyckeln "userSettings".
// Hämta och pars värdet från localStorage.
// Visa värdet av theme i konsolen.

// ------------------------------------------------------
// Övning 5: Implementera TTL för LocalStorage

// Eftersom localStorage inte har en inbyggd funktion för utgångstid, ska du implementera egna funktioner för detta.

// Uppgift:

// Skriv en funktion setItemWithExpiry(key, value, ttl) som sparar ett värde med en tidsbegränsning.
// Skriv en funktion getItemWithExpiry(key) som hämtar värdet och kontrollerar om det har gått ut.
// Testa genom att spara ett värde med en TTL på 5 sekunder och hämta det efter att tiden har gått ut.

// ------------------------------------------------------
// Övning 6: Lyssna på Storage-händelser

// Uppgift:

// Skriv kod som lyssnar på storage-händelsen.
// När något ändras i localStorage, ska ett meddelande loggas i konsolen.
// Öppna samma sida i två flikar och testa genom att ändra localStorage i en flik.

// ------------------------------------------------------
// Svår Svårighetsgrad

// Övning 7: Namnrymd för LocalStorage

// Du vill undvika nyckelkonflikter i localStorage genom att använda en namnrymd.

// Uppgift:

// Implementera en StorageWrapper-klass som lägger till en prefix till alla nycklar.
// Klassen ska ha metoderna setItem(key, value), getItem(key), removeItem(key), och clear().
// Demonstrera genom att spara och hämta värden med namnrymden "App_".

// ------------------------------------------------------
// Övning 8: Hantera LocalStorage Begränsningar

// Uppgift:

// Skriv kod som försöker lagra stora mängder data i localStorage tills kvoten överskrids.
// Hantera QuotaExceededError och logga ett lämpligt meddelande.

// ------------------------------------------------------
// Övning 9: Synkronisera Data Mellan Flikar

// Uppgift:

// Implementera en mekanism som synkroniserar data mellan flera flikar med hjälp av localStorage.
// När en användare uppdaterar ett värde i en flik, ska värdet automatiskt uppdateras i alla andra öppna flikar.
