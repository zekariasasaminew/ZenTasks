import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const Quotes = () => {
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
          💕 Surely goodness and mercy shall follow me all the days of my life,
          and I will dwell in the house of the Lord forever! 💕
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
