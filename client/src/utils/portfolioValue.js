// Should return the current value of the holings
export const portfolioValue = (userCoinsData, portfolio) => {
  let value = 0;
  
  // Taking userCoinsData insteead of portfolio will give error
  // portfolio[coinID] is undefined
  const coinKeys = Object.keys(portfolio);

  coinKeys.forEach(coinID => {
    value += userCoinsData[coinID].totalBought * portfolio[coinID].price;
  })

  return value;
}