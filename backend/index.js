const express = require('express');
const app = express();
const port = 5000
const cors = require('cors')
const heroes = require("./routes/heroes")
app.use(cors())
app.use('/heroes', heroes)
app.use(express.json())

app.listen(port, () => {
    console.log(`Serveur is runnning at port : ${port}`);
})