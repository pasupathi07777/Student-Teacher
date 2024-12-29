import express from "express";
import cors from "cors";
import dotenv from "dotenv";  
import connedtDb from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";   
dotenv.config({ path: "../.env" });


const app = express(); 
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);


app.listen(5000,'0.0.0.0', () => {
  console.log("server is running on PORT:" + 5000);
  connedtDb();
});

