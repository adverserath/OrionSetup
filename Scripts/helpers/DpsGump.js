function ShowDPS() {
    var dps = 0
    var takendps = 0
    var highestdps = 0
    var damageDealt = 0
    var damageTaken = 0
    var lastCounted = Orion.LastJournalMessage().Timer()
    var mount = Orion.FindObject('mount')
    var lastMessage = Orion.LastJournalMessage();
    while (true) {
        Orion.Wait(200)
        lastMessage = Orion.LastJournalMessage();
        var pastMessage = lastMessage
        dps = 0
        takendps = 0
        while (pastMessage != null && pastMessage.Timer() > Orion.Now() - 1000) {
            if (pastMessage.Serial() == '0xFFFFFFFF' &&
                Orion.Contains(pastMessage.Text(), 'damageecho')) {
                if (!Orion.Contains(pastMessage.Text(), Player.Serial()) && (mount==null || !Orion.Contains(pastMessage.Text(), mount.Serial()))) {
                    var outcome = parseInt(pastMessage.Text().match(/^damageecho:\s\w*=\w*\s\w*=(\d*)/i)[1])
                    dps += outcome
                    if (pastMessage.Timer() > lastCounted)
                        damageDealt += outcome

                }
                if (Orion.Contains(pastMessage.Text(), Player.Serial())) {
                    var outcome = parseInt(pastMessage.Text().match(/^damageecho:\s\w*=\w*\s\w*=(\d*)/i)[1])
                    takendps += outcome
                    if (pastMessage.Timer() > lastCounted)
                        damageTaken += outcome
                }
                if (dps > highestdps) {
                    highestdps = dps
                }
            }
            pastMessage = pastMessage.PrevMessage()
        }
        lastCounted = lastMessage.Timer()

        //damageDealt += dps
      //  damageTaken += damageTaken

        DPSGump(dps, highestdps, takendps, damageDealt, damageTaken)
    }
}
var gump = null
function DPSGump(dps, highestdps, takendps, damageDealt, damageTaken) {
    var gumpId = 61
    gump = Orion.CreateCustomGump(gumpId);
    gump.SetNoClose(true);
    gump.Clear();
    gump.AddHtmlGump(1, 0, 0, 160, 120, '0x1400', 1, 0);
    gump.Select('htmlgump', 1);
    gump.AddText(10, 10, '0x0035', 'Current DPS -- ' + dps);
    gump.AddText(10, 30, '0x0035', 'Highest DPS -- ' + highestdps);
    gump.AddText(10, 50, '0x0035', 'Taken DPS -- ' + takendps);
    gump.AddText(10, 70, '0x0035', 'Damage Dealt -- ' + damageDealt);
    gump.AddText(10, 90, '0x0035', 'Damage Taken -- ' + damageTaken);

    gump.Select('gump');
    gump.Update();
}