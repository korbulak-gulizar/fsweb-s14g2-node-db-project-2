const vinValidator = require("vin-validator");
const db = require("../../data/db-config");

const checkCarId = async (req, res, next) => {
  try {
    const car = await db("cars").where("id", req.params.id).first();
    if (!car) {
      return res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    }
    req.car = car;
    next();
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) return res.status(400).json({ message: "vin is missing" });
  if (!make) return res.status(400).json({ message: "make is missing" });
  if (!model) return res.status(400).json({ message: "model is missing" });
  if (!mileage) return res.status(400).json({ message: "mileage is missing" });

  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  if (!vinValidator.validate(vin)) {
    return res.status(400).json({ message: `vin ${vin} is invalid` });
  }

  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await db("cars").where("vin", req.body.vin).first();

    if (existing) {
      return res
        .status(400)
        .json({ message: `vin ${req.body.vin} already exists` });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
