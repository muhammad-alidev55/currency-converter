const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const flagFrom = document.querySelector(".from img");
const flagTo = document.querySelector(".to img");
const newMsg = document.querySelector(".msg p");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const input_amt = document.querySelector("#input_amt");

for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (newOption.value === "USD" && select.id === "From") {
      newOption.selected = "selected";
    } else if (newOption.value === "PKR" && select.id === "To") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    let newCurr = event.target.value;
    if (select.id === "From") {
      flagFrom.src = `https://flagsapi.com/${countryList[newCurr]}/flat/64.png`;
    } else if (select.id === "To") {
      flagTo.src = `https://flagsapi.com/${countryList[newCurr]}/flat/64.png`;
    }
  });
}

const updateExchangeRate = async () => {
  let amount = input_amt.value;
  if(amount === "" || amount < 1){
    amount = 1;
    input_amt.value = "1";
  }
   const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let final_amount = amount * rate;

   newMsg.innerText = `${amount}${fromCurr.value} = ${final_amount}${toCurr.value}`;
} 

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
   input_amt.value = "1";
   updateExchangeRate();
})
