var locations = []
var currentlocation = 0
var allies
function SetLocations(_) {
    allies = NearbyAllies().length
    locations = SelectMultipleLocations();
    TextWindow.Open()
    TextWindow.Print(JSON.stringify(locations))
}

var mobType
function GetMobType() {
    if (mobType == null)
        mobType = Orion.GetGlobal("mobType")
    if (mobType == null)
        return any
    else
        return mobType
}

function LocationLoop(_) {
    var udp = Orion.UdpServersList().length > 0
    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        return;
    }
    {
        var mobCount = Orion.FindTypeEx(GetMobType(), any, ground,
            'live|ignoreself|ignorefriends|near|inlos', 10, 'gray|criminal|red|enemy').length
        Orion.Print('Checking next location')

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location: ' + currentlocation)
            if (typeof locations[currentlocation] == "string") {
                Orion.Print('obj: ' + locations[currentlocation])
                var obj = Orion.FindObject(locations[currentlocation])
                if (obj != null) {
                    if (udp)
                        Sender('*', 'W:' + obj.X() + ':' + obj.Y() + ':' + obj.Z() + ':' + "128");
                    WalkTo(locations[currentlocation], 0)

                    if (Orion.Contains(obj.Properties(), 'Switch')) {
                        Orion.UseObject(obj.Serial())
                    }
                    if (Orion.Contains(obj.Properties(), 'Clay Wall')) {
                        if (udp)
                            Sender('*', 'U:' + obj.Serial());
                        Orion.UseObject(obj.Serial())
                    }
                    Orion.Wait(1000)
                }
                else {
                    Orion.Print('obj not found : ' + locations[currentlocation])
                }
                currentlocation++
                // Orion.Print('Cast SJ: ' + locations[currentlocation])
                // Orion.Cast('Sacred Journey', locations[currentlocation])
                // Orion.Wait(2000)

            }
            else {
                Orion.Print('Walk to dest')
                if (udp)
                    Sender('*', 'W:' + locations[currentlocation].X() + ':' + locations[currentlocation].Y() + ':' + locations[currentlocation].Z() + ':' + "128");

                if (WalkTo(locations[currentlocation], 0))
                    currentlocation++

                Orion.Wait(1000)
            }
            Orion.Print('Going to next location')
        }
    }
}
var startLoop = Orion.Now()
function LocationLoopWaitSolo(secondsToLoop) {
    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        return;
    }
    {
        while (allies < NearbyAllies().length) {
            Orion.Print('Wait for pets:' + NearbyAllies().length + ' of ' + allies)

            Orion.Wait(2000)
        }
        Orion.Print('Checking next location')
        if (allies >= NearbyAllies().length) {
            if (currentlocation >= locations.length) {
                currentlocation = 0;
                WalkTo(locations[currentlocation], 0)

                var waitTime = (secondsToLoop * 1000 - (Orion.Now() - startLoop))
                Orion.Print('Waiting: ' + waitTime / 1000 + 'seconds')
                if (waitTime > 0) {
                    Orion.Wait(waitTime)
                }

                startLoop = Orion.Now()
            }
            if (locations.length > currentlocation) {
                Orion.Print('Going to next location: ' + currentlocation)
                if (typeof locations[currentlocation] == "string") {
                    Orion.Print('obj: ' + locations[currentlocation])
                    var obj = Orion.FindObject(locations[currentlocation])
                    if (obj != null) {
                        WalkTo(locations[currentlocation], 0)
                        Orion.Wait(750)
                    }
                    else {
                        Orion.Print('obj not found : ' + locations[currentlocation])
                    }
                    currentlocation++

                }
                else {
                    Orion.Print('Walk to dest')

                    WalkTo(locations[currentlocation++], 0)
                }
                Orion.Print('Going to next location')
            }
        }
        Orion.Print('Wait for pets:' + NearbyAllies().length + ' of ' + allies)
    }
}

function Patrol() {

    var allies = NearbyAllies().length
    Orion.Print("Allies:" + allies)
    SetLocations()
    while (true) {
        Orion.Wait(3000)
        Orion.Print('Not fighting')
        var pathDistance
        while (!Player.Dead() && Player.WarMode()) {
            //Orion.Wait(200)
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())
            if (lastAttacker != null)
                pathDistance = Orion.GetPathArray(lastAttacker.X(), lastAttacker.Y(), lastAttacker.Z()).length
            else
                pathDistance = 0
            if (lastAttacker == null || lastAttacker.Serial() == 0x00000000 || !lastAttacker.InLOS() || lastAttacker.Distance() < (pathDistance - 10) || pathDistance == 0) {

                var closest = GetEnemiesInArea(15)

                if (closest.length == 0 && allies == NearbyAllies().length) {
                    Orion.Print('no enemy')
                    LocationLoop()
                }
                else {
                    Orion.Wait(2000)
                }
            }
        }
    }
}

function NearbyAllies(distance) {
    if(distance == null)
        distance = 2
    var friendly = Orion.FindTypeEx(any, any, ground,
        'live|inlos', distance, 'blue|green').filter(function (mob) {

            return Orion.Contains(mob.Properties(), 'Legacy') || Orion.Contains(mob.Properties(), 'bonded')
        })
    return friendly
}

function GetEnemiesInArea(distance) {
    if (distance == null)
        distance = 20
    var mobs = Orion.FindTypeEx(GetMobType(), any, ground,
        'live|ignoreself|ignorefriends|inlos', distance, 'gray|criminal|red|enemy')
        .concat(Orion.FindTypeEx(any, any, ground,
            'live|ignoreself|ignorefriends|inlos', distance + 5, 'gray|criminal|red|enemy')
            .filter(function (mob) { return mob.WarMode() }))

    mobs.forEach(function (mob) {
        Orion.AddHighlightCharacter(mob.Serial(), 59);
    })
    return mobs
}