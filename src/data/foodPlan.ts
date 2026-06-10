import {FoodPlanDay} from '../types';

/**
 * A gentle 30-day guide to introducing solids from ~6 months.
 * Always introduce one new food at a time, watch for reactions, and continue
 * milk feeds. General guidance only — follow your doctor's advice.
 */
export const FOOD_PLAN: FoodPlanDay[] = [
  // Week 1 — first single-ingredient purees (6 months)
  {day: 1, ageMonths: 6, title: 'Iron-fortified baby rice', ingredients: ['Baby rice cereal', 'Breast milk or formula'], instructions: 'Mix 1–2 tsp of cereal with milk to a thin, smooth consistency. Offer a small amount on a soft spoon once a day.'},
  {day: 2, ageMonths: 6, title: 'Mashed banana', ingredients: ['½ ripe banana'], instructions: 'Mash until completely smooth. Add a little milk to loosen if needed. Offer 1–2 tsp.'},
  {day: 3, ageMonths: 6, title: 'Pureed sweet potato', ingredients: ['1 small sweet potato'], instructions: 'Steam until very soft, blend smooth, and cool to lukewarm. Offer 1–2 tsp.'},
  {day: 4, ageMonths: 6, title: 'Pureed avocado', ingredients: ['¼ ripe avocado'], instructions: 'Mash or blend until creamy. No cooking needed. A great source of healthy fats.'},
  {day: 5, ageMonths: 6, title: 'Pureed carrot', ingredients: ['1 medium carrot'], instructions: 'Steam until soft, blend with a little cooled boiled water to a smooth puree.'},
  {day: 6, ageMonths: 6, title: 'Pureed apple', ingredients: ['1 apple'], instructions: 'Peel, core, and steam until soft. Blend smooth. Naturally sweet and gentle.'},
  {day: 7, ageMonths: 6, title: 'Pureed pear', ingredients: ['1 ripe pear'], instructions: 'Peel and steam (or use very ripe pear raw), then blend smooth.'},

  // Week 2 — new vegetables + simple two-food combos (6–7 months)
  {day: 8, ageMonths: 6, title: 'Butternut squash puree', ingredients: ['Butternut squash'], instructions: 'Roast or steam until soft, then blend smooth. Naturally sweet and creamy.'},
  {day: 9, ageMonths: 6, title: 'Pea puree', ingredients: ['Frozen or fresh peas'], instructions: 'Steam until soft, blend, and pass through a sieve for a smoother texture.'},
  {day: 10, ageMonths: 6, title: 'Apple + cinnamon', ingredients: ['Apple', 'Pinch of cinnamon'], instructions: 'Steam apple, blend with the tiniest pinch of cinnamon to introduce gentle flavour.'},
  {day: 11, ageMonths: 6, title: 'Sweet potato + carrot', ingredients: ['Sweet potato', 'Carrot'], instructions: 'Steam both, blend together. Combining familiar foods builds variety.'},
  {day: 12, ageMonths: 6, title: 'Oat porridge', ingredients: ['Fine oats', 'Breast milk or formula'], instructions: 'Cook oats with milk until soft, then blend or mash to a smooth porridge.'},
  {day: 13, ageMonths: 6, title: 'Banana + avocado', ingredients: ['Banana', 'Avocado'], instructions: 'Mash together until smooth — no cooking needed. Creamy and energy-rich.'},
  {day: 14, ageMonths: 6, title: 'Green bean puree', ingredients: ['Green beans'], instructions: 'Steam until very soft, blend, and sieve if needed for smoothness.'},

  // Week 3 — thicker textures + first proteins (7–8 months)
  {day: 15, ageMonths: 7, title: 'Thicker veg mash', ingredients: ['Mixed root vegetables'], instructions: 'Steam and mash (rather than blend) for a lumpier texture as your baby adjusts to chewing.'},
  {day: 16, ageMonths: 7, title: 'Red lentil dahl (mild)', ingredients: ['Red lentils', 'Carrot', 'Mild spices'], instructions: 'Simmer lentils and carrot until soft with a pinch of mild spice. Mash to desired texture.'},
  {day: 17, ageMonths: 7, title: 'Mashed cooked egg', ingredients: ['1 well-cooked egg'], instructions: 'Hard-cook the egg fully, mash with a little milk. Introduces a common allergen early.'},
  {day: 18, ageMonths: 7, title: 'Chicken + sweet potato', ingredients: ['Cooked chicken', 'Sweet potato'], instructions: 'Cook chicken thoroughly, blend with sweet potato and a little water to a soft puree.'},
  {day: 19, ageMonths: 7, title: 'Greek yogurt + fruit', ingredients: ['Plain full-fat yogurt', 'Soft fruit'], instructions: 'Stir mashed soft fruit into plain unsweetened yogurt. Skip added sugar.'},
  {day: 20, ageMonths: 7, title: 'Broccoli + potato mash', ingredients: ['Broccoli', 'Potato'], instructions: 'Steam both, mash together. A little texture helps develop chewing skills.'},
  {day: 21, ageMonths: 7, title: 'Smooth peanut butter porridge', ingredients: ['Oats', 'Smooth peanut butter', 'Milk'], instructions: 'Stir a small amount of smooth peanut butter into warm oat porridge to introduce another allergen.'},

  // Week 4 — finger foods + family-style textures (8+ months)
  {day: 22, ageMonths: 8, title: 'Soft steamed veg sticks', ingredients: ['Carrot or courgette sticks'], instructions: 'Steam finger-length sticks until very soft. Let your baby self-feed under supervision.'},
  {day: 23, ageMonths: 8, title: 'Banana pancake fingers', ingredients: ['Banana', 'Egg', 'Oats'], instructions: 'Blend, cook as small pancakes, cut into strips for easy grabbing.'},
  {day: 24, ageMonths: 8, title: 'Soft scrambled egg', ingredients: ['1 egg'], instructions: 'Scramble fully but keep soft. Break into small pieces for self-feeding.'},
  {day: 25, ageMonths: 8, title: 'Mashed beans on toast fingers', ingredients: ['Soft cooked beans', 'Toast'], instructions: 'Mash beans, spread on toast strips. Soft, easy to hold, and protein-rich.'},
  {day: 26, ageMonths: 8, title: 'Fish + potato mash', ingredients: ['Boneless white fish', 'Potato'], instructions: 'Cook fish thoroughly, check carefully for bones, and mash with potato.'},
  {day: 27, ageMonths: 8, title: 'Soft pasta pieces', ingredients: ['Small pasta', 'Tomato or veg sauce'], instructions: 'Cook pasta until very soft, toss with a smooth mild sauce. Great for practising the pincer grasp.'},
  {day: 28, ageMonths: 8, title: 'Cheesy veg risotto', ingredients: ['Rice', 'Soft veg', 'Grated cheese'], instructions: 'Cook rice soft, fold in mashed veg and a little cheese. Mash slightly if needed.'},
  {day: 29, ageMonths: 8, title: 'Fruit + yogurt bowl', ingredients: ['Soft fruit pieces', 'Plain yogurt'], instructions: 'Offer soft fruit pieces for self-feeding with a side of plain yogurt to scoop.'},
  {day: 30, ageMonths: 8, title: 'Mini family meal', ingredients: ['A soft portion of the family meal'], instructions: 'Offer a small, soft, low-salt portion of what the family is eating. Celebrate how far you have both come!'},
];
