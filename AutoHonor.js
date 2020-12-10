var currentTargetId;
var targetHits;
var targetDistance;
function AutoHonor()
{
while(!Player.Dead())
{
Orion.Wait(100);
if(Orion.ClientLastAttack()!='0x00000000')
{
var target = Orion.FindObject(Orion.ClientLastAttack());
currentTargetId = target.Serial();
targetHits = target.Hits()
targetDistance = target.Distance();
var mobile = 
HonorTarget(mobile)

}
        }
}

    function HonorTarget(mobile) {
        if (!Orion.BuffExists('Honored2') &&
            targetHits == 25 &&
            targetDistance < 10
            && Orion.ObjectExists(currentTargetId)) {
            Orion.AddHighlightCharacter(currentTargetId, '0xF550', true);
            Orion.InvokeVirtue('Honor');
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(currentTargetId);
            }
        }
    }