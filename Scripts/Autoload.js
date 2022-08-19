//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js
//#include Bod/Bods.js
//#include ./*.js
//#include Bod/BodData.js
//#include Bod/BodCleaner.js

function Autostart() {
Orion.Wait(30000)
     //GetBods()
     BotPush(Player.Name() + ' '+ Orion.FindTypeEx('0x2259').length)
     Orion.Wait(2000)
     //EmptyUnusableSmallsOutBODBooks()
       // SortBods()
        Orion.Print('Good Bye')
        Orion.CloseUO();
}

