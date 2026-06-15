import http from "http";
import express from "express";
import dotenv from "dotenv";
import "./jobs/cycleJob"
dotenv.config();
import connection from "./db/db";
import { routes } from "./router";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  
application.get("/health", (req,res) => {
  res.status(200).json({
    status:"success",
    message: "Expense TRacker API is running"
  })
})
  application.use("/", routes);

  connection
    .sync()
    .then(() => {
      console.log("Database Synced Sucessfully");
    })
    .catch((error) => {
      console.log(error.message);
    });

const PORT = process.env.PORT || 1333

  httpServer = http.createServer(application);

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
