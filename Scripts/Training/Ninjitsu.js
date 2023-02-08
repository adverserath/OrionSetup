//Go To the DOOM ENTRANCE
function TrainNinjitsuMirror() {
    while (true) {
        Orion.Cast('Mirror Image');
        Orion.Wait(2000)
        var mobs = Orion.FindTypeEx(any, any, ground, 'mobile', 1).filter(function (mob) { return mob.Name() == Player.Name() })
        if (mobs.length > 0 && Player.Hits() > 20) {
            Orion.Attack(mobs.shift().Serial())
        }
        //Orion.WalkTo(2348, 1264, 0, 0)
        // Orion.WalkTo(2347, 1265, 0, 0)
        //Orion.WalkTo(2346, 1264, 0, 0)
        //Orion.WalkTo(2347, 1265, 0, 0)
        //Orion.WalkTo(2348, 1264, 0, 0)

    }
}

function TrainNinjitsuShadow() {
    while (true) {
        if (!Orion.SpellStatus('Shadow')) {
            Orion.Cast('Shadow');

        }
        Orion.Wait(2000)
    }
}

function TrainNinjitsuFocus() {
    while (true) {
        if (!Orion.SpellStatus('Focus Attack')) {
            Orion.Cast('Focus Attack');

        }
        Orion.Wait(2000)
    }
}

function TrainNinjitsuDeathstrike() {
    while (true) {
        while (!Orion.SpellStatus('Death strike')) {
            Orion.Cast('Death strike');
            Orion.Wait(1000)
        }
        Orion.Attack(0x0000E874)

        while (Orion.SpellStatus('Death strike')) {
            Orion.Wait(1000)
        }
        Orion.WarMode(false)

    }
}