//#include helpers/SOSList.js
//#include helpers/Target.js

var sosZones = [
/*0*/[8, 88, (88 + 8), (3927 + 88)],
/*1*/[96, 1547, (192 + 96), (2463 + 1547)],
/*2*/[288, 1729, (262 + 288), (260 + 1729)],
/*3*/[550, 1873, (136 + 550), (159 + 1873)],
/*4*/[1584, 3617, (448 + 1584), (464 + 3617)],
/*5*/[2360, 2497, (920 + 2360), (728 + 2497)],
/*6*/[2640, 3705, (1384 + 2640), (344 + 3705)],
/*7*/[3232, 3257, (760 + 3232), (408 + 3257)],
/*8*/[2296, 1353, (1272 + 2296), (528 + 1353)],
/*9*/[2952, 1041, (496 + 2952), (312 + 1041)],
/*10*/[3568, 25, (256 + 3568), (976 + 25)],
/*11*/[3872, 1585, (584 + 3872), (1344 + 1585)],
/*12*/[4464, 1585, (560 + 4464), (664 + 1585)],
/*13*/[4464, 2433, (568 + 4464), (496 + 2433)]
]

function GetZone(x, y) {
    Orion.Print('Method Entry - GetZone')
    for (var index = 0; index < sosZones.length; index++) {
        var zone = sosZones[index]
        if (x >= zone[0] && x <= zone[2] && y >= zone[1] && y <= zone[3]) {
            return index
        }
    }

}

function SoSInSoSList(sosSerial) {
    Orion.Print('Method Entry - SoSInSoSList')
    var loc = null;
    for (var index = 0; index < sosList.length; index++) {
        var sos = sosList[index];
        if (sos[0] === sosSerial) {
            loc = coordinate(sos[1], sos[2], 0)
            break;
        }
    }
    return loc;
}

function GetSOSLocation(sosObject) {
    Orion.Print('Method Entry - GetSOSLocation')
    if (sosObject == null)
        sosObject = SelectTarget()

    Orion.Print('Checking')
    var pos = SoSInSoSList(sosObject.Serial())
    if (pos !== null) {
        return pos;
    }
    Orion.Print('Reading from Map')

    Orion.UseObject(sosObject.Serial())
    Orion.Wait(500)
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x550A461B')) {
        var com = gump0.CommandList()[2]
        //Orion.Print(com)
        Orion.Print(com.match(/.*@(.*)@.*/i)[1])
        pos = Orion.SextantToXY(com.match(/.*@(.*)@.*/i)[1], 1);
        Orion.Print('X:' + pos.X() + ' Y: ' + pos.Y())
        gump0.Select(Orion.CreateGumpHook(0));
        Orion.Wait(400);
        Orion.Print('SOS Zone: ' + GetZone(pos.X(), pos.Y()))
        return pos;
    }
}

var foundSOS = 0
function MoveAllSOSInBagToChests() {
    // Find all SOS in bag
    OpenAnyMiBs()
    var SOSs = Orion.FindTypeEx('0x14EE', any, backpack)
    SOSs.forEach(function (sos) {

        var pos = GetSOSLocation(sos)
        var zone = GetZone(pos.X(), pos.Y())
        var chest = Orion.FindTypeEx('0x0E3D', any, ground, 'item', 20).filter(function (box) {
            return Orion.Contains(box.Properties(), "SOS " + zone + '\n')
        })[0]
        WalkTo(chest)
        Orion.Wait(800)
        Orion.MoveItem(sos.Serial(), 1, chest.Serial())
        Orion.Wait(800)
        foundSOS++
    })
    BotPush('SOS found :' + foundSOS, true)
}

var foundMaps = 0
function MoveStashMapsInBagToChests() {
    // Move stash maps to box
    var maps = Orion.FindTypeEx('0x14EC', any, backpack).filter(function (map) {
        return Orion.Contains(map.Properties(), "Trammel") && Orion.Contains(map.Properties(), "Stash")
    })
    maps.forEach(function (map) {
        var chest = Orion.FindTypeEx('0x0E3D', any, ground, 'item', 20).filter(function (box) {
            return Orion.Contains(box.Properties(), "T-Map Trammel Stash")
        })[0]
        WalkTo(chest)
        Orion.Wait(800)
        Orion.MoveItem(map.Serial(), 1, chest.Serial())
        Orion.Wait(800)
        foundMaps++
    })
    BotPush('Maps found :' + foundMaps, true)
}

function OpenAnyMiBs() {
    Orion.FindTypeEx('0xA30C').forEach(function (_) {
        Orion.UseObject(_.Serial())
        Orion.Wait(1800)
    })
}