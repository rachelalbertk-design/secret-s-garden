(function () {
  var STORE_KEY = "theSecretsGarden.save.v1";
  if (window.location.search.indexOf("resetGarden=1") !== -1) {
    localStorage.removeItem(STORE_KEY);
    window.history.replaceState(null, "", window.location.pathname);
  }
  var app = document.getElementById("app");

  var signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  var signStyles = {
    Aries: { palette: "Poppy red, ember gold, warm cream", magic: "spark courage", hair: "#8c3025", wing: "#f0b35f", outfit: "#a94534", aura: "quick-blooming herbs", outfitName: "sunlit cloak", accessory: "ember charm", garden: "Poppy sparks gather near the path." },
    Taurus: { palette: "Rose, sage, honey, soft brown", magic: "earth comfort", hair: "#71482f", wing: "#bed99a", outfit: "#7f9861", aura: "fragrant flowers", outfitName: "embroidered cottage dress", accessory: "acorn charm", garden: "Honeyed roses lean toward the tea table." },
    Gemini: { palette: "Sky blue, buttercup, white, mint", magic: "breeze messages", hair: "#d9b45f", wing: "#b8e5df", outfit: "#6ca9ac", aura: "curious wind", outfitName: "ribboned wanderer set", accessory: "tiny bell", garden: "The leaves whisper two answers at once." },
    Cancer: { palette: "Pearl, silver, moss, moonlit blue", magic: "moonwater memory", hair: "#3f4f62", wing: "#c9d8e8", outfit: "#617b81", aura: "protective hearth", outfitName: "soft moon wrap", accessory: "shell pin", garden: "The pond holds the sky a little longer." },
    Leo: { palette: "Marigold, amber, berry, cream", magic: "sunlight confidence", hair: "#b45d2f", wing: "#f2c46f", outfit: "#bd7d3d", aura: "lantern bloom", outfitName: "petal-crowned finery", accessory: "golden flower", garden: "Lanterns glow before anyone lights them." },
    Virgo: { palette: "Herb green, oat, lavender, clay", magic: "tending remedies", hair: "#6b523c", wing: "#c7d6aa", outfit: "#71865f", aura: "careful remedies", outfitName: "herbalist apron", accessory: "tiny satchel", garden: "The herb beds arrange themselves neatly." },
    Libra: { palette: "Blush, lilac, dove gray, rose gold", magic: "balance beauty", hair: "#b98285", wing: "#d8c4e5", outfit: "#b789a8", aura: "fragrant balance", outfitName: "graceful layered dress", accessory: "rose mirror", garden: "Two blossoms open in perfect answer." },
    Scorpio: { palette: "Plum, blackcurrant, deep teal, candle gold", magic: "secrets roots", hair: "#2b202f", wing: "#6f587d", outfit: "#4d365a", aura: "night-blooming roots", outfitName: "dark floral cloak", accessory: "key charm", garden: "A closed bud waits until moonrise." },
    Sagittarius: { palette: "Indigo, wildflower yellow, cedar, sky", magic: "discovery maps", hair: "#7b4d2d", wing: "#8fb4db", outfit: "#4d668f", aura: "faraway seeds", outfitName: "traveler cloaklet", accessory: "map bead", garden: "A seed from nowhere appears by the gate." },
    Capricorn: { palette: "Pine, stone, snowdrop white, brass", magic: "old roots patience", hair: "#3d3a35", wing: "#aeb8ad", outfit: "#56624f", aura: "mountain herbs", outfitName: "structured garden coat", accessory: "brass clasp", garden: "Old roots rise like steps beneath the moss." },
    Aquarius: { palette: "Electric blue, violet, cloud white, glass", magic: "odd weather", hair: "#5f68a8", wing: "#a5dbe0", outfit: "#6870aa", aura: "rare weather", outfitName: "asymmetric starlit set", accessory: "glass star", garden: "One cloud rains upward for a moment." },
    Pisces: { palette: "Seafoam, lavender, pearl, dusky blue", magic: "dream mist", hair: "#7c6aa8", wing: "#c5d5f2", outfit: "#7a8eb5", aura: "soft intuition", outfitName: "flowing pondlight dress", accessory: "dew drop", garden: "Mist curls into tiny silver fish." }
  };

  var skinTones = [
    { name: "Deep umber", value: "#3f2722" },
    { name: "Mahogany", value: "#5b3329" },
    { name: "Bronze brown", value: "#7a4632" },
    { name: "Warm brown", value: "#9d6240" },
    { name: "Golden brown", value: "#b8754a" },
    { name: "Honey", value: "#c88a58" },
    { name: "Olive tan", value: "#a97950" },
    { name: "Rose beige", value: "#d7a889" },
    { name: "Porcelain", value: "#f1c9aa" }
  ];

  var hairStyles = ["Loose waves", "Curly bob", "Long braid", "Coily crown", "Soft bun", "Short crop"];
  var wingOptions = ["Leaf", "Moth", "Butterfly", "Dragonfly", "Moonlit", "Petal"];
  var outfitOptions = ["Cottage", "Woodland", "Moonlit", "Sunlit", "Herbalist", "Starlit"];
  var accessoryOptions = ["Tiny satchel", "Acorn charm", "Moon pin", "Flower crown", "Tea spoon", "Crystal bead"];
  var fairyNameOptions = ["Little Fern", "Mira Moss", "Saffron Dew", "Nia Thistle", "Amara Clover", "Liora Finch", "Zuri Mooncap", "Iris Bramble", "Solana Wisp", "Talia Root"];

  var stateOfMindOptions = ["Clear", "Foggy", "Restless", "Tender", "Hopeful", "Heavy", "Curious", "Dreamy", "Grounded", "Overgrown"];
  var stateIntensityOptions = ["soft", "medium", "strong"];
  var bodyAreaOptions = ["Head", "Chest", "Stomach", "Hands", "Legs", "Whole body", "Not sure", "I'd rather not say"];
  var bodySnapshotOptions = ["Warmth", "Tightness", "Fluttering", "Heaviness", "Calm", "Numbness", "Energy", "Ache", "Stillness", "I'm not sure"];
  var cycleNoteOptions = ["period started", "period ended", "cramps", "headache", "tender", "low energy", "high energy", "cravings", "sleep"];
  var sleepQualityOptions = ["Not noting", "Restful", "Broken", "Short", "Deep", "Strange dreams"];
  var smallPromiseOptions = ["Drink water", "Step outside", "Rest", "Stretch", "Tidy one small space", "Read", "Create something", "Text someone kind", "Write one sentence", "Take medicine/vitamins"];
  var journalPrompts = ["What brought you here today?", "What is asking for your attention?", "What would feel like care, not pressure?", "What changed since your last visit?"];
  var deckTemplateOptions = ["Garden Frame", "Moon Pond", "Pressed Flower", "Plain Linen"];
  var deckBorderOptions = ["Gold", "Moss", "Moonlight", "Rose", "None"];

  var reflectionQuestions = [
    "What small thing wants tenderness today?",
    "Where could one gentle choice make more room?",
    "What is asking to be noticed without being fixed?",
    "What would feel like care, not pressure?",
    "What quiet truth has been waiting by the gate?",
    "What can be made softer by being named?",
    "What would you like the garden to remember kindly?",
    "Where is a little courage enough?"
  ];

  var tinySpells = [
    { id: "water", title: "Sip of Clear Water", text: "Drink a little water, slowly enough to taste it.", tone: "clarity" },
    { id: "window", title: "Window Spell", text: "Look outside for one breath and let your eyes land on something alive.", tone: "mystery" },
    { id: "hands", title: "Hand Stretch Charm", text: "Open and close your hands, then let your shoulders drop.", tone: "softening" },
    { id: "object", title: "One Small Place", text: "Put one small object where it belongs.", tone: "protection" },
    { id: "kindness", title: "Kind Word Thread", text: "Send, write, or think one kind sentence.", tone: "softening" },
    { id: "spark", title: "Tiny Spark", text: "Do one tiny creative thing: a line, a note, a color, a hum.", tone: "energy" },
    { id: "rest", title: "Resting Eyes", text: "Close your eyes for a few seconds and let the day loosen.", tone: "protection" },
    { id: "leaf", title: "Leaf-Quiet Notice", text: "Name one thing you can hear, one thing you can see, and one thing you do not need to solve right now.", tone: "clarity" }
  ];

  var potionCategoryProfiles = {
    softening: { name: "Softlight Cordial", color: "#d88fa0", use: "softening, tenderness, and kind repair", garden: "Pink lantern-petals drift over the path and make the air easier to enter." },
    energy: { name: "Sunwake Tonic", color: "#e7aa4e", use: "warmth, courage, and a small bright beginning", garden: "A ring of sunpetals opens near the apothecary step." },
    protection: { name: "Mossguard Balm", color: "#7d9467", use: "boundaries, steadiness, and a safe place to return", garden: "Velvet moss thickens around the roots like a soft green threshold." },
    clarity: { name: "Clearbell Elixir", color: "#8cc6c2", use: "clean words, honest seeing, and calm truth", garden: "Clearbell chimes appear in the old tree and answer the wind." },
    mystery: { name: "Moonveil Infusion", color: "#8aa7d8", use: "dreams, intuition, and hidden doors", garden: "Moonmint curls around a small stone arch that was not there before." }
  };

  var ingredients = [
    { id: "moonmint", name: "Moonmint", category: "mystery", source: "Moon Pond", location: "near the Moon Pond", action: "Tap the moonlit leaves", tendAction: "Sing", color: "#8aa7d8" },
    { id: "dew", name: "Silver Dew", category: "clarity", source: "morning leaves", location: "on leaves in morning or moonlight", action: "Tap the dew drops", tendAction: "Wait", color: "#c9d8e8" },
    { id: "sunpetal", name: "Sunpetal", category: "energy", source: "garden gate", location: "near the garden gate", action: "Tap glowing flowers", tendAction: "Warm", color: "#e7aa4e" },
    { id: "honeydrop", name: "Honeydrop", category: "softening", source: "flower cups", location: "near flowers and bee spirits", action: "Tap the honeyed bloom", tendAction: "Prune", color: "#f4d58a" },
    { id: "deeproot", name: "Deep Root", category: "protection", source: "shaded root beds", location: "in the shaded root beds", action: "Hold gently to pull", tendAction: "Water", color: "#9b6b46" },
    { id: "moss", name: "Velvet Moss", category: "protection", source: "old stones", location: "on stones and old walls", action: "Tap the moss patch", tendAction: "Water", color: "#7d9467" },
    { id: "clearwater", name: "Clear Water", category: "clarity", source: "rain basin", location: "at the pond or rain basin", action: "Tap the water shimmer", tendAction: "Wait", color: "#8cc6c2" },
    { id: "starlace", name: "Starlace", category: "mystery", source: "night flowers", location: "near the pond and night flowers", action: "Tap the rare star-glow", tendAction: "Sing", color: "#a5bfe8" }
  ];

  var potions = [
    { id: "sunpetal_tonic", name: "Sunpetal Tonic", ingredients: ["sunpetal", "honeydrop"], use: "courage, warmth, beginning", tags: ["warmth", "courage", "joy", "beginning"], color: "#e7aa4e" },
    { id: "moonmint_tea", name: "Moonmint Infusion", ingredients: ["moonmint", "clearwater"], use: "intuition, quiet, dreams", tags: ["dream", "intuition", "mystery", "calm"], color: "#8aa7d8" },
    { id: "starlace_draught", name: "Starlace Draught", ingredients: ["starlace", "clearwater", "moonmint"], use: "hope, renewal, faith", tags: ["clarity", "hope", "wonder", "renewal"], color: "#a5bfe8" },
    { id: "rootrest_balm", name: "Velvet Root Balm", ingredients: ["moss", "deeproot", "honeydrop"], use: "grounding, softness, strength", tags: ["calm", "patience", "roots", "strength"], color: "#7d9467" },
    { id: "bitterroot_tea", name: "Bitterroot Tea", ingredients: ["deeproot", "moss"], use: "honesty, release, hidden costs", tags: ["truth", "release", "mystery", "roots"], color: "#6d5b45" },
    { id: "honeybloom_tonic", name: "Honeybloom Tonic", ingredients: ["honeydrop", "sunpetal", "moss"], use: "care, nourishment, growth", tags: ["care", "warmth", "growth"], color: "#d9b45f" },
    { id: "sparkhand_elixir", name: "Sparkhand Elixir", ingredients: ["sunpetal", "dew", "starlace"], use: "skill, focus, creative power", tags: ["craft", "focus", "courage", "wonder"], color: "#d88fa0" },
    { id: "clearbell_tea", name: "Clearbell Tea", ingredients: ["clearwater", "dew"], use: "clarity, clean speech, calm truth", tags: ["clarity", "truth", "calm"], color: "#8cc6c2" }
  ];

  var fallbackPotionNames = ["Cloudy Little Brew", "Mosswater Tea", "Almost-Moon Tonic", "Garden Mist", "Soft Unknown Draught"];

  var tarotCards = buildTarotDeck().map(withCardCharacter);

  function buildTarotDeck() {
    var majorArcana = [
      majorCard("The Fool", "0", "Beginnings, trust, a path not yet named.", "A new sprout appears by the ivy gate.", "The first customer brings an unusual request.", "Step lightly. The path enjoys being surprised.", "What wants to begin before it has a plan?", "starlace", ["wonder", "beginning"]),
      majorCard("The Magician", "I", "Focus, craft, and the spark between hand and heart.", "Herbs respond eagerly to careful brewing.", "The first potion brewed today gains a brighter outcome.", "A spoon can be a wand if held with meaning.", "What tool is already in your hand?", "honeydrop", ["clarity", "craft"]),
      majorCard("The High Priestess", "II", "Quiet knowing, hidden doors, moonlit intuition.", "The pond reveals a silver ripple.", "Customer needs are softer and less direct.", "Listen for the answer that does not hurry.", "What do you know before explaining it?", "dew", ["intuition", "mystery"]),
      majorCard("The Empress", "III", "Care, abundance, beauty, and living things.", "Flowers open near the potion shelf.", "Garden potions feel especially generous today.", "Tend what is tender. It knows the difference.", "What grows when it is treated gently?", "sunpetal", ["warmth", "care"]),
      majorCard("The Emperor", "IV", "Shelter, structure, steadiness, and chosen boundaries.", "The stone paths settle into clearer lines.", "Practical requests are easier to answer today.", "A boundary can be a little gate, not a wall.", "What structure would help you feel held?", "deeproot", ["roots", "clarity"]),
      majorCard("The Hierophant", "V", "Tradition, teaching, ritual, and shared wisdom.", "Old teacups ring softly from the cottage shelf.", "Customers ask for remedies with history.", "Some rituals remember you before you remember them.", "What old wisdom still feels kind?", "moss", ["patience", "wisdom"]),
      majorCard("The Lovers", "VI", "Choice, harmony, devotion, and honest connection.", "Twin blossoms open on the same vine.", "Pairing ingredients has extra grace today.", "Choose what can meet your whole heart.", "What choice feels loving and true?", "honeydrop", ["care", "balance"]),
      majorCard("The Chariot", "VII", "Direction, courage, movement, and gathered will.", "The gate path clears itself of leaves.", "Decisive brewing moves the line along.", "Hold the reins softly and keep going.", "Where is your energy ready to move?", "sunpetal", ["courage", "movement"]),
      majorCard("Strength", "VIII", "Gentle courage, steadiness, a soft hand on a wild thing.", "The gate vines relax around their thorns.", "Courage potions land with extra warmth.", "Softness can hold more than force ever could.", "What could be met with gentleness instead of force?", "sunpetal", ["courage", "warmth"]),
      majorCard("The Hermit", "IX", "Solitude, lanterns, unhurried searching.", "A small lantern lights near the old tree.", "Fewer customers arrive, but their stories run deeper.", "Even a quiet light is still a light.", "What does quiet make easier to hear?", "moss", ["calm", "patience"]),
      majorCard("Wheel of Fortune", "X", "Turns, chances, weather, and timing.", "A breeze changes the color of one flower bed.", "One random ingredient appears in extra supply.", "The garden turns. Turn with it.", "What is changing without asking permission?", "clearwater", ["change", "wonder"]),
      majorCard("Justice", "XI", "Truth, balance, consequence, and clear seeing.", "The scales beside the herb jars balance themselves.", "Exact recipes are especially reliable today.", "Name the truth and let it breathe.", "What would fairness look like in this moment?", "clearwater", ["clarity", "balance"]),
      majorCard("The Hanged Man", "XII", "Pause, surrender, a new angle on the old path.", "Dew hangs from leaves without falling.", "Waiting before serving reveals better matches.", "Not moving is sometimes the spell.", "What changes when you stop pushing?", "dew", ["patience", "wonder"]),
      majorCard("Death", "XIII", "Endings, release, transformation, and cleared ground.", "Spent petals become rich dark soil.", "Old requests make room for new remedies.", "Let the finished thing become compost.", "What is ready to be gently released?", "deeproot", ["change", "roots"]),
      majorCard("Temperance", "XIV", "Balance, blending, patience, and measured magic.", "Two herb beds grow toward each other.", "Mixed recipes are more forgiving today.", "Pour slowly. Some magic blooms between cups.", "What wants to be blended, not forced?", "deeproot", ["patience", "balance"]),
      majorCard("The Devil", "XV", "Attachment, appetite, shadow, and the spell of too much.", "A thorny vine reveals where it has tangled.", "Customers may ask for what soothes now but costs later.", "Notice the knot before pulling it tighter.", "What has been asking for your freedom?", "moss", ["mystery", "truth"]),
      majorCard("The Tower", "XVI", "Sudden truth, upheaval, clearing, and honest lightning.", "A cracked pot breaks, revealing a seed inside.", "One request changes shape halfway through the day.", "When the old shelf falls, see what was hidden behind it.", "What truth arrives like weather?", "starlace", ["change", "clarity"]),
      majorCard("The Star", "XVII", "Hope, renewal, clear water after a long night.", "Starlace glimmers on the lantern vine.", "Hopeful requests are more common.", "There is still light. It has been looking for you too.", "What small light is still here?", "starlace", ["hope", "clarity"]),
      majorCard("The Moon", "XVIII", "Mystery, intuition, dreams, hidden things.", "Dream herbs grow faster today.", "Customers may be harder to read.", "Trust what glows. Question what smiles.", "What is easier to feel than to prove?", "moonmint", ["dream", "mystery", "intuition"]),
      majorCard("The Sun", "XIX", "Warmth, clarity, delight, and honest growth.", "Sunpetals tilt open before noon.", "Customers are easier to read today.", "Let the bright thing be simple.", "What joy does not need to justify itself?", "sunpetal", ["joy", "warmth", "clarity"]),
      majorCard("Judgement", "XX", "Awakening, reckoning, return, and a clear call.", "The bellflowers ring once in the morning air.", "Old customers return with changed stories.", "Answer the call that sounds like your own name.", "What part of you is ready to answer?", "clearwater", ["clarity", "change"]),
      majorCard("The World", "XXI", "Completion, belonging, wholeness, and the circle complete.", "The garden paths make one perfect loop.", "Every potion carries a little extra harmony.", "You are inside the circle, not outside looking in.", "What has come full circle?", "honeydrop", ["balance", "wonder"])
    ];

    var suits = [
      { name: "Wands", symbol: "W", ingredient: "sunpetal", tags: ["courage", "warmth", "craft"], theme: "spark, courage, and creative fire", garden: "Lantern vines lean toward the workbench.", shop: "Bold requests come to the counter today.", flavor: "Let the spark stay warm without becoming a blaze." },
      { name: "Cups", symbol: "C", ingredient: "dew", tags: ["care", "calm", "intuition"], theme: "feeling, care, and the inner cup", garden: "The pond carries every reflection more gently.", shop: "Tender requests are easier to hear today.", flavor: "Hold the cup with both hands." },
      { name: "Swords", symbol: "S", ingredient: "clearwater", tags: ["clarity", "truth", "mystery"], theme: "thought, truth, and clean air", garden: "Wind moves through the chimes with careful honesty.", shop: "Clear words matter more than perfect words today.", flavor: "Let the truth be sharp only where it needs to be." },
      { name: "Pentacles", symbol: "P", ingredient: "moss", tags: ["roots", "patience", "calm"], theme: "body, home, craft, and earthly care", garden: "Moss thickens around the table legs.", shop: "Practical remedies feel especially nourishing today.", flavor: "The ordinary thing may be the magic." }
    ];

    var ranks = [
      { name: "Ace", symbol: "A", meaning: "A new opening, a first seed, a quiet yes.", tag: "beginning", reflection: "Where is a new beginning asking for room?" },
      { name: "Two", symbol: "2", meaning: "Choice, balance, waiting at the threshold.", tag: "balance", reflection: "What choice wants patience before action?" },
      { name: "Three", symbol: "3", meaning: "Growth, support, early results taking shape.", tag: "wonder", reflection: "Who or what is helping this grow?" },
      { name: "Four", symbol: "4", meaning: "Rest, structure, a room held steady.", tag: "calm", reflection: "What would make today feel more held?" },
      { name: "Five", symbol: "5", meaning: "Tension, change, a lesson with rough edges.", tag: "change", reflection: "Where could friction become information?" },
      { name: "Six", symbol: "6", meaning: "Recognition, passage, help arriving.", tag: "hope", reflection: "What support is already on its way?" },
      { name: "Seven", symbol: "7", meaning: "Courage, boundary, standing with what matters.", tag: "courage", reflection: "What deserves your gentle protection?" },
      { name: "Eight", symbol: "8", meaning: "Movement, messages, momentum.", tag: "movement", reflection: "What is beginning to move?" },
      { name: "Nine", symbol: "9", meaning: "Resilience, patience, nearly there.", tag: "patience", reflection: "What has carried you this far?" },
      { name: "Ten", symbol: "10", meaning: "Fullness, burden, completion asking to be set down.", tag: "roots", reflection: "What is complete enough to soften?" },
      { name: "Page", symbol: "Pg", meaning: "A message, beginner's heart, a small invitation.", tag: "wonder", reflection: "What wants to be learned without rushing?" },
      { name: "Knight", symbol: "Kn", meaning: "Action, pursuit, an energy in motion.", tag: "movement", reflection: "Where is your energy trying to go?" },
      { name: "Queen", symbol: "Q", meaning: "Care, mastery, inner knowing.", tag: "care", reflection: "What kind of care feels sovereign today?" },
      { name: "King", symbol: "K", meaning: "Stewardship, clarity, steady power.", tag: "clarity", reflection: "What can you tend with steady hands?" }
    ];

    var minors = [];
    suits.forEach(function (suit) {
      ranks.forEach(function (rank) {
        var name = rank.name + " of " + suit.name;
        minors.push({
          id: tarotId(name),
          name: name,
          symbol: rank.symbol + suit.symbol,
          meaning: rank.meaning + " In " + suit.name + ", this speaks of " + suit.theme + ".",
          garden: suit.garden,
          shop: suit.shop,
          flavor: suit.flavor,
          reflection: rank.reflection,
          bonus: suit.ingredient,
          tags: uniqueTags(suit.tags.concat([rank.tag]))
        });
      });
    });

    return majorArcana.concat(minors);
  }

  function majorCard(name, symbol, meaning, garden, shop, flavor, reflection, bonus, tags) {
    return {
      id: tarotId(name),
      name: name,
      symbol: symbol,
      meaning: meaning,
      garden: garden,
      shop: shop,
      flavor: flavor,
      reflection: reflection,
      bonus: bonus,
      tags: tags
    };
  }


  function withCardCharacter(card) {
    card.character = tarotCharacterProfile(card);
    return card;
  }

  function tarotCharacterProfile(card) {
    var parts = minorCardParts(card.name);
    var profile = parts ? minorCharacterProfile(card, parts) : majorCharacterProfile(card);
    var preferredPotionId = profile.preferredPotionId || preferredPotionIdForTags(card.tags || [], card.bonus);
    var preferredPotion = getPotion(preferredPotionId) || potions[0];
    var preferredIngredients = preferredIngredientNames(preferredPotion, profile.preferredIngredientIds, profile.extraIngredientIds, card.bonus);
    return {
      cardName: card.name,
      characterTitle: profile.characterTitle || "The " + card.name.replace(/^The /, ""),
      domain: profile.domain || tagDomain(card.tags || []),
      arrivalText: profile.arrivalText || "A presence from " + card.name + " waits beside the tarot table.",
      personalityTone: profile.personalityTone || "quiet, watchful, enchanted",
      emotionalNeed: profile.emotionalNeed || "care without pressure",
      preferredPotionId: preferredPotion.id,
      preferredPotion: preferredPotion.name,
      preferredIngredients: preferredIngredients,
      shortDialogueLine: profile.shortDialogueLine || card.flavor,
      reflectionPrompt: profile.reflectionPrompt || card.reflection || "What is asking for your attention?",
      gardenEffect: profile.gardenEffect || card.garden,
      relationshipState: "First meeting"
    };
  }

  function majorCharacterProfile(card) {
    var profiles = {
      "The Fool": { characterTitle: "The Ivy Wanderer", domain: "thresholds, beginnings, brave wonder", arrivalText: "A bright stranger pauses at the ivy gate with dew on their shoes.", personalityTone: "curious, trusting, unguarded", emotionalNeed: "trust without being rushed", preferredPotionId: "starlace_draught", preferredIngredientIds: ["starlace", "dew", "honeydrop"], gardenEffect: "A new sprout curls beside the ivy gate." },
      "The Magician": { characterTitle: "The Teaspoon Magician", domain: "craft, focus, hand-made magic", arrivalText: "A clever figure waits by the workbench, turning a teaspoon like a wand.", personalityTone: "focused, playful, exact", emotionalNeed: "power that stays connected to the heart", preferredPotionId: "sparkhand_elixir", preferredIngredientIds: ["honeydrop", "starlace", "clearwater"], gardenEffect: "The apothecary spoon glows whenever a true recipe is near." },
      "The High Priestess": { characterTitle: "The Moon-Pond Keeper", domain: "intuition, secrets, moonlit knowing", arrivalText: "Someone waits beside the moon pond, finger raised as if listening below the water.", personalityTone: "hushed, knowing, steady", emotionalNeed: "permission to know without explaining", preferredPotionId: "moonmint_tea", preferredIngredientIds: ["dew", "moonmint", "clearwater"], gardenEffect: "A silver ripple appears in the moon pond." },
      "The Empress": { characterTitle: "The Blossom Mother", domain: "care, abundance, living beauty", arrivalText: "A warm presence arrives with petals caught in their sleeves.", personalityTone: "generous, tender, lush", emotionalNeed: "care that also receives care", preferredPotionId: "honeybloom_tonic", preferredIngredientIds: ["sunpetal", "honeydrop", "dew"], gardenEffect: "Flowers open near the potion shelf." },
      "The Emperor": { characterTitle: "The Stone Gatekeeper", domain: "shelter, boundaries, steady structure", arrivalText: "A steady figure stands beside the garden stones, making the path feel safer.", personalityTone: "grounded, protective, calm", emotionalNeed: "structure without hardness", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["deeproot", "moss", "clearwater"], gardenEffect: "The stone paths settle into clearer lines." },
      "The Hierophant": { characterTitle: "The Tea-Rite Elder", domain: "ritual, teaching, inherited kindness", arrivalText: "An old ritual arrives as a guest, carrying the scent of steeped herbs.", personalityTone: "reverent, gentle, storied", emotionalNeed: "tradition that still leaves room to breathe", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["moss", "deeproot", "honeydrop"], gardenEffect: "Old teacups ring softly from the cottage shelf." },
      "The Lovers": { characterTitle: "The Twin Blossom", domain: "choice, devotion, honest connection", arrivalText: "Two blossoms open on one stem as a visitor waits between them.", personalityTone: "open-hearted, discerning, warm", emotionalNeed: "a choice that can meet the whole heart", preferredPotionId: "sunpetal_tonic", preferredIngredientIds: ["honeydrop", "sunpetal", "dew"], gardenEffect: "Twin blossoms open on the same vine." },
      "The Chariot": { characterTitle: "The Gatepath Rider", domain: "direction, courage, gathered will", arrivalText: "A determined visitor waits where the gate path clears itself of leaves.", personalityTone: "brave, forward, controlled", emotionalNeed: "movement without self-abandonment", preferredPotionId: "sunpetal_tonic", preferredIngredientIds: ["sunpetal", "clearwater", "honeydrop"], gardenEffect: "The gate path clears itself of leaves." },
      "Strength": { characterTitle: "The Thorn-Tamer", domain: "gentle courage, patience, soft power", arrivalText: "A calm visitor kneels by the thorned vines, hand open and unafraid.", personalityTone: "soft, brave, steady", emotionalNeed: "gentleness strong enough to stay", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["sunpetal", "moss", "honeydrop"], gardenEffect: "The gate vines relax around their thorns." },
      "The Hermit": { characterTitle: "The Lantern Hermit", domain: "solitude, searching, unhurried light", arrivalText: "A small lantern appears near the old tree before the visitor steps into view.", personalityTone: "quiet, searching, kind", emotionalNeed: "solitude that does not become loneliness", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["moss", "deeproot", "starlace"], gardenEffect: "A small lantern lights near the old tree." },
      "Wheel of Fortune": { characterTitle: "The Turning Weather", domain: "timing, chance, changing seasons", arrivalText: "A visitor arrives on a breeze that changes the color of one flower bed.", personalityTone: "restless, amused, wise", emotionalNeed: "change that can be met without gripping", preferredPotionId: "starlace_draught", preferredIngredientIds: ["clearwater", "starlace", "honeydrop"], gardenEffect: "A breeze changes the color of one flower bed." },
      "Justice": { characterTitle: "The Scale Keeper", domain: "truth, balance, consequence", arrivalText: "A clear-eyed visitor waits beside the herb scales, letting silence balance first.", personalityTone: "fair, direct, composed", emotionalNeed: "truth without punishment", preferredPotionId: "starlace_draught", preferredIngredientIds: ["clearwater", "starlace", "dew"], gardenEffect: "The scales beside the herb jars balance themselves." },
      "The Hanged Man": { characterTitle: "The Dew-Suspended One", domain: "pause, surrender, new perspective", arrivalText: "A visitor rests beneath hanging dew, seeing the garden from a stranger angle.", personalityTone: "still, surrendered, oddly bright", emotionalNeed: "permission to pause without failing", preferredPotionId: "moonmint_tea", preferredIngredientIds: ["dew", "moonmint", "moss"], gardenEffect: "Dew hangs from leaves without falling." },
      "Death": { characterTitle: "The Compost Queen", domain: "release, endings, transformation", arrivalText: "A dark-robed visitor waits where spent petals have become rich soil.", personalityTone: "tender, unsentimental, calm", emotionalNeed: "release that is honored instead of feared", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["deeproot", "moss", "dew"], gardenEffect: "Spent petals become rich dark soil." },
      "Temperance": { characterTitle: "The Cup Blender", domain: "balance, blending, measured magic", arrivalText: "A careful visitor pours from cup to cup without spilling a drop.", personalityTone: "measured, forgiving, serene", emotionalNeed: "harmony that is allowed to take time", preferredPotionId: "rootrest_balm", preferredIngredientIds: ["deeproot", "dew", "honeydrop"], gardenEffect: "Two herb beds grow toward each other." },
      "The Devil": { characterTitle: "The Thorn-Knot", domain: "attachment, appetite, shadow, freedom", arrivalText: "A tangled visitor waits by a thorny vine, not hiding the knot.", personalityTone: "magnetic, honest, shadowed", emotionalNeed: "freedom without shame", preferredPotionId: "bitterroot_tea", preferredIngredientIds: ["moss", "clearwater", "deeproot"], gardenEffect: "A thorny vine reveals where it has tangled." },
      "The Tower": { characterTitle: "The Lightning Guest", domain: "sudden truth, clearing, honest change", arrivalText: "A visitor arrives with stormlight in their hair and a cracked pot in their hands.", personalityTone: "startling, bright, necessary", emotionalNeed: "truth that clears without destroying the tender root", preferredPotionId: "starlace_draught", preferredIngredientIds: ["starlace", "clearwater", "deeproot"], gardenEffect: "A cracked pot breaks, revealing a seed inside." },
      "The Star": { characterTitle: "The Starlace Healer", domain: "hope, renewal, clean water", arrivalText: "A luminous visitor waits where starlace glimmers on the lantern vine.", personalityTone: "hopeful, cool, reassuring", emotionalNeed: "hope that does not demand certainty", preferredPotionId: "starlace_draught", preferredIngredientIds: ["starlace", "clearwater", "dew"], gardenEffect: "Starlace glimmers on the lantern vine." },
      "The Moon": { characterTitle: "The Dream-Mist", domain: "dreams, intuition, hidden things", arrivalText: "A veiled visitor waits where moonmint curls around the pond stones.", personalityTone: "mysterious, soft, changeable", emotionalNeed: "intuition that can stay unnamed", preferredPotionId: "moonmint_tea", preferredIngredientIds: ["moonmint", "dew", "clearwater"], gardenEffect: "Dream herbs grow faster under the pond mist." },
      "The Sun": { characterTitle: "The Sunpetal Child", domain: "joy, warmth, honest growth", arrivalText: "A golden visitor arrives laughing softly as the sunpetals turn toward them.", personalityTone: "clear, joyful, open", emotionalNeed: "joy without apology", preferredPotionId: "sunpetal_tonic", preferredIngredientIds: ["sunpetal", "honeydrop", "clearwater"], gardenEffect: "Sunpetals tilt open before noon." },
      "Judgement": { characterTitle: "The Bellflower Caller", domain: "awakening, return, answer", arrivalText: "A visitor stands beneath bellflowers that ring once in the morning air.", personalityTone: "clear, resonant, compassionate", emotionalNeed: "a call that can be answered gently", preferredPotionId: "starlace_draught", preferredIngredientIds: ["clearwater", "starlace", "dew"], gardenEffect: "The bellflowers ring once in the morning air." },
      "The World": { characterTitle: "The Circle Keeper", domain: "completion, belonging, wholeness", arrivalText: "A whole circle of path-light gathers before the visitor steps through it.", personalityTone: "complete, welcoming, radiant", emotionalNeed: "belonging that includes every part", preferredPotionId: "sunpetal_tonic", preferredIngredientIds: ["honeydrop", "sunpetal", "moss"], gardenEffect: "The garden paths make one perfect loop." }
    };
    var profile = profiles[card.name] || {};
    return Object.assign({
      shortDialogueLine: card.flavor,
      reflectionPrompt: card.reflection,
      domain: tagDomain(card.tags || []),
      emotionalNeed: card.reflection || "care without pressure",
      gardenEffect: card.garden
    }, profile);
  }

  function minorCardParts(name) {
    var pieces = name.split(" of ");
    if (pieces.length !== 2) return null;
    var ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];
    var suits = ["Wands", "Cups", "Swords", "Pentacles"];
    if (ranks.indexOf(pieces[0]) === -1 || suits.indexOf(pieces[1]) === -1) return null;
    return { rank: pieces[0], suit: pieces[1] };
  }

  function minorCharacterProfile(card, parts) {
    var suit = suitCharacterProfile(parts.suit);
    var rank = rankCharacterProfile(parts.rank);
    var profile = {
      characterTitle: "The " + suit.titleRoot + " " + rank.titleNoun,
      domain: suit.domain + "; " + rank.domain,
      arrivalText: rank.arrival.replace("{place}", suit.place).replace("{gesture}", suit.gesture),
      personalityTone: rank.tone + ", " + suit.tone,
      emotionalNeed: rank.need + " through " + suit.need,
      preferredPotionId: suit.potionId,
      preferredIngredientIds: suit.ingredientIds,
      shortDialogueLine: suit.dialogue,
      reflectionPrompt: card.reflection,
      gardenEffect: suit.gardenEffect
    };
    if (parts.rank === "King" && parts.suit === "Swords") {
      profile.characterTitle = "The Chime King";
      profile.domain = "wind, truth, clarity, clean speech";
      profile.arrivalText = "A figure waits beneath the chimes, listening before he speaks.";
      profile.personalityTone = "measured, precise, wind-cleared";
      profile.emotionalNeed = "clarity without cruelty";
      profile.preferredPotionId = "starlace_draught";
      profile.preferredIngredientIds = ["clearwater", "starlace", "dew"];
      profile.shortDialogueLine = "Let the truth be sharp only where it needs to be.";
      profile.reflectionPrompt = "Where do clear words matter more than perfect words?";
      profile.gardenEffect = "Chimes appear in the old tree.";
    }
    return profile;
  }

  function suitCharacterProfile(suit) {
    var profiles = {
      Wands: { titleRoot: "Lantern", domain: "spark, courage, warmth, creative fire", need: "a brave spark that does not burn out", place: "near the lantern vines", gesture: "palms warmed by a small flame", tone: "bright, eager, brave", potionId: "sunpetal_tonic", ingredientIds: ["sunpetal", "honeydrop", "clearwater"], dialogue: "Let the spark stay warm without becoming a blaze.", gardenEffect: "Lantern vines lean toward the workbench." },
      Cups: { titleRoot: "Tide", domain: "feeling, care, dreams, the inner cup", need: "feeling that can be held softly", place: "beside the moon pond", gesture: "hands curved around an invisible cup", tone: "tender, receptive, flowing", potionId: "moonmint_tea", ingredientIds: ["dew", "moonmint", "honeydrop"], dialogue: "Hold the cup with both hands.", gardenEffect: "The pond carries every reflection more gently." },
      Swords: { titleRoot: "Chime", domain: "wind, truth, clarity, clean speech", need: "clear words without cruelty", place: "beneath the chimes", gesture: "one hand near a silver bell", tone: "clear, watchful, wind-cleared", potionId: "starlace_draught", ingredientIds: ["clearwater", "starlace", "dew"], dialogue: "Let the truth be sharp only where it needs to be.", gardenEffect: "Chimes appear in the old tree." },
      Pentacles: { titleRoot: "Moss", domain: "body, home, craft, earthly care", need: "care that has somewhere to land", place: "at the mossy threshold", gesture: "soil tucked beneath their fingernails", tone: "grounded, steady, practical", potionId: "rootrest_balm", ingredientIds: ["moss", "deeproot", "dew"], dialogue: "The ordinary thing may be the magic.", gardenEffect: "Moss thickens around the table legs." }
    };
    return profiles[suit];
  }

  function rankCharacterProfile(rank) {
    var profiles = {
      Ace: { titleNoun: "Seed", domain: "first openings", tone: "new, open, unguarded", need: "a beginning that feels safe to touch", arrival: "A small presence appears {place}, {gesture}." },
      Two: { titleNoun: "Twin", domain: "choice and balance", tone: "careful, listening, split-lit", need: "a choice that can wait for honesty", arrival: "Two shadows arrive {place}, {gesture}." },
      Three: { titleNoun: "Circle", domain: "growth and support", tone: "warm, communal, bright", need: "growth that feels witnessed", arrival: "A threefold visitor gathers {place}, {gesture}." },
      Four: { titleNoun: "Keeper", domain: "rest and structure", tone: "still, protective, steady", need: "rest with a roof over it", arrival: "A quiet keeper waits {place}, {gesture}." },
      Five: { titleNoun: "Weather", domain: "tension and change", tone: "frayed, honest, restless", need: "friction that can become information", arrival: "A weathered visitor pauses {place}, {gesture}." },
      Six: { titleNoun: "Lantern-Bearer", domain: "recognition and passage", tone: "encouraging, remembered, gentle", need: "support that can be received", arrival: "A familiar-looking visitor arrives {place}, {gesture}." },
      Seven: { titleNoun: "Gateward", domain: "boundaries and protection", tone: "brave, wary, devoted", need: "protection without closing the heart", arrival: "A watchful gateward stands {place}, {gesture}." },
      Eight: { titleNoun: "Messenger", domain: "movement and messages", tone: "swift, alert, alive", need: "motion with meaning", arrival: "A quick messenger appears {place}, {gesture}." },
      Nine: { titleNoun: "Vigil", domain: "resilience and patience", tone: "tired, loyal, enduring", need: "rest after holding on so long", arrival: "A steadfast visitor keeps vigil {place}, {gesture}." },
      Ten: { titleNoun: "Burden", domain: "completion and fullness", tone: "heavy, honest, ready", need: "permission to set something down", arrival: "A full-handed visitor arrives {place}, {gesture}." },
      Page: { titleNoun: "Apprentice", domain: "messages and beginner wonder", tone: "curious, tender, quick-learning", need: "learning without being rushed", arrival: "A young messenger waits {place}, {gesture}." },
      Knight: { titleNoun: "Rider", domain: "action and pursuit", tone: "restless, devoted, moving", need: "direction that remembers tenderness", arrival: "A rider stops {place}, {gesture}." },
      Queen: { titleNoun: "Queen", domain: "care and inner mastery", tone: "sovereign, receptive, deep", need: "care that does not disappear into giving", arrival: "A crowned visitor waits {place}, {gesture}." },
      King: { titleNoun: "King", domain: "stewardship and clear power", tone: "measured, protective, composed", need: "power that can stay kind", arrival: "A sovereign figure waits {place}, listening before they speak." }
    };
    return profiles[rank];
  }

  function preferredPotionIdForTags(tags, bonus) {
    if (hasAny(tags, ["craft", "focus"])) return "sparkhand_elixir";
    if (hasAny(tags, ["truth", "clarity"]) || bonus === "clearwater") return "clearbell_tea";
    if (hasAny(tags, ["dream", "intuition", "mystery"]) || bonus === "moonmint" || bonus === "dew") return "moonmint_tea";
    if (hasAny(tags, ["care", "growth"])) return "honeybloom_tonic";
    if (hasAny(tags, ["warmth", "courage", "joy", "movement"]) || bonus === "sunpetal" || bonus === "honeydrop") return "sunpetal_tonic";
    if (hasAny(tags, ["release"])) return "bitterroot_tea";
    if (hasAny(tags, ["roots", "patience", "calm", "wisdom"]) || bonus === "moss" || bonus === "deeproot") return "rootrest_balm";
    return "starlace_draught";
  }

  function preferredIngredientNames(potion, preferredIds, extraIds, bonus) {
    var ids = preferredIds && preferredIds.length ? preferredIds.slice() : (potion ? potion.ingredients.slice() : []);
    (extraIds || []).forEach(function (id) { if (ids.indexOf(id) === -1) ids.push(id); });
    if (bonus && ids.indexOf(bonus) === -1) ids.push(bonus);
    return uniqueTags(ids).map(function (id) {
      var ingredient = getIngredient(id);
      return ingredient ? ingredient.name : id;
    });
  }

  function hasAny(values, needles) {
    values = values || [];
    return needles.some(function (needle) { return values.indexOf(needle) !== -1; });
  }

  function tagDomain(tags) {
    return (tags && tags.length ? tags.join(", ") : "quiet magic") + ", garden weather";
  }

  function cardRelationshipState(card) {
    var record = state && state.discoveredCards ? state.discoveredCards[card.id] : null;
    var times = record ? Number(record.timesDrawn || 0) : 0;
    if (times <= 1) return "First meeting";
    if (times <= 3) return "Remembered by the gate";
    if (times <= 6) return "Familiar visitor";
    return "Trusted garden presence";
  }


  function tarotId(value) {
    return slug(value).replace(/-/g, "_");
  }

  function uniqueTags(tags) {
    return tags.filter(function (tag, index) { return tags.indexOf(tag) === index; });
  }

  var customers = [
    { name: "Mallow", request: "My courage keeps hiding under the bed.", tags: ["courage", "warmth"], success: "Mallow leaves with shoulders a little higher.", gift: "A golden button appears beside the gate." },
    { name: "Bram", request: "I keep forgetting what I came into rooms for.", tags: ["clarity", "wonder"], success: "Bram remembers three things and smiles at the fourth.", gift: "A clear ripple crosses the moon pond." },
    { name: "Nettle", request: "My dreams have been leaving muddy footprints.", tags: ["dream", "intuition"], success: "Nettle's dream footprints turn silver at the edges.", gift: "Moonmint curls around the pond stones." },
    { name: "Rowan", request: "My roses whisper, but only when I leave.", tags: ["mystery", "care"], success: "Rowan's roses agree to whisper a little louder.", gift: "A blush rose opens by the tea table." },
    { name: "Elder Pip", request: "The old tree has been sighing in its sleep.", tags: ["calm", "roots"], success: "The old tree settles, and one leaf lands in thanks.", gift: "Velvet moss thickens near the roots." },
    { name: "Liora", request: "I found a star in my pocket and it seems homesick.", tags: ["hope", "wonder"], success: "The pocket star brightens and points toward home.", gift: "A tiny star glints on the lantern vine." }
  ];

  var gardenObjectCatalog = [
    { id: "card-altar", name: "Card Altar", opens: "Tarot + Readings", kind: "card-altar", screen: "tea", x: 39, y: 52, scale: 1.08, sanctuary: "Daily card draws, the next-card countdown, and saved tarot reading pages." },
    { id: "observatory", name: "Observatory", opens: "Astrology + Readings", kind: "observatory", screen: "moon", x: 67, y: 34, scale: 1.02, sanctuary: "Sun, Moon, Rising, seasonal almanac notes, and sky-tinted card readings." },
    { id: "grimoire", name: "Grimoire", opens: "Daily Journal", kind: "grimoire", screen: "private", section: "journal", prompt: "What belongs on today's page?", x: 53, y: 74, scale: 1, sanctuary: "One private daily page where mood, intentions, habits, cycle notes, and free writing are all optional." },
    { id: "tending-grove", name: "Tending Grove", opens: "Garden Rituals", kind: "tending-grove", screen: "gardenRituals", x: 79, y: 68, scale: 1.02, sanctuary: "Short optional rituals for roots, weather, resources, lanterns, leaves, care, and gentle gates." },
    { id: "memory-tree", name: "Memory Tree", opens: "Day Summary", kind: "memory-tree", screen: "daySummary", x: 22, y: 67, scale: 1.08, sanctuary: "A reflective tree that gathers today's tarot, astrology, Grimoire feelings, and ritual work into one local day lesson." }
  ];

  var ritualBodyAreas = ["head", "throat", "chest", "belly", "hands", "legs", "whole body", "not sure"];
  var ritualSensations = ["calm", "tight", "heavy", "light", "warm", "cold", "buzzing", "numb", "soft", "restless", "tired", "steady", "not sure"];
  var gardenFenceZones = ["inner garden", "trusted path", "visitor path", "outer gate"];

  var ritualRegistry = [
    {
      id: "root-check",
      title: "Root Check",
      subtitle: "Find your feet. Touch the soil.",
      durationSec: 90,
      intensity: "micro",
      gardenMetaphor: "roots",
      safetyNote: "Stay with what feels okay. You can return to the garden anytime.",
      steps: [
        { id: "intro", type: "intro", title: "Root Check", body: "Take a small moment to notice what is already here. No need to fix anything." },
        { id: "sensations", type: "sensationChips", title: "What do you notice?", body: "Choose one to three words, or skip this.", choices: ritualSensations },
        { id: "body-area", type: "bodyArea", title: "Where do you notice it?", body: "Choose the closest place.", choices: ritualBodyAreas },
        { id: "roots", type: "gardenAction", title: "Grow roots", body: "Press and hold while imagining roots gently reaching into the soil.", durationSec: 20 },
        { id: "closing", type: "closing", title: "Notice now", body: "What is here now? A tiny change counts." }
      ],
      reflectionPrompts: ["My body garden feels...", "One tiny thing I noticed was...", "Right now I need..."],
      reward: { type: "roots", intensity: "subtle", message: "Your roots touched the soil." }
    },
    {
      id: "weather-within",
      title: "Weather Within",
      subtitle: "Name the weather moving through you.",
      durationSec: 90,
      intensity: "micro",
      gardenMetaphor: "weather",
      safetyNote: "You can name the weather without changing it.",
      steps: [
        { id: "intro", type: "intro", title: "Weather Within", body: "Every garden has weather. Let us notice today's weather without judging it." },
        { id: "weather-choice", type: "sensationChips", title: "What is the weather inside the garden today?", body: "Choose any words that feel close, or skip this.", choices: ["tangled vines", "low clouds", "clear breeze", "bees in the lavender", "winter soil", "sunlit stones", "wind in the leaves", "still pond", "frost on the grass", "moss after rain", "evening shade", "old tree roots", "mist over the path"] },
        { id: "weather-animation", type: "gardenAction", title: "Let the weather be here", body: "Watch the garden hold this weather for a moment.", durationSec: 20 },
        { id: "closing", type: "closing", title: "Notice now", body: "What kind of care would this weather welcome?" }
      ],
      reflectionPrompts: ["The weather inside feels like...", "One place in the garden that wants attention is...", "The kindest thing I can offer this weather is..."],
      reward: { type: "dew", intensity: "subtle", message: "The garden made room for the weather." }
    },
    {
      id: "resource-grove",
      title: "Resource Grove",
      subtitle: "Visit what helps you feel safe.",
      durationSec: 150,
      intensity: "gentle",
      gardenMetaphor: "grove",
      safetyNote: "Choose only what feels supportive. You can add just one small resource.",
      steps: [
        { id: "intro", type: "intro", title: "Resource Grove", body: "A resource is something that helps your garden feel a little steadier, softer, or safer." },
        { id: "category", type: "choice", title: "What kind of resource would you like to add?", body: "Choose one category.", choices: ["place", "person", "sound", "movement", "phrase", "memory", "texture", "color", "breath", "other"] },
        { id: "name", type: "text", title: "Name this resource", body: "Give it a simple name you will recognize later.", placeholder: "My resource is..." },
        { id: "symbol", type: "choice", title: "Choose a symbol for the grove", body: "How should this resource appear?", choices: ["tree", "stone", "flower", "pond", "lantern", "bench", "gate"] },
        { id: "closing", type: "closing", title: "Added to the grove", body: "You can return to this resource when you want support." }
      ],
      reflectionPrompts: ["One thing that supports me is...", "This resource feels like...", "I can return to this when..."],
      reward: { type: "grove", intensity: "subtle", message: "A new resource was planted in your grove." }
    },
    {
      id: "listening-leaf",
      title: "Listening Leaf",
      subtitle: "Let one part of the garden speak.",
      durationSec: 120,
      intensity: "gentle",
      gardenMetaphor: "leaf journal",
      safetyNote: "Only listen as much as feels comfortable. A single word is enough.",
      steps: [
        { id: "settle", type: "notice", title: "Choose one place", body: "Let your attention rest on one place in your body garden. It can be clear, quiet, or uncertain." },
        { id: "body-area", type: "bodyArea", title: "Where would you like to listen?", body: "Choose a place, or choose not sure.", choices: ritualBodyAreas.concat(["a garden plant"]) },
        { id: "message", type: "text", title: "What might it say?", body: "Let one word, phrase, or image arrive. No need to explain it.", placeholder: "This place says..." },
        { id: "kindness", type: "text", title: "Offer a kind reply", body: "What would you like to say back?", placeholder: "I hear you..." },
        { id: "closing", type: "closing", title: "Press the leaf", body: "This listening leaf can be saved privately in your herbarium." }
      ],
      reflectionPrompts: ["My body garden feels...", "My body garden notices...", "The story I heard was..."],
      reward: { type: "leaf", intensity: "subtle", message: "A listening leaf was added to your herbarium." }
    },
    {
      id: "tend-wilted-plant",
      title: "Tend a Wilted Plant",
      subtitle: "Offer one small kindness.",
      durationSec: 120,
      intensity: "gentle",
      gardenMetaphor: "plant care",
      safetyNote: "This plant does not need to bloom right now. One small kindness is enough.",
      steps: [
        { id: "intro", type: "intro", title: "Tend a Wilted Plant", body: "Choose one plant or place that could use a little care. It does not need to change quickly." },
        { id: "plant-state", type: "choice", title: "How does this plant seem?", body: "Choose what feels close, or skip this.", choices: ["wilted", "dry", "hidden", "tangled", "overgrown", "quiet", "tired", "not sure"] },
        { id: "care-action", type: "choice", title: "What might help by one small degree?", body: "Choose one care action.", choices: ["water", "sunlight", "shade", "space", "quiet", "soft soil", "a fence", "time"] },
        { id: "kind-note", type: "text", title: "Leave a kind note", body: "A few gentle words are enough.", placeholder: "Dear plant..." },
        { id: "closing", type: "closing", title: "Care given", body: "Notice what it is like to offer care without asking for instant blooming." }
      ],
      reflectionPrompts: ["This plant seemed...", "The care I offered was...", "One kind sentence I can keep is..."],
      reward: { type: "dew", intensity: "subtle", message: "The plant received one small kindness." }
    },
    {
      id: "lantern-snapshots",
      title: "Lantern Snapshots",
      subtitle: "Light one small thing at a time.",
      durationSec: 75,
      intensity: "micro",
      gardenMetaphor: "lantern",
      safetyNote: "You do not have to look at everything at once.",
      steps: [
        { id: "intro", type: "intro", title: "Lantern Snapshots", body: "When the whole garden feels like a lot, a lantern can show one small thing at a time." },
        { id: "one", type: "gardenAction", title: "First lantern", body: "Let the lantern show one small detail. Just notice this.", durationSec: 12 },
        { id: "two", type: "gardenAction", title: "Second lantern", body: "Now one more small detail. Nothing else needs your attention.", durationSec: 12 },
        { id: "three", type: "gardenAction", title: "Third lantern", body: "One final detail. Let it be simple.", durationSec: 12 },
        { id: "closing", type: "closing", title: "Return to the whole garden", body: "What is easier to see now?" }
      ],
      reflectionPrompts: ["One small thing I noticed was...", "The garden feels more...", "Right now I can take one small step by..."],
      reward: { type: "lantern", intensity: "subtle", message: "The lantern helped you see one thing at a time." }
    },
    {
      id: "garden-fence",
      title: "Garden Fence",
      subtitle: "Notice what needs a gate.",
      durationSec: 180,
      intensity: "deeper",
      gardenMetaphor: "fence",
      safetyNote: "You choose the distance. You can move anything, skip anything, or return to the garden.",
      steps: [
        { id: "intro", type: "intro", title: "Garden Fence", body: "Some parts of the garden are close. Some need a path. Some need a gate. You get to choose." },
        { id: "map", type: "dragMap", title: "Place what belongs where", body: "Move people, roles, or situations into the distance that feels right today. You can leave this blank." },
        { id: "sentence", type: "choice", title: "Choose a gate sentence", body: "Pick one sentence, edit it later, or skip.", choices: ["I need more space.", "I am not available for that.", "Please ask first.", "I need time to answer.", "That does not work for me.", "I want to keep this private.", "I can care and still say no."] },
        { id: "custom-sentence", type: "text", title: "Or write your own", body: "A short sentence is enough.", placeholder: "My gate sentence is...", optional: true },
        { id: "closing", type: "closing", title: "Gate placed", body: "Notice what it feels like to have a gate available." }
      ],
      reflectionPrompts: ["One gate I need is...", "A distance that feels right today is...", "One sentence I want to remember is..."],
      reward: { type: "gate", intensity: "subtle", message: "A gentle gate was placed in the garden." }
    }
  ];


  var introScenes = [
    {
      key: "omen",
      eyebrow: "Before the Garden",
      title: "A kettle sings where no kettle should be.",
      text: "The ordinary evening hushes. Somewhere past the trees, a hidden garden is making room for the version of you it can recognize.",
      action: "Find the Hidden Path"
    }
  ];


  var gardenIntroScenes = [
    {
      key: "path",
      eyebrow: "Discovering the Garden",
      scale: "gate-normal",
      title: "The path was not there yesterday.",
      text: "Between the ordinary trees and the last bit of evening light, a narrow path curls away from the world.",
      action: "Step Closer"
    },
    {
      key: "gate",
      eyebrow: "Discovering the Garden",
      scale: "gate-normal",
      title: "Something waits beneath the ivy.",
      text: "An old garden gate stands half-hidden under leaves. The lock is warm. A paper charm marked 99¢ clings to the iron like it has been waiting for you.",
      action: "Touch the Gate"
    },
    {
      key: "witch",
      eyebrow: "Discovering the Garden",
      scale: "gate-transforming ivy-parting witch-appears",
      title: "A voice comes from the leaves.",
      text: "The ivy parts. A tiny witch peers out from beneath a foxglove hood, holding a bottle no bigger than a thimble.",
      action: "Listen"
    },
    {
      key: "potion",
      eyebrow: "Discovering the Garden",
      scale: "gate-transforming ivy-parting witch-appears potion-offer golden-pulse",
      title: "She offers you a potion.",
      witchLine: "Some gardens can only be entered by becoming small enough to notice them.",
      text: "\"For the gate,\" she says. Not to open it. To become the right size for what waits beyond.",
      action: "Take the Potion"
    },
    {
      key: "sip",
      eyebrow: "Discovering the Garden",
      scale: "gate-transforming witch-appears potion-drink golden-pulse",
      title: "The first sip tastes like moonlight.",
      text: "The bottle warms in your hands. Honey, mint, rainwater, and something like a secret dissolve on your tongue.",
      action: "Drink"
    },
    {
      key: "world-rise",
      eyebrow: "Discovering the Garden",
      scale: "world-rising witch-appears potion-drink",
      title: "The world begins to rise.",
      text: "The grass stretches upward. Pebbles swell into stones. A single drop of dew hangs above you like a little moon.",
      action: "Look Around"
    },
    {
      key: "becoming-small",
      eyebrow: "Discovering the Garden",
      scale: "becoming-small witch-appears potion-drink",
      title: "You are becoming small.",
      text: "Not lost. Not trapped. Just small enough for the garden to know you properly.",
      action: "Let It Happen"
    },
    {
      key: "fairy-size",
      eyebrow: "Discovering the Garden",
      scale: "fairy-scale gate-open witch-appears potion-keepsake",
      title: "Fairy-sized.",
      text: "The keyhole is now an archway. The lantern is a sun. The witch smiles and tucks the empty bottle into her apron.",
      action: "Enter the Garden"
    },
    {
      key: "welcome",
      eyebrow: "Discovering the Garden",
      scale: "fairy-scale gate-open privacy-glow",
      title: "Welcome to The Secret's Garden.",
      text: "This is a private place. No account. No ads. No tracking. What you write here stays in your garden on this device.",
      action: "Draw Your First Card"
    }
  ];



  function defaultState() {
    return {
      screen: "intro",
      introStep: 0,
      gardenIntroStep: 0,
      hasSeenGardenIntro: false,
      day: 1,
      selectedEntry: 0,
      player: null,
      localGardenProfile: createLocalGardenProfile(),
      draft: createDraft(),
      today: null,
      deckChoice: "garden",
      customDeck: {},
      deckStudio: createDeckStudioDraft(),
      ingredientInventory: createIngredientInventory(),
      ingredientPatches: createIngredientPatches(),
      discoveredIngredients: {},
      discoveredPotions: {},
      currentVisitor: null,
      dailyPotion: null,
      gardenUnlocks: [],
      cardPlantUnlocks: {},
      discoveredCards: {},
      gardenObjectPositions: defaultGardenObjectPositions(),
      enabledGardenObjects: defaultStarterGardenObjects(),
      hasChosenGardenObjects: false,
      gardenPlacementMode: false,
      selectedGardenObjectId: "card-altar",
      activeGardenObjectId: "",
      hasSeenGardenHint: false,
      roomTransitionId: "",
      events: [],
      lastDrawDateKey: "",
      dailyAstrologyReadings: {},
      firstDayPath: createFirstDayPath(),
      gardenObjectArrivals: [],
      recentObjectArrival: null,
      gardenFeedback: [],
      dayLessons: [],
      selectedDayLessonId: "",
      settingsMessage: "",
      book: [],
      privateEntries: [],
      privateDraft: createPrivateDraft(),
      journalView: "menu",
      journalSection: "mood",
      selectedPrivateEntryId: "",
      privateSettings: createPrivateSettings(),
      ritualLogs: [],
      gardenResources: [],
      ritualSession: createRitualSession(),
      activeGardenReward: null,
      dewdrops: 0,
      rootingRitual: { active: false },
      gardenSettled: false,
      garden: ["The ivy gate remembers your first arrival."]
    };
  }

  function createDraft() {
    var chart = makeFairyFateChart("first garden");
    return {
      name: "",
      mode: "known_chart",
            sunSign: chart.sun,
      moonSign: chart.moon,
      risingSign: chart.rising,
      chart: chart,
      skinTone: skinTones[3].value,
      hairStyle: hairStyles[0],
      hairColor: "#6b523c",
      wings: "Petal",
      outfit: "Cottage",
      accessory: "Acorn charm"
    };
  }


  function createPrivateDraft() {
    return {
      stateOfMind: "Clear",
      stateIntensity: "soft",
      bodyArea: "Not sure",
      bodySnapshot: [],
      bodyMessage: "",
      cycleSignals: [],
      sleepQuality: "Not noting",
      cycleNotes: "",
      smallPromises: [],
      customPromise: "",
      journalPrompt: journalPrompts[0],
      freeWriting: "",
      gardenNotes: "",
      innerWeather: "Clear",
      energy: "soft",
      cyclePhase: "Not tracking",
      cycleDay: "",
      needs: [],
      glimmer: "",
      reflection: ""
    };
  }

  function createPrivateSettings() {
    return {
      cycleNotesEnabled: false,
      gardenLock: {
        mode: "none",
        passcodeHash: ""
      }
    };
  }



  function createRitualSession() {
    return {
      mode: "menu",
      ritualId: "",
      stepIndex: 0,
      answers: {},
      note: "",
      fallbackObjects: []
    };
  }

  function createLocalId(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  function ritualById(id) {
    return ritualRegistry.find(function (ritual) { return ritual.id === id; });
  }

  function normalizeRitualSession(session) {
    session = session || createRitualSession();
    var mode = ["menu", "consent", "runner", "paused", "reflection", "fallback"].indexOf(session.mode) !== -1 ? session.mode : "menu";
    var ritualId = ritualById(session.ritualId) ? session.ritualId : "";
    if (!ritualId && mode !== "menu") mode = "menu";
    return {
      mode: mode,
      ritualId: ritualId,
      stepIndex: Math.max(0, Number(session.stepIndex || 0)),
      answers: session.answers && typeof session.answers === "object" ? session.answers : {},
      note: session.note || "",
      fallbackObjects: Array.isArray(session.fallbackObjects) ? session.fallbackObjects.filter(Boolean) : []
    };
  }

  function normalizeRitualLog(entry) {
    entry = entry || {};
    return {
      id: entry.id || createLocalId("ritual"),
      ritualId: ritualById(entry.ritualId) ? entry.ritualId : "root-check",
      createdAt: entry.createdAt || new Date().toISOString(),
      selectedSensations: Array.isArray(entry.selectedSensations) ? entry.selectedSensations.filter(Boolean) : [],
      selectedBodyArea: entry.selectedBodyArea || "",
      note: entry.note || "",
      answers: entry.answers && typeof entry.answers === "object" ? entry.answers : {},
      private: entry.private !== false
    };
  }

  function normalizeGardenResource(resource) {
    resource = resource || {};
    return {
      id: resource.id || createLocalId("resource"),
      createdAt: resource.createdAt || new Date().toISOString(),
      name: resource.name || "Unnamed resource",
      category: resource.category || "other",
      symbol: resource.symbol || "tree",
      note: resource.note || "",
      private: resource.private !== false
    };
  }

  function ensureRitualState() {
    if (!state) return;
    state.ritualLogs = Array.isArray(state.ritualLogs) ? state.ritualLogs.map(normalizeRitualLog) : [];
    state.gardenResources = Array.isArray(state.gardenResources) ? state.gardenResources.map(normalizeGardenResource) : [];
    state.ritualSession = normalizeRitualSession(state.ritualSession || createRitualSession());
    state.activeGardenReward = state.activeGardenReward || null;
  }

  function normalizePrivateSettings(settings) {
    settings = settings || createPrivateSettings();
    if (!settings.gardenLock) settings.gardenLock = { mode: "none", passcodeHash: "" };
    var mode = ["none", "private", "journal"].indexOf(settings.gardenLock.mode) !== -1 ? settings.gardenLock.mode : "none";
    var passcodeHash = settings.gardenLock.passcodeHash || "";
    if (!passcodeHash) mode = "none";
    settings.cycleNotesEnabled = settings.cycleNotesEnabled === true;
    settings.gardenLock = { mode: mode, passcodeHash: passcodeHash };
    return settings;
  }

  function normalizePrivateDraft(draft) {
    draft = draft || {};
    draft.stateOfMind = validPrivateOption(legacyStateOfMind(draft.stateOfMind || draft.innerWeather || "Clear"), stateOfMindOptions, "Clear");
    draft.stateIntensity = validPrivateOption(draft.stateIntensity || draft.energy || "soft", stateIntensityOptions, "soft");
    draft.bodyArea = validPrivateOption(draft.bodyArea || "Not sure", bodyAreaOptions, "Not sure");
    draft.bodySnapshot = Array.isArray(draft.bodySnapshot) ? draft.bodySnapshot.filter(function (notice) { return bodySnapshotOptions.indexOf(notice) !== -1; }) : [];
    draft.bodyMessage = draft.bodyMessage || "";
    draft.cycleSignals = Array.isArray(draft.cycleSignals) ? draft.cycleSignals.filter(function (signal) { return cycleNoteOptions.indexOf(signal) !== -1; }) : legacyCycleSignals(draft);
    draft.sleepQuality = validPrivateOption(draft.sleepQuality || "Not noting", sleepQualityOptions, "Not noting");
    draft.cycleNotes = draft.cycleNotes || "";
    draft.smallPromises = Array.isArray(draft.smallPromises) ? draft.smallPromises.filter(Boolean) : legacyNeedsToPromises(draft.needs);
    draft.customPromise = draft.customPromise || "";
    draft.journalPrompt = validPrivateOption(draft.journalPrompt || journalPrompts[0], journalPrompts, journalPrompts[0]);
    draft.freeWriting = draft.freeWriting || draft.reflection || "";
    draft.gardenNotes = draft.gardenNotes || draft.glimmer || "";
    draft.innerWeather = draft.stateOfMind;
    draft.energy = draft.stateIntensity;
    draft.cyclePhase = draft.cycleSignals.indexOf("period started") !== -1 ? "Period" : "Not tracking";
    draft.cycleDay = draft.cycleDay || "";
    draft.needs = draft.smallPromises.slice();
    draft.glimmer = draft.gardenNotes;
    draft.reflection = draft.freeWriting;
    return draft;
  }

  function normalizePrivateEntry(entry) {
    entry = entry || {};
    var draft = normalizePrivateDraft(entry);
    entry.stateOfMind = draft.stateOfMind;
    entry.stateIntensity = draft.stateIntensity;
    entry.bodyArea = draft.bodyArea;
    entry.bodySnapshot = draft.bodySnapshot.slice();
    entry.bodyMessage = draft.bodyMessage;
    entry.cycleSignals = draft.cycleSignals.slice();
    entry.sleepQuality = draft.sleepQuality;
    entry.cycleNotes = draft.cycleNotes;
    entry.smallPromises = getDraftPromises(draft);
    entry.journalPrompt = draft.journalPrompt;
    entry.freeWriting = draft.freeWriting;
    entry.gardenNotes = draft.gardenNotes;
    entry.innerWeather = entry.stateOfMind;
    entry.energy = entry.stateIntensity;
    entry.needs = entry.smallPromises.slice();
    entry.reflection = entry.freeWriting;
    entry.glimmer = entry.gardenNotes;
    return entry;
  }

  function privateDraftFromEntry(entry) {
    entry = normalizePrivateEntry(entry || {});
    return normalizePrivateDraft({
      stateOfMind: entry.stateOfMind || entry.innerWeather,
      stateIntensity: entry.stateIntensity || entry.energy,
      bodyArea: entry.bodyArea,
      bodySnapshot: (entry.bodySnapshot || []).slice(),
      bodyMessage: entry.bodyMessage,
      cycleSignals: (entry.cycleSignals || []).slice(),
      sleepQuality: entry.sleepQuality,
      cycleNotes: entry.cycleNotes,
      smallPromises: (entry.smallPromises || entry.needs || []).slice(),
      customPromise: "",
      journalPrompt: entry.journalPrompt,
      freeWriting: entry.freeWriting || entry.reflection,
      gardenNotes: entry.gardenNotes || entry.glimmer
    });
  }

  function privateEntryForDay(day) {
    var entries = state.privateEntries || [];
    for (var index = entries.length - 1; index >= 0; index -= 1) {
      if (entries[index] && entries[index].day === day) return entries[index];
    }
    return null;
  }

  function prepareTodayPrivateDraft() {
    var existing = privateEntryForDay(state.day);
    if (existing) state.privateDraft = privateDraftFromEntry(existing);
    else state.privateDraft = normalizePrivateDraft(state.privateDraft || createPrivateDraft());
  }

  function validPrivateOption(value, options, fallback) {
    return options.indexOf(value) !== -1 ? value : fallback;
  }

  function legacyStateOfMind(value) {
    var map = { Soft: "Tender", Bright: "Hopeful", Quiet: "Grounded", Sparksome: "Curious" };
    return map[value] || value;
  }

  function legacyCycleSignals(draft) {
    if (draft.cyclePhase === "Period") return ["period started"];
    return [];
  }

  function legacyNeedsToPromises(needs) {
    var map = { Water: "Drink water", Rest: "Rest", Movement: "Stretch", Comfort: "Rest", Connection: "Text someone kind", "Fresh air": "Step outside" };
    if (!Array.isArray(needs)) return [];
    return needs.map(function (need) { return map[need] || need; }).filter(Boolean);
  }

  function createDeckStudioDraft() {
    var firstCard = tarotCards[0];
    return {
      cardId: firstCard.id,
      template: "Garden Frame",
      layers: [],
      selectedLayerId: "",
      border: "Gold",
      title: firstCard.name,
      number: "0"
    };
  }

  function createLocalGardenProfile() {
    return {
      id: "garden-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
      label: "Local Garden Profile",
      createdAt: new Date().toISOString(),
      lastSavedAt: new Date().toISOString()
    };
  }

  function normalizeLocalGardenProfile(profile) {
    var fallback = createLocalGardenProfile();
    profile = profile || {};
    return {
      id: profile.id || fallback.id,
      label: profile.label || "Local Garden Profile",
      createdAt: profile.createdAt || fallback.createdAt,
      lastSavedAt: profile.lastSavedAt || fallback.lastSavedAt
    };
  }

  function createFirstDayPath() {
    return {
      dismissed: false,
      completed: false,
      visited: { garden: true }
    };
  }

  function normalizeFirstDayPath(path) {
    path = path || {};
    var visited = path.visited && typeof path.visited === "object" ? path.visited : {};
    visited.garden = true;
    return {
      dismissed: path.dismissed === true,
      completed: path.completed === true,
      visited: visited
    };
  }

  function normalizeGardenObjectArrival(entry) {
    if (!entry || typeof entry !== "object") return null;
    var object = gardenObjectById(entry.objectId);
    if (!object && entry.objectId !== "garden") return null;
    return {
      id: entry.id || createLocalId("arrival"),
      objectId: entry.objectId || "garden",
      name: entry.name || (object ? object.name : "Garden"),
      line: entry.line || "A new place settles into the garden.",
      createdAt: entry.createdAt || new Date().toISOString()
    };
  }

  function normalizeGardenFeedback(entry) {
    if (!entry || typeof entry !== "object") return null;
    return {
      id: entry.id || createLocalId("garden-note"),
      kind: entry.kind || "garden",
      objectId: entry.objectId || "",
      message: entry.message || "The garden changes quietly.",
      createdAt: entry.createdAt || new Date().toISOString()
    };
  }

  function normalizeDayLesson(lesson) {
    if (!lesson || typeof lesson !== "object") return null;
    return {
      id: lesson.id || createLocalId("leaf"),
      day: Number(lesson.day || 1),
      dateKey: lesson.dateKey || lesson.date || localDayKey(),
      createdAt: lesson.createdAt || new Date().toISOString(),
      updatedAt: lesson.updatedAt || lesson.createdAt || new Date().toISOString(),
      title: lesson.title || "A quiet leaf from the Memory Tree",
      thread: lesson.thread || "",
      tarot: lesson.tarot || "No card drawn",
      astrology: lesson.astrology || "No sky reading saved",
      feelings: lesson.feelings || "No Grimoire page saved",
      ritual: lesson.ritual || "No ritual saved",
      lesson: lesson.lesson || "The day was gathered gently.",
      question: lesson.question || "What should this day teach softly?",
      private: lesson.private !== false
    };
  }

  function addGardenFeedback(kind, message, objectId) {
    state.gardenFeedback = Array.isArray(state.gardenFeedback) ? state.gardenFeedback : [];
    state.gardenFeedback.unshift(normalizeGardenFeedback({
      id: createLocalId("garden-note"),
      kind: kind || "garden",
      objectId: objectId || "",
      message: message,
      createdAt: new Date().toISOString()
    }));
    state.gardenFeedback = state.gardenFeedback.filter(Boolean).slice(0, 16);
  }

  function latestGardenFeedback() {
    state.gardenFeedback = Array.isArray(state.gardenFeedback) ? state.gardenFeedback.map(normalizeGardenFeedback).filter(Boolean) : [];
    return state.gardenFeedback[0] || null;
  }

  function gardenObjectArrivalLine(object, returning) {
    var lines = {
      "card-altar": returning ? "The Card Altar lifts its cloth and waits without hurry." : "The Card Altar rises from the moss, its deck warm as a held secret.",
      observatory: returning ? "The Observatory turns its brass eye back toward the sky." : "The Observatory unfolds a tiny glass dome and catches one star.",
      grimoire: returning ? "The Grimoire opens to a blank cream page again." : "The Grimoire settles on a flat stone, already smelling faintly of ink.",
      "tending-grove": returning ? "The Tending Grove makes room beneath its leaves again." : "The Tending Grove grows three soft shadows and a place to breathe.",
      "memory-tree": returning ? "The Memory Tree shakes one silver leaf awake." : "The Memory Tree unfurls one silver leaf and begins listening."
    };
    return lines[object.id] || (returning ? object.name + " returns softly to the sanctuary." : object.name + " finds a place in the sanctuary.");
  }

  function noteGardenObjectArrival(objectId) {
    var object = gardenObjectById(objectId);
    if (!object) return;
    state.gardenObjectArrivals = Array.isArray(state.gardenObjectArrivals) ? state.gardenObjectArrivals : [];
    var returning = state.gardenObjectArrivals.some(function (arrival) { return arrival && arrival.objectId === object.id; });
    var arrival = normalizeGardenObjectArrival({
      id: createLocalId("arrival"),
      objectId: object.id,
      name: object.name,
      line: gardenObjectArrivalLine(object, returning),
      createdAt: new Date().toISOString()
    });
    state.recentObjectArrival = arrival;
    state.gardenObjectArrivals.unshift(arrival);
    state.gardenObjectArrivals = state.gardenObjectArrivals.filter(Boolean).slice(0, 18);
    addGardenFeedback("arrival", arrival.line, object.id);
    if (!state.garden) state.garden = [];
    state.garden.push(arrival.line);
  }

  function noteGardenObjectRest(objectId) {
    var object = gardenObjectById(objectId);
    if (!object) return;
    addGardenFeedback("rest", object.name + " rests under a leaf. Nothing private was deleted.", object.id);
  }

  function gardenObjectById(id) {
    return gardenObjectCatalog.find(function (object) { return object.id === id; });
  }

  function defaultStarterGardenObjects() {
    var starterIds = ["card-altar", "observatory", "grimoire", "tending-grove", "memory-tree"];
    var enabled = {};
    gardenObjectCatalog.forEach(function (object) { enabled[object.id] = starterIds.indexOf(object.id) !== -1; });
    return enabled;
  }

  function allGardenObjectsEnabled() {
    var enabled = {};
    gardenObjectCatalog.forEach(function (object) { enabled[object.id] = true; });
    return enabled;
  }

  function normalizeEnabledGardenObjects(enabled, useAllAsFallback) {
    var fallback = useAllAsFallback ? allGardenObjectsEnabled() : defaultStarterGardenObjects();
    enabled = enabled || {};
    gardenObjectCatalog.forEach(function (object) {
      fallback[object.id] = typeof enabled[object.id] === "boolean" ? enabled[object.id] : fallback[object.id];
    });
    return fallback;
  }

  function gardenObjectEnabled(id) {
    ensureGardenObjectStateShape();
    return state.enabledGardenObjects[id] === true;
  }

  function visibleGardenObjects() {
    ensureGardenObjectStateShape();
    return gardenObjectCatalog.filter(function (object) { return state.enabledGardenObjects[object.id] === true; });
  }

  function firstEnabledGardenObject() {
    return visibleGardenObjects()[0] || gardenObjectCatalog[0];
  }

  function ensureGardenObjectStateShape() {
    if (!state) return;
    var hasExistingGarden = state.hasChosenGardenObjects === true || state.hasSeenGardenIntro === true || !!state.player;
    state.enabledGardenObjects = normalizeEnabledGardenObjects(state.enabledGardenObjects || {}, hasExistingGarden);
    state.hasChosenGardenObjects = state.hasChosenGardenObjects === true;
  }

  function defaultGardenObjectPositions() {
    var positions = {};
    gardenObjectCatalog.forEach(function (object) {
      positions[object.id] = { x: object.x, y: object.y };
    });
    return positions;
  }

  function normalizeGardenObjectPositions(positions) {
    var normalized = defaultGardenObjectPositions();
    positions = positions || {};
    gardenObjectCatalog.forEach(function (object) {
      var saved = positions[object.id] || {};
      normalized[object.id] = {
        x: clampNumber(saved.x, 8, 92, object.x),
        y: clampNumber(saved.y, 16, 88, object.y)
      };
    });
    return normalized;
  }

  function ensureGardenSceneSave() {
    state.gardenObjectPositions = normalizeGardenObjectPositions(state.gardenObjectPositions || {});
    ensureGardenObjectStateShape();
    state.gardenPlacementMode = state.gardenPlacementMode === true;
    if (!gardenObjectById(state.selectedGardenObjectId) || !gardenObjectEnabled(state.selectedGardenObjectId)) state.selectedGardenObjectId = firstEnabledGardenObject().id;
    if (!gardenObjectById(state.activeGardenObjectId) || !gardenObjectEnabled(state.activeGardenObjectId)) state.activeGardenObjectId = "";
  }

  function firstDayPathSteps() {
    return [
      { id: "garden", label: "Arrive", detail: "Find the garden", objectId: "" },
      { id: "card-altar", label: "Listen", detail: "Draw or visit the Card Altar", objectId: "card-altar" },
      { id: "observatory", label: "Look Up", detail: "Read the daily sky", objectId: "observatory" },
      { id: "grimoire", label: "Write", detail: "Open the Grimoire", objectId: "grimoire" },
      { id: "tending-grove", label: "Tend", detail: "Try a gentle ritual", objectId: "tending-grove" },
      { id: "memory-tree", label: "Gather", detail: "Save a Memory Tree leaf", objectId: "memory-tree" }
    ];
  }

  function firstDayPathStepComplete(step) {
    state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
    if (step.id === "garden") return true;
    if (step.id === "card-altar") return !!currentCard() || state.firstDayPath.visited[step.id] === true;
    if (step.id === "observatory") return !!currentStoredDailyAstrologyReading(activeChart()) || state.firstDayPath.visited[step.id] === true;
    if (step.id === "grimoire") return !!privateEntryForDay(state.day) || state.firstDayPath.visited[step.id] === true;
    if (step.id === "tending-grove") return todayRitualLogs().length > 0 || state.firstDayPath.visited[step.id] === true;
    if (step.id === "memory-tree") return !!currentDayLesson() || state.firstDayPath.visited[step.id] === true;
    return state.firstDayPath.visited[step.id] === true;
  }

  function firstDayPathProgress() {
    ensureGardenObjectStateShape();
    state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
    var steps = firstDayPathSteps().map(function (step) {
      var enabled = !step.objectId || gardenObjectEnabled(step.objectId);
      return Object.assign({}, step, {
        enabled: enabled,
        complete: !enabled || firstDayPathStepComplete(step)
      });
    });
    var activeSteps = steps.filter(function (step) { return step.enabled; });
    var completed = activeSteps.filter(function (step) { return step.complete; }).length;
    var next = activeSteps.find(function (step) { return !step.complete; }) || null;
    if (!next && activeSteps.length && !state.firstDayPath.completed) state.firstDayPath.completed = true;
    return { steps: steps, activeSteps: activeSteps, completed: completed, total: activeSteps.length, next: next };
  }

  function markFirstDayPathVisit(objectId) {
    state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
    if (objectId) state.firstDayPath.visited[objectId] = true;
    var progress = firstDayPathProgress();
    if (!progress.next) state.firstDayPath.completed = true;
  }

  function renderObjectArrivalMoment() {
    var arrival = normalizeGardenObjectArrival(state.recentObjectArrival);
    if (!arrival) return '';
    return '<section class="content-panel object-arrival-moment"><p class="eyebrow">Sanctuary Arrival</p><h2>' + escapeHtml(arrival.name) + '</h2><p>' + escapeHtml(arrival.line) + '</p></section>';
  }

  function renderGardenFeedbackTrail() {
    var feedback = (state.gardenFeedback || []).map(normalizeGardenFeedback).filter(Boolean).slice(0, 3);
    if (!feedback.length) return '';
    return '<section class="garden-feedback-trail">' + feedback.map(function (entry) {
      return '<article class="feedback-' + escapeHtml(slug(entry.kind)) + '"><span>' + escapeHtml(entry.kind) + '</span><p>' + escapeHtml(entry.message) + '</p></article>';
    }).join("") + '</section>';
  }

  function renderFirstDayPathGuide() {
    state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
    if (state.firstDayPath.dismissed && !state.firstDayPath.completed) return '';
    var progress = firstDayPathProgress();
    if (progress.total <= 1) return '';
    var done = !progress.next;
    var nextObject = progress.next && progress.next.objectId ? gardenObjectById(progress.next.objectId) : null;
    var title = done ? "The first circle is complete." : "A gentle first-day path is lit.";
    var body = done ? "The garden has shown you its first rooms. From here, wandering is the point." : "This path is optional. It simply points to the next doorway that helps the day feel whole.";
    var actions = done ? '<button class="ghost" data-action="dismiss-first-day-path">Let it rest</button>' : '<button class="primary" data-action="first-day-next" data-id="' + escapeHtml(nextObject ? nextObject.id : "") + '">' + escapeHtml(nextObject ? "Open " + nextObject.name : "Continue") + '</button><button class="ghost" data-action="dismiss-first-day-path">Let me wander</button>';
    return '<section class="content-panel first-day-path-panel"><div class="first-day-path-heading"><div><p class="eyebrow">First Day Path</p><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(body) + '</p></div><div class="first-day-count"><strong>' + escapeHtml(progress.completed) + '</strong><span>of ' + escapeHtml(progress.total) + '</span></div></div>' +
      '<div class="first-day-step-row">' + progress.steps.map(function (step) {
        var className = (step.enabled ? '' : 'resting ') + (step.complete ? 'complete ' : '') + (progress.next && progress.next.id === step.id ? 'current' : '');
        return '<div class="first-day-step ' + className + '"><span></span><strong>' + escapeHtml(step.label) + '</strong><small>' + escapeHtml(step.enabled ? step.detail : "Resting for now") + '</small></div>';
      }).join("") + '</div><div class="action-row">' + actions + '</div></section>';
  }

  function localDateLabel(value) {
    if (!value) return "Not saved yet";
    try {
      return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch (error) {
      return "Saved locally";
    }
  }

  function localTimeLabel(value) {
    if (!value) return "Not saved yet";
    try {
      return new Date(value).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    } catch (error) {
      return "Saved locally";
    }
  }

  function localDayKey(value) {
    var date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function dateFromDayKey(dateKey) {
    var parts = String(dateKey || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some(function (part) { return !Number.isFinite(part); })) return new Date();
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
  }

  function dayKeyLabel(dateKey) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ""))) return localDateLabel(dateKey);
    return dateFromDayKey(dateKey).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function astrologyChartKey(chart) {
    chart = chart || activeChart();
    return [validSign(chart.sun), validSign(chart.moon), validSign(chart.rising)].join("|");
  }

  function dailyAstrologyFocuses() {
    return [
      { name: "Gentle attention", tone: "notice what is asking for a softer gaze", practice: "Pause at one threshold before answering the day.", question: "What becomes clearer when you stop trying to force it?", garden: "A small gold moth circles the observatory glass." },
      { name: "Brave beginning", tone: "take one honest first step", practice: "Choose the smallest action that still feels alive.", question: "Where is courage asking to be tiny rather than dramatic?", garden: "A lantern seed brightens beside the path." },
      { name: "Rooted care", tone: "protect the tender thing without hiding it", practice: "Give one need a name before the day carries it away.", question: "What part of you wants steadiness before advice?", garden: "The moss under the telescope feels newly warm." },
      { name: "Clear exchange", tone: "speak plainly and listen for the echo", practice: "Let one sentence be simple enough to be true.", question: "What truth could be kind because it is clear?", garden: "The observatory window clears one pane at a time." },
      { name: "Creative spark", tone: "make room for delight to have a practical shape", practice: "Move one idea from the air into a note, sketch, or task.", question: "What wants to become real before it becomes perfect?", garden: "Sunpetals lean toward the star charts." },
      { name: "Deep rest", tone: "let recovery be part of the spell", practice: "Leave one corner of the day deliberately unfilled.", question: "What can wait because you are allowed to return?", garden: "Moonmint folds itself around the observatory steps." },
      { name: "Useful wonder", tone: "follow curiosity until it becomes guidance", practice: "Ask one better question before choosing an answer.", question: "What is the garden trying to teach through repetition?", garden: "A blue spark travels around the brass telescope ring." }
    ];
  }

  function normalizeDailyAstrologyReadings(readings) {
    var normalized = {};
    if (!readings || typeof readings !== "object") return normalized;
    Object.keys(readings).forEach(function (dateKey) {
      var reading = readings[dateKey];
      if (!reading || typeof reading !== "object") return;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return;
      var chart = reading.chart || {};
      var safeChart = { sun: validSign(chart.sun), moon: validSign(chart.moon), rising: validSign(chart.rising) };
      normalized[dateKey] = {
        id: reading.id || "astro-" + dateKey,
        dateKey: reading.dateKey || dateKey,
        createdAt: reading.createdAt || new Date().toISOString(),
        chartKey: reading.chartKey || astrologyChartKey(safeChart),
        chart: safeChart,
        focus: reading.focus || "Gentle attention",
        title: reading.title || "The sky keeps a small lamp lit.",
        overview: reading.overview || "The observatory is ready to read the garden weather.",
        guidance: reading.guidance || "Let the day be interpreted gently.",
        practice: reading.practice || "Pause once and notice what has changed.",
        question: reading.question || "What is the sky asking you to notice?",
        moonNote: reading.moonNote || "The moon keeps watch.",
        seasonNote: reading.seasonNote || "The season colors the garden.",
        gardenNote: reading.gardenNote || "The observatory stays quiet and bright."
      };
    });
    return normalized;
  }

  function createDailyAstrologyReading(chart, dateKey) {
    chart = { sun: validSign(chart.sun), moon: validSign(chart.moon), rising: validSign(chart.rising) };
    dateKey = dateKey || localDayKey();
    var seed = hashText(dateKey + astrologyChartKey(chart));
    var date = dateFromDayKey(dateKey);
    var moon = moonPhaseForDate(date);
    var season = seasonForDate(date);
    var sun = signStyles[chart.sun];
    var moonSign = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    var focuses = dailyAstrologyFocuses();
    var focus = focuses[seed % focuses.length];
    var secondary = focuses[Math.floor(seed / 7) % focuses.length];
    if (secondary.name === focus.name) secondary = focuses[(seed + 3) % focuses.length];
    var titleOptions = [
      "The observatory finds " + focus.name.toLowerCase() + ".",
      "Today's sky opens through " + chart.rising + ".",
      "The moon writes " + focus.name.toLowerCase() + " in dew.",
      chart.sun + " sunlight gathers at the glass."
    ];
    return {
      id: "astro-" + dateKey + "-" + seed.toString(36),
      dateKey: dateKey,
      createdAt: new Date().toISOString(),
      chartKey: astrologyChartKey(chart),
      chart: chart,
      focus: focus.name,
      title: titleOptions[seed % titleOptions.length],
      overview: "Sun in " + chart.sun + " brings " + sun.magic + "; Moon in " + chart.moon + " asks for " + moonSign.aura + "; Rising in " + chart.rising + " enters through " + rising.outfitName + ".",
      guidance: "Let " + focus.tone + ". If the day gets loud, return to " + secondary.name.toLowerCase() + " as the second thread.",
      practice: focus.practice,
      question: focus.question,
      moonNote: moon.name + ": " + moon.garden,
      seasonNote: season.name + ": " + season.tone,
      gardenNote: focus.garden
    };
  }

  function hasCurrentDailyAstrologyReading(chart) {
    state.dailyAstrologyReadings = normalizeDailyAstrologyReadings(state.dailyAstrologyReadings || {});
    var reading = state.dailyAstrologyReadings[localDayKey()];
    return !!(reading && reading.chartKey === astrologyChartKey(chart));
  }

  function currentStoredDailyAstrologyReading(chart) {
    state.dailyAstrologyReadings = normalizeDailyAstrologyReadings(state.dailyAstrologyReadings || {});
    var reading = state.dailyAstrologyReadings[localDayKey()];
    if (!reading || reading.chartKey !== astrologyChartKey(chart)) return null;
    return reading;
  }

  function ensureDailyAstrologyReading(chart) {
    state.dailyAstrologyReadings = normalizeDailyAstrologyReadings(state.dailyAstrologyReadings || {});
    var dateKey = localDayKey();
    var reading = state.dailyAstrologyReadings[dateKey];
    if (!reading || reading.chartKey !== astrologyChartKey(chart)) {
      reading = createDailyAstrologyReading(chart, dateKey);
      state.dailyAstrologyReadings[dateKey] = reading;
    }
    return reading;
  }

  function canDrawDailyCard() {
    var todayKey = localDayKey();
    if (state.today && state.today.cardId && state.today.dateKey === todayKey) return false;
    if (state.lastDrawDateKey === todayKey) return false;
    return true;
  }

  function canBeginFreshDailyRitual() {
    var todayKey = localDayKey();
    if (!state.today) return state.lastDrawDateKey !== todayKey;
    if (!state.today.cardId) return true;
    return state.today.dateKey !== todayKey;
  }

  function nextDrawAvailableAt() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  }

  function nextDrawCountdownMs() {
    return Math.max(0, nextDrawAvailableAt().getTime() - Date.now());
  }

  function formatDrawCountdown(ms) {
    var totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function nextDrawAvailableLabel() {
    return nextDrawAvailableAt().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  function renderNextDrawCountdown(compact) {
    if (canDrawDailyCard()) return '';
    return '<div class="draw-countdown ' + (compact ? 'compact' : '') + '" aria-live="polite"><span>Next card draw</span><strong data-draw-countdown="true">' + escapeHtml(formatDrawCountdown(nextDrawCountdownMs())) + '</strong><small>Available at ' + escapeHtml(nextDrawAvailableLabel()) + ' local time.</small></div>';
  }

  function updateDrawCountdowns() {
    var countdowns = app.querySelectorAll('[data-draw-countdown]');
    if (!countdowns.length) return;
    var label = canDrawDailyCard() ? 'Available now' : formatDrawCountdown(nextDrawCountdownMs());
    countdowns.forEach(function (node) { node.textContent = label; });
  }

  function createIngredientInventory(seedAmount) {
    var inventory = {};
    ingredients.forEach(function (ingredient) { inventory[ingredient.id] = typeof seedAmount === "number" ? seedAmount : 2; });
    return inventory;
  }

  function normalizeIngredientInventory(inventory) {
    var normalized = createIngredientInventory(2);
    inventory = inventory || {};
    ingredients.forEach(function (ingredient) {
      var amount = Number(inventory[ingredient.id]);
      normalized[ingredient.id] = Number.isFinite(amount) && amount >= 0 ? Math.floor(amount) : normalized[ingredient.id];
    });
    return normalized;
  }

  function createIngredientPatches() {
    var patches = {};
    ingredients.forEach(function (ingredient, index) {
      patches[ingredient.id] = {
        ingredientId: ingredient.id,
        state: index < 4 ? "ready" : "growing",
        lastAction: index < 4 ? "ready" : "waiting",
        lastTouchedDay: 0
      };
    });
    return patches;
  }

  function normalizeIngredientPatches(patches) {
    var fallback = createIngredientPatches();
    patches = patches || {};
    ingredients.forEach(function (ingredient) {
      var patch = patches[ingredient.id] || {};
      var stateName = ["empty", "growing", "ready", "harvested"].indexOf(patch.state) !== -1 ? patch.state : fallback[ingredient.id].state;
      fallback[ingredient.id] = {
        ingredientId: ingredient.id,
        state: stateName,
        lastAction: patch.lastAction || fallback[ingredient.id].lastAction,
        lastTouchedDay: Number(patch.lastTouchedDay || 0)
      };
    });
    return fallback;
  }

  function ensureIngredientSave() {
    state.ingredientInventory = normalizeIngredientInventory(state.ingredientInventory);
    state.ingredientPatches = normalizeIngredientPatches(state.ingredientPatches);
    state.discoveredIngredients = state.discoveredIngredients || {};
    state.discoveredPotions = state.discoveredPotions || {};
    state.gardenUnlocks = Array.isArray(state.gardenUnlocks) ? state.gardenUnlocks : [];
    ensureCardBloomSave();
    if (state.today) {
      state.today.selectedIngredients = Array.isArray(state.today.selectedIngredients) ? state.today.selectedIngredients.filter(function (id) { return !!getIngredient(id); }).slice(0, 3) : [];
      state.today.gathered = Array.isArray(state.today.gathered) ? state.today.gathered : [];
      state.today.inventory = state.ingredientInventory;
    }
    ensureGardenSceneSave();
  }

  function loadState() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (!saved) return defaultState();
      var parsed = JSON.parse(saved);
      parsed.draft = normalizeDraft(Object.assign(createDraft(), parsed.draft || {}));
      parsed.gardenIntroStep = Math.max(0, Math.min(gardenIntroScenes.length - 1, Number(parsed.gardenIntroStep || 0)));
      parsed.hasSeenGardenIntro = typeof parsed.hasSeenGardenIntro === "boolean" ? parsed.hasSeenGardenIntro : !!parsed.player;
      parsed.localGardenProfile = normalizeLocalGardenProfile(parsed.localGardenProfile);
      if (!parsed.book) parsed.book = [];
      parsed.deckChoice = parsed.deckChoice === "custom" ? "custom" : "garden";
      parsed.customDeck = parsed.customDeck || {};
      parsed.deckStudio = normalizeDeckStudio(Object.assign(createDeckStudioDraft(), parsed.deckStudio || {}));
      parsed.ingredientInventory = normalizeIngredientInventory(parsed.ingredientInventory || parsed.inventory || {});
      parsed.ingredientPatches = normalizeIngredientPatches(parsed.ingredientPatches || {});
      parsed.discoveredIngredients = parsed.discoveredIngredients || {};
      parsed.discoveredPotions = parsed.discoveredPotions || {};
      parsed.currentVisitor = parsed.currentVisitor || null;
      parsed.dailyPotion = parsed.dailyPotion || null;
      parsed.gardenUnlocks = Array.isArray(parsed.gardenUnlocks) ? parsed.gardenUnlocks : [];
      parsed.cardPlantUnlocks = parsed.cardPlantUnlocks || {};
      parsed.discoveredCards = normalizeDiscoveredCards(parsed.discoveredCards || {});
      parsed.gardenObjectPositions = normalizeGardenObjectPositions(parsed.gardenObjectPositions || {});
      var existingGardenObjects = !!parsed.player || parsed.hasSeenGardenIntro === true;
      parsed.enabledGardenObjects = normalizeEnabledGardenObjects(parsed.enabledGardenObjects || {}, existingGardenObjects);
      parsed.hasChosenGardenObjects = typeof parsed.hasChosenGardenObjects === "boolean" ? parsed.hasChosenGardenObjects : existingGardenObjects;
      parsed.gardenPlacementMode = parsed.gardenPlacementMode === true;
      parsed.selectedGardenObjectId = gardenObjectById(parsed.selectedGardenObjectId) ? parsed.selectedGardenObjectId : "card-altar";
      parsed.activeGardenObjectId = gardenObjectById(parsed.activeGardenObjectId) ? parsed.activeGardenObjectId : "";
      parsed.hasSeenGardenHint = parsed.hasSeenGardenHint === true;
      parsed.roomTransitionId = "";
      parsed.events = Array.isArray(parsed.events) ? parsed.events : [];
      parsed.lastDrawDateKey = parsed.lastDrawDateKey || (parsed.today && parsed.today.dateKey && parsed.today.cardId ? parsed.today.dateKey : "");
      parsed.dailyAstrologyReadings = normalizeDailyAstrologyReadings(parsed.dailyAstrologyReadings || {});
      parsed.firstDayPath = normalizeFirstDayPath(parsed.firstDayPath || {});
      parsed.gardenObjectArrivals = Array.isArray(parsed.gardenObjectArrivals) ? parsed.gardenObjectArrivals.map(normalizeGardenObjectArrival).filter(Boolean).slice(0, 18) : [];
      parsed.recentObjectArrival = normalizeGardenObjectArrival(parsed.recentObjectArrival);
      parsed.gardenFeedback = Array.isArray(parsed.gardenFeedback) ? parsed.gardenFeedback.map(normalizeGardenFeedback).filter(Boolean).slice(0, 16) : [];
      parsed.dayLessons = Array.isArray(parsed.dayLessons) ? parsed.dayLessons.map(normalizeDayLesson).filter(Boolean) : [];
      parsed.selectedDayLessonId = parsed.selectedDayLessonId || "";
      parsed.settingsMessage = parsed.settingsMessage || "";
      parsed.today = normalizeToday(parsed.today, parsed.day);
      if (!parsed.privateEntries) parsed.privateEntries = [];
      parsed.privateEntries = parsed.privateEntries.map(normalizePrivateEntry);
      parsed.journalView = ["menu", "new", "archive"].indexOf(parsed.journalView) !== -1 ? parsed.journalView : "menu";
      parsed.journalSection = ["mood", "body", "intentions", "cycle", "writing", "notes"].indexOf(parsed.journalSection) !== -1 ? parsed.journalSection : "mood";
      parsed.selectedPrivateEntryId = parsed.selectedPrivateEntryId || "";
      var legacyPrivateDraft = parsed.privateDraft || {};
      parsed.privateSettings = normalizePrivateSettings(Object.assign(createPrivateSettings(), parsed.privateSettings || {}));
      if (legacyPrivateDraft.cyclePhase && legacyPrivateDraft.cyclePhase !== "Not tracking") parsed.privateSettings.cycleNotesEnabled = true;
      parsed.privateDraft = normalizePrivateDraft(Object.assign(createPrivateDraft(), legacyPrivateDraft));
      parsed.ritualLogs = Array.isArray(parsed.ritualLogs) ? parsed.ritualLogs.map(normalizeRitualLog) : [];
      parsed.gardenResources = Array.isArray(parsed.gardenResources) ? parsed.gardenResources.map(normalizeGardenResource) : [];
      parsed.ritualSession = normalizeRitualSession(parsed.ritualSession || createRitualSession());
      parsed.activeGardenReward = parsed.activeGardenReward || null;
      if (typeof parsed.dewdrops !== "number") parsed.dewdrops = 0;
      parsed.rootingRitual = parsed.rootingRitual || { active: false };
      parsed.gardenSettled = parsed.gardenSettled === true;
      if (!parsed.garden) parsed.garden = [];
      var loadedState = parsed;
      state = loadedState;
      ensureIngredientSave();
      return state;
    } catch (error) {
      return defaultState();
    }
  }

  var state = loadState();
  var gardenLockSessionUnlocked = false;
  var tarotAudio = {
    context: null,
    shuffleSource: null,
    shuffleGain: null,
    shuffleInterval: null
  };
  var rootingHoldTimer = null;
  var lockDraft = {
    setupMode: state.privateSettings ? state.privateSettings.gardenLock.mode : "none",
    setupKey: "",
    unlockKey: ""
  };

  function saveState() {
    ensureIngredientSave();
    ensureRitualState();
    state.localGardenProfile = normalizeLocalGardenProfile(state.localGardenProfile);
    state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
    state.gardenFeedback = (state.gardenFeedback || []).map(normalizeGardenFeedback).filter(Boolean).slice(0, 16);
    state.gardenObjectArrivals = (state.gardenObjectArrivals || []).map(normalizeGardenObjectArrival).filter(Boolean).slice(0, 18);
    state.recentObjectArrival = normalizeGardenObjectArrival(state.recentObjectArrival);
    state.dayLessons = (state.dayLessons || []).map(normalizeDayLesson).filter(Boolean);
    state.localGardenProfile.lastSavedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  function hashText(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i += 1) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  function makeFairyFateChart(seed) {
    var base = seed || String(Date.now()) + Math.random();
    return {
      sun: signs[hashText(base + "sun") % signs.length],
      moon: signs[hashText(base + "moon") % signs.length],
      rising: signs[hashText(base + "rising") % signs.length]
    };
  }

  function sunSignFromDate(dateValue) {
    if (!dateValue) return signs[hashText("unknown sun") % signs.length];
    var parts = dateValue.split("-");
    var month = Number(parts[1]);
    var day = Number(parts[2]);
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  }

  function validSign(value) {
    return signs.indexOf(value) !== -1 ? value : "Aries";
  }

  function normalizeDraft(draft) {
    var fallback = makeFairyFateChart("fallback");
    draft.mode = draft.mode === "fairy_fate" ? "fairy_fate" : "known_chart";
    draft.chart = draft.chart || fallback;
    draft.sunSign = validSign(draft.sunSign || draft.chart.sun || fallback.sun);
    draft.moonSign = validSign(draft.moonSign || draft.chart.moon || fallback.moon);
    draft.risingSign = validSign(draft.risingSign || draft.chart.rising || fallback.rising);
    draft.chart = {
      sun: validSign(draft.chart.sun || draft.sunSign),
      moon: validSign(draft.chart.moon || draft.moonSign),
      rising: validSign(draft.chart.rising || draft.risingSign)
    };
    if (!skinTones.some(function (tone) { return tone.value === draft.skinTone; })) draft.skinTone = skinTones[3].value;
    if (hairStyles.indexOf(draft.hairStyle) === -1) draft.hairStyle = hairStyles[0];
    if (!draft.hairColor) draft.hairColor = "#6b523c";
    if (wingOptions.indexOf(draft.wings) === -1) draft.wings = "Petal";
    if (outfitOptions.indexOf(draft.outfit) === -1) draft.outfit = "Cottage";
    if (accessoryOptions.indexOf(draft.accessory) === -1) draft.accessory = "Acorn charm";
    return draft;
  }

  function setDraftChart(chart) {
    state.draft.chart = {
      sun: validSign(chart.sun),
      moon: validSign(chart.moon),
      rising: validSign(chart.rising)
    };
    state.draft.sunSign = state.draft.chart.sun;
    state.draft.moonSign = state.draft.chart.moon;
    state.draft.risingSign = state.draft.chart.rising;
  }

  function syncDraftChartFromMode() {
    normalizeDraft(state.draft);
    if (state.draft.mode === "fairy_fate") {
      setDraftChart(state.draft.chart);
      return;
    }
    setDraftChart({ sun: state.draft.sunSign, moon: state.draft.moonSign, rising: state.draft.risingSign });
  }

  function applyChartSuggestion() {
    var chart = state.draft.chart;
    var sun = signStyles[chart.sun];
    var rising = signStyles[chart.rising];
    state.draft.hairColor = sun.hair;
    state.draft.wings = wingFromSign(chart.sun);
    state.draft.outfit = outfitFromSign(chart.rising);
    state.draft.accessory = titleCase(rising.accessory);
  }

  function randomizeFairyDraft() {
    updateDraftFromInputs();
    if (!state.draft) state.draft = createDraft();
    var seed = String(Date.now()) + Math.random();
    var skinPool = skinTones.filter(function (tone) { return tone.name !== "Porcelain"; });
    state.draft.mode = "fairy_fate";
    setDraftChart(makeFairyFateChart(seed));
    state.draft.skinTone = randomPick(skinPool.length ? skinPool : skinTones).value;
    state.draft.hairStyle = randomPick(hairStyles);
    state.draft.hairColor = randomPick(["#2b202f", "#513124", "#6b523c", "#8c3025", "#b45d2f", "#d9b45f", "#7c6aa8", "#5f68a8", "#b98285"]);
    state.draft.wings = randomPick(wingOptions);
    state.draft.outfit = randomPick(outfitOptions);
    state.draft.accessory = randomPick(accessoryOptions);
    if (!String(state.draft.name || "").trim()) state.draft.name = randomPick(fairyNameOptions);
  }

  function wingFromSign(sign) {
    var map = { Aries: "Dragonfly", Taurus: "Leaf", Gemini: "Butterfly", Cancer: "Moonlit", Leo: "Petal", Virgo: "Leaf", Libra: "Butterfly", Scorpio: "Moth", Sagittarius: "Dragonfly", Capricorn: "Moth", Aquarius: "Dragonfly", Pisces: "Moonlit" };
    return map[sign] || "Petal";
  }

  function outfitFromSign(sign) {
    var map = { Aries: "Sunlit", Taurus: "Cottage", Gemini: "Woodland", Cancer: "Moonlit", Leo: "Sunlit", Virgo: "Herbalist", Libra: "Starlit", Scorpio: "Moonlit", Sagittarius: "Woodland", Capricorn: "Herbalist", Aquarius: "Starlit", Pisces: "Moonlit" };
    return map[sign] || "Cottage";
  }

  function titleCase(value) {
    return String(value || "").replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, function (char) {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === "'") return "&#39;";
      return "&quot;";
    });
  }

  function tarotDisplayText(value) {
    var text = String(value == null ? "" : value);
    tarotCards.forEach(function (card) {
      var title = card.character && card.character.characterTitle;
      if (title && title !== card.name) text = text.split(title).join(card.name);
    });
    return text;
  }

  function escapeTarotText(value) {
    return escapeHtml(tarotDisplayText(value));
  }

  function disabledAttr(disabled) {
    return disabled ? " disabled" : "";
  }

  function getPotion(id) {
    return potions.find(function (potion) { return potion.id === id; });
  }

  function getIngredient(id) {
    return ingredients.find(function (ingredient) { return ingredient.id === id; });
  }

  function getCard(id) {
    return tarotCards.find(function (card) { return card.id === id; });
  }

  function getCardByName(name) {
    return tarotCards.find(function (card) { return card.name === name; });
  }

  function cardEventDetails(card) {
    var parts = minorCardParts(card.name);
    var chart = activeChart();
    var ingredient = card.bonus ? getIngredient(card.bonus) : null;
    return {
      id: "evt-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      type: "card_drawn",
      day: state.today ? state.today.day : state.day,
      timestamp: new Date().toISOString(),
      cardId: card.id,
      cardName: card.name,
      arcana: parts ? "minor" : "major",
      suit: parts ? parts.suit : "Major Arcana",
      rank: parts ? parts.rank : "",
      tags: (card.tags || []).slice(),
      ingredientReward: ingredient ? ingredient.name : "A quiet basket",
      sunSign: chart.sun,
      moonSign: chart.moon,
      risingSign: chart.rising
    };
  }

  function appendGardenEvent(event) {
    if (!state.events) state.events = [];
    state.events.push(event);
  }

  function randomPick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomReflectionQuestion(card) {
    var character = card && card.character ? card.character : null;
    var pool = [];
    if (card && card.reflection) pool.push(card.reflection);
    if (character && character.reflectionPrompt) pool.push(character.reflectionPrompt);
    pool = pool.concat(reflectionQuestions);
    return randomPick(pool);
  }

  function normalizeTinySpell(spell) {
    if (!spell || !spell.id) return null;
    var known = tinySpells.find(function (item) { return item.id === spell.id; });
    return known ? Object.assign({}, known, spell) : null;
  }

  function randomTinySpell(card, seed) {
    var tone = card && card.tags && card.tags.length ? card.tags[hashText(card.id + String(seed || "")) % card.tags.length] : "mystery";
    var preferred = tinySpells.filter(function (spell) { return spell.tone === tone || (card && card.tags && card.tags.indexOf(spell.tone) !== -1); });
    return Object.assign({}, randomPick(preferred.length ? preferred.concat(tinySpells) : tinySpells));
  }

  function ensureTodayRitualDetails(today, card) {
    if (!today || !card) return;
    if (!today.reflectionQuestion) today.reflectionQuestion = randomReflectionQuestion(card);
    today.spell = normalizeTinySpell(today.spell) || randomTinySpell(card, today.day);
  }

  function ingredientCategory(id) {
    var ingredient = getIngredient(id);
    return ingredient && ingredient.category ? ingredient.category : "mystery";
  }

  function categoryLabel(category) {
    return String(category || "mystery").replace(/^./, function (letter) { return letter.toUpperCase(); });
  }

  function randomIngredientReward(card) {
    var pool = ingredients.slice();
    if (card && card.bonus) {
      var bonus = getIngredient(card.bonus);
      if (bonus) pool.push(bonus, bonus);
    }
    var spell = state.today && state.today.spell ? state.today.spell : null;
    if (spell && spell.tone) ingredients.filter(function (ingredient) { return ingredient.category === spell.tone; }).forEach(function (ingredient) { pool.push(ingredient); });
    return randomPick(pool);
  }

  function shuffleDailySpell() {
    if (!state.today || !state.today.cardId || state.today.spellCompleted) return;
    state.today.spell = randomTinySpell(getCard(state.today.cardId), Date.now());
    state.today.notes.push("The tiny spell was shuffled into a gentler shape.");
    saveState();
    render();
  }

  function completeDailySpell() {
    if (!state.today || !state.today.cardId || state.today.spellCompleted) return;
    ensureIngredientSave();
    var card = getCard(state.today.cardId);
    ensureTodayRitualDetails(state.today, card);
    var ingredient = randomIngredientReward(card);
    if (!ingredient) return;
    state.ingredientInventory[ingredient.id] = (state.ingredientInventory[ingredient.id] || 0) + 1;
    state.today.inventory = state.ingredientInventory;
    state.today.spellCompleted = true;
    state.today.spellIngredientId = ingredient.id;
    state.today.gathered.push(ingredient.name + " earned from " + state.today.spell.title + ".");
    state.today.notes.push("Completed tiny spell: " + state.today.spell.title + ". Earned " + ingredient.name + ".");
    state.today.gardenChanges.push("A " + ingredient.name + " joined the basket after one small thing was tended.");
    state.garden.push("You tended one small thing. " + ingredient.name + " joined the basket.");
    addGardenFeedback("herb", ingredient.name + " appears after the tiny spell is tended.", "card-altar");
    discoverIngredient(ingredient.id);
    upsertBookEntryForCardPull(card);
    saveState();
    render();
  }

  function potionCategoryForIngredients(ids) {
    var counts = {};
    (ids || []).forEach(function (id) { var category = ingredientCategory(id); counts[category] = (counts[category] || 0) + 1; });
    var order = ["softening", "energy", "protection", "clarity", "mystery"];
    return order.sort(function (a, b) { return (counts[b] || 0) - (counts[a] || 0) || order.indexOf(a) - order.indexOf(b); })[0] || "mystery";
  }

  function potionFromSelectedIngredientCategories(ids) {
    var category = potionCategoryForIngredients(ids);
    var profile = potionCategoryProfiles[category] || potionCategoryProfiles.mystery;
    return { id: "category_" + category, name: profile.name, color: profile.color, ingredients: ids.slice(), ingredientNames: ingredientNames(ids), tags: [category], category: category, use: profile.use, effect: profile.garden, fallback: false };
  }

  function potionResultMessage(brew) {
    var profile = potionCategoryProfiles[brew.category] || potionCategoryProfiles.mystery;
    return "The " + brew.name + " settles into the soil like a promise. " + profile.garden + " Tend one small thing, and something beautiful grows.";
  }

  function gardenMilestones() {
    var blooms = discoveredCardBlooms().length;
    return [
      { count: 3, name: "Moonwell", text: "A moonlit basin opens where reflected cards can gather." },
      { count: 7, name: "Three-card spreads", text: "The tarot table learns a deeper shape for future readings." },
      { count: 14, name: "Greenhouse", text: "Glass panes wake under ivy, ready for rare ingredients." },
      { count: 21, name: "Fairy Market", text: "A mossy lane of tiny stalls begins to shimmer past the gate." }
    ].map(function (milestone) {
      milestone.unlocked = blooms >= milestone.count;
      milestone.remaining = Math.max(0, milestone.count - blooms);
      return milestone;
    });
  }


  function getDeckDesign(cardId) {
    var design = state.customDeck && state.customDeck[cardId] ? state.customDeck[cardId] : null;
    return design ? normalizeDeckStudio(design) : null;
  }

  function activeDeckDesign(cardId) {
    if (state.deckChoice !== "custom") return null;
    var design = getDeckDesign(cardId);
    return hasDeckArtwork(design) ? design : null;
  }

  function normalizeDeckStudio(draft) {
    draft = draft || createDeckStudioDraft();
    var card = getCard(draft.cardId) || tarotCards[0];
    draft.cardId = card.id;
    draft.template = deckTemplateOptions.indexOf(draft.template) !== -1 ? draft.template : "Garden Frame";
    draft.border = deckBorderOptions.indexOf(draft.border) !== -1 ? draft.border : "Gold";
    draft.title = draft.title || card.name;
    draft.number = draft.number || String(tarotCards.indexOf(card));
    draft.layers = normalizeDeckLayers(draft);
    var selectedLayer = getSelectedDeckLayer(draft);
    draft.selectedLayerId = selectedLayer ? selectedLayer.id : "";
    draft.imageData = selectedLayer ? selectedLayer.imageData : "";
    draft.x = selectedLayer ? selectedLayer.x : 0;
    draft.y = selectedLayer ? selectedLayer.y : 0;
    draft.scale = selectedLayer ? selectedLayer.scale : 1;
    draft.rotate = selectedLayer ? selectedLayer.rotate : 0;
    draft.crop = selectedLayer ? selectedLayer.crop : 0;
    return draft;
  }

  function normalizeDeckLayers(draft) {
    var layers = Array.isArray(draft.layers) ? draft.layers : [];
    var normalized = layers.map(normalizeDeckLayer).filter(function (layer) { return layer.imageData; });
    if (!normalized.length && draft.imageData) {
      normalized.push(normalizeDeckLayer({
        id: "legacy-image",
        name: "Image 1",
        imageData: draft.imageData,
        x: draft.x,
        y: draft.y,
        scale: draft.scale,
        rotate: draft.rotate,
        crop: draft.crop
      }, 0));
    }
    return normalized;
  }

  function normalizeDeckLayer(layer, index) {
    layer = layer || {};
    return {
      id: layer.id || "layer-" + (index + 1),
      name: layer.name || "Image " + (index + 1),
      imageData: layer.imageData || "",
      x: clampNumber(layer.x, -100, 100, 0),
      y: clampNumber(layer.y, -100, 100, 0),
      scale: clampNumber(layer.scale, 0.4, 2.4, 1),
      rotate: clampNumber(layer.rotate, -180, 180, 0),
      crop: clampNumber(layer.crop, 0, 34, 0)
    };
  }

  function createDeckLayer(imageData, name) {
    return normalizeDeckLayer({
      id: "layer-" + Date.now() + "-" + Math.floor(Math.random() * 100000),
      name: name,
      imageData: imageData,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      crop: 0
    }, 0);
  }

  function copyDeckLayer(layer) {
    return {
      id: layer.id,
      name: layer.name,
      imageData: layer.imageData,
      x: layer.x,
      y: layer.y,
      scale: layer.scale,
      rotate: layer.rotate,
      crop: layer.crop
    };
  }

  function getSelectedDeckLayer(draft) {
    var layers = draft && Array.isArray(draft.layers) ? draft.layers : [];
    if (!layers.length) return null;
    return layers.find(function (layer) { return layer.id === draft.selectedLayerId; }) || layers[layers.length - 1];
  }

  function hasDeckArtwork(design) {
    if (!design) return false;
    var source = normalizeDeckStudio(Object.assign(createDeckStudioDraft(), design));
    return source.layers.some(function (layer) { return !!layer.imageData; });
  }

  function serializeDeckDesign(draft) {
    draft = normalizeDeckStudio(draft);
    var layers = draft.layers.map(copyDeckLayer);
    var legacyLayer = layers[0] || null;
    return {
      cardId: draft.cardId,
      template: draft.template,
      layers: layers,
      selectedLayerId: draft.selectedLayerId,
      imageData: legacyLayer ? legacyLayer.imageData : "",
      x: legacyLayer ? legacyLayer.x : 0,
      y: legacyLayer ? legacyLayer.y : 0,
      scale: legacyLayer ? legacyLayer.scale : 1,
      rotate: legacyLayer ? legacyLayer.rotate : 0,
      crop: legacyLayer ? legacyLayer.crop : 0,
      border: draft.border,
      title: draft.title,
      number: draft.number
    };
  }

  function updateSelectedDeckLayerField(field, value) {
    if (!state.deckStudio) state.deckStudio = createDeckStudioDraft();
    normalizeDeckStudio(state.deckStudio);
    var layer = getSelectedDeckLayer(state.deckStudio);
    if (!layer) return;
    if (["x", "y", "scale", "rotate", "crop"].indexOf(field) !== -1) layer[field] = Number(value);
    else layer[field] = value;
    normalizeDeckStudio(state.deckStudio);
  }

  function moveSelectedDeckLayer(offset) {
    if (!state.deckStudio) return;
    normalizeDeckStudio(state.deckStudio);
    var layers = state.deckStudio.layers;
    var currentIndex = layers.findIndex(function (layer) { return layer.id === state.deckStudio.selectedLayerId; });
    var nextIndex = currentIndex + offset;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= layers.length) return;
    var layer = layers[currentIndex];
    layers.splice(currentIndex, 1);
    layers.splice(nextIndex, 0, layer);
  }

  function removeSelectedDeckLayer() {
    if (!state.deckStudio) return;
    normalizeDeckStudio(state.deckStudio);
    var selectedId = state.deckStudio.selectedLayerId;
    var removedIndex = state.deckStudio.layers.findIndex(function (layer) { return layer.id === selectedId; });
    state.deckStudio.layers = state.deckStudio.layers.filter(function (layer) { return layer.id !== selectedId; });
    var fallback = state.deckStudio.layers[Math.max(0, removedIndex - 1)] || state.deckStudio.layers[0];
    state.deckStudio.selectedLayerId = fallback ? fallback.id : "";
    normalizeDeckStudio(state.deckStudio);
  }

  function clampNumber(value, min, max, fallback) {
    var number = Number(value);
    if (!Number.isFinite(number)) number = fallback;
    return Math.min(max, Math.max(min, number));
  }

  function slug(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function currentCard() {
    return state.today && state.today.cardId ? getCard(state.today.cardId) : null;
  }

  function normalizeToday(today, fallbackDay) {
    if (!today) return null;
    today.day = today.day || fallbackDay || (state && state.day) || 1;
    today.dateKey = today.dateKey || today.drawDateKey || localDayKey();
    today.cardId = today.cardId || null;
    today.inventory = today.inventory || newInventory(null);
    today.brewed = Array.isArray(today.brewed) ? today.brewed : [];
    today.served = Array.isArray(today.served) ? today.served : [];
    today.conversation = Array.isArray(today.conversation) ? today.conversation : [];
    today.customers = Array.isArray(today.customers) ? today.customers : [];
    if (today.cardId) {
      var card = getCard(today.cardId);
      if (card && (!today.customers.length || today.customers[0].cardId !== card.id || !today.customers[0].characterTitle)) today.customers = chooseCustomers(card);
      ensureTodayRitualDetails(today, card);
    }
    today.gardenChanges = Array.isArray(today.gardenChanges) ? today.gardenChanges : [];
    today.notes = Array.isArray(today.notes) ? today.notes : [];
    today.gathered = Array.isArray(today.gathered) ? today.gathered : [];
    today.selectedIngredients = Array.isArray(today.selectedIngredients) ? today.selectedIngredients.filter(function (id) { return !!getIngredient(id); }).slice(0, 3) : [];
    today.spellCompleted = today.spellCompleted === true;
    today.spellIngredientId = today.spellIngredientId || "";
    today.dailyPotion = today.dailyPotion || null;
    today.potionResult = today.potionResult || "";
    today.settled = today.settled === true;
    today.plantUnlock = today.plantUnlock || null;
    today.newDiscovery = today.newDiscovery === true;
    if (today.cardId) today.drawState = today.drawState === "revealing" ? "revealed" : "revealed";
    else today.drawState = today.drawState === "shuffling" ? "shuffling" : "idle";
    return today;
  }

  function normalizeDiscoveredCards(cards) {
    var normalized = {};
    Object.keys(cards || {}).forEach(function (cardId) {
      var record = cards[cardId] || {};
      normalized[cardId] = {
        cardId: cardId,
        firstDiscoveredDay: record.firstDiscoveredDay || record.day || 1,
        timesDrawn: Math.max(1, Number(record.timesDrawn || 1)),
        history: Array.isArray(record.history) ? record.history : []
      };
    });
    return normalized;
  }

  function cardBloomBase(card) {
    var parts = minorCardParts(card.name);
    var suitBlooms = {
      Wands: { plantType: "Lantern sprout", color: "#e7aa4e", tone: "warmth and courage", place: "near the gate lanterns" },
      Cups: { plantType: "Mooncup bloom", color: "#8aa7d8", tone: "feeling and dreams", place: "beside the Moon Pond" },
      Swords: { plantType: "Clearbell stem", color: "#8cc6c2", tone: "truth and clean air", place: "beneath the chimes" },
      Pentacles: { plantType: "Velvet rootling", color: "#7d9467", tone: "body, home, and care", place: "between old stones" }
    };
    if (parts) return suitBlooms[parts.suit] || suitBlooms.Pentacles;
    if (hasAny(card.tags || [], ["warmth", "courage", "joy", "movement", "craft"])) return suitBlooms.Wands;
    if (hasAny(card.tags || [], ["dream", "intuition", "care", "mystery"])) return suitBlooms.Cups;
    if (hasAny(card.tags || [], ["clarity", "truth", "change"])) return suitBlooms.Swords;
    if (hasAny(card.tags || [], ["roots", "patience", "calm", "wisdom"])) return suitBlooms.Pentacles;
    return { plantType: "Secret bloom", color: "#d88fa0", tone: "wonder", place: "where the path bends" };
  }

  function cardBloomName(card) {
    var names = {
      "The Fool": "Ivy Path Sprout",
      "The Magician": "Sparkhand Sage",
      "The High Priestess": "Moonveil Mint",
      "The Empress": "Honeybloom Rose",
      "The Emperor": "Stonepath Laurel",
      "The Hierophant": "Ritecup Thyme",
      "The Lovers": "Twinblossom Vine",
      "The Chariot": "Gatepath Marigold",
      "Strength": "Soft-Thorn Balm",
      "The Hermit": "Lanterncap Moss",
      "Wheel of Fortune": "Turning Clover",
      "Justice": "Clearbell Reed",
      "The Hanged Man": "Hanging Dew Fern",
      "Death": "Compost Lily",
      "Temperance": "Two-Cup Iris",
      "The Devil": "Bitterroot Thorn",
      "The Tower": "Stormseed Poppy",
      "The Star": "Starlace Bloom",
      "The Moon": "Dreamcap Moonflower",
      "The Sun": "Sunpetal Crown",
      "Judgement": "Bellflower Trumpet",
      "The World": "Circlepath Laurel"
    };
    if (names[card.name]) return names[card.name];
    var parts = minorCardParts(card.name);
    if (parts) return parts.rank + " " + cardBloomBase(card).plantType;
    return card.name.replace(/^The /, "") + " Bloom";
  }

  function cardBloomForCard(card, day) {
    var base = cardBloomBase(card);
    return {
      cardId: card.id,
      cardName: card.name,
      plantName: cardBloomName(card),
      plantType: base.plantType,
      color: base.color,
      tone: base.tone,
      place: base.place,
      unlockedDay: day || state.day,
      description: "A " + base.plantType.toLowerCase() + " rooted " + base.place + " after " + card.name + " was discovered. It carries " + base.tone + "."
    };
  }

  function ensureCardBloomSave() {
    state.cardPlantUnlocks = state.cardPlantUnlocks || {};
    Object.keys(state.discoveredCards || {}).forEach(function (cardId) {
      if (state.cardPlantUnlocks[cardId]) return;
      var card = getCard(cardId);
      if (!card) return;
      var record = state.discoveredCards[cardId] || {};
      state.cardPlantUnlocks[cardId] = cardBloomForCard(card, record.firstDiscoveredDay || state.day);
    });
  }

  function unlockCardBloom(card, firstDiscovery) {
    state.cardPlantUnlocks = state.cardPlantUnlocks || {};
    if (!firstDiscovery || state.cardPlantUnlocks[card.id]) return null;
    var bloom = cardBloomForCard(card, state.today ? state.today.day : state.day);
    state.cardPlantUnlocks[card.id] = bloom;
    if (state.gardenUnlocks.indexOf(bloom.plantName) === -1) state.gardenUnlocks.push(bloom.plantName);
    if (state.today) {
      state.today.plantUnlock = bloom;
      state.today.gardenChanges.push("A new card bloom rooted: " + bloom.plantName + ".");
    }
    state.garden.push("A new card bloom rooted: " + bloom.plantName + " for " + card.name + ".");
    return bloom;
  }

  function discoveredCardBlooms() {
    ensureCardBloomSave();
    return Object.keys(state.cardPlantUnlocks || {}).map(function (cardId) { return state.cardPlantUnlocks[cardId]; }).filter(Boolean).sort(function (a, b) {
      return Number(b.unlockedDay || 0) - Number(a.unlockedDay || 0) || a.plantName.localeCompare(b.plantName);
    });
  }

  function discoverTarotCard(card) {
    if (!state.discoveredCards) state.discoveredCards = {};
    var record = state.discoveredCards[card.id];
    var firstDiscovery = !record;
    if (!record) {
      record = { cardId: card.id, firstDiscoveredDay: state.day, timesDrawn: 0, history: [] };
      state.discoveredCards[card.id] = record;
    }
    record.timesDrawn += 1;
    record.history.push({ day: state.day, date: new Date().toISOString() });
    return firstDiscovery;
  }

  function tarotJournalRecord(cardId) {
    return state.discoveredCards && state.discoveredCards[cardId] ? state.discoveredCards[cardId] : null;
  }

  function randomTarotCard() {
    return tarotCards[Math.floor(Math.random() * tarotCards.length)];
  }

  function sampleShuffleCards() {
    var preferred = ["the_moon", "the_sun", "death", "the_star", "the_hermit", "three_of_cups", "queen_of_pentacles", "the_fool", "the_tower", "ace_of_wands", "justice", "ten_of_swords"];
    var sample = preferred.map(getCard).filter(Boolean);
    var offset = hashText(String(state.day) + (state.player ? state.player.name : "garden")) % tarotCards.length;
    for (var i = 0; sample.length < 16 && i < tarotCards.length; i += 5) {
      sample.push(tarotCards[(offset + i) % tarotCards.length]);
    }
    return sample.slice(0, 16);
  }

  function beginTarotDraw() {
    if (!state.today && canBeginFreshDailyRitual()) startNewDay("tea");
    if (!state.today || state.today.cardId || !canDrawDailyCard()) return;
    state.today.drawState = "shuffling";
    startTarotShuffleSound();
    saveState();
    render();
  }

  function completeTarotDraw() {
    if (!state.today && canBeginFreshDailyRitual()) startNewDay("tea");
    if (!state.today || state.today.cardId || !canDrawDailyCard()) return;
    var card = randomTarotCard();
    state.today.cardId = card.id;
    state.today.dateKey = localDayKey();
    state.lastDrawDateKey = state.today.dateKey;
    state.today.drawState = "revealing";
    ensureTodayRitualDetails(state.today, card);
    var firstDiscovery = discoverTarotCard(card);
    state.today.newDiscovery = firstDiscovery;
    state.today.inventory = normalizeIngredientInventory(state.ingredientInventory);
    unlockCardBloom(card, firstDiscovery);
    state.today.customers = chooseCustomers(card);
    state.currentVisitor = state.today.customers[0] || null;
    state.today.gardenChanges.push(card.name + " arrived at the tarot table and changed the shape of the day.");
    appendGardenEvent(cardEventDetails(card));
    upsertBookEntryForCardPull(card);
    state.garden.push("A card has arrived: " + card.name + ".");
    markFirstDayPathVisit("card-altar");
    addGardenFeedback("tarot", card.name + " turns over, and the Card Altar warms the moss.", "card-altar");
    stopTarotShuffleSound();
    playTarotRevealChime();
    saveState();
    render();
    window.setTimeout(function () {
      if (state.today && state.today.cardId === card.id && state.today.drawState === "revealing") {
        state.today.drawState = "revealed";
        saveState();
        render();
      }
    }, 1900);
  }

  function ensureTarotAudioContext() {
    try {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      if (!tarotAudio.context) tarotAudio.context = new AudioContext();
      if (tarotAudio.context.state === "suspended") tarotAudio.context.resume();
      return tarotAudio.context;
    } catch (error) {
      return null;
    }
  }

  function startTarotShuffleSound() {
    var context = ensureTarotAudioContext();
    if (!context || tarotAudio.shuffleSource) return;
    try {
      var bufferSize = context.sampleRate * 2;
      var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i += 1) data[i] = (Math.random() * 2 - 1) * 0.18;
      var source = context.createBufferSource();
      var filter = context.createBiquadFilter();
      var gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      filter.type = "bandpass";
      filter.frequency.value = 820;
      filter.Q.value = 0.7;
      gain.gain.value = 0.025;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start();
      tarotAudio.shuffleSource = source;
      tarotAudio.shuffleGain = gain;
      tarotAudio.shuffleInterval = window.setInterval(function () { playSoftBell(0.018, 620); }, 4200);
    } catch (error) {
      stopTarotShuffleSound();
    }
  }

  function stopTarotShuffleSound() {
    if (tarotAudio.shuffleInterval) window.clearInterval(tarotAudio.shuffleInterval);
    tarotAudio.shuffleInterval = null;
    try {
      if (tarotAudio.shuffleGain && tarotAudio.context) tarotAudio.shuffleGain.gain.setTargetAtTime(0.0001, tarotAudio.context.currentTime, 0.08);
      if (tarotAudio.shuffleSource) tarotAudio.shuffleSource.stop(tarotAudio.context.currentTime + 0.18);
    } catch (error) {}
    tarotAudio.shuffleSource = null;
    tarotAudio.shuffleGain = null;
  }

  function playSoftBell(volume, frequency) {
    var context = ensureTarotAudioContext();
    if (!context) return;
    try {
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.2);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1.25);
    } catch (error) {}
  }

  function playTarotRevealChime() {
    playSoftBell(0.055, 880);
  }

  function newInventory(card) {
    var inventory = normalizeIngredientInventory(state && state.ingredientInventory ? state.ingredientInventory : createIngredientInventory(2));
    if (card && card.bonus) inventory[card.bonus] = (inventory[card.bonus] || 0) + 2;
    return inventory;
  }

  function ingredientNames(ids) {
    return (ids || []).map(function (id) {
      var ingredient = getIngredient(id);
      return ingredient ? ingredient.name : id;
    });
  }

  function sortedIngredientKey(ids) {
    return (ids || []).slice().sort().join("+");
  }

  function recipeForIngredients(ids) {
    var key = sortedIngredientKey(ids);
    return potions.find(function (potion) { return sortedIngredientKey(potion.ingredients) === key; }) || null;
  }

  function fallbackPotionForIngredients(ids) {
    var index = Math.abs(hashText(sortedIngredientKey(ids) || "garden")) % fallbackPotionNames.length;
    var names = ingredientNames(ids);
    return {
      id: "fallback_" + slug(fallbackPotionNames[index]),
      name: fallbackPotionNames[index],
      ingredients: ids.slice(),
      use: "The garden accepts imperfect magic too.",
      tags: ["care", "wonder"],
      color: "#d88fa0",
      fallback: true,
      effect: names.length ? "A soft brew made from " + names.join(", ") + "." : "A soft brew with a mystery at its center."
    };
  }

  function potionFromBrewed(brewed) {
    if (!brewed) return null;
    return getPotion(brewed.id) || brewed;
  }

  function discoverIngredient(id) {
    if (!state.discoveredIngredients) state.discoveredIngredients = {};
    state.discoveredIngredients[id] = true;
  }

  function discoverPotion(potion) {
    if (!potion) return;
    if (!state.discoveredPotions) state.discoveredPotions = {};
    state.discoveredPotions[potion.id] = {
      name: potion.name,
      firstBrewedDay: state.today ? state.today.day : state.day,
      fallback: potion.fallback === true
    };
  }

  function harvestIngredient(id) {
    ensureIngredientSave();
    var ingredient = getIngredient(id);
    var patch = state.ingredientPatches[id];
    if (!ingredient || !patch || patch.state !== "ready") return;
    state.ingredientInventory[id] = (state.ingredientInventory[id] || 0) + 1;
    patch.state = "harvested";
    patch.lastAction = "harvested";
    patch.lastTouchedDay = state.day;
    discoverIngredient(id);
    if (state.today) {
      state.today.gathered = state.today.gathered || [];
      state.today.gathered.push(ingredient.name);
      state.today.notes.push("Gathered " + ingredient.name + " from " + ingredient.location + ".");
    }
    state.garden.push("You gathered " + ingredient.name + ". The patch settles back into the moss.");
    addGardenFeedback("herb", ingredient.name + " leaves a bright scent in the herb bed.", "tending-grove");
    saveState();
    render();
  }

  function tendIngredient(id, action) {
    ensureIngredientSave();
    var ingredient = getIngredient(id);
    var patch = state.ingredientPatches[id];
    if (!ingredient || !patch) return;
    if (patch.state === "ready") return;
    patch.lastAction = action || ingredient.tendAction || "Tended";
    patch.lastTouchedDay = state.day;
    patch.state = patch.state === "growing" ? "ready" : "growing";
    state.garden.push(ingredient.name + " is " + (patch.state === "ready" ? "ready to harvest" : "growing under gentle care") + ".");
    addGardenFeedback("herb", ingredient.name + " " + (patch.state === "ready" ? "glows ready beside the path." : "settles deeper into the soil."), "tending-grove");
    saveState();
    render();
  }

  function toggleCauldronIngredient(id) {
    if (!state.today || !state.today.cardId || !state.today.spellCompleted) return;
    ensureIngredientSave();
    var ingredient = getIngredient(id);
    if (!ingredient || (state.ingredientInventory[id] || 0) <= 0) return;
    var selected = state.today.selectedIngredients || [];
    var existing = selected.indexOf(id);
    if (existing !== -1) selected.splice(existing, 1);
    else if (selected.length < 3) selected.push(id);
    state.today.selectedIngredients = selected;
    saveState();
    render();
  }

  function clearCauldron() {
    if (!state.today) return;
    state.today.selectedIngredients = [];
    saveState();
    render();
  }

  function brewSelectedIngredients() {
    if (!state.today || !state.today.cardId || !state.today.spellCompleted) return;
    ensureIngredientSave();
    var selected = (state.today.selectedIngredients || []).slice();
    if (selected.length !== 3) return;
    var canBrew = selected.every(function (id) { return (state.ingredientInventory[id] || 0) > 0; });
    if (!canBrew) return;
    selected.forEach(function (id) { state.ingredientInventory[id] -= 1; discoverIngredient(id); });
    var brew = potionFromSelectedIngredientCategories(selected);
    brew.result = potionResultMessage(brew);
    brew.brewedAt = new Date().toISOString();
    brew.leisure = !!state.today.dailyPotion;
    state.today.brewed.push(brew);
    state.today.selectedIngredients = [];
    if (!state.today.dailyPotion) {
      state.today.dailyPotion = brew;
      state.today.potionResult = brew.result;
      state.dailyPotion = brew;
    }
    discoverPotion(brew);
    state.today.notes.push("Brewed " + brew.name + " with " + brew.ingredientNames.join(", ") + (brew.leisure ? " while relaxing in the garden." : "."));
    state.today.gardenChanges.push(brew.effect);
    state.today.gardenChanges.push("A " + categoryLabel(brew.category).toLowerCase() + " decoration settled into the garden.");
    if (state.gardenUnlocks.indexOf(brew.effect) === -1) state.gardenUnlocks.push(brew.effect);
    state.garden.push(brew.result);
    addGardenFeedback("potion", brew.name + " leaves a colored shimmer in the moss.", "tending-grove");
    if (state.today.settled) settleBookEntryForToday(getCard(state.today.cardId), null, getCard(state.today.cardId).name + " shaped the day, and the garden stayed open for quiet potion-making.");
    else upsertBookEntryForCardPull(getCard(state.today.cardId));
    saveState();
    render();
  }

  function chooseCustomers(card) {
    return card ? [tarotCardVisitor(card)] : [];
  }

  function tarotCardVisitor(card) {
    var character = card.character || tarotCharacterProfile(card);
    var relationship = cardRelationshipState(card);
    return {
      cardId: card.id,
      name: card.name,
      characterTitle: character.characterTitle,
      domain: character.domain,
      request: character.arrivalText,
      arrivalText: character.arrivalText,
      opening: character.shortDialogueLine,
      personalityTone: character.personalityTone,
      hiddenNeed: character.emotionalNeed,
      emotionalNeed: character.emotionalNeed,
      preferredPotionId: character.preferredPotionId,
      preferredPotion: character.preferredPotion,
      preferredIngredients: character.preferredIngredients,
      reflectionPrompt: character.reflectionPrompt,
      gardenEffect: character.gardenEffect,
      relationshipState: relationship,
      familiarity: relationship,
      tags: card.tags || [],
      success: card.name + " softens around the cup. " + character.gardenEffect,
      gift: character.gardenEffect
    };
  }

  function cardReadyForPotion() {
    return !!(state.today && state.today.conversation && state.today.conversation.length);
  }

  function cardConversationOptions(visitor) {
    var title = visitor && visitor.name ? visitor.name : "today's card";
    var need = visitor && visitor.emotionalNeed ? visitor.emotionalNeed : "what is tender";
    return [
      { tone: "listen", label: "Listen", text: "Let " + title + " arrive in its own words." },
      { tone: "ask", label: "Ask", text: "Ask what " + need + " is asking for." },
      { tone: "offer", label: "Offer Tea", text: "Watch which ingredients glow in the steam." }
    ];
  }

  function cardConversationResponse(visitor, tone) {
    if (!visitor) return "The garden listens.";
    var title = visitor.name || "today's card";
    if (tone === "ask") return title + " names the tender place: " + (visitor.emotionalNeed || visitor.hiddenNeed || visitor.request) + ".";
    if (tone === "offer") return "Steam curls toward " + (visitor.preferredIngredients || []).join(", ") + ", pointing to " + visitor.preferredPotion + ".";
    return title + " says, \"" + (visitor.opening || visitor.request) + "\"";
  }



  function talkToCard(tone) {
    if (!state.today || visitorHelpedToday()) return;
    var visitor = currentVisitor();
    if (!visitor) return;
    var options = cardConversationOptions(visitor);
    var option = options.find(function (item) { return item.tone === tone; }) || options[0];
    state.today.conversation = state.today.conversation || [];
    state.today.conversation.push({ tone: option.tone, label: option.label, text: cardConversationResponse(visitor, option.tone) });
    state.today.gardenChanges.push((visitor.name || "Today's card") + " has been heard in the apothecary.");
    saveState();
    render();
  }

  function overlap(a, b) {
    return a.filter(function (item) { return b.indexOf(item) !== -1; });
  }

  function dailyVisitorGoal() {
    return 1;
  }

  function currentVisitor() {
    if (!state.today || !state.today.customers) return null;
    return state.today.customers[state.today.served.length] || null;
  }

  function visitorHelpedToday() {
    return !!(state.today && state.today.served && state.today.served.length >= dailyVisitorGoal());
  }

  function potionResonance(potion, card) {
    if (!potion || !card) return [];
    return overlap(potion.tags || [], card.tags || []);
  }

  function potionRitualLine(potion, card) {
    var character = card && card.character ? card.character : null;
    if (character && potion.id === character.preferredPotionId) return "Preferred by " + card.name + ": " + character.emotionalNeed + ".";
    var matches = potionResonance(potion, card);
    if (!matches.length) return "A gentle brew for a card that may need warmth more than precision.";
    return "Resonates with " + (card ? card.name : "today's card") + ": " + matches.join(", ") + ".";
  }



  function visitorReflectionPrompt() {
    var served = state.today && state.today.served && state.today.served[0];
    var card = currentCard();
    if (served && served.reflectionPrompt) return served.reflectionPrompt;
    if (card && card.character) return card.character.reflectionPrompt;
    if (served && card) return "After tending " + card.name + ", what did the card ask you to notice?";
    if (card) return "What did " + card.name + " stir in the garden today?";
    return "What would feel like care, not pressure?";
  }



  function gardenSecretCards() {
    var discovered = Object.keys(state.discoveredCards || {}).length;
    var pages = state.book ? state.book.length : 0;
    var secrets = [
      { name: "Ivy Gate", text: "The first gate remembers your return.", unlocked: true },
      { name: "Moonlit Shelf", text: "A hidden shelf appears after the first card is tended.", unlocked: pages >= 1 || (state.garden || []).some(function (note) { return note.indexOf("card") !== -1 || note.indexOf("answered the cup") !== -1; }) },
      { name: "Dew Hollow", text: "Three Dewdrops reveal a quiet hollow under the old tree.", unlocked: (state.dewdrops || 0) >= 3 },
      { name: "Card Lantern", text: "Three discovered cards light a lantern by the tarot table.", unlocked: discovered >= 3 },
      { name: "Secret Path", text: "Three pressed days clear a path beyond the moss.", unlocked: pages >= 3 }
    ];
    return secrets;
  }

  function createTodayState() {
    return {
      day: state.day,
      dateKey: localDayKey(),
      cardId: null,
      drawState: "idle",
      newDiscovery: false,
      inventory: newInventory(null),
      brewed: [],
      served: [],
      customers: [],
      conversation: [],
      gardenChanges: [],
      notes: [],
      gathered: [],
      selectedIngredients: [],
      reflectionQuestion: "",
      spell: null,
      spellCompleted: false,
      spellIngredientId: "",
      dailyPotion: null,
      potionResult: "",
      settled: false
    };
  }

  function startNewDay(nextScreen) {
    var todayKey = localDayKey();
    if (state.today && state.today.cardId && state.today.dateKey !== todayKey) state.day += 1;
    state.gardenSettled = false;
    state.today = createTodayState();
    state.today.dateKey = todayKey;
    state.screen = nextScreen || "garden";
    saveState();
    render();
  }

  function pullCard() {
    completeTarotDraw();
  }

  function brewPotion(id) {
    if (!state.today || !state.today.cardId || visitorHelpedToday() || !cardReadyForPotion()) return;
    var potion = getPotion(id);
    if (!potion) return;
    ensureIngredientSave();
    var canBrew = potion.ingredients.every(function (ingredientId) {
      return (state.ingredientInventory[ingredientId] || 0) > 0;
    });
    if (!canBrew) return;
    state.today.selectedIngredients = potion.ingredients.slice();
    brewSelectedIngredients();
  }

  function servePotion(index) {
    if (!state.today || !state.today.customers) return;
    var brewed = state.today.brewed[index];
    var customer = currentVisitor();
    if (!brewed || !customer || visitorHelpedToday() || !cardReadyForPotion()) return;
    var potion = potionFromBrewed(brewed);
    var preferred = customer.preferredPotionId === potion.id;
    var matched = preferred || overlap(potion.tags, customer.tags).length > 0;
    var card = currentCard();
    var cardResonance = potionResonance(potion, card).length > 0;
    var title = customer.name || "Today's card";
    var outcome = "";
    if (preferred) outcome = title + " warms around " + potion.name + ". The potion answers " + customer.emotionalNeed + ".";
    else if (matched) outcome = title + " receives " + potion.name + " with a careful breath. It is not the clearest brew, but it speaks the card's language.";
    else if (potion.fallback) outcome = title + " cups the " + potion.name + " carefully. The garden accepts imperfect magic too.";
    else outcome = title + " gives a soft thanks. The potion is not quite what the card needed, but the offering is still kind.";
    if (matched && cardResonance) outcome += " The card's magic hums through the cup.";
    var gardenChange = matched ? customer.gardenEffect : "The kettle hums a small forgiving note.";
    var gardenSentence = gardenChange ? gardenChange.charAt(0).toLowerCase() + gardenChange.slice(1) : "the garden listens.";
    var story = title + " arrived carrying " + customer.emotionalNeed + ". You listened, brewed " + potion.name + ", and " + gardenSentence;
    var reflectionUnlock = "A private reflection opens after tending " + title + ".";
    state.today.brewed.splice(index, 1);
    state.today.served.push({
      customer: customer.name,
      characterTitle: title,
      request: customer.request,
      domain: customer.domain,
      emotionalNeed: customer.emotionalNeed,
      preferredPotion: customer.preferredPotion,
      potion: potion.name,
      ingredients: brewed.ingredientNames || ingredientNames(brewed.ingredients),
      fallback: potion.fallback === true,
      outcome: outcome,
      story: story,
      gardenChange: gardenChange,
      matched: matched,
      preferred: preferred,
      cardResonance: cardResonance,
      relationshipState: customer.relationshipState,
      reflectionPrompt: customer.reflectionPrompt || visitorReflectionPrompt()
    });
    state.today.gardenChanges.push(gardenChange);
    state.today.gardenChanges.push(reflectionUnlock);
    state.garden.push(gardenChange);
    state.garden.push(title + " answered the cup.");
    if (state.gardenUnlocks.indexOf(gardenChange) === -1) state.gardenUnlocks.push(gardenChange);
    saveState();
    render();
  }



  function chartReadingLine() {
    return state.player && state.player.chart ? "Your " + state.player.chart.moon + " moon softened the garden's mood." : "Fairy Fate hummed quietly beneath the ivy.";
  }

  function bookEntryIndexForDay(day) {
    if (!state.book) state.book = [];
    for (var i = 0; i < state.book.length; i += 1) {
      if (Number(state.book[i].day) === Number(day)) return i;
    }
    return -1;
  }

  function buildBookEntryForCard(card, options) {
    options = options || {};
    var character = card.character || tarotCharacterProfile(card);
    var ingredient = card.bonus ? getIngredient(card.bonus) : null;
    var bloom = state.cardPlantUnlocks && state.cardPlantUnlocks[card.id] ? state.cardPlantUnlocks[card.id] : null;
    var day = options.day || (state.today ? state.today.day : state.day);
    var settled = options.settled === true;
    var story = options.story || (settled ? card.name + " visited the garden, and " + character.gardenEffect.charAt(0).toLowerCase() + character.gardenEffect.slice(1) : "The card has been pulled. The rest of the day is still unwritten.");
    return {
      day: day,
      cardId: card.id,
      status: settled ? "settled" : "reading",
      pulledAt: options.pulledAt || new Date().toISOString(),
      settledAt: settled ? (options.settledAt || new Date().toISOString()) : "",
      story: settled ? story : "",
      reading: {
        cardId: card.id,
        cardName: card.name,
        cardDescription: character.arrivalText,
        characterTitle: character.characterTitle,
        domain: character.domain,
        meaning: card.meaning,
        gameplayEffect: card.shop || character.gardenEffect,
        ingredientReward: state.today && state.today.spellIngredientId && getIngredient(state.today.spellIngredientId) ? getIngredient(state.today.spellIngredientId).name : (ingredient ? ingredient.name + " echo" : "A spell reward waiting"),
        plantUnlock: bloom ? bloom.plantName : "Waiting to root",
        plantDescription: bloom ? bloom.description : "A card bloom will root when this card is discovered.",
        effect: character.gardenEffect,
        astrology: chartReadingLine(),
        reflection: state.today && state.today.reflectionQuestion ? state.today.reflectionQuestion : character.reflectionPrompt,
        flavor: character.shortDialogueLine,
        relationshipState: options.relationshipState || cardRelationshipState(card)
      },
      dayRecord: options.dayRecord || {
        story: settled ? story : "",
        potions: [],
        encounter: [],
        customers: [],
        gardenChanges: state.today && state.today.gardenChanges ? state.today.gardenChanges.slice() : [],
        notable: ["Card pulled: " + card.name + ". " + card.meaning]
      }
    };
  }

  function upsertBookEntryForCardPull(card) {
    if (!card) return;
    if (!state.book) state.book = [];
    var day = state.today ? state.today.day : state.day;
    var index = bookEntryIndexForDay(day);
    var existing = index >= 0 ? state.book[index] : null;
    var entry = buildBookEntryForCard(card, {
      day: day,
      pulledAt: existing && existing.pulledAt ? existing.pulledAt : new Date().toISOString()
    });
    if (existing) {
      entry.dayRecord = existing.dayRecord || entry.dayRecord;
      entry.story = existing.story || entry.story;
      entry.status = existing.status === "settled" ? "settled" : entry.status;
      entry.settledAt = existing.settledAt || entry.settledAt;
      state.book[index] = entry;
      state.selectedEntry = index;
    } else {
      state.book.push(entry);
      state.selectedEntry = state.book.length - 1;
    }
  }

  function settleBookEntryForToday(card, served, encounterStory) {
    if (!state.book) state.book = [];
    var brew = state.today.dailyPotion || state.dailyPotion || (state.today.brewed && state.today.brewed[state.today.brewed.length - 1]);
    var spellTitle = state.today.spell ? state.today.spell.title : "Tiny spell";
    var reward = state.today.spellIngredientId ? getIngredient(state.today.spellIngredientId) : null;
    var servedStories = state.today.served && state.today.served.length ? state.today.served.map(function (served) { return served.story || ((served.characterTitle || served.customer) + " met " + served.potion + ". " + served.outcome); }) : [];
    var dayRecord = {
      story: encounterStory,
      gathered: (state.today.gathered || []).slice(),
      potions: state.today.notes.filter(function (note) { return note.indexOf("Brewed") === 0; }),
      encounter: servedStories.length ? servedStories : [card.name + " shaped a " + (brew ? brew.name : "quiet potion") + " for the garden."],
      customers: servedStories,
      gardenChanges: state.today.gardenChanges,
      notable: ["Reflection: " + (state.today.reflectionQuestion || card.reflection), "Tiny spell: " + spellTitle + (reward ? " earned " + reward.name : "")]
    };
    var index = bookEntryIndexForDay(state.today.day);
    var existing = index >= 0 ? state.book[index] : null;
    var entry = buildBookEntryForCard(card, {
      day: state.today.day,
      settled: true,
      pulledAt: existing && existing.pulledAt ? existing.pulledAt : new Date().toISOString(),
      story: encounterStory,
      dayRecord: dayRecord,
      relationshipState: served ? served.relationshipState : cardRelationshipState(card)
    });
    if (index >= 0) state.book[index] = entry;
    else { state.book.push(entry); index = state.book.length - 1; }
    state.selectedEntry = index;
  }

  function trendLabelFromCounts(counts, fallback) {
    var best = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || a.localeCompare(b);
    })[0];
    return best || fallback;
  }

  function cardTrendRows() {
    var rows = [];
    var seen = {};
    function addRow(row, key) {
      if (!row || !row.cardId || seen[key]) return;
      seen[key] = true;
      rows.push(row);
    }
    (state.events || []).filter(function (event) { return event.type === "card_drawn"; }).forEach(function (event, index) {
      var card = getCard(event.cardId) || getCardByName(event.cardName);
      if (!card) return;
      var parts = minorCardParts(card.name);
      addRow({
        source: "event",
        day: Number(event.day || index + 1),
        timestamp: event.timestamp || "",
        cardId: card.id,
        cardName: card.name,
        arcana: event.arcana || (parts ? "minor" : "major"),
        suit: event.suit || (parts ? parts.suit : "Major Arcana"),
        rank: event.rank || (parts ? parts.rank : ""),
        tags: Array.isArray(event.tags) ? event.tags.slice() : (card.tags || []).slice(),
        ingredientReward: event.ingredientReward || (card.bonus && getIngredient(card.bonus) ? getIngredient(card.bonus).name : "A quiet basket"),
        sunSign: event.sunSign || "",
        moonSign: event.moonSign || "",
        risingSign: event.risingSign || ""
      }, "draw:" + Number(event.day || index + 1) + ":" + card.id);
    });
    (state.book || []).forEach(function (entry, index) {
      var reading = entry.reading || {};
      var card = getCard(entry.cardId || reading.cardId) || getCardByName(reading.cardName);
      if (!card) return;
      var parts = minorCardParts(card.name);
      addRow({
        source: "book",
        day: Number(entry.day || index + 1),
        timestamp: entry.pulledAt || entry.settledAt || "",
        cardId: card.id,
        cardName: card.name,
        arcana: parts ? "minor" : "major",
        suit: parts ? parts.suit : "Major Arcana",
        rank: parts ? parts.rank : "",
        tags: (card.tags || []).slice(),
        ingredientReward: reading.ingredientReward || (card.bonus && getIngredient(card.bonus) ? getIngredient(card.bonus).name : "A quiet basket"),
        sunSign: "",
        moonSign: "",
        risingSign: ""
      }, "draw:" + Number(entry.day || index + 1) + ":" + card.id);
    });
    if (state.today && state.today.cardId) {
      var todayCard = getCard(state.today.cardId);
      if (todayCard) {
        var todayParts = minorCardParts(todayCard.name);
        var todayIngredient = todayCard.bonus ? getIngredient(todayCard.bonus) : null;
        addRow({
          source: "today",
          day: Number(state.today.day || state.day),
          timestamp: new Date().toISOString(),
          cardId: todayCard.id,
          cardName: todayCard.name,
          arcana: todayParts ? "minor" : "major",
          suit: todayParts ? todayParts.suit : "Major Arcana",
          rank: todayParts ? todayParts.rank : "",
          tags: (todayCard.tags || []).slice(),
          ingredientReward: todayIngredient ? todayIngredient.name : "A quiet basket",
          sunSign: "",
          moonSign: "",
          risingSign: ""
        }, "draw:" + Number(state.today.day || state.day) + ":" + todayCard.id);
      }
    }
    return rows.sort(function (a, b) {
      if (a.day !== b.day) return a.day - b.day;
      return String(a.timestamp).localeCompare(String(b.timestamp));
    });
  }

  function sortedCountEntries(counts) {
    return Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || a.localeCompare(b);
    }).map(function (label) {
      return { label: label, count: counts[label] };
    });
  }

  function buildCardTrendSummary() {
    var rows = cardTrendRows();
    var suitCounts = {};
    var ingredientCounts = {};
    var tagCounts = {};
    var cardCounts = {};
    var arcanaCounts = { Major: 0, Minor: 0 };
    rows.forEach(function (row) {
      suitCounts[row.suit] = (suitCounts[row.suit] || 0) + 1;
      ingredientCounts[row.ingredientReward] = (ingredientCounts[row.ingredientReward] || 0) + 1;
      cardCounts[row.cardName] = (cardCounts[row.cardName] || 0) + 1;
      if (row.arcana === "major") arcanaCounts.Major += 1;
      else arcanaCounts.Minor += 1;
      (row.tags || []).forEach(function (tag) { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
    });
    var returning = Object.keys(cardCounts).filter(function (name) { return cardCounts[name] > 1; }).sort(function (a, b) { return cardCounts[b] - cardCounts[a] || a.localeCompare(b); })[0] || "None yet";
    var latest = rows[rows.length - 1] || null;
    var topSuit = trendLabelFromCounts(suitCounts, "Waiting");
    var topIngredient = trendLabelFromCounts(ingredientCounts, "Waiting");
    var topTag = trendLabelFromCounts(tagCounts, "quiet magic");
    var uniqueCards = Object.keys(cardCounts).length;
    var discoveredCount = Object.keys(state.discoveredCards || {}).length || uniqueCards;
    var firstDay = rows.length ? rows[0].day : 0;
    var lastDay = rows.length ? rows[rows.length - 1].day : 0;
    var note = "The garden is waiting for its first card pattern.";
    if (rows.length === 1 && latest) note = latest.cardName + " is the first bright thread in this season's reading.";
    else if (returning !== "None yet") note = returning + " has returned more than once. The garden may be circling the same lesson gently.";
    else if (rows.length > 1) note = topSuit + " is shaping your card weather, with " + topTag + " rising through the leaves.";
    return {
      total: rows.length,
      uniqueCards: uniqueCards,
      discoveredCount: discoveredCount,
      majorCount: arcanaCounts.Major,
      minorCount: arcanaCounts.Minor,
      firstDay: firstDay,
      lastDay: lastDay,
      seasonLength: rows.length ? Math.max(1, lastDay - firstDay + 1) : 0,
      topSuit: topSuit,
      topIngredient: topIngredient,
      topTag: topTag,
      returning: returning,
      latest: latest,
      note: note,
      rows: rows,
      suitBreakdown: sortedCountEntries(suitCounts),
      ingredientBreakdown: sortedCountEntries(ingredientCounts),
      tagBreakdown: sortedCountEntries(tagCounts),
      cardBreakdown: sortedCountEntries(cardCounts),
      arcanaBreakdown: sortedCountEntries(arcanaCounts).filter(function (item) { return item.count > 0; })
    };
  }

  function renderWrappedMetric(label, value, detail) {
    return '<article class="wrapped-card"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><p>' + escapeHtml(detail) + '</p></article>';
  }

  function renderWrappedBarGroup(title, items, total, emptyText) {
    if (!items || !items.length || !total) return '<section class="wrapped-chart"><h3>' + escapeHtml(title) + '</h3><p class="small">' + escapeHtml(emptyText) + '</p></section>';
    return '<section class="wrapped-chart"><h3>' + escapeHtml(title) + '</h3>' + items.slice(0, 5).map(function (item) {
      var width = Math.max(8, Math.round((item.count / total) * 100));
      return '<div class="wrapped-bar-row"><div><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.count) + '</strong></div><div class="wrapped-bar-track"><i style="width: ' + width + '%"></i></div></div>';
    }).join("") + '</section>';
  }

  function renderWrappedTimeline(rows) {
    if (!rows.length) return '<section class="wrapped-timeline"><h3>Recent card trail</h3><p class="small">The trail begins with your first daily draw.</p></section>';
    return '<section class="wrapped-timeline"><h3>Recent card trail</h3><div>' + rows.slice(-6).map(function (row) {
      return '<article><span>Day ' + escapeHtml(row.day) + '</span><strong>' + escapeHtml(row.cardName) + '</strong><p>' + escapeHtml(row.suit + ' / ' + row.ingredientReward) + '</p></article>';
    }).join("") + '</div></section>';
  }

  function renderGardenWrapped() {
    var summary = buildCardTrendSummary();
    var latestName = summary.latest ? summary.latest.cardName : "Waiting";
    var arcanaLine = summary.total ? (summary.majorCount + " major / " + summary.minorCount + " minor") : "The first reading will start this.";
    return '<section class="wrapped-panel content-panel" aria-label="Garden Wrapped card trends">' +
      '<div class="wrapped-header"><p class="eyebrow">Garden Wrapped</p><h2>Your cards are becoming a weather.</h2><p>The Book gathers local, private patterns from your daily pulls. Nothing leaves this device.</p></div>' +
      '<div class="wrapped-card-grid">' +
        renderWrappedMetric("Cards drawn", String(summary.total), arcanaLine) +
        renderWrappedMetric("Cards discovered", String(summary.discoveredCount), summary.uniqueCards + " unique card" + (summary.uniqueCards === 1 ? " has" : "s have") + " visited.") +
        renderWrappedMetric("Days observed", summary.seasonLength ? String(summary.seasonLength) : "0", summary.seasonLength ? "From Day " + summary.firstDay + " through Day " + summary.lastDay + "." : "The first day is waiting.") +
        renderWrappedMetric("Strongest suit", summary.topSuit, summary.topTag + " is the recurring feeling.") +
        renderWrappedMetric("Ingredient echo", summary.topIngredient, "The garden keeps offering this flavor of help.") +
        renderWrappedMetric("Returning card", summary.returning, summary.returning === "None yet" ? "No card has circled back yet." : "This card has knocked twice.") +
        renderWrappedMetric("Latest card", latestName, summary.latest ? "Day " + summary.latest.day + " is still warm on the page." : "Draw a card to begin.") +
        renderWrappedMetric("Theme chorus", summary.topTag, summary.total ? "A word the garden keeps humming." : "No chorus yet.") +
      '</div><div class="wrapped-analytics-grid">' +
        renderWrappedBarGroup("Suit weather", summary.suitBreakdown, summary.total, "Suits will appear after more cards visit.") +
        renderWrappedBarGroup("Ingredient trail", summary.ingredientBreakdown, summary.total, "Ingredients will gather after tarot rewards.") +
        renderWrappedBarGroup("Theme chorus", summary.tagBreakdown, summary.tagBreakdown.reduce(function (sum, item) { return sum + item.count; }, 0), "Themes will bloom over time.") +
        renderWrappedBarGroup("Arcana balance", summary.arcanaBreakdown, summary.total, "Major and minor rhythms will appear here.") +
      '</div>' + renderWrappedTimeline(summary.rows) +
      '<div class="wrapped-note"><span>What the garden noticed</span><p>' + escapeHtml(summary.note) + '</p></div>' +
    '</section>';
  }


  function finishDay() {
    if (!state.today) {
      state.gardenSettled = true;
      state.screen = "garden";
      saveState();
      render();
      return;
    }
    if (state.today.settled) {
      state.gardenSettled = true;
      state.screen = "garden";
      saveState();
      render();
      return;
    }
    var card = state.today.cardId ? getCard(state.today.cardId) : null;
    var served = state.today.served && state.today.served[0] ? state.today.served[0] : null;
    var encounterStory = card ? (served && served.story ? served.story : card.name + " visited the garden, and the day settled softly.") : "The garden let the day settle softly.";
    try {
      if (card) settleBookEntryForToday(card, served, encounterStory);
    } catch (error) {
      state.garden.push("The day settled even though one page rustled out of order.");
    }
    state.today.settled = true;
    state.gardenSettled = true;
    state.garden.push("The daily card rests on the table. The garden stays open for quiet rooms and private pages.");
    addGardenFeedback("memory", "The daily card rests in the garden, ready for the Memory Tree when you are.", "memory-tree");
    state.screen = "garden";
    saveState();
    render();
  }



  function gardenIntroStep() {
    return Math.max(0, Math.min(gardenIntroScenes.length - 1, Number(state.gardenIntroStep || 0)));
  }

  function completeGardenIntro() {
    var firstVisit = !state.hasSeenGardenIntro;
    state.hasSeenGardenIntro = true;
    state.gardenIntroStep = gardenIntroScenes.length - 1;
    if (!state.day) state.day = 1;
    if (!state.garden) state.garden = [];
    if (!state.garden.some(function (memory) { return memory.indexOf("The ivy gate opened for you") !== -1; })) {
      state.garden.push("The ivy gate opened for you. The garden remembered the shape of your footsteps.");
    }
    if (firstVisit && !state.garden.some(function (memory) { return memory.indexOf("Thimblemoon Potion") !== -1; })) {
      state.garden.push("The witch gave you the Thimblemoon Potion, small enough to hide in an apron pocket.");
    }
    if (firstVisit && !state.today && !state.book.length && !state.gardenSettled && state.day <= 1) {
      state.gardenSettled = false;
      state.today = null;
    }
    if (!state.player) state.screen = "creation";
    else if (!state.hasChosenGardenObjects) state.screen = "gardenSetup";
    else state.screen = "garden";
    saveState();
    render();
  }

  function advanceGardenIntro() {
    if (gardenIntroStep() >= gardenIntroScenes.length - 1) {
      completeGardenIntro();
      return;
    }
    state.gardenIntroStep = gardenIntroStep() + 1;
    saveState();
    render();
  }

  function replayGardenIntro() {
    state.gardenIntroStep = 0;
    state.screen = "gardenIntro";
    saveState();
    render();
  }

  function renderGardenIntroGate(panel) {
    var gateClass = "storybook-gate " + escapeHtml(panel.scale || "gate-normal");
    var pieces = [
      "moon-glow",
      "deep-woods layer-one",
      "deep-woods layer-two",
      "gate-arch",
      "gate-bars",
      "gate-keyhole",
      "gate-lantern",
      "giant-grass blade-one",
      "giant-grass blade-two",
      "giant-grass blade-three",
      "dew-orb",
      "dew-orb dew-two",
      "mushroom-cap cap-one",
      "mushroom-cap cap-two",
      "mushroom-cap cap-three",
      "pebble pebble-one",
      "pebble pebble-two",
      "root-path",
      "leaf-card",
      "potion-aura",
      "sip-ring",
      "tiny-bell bell-one",
      "tiny-bell bell-two",
      "dust-mote mote-one",
      "dust-mote mote-two",
      "dust-mote mote-three",
      "dust-mote mote-four",
      "firefly one",
      "firefly two",
      "firefly three",
      "firefly four"
    ];
    var witch = '<span class="garden-witch"><span class="witch-hood"></span><span class="witch-face"></span><span class="witch-cloak"></span><span class="witch-arm"></span></span>';
    var potion = '<span class="potion-bottle"><span class="potion-glass"></span><span class="potion-cork"></span><span class="potion-shine"></span></span>';
    return '<div class="' + gateClass + '" aria-hidden="true"><span class="coin-charm">99&cent;</span>' +
      pieces.map(function (piece) { return '<span class="' + piece + '"></span>'; }).join("") + witch + potion +
    '</div>';
  }

  function renderGardenIntroProgress(step) {
    return '<div class="intro-progress" aria-label="Scene progress">' + gardenIntroScenes.map(function (scene, index) {
      return '<span class="' + (index <= step ? 'lit' : '') + '"></span>';
    }).join("") + '</div>';
  }

  function renderGardenIntroActions(panel, isLast) {
    var label = panel.action;
    if (isLast && !state.player) label = "Design Your Fairy";
    else if (isLast) label = "Return to Garden";
    return '<div class="action-row"><button class="primary garden-intro-primary" data-action="advance-garden-intro">' + escapeHtml(label) + '</button>' +
      (isLast ? '' : '<button class="ghost" data-action="skip-garden-intro">Skip Intro</button>') +
    '</div>';
  }

  function renderGardenIntroCopy(panel, step, isLast) {
    return '<div class="garden-intro-copy"><p class="eyebrow">' + escapeHtml(panel.eyebrow || "Discovering the Garden") + '</p>' +
      '<h1>' + escapeHtml(panel.title) + '</h1>' +
      (panel.witchLine ? '<p class="witch-potion-line">&quot;' + escapeHtml(panel.witchLine) + '&quot;</p>' : '') +
      '<p class="dialogue-text">' + escapeHtml(panel.text) + '</p>' +
      renderGardenIntroProgress(step) + renderGardenIntroActions(panel, isLast) +
    '</div>';
  }

  function renderGardenIntroScene() {
    var step = gardenIntroStep();
    var panel = gardenIntroScenes[step];
    var isLast = step >= gardenIntroScenes.length - 1;
    return '<main class="garden-intro-screen garden-intro-' + escapeHtml(panel.key) + '">' +
      '<section class="garden-intro-card" aria-label="Discovering the Garden">' +
        renderGardenIntroGate(panel) + renderGardenIntroCopy(panel, step, isLast) +
      '</section>' +
    '</main>';
  }


  function renderIntro() {
    var scene = introScenes[state.introStep] || introScenes[0];
    return '<main class="story-screen scene-' + escapeHtml(scene.key) + '">' +
      '<div class="story-content">' +
        '<div class="scene-art" aria-hidden="true"><div class="scene-emblem"><div class="scene-kettle"></div></div></div>' +
        '<section class="dialogue-panel">' +
          '<p class="eyebrow">' + escapeHtml(scene.eyebrow) + '</p>' +
          '<h1>' + escapeHtml(scene.title) + '</h1>' +
          '<p class="dialogue-text">' + escapeHtml(scene.text) + '</p>' +
          '<div class="action-row"><button class="primary" data-action="next-intro">' + escapeHtml(scene.action) + '</button><button class="ghost" data-action="skip-opening-intro">Skip to the Gate</button></div>' +
        '</section>' +
      '</div>' +
    '</main>';
  }

  function renderShell(content, active) {
    var name = state.player ? state.player.name : "the garden";
    var moodClass = state.privateDraft && state.privateDraft.stateOfMind ? ' mood-' + slug(state.privateDraft.stateOfMind) : '';
    var onGarden = active === "garden";
    return '<div class="shell shell-' + escapeHtml(active || "garden") + moodClass + '">' +
      '<header class="topbar">' +
        '<div class="brand"><button class="brand-mark garden-home-icon" data-action="nav" data-screen="garden" title="Return to Garden">SG</button><div><div class="brand-title">The Secret\'s Garden</div><div class="brand-subtitle">Welcome back, ' + escapeHtml(name) + '.</div></div></div>' +
        '<div class="topbar-actions"><button class="garden-return-button" data-action="nav" data-screen="garden">' + escapeHtml(onGarden ? "Garden Home" : "Return to Garden") + '</button><button class="topbar-settings-button" data-action="nav" data-screen="settings" aria-label="Settings" title="Settings"><span aria-hidden="true">&#9881;</span></button></div>' +
      '</header>' +
      '<main class="main-stage">' + content + '</main>' +
      renderPlaceNav(active) +
    '</div>';
  }

  function renderPlaceNav(active) {
    return '';
  }


  function activeChart() {
    var chart = state.player && state.player.chart ? state.player.chart : (state.draft && state.draft.chart ? state.draft.chart : makeFairyFateChart("me"));
    return {
      sun: validSign(chart.sun),
      moon: validSign(chart.moon),
      rising: validSign(chart.rising)
    };
  }

  function fairyPreviewDraft() {
    var chart = activeChart();
    var draft = normalizeDraft(Object.assign(createDraft(), state.draft || {}));
    if (state.player && state.player.fairy) {
      Object.assign(draft, state.player.fairy);
      draft.name = state.player.name;
    }
    draft.chart = chart;
    draft.sunSign = chart.sun;
    draft.moonSign = chart.moon;
    draft.risingSign = chart.rising;
    return draft;
  }

  function renderMeTabs(active) {
    return "";
  }

  function renderAstrologyDefinition(label, sign, role, definition, gardenLine) {
    return '<article class="astro-card"><p class="eyebrow">' + escapeHtml(label) + '</p><h3>' + escapeHtml(label + " in " + sign) + '</h3><p><strong>' + escapeHtml(role) + ':</strong> ' + escapeHtml(definition) + '</p><p class="small">' + escapeHtml(gardenLine) + '</p></article>';
  }

  function renderAstrologyDefinitions(chart) {
    var sun = signStyles[chart.sun];
    var moon = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    return '<div class="astro-definition-grid">' +
      renderAstrologyDefinition("Sun", chart.sun, "Core magic", "The Sun is your steady spell: identity, vitality, and the color of magic the garden recognizes first.", sun.palette + ". Core magic: " + sun.magic + ".") +
      renderAstrologyDefinition("Moon", chart.moon, "Inner weather", "The Moon is your private tide: feelings, needs, comfort, and the mood your garden softens around.", moon.aura + ". " + moon.garden) +
      renderAstrologyDefinition("Rising", chart.rising, "Threshold aura", "The Rising sign is how you arrive: first impression, silhouette, pace, and the doorway energy others meet.", rising.outfitName + ". " + rising.palette + ".") +
    '</div>';
  }

  function renderAstrologyTarotBridge(card) {
    var chart = activeChart();
    var sun = signStyles[chart.sun];
    var moon = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    if (!card) {
      return '<div class="tarot-bridge"><p class="eyebrow">Astrology + Tarot</p><h3>Draw today&#39;s card to braid the sky with the day.</h3><p>Your Sun colors the card&#39;s core magic, your Moon tints the garden mood, and your Rising suggests how to enter the reading.</p></div>';
    }
    var character = card.character || tarotCharacterProfile(card);
    var ingredient = card.bonus ? getIngredient(card.bonus) : null;
    return '<div class="tarot-bridge"><p class="eyebrow">Astrology + Tarot</p><h3>' + escapeHtml(card.name) + ' through your sky</h3>' +
      '<ul class="bridge-list">' +
        '<li><strong>Sun in ' + escapeHtml(chart.sun) + ':</strong> ' + escapeHtml(sun.magic + " gives " + card.name + " its core intention today.") + '</li>' +
        '<li><strong>Moon in ' + escapeHtml(chart.moon) + ':</strong> ' + escapeHtml(moon.aura + " sets the garden mood around this card's need.") + '</li>' +
        '<li><strong>Rising in ' + escapeHtml(chart.rising) + ':</strong> ' + escapeHtml(rising.outfitName + " suggests how you meet the day and enter the reading.") + '</li>' +
        (ingredient ? '<li><strong>Ingredient echo:</strong> ' + escapeHtml(ingredient.name + " is the card's small garden echo.") + '</li>' : '') +
      '</ul></div>';
  }

  function renderTarotGameplayImpact(card, mode) {
    if (!card) return '';
    var character = card.character || tarotCharacterProfile(card);
    var ingredient = card.bonus ? getIngredient(card.bonus) : null;
    var compact = mode === "compact";
    var side = mode === "side";
    var className = 'tarot-gameplay-impact' + (compact ? ' compact' : '') + (side ? ' side-impact' : '');
    return '<section class="' + className + '"><p class="eyebrow">Reading influence</p><h3>' + escapeHtml(card.name + ' changes the garden mood.') + '</h3>' +
      '<div class="impact-grid">' +
        '<div><span>Tiny spell echo</span><strong>' + escapeHtml(ingredient ? ingredient.name + ' echo' : 'A quiet basket') + '</strong><p>' + escapeHtml(readingGardenText(card)) + '</p></div>' +
        '<div><span>Card question</span><strong>' + escapeHtml(character.emotionalNeed) + '</strong><p>' + escapeHtml(character.arrivalText) + '</p></div>' +
        '<div><span>Reading voice</span><strong>' + escapeHtml(character.characterTitle || card.name) + '</strong><p>' + escapeHtml(character.shortDialogueLine || card.flavor || card.reflection) + '</p></div>' +
        '<div><span>Garden growth</span><strong>' + escapeHtml(readingGardenText(card)) + '</strong><p>' + escapeHtml('The reading can root here as a gentle garden change.') + '</p></div>' +
      '</div></section>';
  }

  function renderLocalGardenProfile() {
    var profile = normalizeLocalGardenProfile(state.localGardenProfile);
    var shortId = profile.id.split("-").slice(-2).join("-");
    return '<section class="content-panel local-profile-panel"><div><p class="eyebrow">Local Garden Profile</p><h2>A private save for this device.</h2><p>This is not an online account. It is a local garden identity that helps this browser remember your fairy, cards, journal links, and growth.</p></div>' +
      '<div class="local-profile-grid">' +
        '<div><span>Save type</span><strong>Device-only</strong><p>No login, no cloud, no tracking.</p></div>' +
        '<div><span>Garden ID</span><strong>' + escapeHtml(shortId) + '</strong><p>Not tied to your real identity.</p></div>' +
        '<div><span>Created</span><strong>' + escapeHtml(localDateLabel(profile.createdAt)) + '</strong><p>This garden began here.</p></div>' +
        '<div><span>Last saved</span><strong>' + escapeHtml(localTimeLabel(profile.lastSavedAt)) + '</strong><p>Stored in this browser.</p></div>' +
      '</div></section>';
  }

  function renderLocalSaveControls() {
    var message = state.settingsMessage ? '<p class="settings-message">' + escapeHtml(state.settingsMessage) + '</p>' : '';
    var size = JSON.stringify(state).length;
    return '<section class="content-panel local-save-controls"><div><p class="eyebrow">Local Privacy</p><h2>Your garden belongs to this browser.</h2><p>No account, no ads, no tracking, no backend. These controls only touch the save stored on this device.</p></div>' +
      '<div class="local-save-grid">' +
        '<article><span>Save size</span><strong>' + escapeHtml(String(Math.max(1, Math.round(size / 1024)))) + ' KB</strong><p>Includes garden layout, readings, journal pages, and Memory Tree leaves.</p></article>' +
        '<article><span>Export</span><strong>Keep a copy</strong><p>Download a JSON copy of the local save for safekeeping.</p><button class="ghost" data-action="export-local-save">Download save</button></article>' +
        '<article><span>Copy</span><strong>Plain text backup</strong><p>Copy the local save text if your browser allows clipboard access.</p><button class="ghost" data-action="copy-local-save">Copy save text</button></article>' +
        '<article><span>Forget</span><strong>Begin again</strong><p>Only use this if you explicitly want this browser to forget the garden.</p><button class="danger" data-action="erase-local-save">Forget this garden</button></article>' +
      '</div>' + message + '</section>';
  }

  function renderOnboardingControls() {
    return '<section class="content-panel onboarding-controls"><div><p class="eyebrow">Beginnings</p><h2>Revisit the first path without losing the garden.</h2><p>The opening scenes, potion gate, and fairy design can be revisited whenever the sanctuary wants a different shape.</p></div>' +
      '<div class="local-save-grid">' +
        '<article><span>Opening</span><strong>Before the Garden</strong><p>Return to the first story beat.</p><button class="ghost" data-action="replay-opening-intro">Replay opening</button></article>' +
        '<article><span>Potion</span><strong>The Ivy Gate</strong><p>Revisit the witch, potion, and becoming fairy-sized.</p><button class="ghost" data-action="replay-garden-intro">Replay potion gate</button></article>' +
        '<article><span>Fairy</span><strong>Moon Pond Mirror</strong><p>Adjust your fairy without erasing readings or pages.</p><button class="ghost" data-action="nav" data-screen="creation">Design fairy</button></article>' +
      '</div></section>';
  }

  function localSaveExportPayload() {
    return JSON.stringify({
      exportedAt: new Date().toISOString(),
      app: "The Secret's Garden prototype",
      localOnly: true,
      save: state
    }, null, 2);
  }

  function exportLocalSave() {
    try {
      var blob = new Blob([localSaveExportPayload()], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "the-secrets-garden-local-save-" + localDayKey() + ".json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 800);
      state.settingsMessage = "A local save copy was prepared. Nothing left this device unless you choose where to keep it.";
    } catch (error) {
      state.settingsMessage = "The browser could not download a save copy here, but the garden is still stored locally.";
    }
    saveState();
    render();
  }

  function copyLocalSave() {
    var payload = localSaveExportPayload();
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      state.settingsMessage = "Clipboard access is not available in this browser. Download still works when the browser allows it.";
      saveState();
      render();
      return;
    }
    navigator.clipboard.writeText(payload).then(function () {
      state.settingsMessage = "The local save text was copied. Keep it somewhere private if you store it outside the browser.";
      saveState();
      render();
    }).catch(function () {
      state.settingsMessage = "The browser declined clipboard access. Your garden was not changed.";
      saveState();
      render();
    });
  }

  function renderMe() {
    return renderGarden();
  }


  function enabledGardenObjectCount() {
    ensureGardenObjectStateShape();
    return Object.keys(state.enabledGardenObjects || {}).filter(function (id) { return state.enabledGardenObjects[id] === true; }).length;
  }

  function renderSanctuaryObjectCard(object, mode) {
    ensureGardenObjectStateShape();
    var enabled = state.enabledGardenObjects[object.id] === true;
    var action = mode === "setup" ? "toggle-setup-garden-object" : "toggle-settings-garden-object";
    var buttonText = enabled ? (mode === "setup" ? "In my garden" : "Let it rest") : (mode === "setup" ? "Add this" : "Add to garden");
    return '<article class="sanctuary-object-card ' + (enabled ? 'enabled' : 'resting') + '">' +
      '<button class="sanctuary-object-toggle" data-action="' + action + '" data-id="' + escapeHtml(object.id) + '" aria-pressed="' + (enabled ? 'true' : 'false') + '">' +
        '<span class="mini-object mini-object-' + escapeHtml(object.kind) + '">' + renderGardenObjectArt(object) + '</span>' +
        '<span><strong>' + escapeHtml(object.name) + '</strong><small>' + escapeHtml(object.opens) + '</small></span>' +
        '<em>' + escapeHtml(buttonText) + '</em>' +
      '</button>' +
      '<p>' + escapeHtml(object.sanctuary || '') + '</p>' +
    '</article>';
  }

  function renderGardenSetup() {
    ensureGardenObjectStateShape();
    var chosen = enabledGardenObjectCount();
    var content = '<section class="garden-setup-screen">' +
      '<div class="garden-setup-heading"><p class="eyebrow">Sanctuary Seeds</p><h1>What kind of garden do you want to grow first?</h1><p>Choose the places that feel welcome right now. This is not enabling trackers. It is deciding what belongs in your sanctuary today.</p></div>' +
      renderObjectArrivalMoment() +
      '<div class="sanctuary-object-grid">' + gardenObjectCatalog.map(function (object) { return renderSanctuaryObjectCard(object, "setup"); }).join("") + '</div>' +
      '<div class="garden-setup-footer"><div><strong>' + escapeHtml(chosen) + '</strong><span> place' + (chosen === 1 ? '' : 's') + ' ready to grow</span></div><button class="primary" data-action="complete-garden-setup"' + disabledAttr(chosen < 1) + '>Enter this garden</button></div>' +
    '</section>';
    return '<div class="shell shell-setup"><main class="main-stage">' + content + '</main></div>';
  }

  function renderGardenSettings() {
    ensureGardenSceneSave();
    var chosen = enabledGardenObjectCount();
    var content = '<section class="garden-settings-layout">' +
      '<div class="content-panel garden-settings-intro"><div><p class="eyebrow">Garden Settings</p><h1>Tend what belongs here.</h1><p>Choose which rooms belong in the garden today. Let a doorway rest when it feels like too much.</p><div class="privacy-note">Resting a doorway only hides it from the garden. It does not delete private writing or reading history.</div></div><div class="action-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button><button class="ghost" data-action="settings-place-garden">Arrange Garden</button></div></div>' +
      renderObjectArrivalMoment() +
      '<section class="content-panel"><div class="section-heading"><div><p class="eyebrow">Garden Objects</p><h2>' + escapeHtml(chosen) + ' place' + (chosen === 1 ? '' : 's') + ' active</h2></div><span class="small">Your sanctuary can be small. Nothing is lost when something rests.</span></div><div class="sanctuary-object-grid settings-grid">' + gardenObjectCatalog.map(function (object) { return renderSanctuaryObjectCard(object, "settings"); }).join("") + '</div></section>' +
      renderOnboardingControls() +
      renderLocalGardenProfile() +
      renderLocalSaveControls() +
    '</section>';
    return renderShell(content, "settings");
  }

  function renderCreation() {
    var draft = normalizeDraft(state.draft);
    var creationActionLabel = !state.player ? "Choose Garden Places" : (state.hasSeenGardenIntro ? "Begin Day " + state.day : "Find the Garden");
    var chart = draft.chart;
    var sun = signStyles[chart.sun];
    var moon = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    var modeNote = getAstrologyModeNote(draft.mode);
    var content = '<section class="creation-grid">' +
      '<aside class="content-panel creation-preview-panel"><div class="fairy-mirror-frame">' + renderFairy(draft) + '</div><p class="nameplate">' + escapeHtml(draft.name || "A fairy not yet named") + '</p>' +
      renderFairyTraitTags(draft) +
      '<div class="privacy-note">Your garden keeps your secrets. Signs stay in this browser save.</div></aside>' +
      '<section class="content-panel creation-controls-panel">' +
        '<div class="section-heading"><div><p class="eyebrow">Wardrobe by the Moon Pond</p><h2>What shall the garden call you?</h2></div><button class="ghost" data-action="randomize-fairy">Surprise me</button></div>' +
        '<div class="form-grid">' +
          '<div class="field wide"><label for="fairy-name">Name</label><input id="fairy-name" data-field="name" value="' + escapeHtml(draft.name) + '" placeholder="A name the leaves can remember"></div>' +
          '<div class="field wide"><label for="astro-mode">Stars</label><select id="astro-mode" data-field="mode"><option value="known_chart" ' + selected(draft.mode, "known_chart") + '>Choose my signs</option><option value="fairy_fate" ' + selected(draft.mode, "fairy_fate") + '>Fairy Fate</option></select><p class="small">' + escapeHtml(modeNote) + '</p></div>' +
          renderAstrologyFields(draft) +
        '</div>' +
        '<div class="inline-actions"><button data-action="refresh-chart">Let the garden choose</button><button data-action="apply-stars">Let the signs dress me</button></div>' +
        '<div class="chart-summary">' + chartRow("Sun", chart.sun, sun.palette + ". " + sun.magic + ".") + chartRow("Moon", chart.moon, moon.aura + ". " + moon.garden) + chartRow("Rising", chart.rising, rising.outfitName + ". " + rising.palette + ".") + '</div>' +
        renderCustomizer(draft) +
        '<div class="action-row"><button class="primary" data-action="finish-creation">' + escapeHtml(creationActionLabel) + '</button><button class="ghost" data-action="reset-save">Start over</button></div>' +
      '</section>' +
    '</section>';
    if (!state.player) return '<div class="shell"><main class="main-stage">' + content + '</main></div>';
    return renderShell(content, "moon");
  }

  function renderFairyTraitTags(draft) {
    var skin = skinTones.find(function (tone) { return tone.value === draft.skinTone; }) || skinTones[3];
    var tags = [
      skin.name,
      draft.hairStyle,
      draft.wings + " wings",
      draft.outfit + " outfit",
      draft.accessory
    ];
    return '<div class="fairy-trait-tags">' + tags.map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join("") + '</div>';
  }

  function getAstrologyModeNote(mode) {
    if (mode === "fairy_fate") return "No real birth information needed. The garden chooses a magical sky for you.";
    return "Pick the signs you already know. No birth date, time, place, or calculation needed.";
  }

  function renderAstrologyFields(draft) {
    if (draft.mode === "fairy_fate") {
      return '<div class="field wide"><p class="small">Fairy Fate is intentionally magical, not a natal chart. It gives the garden a sky without asking for personal details.</p></div>';
    }
    return signSelectField("Sun sign", "sunSign", draft.sunSign) + signSelectField("Moon sign", "moonSign", draft.moonSign) + signSelectField("Rising sign", "risingSign", draft.risingSign) + '<div class="field wide"><p class="small">Only Sun is required for the fantasy. Moon and Rising can stay as gentle style choices until you know them.</p></div>';
  }

  function signSelectField(label, field, value) {
    return '<div class="field"><label>' + label + '</label><select data-field="' + field + '">' + signs.map(function (sign) { return '<option value="' + sign + '" ' + selected(value, sign) + '>' + sign + '</option>'; }).join("") + '</select></div>';
  }

  function selected(actual, expected) {
    return actual === expected ? 'selected' : '';
  }

  function chartRow(label, sign, text) {
    return '<div class="chart-row"><strong>' + label + '</strong><span>' + escapeHtml(sign) + '<br><span class="small">' + escapeHtml(text) + '</span></span></div>';
  }

  function renderFairy(draft) {
    var sun = signStyles[draft.chart.sun];
    var style = '--skin:' + draft.skinTone + ';--hair:' + draft.hairColor + ';--wing:' + sun.wing + ';--outfit:' + outfitColor(draft.outfit) + ';';
    return '<div class="fairy-stage"><div class="fairy-avatar" style="' + style + '" aria-label="Fairy preview">' +
      '<div class="wing left"></div><div class="wing right"></div><div class="body"></div><div class="head"></div><div class="hair"></div><div class="eyes"></div><div class="sparkle"></div>' +
    '</div></div>';
  }

  function outfitColor(outfit) {
    var colors = { Cottage: "#8b8b58", Woodland: "#58744d", Moonlit: "#697495", Sunlit: "#b77b3e", Herbalist: "#6d875c", Starlit: "#716aa4" };
    return colors[outfit] || "#8b8b58";
  }

  function renderCustomizer(draft) {
    return '<div class="form-grid">' +
      '<div class="field wide skin-tone-field"><span class="control-label">Skin tone</span><div class="swatch-row tone-swatch-row">' + skinTones.map(function (tone) { return '<button class="swatch ' + (draft.skinTone === tone.value ? 'selected' : '') + '" style="--swatch:' + tone.value + '" title="' + tone.name + '" aria-label="' + tone.name + '" data-action="set-draft" data-field="skinTone" data-value="' + tone.value + '"></button>'; }).join("") + '</div></div>' +
      selectField("Hair", "hairStyle", hairStyles, draft.hairStyle) +
      colorField("Hair color", "hairColor", draft.hairColor) +
      selectField("Wings", "wings", wingOptions, draft.wings) +
      selectField("Outfit", "outfit", outfitOptions, draft.outfit) +
      selectField("Accessory", "accessory", accessoryOptions, draft.accessory) +
    '</div>';
  }

  function selectField(label, field, options, value) {
    return '<div class="field"><label>' + label + '</label><select data-field="' + field + '">' + options.map(function (option) { return '<option value="' + escapeHtml(option) + '" ' + selected(value, option) + '>' + escapeHtml(option) + '</option>'; }).join("") + '</select></div>';
  }

  function colorField(label, field, value) {
    var colors = ["#2b202f", "#513124", "#6b523c", "#b45d2f", "#d9b45f", "#7c6aa8", "#5f68a8", "#b98285"];
    return '<div class="field"><span class="control-label">' + label + '</span><div class="swatch-row">' + colors.map(function (color) { return '<button class="swatch ' + (value === color ? 'selected' : '') + '" style="--swatch:' + color + '" data-action="set-draft" data-field="' + field + '" data-value="' + color + '"></button>'; }).join("") + '</div></div>';
  }

  function renderTea() {
    if (!state.today && canBeginFreshDailyRitual()) startNewDay("tea");
    if (!state.today) {
      var lockedContent = '<div class="tarot-room-layout"><section class="content-panel tarot-reading-panel"><p class="eyebrow">Card Altar</p><h2>The card has already spoken today.</h2><p>The deck rests until the next real-world day. Return to the garden when you are ready to choose another doorway.</p>' + renderDeckChoiceControl() + renderNextDrawCountdown(false) + '<div class="action-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button></div></section>' + renderCustomDeckWorkbench() + renderTarotReadingArchive() + renderDeckProofSetPanel() + renderFairyDeckGallery() + renderCardBloomNursery() + '</div>';
      return renderShell(lockedContent, "tea");
    }
    state.today = normalizeToday(state.today);
    var card = currentCard();
    var drawState = state.today.drawState || (card ? "revealed" : "idle");
    var content = '<div class="tarot-room-layout">' +
      '<section class="play-grid tarot-table-grid">' +
        '<aside class="content-panel tarot-table-panel">' + renderTarotTable(card, drawState) + '</aside>' +
        '<section class="content-panel tarot-reading-panel">' + renderTarotInfo(card, drawState) + '</section>' +
      '</section>' +
      renderCustomDeckWorkbench() +
      renderTarotReadingArchive() +
      renderDeckProofSetPanel() +
      renderFairyDeckGallery() +
      renderCardBloomNursery() +
    '</div>';
    return renderShell(content, "tea");
  }

  function renderTarotReadingArchive() {
    var entries = (state.book || []).slice(-4).reverse();
    var todayCard = currentCard();
    var todayPanel = todayCard ? '<article class="current-reading"><span>Today</span><strong>' + escapeHtml(todayCard.name) + '</strong><p>' + escapeHtml(todayCard.reflection || todayCard.meaning) + '</p></article>' : '';
    var archive = entries.length ? entries.map(function (entry) {
      var reading = entry.reading || {};
      var cardName = reading.cardName || entry.cardName || "Saved reading";
      var meaning = reading.meaning || reading.cardDescription || "A local reading page is resting here.";
      return '<article><span>Day ' + escapeHtml(entry.day || "?") + '</span><strong>' + escapeHtml(cardName) + '</strong><p>' + escapeTarotText(meaning) + '</p></article>';
    }).join("") : '<p class="small">Saved readings will appear here after the first card draw. Nothing leaves this device.</p>';
    return '<section class="content-panel tarot-reading-archive"><div class="section-heading"><div><p class="eyebrow">Tarot Readings</p><h2>The altar keeps the cards close.</h2></div><span class="small">Local archive</span></div><div class="reading-archive-list">' + todayPanel + archive + '</div></section>';
  }

  function renderDeckProofSetPanel() {
    var proofCards = ["The Fool", "The Magician", "The High Priestess", "The Empress", "The Moon", "The Sun", "Ace of Cups", "Ace of Wands"];
    return '<section class="content-panel deck-proof-panel"><div class="section-heading"><div><p class="eyebrow">Deck Proof</p><h2>The first cards are waking.</h2><p>Eight altar cards are ready to inspect before the full deck is painted.</p></div><span class="small">Proof sheet</span></div>' +
      '<figure class="proof-sheet-frame"><img src="assets/fairy-tarot-proof-sheet.png" alt="Fairy tarot proof sheet"><figcaption>' + escapeHtml(proofCards.join(" / ")) + '</figcaption></figure>' +
      '<div class="proof-card-label-grid">' + proofCards.map(function (name) { return '<span>' + escapeHtml(name) + '</span>'; }).join("") + '</div></section>';
  }

  function tarotCardSuitLabel(card) {
    var parts = minorCardParts(card.name);
    if (parts) return parts.suit;
    return "Major Arcana";
  }

  function fairyDeckVisualCue(card) {
    var bloom = state.cardPlantUnlocks && state.cardPlantUnlocks[card.id] ? state.cardPlantUnlocks[card.id] : cardBloomForCard(card, state.day);
    var symbol = card.symbol || "?";
    var tags = (card.tags || []).slice(0, 3).join(", ");
    return "Ornate fairy card with " + bloom.plantName + ", " + symbol + " sigil, " + bloom.tone + ", botanical/celestial gold frame" + (tags ? ", " + tags : "") + ".";
  }

  function renderFairyDeckCard(card) {
    var record = tarotJournalRecord(card.id);
    var discovered = !!record;
    var bloom = state.cardPlantUnlocks && state.cardPlantUnlocks[card.id] ? state.cardPlantUnlocks[card.id] : null;
    var bloomPreview = bloom || cardBloomForCard(card, record ? record.firstDiscoveredDay : state.day);
    var design = activeDeckDesign(card.id);
    var times = record ? record.timesDrawn : 0;
    var className = 'fairy-deck-card ' + (discovered ? 'discovered' : 'sleeping');
    return '<article class="' + className + '" style="--bloom-color:' + escapeHtml(bloomPreview.color || '#d88fa0') + '">' +
      '<div class="fairy-deck-thumb">' + (discovered ? renderCardArtwork(card, design, "thumb") : '<div class="locked-card-silhouette"><span>' + escapeHtml(card.symbol || "?") + '</span></div>') + '</div>' +
      '<div class="fairy-deck-card-copy"><span>' + escapeHtml(tarotCardSuitLabel(card)) + '</span><h3>' + escapeHtml(discovered ? card.name : "Sleeping Card") + '</h3>' +
      '<p>' + escapeHtml(discovered ? compactSummaryText(card.reflection || card.meaning, "A gentle card waits in the archive.") : "This card will reveal its fairy artwork and bloom after it is drawn.") + '</p>' +
      '<small>' + escapeHtml(discovered ? fairyDeckVisualCue(card) : "Hidden botanical/celestial fairy card. Draw more days to wake the deck.") + '</small>' +
      '<div class="fairy-deck-meta"><em>' + escapeHtml(discovered ? "Drawn " + times + " time" + (times === 1 ? "" : "s") : "Undiscovered") + '</em><em>' + escapeHtml(bloom ? bloom.plantName : "Bloom sleeping") + '</em></div></div></article>';
  }

  function renderFairyDeckGallery() {
    ensureCardBloomSave();
    var discoveredCount = Object.keys(state.discoveredCards || {}).length;
    var majorCount = tarotCards.filter(function (card) { return !!tarotJournalRecord(card.id) && !minorCardParts(card.name); }).length;
    var bloomCount = discoveredCardBlooms().length;
    var featuredIds = ["the_fool", "the_magician", "the_high_priestess", "the_empress", "the_moon", "the_sun", "ace_of_cups", "ace_of_wands"];
    var featured = featuredIds.map(getCard).filter(Boolean);
    var discovered = tarotCards.filter(function (card) { return !!tarotJournalRecord(card.id); });
    var sleeping = tarotCards.filter(function (card) { return !tarotJournalRecord(card.id); });
    var preview = discovered.concat(featured.filter(function (card) { return discovered.indexOf(card) === -1; }), sleeping).slice(0, 18);
    return '<section class="content-panel fairy-deck-gallery"><div class="section-heading"><div><p class="eyebrow">Fairy Deck Gallery</p><h2>The cards become a living deck.</h2><p>Drawn cards reveal their garden identity, bloom, and mock-deck art direction. Undrawn cards stay sleeping, not missing.</p></div><span class="small">' + escapeHtml(discoveredCount + " / " + tarotCards.length) + ' discovered</span></div>' +
      '<div class="fairy-deck-stats">' +
        '<article><span>Discovered</span><strong>' + escapeHtml(String(discoveredCount)) + '</strong><p>Cards awake in this local garden.</p></article>' +
        '<article><span>Major Arcana</span><strong>' + escapeHtml(String(majorCount)) + '</strong><p>Story gates revealed.</p></article>' +
        '<article><span>Blooms</span><strong>' + escapeHtml(String(bloomCount)) + '</strong><p>Plants rooted by card discovery.</p></article>' +
        '<article><span>Style Bible</span><strong>Fairy ornate</strong><p>Diverse, cute, botanical, celestial, gold, gentle.</p></article>' +
      '</div>' +
      '<div class="fairy-deck-grid">' + preview.map(renderFairyDeckCard).join("") + '</div>' +
      '<p class="small">Showing discovered cards first, then the proof-set cards, then sleeping cards. The full 78-card identity list is already in the deck.</p></section>';
  }

  function renderDeckChoiceControl() {
    return '<div class="deck-choice"><label for="deck-choice">Deck</label><select id="deck-choice" data-deck-choice="true"><option value="garden" ' + selected(state.deckChoice || "garden", "garden") + '>Garden Deck</option><option value="custom" ' + selected(state.deckChoice || "garden", "custom") + '>My Custom Deck</option></select><p class="small">All 78 Rider-Waite tarot identities are present from the beginning. Custom art stays local and changes artwork only.</p></div>';
  }

  function renderCustomDeckWorkbench() {
    if ((state.deckChoice || "garden") !== "custom") return '';
    return '<section class="custom-deck-room-panel"><div class="custom-deck-room-heading"><div><p class="eyebrow">My Custom Deck</p><h2>Create your own card art here.</h2><p>Pick a card, add image layers from this device, adjust the collage, then save. Everything stays local in this browser.</p></div><span class="small">Visible because My Custom Deck is selected</span></div>' + renderDeckStudioContent("embedded") + '</section>';
  }

  function renderTarotTable(card, drawState) {
    if (drawState === "shuffling") {
      return '<button class="tarot-table-button tarot-ritual shuffling" data-action="complete-tarot-draw" aria-label="Choose this moment">' +
        '<div class="table-mist" aria-hidden="true"></div><div class="stone-table">' + renderShuffleCards() + '<div class="living-deck"><span></span><span></span><span></span></div></div>' +
        '<p class="shuffle-instruction">Click when the moment feels right.</p>' +
      '</button>';
    }
    if (card) {
      return '<div class="tarot-ritual ' + escapeHtml(drawState) + '"><div class="table-mist" aria-hidden="true"></div><div class="stone-table">' + renderDrawnCard(card, drawState === "revealing") + '</div></div>';
    }
    return '<div class="tarot-ritual idle"><div class="table-mist" aria-hidden="true"></div><div class="stone-table"><div class="resting-deck"><span></span><span></span><span></span><strong>78</strong></div></div><p class="shuffle-instruction">The deck rests on the old stone table.</p></div>';
  }

  function renderShuffleCards() {
    return '<div class="shuffle-cloud" aria-hidden="true">' + sampleShuffleCards().map(function (card, index) {
      var driftX = ((index % 8) - 3.5) * 15;
      var driftY = ((index % 4) - 1.5) * 12;
      var rotate = ((index % 7) - 3) * 7;
      var delay = (index * -0.27).toFixed(2);
      var style = '--i:' + index + ';--dx:' + driftX + 'px;--dy:' + driftY + 'px;--rot:' + rotate + 'deg;--delay:' + delay + 's;';
      return '<div class="shuffle-card" style="' + style + '"><span>' + escapeHtml(card.symbol) + '</span><strong>' + escapeHtml(card.name) + '</strong></div>';
    }).join("") + '</div>';
  }

  function renderDrawnCard(card, animated) {
    return '<div class="drawn-card-stage"><div class="drawn-card ' + (animated ? 'animate' : 'settled') + '">' +
      '<div class="drawn-card-back"><span>SG</span></div>' +
      '<div class="drawn-card-front">' + renderCardArtwork(card, activeDeckDesign(card.id), "large") + '</div>' +
    '</div></div>';
  }

  function renderTarotInfo(card, drawState) {
    if (!card && !canDrawDailyCard()) {
      return '<p class="eyebrow">Card Altar</p>' + renderDeckChoiceControl() + '<h2>The card has already spoken today.</h2><p>The deck rests until tomorrow. Return to the garden when you are ready to choose another doorway.</p>' + renderNextDrawCountdown(false) + '<div class="action-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button></div>';
    }
    if (!card && drawState === "shuffling") {
      return '<p class="eyebrow">Card Altar</p>' + renderDeckChoiceControl() + '<h2>The deck is alive.</h2><p>The cards slide, weave, and return to one another. Nothing has been chosen yet.</p><div class="soundscape"><span>paper sliding</span><span>soft wood</span><span>distant wind</span><span>tiny bells</span></div><div class="action-row"><button class="primary" data-action="complete-tarot-draw">Choose this moment</button></div>';
    }
    if (!card) {
      return '<p class="eyebrow">Card Altar</p>' + renderDeckChoiceControl() + '<h2>The deck waits on the stone.</h2><p>The witch lowers her voice. The garden grows quiet around the table, but the leaves still breathe.</p><div class="action-row"><button class="primary" data-action="begin-tarot-draw">Draw Today&#39;s Card</button></div><p class="small">One card may speak each real-world day.</p>';
    }
    var revealing = drawState === "revealing";
    return '<p class="eyebrow">Today&#39;s Card</p>' + renderDeckChoiceControl() +
      '<h2>' + escapeHtml(revealing ? "The card turns." : card.name) + '</h2>' +
      (revealing ? '<p>The table pauses. One quiet chime rings, then the garden holds its breath.</p>' : '<p class="spoken-note">' + escapeHtml(card.meaning) + '</p>') +
      '<div class="reveal-copy ' + (revealing ? 'delayed' : '') + '">' +
        '<h3>Description</h3><p>' + escapeHtml(card.meaning) + '</p>' +
        '<ul class="effect-list"><li>Garden: ' + escapeTarotText(readingGardenText(card)) + '</li><li>Reading echo: ' + escapeTarotText(card.flavor || card.reflection) + '</li><li>Theme: ' + escapeHtml((card.tags || []).join(", ")) + '</li></ul>' +
        renderAstrologyTarotBridge(card) +
        renderDailySpellPanel(card) +
        renderTarotGameplayImpact(card, "compact") +
        renderTarotDiscovery(card) +
        renderNextDrawCountdown(true) +
      '</div>';
  }

  function readingGardenText(card) {
    if (!card) return "The garden is listening.";
    var character = card.character || tarotCharacterProfile(card);
    var options = [character.gardenEffect, card.garden, card.flavor, card.reflection, card.meaning];
    for (var index = 0; index < options.length; index += 1) {
      var text = options[index] || "";
      if (text && !/brew|brewing|potion|apothecary|cauldron/i.test(text)) return text;
    }
    return card.reflection || card.meaning || "The reading changes what the garden notices first.";
  }

  function renderDailySpellPanel(card) {
    var today = state.today || {};
    ensureTodayRitualDetails(today, card);
    var spell = today.spell || tinySpells[0];
    var reward = today.spellIngredientId ? getIngredient(today.spellIngredientId) : null;
    var complete = today.spellCompleted === true;
    return '<section class="daily-spell-panel"><p class="eyebrow">Tiny real-world spell</p><h3>' + escapeHtml(spell.title) + '</h3><p>' + escapeHtml(spell.text) + '</p>' +
      '<div class="reflection-question"><span>Reflection</span><strong>' + escapeHtml(today.reflectionQuestion || card.reflection) + '</strong></div>' +
      (complete ? '<div class="spell-reward"><span>Garden echo</span><strong>' + escapeHtml(reward ? reward.name : "A mystery sprig") + '</strong><p>Saved as a local detail for today&#39;s reading.</p></div><div class="action-row"><button class="primary" data-action="finish-day">Let the garden grow</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div>' : '<div class="action-row"><button class="primary" data-action="complete-spell">I did this gently</button><button class="ghost" data-action="shuffle-spell">Shuffle spell</button></div><p class="small">Skip or shuffle freely. This is care, not a chore.</p>') +
    '</section>';
  }

  function renderTarotDiscovery(card) {
    var record = tarotJournalRecord(card.id);
    var bloom = state.today && state.today.plantUnlock ? state.today.plantUnlock : (state.cardPlantUnlocks && state.cardPlantUnlocks[card.id]);
    var message = state.today && state.today.newDiscovery ? '<div class="discovery-note"><strong>A new page has appeared in your Tarot Journal.</strong><span>' + escapeHtml(card.name) + ' has been discovered.</span>' + (bloom ? '<span>A new plant has rooted: ' + escapeHtml(bloom.plantName) + '.</span>' : '') + '</div>' : '';
    if (!record) return message;
    return message + '<div class="tarot-history"><p class="eyebrow">Tarot Journal</p><p>Discovered on Day ' + escapeHtml(record.firstDiscoveredDay) + '. Drawn ' + escapeHtml(record.timesDrawn) + ' time' + (record.timesDrawn === 1 ? '' : 's') + '.</p></div>';
  }

  function renderTarotCard(card) {
    if (!card) return renderTarotTable(null, "idle");
    return '<div class="tarot-card">' + renderCardArtwork(card, activeDeckDesign(card.id), "large") + '<div><p class="eyebrow">Today&#39;s Card</p><h3>' + escapeHtml(card.name) + '</h3><p>' + escapeHtml(card.meaning) + '</p></div></div>';
  }

  function renderCardArtwork(card, design, size) {
    if (!design) {
      return renderGardenDeckArtwork(card, size);
    }
    var shownCard = card || getCard(design.cardId) || tarotCards[0];
    var source = normalizeDeckStudio(Object.assign(createDeckStudioDraft(), design, { cardId: design.cardId || shownCard.id }));
    var layers = source.layers.filter(function (layer) { return !!layer.imageData; });
    if (!layers.length) {
      return renderGardenDeckArtwork(shownCard, size);
    }
    var title = source.title || shownCard.name;
    var number = source.number || String(tarotCards.indexOf(shownCard));
    return '<div class="tarot-art custom-card-art custom-card-art-' + escapeHtml(size || 'large') + ' template-' + escapeHtml(slug(source.template)) + ' border-' + escapeHtml(slug(source.border)) + '">' +
      layers.map(renderCardLayer).join("") +
      '<div class="custom-card-number">' + escapeHtml(number) + '</div>' +
      '<div class="custom-card-title">' + escapeHtml(title) + '</div>' +
    '</div>';
  }

  function gardenDeckFigureStyle(card) {
    var seed = hashText(card ? card.id : "garden-card");
    var coreSkinTones = skinTones.filter(function (tone) { return tone.name !== "Porcelain"; });
    var skinPool = seed % 7 === 0 ? skinTones : coreSkinTones;
    var skin = skinPool[seed % skinPool.length].value;
    var hair = ["#2b202f", "#513124", "#6b523c", "#b45d2f", "#d9b45f", "#7c6aa8", "#5f68a8", "#b98285"][Math.floor(seed / 3) % 8];
    var outfit = ["#8b8b58", "#58744d", "#697495", "#b77b3e", "#6d875c", "#716aa4", "#b789a8", "#617b81"][Math.floor(seed / 5) % 8];
    return "--fairy-skin:" + skin + ";--fairy-hair:" + hair + ";--fairy-outfit:" + outfit + ";";
  }

  function gardenDeckSceneClass(card) {
    if (!card) return "scene-mystery";
    var parts = minorCardParts(card.name);
    if (parts) return "scene-" + slug(parts.suit);
    if (card.id === "the_sun") return "scene-sun";
    if (card.id === "the_moon" || card.id === "the_high_priestess") return "scene-moon";
    if (card.id === "the_star") return "scene-star";
    if (card.id === "the_empress") return "scene-bloom";
    if (card.id === "the_fool") return "scene-path";
    if (hasAny(card.tags || [], ["warmth", "courage", "joy"])) return "scene-wands";
    if (hasAny(card.tags || [], ["dream", "intuition", "care"])) return "scene-cups";
    if (hasAny(card.tags || [], ["clarity", "truth", "change"])) return "scene-swords";
    return "scene-pentacles";
  }

  function renderGardenDeckArtwork(card, size) {
    var shownCard = card || tarotCards[0];
    var bloom = cardBloomForCard(shownCard, state ? state.day : 1);
    var parts = minorCardParts(shownCard.name);
    var sceneClass = gardenDeckSceneClass(shownCard);
    var court = /Page|Knight|Queen|King/.test(shownCard.name) || !parts;
    var style = "--card-bloom:" + escapeHtml(bloom.color || "#d88fa0") + ";" + gardenDeckFigureStyle(shownCard);
    return '<div class="tarot-art garden-card-art garden-card-art-' + escapeHtml(size || "large") + ' ' + escapeHtml(sceneClass) + '" style="' + style + '">' +
      '<div class="garden-card-border" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
      '<div class="garden-card-number">' + escapeHtml(shownCard.symbol || "?") + '</div>' +
      '<div class="garden-card-scene">' +
        '<span class="card-orb"></span><span class="card-constellation"></span><span class="card-vine vine-left"></span><span class="card-vine vine-right"></span>' +
        '<div class="card-fairy ' + (court ? 'court' : 'minor') + '" aria-hidden="true"><span class="fairy-wing left"></span><span class="fairy-wing right"></span><span class="fairy-body"></span><span class="fairy-head"></span><span class="fairy-hair"></span><span class="fairy-wand"></span></div>' +
        '<span class="card-bloom bloom-one"></span><span class="card-bloom bloom-two"></span><span class="card-path"></span>' +
      '</div>' +
      '<div class="garden-card-title">' + escapeHtml(shownCard.name) + '</div>' +
    '</div>';
  }

  function renderCardLayer(layer, index) {
    var style = '--deck-x:' + clampNumber(layer.x, -100, 100, 0) + '%;--deck-y:' + clampNumber(layer.y, -100, 100, 0) + '%;--deck-scale:' + clampNumber(layer.scale, 0.4, 2.4, 1) + ';--deck-rotate:' + clampNumber(layer.rotate, -180, 180, 0) + 'deg;--deck-crop:' + clampNumber(layer.crop, 0, 34, 0) + '%;z-index:' + (index + 1) + ';';
    return '<div class="custom-image-stage" style="' + style + '"><img class="custom-image-layer" alt="" src="' + escapeHtml(layer.imageData) + '"></div>';
  }


  function renderBrewWaitingPanel() {
    ensureIngredientSave();
    var content = '<section class="shop-grid apothecary-grid">' +
      '<aside class="side-panel ingredient-panel visitor-profile"><p class="eyebrow">Ingredient stock</p><h2>The basket is ready.</h2><p>The potion table can see every herb you have gathered. The cauldron wakes fully after today&#39;s card speaks.</p><h3>Local basket</h3><div class="inventory-grid compact-inventory">' + renderInventory() + '</div></aside>' +
      '<section class="content-panel brew-workbench"><p class="eyebrow">Brew</p><h2>The potion table is waiting for a card.</h2><p class="small">Draw today&#39;s tarot card to tint the cauldron, earn an ingredient, and unlock the ritual brew.</p>' +
        renderCauldron() +
        '<div class="action-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button></div>' +
        '<p class="small privacy-line">Brews, ingredients, and notes stay in this browser save only.</p>' +
      '</section>' +
    '</section>';
    return renderShell(content, "shop");
  }

  function renderShop() {
    if (!state.today || !state.today.cardId) return renderBrewWaitingPanel();
    ensureIngredientSave();
    var card = currentCard();
    var reward = state.today.spellIngredientId ? getIngredient(state.today.spellIngredientId) : null;
    var settled = state.today.settled === true;
    var actionRow = '';
    if (state.today.dailyPotion && !settled) actionRow = '<button class="primary" data-action="finish-day">Let the garden grow</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button>';
    else if (settled) actionRow = '<button class="primary" data-action="nav" data-screen="garden">Return to Garden</button>';
    var content = '<section class="shop-grid apothecary-grid">' +
      '<aside class="side-panel ingredient-panel visitor-profile"><p class="eyebrow">Today&#39;s Card</p><h2>' + escapeHtml(card.name) + '</h2><p>' + escapeHtml(card.meaning) + '</p><h3>Gameplay influence</h3><p>' + escapeTarotText(card.shop || card.garden) + '</p><h3>Tiny spell</h3><p class="small">' + escapeHtml(state.today.spell ? state.today.spell.title : "A spell waits by the table") + '</p>' + (reward ? '<p class="preferred-potion-pill">Earned: ' + escapeHtml(reward.name) + '</p>' : '<p class="small">Complete the spell on the Tarot page to earn today&#39;s ingredient.</p>') + '<h3>Ingredient stock</h3><div class="inventory-grid compact-inventory">' + renderInventory() + '</div></aside>' +
      '<section class="content-panel brew-workbench"><p class="eyebrow">Brew</p><h2>' + escapeHtml(settled ? "The garden stays open." : "Choose three owned ingredients.") + '</h2><p class="small">' + escapeHtml(settled ? "The daily card has spoken. Any potion you brew now is for relaxing, decorating, and lingering in the garden." : "The card shapes the day. Your tiny spell adds an ingredient. Three ingredients become one potion that grows or decorates the garden.") + '</p>' +
        (!state.today.spellCompleted ? renderDailySpellPanel(card) : '') +
        renderCauldron() +
        renderPotionResult() +
        '<h3>Available ingredients</h3>' + renderBrewIngredientPicker() +
        '<h3>Potions brewed today</h3>' + renderBrewed() +
        '<div class="action-row">' + actionRow + '</div>' +
      '</section>' +
    '</section>';
    return renderShell(content, "shop");
  }

  function renderCauldron() {
    var selected = state.today && state.today.selectedIngredients ? state.today.selectedIngredients : [];
    var preview = selected.length ? potionFromSelectedIngredientCategories(selected) : null;
    var canBrew = selected.length === 3 && state.today && state.today.spellCompleted;
    var lockNote = '';
    if (!state.today || !state.today.spellCompleted) lockNote = '<p class="small potion-lock-note">Complete today&#39;s tiny spell to wake the cauldron.</p>';
    else if (selected.length !== 3) lockNote = '<p class="small potion-lock-note">Choose exactly three ingredients.</p>';
    else if (state.today.dailyPotion) lockNote = '<p class="small potion-lock-note">The ritual potion is complete. This brew is just for lingering in the garden.</p>';
    return '<section class="cauldron-panel"><div class="cozy-cauldron" style="--brew-color:' + escapeHtml(preview ? preview.color : '#8cc6c2') + '"><span></span><span></span><span></span></div><div><p class="eyebrow">Cauldron Cup</p><h3>' + escapeHtml(preview ? preview.name : 'Choose three ingredients') + '</h3><p>' + escapeHtml(preview ? preview.use : 'Tap three owned ingredients. Their categories decide the potion: softening, energy, protection, clarity, or mystery.') + '</p><div class="selected-ingredients">' + (selected.length ? selected.map(function (id) { var ingredient = getIngredient(id); return '<button data-action="select-ingredient" data-id="' + id + '">' + escapeHtml(ingredient ? ingredient.name : id) + '</button>'; }).join("") : '<span>No ingredients in the cup yet.</span>') + '</div><div class="action-row"><button class="primary" data-action="brew-selected"' + disabledAttr(!canBrew) + '>Brew potion</button><button class="ghost" data-action="clear-cauldron">Clear cup</button></div>' + lockNote + '</div></section>';
  }

  function renderBrewIngredientPicker() {
    ensureIngredientSave();
    var selected = state.today && state.today.selectedIngredients ? state.today.selectedIngredients : [];
    return '<div class="brew-ingredient-grid">' + ingredients.map(function (ingredient) {
      var amount = state.ingredientInventory[ingredient.id] || 0;
      var active = selected.indexOf(ingredient.id) !== -1;
      var disabled = amount <= 0 || !state.today || !state.today.spellCompleted;
      return '<button class="brew-ingredient ' + (active ? 'selected' : '') + '" style="--ingredient-color:' + escapeHtml(ingredient.color) + '" data-action="select-ingredient" data-id="' + ingredient.id + '"' + disabledAttr(disabled) + '><strong>' + escapeHtml(ingredient.name) + '</strong><span>' + escapeHtml(categoryLabel(ingredient.category) + ' / ' + ingredient.source) + '</span><em>' + escapeHtml(amount) + '</em></button>';
    }).join("") + '</div>';
  }

  function renderInventory() {
    ensureIngredientSave();
    var card = currentCard();
    return ingredients.map(function (ingredient) {
      var isBonus = card && card.bonus === ingredient.id;
      return '<div class="inventory-item ' + (isBonus ? 'card-touched' : '') + '"><strong>' + escapeHtml(ingredient.name) + '</strong>' + escapeHtml(ingredient.source) + '<br>Amount: ' + (state.ingredientInventory[ingredient.id] || 0) + (isBonus ? '<span>Card-touched</span>' : '') + '</div>';
    }).join("");
  }

  function potionButtonState(potion) {
    var canBrew = potion.ingredients.every(function (ingredientId) { return (state.ingredientInventory[ingredientId] || 0) > 0; });
    if (visitorHelpedToday()) return { disabled: true, label: "Tended", note: "" };
    if (!cardReadyForPotion()) return { disabled: true, label: "Listen first", note: "Choose one way to listen before brewing." };
    if (!canBrew) return { disabled: true, label: "Missing herbs", note: "" };
    return { disabled: false, label: "Brew", note: "" };
  }

  function renderPotion(potion) {
    var card = currentCard();
    var visitor = currentVisitor();
    var button = potionButtonState(potion);
    var need = potion.ingredients.map(function (ingredientId) { return getIngredient(ingredientId).name; }).join(" + ");
    var preferred = visitor && visitor.preferredPotionId === potion.id;
    var resonant = preferred || potionResonance(potion, card).length > 0;
    return '<article class="potion-card ' + (resonant ? 'resonant-potion' : '') + '">' +
      '<h3>' + escapeHtml(potion.name) + '</h3>' +
      '<p>' + escapeHtml(potion.use) + '</p>' +
      '<p class="small">' + escapeHtml(need) + '</p>' +
      (preferred ? '<p class="preferred-potion-pill">Preferred by ' + escapeHtml(visitor.name) + '</p>' : '') +
      '<p class="potion-ritual-line">' + escapeHtml(potionRitualLine(potion, card)) + '</p>' +
      (button.note ? '<p class="small potion-lock-note">' + escapeHtml(button.note) + '</p>' : '') +
      '<button data-action="brew" data-id="' + potion.id + '"' + disabledAttr(button.disabled) + '>' + escapeHtml(button.disabled ? button.label : 'Use recipe') + '</button>' +
    '</article>';
  }

  function renderConversationActions(options) {
    return '<div class="conversation-actions">' + options.map(function (option) {
      return '<button class="ghost" data-action="talk-card" data-tone="' + escapeHtml(option.tone) + '"><strong>' + escapeHtml(option.label) + '</strong><span>' + escapeHtml(option.text) + '</span></button>';
    }).join("") + '</div>';
  }

  function renderConversationLog(conversation) {
    if (!conversation.length) return '<p class="small next-step-note">Choose one way to listen. Brewing unlocks after the visitor has been heard.</p>';
    return '<div class="conversation-log">' + conversation.map(function (line) {
      return '<p><strong>' + escapeHtml(line.label) + ':</strong> ' + escapeTarotText(line.text) + '</p>';
    }).join("") + '</div><p class="small next-step-note">The visitor has been heard. Now brew the potion that answers them.</p>';
  }

  function renderCustomer(customer) {
    if (visitorHelpedToday()) return '<div class="customer-card helped"><h3>The visitor has stepped back into the card.</h3><p>The garden has opened a private reflection for the encounter.</p></div>';
    if (!customer) return '<div class="customer-card"><h3>The counter is quiet.</h3><p>The garden is listening for the right card.</p></div>';
    var conversation = state.today && state.today.conversation ? state.today.conversation : [];
    var optionButtons = conversation.length ? '' : renderConversationActions(cardConversationOptions(customer));
    return '<div class="customer-card card-visitor"><p class="eyebrow">Today&#39;s card has arrived</p>' +
      '<h3>' + escapeHtml(customer.name) + '</h3>' +
      '<p>' + escapeTarotText(customer.request || customer.arrivalText || customer.opening) + '</p>' +
      '<div class="character-details"><span>Need: ' + escapeHtml(customer.emotionalNeed || customer.hiddenNeed) + '</span><span>Domain: ' + escapeHtml(customer.domain || customer.tags.join(", ")) + '</span><span>Relationship: ' + escapeHtml(customer.relationshipState || customer.familiarity) + '</span></div>' +
      renderConversationLog(conversation) + optionButtons +
    '</div>';
  }


  function renderVisitorOutcome() {
    if (!state.today || !state.today.served || !state.today.served.length) return "";
    var served = state.today.served[0];
    var title = served.customer || "Today&#39;s card";
    var ingredientLine = served.ingredients && served.ingredients.length ? '<p class="small">Brewed with: ' + escapeHtml(served.ingredients.join(", ")) + '</p>' : '';
    return '<div class="visitor-outcome"><p class="eyebrow">Encounter tended</p><h3>' + escapeHtml(title) + ' answered the cup</h3><p>' + escapeTarotText(served.outcome) + '</p>' + ingredientLine + '<p class="small">' + escapeTarotText(served.story || "The garden remembers the encounter.") + '</p><p class="small">Reflection: ' + escapeTarotText(served.reflectionPrompt || visitorReflectionPrompt()) + '</p></div>';
  }



  function renderPotionResult() {
    if (!state.today || !state.today.brewed || !state.today.brewed.length) return '';
    var brew = state.today.brewed[state.today.brewed.length - 1];
    var title = state.today.settled && brew.leisure ? 'Latest relaxed brew' : 'Potion result';
    return '<div class="potion-result-panel"><p class="eyebrow">' + escapeHtml(title) + '</p><h3>' + escapeHtml(brew.name) + '</h3><p>' + escapeTarotText(brew.result || potionResultMessage(brew)) + '</p><p class="small">Type: ' + escapeHtml(categoryLabel(brew.category)) + '. Ingredients: ' + escapeHtml((brew.ingredientNames || ingredientNames(brew.ingredients)).join(', ')) + '.</p></div>';
  }

  function renderBrewed() {
    if (!state.today || !state.today.brewed.length) return '<p class="small">No potion brewed yet.</p>';
    return '<div class="brewed-list">' + state.today.brewed.map(function (brew) {
      var ingredientsLine = brew.ingredientNames && brew.ingredientNames.length ? '<small>' + escapeHtml(brew.ingredientNames.join(' + ')) + '</small>' : '';
      return '<div class="brewed-item brewed-potion"><span><strong>' + escapeHtml(brew.name) + '</strong>' + ingredientsLine + '</span><em>' + escapeHtml(categoryLabel(brew.category || "mystery")) + '</em></div>';
    }).join("") + '</div>';
  }

  function renderBook() {
    if (isGardenLocked("journal")) return renderShell(renderGardenLocked("Codex", "The full journal is resting behind Garden Lock."), "codex");
    if (state.today && state.today.cardId) {
      upsertBookEntryForCardPull(getCard(state.today.cardId));
      saveState();
    }
    var entries = state.book;
    var entry = entries[state.selectedEntry] || entries[entries.length - 1];
    var content = '<section class="book-grid">' +
      '<aside class="side-panel"><p class="eyebrow">Garden Codex</p><h2>The Book of Days remembers what has bloomed.</h2><p>This room keeps finished day pages and card traces. Return to the garden when you want another doorway.</p><div class="journal-list">' +
      (entries.length ? entries.map(function (item, index) { return '<button class="' + (entry === item ? 'active' : '') + '" data-action="select-entry" data-index="' + index + '">Day ' + item.day + ': ' + escapeHtml(item.reading.cardName) + (item.status === "reading" ? ' / reading' : '') + '</button>'; }).join("") : '<p class="small">The pages are waiting for their first card.</p>') +
      '</div><div class="action-row"><button class="primary" data-action="new-day">Return to Garden</button></div></aside>' +
      '<section class="book-main">' + renderGardenWrapped() + renderBookPages(entry) + '</section>' +
    '</section>';
    return renderShell(content, "codex");
  }

  function renderBookPages(entry) {
    if (!entry) return '<div class="empty-state content-panel"><div><h2>No pages yet</h2><p>The garden will remember the first card you pull. Return to the garden and visit the Card Altar when you are ready.</p><div class="action-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button></div></div></div>';
    var reading = entry.reading || {};
    var dayRecord = entry.dayRecord || {};
    var encounterItems = dayRecord.encounter || dayRecord.customers || [];
    var cardName = reading.cardName || reading.characterTitle || "Today&#39;s card";
    return '<div class="book-pages">' +
      '<article class="book-page"><p class="eyebrow">Page One' + (entry.status === "reading" ? ' / Card Pulled' : '') + '</p><h2>The Reading</h2><h3>' + escapeHtml(cardName) + '</h3><p><strong>Description:</strong> ' + escapeTarotText(reading.cardDescription || reading.meaning) + '</p><p><strong>Meaning:</strong> ' + escapeTarotText(reading.meaning) + '</p><p><strong>Gameplay:</strong> ' + escapeTarotText(reading.gameplayEffect || reading.effect) + '</p><p><strong>Ingredient:</strong> ' + escapeHtml(reading.ingredientReward || "A quiet basket") + '</p><p><strong>Card bloom:</strong> ' + escapeHtml(reading.plantUnlock || "Waiting to root") + '</p><p><strong>Domain:</strong> ' + escapeHtml(reading.domain || "quiet magic") + '</p><p><strong>Garden effect:</strong> ' + escapeTarotText(reading.effect) + '</p><p class="small">' + escapeTarotText(reading.plantDescription || "") + '</p><p>' + escapeHtml(reading.astrology) + '</p><p>Reflection: ' + escapeHtml(reading.reflection || "") + '</p><p>"' + escapeTarotText(reading.flavor) + '"</p></article>' +
      '<article class="book-page"><p class="eyebrow">Page Two</p><h2>The Day</h2>' + (entry.story ? '<p class="book-story">' + escapeTarotText(entry.story) + '</p>' : '<p class="book-story">This page is open. Let the reading settle and the garden will finish the day record.</p>') + listBlock("Gathered", dayRecord.gathered) + listBlock("Potions", dayRecord.potions) + listBlock("Card Encounter", encounterItems) + listBlock("Garden", dayRecord.gardenChanges) + listBlock("Notable", dayRecord.notable) + renderLinkedPrivatePages(entry) + '</article>' +
    '</div>';
  }

  function renderLinkedPrivatePages(entry) {
    if (!entry) return '';
    var privatePages = (state.privateEntries || []).map(normalizePrivateEntry).filter(function (page) { return page.day === entry.day; });
    if (!privatePages.length) return '<div class="linked-journal-pages"><h3>Private Journal</h3><p>No private page is linked to this day yet. Return to the garden and visit the Grimoire when you want to write.</p></div>';
    return '<div class="linked-journal-pages"><h3>Private Journal</h3>' + privatePages.map(function (page) {
      var prompt = page.journalPrompt ? '<p><strong>Prompt:</strong> ' + escapeHtml(page.journalPrompt) + '</p>' : '';
      var writing = page.freeWriting ? '<p>' + escapeTarotText(page.freeWriting) + '</p>' : '';
      var notes = page.gardenNotes ? '<p class="small">Garden notes: ' + escapeTarotText(page.gardenNotes) + '</p>' : '';
      return '<div class="linked-journal-card"><p class="eyebrow">Day ' + escapeHtml(page.day) + ' / ' + escapeHtml(page.stateOfMind) + ' ' + escapeHtml(page.stateIntensity) + '</p>' + prompt + writing + notes + '</div>';
    }).join("") + '</div>';
  }



  function listBlock(title, items) {
    if (!items || !items.length) return '<h3>' + title + '</h3><p>Nothing written yet.</p>';
    return '<h3>' + title + '</h3><ul>' + items.map(function (item) { return '<li>' + escapeTarotText(item) + '</li>'; }).join("") + '</ul>';
  }

  function hasPrivateReflectionToday() {
    return (state.privateEntries || []).some(function (entry) { return entry.day === state.day; });
  }

  function dailyRitualStatus() {
    var todayKey = localDayKey();
    if (state.today && state.today.cardId && state.today.dateKey !== todayKey && canDrawDailyCard()) {
      return { step: 1, title: "A new day waits at the gate.", text: "Yesterday's card is resting in the reading archive. Visit the Card Altar when you are ready for a fresh daily card.", action: "Visit Card Altar" };
    }
    if (!state.today && state.gardenSettled && state.lastDrawDateKey === todayKey) {
      return { step: 5, title: "Today's card has spoken.", text: "The garden is still open. Choose any object when you want to enter another quiet room.", action: "Choose a Doorway" };
    }
    if (!state.today) {
      return { step: 1, title: "The garden waits for today's reading.", text: "The tarot table is quiet. Visit the Card Altar when you want today's card and optional tiny spell.", action: "Visit Card Altar" };
    }
    if (!state.today.cardId) {
      return { step: 2, title: "The tarot table is waiting.", text: "Draw one card at the Card Altar. Today's card gives a reflection and shapes a tiny optional spell.", action: "Visit Card Altar" };
    }
    if (!state.today.spellCompleted) {
      return { step: 3, title: "A tiny spell waits.", text: "The card has spoken. Tend the optional tiny spell from the Card Altar, or simply return to the garden.", action: "Visit Card Altar" };
    }
    if (state.today.settled) {
      return { step: 5, title: "Today's reading has rooted.", text: "The ritual is complete, but the garden is not closed. Choose any object when you want to linger in one room.", action: "Choose a Doorway" };
    }
    return { step: 4, title: "The reading can root now.", text: "The tiny spell is complete. Let the garden press today's reading into leaves and ink when you are ready.", action: "Let the Garden Grow", finish: true };
  }


  function todayRitualLogs() {
    ensureRitualState();
    var todayKey = localDayKey();
    return (state.ritualLogs || []).filter(function (entry) { return localDayKey(entry.createdAt) === todayKey; });
  }

  function currentDayLesson() {
    var todayKey = localDayKey();
    return (state.dayLessons || []).find(function (lesson) { return lesson && lesson.dateKey === todayKey; }) || null;
  }

  function dayLessonTitle(card, astrologyReading, entry) {
    if (card && astrologyReading) return card.name + " under " + astrologyReading.focus.toLowerCase();
    if (card) return card.name + " leaves a lesson";
    if (astrologyReading) return astrologyReading.focus + " gathers in the branches";
    if (entry) return entry.stateOfMind + " weather pressed into a leaf";
    return "A quiet leaf from the Memory Tree";
  }

  function buildDayLesson() {
    var card = currentCard();
    var chart = activeChart();
    var entry = privateEntryForDay(state.day);
    var ritualLogs = todayRitualLogs();
    var latestLog = ritualLogs[ritualLogs.length - 1] || null;
    var latestRitual = latestLog ? (ritualById(latestLog.ritualId) || ritualRegistry[0]) : null;
    var astrologyReading = currentStoredDailyAstrologyReading(chart);
    var existing = currentDayLesson();
    var now = new Date().toISOString();
    var tarotLine = card ? card.name + ": " + compactSummaryText(card.reflection || card.meaning, "a card is asking to be noticed") : "No card drawn";
    var astrologyLine = astrologyReading ? astrologyReading.focus + ": " + astrologyReading.guidance : "No sky reading saved";
    var feelingLine = entry ? entry.stateOfMind + " / " + entry.stateIntensity + (entry.freeWriting ? ". " + compactSummaryText(entry.freeWriting, "") : "") : "No Grimoire page saved";
    var ritualLine = latestRitual ? latestRitual.title + ": " + compactSummaryText(latestLog.note || latestLog.selectedSensations.join(", ") || latestRitual.gardenMetaphor, latestRitual.gardenMetaphor) : "No ritual saved";
    var question = astrologyReading ? astrologyReading.question : (card ? compactSummaryText(card.reflection, "What is the card asking you to notice?") : "What did the garden make easier to notice today?");
    return normalizeDayLesson({
      id: existing ? existing.id : createLocalId("leaf"),
      day: state.day,
      dateKey: localDayKey(),
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
      title: dayLessonTitle(card, astrologyReading, entry),
      thread: dailySummaryLesson(card, entry, ritualLogs, astrologyReading),
      tarot: tarotLine,
      astrology: astrologyLine,
      feelings: feelingLine,
      ritual: ritualLine,
      lesson: compactSummaryText((card && card.meaning) || (astrologyReading && astrologyReading.practice) || (entry && entry.gardenNotes), "The day was gathered gently, without needing to prove anything."),
      question: question,
      private: true
    });
  }

  function gatherTodayLesson() {
    var lesson = buildDayLesson();
    state.dayLessons = Array.isArray(state.dayLessons) ? state.dayLessons.map(normalizeDayLesson).filter(Boolean) : [];
    state.dayLessons = state.dayLessons.filter(function (item) { return item && item.dateKey !== lesson.dateKey; });
    state.dayLessons.unshift(lesson);
    state.selectedDayLessonId = lesson.id;
    addGardenFeedback("memory", "The Memory Tree saves today's leaf: " + lesson.title + ".", "memory-tree");
    state.gardenSettled = true;
    saveState();
    render();
  }

  function renderDayLessonLeaf(lesson, mode) {
    lesson = normalizeDayLesson(lesson);
    if (!lesson) return '';
    return '<article class="day-lesson-leaf ' + escapeHtml(mode || "") + '"><div><span>' + escapeHtml(dayKeyLabel(lesson.dateKey)) + '</span><strong>' + escapeHtml(lesson.title) + '</strong></div><p>' + escapeHtml(lesson.thread || lesson.lesson) + '</p><dl><dt>Tarot</dt><dd>' + escapeHtml(lesson.tarot) + '</dd><dt>Sky</dt><dd>' + escapeHtml(lesson.astrology) + '</dd><dt>Feeling</dt><dd>' + escapeHtml(lesson.feelings) + '</dd><dt>Ritual</dt><dd>' + escapeHtml(lesson.ritual) + '</dd></dl><small>' + escapeHtml(lesson.question) + '</small></article>';
  }

  function renderDayLessonArchive(currentLesson) {
    var lessons = (state.dayLessons || []).map(normalizeDayLesson).filter(Boolean).sort(function (a, b) {
      return String(b.dateKey).localeCompare(String(a.dateKey));
    });
    if (!lessons.length) return '<section class="content-panel day-lesson-archive"><div class="section-heading"><div><p class="eyebrow">Past Leaves</p><h2>The archive is waiting.</h2></div><span class="small">Gather Today will save the first leaf.</span></div><p class="small">The Memory Tree stores summaries only in this browser. Your raw writing stays where it already lives.</p></section>';
    return '<section class="content-panel day-lesson-archive"><div class="section-heading"><div><p class="eyebrow">Past Leaves</p><h2>Days the tree remembers.</h2></div><span class="small">' + escapeHtml(String(lessons.length)) + ' local ' + (lessons.length === 1 ? 'leaf' : 'leaves') + '</span></div>' +
      '<div class="day-lesson-grid">' + lessons.map(function (lesson) { return renderDayLessonLeaf(lesson, currentLesson && currentLesson.id === lesson.id ? "current" : ""); }).join("") + '</div></section>';
  }

  function dailySummaryHasMaterial() {
    return !!currentCard() || !!privateEntryForDay(state.day) || todayRitualLogs().length > 0 || !!currentStoredDailyAstrologyReading(activeChart()) || !!currentDayLesson();
  }

  function compactSummaryText(value, fallback) {
    value = String(value || "").trim();
    return value || fallback;
  }

  function dailySummaryLesson(card, entry, ritualLogs, astrologyReading) {
    var threads = [];
    if (card) threads.push(card.name + " asks you to " + compactSummaryText(card.reflection || card.meaning, "notice what the card is making visible"));
    if (astrologyReading) threads.push("the Observatory names " + astrologyReading.focus.toLowerCase() + " as today's sky lesson");
    if (entry) threads.push("the Grimoire names the inner weather as " + entry.stateOfMind + " / " + entry.stateIntensity);
    if (entry && entry.gardenNotes) threads.push("the garden note remembers " + entry.gardenNotes);
    if (ritualLogs.length) {
      var latest = ritualLogs[ritualLogs.length - 1];
      var ritual = ritualById(latest.ritualId) || ritualRegistry[0];
      threads.push("the latest ritual worked through " + ritual.gardenMetaphor);
    }
    if (!threads.length) return "The Memory Tree is waiting for today's card, sky reading, page, or ritual to leave a ring in the wood.";
    return "Today's thread: " + threads.join("; ") + ".";
  }

  function renderDaySummaryCard(label, title, body, detail) {
    return '<article class="day-summary-card"><span>' + escapeHtml(label) + '</span><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(body) + '</p>' + (detail ? '<small>' + escapeHtml(detail) + '</small>' : '') + '</article>';
  }

  function renderDaySummaryRoom() {
    var card = currentCard();
    var chart = activeChart();
    var sun = signStyles[chart.sun];
    var moon = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    var entry = privateEntryForDay(state.day);
    var ritualLogs = todayRitualLogs();
    var astrologyReading = currentStoredDailyAstrologyReading(chart);
    var latestLog = ritualLogs[ritualLogs.length - 1] || null;
    var latestRitual = latestLog ? (ritualById(latestLog.ritualId) || ritualRegistry[0]) : null;
    var currentLesson = currentDayLesson();
    var gatherLabel = currentLesson ? "Update Today's Leaf" : "Gather Today";
    var cardBody = card ? compactSummaryText(card.meaning, "The card is present, but quiet.") : "Draw a card at the Card Altar when you want the Memory Tree to read today's tarot weather.";
    var cardDetail = card ? compactSummaryText(card.reflection || (card.character && card.character.emotionalNeed), "Let the card's question settle before turning it into an answer.") : "No tarot card has spoken here yet.";
    var feelingBody = entry ? (entry.stateOfMind + " / " + entry.stateIntensity + ". Felt most in: " + entry.bodyArea + ".") : "The Grimoire has not pressed a feeling page for today yet.";
    var feelingDetail = entry ? compactSummaryText(entry.freeWriting || entry.gardenNotes || (entry.smallPromises || []).join(", "), "No extra writing was saved, and that still counts as a quiet page.") : "Mood, notes, intentions, and writing are optional.";
    var astrologyBody = astrologyReading ? astrologyReading.overview : "Sun in " + chart.sun + " brings " + sun.magic + "; Moon in " + chart.moon + " colors the inner weather as " + moon.aura + "; Rising in " + chart.rising + " suggests entering through " + rising.outfitName + ".";
    var astrologyDetail = astrologyReading ? astrologyReading.guidance + " " + astrologyReading.question : (card ? card.name + " through this sky becomes a reading about " + compactSummaryText(card.character && card.character.domain, card.meaning) + "." : "The Observatory will open a daily sky reading when you visit it.");
    var ritualBody = latestRitual ? (latestRitual.title + " worked through " + latestRitual.gardenMetaphor + ".") : "No Tending Grove ritual has been saved today.";
    var ritualDetail = latestLog ? compactSummaryText(latestLog.note || latestLog.selectedSensations.join(", ") || latestLog.selectedBodyArea, ritualLogs.length + " ritual note" + (ritualLogs.length === 1 ? "" : "s") + " saved today.") : "Ritual work is optional; the tree records only what you choose to save.";
    var gatheredClass = currentLesson && state.selectedDayLessonId === currentLesson.id ? ' gathered' : '';
    var content = '<section class="day-summary-room' + gatheredClass + '">' +
      '<section class="content-panel day-summary-hero"><div class="memory-tree-visual" aria-hidden="true"><span></span><span></span><span></span><span></span></div><div><p class="eyebrow">Memory Tree</p><h1>Today&apos;s lessons gather here.</h1><p>' + escapeHtml(dailySummaryLesson(card, entry, ritualLogs, astrologyReading)) + '</p><div class="privacy-note">Gather Today saves a local summary leaf. It does not publish, sync, or delete your private writing.</div><div class="action-row"><button class="primary" data-action="gather-day-lesson">' + escapeHtml(gatherLabel) + '</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div></div></section>' +
      (currentLesson ? '<section class="content-panel today-leaf-panel"><div class="today-leaf-ceremony" aria-hidden="true"><span></span><span></span><span></span></div><div class="section-heading"><div><p class="eyebrow">Today&apos;s Leaf</p><h2>Saved in the branches.</h2></div><span class="small">' + escapeHtml(localTimeLabel(currentLesson.updatedAt)) + '</span></div>' + renderDayLessonLeaf(currentLesson, "current") + '</section>' : '') +
      '<section class="day-summary-grid">' +
        renderDaySummaryCard("Tarot", card ? card.name : "Waiting for the card", cardBody, cardDetail) +
        renderDaySummaryCard("Feelings", entry ? "Grimoire weather" : "No page pressed yet", feelingBody, feelingDetail) +
        renderDaySummaryCard("Astrology", astrologyReading ? astrologyReading.focus : chart.sun + " / " + chart.moon + " / " + chart.rising, astrologyBody, astrologyDetail) +
        renderDaySummaryCard("Ritual", latestRitual ? latestRitual.title : "No ritual saved yet", ritualBody, ritualDetail) +
      '</section>' +
      renderDayLessonArchive(currentLesson) +
    '</section>';
    return renderShell(content, "daySummary");
  }

  function gardenObjectStatus(object) {
    if (!object) return { label: "Open", tone: "quiet" };
    if (object.id === "card-altar") return canDrawDailyCard() ? { label: "Reading ready", tone: "ready" } : { label: "Resting", tone: "resting" };
    if (object.id === "observatory") return currentStoredDailyAstrologyReading(activeChart()) ? { label: "Today's sky saved", tone: "saved" } : { label: "Daily sky ready", tone: "ready" };
    if (object.id === "grimoire") return (state.privateEntries || []).some(function (entry) { return entry.day === state.day; }) ? { label: "Page saved today", tone: "saved" } : { label: "Fresh page", tone: "ready" };
    if (object.id === "tending-grove") return (state.ritualLogs || []).length ? { label: "Grove remembers", tone: "saved" } : { label: "Gentle ritual", tone: "ready" };
    if (object.id === "memory-tree") return dailySummaryHasMaterial() ? { label: "Day gathered", tone: "saved" } : { label: "Waiting for traces", tone: "ready" };
    return { label: "Open", tone: "quiet" };
  }

  function renderGardenFirstHint() {
    if (state.hasSeenGardenHint) return '';
    return '<div class="garden-first-hint"><span>Choose an object to enter its room.</span></div>';
  }

  function renderGardenDoorwayTransition(object) {
    if (!object) return '';
    return '<div class="garden-doorway-transition doorway-' + escapeHtml(object.kind) + '"><div>' + renderGardenObjectArt(object) + '<span>Opening ' + escapeHtml(object.name) + '</span></div></div>';
  }

  function renderDailyRitualHome() {
    ensureGardenSceneSave();
    var status = dailyRitualStatus();
    var card = currentCard();
    var reward = state.today && state.today.spellIngredientId ? getIngredient(state.today.spellIngredientId) : null;
    var rewardLine = reward ? '<div class="loop-reward"><span>Garden echo</span><strong>' + escapeHtml(reward.name) + '</strong></div>' : (card ? '<div class="loop-reward"><span>Today&#39;s card</span><strong>' + escapeHtml(card.name) + '</strong></div>' : '<div class="loop-reward"><span>Reading</span><strong>Waiting for tarot</strong></div>');
    var gardenDoorwayNote = status.finish ? '<div class="action-row"><button class="primary garden-primary-action" data-action="finish-day">' + escapeHtml(status.action) + '</button></div>' : '<p class="small garden-doorway-note">Choose a garden object to enter its room. Each doorway opens one part of the sanctuary.</p>';
    var selected = gardenObjectById(state.selectedGardenObjectId) || firstEnabledGardenObject();
    var transitionObject = state.roomTransitionId ? gardenObjectById(state.roomTransitionId) : null;
    var placementClass = (state.gardenPlacementMode ? ' placement-mode' : '') + (transitionObject ? ' doorway-transitioning' : '');
    var placementButton = state.gardenPlacementMode ? '<button class="ghost" data-action="toggle-garden-placement" aria-pressed="true">Done</button><button class="ghost" data-action="reset-garden-objects">Reset</button>' : '<button class="ghost" data-action="toggle-garden-placement" aria-pressed="false">Place</button>';
    var settingsButton = '';
    var placementStatus = state.gardenPlacementMode ? '<div class="placement-status"><span>Moving</span><strong>' + escapeHtml(selected.name) + '</strong></div>' : '';
    return '<section class="fairy-garden-scene' + placementClass + '" aria-label="Fairy-sized garden">' +
      '<div class="garden-scene-heading"><div><p class="eyebrow">Fairy-sized Garden</p><h1>The garden is small enough to enter.</h1></div><div class="garden-scene-controls">' + placementStatus + placementButton + settingsButton + '</div></div>' +
      '<div class="fairy-garden-stage" data-garden-section="scene">' + renderGardenSceneAtmosphere() + renderGardenPlacementGrid() + renderGardenObjects() + renderGardenFirstHint() + renderGardenDoorwayTransition(transitionObject) + '</div>' +
      '<div class="garden-scene-status"><div class="garden-scene-copy"><p class="eyebrow">Today in the garden</p><h2>' + escapeHtml(status.title) + '</h2><p>' + escapeHtml(status.text) + '</p></div><div class="loop-status"><div><span>Today&#39;s step</span><strong>' + escapeHtml(status.title) + '</strong></div>' + rewardLine + '</div>' + (card ? renderTarotGameplayImpact(card, "compact") : '') + renderGardenRewardBanner() + renderGardenFeedbackTrail() + renderNextDrawCountdown(true) + gardenDoorwayNote + '<p class="small privacy-line">No account. No ads. No tracking. Your garden keeps its save on this device.</p></div>' +
    '</section>';
  }

  function renderGardenSceneAtmosphere() {
    var reward = state.activeGardenReward || null;
    var ritualEffect = reward ? '<span class="ritual-effect ritual-effect-' + escapeHtml(slug(reward.type)) + '"></span>' : '';
    var feedback = latestGardenFeedback();
    var feedbackEffect = feedback ? '<span class="garden-feedback-effect feedback-effect-' + escapeHtml(slug(feedback.kind)) + '"></span>' : '';
    return '<div class="garden-scale-atmosphere" aria-hidden="true"><span class="giant-leaf leaf-one"></span><span class="giant-leaf leaf-two"></span><span class="giant-leaf leaf-three"></span><span class="dew-drop dew-one"></span><span class="dew-drop dew-two"></span><span class="path-stone stone-one"></span><span class="path-stone stone-two"></span><span class="path-stone stone-three"></span><span class="firefly-dot dot-one"></span><span class="firefly-dot dot-two"></span><span class="firefly-dot dot-three"></span>' + ritualEffect + feedbackEffect + '</div>';
  }

  function renderGardenObjects() {
    ensureGardenSceneSave();
    return '<div class="garden-object-layer">' + visibleGardenObjects().map(renderGardenObject).join("") + '</div>';
  }

  function renderGardenObject(object) {
    var position = state.gardenObjectPositions[object.id] || { x: object.x, y: object.y };
    var selected = state.gardenPlacementMode && state.selectedGardenObjectId === object.id;
    var active = state.activeGardenObjectId === object.id;
    var visited = state.firstDayPath && state.firstDayPath.visited && state.firstDayPath.visited[object.id] === true;
    var action = state.gardenPlacementMode ? 'select-garden-object' : 'open-garden-object';
    var status = gardenObjectStatus(object);
    var className = 'garden-object garden-object-' + escapeHtml(object.kind) + ' status-' + escapeHtml(status.tone) + (selected ? ' selected' : '') + (active ? ' active' : '') + (visited ? ' visited' : '');
    var style = '--x:' + escapeHtml(position.x) + ';--y:' + escapeHtml(position.y) + ';--s:' + escapeHtml(object.scale || 1) + ';';
    var affordance = state.gardenPlacementMode ? 'Move' : 'Open';
    return '<button type="button" class="' + className + '" style="' + style + '" data-action="' + action + '" data-id="' + escapeHtml(object.id) + '" aria-label="' + escapeHtml(object.name + ' opens ' + object.opens) + '">' + renderGardenObjectArt(object) + '<span class="garden-object-label"><strong>' + escapeHtml(object.name) + '</strong><small>' + escapeHtml(object.opens) + '</small><em class="garden-object-status">' + escapeHtml(status.label) + '</em></span><span class="garden-object-affordance">' + escapeHtml(affordance) + '</span></button>';
  }

  function renderGardenObjectArt(object) {
    return '<span class="garden-object-art" aria-hidden="true"><span class="object-glow"></span><span class="object-core"></span><span class="object-detail detail-one"></span><span class="object-detail detail-two"></span><span class="object-detail detail-three"></span></span>';
  }

  function renderGardenPlacementGrid() {
    if (!state.gardenPlacementMode) return '';
    var columns = 12;
    var rows = 8;
    var cells = [];
    for (var row = 0; row < rows; row += 1) {
      for (var column = 0; column < columns; column += 1) {
        var x = Math.round((8 + (column / (columns - 1)) * 84) * 10) / 10;
        var y = Math.round((16 + (row / (rows - 1)) * 72) * 10) / 10;
        cells.push('<button type="button" class="placement-cell" data-action="place-garden-object" data-x="' + x + '" data-y="' + y + '" aria-label="Place selected object here"></button>');
      }
    }
    return '<div class="garden-placement-grid" style="--cols:' + columns + ';--rows:' + rows + ';">' + cells.join("") + '</div>';
  }

  function renderLoopSteps() {
    var status = dailyRitualStatus();
    var beats = [
      { step: 1, label: "Enter", detail: "Garden" },
      { step: 2, label: "Listen", detail: "Card Altar" },
      { step: 3, label: "Tend", detail: "Tiny spell" },
      { step: 4, label: "Root", detail: "Garden" },
      { step: 5, label: "Remember", detail: "Grimoire" }
    ];
    return '<section class="loop-steps compact-path" aria-label="Today&#39;s ritual path"><div class="loop-path-line" aria-hidden="true"></div>' + beats.map(function (beat) {
      var className = beat.step < status.step ? 'done' : (beat.step === status.step ? 'current' : '');
      return '<div class="loop-step ' + className + '"><span></span><strong>' + escapeHtml(beat.label) + '</strong><small>' + escapeHtml(beat.detail) + '</small></div>';
    }).join("") + '</section>';
  }

  function routeDailyRitual() {
    state.screen = "ritual";
    saveState();
    render();
  }

  function lightLanternPath() {
    if (!state.today && canBeginFreshDailyRitual()) {
      startNewDay("ritual");
      return;
    }
    if (state.today && state.today.cardId && state.today.dateKey !== localDayKey() && canDrawDailyCard()) {
      startNewDay("ritual");
      return;
    }
    state.screen = "ritual";
    saveState();
    render();
  }

  function renderDailyRitualRoom() {
    var status = dailyRitualStatus();
    var card = currentCard();
    var reward = state.today && state.today.spellIngredientId ? getIngredient(state.today.spellIngredientId) : null;
    var nextObject = status.finish ? "Garden" : "Card Altar";
    var nextReason = status.finish ? "The reading can settle whenever you choose." : "Draw or tend today's card when you are ready.";
    if (state.today && state.today.settled) {
      nextObject = "Garden";
      nextReason = "The path is lit for lingering, not for hurrying.";
    }
    var primaryAction = (!state.today || (state.today.cardId && state.today.dateKey !== localDayKey() && canDrawDailyCard()))
      ? '<button class="primary" data-action="light-lantern-path">Begin Today</button>'
      : (status.finish ? '<button class="primary" data-action="finish-day">Let the garden grow</button>' : '');
    var cardLine = card ? '<div><span>Today&#39;s card</span><strong>' + escapeHtml(card.name) + '</strong></div>' : '<div><span>Today&#39;s card</span><strong>Waiting at the Card Altar</strong></div>';
    var rewardLine = reward ? '<div><span>Garden echo</span><strong>' + escapeHtml(reward.name) + '</strong></div>' : '<div><span>Garden echo</span><strong>Optional tiny spell</strong></div>';
    var journalLine = '<div><span>Journal</span><strong>Optional in the Grimoire</strong></div>';
    var content = '<section class="single-room-layout daily-ritual-room">' +
      '<section class="content-panel lantern-path-panel"><div class="lantern-path-visual" aria-hidden="true"><span></span><span></span><span></span></div><div><p class="eyebrow">Daily Threshold</p><h1>Begin gently, then return to the garden.</h1><p>This threshold only marks the day. The garden remains the way into each room.</p><div class="privacy-note">Local-only ritual state. No account, no ads, no tracking, no backend.</div><div class="action-row">' + primaryAction + '<button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div></div></section>' +
      renderLoopSteps() +
      '<section class="content-panel ritual-threshold-panel"><p class="eyebrow">Path Marker</p><h2>' + escapeHtml(status.title) + '</h2><p>' + escapeHtml(status.text) + '</p>' + renderNextDrawCountdown(true) + '<div class="ritual-marker-grid">' + cardLine + rewardLine + journalLine + '<div><span>Next doorway</span><strong>' + escapeHtml(nextObject) + '</strong></div></div><p class="small">' + escapeHtml(nextReason) + ' Return to the garden first, then choose the object itself.</p></section>' +
    '</section>';
    return renderShell(content, "ritual");
  }

  function setGardenPrompt(prompt) {
    if (!prompt || journalPrompts.indexOf(prompt) === -1) return;
    if (!state.privateDraft) state.privateDraft = createPrivateDraft();
    state.privateDraft.journalPrompt = prompt;
  }

  function scrollGardenSection(section) {
    window.requestAnimationFrame(function () {
      var target = app.querySelector('[data-garden-section="' + section + '"]');
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function selectGardenObject(id) {
    if (!gardenObjectById(id)) return;
    state.selectedGardenObjectId = id;
    state.activeGardenObjectId = id;
    saveState();
    render();
  }

  function placeSelectedGardenObject(x, y) {
    ensureGardenSceneSave();
    var object = gardenObjectById(state.selectedGardenObjectId) || gardenObjectCatalog[0];
    state.gardenObjectPositions[object.id] = {
      x: clampNumber(x, 8, 92, object.x),
      y: clampNumber(y, 16, 88, object.y)
    };
    state.activeGardenObjectId = object.id;
    saveState();
    render();
  }

  function beginGardenDoorway(id) {
    var object = gardenObjectById(id);
    if (!object) return;
    if (!gardenObjectEnabled(id)) {
      openGardenObject(id);
      return;
    }
    state.activeGardenObjectId = object.id;
    state.hasSeenGardenHint = true;
    state.gardenPlacementMode = false;
    state.roomTransitionId = object.id;
    render();
    window.setTimeout(function () {
      if (state.roomTransitionId === object.id) openGardenObject(object.id);
    }, 560);
  }

  function openGardenObject(id) {
    var object = gardenObjectById(id);
    if (!object) return;
    if (!gardenObjectEnabled(id)) {
      state.screen = "settings";
      saveState();
      render();
      return;
    }
    state.activeGardenObjectId = object.id;
    state.hasSeenGardenHint = true;
    markFirstDayPathVisit(object.id);
    state.roomTransitionId = "";
    state.gardenPlacementMode = false;
    setGardenPrompt(object.prompt);
    if (object.screen === "private") {
      state.privateRoom = privateRoomForGardenObject(object);
      state.journalView = "menu";
    }
    if (object.route === "daily") {
      state.screen = "ritual";
      saveState();
      render();
      return;
    }
    if (object.route === "rooting") {
      if (!state.rootingRitual) state.rootingRitual = { active: false };
      state.rootingRitual.active = true;
      state.screen = "rooting";
      saveState();
      render();
      return;
    }
    if (object.section && !object.screen) {
      state.screen = "garden";
      saveState();
      render();
      scrollGardenSection(object.section);
      return;
    }
    if (object.screen === "tea" && !state.today && canBeginFreshDailyRitual()) {
      startNewDay("tea");
      return;
    }
    state.screen = object.screen || "garden";
    saveState();
    render();
    if (object.section) scrollGardenSection(object.section);
  }


  function renderGarden() {
    ensureIngredientSave();
    var content = '<div class="garden-home-layout">' +
      renderDailyRitualHome() +
      renderObjectArrivalMoment() +
      renderFirstDayPathGuide() +
    '</div>';
    return renderShell(content, "garden");
  }

  function renderIngredientPatches() {
    ensureIngredientSave();
    return '<section class="ingredient-garden-panel content-panel" data-garden-section="ingredients"><div class="section-heading"><div><p class="eyebrow">Ingredient Garden</p><h2>Gather what the card has stirred.</h2></div><span class="small">Tap ready patches to harvest. Tending is gentle and never timed.</span></div><div class="ingredient-patch-grid">' + ingredients.map(renderIngredientPatch).join("") + '</div></section>';
  }

  function renderIngredientPatch(ingredient) {
    var patch = state.ingredientPatches[ingredient.id] || { state: "growing" };
    var amount = state.ingredientInventory[ingredient.id] || 0;
    var ready = patch.state === "ready";
    var action = ready ? ingredient.action : (patch.state === "growing" ? ingredient.tendAction : "Water");
    var button = ready ? '<button class="primary" data-action="gather-ingredient" data-id="' + ingredient.id + '">Harvest</button>' : '<button class="ghost" data-action="tend-ingredient" data-id="' + ingredient.id + '" data-tend="' + escapeHtml(action) + '">' + escapeHtml(action) + '</button>';
    return '<article class="ingredient-patch patch-' + escapeHtml(patch.state) + '" style="--ingredient-color:' + escapeHtml(ingredient.color) + '"><div class="patch-glow" aria-hidden="true"></div><p class="eyebrow">' + escapeHtml(patch.state) + '</p><h3>' + escapeHtml(ingredient.name) + '</h3><p>' + escapeHtml(ingredient.location) + '</p><p class="small">' + escapeHtml(ready ? ingredient.action : 'Tend gently until it glows again.') + '</p><div class="patch-footer"><span>Stock ' + escapeHtml(amount) + '</span>' + button + '</div></article>';
  }

  function renderCardBloomNursery() {
    var blooms = discoveredCardBlooms();
    var preview = blooms.slice(0, 8);
    return '<section class="card-bloom-panel content-panel"><div class="section-heading"><div><p class="eyebrow">Card Blooms</p><h2>New cards leave living plants behind.</h2></div><span class="small">' + escapeHtml(String(blooms.length)) + ' discovered bloom' + (blooms.length === 1 ? '' : 's') + '</span></div>' +
      (preview.length ? '<div class="card-bloom-grid">' + preview.map(renderCardBloom).join("") + '</div>' : '<p class="small">Draw a new card and the garden will root its first card bloom here.</p>') +
    '</section>';
  }

  function renderCardBloom(bloom) {
    return '<article class="card-bloom" style="--bloom-color:' + escapeHtml(bloom.color || '#d88fa0') + '"><div class="bloom-plant" aria-hidden="true"><span></span><span></span><span></span></div><div><p class="eyebrow">Day ' + escapeHtml(bloom.unlockedDay || '?') + '</p><h3>' + escapeHtml(bloom.plantName) + '</h3><p>' + escapeHtml(bloom.cardName) + '</p><p class="small">' + escapeHtml(bloom.description) + '</p></div></article>';
  }

  function renderGardenMilestones() {
    var blooms = discoveredCardBlooms().length;
    return '<section class="garden-milestone-panel content-panel"><div class="section-heading"><div><p class="eyebrow">Garden Growth</p><h2>Bloom milestones</h2></div><span class="small">' + escapeHtml(String(blooms)) + ' card bloom' + (blooms === 1 ? '' : 's') + '</span></div><div class="milestone-grid">' + gardenMilestones().map(function (milestone) {
      return '<article class="milestone-card ' + (milestone.unlocked ? 'unlocked' : 'sleeping') + '"><span>' + (milestone.unlocked ? 'Open' : milestone.remaining + ' bloom' + (milestone.remaining === 1 ? '' : 's') + ' away') + '</span><strong>' + escapeHtml(milestone.name) + '</strong><p>' + escapeHtml(milestone.unlocked ? milestone.text : 'Discover more cards and the garden will reveal this place.') + '</p></article>';
    }).join("") + '</div></section>';
  }

  function renderGardenNooks() {
    return '<section class="garden-nooks"><div class="section-heading"><h3>Garden places</h3><span class="small">The objects in the garden are the doorways.</span></div><div class="nook-grid">' +
      '<article class="nook-card"><span>Card Altar</span><strong>Tarot + readings</strong></article>' +
      '<article class="nook-card"><span>Observatory</span><strong>Astrology + readings</strong></article>' +
      '<article class="nook-card"><span>Grimoire</span><strong>Optional daily journal</strong></article>' +
      '<article class="nook-card"><span>Tending Grove</span><strong>Garden rituals</strong></article>' +
    '</div></section>';
  }

  function renderGardenSecrets() {
    var secrets = gardenSecretCards();
    return '<section class="garden-secrets"><div class="section-heading"><h3>Small secrets</h3><span class="small">Unlocked by ritual, never by streaks.</span></div><div class="secret-grid">' + secrets.map(function (secret) {
      return '<article class="secret-card ' + (secret.unlocked ? 'unlocked' : 'sleeping') + '"><span>' + (secret.unlocked ? 'Open' : 'Sleeping') + '</span><strong>' + escapeHtml(secret.name) + '</strong><p>' + escapeHtml(secret.unlocked ? secret.text : 'The garden has not shown this yet.') + '</p></article>';
    }).join("") + '</div></section>';
  }

  function renderGardenMemory() {
    var memories = (state.garden || []).slice(-5).reverse();
    return '<section class="garden-memory-panel"><div class="section-heading"><h3>Garden memory</h3><span class="small">The garden remembers only what happens here.</span></div>' +
      (memories.length ? '<ul>' + memories.map(function (memory) { return '<li>' + escapeTarotText(memory) + '</li>'; }).join("") + '</ul>' : '<p class="small">The ivy is waiting for its first memory.</p>') +
    '</section>';
  }


  function renderRootingRitualPanel() {
    var dewdrops = state.dewdrops || 0;
    if (state.rootingRitual && state.rootingRitual.active) {
      return '<section class="ancient-tree-panel active-rooting" data-garden-section="rooting"><div class="ancient-tree-visual"><span></span><span></span><span></span></div><div><p class="eyebrow">Rooting Ritual</p><h3>Borrow the patience of roots.</h3><p>Feel your feet. Let the garden hold the rest.</p><p class="small">Hold the rootstone for a few quiet seconds. No breathing instructions unless you want them.</p><div class="action-row"><button class="primary root-hold-button" data-root-hold="true">Hold the rootstone</button><button class="ghost" data-action="step-back">Return to Garden</button></div></div></section>';
    }
    return '<section class="ancient-tree-panel" data-garden-section="rooting"><div class="ancient-tree-visual"><span></span><span></span><span></span></div><div><p class="eyebrow">Ancient Tree</p><h3>Rooting Ritual</h3><p>The witch shows you how to come back to the roots. They are very old. They know how to wait.</p><p class="small">Dewdrops: ' + escapeHtml(dewdrops) + '</p><div class="action-row"><button class="ghost" data-action="start-rooting-ritual">Begin Rooting Ritual</button></div></div></section>';
  }

  function renderRootingRoom() {
    if (!state.rootingRitual) state.rootingRitual = { active: false };
    var content = '<section class="single-room-layout rooting-room">' + renderRootingRitualPanel() + '</section>';
    return renderShell(content, "rooting");
  }

  function completeRootingRitual() {
    if (!state.rootingRitual || !state.rootingRitual.active) return;
    state.rootingRitual.active = false;
    state.dewdrops = (state.dewdrops || 0) + 1;
    state.garden.push("The roots glow softly. A Dewdrop waits in the moss.");
    saveState();
    render();
  }

  function cancelRootingHold() {
    if (rootingHoldTimer) window.clearTimeout(rootingHoldTimer);
    rootingHoldTimer = null;
    var holdButton = app.querySelector('[data-root-hold]');
    if (holdButton) holdButton.classList.remove("holding");
  }

  function startRootingHold(button) {
    cancelRootingHold();
    if (!button) return;
    button.classList.add("holding");
    rootingHoldTimer = window.setTimeout(function () {
      rootingHoldTimer = null;
      completeRootingRitual();
    }, 5200);
  }

  function stepBackToGarden() {
    cancelRootingHold();
    if (!state.rootingRitual) state.rootingRitual = { active: false };
    state.rootingRitual.active = false;
    state.screen = "garden";
    state.garden.push("The garden will wait.");
    saveState();
    render();
  }

  function renderDeckStudio() {
    var content = renderDeckStudioContent("screen");
    return renderShell(content, "tea");
  }

  function renderDeckStudioContent(mode) {
    var draft = normalizeDeckStudio(state.deckStudio || createDeckStudioDraft());
    var card = getCard(draft.cardId) || tarotCards[0];
    var selectedLayer = getSelectedDeckLayer(draft);
    var savedCount = Object.keys(state.customDeck || {}).filter(function (cardId) { return hasDeckArtwork(state.customDeck[cardId]); }).length;
    var compact = mode === "embedded";
    return '<section class="deck-studio-grid' + (compact ? ' embedded-deck-studio' : '') + '">' +
      '<aside class="content-panel deck-preview-panel"><p class="eyebrow">Deck Studio</p><h2>Create Your Deck</h2>' +
        '<div class="studio-card-frame">' + renderCardArtwork(card, hasDeckArtwork(draft) ? draft : null, "studio") + '</div>' +
        '<p class="small">Artwork changes only the card image. The meaning remains: ' + escapeHtml(card.meaning) + '</p>' +
        '<div class="privacy-note">Local-first and private. Images are not uploaded, shared, analyzed, or used for training.</div>' +
      '</aside>' +
      '<section class="content-panel"><p class="eyebrow">Collage Tools</p><h2>Build the card in layers</h2>' +
        '<div class="form-grid studio-controls">' +
          deckSelectField("Card identity", "cardId", tarotCards.map(function (card) { return { value: card.id, label: card.name }; }), draft.cardId) +
          deckSelectField("Template", "template", deckTemplateOptions.map(optionObject), draft.template) +
          '<div class="field wide"><label for="deck-image">Add image layer from device</label><input id="deck-image" type="file" accept="image/*" data-deck-image="true"><p class="small">Each imported image becomes a movable collage layer stored only in this browser save.</p></div>' +
          renderLayerControls(draft, selectedLayer) +
          deckSelectField("Simple border", "border", deckBorderOptions.map(optionObject), draft.border) +
          '<div class="field"><label for="deck-title">Card title</label><input id="deck-title" data-deck-field="title" value="' + escapeHtml(draft.title) + '" placeholder="' + escapeHtml(card.name) + '"></div>' +
          '<div class="field"><label for="deck-number">Card number</label><input id="deck-number" data-deck-field="number" value="' + escapeHtml(draft.number) + '" placeholder="Optional"></div>' +
        '</div>' +
        '<div class="action-row"><button class="primary" data-action="save-custom-card">Save card</button><button class="ghost" data-action="load-saved-card">Load saved art</button><button class="ghost" data-action="clear-card-art">Clear artwork</button><button class="ghost" data-action="remove-card-design">Remove saved card</button></div>' +
        '<p class="small">Saved custom cards: ' + savedCount + ' / ' + tarotCards.length + '</p>' +
      '</section>' +
      '<section class="content-panel wide-panel"><p class="eyebrow">Preview Full Deck</p><h2>My Custom Deck</h2><div class="deck-preview-grid">' + tarotCards.map(renderDeckThumb).join("") + '</div></section>' +
    '</section>';
  }

  function renderLayerControls(draft, selectedLayer) {
    var layers = draft.layers || [];
    if (!layers.length) {
      return '<div class="field wide layer-empty"><span class="control-label">Layer stack</span><p>Add an image layer to start collaging this card.</p></div>';
    }
    var selectedIndex = layers.findIndex(function (layer) { return selectedLayer && layer.id === selectedLayer.id; });
    var layerOptions = layers.map(function (layer, index) {
      return '<option value="' + escapeHtml(layer.id) + '" ' + selected(selectedLayer ? selectedLayer.id : "", layer.id) + '>' + (index + 1) + '. ' + escapeHtml(layer.name) + (index === layers.length - 1 ? ' (top)' : '') + '</option>';
    }).join("");
    var layerButtons = layers.map(function (layer, index) {
      return '<button class="layer-chip ' + (selectedLayer && layer.id === selectedLayer.id ? 'selected' : '') + '" data-action="select-layer" data-id="' + escapeHtml(layer.id) + '">' + (index + 1) + '. ' + escapeHtml(layer.name) + '</button>';
    }).join("");
    return '<div class="field wide layer-stack"><span class="control-label">Layer stack</span><div class="layer-chip-row">' + layerButtons + '</div><p class="small">Higher-numbered layers sit on top.</p></div>' +
      '<div class="field wide"><label for="deck-layer">Selected layer</label><select id="deck-layer" data-deck-layer-select="true">' + layerOptions + '</select></div>' +
      '<div class="field"><label for="deck-layer-name">Layer name</label><input id="deck-layer-name" data-deck-layer-field="name" value="' + escapeHtml(selectedLayer ? selectedLayer.name : "") + '"></div>' +
      deckLayerRangeField("Move layer left/right", "x", selectedLayer ? selectedLayer.x : 0, -100, 100, 1) +
      deckLayerRangeField("Move layer up/down", "y", selectedLayer ? selectedLayer.y : 0, -100, 100, 1) +
      deckLayerRangeField("Resize layer", "scale", selectedLayer ? selectedLayer.scale : 1, 0.4, 2.4, 0.05) +
      deckLayerRangeField("Rotate layer", "rotate", selectedLayer ? selectedLayer.rotate : 0, -180, 180, 1) +
      deckLayerRangeField("Crop layer", "crop", selectedLayer ? selectedLayer.crop : 0, 0, 34, 1) +
      '<div class="field wide layer-actions"><span class="control-label">Layer order</span><div class="inline-actions"><button class="ghost" data-action="send-layer-backward" ' + (selectedIndex <= 0 ? 'disabled' : '') + '>Send backward</button><button class="ghost" data-action="bring-layer-forward" ' + (selectedIndex >= layers.length - 1 ? 'disabled' : '') + '>Bring forward</button><button class="ghost" data-action="remove-image-layer">Remove layer</button></div></div>';
  }

  function optionObject(value) {
    return { value: value, label: value };
  }

  function deckSelectField(label, field, options, value) {
    return '<div class="field"><label>' + label + '</label><select data-deck-field="' + field + '">' + options.map(function (option) { return '<option value="' + escapeHtml(option.value) + '" ' + selected(value, option.value) + '>' + escapeHtml(option.label) + '</option>'; }).join("") + '</select></div>';
  }

  function deckRangeField(label, field, value, min, max, step) {
    return '<div class="field"><label>' + label + '</label><input type="range" data-deck-field="' + field + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + escapeHtml(value) + '"><p class="small">' + escapeHtml(value) + '</p></div>';
  }

  function deckLayerRangeField(label, field, value, min, max, step) {
    return '<div class="field"><label>' + label + '</label><input type="range" data-deck-layer-field="' + field + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + escapeHtml(value) + '"><p class="small">' + escapeHtml(value) + '</p></div>';
  }

  function renderDeckThumb(card) {
    var design = getDeckDesign(card.id);
    var hasArtwork = hasDeckArtwork(design);
    return '<article class="deck-thumb"><div class="deck-thumb-art">' + renderCardArtwork(card, hasArtwork ? design : null, "thumb") + '</div><h3>' + escapeHtml(card.name) + '</h3><p class="small">' + (hasArtwork ? 'Custom collage saved' : 'Garden Deck fallback') + '</p><button data-action="edit-card-design" data-id="' + card.id + '">Edit</button></article>';
  }

  function updateDeckStudioFromInputs() {
    if (!state.deckStudio) state.deckStudio = createDeckStudioDraft();
    app.querySelectorAll('[data-deck-field]').forEach(function (field) {
      var key = field.dataset.deckField;
      state.deckStudio[key] = ["x", "y", "scale", "rotate", "crop"].indexOf(key) !== -1 ? Number(field.value) : field.value;
    });
    var layerSelect = app.querySelector('[data-deck-layer-select]');
    if (layerSelect) state.deckStudio.selectedLayerId = layerSelect.value;
    normalizeDeckStudio(state.deckStudio);
    var selectedLayer = getSelectedDeckLayer(state.deckStudio);
    if (selectedLayer) {
      app.querySelectorAll('[data-deck-layer-field]').forEach(function (field) {
        var key = field.dataset.deckLayerField;
        if (["x", "y", "scale", "rotate", "crop"].indexOf(key) !== -1) selectedLayer[key] = Number(field.value);
        else selectedLayer[key] = field.value;
      });
    }
    normalizeDeckStudio(state.deckStudio);
  }

  function setDeckStudioCard(cardId, keepImage) {
    var card = getCard(cardId) || tarotCards[0];
    var saved = getDeckDesign(card.id);
    if (saved && keepImage) {
      state.deckStudio = serializeDeckDesign(Object.assign(createDeckStudioDraft(), saved, { cardId: card.id }));
    } else {
      state.deckStudio = Object.assign(createDeckStudioDraft(), { cardId: card.id, title: card.name, number: String(tarotCards.indexOf(card)) });
    }
    normalizeDeckStudio(state.deckStudio);
  }

  function saveCustomCard() {
    updateDeckStudioFromInputs();
    var draft = normalizeDeckStudio(state.deckStudio);
    if (!state.customDeck) state.customDeck = {};
    state.customDeck[draft.cardId] = serializeDeckDesign(draft);
    state.deckChoice = "custom";
    saveState();
    render();
  }

  function loadImageIntoDeck(file) {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) return;
    var reader = new FileReader();
    reader.onload = function () {
      if (!state.deckStudio) state.deckStudio = createDeckStudioDraft();
      normalizeDeckStudio(state.deckStudio);
      var layer = createDeckLayer(String(reader.result || ""), "Image " + (state.deckStudio.layers.length + 1));
      state.deckStudio.layers.push(layer);
      state.deckStudio.selectedLayerId = layer.id;
      normalizeDeckStudio(state.deckStudio);
      saveState();
      render();
    };
    reader.readAsDataURL(file);
  }

  function normalizePrivateRoom(room) {
    return "journal";
  }

  function privateRoomForGardenObject(object) {
    return "journal";
  }

  function activePrivateRoom() {
    return "journal";
  }

  function privateRoomMeta(room) {
    return {
      object: "Grimoire",
      title: "Daily Journal",
      eyebrow: "Grimoire",
      heading: "Choose what belongs on today's page.",
      copy: "Mood, body notes, intentions, habits, cycle notes, and free writing are all optional. Leave any section blank.",
      aside: "One private local page for the pieces of the day you choose to keep."
    };
  }

  function journalSectionOptions() {
    return [
      { id: "mood", label: "Mood", text: "State of mind" },
      { id: "body", label: "Body", text: "Body notes" },
      { id: "intentions", label: "Intentions", text: "Small promises" },
      { id: "cycle", label: "Cycle", text: "Private notes" },
      { id: "writing", label: "Writing", text: "Prompt + page" },
      { id: "notes", label: "Garden Notes", text: "What to remember" }
    ];
  }

  function activeJournalSection() {
    var ids = journalSectionOptions().map(function (section) { return section.id; });
    return ids.indexOf(state.journalSection) !== -1 ? state.journalSection : "mood";
  }

  function renderJournalOptionalSections(activeSection) {
    var active = activeSection || activeJournalSection();
    return '<div class="field wide journal-option-note journal-section-chooser"><p class="eyebrow">Today\'s Page Drawers</p><h3>Open only what you need.</h3><p>Choose one section at a time. Every drawer is optional, and blank drawers stay quiet.</p><div class="journal-section-grid">' + journalSectionOptions().map(function (section) {
      var selected = section.id === active;
      return '<button type="button" class="journal-section-button ' + (selected ? 'active' : '') + '" data-action="journal-section" data-section="' + escapeHtml(section.id) + '" aria-pressed="' + (selected ? 'true' : 'false') + '"><strong>' + escapeHtml(section.label) + '</strong><span>' + escapeHtml(section.text) + '</span></button>';
    }).join("") + '</div></div>';
  }

  function renderJournalWritingSection(draft) {
    return '<div class="field wide ritual-section journal-writing-section" data-garden-section="journal"><h3>Writing</h3><p>Choose a reflection prompt, then write as much or as little as you want.</p>' +
      privateSelectField("Reflection prompt", "journalPrompt", journalPrompts, draft.journalPrompt) +
      (visitorHelpedToday() ? '<div class="ritual-callout visitor-reflection-unlock"><strong>Card reflection</strong><span>' + escapeHtml(visitorReflectionPrompt()) + '</span></div>' : '') +
      '<div class="field"><label for="free-writing">Free writing</label><textarea id="free-writing" data-private-field="freeWriting" placeholder="Tarot, mood, intention, dream, memory, or nothing at all.">' + escapeHtml(draft.freeWriting) + '</textarea></div></div>';
  }

  function renderJournalNotesSection(draft) {
    return '<div class="field wide ritual-section journal-notes-section"><h3>Garden Notes</h3><p>Leave a small thing you want the garden to remember.</p><div class="field"><label for="garden-notes">Garden notes</label><textarea id="garden-notes" data-private-field="gardenNotes" placeholder="A glimmer, a habit, a wish, or anything you want the garden to remember.">' + escapeHtml(draft.gardenNotes) + '</textarea></div></div>';
  }

  function renderActiveJournalSection(room, draft, activeSection) {
    var active = activeSection || activeJournalSection();
    if (active === "body") return renderBodySnapshot(draft);
    if (active === "intentions") return renderSmallPromises(draft);
    if (active === "cycle") return renderCycleNotes(draft);
    if (active === "writing") return renderJournalWritingSection(draft);
    if (active === "notes") return renderJournalNotesSection(draft);
    return renderArrivalCheckIn(draft);
  }

  function renderPrivateRoomFields(room, draft) {
    room = normalizePrivateRoom(room);
    var active = activeJournalSection();
    return renderJournalOptionalSections(active) + '<div class="journal-active-section">' + renderActiveJournalSection(room, draft, active) + '</div>';
  }

  function journalView() {
    return ["menu", "new", "archive"].indexOf(state.journalView) !== -1 ? state.journalView : "menu";
  }

  function journalEntryDate(entry) {
    return localDateLabel(entry.savedAt || entry.createdAt || entry.date || new Date().toISOString());
  }

  function journalEntryGroupKey(entry) {
    var value = entry.savedAt || entry.createdAt || entry.date || "";
    if (localDayKey(value) === localDayKey()) return "today";
    var date = value ? new Date(value) : new Date(0);
    if (Number.isNaN(date.getTime())) return "older";
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000 ? "week" : "older";
  }

  function renderJournalShelfButton(entry, selected) {
    var active = selected && selected.id === entry.id;
    return '<button class="journal-shelf-page ' + (active ? 'active' : '') + '" data-action="view-private-entry" data-id="' + escapeHtml(entry.id) + '"><span>' + escapeHtml(journalEntryDate(entry)) + '</span><strong>Day ' + escapeHtml(entry.day) + '</strong><small>' + escapeHtml(entry.stateOfMind + ' / ' + entry.stateIntensity) + '</small></button>';
  }

  function renderJournalShelfGroups(entries, selected) {
    var ordered = entries.slice().reverse();
    var groups = [
      { key: "today", label: "Today", items: [] },
      { key: "week", label: "This week", items: [] },
      { key: "older", label: "Older pages", items: [] }
    ];
    ordered.forEach(function (entry) {
      var key = journalEntryGroupKey(entry);
      var group = groups.find(function (item) { return item.key === key; }) || groups[2];
      group.items.push(entry);
    });
    return groups.filter(function (group) { return group.items.length; }).map(function (group) {
      return '<div class="journal-shelf-group"><span class="journal-shelf-heading">' + escapeHtml(group.label) + '</span>' + group.items.map(function (entry) { return renderJournalShelfButton(entry, selected); }).join("") + '</div>';
    }).join("");
  }

  function renderJournalMenu(meta, entries) {
    var latest = entries.slice(-3).reverse();
    var todaysEntry = entries.find(function (entry) { return entry.day === state.day; });
    var todayDoorTitle = todaysEntry ? "Continue today's journal" : "Start today's journal";
    var todayDoorKicker = todaysEntry ? "Today's drawers update the same saved page." : "Mood, intentions, habits, body notes, and free writing stay optional.";
    var todayDoorLabel = todaysEntry ? "Today's page" : "Fresh page";
    var lastLine = latest.length ? '<div class="journal-preview-list">' + latest.map(function (entry) {
      return '<article><span>' + escapeHtml(journalEntryDate(entry)) + '</span><strong>Day ' + escapeHtml(entry.day) + '</strong><p>' + escapeHtml(entry.stateOfMind + ' / ' + entry.stateIntensity) + '</p></article>';
    }).join("") + '</div>' : '<p class="small">No pages have been pressed into the Grimoire yet.</p>';
    return '<section class="single-room-layout journal-menu-room">' +
      '<section class="content-panel journal-menu-panel"><p class="eyebrow">' + escapeHtml(meta.object) + '</p><h1>Open the Grimoire.</h1><p>Choose today&#39;s page, or leaf through what this garden has already kept.</p><div class="journal-door-grid">' +
        '<button class="journal-door journal-door-new" data-action="journal-view" data-view="new"><span>' + escapeHtml(todayDoorLabel) + '</span><strong>' + escapeHtml(todayDoorTitle) + '</strong><small>' + escapeHtml(todayDoorKicker) + '</small></button>' +
        '<button class="journal-door journal-door-archive" data-action="journal-view" data-view="archive"><span>Shelf of days</span><strong>Look at past journals</strong><small>' + escapeHtml(entries.length ? entries.length + ' saved page' + (entries.length === 1 ? '' : 's') : 'No saved pages yet') + '</small></button>' +
      '</div><div class="privacy-note">Private and local to this device. No account, ads, tracking, or backend.</div></section>' +
      '<aside class="side-panel journal-menu-aside"><p class="eyebrow">Recently pressed</p>' + lastLine + renderGardenLockPanel() + '</aside>' +
    '</section>';
  }

  function renderJournalNewPage(meta, draft, room) {
    var todaysEntry = privateEntryForDay(state.day);
    var pageLabel = todaysEntry ? "Today's page" : "Fresh page";
    var saveLabel = todaysEntry ? "Update this page" : "Press this page";
    var pageAside = todaysEntry ? "Keep tending today's saved page. Each drawer updates this same day." : meta.aside;
    return '<section class="book-grid private-pages-grid private-room-' + escapeHtml(room) + '">' +
      '<aside class="side-panel"><p class="eyebrow">' + escapeHtml(pageLabel) + '</p><h2>' + escapeHtml(meta.title) + '</h2><p>' + escapeHtml(pageAside) + '</p>' +
        '<div class="privacy-note">Inspired by body awareness. Optional, local-first, skippable, and never a label or a score.</div>' +
        '<div class="journal-room-actions"><button class="ghost" data-action="journal-view" data-view="menu">Grimoire menu</button><button class="ghost" data-action="journal-view" data-view="archive">Past journals</button></div>' +
        renderGardenLockPanel() +
      '</aside>' +
      '<section class="content-panel"><p class="eyebrow">' + escapeHtml(meta.eyebrow) + '</p><h2>' + escapeHtml(meta.heading) + '</h2><p>' + escapeHtml(meta.copy) + '</p>' +
        (room === "journal" ? renderTodayTarotMemory() : '') +
        '<div class="form-grid private-form">' + renderPrivateRoomFields(room, draft) + '</div>' +
        '<div class="action-row"><button class="primary" data-action="save-private-page">' + escapeHtml(saveLabel) + '</button><button class="ghost" data-action="clear-private-page">Clear page</button><button class="ghost" data-action="journal-view" data-view="menu">Grimoire menu</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div>' +
      '</section>' +
    '</section>';
  }

  function renderJournalEntryDetail(entry) {
    if (!entry) return '<section class="content-panel journal-entry-detail empty"><p class="eyebrow">Shelf of days</p><h2>No page selected.</h2><p>Choose a saved page from the shelf, or start a fresh page.</p></section>';
    var promises = entry.smallPromises && entry.smallPromises.length ? '<div><span>Small promises</span><p>' + escapeHtml(entry.smallPromises.join(', ')) + '</p></div>' : '';
    var body = (entry.bodySnapshot && entry.bodySnapshot.length) || entry.bodyMessage ? '<div><span>Body notes</span><p>' + escapeHtml((entry.bodySnapshot || []).join(', ') || 'Quiet note') + (entry.bodyMessage ? '<br>' + escapeHtml(entry.bodyMessage) : '') + '</p></div>' : '';
    var cycle = entry.cycleSignals && entry.cycleSignals.length || entry.cycleNotes ? '<div><span>Cycle notes</span><p>' + escapeHtml((entry.cycleSignals || []).join(', ') || 'Noted privately') + (entry.cycleNotes ? '<br>' + escapeHtml(entry.cycleNotes) : '') + '</p></div>' : '';
    var writing = entry.freeWriting ? '<div><span>Free writing</span><p>' + escapeHtml(entry.freeWriting) + '</p></div>' : '';
    var notes = entry.gardenNotes ? '<div><span>Garden notes</span><p>' + escapeHtml(entry.gardenNotes) + '</p></div>' : '';
    return '<section class="content-panel journal-entry-detail"><p class="eyebrow">Day ' + escapeHtml(entry.day) + ' / ' + escapeHtml(journalEntryDate(entry)) + '</p><h2>' + escapeHtml(entry.stateOfMind + ' ' + entry.stateIntensity) + '</h2><p>' + escapeHtml(entry.journalPrompt || 'A private page from the Grimoire.') + '</p><div class="journal-entry-sections">' +
      '<div><span>Tarot memory</span><p>' + escapeHtml(entry.tarotCardName || 'No card turned yet') + '</p></div>' +
      '<div><span>Mood</span><p>' + escapeHtml(entry.stateOfMind + ' / ' + entry.stateIntensity + ' / ' + entry.bodyArea) + '</p></div>' + promises + body + cycle + writing + notes +
    '</div><div class="action-row"><button class="primary" data-action="journal-view" data-view="new">Start a new page</button><button class="ghost" data-action="journal-view" data-view="menu">Grimoire menu</button></div></section>';
  }

  function renderJournalArchive(meta, entries) {
    var selected = entries.find(function (entry) { return entry.id === state.selectedPrivateEntryId; }) || entries[entries.length - 1] || null;
    if (selected) state.selectedPrivateEntryId = selected.id;
    var list = entries.length ? renderJournalShelfGroups(entries, selected) : '<p class="small">No private pages written yet.</p>';
    return '<section class="book-grid journal-archive-room"><aside class="side-panel journal-shelf"><p class="eyebrow">' + escapeHtml(meta.object) + '</p><h2>Past journals</h2><p>Read what the garden has kept on this device.</p><div class="journal-room-actions"><button class="primary" data-action="journal-view" data-view="new">Start a new page</button><button class="ghost" data-action="journal-view" data-view="menu">Grimoire menu</button></div><div class="journal-list journal-shelf-list">' + list + '</div><div class="action-row">' + (entries.length ? '<button class="ghost" data-action="remove-latest-private-page">Remove latest private page</button>' : '') + '</div></aside>' + renderJournalEntryDetail(selected) + '</section>';
  }

  function renderPrivatePages() {
    state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
    state.privateDraft = normalizePrivateDraft(state.privateDraft || createPrivateDraft());
    var room = activePrivateRoom();
    var meta = privateRoomMeta(room);
    if (isGardenLocked("private")) return renderShell(renderGardenLocked(meta.title, "Private memories are resting behind Garden Lock."), "private");
    var draft = state.privateDraft;
    var entries = (state.privateEntries || []).map(normalizePrivateEntry);
    var view = journalView();
    var content = view === "new" ? renderJournalNewPage(meta, draft, room) : (view === "archive" ? renderJournalArchive(meta, entries) : renderJournalMenu(meta, entries));
    return renderShell(content, "private");
  }

  function renderArrivalCheckIn(draft) {
    return '<div class="field wide ritual-section arrival-section" data-garden-section="mood"><h3>How the Garden Finds You</h3><p>How does the garden find you today?</p><div class="form-grid">' +
      privateSelectField("State of Mind", "stateOfMind", stateOfMindOptions, draft.stateOfMind) +
      privateSelectField("Intensity", "stateIntensity", stateIntensityOptions, draft.stateIntensity) +
      privateSelectField("Where do you feel that most?", "bodyArea", bodyAreaOptions, draft.bodyArea) +
    '</div><p class="small">You can answer, skip, or change this later. The garden takes your word for it.</p></div>';
  }

  function bodySnapshotUnlocked() {
    return state.day >= 3 || (state.privateEntries && state.privateEntries.length > 0);
  }

  function renderBodySnapshot(draft) {
    if (!bodySnapshotUnlocked()) {
      return '<div class="field wide ritual-section opt-in-panel"><h3>Body Snapshot</h3><p>After a few visits, or after your first journal page, the garden can hold a quick private body note.</p><p class="small">Nothing is required. The garden will wait.</p></div>';
    }
    return '<div class="field wide ritual-section body-snapshot-section"><div class="section-heading"><h3>Body Snapshot</h3><span class="small">Optional</span></div><p>Take a quiet moment. What do you notice?</p><p class="small">Choose any that fit, or none. This is noticing, not diagnosing.</p>' +
      renderBodySnapshotChecks(draft) +
      '<div class="field"><label for="body-message">Anything your body wants to say?</label><textarea id="body-message" data-private-field="bodyMessage" placeholder="A word, image, or nothing at all">' + escapeHtml(draft.bodyMessage) + '</textarea></div>' +
    '</div>';
  }

  function renderBodySnapshotChecks(draft) {
    var selectedNotices = draft.bodySnapshot || [];
    return '<div class="check-grid">' + bodySnapshotOptions.map(function (notice) {
      var checked = selectedNotices.indexOf(notice) !== -1 ? 'checked' : '';
      return '<label class="check-item"><input type="checkbox" data-private-body-snapshot="' + escapeHtml(notice) + '" ' + checked + '> <span>' + escapeHtml(notice) + '</span></label>';
    }).join("") + '</div>';
  }

  function renderPrivateEntryButton(entry) {
    var promise = entry.smallPromises && entry.smallPromises.length ? ' / ' + entry.smallPromises[0] : '';
    return '<button data-action="load-private-entry" data-id="' + entry.id + '">Day ' + entry.day + ': ' + escapeHtml(entry.stateOfMind) + ' ' + escapeHtml(entry.stateIntensity) + escapeHtml(promise) + '</button>';
  }

  function renderTodayTarotMemory() {
    var card = currentCard();
    if (!card) return '<div class="ritual-callout"><strong>Today&#39;s card</strong><span>The tarot table is still waiting.</span></div>';
    return '<div class="ritual-callout"><strong>Today&#39;s card: ' + escapeHtml(card.name) + '</strong><span>' + escapeHtml(visitorReflectionPrompt()) + '</span></div>';
  }

  function renderCycleNotes(draft) {
    if (!state.privateSettings || !state.privateSettings.cycleNotesEnabled) {
      return '<div class="field wide ritual-section opt-in-panel"><h3>Cycle Notes</h3><p>Would you like the garden to remember your cycle notes?</p><p class="small">This is private pattern-noticing, not medical advice or fertility prediction.</p><button class="ghost" data-action="enable-cycle-notes">Let the garden remember</button></div>';
    }
    return '<div class="field wide ritual-section"><div class="section-heading"><h3>Cycle Notes</h3><button class="ghost" data-action="disable-cycle-notes">Pause Cycle Notes</button></div><p class="small">Only note what feels useful. Empty is welcome.</p>' +
      renderCycleChecks(draft) +
      privateSelectField("Sleep quality", "sleepQuality", sleepQualityOptions, draft.sleepQuality) +
      '<div class="field"><label for="cycle-notes">Cycle notes</label><textarea id="cycle-notes" data-private-field="cycleNotes" placeholder="Cramps, tenderness, cravings, rest, dreams, or anything useful to remember">' + escapeHtml(draft.cycleNotes) + '</textarea></div>' +
    '</div>';
  }

  function renderCycleChecks(draft) {
    var selectedSignals = draft.cycleSignals || [];
    return '<div class="check-grid">' + cycleNoteOptions.map(function (signal) {
      var checked = selectedSignals.indexOf(signal) !== -1 ? 'checked' : '';
      return '<label class="check-item"><input type="checkbox" data-private-cycle-note="' + escapeHtml(signal) + '" ' + checked + '> <span>' + escapeHtml(signal) + '</span></label>';
    }).join("") + '</div>';
  }

  function renderSmallPromises(draft) {
    var selectedPromises = draft.smallPromises || [];
    return '<div class="field wide ritual-section" data-garden-section="promises"><h3>Small Promises</h3><p>Choose one small promise. No proof required.</p><p class="small">Tiny acts of care. No streaks, no punishments, no productivity spellbook.</p><div class="check-grid">' + smallPromiseOptions.map(function (promise) {
      var checked = selectedPromises.indexOf(promise) !== -1 ? 'checked' : '';
      return '<label class="check-item"><input type="checkbox" data-private-promise="' + escapeHtml(promise) + '" ' + checked + '> <span>' + escapeHtml(promise) + '</span></label>';
    }).join("") + '</div><div class="field"><label for="custom-promise">Custom small promise</label><input id="custom-promise" data-private-field="customPromise" value="' + escapeHtml(draft.customPromise) + '" placeholder="One gentle thing"></div></div>';
  }

  function privateSelectField(label, field, options, value) {
    return '<div class="field"><label>' + label + '</label><select data-private-field="' + field + '">' + options.map(function (option) { return '<option value="' + escapeHtml(option) + '" ' + selected(value, option) + '>' + escapeHtml(option) + '</option>'; }).join("") + '</select></div>';
  }

  function updatePrivateDraftFromInputs() {
    if (!state.privateDraft) state.privateDraft = createPrivateDraft();
    app.querySelectorAll('[data-private-field]').forEach(function (field) {
      state.privateDraft[field.dataset.privateField] = field.value;
    });
    var bodySnapshot = [];
    app.querySelectorAll('[data-private-body-snapshot]').forEach(function (field) {
      if (field.checked) bodySnapshot.push(field.dataset.privateBodySnapshot);
    });
    state.privateDraft.bodySnapshot = bodySnapshot;
    var cycleSignals = [];
    app.querySelectorAll('[data-private-cycle-note]').forEach(function (field) {
      if (field.checked) cycleSignals.push(field.dataset.privateCycleNote);
    });
    state.privateDraft.cycleSignals = cycleSignals;
    var promises = [];
    app.querySelectorAll('[data-private-promise]').forEach(function (field) {
      if (field.checked) promises.push(field.dataset.privatePromise);
    });
    state.privateDraft.smallPromises = promises;
    normalizePrivateDraft(state.privateDraft);
  }

  function getDraftPromises(draft) {
    var promises = Array.isArray(draft.smallPromises) ? draft.smallPromises.slice() : [];
    var customPromise = (draft.customPromise || "").trim();
    if (customPromise && promises.indexOf(customPromise) === -1) promises.push(customPromise);
    return promises;
  }

  function privateGardenEcho(draft) {
    var promises = getDraftPromises(draft);
    if (promises.length) return "A Dewdrop gathers where a small promise takes root. Nothing is counted. It is simply noticed.";
    if ((draft.bodySnapshot || []).length) return "A moonflower opens beside the path after the garden receives a quiet body note.";
    if ((draft.cycleSignals || []).indexOf("period started") !== -1) return "The garden lowers its lanterns and makes a soft place to rest.";
    if (draft.stateOfMind === "Hopeful" || draft.stateOfMind === "Clear") return "A few blossoms open early after a private page is pressed.";
    if (draft.stateOfMind === "Heavy" || draft.stateOfMind === "Overgrown") return "The moss grows thicker beside the old tree, soft enough to sit on.";
    if (draft.stateOfMind === "Restless") return "The wind chimes slow themselves to a gentler rhythm.";
    return "A pressed fern page slips quietly into the private book.";
  }

  function savePrivatePage() {
    updatePrivateDraftFromInputs();
    var draft = normalizePrivateDraft(state.privateDraft || createPrivateDraft());
    var promisesForEntry = getDraftPromises(draft);
    var card = currentCard();
    var now = new Date().toISOString();
    if (!state.privateEntries) state.privateEntries = [];
    var existing = privateEntryForDay(state.day);
    var existingPromises = existing && existing.smallPromises ? existing.smallPromises.slice() : [];
    var entry = normalizePrivateEntry({
      id: existing ? existing.id : 'private-' + Date.now(),
      day: state.day,
      createdAt: existing ? (existing.createdAt || existing.savedAt || now) : now,
      savedAt: now,
      tarotCardId: card ? card.id : (existing ? existing.tarotCardId || existing.cardDrawn || "" : ""),
      tarotCardName: card ? card.name : (existing ? existing.tarotCardName || "No card turned yet" : "No card turned yet"),
      tarotMeaning: card ? card.meaning : (existing ? existing.tarotMeaning || "" : ""),
      date: existing ? (existing.date || now.slice(0, 10)) : now.slice(0, 10),
      cardDrawn: card ? card.id : (existing ? existing.cardDrawn || existing.tarotCardId || "" : ""),
      stateOfMind: draft.stateOfMind,
      stateIntensity: draft.stateIntensity,
      bodyArea: draft.bodyArea,
      bodySnapshot: (draft.bodySnapshot || []).slice(),
      bodyMessage: draft.bodyMessage,
      cycleNotesEnabled: state.privateSettings && state.privateSettings.cycleNotesEnabled,
      cycleSignals: state.privateSettings && state.privateSettings.cycleNotesEnabled ? (draft.cycleSignals || []).slice() : [],
      sleepQuality: state.privateSettings && state.privateSettings.cycleNotesEnabled ? draft.sleepQuality : "Not noting",
      cycleNotes: state.privateSettings && state.privateSettings.cycleNotesEnabled ? draft.cycleNotes : "",
      smallPromises: promisesForEntry,
      smallPromise: promisesForEntry[0] || "",
      journalPrompt: draft.journalPrompt,
      freeWriting: draft.freeWriting,
      gardenNotes: draft.gardenNotes,
      innerWeather: draft.stateOfMind,
      energy: draft.stateIntensity,
      cyclePhase: (draft.cycleSignals || []).indexOf("period started") !== -1 ? "Period" : "Not tracking",
      cycleDay: "",
      needs: promisesForEntry,
      glimmer: draft.gardenNotes,
      reflection: draft.freeWriting,
      journalText: draft.freeWriting,
      gardenReward: privateGardenEcho(draft)
    });
    state.privateEntries = state.privateEntries.filter(function (item) { return item && item.day !== state.day; });
    state.privateEntries.push(entry);
    state.selectedPrivateEntryId = entry.id;
    state.journalView = "archive";
    var addedPromise = promisesForEntry.some(function (promise) { return existingPromises.indexOf(promise) === -1; });
    if (addedPromise) state.dewdrops = (state.dewdrops || 0) + 1;
    if (!existing && visitorHelpedToday()) state.garden.push("A small secret stirs after the card's story is written down.");
    var echo = privateGardenEcho(draft);
    if (!state.garden.length || state.garden[state.garden.length - 1] !== echo) state.garden.push(echo);
    markFirstDayPathVisit("grimoire");
    addGardenFeedback("journal", "The Grimoire presses today's page into the garden air.", "grimoire");
    state.privateDraft = privateDraftFromEntry(entry);
    saveState();
    render();
  }

  function gardenLockActive() {
    var settings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
    state.privateSettings = settings;
    return settings.gardenLock.mode !== "none" && !!settings.gardenLock.passcodeHash;
  }

  function isGardenLocked(scope) {
    if (!gardenLockActive()) return false;
    if (gardenLockSessionUnlocked) return false;
    var mode = state.privateSettings.gardenLock.mode;
    if (scope === "private") return mode === "private" || mode === "journal";
    if (scope === "journal") return mode === "journal";
    return false;
  }

  function lockHash(value) {
    return String(hashText("garden-lock:" + value));
  }

  function lockModeLabel(mode) {
    if (mode === "private") return "lock private entries only";
    if (mode === "journal") return "lock full journal";
    return "no lock";
  }

  function renderGardenLocked(title, message) {
    return '<section class="content-panel lock-panel"><p class="eyebrow">Garden Lock</p><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(message) + '</p><div class="privacy-note">If you forget your Garden Lock, private notes cannot be recovered.</div><div class="form-grid"><div class="field wide"><label for="unlock-key">Garden Lock phrase</label><input id="unlock-key" type="password" data-lock-field="unlockKey" value="' + escapeHtml(lockDraft.unlockKey) + '" placeholder="Enter your lock phrase"></div></div><div class="action-row"><button class="primary" data-action="unlock-garden">Open Garden Lock</button></div></section>';
  }

  function renderGardenLockPanel() {
    state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
    var currentMode = state.privateSettings.gardenLock.mode;
    if (!lockDraft.setupMode) lockDraft.setupMode = currentMode;
    var chosenMode = lockDraft.setupMode || currentMode || "none";
    var hasLock = gardenLockActive();
    return '<section class="garden-lock-card"><p class="eyebrow">Garden Lock</p><h3>' + escapeHtml(hasLock ? 'Currently set to ' + lockModeLabel(currentMode) : 'Optional privacy lock') + '</h3><p class="small">Protect mood history, Cycle Notes, Small Promises, and journal memories on this device.</p><label>Lock choice</label><select data-lock-field="setupMode"><option value="none" ' + selected(chosenMode, "none") + '>No lock</option><option value="private" ' + selected(chosenMode, "private") + '>Lock private entries only</option><option value="journal" ' + selected(chosenMode, "journal") + '>Lock full journal</option></select>' + (chosenMode !== "none" ? '<label for="setup-key">Garden Lock phrase</label><input id="setup-key" type="password" data-lock-field="setupKey" value="' + escapeHtml(lockDraft.setupKey) + '" placeholder="' + escapeHtml(hasLock ? 'New phrase optional' : 'Choose a lock phrase') + '">' : '') + '<div class="privacy-note">If you forget your Garden Lock, private notes cannot be recovered.</div><div class="action-row"><button class="ghost" data-action="save-garden-lock">Save Garden Lock</button>' + (hasLock && gardenLockSessionUnlocked ? '<button class="ghost" data-action="close-garden-lock">Close lock</button>' : '') + '</div></section>';
  }

  function saveGardenLock() {
    state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
    var mode = lockDraft.setupMode || state.privateSettings.gardenLock.mode || "none";
    if (mode === "none") {
      state.privateSettings.gardenLock = { mode: "none", passcodeHash: "" };
      gardenLockSessionUnlocked = false;
    } else {
      var passcode = (lockDraft.setupKey || "").trim();
      if (!state.privateSettings.gardenLock.passcodeHash && !passcode) {
        window.alert("Choose a Garden Lock phrase first.");
        return;
      }
      if (passcode) state.privateSettings.gardenLock.passcodeHash = lockHash(passcode);
      state.privateSettings.gardenLock.mode = mode;
      gardenLockSessionUnlocked = true;
    }
    lockDraft.setupKey = "";
    lockDraft.unlockKey = "";
    saveState();
    render();
  }

  function unlockGarden() {
    state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
    var passcode = (lockDraft.unlockKey || "").trim();
    if (state.privateSettings.gardenLock.passcodeHash && lockHash(passcode) === state.privateSettings.gardenLock.passcodeHash) {
      gardenLockSessionUnlocked = true;
      lockDraft.unlockKey = "";
      render();
      return;
    }
    window.alert("The Garden Lock stays closed. Try another phrase.");
  }

  function moonPhaseForDate(date) {
    var cycle = 29.53058867;
    var knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
    var days = (date.getTime() - knownNewMoon) / 86400000;
    var age = ((days % cycle) + cycle) % cycle;
    var fraction = age / cycle;
    var illumination = Math.round(((1 - Math.cos(2 * Math.PI * fraction)) / 2) * 100);
    var phases = [
      { limit: 0.03, name: "New Moon", garden: "The garden prefers quiet starts and buried seeds." },
      { limit: 0.22, name: "Waxing Crescent", garden: "Small wishes take root near the gate." },
      { limit: 0.28, name: "First Quarter", garden: "The paths ask for one brave choice." },
      { limit: 0.47, name: "Waxing Gibbous", garden: "Nearly-ready things gather glow." },
      { limit: 0.53, name: "Full Moon", garden: "Moonflowers open and visitors speak more clearly." },
      { limit: 0.72, name: "Waning Gibbous", garden: "The garden shares what it has learned." },
      { limit: 0.78, name: "Last Quarter", garden: "Old leaves loosen without being hurried." },
      { limit: 0.97, name: "Waning Crescent", garden: "The paths grow soft for rest and release." },
      { limit: 1, name: "New Moon", garden: "The garden prefers quiet starts and buried seeds." }
    ];
    var phase = phases.find(function (item) { return fraction <= item.limit; }) || phases[0];
    return {
      name: phase.name,
      age: Math.round(age),
      illumination: illumination,
      garden: phase.garden,
      waxing: fraction < 0.5
    };
  }

  function seasonForDate(date) {
    var mmdd = (date.getMonth() + 1) * 100 + date.getDate();
    if (mmdd >= 1221 || mmdd < 320) return { name: "Winter", tone: "rest, roots, candles, slow repair" };
    if (mmdd >= 320 && mmdd < 621) return { name: "Spring", tone: "sprouts, rainwater, first courage" };
    if (mmdd >= 621 && mmdd < 922) return { name: "Summer", tone: "lanterns, blossoms, warm abundance" };
    return { name: "Autumn", tone: "harvest, thresholds, memory, release" };
  }

  function wheelHolidaySeeds() {
    return [
      { key: "imbolc", name: "Imbolc", month: 1, day: 1, theme: "first light, hearth, milk, early hope", garden: "Snowdrops wake beside the kettle." },
      { key: "ostara", name: "Ostara", month: 2, day: 20, theme: "spring balance, eggs, sprouts, returning dawn", garden: "Two new leaves open in balance." },
      { key: "beltane", name: "Beltane", month: 4, day: 1, theme: "flowers, fire, delight, green blessing", garden: "The ivy gate wears ribbons of bloom." },
      { key: "litha", name: "Litha", month: 5, day: 21, theme: "midsummer, sunlight, honey, full growth", garden: "Sunpetals turn gold before noon." },
      { key: "lughnasadh", name: "Lammas / Lughnasadh", month: 7, day: 1, theme: "first harvest, bread, skill, gratitude", garden: "The apothecary shelves smell faintly of warm grain." },
      { key: "mabon", name: "Mabon", month: 8, day: 22, theme: "autumn balance, fruit, thanks, gathering in", garden: "Amber leaves collect around the Book stump." },
      { key: "samhain", name: "Samhain", month: 9, day: 31, theme: "ancestors, veils, endings, remembered names", garden: "Lanterns appear along the oldest path." },
      { key: "yule", name: "Yule", month: 11, day: 21, theme: "winter solstice, evergreen, candles, returning sun", garden: "The old tree keeps one candle burning." }
    ];
  }

  function dateForWheelHoliday(seed, year) {
    return new Date(year, seed.month, seed.day);
  }

  function dayDiff(from, to) {
    var start = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
    var end = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
    return Math.round((end - start) / 86400000);
  }

  function wheelHolidaysForDate(date) {
    var year = date.getFullYear();
    return wheelHolidaySeeds().map(function (seed) {
      var holidayDate = dateForWheelHoliday(seed, year);
      var daysUntil = dayDiff(date, holidayDate);
      if (daysUntil < 0) {
        holidayDate = dateForWheelHoliday(seed, year + 1);
        daysUntil = dayDiff(date, holidayDate);
      }
      return Object.assign({}, seed, { date: holidayDate, daysUntil: daysUntil });
    }).sort(function (a, b) { return a.daysUntil - b.daysUntil; });
  }

  function almanacDateLabel(date) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function renderGardenAlmanac() {
    var today = new Date();
    var moon = moonPhaseForDate(today);
    var season = seasonForDate(today);
    var holidays = wheelHolidaysForDate(today);
    var next = holidays[0];
    return '<section class="content-panel garden-almanac"><div class="almanac-heading"><p class="eyebrow">Garden Almanac</p><h2>The moon and seasons keep watch.</h2><p>The garden follows a local calendar: moon phase, seasonal mood, and Wheel of the Year checkpoints. These are cozy game signals, not external tracking.</p></div>' +
      '<div class="almanac-grid">' +
        '<article class="moon-card"><div class="moon-disc ' + escapeHtml(slug(moon.name)) + '"><span></span></div><div><p class="eyebrow">Today&#39;s Moon</p><h3>' + escapeHtml(moon.name) + '</h3><p>' + escapeHtml(moon.illumination + "% lit, about day " + moon.age + " of the lunar cycle.") + '</p><p class="small">' + escapeHtml(moon.garden) + '</p></div></article>' +
        '<article><p class="eyebrow">Current Season</p><h3>' + escapeHtml(season.name) + '</h3><p>' + escapeHtml(season.tone) + '</p><p class="small">Seasonal changes can tint garden lighting, herb notes, and visitor flavor text.</p></article>' +
        '<article><p class="eyebrow">Next Checkpoint</p><h3>' + escapeHtml(next.name) + '</h3><p>' + escapeHtml(almanacDateLabel(next.date) + " / " + (next.daysUntil === 0 ? "today" : next.daysUntil + " days away")) + '</p><p class="small">' + escapeHtml(next.theme) + '</p></article>' +
      '</div>' +
      '<div class="wheel-list">' + holidays.slice(0, 4).map(function (holiday) {
        return '<article class="' + (holiday.daysUntil === 0 ? 'today' : '') + '"><span>' + escapeHtml(almanacDateLabel(holiday.date)) + '</span><strong>' + escapeHtml(holiday.name) + '</strong><p>' + escapeHtml(holiday.garden) + '</p></article>';
      }).join("") + '</div>' +
    '</section>';
  }

  function renderDailyAstrologyReadingPanel(reading, card) {
    var cardNote = card ? card.name + " turns today's sky toward " + compactSummaryText(card.character && card.character.domain, card.meaning) + "." : "Draw a card at the Card Altar when you want tarot to join today's sky.";
    var savedCount = Object.keys(state.dailyAstrologyReadings || {}).length;
    return '<section class="content-panel daily-astrology-reading"><div class="daily-astrology-header"><div><p class="eyebrow">Daily Sky Reading</p><h2>' + escapeHtml(reading.title) + '</h2><p>' + escapeHtml(reading.overview) + '</p></div><div class="daily-astrology-orbit" aria-hidden="true"><span></span><span></span><span></span></div></div>' +
      '<div class="daily-astrology-grid">' +
        '<article><span>Today&#39;s Focus</span><strong>' + escapeHtml(reading.focus) + '</strong><p>' + escapeHtml(reading.guidance) + '</p></article>' +
        '<article><span>Practice</span><strong>One small spell</strong><p>' + escapeHtml(reading.practice) + '</p></article>' +
        '<article><span>Question</span><strong>Ask the glass</strong><p>' + escapeHtml(reading.question) + '</p></article>' +
        '<article><span>Moon + Season</span><strong>' + escapeHtml(reading.moonNote.split(":")[0]) + '</strong><p>' + escapeHtml(reading.moonNote + " " + reading.seasonNote) + '</p></article>' +
      '</div>' +
      '<div class="daily-astrology-footer"><p>' + escapeHtml(reading.gardenNote + " " + cardNote) + '</p><span>' + escapeHtml(savedCount + " local sky reading" + (savedCount === 1 ? "" : "s") + " saved") + '</span></div></section>';
  }

  function renderAstrologyReadingPanel(chart, card) {
    var sun = signStyles[chart.sun];
    var moon = signStyles[chart.moon];
    var rising = signStyles[chart.rising];
    var cardLine = card ? card.name + " is today's card weather." : "Draw a card at the Card Altar when you want a sky-tinted reading.";
    return '<section class="content-panel astrology-reading-panel"><div class="section-heading"><div><p class="eyebrow">Sky Reading</p><h2>The observatory reads the garden weather.</h2></div><span class="small">Optional, local, cozy</span></div><div class="sky-reading-grid">' +
      '<article><span>Sun</span><strong>' + escapeHtml(chart.sun) + '</strong><p>' + escapeHtml(sun.magic) + '</p></article>' +
      '<article><span>Moon</span><strong>' + escapeHtml(chart.moon) + '</strong><p>' + escapeHtml(moon.aura) + '</p></article>' +
      '<article><span>Rising</span><strong>' + escapeHtml(chart.rising) + '</strong><p>' + escapeHtml(rising.outfitName) + '</p></article>' +
      '<article><span>Card Weather</span><strong>' + escapeHtml(card ? card.name : "Waiting") + '</strong><p>' + escapeHtml(cardLine) + '</p></article>' +
    '</div></section>';
  }


  function ritualDurationLabel(seconds) {
    var minutes = Math.max(1, Math.round((seconds || 60) / 60));
    return minutes + " min";
  }

  function ritualAnswer(stepId) {
    ensureRitualState();
    if (!state.ritualSession.answers[stepId]) state.ritualSession.answers[stepId] = {};
    return state.ritualSession.answers[stepId];
  }

  function ritualSelectedValues(stepId) {
    var answer = ritualAnswer(stepId);
    if (Array.isArray(answer.values)) return answer.values;
    if (answer.value) return [answer.value];
    return [];
  }

  function renderRitualMenu() {
    ensureRitualState();
    var recent = state.ritualLogs.slice(-4).reverse();
    var resources = state.gardenResources.slice(-4).reverse();
    return '<section class="ritual-menu-layout">' +
      '<section class="content-panel ritual-menu-intro"><div><p class="eyebrow">Tending Grove</p><h1>What kind of tending would help?</h1><p>Garden Rituals are short, optional moments for noticing, naming, and tending through garden metaphors. You can stop anytime.</p><div class="privacy-note">Private by default. Saved ritual notes and resources stay on this device.</div></div><div class="ritual-grove-visual" aria-hidden="true"><span></span><span></span><span></span></div></section>' +
      '<section class="ritual-card-grid">' + ritualRegistry.map(renderRitualCard).join("") + '</section>' +
      '<section class="ritual-side-grid">' +
        '<article class="content-panel ritual-log-panel"><div class="section-heading"><div><p class="eyebrow">Private Ritual Log</p><h2>Recent tending</h2></div><span class="small">' + escapeHtml(String(state.ritualLogs.length)) + ' saved</span></div>' + (recent.length ? recent.map(renderRitualLogEntry).join("") : '<p class="small">No ritual notes saved yet.</p>') + '</article>' +
        '<article class="content-panel ritual-resource-panel"><div class="section-heading"><div><p class="eyebrow">Resource Grove</p><h2>What supports you</h2></div><span class="small">' + escapeHtml(String(state.gardenResources.length)) + ' planted</span></div>' + (resources.length ? resources.map(renderGardenResourceItem).join("") : '<p class="small">Resources planted through Resource Grove will appear here.</p>') + '</article>' +
      '</section>' +
    '</section>';
  }

  function renderRitualCard(ritual) {
    return '<article class="ritual-card"><div><p class="eyebrow">' + escapeHtml(ritualDurationLabel(ritual.durationSec) + ' / ' + ritual.intensity) + '</p><h2>' + escapeHtml(ritual.title) + '</h2><p>' + escapeHtml(ritual.subtitle) + '</p><span>' + escapeHtml(ritual.gardenMetaphor) + '</span></div><button class="primary" data-action="choose-ritual" data-id="' + escapeHtml(ritual.id) + '">Tend</button></article>';
  }

  function renderRitualLogEntry(entry) {
    var ritual = ritualById(entry.ritualId) || ritualRegistry[0];
    var note = entry.note ? '<p>' + escapeHtml(entry.note) + '</p>' : '<p class="small">Saved privately without a note.</p>';
    return '<div class="ritual-log-entry"><div><strong>' + escapeHtml(ritual.title) + '</strong><span>' + escapeHtml(localDateLabel(entry.createdAt)) + '</span></div>' + note + '<button class="ghost" data-action="delete-ritual-log" data-id="' + escapeHtml(entry.id) + '">Delete</button></div>';
  }

  function renderGardenResourceItem(resource) {
    return '<div class="garden-resource-item"><span class="resource-symbol resource-' + escapeHtml(slug(resource.symbol)) + '">' + escapeHtml(resource.symbol) + '</span><div><strong>' + escapeHtml(resource.name) + '</strong><p>' + escapeHtml(resource.category + (resource.note ? ' / ' + resource.note : '')) + '</p></div></div>';
  }

  function renderGardenRituals() {
    ensureRitualState();
    var session = state.ritualSession;
    var content = '';
    if (session.mode === "fallback") content = renderRitualFallback();
    else if (session.mode === "paused") content = renderRitualPaused();
    else if (session.mode === "reflection") content = renderRitualReflection();
    else if (session.mode === "consent" || session.mode === "runner") content = renderRitualRunner();
    else content = renderRitualMenu();
    return renderShell(content, "gardenRituals");
  }

  function renderRitualRunner() {
    var session = state.ritualSession;
    var ritual = ritualById(session.ritualId) || ritualRegistry[0];
    var consent = session.mode === "consent";
    var step = consent ? ritual.steps[0] : ritual.steps[Math.min(session.stepIndex, ritual.steps.length - 1)];
    var progress = consent ? 0 : Math.round(((session.stepIndex + 1) / ritual.steps.length) * 100);
    var controls = consent ? renderRitualConsentControls() : renderRitualStepControls(ritual, step);
    return '<section class="ritual-runner-layout">' +
      '<aside class="side-panel ritual-context"><p class="eyebrow">Garden Ritual</p><h2>' + escapeHtml(ritual.title) + '</h2><p>' + escapeHtml(ritual.subtitle) + '</p><div class="ritual-meta"><span>' + escapeHtml(ritualDurationLabel(ritual.durationSec)) + '</span><span>' + escapeHtml(ritual.gardenMetaphor) + '</span><span>private by default</span></div><div class="ritual-progress"><i style="width:' + progress + '%"></i></div><p class="small">' + escapeHtml(ritual.safetyNote) + '</p></aside>' +
      '<section class="content-panel ritual-step-panel"><p class="eyebrow">' + escapeHtml(consent ? "Permission" : "Step " + (session.stepIndex + 1) + " of " + ritual.steps.length) + '</p>' +
        (consent ? '<h1>Would you like to try this?</h1><h2>' + escapeHtml(step.title) + '</h2><p>' + escapeHtml(step.body) + '</p>' : renderRitualStep(ritual, step)) +
        controls +
      '</section>' +
    '</section>';
  }

  function renderRitualConsentControls() {
    return '<div class="ritual-control-row"><button class="primary" data-action="begin-ritual">Begin gently</button><button class="ghost" data-action="skip-ritual">Skip</button><button class="ghost" data-action="pause-ritual">Pause</button><button class="ghost" data-action="ritual-uncomfortable">This feels uncomfortable</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div>';
  }

  function renderRitualStepControls(ritual, step) {
    var last = state.ritualSession.stepIndex >= ritual.steps.length - 1;
    return '<div class="ritual-control-row"><button class="ghost" data-action="ritual-back">Back</button><button class="primary" data-action="ritual-next">' + escapeHtml(last ? "Continue" : "Next") + '</button><button class="ghost" data-action="ritual-skip-step">Skip</button><button class="ghost" data-action="pause-ritual">Pause</button><button class="ghost" data-action="ritual-uncomfortable">This feels uncomfortable</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div>';
  }

  function renderRitualStep(ritual, step) {
    var answer = ritualAnswer(step.id);
    var copy = '<h1>' + escapeHtml(step.title) + '</h1><p>' + escapeHtml(step.body) + '</p>';
    if (step.type === "sensationChips") return copy + renderRitualChoiceGrid(step, true);
    if (step.type === "choice" || step.type === "bodyArea") return copy + renderRitualChoiceGrid(step, false);
    if (step.type === "gardenAction") return copy + renderRitualGardenAction(ritual, step, answer);
    if (step.type === "dragMap") return copy + renderRitualDragMap(step, answer);
    if (step.type === "notice" || step.type === "text" || step.type === "closing") return copy + renderRitualTextField(step, answer);
    return copy;
  }

  function renderRitualChoiceGrid(step, multi) {
    var selectedValues = ritualSelectedValues(step.id);
    return '<div class="ritual-choice-grid" role="group" aria-label="' + escapeHtml(step.title) + '">' + (step.choices || []).map(function (choice) {
      var active = selectedValues.indexOf(choice) !== -1;
      return '<button class="ritual-chip ' + (active ? 'selected' : '') + '" data-action="ritual-choice" data-step="' + escapeHtml(step.id) + '" data-value="' + escapeHtml(choice) + '" data-multi="' + (multi ? 'true' : 'false') + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + escapeHtml(choice) + '</button>';
    }).join("") + '</div>';
  }

  function renderRitualTextField(step, answer) {
    return '<div class="field wide ritual-text-field"><label for="ritual-text-' + escapeHtml(step.id) + '">' + escapeHtml(step.optional ? "Optional note" : "Optional words") + '</label><textarea id="ritual-text-' + escapeHtml(step.id) + '" data-ritual-text="' + escapeHtml(step.id) + '" placeholder="' + escapeHtml(step.placeholder || "A word, image, sentence, or nothing at all.") + '">' + escapeHtml(answer.text || "") + '</textarea></div>';
  }

  function renderRitualGardenAction(ritual, step, answer) {
    var done = answer.done === true;
    return '<div class="ritual-action-stage ritual-action-' + escapeHtml(slug(ritual.reward.type)) + '"><div class="ritual-action-visual" aria-hidden="true"><span></span><span></span><span></span></div><button class="primary ritual-hold-button" data-action="ritual-garden-action" data-step="' + escapeHtml(step.id) + '">' + escapeHtml(done ? "Held gently" : "Press gently") + '</button><p class="small">' + escapeHtml(step.durationSec ? "About " + step.durationSec + " seconds, or less if that is enough." : "A small tap is enough.") + '</p></div>';
  }

  function renderRitualDragMap(step, answer) {
    var label = answer.label || "";
    var zone = answer.zone || "";
    return '<div class="ritual-map"><div class="field wide"><label for="ritual-map-label">What would you like to place?</label><input id="ritual-map-label" data-ritual-map-label="' + escapeHtml(step.id) + '" value="' + escapeHtml(label) + '" placeholder="A person, role, request, or situation"></div><div class="ritual-zone-grid" role="group" aria-label="Distance zones">' + gardenFenceZones.map(function (item) { return '<button class="ritual-zone ' + (zone === item ? 'selected' : '') + '" data-action="ritual-zone" data-step="' + escapeHtml(step.id) + '" data-zone="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>'; }).join("") + '</div><p class="small">This is the keyboard-friendly version of moving labels into garden distances.</p></div>';
  }

  function renderRitualPaused() {
    var ritual = ritualById(state.ritualSession.ritualId) || ritualRegistry[0];
    return '<section class="single-room-layout"><section class="content-panel ritual-pause-panel"><p class="eyebrow">Paused</p><h1>The grove can wait.</h1><p>' + escapeHtml(ritual.title) + ' is paused. Nothing is lost, and nothing needs to be finished.</p><div class="ritual-control-row"><button class="primary" data-action="resume-ritual">Resume</button><button class="ghost" data-action="skip-ritual">Skip</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div></section></section>';
  }

  function renderRitualFallback() {
    var choices = visibleGardenObjects().slice(0, 3);
    var picked = state.ritualSession.fallbackObjects || [];
    return '<section class="single-room-layout"><section class="content-panel ritual-fallback-panel"><p class="eyebrow">Return softly</p><h1>Let us return to the garden.</h1><p>Look around the garden. Choose three things you can see. Nothing needs to be solved right now.</p><div class="ritual-choice-grid">' + choices.map(function (object) { var active = picked.indexOf(object.id) !== -1; return '<button class="ritual-chip ' + (active ? 'selected' : '') + '" data-action="ritual-fallback-object" data-id="' + escapeHtml(object.id) + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + escapeHtml(object.name) + '</button>'; }).join("") + '</div><div class="ritual-control-row"><button class="primary" data-action="nav" data-screen="garden">Return to Garden</button></div></section></section>';
  }

  function renderRitualReflection() {
    var ritual = ritualById(state.ritualSession.ritualId) || ritualRegistry[0];
    return '<section class="ritual-runner-layout"><aside class="side-panel ritual-context"><p class="eyebrow">Reflection</p><h2>' + escapeHtml(ritual.title) + '</h2><p>This note is optional and private by default.</p><div class="ritual-prompt-list">' + ritual.reflectionPrompts.map(function (prompt) { return '<span>' + escapeHtml(prompt) + '</span>'; }).join("") + '</div></aside><section class="content-panel ritual-reflection-panel"><p class="eyebrow">Private Note</p><h1>Would you like to save a private note?</h1><p>You can save a word, a sentence, or leave the page empty.</p><div class="field wide"><label for="ritual-private-note">Private note</label><textarea id="ritual-private-note" data-ritual-note="true" placeholder="What is here now?">' + escapeHtml(state.ritualSession.note || "") + '</textarea></div><div class="ritual-control-row"><button class="primary" data-action="save-ritual-private">Save privately</button><button class="ghost" data-action="skip-ritual-save">Skip saving</button><button class="ghost" data-action="nav" data-screen="garden">Return to Garden</button></div></section></section>';
  }

  function ritualLogPayload(ritual) {
    var answers = state.ritualSession.answers || {};
    var selectedSensations = [];
    Object.keys(answers).forEach(function (key) {
      if (Array.isArray(answers[key].values)) selectedSensations = selectedSensations.concat(answers[key].values);
    });
    var bodyAnswer = answers["body-area"] || {};
    return {
      id: createLocalId("ritual"),
      ritualId: ritual.id,
      createdAt: new Date().toISOString(),
      selectedSensations: selectedSensations.filter(Boolean),
      selectedBodyArea: bodyAnswer.value || "",
      note: state.ritualSession.note || "",
      answers: JSON.parse(JSON.stringify(answers)),
      private: true
    };
  }

  function maybeSaveGardenResource(ritual) {
    if (ritual.id !== "resource-grove") return;
    var answers = state.ritualSession.answers || {};
    var name = answers.name && answers.name.text ? answers.name.text.trim() : "";
    if (!name) return;
    state.gardenResources.push(normalizeGardenResource({
      id: createLocalId("resource"),
      createdAt: new Date().toISOString(),
      name: name,
      category: answers.category && answers.category.value ? answers.category.value : "other",
      symbol: answers.symbol && answers.symbol.value ? answers.symbol.value : "tree",
      note: state.ritualSession.note || "",
      private: true
    }));
  }

  function applyGardenReward(reward) {
    if (!reward) return;
    state.activeGardenReward = { type: reward.type, intensity: reward.intensity, message: reward.message, createdAt: new Date().toISOString() };
    if (reward.type === "dew") state.dewdrops = (state.dewdrops || 0) + 1;
    if (!state.garden) state.garden = [];
    state.garden.push(reward.message);
  }

  function completeRitual(saveNote) {
    ensureRitualState();
    var ritual = ritualById(state.ritualSession.ritualId);
    if (!ritual) { state.ritualSession = createRitualSession(); state.screen = "garden"; saveState(); render(); return; }
    if (saveNote) state.ritualLogs.push(normalizeRitualLog(ritualLogPayload(ritual)));
    maybeSaveGardenResource(ritual);
    applyGardenReward(ritual.reward);
    markFirstDayPathVisit("tending-grove");
    addGardenFeedback("ritual", ritual.title + " leaves the grove a little softer.", "tending-grove");
    state.ritualSession = createRitualSession();
    state.screen = "garden";
    saveState();
    render();
  }

  function renderGardenRewardBanner() {
    var reward = state.activeGardenReward;
    if (!reward) return '';
    return '<div class="garden-reward-banner reward-' + escapeHtml(slug(reward.type)) + '"><span>' + escapeHtml(reward.type) + '</span><strong>' + escapeHtml(reward.message) + '</strong><button class="ghost" data-action="dismiss-garden-reward">Let it rest</button></div>';
  }

  function renderMoon() {
    var chart = activeChart();
    var card = currentCard();
    var hadDailyReading = hasCurrentDailyAstrologyReading(chart);
    var dailyReading = ensureDailyAstrologyReading(chart);
    if (!hadDailyReading) {
      markFirstDayPathVisit("observatory");
      addGardenFeedback("sky", "The Observatory catches today's sky: " + dailyReading.focus + ".", "observatory");
      saveState();
    }
    var content = '<div class="astrology-layout">' +
      '<section class="content-panel astrology-intro"><p class="eyebrow">Astrology + Readings</p><h1>Sky readings</h1><p>Your signs are used as cozy game language, not a calculation engine. They shape fairy style, garden mood, and how today&#39;s tarot card is read in the observatory.</p><div class="privacy-note">Local-first. No birth date, time, or place is required.</div></section>' +
      renderGardenAlmanac() +
      renderDailyAstrologyReadingPanel(dailyReading, card) +
      renderAstrologyDefinitions(chart) +
      renderAstrologyReadingPanel(chart, card) +
      '<section class="content-panel wide-panel">' + renderAstrologyTarotBridge(card) + '</section>' +
    '</div>';
    return renderShell(content, "moon");
  }

  function render() {
    if (!state.player && state.screen !== "intro" && state.screen !== "gardenIntro" && state.screen !== "creation") state.screen = "intro";
    if (state.player && !state.hasSeenGardenIntro && state.screen !== "gardenIntro" && state.screen !== "creation") state.screen = "gardenIntro";
    if (state.player && !state.hasChosenGardenObjects && state.screen !== "gardenSetup" && state.screen !== "creation" && state.screen !== "gardenIntro") state.screen = "gardenSetup";
    if (state.screen === "intro") app.innerHTML = renderIntro();
    else if (state.screen === "gardenIntro") app.innerHTML = renderGardenIntroScene();
    else if (state.screen === "creation") app.innerHTML = renderCreation();
    else if (state.screen === "gardenSetup") app.innerHTML = renderGardenSetup();
    else if (state.screen === "settings") app.innerHTML = renderGardenSettings();
    else if (state.screen === "me") { state.screen = "garden"; app.innerHTML = renderGarden(); }
    else if (state.screen === "tea") app.innerHTML = renderTea();
    else if (state.screen === "shop") { state.screen = "garden"; app.innerHTML = renderGarden(); }
    else if (state.screen === "book" || state.screen === "codex") { state.screen = "garden"; app.innerHTML = renderGarden(); }
    else if (state.screen === "private") app.innerHTML = renderPrivatePages();
    else if (state.screen === "gardenRituals") app.innerHTML = renderGardenRituals();
    else if (state.screen === "daySummary") app.innerHTML = renderDaySummaryRoom();
    else if (state.screen === "deck") { state.screen = "garden"; app.innerHTML = renderGarden(); }
    else if (state.screen === "garden") app.innerHTML = renderGarden();
    else if (state.screen === "ritual") app.innerHTML = renderDailyRitualRoom();
    else if (state.screen === "rooting") app.innerHTML = renderRootingRoom();
    else if (state.screen === "moon") app.innerHTML = renderMoon();
    else app.innerHTML = renderGarden();
    updateDrawCountdowns();
  }

  function updateDraftFromInputs() {
    var fields = app.querySelectorAll("[data-field]");
    fields.forEach(function (field) {
      if (field.dataset.field && Object.prototype.hasOwnProperty.call(state.draft, field.dataset.field)) {
        state.draft[field.dataset.field] = field.value;
      }
    });
    syncDraftChartFromMode();
  }

  function handleDeckControl(event, renderAfter) {
    var target = event.target;
    if (target.dataset.deckImage) {
      loadImageIntoDeck(target.files && target.files[0]);
      return true;
    }
    if (target.dataset.deckChoice) {
      state.deckChoice = target.value === "custom" ? "custom" : "garden";
      if (state.deckChoice === "custom") {
        var studioCard = currentCard() || (state.deckStudio && getCard(state.deckStudio.cardId)) || tarotCards[0];
        setDeckStudioCard(studioCard.id, true);
      }
      saveState();
      render();
      return true;
    }
    if (target.dataset.deckLayerSelect) {
      if (!state.deckStudio) state.deckStudio = createDeckStudioDraft();
      state.deckStudio.selectedLayerId = target.value;
      normalizeDeckStudio(state.deckStudio);
      saveState();
      render();
      return true;
    }
    var deckLayerField = target.dataset.deckLayerField;
    if (deckLayerField) {
      updateSelectedDeckLayerField(deckLayerField, target.value);
      saveState();
      if (renderAfter || target.type === "range") render();
      return true;
    }
    var deckField = target.dataset.deckField;
    if (deckField) {
      if (!state.deckStudio) state.deckStudio = createDeckStudioDraft();
      if (deckField === "cardId") setDeckStudioCard(target.value, true);
      else state.deckStudio[deckField] = ["x", "y", "scale", "rotate", "crop"].indexOf(deckField) !== -1 ? Number(target.value) : target.value;
      normalizeDeckStudio(state.deckStudio);
      saveState();
      if (renderAfter || target.type === "range" || deckField === "cardId" || deckField === "template" || deckField === "border") render();
      return true;
    }
    return false;
  }

  function handleLockControl(event, renderAfter) {
    var lockField = event.target.dataset.lockField;
    if (!lockField) return false;
    lockDraft[lockField] = event.target.value;
    if (renderAfter && lockField === "setupMode") render();
    return true;
  }

  function handlePrivateControl(event, renderAfter) {
    var privateField = event.target.dataset.privateField;
    if (privateField) {
      if (!state.privateDraft) state.privateDraft = createPrivateDraft();
      state.privateDraft[privateField] = event.target.value;
      normalizePrivateDraft(state.privateDraft);
      saveState();
      if (renderAfter) render();
      return true;
    }
    var cycleNote = event.target.dataset.privateCycleNote;
    if (cycleNote) {
      if (!state.privateDraft) state.privateDraft = createPrivateDraft();
      var cycleSignals = state.privateDraft.cycleSignals || [];
      if (event.target.checked && cycleSignals.indexOf(cycleNote) === -1) cycleSignals.push(cycleNote);
      if (!event.target.checked) cycleSignals = cycleSignals.filter(function (signal) { return signal !== cycleNote; });
      state.privateDraft.cycleSignals = cycleSignals;
      saveState();
      if (renderAfter) render();
      return true;
    }
    var bodyNotice = event.target.dataset.privateBodySnapshot;
    if (bodyNotice) {
      if (!state.privateDraft) state.privateDraft = createPrivateDraft();
      var bodySnapshot = state.privateDraft.bodySnapshot || [];
      if (event.target.checked && bodySnapshot.indexOf(bodyNotice) === -1) bodySnapshot.push(bodyNotice);
      if (!event.target.checked) bodySnapshot = bodySnapshot.filter(function (notice) { return notice !== bodyNotice; });
      state.privateDraft.bodySnapshot = bodySnapshot;
      saveState();
      if (renderAfter) render();
      return true;
    }
    var promise = event.target.dataset.privatePromise;
    if (promise) {
      if (!state.privateDraft) state.privateDraft = createPrivateDraft();
      var promises = state.privateDraft.smallPromises || [];
      if (event.target.checked && promises.indexOf(promise) === -1) promises.push(promise);
      if (!event.target.checked) promises = promises.filter(function (item) { return item !== promise; });
      state.privateDraft.smallPromises = promises;
      saveState();
      if (renderAfter) render();
      return true;
    }
    return false;
  }


  function handleRitualControl(event, renderAfter) {
    var target = event.target;
    if (target.dataset.ritualNote) {
      ensureRitualState();
      state.ritualSession.note = target.value;
      saveState();
      return true;
    }
    var textStep = target.dataset.ritualText;
    if (textStep) {
      ensureRitualState();
      ritualAnswer(textStep).text = target.value;
      saveState();
      return true;
    }
    var mapStep = target.dataset.ritualMapLabel;
    if (mapStep) {
      ensureRitualState();
      ritualAnswer(mapStep).label = target.value;
      saveState();
      return true;
    }
    return false;
  }


  app.addEventListener("input", function (event) {
    if (handleDeckControl(event, false)) return;
    if (handleLockControl(event, false)) return;
    if (handlePrivateControl(event, false)) return;
    if (handleRitualControl(event, false)) return;
    var field = event.target.dataset.field;
    if (!field) return;
    state.draft[field] = event.target.value;
    if (field === "name") {
      var nameplate = app.querySelector(".nameplate");
      if (nameplate) nameplate.textContent = state.draft.name || "A fairy not yet named";
    }
    saveState();
  });

  app.addEventListener("change", function (event) {
    if (handleDeckControl(event, true)) return;
    if (handleLockControl(event, true)) return;
    if (handlePrivateControl(event, true)) return;
    if (handleRitualControl(event, true)) return;
    var field = event.target.dataset.field;
    if (!field) return;
    state.draft[field] = event.target.value;
    if (["mode", "sunSign", "moonSign", "risingSign"].indexOf(field) !== -1) {
      syncDraftChartFromMode();
    }
    saveState();
    render();
  });

  app.addEventListener("pointerdown", function (event) {
    var holdButton = event.target.closest('[data-root-hold]');
    if (holdButton) startRootingHold(holdButton);
  });

  app.addEventListener("pointerup", cancelRootingHold);
  app.addEventListener("pointerleave", cancelRootingHold);
  app.addEventListener("pointercancel", cancelRootingHold);

  app.addEventListener("keydown", function (event) {
    var holdButton = event.target.closest('[data-root-hold]');
    if (!holdButton || (event.key !== " " && event.key !== "Enter") || event.repeat) return;
    event.preventDefault();
    startRootingHold(holdButton);
  });

  app.addEventListener("keyup", function (event) {
    if (event.target.closest('[data-root-hold]') && (event.key === " " || event.key === "Enter")) {
      event.preventDefault();
      cancelRootingHold();
    }
  });

  app.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    var action = button.dataset.action;
    if (!action) return;

    if (action === "next-intro") {
      if (state.introStep < introScenes.length - 1) state.introStep += 1;
      else state.screen = "gardenIntro";
    }

    if (action === "skip-opening-intro") {
      state.introStep = introScenes.length - 1;
      state.screen = "gardenIntro";
      saveState();
      render();
      return;
    }

    if (action === "set-draft") {
      state.draft[button.dataset.field] = button.dataset.value;
    }

    if (action === "randomize-fairy") {
      randomizeFairyDraft();
      saveState();
      render();
      return;
    }

    if (action === "refresh-chart") {
      updateDraftFromInputs();
      if (state.draft.mode === "fairy_fate") setDraftChart(makeFairyFateChart(String(Date.now())));
      else syncDraftChartFromMode();
      applyChartSuggestion();
    }

    if (action === "apply-stars") {
      updateDraftFromInputs();
      syncDraftChartFromMode();
      applyChartSuggestion();
    }

    if (action === "finish-creation") {
      var firstCreation = !state.player;
      updateDraftFromInputs();
      if (!state.draft.name.trim()) state.draft.name = "Little Fern";
      syncDraftChartFromMode();
      state.player = {
        name: state.draft.name.trim(),
        mode: state.draft.mode,
        chart: state.draft.chart,
        fairy: {
          skinTone: state.draft.skinTone,
          hairStyle: state.draft.hairStyle,
          hairColor: state.draft.hairColor,
          wings: state.draft.wings,
          outfit: state.draft.outfit,
          accessory: state.draft.accessory
        }
      };
      state.garden.push(signStyles[state.player.chart.sun].garden);
      state.today = null;
      state.gardenSettled = false;
      if (firstCreation) {
        state.hasChosenGardenObjects = false;
        state.enabledGardenObjects = normalizeEnabledGardenObjects(state.enabledGardenObjects || defaultStarterGardenObjects(), false);
        state.screen = "gardenSetup";
      } else {
        state.screen = state.hasSeenGardenIntro ? "garden" : "gardenIntro";
      }
      saveState();
      render();
      return;
    }

    if (action === "nav") {
      cancelRootingHold();
      var target = button.dataset.screen;
      if (target === "tea" && !state.today && canBeginFreshDailyRitual()) { startNewDay("tea"); return; }
      if (target === "garden" && state.screen === "gardenRituals") state.ritualSession = createRitualSession();
      state.roomTransitionId = "";
      state.screen = target;
    }

    if (action === "toggle-setup-garden-object" || action === "toggle-settings-garden-object") {
      ensureGardenObjectStateShape();
      var objectId = button.dataset.id;
      if (gardenObjectById(objectId)) {
        var wasEnabled = state.enabledGardenObjects[objectId] === true;
        state.enabledGardenObjects[objectId] = !wasEnabled;
        if (!wasEnabled) noteGardenObjectArrival(objectId);
        else noteGardenObjectRest(objectId);
        if (!state.enabledGardenObjects[objectId] && state.activeGardenObjectId === objectId) state.activeGardenObjectId = "";
        if (!state.enabledGardenObjects[objectId] && state.selectedGardenObjectId === objectId) state.selectedGardenObjectId = firstEnabledGardenObject().id;
      }
      saveState();
      render();
      return;
    }

    if (action === "complete-garden-setup") {
      ensureGardenObjectStateShape();
      if (enabledGardenObjectCount() < 1) return;
      state.hasChosenGardenObjects = true;
      state.recentObjectArrival = normalizeGardenObjectArrival({
        id: createLocalId("arrival"),
        objectId: "garden",
        name: "Your sanctuary",
        line: "The chosen places settle into a circle small enough to step inside.",
        createdAt: new Date().toISOString()
      });
      addGardenFeedback("arrival", state.recentObjectArrival.line, "garden");
      state.screen = state.hasSeenGardenIntro ? "garden" : "gardenIntro";
      saveState();
      render();
      return;
    }

    if (action === "settings-place-garden") {
      ensureGardenSceneSave();
      state.gardenPlacementMode = true;
      state.selectedGardenObjectId = firstEnabledGardenObject().id;
      state.screen = "garden";
      saveState();
      render();
      return;
    }

    if (action === "toggle-garden-placement") {
      ensureGardenSceneSave();
      state.gardenPlacementMode = !state.gardenPlacementMode;
      if (state.gardenPlacementMode && !gardenObjectById(state.selectedGardenObjectId)) state.selectedGardenObjectId = gardenObjectCatalog[0].id;
      saveState();
      render();
      return;
    }

    if (action === "select-garden-object") {
      selectGardenObject(button.dataset.id);
      return;
    }

    if (action === "place-garden-object") {
      placeSelectedGardenObject(button.dataset.x, button.dataset.y);
      return;
    }

    if (action === "reset-garden-objects") {
      state.gardenObjectPositions = defaultGardenObjectPositions();
      state.activeGardenObjectId = state.selectedGardenObjectId || firstEnabledGardenObject().id;
      saveState();
      render();
      return;
    }

    if (action === "open-garden-object") {
      beginGardenDoorway(button.dataset.id);
      return;
    }

    if (action === "first-day-next") {
      var nextObjectId = button.dataset.id;
      if (nextObjectId && gardenObjectById(nextObjectId)) beginGardenDoorway(nextObjectId);
      else {
        markFirstDayPathVisit("garden");
        saveState();
        render();
      }
      return;
    }

    if (action === "dismiss-first-day-path") {
      state.firstDayPath = normalizeFirstDayPath(state.firstDayPath || {});
      state.firstDayPath.dismissed = true;
      addGardenFeedback("garden", "The first-day path rests. The garden remains open for wandering.", "garden");
      saveState();
      render();
      return;
    }

    if (action === "gather-day-lesson") {
      markFirstDayPathVisit("memory-tree");
      gatherTodayLesson();
      return;
    }

    if (action === "export-local-save") { exportLocalSave(); return; }
    if (action === "copy-local-save") { copyLocalSave(); return; }
    if (action === "erase-local-save") {
      if (window.confirm("Forget this local garden in this browser? This deletes the local save here, including private writing stored in it.")) {
        localStorage.removeItem(STORE_KEY);
        state = defaultState();
        render();
      }
      return;
    }


    if (action === "choose-ritual") {
      ensureRitualState();
      var ritual = ritualById(button.dataset.id);
      if (!ritual) return;
      state.ritualSession = { mode: "consent", ritualId: ritual.id, stepIndex: 0, answers: {}, note: "", fallbackObjects: [] };
      state.screen = "gardenRituals";
      saveState();
      render();
      return;
    }
    if (action === "begin-ritual") {
      ensureRitualState();
      var begunRitual = ritualById(state.ritualSession.ritualId);
      state.ritualSession.mode = "runner";
      state.ritualSession.stepIndex = begunRitual && begunRitual.steps[0] && begunRitual.steps[0].type === "intro" ? 1 : 0;
      saveState();
      render();
      return;
    }
    if (action === "skip-ritual") {
      state.ritualSession = createRitualSession();
      state.screen = "gardenRituals";
      saveState();
      render();
      return;
    }
    if (action === "pause-ritual") {
      ensureRitualState();
      state.ritualSession.mode = "paused";
      saveState();
      render();
      return;
    }
    if (action === "resume-ritual") {
      ensureRitualState();
      var resumedRitual = ritualById(state.ritualSession.ritualId);
      state.ritualSession.mode = resumedRitual && resumedRitual.steps[0] && resumedRitual.steps[0].type !== "intro" ? "runner" : (state.ritualSession.stepIndex > 0 ? "runner" : "consent");
      saveState();
      render();
      return;
    }
    if (action === "ritual-next" || action === "ritual-skip-step") {
      ensureRitualState();
      var activeRitual = ritualById(state.ritualSession.ritualId);
      if (!activeRitual) return;
      if (action === "ritual-skip-step") {
        var activeStep = activeRitual.steps[state.ritualSession.stepIndex];
        if (activeStep) ritualAnswer(activeStep.id).skipped = true;
      }
      if (state.ritualSession.stepIndex >= activeRitual.steps.length - 1) state.ritualSession.mode = "reflection";
      else state.ritualSession.stepIndex += 1;
      saveState();
      render();
      return;
    }
    if (action === "ritual-back") {
      ensureRitualState();
      if (state.ritualSession.stepIndex <= 1) state.ritualSession.mode = "consent";
      else state.ritualSession.stepIndex -= 1;
      saveState();
      render();
      return;
    }
    if (action === "ritual-choice") {
      ensureRitualState();
      var stepId = button.dataset.step;
      var value = button.dataset.value;
      var multi = button.dataset.multi === "true";
      var answer = ritualAnswer(stepId);
      if (multi) {
        var values = Array.isArray(answer.values) ? answer.values.slice() : [];
        var index = values.indexOf(value);
        if (index !== -1) values.splice(index, 1);
        else if (values.length < 3) values.push(value);
        answer.values = values;
      } else {
        answer.value = answer.value === value ? "" : value;
      }
      saveState();
      render();
      return;
    }
    if (action === "ritual-garden-action") {
      ensureRitualState();
      ritualAnswer(button.dataset.step).done = true;
      saveState();
      render();
      return;
    }
    if (action === "ritual-zone") {
      ensureRitualState();
      ritualAnswer(button.dataset.step).zone = button.dataset.zone;
      saveState();
      render();
      return;
    }
    if (action === "ritual-uncomfortable") {
      ensureRitualState();
      state.ritualSession.mode = "fallback";
      state.ritualSession.fallbackObjects = [];
      saveState();
      render();
      return;
    }
    if (action === "ritual-fallback-object") {
      ensureRitualState();
      var picked = state.ritualSession.fallbackObjects || [];
      var pickedIndex = picked.indexOf(button.dataset.id);
      if (pickedIndex !== -1) picked.splice(pickedIndex, 1);
      else if (picked.length < 3) picked.push(button.dataset.id);
      state.ritualSession.fallbackObjects = picked;
      saveState();
      render();
      return;
    }
    if (action === "save-ritual-private") { completeRitual(true); return; }
    if (action === "skip-ritual-save") { completeRitual(false); return; }
    if (action === "delete-ritual-log") {
      ensureRitualState();
      state.ritualLogs = state.ritualLogs.filter(function (entry) { return entry.id !== button.dataset.id; });
      saveState();
      render();
      return;
    }
    if (action === "dismiss-garden-reward") {
      state.activeGardenReward = null;
      saveState();
      render();
      return;
    }

    if (action === "advance-garden-intro") { advanceGardenIntro(); return; }
    if (action === "skip-garden-intro") { completeGardenIntro(); return; }
    if (action === "replay-opening-intro") { state.introStep = 0; state.screen = "intro"; saveState(); render(); return; }
    if (action === "replay-garden-intro") { replayGardenIntro(); return; }
    if (action === "begin-tarot-draw") { beginTarotDraw(); return; }
    if (action === "complete-tarot-draw") { completeTarotDraw(); return; }
    if (action === "shuffle-spell") { shuffleDailySpell(); return; }
    if (action === "complete-spell") { completeDailySpell(); return; }
    if (action === "pull-card") pullCard();
    if (action === "begin-daily-ritual") { routeDailyRitual(); return; }
    if (action === "light-lantern-path") { lightLanternPath(); return; }
    if (action === "gather-ingredient") { harvestIngredient(button.dataset.id); return; }
    if (action === "tend-ingredient") { tendIngredient(button.dataset.id, button.dataset.tend); return; }
    if (action === "select-ingredient") { toggleCauldronIngredient(button.dataset.id); return; }
    if (action === "clear-cauldron") { clearCauldron(); return; }
    if (action === "brew-selected") { brewSelectedIngredients(); return; }
    if (action === "brew") { brewPotion(button.dataset.id); return; }
    if (action === "talk-card") { talkToCard(button.dataset.tone); return; }
    if (action === "serve") servePotion(Number(button.dataset.index));
    if (action === "finish-day") { finishDay(); return; }
    if (action === "new-day") { if (canDrawDailyCard()) { state.today = null; state.gardenSettled = false; state.screen = "garden"; } else { state.screen = "garden"; } saveState(); render(); return; }
    if (action === "save-custom-card") { saveCustomCard(); return; }
    if (action === "load-saved-card") { setDeckStudioCard(state.deckStudio ? state.deckStudio.cardId : tarotCards[0].id, true); saveState(); render(); return; }
    if (action === "clear-card-art") { if (!state.deckStudio) state.deckStudio = createDeckStudioDraft(); state.deckStudio.layers = []; state.deckStudio.selectedLayerId = ""; state.deckStudio.imageData = ""; saveState(); render(); return; }
    if (action === "remove-card-design") { var removeId = state.deckStudio ? state.deckStudio.cardId : tarotCards[0].id; if (state.customDeck) delete state.customDeck[removeId]; setDeckStudioCard(removeId, false); saveState(); render(); return; }
    if (action === "edit-card-design") { state.deckChoice = "custom"; setDeckStudioCard(button.dataset.id, true); state.screen = "tea"; saveState(); render(); return; }
    if (action === "select-layer") { if (!state.deckStudio) state.deckStudio = createDeckStudioDraft(); state.deckStudio.selectedLayerId = button.dataset.id; normalizeDeckStudio(state.deckStudio); saveState(); render(); return; }
    if (action === "remove-image-layer") { removeSelectedDeckLayer(); saveState(); render(); return; }
    if (action === "bring-layer-forward") { moveSelectedDeckLayer(1); saveState(); render(); return; }
    if (action === "send-layer-backward") { moveSelectedDeckLayer(-1); saveState(); render(); return; }
    if (action === "step-back") { stepBackToGarden(); return; }
    if (action === "start-rooting-ritual") { if (!state.rootingRitual) state.rootingRitual = { active: false }; state.rootingRitual.active = true; saveState(); render(); return; }
    if (action === "enable-cycle-notes") { state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings()); state.privateSettings.cycleNotesEnabled = true; saveState(); render(); return; }
    if (action === "disable-cycle-notes") { state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings()); state.privateSettings.cycleNotesEnabled = false; if (state.privateDraft) { state.privateDraft.cycleSignals = []; state.privateDraft.cycleNotes = ""; state.privateDraft.sleepQuality = "Not noting"; } saveState(); render(); return; }
    if (action === "journal-view") {
      if (state.screen === "private" && state.journalView === "new") updatePrivateDraftFromInputs();
      state.journalView = ["menu", "new", "archive"].indexOf(button.dataset.view) !== -1 ? button.dataset.view : "menu";
      if (state.journalView === "new") {
        if (["mood", "body", "intentions", "cycle", "writing", "notes"].indexOf(state.journalSection) === -1) state.journalSection = "mood";
        prepareTodayPrivateDraft();
      }
      saveState();
      render();
      return;
    }
    if (action === "journal-section") {
      updatePrivateDraftFromInputs();
      state.journalSection = ["mood", "body", "intentions", "cycle", "writing", "notes"].indexOf(button.dataset.section) !== -1 ? button.dataset.section : "mood";
      saveState();
      render();
      return;
    }
    if (action === "view-private-entry") {
      state.selectedPrivateEntryId = button.dataset.id || "";
      state.journalView = "archive";
      saveState();
      render();
      return;
    }
    if (action === "save-garden-lock") { saveGardenLock(); return; }
    if (action === "unlock-garden") { unlockGarden(); return; }
    if (action === "close-garden-lock") { gardenLockSessionUnlocked = false; render(); return; }
    if (action === "save-private-page") { savePrivatePage(); return; }
    if (action === "clear-private-page") { state.privateDraft = createPrivateDraft(); state.journalView = "new"; saveState(); render(); return; }
    if (action === "remove-latest-private-page") {
      if (state.privateEntries && state.privateEntries.length) {
        var removedPrivateEntry = state.privateEntries.pop();
        if (removedPrivateEntry && removedPrivateEntry.id === state.selectedPrivateEntryId) state.selectedPrivateEntryId = "";
      }
      state.journalView = "archive";
      saveState();
      render();
      return;
    }
    if (action === "load-private-entry") {
      var privateEntry = (state.privateEntries || []).find(function (entry) { return entry.id === button.dataset.id; });
      if (privateEntry) {
        state.privateDraft = privateDraftFromEntry(privateEntry);
        if (privateEntry.cycleNotesEnabled) {
          state.privateSettings = normalizePrivateSettings(state.privateSettings || createPrivateSettings());
          state.privateSettings.cycleNotesEnabled = true;
        }
        saveState();
        render();
        return;
      }
    }
    if (action === "select-entry") state.selectedEntry = Number(button.dataset.index);
    if (action === "reset-save") {
      if (window.confirm("Let this garden sleep and begin again?")) {
        localStorage.removeItem(STORE_KEY);
        state = defaultState();
      }
    }

    saveState();
    render();
  });

  render();
  window.setInterval(updateDrawCountdowns, 1000);
})();
