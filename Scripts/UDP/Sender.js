//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include UDP/Receiver.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js
//#include Fighting/Tamer.js
//#include Fighting/Corpses.js
//#include Fighting/Bushido.js
//#include Actions/Event/PumpkinPicker.js

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
        [[100, 30, 11, "Follow", 'Sender_FollowMe'], [100, 30, 12, "Walk To", 'Sender_WalkToHere'], [100, 30, 13, "Walk To Me", 'Sender_WalkToMe']],
        [[50, 30, 21, "Mount", 'Sender_MountPet'], [50, 30, 22, "UnMount", 'Sender_UnmountPet'], [50, 30, 23, "War", 'Sender_War'], [50, 30, 24, "Peace", 'Sender_Peace']],
        [[100, 30, 31, "Attack", 'Sender_Attack'], [100, 30, 32, "AF and Kill", 'AutoFollowAndKill'], [100, 30, 25, "Open Corpses", 'Sender_OpenCorpses']],
        [[100, 30, 41, "Pet Guard", 'Sender_PetGuard'], [100, 30, 42, "Pet Come", 'Sender_PetCome'], [100, 30, 43, "Pet Attack", 'Sender_PetAttack']],
        [[100, 30, 51, "Pet Stop", 'Sender_PetStop'], [100, 30, 52, "Pet Stay", 'Sender_PetStay']],
        [[100, 30, 61, "Go Home", 'Sender_GoHome'], [100, 30, 62, "Say", 'Sender_Speak'], [100, 30, 63, "Accept Gump", 'Sender_AcceptGump']],
        [[100, 30, 71, "Reload", 'Sender_Reload'], [100, 30, 72, "CloseUO", 'Sender_CloseUO']]
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
    var target = SelectTarget().Serial();
    if (target != null) {
        Orion.Attack(target)
        Sender(serial, 'A:' + target);
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
                var offset = -1 * 1
                Orion.Wait(100)
                if (!Orion.IsWalking()) {
                    players.forEach(function (player) {
                        Sender_WalkToMe(player.serial, offset)
                        offset *= -1
                    })
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
function HostCallback(_) {
    Orion.LoadScript('UDP/Sender.js')
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
    if (code.toString().length == 3) {
        var playerLocation = parseInt(code.toString()[0]) - 1
        clientSerial = players[playerLocation].serial
        code = code.toString().substring(1, 3)
    }

    buttons.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            if (button[2] == code) {
                Orion.Print('Execute ' + button[4] + ' ' + clientSerial + '|')
                Orion.ToggleScript(button[4], true, clientSerial)
                return
            }
        })
    });
}

var warState = false;
function Sender(serial, message, playerName) {
    var players = LoadPlayerJson()

    players.forEach(function (player) {
        //Orion.Print('Send To:' + player.name + ' on ' + player.port)
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
    var gumpId = 60
    var gump = Orion.CreateCustomGump(gumpId);
    gump.Clear()
    gump.SetCallback('HostCallback');

    var players = LoadPlayerJson()


    var partition = Math.max.apply(Math, buttons.map(function (rows) {
        return rows.length
    })) * 100 + 30

    var widest = partition * (players.length + 1);

    gump.AddHtmlGump(1, 0, 0, widest, buttons.length * 30 + 30, '0x0BB8');
    gump.Select('htmlgump', 1);

    gump.AddResizepic(partition / 2 - 45, 10, '0x0BB7', 90, 30);
    gump.AddText(partition / 2 - 20, 10, '0x0035', '<h1>All</h1>');
    gump.AddMinMaxButtons(123456, 100, 10, '0x0037', 0, 0, 100000, 3500);
    var row = 0;
    var column = 0;
    //x y CallBackID Text FunctionName
    buttons.forEach(function (rowLayer) {
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
            rowLayer.forEach(function (button) {
                gump.AddResizepic(group - partition + gridX(column, button[0]), gridY(row, button[1]) + 30, '0x24EA', button[0], button[1], i + '' + button[2], 1);
                gump.AddText(group - partition + gridTX(column, button[0]), gridTY(row, button[1]) + 30, '0', button[3]);
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
    UDPHostServer()
    HostGump()

    Orion.SetUdpServerCallback(Player.Name(), 'NewSubscriber');

    for (var ports = 1; ports < 5; ports++) {
        Orion.UdpSend('192.168.0.3', hostPort + ports, '*|WHO')
    }
}

function NewSubscriber(recv) {
    Orion.Print('NewSubscriber')
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
                    }
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
        Name: function () {
            return this._name;
        },
        Port: function () {
            return this._port;
        }
    }
}