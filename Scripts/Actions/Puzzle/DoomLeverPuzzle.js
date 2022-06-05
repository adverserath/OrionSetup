var options = ["NESW", "NEWS", "NWES", "WNES", "NSEW", "NSWE", "NWSE", "WNSE", "SNEW", "SNWE", "SWNE", "WSNE", "ENSW", "ENWS", "EWNS", "WENS", "ESNW", "ESWN", "EWSN", "WESN", "SENW", "SEWN", "SWEN", "WSEN"]

//var tried = [
//        ["NSEW", 1],
//        ["ENSW", 1],
//    ]

    var tried = []    
function workMatch(settings) {

    var optionSet = options
    settings.forEach(function (setting) {
        optionSet = optionSet.filter(function (item) {
            var matches = 0
            for (i = 0; i < 4; i++) {
                if (item[i] === setting[0][i])
                    matches++;
            }
            return matches == setting[1];
        })
    })

    return optionSet;
}

function NextOptions() {
    TextWindow.Open()
    TextWindow.Print(workMatch(tried))
}

function ResControlAtLeverPuzzle() {
    var location = coordinate(Player.X(), Player.Y(), Player.Z(), "start position")
    while (true) {
        Orion.Wait(1000)
        while (!Player.Dead()) {
            Orion.Wait(1000)
        }
        //FindGate
        UseGate()
        ResAtAhnk()
        UseGate()
        if(!WalkTo(location,0))
        {
        Orion.Step(1)
        UseGate()
        WalkTo(location,0)
        }
        while(!Player.Dead()&&!Player.Hidden())
        {
        	Orion.UseSkill("Hiding")
        	Orion.Wait(1000)
        }
    }

}

function UseGate(_) {
    var gate = Orion.FindTypeEx('0x0F6C', any, ground, 'item|near', 25).shift()
    while (gate == null) {
        Orion.Wait(1000)
        gate = Orion.FindTypeEx('0x0F6C', any, ground, 'item|near', 25).shift()
    }
    WalkTo(gate, 1)
    gate = Orion.FindTypeEx('0x0F6C', any, ground, 'item|near', 25).shift()
    while (gate == null) {
        Orion.Wait(1000)
        gate = Orion.FindTypeEx('0x0F6C', any, ground, 'item|near', 25).shift()
    }

    

    WalkTo(gate, 0)
    Orion.UseObject(gate.Serial())
    
    Orion.Wait(2000)
}

function ResAtAhnk(_) {
    var ahnk = Orion.FindTypeEx('0x0002', any, ground, 'item|near', 15).shift()
    if (ahnk != null) {
        WalkTo(ahnk, 1)
Orion.Wait(500)
		var gump0 = Orion.GetGump('last');
		
		if (gump0 !== null)
		{
			Orion.Wait(200);
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
    }
}

function FastInsure()
{
	Orion.RequestContextMenu(Player.Serial());
	Orion.WaitContextMenuCliloc(Player.Serial(), 3006201);
}
//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js