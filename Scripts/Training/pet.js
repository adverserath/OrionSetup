//#include helpers/Target.js
function CuHealing() {
    var target = SelectTarget()
    while (true) {
        if (!target.Poisoned() && target.Hits() > (target.MaxHits() / 2)) {
            Orion.CastTarget('Poison', target.Serial())
            Orion.Wait(1000)
        }
        Orion.Wait(3000)
    }
}