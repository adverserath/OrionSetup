//#include helpers/Debug.js
//#include helpers/Target.js
//#include helpers/Notifier.js

function DanDar() {
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

function DrawLOS() {
  Orion.SetLOSOptions('ignoredestpos');
  while (true) {
    Orion.ClearFakeMapObjects();

    var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    var target = Player
    var x = target.X();
    var y = target.Y();

    range.forEach(function (distance) {
      Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance).concat()

        .forEach(function (tile) {
          if (Orion.InLOS(Player.X(), Player.Y(), Player.Z(), tile.X(), tile.Y(), tile.Z())) {
            Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x0197', tile.X(), tile.Y(), tile.Z());

          }
          else {
            Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
          }
        }
        )
    })
    Orion.Wait(1000)
  }
}



function NotEnoughResourcesGump() {
  TextWindow.Open();
  var output = Orion.GetLastGump();//.foreach(function (cmd){
  var value = output.CommandList().filter(function (text) {
    TextWindow.Print(text.search('1044155|1044154'));

    return text.search('1044155|1044154') >= 0;

  })
  TextWindow.Print(value);

}

var debug = true;

function getFlags() {
  var a = Orion.InfoContextMenu()
  TextWindow.Print(a.trim());
}

function DropAndLock() {
  var t = SelectTarget()
  Orion.DragItem(t.Serial());
  Orion.Wait(200)
  Orion.DropDraggedItemRelative(1, 0)
  Orion.Wait(200)
  Orion.Say("I wish to secure this")
  if (Orion.WaitForTarget()) {
    Orion.TargetObject(t.Serial())
  }
}

function PrintArrow() {
  while (true) {
    Orion.Wait(2000)
    Orion.Print(Orion.QuestArrowPosition().X() + "  " + Orion.QuestArrowPosition().Y())
  }
}