// Returns profit or loss of a particular Coin
export const coinProfit = (coinData, userData) => {
  if (coinData === undefined || userData === undefined) return 0;
  return ((coinData.price - userData.buyPrice) / userData.buyPrice * 100).toFixed(2);
}