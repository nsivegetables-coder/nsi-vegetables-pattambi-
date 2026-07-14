                                                                                             import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

                                                                                             import { 
                                                                                             getFirestore,
                                                                                             collection,
                                                                                             getDocs
                                                                                             } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


                                                                                             const firebaseConfig = {

                                                                                             apiKey: "AIzaSyCDmpUtw_20a_yw7IqJ3wk4c01Eza7Qbu0",

                                                                                             authDomain: "nsi-vegetables-pattambi.firebaseapp.com",

                                                                                             projectId: "nsi-vegetables-pattambi",

                                                                                             storageBucket: "nsi-vegetables-pattambi.firebasestorage.app",

                                                                                             messagingSenderId: "469228079994",

                                                                                             appId: "1:469228079994:web:80af23d2126cb66a63e4c3"

                                                                                             };


                                                                                             const app = initializeApp(firebaseConfig);

                                                                                             const db = getFirestore(app);


                                                                                             const whatsapp = "917593925926";


                                                                                             let products = [];


                                                                                             // Firebase load

                                                                                             getProducts();


                                                                                             async function getProducts(){

                                                                                             try{


                                                                                             const snap = await getDocs(collection(db,"products"));


                                                                                             console.log("Total products:", snap.size);


                                                                                             products = [];


                                                                                             snap.forEach((doc)=>{


                                                                                             console.log(doc.data());


                                                                                             products.push({

                                                                                             id: doc.id,

                                                                                             name: doc.data().name,

                                                                                             price: Number(doc.data().price),

                                                                                             qty:0

                                                                                             });


                                                                                             });


                                                                                             showProducts();


                                                                                             }

                                                                                             catch(error){

                                                                                             console.log(error);

                                                                                             alert("Firebase Error : "+error.message);

                                                                                             }


                                                                                             }



                                                                                             // kg / gram display

                                                                                             function qtyText(q){

                                                                                             if(q==0){

                                                                                             return "0";

                                                                                             }


                                                                                             if(q<1){

                                                                                             return (q*1000)+"g";

                                                                                             }


                                                                                             return q+"kg";

                                                                                             }



                                                                                             // show products

                                                                                             function showProducts(){


                                                                                             let html="";


                                                                                             products.forEach((p,i)=>{


                                                                                             html += `

                                                                                             <div class="card">

                                                                                             <div>

                                                                                             <b>${p.name}</b><br>

                                                                                             <span style="color:green;font-size:20px">

                                                                                             ₹${p.price}/kg

                                                                                             </span>

                                                                                             </div>


                                                                                             <div>


                                                                                             <button onclick="change(${i},-1)">-</button>


                                                                                             <b style="padding:0 10px">

                                                                                             ${qtyText(p.qty)}

                                                                                             </b>


                                                                                             <button onclick="change(${i},1)">+</button>


                                                                                             </div>


                                                                                             </div>

                                                                                             `;


                                                                                             });


                                                                                             document.getElementById("products").innerHTML=html;


                                                                                             updateCart();


                                                                                             }




                                                                                             window.change=function(i,v){


                                                                                             products[i].qty += 0.25*v;


                                                                                             if(products[i].qty < 0){

                                                                                             products[i].qty=0;

                                                                                             }


                                                                                             if(products[i].qty > 10){

                                                                                             products[i].qty=10;

                                                                                             }


                                                                                             products[i].qty = Number(products[i].qty.toFixed(2));


                                                                                             showProducts();


                                                                                             }





                                                                                             function updateCart(){


                                                                                             let html="";

                                                                                             let total=0;


                                                                                             products.forEach(p=>{


                                                                                             if(p.qty>0){


                                                                                             html += `${p.name} - ${qtyText(p.qty)}<br>`;


                                                                                             total += p.qty*p.price;


                                                                                             }


                                                                                             });


                                                                                             document.getElementById("cartItems").innerHTML = html || "Cart Empty";


                                                                                             document.getElementById("total").innerHTML = total.toFixed(2);


                                                                                             }





                                                                                             window.sendOrder=function(){


                                                                                             let msg="*🥬 NSI VEGETABLES ORDER*%0A%0A";


                                                                                             products.forEach(p=>{


                                                                                             if(p.qty>0){


                                                                                             msg += `${p.name} - ${qtyText(p.qty)}%0A`;


                                                                                             }


                                                                                             });


                                                                                             msg += `%0ATotal ₹${document.getElementById("total").innerHTML}`;


                                                                                             msg += `%0AName : ${document.getElementById("name").value}`;

                                                                                             msg += `%0APhone : ${document.getElementById("phone").value}`;

                                                                                             msg += `%0AAddress : ${document.getElementById("address").value}`;



                                                                                             window.open(
                                                                                             `https://wa.me/${whatsapp}?text=${msg}`
                                                                                             );


                                                                                             }