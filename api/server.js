const express = require('express');
const bodyParser = require('body-parser');
const pkg = require('./package.json');

const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://dbUser:v13cHlF4Kfzhj8gz@rkv.xyupm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// App constants
const port = process.env.PORT || 5000;
const apiPrefix = '/api';

// Store data in-memory, not suited for production use!
const db = {
  test: {
    user: 'test',
    currency: '$',
    description: `Test account`,
    balance: 75,
    transactions: [
      { id: '1', date: '2020-10-01', object: 'Pocket money', amount: 50 },
      { id: '2', date: '2020-10-03', object: 'Book', amount: -10 },
      { id: '3', date: '2020-10-04', object: 'Sandwich', amount: -5 }
    ],
  }
};

// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
const router = express.Router();

// Get server infos
router.get('/', (req, res) => {
  return res.send(`${pkg.description} v${pkg.version}`);
});

// Create an account
router.post('/accounts', (req, res) => {
  // Check mandatory request parameters
  console.log(req.body);
  if (!req.body.user || !req.body.currency) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Check if account already exists
  if (db[req.body.user]) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Convert balance to number if needed
  let balance = req.body.balance;
  if (balance && typeof balance !== 'number') {
    balance = parseFloat(balance);
    if (isNaN(balance)) {
      return res.status(400).json({ error: 'Balance must be a number' });  
    }
  }

  // Create account
  const account = {
    user: req.body.user,
    currency: req.body.currency,
    description: req.body.description || `${req.body.user}'s budget`,
    balance: balance || 0,
    transactions: [],
  };
  db[req.body.user] = account;

  console.log(`Account created: ${JSON.stringify(account)}`);

  try {
    await client.connect();
    
    const database = client.db("rkv");
    const contactMessage = database.collection("super_doodle");
    const timeStamp = Date.now();
    var currentdate = new Date(); 
    var dateTimeText = "Time: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    // create a document to insert
    const doc = {
        user: req.body.user,
        currency: req.body.currency,
        description: req.body.description || `${req.body.user}'s budget`,
        balance: balance || 0,
        timeStamp: timeStamp,
        dateTimeText: dateTimeText
    }
    const result = await contactMessage.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } finally {
      await client.close();
  }

  return res.status(201).json(account);
});

// Get all data for the specified account
router.get('/accounts/:user', (req, res) => {
  const account = db[req.params.user];

  // Check if account exists
  if (!account) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  return res.json(account);
});


// Add 'api` prefix to all routes
app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
