const state = {
    earnigs: 0,
    expense: 0,
    net: 0,
    transactions: [
        
    ],
};
let isUpdate = false;
let transId;


const TransFormEle = document.getElementById("TransForm");
const renderTransaction = () => {
    const transContainerEl = document.querySelector(".transA");
    const netAmountEl = document.getElementById('netAmount');
    const earningEl = document.getElementById("earning");
    const expenseEl = document.getElementById('expense');

    const transactions = state.transactions;

    let earning = 0;
    let expense = 0;
    let net = 0;

    transContainerEl.innerHTML = "";
    transactions.forEach((transaction) => {
        const { id, amount, text, type } = transaction;
        const isCredit = type === "credit" ? true : false;
        const sign = isCredit ? "+" : "-";

        const transactionEl =
        `<div class="trans" id="${id}">
            <div class="content" onclick="showEdit(${id})">
                <div class="left">
               <p>${text}</p>
               <p>${sign} ₹ ${amount}</p>
            </div>
            <div class="sts ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>
            </div>
            <div class="lower">
                <div class="icon" onclick="handleUpdate(${id})">
                    <img src="./icons/pen.svg"alt="pen"/>
                </div>
                <div class="icon" onclick="handleDelete(${id})">
                    <img src="./icons/trash.svg"alt="trash"/>
                </div>
            </div>
        </div>`;

        earning += isCredit ? amount : 0;
        expense += !isCredit ? amount : 0;
        net = earning - expense;

        transContainerEl.insertAdjacentHTML('afterbegin', transactionEl);
    })
    netAmountEl.innerHTML = `₹ ${net}`;
    earningEl.innerHTML = `₹ ${earning}`;
    expenseEl.innerHTML = `₹ ${expense}`;
};


const addTrans = (e) => {
    e.preventDefault();

    const isEarn = e.submitter.id === 'earnBtn' ? true : false;
    const formData = new FormData(TransFormEle);
    const tData = {};

    formData.forEach((value, key) => {
        tData[key] = value;
    });
    


    const { text, amount } = tData;

    const transaction = {
        id: isUpdate ? transId : Math.floor(Math.random() * 1000),
        text: text,
        amount: +amount,
        type: isEarn ? "credit" : "debit",
    };

    if (isUpdate) {

        const transIndex = state.transactions.findIndex((t) => t.id === transId);
        state.transactions[transIndex] = transaction;
        isUpdate = false;
        transId = null;
        
    } else {
        state.transactions.push(transaction);
    }
    renderTransaction()


    console.log({ state });
};
const showEdit = (id) => {
    const selectedTrans = document.getElementById(id);
    const lowerEl = selectedTrans.querySelector(".lower");

    lowerEl.classList.toggle('showTransaction')
};
const handleUpdate = (id) => {
    const trans = state.transactions.find((t) => t.id === id);
    const { text, amount } = trans;
    const textInput = document.getElementById("text");
    const amountInput = document.getElementById("amount");
    textInput.value = text;
    amountInput.value = amount;
    transId = id;
    isUpdate = true;
    
}
const handleDelete = (id) => {

    const filteredTrans = state.transactions.filter(t => t.id !== id);
    state.transactions = filteredTrans;
    renderTransaction()
    
}
renderTransaction()
TransFormEle.addEventListener("submit", addTrans)

