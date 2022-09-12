const classes = document.querySelectorAll('.classButton');

// Gives every class box functionality to retrieve their respetive information to display
classes.forEach(el => el.addEventListener('click', getFetch)) 

function getFetch(){

    // Once a class is clicked, it's data will be fetched and the page will hide all other classes
    const choice = this.innerText.toLowerCase()
    console.log(choice)
    const url = `https://www.dnd5eapi.co/api/classes/${choice}`

    classes.forEach(el => el.style.display = "none") 

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

    // Shows the selected class on the page
    let place = document.querySelector("#place")
    place.style.display = "block"

    // Declares data from each class and displays it on the page
    const title = document.createElement("h2")
    title.textContent = data.name;
    place.appendChild(title)

    const hitDie = document.createElement("p")
    hitDie.textContent = `Hit Die: ${data.hit_die}`;
    place.appendChild(hitDie)

    const primaryAbility = document.createElement("p")

    // Some classes have their abilities stored differently in the API, so this makes sure the selected class shows their data correctly
    if (!data.multi_classing.prerequisites) {
        primaryAbility.textContent = `Primary Ability: ${data.multi_classing.prerequisite_options.from[0].ability_score.name}` 
    } else {
        primaryAbility.textContent = `Primary Ability: ${data.multi_classing.prerequisites[0].ability_score.name}`;
    }

    place.appendChild(primaryAbility)

    const classSkillProficiencies = document.createElement("p")
    classSkillProficiencies.textContent = `Choose from `;

    // Makes sure the each proficiency is presented as a list and the last item has 'and' at the beginning
    for (let i=0; i<data.proficiency_choices[0].from.options.length; i++) {
        if (i == data.proficiency_choices[0].from.options.length-1) {
            classSkillProficiencies.innerText += `and ${data.proficiency_choices[0].from.options[i].item.name.split(' ').filter(item => item != "Skill:").join(' ')}`
        } else {
            classSkillProficiencies.innerText += `${data.proficiency_choices[0].from.options[i].item.name.split(' ').filter(item => item != "Skill:").join(' ')}, `
        }
    }

    place.appendChild(classSkillProficiencies)

    let pic;
    let quote
    // The API does not include images so in order to display for each class, this switch case will display the correct stored image
    switch (data.name) {
        case "Barbarian":
            pic = document.createElement("img");
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/barbarian.png';
            place.appendChild(pic);

            quote = document.createElement("i");
            quote.textContent = '"For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength."';
            place.appendChild(quote);
            break;

        case "Bard":
            pic = document.createElement("img");
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/bard.png';
            place.appendChild(pic);

            quote = document.createElement("i");
            quote.textContent = '"Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds."';
            place.appendChild(quote);
            break;

        case "Cleric":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/cleric.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Clerics are intermediaries between the mortal world and the distant planes of the gods. As varied as the gods they serve, clerics strive to embody the handiwork of their deities. No ordinary priest, a cleric is imbued with divine magic."';
            place.appendChild(quote);
            break;

        case "Druid":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/druid.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature’s resilience, cunning, and fury. They claim no mastery over nature. Instead, they see themselves as extensions of nature’s indomitable will."';
            place.appendChild(quote);
            break;

        case "Fighter":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/fighter.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"All of these heroes are fighters, perhaps the most diverse class of characters in the worlds of Dungeons & Dragons. Questing knights, conquering overlords, royal champions, elite foot soldiers, hardened mercenaries, and bandit kings—as fighters, they all share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. And they are well acquainted with death, both meeting it out and staring it defiantly in the face."';
            place.appendChild(quote);
            break;

        case "Monk":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/monk.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Whatever their discipline, monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does."';
            place.appendChild(quote);
            break;

        case "Paladin":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/paladin.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Whatever their origin and their mission, paladins are united by their oaths to stand against the forces of evil. Whether sworn before a god’s altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin’s oath is a powerful bond. It is a source of power that turns a devout warrior into a blessed champion."';
            place.appendChild(quote);
            break;

        case "Ranger":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/ranger.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch."';
            place.appendChild(quote);
            break;

        case "Rogue":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/rogue.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Rogues rely on skill, stealth, and their foes’ vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party."';
            place.appendChild(quote);
            break;

        case "Sorcerer":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/sorcerer.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. One can’t study sorcery as one learns a language, any more than one can learn to live a legendary life. No one chooses sorcery; the power chooses the sorcerer."';
            place.appendChild(quote);
            break;

        case "Warlock":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/warlock.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. Through pacts made with mysterious beings of supernatural power, warlocks unlock magical effects both subtle and spectacular. Drawing on the ancient knowledge of beings such as fey nobles, demons, devils, hags, and alien entities of the Far Realm, warlocks piece together arcane secrets to bolster their own power."';
            place.appendChild(quote);
            break;

        case "Wizard":
            pic = document.createElement("img")
            pic.src = '/Users/justinlengvarsky/Desktop/Dungeons-and-Dragons-API/img/wizard.png';
            place.appendChild(pic)

            quote = document.createElement("i");
            quote.textContent = '"Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, and brute-force mind control. Their magic conjures monsters from other planes of existence, glimpses the future, or turns slain foes into zombies. Their mightiest spells change one substance into another, call meteors down from the sky, or open portals to other worlds."';
            place.appendChild(quote);
            break;
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}



