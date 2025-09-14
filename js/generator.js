// --- Charaktergenerierungs-Logik ---
function rollD6() {
    return Math.floor(Math.random() * 6) + 1;
}

function generateAttribute() {
    const roll1 = rollD6();
    const roll2 = rollD6();
    const roll3 = rollD6();
    
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
        "Fenchel", "Sandi", "Ringelchen", "Wermuth", "Salbei", "Klee", "Minze", 
        "Hagebutte", "Pilz", "Eichel", "Kiesel", "Krümel", "Flausche", "Glöckchen",
        "Pip", "Fitzel", "Pünktchen", "Rudi", "Flick", "Acker", "Butz", "Dorn", 
        "Fell", "Honig", "Käse", "Löwenzahn", "Nüsschen", "Pfeffer", "Rinde", "Spitz",
        "Waldo", "Zwiebel", "Knopf", "Samt", "Piep", "Socke", "Katz", "Mücke"
    ];
    
    return names[Math.floor(Math.random() * names.length)];
}

function generateNewCharacter() {
    const strength = generateAttribute();
    const dexterity = generateAttribute();
    const willpower = generateAttribute();
    const hitPoints = rollD6();
    const pips = rollD6();
    const name = generateName();

    document.getElementById("name-input").value = name;
    document.getElementById("str-value").innerHTML = strength.value;
    document.getElementById("str-rolls").innerHTML = strength.rolls;
    document.getElementById("dex-value").innerHTML = dexterity.value;
    document.getElementById("dex-rolls").innerHTML = dexterity.rolls;
    document.getElementById("wil-value").innerHTML = willpower.value;
    document.getElementById("wil-rolls").innerHTML = willpower.rolls;
    document.getElementById("hp-value").innerHTML = hitPoints;
    document.getElementById("pip-value").innerHTML = pips;

    const buttons = document.querySelectorAll('.swap-buttons button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// --- Speicher- und Lade-Logik mit localStorage ---

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
                <div class="card-stats">TP: ${char.hp}</div>
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
        document.getElementById("hp-value").innerHTML.trim() === ""
    ) {
        alert("Fehler: Bitte generieren Sie zuerst einen vollständigen Charakter, bevor Sie ihn speichern.");
        return;
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

            // Felder leeren und Buttons zurücksetzen
            document.getElementById("name-input").value = "";
            document.getElementById("str-value").innerHTML = "";
            document.getElementById("str-rolls").innerHTML = "";
            document.getElementById("dex-value").innerHTML = "";
            document.getElementById("dex-rolls").innerHTML = "";
            document.getElementById("wil-value").innerHTML = "";
            document.getElementById("wil-rolls").innerHTML = "";
            document.getElementById("hp-value").innerHTML = "";
            document.getElementById("delete-character").disabled = true;

            alert(`Charakter "${characterName}" wurde gelöscht.`);
            renderSavedCharacters(); // Kacheln neu rendern
            generateNewCharacter(); // Neuen Charakter generieren
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

window.onload = function() {
    const deleteButton = document.getElementById("delete-character");
    const savedCharacters = getSavedCharacters();

    if (savedCharacters.length > 0) {
        loadCharacter(0);
    } else {
        generateNewCharacter();
    }
    
    // Initialen Zustand des Löschen-Buttons setzen
    deleteButton.disabled = savedCharacters.length === 0;

    renderSavedCharacters();
};
