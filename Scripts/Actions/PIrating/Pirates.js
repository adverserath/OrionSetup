function ReadPirateLocations()
{
    while(true)
    {
        
        var startTime = Orion.Now()
        Orion.Wait(2000)
        var message = Orion.InJournal('°', '', '0x00007609',any, startTime,Orion.Now());
        if(message!=null)
        {
        var msg = message.Text().replace(/\°/g, 'o ').replace(/\,/g, ' ')
var loc = Orion.SextantToXY(msg)
            Orion.Print(loc.X() + '  '+ loc.Y())
             Orion.SayParty('last location:'+loc.X() + '  '+ loc.Y())

        }
    }
}

function testPiarate()
{

//text - string, text to parse. For example "79o 0'S 35o 5'E" or "danger of collapsing near 79o 0'S, 35o 5'E at a location in the wilderness!"

var str = "Yar, me aunt's cousin's husband told me Jimmy was spotted at 154°20'N,48°9'E.".replace(/\°/g, 'o ').replace(/\,/g, ' ')
Orion.Print(str)
var loc = Orion.SextantToXY(str)
            Orion.Print(loc.X() + '  '+ loc.Y())
Orion.SextantToXY('text');
}