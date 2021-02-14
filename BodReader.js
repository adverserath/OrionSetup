var cliloc;

var smallBodsLibrary = [];
var largeBodsLibrary = [];

function CreateSmallBod(_name, _quality, _material, _count) {
  return {
    name: _name,
    quality: _quality,
    material: _material,
    count: _count,

    Name: function () {
      return this.name;
    },
    Quality: function () {
      return this.quality;
    },
    Material: function () {
      return this.material;
    },
    Count: function () {
      return this.count;
    },
    isEqual: function (obj) {
      return this.Name() === obj.Name()
        && this.Quality() === obj.Quality()
        && this.Material() === obj.Material()
        && this.Count() === obj.Count();
    },
    toString: function () {
      return 'Name:' + this.Name() + ' Quality:' + this.Quality() + ' Material:' + this.Material() + ' Count:' + this.Count();
    }
  }
}

function CreateLargeBod(_private) {
  return {
    smallBods: [],
    SmallBods: function () {
      return this.smallBods;
    },
    Add: function (obj) {
      this.smallBods.push(obj)
    },
    toString: function () {
      return 'LargeBod:\n\t' + this.smallBods.join('\n\t');
    },
    canFill: function () {
      TextWindow.Print('Large Bod:')
      return this.smallBods.forEach(function (sb) {
        var found = false;
        smallBodsLibrary.forEach(function (sbl) {
          if (sbl.isEqual(sb)) {
            found = true;
          }
        })
        if (found) {
          TextWindow.Print('+' + sb)
        }
        else {
          TextWindow.Print('-' + sb)

        }
      })
    },
    canBribe: function () {
      TextWindow.Print('Bribary Large Bod:')
      return this.smallBods.forEach(function (sb) {
        var found = false;
        smallBodsLibrary.forEach(function (sbl) {
          if (sbl.Name() == sb.Name()) {
            found = true;
          }
        })
        if (found) {
          TextWindow.Print('+' + sb)
        }
        else {
          TextWindow.Print('-' + sb)

        }
      })
    }

  }
}

function BodReader() {
  cliloc = ReadCliLoc();

  var bodBook = Orion.FindTypeEx('0x2259');
  bodBook.forEach(function (book) {
    ReadBook(book.Serial());
  })
  largeBodsLibrary.forEach(function (lb) {
    lb.canFill();
    lb.canBribe();
  })
}

function ReadBook(bookId) {
  TextWindow.Open()
  TextWindow.Clear()
  Orion.UseObject(bookId);
  if (Orion.WaitForGump(1000)) {
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
      gump0.Select(Orion.CreateGumpHook(1));
      Orion.Wait(100);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
      gump1.Select(Orion.CreateGumpHook(3));
      Orion.Wait(100);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump2 = Orion.GetGump('last');
    if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB')) {
      gump2.Select(Orion.CreateGumpHook(0));
      Orion.Wait(100);
    }
  }
  var endOfBook = false;
  while (!endOfBook) {
    ReadPage()
    endOfBook = Orion.GetGump('last').ButtonList().join().match(/button\s225/i) == null;

    if (Orion.WaitForGump(3000)) {
      var gump1 = Orion.GetGump('last');
      if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x54F555DF')) {
        gump1.Select(Orion.CreateGumpHook(3));
        Orion.Wait(100);
      }
    }
  }
}

function ReadPage(_private) {
  Orion.Wait(100);
  var gump = Orion.GetLastGump();
  var gumpinfo = gump.CommandList();
  var line = gumpinfo.join()

  var smallBods = (line.match(/.?\w*\s61(?:\d*\s){4}\d*1062224\s(?:\d*\s){3},.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4}){0,1},\s\w*\s\d*\s\d*\s\d*\s\d*/ig) || []);

  smallBods.forEach(function (bod) {
    var matches = (bod.match(/.?\w*\s61(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
    var loc;
    if (matches[4]) {

      loc = gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
      smallBodsLibrary.push(CreateSmallBod(GetString(matches[2]), GetString(matches[3]), GetString(matches[4]), loc))
    }
    else {
      loc = gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
      smallBodsLibrary.push(CreateSmallBod(GetString(matches[2]), GetString(matches[3]), '', loc))
    }
  })

  var largeBods = (line.match(/.?\w*\s61(?:\d*\s){4}\d*1062225\s(?:\d*\s){3},(.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4})?,(?:\s\w*\s\d*\s\d*\s\d*\s\d*\s,)+)+/ig) || []);
  largeBods.forEach(function (bigBod) {
    var innerBods = (bigBod.match(/.?\w*\s103(?:\d*\s){4}(?:\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(?:\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(?:\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(?:\d*)/ig) || []);
    var largeBod = CreateLargeBod();
    innerBods.forEach(function (bod) {
      var matches = (bod.match(/.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
      var loc;
      if (matches[3]) {
        loc = gump.Text(matches[4]).match(/\d*\s.\s(\d*)/i)[1];
        largeBod.Add(CreateSmallBod(GetString(matches[1]), GetString(matches[2]), GetString(matches[3]), loc))
      }
      else {
        loc = gump.Text(matches[4]).match(/\d\s.\s(\d*)/i)[1];
        largeBod.Add(CreateSmallBod(GetString(matches[1]), GetString(matches[2]), '', loc))
      }
    })
    largeBodsLibrary.push(largeBod)
  }
  )
}

function GetString(id) {
  var currentId = cliloc.filter(
    function (cliLocEntry) {
      return cliLocEntry.Id() === id
    })
  return (currentId.shift().Name())
}

function ReadCliLoc(_private) {
  var clilocs = []
  var file = Orion.NewFile();

  file.Open('OA/cliloc.txt');
  if (file != null) {
    var i = 0;
    var location = '1'
    while (location != null && location) {
      location = file.ReadLine();

      if (location != null && location) {
        var cliloc = location.split(';');
        var cliLine = {
          id: cliloc[0],
          name: cliloc[1],
          type: cliloc[2],
          Id: function () {
            return this.id;
          },
          Name: function () {
            return this.name;
          },
          Type: function () {
            return this.type;
          }
        }
        clilocs.push(cliLine);
      }
    }
  }
  file.Close();
  return clilocs;
}