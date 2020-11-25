//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js

function CutHides() {
var scissors = Orion.FindTypeEx('0x0F9F').shift();
var hides = Orion.FindTypeEx('0x1079');
Orion.Print(scissors.Name());
Orion.Print(hides.length);
       UseItemOnTargets(scissors, hides);

}

function MoveHides(corpse) {
    MoveItems('0x1079',corpse, Player.Container(),any);
}

function CutCorpses() {

    while (!Player.Dead()) {
        while (!Player.WarMode()) {
            var corpses = Orion.FindType('0x2006', any, ground, 'near', 2);
            if (corpses.length > 0) {
                Orion.Wait(100);
                Orion.Print('skinning');
                var foundCorpses = corpses;
                while (corpses.length > 0) {
                    var knife = Orion.FindType('0x0EC4', any, backpack).shift();
                    Orion.Print('Found corpse');
                    if (corpses.length != 0) {
                        var corpse = corpses.shift();
                       Orion.Wait(500);
                        Orion.Print('use knife');
                        Orion.UseObject(knife);
                        Orion.Print('wait target');
                        if (Orion.WaitForTarget(1000)) {
                            Orion.Print('found target');
                            Orion.TargetObject(corpse);
                            Orion.Wait(1000);
                            Orion.Print('Open Corpse');
                       //    Orion.Wait(500);
                            Orion.OpenContainer(corpse);
                            Orion.Wait(1000);
                                                        Orion.Print('Moving Items');

                            MoveHides(corpse);
                            Orion.Ignore(corpse);

                        }
                    }
                    Orion.Wait(1000);
                    Orion.Print('Snip snip');
                    CutHides();
                }
            }
            //IF LEATHER NEEDS CUTTING

        }
                            Orion.Wait(1000);
    }
}