require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

// ================= MODELS =================

// RESOURCE MODEL
const Resource = sequelize.define('Resource', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  },
  capacity: {
    type: DataTypes.INTEGER
  }
});

// BOOKING MODEL
const Booking = sequelize.define('Booking', {
  requested_by: {
    type: DataTypes.STRING,
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Confirmed"
  }
});

// ================= RELATION =================
Resource.hasMany(Booking, { foreignKey: 'resource_id' });
Booking.belongsTo(Resource, { foreignKey: 'resource_id' });

// ================= RESOURCE ROUTES =================

app.get("/", (req, res) => {
  res.send("Server is working");
});

// CREATE RESOURCE
app.post('/api/resources', async (req, res) => {
  try {
    const data = await Resource.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL RESOURCES
app.get('/api/resources', async (req, res) => {
  const data = await Resource.findAll();
  res.json(data);
});

// ================= BOOKING ROUTES =================

// CREATE BOOKING (WITH DOUBLE BOOKING CHECK)
app.post('/api/bookings', async (req, res) => {
  try {
    const { resource_id, requested_by, booking_date } = req.body;

    const existing = await Booking.findOne({
      where: { resource_id, booking_date }
    });

    if (existing) {
      return res.status(400).json({
        message: "Resource already booked for this date"
      });
    }

    const data = await Booking.create({
      resource_id,
      requested_by,
      booking_date
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL BOOKINGS (WITH JOIN)
app.get('/api/bookings', async (req, res) => {
  const data = await Booking.findAll({
    include: Resource
  });
  res.json(data);
});


// DELETE BOOKING
app.delete('/api/bookings/:id', async (req, res) => {
  const data = await Booking.findByPk(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Booking not found" });
  }

  await data.destroy();
  res.json({ message: "Deleted successfully" });
});

// ================= DATABASE CONNECT =================
sequelize.sync().then(() => {
  console.log("Database connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});