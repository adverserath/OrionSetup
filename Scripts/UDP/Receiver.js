//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js

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
        Orion.Print(recv)
        Orion.LoadScript('UDP/Receiver.js')
            var recvp = Orion.Split(recv, ':')
            var command = Orion.Split(recvp[0], '|')
            if(command[0]!='*' && command[0] !== Player.Serial())
            {
            Orion.Print(command[0] +' '+ Player.Serial())
            	continue;
            }
            if (command[1] == 'F') {
                Orion.Follow(recvp[1], true)
            }
            if (command[1] == 'W') {
                Orion.Print('Walking')
                if(Orion.IsWalking())
                {
                	Orion.StopWalking()
                }
                if (Orion.GetDistance(recvp[1], recvp[2]) > 0) {
                    Orion.WalkTo(recvp[1], recvp[2], recvp[3], 0, 3, 1)
                }
                //    Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS);
            }
            if (command[1] == 'M') {
                if (recvp[1] == 'false')
                    MountPet(false)
                else
                    MountPet(true)
            }
            if (command[1] == 'A') {
                Orion.Attack(recvp[1])
            }
            if (command[1] == 'S') {
                Orion.Say(recvp[1])
            }
            if (command[1] == 'PA') {
                PetAttack(recvp[1])
            }
            if (command[1] == 'PG') {
                PetGuard()
            }
            if (command[1] == 'PC') {
                PetCome()
            }
            if (command[1] == 'RH') {
                GoHome()
            }
            if (command[1] == 'AG') {
                AcceptGump()
            }
            if (command[1] == 'WAR') {
                if(recvp[1]==='true')
                	Orion.WarMode(true)
                else
                   Orion.WarMode(false)

            }
            if (command[1] == 'Reload') {
                Orion.ToggleScript('Reload')
            }
            if (command[1] == 'WHO') {
				SendWho()
            }
            if (command[1] == 'CloseUO') {
				Orion.CloseUO()
            }
        }
        else
            Orion.Wait(50);
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
        var created = Orion.CreateUdpServer(Player.Name(), udpPort);
        if (created == 0) {
            Orion.Print('UDP server created and listening port: ' + udpPort);
            Orion.Say('Hi')
            return true;
        }
        else {
            udpPort++;
        }
    }
}

function SendWho()
{
        Orion.UdpSend(2597, "Player:::" + '{"name":"' + Player.Name() + '", "port":' + udpPort + ', "serial":"' + Player.Serial() + '"}');
}