//#include helpers/Generic.js

var motherOfPearl = 318
var luckring = 295
var luckbrace = 296
var dragonHead = 263
var firepit = 289
var pedestal = 290

function AllAccept()
{
for(i=0; i<26;i++)
{
Acceptor(i)
}
}
function Acceptor(i)
{
var gumpClaim=null
var gumpStore=null
var gumpConfirm=null
var item = luckring

var cubMan = 0x0000DD51
var cubStone = 0x400541CD

var cubGump = '0xF4711CC4'
var exchangeGump = '0x58AC40B0'
var cubAccept = '0x096825B9'

if(!Orion.GumpExists('generic','any',exchangeGump))
{
	Orion.UseObject(cubStone);
	Orion.Wait(1000)
}

if(!Orion.GumpExists('generic','any',cubGump))
{
	Orion.UseObject(cubMan);
	Orion.Wait(1000)
}

		var gump0 = Orion.GetGump(any,cubGump);
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === cubGump))
		{
			gump0.Select(Orion.CreateGumpHook(pedestal+6+i));
			Orion.Wait(400);
		}
else{
Orion.Print("No cubGump")
}


		var gump1 = Orion.GetGump(any, exchangeGump);

		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() ===exchangeGump ))
		{
			gump1.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
else{
Orion.Print("No exchangeGump")
}
	if (Orion.WaitForGump(1000))
	{
		var gump2 = Orion.GetGump(any, cubAccept);
		if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === cubAccept))
		{
			gump2.Select(Orion.CreateGumpHook(2));
			Orion.Wait(100);
		}
	}
	else{
Orion.Print("No cubAccept")
}

		var gump3 = Orion.GetGump('any',exchangeGump);
		if ((gump3 !== null) && (!gump3.Replayed()) && (gump3.ID() === exchangeGump))
		{
			gump3.Select(Orion.CreateGumpHook(2));
			Orion.Wait(100);
		}
	
}