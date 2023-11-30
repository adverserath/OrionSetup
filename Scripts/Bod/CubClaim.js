var motherOfPearl = 318
var luckring = 295
var luckbrace = 296




function GeneratedScript_003900()
{
var gumpClaim=null
var gumpStore=null
var gumpConfirm=null
var item = luckring

if(!Orion.GumpExists('generic','any','0xD43F2C1A'))
{
	Orion.UseObject('0x400541CD');
	if (Orion.WaitForGump(1000))
	{
		gumpStore = Orion.GetGump('last');
Orion.Wait(900)
	}
}

if(!Orion.GumpExists('generic','any','0x298268DE'))
{
	Orion.UseObject('0x00005262');
	if (Orion.WaitForGump(1000))
	{
		gumpClaim = Orion.GetGump('last');
		Orion.Wait(100)
		Orion.Print(gumpClaim.Serial())
	}
}

ClaimItem(item)
		if (Orion.WaitForGump(2000))
	{
	Orion.Wait(100)
		gumpConfirm = Orion.GetGump('last');
	}
	
Orion.Wait(100)
	
	if (gumpStore != null)
	{
		if ((gumpStore !== null) && (!gumpStore.Replayed()) && (gumpStore.ID() === '0xD43F2C1A'))
		{
			gumpStore.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
		if ((gumpConfirm !== null) && (!gumpConfirm.Replayed()) && (gumpConfirm.ID() === '0x1440128A'))
		{
			gumpConfirm.Select(Orion.CreateGumpHook(2));
			Orion.Wait(300);
		}
		if ((gumpStore !== null) && (gumpStore.ID() === '0xD43F2C1A'))
		{
		gumpStore = Orion.GetGump(gumpStore.Serial(), gumpStore.ID());
			gumpStore.Select(Orion.CreateGumpHook(2));
		}
	}
}

function ClaimItem(itemNo)
{
	Orion.UseObject('0x00005262');
	if (Orion.WaitForGump(1000))
	{
	Orion.Wait(400);
		var gumpClaim = Orion.GetGump('last');
		if ((gumpClaim !== null) && (!gumpClaim.Replayed()) && (gumpClaim.ID() === '0x298268DE'))
		{
			gumpClaim.Select(Orion.CreateGumpHook(itemNo));
		}
	}
}