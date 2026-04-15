exports.seed = async function (knex) {
  await knex("cars").truncate();

  const cars = [
    {
      vin: "11111111111111111",
      make: "Toyota",
      model: "Corolla",
      mileage: 100000,
      title: "Clean",
      transmission: "Automatic",
    },
    {
      vin: "22222222222222222",
      make: "Honda",
      model: "Civic",
      mileage: 150000,
      title: "Clean",
      transmission: "Automatic",
    },
    {
      vin: "33333333333333333",
      make: "Ford",
      model: "Focus",
      mileage: 440000,
      title: "Clean",
      transmission: "Automatic",
    },
  ];

  await knex("cars").insert(cars);
};
