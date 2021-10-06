//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/TradeItems.js
//#include helpers/ItemManager.js
//#include helpers/Debug.js
//#include helpers/cliloc.js
//#include helpers/Notifier.js

var counter = 0;
var startBot = null
function ToZoo(_private) {
    RecallRune(Orion.FindObject('0x40156491'))
}

function ToHiryu(_private) {
    RecallRune(Orion.FindObject('0x40156B10'))
}

function TameHiryu() {
    startBot = Orion.Now()
    while (true) {
        Orion.Wait(500)
        var hiryus = Orion.FindTypeEx('0x00F3', any, ground, 'near')
            .filter(function (hiryu) {
                return hiryu.Name() === 'a hiryu'
            })
        if (hiryus.length > 0) {
            var hiryu = hiryus.shift()
            if (Tame(hiryu)) {
                HandInPet()
            }
        }
    }
}

var tamingPass = 'seems to accept|even challenging|tame already';
var tamingFail = 'else is already|had too many owners|Cannot tame|Its already tame|too far|line of sight|be seen';
var anger = 'You seem to anger'

function Tame(animal) {

    if (animal == null) {
        animal = SelectTarget();
    }
    TextWindow.Print('Tame ' + animal.Name() + ' ' + animal.Serial());
    var pets = Player.Followers();
    TextWindow.Open();

    var isTame = false;

    while ((animal.Properties().match(/tameable/gi) || []).length >= 1) {
        var startTime = Orion.Now();

        Orion.UseSkill('Animal Taming', animal.Serial());

        Orion.AddDisplayTimer('SkillInUse', 12000, 'AboveChar');
        Orion.Wait(50);
        var output = Orion.InJournal(tamingFail, '', '0', '-1', startTime - 50, Orion.Now());

        if (output != null) {
            TextWindow.Print('Cannot Tame');
            TextWindow.Print(output);

            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(50);
            return false;
        }
        if (Orion.InJournal('Somebody else|seem to anger', '', '0', '-1', startTime - 50, Orion.Now() != null)) {
            Orion.RemoveDisplayTimer('SkillInUse');
            Orion.Wait(50);
        }
        while ((Orion.DisplayTimerExists('SkillInUse')
            || Orion.InJournal('saving', '', '0', '-1', Orion.Now() - 50, Orion.Now()) != null)
            && Orion.InJournal('fail to tame', '', '0', '-1', startTime, Orion.Now()) == null
            && Orion.InJournal(tamingPass, '', '0', '-1', startTime, Orion.Now()) == null
            && Orion.InJournal(anger, '', '0', '-1', startTime, Orion.Now()) == null) {
            Orion.Wait(200);
        }
        Orion.RemoveDisplayTimer('SkillInUse');
        if (Player.Followers() > pets || Orion.InJournal(tamingPass, '', '0', '-1', startTime, Orion.Now()) != null) {
            TextWindow.Print('Tamed animal');

            while (animal.Exists()) {
                Orion.Say('All Come')
                Orion.Wait(100)
                Orion.UseObject(animal.Serial())
                Orion.Wait(100)
            }
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

function HandInPet(_private) {
    ToZoo()
    Orion.Wait(800)
    Orion.WalkTo(2541, 1375, 255)
    Orion.UseObject('self');
    Orion.Wait(800)
    var pets = Orion.FindTypeEx('0x00F3', any, ground, 'mobile', 3, 'blue|green')
    if (pets.length > 0) {
        var pet = pets.shift()
        if (pet.Color() == '0x855C' || pet.Color() == '0x8490') {
            Orion.PauseScript()
            BotPush('Color')
        }
        var petId = pet.Serial()
        Orion.RequestContextMenu(petId);
        Orion.WaitContextMenuID(petId, 8);
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('0x4001A569');
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x6A96627C')) {
                gump0.Select(Orion.CreateGumpHook(1));
                Orion.Wait(100);
                counter++;
                Orion.Print('Handed in ' + counter)
            }
        }
    }
    if ((startBot + 3300000) < Orion.Now()) {
        BotPush('Move Boxes')
        Orion.PauseScript()
    }
    ToHiryu()
    Orion.Wait(400)
}