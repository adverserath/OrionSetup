//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js
//#include Fighting/Tamer.js
//#include Fighting/SpellWeaving.js
//#include Fighting/Corpses.js
//#include Fighting/Healing.js
//#include Actions/Event/PumpkinPicker.js
var udpPort = 2598;


function Message_Receiver() {
    if (!UDPClientServer()) {
        Orion.UdpSend(2597, "Fail:::" + Player.Name())
        return
    }
    else {
        SendWho()
    }

    while (true) {
        var recv = Orion.UdpRecv(Player.Name());
        // Result buffer (string) is not empty - package received
        if (recv.length > 0) {
            Orion.LoadScript('UDP/Receiver.js')
            var recvp = Orion.Split(recv, ':')
            var command = Orion.Split(recvp[0], '|')
            Orion.Print('to:' + command[0] + ' command:' + command[1] + ' message:' + recvp)

            if (command[0] != '*' && command[0] !== Player.Serial()) {
                continue
            }
            ResponseHandler(recv)
            // if (Orion.ScriptRunning('ResponseHandler') != 0) {
            //     Orion.ToggleScript('ResponseHandler');
            //     Orion.Wait(50)
            //     Orion.Print('stop')
            // }

            // Orion.ToggleScript('ResponseHandler', true, [recv])
        }
        else
            Orion.Wait(100);
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
    if (command[1] == 'PST') {
        Orion.Print("Pet Stop")
        PetStop()
    }
    if (command[1] == 'RH') {
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
    if (command[1] == 'Search' && recvp[1] == 'Corpse') {
        Orion.Print('Search Corpses')
        OpenNearbyCorpses();
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
    Orion.UdpSend(2597, "Player:::" + '{"name":"' + Player.Name() + '", "port":' + udpPort + ', "serial":"' + Player.Serial() + '"}');
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