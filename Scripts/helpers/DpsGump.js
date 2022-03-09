function ShowDPS() {
    var dps = 0
    var highestdps = 0
    var lastMessage = Orion.LastJournalMessage();
    while (true) {
        Orion.Wait(200)
        lastMessage = Orion.LastJournalMessage();
        var pastMessage = lastMessage
        dps = 0
        while (pastMessage != null && pastMessage.Timer() > Orion.Now() - 1000) {
            if (pastMessage.Serial() == '0xFFFFFFFF' &&
                Orion.Contains(pastMessage.Text(), 'damageecho') &&
                !Orion.Contains(pastMessage.Text(), Player.Serial())) {
                var outcome = pastMessage.Text().match(/^damageecho:\s\w*=\w*\s\w*=(\d*)/i)
                dps += parseInt(outcome[1])
            }
            if (dps > highestdps) {
                highestdps = dps
            }
            pastMessage = pastMessage.PrevMessage()
        }

        DPSGump(dps, highestdps)
    }
}
var gump = null
function DPSGump(dps, highestdps) {
    var gumpId = 61
    gump = Orion.CreateCustomGump(gumpId);
    gump.SetNoClose(true);
    gump.Clear();
    gump.AddHtmlGump(1, 0, 0, 160, 60, '0x1400', 1, 0);
    gump.Select('htmlgump', 1);
    gump.AddText(10, 10, '0x0035', 'Current DPS -- ' + dps);
    gump.AddText(10, 30, '0x0035', 'Highest DPS -- ' + highestdps);
    gump.Select('gump');
    gump.Update();

}