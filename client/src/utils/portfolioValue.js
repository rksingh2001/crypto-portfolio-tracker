// Should return the current value of the holings
export const portfolioValue = (userCoinsData, portfolio) => {
  let value = 0;

  Object.keys(userCoinsData).forEach(coinID => {
    value += userCoinsData[coinID].totalBought * portfolio[coinID].price;
  })

  return value;
}