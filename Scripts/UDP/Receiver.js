//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Beetle.js
//#include helpers/Gumps.js
//#include Fighting/Tamer.js
//#include Fighting/SpellWeaving.js
//#include Fighting/Corpses.js
//#include Fighting/Healing.js
//#include Actions/Automated/Doom.js
///#include Actions/Event/PumpkinPicker.js
//#include helpers/Gates.js
//#include helpers/Quest.js

var udpPort = 2598;

function Autostart(_)
{
Orion.ToggleScript('Message_Receiver')
Orion.Print('Started Receiver')
}
function Message_Receiver() {
    Orion.Print('Begin Receiver')
    if (!UDPClientServer()) {
        Orion.UdpSend(2597, "Fail:::" + Player.Name())
        return
    }
    else {
        SendWho()
    }
    Orion.SetUdpServerCallback(Player.Name(), 'Callback_Received');
}

function Callback_Received(data) {
    Orion.Print(data)
    var recv = data;
    if (recv.length > 0) {
        Orion.LoadScript('UDP/Receiver.js')
        var recvp = Orion.Split(recv, ':')
        var command = Orion.Split(recvp[0], '|')

        if (command[0] != '*' && command[0] !== Player.Serial()) {
            return
        }
        ResponseHandler(recv)
    }
}

function ResponseHandler(recv) {
    Orion.LoadScript('UDP/Receiver.js')
    var recvp = Orion.Split(recv, ':')
    var command = Orion.Split(recvp[0], '|')

    if (command[0] != '*' && command[0] !== Player.Serial()) {
        return
    }
    if (command[1] == 'U') {
        Orion.UseObject(recvp[1])
    }
    if (command[1] == 'F') {
        Orion.Print("Follow Leader")
        Orion.Follow(recvp[1], true)
    }
    if (command[1] == 'W') {
        Orion.Print("Walk To")
        if (Orion.ScriptRunning('Walk') != 0 || Orion.IsWalking()) {
            Orion.StopWalking()
            Orion.ToggleScript('Walk');
            Orion.Wait(100)
        }
        if (Orion.GetDistance(recvp[1], recvp[2]) > 12 && Player.Frozen()) {
            Orion.InterruptCast();
        }
        Orion.ToggleScript('Walk', true, [recvp[1], recvp[2], recvp[3], recvp[4]])
        Orion.Print('obj' + recvp[4])
        if (recvp[5] != null) {
            Orion.UseObject(recvp[4])
        }
        //    Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS);
    }
    if (command[1] == 'M') {
        Orion.Print("Mount " + recvp[1])
        if (recvp[1] === 'false') {
            Orion.Print("UnMount " + recvp[1])
            MountPet(false)
        }
        else {
            MountPet(true)
            Orion.Print("Mount " + recvp[1])
        }
    }
    if (command[1] == 'Cast') {
        Orion.Print('Cast')

        if (recvp[2] == null)
            Orion.Cast(recvp[1])
        else {
            Orion.CastTarget(recvp[1], recvp[2])
        }
    }
    if (command[1] == 'A') {
        Orion.Print("Attack")
        Orion.Attack(recvp[1])
    }
    if (command[1] == 'S') {
        Orion.Print("Say")
        Orion.Say(recvp[1])
    }
    if (command[1] == 'PA') {
        Orion.Print("Pet Attack")
        PetAttack(recvp[1])
    }
    if (command[1] == 'PG') {
        Orion.Print("Pet Guard")
        PetGuard()
    }
    if (command[1] == 'PC') {
        Orion.Print("Pet Come")
        PetCome()
    }
    if (command[1] == 'PS') {
        Orion.Print("Pet Stay")
        PetStay()
    }
    if (command[1] == 'PF') {
        Orion.Print("Pet Follow")
        PetFollow()
    }
    if (command[1] == 'PST') {
        Orion.Print("Pet Stop")
        PetStop()
    }
    if (command[1] == 'RH') {
        Orion.InterruptCast();
        Orion.Print("Go Home")
        Orion.ToggleScript('GoHome');
    }
    if (command[1] == 'AG') {
        Orion.Print("Accept Gump")
        AcceptGump()
    }
    if (command[1] == 'WAR') {
        Orion.Print("War toggle")
        if (recvp[1] === 'true')
            Orion.WarMode(true)
        else
            Orion.WarMode(false)
    }
    if (command[1] == 'Reload') {
        Orion.Print("Reload")
        Orion.ToggleScript('Reload')
    }
    if (command[1] == 'WHO') {
        Orion.Print("Who Request")
        SendWho()
    }
    if (command[1] == 'CloseUO') {
        Orion.Print("Close")
        Orion.CloseUO()
    }
    if (command[1] == 'RecoverCorpse') {
        Orion.Print("Get My Corpse")
        OpenOwnCorpses()
    }
    if (command[1] == 'Search' && recvp[1] == 'Corpse') {
        Orion.Print('Search Corpses')
        OpenNearbyCorpses();
    }
    if (command[1] == 'Method') {
        Orion.Print('Run Method: ' + recvp[1])
        Orion.ToggleScript(recvp[1]);
    }
}

function Reload() {
    Orion.ToggleScript('Message_Receiver', true)
    Orion.Wait(100)
    Orion.ToggleScript('Message_Receiver', true)
}

function StopServer() {
    Orion.RemoveAllUdpServers();
}

function UDPClientServer() {
    Orion.RemoveAllUdpServers();

    for (var index = 0; index < 3; index++) {
        var created = Orion.CreateUdpServer(Player.Name(), '0.0.0.0', udpPort);
        if (created == 0) {
            Orion.Print('UDP server created and listening port: ' + udpPort);
            return true;
        }
        else {
            udpPort++;
        }
    }
}

function SendWho() {
    var skills = []
    var skillNames = ['SpellWeaving', 'Magery', 'Animal Taming', 'Necromancy', 'Mysticism', 'Spirit Speak', 'Discordance', 'Provocation', 'Peacemaking']
    skillNames.forEach(function (sn) {
        skills.push('[' + sn + ', ' + Orion.SkillValue(sn) + ']')
    }
    )

    Orion.UdpSend(2597, "Player:::" + '{"name":"' + Player.Name() + '", "port":' + udpPort + ', "serial":"' + Player.Serial() + '", "skills":"' + skills + '"}');
}

function Walk(x, y, z, dir) {
    if (Orion.IsWalking()) {
        Orion.StopWalking()
    }
    if (Orion.GetDistance(x, y) > 0) {
        Orion.WalkTo(x, y, z, 0, 3, 1)
    }
    if (dir != null)
        Orion.Turn(dir);
}