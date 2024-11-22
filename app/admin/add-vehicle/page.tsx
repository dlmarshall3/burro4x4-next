"use client";

import { ChangeEvent, useRef, useState } from "react";

interface VehicleData {
  year: string;
  make: string;
  model: string;
  client: string;
  file: File | null;
}

export default function AddVehicleForm() {
  const [newVehicle, setNewVehicle] = useState<VehicleData>({
    year: "",
    make: "",
    model: "",
    client: "",
    file: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { year, make, model, client, file } = newVehicle;

    if (!year || !make || !model || !client || !file) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("year", year);
    formData.append("make", make);
    formData.append("model", model);
    formData.append("client", client);
    formData.append("file", file);

    const response = await fetch("/api/addVehicle", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccessMessage("Vehicle added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000)
      setErrorMessage("");
      setNewVehicle({
        year: "",
        make: "",
        model: "",
        client: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      const error = await response.text();
      setErrorMessage(error || "An error occurred while adding the vehicle.");
    }
  }

  function onFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setNewVehicle({ ...newVehicle, file: input.files[0] });
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="p-8 rounded-lg flex flex-col">
        <h2 className="text-3xl mb-4">Add New Vehicle</h2>
        <div className="flex flex-col mb-4">
          <input
            value={newVehicle.year}
            required
            type="text"
            placeholder="Year"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, year: e.target.value })
            }
          />
          <input
            value={newVehicle.make}
            required
            type="text"
            placeholder="Make"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, make: e.target.value })
            }
          />
          <input
            value={newVehicle.model}
            required
            type="text"
            placeholder="Model"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, model: e.target.value })
            }
          />
          <input
            value={newVehicle.client}
            required
            type="text"
            placeholder="Client"
            className="mb-2 border border-1 border-gray px-2 w-1/4 rounded-md"
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, client: e.target.value })
            }
          />
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelection}
            ref={fileInputRef}
          />
        </div>
        <button className="bg-green-500 py-2 px-4 rounded-full w-1/4 mb-4">
          + New Vehicle
        </button>
        {errorMessage && (
          <h4 className="text-lg text-red-500">{errorMessage}</h4>
        )}
        {successMessage && (
          <h4 className="text-lg text-green-500">{successMessage}</h4>
        )}
      </div>
    </form>
  );
}
