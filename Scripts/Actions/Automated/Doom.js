//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Debug.js
//#include UDP/Sender.js

function Room(_meet, _entry, _attack, _slayer, _deathRay, _mobType, _hides, _weakSpell) {
    return {
        meet: _meet,
        entry: _entry,
        attack: _attack,
        slayer: _slayer,
        deathRay: _deathRay,
        mobType: _mobType,
        hides: _hides,
        spell: _weakSpell,
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
        },
        Hides: function () {
            return this.hides;
        },
        Spell: function () {
            return this.spell;
        }
    }
}
var undead = '0x400E1A68'
var demon = '0x400E13B0'
var none = '0x4008DC96'
var rooms = [
    Room(coordinate(471, 429, 0, 'Room1 Meet'), coordinate(471, 428, 0, 'Room1 Entry'), coordinate(492, 444, 0, 'Room1 Attack'), undead, true, '0x0139', false, "Flame Strike"),
    Room(coordinate(463, 494, 0, 'Room2 Meet'), coordinate(462, 494, 0, 'Room2 Entry'), coordinate(476, 513, 0, 'Room2 Attack'), none, true, '0x013B', false, "Flame Strike"),
    Room(coordinate(404, 501, 0, 'Room3 Meet'), coordinate(403, 502, 0, 'Room3 Entry'), coordinate(405, 527, 0, 'Room3 Attack'), demon, true, '0x0132', false, "Flame Strike"),
    Room(coordinate(358, 476, 0, 'Room4 Meet'), coordinate(357, 476, 0, 'Room4 Entry'), coordinate(340, 500, 0, 'Room4 Attack'), undead, true, '0x0137', true, "Energy Bolt"),
    Room(coordinate(362, 433, 0, 'Room5 Meet'), coordinate(361, 433, 0, 'Room5 Entry'), coordinate(330, 436, 0, 'Room5 Attack'), demon, true, '0x0138', false, "Energy Bolt"),
    Room(coordinate(400, 429, 0, 'Room6 Meet'), coordinate(401, 429, 0, 'Room6 Entry'), coordinate(407, 428, 0, 'Room6 Attack'), demon, false, '0x013E', true, "Flame Strike"),
]

var groupSize = 0

var hitmarker = function () {
    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()
    if (focus != null) {
        var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;

        return parseInt(0.05 * gemstr * 25)
    }
    return 0
}()

function DoomGauntlet() {
    groupSize = Orion.FindTypeEx(any, any, ground,
        'live', 10, 'green').length
    Orion.Print('Group size: ' + groupSize)

    Sender('*', 'W:' + 423 + ':' + 430 + ':' + Player.Z() + ':' + Player.Direction() + ':' + 15);
    WalkTo(coordinate(423, 430), 15)
    //Orion.PauseScript()

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
            Sender_Method('*', 'CheckArtiChance')

            Orion.Print('walk to 25')
            Sender('*', 'W:' + 423 + ':' + 430 + ':' + Player.Z() + ':' + Player.Direction() + ':' + 25);
            WalkTo(coordinate(423, 430), 25)

            WaitForGroup();

            //Orion.PauseScript()
            DoRoom(index)
            //Print next chance of drop
        }
        room = 0;
    }
}

function WaitForGroup() {
    while (groupSize != Orion.FindTypeEx(any, any, ground,
        'live', 3, 'green').length) {
        Orion.Print('Waiting for group:' + Orion.FindTypeEx(any, any, ground,
            'live', 3, 'green').length);
        Orion.Wait(1000);
        Sender('*', 'W:' + Player.X() + ':' + Player.Y() + ':' + Player.Z() + ':' + Player.Direction() + ':');
    }
}

function DoRoom(room) {
    Orion.Print('Doing room ' + room)
    Orion.RegWrite('room', room);

    if (room == 5) {
        Sender_Method('*', 'BoneCutter')
        Sender_CastTarget('*', "Gift of Life", "self");
    }
    Orion.Unequip('RightHand');
    Orion.Wait(800)
    Orion.Print('Equip ' + rooms[room].Slayer())
    Orion.Equip(rooms[room].Slayer());

    Sender('*', 'W:' + rooms[room].Meet().X() + ':' + rooms[room].Meet().Y() + ':' + rooms[room].Meet().Z() + ':' + "");
    WalkTo(rooms[room].Meet(), 0)

    WaitForGroup();

    Orion.Wait(1000)
    Sender('*', 'W:' + rooms[room].EntryPoint().X() + ':' + rooms[room].EntryPoint().Y() + ':' + rooms[room].EntryPoint().Z() + ':' + "");
    Orion.Wait(1000)
    WalkTo(rooms[room].EntryPoint(), 0)
    Orion.Wait(2000)
    Sender('*', 'W:' + rooms[room].AttackPoint().X() + ':' + rooms[room].AttackPoint().Y() + ':' + rooms[room].AttackPoint().Z() + ':' + "");
    WalkTo(rooms[room].AttackPoint(), 0)
    var mobiles = null
    var isItDead = true

    while (Orion.FindTypeEx(rooms[room].MobType(), any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends', 24, 'gray|criminal|red|enemy').length != 0 || isItDead == false) {
        isItDead = false
        mobiles = Orion.FindTypeEx(rooms[room].MobType(), any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 24, 'gray|criminal|red|enemy')

        var mobile = mobiles[0]
        if (mobile == null)
            return
        MoveAwayFromBoss(mobile)
        Orion.Attack(mobile.Serial());
        Orion.Wait(1000)

        //Dark Father
        if (room == 5) {
            while (!isItDead) {
                Orion.Wait(200)
                //Get away from it
                MoveAwayFromBoss(mobile)

                //Use Death Ray
                if (mobile.Hits() <= hitmarker) {
                    Orion.Print("Wod Time")
                    Sender_Method('*', 'SmartWoD')
                    MoveAwayFromBoss(mobile)
                    Orion.Wait(1000)
                }
                else if (!Orion.BuffExists('0x9BD2')) {
                    Orion.Print('Walk To mob')
                    WalkTo(mobile, 10)

                    if (Player.Mana() > 40 && !Orion.BuffExists('Arcane Empowerment') && Orion.ClientLastAttack() != '0x00000000') {
                        Cast('Arcane Empowerment')
                        Orion.Wait(1000)
                    }
                    MoveAwayFromBoss(mobile)

                    if (!Orion.BuffExists('0x9BD2') && mobile.Hits() > 0 && mobile.Distance() < 11 && mobile.Distance() > 2 && Player.Mana() < 50 && !Orion.IsWalking()) {
                        Orion.CastTarget(rooms[room].Spell(), mobile.Serial())
                        Orion.Wait(1000)
                    }
                    else if (!Orion.BuffExists('0x9BD2') && mobile.Hits() > 0 && mobile.Distance() < 11 && mobile.Distance() > 2 && Player.Mana() > 50 && !Orion.IsWalking()) {
                        Orion.Print('DeathRay')

                        Orion.Cast('Death Ray')
                        if (Orion.WaitForTarget(4000)) {
                            while(Orion.BuffExists('0x9BD2'))
                            {
                                Orion.Wait(400)
                            }
                            MoveAwayFromBoss(mobile)
                            while(Orion.IsWalking())
                            {
                                Orion.Wait(200)
                            }
                            Orion.TargetObject(mobile.Serial())
                        }
                        Orion.Wait(500)
                        Sender('*', 'W:' + Player.X() + ':' + Player.Y() + ':' + Player.Z() + ':' + "" + ':' + 1);
                    }
                }


                if (!mobile.Exists()) {
                    Orion.Print('I cant see ' + mobile.Name())
                    if (rooms[room].Hides())
                        Orion.Wait(5000)
                    else
                        Orion.Wait(500)
                    if (!mobile.Exists()) {
                        Orion.Print(mobile.Name() + ' must be dead')
                        isItDead = true;
                    }
                }
            }

            //Kill everything else when its dead
            Orion.Print('___Clear up centre___')

            var corners = [coordinate(405, 419, 0, 'Corner1'),
            coordinate(405, 449, 0, 'Corner2'),
            coordinate(435, 421, 0, 'Corner3'),
            coordinate(443, 449, 0, 'Corner4')
            ]

            Orion.Unequip('RightHand');
            Orion.Wait(800)
            Orion.Equip(rooms[room].Slayer());

            corners.forEach(function (corner) {
                Sender('*', 'W:' + corner.X() + ':' + corner.Y() + ':' + Player.Z() + ':' + "" + ':' + 5);
                WalkTo(corner, 5)

                var otherMobs = Orion.FindTypeEx(any, any, ground,
                    'nothumanmobile|live|ignoreself|ignorefriends', 35, 'gray|criminal|red|enemy')

                otherMobs.forEach(function (mob) {
                    while (mob.Exists()) {
                        Sender('*', 'W:' + mob.X() + ':' + mob.Y() + ':' + mob.Z() + ':' + "" + ':' + 10);
                        WalkTo(mob, 10)
                        if(Player.Mana()>40)
                            Sender_CastTarget('*', rooms[room].Spell(), mob.Serial());
                        Orion.Wait(1000)
                    }
                })
            })

            return
        }
        else {
            Orion.Print('Found ' + mobiles.length + " mobs")
            mobiles.forEach(function (mobile) {
                if (!Orion.BuffExists('0x9BD2')) {
                    Orion.Print('Walk To mob')
                    WalkTo(mobile, 10)
                }
                Sender_WalkToMe('*', 1)

                while (!isItDead) {
                    Orion.Print('Wait for death')

                    if (mobile.Hits() <= hitmarker) {
                        Orion.Print("Wod Time")
                        Sender_Method('*', 'SmartWoD')
                        Orion.Wait(2000)
                    }
                    else if (!Orion.BuffExists('0x9BD2')) {
                        Orion.Print('Walk To mob')
                        WalkTo(mobile, 10)

                        while (!Orion.BuffExists('0x9BD2') && mobile.Hits() > 0 && mobile.Distance() < 11 && mobile.Distance() > 2 && Player.Mana() > 85*((100-Player.LMC())/100)) {
                            Orion.Print('DeathRay')

                            Orion.Cast('Death Ray')
                            if (Orion.WaitForTarget(4000)) {
                                Orion.TargetObject(mobile.Serial())
                            }
                            Orion.Wait(1000)
                            Sender('*', 'W:' + Player.X() + ':' + Player.Y() + ':' + Player.Z() + ':' + "" + ':' + 1);
                        }
                    }
                    else {
                        if (Player.Mana() > 50 && rooms[room].Spell()== "Flame strike") {
                             if (!Orion.DisplayTimerExists('Corpse skin') && rooms[room].Spell()=="Flame Strike") {
                                 Orion.AddDisplayTimer('Corpse skin', 20000, 'Custom', 'Bar', 'Corpse skin', 100, 1200);
                                 Orion.CastTarget('Corpse skin', mobile.Serial())
                                Orion.Wait(1500)
                             }

                            Sender_CastTarget('*', rooms[room].Spell(), Orion.FindObject(lastattack).Serial());
                        }
                    }

                    Orion.Wait(1000)
                    if (!mobile.Exists()) {
                        Orion.Print('I cant see ' + mobile.Name())
                        if (rooms[room].Hides())
                            Orion.Wait(5000)
                        else
                            Orion.Wait(500)
                        if (!mobile.Exists()) {
                            Orion.Print(mobile.Name() + ' must be dead')
                            isItDead = true;
                        }
                    }
                }

            })
        }
    }
    while (mobiles.filter(function (mob) {
        return mob.Exists()
    }).length > 0) {
        Orion.Wait(2000)
    }
}

function MoveAwayFromBoss(mobile) {
    if (mobile.Distance() <= 2) {
        var escape = StayAwayGetLocation(mobile.Serial(), 10)
        Sender('*', 'W:' + escape.X() + ':' + escape.Y() + ':' + escape.Z() + ':' + "" + ':' + "");
        Orion.ToggleScript('WalkTo', false, [escape.X(), escape.Y()])
    }
    else {
        Sender('*', 'W:' + Player.X() + ':' + Player.Y() + ':' + Player.Z() + ':' + "" + ':' + 1);
    }
}

function CheckArtiChance() {
    Orion.RequestContextMenu(Player.Serial());
    Orion.WaitContextMenuID(Player.Serial(), 1);
    Orion.Wait(500)
    if (Orion.WaitForGump(2000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xFC840358')) {
            gump0.Select(Orion.CreateGumpHook(11));
            Orion.Wait(400);
        }
    }
    if (Orion.WaitForGump(2000)) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xFC840358')) {
            Orion.Wait(400);

            gump1.Select(Orion.CreateGumpHook(104));
        }
    }
    if (Orion.WaitForGump(2000)) {
        var gump3 = Orion.GetGump('last');
        if ((gump3 !== null) && (!gump3.Replayed()) && (gump3.ID() === '0xFC840358')) {
            var points = gump3.Text(14).substring(24).replace(/,/g, '')
            var message = Player.Name() + ' : ' + (0.000863316841 * Math.pow(10, 0.00000425531915 * points) * 100).toString().substring(0, 5) + '%'
            Orion.SayParty(message)
            BotPush(message)
            gump3.Close()
        }
    }
}

function BoneCutter() {
    var blade = Orion.FindTypeEx('0x13B6|0x13FF', any, backpack).shift();
    Orion.Print('Blade:'+blade.Name())
    while (blade.Exists()) {
        if (!Orion.DisplayTimerExists('RoomCheck')) {
            Orion.AddDisplayTimer('RoomCheck', 10000, 'Custom', 'Bar', 'RoomCheck', 0, 1200);
            var room = parseInt(Orion.RegRead('room'));
            if (room != 5) {
                Orion.Terminate('BoneCutter')
            }
        }

        Orion.Wait(200)
        var bones = Orion.FindTypeEx('0x0ECF', any, ground, 'item', 2)
        bones.forEach(function (bone) {
            if (!Orion.BuffExists('0x9BD2')) {
                WalkTo(bone, 1)
            }
            Orion.UseObject(blade.Serial());
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(bone.Serial());
            }
            Orion.Wait(800)
        });
    }

}
//Healing Script
//PetCaller