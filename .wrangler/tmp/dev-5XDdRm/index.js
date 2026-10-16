var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// site/worker/roster.js
var ROSTER = [
  {
    "id": "roger",
    "name": "Gol D. Roger",
    "group": "\u0E15\u0E33\u0E19\u0E32\u0E19\u0E22\u0E38\u0E04\u0E17\u0E2D\u0E07",
    "pl": 100,
    "effect": '"\u0E23\u0E32\u0E0A\u0E32\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14": \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E1A\u0E40\u0E01\u0E21 \u0E02\u0E42\u0E21\u0E22\u0E1E\u0E25\u0E31\u0E07 10 \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E17\u0E35\u0E48\u0E1E\u0E25\u0E31\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14',
    "img": "images/roger.png",
    "skill": {
      "kind": "execute",
      "name": "\u0E23\u0E32\u0E0A\u0E32\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
      "label": "\u0E1B\u0E23\u0E30\u0E2B\u0E32\u0E23",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 120% \xB7 \u0E14\u0E32\u0E40\u0E21\u0E08 x2 \u0E16\u0E49\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HP \u2264 35% \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.2,
      "cd": 3,
      "target": "enemy",
      "passive": {
        "kind": "brave",
        "name": "\u0E43\u0E08\u0E2A\u0E34\u0E07\u0E2B\u0E4C",
        "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 +25% \u0E40\u0E21\u0E37\u0E48\u0E2D HP \u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07 40%"
      }
    }
  },
  {
    "id": "whitebeard",
    "name": "Edward Newgate",
    "group": "\u0E2A\u0E35\u0E48\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 99,
    "effect": '"Gura Gura no Mi": \u0E2A\u0E31\u0E48\u0E19\u0E2A\u0E30\u0E40\u0E17\u0E37\u0E2D\u0E19 \u0E25\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E17\u0E38\u0E01\u0E04\u0E19 5',
    "img": "images/whitebeard.png",
    "skill": {
      "kind": "sweep",
      "name": "Gura Gura no Mi",
      "label": "\u0E01\u0E27\u0E32\u0E14\u0E25\u0E49\u0E32\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 70% \u0E43\u0E2A\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39\u0E17\u0E38\u0E01\u0E15\u0E31\u0E27 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.7,
      "cd": 3,
      "target": "all",
      "passive": {
        "kind": "sturdy",
        "name": "\u0E01\u0E32\u0E22\u0E32\u0E40\u0E2B\u0E25\u0E47\u0E01",
        "desc": "\u0E23\u0E31\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 20% \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "kaido",
    "name": "Kaido",
    "group": "\u0E2A\u0E35\u0E48\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 97,
    "effect": '"\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E17\u0E35\u0E48\u0E41\u0E02\u0E47\u0E07\u0E41\u0E01\u0E23\u0E48\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14": \u0E17\u0E19\u0E17\u0E32\u0E19 \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E25\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E08\u0E32\u0E01\u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04',
    "img": "images/kaido.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E17\u0E35\u0E48\u0E41\u0E02\u0E47\u0E07\u0E41\u0E01\u0E23\u0E48\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally",
      "passive": {
        "kind": "sturdy",
        "name": "\u0E01\u0E32\u0E22\u0E32\u0E40\u0E2B\u0E25\u0E47\u0E01",
        "desc": "\u0E23\u0E31\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 20% \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "garp",
    "name": "Monkey D. Garp",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 96,
    "effect": '"\u0E27\u0E35\u0E23\u0E1A\u0E38\u0E23\u0E38\u0E29\u0E19\u0E32\u0E27\u0E35": \u0E16\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D >=3 \u0E44\u0E14\u0E49 +6',
    "img": "images/garp.png",
    "skill": {
      "kind": "rally",
      "name": "\u0E27\u0E35\u0E23\u0E1A\u0E38\u0E23\u0E38\u0E29\u0E19\u0E32\u0E27\u0E35",
      "label": "\u0E1B\u0E25\u0E38\u0E01\u0E43\u0E08",
      "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 +40% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "self"
    }
  },
  {
    "id": "shanks",
    "name": "Shanks",
    "group": "\u0E2A\u0E35\u0E48\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 96,
    "effect": '"\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07": \u0E16\u0E37\u0E2D Yasopp/Beckman/Lucky Roux \u0E40\u0E1E\u0E34\u0E48\u0E21 +5 \u0E15\u0E48\u0E2D\u0E43\u0E1A',
    "img": "images/shanks.png",
    "skill": {
      "kind": "rally",
      "name": "\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07",
      "label": "\u0E1B\u0E25\u0E38\u0E01\u0E43\u0E08",
      "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 +40% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "self"
    }
  },
  {
    "id": "luffy",
    "name": "Monkey D. Luffy",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 95,
    "effect": '"Gear 5 \u0E2D\u0E34\u0E2A\u0E23\u0E20\u0E32\u0E1E": \u0E16\u0E37\u0E2D\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 >=3 \u0E44\u0E14\u0E49 +15',
    "img": "images/luffy.png",
    "skill": {
      "kind": "heavy",
      "name": "Gear 5 \u0E2D\u0E34\u0E2A\u0E23\u0E20\u0E32\u0E1E",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy",
      "passive": {
        "kind": "brave",
        "name": "\u0E43\u0E08\u0E2A\u0E34\u0E07\u0E2B\u0E4C",
        "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 +25% \u0E40\u0E21\u0E37\u0E48\u0E2D HP \u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07 40%"
      }
    }
  },
  {
    "id": "bigmom",
    "name": "Charlotte Linlin",
    "group": "\u0E2A\u0E35\u0E48\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 94,
    "effect": '"\u0E42\u0E0B\u0E25-\u0E42\u0E0B\u0E25": \u0E40\u0E01\u0E47\u0E1A\u0E27\u0E34\u0E0D\u0E0D\u0E32\u0E13 \u0E02\u0E42\u0E21\u0E22\u0E1E\u0E25\u0E31\u0E07 3 \u0E08\u0E32\u0E01\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E17\u0E38\u0E01\u0E04\u0E19',
    "img": "images/bigmom.png",
    "skill": {
      "kind": "sweep",
      "name": "\u0E42\u0E0B\u0E25-\u0E42\u0E0B\u0E25",
      "label": "\u0E01\u0E27\u0E32\u0E14\u0E25\u0E49\u0E32\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 70% \u0E43\u0E2A\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39\u0E17\u0E38\u0E01\u0E15\u0E31\u0E27 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.7,
      "cd": 3,
      "target": "all"
    }
  },
  {
    "id": "blackbeard",
    "name": "Marshall D. Teach",
    "group": "\u0E2A\u0E35\u0E48\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 94,
    "effect": '"Yami Yami no Mi": \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E0A\u0E19\u0E30\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25 \u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19 10 \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E2D\u0E37\u0E48\u0E19',
    "img": "images/blackbeard.png",
    "skill": {
      "kind": "drain",
      "name": "Yami Yami no Mi",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "sakazuki",
    "name": "Sakazuki (Akainu)",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 93,
    "effect": '"\u0E21\u0E32\u0E01\u0E38\u0E21\u0E32\u0E01\u0E38": \u0E40\u0E1C\u0E32\u0E1C\u0E25\u0E32\u0E0D \u0E1C\u0E39\u0E49\u0E41\u0E1E\u0E49\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E40\u0E2A\u0E35\u0E22\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21 5',
    "img": "images/sakazuki.png",
    "skill": {
      "kind": "burn",
      "name": "\u0E21\u0E32\u0E01\u0E38\u0E21\u0E32\u0E01\u0E38",
      "label": "\u0E40\u0E1C\u0E32\u0E44\u0E2B\u0E21\u0E49",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E15\u0E34\u0E14\u0E44\u0E1F 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "sengoku",
    "name": "Sengoku",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 91,
    "effect": '"\u0E08\u0E2D\u0E21\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D": \u0E16\u0E37\u0E2D\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D >=3 \u0E44\u0E14\u0E49 +6',
    "img": "images/sengoku.png",
    "skill": {
      "kind": "rally",
      "name": "\u0E08\u0E2D\u0E21\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
      "label": "\u0E1B\u0E25\u0E38\u0E01\u0E43\u0E08",
      "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 +40% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "self"
    }
  },
  {
    "id": "kuzan",
    "name": "Kuzan (Aokiji)",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 92,
    "effect": '"\u0E2E\u0E34\u0E40\u0E2D\u0E30\u0E2E\u0E34\u0E40\u0E2D\u0E30": \u0E41\u0E0A\u0E48\u0E41\u0E02\u0E47\u0E07 \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 1 \u0E43\u0E1A\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49',
    "img": "images/kuzan.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E2E\u0E34\u0E40\u0E2D\u0E30\u0E2E\u0E34\u0E40\u0E2D\u0E30",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "mihawk",
    "name": "Dracule Mihawk",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 92,
    "effect": '"\u0E14\u0E32\u0E1A\u0E14\u0E33": \u0E14\u0E27\u0E25\u0E15\u0E31\u0E27\u0E17\u0E35\u0E48\u0E1E\u0E25\u0E31\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E44\u0E14\u0E49 +8 \u0E16\u0E49\u0E32\u0E0A\u0E19\u0E30',
    "img": "images/mihawk.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E14\u0E32\u0E1A\u0E14\u0E33",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "borsalino",
    "name": "Borsalino (Kizaru)",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 91,
    "effect": '"\u0E1B\u0E34\u0E01\u0E30\u0E1B\u0E34\u0E01\u0E30": \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27\u0E41\u0E2A\u0E07 \u0E40\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E04\u0E23\u0E15\u0E2D\u0E19\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25',
    "img": "images/borsalino.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E1B\u0E34\u0E01\u0E30\u0E1B\u0E34\u0E01\u0E30",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "oden",
    "name": "Kozuki Oden",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 92,
    "effect": '"\u0E0B\u0E32\u0E21\u0E39\u0E44\u0E23\u0E43\u0E19\u0E15\u0E33\u0E19\u0E32\u0E19": \u0E16\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E27\u0E32\u0E42\u0E19\u0E30 >=3 \u0E44\u0E14\u0E49 +8',
    "img": "images/oden.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E0B\u0E32\u0E21\u0E39\u0E44\u0E23\u0E43\u0E19\u0E15\u0E33\u0E19\u0E32\u0E19",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "rayleigh",
    "name": "Silvers Rayleigh",
    "group": "\u0E15\u0E33\u0E19\u0E32\u0E19\u0E22\u0E38\u0E04\u0E17\u0E2D\u0E07",
    "pl": 91,
    "effect": '"\u0E23\u0E32\u0E0A\u0E32\u0E1B\u0E35\u0E28\u0E32\u0E08": \u0E2A\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 1 \u0E43\u0E1A +5',
    "img": "images/rayleigh.png",
    "skill": {
      "kind": "rally",
      "name": "\u0E23\u0E32\u0E0A\u0E32\u0E1B\u0E35\u0E28\u0E32\u0E08",
      "label": "\u0E1B\u0E25\u0E38\u0E01\u0E43\u0E08",
      "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 +40% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "self"
    }
  },
  {
    "id": "issho",
    "name": "Issho (Fujitora)",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 90,
    "effect": '"\u0E0B\u0E38\u0E0B\u0E38\u0E0B\u0E38": \u0E14\u0E36\u0E07\u0E2D\u0E38\u0E01\u0E01\u0E32\u0E1A\u0E32\u0E15 \u0E2A\u0E38\u0E48\u0E21\u0E17\u0E33\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E40\u0E07\u0E34\u0E19 5',
    "img": "images/issho.png",
    "skill": {
      "kind": "sweep",
      "name": "\u0E0B\u0E38\u0E0B\u0E38\u0E0B\u0E38",
      "label": "\u0E01\u0E27\u0E32\u0E14\u0E25\u0E49\u0E32\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 70% \u0E43\u0E2A\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39\u0E17\u0E38\u0E01\u0E15\u0E31\u0E27 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.7,
      "cd": 3,
      "target": "all"
    }
  },
  {
    "id": "aramaki",
    "name": "Aramaki (Ryokugyu)",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 89,
    "effect": '"\u0E42\u0E21\u0E23\u0E34\u0E42\u0E21\u0E23\u0E34": \u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E08\u0E32\u0E01\u0E18\u0E23\u0E23\u0E21\u0E0A\u0E32\u0E15\u0E34 \u0E1F\u0E37\u0E49\u0E19\u0E1E\u0E25\u0E31\u0E07 5 \u0E15\u0E48\u0E2D\u0E23\u0E2D\u0E1A',
    "img": "images/aramaki.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E42\u0E21\u0E23\u0E34\u0E42\u0E21\u0E23\u0E34",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally"
    }
  },
  {
    "id": "zoro",
    "name": "Roronoa Zoro",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 90,
    "effect": '"\u0E23\u0E32\u0E0A\u0E32\u0E2A\u0E32\u0E21\u0E14\u0E32\u0E1A": \u0E16\u0E37\u0E2D\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 >=3 \u0E44\u0E14\u0E49 +10',
    "img": "images/zoro.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E23\u0E32\u0E0A\u0E32\u0E2A\u0E32\u0E21\u0E14\u0E32\u0E1A",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "katakuri",
    "name": "Charlotte Katakuri",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 88,
    "effect": '"\u0E42\u0E21\u0E08\u0E34\u0E42\u0E21\u0E08\u0E34\u0E40\u0E2B\u0E47\u0E19\u0E2D\u0E19\u0E32\u0E04\u0E15": \u0E14\u0E39\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E17\u0E35\u0E48\u0E08\u0E30\u0E40\u0E1B\u0E34\u0E14\u0E16\u0E31\u0E14\u0E44\u0E1B 1 \u0E43\u0E1A',
    "img": "images/katakuri.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E42\u0E21\u0E08\u0E34\u0E42\u0E21\u0E08\u0E34\u0E40\u0E2B\u0E47\u0E19\u0E2D\u0E19\u0E32\u0E04\u0E15",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally"
    }
  },
  {
    "id": "yamato",
    "name": "Yamato",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 88,
    "effect": '"\u0E1C\u0E39\u0E49\u0E2A\u0E37\u0E1A\u0E17\u0E2D\u0E14\u0E42\u0E2D\u0E40\u0E14\u0E19": +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Kozuki Oden',
    "img": "images/yamato.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E1C\u0E39\u0E49\u0E2A\u0E37\u0E1A\u0E17\u0E2D\u0E14\u0E42\u0E2D\u0E40\u0E14\u0E19",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "sabo",
    "name": "Sabo",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E1B\u0E0F\u0E34\u0E27\u0E31\u0E15\u0E34",
    "pl": 88,
    "effect": '"\u0E21\u0E31\u0E07\u0E01\u0E23\u0E44\u0E1F": \u0E40\u0E1C\u0E32 \u0E25\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E15\u0E31\u0E27\u0E2B\u0E19\u0E36\u0E48\u0E07 6',
    "img": "images/sabo.png",
    "skill": {
      "kind": "burn",
      "name": "\u0E21\u0E31\u0E07\u0E01\u0E23\u0E44\u0E1F",
      "label": "\u0E40\u0E1C\u0E32\u0E44\u0E2B\u0E21\u0E49",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E15\u0E34\u0E14\u0E44\u0E1F 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "beckman",
    "name": "Benn Beckman",
    "group": "\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07",
    "pl": 88,
    "effect": '"\u0E2A\u0E21\u0E2D\u0E07\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07": \u0E16\u0E37\u0E2D Shanks \u0E44\u0E14\u0E49 +8',
    "img": "images/beckman.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E2A\u0E21\u0E2D\u0E07\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "sanji",
    "name": "Vinsmoke Sanji",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 87,
    "effect": '"Ifrit Jambe": \u0E16\u0E37\u0E2D\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 >=3 \u0E44\u0E14\u0E49 +10',
    "img": "images/sanji.png",
    "skill": {
      "kind": "heavy",
      "name": "Ifrit Jambe",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "marco",
    "name": "Marco",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 86,
    "effect": '"\u0E1F\u0E35\u0E19\u0E34\u0E01\u0E0B\u0E4C": \u0E1F\u0E37\u0E49\u0E19\u0E04\u0E37\u0E19\u0E0A\u0E35\u0E1E \u0E01\u0E31\u0E19\u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04\u0E02\u0E42\u0E21\u0E22\u0E1E\u0E25\u0E31\u0E07\u0E44\u0E14\u0E49 1 \u0E04\u0E23\u0E31\u0E49\u0E07',
    "img": "images/marco.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E1F\u0E35\u0E19\u0E34\u0E01\u0E0B\u0E4C",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally",
      "passive": {
        "kind": "revive",
        "name": "\u0E44\u0E21\u0E48\u0E22\u0E2D\u0E21\u0E15\u0E32\u0E22",
        "desc": "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E16\u0E39\u0E01\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E2B\u0E21\u0E14\u0E2A\u0E15\u0E34 \u0E1F\u0E37\u0E49\u0E19\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E14\u0E49\u0E27\u0E22 HP 30% \u0E44\u0E14\u0E49 1 \u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "king",
    "name": "King",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 86,
    "effect": '"\u0E25\u0E39\u0E19\u0E32\u0E40\u0E23\u0E35\u0E22": \u0E2D\u0E36\u0E14 \u0E16\u0E37\u0E2D Kaido \u0E44\u0E14\u0E49 +6',
    "img": "images/king.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E25\u0E39\u0E19\u0E32\u0E40\u0E23\u0E35\u0E22",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally",
      "passive": {
        "kind": "sturdy",
        "name": "\u0E01\u0E32\u0E22\u0E32\u0E40\u0E2B\u0E25\u0E47\u0E01",
        "desc": "\u0E23\u0E31\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 20% \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "ace",
    "name": "Portgas D. Ace",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07(\u0E1E\u0E31\u0E19\u0E18\u0E21\u0E34\u0E15\u0E23)",
    "pl": 85,
    "effect": '"\u0E40\u0E21\u0E23\u0E30\u0E40\u0E21\u0E23\u0E30": \u0E44\u0E1F\u0E25\u0E38\u0E01 +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Luffy \u0E2B\u0E23\u0E37\u0E2D Sabo',
    "img": "images/ace.png",
    "skill": {
      "kind": "burn",
      "name": "\u0E40\u0E21\u0E23\u0E30\u0E40\u0E21\u0E23\u0E30",
      "label": "\u0E40\u0E1C\u0E32\u0E44\u0E2B\u0E21\u0E49",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E15\u0E34\u0E14\u0E44\u0E1F 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "law",
    "name": "Trafalgar Law",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 85,
    "effect": '"\u0E42\u0E2D\u0E40\u0E1B\u0E30\u0E42\u0E2D\u0E40\u0E1B\u0E30": \u0E2A\u0E25\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E01\u0E31\u0E1A\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E44\u0E14\u0E49 1 \u0E43\u0E1A',
    "img": "images/law.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E42\u0E2D\u0E40\u0E1B\u0E30\u0E42\u0E2D\u0E40\u0E1B\u0E30",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "doflamingo",
    "name": "Donquixote Doflamingo",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 85,
    "effect": '"\u0E2D\u0E34\u0E42\u0E15\u0E30\u0E2D\u0E34\u0E42\u0E15\u0E30": \u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E40\u0E07\u0E34\u0E19 8',
    "img": "images/doflamingo.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E2D\u0E34\u0E42\u0E15\u0E30\u0E2D\u0E34\u0E42\u0E15\u0E30",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "hancock",
    "name": "Boa Hancock",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 84,
    "effect": '"\u0E40\u0E21\u0E42\u0E23\u0E30\u0E40\u0E21\u0E42\u0E23\u0E30": \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E0A\u0E32\u0E22/\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 1 \u0E04\u0E19\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25',
    "img": "images/hancock.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E40\u0E21\u0E42\u0E23\u0E30\u0E40\u0E21\u0E42\u0E23\u0E30",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "kuma",
    "name": "Bartholomew Kuma",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 84,
    "effect": '"\u0E19\u0E34\u0E04\u0E34\u0E27": \u0E1C\u0E25\u0E31\u0E01\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E2D\u0E2D\u0E01 1 \u0E43\u0E1A (\u0E04\u0E37\u0E19\u0E01\u0E2D\u0E07\u0E01\u0E25\u0E32\u0E07)',
    "img": "images/kuma.png",
    "skill": {
      "kind": "sweep",
      "name": "\u0E19\u0E34\u0E04\u0E34\u0E27",
      "label": "\u0E01\u0E27\u0E32\u0E14\u0E25\u0E49\u0E32\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 70% \u0E43\u0E2A\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39\u0E17\u0E38\u0E01\u0E15\u0E31\u0E27 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.7,
      "cd": 3,
      "target": "all"
    }
  },
  {
    "id": "jimbei",
    "name": "Jinbe",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 83,
    "effect": '"\u0E2D\u0E31\u0E28\u0E27\u0E34\u0E19\u0E41\u0E2B\u0E48\u0E07\u0E17\u0E49\u0E2D\u0E07\u0E17\u0E30\u0E40\u0E25": \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E22\u0E2B\u0E32\u0E22\u0E08\u0E32\u0E01\u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E19\u0E36\u0E48\u0E07',
    "img": "images/jimbei.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E2D\u0E31\u0E28\u0E27\u0E34\u0E19\u0E41\u0E2B\u0E48\u0E07\u0E17\u0E49\u0E2D\u0E07\u0E17\u0E30\u0E40\u0E25",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally"
    }
  },
  {
    "id": "kid",
    "name": "Eustass Kid",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 83,
    "effect": '"\u0E08\u0E34\u0E01\u0E34\u0E08\u0E34\u0E01\u0E34": \u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E42\u0E25\u0E2B\u0E30 +10 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Killer',
    "img": "images/kid.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E08\u0E34\u0E01\u0E34\u0E08\u0E34\u0E01\u0E34",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "weevil",
    "name": "Edward Weevil",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 82,
    "effect": '"\u0E25\u0E39\u0E01\u0E0A\u0E32\u0E22\u0E44\u0E27\u0E17\u0E4C\u0E40\u0E1A\u0E34\u0E23\u0E4C\u0E14": +10 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Whitebeard',
    "img": "images/weevil.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E25\u0E39\u0E01\u0E0A\u0E32\u0E22\u0E44\u0E27\u0E17\u0E4C\u0E40\u0E1A\u0E34\u0E23\u0E4C\u0E14",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "jozu",
    "name": "Jozu",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 82,
    "effect": '"\u0E44\u0E14\u0E21\u0E2D\u0E19\u0E14\u0E4C": \u0E41\u0E02\u0E47\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E0A\u0E23 \u0E01\u0E31\u0E19\u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 1 \u0E04\u0E23\u0E31\u0E49\u0E07',
    "img": "images/jozu.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E44\u0E14\u0E21\u0E2D\u0E19\u0E14\u0E4C",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally",
      "passive": {
        "kind": "sturdy",
        "name": "\u0E01\u0E32\u0E22\u0E32\u0E40\u0E2B\u0E25\u0E47\u0E01",
        "desc": "\u0E23\u0E31\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 20% \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "queen",
    "name": "Queen",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 82,
    "effect": '"\u0E44\u0E2D\u0E0B\u0E4C\u0E2D\u0E2D\u0E19\u0E34": \u0E42\u0E23\u0E04\u0E23\u0E30\u0E1A\u0E32\u0E14 \u0E17\u0E33\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E15\u0E34\u0E14\u0E14\u0E35\u0E1A\u0E31\u0E1F -5',
    "img": "images/queen.png",
    "skill": {
      "kind": "burn",
      "name": "\u0E44\u0E2D\u0E0B\u0E4C\u0E2D\u0E2D\u0E19\u0E34",
      "label": "\u0E40\u0E1C\u0E32\u0E44\u0E2B\u0E21\u0E49",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E15\u0E34\u0E14\u0E44\u0E1F 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "lucci",
    "name": "Rob Lucci",
    "group": "CP0",
    "pl": 81,
    "effect": '"\u0E42\u0E23\u0E01\u0E38\u0E0A\u0E34\u0E01\u0E34": \u0E2A\u0E31\u0E07\u0E2B\u0E32\u0E23\u0E40\u0E07\u0E35\u0E22\u0E1A \u0E02\u0E42\u0E21\u0E22\u0E1E\u0E25\u0E31\u0E07 6 \u0E08\u0E32\u0E01\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 1 \u0E04\u0E19',
    "img": "images/lucci.png",
    "skill": {
      "kind": "execute",
      "name": "\u0E42\u0E23\u0E01\u0E38\u0E0A\u0E34\u0E01\u0E34",
      "label": "\u0E1B\u0E23\u0E30\u0E2B\u0E32\u0E23",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 120% \xB7 \u0E14\u0E32\u0E40\u0E21\u0E08 x2 \u0E16\u0E49\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HP \u2264 35% \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.2,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "smoothie",
    "name": "Charlotte Smoothie",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 80,
    "effect": '"\u0E0A\u0E34\u0E1A\u0E39\u0E0A\u0E34\u0E1A\u0E39": \u0E04\u0E31\u0E49\u0E19\u0E19\u0E49\u0E33 \u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 4 \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07',
    "img": "images/smoothie.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E0A\u0E34\u0E1A\u0E39\u0E0A\u0E34\u0E1A\u0E39",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "jack",
    "name": "Jack",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 80,
    "effect": '"\u0E41\u0E21\u0E21\u0E21\u0E2D\u0E18": \u0E1A\u0E38\u0E01\u0E44\u0E21\u0E48\u0E2B\u0E22\u0E38\u0E14 \u0E44\u0E25\u0E48\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E15\u0E48\u0E2D\u0E17\u0E31\u0E19\u0E17\u0E35 1 \u0E43\u0E1A',
    "img": "images/jack.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E41\u0E21\u0E21\u0E21\u0E2D\u0E18",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 80,
    "effect": '"\u0E0B\u0E39\u0E19\u0E30\u0E0B\u0E39\u0E19\u0E30": \u0E17\u0E23\u0E32\u0E22\u0E14\u0E39\u0E14\u0E19\u0E49\u0E33 \u0E25\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E25\u0E31\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 8',
    "img": "images/crocodile.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E0B\u0E39\u0E19\u0E30\u0E0B\u0E39\u0E19\u0E30",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "vista",
    "name": "Vista",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 80,
    "effect": '"\u0E14\u0E2D\u0E01\u0E01\u0E38\u0E2B\u0E25\u0E32\u0E1A\u0E41\u0E2B\u0E48\u0E07\u0E14\u0E32\u0E1A": +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Whitebeard',
    "img": "images/vista.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E14\u0E2D\u0E01\u0E01\u0E38\u0E2B\u0E25\u0E32\u0E1A\u0E41\u0E2B\u0E48\u0E07\u0E14\u0E32\u0E1A",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "ivankov",
    "name": "Emporio Ivankov",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E1B\u0E0F\u0E34\u0E27\u0E31\u0E15\u0E34",
    "pl": 80,
    "effect": '"\u0E2E\u0E2D\u0E23\u0E4C\u0E42\u0E21\u0E19": \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E0A\u0E19\u0E30\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E38\u0E14\u0E17\u0E49\u0E32\u0E22 \u0E1F\u0E37\u0E49\u0E19\u0E1E\u0E25\u0E31\u0E07 8',
    "img": "images/ivankov.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E2E\u0E2D\u0E23\u0E4C\u0E42\u0E21\u0E19",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally"
    }
  },
  {
    "id": "yasopp",
    "name": "Yasopp",
    "group": "\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07",
    "pl": 80,
    "effect": '"\u0E21\u0E37\u0E2D\u0E1B\u0E37\u0E19\u0E2A\u0E31\u0E07\u0E2B\u0E32\u0E23": +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Shanks',
    "img": "images/yasopp.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E21\u0E37\u0E2D\u0E1B\u0E37\u0E19\u0E2A\u0E31\u0E07\u0E2B\u0E32\u0E23",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "cracker",
    "name": "Charlotte Cracker",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 79,
    "effect": '"\u0E1A\u0E34\u0E2A\u0E01\u0E34\u0E15\u0E1A\u0E34\u0E2A\u0E01\u0E34\u0E15": \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E2B\u0E32\u0E23\u0E1A\u0E34\u0E2A\u0E01\u0E34\u0E15 +6 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Big Mom',
    "img": "images/cracker.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E1A\u0E34\u0E2A\u0E01\u0E34\u0E15\u0E1A\u0E34\u0E2A\u0E01\u0E34\u0E15",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "killer",
    "name": "Killer",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 79,
    "effect": '"\u0E04\u0E32\u0E21\u0E30\u0E04\u0E32\u0E21\u0E30": +8 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Kid',
    "img": "images/killer.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E04\u0E32\u0E21\u0E30\u0E04\u0E32\u0E21\u0E30",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "drake",
    "name": "X Drake",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 78,
    "effect": '"\u0E23\u0E34\u0E27\u0E23\u0E34\u0E27": \u0E44\u0E14\u0E42\u0E19\u0E40\u0E2A\u0E32\u0E23\u0E4C \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1E\u0E25\u0E31\u0E07 4 \u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E0A\u0E19\u0E30',
    "img": "images/drake.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E23\u0E34\u0E27\u0E23\u0E34\u0E27",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "vergo",
    "name": "Vergo",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 78,
    "effect": '"\u0E1A\u0E31\u0E21\u0E42\u0E1A\u0E49": \u0E40\u0E15\u0E30\u0E40\u0E2B\u0E25\u0E47\u0E01 \u0E25\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 5',
    "img": "images/vergo.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E1A\u0E31\u0E21\u0E42\u0E1A\u0E49",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "nekomamushi",
    "name": "Nekomamushi",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 78,
    "effect": '"\u0E17\u0E32\u0E1A\u0E39\u0E01\u0E34 \u0E42\u0E19\u0E30 \u0E08\u0E34\u0E19": +6 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Inuarashi',
    "img": "images/nekomamushi.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E17\u0E32\u0E1A\u0E39\u0E01\u0E34 \u0E42\u0E19\u0E30 \u0E08\u0E34\u0E19",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "inuarashi",
    "name": "Inuarashi",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 78,
    "effect": '"\u0E22\u0E31\u0E01\u0E29\u0E4C\u0E27\u0E32\u0E19\u0E23": +6 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Nekomamushi',
    "img": "images/inuarashi.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E22\u0E31\u0E01\u0E29\u0E4C\u0E27\u0E32\u0E19\u0E23",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "luckyroux",
    "name": "Lucky Roux",
    "group": "\u0E01\u0E2D\u0E07\u0E40\u0E23\u0E37\u0E2D\u0E1C\u0E21\u0E41\u0E14\u0E07",
    "pl": 78,
    "effect": '"\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27\u0E2A\u0E32\u0E22\u0E1F\u0E49\u0E32": +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Shanks',
    "img": "images/luckyroux.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27\u0E2A\u0E32\u0E22\u0E1F\u0E49\u0E32",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "hawkins",
    "name": "Basil Hawkins",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 77,
    "effect": '"\u0E27\u0E32\u0E23\u0E30\u0E2B\u0E4C": \u0E14\u0E39\u0E14\u0E27\u0E07 \u0E17\u0E33\u0E19\u0E32\u0E22 \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E14\u0E32\u0E40\u0E21\u0E08 1 \u0E04\u0E23\u0E31\u0E49\u0E07',
    "img": "images/hawkins.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E27\u0E32\u0E23\u0E30\u0E2B\u0E4C",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally",
      "passive": {
        "kind": "sturdy",
        "name": "\u0E01\u0E32\u0E22\u0E32\u0E40\u0E2B\u0E25\u0E47\u0E01",
        "desc": "\u0E23\u0E31\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 20% \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "bege",
    "name": "Capone Bege",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 77,
    "effect": '"\u0E0A\u0E34\u0E1A\u0E38\u0E0A\u0E34\u0E1A\u0E38": \u0E1B\u0E23\u0E32\u0E2A\u0E32\u0E17\u0E04\u0E19\u0E41\u0E04\u0E23\u0E30 +1 \u0E40\u0E2D\u0E1F\u0E40\u0E1F\u0E04\u0E22\u0E34\u0E07\u0E08\u0E32\u0E01\u0E43\u0E19\u0E15\u0E31\u0E27',
    "img": "images/bege.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E0A\u0E34\u0E1A\u0E38\u0E0A\u0E34\u0E1A\u0E38",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "apoo",
    "name": "Scratchmen Apoo",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 76,
    "effect": '"\u0E42\u0E2D\u0E42\u0E15\u0E30\u0E42\u0E2D\u0E42\u0E15\u0E30": \u0E23\u0E30\u0E40\u0E1A\u0E34\u0E14\u0E40\u0E2A\u0E35\u0E22\u0E07 \u0E17\u0E33\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E17\u0E38\u0E01\u0E04\u0E19\u0E40\u0E2A\u0E35\u0E22\u0E40\u0E07\u0E34\u0E19 4',
    "img": "images/apoo.png",
    "skill": {
      "kind": "sweep",
      "name": "\u0E42\u0E2D\u0E42\u0E15\u0E30\u0E42\u0E2D\u0E42\u0E15\u0E30",
      "label": "\u0E01\u0E27\u0E32\u0E14\u0E25\u0E49\u0E32\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 70% \u0E43\u0E2A\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39\u0E17\u0E38\u0E01\u0E15\u0E31\u0E27 \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.7,
      "cd": 3,
      "target": "all"
    }
  },
  {
    "id": "urouge",
    "name": "Urouge",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 76,
    "effect": '"\u0E04\u0E32\u0E21\u0E30\u0E1A\u0E32\u0E01\u0E30": \u0E22\u0E34\u0E48\u0E07\u0E40\u0E08\u0E47\u0E1A\u0E22\u0E34\u0E48\u0E07\u0E41\u0E01\u0E23\u0E48\u0E07 +3 \u0E15\u0E48\u0E2D\u0E43\u0E1A\u0E17\u0E35\u0E48\u0E41\u0E1E\u0E49\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25',
    "img": "images/urouge.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E04\u0E32\u0E21\u0E30\u0E1A\u0E32\u0E01\u0E30",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy",
      "passive": {
        "kind": "brave",
        "name": "\u0E43\u0E08\u0E2A\u0E34\u0E07\u0E2B\u0E4C",
        "desc": "\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 +25% \u0E40\u0E21\u0E37\u0E48\u0E2D HP \u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07 40%"
      }
    }
  },
  {
    "id": "smoker",
    "name": "Smoker",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 76,
    "effect": '"\u0E42\u0E21\u0E42\u0E21\u0E48": \u0E04\u0E27\u0E31\u0E19\u0E08\u0E31\u0E1A\u0E01\u0E38\u0E21 \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E02\u0E49\u0E32\u0E21\u0E23\u0E2D\u0E1A\u0E16\u0E31\u0E14\u0E44\u0E1B',
    "img": "images/smoker.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E42\u0E21\u0E42\u0E21\u0E48",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "denjiro",
    "name": "Denjiro",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 76,
    "effect": '"\u0E0B\u0E32\u0E21\u0E39\u0E44\u0E23\u0E1B\u0E25\u0E2D\u0E21\u0E15\u0E31\u0E27": \u0E02\u0E42\u0E21\u0E22\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E14\u0E39\u0E40\u0E07\u0E34\u0E19\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E17\u0E38\u0E01\u0E04\u0E19',
    "img": "images/denjiro.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E0B\u0E32\u0E21\u0E39\u0E44\u0E23\u0E1B\u0E25\u0E2D\u0E21\u0E15\u0E31\u0E27",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "perospero",
    "name": "Perospero",
    "group": "\u0E1C\u0E39\u0E49\u0E1A\u0E31\u0E0D\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E01\u0E23\u0E1E\u0E23\u0E23\u0E14\u0E34",
    "pl": 76,
    "effect": '"\u0E40\u0E1E\u0E42\u0E23\u0E40\u0E1E\u0E42\u0E23": \u0E25\u0E39\u0E01\u0E01\u0E27\u0E32\u0E14\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27 +6 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Big Mom',
    "img": "images/perospero.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E40\u0E1E\u0E42\u0E23\u0E40\u0E1E\u0E42\u0E23",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally"
    }
  },
  {
    "id": "bonney",
    "name": "Jewelry Bonney",
    "group": "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E42\u0E19\u0E27\u0E32",
    "pl": 74,
    "effect": '"\u0E42\u0E17\u0E0A\u0E34\u0E42\u0E17\u0E0A\u0E34": \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E27\u0E31\u0E22 \u0E22\u0E49\u0E2D\u0E19\u0E04\u0E37\u0E19\u0E40\u0E07\u0E34\u0E19\u0E04\u0E48\u0E32\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25 10',
    "img": "images/bonney.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E42\u0E17\u0E0A\u0E34\u0E42\u0E17\u0E0A\u0E34",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally"
    }
  },
  {
    "id": "kaku",
    "name": "Kaku",
    "group": "CP0",
    "pl": 74,
    "effect": '"\u0E04\u0E34\u0E23\u0E34\u0E19": \u0E22\u0E35\u0E23\u0E32\u0E1F\u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27 +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Rob Lucci',
    "img": "images/kaku.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E04\u0E34\u0E23\u0E34\u0E19",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "moria",
    "name": "Gecko Moria",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 74,
    "effect": '"\u0E04\u0E32\u0E40\u0E07\u0E30\u0E04\u0E32\u0E40\u0E07\u0E30": \u0E02\u0E42\u0E21\u0E22\u0E40\u0E07\u0E32 \u0E17\u0E33\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 1 \u0E04\u0E19\u0E1E\u0E25\u0E31\u0E07 -10',
    "img": "images/moria.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E04\u0E32\u0E40\u0E07\u0E30\u0E04\u0E32\u0E40\u0E07\u0E30",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "kikunojo",
    "name": "Kikunojo",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 72,
    "effect": '"\u0E14\u0E2D\u0E01\u0E44\u0E21\u0E49\u0E2B\u0E34\u0E21\u0E30": +4 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Kozuki Oden',
    "img": "images/kikunojo.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E14\u0E2D\u0E01\u0E44\u0E21\u0E49\u0E2B\u0E34\u0E21\u0E30",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "reiju",
    "name": "Vinsmoke Reiju",
    "group": "Germa 66",
    "pl": 72,
    "effect": '"\u0E1E\u0E34\u0E29": \u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07 4 \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07',
    "img": "images/reiju.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E1E\u0E34\u0E29",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "ichiji",
    "name": "Vinsmoke Ichiji",
    "group": "Germa 66",
    "pl": 72,
    "effect": '"\u0E2A\u0E1B\u0E32\u0E23\u0E4C\u0E04\u0E01\u0E34\u0E49\u0E07\u0E40\u0E23\u0E14": +6 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Sanji',
    "img": "images/ichiji.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E2A\u0E1B\u0E32\u0E23\u0E4C\u0E04\u0E01\u0E34\u0E49\u0E07\u0E40\u0E23\u0E14",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "niji",
    "name": "Vinsmoke Niji",
    "group": "Germa 66",
    "pl": 72,
    "effect": '"\u0E40\u0E14\u0E47\u0E19\u0E08\u0E34\u0E1A\u0E25\u0E39": \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27 +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Sanji',
    "img": "images/niji.png",
    "skill": {
      "kind": "snipe",
      "name": "\u0E40\u0E14\u0E47\u0E19\u0E08\u0E34\u0E1A\u0E25\u0E39",
      "label": "\u0E40\u0E25\u0E47\u0E07\u0E18\u0E19\u0E39",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 110% \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 (\u0E44\u0E21\u0E48\u0E2A\u0E19\u0E43\u0E08\u0E42\u0E25\u0E48) \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "yonji",
    "name": "Vinsmoke Yonji",
    "group": "Germa 66",
    "pl": 70,
    "effect": '"\u0E27\u0E34\u0E19\u0E0A\u0E4C\u0E01\u0E23\u0E35\u0E19": \u0E1E\u0E25\u0E31\u0E07\u0E41\u0E01\u0E23\u0E48\u0E07 +4 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Sanji',
    "img": "images/yonji.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E27\u0E34\u0E19\u0E0A\u0E4C\u0E01\u0E23\u0E35\u0E19",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "kinemon",
    "name": "Kin'emon",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 68,
    "effect": '"\u0E1F\u0E39\u0E01\u0E38\u0E1F\u0E39\u0E01\u0E38": \u0E40\u0E2A\u0E37\u0E49\u0E2D\u0E1C\u0E49\u0E32\u0E27\u0E34\u0E40\u0E28\u0E29 +4 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D\u0E27\u0E32\u0E42\u0E19\u0E30 >=2',
    "img": "images/kinemon.png",
    "skill": {
      "kind": "guard",
      "name": "\u0E1F\u0E39\u0E01\u0E38\u0E1F\u0E39\u0E01\u0E38",
      "label": "\u0E15\u0E31\u0E49\u0E07\u0E01\u0E32\u0E23\u0E4C\u0E14",
      "desc": "\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A 50% \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 (\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49) \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0,
      "cd": 3,
      "target": "ally"
    }
  },
  {
    "id": "franky",
    "name": "Franky",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 63,
    "effect": '"\u0E40\u0E08\u0E40\u0E19\u0E2D\u0E23\u0E31\u0E25\u0E41\u0E1F\u0E23\u0E07\u0E01\u0E35\u0E49": +8 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 >=4',
    "img": "images/franky.png",
    "skill": {
      "kind": "heavy",
      "name": "\u0E40\u0E08\u0E40\u0E19\u0E2D\u0E23\u0E31\u0E25\u0E41\u0E1F\u0E23\u0E07\u0E01\u0E35\u0E49",
      "label": "\u0E17\u0E48\u0E32\u0E44\u0E21\u0E49\u0E15\u0E32\u0E22",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08\u0E2B\u0E19\u0E31\u0E01 180% \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.8,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "brook",
    "name": "Brook",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 61,
    "effect": '"\u0E42\u0E22\u0E21\u0E34\u0E42\u0E22\u0E21\u0E34": \u0E2B\u0E25\u0E1A\u0E14\u0E32\u0E40\u0E21\u0E08 1 \u0E04\u0E23\u0E31\u0E49\u0E07 \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E22\u0E37\u0E19\u0E43\u0E2B\u0E21\u0E48\u0E44\u0E14\u0E49',
    "img": "images/brook.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E42\u0E22\u0E21\u0E34\u0E42\u0E22\u0E21\u0E34",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally",
      "passive": {
        "kind": "revive",
        "name": "\u0E44\u0E21\u0E48\u0E22\u0E2D\u0E21\u0E15\u0E32\u0E22",
        "desc": "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E16\u0E39\u0E01\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E2B\u0E21\u0E14\u0E2A\u0E15\u0E34 \u0E1F\u0E37\u0E49\u0E19\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E14\u0E49\u0E27\u0E22 HP 30% \u0E44\u0E14\u0E49 1 \u0E04\u0E23\u0E31\u0E49\u0E07"
      }
    }
  },
  {
    "id": "robin",
    "name": "Nico Robin",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 60,
    "effect": '"\u0E42\u0E1E\u0E40\u0E19\u0E01\u0E25\u0E35\u0E1F": \u0E14\u0E39\u0E1E\u0E25\u0E31\u0E07\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E04\u0E19\u0E01\u0E48\u0E2D\u0E19 \u0E41\u0E25\u0E49\u0E27 +8 \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07',
    "img": "images/robin.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E42\u0E1E\u0E40\u0E19\u0E01\u0E25\u0E35\u0E1F",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally"
    }
  },
  {
    "id": "momonosuke",
    "name": "Kozuki Momonosuke",
    "group": "\u0E27\u0E32\u0E42\u0E19\u0E30\u0E04\u0E38\u0E19\u0E34",
    "pl": 60,
    "effect": '"\u0E21\u0E31\u0E07\u0E01\u0E23\u0E27\u0E32\u0E42\u0E19\u0E30": +10 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Kozuki Oden',
    "img": "images/momonosuke.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E21\u0E31\u0E07\u0E01\u0E23\u0E27\u0E32\u0E42\u0E19\u0E30",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "chopper",
    "name": "Tony Tony Chopper",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 52,
    "effect": '"\u0E23\u0E31\u0E21\u0E40\u0E1A\u0E34\u0E49\u0E25": \u0E2E\u0E35\u0E25\u0E1E\u0E25\u0E31\u0E07 10 \u0E43\u0E2B\u0E49\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07 1 \u0E43\u0E1A',
    "img": "images/chopper.png",
    "skill": {
      "kind": "heal",
      "name": "\u0E23\u0E31\u0E21\u0E40\u0E1A\u0E34\u0E49\u0E25",
      "label": "\u0E2E\u0E35\u0E25",
      "desc": "\u0E1F\u0E37\u0E49\u0E19 HP \u0E43\u0E2B\u0E49\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 140% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1.4,
      "cd": 2,
      "target": "ally"
    }
  },
  {
    "id": "tashigi",
    "name": "Tashigi",
    "group": "\u0E01\u0E2D\u0E07\u0E17\u0E31\u0E1E\u0E40\u0E23\u0E37\u0E2D",
    "pl": 50,
    "effect": '"\u0E19\u0E31\u0E01\u0E14\u0E32\u0E1A\u0E2A\u0E32\u0E27": +5 \u0E16\u0E49\u0E32\u0E16\u0E37\u0E2D Smoker',
    "img": "images/tashigi.png",
    "skill": {
      "kind": "strike",
      "name": "\u0E19\u0E31\u0E01\u0E14\u0E32\u0E1A\u0E2A\u0E32\u0E27",
      "label": "\u0E42\u0E08\u0E21\u0E15\u0E35",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
      "mult": 1,
      "cd": 0,
      "target": "enemy"
    }
  },
  {
    "id": "buggy",
    "name": "Buggy",
    "group": "\u0E40\u0E08\u0E47\u0E14\u0E40\u0E17\u0E1E\u0E42\u0E08\u0E23\u0E2A\u0E25\u0E31\u0E14",
    "pl": 50,
    "effect": '"\u0E2A\u0E32\u0E22\u0E21\u0E39": \u0E02\u0E42\u0E21\u0E22\u0E1E\u0E25\u0E31\u0E07 10 \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E17\u0E35\u0E48\u0E1E\u0E25\u0E31\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E15\u0E2D\u0E19\u0E08\u0E1A',
    "img": "images/buggy.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E2A\u0E32\u0E22\u0E21\u0E39",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  },
  {
    "id": "usopp",
    "name": "Usopp",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 48,
    "effect": '"\u0E23\u0E32\u0E0A\u0E32\u0E41\u0E2B\u0E48\u0E07\u0E01\u0E32\u0E23\u0E42\u0E01\u0E2B\u0E01": \u0E2B\u0E25\u0E2D\u0E01\u0E04\u0E39\u0E48\u0E41\u0E02\u0E48\u0E07\u0E43\u0E2B\u0E49\u0E1C\u0E48\u0E32\u0E19 1 \u0E04\u0E23\u0E31\u0E49\u0E07',
    "img": "images/usopp.png",
    "skill": {
      "kind": "stun",
      "name": "\u0E23\u0E32\u0E0A\u0E32\u0E41\u0E2B\u0E48\u0E07\u0E01\u0E32\u0E23\u0E42\u0E01\u0E2B\u0E01",
      "label": "\u0E2A\u0E30\u0E01\u0E14",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 50% + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B \xB7 \u0E1E\u0E31\u0E01 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 0.5,
      "cd": 3,
      "target": "enemy"
    }
  },
  {
    "id": "nami",
    "name": "Nami",
    "group": "\u0E2B\u0E21\u0E27\u0E01\u0E1F\u0E32\u0E07",
    "pl": 45,
    "effect": '"\u0E42\u0E04\u0E42\u0E19\u0E42\u0E04\u0E42\u0E19": \u0E42\u0E08\u0E23\u0E01\u0E23\u0E23\u0E21 \u0E40\u0E01\u0E47\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21 15 \u0E40\u0E07\u0E34\u0E19\u0E15\u0E2D\u0E19\u0E2A\u0E23\u0E38\u0E1B',
    "img": "images/nami.png",
    "skill": {
      "kind": "drain",
      "name": "\u0E42\u0E04\u0E42\u0E19\u0E42\u0E04\u0E42\u0E19",
      "label": "\u0E14\u0E39\u0E14\u0E1E\u0E25\u0E31\u0E07",
      "desc": "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E41\u0E25\u0E49\u0E27\u0E2E\u0E35\u0E25\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 60% \u0E02\u0E2D\u0E07\u0E14\u0E32\u0E40\u0E21\u0E08 \xB7 \u0E1E\u0E31\u0E01 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19",
      "mult": 1,
      "cd": 2,
      "target": "enemy"
    }
  }
];

// site/worker/index.js
var STALE_MS = 45e3;
var MAX_LOG = 40;
var MAX_PLAYERS = 8;
var PING_MS = 5e3;
var CHAR_BY_ID = Object.fromEntries(ROSTER.map((c) => [c.id, c]));
var J = /* @__PURE__ */ __name((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  }
}), "J");
var ERR = /* @__PURE__ */ __name((error, status = 400) => J({ error }, status), "ERR");
var randHex = /* @__PURE__ */ __name((bytes) => [...crypto.getRandomValues(new Uint8Array(bytes))].map((x) => x.toString(16).padStart(2, "0")).join(""), "randHex");
var token = /* @__PURE__ */ __name(() => randHex(24), "token");
var pid = /* @__PURE__ */ __name(() => "p_" + randHex(6), "pid");
var CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function roomCode(len = 5) {
  const b = crypto.getRandomValues(new Uint8Array(len));
  return [...b].map((x) => CODE_ALPHABET[x % CODE_ALPHABET.length]).join("");
}
__name(roomCode, "roomCode");
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
__name(shuffle, "shuffle");
var clampInt = /* @__PURE__ */ __name((v, lo, hi) => {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n)) return null;
  return Math.min(hi, Math.max(lo, n));
}, "clampInt");
var cleanName = /* @__PURE__ */ __name((v) => String(v == null ? "" : v).trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 16), "cleanName");
function normalizeSettings(raw) {
  const r = raw && typeof raw === "object" ? raw : {};
  return {
    startingMoney: clampInt(r.startingMoney, 20, 2e3) ?? 120,
    cardCount: clampInt(r.cardCount, 3, ROSTER.length) ?? 20,
    startPrice: clampInt(r.startPrice, 1, 500) ?? 1,
    minIncrement: clampInt(r.minIncrement, 1, 100) ?? 1,
    battle: r.battle !== false
    // โหมดเอาการ์ดมาตีกันเป็นเทิร์น
  };
}
__name(normalizeSettings, "normalizeSettings");
function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
__name(sameOrigin, "sameOrigin");
async function readJson(request) {
  const text = await request.text();
  if (text.length > 4e3) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
__name(readJson, "readJson");
var schemaDone = false;
async function ensureSchema(env) {
  if (schemaDone) return;
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS rooms (
       code TEXT PRIMARY KEY,
       host_id TEXT NOT NULL,
       state TEXT NOT NULL,
       version INTEGER NOT NULL DEFAULT 1,
       created_at INTEGER NOT NULL,
       updated_at INTEGER NOT NULL
     )`
  ).run();
  schemaDone = true;
}
__name(ensureSchema, "ensureSchema");
async function readRoom(env, code) {
  const row = await env.DB.prepare(
    "SELECT code, state, version, created_at FROM rooms WHERE code = ?"
  ).bind(code).first();
  if (!row) return null;
  return {
    code: row.code,
    version: row.version,
    createdAt: row.created_at,
    state: JSON.parse(row.state)
  };
}
__name(readRoom, "readRoom");
async function mutate(env, code, fn) {
  for (let i = 0; i < 12; i++) {
    const room = await readRoom(env, code);
    if (!room) return { status: 404, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49 (\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E32\u0E08\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E1C\u0E34\u0E14)" };
    const out = fn(room) || {};
    if (out.error) return { status: out.status || 400, error: out.error };
    if (out.skip) return { room, data: out.data };
    if (out.presence) {
      const pr = await env.DB.prepare(
        "UPDATE rooms SET state = ?, updated_at = ? WHERE code = ? AND version = ?"
      ).bind(JSON.stringify(room.state), Date.now(), code, room.version).run();
      if (pr.meta && pr.meta.changes > 0) return { room, data: out.data };
      continue;
    }
    const nextV = room.version + 1;
    const r = await env.DB.prepare(
      "UPDATE rooms SET state = ?, version = ?, updated_at = ? WHERE code = ? AND version = ?"
    ).bind(JSON.stringify(room.state), nextV, Date.now(), code, room.version).run();
    if (r.meta && r.meta.changes > 0) {
      room.version = nextV;
      return { room, data: out.data };
    }
  }
  return { status: 409, error: "\u0E21\u0E35\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19 \u0E25\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07" };
}
__name(mutate, "mutate");
var pById = /* @__PURE__ */ __name((s, id) => s.players.find((p) => p.id === id) || null, "pById");
var isActive = /* @__PURE__ */ __name((s, id) => !s.passed.includes(id), "isActive");
var activePlayers = /* @__PURE__ */ __name((s) => s.players.filter((p) => isActive(s, p.id)), "activePlayers");
function pushLog(s, msg) {
  s.log.push({ ts: Date.now(), msg });
  if (s.log.length > MAX_LOG) s.log = s.log.slice(-MAX_LOG);
}
__name(pushLog, "pushLog");
var minNextBid = /* @__PURE__ */ __name((s) => s.highBid === 0 ? s.settings.startPrice : s.highBid + s.settings.minIncrement, "minNextBid");
function auctionScore(p) {
  const cards = p.cards.map((id) => CHAR_BY_ID[id]).filter(Boolean);
  const pl = cards.reduce((a, c) => a + c.pl, 0);
  const counts = {};
  for (const c of cards) counts[c.group] = (counts[c.group] || 0) + 1;
  let synergy = 0;
  const synergyDetail = [];
  for (const [g, n] of Object.entries(counts)) {
    if (n >= 3) {
      synergy += n * 5;
      synergyDetail.push(`${g} \xD7${n} = +${n * 5}`);
    }
  }
  return { cards, pl, synergy, synergyDetail };
}
__name(auctionScore, "auctionScore");
function endGame(s) {
  s.phase = "ended";
  s.current = null;
  s.turn = null;
  const b = s.battle;
  s.scores = s.players.map((p) => {
    const { cards, pl, synergy, synergyDetail } = auctionScore(p);
    const kos = b ? b.kos[p.id] || 0 : 0;
    const battle = b ? b.koPoints[p.id] || 0 : 0;
    const survivors = b ? aliveFighters(b, p.id).length : 0;
    return {
      id: p.id,
      name: p.name,
      cards,
      pl,
      synergy,
      synergyDetail,
      kos,
      survivors,
      battle,
      total: pl + synergy + battle,
      moneyLeft: p.money
    };
  }).sort((a, b2) => b2.total - a.total || b2.pl - a.pl || a.name.localeCompare(b2.name));
  const win = s.scores[0];
  pushLog(s, win ? `\u{1F3C6} \u0E08\u0E1A\u0E40\u0E01\u0E21! \u0E1C\u0E39\u0E49\u0E0A\u0E19\u0E30: ${win.name} (${win.total} \u0E04\u0E30\u0E41\u0E19\u0E19)` : "\u0E08\u0E1A\u0E40\u0E01\u0E21");
}
__name(endGame, "endGame");
var skPayloadId = /* @__PURE__ */ __name((sk) => sk === BASIC_SKILL ? "basic" : sk.kind, "skPayloadId");
var BASIC_SKILL = {
  name: "\u0E42\u0E08\u0E21\u0E15\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19",
  label: "\u0E42\u0E08\u0E21\u0E15\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19",
  kind: "strike",
  desc: "\u0E14\u0E32\u0E40\u0E21\u0E08 100% \u0E02\u0E2D\u0E07\u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 \xB7 \u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E17\u0E38\u0E01\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E25\u0E14\u0E32\u0E27\u0E19\u0E4C",
  cd: 0,
  target: "enemy",
  mult: 1
};
var KO_BASE = 10;
var WIN_BONUS = 60;
var WIN_BONUS_PER_SURVIVOR = 5;
var TIMEOUT_BONUS = 25;
var fighterHp = /* @__PURE__ */ __name((pl) => 50 + Math.round(pl * 0.8), "fighterHp");
var fighterAtk = /* @__PURE__ */ __name((pl) => 10 + Math.round(pl * 0.2), "fighterAtk");
var koPoints = /* @__PURE__ */ __name((pl) => KO_BASE + Math.floor(pl / 10), "koPoints");
var fById = /* @__PURE__ */ __name((b, pid2, cid) => b.fighters.find((f) => f.pid === pid2 && f.cid === cid) || null, "fById");
var aliveFighters = /* @__PURE__ */ __name((b, pid2) => b.fighters.filter((f) => f.alive && (pid2 == null || f.pid === pid2)), "aliveFighters");
var cardOf = /* @__PURE__ */ __name((f) => CHAR_BY_ID[f.cid], "cardOf");
function effAtk(f) {
  let atk = f.atk;
  if (f.buff > 0) atk = Math.round(atk * 1.4);
  if (f.passive === "brave" && f.hp <= f.maxHp * 0.4) atk = Math.round(atk * 1.25);
  return atk;
}
__name(effAtk, "effAtk");
function startBattle(s) {
  const b = {
    fighters: [],
    order: [],
    idx: -1,
    turns: 0,
    maxTurns: 0,
    kos: {},
    koPoints: {},
    result: null
  };
  for (const p of s.players) {
    b.kos[p.id] = 0;
    b.koPoints[p.id] = 0;
    for (const cid of p.cards) {
      const c = CHAR_BY_ID[cid];
      if (!c) continue;
      b.fighters.push({
        pid: p.id,
        cid,
        hp: fighterHp(c.pl),
        maxHp: fighterHp(c.pl),
        atk: fighterAtk(c.pl),
        alive: true,
        buff: 0,
        shield: 0,
        stun: 0,
        burn: 0,
        burnDmg: 0,
        cds: {},
        passive: c.skill && c.skill.passive ? c.skill.passive.kind : null,
        passiveUsed: false
      });
    }
    if (p.cards.length) b.order.push(p.id);
    else pushLog(s, `${p.name} \u0E44\u0E21\u0E48\u0E21\u0E35\u0E15\u0E31\u0E27\u0E25\u0E30\u0E04\u0E23\u0E43\u0E19\u0E17\u0E35\u0E21 \u2014 \u0E19\u0E31\u0E48\u0E07\u0E14\u0E39\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E2A\u0E39\u0E49`);
  }
  s.battle = b;
  s.phase = "battle";
  b.maxTurns = Math.max(12, b.order.length * 12);
  pushLog(
    s,
    `\u2694\uFE0F \u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49! ${b.fighters.length} \u0E15\u0E31\u0E27\u0E25\u0E07\u0E2A\u0E19\u0E32\u0E21 \xB7 KO 1 \u0E15\u0E31\u0E27 = ${KO_BASE}+\u0E04\u0E30\u0E41\u0E19\u0E19 \xB7 \u0E1C\u0E39\u0E49\u0E23\u0E2D\u0E14\u0E04\u0E19\u0E2A\u0E38\u0E14\u0E17\u0E49\u0E32\u0E22 +${WIN_BONUS}`
  );
  if (b.order.length === 0) return endBattle(s, "nofighter");
  if (b.order.length === 1) {
    pushLog(s, `\u{1F3C5} ${pById(s, b.order[0]).name} \u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E2D\u0E14\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E04\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27`);
    return endBattle(s, "walkover");
  }
  advanceBattle(s);
}
__name(startBattle, "startBattle");
function battleRoundStart(s) {
  const b = s.battle;
  for (const f of b.fighters) {
    for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k] -= 1;
  }
  for (const f of b.fighters) {
    if (!f.alive) continue;
    if (f.burn > 0) {
      f.burn -= 1;
      const dmg = f.burnDmg;
      f.hp = Math.max(0, f.hp - dmg);
      pushLog(s, `\u{1F525} ${cardOf(f).name} \u0E02\u0E2D\u0E07 ${pById(s, f.pid).name} \u0E16\u0E39\u0E01\u0E44\u0E1F\u0E44\u0E2B\u0E21\u0E49 ${dmg} (\u0E40\u0E2B\u0E25\u0E37\u0E2D ${f.hp})`);
      if (f.hp === 0) killFighter(s, null, f);
    }
    if (f.buff > 0) f.buff -= 1;
    if (f.shield > 0) f.shield -= 1;
  }
}
__name(battleRoundStart, "battleRoundStart");
function checkBattleEnd(s) {
  const b = s.battle;
  if (!b || b.result) return true;
  const standing = b.order.filter((pid2) => aliveFighters(b, pid2).length > 0);
  if (standing.length <= 1) {
    endBattle(s, standing.length === 1 ? "knockout" : "wipeout");
    return true;
  }
  return false;
}
__name(checkBattleEnd, "checkBattleEnd");
function advanceBattle(s) {
  const b = s.battle;
  if (!b || b.result) return;
  for (let guard = 0; guard < 400; guard++) {
    b.idx += 1;
    if (b.idx >= b.order.length) {
      b.idx = 0;
      battleRoundStart(s);
      if (checkBattleEnd(s)) return;
    }
    const pid2 = b.order[b.idx];
    const mine = aliveFighters(b, pid2);
    if (!mine.length) continue;
    if (mine.every((f) => f.stun > 0)) {
      for (const f of mine) if (f.stun > 0) f.stun -= 1;
      pushLog(s, `\u{1F4A4} ${pById(s, pid2).name} \u0E16\u0E39\u0E01\u0E2A\u0E30\u0E01\u0E14\u0E17\u0E31\u0E49\u0E07\u0E17\u0E35\u0E21 \u2014 \u0E02\u0E49\u0E32\u0E21\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19`);
      continue;
    }
    b.turns += 1;
    if (b.turns > b.maxTurns) {
      endBattle(s, "timeout");
      return;
    }
    return;
  }
  endBattle(s, "stuck");
}
__name(advanceBattle, "advanceBattle");
function endBattle(s, reason) {
  const b = s.battle;
  if (!b || b.result) return;
  const standing = b.order.filter((pid2) => aliveFighters(b, pid2).length > 0);
  let winnerPid = null;
  let bonus = 0;
  if (standing.length === 1) {
    winnerPid = standing[0];
    bonus = WIN_BONUS + WIN_BONUS_PER_SURVIVOR * aliveFighters(b, winnerPid).length;
  } else if (standing.length > 1) {
    const ranked = [...standing].sort((a, c) => {
      const da = aliveFighters(b, a).length;
      const dc = aliveFighters(b, c).length;
      if (dc !== da) return dc - da;
      const ha = aliveFighters(b, a).reduce((n, f) => n + f.hp, 0);
      const hc = aliveFighters(b, c).reduce((n, f) => n + f.hp, 0);
      return hc - ha;
    });
    winnerPid = ranked[0];
    bonus = TIMEOUT_BONUS;
  }
  if (winnerPid) b.koPoints[winnerPid] = (b.koPoints[winnerPid] || 0) + bonus;
  b.result = {
    winnerPid,
    winnerName: winnerPid ? pById(s, winnerPid).name : null,
    reason,
    bonus,
    timeout: reason === "timeout" || reason === "stuck"
  };
  b.idx = -1;
  if (winnerPid)
    pushLog(
      s,
      `\u{1F947} \u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49 \u2014 ${b.result.winnerName} \u0E0A\u0E19\u0E30\u0E2A\u0E07\u0E04\u0E23\u0E32\u0E21${b.result.timeout ? " (\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32 \u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E08\u0E32\u0E01\u0E15\u0E31\u0E27\u0E17\u0E35\u0E48\u0E23\u0E2D\u0E14)" : ""} +${bonus} \u0E04\u0E30\u0E41\u0E19\u0E19`
    );
  else pushLog(s, "\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49\u0E08\u0E1A\u0E25\u0E07\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E0A\u0E19\u0E30");
  endGame(s);
}
__name(endBattle, "endBattle");
function killFighter(s, killer, f) {
  const b = s.battle;
  const c = cardOf(f);
  const owner = pById(s, f.pid).name;
  if (f.passive === "revive" && !f.passiveUsed) {
    f.passiveUsed = true;
    f.hp = Math.max(1, Math.round(f.maxHp * 0.3));
    f.alive = true;
    pushLog(s, `\u2728 ${c.name} \u0E02\u0E2D\u0E07 ${owner} \u0E25\u0E38\u0E01\u0E02\u0E36\u0E49\u0E19\u0E21\u0E32\u0E22\u0E37\u0E19\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07! (HP ${f.hp})`);
    return;
  }
  f.alive = false;
  f.hp = 0;
  pushLog(s, `\u{1F480} ${c.name} \u0E02\u0E2D\u0E07 ${owner} \u0E2B\u0E21\u0E14\u0E2A\u0E15\u0E34`);
  if (killer && killer.pid !== f.pid) {
    const pts = koPoints(c.pl);
    b.kos[killer.pid] = (b.kos[killer.pid] || 0) + 1;
    b.koPoints[killer.pid] = (b.koPoints[killer.pid] || 0) + pts;
    pushLog(s, `\u{1F3C5} ${pById(s, killer.pid).name} \u0E25\u0E49\u0E21\u0E44\u0E14\u0E49 ${c.name} \u2192 +${pts} \u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E07\u0E04\u0E23\u0E32\u0E21`);
  }
}
__name(killFighter, "killFighter");
function applyDamage(s, attacker, target, raw, opts = {}) {
  let dmg = Math.max(1, Math.round(raw));
  const blocked = target.shield > 0 && !opts.ignoreShield;
  if (blocked) dmg = Math.max(1, Math.ceil(dmg * 0.5));
  if (target.passive === "sturdy") dmg = Math.max(1, Math.ceil(dmg * 0.8));
  target.hp = Math.max(0, target.hp - dmg);
  if (target.hp === 0) killFighter(s, attacker, target);
  return { dmg, blocked };
}
__name(applyDamage, "applyDamage");
function pickTarget(s, player, sk, payload) {
  const b = s.battle;
  if (sk.target === "self") return null;
  const t = fById(b, payload.targetPid, payload.target);
  if (!t || !t.alive) return { error: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E2A\u0E19\u0E32\u0E21\u0E14\u0E49\u0E27\u0E22" };
  if (sk.target === "enemy" && t.pid === player.id) return { error: "\u0E2A\u0E01\u0E34\u0E25\u0E19\u0E35\u0E49\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E25\u0E47\u0E07\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E28\u0E31\u0E15\u0E23\u0E39" };
  if (sk.target === "ally" && t.pid !== player.id)
    return { error: "\u0E2A\u0E01\u0E34\u0E25\u0E19\u0E35\u0E49\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E01\u0E31\u0E1A\u0E17\u0E35\u0E21\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19" };
  return { target: t };
}
__name(pickTarget, "pickTarget");
function resolveFight(s, player, payload) {
  const b = s.battle;
  if (!b || b.result) return { error: "\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49\u0E08\u0E1A\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27" };
  if (b.order[b.idx] !== player.id) return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13" };
  const mine = fById(b, player.id, payload.fighter);
  if (!mine || !mine.alive) return { error: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E17\u0E35\u0E48\u0E08\u0E30\u0E2D\u0E2D\u0E01\u0E42\u0E23\u0E07\u0E01\u0E48\u0E2D\u0E19" };
  const c = cardOf(mine);
  const isBasic = payload.skill === "basic";
  const sk = isBasic ? BASIC_SKILL : c.skill;
  if (!isBasic && payload.skill && payload.skill !== c.skill.kind)
    return { error: `${c.name} \u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E01\u0E34\u0E25\u0E19\u0E31\u0E49\u0E19` };
  const cdLeft = isBasic ? 0 : mine.cds[c.skill.kind] || 0;
  if (cdLeft > 0) return { error: `${c.skill.label} \u0E22\u0E31\u0E07\u0E1E\u0E31\u0E01\u0E2D\u0E35\u0E01 ${cdLeft} \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19` };
  const who = `${c.name} (${player.name})`;
  const atk = effAtk(mine);
  let picked = null;
  if (sk.target !== "self" && sk.kind !== "sweep") {
    picked = pickTarget(s, player, sk, payload);
    if (picked.error) return picked;
  }
  const t = picked ? picked.target : null;
  switch (sk.kind) {
    case "strike":
    case "heavy": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      pushLog(
        s,
        `\u2694\uFE0F ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg}${r.blocked ? " (\u0E15\u0E34\u0E14\u0E40\u0E01\u0E23\u0E32\u0E30)" : ""} (\u0E40\u0E2B\u0E25\u0E37\u0E2D ${t.hp})`
      );
      break;
    }
    case "snipe": {
      const r = applyDamage(s, mine, t, atk * sk.mult, { ignoreShield: true });
      pushLog(s, `\u{1F3F9} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u0E17\u0E30\u0E25\u0E38\u0E40\u0E01\u0E23\u0E32\u0E30 \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg} (\u0E40\u0E2B\u0E25\u0E37\u0E2D ${t.hp})`);
      break;
    }
    case "execute": {
      const low = t.hp <= t.maxHp * 0.35;
      const r = applyDamage(s, mine, t, atk * sk.mult * (low ? 2 : 1));
      pushLog(
        s,
        `\u2620\uFE0F ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D${low ? " \u0E40\u0E02\u0E49\u0E32\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E1B\u0E23\u0E30\u0E2B\u0E32\u0E23!" : ""} \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg} (\u0E40\u0E2B\u0E25\u0E37\u0E2D ${t.hp})`
      );
      break;
    }
    case "drain": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      const heal = Math.round(r.dmg * 0.6);
      const before = mine.hp;
      mine.hp = Math.min(mine.maxHp, mine.hp + heal);
      pushLog(
        s,
        `\u{1FA78} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg} \xB7 \u0E14\u0E39\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14\u0E04\u0E37\u0E19 ${mine.hp - before} (\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07 ${mine.hp})`
      );
      break;
    }
    case "burn": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      t.burn = 3;
      t.burnDmg = Math.max(3, Math.round(atk * 0.4));
      pushLog(
        s,
        `\u{1F525} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg}${t.alive ? ` + \u0E15\u0E34\u0E14\u0E44\u0E1F ${t.burnDmg}/\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19 3 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19` : ""}`
      );
      break;
    }
    case "stun": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      if (t.alive) t.stun = 1;
      pushLog(
        s,
        `\u{1F4A4} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 ${cardOf(t).name} \u0E42\u0E14\u0E19 ${r.dmg}${t.alive ? " + \u0E16\u0E39\u0E01\u0E2A\u0E30\u0E01\u0E14 1 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19" : ""}`
      );
      break;
    }
    case "sweep": {
      const enemies = aliveFighters(b).filter((f) => f.pid !== player.id);
      let total = 0;
      for (const e of enemies) total += applyDamage(s, mine, e, atk * sk.mult).dmg;
      pushLog(s, `\u{1F30A} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u0E01\u0E27\u0E32\u0E14 ${enemies.length} \u0E15\u0E31\u0E27 \u0E23\u0E27\u0E21 ${total} \u0E14\u0E32\u0E40\u0E21\u0E08`);
      break;
    }
    case "heal": {
      const amount = Math.round(atk * sk.mult);
      const before = t.hp;
      t.hp = Math.min(t.maxHp, t.hp + amount);
      pushLog(
        s,
        `\u{1F49A} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 \u0E1F\u0E37\u0E49\u0E19 ${t.hp - before} HP \u0E43\u0E2B\u0E49 ${cardOf(t).name} (${t.hp}/${t.maxHp})`
      );
      break;
    }
    case "rally": {
      mine.buff = 2;
      pushLog(s, `\u{1F4E3} ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 \u0E1E\u0E25\u0E31\u0E07\u0E42\u0E08\u0E21\u0E15\u0E35 +40% (${effAtk(mine)}) \u0E19\u0E32\u0E19 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19`);
      break;
    }
    case "guard": {
      t.shield = 2;
      pushLog(s, `\u{1F6E1}\uFE0F ${who} \u0E43\u0E0A\u0E49 \u201C${sk.name}\u201D \u2192 ${cardOf(t).name} \u0E15\u0E34\u0E14\u0E40\u0E01\u0E23\u0E32\u0E30\u0E25\u0E14\u0E14\u0E32\u0E40\u0E21\u0E08 50% 2 \u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19`);
      break;
    }
    default:
      return { error: "\u0E2A\u0E01\u0E34\u0E25\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" };
  }
  if (!isBasic && sk.cd > 0) mine.cds[sk.kind] = sk.cd;
  if (checkBattleEnd(s)) return { data: { ok: true } };
  advanceBattle(s);
  return { data: { ok: true } };
}
__name(resolveFight, "resolveFight");
function botAction(s) {
  const b = s.battle;
  if (!b || b.result) return null;
  const player = pById(s, b.order[b.idx]);
  if (!player) return null;
  const mine = aliveFighters(b, player.id);
  const enemies = aliveFighters(b).filter((f2) => f2.pid !== player.id);
  if (!mine.length || !enemies.length) return null;
  const ready = /* @__PURE__ */ __name((f2, sk2) => (f2.cds[sk2.kind] || 0) === 0, "ready");
  const weakest = [...enemies].sort((a, c) => a.hp - c.hp)[0];
  const hurt = [...mine].sort((a, c) => a.hp / a.maxHp - c.hp / c.maxHp)[0];
  if (hurt.hp < hurt.maxHp * 0.5) {
    const healer = mine.find((f2) => {
      const sk2 = cardOf(f2).skill;
      return sk2.kind === "heal" && ready(f2, sk2);
    });
    if (healer) return { fighter: healer.cid, skill: "heal", targetPid: player.id, target: hurt.cid };
  }
  let best = null;
  let bestScore = -1;
  for (const f2 of mine) {
    const own = cardOf(f2).skill;
    const options = [BASIC_SKILL];
    if (ready(f2, own)) options.push(own);
    for (const sk2 of options) {
      let mult = sk2.mult;
      if (sk2.kind === "sweep") mult = 0.7 * Math.min(3, enemies.length);
      else if (sk2.kind === "rally" || sk2.kind === "guard") mult = 0.35;
      if (sk2.kind === "execute" && weakest.hp <= weakest.maxHp * 0.35) mult *= 2;
      let score = effAtk(f2) * mult;
      if (sk2.kind === "heal") score = 0.4 * effAtk(f2);
      if (score > bestScore) {
        bestScore = score;
        best = { f: f2, sk: sk2 };
      }
    }
  }
  const chosen = best || { f: mine[0], sk: BASIC_SKILL };
  const { f, sk } = chosen;
  const id = skPayloadId(sk);
  if (sk.kind === "sweep") return { fighter: f.cid, skill: id };
  if (sk.target === "enemy")
    return { fighter: f.cid, skill: id, targetPid: weakest.pid, target: weakest.cid };
  if (sk.target === "ally")
    return { fighter: f.cid, skill: id, targetPid: player.id, target: (hurt || f).cid };
  return { fighter: f.cid, skill: id };
}
__name(botAction, "botAction");
function beginRound(s) {
  s.current = null;
  while (s.deck.length) {
    const id = s.deck.shift();
    s.round += 1;
    s.highBid = 0;
    s.highBidder = null;
    const min = s.settings.startPrice;
    s.passed = s.players.filter((p) => p.money < min).map((p) => p.id);
    for (const p of s.players) {
      if (s.passed.includes(p.id)) pushLog(s, `${p.name} \u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E07\u0E34\u0E19\u0E1E\u0E2D \u2014 \u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34`);
    }
    if (activePlayers(s).length === 0) {
      s.discard.push(id);
      pushLog(s, `\u0E44\u0E21\u0E48\u0E21\u0E35\u0E43\u0E04\u0E23\u0E2A\u0E39\u0E49\u0E23\u0E32\u0E04\u0E32\u0E44\u0E14\u0E49 \u2014 ${CHAR_BY_ID[id].name} \u0E40\u0E02\u0E49\u0E32\u0E01\u0E2D\u0E07\u0E01\u0E25\u0E32\u0E07`);
      continue;
    }
    s.current = id;
    const startIdx = (s.round - 1) % s.players.length;
    let turn = null;
    for (let k = 0; k < s.players.length; k++) {
      const p = s.players[(startIdx + k) % s.players.length];
      if (isActive(s, p.id)) {
        turn = p.id;
        break;
      }
    }
    s.turn = turn;
    pushLog(
      s,
      `\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25: ${CHAR_BY_ID[id].name} (PL ${CHAR_BY_ID[id].pl}) \u2014 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E17\u0E35\u0E48 ${turn ? pById(s, turn).name : "-"}`
    );
    return true;
  }
  if (s.settings.battle) {
    pushLog(s, "\u{1F3B4} \u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E43\u0E1A\u0E41\u0E25\u0E49\u0E27 \u2014 \u0E15\u0E48\u0E2D\u0E44\u0E1B\u0E04\u0E37\u0E2D\u0E14\u0E48\u0E32\u0E19\u0E40\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E21\u0E32\u0E15\u0E35\u0E01\u0E31\u0E19!");
    startBattle(s);
  } else {
    endGame(s);
  }
  return false;
}
__name(beginRound, "beginRound");
function settle(s) {
  const id = s.current;
  const active = activePlayers(s);
  if (active.length === 1 && s.highBidder) {
    const winner = pById(s, s.highBidder);
    winner.money -= s.highBid;
    winner.cards.push(id);
    pushLog(
      s,
      `\u2705 ${winner.name} \u0E0A\u0E19\u0E30\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25 ${CHAR_BY_ID[id].name} \u0E17\u0E35\u0E48\u0E23\u0E32\u0E04\u0E32 ${s.highBid} (\u0E40\u0E2B\u0E25\u0E37\u0E2D ${winner.money})`
    );
  } else {
    s.discard.push(id);
    pushLog(s, `\u0E44\u0E21\u0E48\u0E21\u0E35\u0E43\u0E04\u0E23\u0E1A\u0E34\u0E14 \u2014 ${CHAR_BY_ID[id].name} \u0E40\u0E02\u0E49\u0E32\u0E01\u0E2D\u0E07\u0E01\u0E25\u0E32\u0E07`);
  }
  beginRound(s);
}
__name(settle, "settle");
function afterChange(s) {
  const min = minNextBid(s);
  for (const p of s.players) {
    if (!isActive(s, p.id)) continue;
    if (s.highBidder === p.id) continue;
    if (p.money < min) {
      s.passed.push(p.id);
      pushLog(s, `${p.name} \u0E1C\u0E48\u0E32\u0E19 (\u0E40\u0E07\u0E34\u0E19\u0E44\u0E21\u0E48\u0E1E\u0E2D\u0E2A\u0E39\u0E49)`);
    }
  }
  const active = activePlayers(s);
  if (active.length === 0) {
    settle(s);
    return;
  }
  if (active.length === 1) {
    if (s.highBidder) {
      settle(s);
      return;
    }
    s.turn = active[0].id;
    return;
  }
  const idx = s.players.findIndex((p) => p.id === s.turn);
  for (let k = 1; k <= s.players.length; k++) {
    const p = s.players[(idx + k) % s.players.length];
    if (isActive(s, p.id)) {
      s.turn = p.id;
      return;
    }
  }
  settle(s);
}
__name(afterChange, "afterChange");
function doPass(s, player) {
  if (!s.passed.includes(player.id)) s.passed.push(player.id);
  pushLog(s, `\u{1F645} ${player.name} \u0E1C\u0E48\u0E32\u0E19`);
  afterChange(s);
}
__name(doPass, "doPass");
function tick(s) {
  if (s.phase === "battle" && s.battle && !s.battle.result) {
    const pid2 = s.battle.order[s.battle.idx];
    const bp = pid2 ? pById(s, pid2) : null;
    if (!bp) return false;
    if (Date.now() - (bp.lastSeen || 0) > STALE_MS) {
      const a = botAction(s);
      pushLog(s, `\u23F1\uFE0F ${bp.name} \u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E2A\u0E19\u0E2D\u0E07 \u2014 \u0E1A\u0E2D\u0E17\u0E40\u0E25\u0E48\u0E19\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E19\u0E35\u0E49\u0E43\u0E2B\u0E49`);
      if (a) resolveFight(s, bp, a);
      else advanceBattle(s);
      return true;
    }
    return false;
  }
  if (s.phase !== "auction" || !s.turn || !s.current) return false;
  const p = pById(s, s.turn);
  if (!p) return false;
  if (Date.now() - (p.lastSeen || 0) > STALE_MS) {
    if (s.highBidder === p.id && s.highBid > 0) {
      settle(s);
      pushLog(s, `\u23F1\uFE0F ${p.name} \u0E2B\u0E25\u0E38\u0E14\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D \u2014 \u0E1B\u0E34\u0E14\u0E23\u0E2D\u0E1A`);
      return true;
    }
    pushLog(s, `\u23F1\uFE0F ${p.name} \u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E2A\u0E19\u0E2D\u0E07 \u0E16\u0E39\u0E01\u0E02\u0E49\u0E32\u0E21\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34`);
    doPass(s, p);
    return true;
  }
  return false;
}
__name(tick, "tick");
function doAction(s, player, action) {
  const type = action && action.type;
  const payload = action && action.payload || {};
  const hostOnly = player.id === s.hostId;
  switch (type) {
    case "settings": {
      if (!hostOnly) return { error: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07" };
      if (s.phase !== "lobby") return { error: "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E15\u0E2D\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E23\u0E2D" };
      const st = s.settings;
      const sm = clampInt(payload.startingMoney, 20, 2e3);
      const cc = clampInt(payload.cardCount, 3, ROSTER.length);
      const sp = clampInt(payload.startPrice, 1, 500);
      const mi = clampInt(payload.minIncrement, 1, 100);
      if (sm) st.startingMoney = sm;
      if (cc) st.cardCount = cc;
      if (sp) st.startPrice = sp;
      if (mi) st.minIncrement = mi;
      if (typeof payload.battle === "boolean") st.battle = payload.battle;
      s.players.forEach((p) => p.money = st.startingMoney);
      return { data: { ok: true } };
    }
    case "start": {
      if (!hostOnly) return { error: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07" };
      if (s.phase !== "lobby") return { error: "\u0E40\u0E01\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27" };
      if (s.players.length < 2) return { error: "\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 2 \u0E04\u0E19" };
      s.players.forEach((p) => {
        p.cards = [];
        p.money = s.settings.startingMoney;
      });
      s.deck = shuffle(ROSTER.map((c) => c.id)).slice(0, s.settings.cardCount);
      s.discard = [];
      s.log = [];
      s.round = 0;
      s.current = null;
      s.highBid = 0;
      s.highBidder = null;
      s.passed = [];
      s.scores = null;
      s.battle = null;
      s.phase = "auction";
      pushLog(
        s,
        `\u{1F6A9} \u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E01\u0E21! \u0E40\u0E07\u0E34\u0E19\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19 ${s.settings.startingMoney} \xB7 ${s.deck.length} \u0E15\u0E31\u0E27\u0E25\u0E30\u0E04\u0E23 \xB7 \u0E40\u0E1B\u0E34\u0E14\u0E23\u0E32\u0E04\u0E32 ${s.settings.startPrice} \u0E17\u0E1A\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E30 ${s.settings.minIncrement}`
      );
      pushLog(
        s,
        s.settings.battle ? "\u2694\uFE0F \u0E42\u0E2B\u0E21\u0E14\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49: \u0E40\u0E1B\u0E34\u0E14 \u2014 \u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E04\u0E19\u0E08\u0E30\u0E40\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E4C\u0E14\u0E21\u0E32\u0E15\u0E35\u0E01\u0E31\u0E19\u0E41\u0E1A\u0E1A\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E40\u0E1A\u0E2A" : "\u0E42\u0E2B\u0E21\u0E14\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49: \u0E1B\u0E34\u0E14 \u2014 \u0E08\u0E1A\u0E40\u0E01\u0E21\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25"
      );
      beginRound(s);
      return { data: { ok: true } };
    }
    case "reset": {
      if (!hostOnly) return { error: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07" };
      s.phase = "lobby";
      s.deck = [];
      s.discard = [];
      s.current = null;
      s.highBid = 0;
      s.highBidder = null;
      s.passed = [];
      s.turn = null;
      s.scores = null;
      s.battle = null;
      s.log = [];
      s.players.forEach((p) => {
        p.cards = [];
        p.money = s.settings.startingMoney;
      });
      pushLog(s, "\u21A9\uFE0F \u0E01\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E2B\u0E49\u0E2D\u0E07\u0E23\u0E2D \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E25\u0E48\u0E19\u0E43\u0E2B\u0E21\u0E48");
      return { data: { ok: true } };
    }
    case "bid": {
      if (s.phase !== "auction") return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25" };
      if (s.turn !== player.id) return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13" };
      const amount = Math.floor(Number(payload.amount));
      const min = minNextBid(s);
      if (!Number.isFinite(amount) || amount < min)
        return { error: `\u0E15\u0E49\u0E2D\u0E07\u0E1A\u0E34\u0E14\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 ${min}` };
      if (amount > player.money) return { error: `\u0E40\u0E07\u0E34\u0E19\u0E44\u0E21\u0E48\u0E1E\u0E2D (\u0E21\u0E35 ${player.money})` };
      s.highBid = amount;
      s.highBidder = player.id;
      pushLog(s, `\u{1F4B0} ${player.name} \u0E1A\u0E34\u0E14 ${amount}`);
      afterChange(s);
      return { data: { ok: true } };
    }
    case "pass": {
      if (s.phase !== "auction") return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E39\u0E25" };
      if (s.turn !== player.id) return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13" };
      if (s.highBidder === player.id && s.highBid > 0)
        return { error: "\u0E04\u0E38\u0E13\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E1A\u0E34\u0E14\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E2D\u0E22\u0E39\u0E48 \u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" };
      doPass(s, player);
      return { data: { ok: true } };
    }
    case "fight": {
      if (s.phase !== "battle") return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E0A\u0E48\u0E27\u0E07\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49\u0E01\u0E32\u0E23\u0E4C\u0E14" };
      return resolveFight(s, player, payload);
    }
    case "autoplay": {
      if (s.phase !== "battle" || !s.battle || s.battle.result)
        return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E0A\u0E48\u0E27\u0E07\u0E15\u0E48\u0E2D\u0E2A\u0E39\u0E49\u0E01\u0E32\u0E23\u0E4C\u0E14" };
      if (s.battle.order[s.battle.idx] !== player.id) return { error: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E17\u0E34\u0E23\u0E4C\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13" };
      const auto = botAction(s);
      if (!auto) return { error: "\u0E22\u0E31\u0E07\u0E40\u0E25\u0E48\u0E19\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" };
      return resolveFight(s, player, auto);
    }
    case "kick": {
      if (!hostOnly) return { error: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07" };
      if (s.phase !== "lobby") return { error: "\u0E40\u0E15\u0E30\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E23\u0E2D" };
      const target = payload.playerId;
      if (target === s.hostId) return { error: "\u0E40\u0E15\u0E30\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" };
      const before = s.players.length;
      s.players = s.players.filter((p) => p.id !== target);
      if (s.players.length === before) return { error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E04\u0E19\u0E19\u0E35\u0E49" };
      pushLog(s, "\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E16\u0E39\u0E01\u0E19\u0E33\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E2B\u0E49\u0E2D\u0E07");
      return { data: { ok: true } };
    }
    case "ping":
      return { skip: true, data: { ok: true } };
    default:
      return { error: "\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E19\u0E35\u0E49" };
  }
}
__name(doAction, "doAction");
function battlePublic(s) {
  const b = s.battle;
  if (!b) return null;
  const turnPid = !b.result && b.idx >= 0 ? b.order[b.idx] : null;
  return {
    basic: BASIC_SKILL,
    turn: turnPid,
    turnName: turnPid ? pById(s, turnPid).name : null,
    turns: b.turns,
    maxTurns: b.maxTurns,
    result: b.result,
    order: b.order.map((pid2) => ({
      pid: pid2,
      name: pById(s, pid2).name,
      kos: b.kos[pid2] || 0,
      points: b.koPoints[pid2] || 0,
      alive: aliveFighters(b, pid2).length
    })),
    fighters: b.fighters.map((f) => {
      const c = cardOf(f);
      const p = pById(s, f.pid);
      return {
        cid: f.cid,
        pid: f.pid,
        owner: p.name,
        name: c.name,
        img: c.img,
        group: c.group,
        pl: c.pl,
        hp: f.hp,
        maxHp: f.maxHp,
        atk: f.atk,
        effAtk: effAtk(f),
        alive: f.alive,
        shield: f.shield,
        buff: f.buff,
        stun: f.stun,
        burn: f.burn,
        burnDmg: f.burnDmg,
        cd: f.cds[c.skill.kind] || 0,
        passive: c.skill.passive || null,
        passiveUsed: !!f.passiveUsed,
        skill: {
          name: c.skill.name,
          label: c.skill.label,
          kind: c.skill.kind,
          desc: c.skill.desc,
          cd: c.skill.cd,
          target: c.skill.target,
          mult: c.skill.mult
        }
      };
    })
  };
}
__name(battlePublic, "battlePublic");
function publicState(room, meId) {
  const s = room.state;
  return {
    version: room.version,
    phase: s.phase,
    hostId: s.hostId,
    settings: s.settings,
    round: s.round,
    remaining: s.deck.length,
    current: s.current ? CHAR_BY_ID[s.current] : null,
    highBid: s.highBid,
    highBidder: s.highBidder,
    highBidderName: s.highBidder && pById(s, s.highBidder) ? pById(s, s.highBidder).name : null,
    turn: s.turn,
    turnName: s.turn && pById(s, s.turn) ? pById(s, s.turn).name : null,
    minNext: s.current ? minNextBid(s) : null,
    players: s.players.map((p) => ({
      id: p.id,
      name: p.name,
      money: p.money,
      isHost: p.id === s.hostId,
      online: Date.now() - (p.lastSeen || 0) < STALE_MS,
      passed: s.passed.includes(p.id),
      cards: p.cards.map((id) => CHAR_BY_ID[id]).filter(Boolean)
    })),
    discard: s.discard.map((id) => CHAR_BY_ID[id]).filter(Boolean),
    log: s.log.slice(-25),
    scores: s.scores,
    battle: battlePublic(s),
    me: meId ? { id: meId, isHost: meId === s.hostId } : null
  };
}
__name(publicState, "publicState");
function newRoomState(name, settings) {
  const hostId = pid();
  const hostToken = token();
  const state = {
    hostId,
    settings,
    phase: "lobby",
    players: [
      {
        id: hostId,
        name,
        token: hostToken,
        money: settings.startingMoney,
        cards: [],
        lastSeen: Date.now(),
        joinedAt: Date.now()
      }
    ],
    deck: [],
    discard: [],
    current: null,
    highBid: 0,
    highBidder: null,
    passed: [],
    turn: null,
    round: 0,
    log: [],
    scores: null,
    battle: null
  };
  pushLog(state, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27 \u2014 \u0E23\u0E2D\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19\u0E40\u0E02\u0E49\u0E32\u0E2B\u0E49\u0E2D\u0E07 (${name} \u0E40\u0E1B\u0E47\u0E19\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07)`);
  return { hostId, hostToken, state };
}
__name(newRoomState, "newRoomState");
async function handleApi(request, env, url) {
  const seg = url.pathname.split("/").filter(Boolean);
  if (seg[1] === "health") return J({ ok: true, cards: ROSTER.length });
  if (seg[1] !== "rooms") return ERR("\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01\u0E40\u0E2A\u0E49\u0E19\u0E17\u0E32\u0E07\u0E19\u0E35\u0E49", 404);
  if (seg.length === 2) {
    const body = await readJson(request);
    if (!body) return ERR("\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
    const name = cleanName(body.name) || "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07";
    const settings = normalizeSettings(body.settings);
    const { hostId, hostToken, state } = newRoomState(name, settings);
    for (let i = 0; i < 8; i++) {
      const code2 = roomCode();
      const exists = await env.DB.prepare("SELECT 1 FROM rooms WHERE code = ?").bind(code2).first();
      if (exists) continue;
      await env.DB.prepare(
        "INSERT INTO rooms (code, host_id, state, version, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)"
      ).bind(code2, hostId, JSON.stringify(state), Date.now(), Date.now()).run();
      const room = { code: code2, version: 1, state };
      return J({ code: code2, playerId: hostId, token: hostToken, state: publicState(room, hostId) });
    }
    return ERR("\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E2B\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07", 500);
  }
  const code = (seg[2] || "").toUpperCase();
  const op = seg[3];
  if (!/^[A-Z0-9]{4,8}$/.test(code)) return ERR("\u0E23\u0E2B\u0E31\u0E2A\u0E2B\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
  if (op === "join") {
    const body = await readJson(request);
    if (!body) return ERR("\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
    const name = cleanName(body.name) || "\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19";
    const res = await mutate(env, code, (room) => {
      const s = room.state;
      if (s.phase !== "lobby")
        return { status: 409, error: "\u0E40\u0E01\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 \u2014 \u0E02\u0E2D\u0E43\u0E2B\u0E49\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E01\u0E14 \u201C\u0E40\u0E25\u0E48\u0E19\u0E43\u0E2B\u0E21\u0E48\u201D" };
      if (s.players.length >= MAX_PLAYERS) return { status: 409, error: `\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E47\u0E21 (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ${MAX_PLAYERS} \u0E04\u0E19)` };
      if (s.players.some((p) => p.name === name)) return { error: "\u0E21\u0E35\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E19\u0E48\u0E2D\u0E22" };
      const id = pid();
      const t = token();
      s.players.push({
        id,
        name,
        token: t,
        money: s.settings.startingMoney,
        cards: [],
        lastSeen: Date.now(),
        joinedAt: Date.now()
      });
      pushLog(s, `\u{1F44B} ${name} \u0E40\u0E02\u0E49\u0E32\u0E2B\u0E49\u0E2D\u0E07`);
      return { data: { playerId: id, token: t } };
    });
    if (res.error) return ERR(res.error, res.status);
    return J({
      code,
      playerId: res.data.playerId,
      token: res.data.token,
      state: publicState(res.room, res.data.playerId)
    });
  }
  if (op === "sync" || op === "action") {
    const body = await readJson(request);
    if (!body) return ERR("\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
    const res = await mutate(env, code, (room) => {
      const s = room.state;
      const p = s.players.find((x) => x.id === body.playerId);
      if (!p) return { status: 401, error: "\u0E04\u0E38\u0E13\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27" };
      if (p.token !== body.token) return { status: 401, error: "\u0E40\u0E0B\u0E2A\u0E0A\u0E31\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" };
      const now = Date.now();
      const touched = now - (p.lastSeen || 0) > PING_MS;
      if (touched) p.lastSeen = now;
      if (op === "action") {
        const out = doAction(s, p, body.action);
        if (out.error) return out;
        return { data: out.data };
      }
      const changed = tick(s);
      if (changed) return { data: { ok: true } };
      if (touched) return { presence: true, data: { ok: true } };
      return { skip: true, data: { ok: true } };
    });
    if (res.error) return ERR(res.error, res.status);
    return J({ state: publicState(res.room, body.playerId) });
  }
  if (op === "view") {
    const room = await readRoom(env, code);
    if (!room) return ERR("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49", 404);
    return J({ state: publicState(room, null) });
  }
  return ERR("\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E19\u0E35\u0E49", 404);
}
__name(handleApi, "handleApi");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      const isHealth = url.pathname === "/api/health";
      if (request.method !== "POST" && !isHealth) return ERR("method not allowed", 405);
      if (request.method === "POST" && !sameOrigin(request))
        return ERR("\u0E04\u0E33\u0E02\u0E2D\u0E21\u0E32\u0E08\u0E32\u0E01\u0E15\u0E49\u0E19\u0E17\u0E32\u0E07\u0E2D\u0E37\u0E48\u0E19", 403);
      try {
        await ensureSchema(env);
        return await handleApi(request, env, url);
      } catch (e) {
        return ERR("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: " + (e && e.message ? e.message : e), 500);
      }
    }
    if (!env.ASSETS) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-dERV4b/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-dERV4b/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
