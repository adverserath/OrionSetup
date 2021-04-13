//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Debug.js
function RecordFoundChest(chest) {
  if (chest != null) {
    var newFile = Orion.NewFile();
    newFile.Append('TreasureChestsFound.conf');
    newFile.WriteLine(JSON.stringify(
      {
        x: chest.X(),
        y: chest.Y(),
        z: chest.Z(),
        X: function () {
          return this.x;
        },
        Y: function () {
          return this.y;
        },
        Z: function () {
          return this.z;
        }
      }))
    newFile.Close();
  }
}

function StayHidden() {
  while (true) {
    if (!Player.Hidden()) {
      Orion.StopWalking();
      var resumeWD = false;
      var resumeSFHD = false;
      if (Orion.ScriptRunning('WanderDungeon') > 0) {
        Orion.PauseScript('WanderDungeon');
        resumeWD = true;
      }
      if (Orion.ScriptRunning('SearchForHiddenChests') > 0) {
        Orion.PauseScript('SearchForHiddenChests');
        resumeSFHD = true;
      }
      BotPush('Not Hiding')
      Orion.Wait(100);   
      Orion.UseSkill('Hiding')
      Orion.Wait(300)
      if(resumeWD&&Player.Hidden()){
        Orion.ResumeScript('WanderDungeon');
      }
      if(resumeWD&&Player.Hidden()){
        Orion.ResumeScript('SearchForHiddenChests');
      }
    }
    Orion.Wait(300)
  }
}

function CreatePath(_private) {
  Orion.ClearFakeMapObjects();
  var pathLocation = SelectCoordinate();
  if (pathLocation != null) {
    var newFile = Orion.NewFile();
    newFile.Open('TreasurePath.conf');
  }
  while (pathLocation != null) {
    pathLocation = SelectCoordinate();
    if (pathLocation != null) {
      Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', pathLocation.X(), pathLocation.Y(), pathLocation.Z());
      TextWindow.Print(JSON.stringify(pathLocation));
      newFile.WriteLine(JSON.stringify(pathLocation));
    }
  }
  newFile.Close();
}

function ReadPath(_private) {
  var locations = []
  var file = Orion.NewFile();

  file.Open('TreasurePath.conf');
  if (file != null) {
    var i = 0;
    var location = '1'
    while (location != null && location) {
      TextWindow.Print(i++)
      location = file.ReadLine();
      if (location != null && location) {
        TextWindow.Print(location)
        var coord = JSON.parse(location);
        var loc = {
          x: coord.x,
          y: coord.y,
          z: Player.Z(),
          X: function () {
            return this.x;
          },
          Y: function () {
            return this.y;
          },
          Z: function () {
            return this.z;
          }
        }
        locations.push(loc);
      }
    }
  }
  file.Close();
  return locations;
}

function WanderDungeon(_private) {
  var path = ReadPath()
  var foundStart = false;
  var startingRef = 0;
  while (true) {
    Orion.Wait(100);
    path.forEach(function (location) {
      if (!foundStart) {
        Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', location.X(), location.Y(), location.Z());
        Orion.Wait(100);
        startingRef++;
        if (Orion.GetDistance(location.X(), location.Y()) < 15) {
        Orion.Print('Starting from point: '+startingRef)
		  foundStart = true;
          Orion.Wait(1000);
        }
      }
      else {
        WalkTo(location, 1, 40000, 0);
        WalkTo(location, 1, 40000, 0);
      }
    })
  }
}

var startingLocation;
var lootbag;
function GetStartUp() {
  var file = Orion.NewFile();

  file.Open('TreasureStartup.conf');
  var startingLocationFile = file.ReadLine();
  var lootbagFile = file.ReadLine();
  file.Close();
  startingLocation = SelectCoordinate('Select location to goto at end');
  if (startingLocation != null) {
    Orion.Wait(200);
    var newFile = Orion.NewFile();
    newFile.Open('TreasureStartup.conf');
    newFile.WriteLine(JSON.stringify(startingLocation) + ' ');
    lootbag = SelectTarget('Select lootbag');
    newFile.WriteLine(lootbag.Serial() + ' ');
    newFile.Close();
  }
  else {
    Orion.Print('loading')
    Orion.Print(startingLocationFile);
    var coord = JSON.parse(startingLocationFile);
    startingLocation = {
      x: coord.x,
      y: coord.y,
      z: Player.Z(),
      X: function () {
        return this.x;
      },
      Y: function () {
        return this.y;
      },
      Z: function () {
        return this.z;
      }
    }


    lootbag = Orion.FindObject(lootbagFile);
  }
  Orion.Print(startingLocation.X() + ' ' + startingLocation.Y())
  Orion.Print(lootbag.Serial())
}
function SearchForHiddenChests() {

  GetStartUp()

  Orion.ToggleScript('WanderDungeon');
  Orion.ToggleScript('StayHidden');
  while (Player.Weight() < (Player.MaxWeight() - 15)) {
    var startCastTime = Orion.Now()

    Orion.Wait(300)
    if (!Orion.DisplayTimerExists('dh')) {
      Orion.UseSkillTarget('Detecting Hidden', self)
      Orion.AddDisplayTimer('dh',
        10000,
        'Top', 'Circle', 'Detect Hidden', 0, 0,
        'any', -1, '0x0000FFFE');
    }
    Orion.Wait(200)
    //0x0AB9
    var chestIds = Orion.FindTypeEx(
      '0x0E42|0x0E40|0x0E3C|0x0E77|0x0E3E|0x0E7E|0x0E41|0x0E3D|0x09AB|0x0E7C|0x0E7F|0x0E43|0x0E3F'
      , '0x0AB9', any, any, 40).filter(function (chest) {
        return !chest.Ignored();
      }).filter(function (chest) {
        return ((chest.Properties().match(/contents/gi) || []).length) == 0
      });
    if (chestIds.length > 0) {
      Orion.Print(chestIds.length)
    }
    if (Orion.InJournal('keen senses', '', '0', '-1', startCastTime, Orion.Now()) != null || chestIds.length != 0) {
      Orion.PauseScript('WanderDungeon');
      Orion.StopWalking();
      if (chestIds.length == 0) {
if (!Orion.DisplayTimerExists('dh')) {
      Orion.UseSkillTarget('Detecting Hidden', self)
      }
        var chestIds = Orion.FindTypeEx(
          '0x0E42|0x0E40|0x0E3C|0x0E77|0x0E3E|0x0E7E|0x0E41|0x0E3D|0x09AB|0x0E7C|0x0E7F|0x0E43|0x0E3F'
          , '0x0AB9', any, any, 40).filter(function (chest) {
            return !chest.Ignored();
          }).filter(function (chest) {
            return ((chest.Properties().match(/contents/gi) || []).length) == 0
          });
      }
      if (chestIds.length > 0) {
        Orion.Print('open chest')
        var chest = chestIds.shift()
        var chestId = chest.Serial()
        Orion.AddFakeMapObject(chestId, chest.Graphic(), '0x35', chest.X(), chest.Y(), chest.Z() + 5);
        Orion.Print('X:' + chest.X(), 'Y:' + chest.Y(), '   Z:' + chest.Z())
        WalkTo(chest, 1, 40000, 0);
        WalkTo(chest, 1, 40000, 0);
        startCastTime = Orion.Now();
        if (Orion.GetDistance(chest.Serial()) < 2) {
        BotPush('Found Chest')
          while (Orion.InJournal('yields|not appear', '', '0', '-1', startCastTime, Orion.Now()) == null) {
            Orion.Wait(1000)
            WalkTo(chest, 1, 40000, 0);
            Orion.UseType('0x14FC', '0xFFFF')
            if (Orion.WaitForTarget(1000)) {
              Orion.TargetObject(chest.Serial());
            }
          }
          Orion.Wait(2000);
          startCastTime = Orion.Now();
          while (Orion.InJournal('harmless', '', '0', '-1', startCastTime, Orion.Now()) == null) {
            Orion.UseSkillTarget('Remove Trap', chest.Serial())
            Orion.Wait(1000);
            if (Orion.InJournal('harmless', '', '0', '-1', startCastTime, Orion.Now()) == null) {
              Orion.Wait(10000);
            }
          }
          Orion.UseObject(chest.Serial())
          Orion.Wait(600)
          MoveItems(chest, lootbag, any, any)
          Orion.Wait(100)
          MoveItems(chest, lootbag, any, any)
          Orion.Wait(600)
        }
      }
      RecordFoundChest(chest)
      Orion.ResumeScript('WanderDungeon');
    }
    var distance = 4
    Orion.ClearFakeMapObjects();

    var target = Orion.FindObject(Player.Serial())
    var x = target.X();
    var y = target.Y();

    Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance)
      .filter(function (tile) {
        return BorderEdge(x, y, tile, distance);
      })
      .forEach(function (tile) {
        Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
      }
      )
  }
  Orion.StopWalking();
  if (Orion.ScriptRunning('WanderDungeon') != 0) {
    Orion.ToggleScript('WanderDungeon');
  }
  BotPush('Full')
  WalkTo(startingLocation, 1, 120000, 0)

  if (Orion.ScriptRunning('StayHidden') != 0) {
    Orion.ToggleScript('StayHidden');
  }

}