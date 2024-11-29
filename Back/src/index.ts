import { initializeApp } from "./app";
import dataSource from "./data-source";

const main = async () => {
  try {
    dataSource.initialize().then(() => {
      console.log("Data source initialized");
      initializeApp();
    });
  } catch (error) {
    console.log(error);
  }
};

main();
