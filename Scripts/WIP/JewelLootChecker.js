var jewelProperties = [
  //Property('Antique', 0, 0),
  //Property('Cursed', 0, 0),
  Property('Damage Increase', 1, 35),
  Property('Defence Chance Increase', 1, 20),
  Property('Dexterity Bonus', 1, 10),
  Property('Enhance Potions', 5, 35),
  Property('Faster Cast Recovery', 1, 4),
  Property('Faster Casting', 1, 1),
  Property('Hit Chance Increase', 1, 20),
  Property('Intelligence Bonus', 1, 10),
  Property('Lower Mana Cost', 1, 10),
  Property('Lower Reagent Cost', 1, 25),
  Property('Luck', 1, 150),
  Property('Mana Increase', 1, 5),
  Property('Mana Regeneration', 1, 4),
  Property('Night Sight', 0, 0),
  //Property('Prized', 0, 0),
  Property('Physical Resist', 1, 20),
  Property('Fire Resist', 1, 20),
  Property('Poison Resist', 1, 20),
  Property('Cold Resist', 1, 20),
  Property('Energy Resist', 1, 20),
  Property('.*\\s\\+', 1, 20),
  Property('Spell Damage Increase', 1, 18),
  Property('Stamina Increase', 1, 5),
  Property('Strength Bonus', 1, 10),
  Property('Swing Speed Increase', 1, 10)
]

function Property(_name, _low, _high) {
  return {
    name: _name,
    low: _low,
    high: _high,

    Name: function () {
      return this.name;
    },
    Low: function () {
      return this.low;
    },
    High: function () {
      return this.high;
    }
  }
}

function Calculate(item) {
  var propertiesCount = 0
  var maxPropertiesCount = 0
  var value = 0;

  var itemProps = item.Properties().split(/\r?\n/);
  itemProps.forEach(function (singleProp) {

    jewelProperties.forEach(function (prop) {

      var props = item.Properties()
      var regex = prop.Name() + "\\s?(\\d+)?";
      var outcome = singleProp.match(regex)
      if (outcome != null)
        Orion.Print(singleProp + '  ' + outcome.length + '  ' + outcome[1] === undefined)
      if (outcome != null && outcome.length > 1) {
        propertiesCount++
        if (outcome.length > 1 && outcome[1] == prop.High()) {
          maxPropertiesCount++
          Orion.Print(outcome[1])
        }

        if (outcome[1] != null) {
          value += (outcome[1] / prop.High())
          Orion.Print(prop.Name() + ' ' + outcome[1] + '  ' + value)
        }
      }
    });
    return value/propertiesCount
  })

  Orion.Print(item.Name() + propertiesCount + '/' + maxPropertiesCount);
}


function CheckItem(target, loot) {
  if (target == null)
    target = SelectTarget()
  var value = 0
  if (loot)
    value = 1
  else
    value = Calculate(target)

  if (value > 0.95) {
    while (Orion.DisplayTimerExists('hide')) {
      Orion.Wait(1000)
    }
    BotPush(target.Name())
        BotPush(target.Properties())
    Orion.MoveItem(target.Serial(), 0, backpack);
    Orion.Wait(500)
    DoHide()
  }
}

var StartLocation = coordinate(Player.X(),Player.Y())
var jewels = '0x1086|0x1F06|0x108A|0x1F09';
var maps = '0x14EC'
function SuperSmartLooter() {

  var corpses = Orion.FindTypeEx('0x2006', any, 'ground', any, 25);
  while (!Player.Dead()) {
    var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
      'nothumanmobile|live|ignoreself|ignorefriends', 10, 3)
      .filter(function (mob) {
        return mob.Notoriety() >= 3
          && mob.Notoriety() < 7
          && mob.InLOS();
      }).length;

    Orion.Wait(1000)

    if (corpses.length > 0) {
      var corpse = corpses.shift()
      Orion.Print("Walking to " + corpse.Serial())
      var slime = Orion.FindTypeEx(any, any, ground, 'item', 30)
        .filter(function (item) { return Orion.Contains(item.Properties(), 'Slime') })
        .forEach(function (slime) {
          Orion.Print('Slime')
          Orion.AddHighlightCharacter(slime.Serial(), '0x01FF');
          Orion.SetBadLocation(slime.X(), slime.Y())
        })

      WalkTo(corpse, 1);
      Orion.ClearBadLocations();
      Orion.UseObject(corpse.Serial())
      Orion.Wait(1000);
      // var corpseItems = Orion.FindTypeEx(any, any, corpse.Serial());
      Orion.Print('Finding Jewels')

      var jewels = Orion.FindTypeEx('0x1086|0x1F06|0x108A|0x1F09', any, corpse.Serial());
      Orion.Print('Jewels:' + jewels.length)
      jewels.forEach(function (item) {
        CheckItem(item, false)
      }
      )

      var maps = Orion.FindTypeEx('0x14EC', any, corpse.Serial());
      maps.forEach(function (item) { CheckItem(item, true) })

      //var gold = Orion.FindTypeEx('0x0EED', any, corpse.Serial());
     // gold.forEach(function (item) { CheckItem(item, true) })

      Orion.Hide(corpse.Serial())
      Orion.Ignore(corpse.Serial());
    }
    DoHide()
    corpses = Orion.FindTypeEx('0x2006', any, 'ground', any, 25);

    Orion.Wait(1000);
  }

}

function SlimeTest() {

  var slime = Orion.FindTypeEx(any, any, ground, 'item', 10)
    .filter(function (item) { return Orion.Contains(item.Properties(), 'Slime') })
    .forEach(function (slime) {
      Orion.Print(slime.Properties())
      Orion.AddHighlightCharacter(slime.Serial(), '0x01FF');
      Orion.SetBadLocation(slime.X(), slime.Y())
    })
}

function DoHide() {

  if (!Player.Hidden()) {
    Orion.UseSkill('Hiding')
    Orion.AddDisplayTimer('hide', 10000, 'AboveChar');
    Orion.Wait(200)
    Orion.Step(1, false)
  
  if (!Player.Hidden()) {
  WalkTo(StartLocation)
    Orion.ActivateClient()
    Orion.PauseScript()
    }
  }
}
//#include Stealther.js
//#include helpers/Target.js
//#include helpers/Notifier.js