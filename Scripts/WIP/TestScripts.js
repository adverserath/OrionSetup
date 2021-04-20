function TestX()
{
    var radius = 18;
    var radiusZ = 2;
    var tileType = 'any|land';
    var yeahLocations = [];
    var nahLocations = [];
    var allLocations = Orion.GetTilesInRect(tileType, Player.X() - radius, Player.Y() - radius, Player.Z() - radiusZ, Player.X() + radius, Player.Y() + radius, Player.Z() + radiusZ);

    Orion.ClearFakeMapObjects();
    var nahLocations = allLocations.filter(function(obj)
    {
        var flags = toHexString(obj.Flags());
        var flagsArray = toHexArray(flags);
        return (!(flagsArray[6] == 0 || flagsArray[6] == 2 || flagsArray[6] == 8 || flagsArray[6] == 'A'))
    });

    var yeahLocations = allLocations.filter(function(obj)
    {
        return !nahLocations.some(function(obj2)
        {
            return obj.X() == obj2.X() && obj.Y() == obj2.Y();
        });
    });

    nahLocations.forEach(function(nope, i)
    {
        Orion.AddFakeMapObject(10000 + i, '0x1822', 33, nope.X(), nope.Y(), Player.Z() + 5);
        //Orion.CharPrint(self, '33', 'NO: ' + i);
    });

    yeahLocations.forEach(function(yeah, i)
    {
        Orion.AddFakeMapObject(i, '0x1822', 88, yeah.X(), yeah.Y(), Player.Z() + 5);
        //Orion.CharPrint(self, '0x00A8', 'YES: ' + i);
    });

    Orion.CharPrint(self, '33', 'NO: ' + nahLocations.length);
    Orion.CharPrint(self, '0x00A8', 'YES: ' + yeahLocations.length);

}

function toHexString(n)
{
    if (n < 0)
    {
        n = 0xFFFFFFFF + n + 1;
    }
    return "0x" + ("00000000" + n.toString(16).toUpperCase()).substr(-8);
}

function toHexArray(hexVal)
{

    var substrHexVal = hexVal.substring(2, hexVal.length);

    var splitHexVal = substrHexVal.split("");

    return splitHexVal;

}