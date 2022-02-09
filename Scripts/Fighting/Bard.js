var bardRange;
function Provoke() {
    var startedHidden = Player.Hidden()
    ResetGlobals()
    Orion.PrintFast(self, 20, 1, "Provocation")

    bardRange = BardRange('Provocation')
    Orion.Print(bardRange)

    var counter = 1


    var t1 = GetSmartTarget()
    Orion.Print(t1)
    Orion.SetGlobal('smartTarget', "")

    while (Orion.GetGlobal('smartTarget').length == 0) {
        Orion.Wait(100)
    }
    var t2 = Orion.GetGlobal('smartTarget')
    Orion.Print(t2)

    Orion.SetGlobal('smartTarget', "")

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(t1, rand);
    Orion.AddHighlightCharacter(t2, rand);

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
    Orion.UseSkill('Provocation')
    if (Orion.WaitForTarget())
        Orion.TargetObject(p1.Serial())
    if (Orion.WaitForTarget())
        Orion.TargetObject(t2.Serial())
}

function Discord() {
    Orion.PrintFast(self, 20, 1, "Discordance")

    var bardRange = BardRange('Discordance')
    Orion.Print(bardRange)
    var mobs = []

    var counter = 1
    mobs.push('0x00000000')
    Orion.Print(mobs.length)
    var mobsList = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 24, 'gray|criminal|orange|red')
    Orion.Print(mobsList.length)
    mobsList.forEach(function (closemob) {

        mobs.push(closemob.Serial())
        Orion.SetGlobal(counter, closemob.Serial())
        Orion.CharPrint(closemob.Serial(), '0x03EA', counter);
        Orion.Print(counter)
        counter++
    })
    Orion.Print(counter)
    if (counter > 0) {
        Orion.SetGlobal('rand', Orion.Random(1000))

        Orion.UseSkill('Discordance')

        while (Orion.WaitForTarget(10000)) {
            var mobsList = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', bardRange, 'gray|criminal|orange|red')
            Orion.ClearHighlightCharacters();
            mobsList.forEach(function (closemob) {

                Orion.AddHighlightCharacter(closemob.Serial(), '0x0154');

            })
            Orion.Wait(10)
        }
        Orion.AddDisplayTimer('skill', 10000, 'Top');
    }
}
function Peacemaking() {
    Orion.PrintFast(self, 20, 1, "Peacemaking")

    var bardRange = BardRange('Peacemaking')
    Orion.Print(bardRange)
    var mobs = []

    var counter = 1
    mobs.push('0x00000000')
    Orion.Print(mobs.length)
    var mobsList = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 24, 'gray|criminal|orange|red')
    Orion.Print(mobsList.length)
    mobsList.forEach(function (closemob) {

        mobs.push(closemob.Serial())
        Orion.SetGlobal(counter, closemob.Serial())
        Orion.CharPrint(closemob.Serial(), '0x03EA', counter);
        Orion.Print(counter)
        counter++
    })
    Orion.Print(counter)
    if (counter > 0) {
        Orion.SetGlobal('rand', Orion.Random(1000))

        Orion.UseSkill('Peacemaking')

        while (Orion.WaitForTarget(10000)) {
            var mobsList = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', bardRange, 'gray|criminal|orange|red')
            Orion.ClearHighlightCharacters();
            mobsList.forEach(function (closemob) {

                Orion.AddHighlightCharacter(closemob.Serial(), '0x0154');

            })
            Orion.Wait(10)
        }
        Orion.AddDisplayTimer('skill', 10000, 'Top');
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
    var end = 0
    while (end < 9) {
        end++
        Orion.Wait(1000)
        mobs.forEach(function (mobile) {
            Orion.PrintFast(mobile.Serial(), 20, 1, end)

        })
    }
}
function ResetGlobals(_) {
    for (var index = 1; index < 10; index++) {
        Orion.SetGlobal(index, '')
    }
    Orion.SetGlobal('smartTarget', '')

}

function ReleaseAllSummons(_) {
    var mobs = Orion.FindTypeEx(any, any, ground, 'live|ignoreself', 15, 1 | 2)
        .filter(function (mob) {
            return mob.Properties().indexOf('summoned') != -1
        }).forEach(function (mobile) {
            Orion.Say(mobile.Name() + ' release')
        })

}

function GetSmartTarget(_)
{
var counter = 1
    Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends', bardRange, 3 | 4 | 5 | 6)
        .filter(function (mob) {
            return mob.Properties().indexOf('Legacy') == -1
        }).slice(0, 9)
        .forEach(function (closemob) {
            Orion.CharPrint(closemob.Serial(), '0x0055', counter);
            Orion.SetGlobal(counter, closemob.Serial())
            Orion.Print(counter++)
        })

    while (Orion.GetGlobal('smartTarget').length == 0) {
        Orion.Wait(100)
    }
    return Orion.GetGlobal('smartTarget')
}