function testColours() {
  for (i = 0; i < 90; i++) {
    Orion.Print(i, "value;" + i)
    Orion.Wait(150)
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
        .filter(function (mob) {
          return Orion.Contains(mob.Properties(), 'Tameable') && mob.Distance() > 2
        })
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
    if (Gump.TextList().indexOf('grubber')!=-1) {
      Orion.Print(39,'found grubber')

    }
    Orion.Wait(3000);

    Gump.Close()
    Orion.Wait(6000);
  }
  Orion.Wait(1000);
}

