import MealsClient from "./MealsClient";

export const metadata = {
  title: "All Meals",
  description: "Meals loaded from MealDB API",
};

export default function MealsPage() {
  return <MealsClient />;
}
