import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const quoteList = [
  // 🔥 Motivational
  "🌟 Progress, not perfection.",
  "💪 You’re stronger than you think.",
  "🌈 Every step you take matters.",
  "🎯 Small actions, big impact.",
  "🚀 Don’t wait for opportunity. Create it.",
  "🔥 Keep going. Your future self will thank you.",
  "🏃‍♂️ Just start. The rest will follow.",
  "🌱 Grow through what you go through.",
  "🧗‍♀️ The climb might be tough, but the view is worth it.",

  // 🧠 Thoughtful / Self-Improvement
  "🛠 Every failure teaches something valuable.",
  "📚 The more you know, the more you grow.",
  "🧠 Feed your mind with good thoughts.",
  "🧘‍♂️ Slow down. Breathe. Recenter.",
  "🎨 When did you last do something just for you?",
  "📖 Write your story. Don’t let others hold the pen.",
  "🔄 Growth begins at the edge of your comfort zone.",
  "🧩 Are your habits aligned with your goals?",

  // 😂 Funny
  "☕ Productivity tip: coffee. That’s it. That’s the tip.",
  "😅 Adulting is just Googling how to do stuff.",
  "🧠 My brain has too many tabs open.",
  "😴 I came. I saw. I made it awkward.",
  "😎 Mondays are proof that pants are overrated.",
  "🪑 If you fall, I’ll be there. – Floor",
  "📅 I plan my naps like meetings now.",
  "📉 I’m not procrastinating. I’m prioritizing creatively.",
  "🔁 Let’s pretend this is part of the plan.",

  // 💖 Biblical / Spiritual
  "🙏 ‘Be still, and know that I am God.’ – Psalm 46:10",
  "💡 ‘I can do all things through Christ who strengthens me.’ – Philippians 4:13",
  "🌿 ‘For I know the plans I have for you.’ – Jeremiah 29:11",
  "🕊 ‘Love one another as I have loved you.’ – John 13:34",
  "🛐 ‘When I am afraid, I put my trust in you.’ – Psalm 56:3",
  "🌤 ‘Let your light shine before others.’ – Matthew 5:16",
  "❤️ ‘Create in me a clean heart, O God.’ – Psalm 51:10",

  // 🧘‍♀️ Self-reflection Questions
  "❓ What’s one thing you’re grateful for today?",
  "🧭 What’s one thing you can do to improve tomorrow?",
  "🔍 When did you last truly rest?",
  "💭 What’s something you’ve been avoiding?",
  "🌄 How do you want to feel at the end of today?",
  "🎯 Are you focused on what matters most?",
  "🔄 What is something you can let go of right now?",
  "📝 What’s your proudest moment this week?",
  "🎁 How can you show kindness to someone today?",

  // 💡 Empowering
  "🦋 You are becoming who you were meant to be.",
  "💖 You are more than your productivity.",
  "⚡ You are allowed to take up space.",
  "🌞 Be the energy you want to attract.",
  "💬 Speak to yourself with love today.",
  "🧡 Rest is productive too.",
  "🛤 You are on your own path. Trust it.",
  "🌠 You don’t have to have it all figured out.",
  "💎 Your value doesn’t decrease based on someone’s inability to see your worth.",
];

const getQuoteOfTheDay = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const quote = quoteList[dayOfYear % quoteList.length];
  return quote;
};

const Quotes = () => {
  const quote = getQuoteOfTheDay();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "20px",
        left: "30px",
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: "25px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffdde1, #ffb6c1, #fff0f6)",
          maxWidth: "320px",
          width: "100%",
          textAlign: "center",
          border: "2px solid #ff69b4",
          boxShadow: "0px 8px 16px rgba(255, 182, 193, 0.3)",
          position: "relative",
          overflow: "hidden",
          animation: "fadeIn 1.5s ease-in-out",
          "&:hover": {
            boxShadow: "0px 12px 24px rgba(255, 182, 193, 0.5)",
          },
        }}
      >
        {/* Floating Quote Text */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "700",
            color: "#ff1493",
            marginBottom: "10px",
            textShadow: "1px 1px 5px rgba(255, 105, 180, 0.4)",
            animation: "floatText 3s infinite ease-in-out",
          }}
        >
          {quote}
        </Typography>

        {/* Gentle Glow Effect */}
        <Box
          sx={{
            position: "absolute",
            top: "-30%",
            left: "-30%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 10%, rgba(255,255,255,0) 80%)",
            opacity: 0.4,
            filter: "blur(15px)",
            animation: "glow 5s infinite alternate",
          }}
        />
      </Paper>

      <style>
        {`
            @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
            }

            @keyframes floatText {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
            }

            @keyframes glow {
            from { opacity: 0.3; transform: scale(1); }
            to { opacity: 0.5; transform: scale(1.05); }
            }
        `}
      </style>
    </Box>
  );
};

export default Quotes;
