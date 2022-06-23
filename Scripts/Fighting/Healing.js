function BandageSelf() {
    while (!Player.Dead()) {
        Orion.Wait(300);
        if (!Orion.BuffExists('healing skill') && (Player.Hits() < (Player.MaxHits() - 10) || Player.Poisoned())) {

            Orion.BandageSelf();
            Orion.Wait(100);
        }
        ShowTimerSelf();

        while (Orion.BuffExists('healing skill')) {
            Orion.Wait(100);
        }
    }
}

function HealingSelfAndFriendLoop() {
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');

    while (Player.IsHuman()) {
        Orion.Wait(200);
        if (target != null) {
            if (target != null && (target.Poisoned() || target.Hits() < (target.MaxHits()))
                && !Orion.BuffExists('healing skill') && target.Distance() <= 2
                && ((Player.Hits() / Player.MaxHits()) > (target.Hits() / target.MaxHits()))) {
                Orion.BandageTarget('myTarget');
                Orion.AddDisplayTimer('bandageFriend',
                    Orion.BuffTimeRemaining('healing skill'),
                    'Top', 'Circle', 'HealOther', 0, 0,
                    'any', -1, '0x0000FFFE');
                Orion.DisplayTimerSetIcon('bandageFriend', 'Top', '0x0E21');
                Orion.Wait(500);
            }
            if (!Orion.BuffExists('healing skill') && (Player.Poisoned() || Player.Hits() < Player.MaxHits()) && (Player.Hits() / Player.MaxHits() < target.Hits() / target.MaxHits() || target.Distance() >= 2)) {
                Orion.AddDisplayTimer('bandageSelf',
                    Orion.BuffTimeRemaining('healing skill'),
                    'Top', 'Circle', 'HealSelf', 0, 0,
                    'any', -1, '0x00FF00FE'); Orion.BandageSelf();
                Orion.DisplayTimerSetIcon('bandageSelf', 'Center', '0x0E21');

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
                Orion.DisplayTimerSetIcon('bandageSelf', 'Top', '0x0E21');


                while (Orion.BuffExists('healing skill')) {
                    Orion.Wait(100);
                }
            }
        }
    }
}

function ShowTimerSelf() {
    Orion.AddDisplayTimer('bandageSelf',
        Orion.BuffTimeRemaining('healing skill'),
        'AboveChar', 'Circle|Bar', 'HealSelf', -50, 0,
        '0xFFFF00FE', -1, '0xFFFF00FE');
    Orion.DisplayTimerSetIcon('bandageSelf', 'Top', '0x0E21', '00FFFF');
}
function ShowTimerOther() {
    Orion.AddDisplayTimer('bandageSelf',
        Orion.BuffTimeRemaining('healing skill'),
        'AboveChar', 'Circle|Bar', 'HealSelf', -50, 0,
        '0x00FF00FE', -1, '0x00FF00FE');
    Orion.DisplayTimerSetIcon('bandageSelf', 'Top', '0x0E21', '00FFFF');
}

function MageryHealing() {
    var selected;
    var selecting = true;
    var patients = [];
    var gorTime = Orion.Now() - 60000;
    while (selecting) {
        selected = SelectTarget();
        if (selected == null) {
            selecting = false
        }
        else if (selected.Mobile()) {
            patients.push(selected)
        }

    }

    patients.forEach(function (patient) {
        Orion.Print("Selected:" + patient.Name())
    })

    while (true) {
        Orion.Wait(200)
        patients.filter(function (patient) {
            return patient.Distance() <= 10
        })
            .sort(function (patientA, patientB) {
                return (patientA.Hits() / patientA.MaxHits()) - (patientB.Hits() / patientB.MaxHits())
            })
            .forEach(function (patient) {

                if (patient != null && !Player.Paralyzed() && patient.Hits() < (patient.MaxHits() - 5)) {
                    if (!Player.Frozen()) {
                        if (Orion.SkillValue('Magery') > 500 && patient != null && patient.Poisoned()) {
                            Orion.CastTarget('Arch Cure', patient.Serial())
                        }
                        else if (Orion.SkillValue('Spellweaving') > 300 && patient != null && !patient.Dead() && patient.Hits() < (patient.MaxHits() - 10) && gorTime < (Orion.Now() - 60000)) {
                            Orion.CastTarget('Gift of renewal', patient.Serial())
                            gorTime = Orion.Now()
                        }
                        else if (Orion.SkillValue('Magery') > 300 && patient != null && !patient.Poisoned() && !patient.Dead() && patient.Hits() < (patient.MaxHits() - 5)) {
                            Orion.CastTarget('Greater Heal', patient.Serial())
                        }
                        else if (Orion.SkillValue('Magery') > 90 && patient.Dead() && patient.Distance() <= 1) {
                            Orion.CastTarget('Resurrection', patient.Serial())
                        }
                    }
                    Orion.Wait(300);
                }
            })
    }
}

function MageryHealingNoCure() {
    var selected;
    var selecting = true;
    var patients = [];
    var gorTime = Orion.Now() - 60000;
    while (selecting) {
        selected = SelectTarget();
        if (selected == null) {
            selecting = false
        }
        else if (selected.Mobile()) {
            patients.push(selected)
        }

    }

    patients.forEach(function (patient) {
        Orion.Print("Selected:" + patient.Name())
    })

    while (true) {
        Orion.Wait(200)
        patients.filter(function (patient) {
            return patient.Distance() <= 10
        })
            .sort(function (patientA, patientB) {
                return patientA.Hits() - patientB.Hits()
            })
            .forEach(function (patient) {

                if (patient != null && !Player.Paralyzed() && patient.Hits() < (patient.MaxHits() - 5)) {
                    if (!Player.Frozen()) {
                        if (Orion.SkillValue('Magery') > 30 && patient != null && !patient.Poisoned() && !patient.Dead() && patient.Hits() < (patient.MaxHits() - 5)) {
                            Orion.CastTarget('Greater Heal', patient.Serial())
                        }
                    }
                    Orion.Wait(300);
                }
            })
    }
}
//#include helpers/Target.js