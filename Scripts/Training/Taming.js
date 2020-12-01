//#include Scripts/helpers/Target.js

function Rename() {

    var target = SelectTarget();
    Orion.RenameMount(target.Serial(), 'Iorek');
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
        }
        while (Orion.DisplayTimerExists('SkillInUse')) {
            Orion.Wait(1000);
        }
    }
    return isDiscorded;
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
        Orion.AddDisplayTimer('SkillInUse', 10000, 'AboveChar');
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

var tamingMessage = 'even challenging|It seems it accept|Cannot tame|Its already tame|tame already|too far|line of sight|be seen';
function TrainTaming() {
    Orion.IgnoreReset();
    var animals = [];
    while (!Player.Dead()) {
        Orion.Wait(1000);
        TextWindow.Print("scanning");

        if (Orion.SkillValue('Animal Taming') < 531) {
            animals = Orion.FindTypeEx('0x00D5|0x00DD', any, 'ground', 'mobile', 30, 3); //PolarBears
        }
        else if (Orion.SkillValue('Animal Taming') < 651) {
            animals = Orion.FindTypeEx('0x0041', any, 'ground', 'mobile', 30, 3); //SnowLeaopards
        }
        else if (Orion.SkillValue('Animal Taming') < 831) {
            animals = Orion.FindTypeEx('0x0022', any, 'ground', 'mobile', 30, 3); //WhiteWolf
        }
        else if (Orion.SkillValue('Animal Taming') < 1000)//1200
        {
            animals = Orion.FindTypeEx('0x00D5', any, 'ground', 'mobile', 30, 3); //Ridgeback
        }
        animals = animals.filter(function (animal) { return animal.Notoriety() == 3 });
        animals.forEach(function (animal) {
            TextWindow.Print(animal.Properties() + '  '  + animal.Serial());

            Orion.UseType('0x2805', -1);

            var startTime = Orion.Now();
            
Orion.CancelContextMenu();


Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 8, 1, 1,2,15000)
//Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
Orion.RequestContextMenu(animal.Serial());
            if (Orion.WaitForContextMenu() && Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1, 1, 1,2,15000) )
    {
                var animalId = animal.Serial();
                Orion.Wait(1000);
                Orion.Follow(animalId);
                Discord(animal);
                Tame(animal);

                if (Orion.InJournal('seems to accept', '', '0', '-1', startTime, Orion.Now())) {

                    Orion.RenameMount(animalId, 'a horse');
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
                            Orion.Say("all kill");
                            if (Orion.WaitForTarget(1000)) {
                                Orion.TargetObject(animalId);
                                while (Orion.ObjectExists(animalId) || !animal.Dead()) {
                                    Orion.Wait(1000);
                                }
                                Orion.Say("all guard");
                            }
                        }
                    }
                }
            }
        });
    }
}