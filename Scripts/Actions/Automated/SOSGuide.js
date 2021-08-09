var seabook = '0x40019854'
var seakey = '0x4003D723'
var seaBox = '0x40055745'
var seaBin = '0x400F63CF'
var goldChestId  = '0x40026602' 
var essenceBox = '0x400C5E3B'
var shipwreckLoot = '0x40005936'
var netLoot = '0x400DEE70'
var scrollBox = '0x400F48A7'
var rareBox = '0x4014460B'

function GetSoSFromGroup() {
    Orion.Print('Make sure you have all SOS in sos.txt')
    Orion.Print('Enter Groups')
    var group = Orion.InputText()
    var groups = Orion.Split(group, ' ').map(function (x) { return parseInt(x) });

    Orion.Print(groups.indexOf(0))

    Orion.Print('Select Box of SOS')
    var box = SelectTarget()
    var soses = []
    var file = Orion.NewFile();

    file.Open('sos.txt');
    if (file != null) {
        var soses = JSON.parse(file.ReadLine());
    }
    else{
        var SOSs = Orion.FindTypeEx('0x14EE', any, box.Serial())
    SOSs.forEach(function (sos) {
        var pos = GetSOSLocation(sos)
        var zone = GetZone(pos.X(), pos.Y())
        soses.push([sos.Serial(), pos.X(), pos.Y(), zone])
    })
    }
    file.Close();
    soses.forEach(function (sos) {
        Orion.Print(groups[0].length)
        Orion.Print(groups.indexOf(parseInt(sos[3])))
        if (groups.indexOf(sos[3]) != -1) {
            Orion.MoveItem(sos[0], 1, backpack);
            Orion.Wait(850)
        }
    })
}

function ReadAllSOSToFile() {
    var soses = []
    var SOSs = Orion.FindTypeEx('0x14EE', any, backpack)
    SOSs.forEach(function (sos) {
        var pos = GetSOSLocation(sos)
        var zone = GetZone(pos.X(), pos.Y())
        soses.push([sos.Serial(), pos.X(), pos.Y(), zone])
    })
    soses = sosList.sort(function (z1, z2) { return z1[2] - z2[2] })
    soses = sosList.sort(function (z1, z2) { return z1[3] - z2[3] })
    var newFile = Orion.NewFile();
    newFile.Open('sos.txt');
    newFile.WriteLine(JSON.stringify(soses))
    newFile.Close();
}

function GetSOSLocation(sos) {
    var pos = null
    if (sos == null)
        sos = SelectTarget()
    Orion.UseObject(sos.Serial())
    Orion.Wait(500)
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x550A461B')) {
        var com = gump0.CommandList()[2]
        //Orion.Print(com)
        Orion.Print(com.match(/.*@(.*)@.*/i)[1])
        pos = Orion.SextantToXY(com.match(/.*@(.*)@.*/i)[1]);
        Orion.Print('X:' + pos.X() + ' Y: ' + pos.Y())
        gump0.Select(Orion.CreateGumpHook(0));
        Orion.Wait(400);
        return pos;
    }
}

function GoToSOS() {
    var sos = SelectTarget()
    var pos = GetSOSLocation(sos)
    Orion.Wait(1000)
    SteerTo(pos.X(), pos.Y())
}

var sosOrder = []
function GoToClosestSOS(distance) {
	if(sosOrder.length == 0)
	{
	    var SOSs = Orion.FindTypeEx('0x14EE', any, backpack)
	    SOSs.forEach(function (sos) {
	        var pos = GetSOSLocation(sos)
	        sosOrder.push([sos.Serial(), pos.X(), pos.Y()])
	    })
    }
    sosOrder = sosOrder.sort(function (z1, z2) {
        return Orion.GetDistance(z1[1], z1[2]) - Orion.GetDistance(z2[1], z2[2])
    }
    )
    var sosId = sosOrder.shift()[0];
    var pos = GetSOSLocation(Orion.FindObject(sosId))
    if(pos===null)
    {
    return null
    }
    Orion.Wait(1000)
    SteerTo(pos.X(), pos.Y(),distance)
    return sosId
}

///#include Scripts/soslocations.jpg
function DoSOSInOrder() {
    while (Orion.FindTypeEx('0x14EE', any, backpack).length != 0) {
        var sosId = GoToClosestSOS(50)
        if(sosId===null)
        {
        	continue;
        }
        Orion.Wait(1000)
        Orion.Step(7)
        while (Orion.ObjectExists(sosId)) {
            //Fish
            Orion.UseObject('0x40026413');
            if (Orion.WaitForTarget(1000))
            {
            	SailToCorpse(true)
                Orion.TargetTileRelative('any', -3, -3, 65533);
             }
            Orion.Wait(10000)
        }
        Orion.Wait(1000)
        RecallRune(seabook);
       		ChestLootManager()
        RecallRune(seakey);
        Orion.Wait(1000)
    }
}

function ChestLootManager(_)
{
        //Walk to goldchest
        Orion.Print("Move Gold")
        WalkTo(goldChestId)
        MoveItemsFromPlayer(goldChestId, '0x0EED')
        MoveItemText("Essence|Crafting Resource",essenceBox)
        MoveItemText("Fishing Net",netLoot)
        MoveItemText("Salted|Live Rock|Aquarium|Polkadot|Wedding|Kelp|Driftwood|Valkyrie|Grape|Large Fish",rareBox)

	    MoveItemText("Fishing Net",netLoot)
        MoveScrolls()
         
        if(Orion.FindTypeEx(any,any,backpack).filter(function (item){return Orion.Contains(item.Properties(),"The Shipwreck")}).length>0)
        {
        Orion.Print('ancient!!')
        	Orion.PauseScript()
        	        MoveItemText("The Shipwreck",shipwreckLoot)

        }
        MoveItemText("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron",scrollBox)

         Orion.PauseScript()

        //Walk to trash
        //Move chest
        //Move shipwreck items
}

function MoveItemText(text,container)
{
        Orion.FindTypeEx(any,any,backpack).filter(function (item){return Orion.Contains(item.Properties(),text)}).forEach(function(loot){
        	Orion.Print(text)
            MoveItemsFromPlayer(container, loot.Graphic())
        })
}
function MoveScrolls(_)
{
    var scrollIndex = 0;
    var firstScroll = parseInt('0x1F2D');
    for (var index = 0; index < 65; index++) {
        var scrollId = '0x' + (firstScroll + index).toString(16).toUpperCase();
        Orion.Print(scrollId)
        Orion.FindTypeEx(scrollId,any,backpack)
        .forEach(function(loot){
            Orion.Print("Move " + loot.Name())
            MoveItemsFromPlayer(scrollBox, loot.Graphic())
        })
    }
}
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/Actions/Automated/DriveBoat.js
//#include Scripts/helpers/Map.js
//#include Scripts/helpers/SOS.js
//#include Scripts/helpers/PathFinding.js
//#include Scripts/WIP/TestScripts.js