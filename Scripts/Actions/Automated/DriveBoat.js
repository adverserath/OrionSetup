//#include helpers/Target.js
//#include helpers/Map.js
//#include helpers/PathFinding.js
//#include helpers/Debug.js

var scale = 16
var gridscale = 0;
var vessel = ['Tiller Man', 'Wheel']

function RelogAtten() {
  Orion.Relogin('Atten')
}

function DriveBoatTo() {
  Debug(' Method Entry - DriveBoatTo')
  Orion.Print('Enter X')
  var x = Orion.InputText();
  Orion.Print('Enter Y')
  var y = Orion.InputText();
  SteerTo(x, y)
}

function DriveBoatToMapPoint() {
  Debug(' Method Entry - DriveBoatToMapPoint')
  var pos = Orion.GetWorldMapPointerPosition();
  SteerTo(pos.X(), pos.Y())
}



function SteerTo(x, y, distance) {
  Debug(' Method Entry - SteerTo')
  var path = GetAStar(x, y)
  SteerPath(path, distance, x, y)
}

function GetAStar(xLocation, yLocation) {
  Debug(' Method Entry - GetAStar')
  TextWindow.Open()
  Orion.ClearFakeMapObjects();
  var coordinates = []
  var graph = new Graph(map);
  var start = graph.nodes[parseInt(Player.Y() / scale)][parseInt(Player.X() / scale)];
  var end = graph.nodes[parseInt(yLocation / scale)][parseInt(xLocation / scale)];
  var result = astar.search(graph.nodes, start, end, astar.manhattan);
  TextWindow.Print('Player X:' + Player.X() + ' Player Y:' + Player.Y())

  result.forEach(function (tile) {

    TextWindow.Print('X:' + tile.y * scale + ' Y:' + tile.x * scale)
    var X = tile.y * scale
    var Y = tile.x * scale
    coordinates.push(coordinate(X, Y))
    Orion.AddFakeMapObject(X.toString() + Y.toString(), '0x09CC', '', X, Y, 5);
    Orion.SetWorldMapPointerPosition(X, Y)
    Orion.Wait(30)
  })
  return coordinates
}

var steerSize = 20;
var boat = null
function SteerPath(route, distance, destinationX, destinationY) {
  Orion.SetWorldMapPointerPosition(destinationX, destinationY)

  Debug(' Method Entry - SteerPath')
  if (distance == null) {
    distance = 16
  }

  boat = FindGroundItemWithProperties(vessel)

  StartDrivingBoat();

  for (var index = 0; index < route.length; index++) {
    if (Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()) < distance) {
      TextWindow.Print('Close enough')
      break;
    }

    Orion.Print('Sailing to index ' + index + '/' + route.length)
    var target = route[index];

    //STOP when within 55 tiles of chest (fishable at 60)
    if (Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()) > distance) {
      var timerLoop = Orion.Now() + 10000
      while (
        ((Player.X() > (target.X() + steerSize) ||
          Player.X() < (target.X() - steerSize)) ||
          (Player.Y() > (target.Y() + steerSize) ||
            Player.Y() < (target.Y() - steerSize))) &&
        Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()) > distance &&
        (timerLoop > Orion.Now())
      ) {
        var lastLoopTime = Orion.Now()
        var targetDirection = GetDirection(target)
        TextWindow.Clear();
        TextWindow.Print('Player ' + Player.X() + ' ' + Player.Y())
        TextWindow.Print('To ' + target.X() + ' ' + target.Y())
        TextWindow.Print('Destination X:' + destinationX + ' Y:' + destinationY)
        TextWindow.Print('Dir ' + targetDirection)
        TextWindow.Print('Todo ' + (route.length - index))
        TextWindow.Print('Distance:' + Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()))
        Orion.SailOnBoat(targetDirection, true)
        for (var time = 0; time < 10; time++) {
          CheckForOrcs(targetDirection)
          var distanceTo = Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y())
          if (distanceTo > distance) {
            var waitTime = parseInt(distance * 100)
            //Orion.Print(waitTime)
            Orion.Wait(waitTime)
            TextWindow.Print('Distance:' + distanceTo)
          }
          break;
        }
        ////CHECK FOR STOPED MESSAGE
        var haveStopped = Orion.InJournal('stopped sir', '', '0', '-1', lastLoopTime, Orion.Now()) != null;
        if (haveStopped) {
          s__DealWithBlock(boat)
          index++
        }
        lastLoopTime = Orion.Now()
      }
      timerLoop = Orion.Now() + 10000
      Orion.Print('Stop ' + index)
      Orion.StopSailOnBoat()
    }
  }
  Orion.Print('Finish ' + index)

  Orion.Wait(1000);
  StopDrivingBoat();

  Orion.SetWorldMapPointerPosition(Player.X(), Player.Y(), 'Current', true)

}
function StopDrivingBoat() {
  Orion.StopSailOnBoat();
  var startTime = Orion.Now();
  while (Orion.InJournal('You are no longer piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    Orion.Print('Trying to stop steering');
    Orion.UseObject(boat.Serial());
    Orion.Wait(700);
  }
}

function StartDrivingBoat() {
  var startTime = Orion.Now();
  while (Orion.InJournal('You are now piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    //var hold = FindGroundItemWithName(["Cargo Hold"])
    if (boat == null)
      boat = FindGroundItemWithProperties(vessel);
    Orion.Print(boat.Serial());
    WalkTo(boat, 2);
    Orion.UseObject(boat.Serial());
    Orion.Wait(700);
  }
  return startTime;
}

function s__DealWithBlock(boat) {
  var startTime = Orion.Now()

  StopDrivingBoat()

  // var tiles = Orion.FindTypeEx('0x9253|0x9145|0x920A|0x9231|0x91CC|0x90BE', any, ground,
  //   'item', 18)
  //   .sort(function (p1, p2) {
  //     return p2.Distance() - p1.Distance()
  //   });
  // var tile = tiles.shift()
  // if (tile != null) {
  //   Orion.SetTrack(true, tile.X(), tile.Y());
  Orion.Cast('Dispel Evil')

  var monsters = GetAllTarget(12)
  if (monsters.length > 0) {
    monsters.forEach(function (mob) {
      Orion.PrintFast(mob.Serial(), 58, 1, 'problem');
      Orion.Attack(mob.Serial())
      Orion.Wait(100)
    })
    while(GetAllTarget(12).length>0)
    {
      Orion.Wait(2000)
      Orion.Print("wait for no monsters")
    }
  }
  //GoAround
  else {
    Orion.Say("back")
    Orion.Wait(5000)
    Orion.Say("left")
    Orion.Wait(5000)
    Orion.Say("forward")
    Orion.Wait(5000)
    Orion.Say("stop")
  }
  StartDrivingBoat()
}

function SteerToObject(target, distance) {
  Debug(' Method Entry - SteerToObject')
  if (distance == null || distance < 2) {
    distance = 2
  }
  var boat = FindGroundItemWithProperties(vessel)
  WalkTo(boat, 2)

  Orion.Print(boat.Serial())
  var startTime = Orion.Now()
  while (Orion.InJournal('You are now piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    WalkTo(boat)
    Orion.UseObject(boat.Serial())
    Orion.Wait(1000)
  }

  if (Orion.GetDistance(target.X(), target.Y()) > distance) {
    while ((Player.X() > (target.X() + distance) || Player.X() < (target.X() - distance)) ||
      (Player.Y() > (target.Y() + distance) || Player.Y() < (target.Y() - distance))) {

      Orion.SailOnBoat(GetDirection(target), true)
      Orion.Wait(800)
      Orion.StopSailOnBoat()
    }
  }

  Orion.Wait(1000);
  Orion.StopSailOnBoat()
  startTime = Orion.Now()
  while (Orion.InJournal('You are no longer piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    Orion.UseObject(boat.Serial())
    Orion.Wait(1000)
  }
  WalkTo(boat)

}

function GetDirection(item) {
  Debug(' Method Entry - GetDirection')
  var x = item.X()
  var y = item.Y()
  var dx = Player.X() - x;
  var dy = Player.Y() - y;

  var rx = (dx - dy) * 44;
  var ry = (dx + dy) * 44;

  var ax = Math.abs(rx);
  var ay = Math.abs(ry);

  var ret;

  if ((ay >> 1) - ax >= 0) {
    ret = ry > 0 ? 'nw' : 'se';
  }
  else if ((ax >> 1) - ay >= 0) {
    ret = rx > 0 ? 'sw' : 'ne';
  }
  else if (rx >= 0 && ry >= 0) {
    ret = 'w';
  }
  else if (rx >= 0 && ry < 0) {
    ret = 's';
  }
  else if (rx < 0 && ry < 0) {
    ret = 'e';
  }
  else {
    ret = 'n';
  }

  return ret;
}

function GetWaterMapDump() {
  Debug(' Method Entry - GetWaterMapDump')
  DumpMapToText(5105, 4096)
}
function DumpMapToText(x, y) {
  Debug(' Method Entry - DumpMapToText')
  gridscale = scale * scale;
  Orion.ClearFakeMapObjects();

  var destX = parseInt(x / scale)
  var destY = parseInt(y / scale)
  var startX = parseInt(Player.X() / scale)
  var startY = parseInt(Player.Y() / scale)

  TextWindow.Print('From:' + startX + '  ' + startY)
  TextWindow.Print('To:' + destX + '  ' + destY)
  if (x < Player.X())
    x = Player.X()
  if (y < Player.Y())
    y = Player.Y()


  var xScale = parseInt(x / scale)
  var yScale = parseInt(y / scale)

  //Create blank array
  for (var iy = 0; iy < yScale; iy++) {
    grid.push([])
    for (var ix = 0; ix < xScale; ix++) {
      //   TextWindow.Print('area:'+ix + '  '+ iy)
      var aw = IsAllWater(ix, iy)
      // TextWindow.Print(aw)
      grid[iy].push(aw)
    }
    Orion.Print(iy)
  }
  var newFile = Orion.NewFile();
  newFile.Append('16xWater.conf');
  newFile.WriteLine(JSON.stringify(grid))
  newFile.Close();
}

function IsAllWater(fromX, fromY) {
  Debug(' Method Entry - IsAllWater')
  fromX = fromX * scale
  fromY = fromY * scale
  var waterTiles = Orion.GetTilesInRect('land', fromX, fromY, fromX + scale, fromY + scale)
    .filter(function (t1) {

      return t1.Flags() == 192 && Orion.GetTiles('any', t1.X(), t1.Y()).length == 0
    })

  if (waterTiles.length == gridscale) {
    return 0
  }
  return 1
}

function SailToCorpse(checkOnly) {

  Debug(' Method Entry - SailToCorpse')
 
  var corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 8);
  while (corpses.length == 0 && !checkOnly) {
    Orion.Wait(1000)
    corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 8);
  }
  var startX = Player.X()
  var startY = Player.Y()
  corpses.forEach(function (corpse) {

    SteerToObject(corpse, 2)
    WalkTo(corpse, 2, 4000, 1, false)
    Orion.UseObject(corpse.Serial())
    Orion.Ignore(corpse.Serial())
    Orion.Wait(2000)
    var hold = FindGroundItemWithName(["Cargo Hold"])

    if (hold.Distance() > 1) {
      WalkTo(hold, 2, 4000, 1, false)
    }
    SteerToObject(coordinate(startX, startY), 1)
  })
}


function GetAllTarget(range) {
  return Orion.FindTypeEx(any, any, ground,
      'nothumanmobile|live|ignoreself|ignorefriends', range, 'gray|criminal|red|enemy')
}

function CheckForOrcs(currentDirction)
{
  var orcs = GetAllTarget(25)//.filter(function (mob){return Orion.Contains(mob.Name(),'orc')})
  if(orcs.length>0)
  {
    var anyOrcDirection = GetDirection(orcs[0])
    if(anyOrcDirection===currentDirction)
    {
      Orion.Print(38, 'Oh No Orcs! Dead ahead: '+anyOrcDirection)

      StopDrivingBoat()
        Orion.Say("back")
        Orion.Wait(3000)
        Orion.Say("left")
        Orion.Wait(8000)
        Orion.Say("forward")
        Orion.Wait(8000)
        Orion.Say("stop")
      
      StartDrivingBoat()
    }
    Orion.Print(38, 'Oh No Orcs! Direction: '+anyOrcDirection)
  }
}