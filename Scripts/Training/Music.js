//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

var discordMessage = 'jarring music|already in'

function TrainDiscord() {
    var bardRange = 8 + ((parseInt(Orion.SkillValue('Discordance')) / 10) / 15);
    Orion.Print(bardRange)
    Orion.ActivateClient();
    Orion.WalkTo(2274, 1059, 27, 0, 1)
    var animal = SelectTarget();
    while (!Player.Dead()) {
        var startTime = Orion.Now();
        var isDiscorded = false;
        WalkTo(animal, bardRange)

        while (!isDiscorded) {
            Orion.UseType('0x0E9D', '0xFFFF');
            Orion.Print("discording " + animal.Name() + ' ' + animal.Serial());
            Orion.Wait(1000);
            Orion.AddDisplayTimer('SkillInUse', 4000, 'AboveChar');
            Orion.UseSkill('Discordance', animal.Serial());
            Orion.Wait(500);
            Orion.Print(InRange(Player, animal, bardRange))
            Orion.Print(animal.InLOS())
            if (Orion.InJournal(discordMessage, '', '0', '-1', startTime, Orion.Now()) != null) {
                isDiscorded = true;
                Orion.WalkTo(2273, 1060, 27, 0, 1)
                Orion.Wait(15000)
            }
            while (Orion.DisplayTimerExists('SkillInUse')) {
                Orion.Wait(1000);
            }
        }
    }
}

var provokeMessage = 'you start a fight|cannot be seen'

//This method needs a house location, with 2 1x1 stable cells.
function TrainProvoke() {
    Orion.ActivateClient();
    Orion.Print('Target the attacker')
    var attacker = SelectTarget();
    Orion.Print('Target the target')
    var target = SelectTarget();

    Orion.ClearHighlightCharacters(true);
    Orion.AddHighlightCharacter(target.Serial(), '0x0026', true);
    Orion.AddHighlightCharacter(attacker.Serial(), '0x0004', true);

    while (!Player.Dead()) {
        Orion.Wait(100)
        if (!Orion.DisplayTimerExists('SkillInUse')) {
            Orion.UseType('0x0E9D', '0xFFFF');
            Orion.UseSkill('Provocation', attacker.Serial());
            Orion.Wait(500);
            if (Orion.WaitForTarget(2000)) {
                Orion.TargetObject(target.Serial());
                Orion.AddDisplayTimer('SkillInUse', 11000, 'AboveChar');
            }
            Orion.Wait(1000)

        }
    }
}

function TrainMusic() {
    var tames = 0;
    if (Orion.ScriptRunning('TrainMusic') > 1) {
        Orion.ToggleScript('TrainMusic', true);
    }
    Orion.Print("what are you musicing");
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

    var startingSkill = Orion.SkillValue('Pro', 'real')
    var animals = [];


    while (!Player.Dead()) {
        var animals = [];
        Orion.IgnoreReset();
        Orion.ResetIgnoreList();
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
                animals = animals.concat(Orion.FindTypeEx(graphic, any, 'ground', 'mobile', 60, 3))
            })

        }

    }
    BotPush("You died")
}

function ReleaseAllPets(animal, selectedTarget) {
    var pets = [];

    if (selectedTarget.length > 0) {
        selectedTarget.forEach(function (graphic) {
            pets = pets.concat(Orion.FindTypeEx(graphic, any, 'ground', 'mobile', 60, 3)).filter(function (animal) {
                return animal.Notoriety() == 1
            });
        })
        TextWindow.Print('Current pets: ' + pets.length);

    }

    pets.forEach(function (pet) {
        if (Player.Followers() > 1) {
            Orion.Print('free ' + pet.Name())
            TextWindow.Print('Releasing ' + pet.Name() + ' ' + pet.Serial());
            Orion.WalkTo(pet.X(), pet.Y(), pet.Z(), 4, 1, 1, 2, 15000)
            Rename(pet.Serial());
            Orion.Wait(1500);
            //    Orion.Say(pet.Name() + " release");
            Release(pet);
            //            Orion.Ignore(pet.Serial());
            //KILL
            while (Orion.ObjectExists(pet.Serial())) {
                Orion.CastTarget('Flame Strike', pet.Serial())
                Orion.Wait(1000);
            }
        }
    });
    if (Player.Followers() == 5) {
        BotPush("Too Many Pets");
        Orion.Wait(60000);
    }

}

function Release(target) {
    if (target == null)
        target = SelectTarget();
    Orion.RequestContextMenu(target.Serial());
    Orion.WaitContextMenuID(target.Serial(), 9);


    Orion.RequestContextMenu(target.Serial());
    Orion.WaitContextMenuID(target.Serial(), 9);
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x909CC741')) {
            gump0.Select(Orion.CreateGumpHook(2));
            Orion.Wait(100);
        }
    }

}

function PrintNumberOfMobs() {

    Orion.Print(Orion.FindTypeEx(any, any, 'ground', 'mobile', 30, 3).length)
}