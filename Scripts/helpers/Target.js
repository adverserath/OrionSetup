function SelectMultipleLocations(_) {
  Debug(' Method Entry - SelectMultipleLocations')
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
  Debug(' Method Entry - SelectMultipleTargets')
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
  Debug(' Method Entry - SelectTarget')
  if (itemUsage != null) {
    Orion.Print("Select your " + itemUsage);
  }
  var type = Orion.WaitForAddObject('myTarget');
  Debug('Type:' + type);
  Orion.Wait(100)
  if (type == 1 || type == 2) {


    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');
    if (target != null)
      Debug(target.Serial());
    return target;
  }
  else if (type == 3) {

    var objList = Orion.FindType(any, any, ground, 'nearmouse|mobile', 12, any)

    if (objList.length > 0) {
      var target = Orion.FindObject(objList[0]);
      return target;
    }
  }
  else {
    return null
  }

}

function SelectCoordinate(text) {
  Debug(' Method Entry - SelectCoordinate')
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
  Debug(' Method Entry - UseItemOnTarget')
  Orion.UseObject(item.Serial());
  if (Orion.WaitForTarget(5000)) {
    Orion.TargetObject(target.Serial());
  }
}

function UseItemOnTargets(item, targets) {
  Debug(' Method Entry - UseItemOnTargets')
  targets.forEach(function (target) {

    UseItemOnTarget(item, target);
  });
}

function RandomTarget(_private) {
  Debug(' Method Entry - RandomTarget')
  var nearby = Orion.FindTypeEx(any, any, ground,
    'nothumanmobile|live|ignoreself|ignorefriends', 10, 3)
    .filter(function (mob) {

      return mob.Notoriety() >= 3
        && mob.Notoriety() < 7;
    });
  return nearby[Orion.Random(nearby.length)];
}

function PrintContainer(objectSerial, mobileSerial, ignoreNonStealable) {
  Debug(' Method Entry - PrintContainer')
  Orion.Print('PrintContainer')
  var mobile = Orion.FindObject(mobileSerial)
  var object = Orion.FindObject(mobileSerial)
  if (object == null) {
    Orion.Print('Cannot find: ' + objectSerial)
    return
  }

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

function WalkTo(object, distance, timeMS, walking, monitored) {
  TextWindow.Print('Method Entry - WalkTo')
  TextWindow.Print("Start WalkTo")
  Orion.Print(parseInt(object))

  if (typeof object == "string" && object.length == 10) {
    Orion.Print('Walk to object')
    Orion.Print('finding ' + object)
    object = Orion.FindObject(object)
    if (object == null)
      return
    Orion.Print(object.Name())
  }

  else if (parseInt(object) > 0) {
    Orion.Print('Walk to coord')
    var target = coordinate(object, distance)
    distance = 0
    object = target;
  }

  if (object.hasOwnProperty('name')) {
    TextWindow.Print("Walking to object ")
    TextWindow.Print(object.X() + '  ' + object.Y())
  }
  else {
    TextWindow.Print("Walking to coord ")
    TextWindow.Print(object.X() + ' ' + object.Y())
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
  var x = object.X()
  var y = object.Y()
  if (distance > 0 && Orion.GetDistance(x, y) > 24) {
    var path = Orion.GetPathArray(x, y).reverse();
    if (path.length > distance) {
      Orion.Print('Setting Short')
      x = path[distance].X()
      y = path[distance].Y()
      distance = 0
    }
  }

  var Z = 0
  if (object.hasOwnProperty('z'))
    Z = object.Z()
  if (monitored)
    Orion.ToggleScript('MonitorWalkBlock', true)
  var result = Orion.WalkTo(x, y, Z, distance, 255, walking, 1, timeMS);
  return result
}

function WalkToAvoiding(object, avoidarray, avoiddistance, distance, timeMS, walking) {
  Debug(' Method Entry - WalkToAvoiding')
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
  Debug(' Method Entry - AddBadLocationGrid')
  var start = SelectCoordinate()
  var end = SelectCoordinate();

  Orion.GetTilesInRect('land', start.X(), start.Y(), end.X(), end.Y()).forEach(function (tile) {
    Orion.Print('block' + tile.X() + ' ' + tile.Y())
    Orion.SetBadLocation(tile.X(), tile.Y());
  })
}

function FelWalkTo(object, distance, timeMS, walking) {
  Debug(' Method Entry - FelWalkTo')

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
  Debug(' Method Entry - InRange')
  if (typeof p1 === "string") {
    p1 = Orion.FindObject(p1)
  }
  if (typeof p2 === "string") {
    p2 = Orion.FindObject(p2)
  }
  return (p1.X() >= (p2.X() - range))
    && (p1.X() <= (p2.X() + range))
    && (p1.Y() >= (p2.Y() - range))
    && (p1.Y() <= (p2.Y() + range));
}

function InLOSRange(p1, p2, range) {
  Debug(' Method Entry - InRange')
  if (typeof p1 === "string") {
    p1 = Orion.FindObject(p1)
  }
  if (typeof p2 === "string") {
    p2 = Orion.FindObject(p2)
  }
  return (p1.X() >= (p2.X() - range))
    && (p1.X() <= (p2.X() + range))
    && (p1.Y() >= (p2.Y() - range))
    && (p1.Y() <= (p2.Y() + range))
    && Orion.InLOS(p1.X(), p1.Y(), p1.Z(), p2.X(), p2.Y(), p2.Z())

}

function BorderEdge(x, y, p2, range) {
  Debug(' Method Entry - BorderEdge')

  return (x == (p2.X() - range))
    || (x == (p2.X() + range))
    || (y == (p2.Y() - range))
    || (y == (p2.Y() + range));

}

function GetDistanceToSqrt(_private) {
  Debug(' Method Entry - GetDistanceToSqrt')
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
  Debug(' Method Entry - ShowRange')
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

function StayAwayGetLocation(targetId, distance) {
  Orion.Print('Enter StayAwayGetLocation')
  if (Orion.ObjectExists(targetId)) {
    var target = Orion.FindObject(targetId)
    var x = target.X();
    var y = target.Y();
    var i = 0;
    Orion.ClearFakeMapObjects()
    var bordertiles =
      Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance)
        .filter(function (tile) {
          return BorderEdge(x, y, tile, distance);
        }).sort(function (t1, t2) {
          return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });

    var visibleBorder = bordertiles.filter(function (tile) {
      return Orion.InLOS(tile.X(), tile.Y());
    })

    var trimtiles = visibleBorder.slice(0, 5).filter(function (tile) {
      return Orion.GetPathArray(tile.X(), tile.Y(), tile.Z(), 0, 30, 1, 0).length >= 1
    })
    if (trimtiles.length == 0) {
      trimtiles = bordertiles.slice(0, 15).filter(function (tile) {
        return Orion.GetPathArray(tile.X(), tile.Y(), tile.Z(), 0, 30, 1, 0).length >= 1
      })
    }
    trimtiles.forEach(function (tile) {
      Orion.AddFakeMapObject(i++, '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
    })
    var closest = trimtiles.shift()
    Orion.Print('Exit StayAwayGetLocation')

    return coordinate(closest.X(), closest.Y(), closest.Z(), 'Escape')
  }
}

function Here() {
  return coordinate(Player.X(), Player.Y(), Player.Z(), "Saved Location")
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
    }
  }
}

function FindGroundItemWithName(name) {
  return Orion.FindTypeEx(any, any, ground, 'item', 18).filter(function (item) {
    return Orion.Contains(item.Name(), name)
  }).shift()
}

function FindBackpackItemWithName(name) {
  return Orion.FindTypeEx(any, any, backpack, 'item', 18).filter(function (item) {
    return Orion.Contains(item.Name(), name)
  }).shift()
}

function FindGroundItemWithProperties(properties) {
  var returnItems = []
  var items = Orion.FindTypeEx(any, any, ground, 'item', 18)

  items.forEach(function (item) {
    properties.forEach(function (prop) {
      if (Orion.Contains(item.Properties(), prop)) {
        returnItems.push(item)
      }
    })
  })

  TextWindow.Print('FindGroundItemWithProperties:' + properties)
  TextWindow.Print(returnItems.length)
  return returnItems.shift()
}

function FindBackpackItemWithProperties(properties) {
  var returnItems = []
  var items = Orion.FindTypeEx(any, any, backpack, 'item', 18)
  items.forEach(function (item) {
    properties.forEach(function (prop) {
      if (Orion.Contains(item.Properties(), prop)) {
        returnItems.push(item)
      }
    })
  })
  Orion.Print('FindBackpackItemWithProperties:' + properties)
  Orion.Print(returnItems.length)
  return returnItems.shift()
}

function BlockTest() {
  Orion.ClientOptionSet('BlockWalkingOnMultiStairsInWarMode', true)
  Orion.WarMode(true)
}

function MonitorWalkBlock() {
  Orion.Wait(100)
  Orion.ClearBadLocations();
  Orion.ClearFakeMapObjects();
  var lastX = Player.X()
  var lastY = Player.Y()
  while (Orion.IsWalking()) {
    Orion.Wait(400)
    if (Player.X() == lastX && Player.Y() == lastY) {
      Orion.Print('Walking is blocked')
      Orion.GetTilesInRect('any', Player.X() - 3, Player.Y() - 3, Player.X() + 3, Player.Y() + 3)
        .forEach(function (tile) {
          Orion.SetBadLocation(tile.X(), tile.Y());
          Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
        )

    }
    lastX = Player.X()
    lastY = Player.Y()
  }
}
//#include helpers/Debug.js
