function SelectTarget(itemUsage) {
  if (itemUsage != null) {
    Orion.Print("Select your" + itemUsage);
  }
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
  return target;
}

function SelectCoordinate(_private) {
  if (Orion.WaitForAddObject('myTarget') == 0) {
    return null;
  }
  Orion.Wait(100)

  return {
    x: SelectedTile.X(),
    y: SelectedTile.Y(),
    z: SelectedTile.Z(),
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

function WalkTo(object, distance, timeMS, walking) {

  if (distance == null) {
    distance = 1;
  }
  if (timeMS == null) {
    timeMS = 30000;
  }
  if (walking == null) {
    walking = 1;
  }
  return Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS);
  //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
}

function WalkToAvoiding(object, avoidarray, avoiddistance, distance, timeMS, walking) {
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
    avoidarray.forEach(function (object) {
      if(object.Distance()<avoiddistance)
      {
        StayAway(object.Serial(), avoiddistance+2)

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
    WalkTo(closest, 1)
  }
}

function coordinate(xLoc, yLoc, zLoc) {
  return {
    x: xLoc,
    y: yLoc,
    z: zLoc,
    visited: false,
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
      if(val!=null)
      {
        this.visited = val
      }
      return this.visited;
    },
  }
}