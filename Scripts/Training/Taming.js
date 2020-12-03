//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function Rename() {

    var target = SelectTarget();
    Orion.RenameMount(target.Serial(), 'bull');
}


var discordMessage = 'play jarring music|That creature is|cannot be seen|too far|line of sight|no effect'
var discordRetry = 'attempt to disrupt'
// 
function Discord(animal) {
    if (animal == null) {
        animal = SelectTarget();
    }
    var startTime = Orion.Now();
    var isDiscorded = false;

    while (!isDiscorded) {
        Orion.Print("discording " + animal.Name());
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
    if (animal == null) {
        animal = SelectTarget();
    }
    var animals = Orion.FindTypeEx(any, any, 'ground', 'mobile|live|nothuman', 30, 3);
    Orion.Follow(animal.Serial());
    var startTime = Orion.Now();
    var isProvoked = false;

    while (!isProvoked) {
        Orion.Wait(1000);
        Orion.AddDisplayTimer('SkillInUse', 4000, 'AboveChar');
        Orion.UseSkill('Provocation', animal.Serial());
        Orion.Wait(500);

        var closest = animals.filter(function (internalAnimal) {
            return internalAnimal.Name() != 'a bull' && internalAnimal.Serial() != animal.Serial() && animal.InLOS()
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

function Tame(animal) {
    if (animal == null) {
        animal = SelectTarget();
    }
    TextWindow.Open();

    var isTame = false;

    while (!isTame) {
        var startTime = Orion.Now();
        Orion.Print("Taming " + animal.Name());
        Orion.UseSkill('Animal Taming', animal.Serial());
        Orion.AddDisplayTimer('SkillInUse', 12000, 'AboveChar');
        Orion.Wait(500);
        if (Orion.InJournal(tamingMessage, '', '0', '-1', startTime, Orion.Now()) != null) {
            TextWindow.Print(Orion.InJournal(tamingMessage, '', '0', '-1', startTime, Orion.Now()) != null);
            TextWindow.Print(Orion.InJournal(tamingMessage, '', '0', '-1', startTime, Orion.Now()).Text());
            isTame = true;
            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(500);
        }

        while (Orion.DisplayTimerExists('SkillInUse')) {
            Orion.Wait(1000);
        }

        if (Orion.InJournal(tamingMessage, '', '0', '-1', startTime, Orion.Now()) != null) {

            TextWindow.Print(Orion.InJournal(tamingMessage, '', '0', '-1', startTime, Orion.Now()).Text());
            isTame = true;
        }
    }
    return isTame;
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

var tamingMessage = 'had too many owners|It seems it accept|Cannot tame|Its already tame|tame already|too far|line of sight|be seen';
function TrainTaming() {
    var animals = [];
    while (!Player.Dead()) {
    Orion.IgnoreReset();
        Orion.Wait(1000);
        TextWindow.Print("scanning");

        if (Orion.SkillValue('Animal Taming', 'base') < 531) {
            animals = Orion.FindTypeEx('0x00D5|0x00DD', any, 'ground', 'mobile', 30, 3); //PolarBears
            Orion.Print('taming polar bears')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 651) {
            animals = Orion.FindTypeEx('0x0041', any, 'ground', 'mobile', 30, 3); //SnowLeaopards
            Orion.Print('snow leaopards')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 831) {
            animals = Orion.FindTypeEx('0x00E8|0x00E9', any, 'ground', 'mobile', 30, 3); //WhiteWolf
            Orion.Print('bulls')
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 1000)//1200
        {
            animals = Orion.FindTypeEx('0x00D5', any, 'ground', 'mobile|near', 30, 3); //Ridgeback
        }
        animals = animals.filter(function (animal) { 
                    Orion.Print(animal.Hits()===animal.MaxHits())

        return animal.Notoriety() == 3  
        });
        animals.forEach(function (animal) {

            Orion.UseType('0x2805', -1);
            var startTime = Orion.Now();

            Orion.CancelContextMenu();


            Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 8, 1, 1, 2, 15000)
            //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
            Orion.RequestContextMenu(animal.Serial());
            Orion.Print(animal.Hits()===animal.MaxHits())
            if (Orion.WaitForContextMenu()  && Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1, 1, 1, 2, 15000)) {
                var animalId = animal.Serial();
                Orion.Wait(1000);
                Orion.Follow(animalId);
                Discord(animal);
                Tame(animal);

                if (Orion.InJournal('seems to accept|even challenging', '', '0', '-1', startTime, Orion.Now())) {

                    Orion.RenameMount(animalId, 'gaga');
                    Orion.Wait(1000);
                    Orion.Follow(animalId, false);
                    Orion.Say(animal.Name() + " release");
                    Orion.Wait(500);

                    if (Orion.WaitForGump(10000)) {
                        var gump0 = Orion.GetGump('last');
                        TextWindow.Print(gump0.ID());

                        if ((gump0 !== null) && (gump0.ID() === '0x909CC741')) {
                            gump0.Select(Orion.CreateGumpHook(2));
                            Orion.Wait(400);

                            Provoke(animal);
                            // Orion.Say("all kill");
                            //  if (Orion.WaitForTarget(1000)) {

                            //         Orion.TargetObject(animalId);
                            //        while (Orion.ObjectExists(animalId) || !animal.Dead()) {
                            //              Orion.Wait(1000);
                            //          }
                            //          Orion.Say("all guard");
                            //     }
                        }
                    }
                }
            }
        });
    }
    BotPush("You died")
}