import {FoodPlanDay} from '../types';

/** Sample 30-day solid food introduction plan (6+ months). */
export const FOOD_PLAN: FoodPlanDay[] = Array.from({length: 30}, (_, i) => {
  const day = i + 1;
  const samples = [
    {title: 'Single-grain rice cereal', ingredients: ['Rice cereal', 'Breast milk or formula']},
    {title: 'Mashed banana', ingredients: ['Ripe banana']},
    {title: 'Pureed sweet potato', ingredients: ['Sweet potato']},
    {title: 'Pureed avocado', ingredients: ['Ripe avocado']},
    {title: 'Pureed apple', ingredients: ['Apple']},
    {title: 'Pureed pear', ingredients: ['Pear']},
    {title: 'Pureed carrot', ingredients: ['Carrot']},
    {title: 'Oatmeal porridge', ingredients: ['Oats', 'Breast milk or formula']},
    {title: 'Pureed peas', ingredients: ['Green peas']},
    {title: 'Pureed butternut squash', ingredients: ['Butternut squash']},
  ];
  const s = samples[i % samples.length];
  return {
    day,
    title: s.title,
    ingredients: s.ingredients,
    instructions:
      'Steam until soft, blend to a smooth puree, and let cool to lukewarm. Offer 1–2 teaspoons and watch for any reaction. Introduce one new food at a time over 3 days.',
    ageMonths: 6,
  };
});
