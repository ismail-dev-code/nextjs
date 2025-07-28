import Link from "next/link";

// Fetch a single meal by ID
export async function getMealById(id) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal:", error);
    return null;
  }
}

// SEO metadata for the meal page
export async function generateMetadata({ params }) {
  const meal = await getMealById(params.id);

  if (!meal) {
    return {
      title: "Meal Not Found",
      description: "The requested meal could not be found.",
    };
  }

  return {
    title: meal.strMeal,
    description: meal.strInstructions.slice(0, 150),
  };
}

// Single meal page component
export default async function SingleMealPage({ params }) {
  const meal = await getMealById(params.id);

  if (!meal) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-medium">Meal not found.</p>
        <Link href="/meals" className="text-blue-600 hover:underline mt-4 block">
          ← Back to Meals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-64 object-cover rounded mb-6 shadow"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{meal.strMeal}</h1>
      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
        {meal.strInstructions}
      </p>
      <Link href="/meals" className="text-blue-600 hover:underline">
        ← Back to Meals
      </Link>
    </div>
  );
}
