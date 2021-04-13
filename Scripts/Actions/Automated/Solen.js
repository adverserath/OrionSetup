//#include Scripts/helpers/Target.js

function WalkToQueen1() {
    WalkTo(coordinate(5879, 1890, 0))
    WalkTo(coordinate(5703, 1928, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5774, 1867, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5859, 1798, 0))
}

function WalkToQueen2() {
    WalkTo(coordinate(5879, 1890, 0))
    WalkTo(coordinate(5853, 1851, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5787, 1929, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5748, 1946, 0))
}

function WalkToQueenQuest() {
    WalkTo(coordinate(5853, 1851, 0))
    Orion.Wait(100)
    WalkTo(coordinate(5703, 1928, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5808, 1908, 0))
    Orion.UseType('0x0495', '0xFFFF', 'ground');
    Orion.Wait(500)
    WalkTo(coordinate(5790, 1986, 0))
}
