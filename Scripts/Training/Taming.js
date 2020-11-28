//#include Scripts/helpers/Target.js

function Rename() {
    var target = SelectTarget();
    Orion.RenameMount(target.Serial(), 'Iorek');
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

var tamingMessage = 'It seems it accept|Cannot tame|Its already tame|tame already|too far|line of sight|be seen';
var discordMessage = 'You play jarring music|That creature is'
function TrainTaming() {
    var animals = [];
    while (!Player.Dead()) {
        Orion.Wait(1000);

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

        animals.forEach(function (animal) {
            Orion.UseType('0x2805', -1);
            var isDiscorded = false;

            var keepTaming = true;
            var startTime = Orion.Now();
            while (keepTaming) {

                if (Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1, 1, 10)) {
                    Orion.Follow(animal.Serial());
                    if (!isDiscorded) {
                        Orion.Print("discording");
                        Orion.UseSkill('Discordance', animal.Serial());
                        Orion.AddDisplayTimer('SkillInUse', 4000, 'AboveChar');

                        while (Orion.TimerExists('SkillInUse')) {
                            Orion.Wait(100);
                        }
                        Orion.Print(Orion.InJournal(discordMessage, startTime, Orion.Now()) != null)
                        isDiscorded = Orion.InJournal(discordMessage, startTime, Orion.Now()) != null;
                    }
                    else {

                        Orion.UseSkill('Animal Taming', animal.Serial());
                        Orion.AddDisplayTimer('SkillInUse', 10000, 'AboveChar');
                        while (Orion.TimerExists('SkillInUse')) {
                            Orion.Wait(100);
                        }
                        if (Orion.InJournal(tamingMessage, startTime, Orion.Now() + 1000)) {
                            keepTaming = false;
                            Orion.Ignore(animal.Serial());
                            Orion.RenameMount(animal.Serial(), 'a horse');
                            Orion.Wait(400);
                            Orion.Say(animal.Name() + " release");
                            Orion.Follow(animal.Serial(), false);

                            if (Orion.WaitForGump(1000)) {
                                var gump0 = Orion.GetGump('last');
                                if ((gump0 !== null) && (gump0.ID() === '0x909CC741')) {
                                    gump0.Select(Orion.CreateGumpHook(2));
                                    Orion.Wait(100);
                                    Orion.Say("Iorek kill");
                                    if (Orion.WaitForTarget(100)) {
                                        Orion.TargetObject(animal);
                                        while (!animal.Dead()) {
                                            Orion.Wait(1000);
                                        }
                                        Orion.Say("Iorek guard");
                                    }
                                }
                            }
                        }
                    }
                }


            }
        });

    }

}