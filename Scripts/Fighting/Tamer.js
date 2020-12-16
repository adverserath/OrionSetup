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

    while (!Player.Dead()) {
    Orion.Wait(200)
        pets.filter(function (pet){
            return pet.Distance() <= 2
        })
.sort(function (petA, petB) {
            return petA.Hits() - petB.Hits()
        })
            .forEach(function (pet) {

                if (pet != null) {
                                   Orion.Wait(100);
                    if (pet != null && (pet.Poisoned() || pet.Hits() < (pet.MaxHits()) || pet.Dead())
                        && !Orion.BuffExists('veterinary'))
              {
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

function Poison()
{
var target = SelectTarget();
while(!target.Dead())
{
Orion.Wait(1000);
if(!target.Poisoned() &&target.Hits()==target.MaxHits())
{
Orion.CastTarget('poison',target.Serial())
}
else if(!target.Poisoned() &&target.Hits()<target.MaxHits())
{
Orion.CastTarget('Heal',target.Serial())
}
}
}

function ForceLore()
{
var lastGump=Orion.GetLastGump().Serial();
if(Orion.GumpExists('generic', any, '0xD937D1DB')){
Orion.GetLastGump().Close();
}
var target  = SelectTarget();
var gumpText;
while(target.Distance()<20 && !Orion.GumpExists('generic', any, '0xD937D1DB'))
{
Orion.UseSkill('Animal Lore',target.Serial())
Orion.Wait(400);
}
}