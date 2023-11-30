var gump
var row2 = 135;
var i = 0
var targets = []

var GumpButtonType = function GumpButtonType() {
    return {
        Reply: i++
    }
}

var gumpSpells = [
    GumpSpell('0x2084', 5, 'Magic arrow'),
    GumpSpell('0x2091', 18, 'Fireball'),
    GumpSpell('0x2093', 20, 'Poison'),
    GumpSpell('0x209D', 30, 'Lightning'),
    GumpSpell('0x20A4', 37, 'Mindblast'),
    GumpSpell('0x20A5', 38, 'Paralyse'),
    GumpSpell('0x20A9', 42, 'Energy bolt'),
    GumpSpell('0x20AA', 43, 'Explosion'),
    GumpSpell('0x20B0', 49, 'Chain lightning'),
    GumpSpell('0x20B2', 51, 'Flamestrike'),
    GumpSpell('0x20B6', 55, 'Meteor'),
    GumpSpell('0x20B8', 57, 'Earthquake'),
    GumpSpell('0x9B8B', 707, 'DeathRay')
]
//gump.AddTilePic(nextSpellX(), 0, '0x2091', 0, 18, 58);//flame
function GumpSpell(_image, _spellID, _name) {
    return {
        Image: _image,
        SpellID: _spellID,
        HoverColor: _spellID,
        Name: _name,
        Color: function () { return ColorCheck(this.SpellID) }
    }
}
function ColorCheck(spell) {
    if (Orion.RegRead('activeSpell') == spell) {
        return 38
    }
    else
        return 0
}
function GumpCallBack(unused) {
    Orion.SetGlobal('updateGump', '1');
    var code = CustomGumpResponse.ReturnCode();
    if (code > 1 && code < 60 || code == 707) {
        Orion.RegWrite('activeSpell', code);
        Orion.Print('Spell is ' + code)

        return
    }
    if (code == 50002 || code == 0) {
        return
    }
    Orion.Print('callback ' + code)

    var gump = Orion.CreateCustomGump(50001);
    gump.SetPage(0);
    gump.Select('text')
    if (Orion.RegRead('activeSpell') == 707) {
        Orion.Cast(Orion.RegRead('activeSpell'))
        Orion.WaitForTarget(5000)
        Orion.TargetObject(code);
    }
    else {
        Orion.CastTarget(Orion.RegRead('activeSpell'), code)
    }
}
var spellX = -43
function nextSpellX() {
    spellX += 43
    return spellX
}
function CasterGump() {
    var width = 43 * 13
    var height = 300
    var columns = 4
    var tileWidth = width / columns
    var rows = 8
    var tileHeight = height / rows

    if (gump == null) {
        gump = Orion.CreateCustomGump(50001);
        gump.SetCallback('GumpCallBack');

        gump.SetNoClose(false);
        gump.AddPage(0);
    }
    gump.Update();

    while (true) {
        var mobNumber = 0
        gump.Select(50002);
        gump.Clear();
        // if (!Orion.BuffExists('0x9BD2')) {
        gump.AddColoredPolygone(0, 0, width, height, '#FF222222', 0, 10, 0, 50002);

        var spellText =gumpSpells.filter(function (spell) {
            return spell.SpellID == Orion.RegRead('activeSpell')
        }).shift()//.Name()
        var text =  'Active Spell : ' + spellText.Name

        gump.AddText(10, -10, 0, text, 10, textSerial++);

        //Create Spell Buttons
        gumpSpells.forEach(function (spell) {
            gump.AddTilePic(nextSpellX(), 20, spell.Image, spell.Color(), spell.SpellID, spell.HoverColor);//Magic arrow
        })

        spellX = -43

        var spellBarYOffset = 65

        targets = GetAllTarget(12)

        targets.forEach(function (mob) {
            var column = mobNumber % columns//(columns - ((mobNumber + 1) % columns))-1
            var row = parseInt(mobNumber / (width / tileWidth))
            var m_X = tileWidth * column
            var m_Y = tileHeight * row + spellBarYOffset
            var percents = CalculatePercents(mob.Hits(), mob.MaxHits());
            var notorietyColor;
            TextWindow.Print('column:' + column + '\nrow:' + row + '\nx:' + m_X + '\ny:' + m_Y + '\nwidth:' + width + '\nheight:' + height + '\ntileWidth:' + tileWidth + '\nmobNumber:' + mobNumber)
            switch (mob.Notoriety()) {
                case 1:
                    notorietyColor = '#CC0000FF'
                    break;
                case 2:
                    notorietyColor = '#FF00CC54'
                    break;
                case 3:
                    notorietyColor = '#CC444444'
                    break;
                case 4:
                    notorietyColor = '#CCAAAAAA'
                    break;
                case 5:
                    notorietyColor = '#CCFFEEEE'
                    break;
                case 6:
                    notorietyColor = '#CCFF0000'
                    break;
                case 7:
                    notorietyColor = '#CC00EEEE'
                    break;
                default:
                    notorietyColor = '#CC111111'
            }

            TextWindow.Print(notorietyColor)
            var hitColor = '#FF00BBFF'
            if (mob.Poisoned())
                hitColor = '#16F243'; //Character status line (green)
            else if (mob.YellowHits())
                hitColor = '#FFF60A'; //Character status line (yellow)
            //if deathray = '#FF00FA'

            gump.AddColoredPolygone(m_X, m_Y, tileWidth - 10, tileHeight - 2, 'FF000000', 1);//outerframe
            gump.AddColoredPolygone(m_X, m_Y, tileWidth - 10, tileHeight - 2, notorietyColor, 0);//Notoriety color
            gump.AddColoredPolygone(m_X + 3, m_Y + 22, ((tileWidth - 10)) - 6, tileHeight - 2 - 24, '#FFFF0000', 0);//red health
            gump.AddColoredPolygone(m_X + 3, m_Y + 22, ((tileWidth - 10)) - 6, tileHeight - 2 - 24, '#FF000000', 1);//black healthborder
            gump.AddColoredPolygone(m_X + 3, m_Y + 22, ((tileWidth - 10) * percents) - 6, tileHeight - 2 - 24, hitColor, 0); //blue health
            gump.AddHitBox(mob.Serial(), m_X, m_Y, tileWidth - 10, tileHeight - 2, 0, 1);

            gump.AddText(m_X + tileWidth / 3, m_Y, 0, mob.Name(), notorietyColor, textSerial++);
            mobNumber++;
        })

        gump.Update();
        var wait = Orion.Now() + 5000
        Orion.Print('out' + Orion.GetGlobal('updateGump'))

        while (Orion.GetGlobal('updateGump') != 1 && wait > Orion.Now() && targets.length == GetAllTarget(12).length) {
            Orion.Wait(50)
        }
        Orion.SetGlobal('updateGump', '0')
        Orion.Wait(100)
    }
}
var textSerial = 500
function GetAllTarget(range) {
    return Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends|inlos', range, 'gray|criminal|red|enemy').sort(function (a, b) { return parseInt(a.Serial()) - parseInt(b.Serial()) })
}

function CalculatePercents(current, maxValue) {
    return parseFloat(parseFloat(current) / parseFloat(maxValue))
}