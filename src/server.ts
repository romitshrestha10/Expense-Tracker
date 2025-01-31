import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
import connection from "./db/db";
import { routes } from "./router";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  application.use("/", routes);

  connection
    .sync()
    .then(() => {
      console.log("DataBase Synced Sucessfully");
    })
    .catch((error) => {
      console.log(error.message);
    });

  httpServer = http.createServer(application);
  httpServer.listen(1333, () => {});
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
