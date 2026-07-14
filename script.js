const phone = "917593925926";

let products = [];
let cart = [];

fetch("products.json")
.then(res => res.json())
.then(data => {
    products = data;
        products.forEach(p => p.qty = 0);
            showProducts();
            });

            function qtyText(q){
                if(q === 0) return "0";
                    if(q < 1) return (q * 1000) + "g";
                        return q + "kg";
                        }

                        function showProducts(){

                            let html = "";

                                products.forEach((p,i)=>{

                                        html += `
                                                <div class="card">

                                                            <div>

                                                                            <div class="name">${p.name}</div>

                                                                                            <div class="regular">₹${p.regular}</div>

                                                                                                            <div class="offer">₹${p.offer}/kg</div>

                                                                                                                        </div>

                                                                                                                                    <div class="qty">

                                                                                                                                                    <button onclick="change(${i},-1)">-</button>

                                                                                                                                                                    <b>${qtyText(p.qty)}</b>

                                                                                                                                                                                    <button onclick="change(${i},1)">+</button>

                                                                                                                                                                                                </div>

                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                `;

                                                                                                                                                                                                                    });

                                                                                                                                                                                                                        document.getElementById("products").innerHTML = html;

                                                                                                                                                                                                                            updateCart();

                                                                                                                                                                                                                            }
function change(i,v){

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

                                                                    if(p.qty > 0){

                                                                                html += `${p.name} - ${qtyText(p.qty)}<br>`;

                                                                                            total += p.qty * p.offer;

                                                                                                    }

                                                                                                        });

                                                                                                            document.getElementById("cartItems").innerHTML =
                                                                                                                    html || "Cart Empty";

                                                                                                                        document.getElementById("total").innerHTML =
                                                                                                                                total.toFixed(2);

                                                                                                                                }
function sendOrder(){

        let msg = "*🥬 NSI VEGETABLES ORDER*%0A%0A";

            let total = 0;

                products.forEach(p=>{

                        if(p.qty > 0){

                                    msg += `${p.name} - ${qtyText(p.qty)} - ₹${(p.qty * p.offer).toFixed(2)}%0A`;

                                                total += p.qty * p.offer;

                                                        }

                                                            });

                                                                if(total === 0){
                                                                        alert("Please add at least one product.");
                                                                                return;
                                                                                    }

                                                                                        msg += `%0A💰 Total : ₹${total.toFixed(2)}`;

                                                                                            msg += `%0A%0A👤 Name : ${document.getElementById("name").value}`;

                                                                                                msg += `%0A📞 Phone : ${document.getElementById("phone").value}`;

                                                                                                    msg += `%0A🏠 Address : ${document.getElementById("address").value}`;

                                                                                                        window.open(
                                                                                                                `https://wa.me/${phone}?text=${msg}`,
                                                                                                                        "_blank"
                                                                                                                            );

                                                                                                                            }
}}