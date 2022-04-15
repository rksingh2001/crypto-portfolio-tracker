// Should the return value of the holding at the time they were bought
export const portfolioCost = (userCoinsData) => {
  let cost = 0;

  Object.values(userCoinsData).forEach(({ totalBought, buyPrice }) => {
    cost += totalBought * buyPrice;
  })

  return cost;
}