//#include helpers/Target.js
var currentTargetId;
var targetHits;
var targetDistance;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function AutoHonorRandom() {
    while (true) {
        Orion.Wait(1000);

        while (!Orion.BuffExists('Honored2')) {
            Orion.Wait(300)
            var targets = Orion.FindTypeEx(any, any, ground, 'live|ignoreself|ignorefriends|inlos', 12, 'gray|criminal|red|enemy').filter(function (mob) {
                return mob.Hits() == 25
            }).forEach(function (target) {
                if (!Orion.BuffExists('Honored2')) {
                    targetHits = target.Hits()
                    targetDistance = target.Distance();
                    currentTargetId = target.Serial();
                    HonorTarget()
                }
            })

        }
    }
}

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

function HonorTarget(_) {
    if (!Orion.BuffExists('Honored2') &&
        targetDistance < 13) {
        Orion.AddHighlightCharacter(currentTargetId, '0xF550', true);
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject(currentTargetId);
        }
        Orion.Wait(1000)
    }
}


function Honor() {
    Orion.InvokeVirtue('Honor');
    if (Orion.WaitForTarget(1000)) {
        Orion.TargetObject(currentTargetId);
    }
}