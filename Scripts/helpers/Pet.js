function PetGuard() {
    var mount = Orion.FindObject('mount')
    if (mount != null) {
        while (!Orion.Contains(mount.Properties(), "Guarding")) {
            Orion.Say('All guard')
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
    PetGuard()

    if (mount != null) {
        while (Orion.Contains(mount.Properties(), "Guarding")) {
            Orion.Say('All Come')
            Orion.Wait(300)
        }
    }
}

function MountPet(getOn) {
    if (getOn == null) {
        if (Orion.ObjAtLayer('mount') == null) {
            var mount = Orion.FindObject('mount')
            while (Orion.ObjAtLayer('mount') == null && mount != null) {
                WalkTo(mount)
                Orion.UseObject(mount.Serial());
                Orion.Wait(800);
            }
        }
        else {
            while (Orion.ObjAtLayer('mount') != null) {
                Orion.UseObject(Player.Serial());
                Orion.Wait(800);
            }
        }
    }
    else {
        if (Orion.ObjAtLayer('mount') == null && getOn) {
            var mount = Orion.FindObject('mount')
            while (Orion.ObjAtLayer('mount') == null && mount != null) {
                WalkTo(mount)
                Orion.UseObject(mount.Serial());
                Orion.Wait(800);
            }
        }
        else {
            while (Orion.ObjAtLayer('mount') != null && !getOn) {
                Orion.UseObject(Player.Serial());
                Orion.Wait(800);
            }
        }
    }
}