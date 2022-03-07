
function BagOfSendingGold() {
    var goldLimit = 1000;
                    var bags = GetBOS()

    while (true) {
        while (!Player.Dead()) {
            Orion.Wait(2000)
            if (Player.Weight() >= (Player.MaxWeight() - 10) && Player.Gold() > goldLimit) {
                Orion.Print('sending gold')
                bags = GetBOS()
                if (bags.length > 0) {
                    Orion.Print(87, 'Sending Bag')
                    Orion.UseObject(bags.shift().Serial())
                    Orion.WaitForTarget(10000)
                    Orion.TargetType('0x0EED', any, '0x40123212');
                }

                Orion.Wait(1000);
            }
            else if (Player.Weight() >= Player.MaxWeight() - 10 && Player.Gold() < goldLimit) {
                {
                    Orion.Print("BAG FULL")
                }
            }
            Orion.Wait(1000);
        }
        Orion.Wait(1000);
    }
}

function GetBOS(_)
{
var bos =  Orion.FindTypeEx(0x0E76, any, backpack).filter(function (bag) {

                    return (Orion.Contains(bag.Name(), "Sending") && (((bag.Properties().match(/Charges:\s(\d)/i) || [])[1] || 0) > 0))
                })
                if(bos.length == 0)
                {
                                    Orion.Print(38, 'No Bag Of Sending')
                    Orion.PauseScript()
                }
}
