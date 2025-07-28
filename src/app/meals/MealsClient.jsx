"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MealsSearchInput from "./components/MealsSearchInput";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function MealsClient() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";

  // Ensure hydration is complete before rendering
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const fetchMeals = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHydrated) {
      fetchMeals(search);
    }
  }, [search, isHydrated]);

  if (!isHydrated) return null;

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${roboto.className}`}>
      <h1 className="text-2xl font-bold mb-4">Search Meals</h1>
      <MealsSearchInput />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            Loading meals...
          </p>
        ) : meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="border rounded shadow p-4 text-center"
            >
              <Image
                src={meal.strMealThumb}
                width={641}
                height={641}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg">{meal.strMeal}</h2>
              <Link
                href={`/meals/${meal.idMeal}`}
                className="text-blue-600 hover:underline mt-2 block"
              >
                Details
              </Link>
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
