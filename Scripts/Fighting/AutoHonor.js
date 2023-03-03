//#include helpers/Target.js
var currentTargetId;
var targetHits;
var targetDistance;
function AutoHonor() {
    while (true) {
        Orion.Wait(100);

        if (Orion.ClientLastAttack() != '0x00000000'
            && Orion.ObjectExists(Orion.ClientLastAttack())
            && !Orion.BuffExists('Honored2')) {
            var target = Orion.FindObject(Orion.ClientLastAttack());
            currentTargetId = target.Serial();
            targetHits = target.Hits()
            targetDistance = target.Distance();
            var mobile = HonorTarget(mobile)
            Orion.Wait(1000)
        }
    }
}

function HonorTarget(target) {
    if (!Orion.BuffExists('Honored2') &&
        targetDistance < 13) {
        Orion.AddHighlightCharacter(currentTargetId, '0xF550', true);
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject(currentTargetId);
        }
        Orion.Wait(4000)
    }
}


function Honor() {
    Orion.InvokeVirtue('Honor');
    if (Orion.WaitForTarget(1000)) {
        Orion.TargetObject(currentTargetId);
    }
}