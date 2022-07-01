import convertCurrencyApi from '../api/convertCurrency';

let conversion = 1;
let last_curr = "USD"

// Returns Currency Rate to exchange 1$ -> the desired currecy
const getCurrencyExchangeRate = async (curr) => {
  try {
    const response = await convertCurrencyApi.get("/", {
      params: {
        to: curr
      }
    })
    if (response.data.success) {
      return response.data.result.convertedAmount;
    }
    else {
      console.log("convert-currency Api failed to deliver successful data");
      return 1;
    }
  } catch (error) {
    console.log("error in handleCurrencyChange getCurrencyExchangeRateFunction", error);
  }
}

export const handleCurrencyChange = async (curr, value) => {
  if (curr !== last_curr) {
    conversion = await getCurrencyExchangeRate(curr);
    last_curr = curr;
    return conversion*value;
  } else {
    // Saves api if same currency is requested
    return conversion*value;
  }
}