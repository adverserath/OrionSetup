//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include UDP/Receiver.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js

function gridX(x,size) {
    return x * size
}

function gridY(y,size) {
    return y * size
}
function gridTX(x,size) {
    return x * size + 5
}

function gridTY(y,size) {
    return y * size + 5
}

var buttons = //x y xsize ysize CallBackID Text FunctionName
    [
        [[100, 30, 11, "Follow", 'Sender_FollowMe'], [100, 30, 12, "Walk To", 'Sender_WalkToHere'],[100, 30, 13, "Walk To Me", 'Sender_WalkToMe']], 
        [[50, 30, 21, "Mount", 'Sender_MountPet'], [50, 30, 22, "UnMount", 'Sender_UnmountPet']],
        [[100, 30, 31, "Attack", 'Sender_Attack'], [100, 30, 32, "AF and Kill", 'AutoFollowAndKill']],
        [[100, 30, 41, "Pet Guard", 'Sender_PetGuard'], [100, 30, 42, "Pet Come", 'Sender_PetCome'], [100, 30, 43, "Pet Attack", 'Sender_PetAttack']],
        [[100, 30, 51, "Go Home", 'Sender_GoHome'], [100, 30, 52, "Say", 'Sender_Speak'], [100, 30, 53, "Accept Gump", 'Sender_AcceptGump']],
        [[100, 30, 61, "Reload", 'Sender_Reload']]

    ]


function HostGump() {
    Orion.LoadScript('Sender.js');
    // Create new custom gump with serial 60
    var gump = Orion.CreateCustomGump(60);
    gump.Clear();
    // Set callback function
    gump.SetCallback('HostCallback');

    var widest = Math.max.apply(Math, buttons.map(function (rows) {
        return rows.length
    }))
    //Draw window size to button array size
    gump.AddHtmlGump(1, 0, 0, widest * 100 + 30, buttons.length * 30, '0x0BB8');
	gump.Select('htmlgump', 1);

	//Draw buttons from array
    var row = 0;
    var column = 0;
    buttons.forEach(function (rowLayer) {
        rowLayer.forEach(function (button) {
            gump.AddResizepic(gridX(column,button[0]), gridY(row,button[1]), '0x24EA', button[0], button[1], button[2], 1);
            gump.AddText(gridTX(column,button[0]), gridTY(row,button[1]), '0', button[3]);
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

function Sender_FollowMe(_) {
    Sender('F:' + Player.Serial());
}

function Sender_WalkToMe(_) {
    Sender('W:' + Player.X() + ':' + Player.Y() + ':' + Player.Z());
}

function Sender_Reload(_) {
    Sender('Reload:');
}

function Sender_WalkToHere(_) {
    var pathLocation = SelectCoordinate();
    Sender('W:' + pathLocation.X() + ':' + pathLocation.Y() + ':' + pathLocation.Z());
    Orion.WalkTo(pathLocation.X(), pathLocation.Y(), pathLocation.Z(), 0, 3, 1)
}

function Sender_MountPet(_) {
    Sender('M:');
    MountPet(true)
}

function Sender_UnmountPet(_) {
    Sender('M:false');
    MountPet(false)
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
                Sender_WalkToMe()
                lastX = Player.X()
                lastY = Player.Y()
            }
            if (Orion.ClientLastAttack() != '0x00000000') {
                Sender('A:' + Orion.ClientLastAttack());
            }
        }
    }
}