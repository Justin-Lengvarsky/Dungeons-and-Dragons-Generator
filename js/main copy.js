//Example fetch using DnD5eAPI - place subclasses in ul
document.querySelector('.classButton').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('.classButton').value
  const url = `https://www.dnd5eapi.co/api/classes/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       console.log(data)
        document.querySelector("h2").innerHTML = data.name
        // document.querySelector("h3").innerHTML = `${Object.keys(data.damage.damage_at_slot_level)}: ${Object.values(data.damage.damage_at_slot_level)}`
        
        Object.keys(data.damage.damage_at_slot_level).forEach((item, index) => {
          const li = document.createElement("li")
          li.textContent = `${item}: ${Object.values(data.damage.damage_at_slot_level)[index]}`
          document.querySelector("ul").appendChild(li)
        })
        document.querySelector("h4").innerHTML = data.subclasses[0].name
        console.log(data.classes.name)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}



