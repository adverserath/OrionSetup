//#include Scripts/helpers/Target.js
var currentTargetId;
var targetHits;
var targetDistance;
function AutoHonor() {
    while (!Player.Dead()) {
        Orion.Wait(400);

        if (Orion.ClientLastAttack() != '0x00000000'
            && Orion.ObjectExists(Orion.ClientLastAttack())
            && !Orion.BuffExists('Honored2')) {
            var target = Orion.FindObject(Orion.ClientLastAttack());
            currentTargetId = target.Serial();
            targetHits = target.Hits()
            targetDistance = target.Distance();
            var mobile = HonorTarget(mobile)
        }
    }
}

function HonorTarget(target) {
    if (!Orion.BuffExists('Honored2') &&
        targetDistance < 13) {
        Orion.Print('honor')
        Orion.AddHighlightCharacter(currentTargetId, '0xF550', true);
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject(currentTargetId);
        }
        Orion.Wait(4000)
    }
}

function HonorSwoop() {
    while (!Player.Dead()) {
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(1000)) {
            var swoops = Orion.FindTypeEx('0x0005', any, ground, any, '12');
            while (swoops.length == 0) {
                Orion.Wait(50)
                swoops = Orion.FindTypeEx('0x0005', any, ground, any, '12');
            }
            var swoop = swoops.shift();
            Orion.TargetObject(swoop.Serial());
            Orion.Wait(5000)
            while (swoop.Hits() > 15) {
                Orion.Wait(200)
            }
            //Orion.Attack(swoop.Serial());
            Orion.Say('all kill')
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(swoop.Serial());
            }
            while (swoop.Exists()) {
                Orion.Wait(500)
                Orion.Print('Its alive')
            }
        }
    }
}

function Honor() {
    Orion.InvokeVirtue('Honor');
    if (Orion.WaitForTarget(1000)) {
        Orion.TargetObject(currentTargetId);
    }
}