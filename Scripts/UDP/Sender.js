//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include UDP/Receiver.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js
//#include helpers/Beetle.js
//#include helpers/DPSGump.js
//#include Fighting/Tamer.js
//#include Fighting/Corpses.js
//#include Fighting/Bushido.js
//#include Actions/Event/PumpkinPicker.js
//#include Actions/Automated/Doom.js
//#include Fighting/SpellWeaving.js
//#include Fighting/Healing.js
//#include helpers/Gates.js
//#include helpers/Quest.js

function FindSomething()
{
TextWindow.Open()
TextWindow.Print(Orion.FindObject('0x0000FEFD').Properties())
}
function TestFail()
{
Orion.Say('start12345')
    Orion.Unequip('RightHand');
    Orion.Wait(800)
    Orion.Equip('0x4006F200');
    Orion.Wait(800)
Orion.Say('end12345')
}
function DistanceFrom() {
    var t = SelectTarget()
    while (true) {
        Orion.Print(t.Distance())
        Orion.Wait(1000)
    }
}

function gridX(x, size) {
    return x * size
}

function gridY(y, size) {
    return y * size
}
function gridTX(x, size) {
    return x * size + 5
}

function gridTY(y, size) {
    return y * size + 5
}

var buttons = //x y CallBackID Text FunctionName
    [
        [[100, 30, 1100, "Follow", 'Sender_FollowMe'], [100, 30, 1200, "Walk To", 'Sender_WalkToHere'], [100, 30, 1300, "Walk To Me", 'Sender_WalkToMe']],
        [[50, 30, 2100, "Mount", 'Sender_MountPet'], [50, 30, 2200, "UnMount", 'Sender_UnmountPet'], [50, 30, 2300, "War", 'Sender_War'], [50, 30, 2400, "Peace", 'Sender_Peace'], [70, 30, 2500, "PetCaller", 'Sender_Method']],
        [[100, 30, 3100, "Attack", 'Sender_Attack'], [100, 30, 3200, "AF and Kill", 'AutoFollowAndKill'], [100, 30, 3300, "Open Corpses", 'Sender_OpenCorpses'], [70, 30, 3400, "Auto Kill", 'AutoKill']],
        [[100, 30, 4100, "Pet Guard", 'Sender_PetGuard'], [100, 30, 4200, "Pet Come", 'Sender_PetCome'], [100, 30, 4300, "Pet Attack", 'Sender_PetAttack']],
        [[100, 30, 5100, "Pet Stop", 'Sender_PetStop'], [100, 30, 5200, "Pet Stay", 'Sender_PetStay'], [100, 30, 5300, "Pet Follow", 'Sender_PetFollow']],
        [[100, 30, 6100, "Go Home", 'Sender_GoHome'], [100, 30, 6200, "Say", 'Sender_Speak'], [100, 30, 6300, "Accept Gump", 'Sender_AcceptGump']],
        [[100, 30, 7100, "Reload", 'Sender_Reload'], [100, 30, 7200, "CloseUO", 'Sender_CloseUO'], [100, 30, 7300, "RecoverCorpse", 'Sender_Method']]
    ]
var spells =
    [
        [[100, 30, 8100, "Gift Of Renewal", 'Sender_CastSelf'], [100, 30, 8200, "Gift Of Life", 'Sender_CastSelf'], [100, 30, 8300, "Word Of Death", 'Sender_CastTarget']],
        [[100, 30, 9100, 'Gift Of Renewal', 'Sender_CastMount'], [100, 30, 9200, "Gift Of Life", 'Sender_CastMount']],
        [[75, 30, 1010, 'Wildfire', 'Sender_CastTarget'], [75, 30, 1020, "Thunderstorm", 'Sender_Cast']
            , [75, 30, 1030, "GotoMistas", 'Sender_Method'], [75, 30, 1040, "GotoTW", 'Sender_Method'], [75, 30, 1050, "GotoBlood", 'Sender_Method'], [75, 30, 1060, "QuestRenew", 'Sender_Method']],

    ]
function Sender_CloseUO(serial) {
    Sender(serial, 'CloseUO:');
    if (serial === '*')
        Orion.CloseUO()
}

function Sender_FollowMe(serial) {
    Sender(serial, 'F:' + Player.Serial());
}

function Sender_WalkToMe(serial, offset) {
    if (offset == null) {
        offset = 0;
    }
    var xOffset = 0
    var yOffset = 0

    if (Player.Direction() == 0) {
        xOffset = 1 * offset
    }
    if (Player.Direction() == 4) {
        xOffset = -1 * offset
    }
    if (Player.Direction() == 2) {
        yOffset = 1 * offset
    }
    if (Player.Direction() == 6) {
        yOffset = -1 * offset
    }
    if (Player.Direction() === 1) {
        xOffset = 1 * offset
        yOffset = 1 * offset
    }
    if (Player.Direction() === 3) {
        xOffset = -1 * offset
        yOffset = 1 * offset
    }
    if (Player.Direction() == 5) {
        xOffset = -1 * offset
        yOffset = -1 * offset
    }
    if (Player.Direction() == 7) {
        xOffset = 1 * offset
        yOffset = -1 * offset
    }

    Sender(serial, 'W:' + (Player.X() + xOffset) + ':' + (Player.Y() + yOffset) + ':' + Player.Z() + ':' + Player.Direction());
}

function Sender_Reload(serial) {
    Sender(serial, 'Reload:');
}

function Sender_WalkToHere(serial) {
    var pathLocation = SelectCoordinate();
    Sender(serial, 'W:' + pathLocation.X() + ':' + pathLocation.Y() + ':' + pathLocation.Z());
    if (serial === '*')
        Orion.WalkTo(pathLocation.X(), pathLocation.Y(), pathLocation.Z(), 0, 3, 1)
}

function Sender_OpenCorpses(serial) {
    Sender(serial, 'Search:Corpse');
    OpenNearbyCorpses();
}

function Sender_War(serial) {
    Sender(serial, 'WAR:true');
    if (serial === '*')
        Orion.WarMode(true)
}
function Sender_Peace(serial) {
    Sender(serial, 'WAR:false');
    if (serial === '*')
        Orion.WarMode(false)
}

function Sender_MountPet(serial) {
    Sender(serial, 'M:true');
    if (serial === '*')
        MountPet(true)
}

function Sender_UnmountPet(serial) {
    Sender(serial, 'M:false');
    if (serial === '*')
        MountPet(false)
}

function Sender_Attack(serial) {
    var tobj = SelectTarget()
    if (tobj.Notoriety() != 2) {
        var target = tobj.Serial();
        if (target != null) {
            Orion.Attack(target)
            Sender(serial, 'A:' + target);
        }
    }
}
function Sender_Speak(serial) {
    var entry = Orion.InputText()
    if (serial === '*')
        Orion.Say(entry)
    Sender(serial, 'S:' + entry);
}

function Sender_PetAttack(serial) {
    var target = SelectTarget();
    if (target != null) {
        Sender(serial, 'PA:' + target.Serial());
        if (serial === '*')
            PetAttack(target.Serial())
    }
}

function Sender_CastTarget(serial, spellName, _target) {
    var target
    if (_target == null)
        target = SelectTarget().Serial();
    else
        target = _target

    if (target != null) {
        Sender(serial, 'Cast:' + spellName + ':' + target);
        if (serial === '*') {
            Orion.Print(spellName + ' : ' + target)
            Orion.CastTarget(spellName, target)
        }
    }
}

function Sender_EatMagicFood(serial) {
    Sender(serial, 'Eat:');
    if (serial === '*')
        EatMagicFood()
}


function Sender_Cast(serial, spellName) {
    Sender(serial, 'Cast:' + spellName);
    if (serial === '*')
        Orion.Cast(spellName)
}

function Sender_Method(serial, methodName, args) {
    Sender(serial, 'Method:' + methodName+':'+args);
    if (serial === '*')
        Orion.ToggleScript(methodName,args);
}

function Sender_CastMount(serial, spellName) {
    Sender(serial, 'Cast:' + spellName + ':mount');
    if (serial === '*') {
        Orion.CastTarget(spellName, 'mount')
    }
}

function Sender_CastSelf(serial, spellName) {
    Sender(serial, 'Cast:' + spellName + ':self');
    if (serial === '*')
        Orion.CastTarget(spellName, 'self')
}


function Sender_PetGuard(serial) {
    Sender(serial, 'PG');
    if (serial === '*')
        PetGuard()
}
function Sender_PetCome(serial) {
    Sender(serial, 'PC');
    if (serial === '*')
        PetCome()
}

function Sender_PetStop(serial) {
    Sender(serial, 'PST');
    if (serial === '*')
        PetStop()
}
function Sender_PetStay(serial) {
    Sender(serial, 'PS');
    if (serial === '*')
        PetStay()
}
function Sender_PetFollow(serial) {
    Sender(serial, 'PF');
    if (serial === '*')
        PetFollow()
}
function Sender_GoHome(serial) {
    Sender(serial, 'RH');
    if (serial === '*')
        GoHome()
}

function Sender_AcceptGump(serial) {
    Sender(serial, 'AG');
    if (serial === '*')
        AcceptGump()
}

function WalkToOffset() {
    var players = LoadPlayerJson()
    var offset = -1 * Shared.GetVar('Distance', 1)
    players.forEach(function (player) {
        Orion.Print(player.name + " to " + offset)
        Sender_WalkToMe(player.serial, offset)
        offset *= -1
    })
}

function AutoFollowAndKill(serial) {
    var lastX = Player.X()
    var lastY = Player.Y()
    var lastDirection = Player.Direction()
    var players = LoadPlayerJson()
    var lastAttacker = '';
    while (true) {
        Orion.Wait(1000)
        while (Player.WarMode()) {
            Orion.Wait(100)
            if (!Orion.IsWalking() && lastX != Player.X() || lastY != Player.Y() || (lastDirection != Player.Direction())) {
                Orion.Wait(100)
                if (!Orion.IsWalking()) {
                    WalkToOffset()
                }
                lastDirection = Player.Direction()
                lastX = Player.X()
                lastY = Player.Y()
            }
            if (Orion.ClientLastAttack() !== '0x00000000' && Orion.ClientLastAttack() !== lastAttacker) {
                Sender(serial, 'A:' + Orion.ClientLastAttack());
                lastAttacker = Orion.ClientLastAttack()
            }
        }
    }
}

function AutoKill(serial) {
    var lastAttacker = '';
    while (true) {
        Orion.Wait(1000)
        while (Player.WarMode()) {
            Orion.Wait(100)
            if (Orion.ClientLastAttack() !== '0x00000000' && Orion.ClientLastAttack() !== lastAttacker) {
                Sender(serial, 'A:' + Orion.ClientLastAttack());
                lastAttacker = Orion.ClientLastAttack()
            }
        }
    }
}

function HostCallback(_) {
    Orion.LoadScript('UDP/Sender.js')
    Orion.Print("test")

    var code = CustomGumpResponse.ReturnCode();
    if (code == 0) {
        var gump = Orion.CreateCustomGump(15);
        gump.Close();

        Orion.ClearGlobals()
        HostGump();
        players = []
        for (var ports = 1; ports < 5; ports++) {
            Orion.UdpSend(hostPort + ports, '*|WHO')
        }
        return
    }
    var players = LoadPlayerJson()

    var clientSerial = '*'
    Orion.Print(code)
    if (code.toString().length == 5) {
        var playerLocation = parseInt(code.toString()[0]) - 1
        clientSerial = players[playerLocation].serial
        code = parseInt(code)//.toString().substring(1, 3)
    }
    Orion.Print(code)

    buttons.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            if (button[2] == code) {
                Orion.Print('Execute ' + button[4] + ' ' + clientSerial + '|')
                Orion.ToggleScript(button[4], true, [clientSerial, button[3]])
                return
            }
        })
    });
    spells.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            Orion.Print('Execute ' + button[2] + ' ' + code)

            if (button[2] == code) {
                Orion.Print('Execute ' + button[4] + ' ' + clientSerial + '|')
                Orion.ToggleScript(button[4], true, [clientSerial, button[3]])
                return
            }
        })
    });
}

var warState = false;
function Sender(serial, message, playerName) {
    var players = LoadPlayerJson()

    players.forEach(function (player) {
        Orion.Print('Send To:' + player.name + ' on ' + player.port)
        if (playerName == null || player.name === playerName)
            Orion.UdpSend(player.port, serial + '|' + message)
    })
}

function LoadPlayerJson(_) {
    if (Orion.GetGlobal('updPlayers') == null || Orion.GetGlobal('updPlayers') == '') {
        return JSON.parse('[]')
    }
    else {
        return JSON.parse(Orion.GetGlobal('updPlayers'));
    }
}

function HostGump(_) {
    Shared.AddVar('Distance', 1)
    var gumpId = 60
    var gump = Orion.CreateCustomGump(gumpId);
    gump.Clear()
    gump.SetCallback('HostCallback');

    var players = LoadPlayerJson()


    var partition = Math.max.apply(Math, buttons.map(function (rows) {
        return rows.length
    })) * 100 + 30

    var widest = partition * (players.length + 1);

    gump.AddHtmlGump(1, 0, 0, widest, buttons.length * 30 + 130, '0x0BB8');
    gump.Select('htmlgump', 1);

    gump.AddResizepic(partition / 2 - 45, 10, '0x0BB7', 90, 30);
    gump.AddText(partition / 2 - 20, 10, '0x0035', '<h1>All</h1>');
    gump.AddMinMaxButtons(123456, 100, 10, '0x0037', 0, 0, 100000, 3500);
    var row = 0;
    var column = 0;
    //x y CallBackID Text FunctionName
    buttons.forEach(function (rowLayer) {
        var endOfLastButton = 0
        rowLayer.forEach(function (button) {
            gump.AddResizepic(endOfLastButton, gridY(row, button[1]) + 30, '0x24EA', button[0], button[1], button[2], 1);
            gump.AddText(endOfLastButton + 5, gridTY(row, button[1]) + 30, '0', button[3]);
            endOfLastButton += button[0]
            column++;
        })
        column = 0
        row++;
    });

    spells.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            gump.AddResizepic(gridX(column, button[0]), gridY(row, button[1]) + 30, '0x24EA', button[0], button[1], button[2], 1);
            gump.AddText(gridTX(column, button[0]), gridTY(row, button[1]) + 30, '0', button[3]);
            column++;
        })
        column = 0
        row++;
    });

    var i = 1;
    row = 0;
    column = 0;
    players.forEach(function (player) {
        var group = partition * (i + 1)
        gump.AddResizepic(group - (partition / 2) - 45, 10, '0x0BB7', 90, 30);
        gump.AddText(group - (partition / 2) - 20, 10, '0x0035', '<h1>' + player.name + '</h1>');

        buttons.forEach(function (rowLayer) {
            var endOfLastButton = 0

            rowLayer.forEach(function (button) {
                gump.AddResizepic(group - partition + endOfLastButton, gridY(row, button[1]) + 30, '0x24EA', button[0], button[1], i + '' + button[2], 1);
                gump.AddText(group - partition + endOfLastButton + 5, gridTY(row, button[1]) + 30, '0', button[3]);
                endOfLastButton += button[0]
                column++;
            })
            column = 0
            row++;

        });
        row = 0
        i++;
    })

    gump.Select('gump');
    gump.Update();
}

var hostPort = 2597;

var players = []
function Host() {
    Orion.ClearGlobals();
    Orion.Wait(200)
    UDPHostServer()
    Orion.Wait(200)
    HostGump()

    Orion.SetUdpServerCallback(Player.Name(), 'NewSubscriber');

    for (var ports = 1; ports < 5; ports++) {
        Orion.UdpSend('192.168.0.3', hostPort + ports, '*|WHO')
        Orion.Wait(200)
    }
}

function NewSubscriber(recv) {
    Orion.Print('NewSubscriber ' + recv)
    if (recv.length > 0) {
        players = LoadPlayerJson()

        var recvp = Orion.Split(recv, ':::')
        if (recvp[0] == 'Fail') {
            Orion.Print(recvp[1])
        }

        if (recvp[0] == 'Player') {
            var jsPlayer = JSON.parse(recvp[1])
            var shouldAdd = true;
            players.forEach(function (pl) {
                if (pl.name === jsPlayer.name) {
                    shouldAdd = false;
                    Orion.Print('Dont Add ' + jsPlayer.name)
                    if (pl.port != jsPlayer.port) {
                        pl.port = jsPlayer.port
                        Orion.Print("Updated Port")
                    }
                    pl.skills = jsPlayer.skills
                    Orion.Print("Updated Skills")
                    Orion.SetGlobal('updPlayers', JSON.stringify(players));
                }
            })
            if (shouldAdd) {
                players.push(jsPlayer);
                Orion.SetGlobal('updPlayers', JSON.stringify(players));
                HostGump()
            }
        }
    }
}

function UDPHostServer(_) {
    Orion.RemoveAllUdpServers();

    var created = Orion.CreateUdpServer(Player.Name(), '0.0.0.0', hostPort);
    if (created == 0) {
        Orion.Print('UDP server created and listening port: ' + hostPort);
    }
    else {
        Orion.Print('UDP server cannot be created: ' + hostPort);
    }
}

function UdpPlayer(name, port) {
    return {
        _name: name,
        _port: port,
        _skills: skills,
        Name: function () {
            return this._name;
        },
        Port: function () {
            return this._port;
        },
        Skills: function () {
            return this._skills;
        }
    }
}