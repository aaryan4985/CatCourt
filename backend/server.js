const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Cat API URL
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

// Tone Analysis Keywords
const LAZY_KEYWORDS = ['lazy', 'skip', 'skipped', 'procrastinate', 'sleep', 'tired', 'bore', 'boring', 'later', 'tomorrow'];
const FOOD_KEYWORDS = ['food', 'eat', 'hungry', 'snack', 'pizza', 'burger'];
const WORK_KEYWORDS = ['work', 'job', 'boss', 'meeting', 'deadline', 'code', 'bug'];

// Savage Judgements
const SAVAGE_JUDGEMENTS = [
    "Pathetic. My litter box is cleaner than your conscience.",
    "Are you serious? Even a goldfish has better life choices.",
    "I'd judge you, but I'm too busy napping. Just kidding, I'm judging you hard.",
    "Human, you are the reason aliens won't talk to us.",
    "Oh, honey. No.",
    "Brave of you to admit that. Stupid, but brave.",
    "I've hacked up hairballs with more potential.",
    "Yawn. Call me when you do something interesting.",
    "You disgust me. Now feed me.",
    "404: Dignity not found.",
    "GUILTY of being basic.",
    "I sentence you to 10 minutes of belly rubs (for me, not you).",
    "Your ancestors are weeping. Or laughing. Probably laughing.",
    "If I had a thumb, I'd give this a thumbs down.",
    "Gross.",
    "Do you even own a scratching post? It shows.",
    "Verdict: 100% Cringe."
];

const LAZY_JUDGEMENTS = [
    "So you just gave up? Typical.",
    "My 18 hours of sleep is necessary. You're just pointless.",
    "Productivity is chasing a laser pointer. You are staring at the wall.",
    "Imagine doing nothing and still failing. Oh wait, you don't have to imagine.",
    "Get off the couch, you hairless ape.",
    "I nap harder than you work.",
    "You call this a confession? I call it a Tuesday.",
    "GUILTY of Sloth. And bad fashion."
];

// Therapy Messages
const THERAPY_MESSAGES = [
    "It's okay, human. Have a purr.",
    "Life is hard. Naps help. So does screaming into the void.",
    "I loathe everyone, but I tolerate you slightly more today.",
    "Here is a paw of approval. Don't let it go to your head.",
    "You did your best. Probably. I wasn't watching.",
    "Soft kitty, warm kitty... you know the rest. Feel better.",
    "Everything is awful, but look at my fluffy belly.",
    "Cheer up. You could be a dog. imagine how terrible that would be.",
    "I permit you to pet me exactly three times. Enjoy the serotonin.",
    "Eat a treat. You look like you need it.",
    "I brought you a dead mouse. It's a metaphor for your problems (dead).",
    "Purr. Purr. Purr. (That's $500 billing)",
    "You are adequate. For a human."
];

// Helper to get random item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.post('/api/catcourt/judge', async (req, res) => {
    try {
        const { text } = req.body;
        const lowercaseText = text ? text.toLowerCase() : "";
        
        // 1. Determine Judgement
        let verdict = "";
        
        if (LAZY_KEYWORDS.some(k => lowercaseText.includes(k))) {
            verdict = getRandom(LAZY_JUDGEMENTS);
        } else {
             verdict = getRandom(SAVAGE_JUDGEMENTS);
        }

        // 2. Determine Therapy
        const therapyMessage = getRandom(THERAPY_MESSAGES); // Random supportive message

        // 3. Fetch Cat Images (Two different ones)
        // We'll fire two requests in parallel for speed
        const [judgeImageRes, therapyImageRes] = await Promise.all([
            axios.get(CAT_API_URL),
            axios.get(CAT_API_URL)
        ]);

        const judgeImageUrl = judgeImageRes.data[0]?.url;
        const therapyImageUrl = therapyImageRes.data[0]?.url;

        // 4. Construct Response
        const responseData = {
            judgement: {
                imageUrl: judgeImageUrl,
                verdict: verdict
            },
            therapy: {
                imageUrl: therapyImageUrl,
                message: therapyMessage
            }
        };
        
        // Simulate a slight delay for dramatic effect/network realism if local
        // await new Promise(r => setTimeout(r, 1000));

        res.json(responseData);

    } catch (error) {
        console.error("CatCourt Error:", error.message);
        res.status(500).json({ error: "The council of cats is currently sleeping. Try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
