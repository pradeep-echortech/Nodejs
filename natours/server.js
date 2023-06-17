const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env)

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
