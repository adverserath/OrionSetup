//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

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

function ReleaseAllPets(animal,selectedTarget) {
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
  while(Orion.ObjectExists(pet.Serial()))
  {
  Orion.CastTarget('Flame Strike',pet.Serial())
  Orion.Wait(1000);
  }
        }
    });
    if (Player.Followers() == 5) {
        BotPush("Too Many Pets");
        Orion.Wait(60000);
    }

}

function Release(target)
{
if(target==null)
target  = SelectTarget();
          	Orion.RequestContextMenu(target.Serial());
	Orion.WaitContextMenuID(target.Serial(), 9);
	
	
		Orion.RequestContextMenu(target.Serial());
	Orion.WaitContextMenuID(target.Serial(), 9);
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x909CC741'))
		{
			gump0.Select(Orion.CreateGumpHook(2));
			Orion.Wait(100);
		}
	}
	
}

function PrintNumberOfMobs()
{

Orion.Print(Orion.FindTypeEx(any, any, 'ground', 'mobile', 30, 3).length)
}