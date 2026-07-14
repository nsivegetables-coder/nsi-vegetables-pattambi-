import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

loadProducts();

window.addProduct = async function(){

const name = document.getElementById("name").value;
const price = Number(document.getElementById("price").value);
const image = document.getElementById("image").value;

if(name=="" || price<=0){
alert("Product Name & Price Required");
return;
}

await addDoc(collection(db,"Product"),{

name:name,
price:price,
image:image

});

alert("Product Added");

location.reload();

}

async function loadProducts(){

const snap = await getDocs(collection(db,"Product"));

let html="";

snap.forEach(d=>{

const p=d.data();

html += `
<div style="background:#fff;padding:10px;margin:10px;border-radius:8px">
<b>${p.name}</b><br>
₹${p.price}<br><br>

<button onclick="removeProduct('${d.id}')">
Delete
</button>

</div>
`;

});

document.getElementById("products").innerHTML=html;

}

window.removeProduct = async function(id){

await deleteDoc(doc(db,"Product",id));

location.reload();

}
