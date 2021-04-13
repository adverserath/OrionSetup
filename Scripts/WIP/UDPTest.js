//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Debug.js

var udpPort = 2598;

function recvHelloWorld() {
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
                Orion.WalkTo(recvp[1], recvp[2], 0, 0)
            }
        }
        else
            Orion.Wait(50);
    }
}

var udpPort = 2598;

// UDP server with manual data handling
function ExampleUdpServerManual() {
    // Remove all UDP servers
    Orion.RemoveAllUdpServers();

    // Prepare log
    TextWindow.Open();
    TextWindow.Clear();

    // Create UDP server
    var created = Orion.CreateUdpServer('test', udpPort);

    // Result code is 0 - is created
    if (created == 0) {
        TextWindow.Print('UDP server created and listening port: ' + udpPort);

        // Trying to receive data
    }
    else
        TextWindow.Print('Failed to create UDP server, port: ' + udpPort + ' error: ' + created);
}

function followMe() {
    Orion.UdpSend(udpPort, 'F:' + Player.Serial());
}

function walkToMe() {
    Orion.UdpSend(udpPort, 'W:' + Player.X() + ':' + Player.Y());
}

function walkToHere() {
    var pathLocation = SelectCoordinate();
    Orion.UdpSend(udpPort, 'W:' + pathLocation.X() + ':' + pathLocation.Y());
}