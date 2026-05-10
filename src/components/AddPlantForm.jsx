import React, { useState } from "react";

function AddPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price, // keep as string
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((data) => {
        // add missing field locally AFTER response if needed
        onAddPlant({ ...data, isSoldOut: false });
      });

    setName("");
    setImage("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Plant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
}

export default AddPlantForm;
