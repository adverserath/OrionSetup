//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Debug.js
//#include UDP/Sender.js

function Room(_meet, _entry, _attack, _slayer, _deathRay) {
    return {
        meet: _meet,
        entry: _entry,
        attack: _attack,
        slayer: _slayer,
        deathRay: _deathRay,
        Meet: function () {
            return this.meet;
        },
        EntryPoint: function () {

            return this.entry;
        },
        AttackPoint: function () {

            return this.attack;
        },
        Slayer: function () {

            return this.slayer;
        },
        DeathRay: function () {
            return this.deathray;
        }
    }
}
var undead = '0x400E1A68'
var demon = '0x400E13B0'
var none = '0x4008DC96'
var rooms = [
    Room(coordinate(471, 430, 0, 'Room1 Meet'), coordinate(471, 428, 0, 'Room1 Entry'), coordinate(492, 444, 0, 'Room1 Attack'), undead, true),
    Room(coordinate(460, 494, 0, 'Room2 Meet'), coordinate(462, 494, 0, 'Room2 Entry'), coordinate(476, 516, 0, 'Room2 Attack'), none, true),
    Room(coordinate(405, 500, 0, 'Room3 Meet'), coordinate(403, 502, 0, 'Room3 Entry'), coordinate(405, 527, 0, 'Room3 Attack'), demon, true),
    Room(coordinate(360, 476, 0, 'Room4 Meet'), coordinate(357, 476, 0, 'Room4 Entry'), coordinate(340, 500, 0, 'Room4 Attack'), undead, true),
    Room(coordinate(365, 433, 0, 'Room5 Meet'), coordinate(361, 433, 0, 'Room5 Entry'), coordinate(330, 431, 0, 'Room5 Attack'), demon, true),
    Room(coordinate(403, 429, 0, 'Room6 Meet'), coordinate(403, 429, 0, 'Room6 Entry'), coordinate(381, 428, 0, 'Room6 Attack'), demon, false),

]

var groupSize = 0
function DoomGauntlet() {

    groupSize = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 10, 'green').length
    Orion.Print('Group size: ' + groupSize)
    var start = coordinate(421, 426, 0, 'Start')
    Sender('*', 'W:' + start.X() + ':' + start.Y() + ':' + start.Z() + ':' + "");
    WalkTo(start)

    var room = 0
    var activePent = Orion.FindTypeEx('0x0FEA', '0x0676', ground, 'item', 30).shift()
    Orion.Print(activePent.Serial())
    var activeX = activePent.X()
    switch (activeX) {
        case 417:
            room = 0;
            break;
        case 426:
            room = 1;
            break;
        case 432:
            room = 2;
            break;
        case 424:
            room = 3
            break;
        case 416:
            room = 4;
            break;
        case 423:
            room = 5;
            break;
        default:
            break;
    }
    Orion.Print('Room ' + room)
    //EquipSlayer
    while (true) {
        for (var index = room; index < rooms.length; index++) {
            Orion.Print('Doing room ' + index)
            DoRoom(index)
            //Print next chance of drop
        }
        room = 0;
    }
}

function DoRoom(room) {
    Orion.Unequip('RightHand');
    Orion.Wait(800)
    Orion.Print('Equip ' + rooms[room].Slayer())
    Orion.Equip(rooms[room].Slayer());

    Sender('*', 'W:' + rooms[room].Meet().X() + ':' + rooms[room].Meet().Y() + ':' + rooms[room].Meet().Z() + ':' + "");
    WalkTo(rooms[room].Meet(), 0)

    while (groupSize != Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 3, 'green').length) {
        Orion.Wait(2000)
    }
	Orion.Wait(1000)
    Sender('*', 'W:' + rooms[room].EntryPoint().X() + ':' + rooms[room].EntryPoint().Y() + ':' + rooms[room].EntryPoint().Z() + ':' + "");
    WalkTo(rooms[room].EntryPoint(), 0)
    Orion.Wait(2000)
    Sender('*', 'W:' + rooms[room].AttackPoint().X() + ':' + rooms[room].AttackPoint().Y() + ':' + rooms[room].AttackPoint().Z() + ':' + "");
    WalkTo(rooms[room].AttackPoint(), 0)
    var mobiles = Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 30, 'gray|criminal|red|enemy')

    mobiles.forEach(function (mobile) {
        Orion.Attack(mobile.Serial());
    })
    mobiles.forEach(function (mobile) {
        if (!Orion.BuffExists('0x9BD2'))
            WalkTo(mobile, 12)
        while (!Orion.BuffExists('0x9BD2')) {
            Orion.Cast('Death Ray')
            if (Orion.WaitForTarget(4000)) {
                Orion.TargetObject(mobile.Serial())
            }
            Orion.Wait(2000)
        }
    })
    while (mobiles.filter(function (mob) {
        return mob.Exists()
    }).length > 0) {
        Orion.Wait(2000)
    }
}
//Healing Script
//PetCaller