//#include Scripts/helpers/Target.js

function RemoveTraps() {
    var id = 0;

    while (!Player.Dead()) {
        if (!Orion.DisplayTimerExists("DH")) {
            Orion.Print("DH")
            Orion.AddDisplayTimer('DH', 10000);
            Orion.UseSkillTarget("Detecting Hidden", self)
        }

        Orion.Wait(100)
        if (Orion.DisplayTimerGetTime("DH") < 1000) {
            var traps = Orion.FindTypeEx('0x4004', any, ground)
            if (traps.length > 0) {
                traps.forEach(function (trap) {
                    id = id + 1
                    Orion.AddFakeMapObject(id, '0x4004', '0x08AB', trap.X(), trap.Y(), trap.Z() + 5);
                })
            }
        }
    }
}

function SolveExperimentRoom() {
    var gem = SelectTarget()
    Orion.UseObject(gem.Serial());
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump('last');
        gump0.Select(Orion.CreateGumpHook(1));
    }
    if (ExperimentRoom1(gem)) {
        if (ExperimentRoom2(gem)) {
            if (ExperimentRoom3(gem)) {
                Orion.WalkTo(984, 1065, -42, 0, 1)
            }
        }
    }
}
function ExperimentRoom1(gem) {
    var startTime = Orion.Now();
    Orion.Print('Start Room 1')
    while (Orion.InJournal('You fail', self, '0', '-1', startTime, Orion.Now()) == null && Orion.InJournal('The next room has', self, '0', '-1', startTime, Orion.Now()) == null) {
        Orion.Wait(100)
        if (gem.Color() == '0x0356') {
            Orion.WalkTo(984, 1109, -42, 0, 1, 1)
        }
        if (gem.Color() == '0x0026')//RED
        {
            Orion.WalkTo(987, 1109, -42, 0, 1, 1)
        }
        if (gem.Color() == '0x0004')//BLUE
        {
            Orion.WalkTo(981, 1109, -42, 0, 1, 1)
        }
        if (gem.Color() == '0x04B2')//PINK
        {
            Orion.WalkTo(981, 1108, -42, 0, 1, 1)
        }
        if (gem.Color() == '0x0481')//WHITE
        {
            Orion.WalkTo(987, 1108, -42, 0, 1, 1)
        }
    }
    Orion.Print('End Room 1')

    return ReturnOutcome(startTime)

}

function ExperimentRoom2(gem) {
    var startTime = Orion.Now();
    Orion.Print('Start Room 2')

    while (Orion.InJournal('You fail', self, '0', '-1', startTime, Orion.Now()) == null && Orion.InJournal('The next room has', self, '0', '-1', startTime, Orion.Now()) == null) {
        Orion.Wait(100)
        if (gem.Color() == '0x0356')//normal
        {
            Orion.WalkTo(984, 1096, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0026')//RED
        {
            Orion.WalkTo(982, 1096, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0004')//BLUE
        {
            Orion.WalkTo(986, 1094, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x04B2')//PINK
        {
            Orion.WalkTo(982, 1094, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0481')//WHITE
        {
            Orion.WalkTo(986, 1098, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x003D')//LIGHTGREEN
        {
            Orion.WalkTo(982, 1098, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0030')//ORANGE
        {
            Orion.WalkTo(986, 1096, -42, 0, 2, 1)
        }
    }
    Orion.Print('End Room 2')

    return ReturnOutcome(startTime)

}


function ExperimentRoom3(gem) {
    Orion.Print('Start Room 3')

    var startTime = Orion.Now();
    while (Orion.InJournal('You fail', self, '0', '-1', startTime, Orion.Now()) == null && Orion.InJournal('Congratulations', self, '0', '-1', startTime, Orion.Now()) == null) {
        Orion.Wait(100)
        if (gem.Color() == '0x0356')//normal
        {
            Orion.WalkTo(984, 1078, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0026')//RED
        {
            Orion.WalkTo(986, 1079, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0004')//BLUE
        {
            Orion.WalkTo(979, 1078, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x04B2')//PINK
        {
            Orion.WalkTo(982, 1078, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0481')//WHITE
        {
            Orion.WalkTo(989, 1079, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x003D')//LIGHTGREEN
        {
            Orion.WalkTo(982, 1079, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0030')//ORANGE
        {
            Orion.WalkTo(989, 1078, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0557')//DARKGREEN
        {
            Orion.WalkTo(986, 1078, -42, 0, 2, 1)
        }
        if (gem.Color() == '0x0747')//BROWN
        {
            Orion.WalkTo(979, 1079, -42, 0, 2, 1)
        }
    }
    Orion.Print('End Room 3')
    return ReturnOutcome(startTime)
}

function ReturnOutcome(startTime) {
    if (Orion.InJournal('You fail', self, '0', '-1', startTime, Orion.Now()) != null) {
        Orion.Print('Fail')
        return false;
    }
    if (Orion.InJournal('The next room has', self, '0', '-1', startTime, Orion.Now()) != null) {
        Orion.Print('Pass')
        return true;
    }
    if (Orion.InJournal('Congratulations', self, '0', '-1', startTime, Orion.Now()) != null) {
        Orion.Print('Win')
        return true;
    }
    Orion.Print('Default')
    return false;
}
