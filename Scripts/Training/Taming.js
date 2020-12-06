//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

var vowel = ['a', 'e', 'i', 'o', 'u']
var cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']


function Rename(petId) {
    if (petId == null)
        petId = SelectTarget().Serial();

    var name = cons[Orion.Random(21)] + vowel[Orion.Random(5)] + cons[Orion.Random(21)] + vowel[Orion.Random(5)];
    Orion.RenameMount(petId, name);
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

var provokeMessage = 'you start a fight|cannot be seen'

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
        if (closest.length > 0)
            Orion.TargetObject(closest.shift().Serial());
        else
            return false;
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

var tamingPass = 'seems to accept|even challenging|tame already';
var tamingFail = 'else is already|had too many owners|Cannot tame|Its already tame|too far|line of sight|be seen';
function Tame(animal) {
    TextWindow.Print('Tame ' + animal.Name() + ' ' + animal.Serial());
    var attempt = 0;
    if (animal == null) {
        animal = SelectTarget();
    }
    var pets = Player.Followers();
    TextWindow.Open();

    var isTame = false;

    while (animal.Notoriety() == 3) {
        attempt++;
        TextWindow.Print("Taming attempt:" + attempt)
        var startTime = Orion.Now();
        Orion.UseSkill('Animal Taming', animal.Serial());
        Orion.AddDisplayTimer('SkillInUse', 10000, 'AboveChar');
        Orion.Wait(300);
        var output = Orion.InJournal(tamingFail, '', '0', '-1', startTime - 300, Orion.Now());
        if (output != null) {
            TextWindow.Print('Cannot Tame');
            TextWindow.Print(output);

            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(200);
            return false;
        }
        if (Orion.InJournal('Somebody else', '', '0', '-1', startTime - 300, Orion.Now() != null)) {
            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(200);
        }
        while (Orion.DisplayTimerExists('SkillInUse')
            || Orion.InJournal('saving', '', '0', '-1', Orion.Now() - 300, Orion.Now()) != null
            && Orion.InJournal('fail to tame', '', '0', '-1', Orion.Now() - 300, Orion.Now()) == null) {

            //   TextWindow.Print('Waiting because timer is active')

            Orion.Wait(100);
        }

        if (Player.Followers() > pets || Orion.InJournal(tamingPass, '', '0', '-1', startTime, Orion.Now()) != null) {
            TextWindow.Print('Tamed animal');
            return true;
        }
        output = Orion.InJournal(tamingFail, '', '0', '-1', startTime, Orion.Now());
        if (output != null) {
            TextWindow.Print('Taming Fail');
            TextWindow.Print(output);

            return false;
        }
    }
    TextWindow.Print('Exit Tame');
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
    var tames = 0;
    if (Orion.ScriptRunning('TrainTaming') > 1) {
        Orion.ToggleScript('TrainTaming', true);
    }
    Orion.Print("what are you taming");
    var selectedTarget = []
    var selecting = true;
    while (selecting) {
        var animal = SelectTarget();
        if (animal != null) {
            selectedTarget.push(animal.Graphic())
        }
        else {
            selecting = false;
        }
    }

    var startingSkill = Orion.SkillValue('Animal Taming', 'real')
    var animals = [];
    Orion.IgnoreReset();
    Orion.ResetIgnoreList();

    while (!Player.Dead()) {
        Orion.Wait(200);
        TextWindow.Print("Looking for tamables");

        if (Orion.SkillValue('Animal Taming', 'base') < 600) {
            selectedTarget.push('0x00D8|0x00E2|0x00CC');
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 651) {
            selectedTarget.push('0x0041');

        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 950) {
            selectedTarget.push('0x00E8|0x00E9');
        }
        else if (Orion.SkillValue('Animal Taming', 'base') < 1000)//1200
        {
            selectedTarget.push('0x00D5');
        }

        if (selectedTarget.length > 0) {
            selectedTarget.forEach(function (graphic) {
                animals = animals.concat(Orion.FindTypeEx(graphic, any, 'ground', 'mobile', 30, 3))
            })

        }

        animals = animals.filter(function (animal) {
            Orion.Print("found" + animal.Name())
            return animal.Notoriety() == 3 && animal.Name().length != 4
        })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });

        animals.forEach(function (animal) {
            TextWindow.Print('Taming ' + animal.Name());
            TextWindow.Print('Gained :' + (Orion.SkillValue('Animal Taming', 'real') - startingSkill))
            var startTime = Orion.Now();

            Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 8, 1, 1, 2, 15000)
            //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
            Orion.RequestContextMenu(animal.Serial());

            if (Orion.WaitForContextMenu() && (Player.Followers() < 5) && Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1, 1, 1, 2, 15000)) {
                Orion.CancelContextMenu();

                var animalId = animal.Serial();
                Orion.Follow(animalId);

                Tame(animal);
            }
            Orion.Print("free them all")
            Orion.Say('all guard');
            ReleaseAllPets(animal,selectedTarget);
        });
    }
    BotPush("You died")
}

function ReleaseAllPets(animal,selectedTarget) {
    var pets = [];

    if (selectedTarget.length > 0) {
        selectedTarget.forEach(function (graphic) {
            pets = pets.concat(Orion.FindTypeEx(graphic, any, 'ground', 'mobile', 30, 3)).filter(function (animal) {
                return animal.Notoriety() == 1
            });
        })

    }

    pets.forEach(function (pet) {
        if (Player.Followers() > 1) {
            Orion.Print('free ' + pet.Name())
            TextWindow.Print('Releasing ' + pet.Name() + ' ' + pet.Serial());
            Rename(pet.Serial());
            Orion.Wait(300);
            Orion.Say(pet.Name() + " release");
            Orion.Wait(500);

            if (Orion.WaitForGump(12000)) {
                var gump0 = Orion.GetGump('last');
                TextWindow.Print(gump0.ID());

                if ((gump0 !== null) && (gump0.ID() === '0x909CC741')) {
                    gump0.Select(Orion.CreateGumpHook(2));
                    Orion.Wait(800);
                }
            }
            Orion.Ignore(pet.Serial());
        }
    });
    Orion.Ignore(animal.Serial());
    if (Player.Followers() == 5) {
        BotPush("Too Many Pets");
        Orion.Wait(60000);
    }

}