function BandageSelf() {
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

function BandageSelfAndFriendLoop() {
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');


    while (Player.IsHuman) {
        Orion.Wait(200);
        var target = Orion.FindFriend(any, 2);
        Orion.Print("Targetted:" + target.Properties());
        if (target != null) {

            if (target != null && target.Hits() < target.MaxHits()
                && !Orion.BuffExists('healing skill') && target.Distance() <= 2
                && (Player.Hits() / Player.MaxHits() > target.Hits() / target.MaxHits())) {
                Orion.BandageTarget('myTarget');
                Orion.AddDisplayTimer('bandageSelf', Orion.BuffTimeRemaining('healing skill'));
                Orion.Wait(500);
            }
            if (Player.Hits() < Player.MaxHits() && (Player.Hits() / Player.MaxHits() < target.Hits() / target.MaxHits())) {
                Orion.BandageSelf();
                Orion.Wait(500);
            }
        }
        else {
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
