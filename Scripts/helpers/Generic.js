//#include helpers/Debug.js
//#include helpers/Target.js
//#include helpers/Notifier.js

function MonitorLivingStatus() {
  while (true) {
    Orion.Wait(1000)
    if (Player.Dead()) {
      Orion.ActivateClient();
      BotPush('Dead : ' + Player.Name())
      Orion.PlayWav('C:\\Sounds\\Windows Background.wav');
      Orion.Wait(10000)
    }
  }
}
function MonitorGM() {
  while (true) {
    Orion.Wait(1000)
    var npc = Orion.FindTypeEx(any, any, ground,
      'mobile', 20, any).filter(function (mob) {
        return mob.Name() === 'Dan'
      })
    if (npc.length > 0) {
      Orion.ActivateClient();
      BotPush('Detected : ' + npc.Name())
      Orion.PlayWav('C:\\Sounds\\Windows Background.wav');
      Orion.Wait(10000)
    }
  }
}

function UnderworldLeverPuller() {
  var start = coordinate(Player.X(), Player.Y(), Player.Z(), 'start')
  while (true) {
    WalkTo(start)
    Orion.Wait(2000)
    var npc = Orion.FindTypeEx(any, any, ground,
      'any', 30, any).filter(function (mob) {
        return mob.Properties() == "A Lever"
      }).forEach(function (mob) {
        WalkTo(mob)
        Orion.Wait(300)
        Orion.UseObject(mob.Serial())
      })

    //ord/anord
    Orion.FindTypeEx('0x19AB', any, ground,
      'any', 30, any).forEach(function (flame) {
        WalkTo(flame)
        Orion.Say("ord")
        Orion.Say("anord")
      })
  }
}

function ShowWarCreature() {
  while (true) {
    Orion.Wait(100)
    var npc = Orion.FindTypeEx(any, any, ground,
      'mobile', 20, any).filter(function (mob) {
        return mob.WarMode()
      }).forEach(function (mob) {

        Orion.AddHighlightCharacter(mob.Serial(), '0x4444');
        Orion.PrintFast(mob.Serial(), 1, 1, "War")
      })
    Orion.FindTypeEx(any, any, ground,
      'mobile|ignoreself', 20, any).filter(function (mob) {
        return !mob.WarMode()
      }).forEach(function (mob) {
        Orion.PrintFast(mob.Serial(), 2, 1, "No War")

        Orion.RemoveHighlightCharacter(mob.Serial());
      })
  }
}




function DrawLOS() {
  Orion.SetLOSOptions('ignoredestpos');
  while (true) {
    Orion.ClearFakeMapObjects();

    var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    var target = Player
    var x = target.X();
    var y = target.Y();

    range.forEach(function (distance) {
      Orion.GetTilesInRect('land', x - distance, y - distance, -10, x + distance, y + distance, 255).concat()

        .forEach(function (tile) {
          if (Orion.InLOS(Player.X(), Player.Y(), Player.Z(), tile.X(), tile.Y(), tile.Z())) {
            Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', tile.Z(), tile.X(), tile.Y(), tile.Z() + 1);

          }
          else {
            //Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
          }
        }
        )
    })
    Orion.Wait(200)
  }
}


function PrintArrow() {
  while (true) {
    Orion.Wait(2000)
    Orion.Print(Orion.QuestArrowPosition().X() + "  " + Orion.QuestArrowPosition().Y())
    Orion.Print('Distance: ' + Orion.GetDistance(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y()))
  }
}