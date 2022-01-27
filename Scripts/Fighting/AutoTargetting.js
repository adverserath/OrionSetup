function Provoke() {
    Orion.PrintFast(Player.Serial(),20,1,'Provoke')
    var bardRange = ProvokeRange()
    Orion.Print(bardRange)
    var mobs = []

    var counter = 1
    mobs.push('0x00000000')
    Orion.Print(mobs.length)
    Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', bardRange, 'gray|criminal|orange')
        .forEach(function (closemob) {
            mobs.push(closemob.Serial())
            Orion.CharPrint(closemob.Serial(), '0x0055', counter++);
            Orion.Print(counter)
        })

    var t1 = Orion.InputText();
    var t2 = Orion.InputText();

    var rand = Orion.Random(1000);
    Orion.AddHighlightCharacter(mobs[parseInt(t1)], rand);
    Orion.AddHighlightCharacter(mobs[parseInt(t2)], rand);

    Orion.UseSkill('Provocation')
    if (Orion.WaitForTarget())
        Orion.TargetObject(mobs[parseInt(t1)])
    if (Orion.WaitForTarget())
        Orion.TargetObject(mobs[parseInt(t2)])
}

function ProvokeClose() {
    Orion.PrintFast(Player.Serial(),20,1,'Provoke')
    var bardRange = ProvokeRange()
    var p1 = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends|near', bardRange, 'gray|criminal|orange|red').shift()

    var t2 = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', bardRange, 'gray|criminal|orange|red')
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
function Peacemaking()
{
    Orion.PrintFast(Player.Serial(),20,1,'Peace')
    var bardRange = PeaceRange()
Orion.Print(bardRange)
var mobs = []

var counter = 1
mobs.push('0x00000000')
Orion.Print(mobs.length)
            var mobsList = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', bardRange, 'gray|criminal|orange|red')
				Orion.Print(mobsList.length)
				mobsList.forEach(function (closemob) {
				
					mobs.push(closemob.Serial())
					Orion.SetGlobal(counter,closemob.Serial())
					Orion.CharPrint(closemob.Serial(), '0x03EA', counter);
					Orion.Print(counter)
					counter++
                })
                Orion.Print(counter)
                if(counter>0)
                {
		        Orion.SetGlobal('rand',Orion.Random(1000))
				
				Orion.UseSkill('Peacemaking')

				Orion.AddDisplayTimer('skill', 10000, 'Top');
				}
}
function Discord()
{

    var bardRange = DiscordRange()
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


function DiscordRange(_)
{
return 8 + parseInt((parseInt(Orion.SkillValue('Discordance')) / 10) / 15);
}
function PeaceRange(_)
{
return 8 + parseInt((parseInt(Orion.SkillValue('Discordance')) / 10) / 15);
}
function ProvokeRange(_)
{
return 8 + parseInt((parseInt(Orion.SkillValue('Discordance')) / 10) / 15);
}