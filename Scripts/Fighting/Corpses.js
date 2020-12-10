//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js

function CutHides() {
    var scissors = Orion.FindTypeEx('0x0F9F').shift();
    var hides = Orion.FindTypeEx('0x1079');
    UseItemOnTargets(scissors, hides);

}

function BankLeather() {
    Orion.Print("bank leather")
    var leather = Orion.FindTypeEx('0x1081');
    if (leather.length > 0) {
        Orion.Wait(200);
        MoveItems(Orion.FindObject(backpack), Orion.FindObject(Player.BankSerial()), '0x1081', any)
    }

}

function MoveHides(corpse) {
    Orion.Print("move hide")
    MoveItems(corpse, Orion.FindObject(backpack), '0x1079', any)
    Orion.Wait(600);
}

function CutCorpses() {
Orion.IgnoreReset();
    var knife = Orion.FindType('0x0EC4', any, backpack).shift();

            var corpses = Orion.FindTypeEx('0x2006', any, ground, 'near', 2);
            corpses.forEach(function (corpse) {
                Orion.Wait(400);
                Orion.UseObject(knife);
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(corpse.Serial());
                }
            });
            corpses.forEach(function (corpse) {
                Orion.Wait(400);
                Orion.OpenContainer(corpse);
                Orion.Wait(600);
                MoveHides(corpse);
                CutHides();
                BankLeather();
                Orion.Ignore(corpse.Serial());
            });

}

function AutoLootAssist()
{
while(Player.Weight()<Player.MaxWeight())
{
if(Orion.ClientLastAttack()!='0x00000000'){
            var corpses = Orion.FindTypeEx('0x2006', any, ground, any, 10);
            corpses.forEach(function (corpse) {
            WalkTo(corpse);
                Orion.Wait(3000);
                Orion.Ignore(corpse.Serial());
            });
            }
Orion.Wait(4000);
Orion.Print("loop reset");
}
}