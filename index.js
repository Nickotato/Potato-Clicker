setInterval(calculate, 1000);

const deleteBtn = document.getElementById("deletebtn")
const deleteTxt = document.getElementById("deletetxt")
const clickEl = document.getElementById("clicks")
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

function calculate() {
    clickCount = clickCount + farmerNumber * multiplier;
    clickCount = clickCount + farmNumber * 3 * multiplier;
    clickCount = clickCount + factoryNumber * 10 * multiplier;
        update()
}

function update() {
    clickEl.textContent = `You have ${clickCount} potatoes`
    farmerCostEl.textContent = `${farmerCost} Potatoes`
    farmerNumberEl.textContent = `You have ${farmerNumber} farmers`
    farmCostEl.textContent = `${farmCost} Potatoes`
    farmNumberEl.textContent = `You have ${farmNumber} farms`
    factoryCostEl.textContent = `${factoryCost} Potatoes`
    factoryNumberEl.textContent = `You have ${factoryNumber} factories`
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
    localStorage.clear()
})