//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js
//#include Bod/Bods.js
//#include ./*.js

function test() {
        Orion.Print('Going Home')
        Orion.Wait(2000)
        Orion.Print('Walk In')
        Orion.WalkTo(Player.X() + 3, Player.Y() - 3, Player.Z(), 2, 255, 1, 1);
        Orion.Print('Move Stuff to Book')
        MoveItemsFromPlayer(Orion.FindTypeEx('0x2259')[0], '0x2258')
        Orion.Print('Good Bye')
        Orion.CloseUO();
}
function Autostart() {
     GetBods()
        Orion.Wait(2000)
       // SortBods()
        Orion.Print('Good Bye')
        Orion.CloseUO();
}
