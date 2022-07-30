function PetGuard() {
    var mount = Orion.FindObject('mount')
    Orion.Say('All guard me')
    if (mount != null) {
        while (!Orion.Contains(Player.Properties(), "Guarded")) {
            Orion.Say('All guard me')
            Orion.Wait(300)
        }
    }
}

function PetAttack(targetId) {
    var mount = Orion.FindObject('mount')
    var target = Orion.FindObject(targetId)
    if (mount != null) {
        Orion.Print(targetId)

        Orion.Print('attack')
        Orion.Print(target.Exists())
        while (Orion.Contains(mount.Properties(), "Guarding") && target != null && target.Exists()) {
            Orion.Print(target.Exists())
            Orion.Say('All Kill')
            if (Orion.WaitForTarget()) {
                Orion.TargetObject(targetId)
            }
            Orion.Wait(300)
        }
        PetGuard()
    }
}

function PetCome() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
            Orion.Say('All Come')
    }
}

function PetFollow() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
            Orion.Say('All Follow me')
    }
}

function PetStay() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
            Orion.Say('All Stay')
            Orion.Wait(300)
    }
}

function PetStop() {
    var mount = Orion.FindObject('mount')
    PetGuard()

    if (mount != null) {
        while (Orion.Contains(mount.Properties(), "Guarding")) {
            Orion.Say('All Stop')
            Orion.Wait(300)
        }
    }
}

function PetCaller() {
    Orion.Print('Running PetCaller')

    if (Orion.ScriptRunning('PetCaller') > 1) {
        Orion.Print('Stop PetCaller')
        Orion.Terminate('PetCaller');
    }
    var pet = Orion.FindObject('mount')
    Orion.Print('Calling pet '+pet.Name())
    while (pet != null) {
        if (pet != null && pet.Hits() < 7 && pet.Distance() > 2) {
            PetFollow()
            Orion.Wait(1500)
            while (pet.Hits() < 22 && !Orion.Contains(pet.Properties(), "Guarding")) {
                Orion.Wait(500)
            }
            //PetFollow(lastAttacker) Wait2000
            PetGuard()
        }
        Orion.Wait(500)
    }

}

function MountPet(getOn) {
    Orion.Print('getOn:' + getOn)
    var quitTime = Orion.Now() + 3000
    if (getOn == null) {
        if (Orion.ObjAtLayer('mount') == null) {
            var mount = Orion.FindObject('mount')
            while (Orion.ObjAtLayer('mount') == null && mount != null && Orion.Now() < quitTime) {
                WalkTo(mount)
                Orion.UseObject(mount.Serial());
                Orion.Wait(800);
            }
        }
        else {
            while (Orion.ObjAtLayer('mount') != null && Orion.Now() < quitTime) {
                Orion.UseObject(Player.Serial());
                Orion.Wait(800);
            }
        }
    }
    else {
        if (Orion.ObjAtLayer('mount') == null && getOn) {
            var mount = Orion.FindObject('mount')
            while (Orion.ObjAtLayer('mount') == null && mount != null && Orion.Now() < quitTime) {
                WalkTo(mount)
                Orion.UseObject(mount.Serial());
                Orion.Wait(800);
            }
        }
        else if (getOn == false) {
            while (Orion.ObjAtLayer('mount') != null && !getOn && Orion.Now() < quitTime) {
                Orion.UseObject(Player.Serial());
                Orion.Wait(800);
            }
        }

    }
}