const sheetURL = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

const whatsapp = "917593925926";

let products = [];

async function loadProducts(){

const res = await fetch(sheetURL);

products = await res.json();

products.forEach(p=>{

p.qty=0;

});

showProducts();

}

loadProducts();

function qtyText(q){

if(q==0) return "0";

if(q<1) return (q*1000)+"g";

return q+"kg";

} 
function showProducts(){

    let html="";

    products.forEach((p,i)=>{

    html += `

    <div class="product">

    <div>

    <h3>${p.name}</h3>

    <div class="old">

    ₹${p["regular price"]}

    </div>

    <div class="new">

    ₹${p["offer price"]}/kg

    </div>

    </div>

    <div>

    <button onclick="changeQty(${i},-1)">-</button>

    <b style="padding:10px">

    ${qtyText(p.qty)}

    </b>

    <button onclick="changeQty(${i},1)">+</button>

    </div>

    </div>

    `;

    });

    document.getElementById("products").innerHTML=html;

    updateCart();

    } 
} 
function changeQty(i,v){

    products[i].qty += 0.25 * v;

    if(products[i].qty < 0){
    products[i].qty = 0;
    }

    if(products[i].qty > 10){
    products[i].qty = 10;
    }

    products[i].qty = Number(products[i].qty.toFixed(2));

    showProducts();

    }

    function updateCart(){

    let html = "";

    let total = 0;

    products.forEach(p=>{

    if(p.qty>0){

    html += `${p.name} - ${qtyText(p.qty)}<br>`;

    total += p.qty * Number(p["offer price"]);

    }

    });

    document.getElementById("cartItems").innerHTML =
    html || "Cart Empty";

    document.getElementById("total").innerHTML =
    total.toFixed(2);

    }

    function sendOrder(){

    let msg="*🥬 NSI VEGETABLES ORDER*%0A%0A";

    products.forEach(p=>{

    if(p.qty>0){

    msg += `${p.name} - ${qtyText(p.qty)} - ₹${Number(p["offer price"])*p.qty}%0A`;

    }

    });

    msg += `%0A💰 Total : ₹${document.getElementById("total").innerHTML}`;

    msg += `%0A%0A👤 Name : ${document.getElementById("name").value}`;

    msg += `%0A📞 Phone : ${document.getElementById("phone").value}`;

    msg += `%0A📍 Address : ${document.getElementById("address").value}`;

    window.open(`https://wa.me/${whatsapp}?text=${msg}`);

    }
}