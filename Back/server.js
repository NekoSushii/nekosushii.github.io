const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 4000;
const cors = require('cors')

/* cors routing */
var corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
require('./routes/service_router')(app)
app.listen(port, () => console.log(`Listening on port ${port}`));

const db = require('./models/database')

/* display */
app.get("/", (req, res) => {
    res.json({ message: `connect to port ${port}` });
  });