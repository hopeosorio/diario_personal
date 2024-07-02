const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const entriesRouter = require('./routes/entries');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/entries', entriesRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
