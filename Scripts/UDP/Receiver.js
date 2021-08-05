//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Debug.js

var udpPort = 2598;

function Message_Receiver() {
    while (true) {
        var recv = Orion.UdpRecv('test');

        // Result buffer (string) is not empty - package received
        if (recv.length) {
            var recvp = Orion.Split(recv, ':')
            if (recvp[0] == 'F') {
                Orion.Follow(recvp[1])
            }
            if (recvp[0] == 'W') {
                Orion.Print('Walking')
                Orion.WalkTo(recvp[1], recvp[2], 0, 0, 255, 1)
            //    Orion.WalkTo(object.X(), object.Y(), object.Z(), distance, 255, walking, 1, timeMS);
            }
           if (recvp[0] == 'M') {
	            Orion.Say('All follow me')
					WalkTo(mount)
				Orion.UseObject(mount)
            }    
           if (recvp[0] == 'A') {
				Orion.Attack(Orion.Follow(recvp[1]))
            }    
        }
        else
            Orion.Wait(50);
    }
}

function StopServer()
{
    Orion.RemoveAllUdpServers();
}
function UDPServer() {
    Orion.RemoveAllUdpServers();

    TextWindow.Open();
    TextWindow.Clear();

    var created = Orion.CreateUdpServer('test', udpPort);

    if (created == 0) {
        TextWindow.Print('UDP server created and listening port: ' + udpPort);
    }
    else
    {
        Orion.CreateUdpServer('test', udpPort+1);
        TextWindow.Print('Failed to create UDP server, port: ' + udpPort + ' error: ' + created);
    }
}