//#include helpers/Helper.js

function TestLumber() {
  Orion.Wait(1000);
  var n = 'There\'s not enough wood here to harvest.'.localeCompare('There\'s not enough wood here to harvest.'==0);
  var range = 20;
  //var trees = '0x0CCD|0x0CDD|0x0CD3'
  Orion.GetTilesInRect('tree', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range).
    forEach(function (treeTile) {

      //Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
      //Orion.WalkTo(treeTile.X, treeTile.Y(), treeTile.Z(), 1, 255, 1, 0);
      Orion.WalkTo(treeTile.X(), treeTile.Y(), treeTile.Z(), 1, Player.Z(), 1, 1);
      TextWindow.Print('Walking');
	Chop(treeTile.Graphic(),treeTile.X(),treeTile.Y().treeTile,Player.Z());

    });
}

function Chop(id, x, y, z) {
while('There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage().Text())!=0)
{
TextWindow.Print('There\'s not enough wood here to harvest.')

TextWindow.Print(Orion.LastJournalMessage().Text())

TextWindow.Print('There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage()))
  Orion.GetTilesInRect(
'tree', Player.X() + 1, Player.Y() + 1, Player.X() - 1, Player.Y() - 1)
    .forEach(function (tile) {
TextWindow.Print(tile.Graphic());
//CHECK IF RIGHT HAND IS EMPTY
  //N//IS AXE IN BACKPACK
    //Y//EQUIP NEW AXE
    //N//GO GET ONE THEN EQUIP
  
//CHECK WEIGHT
  //IF WEIGHT>MAX-30
      //Y//GO STORE IT
      
      //SELECT AXE
      Orion.UseObject('0x462D1383');
      Orion.Wait(300);

      if (Orion.WaitForTarget(1000)) {
        TextWindow.Print(tile.Flags());
        Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
        Orion.Wait(2000);
      }
      //IF LOGS EXIST
        //Y//CUT THEM TO BOARDS

    });
}
  //0x0CCD 3492 2718 6
}

function GetTargetAndPrint() {
  TextWindow.Print('not : ' + (3 & 15));
  var obj = SelectTarget();
  TextWindow.Open();
  //  Orion.GetProfile('myTarget',2000)
  TextWindow.Print(obj.Name());
  TextWindow.Print(obj.FullName());
  TextWindow.Print(obj.Notoriety());

  TextWindow.Print(obj.Race());
  TextWindow.Print(obj.ProfileReceived());
  TextWindow.Print(obj.Flags());
  TextWindow.Print(obj.IgnoreCharacters());
  TextWindow.Print(obj.NameColor());
  TextWindow.Print(('' + obj.Title()).substr(0, 3));
}

function getFlags() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
  TextWindow.Print(Orion.B);

}

function getTileData() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');

  var tiles = Orion.GetTiles('land', Player.X(), Player.Y(), 0, 100);
  TextWindow.Print('tile' + tiles.length);
  TextWindow.Print('tile' + tiles[0].Z());
}

function test() {

  TextWindow.Open();
  while (!Player.Dead()) {

    Orion.InfoContextMenu();


    Orion.Wait(500);
  }
}

function getPeople() {
  Orion.FindTypeEx(any, any, ground, 'human|live|ignoreself|ignorefriends', 20, 7)
    .foreach(function (mob) {
      TextWindow.Print(mob.Name());
    });
}

function sell() {
  Orion.Buy('bInscribe');
}
//    Orion.WaitForAddObject('myTarget');
//    var enemy = Orion.TargetObject('myTarget');
//var enemy = Orion.FindEnemy();
//Orion.Print(enemy);
//Orion.ShowStatusbar(Orion.FindEnemy('next'), 1000, 1000);
//Orion.FindList('listName', 'container', 'mobile', '10');
//Orion.Print(Orion.FindList('listName', 'container', 'mobile', '10'));

