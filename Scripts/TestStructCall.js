function GeneratedScript_123207()
{
		var gump1 = Orion.GetGump(any,0x8EF8CA0B);
		if ((gump1 !== null))
		{
			gump1.Select(Orion.CreateGumpHook(101));
		}
		var gump0 = Orion.GetGump(any,0x676CCAA8);
		if ((gump0 !== null))
		{
			gump0.Select(Orion.CreateGumpHook(1));
		}
	


	
}

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
