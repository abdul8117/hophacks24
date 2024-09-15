import API_URL from "./utils";

async function getMealsData() {
  const response = await fetch(`${API_URL}/get-meals`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.meals;
}

export default getMealsData;