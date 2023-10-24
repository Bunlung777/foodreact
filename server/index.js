const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path  = require('path')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fs = require('fs');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "projectfood",
  });
  
  app.get("/allfood", (req, res) => {
      db.query("SELECT * FROM food", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  });
 
  app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});

app.post('/upload', upload.single('image'), (req, res) => {
  const FoodName = req.body.FoodNames;
  const Detail = req.body.Detail;
  const Price = req.body.Price;
  const Calories = req.body.Calories;
  const imageData = req.file.buffer;

  db.query(
    'INSERT INTO food (ImgFood, FoodName, Price, Detail, Calories) VALUES (?, ?, ?, ?, ?)',
    [imageData, FoodName, Price, Detail, Calories],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error inserting data into the database');
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.delete("/delete/:Id", (req, res) => {
  const id = req.params.Id;
  db.query("DELETE FROM food WHERE Id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/update", upload.single('updatedImg'), (req, res) => {
  const { Id, updatedFoodName, updatedDetail, updatedPrice, updatedCalories } = req.body;

  if (req.file) {
    const updatedImg = req.file.buffer; // Image was uploaded
    db.query(
      "UPDATE food SET ImgFood = ? , FoodName = ?, Detail = ?, Price = ?, Calories = ? WHERE Id = ?",
      [updatedImg, updatedFoodName, updatedDetail, updatedPrice, updatedCalories, Id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating database");
        } else {
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      "UPDATE food SET  FoodName = ?, Detail = ?, Price = ?, Calories = ? WHERE Id = ?",
      [updatedFoodName, updatedDetail, updatedPrice, updatedCalories, Id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating database");
        } else {
          res.send(result);
        }
      }
    );
  }

});



