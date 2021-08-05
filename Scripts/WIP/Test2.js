var herding = []
function HerdEverything() {
  var crook = Orion.FindTypeEx('0x0E81|0x13F5', any, backpack | Player.Serial()).shift();
  Orion.Print(crook.Serial())
  while (crook != null) {
    var npc = Orion.FindTypeEx(any, any, ground,
      'nothuman|ignoreself|mobile', 14, 'gray|criminal')
      .filter(function (mob) {
        return true || mob.Properties().indexOf('Tameable') !== -1
      })
    npc.forEach(function (npc) {
      if (herding.indexOf(npc.Serial()) == -1) {
      Orion.Print(npc.Name())
        Orion.UseObject(crook.Serial());
        if (Orion.WaitForTarget(1500)) {
          Orion.AddHighlightCharacter(npc.Serial(), '0x00ff');
          Orion.Print('Select npc')
          Orion.TargetObject(npc.Serial())
        }
        if (Orion.WaitForTarget(500)) {
          Orion.Print('Select player')
          Orion.TargetObject(Player.Serial())
          herding.push(npc.Serial())
        }
        Orion.Wait(1500)
      }
    })
    Orion.Wait(1000)
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
    Gump.Select(Orion.CreateGumpHook(4));
    Orion.Wait(1000);
    Gump = Orion.GetLastGump();
    count++
    Orion.Print(Gump.Text(0))
    if (Gump.Text(0) === 'ningar') {
      found++
      TextWindow.Print('found :' + found + '/' + count)

    }
    TextWindow.Print(found / count)

    Gump.Close()
    Orion.Wait(9000);
  }
  Orion.Wait(1000);
}

