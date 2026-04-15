const express = require("express");
const { getAll, getById, create, updateCarById } = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

// [GET] /api/cars
router.get("/", async (req, res, next) => {
  try {
    const cars = await getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cars/:id
router.get("/:id", checkCarId, async (req, res) => {
  res.json(req.car);
});

// [POST] /api/cars
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

// [PUT] /api/cars/:id
router.put(
  "/:id",
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      const updatedCar = await updateCarById(req.params.id, req.body);
      res.json(updatedCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
