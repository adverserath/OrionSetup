//#include helpers/Target.js
//#include helpers/Debug.js

var smallBodsLibrary = [];
var largeBodsLibrary = [];
function OpenWindow()
{
TextWindow.Open()
}
function CreateSmallBod(_name, _quality, _material, _count, _bookId) {
  Debug('CreateSmallBod')

  return {
    name: _name,
    quality: _quality,
    material: _material,
    count: _count,
    bookId: _bookId,
    found: false,
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
    Found: function () {
      return this.found;
    },
    isFound: function () {
      this.found = true;
    },
    isEqual: function (obj) {
      return this.Name() === obj.Name()
        && this.Quality() === obj.Quality()
        && this.Material() === obj.Material()
        && this.Count() === obj.Count();
    },
    toString: function () {
      return 'Name:' + this.Name() + ' Quality:' + this.Quality() + ' Material:' + this.Material() + ' Count:' + this.Count() + ' Book:' + this.bookId;
    }
  }
}

function CreateLargeBod(_bookId) {
  Debug('CreateLargeBod')
  return {
    bookId: _bookId,
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
    getId: function () {
      return 'L:' + this.smallBods[0].Quality()[0] + this.smallBods[0].Count() + this.smallBods[0].Material()[0] + this.smallBods[0].Material()[1] + this.smallBods.map(function (valMap) { return valMap.Name()[0] }).join('');
    },
    containsSmall: function (smallBodInBook) {
      var found = false;
      this.smallBods
        .forEach(function (sb) {
          TextWindow.Print(sb.toString())
          TextWindow.Print(smallBodInBook.toString())

          if (smallBodInBook.isEqual(sb)) {
            found = true
            smallBodInBook.isFound()
          }
        })
      this.smallBods = this.smallBods.filter(function (sb) { return !smallBodInBook.isEqual(sb) })
      return found
    },
    canFill: function () {

      var completable = this.smallBods.every(function (sb) {
        var found = false;
        smallBodsLibrary.forEach(function (sbl) {
          if (sbl.isEqual(sb)) {
            found = true;
            hasOne = true;
          }
        })
        return found;
      })
      if (completable) {
        TextWindow.Print(counter++ + ' Fillable Large Bod: - ' + this.bookId + ' ' + this.getId())
        this.smallBods.forEach(function (sb) {
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
      }
      return;
    },
    partFull: function () {
      var hasOne = false;
      var completable = this.smallBods.every(function (sb) {
        var found = false;
        smallBodsLibrary.forEach(function (sbl) {
          if (sbl.isEqual(sb)) {
            found = true;
            hasOne = true;
          }
        })
        return found;
      })

      if (!completable && hasOne) {
        TextWindow.Print(counter++ + ' Partial Large Bod: - ' + this.bookId + ' ' + this.getId())

        this.smallBods.forEach(function (sb) {
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
      }
      return;
    },
    canBribe: function () {
      TextWindow.Print(counter++ + ' Bribary Large Bod: - ' + this.bookId + ' ' + this.getId())
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

function ReadBookSearch(bookId, readLarge, largeBodId, shouldGetBod) {
  Debug('ReadBookSearch')
  Debug(bookId+ '  '+ readLarge+ '  '+ largeBodId + '  '+ shouldGetBod)
  Debug('largeBodsLibrary ' + largeBodsLibrary.length)

  Orion.Print('empty:'+(largeBodId===''))
  Orion.Print('empty:'+(largeBodId===''))
  Orion.Print('length ' + (largeBodsLibrary.length === 1))
  if((largeBodId==='')&& (largeBodsLibrary.length === 1))
  {
    Orion.Print('largeBodsLibrary '+largeBodsLibrary)
    largeBodId = largeBodsLibrary[0].getId()
    Debug(largeBodId)
  }

Orion.Print('id ('+largeBodId+')')
//  Orion.PauseScript()

  Orion.UseObject(bookId);
//Reset filter
  Orion.Wait(400)
  if (Orion.WaitForGump(1000)) {
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
      gump0.Select(Orion.CreateGumpHook(1));
      Orion.Wait(200);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
      gump1.Select(Orion.CreateGumpHook(3));
    }
  }
  Orion.Wait(200);

Orion.Print('Set Filter ' + largeBodId)
  if (largeBodId != null && largeBodId!=='') {
    //Large Bod filters
    Orion.Print('Setting Filter')
    var quality = largeBodId.substring(2, 3)
    Orion.Print('Finding ' + quality)
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {

      if (quality == 'n') { gump1.Select(Orion.CreateGumpHook(9)) }
      else if (quality == 'e') { gump1.Select(Orion.CreateGumpHook(13)) }
      Orion.Wait(200);

    }

    var amount = largeBodId.substring(3, 5)
    Orion.Print('Finding ' + amount)
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {

      if (amount == '10') { gump1.Select(Orion.CreateGumpHook(11)) }
      else if (amount == '15') { gump1.Select(Orion.CreateGumpHook(15)) }
      else if (amount == '20') { gump1.Select(Orion.CreateGumpHook(19)) }
    }
    Orion.Wait(200);
  }


  if (Orion.WaitForGump(1000)) {
    var gump2 = Orion.GetGump('last');
    if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB')) {
      gump2.Select(Orion.CreateGumpHook(0));
      Orion.Wait(200);
    }
  }
  var endOfBook = false;

  while (!endOfBook) {
    while (ReadPageSearch(bookId, readLarge, largeBodId, shouldGetBod)) {
      TextWindow.Print('Do it again')
    }
    endOfBook = Orion.GetGump('last').ButtonList().join().match(/button\s225/i) == null;

    //Next Page Click
    if (Orion.WaitForGump(3000)) {
      var gump1 = Orion.GetGump('last');
      if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x54F555DF')) {
        gump1.Select(Orion.CreateGumpHook(3));
        Orion.Wait(100);
      }

    }
  }
  //Undo Filter
  Orion.Wait(200);
  if (Orion.WaitForGump(1000)) {
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
      gump0.Select(Orion.CreateGumpHook(1));
      Orion.Wait(400);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
      gump1.Select(Orion.CreateGumpHook(3));
      Orion.Wait(200);
    }
  }
}

function getSum(total, num) {
  return total + num;
}

var hasDroppedOne = false;

function ReadPageSearch(bookId, readLarge, largeBodId, shouldGetBod) {
  TextWindow.Print('Read Page - ' + bookId + " " + readLarge + " " + largeBodId + " " + shouldGetBod)
  TextWindow.Print('largeBodsLibrary.length - ' + largeBodsLibrary.length)
  if (largeBodsLibrary.length > 0 && shouldGetBod) {
    var needed = largeBodsLibrary.map(function (lb) { return lb.SmallBods().length }).reduce(getSum, 0);
    Orion.Print(needed)
    if (needed == 0 && Orion.ScriptRunning('BodFinder') != 0) {
      Orion.ToggleScript('BodFinder');
    }
  }
  hasDroppedOne = false;
  Orion.Wait(80);
  var gump = Orion.GetLastGump();
  var gumpinfo = gump.CommandList();
  var line = gumpinfo.join() + ','

  var smallBods = (line.match(/button\s(?:\d*\s){7},\stext\s(?:\d*\s){4},.?\w*\s61(?:\d*\s){4}\d*1062224\s(?:\d*\s){3},.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4}){0,1},\s\w*\s\d*\s\d*\s\d*\s\d*/ig) || []);

  //Maybe
  if (!readLarge) {
    smallBods.forEach(function (bod) {
      TextWindow.Print(bod)
      if (!hasDroppedOne) {
        var matches = (bod.match(/.?\w*\s61(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
        var buttons = (bod.match(/button(?:\d*\s){7}(\d*)/i) || [])
        var buttonId = parseInt(buttons[1]) - 1
        var loc;
        if (matches[4]) {

          loc = gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
          var smallBod = CreateSmallBod(GetString(matches[2]), GetString(matches[3]), GetString(matches[4]), loc, bookId)
          if (shouldGetBod) {
            Orion.Print(hasDroppedOne)
            hasDroppedOne = SmallInLarge(smallBod, buttonId)
          }
          else
            smallBodsLibrary.push(smallBod)
        }
        else {
          loc = gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
          var smallBod = CreateSmallBod(GetString(matches[2]), GetString(matches[3]), '', loc, bookId)
          if (shouldGetBod)
            hasDroppedOne = SmallInLarge(smallBod, buttonId)
          else
            smallBodsLibrary.push(smallBod)
        }
      }
    })
  }

  if (readLarge) {

    var largeBods = (line.match(/button\s(?:\d*\s){7},\stext\s(?:\d*\s){4},.?\w*\s61(?:\d*\s){4}\d*1062225\s(?:\d*\s){3},(.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4})?,(?:\s\w*\s\d*\s\d*\s\d*\s\d*\s,)+)+/ig) || []);
    largeBods.forEach(function (bigBod) {
      TextWindow.Print(bigBod)
      var innerBods = (bigBod.match(/.?\w*\s103(?:\d*\s){4}(?:\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(?:\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(?:\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(?:\d*)/ig) || []);
      var largeBod = CreateLargeBod(bookId);

      var buttons = (bigBod.match(/button(?:\d*\s){7}(\d*)/i) || [])
      var buttonId = parseInt(buttons[1]) - 1

      innerBods.forEach(function (bod) {
        var matches = (bod.match(/.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
        var loc;
        if (matches[3]) {
          loc = gump.Text(matches[4]).match(/\d*\s.\s(\d*)/i)[1];
          largeBod.Add(CreateSmallBod(GetString(matches[1]), GetString(matches[2]), GetString(matches[3]), loc, bookId))
        }
        else {
          loc = gump.Text(matches[4]).match(/\d\s.\s(\d*)/i)[1];
          largeBod.Add(CreateSmallBod(GetString(matches[1]), GetString(matches[2]), '', loc, bookId))
        }
      })
      Orion.Wait(20)
      TextWindow.Print('largeBod.getId() - ' + largeBod.getId())

      if (largeBod.getId() === largeBodId) {
        Orion.GetLastGump().Select(Orion.CreateGumpHook(buttonId));
        Orion.Wait(800)
        //Orion.ToggleScript('GetLargeByID');
      }
      largeBodsLibrary.push(largeBod)
    }
    )
  }
  return hasDroppedOne;
}

function SmallInLarge(smallBod, buttonId) {
  var retVal = false;
  largeBodsLibrary.forEach(function (largeBod) {
    if (!hasDroppedOne) {
      if (largeBod.containsSmall(smallBod)) {
        hasDroppedOne = true;
        Orion.Print('DROPPING :' + smallBod.Name() + ' button ' + buttonId)
        Orion.GetLastGump().Select(Orion.CreateGumpHook(buttonId));
        Orion.Wait(800)
        retVal = true;
      }
    }
  })
  return retVal;
}

function GetString(id) {
  return Orion.GetCliLocString(id)
}

function BodFill(bod) {
  if (bod == null) {
    var bod = SelectTarget();
  }
  Orion.UseObject(bod.Serial());
  if (Orion.WaitForGump(1000)) {
    Orion.Wait(300)
    var gump0 = Orion.GetGump('last');
    gump0.Select(Orion.CreateGumpHook(4));
    Orion.Wait(100);
  }
  if (Orion.WaitForTarget(1000))
    Orion.TargetObject(backpack);
  Orion.Wait(100);
  Orion.CancelTarget();
}

function FillAllBodsFromBackpack() {

  var sBods = Orion.FindTypeEx('0x2258')
    .filter(function (bod) {
      return Orion.Contains(bod.Properties(), 'Small')// && Orion.Contains(bod.Properties(),': 0')
    })
    .forEach(function (bod) {
      BodFill(bod)
      Orion.Wait(800)
    })

  var lBods = Orion.FindTypeEx('0x2258')
    .filter(function (bod) {
      return Orion.Contains(bod.Properties(), 'Large') //&& Orion.Contains(bod.Properties(),': 0')
    })
    .forEach(function (bod) {
      BodFill(bod)
    })
}

function GetLargeByID() {
  TextWindow.Open()
  Orion.Print('Paste in the Book ID and bod ID (ie: 0x400DDD35 L:e15Irabdelt)')
  var id = Orion.InputText();
  var bookBod = id.split(' ')
  TextWindow.Print(bookBod[0])
  TextWindow.Print(bookBod[1])
  if (bookBod[0] === '*') {
    var bodBook = Orion.FindTypeEx('0x2259');
    bodBook.forEach(function (book) {
      ReadBookSearch(book.Serial(), true, bookBod[1])
    })
  }
  else {
    Orion.UseObject(bookBod[0]);
    ReadBookSearch(bookBod[0], true, bookBod[1])
  }
}

var counter = 0;
function BodFinder() {
  Debug('BodFinder')
  Orion.Print(largeBodsLibrary.length)
  Orion.ResetIgnoreList()
  var targetBook = SelectTarget('Select Target the Bulk Order BOOK with Large bod in');
  Orion.Ignore(targetBook.Serial())
  if(targetBook.Graphic()!='0x2259')
  {
    Orion.Print('Select the BOOK with the orders in')
    Orion.TerminateScript()
  }
  
  ReadBookSearch(targetBook.Serial(), true);
  Orion.Wait(300)

  var bodBook = Orion.FindTypeEx('0x2259');
  bodBook.forEach(function (book) {
    ReadBookSearch(book.Serial(), false, '', true);
  })
}

// function BodReader() {
//   var bodBook = Orion.FindTypeEx('0x2259');
//   bodBook.forEach(function (book) {
//     ReadBookSearch(book.Serial(), true, '', false);
//   })
//   counter = 0
//   largeBodsLibrary.forEach(function (lb) {
//     lb.canFill();
//   })
//   counter = 0
//   largeBodsLibrary.forEach(function (lb) {
//     lb.partFull();
//   })
//   counter = 0
//   largeBodsLibrary.forEach(function (lb) {
//     lb.canBribe();
//   })
// }