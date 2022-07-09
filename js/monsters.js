const url = `https://www.dnd5eapi.co/api/monsters/`

fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)

  // Goes through every element in the API Spells array and creates a new option in the Select bar 
  const monsterSelect = document.querySelector('select');

  for (let i=0; i<data.results.length; i++) {
      let monsterOption = document.createElement("option")
      monsterOption.textContent = data.results[i].name
      monsterOption.value = data.results[i].index
      monsterSelect.appendChild(monsterOption)
    }
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

// Once a monster is selected, the below fetches that item from the API database
const monsterChoice = document.querySelector("select")
monsterChoice.addEventListener("change", showMonster)

function showMonster() {
  let monsterLink = `https://www.dnd5eapi.co/api/monsters/${this.value}/`
  fetch(monsterLink)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // Shows the selected monster on the page
   let place = document.querySelector("#place")
   place.style.display = "block"

    // Removes the current monster shown if user selects a different monster
    function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
    removeAllChildNodes(place)
   
    // Shows all the data from that spell onto the page
    let monsterName = document.createElement("h1")
    monsterName.textContent = data.name;
    place.appendChild(monsterName)

    let monsterType = document.createElement("h2")
    monsterType.textContent = data.type.charAt(0).toUpperCase() + data.type.slice(1)
    place.appendChild(monsterType)

    let monsterSize = document.createElement("h3")
    monsterSize.textContent = `Size: ${data.size}`
    place.appendChild(monsterSize)

    let monsterAC = document.createElement("h3")
    monsterAC.textContent = `AC: ${data.armor_class}`
    place.appendChild(monsterAC)

    let actions = document.createElement("h2")
    actions.textContent = 'Actions'
    actions.style.margin = "4rem 0 3rem 0";
    actions.style.textDecoration = "underline";
    place.appendChild(actions)

    for (let i=0; i<data.actions.length; i++) {
      const monsterActions = document.createElement("h3")
      const monsterActionDesc = document.createElement("p")
      monsterActions.textContent = data.actions[i].name
      monsterActionDesc.textContent = data.actions[i].desc
      place.appendChild(monsterActions)
      place.appendChild(monsterActionDesc)
    }
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}