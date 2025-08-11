import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from better uptime!",
  });
});
app.post("/website", (req, res) => {
  res.status(200).json({
    message: "Hello from better uptime!",
  });
});

app.get("/status/:website", (req, res) => {
  res.status(200).json({
    message: "Hello from better uptime!",
  });
});

app.listen(process.env.PORT || 3000);
