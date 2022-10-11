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

function ReadIDOCHouse() {
    ReadHouseAccessor()
    while (Orion.Connected()) {
        Orion.Wait(12000)
        ReadHouseAccessor()
    }
}

function ReadHouseAccessor() {
    var start = Orion.Now()
    Orion.UseObject('0x40002096')
    var message = Orion.WaitJournal('There are currently', start, start + 1000, '', '0x40002096');

    if (message != null) {
        var m = message.Text().match(/\d+/g);
        var n_houses = parseInt(m[0])
        var n_idoc = parseInt(m[1])
        var n_greatly = parseInt(m[2])

        if (first) {
            first = false
        } else {
            if (houses != n_houses)
                BotPush("Houses: " + n_houses - houses + "\n " + "result:" + n_houses + " exist\n " + n_idoc + " idocs\n " + n_greatly + " greatly", true, true)
            if (n_greatly > greatly)
            {
           		 var newDate = new Date();
				newDate.setDate(newDate.getDate()+41);
                BotPush("New Greatly: \n Falling expected: " + newDate, true, true)
                }
            if (n_idoc > idoc)
            {           		 
                var newDate = new Date();
				newDate.setDate(newDate.getDate()+1);
                BotPush("IDOC New \n Falling expected: " + newDate, true, true)
                }
            if (n_idoc < idoc && n_houses < houses)
                BotPush("IDOC fallen", true, true)
            if (n_idoc < idoc && houses == n_houses)
                BotPush("IDOC changed status", true, true)

        }
        houses = n_houses
        greatly = n_greatly
        idoc = n_idoc
    }

}

function AddHoursToNow(numOfHours) {
  var dateCopy = new Date();

  dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);

  return dateCopy.toISOString().replace('T', ' ').replace('Z', ' ');
}

function ScanForEventStart() {
    while (Orion.Connected()) {
	    var message = Orion.WaitJournal("The Lich King", Orion.Now()-500, Orion.Now() + 1000, 'system');
	
	    if (message != null) {
				if(Orion.Contains(message.Text(),'invaded'))
				{
					BotPush('```json\n"'+AddHoursToNow(1)+':"\n Lich Spawn Invading\n```', true, true)
					Orion.Wait(1000 * 60)
				}
				if(Orion.Contains(message.Text(),'prepared'))
				{
					BotPush('```diff\n-'+AddHoursToNow(1)+':\n Lich Spawn Defeated\n```', true, true)
					Orion.Wait(1000 * 60 * 58)
					BotPush('```json\n"'+AddHoursToNow(1)+':"\nLich King Spawns in 2 minutes\n```', true, true)
				}
	    }
    }
}