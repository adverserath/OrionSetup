//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js
//#include Bod/Bods.js
//#include ./*.js

function Autostart() {
Orion.Wait(2000)
     GetBods()
        Orion.Wait(2000)
       // SortBods()
        Orion.Print('Good Bye')
        Orion.CloseUO();
}
