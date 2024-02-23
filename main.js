import { menuArray } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const  foodsContainer = document.querySelector(".sec3-container")
const orderContainer = document.querySelector(".orders-container")
let sum = 0
let orders = []
// const order = document.querySelector(".order")
dataRender()
function dataRender(){
    menuArray.forEach(function(obj){
        // const aboutFoods = 
        
        foodsContainer.innerHTML += `
         <div class="foods-container">
                <div>
                    <img src="${obj.image}" class="foods-imgs">
                </div>
                <div>
                    <div>
                        <h3 class="price">$${obj.price}</h3>
                        <small>320.99</small>
                    </div>
                    <div>
                        <p class="description">
                          ${obj.descritpion}
                        </p>           
                    </div>
                    <div class="food-button">
                        <button class="" data-order="${obj.id}">Order Now</button>
                        <button class="show-details" data-show="${obj.id}">show Details </button>
                    </div>
                </div>
           </div>
        
        `
    })
}

document.addEventListener("click",(e)=> {
    if (e.target.dataset.order) {
        orderList(Number(e.target.dataset.order))
    } else if (e.target.dataset.remove) {
        const orderId = e.target.closest(".orders").id;
        removeOrder(orderId,e.target.dataset.remove)
    }
})

function orderList(orderId){
      orders= menuArray.filter(order=>{
        return order.id === orderId
    })

    rednerOrderData(orders)
}
let fuck = 0
function rednerOrderData(orders){
    orders.forEach(order=>{
         fuck = order.price
        orderContainer.innerHTML +=`
        <div class="orders" id="${uuidv4()}">
            <div class="order">
                <h1>${order.name}</h1>
                <button data-remove="${order.id}">remove</button>
            </div>
            <div>
            <h1>$${order.price}</h1>
            </div>
        </div>
    `     
    })
    calculatePrice(fuck)
    
}


function calculatePrice(price){
    sum +=price
    document.querySelector(".total-price").innerHTML = sum
}
function removeOrder(orderId, id) {
    const removedOrder = menuArray.find(order => order.id === Number(id))
    if (removedOrder) {
        sum -= removedOrder.price;
        document.querySelector(".total-price").innerHTML = sum
        const orderElement = document.getElementById(orderId)
        if (orderElement) {
            orderElement.remove()
        }
    }
}

// booking table

const book_now = document.querySelector(".booking")
book_now.addEventListener("submit",(e)=>{
    e.preventDefault()
    const data = new FormData(book_now)
    console.log(data.table,data.date,data.time)
    book_now.innerHTML = `
        <p>thanks you have resrvide table <b>${data.get("table")}</b>  for <b>${data.get("date")}</b> 
         on <b>${data.get("time")}</b></p>
    `

   
})


const completeBtn = document.querySelector(".complete-btn button");
const body = document.querySelector("main");
const header = document.querySelector("header");
const pay = document.querySelector(".section5-form")
const message = document.querySelector(".section5-form h1")

completeBtn.addEventListener("click", () => {
    if(sum !==0 ){
        body.style.opacity = "0.1"
        header.style.filter = "blur(5px)"
        body.style.pointerEvents ="none"
        pay.style.display = "block"
        
    }
 
});

const pay_form = document.querySelector(".form")
pay_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const payFormData = new FormData(pay_form)
    message.innerHTML = `Thanks ${payFormData.get("name")}, Your orders are in the way`
    pay_form.innerHTML = ` <button  class="go-back money-to-pay ">X</button>`
    const go_back = document.querySelector(".go-back")
    go_back.addEventListener("click",()=> location.reload() )
})




