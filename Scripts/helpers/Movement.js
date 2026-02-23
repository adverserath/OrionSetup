var locations = []
var locationJson
var currentlocation = 0
var allies
function SetLocations(_) {
    Orion.ClearFakeMapObjects();
    allies = NearbyAllies().length
    Orion.Print("Allies:" + allies)
    
    if(locationJson == null){
        locations = SelectMultipleLocations();
    }
    else{
        var locData = JSON.parse(locationJson)
        locData.forEach(function (entry) {
            if (typeof entry === "string") {
                TextWindow.Print('object: ' + entry)
                locations.push(entry)
            }
            else{
                TextWindow.Print('x: ' + entry.x + ' y:' + entry.y)
                locations.push(coordinate(entry.x, entry.y, entry.z, 'coordinate'))
                Orion.AddFakeMapObject(Orion.Random(900000), 0x051A, '0x0F00', entry.x, entry.y, Player.Z());
            }
        })
    }
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
        Orion.Print(57, 'Checking next location: ' + currentlocation)

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location: ' + currentlocation)
            if (typeof locations[currentlocation] == "string") {
                Orion.Print('obj: ' + locations[currentlocation])
                var obj = Orion.FindObject(locations[currentlocation])
                if (obj != null) {
                    Orion.Wait(1000)
                    obj = Orion.FindObject(locations[currentlocation])
                }
                if (obj != null) {
                    FightAndWait()
                    if (obj.Serial() == Player.Serial()) {
                        FightAndWait()
                        Orion.Wait(2000)
                        FightAndWait()
                    }
                    if (udp)
                        Sender('*', 'W:' + obj.X() + ':' + obj.Y() + ':' + obj.Z() + ':' + "128");
                    WalkTo(locations[currentlocation], 0)
                    FightAndWait()
                    WaitForGroup()
                    // if (Orion.Contains(obj.Properties(), 'Switch')) {
                    //     Orion.UseObject(obj.Serial())
                    //     Orion.Wait(1000)
                    // }
                    if (Orion.Contains(obj.Properties(), 'Clay Wall')) {
                        FlipSwitches()
                        if (udp)
                            Sender('*', 'U:' + obj.Serial());
                        Orion.UseObject(obj.Serial())
                        Orion.Wait(1500)
                    }
                    //Orion.Wait(1000)
                }
                else {
                    Orion.Print('obj not found : ' + locations[currentlocation])
                    Orion.Wait(100)
                    Orion.Print("cant see obj, try last one again")

                    currentlocation--
                    if (currentlocation == -1)
                        currentlocation = locations.length - 1
                    return

                }
                currentlocation++
            }
            else {
                Orion.Print('Walk to dest')
                FightAndWait()
                WaitForGroup()
                if (udp)
                    Sender('*', 'W:' + locations[currentlocation].X() + ':' + locations[currentlocation].Y() + ':' + locations[currentlocation].Z() + ':' + "128");

                if (WalkTo(locations[currentlocation], 0))
                    currentlocation++
                else {
                    Orion.Wait(1000) //Probably teleporting

                    if (udp)
                        Sender('*', 'W:' + locations[currentlocation].X() + ':' + locations[currentlocation].Y() + ':' + locations[currentlocation].Z() + ':' + "128");

                    if (WalkTo(locations[currentlocation], 0)) {
                        currentlocation++
                        Orion.Wait(200)
                    }
                    else {
                        Orion.Print("cant walk to destination, try last one again")
                        Orion.Wait(100)

                        currentlocation--
                        if (currentlocation == -1)
                            currentlocation = locations.length - 1
                        return
                    }
                }
                FightAndWait()
                WaitForGroup()
            }
            Orion.Print('Going to next location')
        }
    }
}

function FlipSwitches() {
    var switches = Orion.FindTypeEx("0x1091|0x108F", any, ground, any, 2)
    if (switches.length > 0) {
        Orion.UseObject(switches.shift().Serial())
        Orion.Wait(1000)
    }

}
function WaitForGroup(_) {
    while (allies != NearbyAllies().length) {
        Orion.Wait(100)
        Orion.Wait("waiting for allies:" + NearbyAllies().length)
    }
}
function FightAndWait(_) {
    var mobs = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends|inlos', 12, 3)
        .filter(function (mob) {
            return mob.Notoriety() >= 3
                && mob.Notoriety() <= 6
        })
    while (mobs.length > 0) {
        mobs = Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends|inlos', 12, 3)
            .filter(function (mob) {
                return mob.Notoriety() >= 3
                    && mob.Notoriety() <= 6
            })

        mobs.forEach(function (mobile) {

            Orion.Attack(mobile.Serial())
        })
        Orion.Wait(500)
        Orion.Wait("waiting:" + mobs.length)
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
function PatrolCitadel()
{
    locationJson = '[{"x":91,"y":1875,"z":0,"visited":false,"locName":"coordinate"},{"x":85,"y":1877,"z":0,"visited":false,"locName":"coordinate"},{"x":85,"y":1873,"z":0,"visited":false,"locName":"coordinate"},{"x":80,"y":1873,"z":0,"visited":false,"locName":"coordinate"},{"x":77,"y":1873,"z":0,"visited":false,"locName":"coordinate"},{"x":77,"y":1872,"z":0,"visited":false,"locName":"coordinate"},"0x4001A6E8",{"x":120,"y":1897,"z":0,"visited":false,"locName":"coordinate"},{"x":115,"y":1897,"z":0,"visited":false,"locName":"coordinate"},{"x":115,"y":1902,"z":0,"visited":false,"locName":"coordinate"},{"x":115,"y":1906,"z":15,"visited":false,"locName":"coordinate"},{"x":115,"y":1907,"z":15,"visited":false,"locName":"coordinate"},{"x":119,"y":1926,"z":0,"visited":false,"locName":"coordinate"},{"x":122,"y":1927,"z":0,"visited":false,"locName":"coordinate"},"0x4001A6EB",{"x":139,"y":1927,"z":0,"visited":false,"locName":"coordinate"},{"x":141,"y":1926,"z":0,"visited":false,"locName":"coordinate"},{"x":138,"y":1918,"z":0,"visited":false,"locName":"coordinate"},"0x0000FEFD",{"x":138,"y":1916,"z":0,"visited":false,"locName":"coordinate"},"0x4001A6DE",{"x":90,"y":1875,"z":0,"visited":false,"locName":"coordinate"},{"x":85,"y":1875,"z":0,"visited":false,"locName":"coordinate"},{"x":80,"y":1875,"z":0,"visited":false,"locName":"coordinate"},{"x":79,"y":1880,"z":0,"visited":false,"locName":"coordinate"},{"x":79,"y":1886,"z":0,"visited":false,"locName":"coordinate"},{"x":79,"y":1890,"z":0,"visited":false,"locName":"coordinate"},{"x":72,"y":1890,"z":0,"visited":false,"locName":"coordinate"},"0x4001A6E5",{"x":73,"y":1917,"z":0,"visited":false,"locName":"coordinate"},{"x":83,"y":1918,"z":0,"visited":false,"locName":"coordinate"},{"x":88,"y":1920,"z":-5,"visited":false,"locName":"coordinate"},{"x":90,"y":1920,"z":-14,"visited":false,"locName":"coordinate"},{"x":166,"y":1978,"z":0,"visited":false,"locName":"coordinate"},{"x":180,"y":1975,"z":0,"visited":false,"locName":"coordinate"},{"x":183,"y":1972,"z":0,"visited":false,"locName":"coordinate"},{"x":182,"y":1966,"z":0,"visited":false,"locName":"coordinate"},{"x":181,"y":1949,"z":0,"visited":false,"locName":"coordinate"},{"x":182,"y":1971,"z":0,"visited":false,"locName":"coordinate"},{"x":177,"y":1974,"z":0,"visited":false,"locName":"coordinate"},{"x":170,"y":1978,"z":0,"visited":false,"locName":"coordinate"},{"x":161,"y":1974,"z":5,"visited":false,"locName":"coordinate"},{"x":159,"y":1975,"z":15,"visited":false,"locName":"coordinate"},{"x":87,"y":1919,"z":0,"visited":false,"locName":"coordinate"},"0x4001A6DC",{"x":100,"y":1880,"z":0,"visited":false,"locName":"coordinate"}]'
    Patrol()
}
function PatrolShameTop()
{
    locationJson = '[{"x":5410,"y":92,"z":10,"visited":false,"locName":"coordinate"},{"x":5397,"y":91,"z":17,"visited":false,"locName":"coordinate"},{"x":5388,"y":82,"z":20,"visited":false,"locName":"coordinate"},{"x":5386,"y":48,"z":20,"visited":false,"locName":"coordinate"},{"x":5389,"y":29,"z":20,"visited":false,"locName":"coordinate"},{"x":5399,"y":29,"z":20,"visited":false,"locName":"coordinate"},{"x":5408,"y":26,"z":20,"visited":false,"locName":"coordinate"},{"x":5418,"y":19,"z":10,"visited":false,"locName":"coordinate"},{"x":5433,"y":16,"z":0,"visited":false,"locName":"coordinate"},{"x":5457,"y":10,"z":0,"visited":false,"locName":"coordinate"},{"x":5467,"y":12,"z":0,"visited":false,"locName":"coordinate"},{"x":5478,"y":15,"z":-12,"visited":false,"locName":"coordinate"},{"x":5479,"y":19,"z":-17,"visited":false,"locName":"coordinate"},{"x":5478,"y":21,"z":-28,"visited":false,"locName":"coordinate"},{"x":5477,"y":39,"z":-2,"visited":false,"locName":"coordinate"},{"x":5477,"y":58,"z":20,"visited":false,"locName":"coordinate"},{"x":5475,"y":65,"z":20,"visited":false,"locName":"coordinate"},{"x":5478,"y":76,"z":35,"visited":false,"locName":"coordinate"},{"x":5478,"y":78,"z":35,"visited":false,"locName":"coordinate"},{"x":5486,"y":88,"z":35,"visited":false,"locName":"coordinate"},{"x":5491,"y":92,"z":35,"visited":false,"locName":"coordinate"},{"x":5486,"y":85,"z":35,"visited":false,"locName":"coordinate"},{"x":5486,"y":85,"z":35,"visited":false,"locName":"coordinate"},{"x":5478,"y":77,"z":35,"visited":false,"locName":"coordinate"},{"x":5455,"y":87,"z":20,"visited":false,"locName":"coordinate"},{"x":5433,"y":92,"z":20,"visited":false,"locName":"coordinate"},{"x":5414,"y":92,"z":10,"visited":false,"locName":"coordinate"}]'
    Patrol()
}

function PatrolShame2nd()
{
    locationJson = '[{"x":5527,"y":12,"z":0,"visited":false,"locName":"coordinate"},{"x":5560,"y":13,"z":0,"visited":false,"locName":"coordinate"},{"x":5544,"y":37,"z":0,"visited":false,"locName":"coordinate"},{"x":5527,"y":42,"z":0,"visited":false,"locName":"coordinate"},{"x":5549,"y":47,"z":0,"visited":false,"locName":"coordinate"},{"x":5554,"y":62,"z":0,"visited":false,"locName":"coordinate"},{"x":5543,"y":39,"z":0,"visited":false,"locName":"coordinate"},{"x":5563,"y":37,"z":0,"visited":false,"locName":"coordinate"},{"x":5560,"y":14,"z":0,"visited":false,"locName":"coordinate"},{"x":5577,"y":17,"z":0,"visited":false,"locName":"coordinate"},{"x":5588,"y":22,"z":0,"visited":false,"locName":"coordinate"},{"x":5598,"y":19,"z":10,"visited":false,"locName":"coordinate"},{"x":5607,"y":22,"z":10,"visited":false,"locName":"coordinate"},{"x":5594,"y":19,"z":5,"visited":false,"locName":"coordinate"},{"x":5588,"y":35,"z":0,"visited":false,"locName":"coordinate"},{"x":5586,"y":55,"z":0,"visited":false,"locName":"coordinate"},{"x":5592,"y":64,"z":0,"visited":false,"locName":"coordinate"},{"x":5602,"y":58,"z":2,"visited":false,"locName":"coordinate"},{"x":5605,"y":44,"z":2,"visited":false,"locName":"coordinate"},{"x":5585,"y":53,"z":0,"visited":false,"locName":"coordinate"},{"x":5586,"y":36,"z":0,"visited":false,"locName":"coordinate"},{"x":5565,"y":35,"z":0,"visited":false,"locName":"coordinate"},{"x":5555,"y":36,"z":0,"visited":false,"locName":"coordinate"},{"x":5551,"y":24,"z":0,"visited":false,"locName":"coordinate"}]'
    Patrol()
}

var allies
function Patrol() {
    SetLocations()
    while (true) {
        Orion.Wait(1000)
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
                    OpenCorpsesWhenIdle() 
                    LocationLoop()
                }
                else {
                    if(NearbyAllies(8)<0){
                    WalkTo(allies[0], 4)
                    }
                    Orion.Wait(2000)
                }
            }
        }
    }
}

function NearbyAllies(distance) {
    if (distance == null)
        distance = 2
    var friendly = Orion.FindTypeEx(any, any, ground,
        'live|inlos|ignoreself', distance, 'blue|green').filter(function (mob) {

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

function walkToMobUntilInLOS() {
    var maxRange = 15; // Maximum range to look for a target
    var targetColor = 'gray'; // Color filter for target
    var initialApproachDistance = 10; // Distance to approach before fine navigation

    // Search for a target within the specified range
    var targets = Orion.FindType('any', 'any', 'ground', 'mobile|live', maxRange, targetColor);
    if (targets.length === 0) {
        Orion.Print("No target found within range.");
        return;
    }

    var target = targets[0]; // Select the first found target (closest)

    // Initial walk to get within the defined distance
    if (Orion.GetDistance(target) > initialApproachDistance) {
        Orion.WalkTo(target.X(), target.Y(), target.Z(), initialApproachDistance, 255, 1, 1);
        Orion.Wait(1000); // Wait to ensure initial movement completes
    }

    // Verify if LoS has been achieved after the initial approach
    if (Orion.InLos(target)) {
        Orion.Print("Target is already in line of sight.");
        return;
    }

    // Get a precise path from the player's position to the target
    var path = Orion.GetPathArray(Player.X(), Player.Y(), target.X(), target.Y(), 0);
    if (path.length === 0) {
        Orion.Print("No valid path found to the target.");
        return;
    }

    // Follow the path until the target is in LoS
    for (var i = 0; i < path.length; i++) {
        // Check if target is within LoS at each step
        if (Orion.InLos(target)) {
            Orion.Print("Target is now in line of sight. Stopping movement.");
            break;
        }

        // Move to the next step in the path
        var step = path[i];
        Orion.WalkTo(step.X, step.Y, step.Z, 1, 255, 1, 1);

        // Pause to allow movement and reduce CPU load
        Orion.Wait(200);
    }
}

//#include helpers/Looter.js