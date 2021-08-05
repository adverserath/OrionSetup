//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Debug.js

var udpPort = 2598;

function followMe() {
    Sender('F:' + Player.Serial());
}

function walkToMe() {
    Sender('W:' + Player.X() + ':' + Player.Y());
}

function walkToHere() {
    var pathLocation = SelectCoordinate();
    Sender('W:' + pathLocation.X() + ':' + pathLocation.Y());
}

function mountPets() {
    Sender('M:');
}

function Attack() {
    Sender('A:' +SelectTarget().Serial());
}

function Sender(message)
{
    Orion.UdpSend(udpPort,message)
    Orion.UdpSend(udpPort+1,message)
}