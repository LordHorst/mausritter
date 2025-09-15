// --- Die "Tant"-Auswahl ---
const tantList = [
    // Gruppe für W6-Ergebnis 2
    [
        "Trockene Kräuter in wasserdichtem Beutel",
        "Eine kleine Holzkiste, die seltsame Geräusche macht",
        "Ein starker Käfer mit einem Rucksack",
        "Ein verrostetes Schwert",
        "Ein verschlossenes Holzschloss",
        "Eine Flasche mit glühendem, grünem Schleim",
        "Ein Paar zerzauste Flügel",
        "Ein altes verkrustetes Ei"
    ],
    // Gruppe für W6-Ergebnis 3
    [
        "Eine Karte, die einen verborgenen Schatz in einer Siedlung zeigt",
        "Ein alter Hut, der zu klein ist",
        "Ein leeres Glas",
        "Ein leeres Lagerfeuer",
        "Eine kleine Holzkiste",
        "Eine leere Spule Garn",
        "Eine Pfeife",
        "Eine leere Karte"
    ],
    // Gruppe für W6-Ergebnis 4
    [
        "Eine Handvoll Pilze",
        "Ein alter Ring mit einem fehlenden Stein",
        "Eine Flasche Wein",
        "Ein altes, vergilbtes Dokument",
        "Eine Karte mit einer mysteriösen Markierung",
        "Eine Schachtel mit zerbrochenem Glas",
        "Eine alte Münze",
        "Ein kleines Stück Käse"
    ],
    // Gruppe für W6-Ergebnis 5
    [
        "Ein kleiner, glänzender Stein",
        "Eine leere Flasche",
        "Ein alter Schuh",
        "Eine kleine Pfeife",
        "Ein leerer Beutel",
        "Ein seltsamer Schlüssel",
        "Eine kleine Rolle Seil",
        "Ein alter Holzstock"
    ],
    // Gruppe für W6-Ergebnis 6
    [
        "Ein kaputter Kompass",
        "Eine alte, leere Laterne",
        "Ein kleines Holzschiff",
        "Eine leere Schachtel mit einem geheimnisvollen Geruch",
        "Eine alte, rostige Axt",
        "Ein Beutel mit glitzernden Steinen",
        "Ein kleines, kaputtes Teleskop",
        "Eine alte, lederne Trinkflasche"
    ]
];

// Hintergrund-Daten aus der CSV-Datei als String.
const backgroundCSV = `HP;Kerne;Beruf/Hintergrund;Gegenstand A;Gegenstand B
1;1;Versuchstier;Zauber: Magisches Geschoss;Bleimantel (Schwere Rüstung)
1;2;Küchenwühler;Schild & Wams (Leichte Rüstung);Kochgeschirr
1;3;Käfigbewohner;Zauber: Sei verstanden;Flasche Milch
1;4;Heckenhexe;Zauber: Heilung;Räucherstäbchen
1;5;Lederarbeiter;Schild & Wams (Leichte Rüstung);Schere
1;6;Straßenkämpfer;Dolch (Leicht, 1W6);Flasche Kaffee
2;1;Wanderpriester;Zauber: Beruhigen;Heiliges Symbol
2;2;Käferhüter;Gefährte: Treuer Käfer;"Stange, 6 Zoll"
2;3;Bierbrauer;Gefährte: Betrunkener Fackelträger;Kleines Fass Bier
2;4;Fischmaus;Netz;"Nadel (Leicht, 1W6)"
2;5;Schmied;Hammer (Mittel, 1W6/1W8);Metallfeile
2;6;Drahtarbeiter;Draht, Spule;Elektrische Laterne
3;1;Holzfäller;Axt (Mittel, 1W6/1W8);Schnur, Rolle
3;2;Fledermauskultist;Zauber: Dunkelheit;Beutel mit Fledermauszähnen
3;3;Zinnbergbauer;Spitzhacke (Mittel, 1W6/1W8);Laterne
3;4;Müllsammler;Müllhaken (Schwer, 1W10);Spiegel
3;5;Mauerläufer;Angelhaken;Faden, Spule
3;6;Händler;Gefährte: Packratte;Schuldschein über 20 Kerne von einem Edelnager
4;1;Floßcrew;Hammer (Mittel, 1W6/1W8);Holzspieße
4;2;Wurmfänger;Stange, 6 Zoll;Seife
4;3;Spatzenreiter;Angelhaken;Schutzbrille
4;4;Kanalführer;Metallfeile;Faden, Spule
4;5;Gefängniswärter;Kette, 6 Zoll;Speer (Schwer, 1W10)
4;6;Pilzfarmer;Getrockneter Pilz (als Rationen);Sporenmaske
5;1;Dammbauer;Schaufel;Holzspieße
5;2;Kartograf;Feder & Tinte;Kompass
5;3;Fallendieb;Stück Käse;Kleber
5;4;Vagabund;Zelt;"Schatzkarte, zweifelhaft"
5;5;Getreidebauer;Speer (Schwer, 1W10);Pfeife
5;6;Nachrichtenläufer;Schlafsack;Dokumente, versiegelt
6;1;Spielmann;Musikinstrument;Verkleidungsset
6;2;Spieler;Satz gezinkte Würfel;Spiegel
6;3;Saftzapfer;Eimer;Holzspieße
6;4;Imker;Honigglas;Netz
6;5;Bibliothekar;Buchfetzen;Feder & Tinte
6;6;Verarmter Edelnager;Filzhut;Parfüm`

const birthsigns = {
    1: "Stern (Tapfer / Tollkühn)",
    2: "Rad (Fleißig / Fantasielos)",
    3: "Eichel (Neugierig / Dickköpfig)",
    4: "Sturm (Großzügig / Zornig)",
    5: "Mond (Weise / Geheimnisvoll)",
    6: "Mutter (Fürsorglich / Besorgt)"
};

const coatColors = {
    1: "Schokolade",
    2: "Schwarz",
    3: "Weiß",
    4: "Beige",
    5: "Grau",
    6: "Blau"
};

const coatPatterns = {
    1: "Einfarbig",
    2: "Gestreift",
    3: "Fleckig",
    4: "Geringelt",
    5: "Marmoriert",
    6: "Gesprenkelt"
};

const physicalDetails = {
    11: "Vernarbter Körper",
    12: "Beleibter Körper",
    13: "Skelettartiger Körper",
    14: "Ranker Körper",
    15: "Winziger Körper",
    16: "Massiver Körper",
    21: "Kriegsbemalung",
    22: "Fremdländische Kleidung",
    23: "Elegante Kleidung",
    24: "Geflickte Kleidung",
    25: "Modische Kleidung",
    26: "Ungewaschene Kleidung",
    31: "Fehlendes Ohr",
    32: "Klumpiges Gesicht",
    33: "Schönes Gesicht",
    34: "Rundes Gesicht",
    35: "Zartes Gesicht",
    36: "Längliches Gesicht",
    41: "Gepflegtes Fell",
    42: "Dreadlocks",
    43: "Gefärbtes Fell",
    44: "Rasiertes Fell",
    45: "Krauses Fell",
    46: "Seidiges Fell",
    51: "Nachtschwarze Augen",
    52: "Augenklappe",
    53: "Blutrote Augen",
    54: "Weise Augen",
    55: "Scharfe Augen",
    56: "Leuchtende Augen",
    61: "Gekürzter Schwanz",
    62: "Peitschenartiger Schwanz",
    63: "Haarbüschel-Schwanz",
    64: "Stummelschwanz",
    65: "Greifschwanz",
    66: "Gekräuselter Schwanz"
};

/*Würfel*/
function rollXSidedDie(x){
    if(Number.isInteger(x)){
        return Math.floor(Math.random() * x) + 1;
    }
    return 0;
}
/*Würfel Ende*/

function generateTant() {
    const d6 = rollXSidedDie(6);
    const d8 = rollXSidedDie(8);

    if (d6 === 1) {
        // Fall 1: W6 = 1 -> Extra Pips
        const currentPips = parseInt(document.getElementById("pip-value").innerHTML) || 0;
        const newPips = currentPips + d8;
        document.getElementById("pip-value").innerHTML = newPips;
        document.getElementById("description-value").innerHTML = `+${d8} Kerne (gewürfelt mit W6=1, W8=${d8})`;
    } else {
        // Fall 2: W6 > 1 -> Beschreibung
        const groupIndex = d6 - 2;
        const itemIndex = d8 - 1;
        
        if (tantList[groupIndex] && tantList[groupIndex][itemIndex]) {
            const description = tantList[groupIndex][itemIndex];
            document.getElementById("description-value").innerHTML = description;
        } else {
            document.getElementById("description-value").innerHTML = "Fehler bei der Generierung.";
        }
    }
}

// Funktion zum Parsen des CSV-Strings in ein Array von Objekten
function parseCSV(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(';').map(h => h.trim());
  
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let line = lines[i];
    let inQuotes = false;
    let currentField = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        inQuotes = false;
      } else if (char === ';' && !inQuotes) {
        values.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    values.push(currentField.trim());
    
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index];
    });
    result.push(entry);
  }
  return result;
}

const backgrounds = parseCSV(backgroundCSV);

function generateAttribute() {
    const roll1 = rollXSidedDie(6);
    const roll2 = rollXSidedDie(6);
    const roll3 = rollXSidedDie(6);
    
    const rolls = [roll1, roll2, roll3].sort((a, b) => b - a);
    
    const attributeValue = rolls[0] + rolls[1];
    const rollString = `(${roll1}, ${roll2}, ${roll3})`;
    
    return {
        value: attributeValue,
        rolls: rollString
    };
}

function generateName() {
    const names = [
        "Ada", "Achat", "Agnes", "Aloe", "April", "Azalee", "Bucht", "Tollkirsche", "Blüte", "Brie",
        "Brynn", "Kirsche", "Claire", "Krokus", "Dahlie", "Gänseblümchen", "Else", "Smaragd", "Erin",
        "Grace", "Gwendoline", "Haselnuss", "Heide", "Hette", "Stechpalme", "Hyazinthe", "Iris",
        "Wacholder", "Lavendel", "Lilie", "Magnolie", "Ringelblume", "Majoran", "Myrte", "Odette",
        "Olive", "Opal", "Perle", "Pfeffer", "Mohn", "Rosmarin", "Raute", "Safran", "Sandi",
        "Sassafras", "Schiefer", "Susan", "Distel", "Veilchen", "Weide", "Erle", "Ambrosius",
        "Anis", "Annotto", "August", "Avens", "Basilikum", "Beryll", "Birke", "Boldo", "Bill",
        "Klette", "Butter", "Cassia", "Wegwarte", "Clive", "Colby", "Dill", "Ampfer", "Dock",
        "Eared", "Edmund", "Elmer", "Ernest", "Fenchel", "Festus", "Franz", "Gil", "Weißdorn",
        "Heide", "Horatio", "Jack", "Jaspis", "Konrad", "Rittersporn", "Lorbeer", "Lorenz", "Muskat",
        "Oliver", "Orin", "Reepicheep", "Eberesche", "Simon", "Sauerampfer", "Stilton", "Estragon",
        "Warren", "Wattle", "Whitacre", "Wermuth", "Schafgarbe"
    ];
    
    return names[Math.floor(Math.random() * names.length)];
}

function generateBirthsign() {
    const roll = rollXSidedDie(6);
    const sign = birthsigns[roll];
    document.getElementById("birth-sign-value").innerHTML = sign;
}

function generateCoat() {
    const colorRoll = rollXSidedDie(6);
    const patternRoll = rollXSidedDie(6);
    const color = coatColors[colorRoll];
    const pattern = coatPatterns[patternRoll];
    document.getElementById("fur-value").innerHTML = `${color}, ${pattern}`;
}

function generatePhysicalTrait() {
    const roll1 = rollXSidedDie(6);
    const roll2 = rollXSidedDie(6);
    const d66 = parseInt(`${roll1}${roll2}`);
    const trait = physicalDetails[d66] || "Unbekanntes Merkmal";
    document.getElementById("physical-trait-value").innerHTML = trait;
}

function generateNewCharacter() {
    const strength = generateAttribute();
    const dexterity = generateAttribute();
    const willpower = generateAttribute();
    const hitPoints = rollXSidedDie(6);
    const pips = rollXSidedDie(6);
    const name = generateName();

    const background = backgrounds.find(bg => bg.HP == hitPoints && bg.Kerne == pips);
    const backgroundText = background ? background["Beruf/Hintergrund"] : "Unbekannt";
    const itemA = background ? background["Gegenstand A"] : "Nichts";
    const itemB = background ? background["Gegenstand B"] : "Nichts";

    document.getElementById("name-input").value = name;
    document.getElementById("str-value").innerHTML = strength.value;
    document.getElementById("str-rolls").innerHTML = "Würfe: " + strength.rolls;
    document.getElementById("dex-value").innerHTML = dexterity.value;
    document.getElementById("dex-rolls").innerHTML = "Würfe: " + dexterity.rolls;
    document.getElementById("wil-value").innerHTML = willpower.value;
    document.getElementById("wil-rolls").innerHTML = "Würfe: " + willpower.rolls;
    document.getElementById("hp-value").innerHTML = hitPoints;
    document.getElementById("pip-value").innerHTML = pips;
    document.getElementById("background-name").innerHTML = backgroundText;

    document.getElementById("item-1").innerHTML = itemA;
    document.getElementById("item-2").innerHTML = itemB;
    
    for (let i = 3; i <= 10; i++) {
        document.getElementById(`item-${i}`).innerHTML = "";
    }

    // Jetzt noch den Tant und andere Attribute generieren
    generateTant();
    generateBirthsign();
    generateCoat();
    generatePhysicalTrait();    

    const buttons = document.querySelectorAll('.swap-buttons button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function getSavedCharacters() {
    const characters = localStorage.getItem('mausritter_chars');
    return characters ? JSON.parse(characters) : [];
}

function renderSavedCharacters() {
    const container = document.getElementById('character-cards-container');
    const characters = getSavedCharacters();
    container.innerHTML = '';

    if (characters.length > 0) {
        characters.forEach((char, index) => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.onclick = () => loadCharacter(index);

            card.innerHTML = `
                <div class="card-name">${char.name}</div>
                <div class="card-stats">Str: ${char.strengthValue} | Dex: ${char.dexterityValue} | Wil: ${char.willpowerValue}</div>
                <div class="card-stats">TP: ${char.hp} | Kerne: ${char.pips}</div>
                <div class="card-stats">Beschreibung: ${char.description}</div>
            `;
            container.appendChild(card);
        });
    }
}

function saveCharacter() {
    if (
        document.getElementById("name-input").value.trim() === "" ||
        document.getElementById("str-value").innerHTML.trim() === "" ||
        document.getElementById("dex-value").innerHTML.trim() === "" ||
        document.getElementById("wil-value").innerHTML.trim() === "" ||
        document.getElementById("hp-value").innerHTML.trim() === "" ||
        document.getElementById("pip-value").innerHTML.trim() === "" ||
        document.getElementById("background-name").innerHTML.trim() === ""
    ) {
        alert("Fehler: Bitte generieren Sie zuerst einen vollständigen Charakter, bevor Sie ihn speichern.");
        return;
    }

    const items = [];
    for (let i = 1; i <= 10; i++) {
        items.push(document.getElementById(`item-${i}`).innerHTML);
    }

    const newChar = {
        name: document.getElementById("name-input").value,
        strengthValue: document.getElementById("str-value").innerHTML,
        strengthRolls: document.getElementById("str-rolls").innerHTML,
        dexterityValue: document.getElementById("dex-value").innerHTML,
        dexterityRolls: document.getElementById("dex-rolls").innerHTML,
        willpowerValue: document.getElementById("wil-value").innerHTML,
        willpowerRolls: document.getElementById("wil-rolls").innerHTML,
        hp: document.getElementById("hp-value").innerHTML,
        pips: document.getElementById("pip-value").innerHTML,
        birthsign: document.getElementById("birth-sign-value").innerHTML,
        fur: document.getElementById("fur-value").innerHTML,
        physicalTrait: document.getElementById("physical-trait-value").innerHTML,
        description: document.getElementById("description-value").innerHTML, 
        backgroundName: document.getElementById("background-name").innerHTML,
        items: items,
        swapDone: document.getElementById("swap-str-dex").disabled
    };
    
    let characters = getSavedCharacters();

    const existingIndex = characters.findIndex(char => char.name === newChar.name);
    if (existingIndex !== -1) {
        characters[existingIndex] = newChar;
        alert(`Charakter "${newChar.name}" wurde aktualisiert.`);
    } else {
        if (characters.length >= 10) {
            if (confirm("Das Speicherlimit von 10 Charakteren ist erreicht. Der älteste Charakter wird überschrieben. Fortfahren?")) {
                characters.shift();
            } else {
                return;
            }
        }
        characters.push(newChar);
        alert(`Charakter "${newChar.name}" erfolgreich gespeichert!`);
    }

    localStorage.setItem('mausritter_chars', JSON.stringify(characters));
    renderSavedCharacters();
}

function loadCharacter(index) {
    const characters = getSavedCharacters();
    if (characters[index]) {
        const char = characters[index];
        document.getElementById("name-input").value = char.name;
        document.getElementById("str-value").innerHTML = char.strengthValue;
        document.getElementById("str-rolls").innerHTML = char.strengthRolls;
        document.getElementById("dex-value").innerHTML = char.dexterityValue;
        document.getElementById("dex-rolls").innerHTML = char.dexterityRolls;
        document.getElementById("wil-value").innerHTML = char.willpowerValue;
        document.getElementById("wil-rolls").innerHTML = char.willpowerRolls;
        document.getElementById("hp-value").innerHTML = char.hp;
        document.getElementById("pip-value").innerHTML = char.pips;
        document.getElementById("description-value").innerHTML = char.description;
        document.getElementById("birth-sign-value").innerHTML = char.birthsign || "";
        document.getElementById("fur-value").innerHTML = char.fur || "";
        document.getElementById("physical-trait-value").innerHTML = char.physicalTrait || "";
        document.getElementById("background-name").innerHTML = char.backgroundName;
        
        for (let i = 1; i <= 10; i++) {
            document.getElementById(`item-${i}`).innerHTML = char.items[i-1] || "";
        }

        const buttons = document.querySelectorAll('.swap-buttons button');
        buttons.forEach(button => {
            button.disabled = char.swapDone;
        });

        document.getElementById("delete-character").disabled = false;
    }
}

function deleteCharacter() {
    const characterName = document.getElementById("name-input").value;

    if (characterName.trim() === "") {
        alert("Es ist kein Charakter zum Löschen ausgewählt.");
        return;
    }

    if (confirm(`Soll der Charakter "${characterName}" wirklich gelöscht werden?`)) {
        let characters = getSavedCharacters();
        const indexToDelete = characters.findIndex(char => char.name === characterName);

        if (indexToDelete !== -1) {
            characters.splice(indexToDelete, 1);
            localStorage.setItem('mausritter_chars', JSON.stringify(characters));

            document.getElementById("name-input").value = "";
            document.getElementById("str-value").innerHTML = "";
            document.getElementById("str-rolls").innerHTML = "";
            document.getElementById("dex-value").innerHTML = "";
            document.getElementById("dex-rolls").innerHTML = "";
            document.getElementById("wil-value").innerHTML = "";
            document.getElementById("wil-rolls").innerHTML = "";
            document.getElementById("hp-value").innerHTML = "";
            document.getElementById("pip-value").innerHTML = "";
            document.getElementById("birth-sign-value").innerHTML = "";
            document.getElementById("fur-value").innerHTML = "";
            document.getElementById("physical-trait-value").innerHTML = "";
            document.getElementById("background-name").innerHTML = "";
            document.getElementById("description-value").innerHTML = "";
            
            for (let i = 1; i <= 10; i++) {
                document.getElementById(`item-${i}`).innerHTML = "";
            }

            document.getElementById("delete-character").disabled = true;

            alert(`Charakter "${characterName}" wurde gelöscht.`);
            renderSavedCharacters();
            generateNewCharacter();
        } else {
            alert(`Charakter "${characterName}" wurde nicht in der Speicherung gefunden.`);
        }
    }
}

function swapAttributes(attr1, attr2) {
    if (confirm("Sollen die Werte von " + attr1.toUpperCase() + " und " + attr2.toUpperCase() + " wirklich getauscht werden?")) {
        const value1 = document.getElementById(attr1 + "-value");
        const rolls1 = document.getElementById(attr1 + "-rolls");
        const value2 = document.getElementById(attr2 + "-value");
        const rolls2 = document.getElementById(attr2 + "-rolls");

        let tempValue = value1.innerHTML;
        let tempRolls = rolls1.innerHTML;

        value1.innerHTML = value2.innerHTML;
        rolls1.innerHTML = rolls2.innerHTML;
        
        value2.innerHTML = tempValue;
        rolls2.innerHTML = tempRolls;

        const buttons = document.querySelectorAll('.swap-buttons button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }
}

function exportCharacters() {
    const characters = getSavedCharacters();
    if (characters.length === 0) {
        alert("Es gibt keine Charaktere zum Exportieren.");
        return;
    }

    const dataStr = JSON.stringify(characters, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mausritter-charaktere.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Charaktere erfolgreich exportiert!");
}

function importCharacters() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';

    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedChars = JSON.parse(event.target.result);
                if (Array.isArray(importedChars)) {
                    localStorage.setItem('mausritter_chars', JSON.stringify(importedChars));
                    alert(`Erfolgreich ${importedChars.length} Charaktere importiert!`);
                    renderSavedCharacters();
                    // Stelle sicher, dass die Benutzeroberfläche nach dem Import aktualisiert wird
                    if (importedChars.length > 0) {
                        loadCharacter(0);
                    } else {
                        generateNewCharacter();
                    }
                    document.getElementById("delete-character").disabled = importedChars.length === 0;
                } else {
                    alert("Die importierte Datei ist kein gültiges Charakter-Array.");
                }
            } catch (error) {
                alert("Fehler beim Parsen der Datei. Bitte stellen Sie sicher, dass es sich um eine gültige JSON-Datei handelt.");
            }
        };
        reader.readAsText(file);
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

window.onload = function() {
    const deleteButton = document.getElementById("delete-character");
    const savedCharacters = getSavedCharacters();

    if (savedCharacters.length > 0) {
        loadCharacter(0);
    } else {
        generateNewCharacter();
    }
    
    deleteButton.disabled = savedCharacters.length === 0;

    renderSavedCharacters();
};
