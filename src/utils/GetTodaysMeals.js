import API_URL from "./utils";

async function GetTodaysMeals() {
    // Fetch all meals using getMealsData
    const data = await getMealsData();

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayDateStr = today.toISOString().split('T')[0];

    // Filter meals for today
    const todaysMeals = data.filter((meal) => {
        const mealDate = new Date(meal.mealDate * 1000); // Convert UNIX timestamp to Date
        const mealDateStr = mealDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        return mealDateStr === todayDateStr; // Return only today's meals
    });

    return todaysMeals;
}

export default GetTodaysMeals;