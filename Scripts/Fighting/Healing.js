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
            if (target != null && target.Hits() < (target.MaxHits() - 10)
                && !Orion.BuffExists('healing skill') && target.Distance() <= 2
                && ((Player.Hits() / Player.MaxHits()) > (target.Hits() / target.MaxHits()))) {
                Orion.BandageTarget('myTarget');
                Orion.AddDisplayTimer('bandageFriend',
                    Orion.BuffTimeRemaining('healing skill'),
                    'Top', 'Circle', 'HealOther', 0, 0,
                    'any', -1, '0x0000FFFE'); Orion.Wait(500);
            }
            if (!Orion.BuffExists('healing skill') && Player.Hits() < Player.MaxHits() && (Player.Hits() / Player.MaxHits() < target.Hits() / target.MaxHits() || target.Distance() >= 2)) {
                Orion.AddDisplayTimer('bandageSelf',
                    Orion.BuffTimeRemaining('healing skill'),
                    'Top', 'Circle', 'HealSelf', 0, 0,
                    'any', -1, '0x00FF00FE'); Orion.BandageSelf();
                Orion.Wait(500);
            }
        }
        else {
            Orion.Wait(200);
            if (Player.Hits() < Player.MaxHits()) {
                Orion.BandageSelf();
                Orion.Wait(100);

                Orion.AddDisplayTimer('bandageSelf',
                    Orion.BuffTimeRemaining('healing skill'),
                    'Top', 'Circle', 'HealSelf', 0, 0,
                    'any', -1, '0x00FF00FE');
                while (Orion.BuffExists('healing skill')) {
                    Orion.Wait(100);
                }
            }
        }
    }

}
