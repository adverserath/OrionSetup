//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include UDP/Receiver.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js

function gridX(x) {
    return x * 105
}

function gridY(y) {
    return y * 30
}
function gridTX(x) {
    return x * 105 + 5
}

function gridTY(y) {
    return y * 30 + 5
}

var buttons = //x y hor ver ID Text
    [
        [[100, 30, 2, "Follow", 'Sender_FollowMe'], [100, 30, 5, "Walk To", 'Sender_WalkToHere'], [100, 30, 3, "Mount", 'Sender_MountPet']],
        [[100, 30, 4, "Attack", 'Sender_Attack'], [100, 30, 12, "AF and Kill", 'AutoFollowAndKill']],
        [[100, 30, 8, "Pet Guard", 'Sender_PetGuard'], [100, 30, 9, "Pet Come", 'Sender_PetCome'], [100, 30, 7, "Pet Attack", 'Sender_PetAttack']],
        [[100, 30, 10, "Go Home", 'Sender_GoHome'], [100, 30, 6, "Say", 'Sender_Speak'], [100, 30, 11, "Accept Gump", 'Sender_AcceptGump']]
    ]


function HostGump() {
    Orion.LoadScript('Sender.js');
    // Create new custom gump with serial 15
    var gump = Orion.CreateCustomGump(1);

    // This gump will be no closible by a right mouse click
    gump.SetNoClose(false);

    // Clear gump cpntents (for rebuilds)
    gump.Clear();

    // Set callback function
    gump.SetCallback('HostCallback');

    var widest = Math.max.apply(Math, buttons.map(function (rows) {
        Orion.Print(rows.length)

        return rows.length
    }))
    gump.AddHtmlGump(1, 0, 0, widest * 100 + 30, buttons.length * 30, '0x0BB8');

    // Select HTML gump as current container for new items
    gump.Select('htmlgump', 1);

    var row = 0;
    var column = 0;
    buttons.forEach(function (rowLayer) {

        rowLayer.forEach(function (button) {
            gump.AddResizepic(gridX(column), gridY(row), '0x24EA', button[0], button[1], button[2], 1);
            gump.AddText(gridTX(column), gridTY(row), '0', button[3]);
            column++;
        })
        column = 0
        row++;
    });

    // Reset container for new items to gump
    gump.Select('gump');

    gump.Update();
}

function HostCallback() {
    var code = CustomGumpResponse.ReturnCode();

    if (code == 0) {
        var gump = Orion.CreateCustomGump(15);
        gump.Close();
    }

    buttons.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            if (button[2] == code) {
                Orion.Print('Execute ' + button[4])
                Orion.ToggleScript(button[4])
                return
            }
        })
    });
}

var udpPort = 2598;

function Sender_FollowMe() {
    Sender('F:' + Player.Serial());
}

function walkToMe(_) {
    Sender('W:' + Player.X() + ':' + Player.Y());
}

function Sender_WalkToHere(_) {
    var pathLocation = SelectCoordinate();
    Sender('W:' + pathLocation.X() + ':' + pathLocation.Y() + ':' + pathLocation.Z());
    Orion.WalkTo(pathLocation.X(), pathLocation.Y(), pathLocation.Z(), 0, 3, 1)
}

function Sender_MountPet(_) {
    Sender('M:');
    MountPet()
}

function Sender_Attack(_) {
    var target = SelectTarget().Serial();
    if (target != null) {
        Orion.Attack(target)
        Sender('A:' + target);
    }
}
function Sender_Speak(_) {
    var entry = Orion.InputText()
    Orion.Say(entry)
    Sender('S:' + entry);
}

function Sender_PetAttack(_) {
    var target = SelectTarget();
    if (target != null) {
        Sender('PA:' + target.Serial());
        PetAttack(target.Serial())
    }
}

function Sender_PetGuard() {
    Sender('PG');
    PetGuard()
}
function Sender_PetCome() {
    Sender('PC');
    PetCome()

}
function Sender_GoHome() {
    Sender('RH');
    GoHome()
}

function Sender_AcceptGump() {
    Sender('AG');
    AcceptGump()
}

function Sender(message) {
    Orion.UdpSend(udpPort, message)
    Orion.UdpSend(udpPort + 1, message)
}

function AutoFollowAndKill(_) {
    var lastX = Player.X()
    var lastY = Player.Y()
    Orion.Print(Orion.ClientLastAttack())
    while (true) {
        Orion.Wait(1000)
        while (Player.WarMode()) {
            Orion.Wait(200)
            if (lastX != Player.X() || lastY != Player.Y()) {
                walkToMe()
                lastX = Player.X()
                lastY = Player.Y()
            }
            if (Orion.ClientLastAttack() != '0x00000000') {
                Sender('A:' + Orion.ClientLastAttack());
            }
        }
    }
}