function CastWOD() {
var lastUpdate = Orion.Now()

    while (true) {
        var focus = Orion.FindTypeEx('0x3155')
                .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()

        var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
        var timeleft = (focus.Properties().match(/Lifespan:\s(\d*)/i) || [])[1] || 0;
       
        if(timeleft < 1000 && (Orion.Now()-lastUpdate)>60000)
        {
        lastUpdate = Orion.Now()
            var minutes = parseInt(timeleft/60)
            Orion.Print('Gem has ' + minutes + ' minutes left')
        }
        var target = Orion.ClientLastAttack();
        var enemy = Orion.FindObject(target)

        while (enemy != null && enemy.Exists() && enemy.Distance()<10) {
  Orion.Wait(500)
            if (enemy.Hits() < (parseInt(0.05 * gemstr * 25) + 1)) {

                Orion.Cast('Word Of Death')
                if (Orion.WaitForTarget(4000)) {
                    while (enemy.Exists() && enemy.Hits() > (parseInt(0.05 * gemstr * 25))) {
                        
                        Orion.Print('waiting')
                    }
                    Orion.Print('casting')
                    Orion.TargetObject(enemy.Serial());
                    Orion.Wait(1000)
                }

            }
        }
        Orion.Wait(1000)
    }
}