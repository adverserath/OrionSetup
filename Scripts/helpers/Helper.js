function GetTargetAndPrint()
{
 TextWindow.Print('not : ' + (3&15));
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var obj = Orion.FindObject('myTarget');
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
        TextWindow.Print((''+obj.Title()).substr(0,3) );
}


function getFlags() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
 TextWindow.Print(Orion.B);

}

function getTileData() {
  var tiles = Orion.GetTiles('land', Player.X(), Player.Y(), 0, 100);
  Orion.Print('tile' + tiles.length);
  Orion.Print('tile' + tiles[0].Z());
}

function test(){

TextWindow.Open();
while(!Player.Dead())
{
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
TextWindow.Print(target.Name());

Orion.Wait(500);
}
}

function getPeople()
{
Orion.FindTypeEx(any, any, ground, 'human|live|ignoreself|ignorefriends', 20, 7)
.foreach(function (mob){
TextWindow.Print(mob.Name());
});
}

function sell()
{
Orion.Buy('bInscribe');
}
//    Orion.WaitForAddObject('myTarget');
//    var enemy = Orion.TargetObject('myTarget');
//var enemy = Orion.FindEnemy();
//Orion.Print(enemy);
//Orion.ShowStatusbar(Orion.FindEnemy('next'), 1000, 1000);
//Orion.FindList('listName', 'container', 'mobile', '10');
//Orion.Print(Orion.FindList('listName', 'container', 'mobile', '10'));

