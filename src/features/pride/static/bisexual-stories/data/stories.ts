import zaraImg from "../assets/zara.jpg";
import kiranImg from "../assets/kiran.jpg";
import jamesImg from "../assets/james.jpg";
import leilaImg from "../assets/leila.jpg";
import marcusImg from "../assets/marcus.jpg";
import priyaImg from "../assets/priya.jpg";
import samImg from "../assets/sam.jpg";
import nadiaImg from "../assets/nadia.jpg";

export interface StoryColor {
  stripe: string;
  tagBg: string;
  tagText: string;
  hlBg: string;
  takeBg: string;
  border: string;
}

export interface Story {
  name: string;
  age: number;
  color: StoryColor;
  identity: string;
  quote: string;
  story: string[];
  highlight: string;
  takeaway: string;
  photo: string;
}

export const stories: Story[] = [
  {
    name: "Zara", age: 23,
    color: { stripe: "#d1006c", tagBg: "#fce7f3", tagText: "#d1006c", hlBg: "#fff0f8", takeBg: "#fff8fc", border: "#d1006c" },
    identity: "Bisexual",
    quote: "People kept telling me I was confused. I was not confused. I was bisexual. Those are different things.",
    story: [
      "When I was seventeen I told a friend I liked both boys and girls. She said: that just means you have not decided yet. I did not argue. I did not have the vocabulary then to explain that bisexuality is not a waiting room. It is a destination. A complete one.",
      "For years I moved through the world accepting other people's interpretations of my identity. When I dated a boy, people assumed I was straight. When I dated a girl, people assumed I had finally figured it out. Neither of them understood that my identity did not change based on who I was with. I was bisexual in both relationships. Bisexual always.",
      "The erasure was the hardest part. Not hostility, not rejection, but invisibility. The way people looked at who I was with and decided, from that information, who I was. I learned to introduce my identity before anyone else could misread it.",
      "I found a bisexual community in my early twenties and something settled. Not because I needed permission, but because I had spent years explaining myself to people who did not have the framework to understand, and suddenly I was surrounded by people who just knew.",
      "Bisexuality is not a phase, not confusion, not greed, not indecision. It is a complete and valid orientation that exists independently of who you happen to be with. If you are bisexual, you do not need a relationship to prove it. You are already exactly what you are."
    ],
    highlight: "Bisexuality is not a waiting room. It is a destination. A complete one.",
    takeaway: "Bisexual erasure is real. Your identity does not change based on who you are currently with. You are bisexual always — in every relationship, and outside of all of them.",
    photo: zaraImg,
  },
  {
    name: "Kiran", age: 27,
    color: { stripe: "#6b35b8", tagBg: "#ede9fe", tagText: "#6b35b8", hlBg: "#f5f3ff", takeBg: "#faf8ff", border: "#6b35b8" },
    identity: "Bisexual",
    quote: "Being South Asian and bisexual meant my identity did not exist in two communities at once.",
    story: [
      "In my family's world, bisexuality did not have a name. In the queer spaces I eventually found, bisexuality was sometimes seen as insufficiently gay, as a halfway point rather than a destination. I spent a long time feeling like I did not fully belong in either place.",
      "South Asian bisexual people exist in a particular kind of double invisibility. Our families often cannot see us because queerness itself is invisible. Queer communities sometimes cannot see us because we are read as straight when we are with different-gender partners. We are erased from both sides simultaneously.",
      "What helped me was finding other South Asian queer people, and specifically other bisexual people, online first and then in person. Seeing that my exact combination of identities had a community, had history, had people who had navigated what I was navigating and arrived somewhere whole, was more valuable than anything else.",
      "I am out now to my closest friends and to one sibling. I am not out to my parents. That is a decision I am making carefully and on my own timeline. I do not experience my privacy as shame. I experience it as strategy, and there is a difference.",
      "You are allowed to disclose your identity on your own terms, in your own time, to the people you choose. Coming out is not a single event. It is a lifelong series of individual decisions, each of which belongs entirely to you."
    ],
    highlight: "I do not experience my privacy as shame. I experience it as strategy, and there is a difference.",
    takeaway: "Coming out does not have to happen all at once or to everyone. Your disclosure is yours to control, and choosing who knows and when is not a compromise of your identity.",
    photo: kiranImg,
  },
  {
    name: "James", age: 32,
    color: { stripe: "#0050a0", tagBg: "#dbeafe", tagText: "#0050a0", hlBg: "#eff6ff", takeBg: "#f8faff", border: "#0050a0" },
    identity: "Bisexual",
    quote: "I am a bisexual man in a long-term relationship with a woman. That does not make me straight. It makes me bisexual.",
    story: [
      "When I met my partner and fell in love, some people treated it as a resolution. As if my bisexuality had been a temporary state of uncertainty that had now concluded with the correct answer. My partner is a woman, so I must be straight. That is not how it works.",
      "Bisexual men face a particular erasure that operates through the assumption that our identity is really about sexual behaviour rather than orientation. If I am with a woman, I am straight. If I were with a man, I would be gay. The bisexual middle is treated as a category error rather than a real place to live.",
      "I came out as bisexual to my friends at twenty-four. The responses ranged from genuinely supportive to quietly sceptical. One friend said: are you sure you are not just gay and not ready to say it? I said: I am sure I am bisexual and ready to say that. We did not talk about it again for a while.",
      "My partner knows and has always known. She does not treat my bisexuality as a threat or a secret. She treats it as part of who I am, which is exactly what it is. We talk about it openly. It is not a complicated thing between us.",
      "Bisexual men exist. We are not confused, not secretly gay, not performing for an audience. We are bisexual, in relationships and out of them, partnered with women or men or anyone, always."
    ],
    highlight: "My partner is a woman, so I must be straight. That is not how it works.",
    takeaway: "Bisexual men are especially subject to erasure and scepticism. Your identity does not depend on who you are with, and it does not require anyone else's belief to be real.",
    photo: jamesImg,
  },
  {
    name: "Leila", age: 19,
    color: { stripe: "#d1006c", tagBg: "#fce7f3", tagText: "#d1006c", hlBg: "#fff0f8", takeBg: "#fff8fc", border: "#d1006c" },
    identity: "Bisexual",
    quote: "I came out at sixteen and spent three years wishing I had waited. Then I stopped wishing that.",
    story: [
      "I came out to my parents at sixteen. My mother was upset. My father said very little. For the next two years, my bisexuality was a subject we avoided by mutual unspoken agreement, sitting in the middle of our family like something none of us knew how to move around.",
      "I spent a lot of that time wondering whether I should have waited, been more certain, had a relationship to point to as evidence. I thought that if I had more proof, the conversation would have gone differently. What I eventually understood was that I had not made a mistake. I had been honest at sixteen, which took courage I should not diminish.",
      "My parents have changed, slowly. My mother now asks about the people I date without specifying gender. My father made a comment recently about a bisexual character in a TV show that was, quietly, positive. These are small things. I am learning to receive them as what they are.",
      "Being out at nineteen means I have had three years to learn how to be bisexual in the world. I have made mistakes. I have dated people who treated my bisexuality as a novelty. I have had to leave spaces that were not safe. I have also found people who just accept it as one fact among many about who I am.",
      "If you are young and thinking about coming out, the timing is yours and only yours. But I am glad I did it at sixteen. Even with the difficulty, I have had three more years of being myself."
    ],
    highlight: "I had been honest at sixteen. That took courage I should not diminish.",
    takeaway: "Coming out young is not a mistake even when it is hard. You gave yourself the gift of more time being known. That matters, even when the response is imperfect.",
    photo: leilaImg,
  },
  {
    name: "Marcus", age: 38,
    color: { stripe: "#6b35b8", tagBg: "#ede9fe", tagText: "#6b35b8", hlBg: "#f5f3ff", takeBg: "#faf8ff", border: "#6b35b8" },
    identity: "Bisexual",
    quote: "I knew I was bisexual at fourteen. I told someone at thirty-six. The gap between those two things cost me something.",
    story: [
      "Twenty-two years is a long time to carry something in silence. I knew at fourteen. I had a name for it at sixteen, once I found books that had the word. I did not tell anyone until I was thirty-six, at a dinner with my closest friend, after two glasses of wine and a conversation that had somehow found its way to the subject.",
      "The silence was not dramatic. It was ordinary. I dated women. I built a career. I made friends. The bisexual part of me existed in private, in the parts of myself I did not share with anyone. I had learned early that it was not safe to share, and then the habit of not sharing simply continued past the point where it needed to.",
      "Coming out at thirty-six was strange. I had expected relief and found it, but I had also expected it to feel like a beginning and it felt more like a reckoning with everything I had not said. My friend hugged me and said: I love you, I am glad you told me, and also I am angry on your behalf that you could not tell me sooner. That landed somewhere important.",
      "I am not angry at younger me. Younger me was surviving. What I feel is something softer than anger, a kind of tenderness for the version of myself who carried this alone for so long, and a clarity about what I owe myself now that I have put it down.",
      "You are allowed to come out at any age. The years before do not invalidate the identity. They are just the shape your survival took."
    ],
    highlight: "The years before do not invalidate the identity. They are just the shape your survival took.",
    takeaway: "Long silences around bisexuality are common and understandable. Coming out later is not a failure. It is an arrival, and arrivals are worth celebrating regardless of when they happen.",
    photo: marcusImg,
  },
  {
    name: "Priya", age: 25,
    color: { stripe: "#0050a0", tagBg: "#dbeafe", tagText: "#0050a0", hlBg: "#eff6ff", takeBg: "#f8faff", border: "#0050a0" },
    identity: "Bisexual",
    quote: "My mental health and my bisexuality were knotted together for years. Untangling one helped untangle the other.",
    story: [
      "I was in therapy for anxiety before I came out. My therapist knew I was struggling and I think she suspected there was something I was not saying. She was patient in a way that eventually made it impossible for me not to say it.",
      "When I finally told her I was bisexual, she did not treat it as the obvious explanation for everything. She treated it as one part of a complicated picture. She helped me see that the anxiety was real and separate, and that the hiding had been making it worse, but that coming out would not fix everything. That turned out to be exactly right.",
      "Bisexual people have higher rates of anxiety and depression than both straight and gay populations. The research suggests that erasure, invalidation, and the particular kind of isolation that comes from not quite belonging in any community takes a significant mental health toll. Naming this helped me feel less alone.",
      "I am out to my therapist, my close friends, and my sister. I am not out to my parents yet. The decision is mine and I am making it carefully. My mental health is stable for the first time in years. Those things are connected.",
      "If you are bisexual and struggling mentally, there is research and support specifically for bisexual people. Your experience is documented. You are not imagining it. And you deserve care that accounts for all of it."
    ],
    highlight: "Bisexual erasure, invalidation, and isolation takes a real mental health toll. Naming this helped me feel less alone.",
    takeaway: "Bisexual people face specific mental health challenges rooted in erasure and lack of community. Seeking support that acknowledges your full identity is not a luxury. It is necessary.",
    photo: priyaImg,
  },
  {
    name: "Sam", age: 21,
    color: { stripe: "#d1006c", tagBg: "#fce7f3", tagText: "#d1006c", hlBg: "#fff0f8", takeBg: "#fff8fc", border: "#d1006c" },
    identity: "Bisexual",
    quote: "I used to think I was not bi enough. Then I realised there is no such thing as not bi enough.",
    story: [
      "I have a complicated relationship with percentages. For a long time I tried to quantify my bisexuality, to figure out the exact ratio that would tell me whether I counted. Sixty percent this way, forty percent that way. As if there was a threshold below which you did not qualify.",
      "The Kinsey scale made things worse before it made them better. I understood what it was trying to say but I used it to disqualify myself. I was not a three, I was maybe a two, and did a two count as really bisexual? I was running the kind of internal audit that no straight person has ever had to run about their identity.",
      "What shifted was finding bisexual communities online where people just existed without the audit. People who had mostly dated one gender and identified confidently as bisexual. People who had never acted on attraction to a particular gender and still knew who they were. The identity did not require evidence. It required honesty.",
      "I am twenty-one and I have been out for two years. I have dated one person, who was a boy. I am still bisexual. I will be bisexual if I only ever date boys for the rest of my life. The attraction does not go away because it is not being acted on. Neither does the identity.",
      "There is no bi enough. There is no threshold, no evidence required, no behaviour that confirms or denies the identity. You are bisexual if you say you are, and no measurement makes it more or less true."
    ],
    highlight: "There is no bi enough. The identity does not require evidence. It requires honesty.",
    takeaway: "Bisexuality does not require a particular ratio of attraction or a history of relationships with multiple genders. If you identify as bisexual, that is sufficient. No audit required.",
    photo: samImg,
  },
  {
    name: "Nadia", age: 44,
    color: { stripe: "#6b35b8", tagBg: "#ede9fe", tagText: "#6b35b8", hlBg: "#f5f3ff", takeBg: "#faf8ff", border: "#6b35b8" },
    identity: "Bisexual",
    quote: "I came out at forty-two. My daughter said: mum, I know. My son said: cool. I am fine.",
    story: [
      "I was married for fourteen years. Not unhappily. My husband was a good man and we had two children and a life that worked, mostly. The bisexual part of me had been present throughout, quietly, in a way I had learned to manage without examining too closely.",
      "After the marriage ended, for reasons that were not about my sexuality, I found myself with space I had not had before. I started being honest with myself in that space. The word bisexual, which I had known was accurate for decades, finally felt like something I was allowed to say out loud.",
      "I came out to my daughter first. She is twenty and was unsurprised in a way that made me laugh. She said she had always had a sense of it. My son, who is seventeen, said cool and went back to his phone. My mother is in her seventies and her framework for this is limited, but she loves me and she is trying.",
      "Coming out at forty-two meant reckoning with the decades before it. The relationships I did not pursue. The parts of myself I set aside. I do not regret the life I built. I do feel something for the version of me who spent so long at a distance from her own identity. She was doing her best.",
      "It is never too late. I am forty-four and I have been out for two years and I am in a relationship for the first time in my life with someone who knows all of me. It is extraordinary."
    ],
    highlight: "It is never too late. I am forty-four and I am in a relationship with someone who knows all of me. It is extraordinary.",
    takeaway: "Coming out at any age is valid. The life you built before was real and the identity you arrive at now is equally real. There is no expiry date on knowing yourself.",
    photo: nadiaImg,
  },
];
