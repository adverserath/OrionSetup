//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Gumps.js

var udpPort = 2598;
function followtest()
{
Orion.Follow(SelectTarget().Serial())
}
function Message_Receiver() {
    UDPServer()
    while (true) {
        var recv = Orion.UdpRecv(Player.Name());
        // Result buffer (string) is not empty - package received
        if (recv.length > 0) {
            var recvp = Orion.Split(recv, ':')
            if (recvp[0] == 'F') {
                Orion.Follow(recvp[1],true)
            }
            if (recvp[0] == 'W') {
                Orion.Print('Walking')
                if (Orion.GetDistance(recvp[1], recvp[2]) > 0) {
                    Orion.WalkTo(recvp[1], recvp[2], recvp[3], 0, 3, 1)
                }
                //    Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS);
            }
            if (recvp[0] == 'M') {
            if(recvp[1]=='false')
            	MountPet(false)
            else
                MountPet(true)
            }
            if (recvp[0] == 'A') {
                Orion.Attack(recvp[1])
            }
            if (recvp[0] == 'S') {
                Orion.Say(recvp[1])
            }
            if (recvp[0] == 'PA') {
                PetAttack(recvp[1])
            }
            if (recvp[0] == 'PG') {
                PetGuard()
            }
            if (recvp[0] == 'PC') {
                PetCome()
            }
            if (recvp[0] == 'RH') {
                GoHome()
            }
            if (recvp[0] == 'AG') {
                AcceptGump()
            }
            if (recvp[0] == 'Reload') {
				Orion.ToggleScript('Reload')
            }
        }
        else
            Orion.Wait(50);
    }
}

function Reload()
{
	Orion.ToggleScript('Message_Receiver',true)
	Orion.Wait(100)
	Orion.ToggleScript('Message_Receiver',true)
}

function StopServer() {
    Orion.RemoveAllUdpServers();
}
function UDPServer() {
    Orion.RemoveAllUdpServers();

    TextWindow.Open();
    TextWindow.Clear();

    var created = Orion.CreateUdpServer(Player.Name(), udpPort);
    for (var index = 0; index < 3; index++) {
        var created = Orion.CreateUdpServer(Player.Name(), udpPort + index);
        if (created == 0) {
            TextWindow.Print('UDP server created and listening port: ' + udpPort + index);
            Orion.Say('Hi')
            break;
        }
        else {
            Orion.CreateUdpServer('test', udpPort + index);
            Orion.Print('Failed to create UDP server, port: ' + udpPort + ' error: ' + created);
        }
    }
}