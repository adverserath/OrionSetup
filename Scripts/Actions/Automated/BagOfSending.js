
function BagOfSendingGold() {
    var goldLimit = 1000;
    while (true) {
        while (!Player.Dead()) {
            Orion.Wait(2000)
            if (Player.Weight() >= (Player.MaxWeight() - 10) && Player.Gold() > goldLimit) {
                Orion.Print('sending gold')
                var bags = Orion.FindTypeEx(0x0E76, any, backpack).filter(function (bag) {

                    return (Orion.Contains(bag.Name(), "Sending") && (((bag.Properties().match(/Charges:\s(\d)/i) || [])[1] || 0) > 0))
                })
                if (bags.length > 0) {
                    Orion.Print('bag')
                    Orion.UseObject(bags.shift().Serial())
                    Orion.WaitForTarget(10000)
                    Orion.TargetType('0x0EED', any, '0x40123212');
                }
                else {
                    Orion.Print('no bos')
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
