//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function DanDar() {
  while (true) {
    Orion.Wait(1000)
    var npc = Orion.FindTypeEx(any, any, ground,
      'mobile', 15, 'yellow|criminal').filter(function (mob) {
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


function BardRange() {
  var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  Orion.ClearFakeMapObjects();

  var target = Player
  var x = target.X();
  var y = target.Y();

  range.forEach(function (distance) {
    Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance).concat()

      .forEach(function (tile) {
        var xDelta = tile.X() - Player.X()
        var yDelta = tile.Y() - Player.Y()
        var sqrt = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta))

        if (sqrt < 15) {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x0197', tile.X(), tile.Y(), tile.Z());

        }
        else {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
      }
      )
  })

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

function getTileData() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');

  var tiles = Orion.GetTiles('land', Player.X(), Player.Y(), 0, 100);
  TextWindow.Print('tile' + tiles.length);
  TextWindow.Print('tile' + tiles[0].Z());
}

function test() {
  TextWindow.Clear()
  TextWindow.Print('watertile')
  Orion.GetTiles(any, 2273, 1032).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
  TextWindow.Print('staticwater')
  Orion.GetTiles('any', 2276, 1053).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
  TextWindow.Print('grass')
  Orion.GetTiles('any', 2276, 1061).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
}


function sell() {
  Orion.Buy('bInscribe');
}
