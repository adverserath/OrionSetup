//#include Scripts/helpers/Target.js

var tameColumns = ["name", "hits", "stamina", "mana", "str", "dex", "int", "bard", "filler", "resistPhys", "resistFire", "resistCold", "resistPoison", "resistEnergy", "damagePhys", "damageFire", "damageCold", "damagePoison", "damageEnergy", "BaseDamage", "Wrestling", "Tactics", "Resist", "Anatomy", "Healing", "Poison", "DetectHidden", "Hiding", "Parry", "Magery", "EvalInt", "Meditation", "Necro", "SpiritSpeak", "Mysticism", "Focus", "SpellWeaving", "Discordance", "Bushido", "Ninjitsu", "Chivalry"]
var tamers = [["an alligator", 60, null, 0, 100, 25, 20, null, null, 25, 5, null, 5, null, 100, null, null, null, null, null, 60.0, 60.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a bake kitsune", 350, null, null, 220, 145, 425, null, null, 40, 70, 40, 40, 40, 70, null, null, null, 30, null, 55.0, 90.0, 100.0, null, null, null, null, null, null, 90.0, 90.0, null, null, null, null, null, null, null, null, null, null, -1],
["a battle chicken lizard", 177, null, null, 177, 124, 13, null, null, 15, 5, null, null, null, 100, null, null, null, null, null, 62.0, 62.0, 53.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a giant beetle", null, null, null, 300, 100, 500, null, null, 30, 20, 20, 20, 20, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a crow", null, null, null, 10, 35, 10, null, null, null, null, null, null, null, 100, null, null, null, null, null, 6.4, 6.0, 5.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a black bear", 60, null, 0, 100, 75, 14, null, null, 20, null, 10, 5, null, 100, null, null, null, null, null, 60.0, 60.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Blood Fox", 200, null, null, 320, 200, 210, null, null, 50, 20, 55, 25, 35, 100, null, null, null, null, null, 90.0, 70.0, 50.0, null, null, null, 60.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a boar", null, null, 0, 25, 15, 5, null, null, 10, 5, null, 5, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a brown bear", 60, null, 0, 100, 45, 47, null, null, 20, null, 15, 10, null, 100, null, null, null, null, null, 60.0, 60.0, 35.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a bull", 64, null, 0, 111, 75, 75, null, null, 25, null, 10, null, null, 100, null, null, null, null, null, 57.5, 85.0, 25.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a bull frog", 42, null, 0, 70, 25, 20, null, null, 5, null, null, null, null, 100, null, null, null, null, null, 60.0, 60.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["capybara", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 40.0, 45.0, 30.0, null, null, null, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a cat", null, null, 0, 9, 35, 5, null, null, 5, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a chicken", null, null, 0, 5, 15, 5, null, null, 1, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a chicken lizard", 95, null, 10, 95, 95, 10, null, null, 15, 5, null, null, null, 100, null, null, null, null, null, 38.2, 44.9, 29.6, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Clan Ribbon Plague Rat", null, null, null, 59, 51, 17, null, null, 30, 20, 30, 5, 30, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Coconut Crab", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 35.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a cold drake", 500, null, null, 670, 160, 190, null, null, 50, 30, 75, 40, 40, 50, null, 50, null, null, null, 126.0, 140.0, 110.0, null, null, null, 50.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a coral snake", 200, null, 35, 340, 300, 35, null, null, 42, 5, null, 100, 5, 50, null, null, 50, null, null, 105.0, 98.0, 105.0, null, null, 110.9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a corrosive slime", 19, null, null, 34, 21, 20, null, null, 5, null, null, 15, null, 100, null, null, null, null, null, 26.1, 26.1, 18.9, null, null, 49.1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a cougar", 48, null, 0, 80, 85, 50, null, null, 20, 5, 10, 5, null, 100, null, null, null, null, null, 60.0, 60.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a cow", null, null, 0, 30, 15, 5, null, null, 5, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Crimson Drake", 258, null, null, 430, 152, 140, null, null, 30, 30, 30, 40, 30, 100, 100, 100, 100, 100, null, 80.0, 90.0, 80.0, null, null, null, 60.0, null, null, null, null, null, null, null, null, 10.0, null, null, null, null, null, -1],
["a cu sidhe", 1275, null, null, 1225, 170, 285, null, null, 50, 25, 70, 30, 70, 0, null, 50, null, 50, null, 96.8, 99.3, 90.0, 69.4, 98.9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a deathwatch beetle", 145, null, 20, 160, 52, 40, null, null, 35, 15, 15, 50, 20, 100, null, null, null, null, null, 60.0, 77.0, 58.0, 34.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a desert ostard", 88, null, 0, 170, 75, 10, null, null, 15, 5, null, null, null, 100, null, null, null, null, null, 44.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dimetrosaur", 5400, null, null, 601, 184, 435, null, null, 80, 60, 60, 65, 65, 90, null, null, 10, null, null, 125.0, 120.0, 140.0, 80.0, null, 95.0, 80.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dire wolf", 72, null, 0, 120, 105, 60, null, null, 20, 10, 5, 5, 10, 100, null, null, null, null, null, 80.0, 70.0, 75.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dog", 22, null, 0, 37, 43, 37, null, null, 10, null, null, null, null, 100, null, null, null, null, null, 31.0, 31.0, 47.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dragon", 495, null, null, 825, 105, 475, null, null, 55, 60, 30, 25, 35, 100, null, null, null, null, null, 92.5, 100.0, 100.0, null, null, null, null, null, null, 40.0, 40.0, null, null, null, null, null, null, null, null, null, null, -1],
["a dragon turtle hatchling", 850, null, null, 650, 65, 650, null, null, 65, 80, 50, 60, 70, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dragon wolf", 860, null, null, 850, 75, 55, null, null, 45, 30, 30, 40, 40, 100, null, null, null, null, null, 105.0, 110.0, 140.0, 70.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a drake", 258, null, null, 430, 152, 140, null, null, 45, 50, 40, 20, 30, 80, 20, null, null, null, null, 80.0, 90.0, 80.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a dread spider", 132, null, null, 220, 145, 310, null, null, 40, 20, 20, 100, 20, 20, null, null, 80, null, null, 75.0, 70.0, 60.0, null, null, null, 60.0, null, null, 80.0, 80.0, null, null, null, null, null, null, null, null, null, null, -1],
["a dread warhorse", 650, null, null, 555, 125, 160, null, null, 65, 20, 20, 50, 40, 40, null, null, 20, 40, null, 98.2, 110.0, 93.4, null, null, null, null, null, null, 49.5, 19.3, null, null, null, null, null, null, null, null, null, null, -1],
["an eagle", 27, null, 0, 47, 60, 20, null, null, 20, 10, 20, 5, 5, 100, null, null, null, null, null, 30.0, 37.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a rabbit", 200, null, null, 200, 200, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Eowmu", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 35.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a ferret", 50, null, null, 48, 55, 75, null, null, 45, 10, 30, 21, 20, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a fire steed", 240, null, null, 400, 120, 300, null, null, 30, 70, 20, 30, 30, 20, 80, null, null, null, null, null, null, 120.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a forest ostard", 88, null, 0, 170, 75, 10, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 44.0, 44.0, 32.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a frenzied ostard", 110, null, 0, 170, 115, 10, null, null, 25, 10, null, 20, 20, 100, null, null, null, null, null, 94.0, 94.0, 80.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a frost dragon", 2250, null, null, 1400, 125, 700, null, null, 85, 55, 85, 65, 65, 50, null, 50, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Frost Mite", 1000, null, null, 1017, 164, 283, null, null, 60, 15, 90, 50, 40, 0, null, 100, null, null, null, 110.0, 105.0, 85.0, null, null, null, 80.0, null, null, null, null, null, null, null, null, 115.0, null, null, null, null, null, -1],
["a frost spider", 60, null, 0, 100, 145, 60, null, null, 25, 5, 40, 20, 10, 20, null, 80, null, null, null, 65.0, 50.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a gallusaurus", 900, null, null, 511, 168, 274, null, null, 50, 20, 20, 60, 20, 100, null, null, null, null, null, 91.0, 90.0, 80.0, null, null, null, 35.0, null, null, null, null, null, null, null, null, null, null, null, 120.0, null, null, -1],
["a gaman", 160, null, 0, 175, 150, 60, null, null, 50, 30, 30, 40, 30, 100, null, null, null, null, null, 57.5, 83.0, 42.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a giant ice worm", 147, null, null, 245, 100, 85, null, null, 30, 0, 80, 15, 10, 10, null, 90, null, null, null, 80.0, 80.0, 60.0, null, null, 95.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a giant rat", 39, null, 0, 74, 65, 30, null, null, 15, 5, null, 25, null, 100, null, null, null, null, null, 44.0, 44.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a giant spider", 60, null, 0, 100, 95, 60, null, null, 15, null, null, 25, null, 100, null, null, null, null, null, 65.0, 50.0, 40.0, null, null, 80.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a giant toad", 60, null, 0, 100, 25, 20, null, null, 20, 5, null, null, 5, 100, null, null, null, null, null, 60.0, 60.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a goat", null, null, 0, 19, 15, 5, null, null, 5, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a gorilla", 51, null, 0, 95, 55, 60, null, null, 20, 5, 10, null, null, 100, null, null, null, null, null, 58.0, 58.0, 60.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a greater dragon", 2000, null, null, 1425, 148, 675, null, null, 60, 65, 40, 40, 50, 100, null, null, null, null, null, 145.0, 140.0, 140.0, null, null, null, null, null, null, 140.0, 140.0, null, null, null, null, null, null, null, null, null, null, -1],
["a greater mongbat", 48, null, 50, 80, 80, 50, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 35.0, 50.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a great hart", 41, null, 0, 71, 77, 57, null, null, 20, null, 5, null, null, 100, null, null, null, null, null, 47.5, 47.5, 44.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a grey wolf", 48, null, 0, 80, 75, 55, null, null, 15, 10, 20, 10, 10, 100, null, null, null, null, null, 60.0, 60.0, 35.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a grizzly bear", 93, null, 0, 155, 105, 40, null, null, 25, null, 15, 5, 5, 100, null, null, null, null, null, 70.0, 100.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a hell cat", 67, null, null, 100, 150, 85, null, null, 25, 80, null, null, 15, 40, 60, null, null, null, null, 40.0, 55.0, 60.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a hell hound", 300, null, null, 350, 300, 180, null, null, 0, 30, null, 10, 10, 20, 80, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a high plains boura", 618, null, null, 435, 96, 30, null, null, 50, 35, 10, 30, 30, 100, null, null, null, null, null, 115.3, 105.7, 70.0, 105.4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a hind", 29, null, 0, 51, 77, 47, null, null, 5, null, 5, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a horse", 45, null, 0, 98, 75, 10, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 44.0, 44.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["hungry coconut crab", null, null, null, 19, 15, 5, null, null, 10, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["an ice hound", 125, null, null, 150, 105, 60, null, null, 25, null, 40, 10, 10, 20, null, 80, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["an imp", 70, null, null, 115, 80, 105, null, null, 25, 40, 20, 30, 30, 0, 50, null, 50, null, null, 44.0, 50.0, 50.0, null, null, null, null, null, null, 100.0, 30.0, null, null, null, null, null, null, null, null, null, null, -1],
["an iron beetle", 830, null, null, 883, 73, 49, null, null, 55, 20, 20, 30, 45, 100, null, null, null, null, null, 110.0, 100.0, 130.0, 85.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a jack rabbit", null, null, 0, 15, 25, 5, null, null, 2, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a ki-rin", 210, null, null, 325, 105, 225, null, null, 55, 35, 25, 25, 25, 70, 10, 10, null, 10, null, 92.5, 22.5, 100.0, null, null, null, null, null, null, 100.0, 90.0, 100.0, null, null, null, null, null, null, null, null, null, -1],
["Lasher", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 35.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a lava lizard", 90, null, 0, 150, 75, 20, null, null, 35, 30, null, 25, 25, 100, null, null, null, null, null, 80.0, 80.0, 70.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a leather wolf", 329, null, null, 125, 125, 34, null, null, 40, 20, 30, 21, 20, 100, null, null, null, null, null, 88.4, 89.4, 94.9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Lion", 370, null, null, 720, 220, 140, null, null, 40, 35, 30, 30, 20, 100, null, null, null, null, null, 110.0, 110.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a llama", 27, null, 0, 49, 55, 30, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 29.0, 29.0, 20.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a lowland boura", 553, null, null, 411, 93, 25, null, null, 50, 35, 10, 30, 30, 100, null, null, null, null, null, 97.3, 86.7, 75.0, 84.4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a mongbat", 6, null, 0, 10, 38, 14, null, null, 5, null, null, null, null, 100, null, null, null, null, null, 10.0, 10.0, 14.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a mountain goat", 33, null, 0, 64, 75, 30, null, null, 10, 5, 10, 10, 10, 100, null, null, null, null, null, 44.0, 44.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a najasaurus", 854, null, null, 346, 218, 40, null, null, 45, 50, 45, 100, 35, 50, null, null, 50, null, null, 100.0, 95.0, 190.0, null, null, 100.0, 55.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a nightmare", 315, null, null, 525, 105, 125, null, null, 55, 30, 30, 30, 20, 40, 40, null, null, 20, null, 92.5, 100.0, 100.0, null, null, null, null, null, null, 50.0, 50.0, null, null, null, null, null, null, null, null, null, null, -1],
["Ossein Ram", 550, null, null, 400, 100, 120, null, null, 50, 10, 40, 30, 40, 50, null, 25, null, 25, null, 100.0, 90.0, 80.0, 85.0, null, null, 50.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a pack horse", 80, null, 0, 120, 55, 10, null, null, 20, 10, 20, 10, 10, 100, null, null, null, null, null, 44.0, 44.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a pack llama", null, null, 0, 80, 55, 30, null, null, 25, 10, 10, 10, 10, 100, null, null, null, null, null, 29.0, 29.0, 20.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a horse", 45, null, 0, 98, 75, 10, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 44.0, 44.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a panther", 51, null, 0, 85, 105, 50, null, null, 20, 5, 10, 5, null, 100, null, null, null, null, null, 65.0, 65.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a phoenix", 383, null, null, 700, 300, 700, null, null, 45, 60, null, 25, 40, 50, 50, null, null, null, null, 100.0, 90.0, 135.0, null, null, null, 80.0, null, null, 100.0, 100.0, 100.0, null, null, null, null, null, null, null, null, null, -1],
["a pig", null, null, 0, 20, 20, 5, null, null, 10, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Platinum Drake", 258, null, null, 430, 152, 140, null, null, 30, 30, 30, 40, 30, 100, 100, 100, 100, 100, null, 80.0, 90.0, 80.0, null, null, null, 60.0, null, null, null, null, null, null, null, null, 20.0, null, null, null, null, null, -1],
["a polar bear", 84, null, 0, 140, 105, 50, null, null, 25, null, 60, 15, 10, 100, null, null, null, null, null, 70.0, 90.0, 60.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a predator hellcat", 131, null, null, 185, 115, 100, null, null, 25, 30, null, null, 5, 75, 25, null, null, null, null, 65.0, 65.0, 90.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a rabbit", 6, null, 0, 10, 38, 14, null, null, 5, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a raging grizzly bear", 930, null, 0, 1550, 1050, 400, null, null, 50, null, 30, 10, 10, 100, null, null, null, null, null, 88.1, 110.5, 54.6, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a raptor", 400, null, null, 471, 155, 145, null, null, 45, 50, 40, 20, 30, 100, null, null, null, null, null, 95.1, 100.0, 90.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a rat", null, null, 0, 9, 35, 5, null, null, 5, null, null, 5, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a ridable llama", 27, null, 0, 49, 75, 30, null, null, 10, 5, 5, 5, 5, 100, null, null, null, null, null, 29.0, 29.0, 20.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a ridgeback", 54, null, 0, 100, 75, 30, null, null, 15, 5, 5, 5, 5, 100, null, null, null, null, null, 45.0, 44.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a ruddy boura", 509, null, 20, 480, 82, 20, null, null, 50, 35, 10, 30, 30, 100, null, null, null, null, null, 87.9, 88.8, 87.7, 88.8, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a rune beetle", 360, null, null, 460, 170, 450, null, null, 40, 35, 35, 75, 40, 20, null, null, 10, 70, null, 77.5, 93.0, 110.0, null, null, 140.0, null, null, null, 110.0, 125.0, null, null, null, null, null, null, null, null, null, null, -1],
["sabre-toothed tiger", 423, null, null, 523, 403, 469, null, null, 40, 30, 50, 30, 40, 100, null, null, null, null, null, 105.0, 100.0, null, null, null, null, null, null, null, null, null, null, null, null, null, 105.0, null, null, null, null, null, -1],
["a saurosaurus", 1468, null, null, 824, 220, 440, null, null, 75, 80, 45, 35, 45, 100, null, null, null, null, null, 130.0, 120.0, 90.0, 60.0, null, null, null, null, null, null, null, null, null, null, null, 125.0, null, null, null, null, null, -1],
["a savage ridgeback", 54, null, 0, 100, 75, 30, null, null, 15, 10, 15, 10, 10, 100, null, null, null, null, null, 45.0, 44.0, 40.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a swamp dragon", 180, null, null, 300, 85, 100, null, null, 35, 20, 20, 20, 30, 75, null, null, 25, null, null, 55.0, 55.0, 55.0, 55.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a scorpion", 63, null, 0, 115, 95, 30, null, null, 20, 10, 20, 40, 10, 60, null, null, 40, null, null, 65.0, 75.0, 35.0, null, null, 100.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a serpentine dragon", null, null, null, 140, 220, 1040, null, null, 35, 25, 25, 25, 25, 75, null, null, 25, null, null, 100.0, 60.0, null, null, null, null, null, null, null, 120.0, 110.0, null, null, null, null, null, null, null, null, null, null, -1],
["a sewer rat", null, null, 0, 9, 25, 10, null, null, 5, null, null, 15, 5, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a shadow wyrm", 599, null, null, 1030, 200, 620, null, null, 65, 50, 45, 20, 50, 75, null, 25, null, null, null, 100.0, 100.0, 130.0, null, null, null, 100.0, null, null, 100.0, 100.0, 75.0, 90.0, 105.0, null, null, null, null, null, null, null, -1],
["a sheep", null, null, 0, 19, 25, 5, null, null, 5, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a silver steed", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Skeletal Cat", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 35.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a skeletal steed", 50, null, null, 100, 55, 60, null, null, 50, null, 90, 100, 10, 50, null, 50, null, null, null, 80.0, null, 100.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a skittering hopper", 45, null, null, 65, 115, 50, null, null, 5, null, 10, null, 5, 100, null, null, null, null, null, 60.0, 70.0, 45.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a skree", 300, null, null, 330, 124, 260, null, null, 55, 45, 25, 55, 25, 100, null, null, null, null, null, 117.9, 24.7, 90.0, null, null, null, null, null, null, 114.2, 115.0, 75.0, null, null, null, null, null, null, null, null, null, -1],
["a slime", 19, null, null, 34, 21, 20, null, null, 5, null, null, 10, null, 100, null, null, null, null, null, 34.0, 34.0, 20.0, null, null, 50.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a slith", 85, null, null, 136, 75, 13, null, null, 35, 35, null, 25, 25, 100, null, null, null, null, null, 77.1, 76.4, 63.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a snake", 19, null, 0, 34, 25, 10, null, null, 15, null, null, 20, null, 100, null, null, null, null, null, 34.0, 34.0, 20.0, null, null, 70.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a snow leopard", 48, null, 0, 80, 85, 50, null, null, 20, 5, 30, 10, 20, 100, null, null, null, null, null, 50.0, 60.0, 35.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a speckled scorpion", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a squirrel", 50, null, null, 50, 35, 5, null, null, 30, 10, 30, 20, 20, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a stone slith", 166, null, 69, 300, 90, 69, null, null, 50, 20, 10, 30, 30, 100, null, null, null, null, null, 87.4, 88.6, 95.1, 2.9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a mongbat", 6, null, 0, 10, 38, 14, null, null, 15, null, null, null, null, 100, null, null, null, null, null, 35.0, 50.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Stygian Drake", 510, null, null, 830, 125, 450, null, null, 55, 60, 30, 30, 60, 100, null, null, null, null, null, 100.0, 105.0, 105.0, null, null, null, null, null, null, null, 105.0, null, null, null, null, null, null, null, null, null, null, -1],
["a swamp dragon", 180, null, null, 300, 85, 100, null, null, 35, 20, 20, 20, 30, 75, null, null, 25, null, null, 55.0, 55.0, 55.0, 55.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a timber wolf", 48, null, 0, 80, 75, 25, null, null, 15, 5, 10, 5, 5, 100, null, null, null, null, null, 60.0, 50.0, 45.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Triceratops", 1200, null, null, 1300, 170, 310, null, null, 70, 40, 40, 30, 40, 100, null, null, null, null, null, 105.0, 100.0, null, 75.0, null, null, null, null, null, null, null, null, null, null, null, 105.0, null, null, null, null, null, -1],
["Triton", 700, null, null, 250, 220, 121, null, null, 45, 50, 45, 35, 85, 50, null, null, null, 50, null, 130.0, 95.0, 190.0, null, 99.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a tsuki wolf", 450, null, 40, 450, 200, 76, null, null, 40, 50, 50, 50, 50, 90, null, 5, null, 5, null, 107.5, 110.0, 70.0, 72.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a turkey", null, null, 0, 5, 15, 5, null, null, 1, null, null, null, null, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a unicorn", 210, null, null, 325, 115, 225, null, null, 55, 25, 25, 55, 25, 75, null, null, null, 25, null, 92.5, 22.5, 90.0, null, null, null, null, null, null, 80.0, 90.0, 60.0, null, null, null, null, null, null, null, null, null, -1],
["a walrus", 17, null, 0, 29, 55, 20, null, null, 20, 5, 20, 5, 5, 100, null, null, null, null, null, 29.0, 29.0, 20.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a white wolf", 48, null, 0, 80, 75, 55, null, null, 15, 10, 20, 10, 10, 100, null, null, null, null, null, 60.0, 60.0, 35.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a white wyrm", 456, null, null, 760, 130, 425, null, null, 55, 15, 80, 40, 40, 50, null, 50, null, null, null, 100.0, 100.0, 100.0, null, null, null, null, null, null, 100.0, 100.0, null, null, null, null, null, null, null, null, null, null, -1],
["a wild tiger", 450, null, null, 554, 124, 163, null, null, 56, 21, 55, 30, 25, 100, null, null, null, null, null, 94.4, 102.5, 97.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["Windrunner", null, null, 0, 400, 125, 55, null, null, 40, 30, 30, 30, 30, 100, null, null, null, null, null, 35.0, 40.0, 30.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, -1],
["a Wolf spider", 160, null, 310, 268, 165, 310, null, null, 30, 20, 25, 100, 25, 70, null, null, 30, null, null, 90.0, 95.9, 75.0, 90.0, null, 77.2, null, 110.0, null, null, null, null, null, null, null, null, null, null, null, null, null, -1]]

function GetGump() {
    TextWindow.Open();
    TextWindow.Clear();
    var target = SelectTarget();
    ForceLore(target)
    var mobName = loreTextArray[0].match(/>(?:(?:\d|\.)*\/)*(\w(?:\w|\.|\s)*)%?</i)[1];
    TextWindow.Print("using "+ mobName)
    var mobArray = tamers.filter(function (singleMob) {
        return singleMob[0] === mobName;
    }).shift();
//        TextWindow.Print(mobArray)

    for (var index = 1; index < loreTextArray.length; index++) {
        var mobNameregex = loreTextArray[index].match(/>(?:(?:\d|\.)*\/)*(\w(?:\w|\.|\s)*)%?</i);

        if (mobNameregex != null && mobNameregex.length > 1) {

            if (mobArray != null) {
                TextWindow.Print(tameColumns[index] + ' : ' + mobNameregex[1] +' / '+ mobArray[index])

                //    for (var mobdata = 0; mobdata < mobArray.length; mobdata++) {
                //      var element = mobArray[mobdata];
                //     if (element != null) {
                //GetNext value from data

                //Compare Value to max
            }
        }
    }

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
    loreTextArray = Orion.GetLastGump().TextList();
    Orion.GetLastGump().Close();
}
//var str = "Gump text:  [0]\t<center><basefont color=#000080>a ki-rin</center>  [1]\t<div align=right>206/206</div>  [2]\t<div align=right>105/105</div>  [3]\t<div align=right>208/208</div>  [4]\t<div align=right>319</div>  [5]\t<div align=right>105</div>  [6]\t<div align=right>208</div>  [7]\t<div align=right>84.6</div>  [8]\t<div align=right>---</div>  [9]\t<div align=right>59%</div>  [10]\t<BASEFONT COLOR=#FF0000><div align=right>42%</div>  [11]\t<BASEFONT COLOR=#000080><div align=right>31%</div>  [12]\t<BASEFONT COLOR=#008000><div align=right>32%</div>  [13]\t<BASEFONT COLOR=#BF80FF><div align=right>35%</div>  [14]\t<div align=right>70%</div>  [15]\t<BASEFONT COLOR=#FF0000><div align=right>10%</div>  [16]\t<BASEFONT COLOR=#000080><div align=right>10%</div>  [17]\t<BASEFONT COLOR=#008000><div align=right>---</div>  [18]\t<BASEFONT COLOR=#BF80FF><div align=right>10%</div>  [19]\t<div align=right>16-22</div>  [20]\t<div align=right>86.5/100</div>  [21]\t<div align=right>21.3/100</div>  [22]\t<div align=right>97.7/100</div>  [23]\t<div align=right>10.0/100</div>  [24]\t<div align=right>85.6/100</div>  [25]\t<div align=right>86.1/100</div>  [26]\t<div align=right>99.7/100</div>  [27]\t<BASEFONT COLOR=#57412F>2 => 5";
//var n = str.search(/\[0\](?:\s<|\w)*>(?:\w|\<|\s|=|#)*>((?:\w|\s|-)*)/i);
