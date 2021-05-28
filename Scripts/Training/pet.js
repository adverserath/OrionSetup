//#include Scripts/helpers/Target.js
function CuHealing() {
    var target = SelectTarget()
    while (true) {
        if (!target.Poisoned() && target.Hits() > 5) {
            Orion.CastTarget('Poison', target.Serial())
            Orion.Wait(1000)
        }
        Orion.Wait(3000)
    }
}