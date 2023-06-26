/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

dotenv.config();
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DBs connection successful'));

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);

// Import Data from DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully Loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit()
};

// Delete Data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully Deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

