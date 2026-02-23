//#include helpers/Target.js
//#include helpers/Movement.js
//#include helpers/Debug.js
function CheckHildebrandtEggs()
{
    var CommonHues = [31,40,61,96,101,111,689,718,996,1150,1151,1154,1161,1166,1170,1171,1194];
    var UncommonHues = [1259,1254,1266,1271,1278,1281,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920];
    var RareHues = [2500,2076,2601,2605,2713,2744,2745,2753,2755,2759,2764,2766,2767,2768,2770];
    var VeryRareHues = [2771,2772,2773,2775,2776,2778,2781,2783,2784,2785];

TextWindow.Open()
    var items = Orion.FindType('any', -1, 'backpack');

    if (!items || items.length == 0)
    {
        TextWindow.Print("Backpack empty.");
        return;
    }

    for (var i = 0; i < items.length; i++)
    {
        var obj = Orion.FindObject(items[i]);

        if (obj && obj.Name() == "Hildebrandt Dragon Egg")
        {
            var hexColor = obj.Color();     // Example: 0x09C4
            var hue = parseInt(hexColor);   // Converts hex to decimal

            var rarity = "Unknown";

            if (CommonHues.indexOf(hue) != -1)
                rarity = "Common";
            else if (UncommonHues.indexOf(hue) != -1)
                rarity = "Uncommon";
            else if (RareHues.indexOf(hue) != -1)
                rarity = "Rare";
            else if (VeryRareHues.indexOf(hue) != -1)
                rarity = "Very Rare";

            TextWindow.Print(
                "Serial: " + obj.Serial() +
                " | Hex: " + hexColor +
                " | Dec: " + hue +
                " | Rarity: " + rarity
            );
        }
    }
}


function ShowJournal() {
  Orion.ShowJournal()
}
function aaSpell() {
  var t = SelectTarget()
  //var t = Orion.FindTypeEx(any,any,ground, 'mobile|ignoreself',10, 'grey').shift()
  Orion.CastTarget('Teleport', t.Serial())
  //Orion.UseSkillTarget('aNIMAL tAMING', t.Serial())
}

function testColours() {
  for (i = 0; i < 90; i++) {
    Orion.Print(i, "value;" + i)
    Orion.Wait(150)
  }
}

function FindItemByName() {
  Orion.Print('What are you looking for')
  var text = Orion.InputText();
  Orion.FindTypeEx(any, any, ground, 'item', 25)
    .filter(function (item) { return Orion.Contains(item.Properties(), text) })
    .forEach(function (item) {
      Orion.AddFakeMapObject(Orion.Random(10000), item.Graphic(), '0xff00', item.X(), item.Y(), item.Z() + 2);
      Orion.Print('found ' + item.Name())
      WalkTo(item)
      Orion.UseObject(item.Serial())
    });
}

function WalkInLoop() {
  SetLocations()
  while (true) {
    LocationLoop()
    Orion.Wait(2000)
  }
}
var herding = []
function HerdEverything() {

  var crook = Orion.FindTypeEx('0x0E81|0x13F5', any, backpack | Player.Serial()).shift();
  Orion.Print(crook.Serial())
  while (crook != null) {
    Orion.Wait(1000)
    while (!Player.WarMode()) {
      var npc = Orion.FindTypeEx(any, any, ground,
        'nothuman|ignoreself|mobile|inlos', 10, 'gray|criminal')
      //  .filter(function (mob) {
      //     return Orion.Contains(mob.Properties(), 'Tameable') && mob.Distance() > 2
      //    })
      npc.forEach(function (npc) {
        if (herding.indexOf(npc.Serial()) == -1) {
          Orion.Print(npc.Name())
          Orion.UseObject(crook.Serial());
          if (Orion.WaitForTarget(1500)) {
            Orion.AddHighlightCharacter(npc.Serial(), '0x0Fff');
            Orion.Print('Select npc')
            Orion.TargetObject(npc.Serial())
          }
          if (Orion.WaitForTarget(500)) {
            Orion.Print('Select player')
            Orion.TargetObject(Player.Serial())
            herding.push(npc.Serial())
          }
          Orion.Wait(500)
        }
      })
      Orion.Wait(500)
    }
  }
}

function ShowTime() {
  while (true) {
    Orion.Wait(1000)
    Orion.PrintFast(Player.Serial(), 43, 0, Orion.Time('ss'))
  }
}

function SpellTimer() {
  var total = 0
  var count = 0
  while (true) {
    Orion.Wait(2000)
    var start = Orion.Now()
    Orion.Cast("Magic Arrow")
    if (Orion.WaitForTarget(3000)) {
      var fin = Orion.Now()
      count++
      total += fin - start
      Orion.Print(Orion.GetPing('avg'))
      Orion.Print('AvgTime:' + (total / count))
      Orion.CancelTarget()
    }
  }
}


function Tracking() {
  TextWindow.Open()
  var count = 0
  var found = 0
  while (!Player.Dead()) {
    var Gump;
    Orion.UseSkill("Tracking");
    Orion.Wait(500);
    Gump = Orion.GetLastGump();
    Gump.Select(Orion.CreateGumpHook(2));
    Orion.Wait(1000);
    Gump = Orion.GetLastGump();
    count++
    if (Gump.TextList().indexOf('grubber') != -1) {
      Orion.Print(39, 'found grubber')

    }
    Orion.Wait(3000);

    Gump.Close()
    Orion.Wait(6000);
  }
  Orion.Wait(1000);
}

