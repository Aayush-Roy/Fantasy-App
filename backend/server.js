const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


main()
.then(res=>"DB connected")
.catch(err=>console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fantasy-game2');

}

// mongoose.connect('mongodb://localhost:27017/fantasy-game2', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  points: Number,
});

const teamSchema = new mongoose.Schema({
  name: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

const Player = mongoose.model('Player', playerSchema);
const Team = mongoose.model('Team', teamSchema);

// Get all players
app.get('/players', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Create a team
app.post('/teams', async (req, res) => {
  const { name, players } = req.body;
  if (players.length > 11) {
    return res.status(400).json({ message: 'You can only add up to 11 players.' });
  }
  const newTeam = new Team({ name, players });
  await newTeam.save();
  res.json(newTeam);
});

// Get a specific team by ID
app.get('/teams/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('players');
  res.json(team);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
