//#include Scripts/helpers/SOSList.js
//#include Scripts/helpers/Target.js

var sosZones = [
/*0*/    [8, 88, (88 + 8), (3927 + 88)],
/*1*/    [96, 1547, (192 + 96), (2463 + 1547)],
/*2*/    [288, 1729, (262 + 288), (260 + 1729)],
/*3*/    [550, 1873, (136 + 550), (159 + 1873)],
/*4*/    [1584, 3617, (448 + 1584), (464 + 3617)],
/*5*/    [2360, 2497, (920 + 2360), (728 + 2497)],
/*6*/    [2640, 3705, (1384 + 2640), (344 + 3705)],
/*7*/    [3232, 3257, (760 + 3232), (408 + 3257)],
/*8*/    [2296, 1353, (1272 + 2296), (528 + 1353)],
/*9*/    [2952, 1041, (496 + 2952), (312 + 1041)],
/*10*/    [3568, 25, (256 + 3568), (976 + 25)],
/*11*/    [3872, 1585, (584 + 3872), (1344 + 1585)],
/*12*/    [4464, 1585, (560 + 4464), (664 + 1585)],
/*13*/    [4464, 2433, (568 + 4464), (496 + 2433)]
]

function GetZone(x, y) {
    for (var index = 0; index < sosZones.length; index++) {
        var zone = sosZones[index]
        if (x >= zone[0] && x <= zone[2] && y >= zone[1] && y <= zone[3]) {
            return index
        }
    }

}

function SoSInSoSList(sosSerial){
    var loc = null;
    for (var index = 0; index < sosList.length; index++) {
        var sos = sosList[index];
        if(sos[0]===sosSerial){
            loc = coordinate(sos[1],sos[2],0)
            break;
        }
    }
    return loc;
}