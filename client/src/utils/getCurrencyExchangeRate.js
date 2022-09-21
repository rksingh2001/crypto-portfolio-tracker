import convertCurrencyApi from '../api/convertCurrency';

let conversion = 1;
let last_curr = "USD"

// Returns Currency Rate to exchange 1$ -> the desired currecy
export const getCurrencyExchangeRate = async (curr) => {
  try {
    const response = await convertCurrencyApi.get("/", {
      params: {
        to: curr
      }
    })
    if (response.data.success) {
      // console.log(response.data.result.convertedAmount);
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