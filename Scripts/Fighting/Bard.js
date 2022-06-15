var bardRange;

function DrawGumps() {
    var target = SelectTarget()
    BardGump(target.Serial())
}


function BardGump(serial, x, y) {
    var gumpId = serial
    gump = Orion.CreateCustomGump(gumpId);
    gump.SetNoClose(false);
    gump.Clear();
    gump.AddHtmlGump(1, 10, 10, 160, 120, '0x1400', 1, 0);
    gump.Select('htmlgump', 1);
    gump.AddText(10, 10, '0x0035', '-- ' + serial);

    gump.Select('gump');
    gump.Update();
}

function StopExisting() {
    if (Orion.ScriptRunning('Provoke'))
        Orion.ToggleScript('Provoke')
    if (Orion.ScriptRunning('Discord'))
        Orion.ToggleScript('Discord')
    if (Orion.ScriptRunning('Peacemaking'))
        Orion.ToggleScript('Peacemaking')
    Orion.Wait(100)
}

function Provoke() {
    var startedHidden = Player.Hidden()
    Orion.PrintFast(self, 20, 1, "Provocation")
    bardRange = BardRange('Provocation')
    Orion.Print("Range : " + bardRange)

    var t1 = GetSmartTarget()
    Orion.Print(t1)
    var t2 = GetSmartTarget(t1)
    Orion.Print(t2)

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(t1, rand);
    Orion.AddHighlightCharacter(t2, rand);

    if (startedHidden) {
        AgroReset()
        Orion.Wait(1000)
    }

    Orion.UseSkill('Provocation')
    if (Orion.WaitForTarget())
        Orion.TargetObject(t1)
    if (Orion.WaitForTarget())
        Orion.TargetObject(t2)
    if (startedHidden) {
        Orion.Wait(200)
        Orion.CastTarget('Invisibility', self)
    }
}

function ProvokeClose() {
    var startedHidden = Player.Hidden()

    Orion.PrintFast(self, 20, 1, "Provocation Close")

    var bardRange = BardRange('Provocation')

    var p1 = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends', bardRange, 3 | 4 | 5 | 6)
        .filter(function (mob) {
            return mob.Properties().indexOf('Legacy') == -1
        }).shift()

    var t2 = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends', bardRange, 3 | 4 | 5 | 6)
        .filter(function (mob) {
            return mob.Properties().indexOf('Legacy') == -1
        })
        .filter(function (p2) {
            return p2.Serial() !== p1.Serial()
                && (p1.X() >= (p2.X() - 14))
                && (p1.X() <= (p2.X() + 14))
                && (p1.Y() >= (p2.Y() - 14))
                && (p1.Y() <= (p2.Y() + 14))
        })
        .sort(function (mobA, mobB) {
            return mobA.Distance() - mobB.Distance()
        }).shift()

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(p1.Serial(), rand);
    Orion.AddHighlightCharacter(t2.Serial(), rand);

    if (startedHidden) {
        AgroReset()
        Orion.Wait(1000)
    }

    Orion.UseSkill('Provocation')
    if (Orion.WaitForTarget())
        Orion.TargetObject(p1.Serial())
    if (Orion.WaitForTarget())
        Orion.TargetObject(t2.Serial())

    if (startedHidden) {
        Orion.Wait(200)
        Orion.CastTarget('Invisibility', self)
    }
}

function Discord() {
    var skillName = 'Discordance'
    var startedHidden = Player.Hidden()
    Orion.PrintFast(self, 20, 1, skillName)
    bardRange = BardRange(skillName)
    Orion.Print("Range : " + bardRange)

    var t1 = GetSmartTarget()
    Orion.Print(t1)

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(t1, rand);

    if (startedHidden) {
        AgroReset()
        Orion.Wait(1000)
    }

    Orion.UseSkill(skillName)
    if (Orion.WaitForTarget())
        Orion.TargetObject(t1)

    if (startedHidden) {
        Orion.Wait(200)
        Orion.CastTarget('Invisibility', self)
    }
}

function Peacemaking() {
    var skillName = 'Peacemaking'
    var startedHidden = Player.Hidden()
    Orion.PrintFast(self, 20, 1, skillName)
    bardRange = BardRange(skillName)
    Orion.Print("Range : " + bardRange)

    var t1 = GetSmartTarget()
    Orion.Print(t1)

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(t1, rand);

    if (startedHidden) {
        AgroReset()
        Orion.Wait(1000)
    }

    Orion.UseSkill(skillName)
    if (Orion.WaitForTarget())
        Orion.TargetObject(t1)

    if (startedHidden) {
        Orion.Wait(200)
        Orion.CastTarget('Invisibility', self)
    }
}

function BardRange(skillName) {
    return 8 + parseInt((parseInt(Orion.SkillValue(skillName)) / 10) / 15);
}

function AgroReset() {
    Orion.PrintFast(self, 20, 1, "Agro")
    if (!Player.Hidden()) {
        var end = Orion.Now() + 3000
        Orion.CastTarget('Invisibility', self)
        while (!Player.Hidden() || Orion.Now() < end) {
            Orion.Print('wait')
            Orion.Wait(100)
        }
    }

    var mobs = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends', 15, 3 | 4 | 5 | 6)
        .filter(function (mob) {
            return mob.Notoriety() >= 3
                && mob.Notoriety() <= 6
                && mob.Properties().indexOf('Legacy') == -1
        })
    mobs.forEach(function (mobile) {

        if (Player.Hidden()) {
            Orion.Attack(mobile.Serial())
        }
    })
}

function ResetGlobals(_) {
    for (var index = 1; index < 10; index++) {
        Orion.SetGlobal(index, '')
    }
    Orion.SetGlobal('smartTarget', '')

}

function GetSmartTarget(firstTarget) {
    ResetGlobals()

    var counter = 1
    Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends', bardRange, 'blue|gray|criminal|orange|red')
        //NO PLAYERS
        .filter(function (mob) {
            if (firstTarget != null) {
                return mob.Properties().indexOf('Legacy') == -1
                    && InRange(firstTarget, mob, 12)
            }
            else
                return mob.Properties().indexOf('Legacy') == -1
        })
        //Order of closeness
        .sort(function (mobA, mobB) {
            return mobA.Distance() - mobB.Distance()
        })
        //Limit to 9
        .slice(0, 9)
        //Add Numbers to mobs
        .forEach(function (closemob) {
            Orion.CharPrint(closemob.Serial(), '0x0055', counter);
            Orion.SetGlobal(counter, closemob.Serial())
            Orion.Print(counter++)
        })
    //Wait for selection

    while (Orion.GetGlobal('smartTarget').length == 0) {
        Orion.Wait(100)
    }
    var result = Orion.GetGlobal('smartTarget')
    Orion.SetGlobal('smartTarget', null)
    //Return Chosen Mob
    return result
}
//#include helpers/Magic.js
//#include helpers/Target.js
//#include helpers/Debug.js