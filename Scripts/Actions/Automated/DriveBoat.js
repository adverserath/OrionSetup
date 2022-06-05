//#include helpers/Target.js
//#include helpers/Map.js
//#include helpers/PathFinding.js
//#include helpers/Debug.js

var scale = 16
var gridscale = 0;
var vessel = 'Tiller Man'

function DriveBoatTo() {
	Debug(' Method Entry - DriveBoatTo')
  Orion.Print('Enter X')
  var x = Orion.InputText();
  Orion.Print('Enter Y')
  var y = Orion.InputText();
  SteerTo(x, y)
}

function SteerTo(x, y, distance) {
	Debug(' Method Entry - SteerTo')
  var path = GetAStar(x, y)
  SteerPath(path, distance, x , y)
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
  })
  return coordinates
}

var steerSize = 20;
function SteerPath(route, distance, destinationX, destinationY) {
	Debug(' Method Entry - SteerPath')
  if (distance == null) {
    distance = 16
  }

  var startTime = Orion.Now()
  while (Orion.InJournal('You are now piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    var boat = FindGroundItemWithName([vessel])
    var hold = FindGroundItemWithName(["Cargo Hold"])

    WalkTo(boat)
    Orion.UseObject(boat.Serial())
    Orion.Wait(1000)
  }
  for (var index = 0; index < route.length; index++) {
    var target = route[index];
    Orion.Print('next')
    //        while (Player.X() < (target.X() - 2) || Player.X() > (target.X() + 2) &&
    //           Player.Y() < (target.Y() - 2) || Player.Y() > (target.Y() + 2)) {
    //STOP when within 55 tiles of chest (fishable at 60)
    if (Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()) > distance) {
      while ((Player.X() > (target.X() + steerSize) || Player.X() < (target.X() - steerSize)) ||
        (Player.Y() > (target.Y() + steerSize) || Player.Y() < (target.Y() - steerSize))) {
        TextWindow.Clear();
        TextWindow.Print('Player ' + Player.X() + ' ' + Player.Y())
        TextWindow.Print('To ' + target.X() + ' ' + target.Y())
        TextWindow.Print('Destination X:' + destinationX + ' Y:' + destinationY)
        TextWindow.Print('Dir ' + GetDirection(target))
        TextWindow.Print('Todo ' + (route.length - index))
        TextWindow.Print('Distance:' + Orion.GetDistance(route[(route.length - 1)].X(), route[(route.length - 1)].Y()))
        Orion.SailOnBoat(GetDirection(target), true)
        Orion.Wait(2000)
        Orion.StopSailOnBoat()
      }
    }
  }
  Orion.Wait(1000);
  Orion.StopSailOnBoat()
  startTime = Orion.Now()
  while (Orion.InJournal('You are no longer piloting', '', '0', '-1', (startTime), Orion.Now()) == null) {
    Orion.Print('Trying to stop steering')
    Orion.UseObject(boat.Serial())
    Orion.Wait(2000)
  }
}


function SteerToObject(target, distance) {
	Debug(' Method Entry - SteerToObject')
  if (distance == null || distance < 2) {
    distance = 2
  }
  var boat = FindGroundItemWithName([vessel])

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
	                var corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 2);

                var startX = Player.X()
                corpses.forEach(function (corpse) {
                    if (corpse.Y() < Player.Y()) {
                        Orion.Say('forward')
                        while (corpse.Y() < Player.Y()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                    else if (corpse.Y() > Player.Y()) {
                        Orion.Say('back')
                        while (corpse.Y() > Player.Y()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                    Orion.Wait(200)

                    if (corpse.X() < Player.X()) {
                        Orion.Say('left')
                        while (corpse.X() < Player.X()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                    else if (corpse.X() > Player.X()) {
                        Orion.Say('right')
                        while (corpse.X() > Player.X()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                    WalkTo(corpse);
                    Orion.UseObject(corpse.Serial())
                    Orion.Ignore(corpse.Serial())
                    Orion.Wait(2000)
                    //OpenAnyMiBs()
                    if (startX < Player.X()) {
                        Orion.Say('left')
                        while (startX < Player.X()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                    else if (startX > Player.X()) {
                        Orion.Say('right')
                        while (startX > Player.X()) {
                            Orion.Wait(50)
                        }
                        Orion.Say('stop')
                    }
                });
  //Wait for corpse
//  var corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 8);
//  while (corpses.length == 0 && !checkOnly) {
//    Orion.Wait(1000)
//    corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 8);
//  }
//  var startX = Player.X()
//  var startY = Player.Y()
//  corpses.forEach(function (corpse) {
	
//    SteerToObject(corpse, 2)
//    WalkTo(corpse,2,4000)
//    Orion.UseObject(corpse.Serial())
//    Orion.Ignore(corpse.Serial())
//    Orion.Wait(2000)
//   var hold = FindGroundItemWithName(["Cargo Hold"])

//    if(hold.Distance()>1)
//    {
//      WalkTo(hold)
//    }
//    SteerToObject(coordinate(startX, startY), 1)
//  });
}