"use client";

import { useState } from "react";

export default function AddVehicle() {
  const [newVehicle, setNewVehicle] = useState({
    year: "",
    make: "",
    model: "",
    client: "",
    file: undefined,
  });

  const [errorMessage, setErrorMessage] = useState("");

  function onFormSubmit() {
    event?.preventDefault();
    console.log(newVehicle);

    if (
      !newVehicle.year ||
      !newVehicle.make ||
      !newVehicle.model ||
      !newVehicle.client
    ) {
      setErrorMessage("Please fix your submission.");
      return;
    }

    alert("successful");
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="border border-1 border-gray p-8 rounded-lg flex flex-col">
          <h2 className="text-3xl mb-4">Add new vehicle</h2>
          <div className="flex flex-col mb-4">
            <input
              required
              type="text"
              placeholder="Year"
              className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  year: e.target.value,
                })
              }
            />
            <input
              required
              type="text"
              placeholder="Make"
              className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  make: e.target.value,
                })
              }
            />
            <input
              required
              type="text"
              placeholder="Model"
              className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  model: e.target.value,
                })
              }
            />
            <label htmlFor="">Upload image</label>
            <input type="file" accept="image/*" />
          </div>
          <button className="bg-green-500 py-2 px-4 rounded-full w-1/4 mb-4">
            + New Vehicle
          </button>
          <h4 className="text-lg text-red-500">{errorMessage}</h4>
        </div>
      </form>
    </>
  );
}
