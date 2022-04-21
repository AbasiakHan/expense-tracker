const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Brushcutter rope", amount: -4000 },
//   { id: 2, text: "ID Cards", amount: -4000 },
//   { id: 3, text: "Brushcutter Plug", amount: -1000 },
//   { id: 4, text: "Funding", amount: 6500 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') != null ? localStorageTransactions : [];

// ADD TRANSACTION
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } 
  else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";

    amount.value = "";
  }
}

// GENERATE RANDOM ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// ADD TRANSACTIONS TO DOM LIST
function addTransactionDOM(transaction) {
  // GET SIGN
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

// ADD CLASS BASED ON VALUE
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  
  `;

  list.appendChild(item);
}

// UPDATE BALAMCE, INCOME AND EXPENSE
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  console.log(amounts)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `₦${(new Intl.NumberFormat('en-US').format(total))}`;
  money_plus.innerText = `₦${(new Intl.NumberFormat('en-US').format(income))}`;
  money_minus.innerText = `₦${(new Intl.NumberFormat('en-US').format(expense))}`;
}

// REMOVE TRANSACTION BY ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// UPDATE LOCAL STORAGE TRANSACTIONS
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// INIT APP
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
