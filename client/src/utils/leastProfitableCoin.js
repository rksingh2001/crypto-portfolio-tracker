// Returns the ID of the emost profitable coin
export const leastProfitableCoin = (userCoinsData, portfolio) => {
  let profitable_coin = "";
  let profit = Number.MAX_VALUE;

  Object.keys(userCoinsData).forEach(coinID => {
    const curr = portfolio[coinID].price;
    const buyPrice = userCoinsData[coinID].buyPrice;

    const temp = ((curr - buyPrice) / curr) * 100;
    if (temp < profit) {
      profit = temp;
      profitable_coin = coinID;
    }
  })

  return profitable_coin;
}