
function TestPoly() {
  var ts

  if (Orion.Now() % 2 > 0) {
    ts = TestStructure()
  }
  else {
    ts = TestStructure2()
  }
  ts.Call()
}

function TestStructure(_) {

  Orion.Print(Object.getOwnPropertyNames(Player))
  Orion.Print(Object.keys(Player))
  return {
    Call: function () {
      Orion.Print('call 1')
    },
    Call2: function () {
      Orion.Print('call 1')
    }
  }
}

function TestStructure2(_) {
  Orion.Print('This isnt TS2')
  print('test')
  return {
    Call: function () {
      Orion.Print('call 2')
    }
  }
}
