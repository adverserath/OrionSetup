function CountResist() {
    var item = SelectTarget()
    var itemProps = item.Properties().split(/\r?\n/);
    var total = 0
    itemProps.forEach(function (prop) {

        if (Orion.Contains(prop, 'Resist')) {
            var regex = "Resist\\s?(\\d+)?";
            var outcome = prop.match(regex)
            total += parseInt(outcome[1])
        }
    })
    Orion.Print(total)
}

function PlayerReader() {
TextWindow.Clear()
    var properties = []
    var selected;
    var selecting = true;
    var items = [];
    selected = SelectTarget();

    if (selected.Mobile())
    Orion.UseObject(selected.Serial())
    Orion.Wait(1000)
        for (var index = 0; index < 25; index++) {
            items.push(Orion.ObjAtLayer(index,selected.Serial()))

        }

    propertiesList.forEach(function (prop) {
        if (prop[1] > 0) {
            prop[1] = 0
        }
    })
    TextWindow.Open()
    TextWindow.Clear()


    items.forEach(function (item) {
    if(item!=null)
    {
        var itemProps = item.Properties().split(/\r?\n/);
        itemProps.forEach(function (prop) {

            propertiesList.forEach(function (propPair) {

                if (Orion.Contains(prop, propPair[0])) {

                    var regex = propPair[0] + "\\s?(\\d+)?";
                    var outcome = prop.match(regex)
                    propertiesList[propertiesList.indexOf(propPair)][1] += parseInt(outcome[1])
                }
            })
        })
        }

    })

    propertiesList.forEach(function (prop) {
        if (prop[1] > 0) {
            TextWindow.Print(prop[0] + ' ' + prop[1])
        }
    })
    Orion.Wait(1000)

}

function SuitHelper() {
    var properties = []
    var selected;
    var selecting = true;
    var items = [];
    while (selecting) {
        selected = SelectTarget();
        if (selected == null) {
            selecting = false
        }
        else if (!selected.Mobile()) {
            items.push(selected)
        }
        else if (selected.Mobile()) {
            items.push(selected)
        }

    }
    while (!Player.WarMode()) {
        propertiesList.forEach(function (prop) {
            if (prop[1] > 0) {
                prop[1] = 0
            }
        })
        TextWindow.Open()


        items.forEach(function (item) {
        Orion.Print(item.Name())
            var itemProps = item.Properties().split(/\r?\n/);
            itemProps.forEach(function (prop) {

                propertiesList.forEach(function (propPair) {

                    if (Orion.Contains(prop, propPair[0])) {

                        var regex = propPair[0] + "\\s?(\\d+)?";
                        var outcome = prop.match(regex)
                        propertiesList[propertiesList.indexOf(propPair)][1] += parseInt(outcome[1])
                    }
                })
            })

        })

        propertiesList.forEach(function (prop) {
            if (prop[1] > 0) {
                TextWindow.Print(prop[0] + ' ' + prop[1])
            }
        })
        Orion.Wait(1000)
    }

}
//#include helpers/Target.js
var propertiesList = [['Antique', 0],
['Assassin Honed', 0],
['Balanced', 0],
['Bane', 0],
['Battle Lust', 0],
['Berserk', 0],
['Blood Drinker', 0],
['Bone Breaker', 0],
['Brittle', 0],
['Casting Focus', 0],
['Chaos Damage', 0],
['Craft Bonus', 0],
['Craft Exceptional bonus', 0],
['Cursed', 0],
['Curse Removal', 0],
['Damage', 0],
['Damage Eater', 0],
['Damage Increase', 0],
['Damage Modifier', 0],
['Defense Chance Increase', 0],
['Dexterity Bonus', 0],
['Durability Bonus', 0],
['Enhance Potions', 0],
['Faster Cast Recovery', 0],
['Faster Casting', 0],
['Hit Area Damage', 0],
['Hit Chance Increase', 0],
['Hit Curse', 0],
['Hit Dispel', 0],
['Hit Fatigue', 0],
['Hit Fireball', 0],
['Hit Harm', 0],
['Hit Life Leech', 0],
['Hit Lightning', 0],
['Hit Lower Attac', 0],
['Hit Lower Defense', 0],
['Hit Magic Arrow', 0],
['Hit Mana Drain', 0],
['Hit Mana Leech', 0],
['Hit Point Increase', 0],
['Hit Point Regeneration', 0],
['Hit Stamina Leech', 0],
['Intelligence Bonus', 0],
['Last Parry Chance', 0],
['Lower Ammo Cost', 0],
['Lower Mana Cost', 0],
['Lower Reagent Cost', 0],
['Lower Requirements', 0],
['Luck', 0],
['Mage Armor', 0],
['Mage Weapon', 0],
['Mana Increase', 0],
['Mana Phase', 0],
['Mana Regeneration', 0],
['Massive', 0],
['Night Sight', 0],
['Prized', 0],
['Random Protection', 0],
['Random Killer', 0],
['Random Summoner', 0],
['Reactive Paralyze', 0],
['Reflect Physical Damage', 0],
['Replenish Charges', 0],
['Physical Resist', 0],
['Fire Resist', 0],
['Cold Resist', 0],
['Poison Resist', 0],
['Energy Resist', 0],
['Resonance', 0],
['Self Repair', 0],
['Skill Bonus', 0],
['Slayer', 0],
['Soul Charge', 0],
['Sparks', 0],
['Spell Channeling', 0],
['Spell Damage Increase', 0],
['Spell Focusing', 0],
['Splintering Weapon', 0],
['Stamina Increase', 0],
['Stamina Regeneration', 0],
['Strength Bonus', 0],
['Swarm', 0],
['Swing Speed Increase', 0],
['Unwieldy', 0],
['Use Best Weapon Skill', 0],
['Velocity', 0],
['Ward Removal', 0],
['Weight Reduction', 0],
['Wildfire Removal', 0]]