function SelectMultipleLocations(_) {
  var locations = [];
  var selected;
  var selecting = true;
  while (selecting) {
    var selectedObj = SelectCoordinate();
    if (selectedObj == null) {
      selecting = false
    }
    else {
      locations.push(selectedObj)
      Orion.Print('added X:' + selectedObj.X() + " Y:" + selectedObj.Y())
    }
  }
  return locations;
}

function SelectMultipleTargets(_) {
  var objects = [];
  var selected;
  var selecting = true;
  while (selecting) {
    var selectedObj = SelectTarget();
    if (selectedObj == null) {
      selecting = false
    }
    else {
      selected = selectedObj.Serial()

      objects.push(selected)
      Orion.Print('added ' + selected.FullName())
    }
  }
  return objects;
}

function SelectTarget(itemUsage) {
  if (itemUsage != null) {
    Orion.Print("Select your" + itemUsage);
  }
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
  return target;
}

function SelectCoordinate(text) {
  if (text != null) {
    Orion.Print(text)
  }
  if (Orion.WaitForAddObject('myTarget') == 0) {
    return null;
  }
  Orion.Wait(100)

  return coordinate(SelectedTile.X(), SelectedTile.Y(), SelectedTile.Z(), 'coordinate')
}

function UseItemOnTarget(item, target) {
  Orion.UseObject(item.Serial());
  if (Orion.WaitForTarget(5000)) {
    Orion.TargetObject(target.Serial());
  }
}

function UseItemOnTargets(item, targets) {
  targets.forEach(function (target) {
    UseItemOnTarget(item, target);
  });
}

function RandomTarget(_private) {
  var nearby = Orion.FindTypeEx(any, any, ground,
    'nothumanmobile|live|ignoreself|ignorefriends', 10, 3)
    .filter(function (mob) {
      return mob.Notoriety() >= 3
        && mob.Notoriety() < 7;
    });
  return nearby[Orion.Random(nearby.length)];
}

function PrintContainer(object, mobile, ignoreNonStealable) {
  Orion.Print('PrintContainer')
  var items = ''
  if (mobile != null) {
    items = mobile.Name() + '\n'
  }
  items = object.Name() + ' ' + object.Serial() + '\n'
  Orion.Wait(100)
  Orion.FindTypeEx(any, any, object.Serial())
    .filter(function (item) {
      if (ignoreNonStealable) {
        return !Orion.Contains(item.Properties(), 'Blessed') && !Orion.Contains(item.Properties(), 'Insured')
          && ((item.Properties().match(/Weight:\s(\d*)/i) || [])[1] || 20) <= 10;
      }
      else {
        return true
      }
    })
    .forEach(function (item) {
      items += '--<b>' + item.Name() + '</b>\n'
      items += '<code>' + item.Properties() + '</code>\n'
    })
  TextWindow.Print(items)
  BotPush(items)
}

function WalkTo(object, distance, timeMS, walking) {
  Orion.Print("Start WalkTo")
  if (typeof object === "string") {
    Orion.Print('finding ' + object)
    object = Orion.FindObject(object)
  }

  if (object.hasOwnProperty('name') && object.Name() != null && object.Name() != '') {
    Orion.Print("Walking to object ")
    Orion.Print(object.X() + '  ' + object.Y())
  }
  else {
    Orion.Print("Walking to coord ")
    Orion.Print(object.X() + ' ' + object.Y())
  }
  if (distance == null) {
    distance = 1;
  }
  if (timeMS == null) {
    timeMS = 300000;
  }
  if (walking == null) {
    walking = 1;
  }
  var Z = 0
  if(object.hasOwnProperty('z'))
    Z = object.Z()
  var result = Orion.WalkTo(object.X(), object.Y(), Z, distance, 255, walking, 1, timeMS);
  return result
}

function WalkToAvoiding(object, avoidarray, avoiddistance, distance, timeMS, walking) {
  Orion.Print('Going to' + object.X() + ' ' + object.Y())
  if (distance == null) {
    distance = 2;
  }
  if (timeMS == null) {
    timeMS = 30000;
  }
  if (walking == null) {
    walking = 1;
  }
  if (avoiddistance == null) {
    avoiddistance = 4;
  }
  var start = Orion.Now()
  var finished = false;

  while (Orion.Now() - start < timeMS && !finished) {
    var path = Orion.GetPathArray(object.X(), object.Y())
    if (path == null || path.length == 0) {
      return
    }

    avoidarray.forEach(function (object) {
      if (object.Distance() < avoiddistance) {
        StayAway(object.Serial(), avoiddistance + 2)

      }
      Orion.GetTilesInRect('land', object.X() - avoiddistance, object.Y() - avoiddistance, object.X() + avoiddistance, object.Y() + avoiddistance).forEach(function (tile) {
        //Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        Orion.SetBadLocation(tile.X(), tile.Y());
      })
    })

    finished = Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, 300);
    Orion.ClearBadLocations();
    //   Orion.ClearFakeMapObjects();
  }

  //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
}

function AddBadLocationGrid() {
  var start = SelectCoordinate()
  var end = SelectCoordinate();

  Orion.GetTilesInRect('land', start.X(), start.Y(), end.X(), end.Y()).forEach(function (tile) {
    Orion.SetBadLocation(tile.X(), tile.Y());
  })
}

function FelWalkTo(object, distance, timeMS, walking) {

  if (distance == null) {
    distance = 1;
  }
  if (timeMS == null) {
    timeMS = 300000;
  }
  if (walking == null) {
    walking = 1;
  }
  var count = 0;
  while (!Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS) && count < 20) {
    //Clear blocked tiles
    //add blocked tiles
    count++
  }

}

function InRange(p1, p2, range) {

  return (p1.X() >= (p2.X() - range))
    && (p1.X() <= (p2.X() + range))
    && (p1.Y() >= (p2.Y() - range))
    && (p1.Y() <= (p2.Y() + range));

}

function BorderEdge(x, y, p2, range) {

  return (x == (p2.X() - range))
    || (x == (p2.X() + range))
    || (y == (p2.Y() - range))
    || (y == (p2.Y() + range));

}

function GetDistanceToSqrt(_private) {
  var p1 = Player
  var p2 = SelectTarget()
  while (true) {
    Orion.Wait(100)
    var xDelta = p1.X() - p2.X()
    var yDelta = p1.Y() - p2.Y()
    var sqrt = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta))
    Orion.Print('sqrt' + sqrt)
    Orion.Print('range: ' + InRange(p1, p2, 14) + ' ' + p2.Distance())
    Orion.Print('LOS: ' + p2.InLOS())
  }// return sqrt
}

function ShowRange(targetId, range) {
  Orion.ClearFakeMapObjects();
  if (Orion.ObjectExists(targetId)) {
    var target = Orion.FindObject(targetId)
    var x = target.X();
    var y = target.Y();

    range.forEach(function (distance) {
      Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance)
        .filter(function (tile) {
          return BorderEdge(x, y, tile, distance);
        })
        .forEach(function (tile) {
          Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
        )
    })

  }
}

function StayAway(targetId, distance) {
  if (Orion.ObjectExists(targetId)) {
    var target = Orion.FindObject(targetId)
    var x = target.X();
    var y = target.Y();
    var tiles =
      Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance)
        .filter(function (tile) {
          return BorderEdge(x, y, tile, distance);
        })
        .sort(function (t1, t2) {
          return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });
    var closest = tiles.shift()
    WalkTo(coordinate(closest.X(), closest.Y()), 1)
  }
}

function Here()
{
  return coordinate(Player.X(),Player.Y(),Player.Z(),"Saved Location")
}

function coordinate(xLoc, yLoc, zLoc, _name) {
  return {
    x: xLoc,
    y: yLoc,
    z: zLoc,
    visited: false,
    locName: _name,
    X: function () {
      return this.x;
    },
    Y: function () {
      return this.y;
    },
    Z: function () {
      return this.z;
    },
    Visited: function (val) {
      if (val != null) {
        this.visited = val
      }
      return this.visited;
    },
    Name: function () {
      if (this.locName == null)
        return 'coordinate';
      else
        return this.locName;
    },
    DistanceTo: function (tx, ty) {
      var dx = Math.abs(tx - this.X());
      var dy = Math.abs(ty - this.Y());
      var min = Math.min(dx, dy);
      var max = Math.max(dx, dy);

      var diagonalSteps = min;
      var straightSteps = max - min;
      var ret = Math.sqrt(2) * diagonalSteps + straightSteps
      return ret;
    },

  }
}