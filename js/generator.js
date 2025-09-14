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
    const name = generateName();

    document.getElementById("name-input").value = name;
    document.getElementById("str-value").innerHTML = strength.value;
    document.getElementById("str-rolls").innerHTML = strength.rolls;
    document.getElementById("dex-value").innerHTML = dexterity.value;
    document.getElementById("dex-rolls").innerHTML = dexterity.rolls;
    document.getElementById("wil-value").innerHTML = willpower.value;
    document.getElementById("wil-rolls").innerHTML = willpower.rolls;
    document.getElementById("hp-value").innerHTML = hitPoints;

    // Reset der Tausch-Buttons
    const buttons = document.querySelectorAll('.swap-buttons button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// --- Cookie-Logik ---
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function saveCharacter() {
    const characterData = {
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
    
    const jsonString = JSON.stringify(characterData);
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `mausritter_char=${encodeURIComponent(jsonString)}; ${expires}; path=/`;

    alert("Charakter erfolgreich gespeichert!");
}

function loadCharacter() {
    const cookie = getCookie("mausritter_char");
    if (cookie) {
        const characterData = JSON.parse(decodeURIComponent(cookie));
        
        document.getElementById("name-input").value = characterData.name;
        document.getElementById("str-value").innerHTML = characterData.strengthValue;
        document.getElementById("str-rolls").innerHTML = characterData.strengthRolls;
        document.getElementById("dex-value").innerHTML = characterData.dexterityValue;
        document.getElementById("dex-rolls").innerHTML = characterData.dexterityRolls;
        document.getElementById("wil-value").innerHTML = characterData.willpowerValue;
        document.getElementById("wil-rolls").innerHTML = characterData.willpowerRolls;
        document.getElementById("hp-value").innerHTML = characterData.hp;

        const buttons = document.querySelectorAll('.swap-buttons button');
        buttons.forEach(button => {
            button.disabled = characterData.swapDone;
        });

        alert("Gespeicherter Charakter geladen!");
    } else {
        alert("Kein gespeicherter Charakter gefunden.");
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

// Wird beim Laden der Seite ausgeführt
window.onload = function() {
    if (getCookie("mausritter_char")) {
        loadCharacter();
    } else {
        generateNewCharacter();
    }
};
