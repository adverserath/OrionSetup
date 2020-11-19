function Bandage() {
    while (!Player.Dead()) {
        Orion.Wait(200);
        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(100);
            Orion.AddDisplayTimer('bandageSelf', Orion.BuffTimeRemaining('healing skill'));
            while (Orion.BuffExists('healing skill')) {
                Orion.Wait(100);
            }

        }
    }
}

function HealingSelfAndFriendLoop() {
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');

    while (Player.IsHuman) {
        Orion.Wait(200);
        if (target != null) {
            if (target != null && target.Hits() < target.MaxHits()
                && !Orion.BuffExists('healing skill') && target.Distance() <= 2
                && (Player.Hits() / Player.MaxHits() > target.Hits() / target.MaxHits())) {
                Orion.BandageTarget('myTarget');
                Orion.AddDisplayTimer('bandageSelf', Orion.BuffTimeRemaining('healing skill'));
                Orion.Wait(500);
            }
            if (Player.Hits() < Player.MaxHits() && (Player.Hits() / Player.MaxHits() < target.Hits() / target.MaxHits() || target.Distance() >= 2)) {
                Orion.BandageSelf();
                Orion.Wait(500);
            }
        }
        else{
        Orion.Wait(200);
        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(100);
            Orion.AddDisplayTimer('bandageSelf', Orion.BuffTimeRemaining('healing skill'));
            while (Orion.BuffExists('healing skill')) {
                Orion.Wait(100);
            }
        }
        }
    }
   
}
