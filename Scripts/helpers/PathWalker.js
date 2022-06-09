function CreatePath(pathName) {
    Orion.ClearFakeMapObjects();
    var pathLocation = Player
    if (pathLocation != null) {
      var newFile = Orion.NewFile();
      newFile.Open(pathName + '.json');
    }
    while (pathLocation != null) {
      pathLocation = SelectCoordinate();
      if (pathLocation != null) {
        Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', pathLocation.X(), pathLocation.Y(), pathLocation.Z());
        TextWindow.Print(JSON.stringify(pathLocation));
        newFile.WriteLine(JSON.stringify(pathLocation));
      }
    }
    newFile.Close();
  }
  
  function ReadPath(pathName) {
    var locations = []
    var file = Orion.NewFile();
  
    file.Open(pathName + '.json');
    if (file != null) {
      var i = 0;
      var location = '1'
      while (location != null && location) {
        TextWindow.Print(i++)
        location = file.ReadLine();
        if (location != null && location) {
          TextWindow.Print(location)
          var coord = JSON.parse(location);
          var loc = {
            x: coord.x,
            y: coord.y,
            z: Player.Z(),
            X: function () {
              return this.x;
            },
            Y: function () {
              return this.y;
            },
            Z: function () {
              return this.z;
            },
            Name: function () {
              return "coordinate";
            }
          }
          locations.push(loc);
        }
      }
    }
    file.Close();
    return locations;
  }

  //#include helpers/Target.js