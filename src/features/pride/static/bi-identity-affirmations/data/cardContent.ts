export type CardType = 'text' | 'scenarios' | 'myths' | 'breathe' | 'affirmations' | 'quote' | 'steps';

export interface CardData {
  eyebrow: string;
  title: string;
  type: CardType;
  color: 'pink' | 'purple' | 'blue';
  body?: string;
  affirmations?: string[];
  scenarios?: { trigger: string; response: string }[];
  myths?: { myth: string; truth: string }[];
  breatheSteps?: string[];
  quote?: { text: string; attribution: string };
  steps?: string[];
  buttonLabel?: string;
}

const colors: Array<'pink' | 'purple' | 'blue'> = ['pink', 'purple', 'blue'];

export const cards: CardData[] = [
  {
    eyebrow: 'Welcome',
    title: 'You Are Allowed to Ask This Question',
    type: 'affirmations',
    color: colors[0],
    body: 'Wondering whether you are really bisexual is one of the most common experiences bisexual people have. This activity is a space to explore that doubt gently, without pressure and without a test to pass.',
    affirmations: [
      'Questioning is not the same as being confused.',
      'You do not need certainty to have an identity.',
    ],
  },
  {
    eyebrow: 'The Doubt',
    title: "Where Does the 'Not Bi Enough' Voice Come From?",
    type: 'scenarios',
    color: colors[1],
    scenarios: [
      { trigger: 'You have only dated one gender', response: 'This says nothing about your orientation. Behaviour does not define identity.' },
      { trigger: 'Your attraction feels unequal', response: 'Bisexuality does not require a 50/50 split. There is no correct ratio.' },
      { trigger: 'You have never acted on it', response: 'Attraction does not require action to be real.' },
    ],
  },
  {
    eyebrow: 'The Myth',
    title: 'Bisexuality Is Not a Phase',
    type: 'myths',
    color: colors[2],
    myths: [
      { myth: 'You will pick a side eventually', truth: 'Bisexuality is a complete identity, not a transition.' },
      { myth: 'It is just experimentation', truth: 'Experimentation and identity can overlap — neither cancels the other.' },
      { myth: 'You are just seeking attention', truth: 'Bisexual people exist whether or not anyone is watching.' },
    ],
  },
  {
    eyebrow: 'Breathe',
    title: 'Let Go of the Audit',
    type: 'breathe',
    color: colors[0],
    breatheSteps: [
      'Breathe in — notice the voice asking if you qualify.',
      'Breathe out — that voice is the world\'s doubt, not yours.',
      'You are not required to prove your identity to anyone.',
      'The audit was never yours to run.',
    ],
  },
  {
    eyebrow: 'The Science',
    title: 'Bisexuality Is Well Documented',
    type: 'steps',
    color: colors[1],
    steps: [
      'Bisexuality is recognised by every major psychological body as a valid orientation.',
      'Research shows bisexual people exist in greater numbers than gay and lesbian people combined.',
      'The Kinsey scale (1948) showed human attraction exists on a spectrum — this is not new.',
    ],
  },
  {
    eyebrow: 'Your History',
    title: 'Your Feelings Have Always Been Real',
    type: 'affirmations',
    color: colors[2],
    affirmations: [
      'Every attraction you have felt was real, regardless of who it was for.',
      'You do not need a relationship to confirm what you already know.',
      'The feelings you dismissed or explained away — they counted.',
    ],
  },
  {
    eyebrow: 'Other Bi People',
    title: 'You Are Not the Only One Who Felt This',
    type: 'quote',
    color: colors[0],
    quote: {
      text: 'I spent two years telling myself I did not count as bisexual. Then I found a community of people who had all said the same thing. That was the moment I stopped arguing with myself.',
      attribution: 'Community member',
    },
  },
  {
    eyebrow: 'No Threshold',
    title: 'There Is No Minimum Requirement',
    type: 'steps',
    color: colors[1],
    steps: [
      'No minimum number of relationships needed.',
      'No required ratio of attraction.',
      'No gender you must have dated.',
      'No behaviour that confirms or denies it.',
      'If you identify as bisexual, that is enough.',
    ],
  },
  {
    eyebrow: 'Community',
    title: 'Bisexual Identity Has a Rich History',
    type: 'steps',
    color: colors[2],
    steps: [
      'Freddie Mercury, Virginia Woolf, James Baldwin — bisexual people have shaped culture for centuries.',
      'Bisexual activists were central to the founding of the modern LGBTQ+ rights movement.',
      'There are millions of bisexual people living fully and openly right now.',
    ],
  },
  {
    eyebrow: 'Carry This',
    title: 'You Are Bisexual If You Say You Are',
    type: 'affirmations',
    color: colors[0],
    affirmations: [
      'No one else gets to measure my identity.',
      'I do not need a history to prove a truth.',
      'I am bisexual. That is enough.',
    ],
    buttonLabel: 'Finish ✨',
  },
];
