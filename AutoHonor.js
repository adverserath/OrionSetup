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

function Moon() {
    while (!Player.Dead()) {

        var gate = Orion.FindTypeEx('0x4BCB', any, any, any, 20).shift();
        if (gate != null) {

            Orion.Wait(50);
        }
        WalkTo(gate, 0)

        Orion.UseObject(gate.Serial());
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
                var gumpHook0 = Orion.CreateGumpHook(1);
                gumpHook0.AddCheck(200, true);
                gump0.Select(gumpHook0);
            }
        }
        Orion.Wait(100)
        Orion.Step(1)
        Orion.Step(1)
        Orion.Step(1)
        Orion.Step(1)
        Orion.Step(1)

    }


}


function Stealth() {
    while (!Player.Dead()) {
        Orion.Wait(100)
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() + 20, Player.Z(), 8, 8, 0);
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() - 20, Player.Z(), 8, 8, 0);
    }


}