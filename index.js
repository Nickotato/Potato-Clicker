setInterval(calculate, 1000);

const deleteBtn = document.getElementById("deletebtn")
const deleteTxt = document.getElementById("deletetxt")
const clickEl = document.getElementById("clicks")
const potatosEl = document.getElementById("potato/s")
const mainImgEl = document.getElementById("mainimg")
const farmerEl = document.getElementById("farmer-el")
const farmEl = document.getElementById("farm-el")
const farmerCostEl = document.getElementById("farmerCost")
const farmerNumberEl = document.getElementById("farmerNumber")
const farmCostEl = document.getElementById("farmCost")
const farmNumberEl = document.getElementById("farmNumber")
let farmerCost = 12
let farmerNumber = 0
let farmCost = 100
let farmNumber = 0


const factoryEl = document.getElementById("factory-el")
const factoryCostEl = document.getElementById("factoryCost")
const factoryNumberEl = document.getElementById("factoryNumber")
let factoryCost = 550
let factoryNumber = 0

const mineEl = document.getElementById("mine-el")
const mineCostEl = document.getElementById("mineCost")
const mineNumberEl = document.getElementById("mineNumber")
let mineCost = 1384
let mineNumber = 0

const bakerEl = document.getElementById("baker-el")
const bakerCostEl = document.getElementById("bakerCost")
const bakerNumberEl = document.getElementById("bakerNumber")
let bakerCost = 16234
let bakerNumber = 0

const bankEl = document.getElementById("bank-el")
const bankCostEl = document.getElementById("bankCost")
const bankNumberEl = document.getElementById("bankNumber")
let bankCost = 45832
let bankNumber = 0


let potatos = 0
let clickCount = 0
let multiplier = 1

if (parseInt(localStorage.getItem("clickCount")) > 0) {
    load()
}


mainImgEl.addEventListener("click",function() {
    clickCount += 1
    update()
})

farmerEl.addEventListener("click",function() {
    if (clickCount >= farmerCost) {
    farmerCost = upgrades(farmerCost, farmerNumber)
    farmerNumber += 1
    update() 
    }
})

farmEl.addEventListener("click",function() {
    if (clickCount >= farmCost) {
        farmCost = upgrades(farmCost, farmNumber)
        farmNumber += 1
        update() 
        }
})


factoryEl.addEventListener("click",function() {
    if (clickCount >= factoryCost) {
        factoryCost = upgrades(factoryCost, factoryNumber)
        factoryNumber += 1
        update() 
        }
})

mineEl.addEventListener("click", function() {
    if (clickCount >= mineCost) {
        mineCost = upgrades(mineCost, mineNumber)
        mineNumber += 1
        update() 
        }
})

bakerEl.addEventListener("click", function() {
    if (clickCount >= bakerCost) {
        bakerCost = upgrades(bakerCost, bakerNumber)
        bakerNumber += 1
        update() 
        }
})

bankEl.addEventListener("click", function() {
    if (clickCount >= bankCost) {
        bankCost = upgrades(bankCost, bankNumber)
        bankNumber += 1
        update() 
        }
})

function calculate() {
    clickCount = clickCount + farmerNumber * multiplier;
    clickCount = clickCount + farmNumber * 3 * multiplier;
    clickCount = clickCount + factoryNumber * 10 * multiplier;
    clickCount = clickCount + mineNumber * 16 * multiplier;
    clickCount = clickCount + bakerNumber * 24 * multiplier;
    clickCount = clickCount + bankNumber * 67 * multiplier;

    potatos = multiplier * (farmerNumber + farmNumber * 3 + factoryNumber * 10 + mineNumber * 16 + bakerNumber * 24 + bankNumber * 67)
        update()
}

function update() {
    potatos = multiplier * (farmerNumber + farmNumber * 3 + factoryNumber * 10 + mineNumber * 16 + bakerNumber * 24 + bankNumber * 67)
    potatosEl.textContent = `You are making ${potatos} potatoes every second`

    clickEl.textContent = `You have ${clickCount} potatoes`
    farmerCostEl.textContent = `${farmerCost} Potatoes`
    farmerNumberEl.textContent = `You have ${farmerNumber} farmers`
    farmCostEl.textContent = `${farmCost} Potatoes`
    farmNumberEl.textContent = `You have ${farmNumber} farms`
    factoryCostEl.textContent = `${factoryCost} Potatoes`
    factoryNumberEl.textContent = `You have ${factoryNumber} factories`

    mineCostEl.textContent = `${mineCost} Potatoes`
    mineNumberEl.textContent = `You have ${mineNumber} mines`
    bakerCostEl.textContent = `${bakerCost} Potatoes`
    bakerNumberEl.textContent = `You have ${bakerNumber} bakers`
    bankCostEl.textContent = `${bankCost} Potatoes`
    bankNumberEl.textContent = `You have ${bankNumber} banks`
    save()
}


function upgrades(numberCost, countNumber) {
        clickCount -= numberCost
        countNumber += 1
        numberCost = numberCost + (countNumber * 6) 

        return numberCost
}





function save() {
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("farmerNumber", farmerNumber);
    localStorage.setItem("farmerCost", farmerCost);
    localStorage.setItem("farmNumber", farmNumber);
    localStorage.setItem("farmCost", farmCost);
    localStorage.setItem("factoryNumber", factoryNumber);
    localStorage.setItem("factoryCost", factoryCost);
    localStorage.setItem("mineNumber", mineNumber);
    localStorage.setItem("mineCost", mineCost);
    localStorage.setItem("bakerNumber", bakerNumber);
    localStorage.setItem("bakerCost", bakerCost);
    localStorage.setItem("bankNumber", bankNumber);
    localStorage.setItem("bankCost", bankCost);

    localStorage.setItem("multiplier", multiplier);
}

function load() {
    clickCount = localStorage.getItem("clickCount");
    clickCount = parseInt(clickCount);
    farmerNumber = parseInt(localStorage.getItem("farmerNumber"))
    farmerCost = parseInt(localStorage.getItem("farmerCost"))
    farmNumber = parseInt(localStorage.getItem("farmNumber"))
    farmCost = parseInt(localStorage.getItem("farmCost"))
    farmNumber = parseInt(localStorage.getItem("farmNumber"))
    factoryNumber = parseInt(localStorage.getItem("factoryNumber"))
    factoryCost = parseInt(localStorage.getItem("factoryCost"))
    mineNumber = parseInt(localStorage.getItem("mineNumber"))
    mineCost = parseInt(localStorage.getItem("mineCost"))
    bakerNumber = parseInt(localStorage.getItem("bakerNumber"))
    bakerCost = parseInt(localStorage.getItem("bakerCost"))
    bankNumber = parseInt(localStorage.getItem("bankNumber"))
    bankCost = parseInt(localStorage.getItem("bankCost"))
    update();

}

deleteBtn.addEventListener("mouseover", function() {
    deleteTxt.textContent = "Double click"
})

deleteBtn.addEventListener("mouseout", function() {
    deleteTxt.textContent = "DELETE SAVE"
})

deleteBtn.addEventListener("dblclick", function() {
    clickCount = 0
    farmerNumber = 0
    farmerCost = 12
    farmNumber = 0
    farmCost = 100
    farmNumber = 0
    factoryNumber = 0
    factoryCost = 550
    mineNumber = 0
    mineCost = 1384
    bakerNumber = 0
    bakerCost = 16234
    bankNumber = 0
    bankCost = 45832
    localStorage.clear()
})