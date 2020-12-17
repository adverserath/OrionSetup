//#include Scripts/helpers/Target.js
var referenceID = [null, 1049578, null, null, 1028335, 3000113, 3000112, 1070793, null, 1061646, 1061647, 1061648, 1061649, 1061650, null, null, null, null, null, 1076750, 1044103, 1044087, 1044086, 1044061, 1002082, 1002122, 1044074, 1002088, 1002118, 1044085, 1044076, 1044106, 1044109, 1002140, 1044115, 1044110, 1044114, 1044075, 1044112, 1044113, 1044111]
var tameColumns = ["name", "hits", "stamina", "mana", "str", "dex", "int", "bard", "filler", "resistPhys", "resistFire", "resistCold", "resistPoison", "resistEnergy", "damagePhys", "damageFire", "damageCold", "damagePoison", "damageEnergy", "BaseDamage", "Wrestling", "Tactics", "Resist", "Anatomy", "Healing", "Poison", "DetectHidden", "Hiding", "Parry", "Magery", "EvalInt", "Meditation", "Necro", "SpiritSpeak", "Mysticism", "Focus", "SpellWeaving", "Discordance", "Bushido", "Ninjitsu", "Chivalry"]
var tamers = [["an alligator",60,25,20,100,25,20,-1,null,35,10,null,10,null,null,null,null,null,null,null,60.0,60.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a bake kitsune",350,145,425,220,145,425,-1,null,60,90,60,60,60,null,null,null,null,null,null,55.0,90.0,100.0,null,null,null,60,null,null,90.0,90.0,null,null,null,null,20,null,null,null,null,null,-1],
["a battle chicken lizard",177,124,13,177,124,13,-1,null,20,15,null,null,null,null,null,null,null,null,null,62.0,62.0,53.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a giant beetle",null,100,500,300,100,500,-1,null,40,30,30,30,30,null,null,null,null,null,null,100.0,100.0,80.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a crow",null,35,10,10,35,10,-1,null,null,null,null,null,null,null,null,null,null,null,null,6.4,6.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a black bear",60,75,14,100,75,14,-1,null,25,null,15,10,null,null,null,null,null,null,null,60.0,60.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Blood Fox",200,200,210,320,200,210,-1,null,60,30,65,35,35,null,null,null,null,null,null,90.0,70.0,50.0,null,null,null,60.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a boar",null,15,5,25,15,5,-1,null,15,10,null,10,null,null,null,null,null,null,null,9.0,9.0,9.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a brown bear",60,45,47,100,45,47,-1,null,30,null,20,15,null,null,null,null,null,null,null,60.0,60.0,35.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a bull",64,75,75,111,75,75,-1,null,30,null,15,null,null,null,null,null,null,null,null,57.5,85.0,25.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a bull frog",42,25,20,70,25,20,-1,null,10,null,null,null,null,null,null,null,null,null,null,60.0,60.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["capybara",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,40.0,45.0,30.0,null,null,null,40.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a cat",null,35,5,9,35,5,-1,null,10,null,null,null,null,null,null,null,null,null,null,5.0,4.0,5.0,null,null,null,60,20.0,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a chicken",null,15,5,5,15,5,-1,null,5,null,null,null,null,null,null,null,null,null,null,5.0,5.0,4.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a chicken lizard",95,95,10,95,95,10,-1,null,20,15,null,null,null,null,null,null,null,null,null,38.2,44.9,29.6,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Clan Ribbon Plague Rat",null,51,17,59,51,17,-1,null,40,30,40,10,40,null,null,null,null,null,null,40.0,34.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Coconut Crab",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,35.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a cold drake",500,160,190,670,160,190,-1,null,65,40,90,50,50,null,null,null,null,null,null,126.0,140.0,110.0,null,null,null,50.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a coral snake",200,300,35,340,300,35,-1,null,50,20,null,100,20,null,null,null,null,null,null,105.0,98.0,105.0,null,null,110.9,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a corrosive slime",19,21,20,34,21,20,-1,null,10,null,null,20,null,null,null,null,null,null,null,26.1,26.1,18.9,0,null,49.1,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a cougar",48,85,50,80,85,50,-1,null,25,10,15,10,null,null,null,null,null,null,null,60.0,60.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a cow",null,15,5,30,15,5,-1,null,15,null,null,null,null,null,null,null,null,null,null,5.5,5.5,5.5,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Crimson Drake",258,152,140,430,152,140,-1,null,50,40,40,50,50,null,null,null,null,null,null,80.0,90.0,80.0,null,null,null,60.0,null,null,null,null,null,null,null,null,10.0,null,null,null,null,null,-1],
["a cu sidhe",1275,170,285,1225,170,285,-1,null,65,45,85,50,85,null,null,null,null,null,null,96.8,99.3,90.0,69.4,98.9,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a deathwatch beetle",145,52,40,160,52,40,-1,null,40,30,30,80,35,null,null,null,null,null,null,60.0,77.0,58.0,34.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a desert ostard",88,75,10,170,75,10,-1,null,20,15,null,null,null,null,null,null,null,null,null,44.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a dimetrosaur",5400,184,435,601,184,435,-1,null,90,70,70,75,75,null,null,null,null,null,null,125.0,120.0,140.0,80.0,null,95.0,80.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a dire wolf",72,105,60,120,105,60,-1,null,25,20,10,10,15,null,null,null,null,null,null,80.0,70.0,75.0,null,null,null,60,null,null,null,null,null,18.0,18.0,null,20,null,null,null,null,null,-1],
["a dog",22,43,37,37,43,37,-1,null,15,null,null,null,null,null,null,null,null,null,null,31.0,31.0,47.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a dragon",495,105,475,825,105,475,-1,null,65,70,40,35,45,null,null,null,null,null,null,92.5,100.0,100.0,null,null,null,60,null,null,40.0,40.0,null,null,null,null,20,null,null,null,null,null,-1],
["a dragon turtle hatchling",850,65,650,650,65,650,-1,null,85,90,55,60,75,null,null,null,null,null,null,150,120,140,null,null,null,60,null,null,140,119,null,null,null,null,20,null,null,null,null,null,-1],
["a dragon wolf",860,75,55,850,75,55,-1,null,55,40,40,50,50,null,null,null,null,null,null,105.0,110.0,140.0,70.0,null,null,60.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a drake",258,152,140,430,152,140,-1,null,50,60,50,30,40,null,null,null,null,null,null,80.0,90.0,80.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a dread spider",132,145,310,220,145,310,-1,null,50,30,30,100,30,null,null,null,null,null,null,75.0,70.0,60.0,null,null,80.0,60.0,null,null,80.0,80.0,null,20.0,20.0,null,20,null,null,null,null,null,-1],
["a dread warhorse",650,125,160,555,125,160,-1,null,75,40,40,60,50,null,null,null,null,null,null,98.2,110.0,93.4,null,null,null,60,null,null,49.5,19.3,null,null,null,null,20,null,null,null,null,null,-1],
["an eagle",27,60,20,47,60,20,-1,null,25,15,25,10,10,null,null,null,null,null,null,30.0,37.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Eowmu",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,35.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a ferret",50,55,75,48,55,75,-1,null,50,14,40,25,25,null,null,null,null,null,null,4.0,4.0,4.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a fire beetle",null,100,500,300,100,500,-1,null,40,75,10,30,30,null,null,null,null,null,null,100.0,100.0,90.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a fire steed",240,120,300,400,120,300,-1,null,40,80,30,40,40,null,null,null,null,null,null,100.0,100.0,120.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a forest ostard",88,75,10,170,75,10,-1,null,20,null,null,null,null,null,null,null,null,null,null,44.0,44.0,32.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a frenzied ostard",110,115,10,170,115,10,-1,null,30,15,null,25,25,null,null,null,null,null,null,94.0,94.0,80.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a frost dragon",2250,125,700,1400,125,700,-1,null,92,70,95,70,75,null,null,null,null,null,null,130,135,135,null,null,null,60,null,null,130,60,50,null,null,null,20,null,null,null,null,null,-1],
["Frost Mite",1000,164,283,1017,164,283,-1,null,70,25,100,70,45,null,null,null,null,null,null,110.0,105.0,85.0,null,null,null,80.0,null,null,null,null,null,null,null,null,115.0,null,null,null,null,null,-1],
["a frost spider",60,145,60,100,145,60,-1,null,30,10,50,30,20,null,null,null,null,null,null,65.0,50.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a gallusaurus",900,168,274,511,168,274,-1,null,60,30,30,70,30,null,null,null,null,null,null,91.0,90.0,80.0,null,null,null,35.0,null,null,null,null,null,null,null,null,20,null,null,120.0,null,null,-1],
["a gaman",160,150,60,175,150,60,-1,null,70,50,50,60,50,null,null,null,null,null,null,57.5,83.0,42.5,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a giant ice worm",147,100,85,245,100,85,-1,null,35,0,90,25,20,null,null,null,null,null,null,80.0,80.0,60.0,null,null,95.0,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a giant rat",39,65,30,74,65,30,-1,null,20,10,null,35,null,null,null,null,null,null,null,44.0,44.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a giant spider",60,95,60,100,95,60,-1,null,20,null,null,35,null,null,null,null,null,null,null,65.0,50.0,40.0,null,null,80.0,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a giant toad",60,25,20,100,25,20,-1,null,25,10,null,null,10,null,null,null,null,null,null,60.0,60.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a goat",null,15,5,19,15,5,-1,null,15,null,null,null,null,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a gorilla",51,55,60,95,55,60,-1,null,25,10,15,null,null,null,null,null,null,null,null,58.0,58.0,60.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a greater dragon",2000,148,675,1425,148,675,-1,null,85,90,55,60,75,null,null,null,null,null,null,145.0,140.0,140.0,0,null,0,60,null,null,140.0,140.0,0,null,null,null,20,null,null,null,null,null,-1],
["a greater mongbat",48,80,50,80,80,50,-1,null,25,null,null,null,null,null,null,null,null,null,null,35.0,50.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a great hart",41,77,57,71,77,57,-1,null,25,null,10,null,null,null,null,null,null,null,null,47.5,47.5,44.5,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a grey wolf",48,75,55,80,75,55,-1,null,20,15,25,15,15,null,null,null,null,null,null,60.0,60.0,35.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a grizzly bear",93,105,40,155,105,40,-1,null,35,null,25,10,10,null,null,null,null,null,null,70.0,100.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a hell cat",67,150,85,100,150,85,-1,null,35,90,null,null,20,null,null,null,null,null,null,40.0,55.0,60.0,null,null,null,60,null,null,null,null,null,18.0,18.0,null,20,null,null,null,null,null,-1],
["a hell hound",300,300,180,350,300,180,-1,null,56,40,null,20,20,null,null,null,null,null,null,80,80,75,5,null,null,60,null,null,null,null,null,18,18,null,20,null,null,null,null,null,-1],
["a high plains boura",618,96,30,435,96,30,-1,null,60,40,20,40,40,null,null,null,null,null,null,115.3,105.7,70.0,105.4,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a hind",29,77,47,51,77,47,-1,null,15,null,5,null,null,null,null,null,null,null,null,26.0,19.0,15.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a hiryu",1100,270,325,1410,270,325,-1,null,70,90,25,50,50,null,null,null,null,null,null,120.0,110.0,100.0,80.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a horse",45,75,10,98,75,10,-1,null,20,null,null,null,null,null,null,null,null,null,null,44.0,44.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["hungry coconut crab",null,15,5,19,15,5,-1,null,20,null,null,null,null,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["an imp",70,80,105,115,80,105,-1,null,35,50,30,40,40,null,null,null,null,null,null,44.0,50.0,50.0,null,null,null,60,null,null,100.0,30.0,null,20,20,null,20,null,null,null,null,null,-1],
["an iron beetle",830,73,49,883,73,49,-1,null,60,30,30,40,55,null,null,null,null,null,null,110.0,100.0,130.0,85.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a jack rabbit",null,25,5,15,25,5,-1,null,5,null,null,null,null,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a ki-rin",210,105,225,325,105,225,-1,null,65,45,35,35,35,null,null,null,null,null,null,92.5,22.5,100.0,null,null,null,60,null,null,100.0,90.0,100.0,null,null,null,20,null,null,null,null,null,-1],
["Lasher",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,35.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a lava lizard",90,75,20,150,75,20,-1,null,45,45,null,35,35,null,null,null,null,null,null,80.0,80.0,70.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a leather wolf",329,125,34,125,125,34,-1,null,49,29,40,29,25,null,null,null,null,null,null,88.4,89.4,94.9,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a lesser hiryu",600,270,325,410,270,325,-1,null,70,80,15,40,40,null,null,null,null,null,null,120.0,110.0,100.0,80.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Lion",370,220,140,720,220,140,-1,null,50,45,40,40,40,null,null,null,null,null,null,110.0,110.0,null,null,null,null,80.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a llama",27,55,30,49,55,30,-1,null,20,null,null,null,null,null,null,null,null,null,null,29.0,29.0,20.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a lowland boura",553,93,25,411,93,25,-1,null,60,40,20,40,40,null,null,null,null,null,null,97.3,86.7,75.0,84.4,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a mongbat",6,38,14,10,38,14,-1,null,10,null,null,null,null,null,null,null,null,null,null,10.0,10.0,14.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a mountain goat",33,75,30,64,75,30,-1,null,20,10,20,15,15,null,null,null,null,null,null,44.0,44.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a najasaurus",854,218,40,346,218,40,-1,null,55,60,55,100,45,null,null,null,null,null,null,100.0,95.0,190.0,null,null,100.0,55.0,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a nightmare",315,105,125,525,105,125,-1,null,65,40,40,40,30,null,null,null,null,null,null,92.5,100.0,100.0,null,null,null,60,null,null,50.0,50.0,null,null,null,null,20,null,null,null,null,null,-1],
["Ossein Ram",550,100,120,400,100,120,-1,null,60,20,50,40,50,null,null,null,null,null,null,100.0,90.0,80.0,85.0,null,null,50.0,null,null,null,null,null,20.0,20.0,null,20,null,null,null,null,null,-1],
["a pack horse",80,55,10,120,55,10,-1,null,25,15,25,15,15,null,null,null,null,null,null,44.0,44.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a pack llama",null,55,30,80,55,30,-1,null,35,15,15,15,15,null,null,null,null,null,null,29.0,29.0,20.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a horse",45,75,10,98,75,10,-1,null,20,null,null,null,null,null,null,null,null,null,null,44.0,44.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a panther",51,105,50,85,105,50,-1,null,25,10,15,10,null,null,null,null,null,null,null,65.0,65.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a phoenix",383,300,700,700,300,700,-1,null,55,70,null,35,50,null,null,null,null,null,null,100.0,90.0,135.0,null,null,null,80.0,null,null,100.0,100.0,100.0,null,null,null,20,null,null,null,null,null,-1],
["a pig",null,20,5,20,20,5,-1,null,15,null,null,null,null,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Platinum Drake",258,152,140,430,152,140,-1,null,50,50,50,50,50,null,null,null,null,null,null,80.0,90.0,80.0,null,null,null,60.0,null,null,null,null,null,null,null,null,20.0,null,null,null,null,null,-1],
["a polar bear",84,105,50,140,105,50,-1,null,35,null,80,25,15,null,null,null,null,null,null,70.0,90.0,60.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a predator hellcat",131,115,100,185,115,100,-1,null,35,40,null,null,15,null,null,null,null,null,null,65.0,65.0,90.0,null,null,null,41.2,null,null,null,null,null,20.0,20.0,null,20,null,null,null,null,null,-1],
["a rabbit",6,38,14,10,38,14,-1,null,10,null,null,null,null,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a raging grizzly bear",930,1050,400,1550,1050,400,-1,null,70,null,50,20,20,null,null,null,null,null,null,88.1,110.5,54.6,0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a raptor",400,155,145,471,155,145,-1,null,50,60,50,30,40,null,null,null,null,null,null,95.1,100.0,90.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a rat",null,35,5,9,35,5,-1,null,10,null,null,10,null,null,null,null,null,null,null,4.0,4.0,4.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a reptalon",931,164,289,1025,164,289,-1,null,64,45,45,63,83,null,null,null,null,null,null,118.2,108.2,89.9,59.7,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a ridable llama",27,75,30,49,75,30,-1,null,15,10,10,10,10,null,null,null,null,null,null,29.0,29.0,20.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a ridgeback",54,75,30,100,75,30,-1,null,25,10,10,10,10,null,null,null,null,null,null,45.0,44.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a ruddy boura",509,82,20,480,82,20,-1,null,60,40,20,40,40,null,null,null,null,null,null,87.9,88.8,87.7,88.8,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a rune beetle",360,170,450,460,170,450,-1,null,65,50,50,95,60,null,null,null,null,null,null,77.5,93.0,110.0,null,null,140.0,60,null,null,110.0,125.0,null,null,null,null,20,null,null,null,null,null,-1],
["sabre-toothed tiger",423,403,469,523,403,469,-1,null,50,40,60,40,50,null,null,null,null,null,null,105.0,100.0,null,null,null,null,75.0,null,null,null,null,null,null,null,null,105.0,null,null,null,null,null,-1],
["a saurosaurus",1468,220,440,824,220,440,-1,null,85,90,55,45,55,null,null,null,null,null,null,130.0,120.0,90.0,60.0,null,null,80.0,null,null,null,null,null,null,null,null,125.0,null,null,null,null,null,-1],
["a savage ridgeback",54,75,30,100,75,30,-1,null,20,15,20,15,15,null,null,null,null,null,null,45.0,44.0,40.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a swamp dragon",180,85,100,300,85,100,-1,null,40,30,40,30,40,null,null,null,null,null,null,55.0,55.0,55.0,55.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a scorpion",63,95,30,115,95,30,-1,null,25,15,25,50,15,null,null,null,null,null,null,65.0,75.0,35.0,null,null,100.0,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a serpentine dragon",null,220,1040,140,220,1040,-1,null,40,35,35,35,35,null,null,null,null,null,null,100.0,60.0,100.0,null,null,null,100.0,null,null,120.0,110.0,100.0,null,null,null,20,null,null,null,null,null,-1],
["a sewer rat",null,25,10,9,25,10,-1,null,10,null,null,25,10,null,null,null,null,null,null,5.0,5.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a shadow wyrm",599,200,620,1030,200,620,-1,null,75,60,55,30,60,null,null,null,null,null,null,100.0,100.0,130.0,null,null,null,100.0,null,null,100.0,100.0,75.0,90.0,105.0,null,20,null,null,null,null,null,-1],
["a sheep",null,25,5,19,25,5,-1,null,10,null,null,null,null,null,null,null,null,null,null,5.0,6.0,5.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a silver steed",null,null,null,null,null,null,-1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Skeletal Cat",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,35.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a skeletal steed",50,55,60,100,55,60,-1,null,60,null,95,100,15,null,null,null,null,null,null,80.0,50.0,100.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a skittering hopper",45,115,50,65,115,50,-1,null,10,null,20,null,10,null,null,null,null,null,null,60.0,70.0,45.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a skree",300,124,260,330,124,260,-1,null,65,55,40,65,40,null,null,null,null,null,null,117.9,24.7,90.0,null,null,null,60,null,null,114.2,115.0,75.0,null,null,105.0,20,null,null,null,null,null,-1],
["a slime",19,21,20,34,21,20,-1,null,10,null,null,20,null,null,null,null,null,null,null,34.0,34.0,20.0,null,null,50.0,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a slith",85,75,13,136,75,13,-1,null,40,45,null,35,30,null,null,null,null,null,null,77.1,76.4,63.5,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a snake",19,25,10,34,25,10,-1,null,20,null,null,30,null,null,null,null,null,null,null,34.0,34.0,20.0,null,null,70.0,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a snow leopard",48,85,50,80,85,50,-1,null,25,10,40,20,30,null,null,null,null,null,null,50.0,60.0,35.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a speckled scorpion",null,null,null,null,null,null,-1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a squirrel",50,35,5,50,35,5,-1,null,34,14,35,25,25,null,null,null,null,null,null,4.0,4.0,4.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a stone slith",166,90,69,300,90,69,-1,null,55,30,20,40,40,null,null,null,null,null,null,87.4,88.6,95.1,2.9,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a mongbat",6,38,14,10,38,14,-1,null,25,null,null,null,null,null,null,null,null,null,null,35.0,50.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Stygian Drake",510,125,450,830,125,450,-1,null,65,70,40,40,70,null,null,null,null,null,null,100.0,105.0,105.0,null,null,null,75.0,null,null,100.0,105.0,null,null,null,null,20,null,null,null,null,null,-1],
["a swamp dragon",180,85,100,300,85,100,-1,null,40,30,40,30,40,null,null,null,null,null,null,55.0,55.0,55.0,55.0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a timber wolf",48,75,25,80,75,25,-1,null,20,10,15,10,10,null,null,null,null,null,null,60.0,50.0,45.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Triceratops",1200,170,310,1300,170,310,-1,null,80,50,50,40,50,null,null,null,null,null,null,105.0,100.0,null,75.0,null,null,75.0,null,null,null,null,null,null,null,null,105.0,null,null,null,null,null,-1],
["Triton",700,220,121,250,220,121,-1,null,55,60,55,45,90,null,null,null,null,null,null,130.0,95.0,190.0,null,99.0,null,50.1,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a tsuki wolf",450,200,76,450,200,76,-1,null,60,70,70,70,70,null,null,null,null,null,null,107.5,110.0,70.0,72.0,null,null,100.0,null,null,null,null,null,20.0,20.0,null,20,null,null,null,null,null,-1],
["a turkey",null,15,5,5,15,5,-1,null,5,null,null,null,null,null,null,null,null,null,null,5.0,5.0,4.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a unicorn",210,115,225,325,115,225,-1,null,65,40,40,65,40,null,null,null,null,null,null,92.5,22.5,90.0,null,null,null,60,null,null,80.0,90.0,60.0,null,null,null,20,null,null,null,null,null,-1],
["a walrus",17,55,20,29,55,20,-1,null,25,10,25,10,10,null,null,null,null,null,null,29.0,29.0,20.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a white wolf",48,75,55,80,75,55,-1,null,20,15,25,15,15,null,null,null,null,null,null,60.0,60.0,35.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a white wyrm",456,130,425,760,130,425,-1,null,70,25,90,50,50,null,null,null,null,null,null,100.0,100.0,100.0,null,null,null,60,null,null,100.0,100.0,null,null,null,null,20,null,null,null,null,null,-1],
["a wild tiger",450,124,163,554,124,163,-1,null,75,40,64,40,35,null,null,null,null,null,null,94.4,102.5,97.5,0,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["Windrunner",null,125,55,400,125,55,-1,null,50,40,40,40,40,null,null,null,null,null,null,35.0,40.0,30.0,null,null,null,60,null,null,null,null,null,null,null,null,20,null,null,null,null,null,-1],
["a Wolf spider",160,165,310,268,165,310,-1,null,35,30,35,100,35,null,null,null,null,null,null,90.0,95.9,75.0,90.0,null,77.2,60,110.0,null,null,null,null,null,null,null,20,null,null,null,null,null,-1]]

function GetGump() {
    TextWindow.Open();
    TextWindow.Clear();
    var target = SelectTarget();
    ForceLore(target)

    var lastCommand;
    loreTextArray = Orion.GetLastGump().TextList();
    var mobName = loreTextArray[0].match(/>(?:(?:\d|\.)*\/)*(\w(?:\w|\.|\s)*)%?</i)[1];
    TextWindow.Print("using " + mobName)
    var maxValues = tamers.filter(function (singleMob) {
        return singleMob[0] === mobName;
    }).shift();

var counter=0;
var total = 0;
var usedKeys=[]
    loreTextCommands = Orion.GetLastGump().CommandList().forEach(function (command) {
        if (command.search(/\shtmlgump\s/i) >= 0 && lastCommand.search(/xmfhtmlgumpcolor/i) >= 0) {
            var key = lastCommand.match(/xmfhtmlgumpcolor(?:\s\d*){4}\s(\d*)(?:\s\d*){3}\s*/i)[1];
            var valueRef = command.match(/htmlgump*(?:\s\d*){4}\s(\d*)/i)[1];
            var value = loreTextArray[valueRef]
                .match(/>(?:((?:(?:-|\w)\s?)+\.?\w*)|%)+(?:\/?(?:\d*\.?\d*)*)<|<((?:\w|\s)+)=#(?:\w|\s)+>(\d)\s=>\s\d/i)[1]
            var keyLocation = referenceID.indexOf(parseInt(key));
            var maxValue = maxValues[keyLocation];
            if (maxValue == null) {
                maxValue = '---'
            }

            if (keyLocation != -1 && value != '---' && maxValue != '---'  && maxValue != -1 && value != null && usedKeys.indexOf(keyLocation)==-1) {
            usedKeys.push(keyLocation)
               //              TextWindow.Print(lastCommand)

               //  TextWindow.Print(command)
//TextWindow.Print(value)
            counter++;
            var percRating = (parseFloat(value)/parseFloat(maxValue)*100).toFixed(2);
            total = parseFloat(total)+ parseFloat(percRating);
                TextWindow.Print(tameColumns[keyLocation] + '		' + value + ' /' + maxValue + '   ' +percRating+ '%')
            }
        }
        lastCommand = command;
    });
     TextWindow.Print('Overall Rating: ' +(total/counter).toFixed(2)+ '%')



}

var loreTextArray = [];
function ForceLore(target) {
    if (Orion.GumpExists('generic', any, '0xD937D1DB')) {
        Orion.GetLastGump().Close();
    }
    while (target.Distance() < 20 && !Orion.GumpExists('generic', any, '0xD937D1DB')) {
        Orion.UseSkill('Animal Lore', target.Serial())
        Orion.Wait(400);
    }

    //   Orion.GetLastGump().Close();
}

var padding = '       ';
function pad(a) {
    return padding.slice(a.toString().length) + a;
}
//var str = "Gump text:  [0]\t<center><basefont color=#000080>a ki-rin</center>  [1]\t<div align=right>206/206</div>  [2]\t<div align=right>105/105</div>  [3]\t<div align=right>208/208</div>  [4]\t<div align=right>319</div>  [5]\t<div align=right>105</div>  [6]\t<div align=right>208</div>  [7]\t<div align=right>84.6</div>  [8]\t<div align=right>---</div>  [9]\t<div align=right>59%</div>  [10]\t<BASEFONT COLOR=#FF0000><div align=right>42%</div>  [11]\t<BASEFONT COLOR=#000080><div align=right>31%</div>  [12]\t<BASEFONT COLOR=#008000><div align=right>32%</div>  [13]\t<BASEFONT COLOR=#BF80FF><div align=right>35%</div>  [14]\t<div align=right>70%</div>  [15]\t<BASEFONT COLOR=#FF0000><div align=right>10%</div>  [16]\t<BASEFONT COLOR=#000080><div align=right>10%</div>  [17]\t<BASEFONT COLOR=#008000><div align=right>---</div>  [18]\t<BASEFONT COLOR=#BF80FF><div align=right>10%</div>  [19]\t<div align=right>16-22</div>  [20]\t<div align=right>86.5/100</div>  [21]\t<div align=right>21.3/100</div>  [22]\t<div align=right>97.7/100</div>  [23]\t<div align=right>10.0/100</div>  [24]\t<div align=right>85.6/100</div>  [25]\t<div align=right>86.1/100</div>  [26]\t<div align=right>99.7/100</div>  [27]\t<BASEFONT COLOR=#57412F>2 => 5";
//var n = str.search(/\[0\](?:\s<|\w)*>(?:\w|\<|\s|=|#)*>((?:\w|\s|-)*)/i);
