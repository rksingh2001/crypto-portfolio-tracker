// Returns the ID of the most profitable coin
export const mostProfitableCoin = (userCoinsData, portfolio) => {
  let profitable_coin = "";
  let profit = Number.MIN_VALUE;

  // Taking userCoinsData insteead of portfolio will give error
  // portfolio[coinID] is undefined
  const coinKeys = Object.keys(portfolio);
  if (coinKeys.length === 0) return profitable_coin;

  // The coinID element should exist both in portfolio and userCoinsData
  coinKeys.forEach(coinID => {
    const curr = portfolio[coinID].price;
    const buyPrice = userCoinsData[coinID].buyPrice;

    const temp = ((curr - buyPrice) / curr) * 100;
    if (temp > profit) {
      profit = temp;
      profitable_coin = coinID;
    }
  })

  return profitable_coin;
}