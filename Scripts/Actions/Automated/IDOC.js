//#include helpers/Target.js
//#include helpers/Notifier.js

function IDOCAlert() {
    var selected;
    var selecting = true;
    var signs = [];
    while (selecting) {
        var selectedObj = SelectTarget();
        if (selectedObj == null) {
            selecting = false
        }
        else {
        selected = selectedObj.Serial()

            signs.push(selected)
            Orion.Print('added '+selected)
        }
    }
    var fallen = false;
    while (!fallen) {
    Orion.Wait(1000)
    signs.forEach(function (house){
    var sign = Orion.FindObject(house)
    if(sign==null){
    fallen=true
    }
    })
    }
    Orion.ActivateClient();
    var now = Orion.Date
    while(true)
    {
    BotPush('House Fallen')
Orion.Wait(10000)
}
}

function PlaceHouse()
{
	Orion.UseObject('0x40173554');
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x877C84F9'))
		{
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x5D40A15B'))
		{
			gump1.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForTarget(1000))
		Orion.TargetTile('any', 1011, 987, 65466);
}

function IDOCWalker()
{



}
function IDOCScanner(){
while(true){
Orion.Wait(500)
var houseSigns = Orion.FindTypeEx(any,any,ground,'item',30).filter(function (item){
return item.Name()==='A House Sign' 
&& (item.Properties().match(/Condition..This\sstructure\sis\sin\sdanger\sof\scollapsing/gi)
//|| item.Properties().match(/Condition..This\sstructure\sis\sgreatly\sworn/gi)
)
})
houseSigns.forEach(function (houseSign){
BotPush('X: ' + houseSign.X() + ' Y: '+ houseSign.Y())
BotPush(houseSign.Properties())
Orion.Print(houseSign.Properties())
Orion.Wait(5000)
Orion.Ignore(houseSign.Serial())
})
}
}