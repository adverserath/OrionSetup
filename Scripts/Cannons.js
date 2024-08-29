//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js

function CannonShooter()
{
		if(Orion.GumpExists('any', 'any', 0x401006B2))
	{
var cannona = Orion.GetGump(any, 0x401006B2)	
cannonab.Close()
	}

	if(Orion.GumpExists('any', 'any', 0x4010069D))
	{
var cannonb = Orion.GetGump(any, 0x4010069D)	
cannonb.Close()

	}


var cannons = SelectMultipleTargets()

cannons.forEach(function (cannon){
WalkTo(cannon)
Orion.UseObject(cannon.Serial())

Orion.Wait(100)
})

}