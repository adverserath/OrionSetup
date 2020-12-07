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
function WalkTo(object, distance){
if(distance==null)
{
distance=1;
}
Orion.Print("walking to "+ object.Name() +' '+ distance)
Orion.WalkTo(object.X(), object.Y(), object.Z(), distance,255,1,10000);
}


function InRange(p1, p2, range){

			return ( p1.X() >= (p2.X() - range) )
				&& ( p1.X() <= (p2.X() + range) )
				&& ( p1.Y() >= (p2.Y() - range) )
				&& ( p1.Y() <= (p2.Y() + range) );

}