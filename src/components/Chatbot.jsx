// Chatbot.tsx
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Button,
  Typography,
  Slide,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 I’m your assistant. Ask me anything about PhotoPilot.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: `Thanks for your message! I'm still learning but will get smarter soon. 🤖`,
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 100,
          right: 24,
          backgroundColor: "#3b82f6",
          color: "#fff",
          zIndex: 1300,
          ":hover": { backgroundColor: "#2563eb" },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chatbot Window */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 320,
            height: 460,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            boxShadow: 6,
            zIndex: 1400,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#1e293b",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <Typography fontWeight={600}>PhotoPilot Assistant</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 1,
              backgroundColor: "#f8fafc",
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                {msg.sender === "bot" && (
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: "#3b82f6",
                      fontSize: 14,
                      mr: 1,
                    }}
                  >
                    🤖
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: "75%",
                    bgcolor: msg.sender === "user" ? "#3b82f6" : "#e2e8f0",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    p: 1,
                    borderRadius: 2,
                    fontSize: 14,
                    fontStyle: msg.sender === "bot" && msg.text.includes("learning")
                      ? "italic"
                      : "normal",
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}

            {isTyping && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: "#3b82f6", fontSize: 14 }}>
                  🤖
                </Avatar>
                <Typography fontSize={14} color="text.secondary">
                  Typing...
                </Typography>
                <CircularProgress size={12} />
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleSend}
                    variant="contained"
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Send
                  </Button>
                ),
              }}
            />
          </Box>
        </Paper>
      </Slide>
    </>
  );
}
