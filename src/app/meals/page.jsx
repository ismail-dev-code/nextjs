"use client";
import { useEffect, useState } from "react";
import MealsSearchInput from "./components/mealsSearchInput";

export default function MealsPage() {


  const fetchMeals = async (query = "") => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };


  // Fetch meals on button click
  const handleSearch = () => {
    fetchMeals(search);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Meals</h1>
      <div className="flex gap-2 mb-6">
  
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
     <MealsSearchInput/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="border rounded shadow p-4 text-center"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg">{meal.strMeal}</h2>
          </div>
        ))}
        {meals.length === 0 && (
          <p className="col-span-full text-gray-600 text-center">
            No meals found. Try searching something else.
          </p>
        )}
      </div>
    </div>
  );
}
