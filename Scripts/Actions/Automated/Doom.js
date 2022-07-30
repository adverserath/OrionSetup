//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Debug.js
//#include UDP/Sender.js

function Room(_meet, _entry, _attack, _slayer, _deathRay, _mobType) {
    return {
        meet: _meet,
        entry: _entry,
        attack: _attack,
        slayer: _slayer,
        deathRay: _deathRay,
        mobType: _mobType,
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
        },
        MobType: function () {
            return this.mobType;
        }
    }
}
var undead = '0x400E1A68'
var demon = '0x400E13B0'
var none = '0x4008DC96'
var rooms = [
    Room(coordinate(471, 430, 0, 'Room1 Meet'), coordinate(471, 428, 0, 'Room1 Entry'), coordinate(492, 444, 0, 'Room1 Attack'), undead, true, any),
    Room(coordinate(462, 494, 0, 'Room2 Meet'), coordinate(460, 494, 0, 'Room2 Entry'), coordinate(476, 516, 0, 'Room2 Attack'), none, true, any),
    Room(coordinate(405, 500, 0, 'Room3 Meet'), coordinate(403, 502, 0, 'Room3 Entry'), coordinate(405, 527, 0, 'Room3 Attack'), demon, true, any),
    Room(coordinate(360, 476, 0, 'Room4 Meet'), coordinate(357, 476, 0, 'Room4 Entry'), coordinate(340, 500, 0, 'Room4 Attack'), undead, true, any),
    Room(coordinate(365, 433, 0, 'Room5 Meet'), coordinate(361, 433, 0, 'Room5 Entry'), coordinate(330, 436, 0, 'Room5 Attack'), demon, true, any),
    Room(coordinate(381, 429, 0, 'Room6 Meet'), coordinate(401, 429, 0, 'Room6 Entry'), coordinate(407, 428, 0, 'Room6 Attack'), demon, false, '0x013E'),

]

var groupSize = 0

var hitmarker = function(){
    var focus = Orion.FindTypeEx('0x3155')
    .filter(function (gem) {
        return gem.Properties().indexOf('Strength Bonus') != -1
    }).shift()
    if(focus!=null){
    var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;

return parseInt(0.05 * gemstr * 25)
}
return 0
}()

function DoomGauntlet() {


    groupSize = Orion.FindTypeEx(any, any, ground,
        'live', 10, 'green').length
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
            Sender_Method('*','CheckArtiChance')
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
        'live', 3, 'green').length) {
        Orion.Print('Waiting for group:'+ Orion.FindTypeEx(any, any, ground,
            'live', 3, 'green').length)
            Orion.Wait(2000)
    }
    Orion.Wait(1000)
    Sender('*', 'W:' + rooms[room].EntryPoint().X() + ':' + rooms[room].EntryPoint().Y() + ':' + rooms[room].EntryPoint().Z() + ':' + "");
    Orion.Wait(1000)
    WalkTo(rooms[room].EntryPoint(), 0)
    Orion.Wait(2000)
    Sender('*', 'W:' + rooms[room].AttackPoint().X() + ':' + rooms[room].AttackPoint().Y() + ':' + rooms[room].AttackPoint().Z() + ':' + "");
    WalkTo(rooms[room].AttackPoint(), 0)
    var mobiles = Orion.FindTypeEx(rooms[room].MobType(), any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 30, 'gray|criminal|red|enemy')

    mobiles.forEach(function (mobile) {
        Orion.Attack(mobile.Serial());
        Orion.Wait(500)
    })
    if(room==5)
    {
        Orion.Print('Im not fighting that without watching')
        var escape = coordinate(398, 432, 0, 'Room6 Retreat')
        Sender('*', 'W:' + escape.X() + ':' + escape.Y() + ':' + escape.Z() + ':' + "");

        WalkTo(escape)
        mobiles.forEach(function (mobile) {
            while(mobile.Exists())
            {
                Orion.Wait(3000)
            }
        })
        return
    }
    mobiles.forEach(function (mobile) {
        if (!Orion.BuffExists('0x9BD2'))
        {
            Orion.Print('Walk To mob')
            WalkTo(mobile, 10)
        }
        var isItDead = false
        Sender_WalkToMe('*', 1)

        while(!isItDead)
        {
            Orion.Print('Wait for death')

            while (!Orion.BuffExists('0x9BD2') && mobile.Hits()>0) {
                Orion.Print('DeathRay')

                Orion.Cast('Death Ray')
                if (Orion.WaitForTarget(4000)) {
                    Orion.TargetObject(mobile.Serial())
                }
                Orion.Wait(3000)
            }
            
            if(mobile.Hits()<=hitmarker)
            {
                Orion.Print("Wod Time")
                Sender_Method('*','SmartWoD')
                Orion.Wait(2000)
            }
    		else{
                if(!Orion.DisplayTimerExists('Corpse skin'))
                {
                    Orion.AddDisplayTimer('Corpse skin', 20000,'Custom','Bar','Corpse skin', 100,1200);
                    Orion.CastTarget('Corpse skin',mobile.Serial())
                    Orion.Wait(1500)
                }
    
                Sender_CastTarget('*', 'Flame Strike',Orion.FindObject(lastattack).Serial());
            }

            Orion.Wait(1000)
            if(!mobile.Exists())
            {
                Orion.Print('I cant see '+mobile.Name())
                Orion.Wait(5000)
                
                if(!mobile.Exists())
                {
                    Orion.Print(mobile.Name() + ' must be dead')
                    isItDead=true;
                }
            }
        }

    })
    while (mobiles.filter(function (mob) {
        return mob.Exists()
    }).length > 0) {
        Orion.Wait(2000)
    }
}

function CheckArtiChance()
{
        Orion.RequestContextMenu(Player.Serial());
        Orion.WaitContextMenuID(Player.Serial(), 1);
        Orion.Wait(500)
        if (Orion.WaitForGump(2000))
        {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xFC840358'))
            {
                gump0.Select(Orion.CreateGumpHook(11));
                Orion.Wait(400);
            }
        }
        if (Orion.WaitForGump(2000))
        {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xFC840358'))
            {
                Orion.Wait(400);

                gump1.Select(Orion.CreateGumpHook(104));
            }
        }
        if (Orion.WaitForGump(2000))
        {
            var gump3 = Orion.GetGump('last');
            if ((gump3 !== null) && (!gump3.Replayed()) && (gump3.ID() === '0xFC840358'))
            {
                var points = gump3.Text(14).substring(24).replace(/,/g, '')
                var message = Player.Name()+' : '+(0.000863316841*Math.pow(10,0.00000425531915*points)*100).toString().substring(0,5)+'%'
                Orion.SayParty(message)
                BotPush(message)
                gump3.Close()
            }
        }}

//Healing Script
//PetCaller