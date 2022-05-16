const url = `https://www.dnd5eapi.co/api/spells/`

fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
 console.log(data)

 const spellSelect = document.querySelector('select');

  for (let i=0; i<data.results.length; i++) {
      let spellOption = document.createElement("option")
      spellOption.textContent = data.results[i].name
      spellOption.value = data.results[i].index
      spellSelect.appendChild(spellOption)
  }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


    const spellChoice = document.querySelector("select")
    spellChoice.addEventListener("change", showSpell)
    
    function showSpell() {
        let spellValue = this.value.toLowerCase().split(' ').join('-')


      let spellLink = `https://www.dnd5eapi.co/api/spells/${spellValue}/`
      fetch(spellLink)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       console.log(data)
    
       let place = document.querySelector("#place")
       place.style.display = "block"
    
       function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    removeAllChildNodes(place)
       
    
        let spellName = document.createElement("h1")
        spellName.textContent = data.name;
        place.appendChild(spellName)

        let spellLevel = document.createElement("h2")
        spellLevel.textContent = `Level: ${data.level}`
        place.appendChild(spellLevel)

        if (data.attack_type) {
          let spellAttackType = document.createElement("h4")
          spellAttackType.textContent = `Attack Time: ${data.attack_type.charAt(0).toUpperCase() + data.attack_type.slice(1)}`
          place.appendChild(spellAttackType)
        }

        let spellDesc = document.createElement("p")
        spellDesc.textContent = data.desc
        place.appendChild(spellDesc)
    
        let spellDuration = document.createElement("h4")
        spellDuration.textContent = `Size: ${data.duration}`
        place.appendChild(spellDuration)

        let spellCastingTime = document.createElement("h4")
        spellCastingTime.textContent = `Casting Time: ${data.casting_time}`
        place.appendChild(spellCastingTime)
    
        // for (let i=0; i<data.actions.length; i++) {
        //   const monsterActions = document.createElement("h3")
        //   const monsterActionDesc = document.createElement("p")
        //   monsterActions.textContent = data.actions[i].name
        //   monsterActionDesc.textContent = data.actions[i].desc
        //   place.appendChild(monsterActions)
        //   place.appendChild(monsterActionDesc)
        // }
    
    
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }