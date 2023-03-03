//#include helpers/SOSList.js
//#include helpers/Target.js
//#include helpers/Debug.js

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
    Debug(' Method Entry - GetZone')
    for (var index = 0; index < sosZones.length; index++) {
        var zone = sosZones[index]
        if (x >= zone[0] && x <= zone[2] && y >= zone[1] && y <= zone[3]) {
            return index
        }
    }

}

function SoSInSoSList(sosSerial) {
    Debug(' Method Entry - SoSInSoSList')
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
    Debug(' Method Entry - GetSOSLocation')
    if (sosObject == null)
        sosObject = SelectTarget()

    Orion.Print('Checking')
    var pos = SoSInSoSList(sosObject.Serial())
    if (pos !== null) {
        return pos;
    }
    Orion.Wait(1000)
    var gumpOpen = false
    Orion.Print(55, 'Reading from SOS:' + sosObject.Serial())
    do {
        Orion.UseObject(sosObject.Serial())
        gumpOpen = Orion.WaitForGump(1500)
    } while (Orion.InJournal('You must wait to perform another action.', 'sys', 0, any, Orion.Now() - 500) && !gumpOpen)

    var gump0 = Orion.GetGump(any, '0x550A461B')
    while (gump0 == null) {
        Orion.Print('looking for SOS gump')
        Orion.Wait(1000)
        Orion.UseObject(sosObject.Serial())
        Orion.Wait(1000)
        gump0 = Orion.GetGump(any, '0x550A461B')
    }
    Orion.Print(gump0.Replayed())
    Orion.Print(gump0.ID())

    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x550A461B')) {
        var com = gump0.CommandList()[2]
        //Orion.Print(com)
        Orion.Print(com.match(/.*@(.*)@.*/i)[1])
        pos = Orion.SextantToXY(com.match(/.*@(.*)@.*/i)[1], 1);
        Orion.Print(65, 'X:' + pos.X() + ' Y: ' + pos.Y())
        gump0.Select(Orion.CreateGumpHook(0));
        Orion.Wait(200);
        Orion.Print(65, 'SOS Zone: ' + GetZone(pos.X(), pos.Y()))
        return pos;
    }
    else {
        Orion.Print(65, 'Last gumps was not SOS')
    }
}

function MoveAllSOSInBagToChests(foundLast) {
    // Find all SOS in bag
    var foundSOS = 0

    var currentSOSs = []
    if (foundLast)
        currentSOSs = Orion.FindType('0x14EE', any, backpack)
    OpenAnyMiBs()
    var SOSs = Orion.FindTypeEx('0x14EE', any, backpack).filter(function (sos) {
        return currentSOSs.indexOf(sos.Serial()) == -1
    })
    SOSs.forEach(function (sos) {

        var pos = GetSOSLocation(sos)
        Orion.Print(pos)
        var zone = GetZone(pos.X(), pos.Y())
        Orion.Wait(850)
        Orion.Print(zone)
        MoveSoSToChest(sos.Serial(), zone)
        foundSOS++
    })
    CountGlobalValue('foundSOS', foundSOS, 'SOS found')
}

function MoveSoSToChest(serial, zone) {
    var chest = Orion.FindTypeEx('0x0E3D', any, ground, 'item', 20).filter(function (box) {
        return Orion.Contains(box.Properties(), "SOS " + zone + '\n')
    })[0]
    WalkTo(chest)
    Orion.MoveItem(serial, 1, chest.Serial())
    Orion.Wait(800)
}

function OpenAnyMiBs() {
    Orion.FindTypeEx('0xA30C').forEach(function (_) {
        Orion.UseObject(_.Serial())
        Orion.Wait(1800)
    })
}