setInterval(update, 1000);

/////////////////////////////////
/////GETTING ELEMENTS BY ID/////
///////////////////////////////

const potato = document.getElementById("potato");
const deleteBtn = document.getElementById("delete");

const farmerBtn = document.getElementById("farmer");
const bakerBtn = document.getElementById("baker");

const clickCountBtn = document.getElementById("clickCount");
const multiplierBtn = document.getElementById("multiplier");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
//////////////////
////VARIABLES////
////////////////

const defaultWorkers = [
  {
    name: "farmer",
    income: 1,
    owned: 0,
    cost: 12,
  },
  {
    name: "baker",
    income: 20,
    owned: 0,
    cost: 50,
  },
];

const defaultUpgrades = {
  clickCount: 1,
  multiplier: 1,
  clickCost: 100,
  multiplierCost: 100,
};

let potatos = JSON.parse(localStorage.getItem("potatos")) || 0;
let totalIncome = 0;
let workers = JSON.parse(localStorage.getItem("workers")) || defaultWorkers;
let upgrades = JSON.parse(localStorage.getItem("upgrades")) || defaultUpgrades;

let workersVisible = true;
//////////////////////////
////INITIALIZING GAME////
////////////////////////

updateTextContent();

////////////////////////
////EVENT LISTENERS////
//////////////////////

potato.addEventListener("click", (e) => {
  const clickSound = new Audio();
  clickSound.src = "sound/pop.mp3";
  clickSound.play();

  const effect = document.createElement('div');
  const effectTxt = document.createElement('h1')
  //const effectImg = document.createElement('img')
  
    effect.className = 'clickEffect';
    effect.style.position = `absolute`;
    effect.style.width = `20px`
    effect.style.left = `${e.pageX - 10}px`;
    effect.style.top = `${e.pageY - 20}px`;
    effect.style.textAlign = `center`
    effect.style.pointerEvents = `none`;

    effectTxt.textContent = `+${upgrades.clickCount}`
    effectTxt.style.fontSize = '10px'
    effectTxt.style.animationName = `flyUp`
    effectTxt.style.animationDuration = `1.2s`
    
    // effectImg.src = `images/potato.png`
    // effectImg.style.width = `20px`;
    // effectImg.style.animationName = `fadeOut`
    // effectImg.style.animationDuration = `1.2s`
    
    effect.appendChild(effectTxt);
    //effect.appendChild(effectImg);
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1200);

  potatos += upgrades.clickCount;
  updateTextContent();
});

deleteBtn.addEventListener("dblclick", deleteSave);

deleteBtn.addEventListener("mouseover", function () {
  deleteBtn.textContent = "Double click";
});

deleteBtn.addEventListener("mouseout", function () {
  deleteBtn.textContent = "DELETE SAVE";
});

//Worker Event Listeners//

farmerBtn.addEventListener("click", () => {
  buyWorker("farmer");
});

bakerBtn.addEventListener("click", () => {
  buyWorker("baker");
});

//Upgrade Event Listeners//

clickCountBtn.addEventListener("click", () => upgradeClickCount());
multiplierBtn.addEventListener("click", () => upgradeMultiplier());

//Side Button Event Listeners//
option1.addEventListener("click", () => openStatMenu());
option2.addEventListener("click", () => openSettingMenu());

document
  .getElementById("stat--close")
  .addEventListener("click", () => closeStatMenu());

document
  .getElementById("setting--close")
  .addEventListener("click", () => closeSettingMenu());

/////////////////////
/////FUNCTIONS//////
///////////////////

function openStatMenu() {
  document.getElementById("statMenu").style.display = "flex";
  document.getElementById("statMenu").style.opacity = "100%";
  document.body.style.overflow = "hidden";
}

function closeStatMenu() {
  document.getElementById("statMenu").style.display = "none";
  document.getElementById("statMenu").style.opacity = "0%";
  document.body.style.overflowY = "auto";
}

function openSettingMenu() {
  document.getElementById("settingMenu").style.display = "flex";
  document.getElementById("settingMenu").style.opacity = "100%";
  document.body.style.overflow = "hidden";
}

function closeSettingMenu() {
  document.getElementById("settingMenu").style.display = "none";
  document.getElementById("settingMenu").style.opacity = "0%";
  document.body.style.overflowY = "auto";
}

function buyWorker(workerBtn) {
  // getting Index of the worker in the array.
  const index = workers.indexOf(
    workers.find((worker) => worker.name === workerBtn)
  );

  //Checking too see if the player has enough money to afford the worker.
  if (potatos >= workers[index].cost) {
    // Subtracing the workers cost form the player and changing the stats of that worker.
    potatos -= workers[index].cost;
    workers[index].owned++;
    workers[index].cost = Math.floor(workers[index].cost * 1.115);

    updateTextContent();
  }
}

function upgradeClickCount() {
  function costNum() {
    if (upgrades.clickCount < 100) {
      return upgrades.clickCost + 100;
    } else {
      return upgrades.clickCount * 100;
    }
  }

  function upgradeNum() {
    if (upgrades.clickCount < 100) {
      return 1;
    } else if (upgrades.clickCount < 10000) {
      return 100;
    } else {
      return 1000;
    }
  }

  if (potatos >= upgrades.clickCost) {
    potatos -= upgrades.clickCost;
    upgrades.clickCost += 100; //costNum();
    upgrades.clickCount += upgradeNum();
  }

  updateTextContent();
}

function upgradeMultiplier() {
  if (potatos >= upgrades.multiplierCost) {
    potatos -= upgrades.multiplierCost;
    upgrades.multiplierCost *= 4;
    upgrades.multiplier = JSON.parse((upgrades.multiplier + 0.1).toFixed(2));
  }

  updateTextContent();
}

function deleteSave() {
  potatos = 0;
  totalIncome = 0;
  workers = JSON.parse(JSON.stringify(defaultWorkers));
  upgrades = JSON.parse(JSON.stringify(defaultUpgrades));

  localStorage.clear();
  updateTextContent();
}

//////////////////////////
/////UPDATE FUCTIONS/////
////////////////////////

function updateTextContent() {
  potatoText.textContent = `You have ${potatos} Potatos`;
  document.getElementById(
    "subText"
  ).textContent = `You are making ${calculate()} Potatos every second`;

  workers.forEach((worker) => {
    const element = document.getElementById(worker.name);
    element.textContent = `${worker.name} (Cost: ${worker.cost}, Owned: ${worker.owned})`;
  });

  clickCountBtn.textContent = `+1 Click (Cost: ${upgrades.clickCost}. Owned: ${upgrades.clickCount})`;

  //+1 Click (Cost: 100, Owned: 1x)

  multiplierBtn.textContent = `+0.1x Multiplier (Cost: ${
    upgrades.multiplierCost
  }, Owned: ${upgrades.multiplier.toFixed(1)}x)`;

  //+0.1x Multiplier (Cost: 100, Owned: 1.0x)

  document.querySelector('title').textContent = `${potatos} potatos - Potato Clicker`;
}

function calculate() {
  totalIncome = 0;
  workers.forEach((worker) => {
    totalIncome += worker.owned * worker.income * upgrades.multiplier;
  });

  return Math.floor(totalIncome);
}

function save() {
  localStorage.setItem("potatos", JSON.stringify(potatos));
  localStorage.setItem("workers", JSON.stringify(workers));
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

function update() {
  potatos += calculate();
  updateTextContent();

  save();
}
