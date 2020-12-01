function TrainPoison()
{
while(!Player.Dead())
{
	Orion.UseSkill('Poisoning');
	if (Orion.WaitForTarget(1000))
Orion.TargetType('0x0F0A', '0xFFFF');
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject('0x463FB9ED');
		Orion.Wait(1000);
}
}