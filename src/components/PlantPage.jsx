import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import Search from "./Search";
import AddPlantForm from "./AddPlantForm";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  function handleToggleStock(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id
          ? { ...plant, isSoldOut: !plant.isSoldOut }
          : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <Search search={search} setSearch={setSearch} />

      <AddPlantForm onAddPlant={handleAddPlant} />

      <PlantList
        plants={filteredPlants}
        onToggleStock={handleToggleStock}
      />
    </main>
  );
}

export default PlantPage;
