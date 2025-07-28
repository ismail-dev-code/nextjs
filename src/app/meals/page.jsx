"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MealsSearchInput from "./components/MealsSearchInput";

export const metadata = {
  title: "All Meals",
  description: "Meals loaded from MealDB API",
};

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

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

  useEffect(() => {
    fetchMeals(search);
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Meals</h1>

      <MealsSearchInput />

      <div className="grid grid-cols-1 testing-purpose-css-class sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {meals.length > 0 ? (
          meals.map((meal) => (
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
          ))
        ) : (
          <p className="col-span-full text-gray-600 text-center">
            No meals found. Try searching something else.
          </p>
        )}
      </div>
    </div>
  );
}
