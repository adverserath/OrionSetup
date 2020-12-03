//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function Rename() {
    var target = SelectTarget();

    while (true) {
        Orion.Wait(10000)
    }
    Orion.Print(target.Notoriety())

    Orion.RenameMount(target.Serial(), 'bull');
}


var discordMessage = 'play jarring music|That creature is|cannot be seen|too far|line of sight|no effect'
var discordRetry = 'attempt to disrupt'
// 
function Discord(animal) {
    TextWindow.Print('Disco ' + animal.Name() + animal.Serial());

    if (animal == null) {
        animal = SelectTarget();
    }
    var startTime = Orion.Now();
    var isDiscorded = false;

    while (!isDiscorded) {
        Orion.Print("discording " + animal.Name() + ' ' + animal.Serial());
        Orion.Wait(1000);
        Orion.AddDisplayTimer('SkillInUse', 4000, 'AboveChar');
        Orion.UseSkill('Discordance', animal.Serial());
        Orion.Wait(500);

        if (Orion.InJournal(discordMessage, '', '0', '-1', startTime, Orion.Now()) != null) {
            isDiscorded = true;
            Orion.Wait(1000);
        }
        while (Orion.DisplayTimerExists('SkillInUse')) {
            Orion.Wait(1000);
        }
    }
    return isDiscorded;
}

var provokeMessage = 'you start a fight'

function Provoke(animal) {
    TextWindow.Print('Provo ' + animal.Name() + ' ' + animal.Serial());

    if (animal == null) {
        animal = SelectTarget();
    }
    var animals = Orion.FindTypeEx(any, any, 'ground', 'mobile|live|nothuman', 30, 3);
    Orion.Follow(animal.Serial());
    var startTime = Orion.Now();
    var isProvoked = false;
    var bardRange = 8 + parseInt(Orion.SkillValue('Provocation') / 15);

    while (!isProvoked) {
        Orion.Wait(1000);
        Orion.AddDisplayTimer('SkillInUse', 4000, 'AboveChar');
        Orion.UseSkill('Provocation', animal.Serial());
        Orion.Wait(500);
        var closest = animals.filter(function (internalAnimal) {
            return internalAnimal.Name() != 'a bull'
                && internalAnimal.Serial() != animal.Serial()
                && internalAnimal.InLOS()
                && internalAnimal.Notoriety() == 3
                && InRange(animal, internalAnimal, bardRange)
        })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });

        Orion.TargetObject(closest.shift().Serial());

        while (Orion.DisplayTimerExists('SkillInUse')) {
            Orion.Wait(1000);
        }
        Orion.Wait(1000);

        Orion.Print(Orion.InJournal(provokeMessage, '', '0', '-1', startTime, Orion.Now()));
        if (Orion.InJournal(provokeMessage, '', '0', '-1', startTime, Orion.Now()) != null) {
            Orion.Print("Provoked");
            isProvoked = true;
        }

    }
    return isProvoked;
}

var tamingPass = 'seems to accept|even challenging';
var tamingFail = 'had too many owners|Cannot tame|Its already tame|tame already|too far|line of sight|be seen';
function Tame(animal) {
    TextWindow.Print('Tame ' + animal.Name() + ' ' + animal.Serial());

    if (animal == null) {
        animal = SelectTarget();
    }
    var pets = Player.Followers();
    TextWindow.Open();

    var isTame = false;

    while (animal.Notoriety() == 3) {
        var startTime = Orion.Now();
        Orion.UseSkill('Animal Taming', animal.Serial());
        Orion.AddDisplayTimer('SkillInUse', 12000, 'AboveChar');
        Orion.Wait(500);
        if (Orion.InJournal(tamingFail, '', '0', '-1', startTime, Orion.Now()) != null) {
            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(500);
            return false;
        }

        while (Orion.DisplayTimerExists('SkillInUse')) {
            Orion.Wait(1000);
        }

        if (Player.Followers() > pets || Orion.InJournal(tamingPass, '', '0', '-1', startTime, Orion.Now()) != null) {
            return true;
        }
        if (Orion.InJournal(tamingFail, '', '0', '-1', startTime, Orion.Now()) != null) {

            return false;
        }
    }
    return Player.Followers() > pets;
}

function Vetting() {
    var target = SelectTarget();

    while (!Player.Dead()) {
        if (target.Hits() < target.MaxHits()) {
            WalkTo(target);
            Orion.Follow(target.Serial());
            Orion.BandageTarget(target.Serial());
            Orion.Wait(2000);
        }

        Orion.Wait(200);

    }
}

function TrainTaming() {
    if (Orion.ScriptRunning('TrainTaming') > 1) {
        Orion.ToggleScript('TrainTaming', true);
    }
    var animals = [];
    while (!Player.Dead()) {
        Orion.IgnoreReset();
        Orion.Wait(1000);
        TextWindow.Print("Looking for tamables");

        if (Orion.SkillValue('Animal Taming', 'base') < 531) {
            animals = Orion.FindTypeEx('0x00D5|0x00DD', any, 'ground', 'mobile', 30, 3); //PolarBears
            Orion.Print('taming polar bears')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 651) {
            animals = Orion.FindTypeEx('0x0041', any, 'ground', 'mobile', 30, 3); //SnowLeaopards
            Orion.Print('snow leaopards')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 831) {
            animals = Orion.FindTypeEx('0x00E8|0x00E9', any, 'ground', 'mobile', 40, 3); //bulls
            Orion.Print('bulls')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 1000)//1200
        {
            animals = Orion.FindTypeEx('0x00D5', any, 'ground', 'mobile|near', 30, 3); //Ridgeback
        }
        animals = animals.filter(function (animal) {
            return animal.Notoriety() == 3
        })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });

        animals.forEach(function (animal) {
            TextWindow.Print('Taming ' + animal.Serial());
            Orion.UseType('0x2805', -1);
            var startTime = Orion.Now();

            Orion.CancelContextMenu();

            Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 8, 1, 1, 2, 15000)
            //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
            Orion.RequestContextMenu(animal.Serial());

            if (Orion.WaitForContextMenu() && Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1, 1, 1, 2, 15000)) {
                TextWindow.Print('Starting Process');

                var animalId = animal.Serial();
                Orion.Wait(1000);
                Orion.Follow(animalId);
                Discord(animal);
                Orion.Wait(4000);

                var tameSuccess = Tame(animal);

                if (tameSuccess) {

                    Orion.RenameMount(animalId, 'gaga');
                    Orion.Wait(1000);
                    Orion.Follow(animalId, false);
                    while (animal.Notoriety() == 1) {
                        TextWindow.Print('Releasing ' + animal.Name() + ' ' + animal.Serial());

                        Orion.Say(animal.Name() + " release");
                        Orion.Wait(500);

                        if (Orion.WaitForGump(10000)) {
                            var gump0 = Orion.GetGump('last');
                            TextWindow.Print(gump0.ID());

                            if ((gump0 !== null) && (gump0.ID() === '0x909CC741')) {
                                gump0.Select(Orion.CreateGumpHook(2));
                                Orion.Wait(400);
                            }
                        }
                        Orion.Wait(3000);
                    }
                }
                if (animal.Notoriety() == 3) {
                    Provoke(animal);
                    if (Player.Followers() > 3) {
                        TextWindow.Print('Killing ' + animal.Name() + ' ' + animal.Serial());

                        Orion.Say("all kill");
                        if (Orion.WaitForTarget(1000)) {

                            Orion.TargetObject(animalId);
                            while (Orion.ObjectExists(animalId)) {
                                TextWindow.Print('Waiting for ' + animal.Name() + ' ' + animal.Serial() + " to die");

                                Orion.Wait(1000);
                            }
                            Orion.Say("all guard");
                        }
                    }
                }


            }
        });
    }
    BotPush("You died")
}