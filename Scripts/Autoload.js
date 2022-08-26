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
  Orion.Wait(3000)
  Orion.ToggleScript('Alarm')
  GetBods()
  Orion.Wait(2000)
  //EmptyUnusableSmallsOutBODBooks()
  MoveBodsToBooks()
  Orion.Print('Good Bye')
  Orion.CloseUO();
}

function Alarm() {
  while (true) {
    Orion.Wait(1000)
    var npc = Orion.FindTypeEx(any, any, ground,
      'mobile', 20, any).filter(function (mob) {
        return mob.Name() === 'Dan'
      })
    if (npc.length > 0) {
      BotPush('Detected : ' + npc.Name() + ' for ' + Player.Name())
      Orion.Wait(10000)
    }
  }
}