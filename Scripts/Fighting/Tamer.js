//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

function VetMultiPets() {
    var selected;
    var selecting = true;
    var pets = [];
    while (selecting) {
        selected = SelectTarget();
        if (selected == null) {
            selecting = false
        }
        else if (selected.Mobile()) {
            pets.push(selected)
        }

    }

    pets.forEach(function (pet) {
        Orion.Print("Selected:" + pet.Name())
    })

    while (true) {
        Orion.Wait(200)
        pets.filter(function (pet) {
            return pet.Distance() <= 2
        })
            .sort(function (petA, petB) {
                return petA.Hits() - petB.Hits()
            })
            .forEach(function (pet) {

                if (pet != null) {
                    Orion.Wait(300);
                    if (pet != null && (pet.Poisoned() || pet.Hits() < (pet.MaxHits()-2) || pet.Dead())
                        && !Orion.BuffExists('veterinary')) {
                        Orion.WaitWhileTargeting(1000);
                        Orion.BandageTarget(pet.Serial());
                        Orion.AddDisplayTimer('bandagePet',
                            Orion.BuffTimeRemaining('veterinary'),
                            'Top', 'Circle', 'HealOther', 0, 0,
                            'any', -1, '0x0000FFFE');
                        Orion.DisplayTimerSetIcon('veterinary', 'Top', '0x0E21');
                    }
                }
            })
    }
}

function Poison() {
    var target = SelectTarget();
    while (!target.Dead()) {
        Orion.Wait(1000);
        if (!target.Poisoned() && target.Hits() == target.MaxHits()) {
            Orion.CastTarget('poison', target.Serial())
        }
        else if (!target.Poisoned() && target.Hits() < target.MaxHits()) {
            Orion.CastTarget('Heal', target.Serial())
        }
    }
}

function ForceLore() {
    var lastGump = Orion.GetLastGump().Serial();
    if (Orion.GumpExists('generic', any, '0xD937D1DB')) {
        Orion.GetLastGump().Close();
    }
    var target = SelectTarget();
    var gumpText;
    while (target.Distance() < 20 && !Orion.GumpExists('generic', any, '0xD937D1DB')) {
        Orion.UseSkill('Animal Lore', target.Serial())
        Orion.Wait(400);
    }
}

function TrainLore()
{
    while(Orion.SkillValue('animal lore')<1000)
    {
        if (Orion.GumpExists('generic', any, '0xD937D1DB')) {
        Orion.GetLastGump().Close();
    }
        Orion.UseSkill('2');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('0x00004F26');
                    Orion.GetLastGump().Close();
    Orion.Wait(500)
    }
    
                        Orion.Wait(300);

}

function TamingTo110()
{	
while(true)
{
	Orion.Cast('744');
	Orion.Wait(200);
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject('0x0000BCBB');
	if(Orion.SkillValue("Animal Taming")>1100)
	{
	BotPush("Taming is 1100")
		Orion.ShutdownWindows('forced')
		}
	
	}
}