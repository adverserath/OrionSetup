//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Magic.js

var vowel = ['a', 'e', 'i', 'o', 'u']
var cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
var selectedTarget;
var startingPetCount;

function TrainTaming() {
    if (selectedTarget == null) {
        selectedTarget = [];
    }
    startingPetCount = Player.Followers();
    var tames = 0;
    if (Orion.ScriptRunning('TrainTaming') > 1) {
        Orion.ToggleScript('TrainTaming', true);
    }
    Orion.Print("Select the animals you taming, you can add them in later using AddNewTameToList");

    Orion.WarMode(1);
    Orion.Wait(500);

    while (Player.WarMode() == true) {
        Orion.Print("Select Targets then leave war mode")
        var animal = SelectTarget();
        if (animal != null && animal.Mobile() == true) {
            selectedTarget.push(animal.Graphic())
        }
        else {
            Orion.Print("That wasnt an animal, waiting 5 seconds")
            Orion.Wait(5000);
        }
        Orion.Wait(1000);

    }
    Orion.Print("Select a rune bag")
    var runeBag = SelectTarget();

    var useRunes = runeBag!=null;
    var runes;
    if(useRunes)
		runes = Orion.FindTypeEx('0x1F14', any, runeBag.Serial());
    
    var startingSkill = Orion.SkillValue('Animal Taming', 'real')
    var animals = [];
    var lastDirection;
    while (!Player.Dead()) {
        var animals = [];
        Orion.Wait(800);
        TextWindow.Print("Looking for tamables");

        if (selectedTarget.length > 0) {
            selectedTarget.forEach(function (graphic) {
                animals = animals.concat(Orion.FindTypeEx(graphic, any, 'ground', 'mobile', 60, 3))
            })
        }
        animals = animals.filter(function (animal) {

            return ((animal.Properties().match(/tameable/gi) || []).length >= 1)
        })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });
        animals.forEach(function (animal) {
            TextWindow.Print(animal.Name());

        })


        animals = animals.filter(function (animal) {

            return ((animal.Properties().match(/tameable/gi) || []).length >= 1) && (animal.Name().length != 4)
        })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });
        animals.forEach(function (animal) {
            TextWindow.Print(animal.Name());

        })

        TextWindow.Print("Found:" + animals.length);
        while (Player.WarMode() == true) {
            Orion.Print("Select More type of animal then leave war mode")
            var newTame = SelectTarget();
            if (newTame != null && newTame.Mobile() == true) {
                selectedTarget.push(newTame.Graphic())
            }
            else {
                Orion.Print("That wasnt an animal, waiting 5 seconds")
                Orion.Wait(5000);
            }
            Orion.Wait(500);

        }
        if (useRunes && runes.length == 0) {
            runes = Orion.FindTypeEx('0x1F14', any, runeBag.Serial());
        }
        if (useRunes && animals.length == 0 && selectedTarget.length > 0) {
            var randomChoice = 15;//Orion.Random(14);
            var rune = runes.shift();
            RecallRune(rune);
            if (randomChoice <= 2 && lastDirection != 0) {
                lastDirection = 0;
                var rune = runes.shift();
                RecallRune(rune);
            }
            else if (randomChoice <= 5 && lastDirection != 3) {
                lastDirection = 1;
                Orion.WalkTo(Player.X() + 50, Player.Y(), Player.Z(), 5, 255, 1, 0, 10000);
            }
            else if (randomChoice <= 8 && lastDirection != 4) {
                lastDirection = 2;
                Orion.WalkTo(Player.X(), Player.Y() + 50, Player.Z(), 5, 255, 1, 0, 10000);

            }
            else if (randomChoice <= 11 && lastDirection != 1) {
                lastDirection = 3;
                Orion.WalkTo(Player.X() - 50, Player.Y(), Player.Z(), 5, 255, 1, 0, 10000);

            }
            else if (randomChoice <= 14 && lastDirection != 2) {
                lastDirection = 4;
                Orion.WalkTo(Player.X(), Player.Y() - 50, Player.Z(), 5, 255, 1, 0, 10000);

            }
        }
        TextWindow.Print('Entering Tame Loop');

        animals.forEach(function (animal) {
            //     TakeOffClothesAndMeditate();


            TextWindow.Print("Taming: Name:" + animal.Name() + ' ID:' + animal.Serial())
            TextWindow.Print('Gained :' + (Orion.SkillValue('Animal Taming', 'real') - startingSkill))
            var startTime = Orion.Now();

            StayAway(animal.Serial(), 6);
            //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
            Orion.RequestContextMenu(animal.Serial());

            if (Orion.WaitForContextMenu() && (Player.Followers() < 5) && Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 8, 255, 1, 2, 15000)) {
                Orion.CancelContextMenu();

                var animalId = animal.Serial();
                //     Orion.Follow(animalId);

                var successfulTame = Tame(animal);
                TextWindow.Print('Taming ' + successfulTame);

                Orion.CancelContextMenu();
                Orion.Print("Name:" + animal.Name() + ' ID:' + animal.Serial())
                Orion.Wait(1000);
                ReleaseAllPets(animal);
            }
            else {
                TextWindow.Print("Could not get:" + animal.Name() + ' ID:' + animal.Serial())

                Orion.Ignore(animal.Serial());
            }

        });
        animals = [];
    }
    BotPush("You died")
  //  Orion.ShutdownWindows('forced')
}

function Rename(petId) {
    if (petId == null)
        petId = SelectTarget().Serial();

    var name = cons[Orion.Random(21)] + vowel[Orion.Random(5)] + cons[Orion.Random(21)] + vowel[Orion.Random(5)];
    Orion.RenameMount(petId, name);
}

var tamingPass = 'seems to accept|even challenging|tame already';
var tamingFail = 'else is already|had too many owners|Cannot tame|Its already tame|too far|line of sight|be seen';
function AutoTame() {
    Tame(SelectTarget())
}
function Tame(animal) {

    var attempt = 0;
    if (animal == null) {
        animal = SelectTarget();
    }
    TextWindow.Print('Tame ' + animal.Name() + ' ' + animal.Serial());
    var pets = Player.Followers();
    TextWindow.Open();

    var isTame = false;

    while ((animal.Properties().match(/tameable/gi) || []).length >= 1) {
        attempt++;
        TextWindow.Print("Taming attempt:" + attempt)
        var startTime = Orion.Now();
        StayAway(animal.Serial(), 2);
        Orion.UseSkill('Animal Taming', animal.Serial());
        Orion.AddDisplayTimer('SkillInUse', 12000, 'AboveChar');
        Orion.Wait(300);
        var output = Orion.InJournal(tamingFail, '', '0', '-1', startTime - 300, Orion.Now());
        if (output != null) {
            TextWindow.Print('Cannot Tame');
            TextWindow.Print(output);

            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(200);
            return false;
        }
        if (Orion.InJournal('Somebody else|seem to anger', '', '0', '-1', startTime - 300, Orion.Now() != null)) {
            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(200);
        }
        while ((Orion.DisplayTimerExists('SkillInUse')
            || Orion.InJournal('saving', '', '0', '-1', Orion.Now() - 300, Orion.Now()) != null)
            && Orion.InJournal('fail to tame', '', '0', '-1', startTime, Orion.Now()) == null
            && Orion.InJournal(tamingPass, '', '0', '-1', startTime, Orion.Now()) == null) {
            //Orion.UseObject('0x40156CE2');
            //   TextWindow.Print('Waiting because timer is active')
            StayAway(animal.Serial(), 6);
            Orion.Wait(300);
        }
        Orion.RemoveDisplayTimer('SkillInUse');
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
        if (target.Hits() < target.MaxHits() - 1) {
            WalkTo(target);
            Orion.Follow(target.Serial());
            Orion.BandageTarget(target.Serial());
            Orion.Wait(2000);
        }
        Orion.Wait(300);

    }
}

function ReleaseAllPets(pet) {
    TextWindow.Print('Starting Pet Killer');
    //Orion.InvokeVirtue('Honor');
    // if (Orion.WaitForTarget(1000)) {
    //      Orion.TargetObject(pet.Serial());
    //  }
    if (Player.Followers() > startingPetCount) {
        Orion.Print('free ' + pet.Name())
        TextWindow.Print('Releasing ' + pet.Name() + ' ' + pet.Serial());
        Orion.WalkTo(pet.X(), pet.Y(), pet.Z(), 4, 1, 1, 2, 15000)
        Rename(pet.Serial());
        Orion.Wait(1000);

        //            Orion.Ignore(pet.Serial());
        //KILL
        //Release(pet);
        //  TextWindow.Print('Killing' + pet.Serial());
        //     Orion.Follow(pet.Serial(), false);
        //    while (Orion.ObjectExists(pet.Serial())) {
        //        StayAway(pet.Serial(), 8);
        //       Orion.CastTarget('Flame Strike', pet.Serial())
        //        Orion.Wait(1000);
        //        TextWindow.Print('Killing');
        //   }

        //DROP AT SWAMP
        //  WalkTo(pet,1)
        //  Orion.Wait(1000);
        //   Orion.UseObject(pet.Serial())
        //   Orion.Wait(1000);
        //  RecallRune(Orion.FindObject('0x400004E6'));
        //  Orion.Wait(500);

        //   Orion.Step(2, 2);
        //  Orion.Step(2, 2);
        //   Orion.UseObject(self)
        //   Orion.Wait(800);
        //    Orion.Say('all guard');
        Release(pet);
        //  Orion.Wait(400);
        //  RecallRune(Orion.FindObject('0x4003EDB0'));
    }

    if (Player.Followers() == 5) {
        BotPush("Too Many Pets");
        Orion.Wait(60000);
    }
    while (Player.Hits() < Player.MaxHits()) {
        Orion.CastTarget('Greater Heal', self)
        Orion.Wait(1000);
        TextWindow.Print('Healing self');

    }
}

function Release(target) {
    if (target == null)
        target = SelectTarget();
    var tries = 0;
    TextWindow.Print('Releasing' + target.Serial());

    while (((target.Properties().match(/\(tame\)/gi) || []).length >= 1) && tries < 3) {
        tries++;
        Orion.Wait(1000);

        Orion.Say(target.Name() + " release");
        if (Orion.WaitForGump(2000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x909CC741')) {
                gump0.Select(Orion.CreateGumpHook(2));
                Orion.Wait(500);
            }
            if (((target.Properties().match(/\(tame\)/gi) || []).length >= 1)) {
                Orion.RequestContextMenu(target.Serial());
                Orion.WaitContextMenuID(target.Serial(), 9);
                if (Orion.WaitForGump(2000)) {
                    var gump0 = Orion.GetGump('last');
                    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x909CC741')) {
                        gump0.Select(Orion.CreateGumpHook(2));
                        Orion.Wait(500);
                    }
                }
            }
        }
    }
}

function PrintNumberOfMobs() {

    Orion.Print(Orion.FindTypeEx(any, any, 'ground', 'mobile', 30, 3).length)
}

function AddNewTameToList() {
    if (selectedTarget == null) {
        selectedTarget = [];
    }
    selectedTarget.push(SelectTarget().Graphic());
}



function Escape() {

    while (!Player.Dead()) {
        Orion.Wait(500);
        if (Player.Hits() < (Player.MaxHits() / 2)) {
            var rune = Orion.FindObject('0x400004E8');
            RecallRune(rune);
            BotPush('You went to a safe location')
            Orion.PauseScript('TrainTaming');
            Orion.PauseScript();
        }
    }
}
