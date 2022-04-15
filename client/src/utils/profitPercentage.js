import { portfolioCost } from "./portfolioCost";
import { portfolioValue } from "./portfolioValue";

// Should return the aggregrate profit percentage 
export const profitPercentage = (userCoinsData, portfolio) => {
  const buyPrice = portfolioCost(userCoinsData);
  const curr_val = portfolioValue(userCoinsData, portfolio);
  const profit = ((curr_val - buyPrice) / buyPrice) * 100;

  if (isNaN(profit)) return 0;
  return profit;
}