import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
