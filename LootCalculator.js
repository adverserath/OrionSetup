//#include Scripts/helpers/Target.js

function CheckSelectedItem()
{
CheckItem(SelectTarget());
}

function CheckItem(item)
{
if(item.Graphic()==='0x0EFA')
{
Orion.Print(MageBookRating(item));
}
if(item.Graphic()==='Bracelet/Ring/Armour')
{
Orion.Print(MageBookRating(item));
}
if(item.Graphic()==='Weapon')
{
Orion.Print(MageBookRating(item));
}
}

function MageBookRating(book) {
	var itemValue = 0;
	if (book != null && book.Properties().length > 1) {
		var itemName = book.Name();
		var itemProp = book.Properties();

		itemValue +=((itemProp.match(
		/Intelligence\sBonus\s(\d)/i
		)|| [])[1]||0)/8;
		
		itemValue +=((itemProp.match(
		/Mana\sIncrease\s(\d)/i
		)|| [])[1]||0)/8;
			
		itemValue +=((itemProp.match(
		/Faster\sCasting\s(\d)/i
		)|| [])[1]||0)/1;	

		itemValue +=((itemProp.match(
		/Faster\sCasting\sRecovery\s(\d)/i
		)|| [])[1]||0)/3;	
		
		itemValue +=((itemProp.match(
		/Spell\sDamage\sIncrease\s(\d*)/i
		)|| [])[1]||0)/12;	

		itemValue +=((itemProp.match(
		/Magery\s\+(\d*)/i
		)|| [])[1]||0)/15;	

		itemValue +=((itemProp.match(
		/Meditation\s\+(\d*)/i
		)|| [])[1]||0)/15;	

		itemValue +=((itemProp.match(
		/Evaluating\sIntelligence\s\+(\d*)/i
		)|| [])[1]||0)/15;	

		itemValue +=((itemProp.match(
		/Resisting\sSpells\s\+(\d*)/i
		)|| [])[1]||0)/15;	

		itemValue +=((itemProp.match(
		/Lower\sReagent\sCost\s(\d*)/i
		)|| [])[1]||0)/20;	

		itemValue +=((itemProp.match(
		/Lower\sMana\sCost\s(\d)/i
		)|| [])[1]||0)/8;	

		itemValue +=((itemProp.match(
		/Mana\sRegeneration\s(\d*)/i
		)|| [])[1]||0)/2;	

		itemValue +=(itemProp.match(
		/Repond\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Undead\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Elemental\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Demon\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Arachnid\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Reptile\sSlayer/i
		)|| []).length/2;	

		itemValue +=(itemProp.match(
		/Dragon\sSlayer/i
		)|| []).length/2;			

		itemValue +=(itemProp.match(
		/\w*\sSlayer/i
		)|| []).length/2;		
return itemValue/3*100;
	}
}