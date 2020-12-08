function SelectTarget(itemUsage) {
  if (itemUsage != null) {
    Orion.Print("Select your" + itemUsage);
  }
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
  return target;
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

function RandomTarget() {
  var nearby = Orion.FindTypeEx(any, any, ground,
    'nothumanmobile|live|ignoreself|ignorefriends', 10, 3)
    .filter(function (mob) {
      return mob.Notoriety() >= 3
        && mob.Notoriety() < 7;
    });
  return nearby[Orion.Random(nearby.length)];
}

function WalkTo(object, distance) {
  if (distance == null) {
    distance = 1;
  }

    Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, 1, 1,5000);
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

function StayAwayF() {
  StayAway(SelectTarget(), 8);
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