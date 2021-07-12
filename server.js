const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost/Workout', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  require('./routes/htmlRoutes.js')(app);
  app.use(require('./routes/apiRoutes.js'));

  app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`)
  });