const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { DBconnect } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { auth } = require("./middleware/auth");
const { todolistRouter } = require("./routes/todolistRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
 return  res.send("ready server")
})

// Public routes
app.use("/user", userRouter);

// Protected routes (requires authentication)
app.use(auth);
app.use("/todolist", todolistRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async (error) => {
  if (error) {
    console.log("❌ Server failed to start:", error);
    return;
  }

  try {
    await DBconnect();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.log("❌ Database connection failed:", err);
  }
});
