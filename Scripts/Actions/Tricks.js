//#include Scripts/helpers/Target.js

function SurroundInTables() {
    var target = SelectTarget()
    var tables = Orion.FindTypeEx('0x0B35');
    Orion.WalkTo(target.X(), target.Y(), target.Z(), 0)
    Orion.WalkTo(target.X(), target.Y(), target.Z(), 0)
    Orion.Wait(750)
    Orion.Drop(tables[0].Serial(), 1, target.X() + 1, target.Y(), target.Z());
    Orion.Wait(750)
    Orion.Drop(tables[1].Serial(), 1, target.X() - 1, target.Y(), target.Z());
    Orion.Wait(750)
    Orion.Drop(tables[2].Serial(), 1, target.X(), target.Y() + 1, target.Z());
    Orion.Wait(750)
    Orion.WalkTo(target.X() - 1, target.Y() - 1, target.Z(), 0)
    Orion.Drop(tables[3].Serial(), 1, target.X(), target.Y() - 1, target.Z());
}
