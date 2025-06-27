const express = require('express');
const app = express();

app.use(express.json());

// GET route
app.get('/', (req, res) => {
  res.send('Welcome to the GET route!');
});

// POST route
app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Received POST data: ${JSON.stringify(data)}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
