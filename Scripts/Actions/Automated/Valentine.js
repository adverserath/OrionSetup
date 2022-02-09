//#include helpers/Target.js
//#include helpers/ItemManager.js

function Hug()
{
while(true)
{
Orion.FindTypeEx(any,any,ground,3|4,4)
.filter(function(mob)
{
return mob.Name() == "a lich" 
|| mob.Name() == "a skeleton"
|| mob.Name() == "an ettin"
})
.forEach(function (mob){

Orion.AddHighlightCharacter(mob.Serial(), 50);

Orion.Say('[hug')
if(Orion.WaitForTarget(500))
{
Orion.TargetObject(mob.Serial())
Orion.Ignore(mob.Serial())
Orion.Wait(200)
}

})
Orion.Wait(100)
}
}

function HugParagon()
{
Orion.ResetIgnoreList()
var type = any
var notoriety = any

while(true)
{
Orion.FindTypeEx(any,"0x0501",ground,notoriety,4).forEach(function (mob){

Orion.AddHighlightCharacter(mob.Serial(), 50);

Orion.Say('[hug')
if(Orion.WaitForTarget(500))
{
Orion.TargetObject(mob.Serial())
Orion.Ignore(mob.Serial())
Orion.Wait(200)
}

})
Orion.Wait(100)
}
}