var locations = []
var currentlocation = 0

function SetLocations(_) {
    locations = SelectMultipleLocations();
}

var mobType
function GetMobType()
{
if(mobType==null)
	mobType = Orion.GetGlobal("mobType")
if(mobType==null)
	return any
else
return mobType
}

function LocationLoop(_) {
    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        return;
    }
    {
        var mobCount = Orion.FindTypeEx(GetMobType(), any, ground,
            'live|ignoreself|ignorefriends|near', 6, 'gray|criminal|red|enemy').length
        Orion.Print('Checking next location')

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location')
            WalkTo(locations[currentlocation++])

            //Find Next Target Far away
            var farMobs = Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|near', 30, 'gray|criminal|red|enemy')
            if (farMobs.length > 0) {
                WalkTo(farMobs[0])
            }
        }

    }
}