//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js
//#include UDP/Receiver.js
//#include helpers/Pet.js


function HostGump()
{
	// Create new custom gump with serial 15
	var gump = Orion.CreateCustomGump(1);
	
	// This gump will be no closible by a right mouse click
	gump.SetNoClose(false);
	
	// Clear gump cpntents (for rebuilds)
	gump.Clear();

	// Set callback function
	gump.SetCallback('HostCallback');

	var itemSerial = 1;

	// HTML gump section
	var htmlSerial = itemSerial++;
	gump. AddHtmlGump(htmlSerial, 0, 0, 300, 270, '0x0BB8');

	// Select HTML gump as current container for new items
	gump.Select('htmlgump', htmlSerial);


	var ystep = 30;
	var xstep = 100;
	var x = 5;
	var y = 2;
	gump.AddResizepic(x, y, '0x24EA', xstep, ystep, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Follow");
	y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Mount");
	y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Attack");
	y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Walk To");	
	y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Say");	
		y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Pet Attack");	
			y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Pet Guard");	
			y += ystep;
	gump.AddResizepic(x, y, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(x+5, y+5, '0', "Pet Come");	
			y += ystep;
	
	// Reset container for new items to gump
	gump.Select('gump');

	gump.Update();
	Orion.ToggleScript('ShareTarget')
}

function ShareTarget()
{
while(true)
{
Orion.Wait(1000)
if(Orion.ClientLastAttack()!='0x00000000')
{
Sender('A:' + Orion.ClientLastAttack());
}
}
}

function HostCallback()
{
	var code = CustomGumpResponse.ReturnCode();
Orion.Print('respond')
	if (code == 0)
	{
		var gump = Orion.CreateCustomGump(15);
		gump.Close();
	}
	Orion.Print(code)
    switch (code) {
        case 2:
            Sender('F:' + Player.Serial());
            break;
        case 3:
            Sender('M:');
            MountPet()
                        break;
        case 4:
            var target = SelectTarget().Serial();
            Orion.Attack(target)
            Sender('A:' + target);
                        break;
        case 5:
            var pathLocation = SelectCoordinate();
            Sender('W:' + pathLocation.X() + ':' + pathLocation.Y()+ ':' + pathLocation.Z());
                        Orion.WalkTo( pathLocation.X(),  pathLocation.Y(),  pathLocation.Z(), 0, 3, 1)
                        break;
        case 6:
        var entry = Orion.InputText()
        Orion.Say(entry)
            Sender('S:' + entry);
                        break;
        case 7:
       var target  = SelectTarget();
            Sender('PA:' + target.Serial());
            PetAttack(target.Serial())

                        break;
        case 8:
       PetGuard()
            Sender('PG');
                        break;
        case 9:
       PetCome()
            Sender('PC');
                        break;
        default:
            break;
    }
}

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
    MountPet()
}

function Attack() {
    var target = SelectTarget().Serial();
    Orion.Attack(target)
    Sender('A:' + target);
}

function Sender(message) {
    Orion.UdpSend(udpPort, message)
    Orion.UdpSend(udpPort + 1, message)
}

function AutoFollowAndKill() {
    var lastX = Player.X()
    var lastY = Player.Y()
    Orion.Print(Orion.ClientLastAttack())
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