function PetGuard() {
    var mount = Orion.FindObject('mount')
    //Orion.Say('All guard me')
    if (mount != null) {
        while (!Orion.Contains(Player.Properties(), "Guarded")) {
            Orion.Say('All guard me')
            Orion.Wait(300)
        }
    }
    else{
        Orion.Say('All Guard me')
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
    else{
        Orion.Say('All Kill')
    }
}

function PetCome() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
        Orion.Say('All Come')
    }
    else{
        Orion.Say('All Come')
    }
}

function PetFollow() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
        Orion.Say('All Follow me')
    }
    else{
        Orion.Say('All Follow me')
    }
}

function PetStay() {
    var mount = Orion.FindObject('mount')

    if (mount != null) {
        Orion.Say('All Stay')
        Orion.Wait(300)
    }
    else{
        Orion.Say('All Stay')
    }
}

function PetStop() {
    var mount = Orion.FindObject('mount')
    
    if (mount == null) {
        Orion.Say('All Stop')
    }
    else{
        PetGuard()
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
    Orion.Print('Calling pet ' + pet.Name())
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
        if (pet != null && pet.Distance() > 10) {
            PetFollow()
            Orion.Wait(1500)
            while ((pet.Distance() > 7||!pet.InLOS()) && !Orion.Contains(pet.Properties(), "Guarding")) {
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

function StayInLineOfSightOfPet() {
    var maxDistance = 6
    Orion.Print('Running StayInLineOfSightOfPet')

    if (Orion.ScriptRunning('StayInLineOfSightOfPet') > 1) {
        Orion.Print('Stop StayInLineOfSightOfPet')
        Orion.Terminate('StayInLineOfSightOfPet');
    }
    var pet = Orion.FindObject('mount')
    Orion.Print('Stay near pet ' + pet.Name() + ' maxDistance:' + maxDistance)

    while (pet != null) {
        if (pet != null && pet.Distance() > maxDistance) {
            var distance = pet.Distance()
            Orion.Print('Pet is too far distance:' + distance)
            while(!Orion.BuffExists('0x9BD2') && (pet.Distance()>4 || (!pet.InLOS() && pet.Distance()>maxDistance))){
                distance--
                Orion.Print('Walking to pet distance:' + distance)
                WalkTo(pet.Serial(), distance)
                Orion.Wait(100)
            }
        }
        Orion.Wait(1000)
    }

}