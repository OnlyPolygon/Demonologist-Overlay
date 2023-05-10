const version = "0.3.0 (Gameplay Mechanics)";

// Order is important:
// EMF | ESG | Easel | Ecto | Fingerprints | Spirit Box | Freezing
// 1 is true    // 0 is false

//ABADDON = 	"1000011"
//AGASH = 	    "0001101"
//BOOGEY = 	    "1100010"
//DEMON = 	    "0011001"
//DEOGEN = 	    "0101100"
//GORYO = 	    "1100100"
//GUIPO = 	    "0101010"
//GUL =		    "0000111"
//HANTU = 	    "0010011"
//IBLIS = 	    "0110010"
//JINN = 		"1100001"
//MARE = 		"1010001"
//MYLING = 	    "0001011"
//NAAMAH = 	    "0111000"
//ONI = 		"1000101"
//ONRYO = 	    "1010100"
//POLTERGEIST = "0100110"
//RAIJU = 	    "0101001"
//REVENANT = 	"0010101"
//SHADE = 	    "0011010"
//THAYE = 	    "0010110"
//WRAITH = 	    "1001100"
//YOKAI = 	    "1010010"
//YUREI = 	    "1101000"

const EVIDENCE = {
  0: "emf-svg",
  1: "esg-svg",
  2: "easel-svg",
  3: "ecto-svg",
  4: "fingerprints-svg",
  5: "spiritbox-svg",
  6: "freeze-svg",
};

const ANSWER = {
  "1000011": "Abbadon",
  "0001101": "Agash",
  "1100010": "Boogy",
  "0011001": "Demon",
  "0101100": "Deogen",
  "1100100": "Goryo",
  "0101010": "Guipo",
  "0000111": "Gul",
  "0010011": "Hantu",
  "0110010": "Iblis",
  "1100001": "Jinn",
  "1010001": "Mare",
  "0001011": "Myling",
  "0111000": "Naamah",
  "1000101": "Oni",
  "1010100": "Onryo",
  "0100110": "Poltergeist",
  "0101001": "Raiju",
  "0010101": "Revenant",
  "0011010": "Shade",
  "0010110": "Thaye",
  "1001100": "Wraith",
  "1010010": "Yokai",
  "1101000": "Yurei",
};
const GHOSTS = [
  ["Abbadon", "1000011"],
  ["Agash", "0001101"],
  ["Boogy", "1100010"],
  ["Demon", "0011001"],
  ["Deogen", "0101100"],
  ["Goryo", "1100100"],
  ["Guipo", "0101010"],
  ["Gul", "0000111"],
  ["Hantu", "0010011"],
  ["Iblis", "0110010"],
  ["Jinn", "1100001"],
  ["Mare", "1010001"],
  ["Myling", "0001011"],
  ["Naamah", "0111000"],
  ["Oni", "1000101"],
  ["Onryo", "1010100"],
  ["Poltergeist", "0100110"],
  ["Raiju", "0101001"],
  ["Revenant", "0010101"],
  ["Shade", "0011010"],
  ["Thaye", "0010110"],
  ["Wraith", "1001100"],
  ["Yokai", "1010010"],
  ["Yurei", "1101000"],
];
options = [
  "Abbadon",
  "Agash",
  "Boogy",
  "Demon",
  "Deogen",
  "Goryo",
  "Guipo",
  "Gul",
  "Hantu",
  "Ibils",
  "Jinn",
  "Mare",
  "Myling",
  "Naamah",
  "Oni",
  "Onryo",
  "Poltergeist",
  "Raiju",
  "Revenant",
  "Shade",
  "Thaye",
  "Wraith",
  "Yokai",
  "Yurei",
];
compare = [
  "Abbadon",
  "Agash",
  "Boogy",
  "Demon",
  "Deogen",
  "Goryo",
  "Guipo",
  "Gul",
  "Hantu",
  "Ibils",
  "Jinn",
  "Mare",
  "Myling",
  "Naamah",
  "Oni",
  "Onryo",
  "Poltergeist",
  "Raiju",
  "Revenant",
  "Shade",
  "Thaye",
  "Wraith",
  "Yokai",
  "Yurei",
];
current = "0000000";
temp = [];
evdCount = 0;

// Creates a function that lets me replace a character at a specific location (Made for updating current evidence)
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

// Check if specified evidence is for specified ghost
function checkEachGhost(ghost, evidence) {
  if (GHOSTS[ghost][1][evidence] != 1) {
    return false;
  } else {
    return true;
  }
}

// Calcultes the avaliable ghosts for 2 given evidences.
function updateOptions() {
  for (let i = 0; i < temp.length; i++) {
    del = options.indexOf(temp[i]);
    if (del != -1) {
      options.splice(del, 1);
    }
  }
}

// Disables the button of evidence that isn't possible
function disableButton() {
  var tmp = 0000000;
  // Adds current options evidnces to tmp
  for (var i = 0; i < options.length; i++) {
    tmp += parseInt(GHOSTS[compare.indexOf(options[i])][1]);
  }
  //console.log(tmp);
  // Makes sure leading 0s are added back after math
  if (String(tmp).length < 7) {
    tmp = ("0000000" + tmp).slice(-7);
    //console.log("running");
  }
  //console.log(tmp);
  hold = String(tmp);
  // Turns icon red and disables onClick
  for (var i = 0; i < hold.length; i++) {
    if (hold[i] < 1) {
      document.getElementById(EVIDENCE[i]).style.fill =
        "rgba(234, 66, 29, 0.6)";
      document.getElementById(EVIDENCE[i]).onclick = null;
    }
  }
}

// Disables any evidence that isn't 1 in current
function disableButtonFinal() {
  for (var i = 0; i < current.length; i++) {
    if (current[i] != 1) {
      document.getElementById(EVIDENCE[i]).style.fill =
        "rgba(234, 66, 29, 0.6)";
      document.getElementById(EVIDENCE[i]).onclick = null;
    }
  }
}

// Main Function
function checkEvidence(evidence) {
  evdCount++;
  // If it's the 3rd evidence
  if (evdCount === 3) {
    current = current.replaceAt(evidence, "1");
    pick = ANSWER[current];
    disableButtonFinal();
    //console.log(pick)
    document.getElementById("ghost-type").innerHTML = pick;
  }
  // If not update current to have a 1 in the evidence position
  current = current.replaceAt(evidence, "1");
  // Add ghosts without evidence to list
  for (let i = 0; i < GHOSTS.length; i++) {
    if (checkEachGhost(i, evidence) != true) {
      temp.push(options[i]);
    }
  }
  //console.log(temp)
  // Update icon to green and disable onClick
  document.getElementById(EVIDENCE[evidence]).style.fill =
    "rgba(50, 205, 50, 1)";
  document.getElementById(EVIDENCE[evidence]).onclick = null;
  // On the second evidence
  if (evdCount === 2) {
    updateOptions();
    // Only need to update after 2 evidence since no evidence is exclusive
    disableButton();
    //console.log(options)
    // Adds a space between options and writes it
    var write = String(options).replace(/,/g, ", ");
    document.getElementById("ghost-type").innerHTML = write;
  }
  //current = current.replaceAt(evidence, "1");
}
// Checks of the clicked evidence hasn't been selected (Probably not needed)
function evidenceSelect(evidence) {
  if (current[evidence] != 1) {
    checkEvidence(evidence);
    //console.log(evidence)
  }
}

// Reloads page to reset everything
function reset() {
  location.reload();
}
