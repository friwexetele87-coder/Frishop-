let products = JSON.parse(localStorage.getItem("products")) || [
{
name:"Mini Mixeur Pro",
price:10000,
desc:"Mixez partout facilement",
img:"https://via.placeholder.com/300"
}
];

let selectedProduct=null;
let currentNumber="";

/* ===== LOAD ===== */
function loadProducts(){
let box=document.getElementById("products");
box.innerHTML="";

products.forEach((p,i)=>{
box.innerHTML+=`
<div class="card" onclick="openProduct(${i})">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>${p.desc}</p>
<p class="price">${p.price} FCFA</p>
</div>`;
});
}

/* ===== OPEN ===== */
function openProduct(i){

selectedProduct=products[i];

document.getElementById("modal").style.display="flex";

document.getElementById("pTitle").innerText=selectedProduct.name;
document.getElementById("pDesc").innerText=selectedProduct.desc;
document.getElementById("pPrice").innerText=selectedProduct.price+" FCFA";

document.getElementById("stock").innerText=Math.floor(Math.random()*10)+1;
document.getElementById("viewers").innerText=Math.floor(Math.random()*20)+5;

/* AVIS PRO */
let names=["Junior M.","Brenda K.","Samuel T.","Aline F.","Kevin N.","Chris B."];
let cities=["Douala","Yaoundé","Abidjan","Dakar"];
let comments=[
"Incroyable 😍","Top qualité","Je recommande",
"Livraison rapide","Très satisfait","5 étoiles"
];

let r=document.getElementById("reviews");
r.innerHTML="";

for(let i=0;i<20;i++){
let name=names[Math.floor(Math.random()*names.length)];
let city=cities[Math.floor(Math.random()*cities.length)];
let comment=comments[Math.floor(Math.random()*comments.length)];
let days=Math.floor(Math.random()*5)+1;

r.innerHTML+=`
<div class="review">
<b>${name}</b> - ${city}<br>
<small>✔ Achat vérifié • il y a ${days} jour(s)</small><br>
${comment}
</div>`;
}
}

/* ===== PAIEMENT ===== */
function choosePayment(){

let method=prompt("1- Orange Money\n2- MTN MoMo\n3- M-Pesa");

if(method=="1"){
currentNumber="23767686570476";
}
else if(method=="2"){
currentNumber="237676874727";
}
else if(method=="3"){
currentNumber="TON NUMERO MPESA";
}
else{
alert("Erreur");
return;
}

document.getElementById("paySection").style.display="block";
document.getElementById("payNumber").innerText="Paiement sur: "+currentNumber;

}

/* ===== CONFIRMATION ===== */
function confirmPayment(){

let msg=`🛒 COMMANDE PAYÉE

Produit: ${selectedProduct.name}
Prix: ${selectedProduct.price} FCFA
Numéro: ${currentNumber}`;

window.open("https://wa.me/237657556756?text="+encodeURIComponent(msg));

let orders=localStorage.getItem("orders")||0;
let revenue=localStorage.getItem("revenue")||0;

orders++;
revenue=parseInt(revenue)+parseInt(selectedProduct.price);

localStorage.setItem("orders",orders);
localStorage.setItem("revenue",revenue);

alert("Commande envoyée");
}

/* ===== LIVE SALES ===== */
let live=document.getElementById("liveSale");
let names=["Kevin","Brenda","Junior","Chris"];
let cities=["Douala","Yaoundé","Dakar"];

setInterval(()=>{
let n=names[Math.floor(Math.random()*names.length)];
let c=cities[Math.floor(Math.random()*cities.length)];
live.innerText=`🔥 ${n} de ${c} vient d’acheter`;
},4000);

/* ===== ADMIN ===== */
document.addEventListener("keydown",function(e){
if(e.key==="A"){
let pass=prompt("Mot de passe");
if(pass=="1234"){
let orders=localStorage.getItem("orders")||0;
let revenue=localStorage.getItem("revenue")||0;
alert("Commandes: "+orders+" | Revenus: "+revenue+" FCFA");
}
}
});

/* INIT */
loadProducts();
