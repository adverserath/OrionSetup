//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Debug.js

function TrainPoison()
{
TextWindow.Print(JSON.stringify(Orion.FindTypeEx(any).map(function (item){return item.Properties().split('\n')})))
while(!Player.Dead())
{
if(Player.Poisoned()){
Orion.UseType('0x0F07', '0xFFFF');
}
	Orion.UseSkill('Poisoning');
	if (Orion.WaitForTarget(1000))
Orion.TargetType('0x0F0A', '0xFFFF','0x46415E83');
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject('0x43F6481D');
if(Player.Weight()>Player.MaxWeight())
{
MoveItemsFromPlayer(Orion.FindObject('0x46415E83'), '0x0F0E')
}
}
Orion.Wait(1000);
BotPush("You are dead");
}