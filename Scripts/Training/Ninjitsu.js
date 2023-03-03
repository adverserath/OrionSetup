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

function TrainStealth() {
    while (!Player.Dead()) {

        if (Orion.SkillValue('Stealth') > 999) {
            Orion.CloseUO();
        }
        var gate = Orion.FindTypeEx('0x4BCB', any, any, any, 20).shift();
        if (gate != null) {

            Orion.Wait(50);
        }
        WalkTo(gate, 0, 2000, 0)

        Orion.UseObject(gate.Serial());
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
                var gumpHook0 = Orion.CreateGumpHook(1);
                gumpHook0.AddCheck(200, true);
                gump0.Select(gumpHook0);
            }
        }
        Orion.Wait(300)
        Orion.Step('s')
        Orion.Wait(300)
        Orion.Step('n')
        Orion.Say('.')

    }
}

function TrainHiding() {
    while (!Player.Dead()) {
        Orion.Wait(500)
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() + 20, Player.Z(), 8, 8, 0);
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() - 20, Player.Z(), 8, 8, 0);
    }
}
//#include helpers/Debug.js
//#include helpers/Target.js
//#include Stealther.js
//#include Actions/Tricks.js