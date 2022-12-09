 //get elements
 var title = document.getElementById('title');
var price = document.getElementById('price') ;
var ads = document.getElementById('ads') ;
var taxs = document.getElementById('taxs') ;
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var creat = document.getElementById('creat');
var mood ='creat' 
var tem ;
// console.log(title,price,ads,taxs,discount,total,count,category,creat)
//get total
function getTotal()
{
    if(price.value!="")
        {
            var reselt = ( +price.value + +ads.value+ +taxs.value)- +discount.value
            total.innerHTML= reselt;
            total.style.backgroundColor='#040'
        }else
            {
                total.innerHTML = '';
                total.style.backgroundColor ='#a00d02';
            }
}
                                 //creat product
var dataProducts ;
if(localStorage.myProducts !=null){
    dataProducts =JSON.parse(localStorage.myProducts);
  }else{
        dataProducts = [];
       }
creat.onclick = function(){
    var products ={
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxs:taxs.value,
        discount:discount.value,
        category:category.value.toLowerCase(),
        count:count.value,
        total:total.innerHTML
    }
    if (title.value!=""
    &&price.value!=''
    &&category.value!=''){
        if(mood ==='creat'){
            if(products.count>1){
                for( var i=0 ;i<products.count ;i++){
                    dataProducts.push(products)
                }
        }else{
                    dataProducts.push(products)
        }
        // cleardata();
        }else{
            dataProducts[tem]=products;
            mood='creat';
            creat.innerHTML= 'creat';
            count.style.display= 'block'
        }
        cleardata();
    }
    
   
    
    localStorage.setItem('myProducts',JSON.stringify(dataProducts));
    
    showData();
}
                                  //clear inputs
function cleardata(){
   title.value ='';
   ads.value ='';
   discount.value ='';
   taxs.value ='';
   category.value ='';
   count.value ='';
   price.value ='';
   total.innerHTML ='';
}
                                        //read 
function showData()
{
    getTotal();
    var table =''
for(i=0;i<dataProducts.length;i++){
   table += 
   `<tr>
   <td>${i+1}</td>
   <td>${dataProducts[i].title}</td>
   <td>${dataProducts[i].price}</td>
   <td>${dataProducts[i].taxs}</td>
   <td>${dataProducts[i].ads}</td>
   <td>${dataProducts[i].discount}</td>
   <td>${dataProducts[i].total}</td>
   <td>${dataProducts[i].category}</td>
   <td><button id='update' onclick="updateData(${i})">UPDATE</button></td>
   <td><button id='delet'   onclick="deletDate(${i})">DELET</button></td>
</tr>`
  }
   document.getElementById('tbody').innerHTML =table;
   var btnDeletAll=document.getElementById('deletall');
   if(dataProducts.length>0){
        btnDeletAll.innerHTML =`<button onclick="deletAll()">DELET All (${dataProducts.length})</button>`
   }else{
    btnDeletAll.innerHTML ='';
   }
}
showData()
                                      //delet
function deletDate(i)
{
        dataProducts.splice(i,1);
        localStorage.myProducts = JSON.stringify(dataProducts)
        showData();
}
                                  //delet all
function deletAll(){
    localStorage.clear();
    dataProducts.splice(0);
    showData();
}
                                    //Update
function updateData(i){
title.value =dataProducts[i].title;
price.value =dataProducts[i].price;
ads.value =dataProducts[i].ads;
discount.value =dataProducts[i].discount;
// count.value =dataProducts[i].count;
category.value =dataProducts[i].category;
taxs.value =dataProducts[i].taxs;
count.style.display='none';
creat.innerHTML = 'UPDATE'
getTotal();
mood = 'update';
tem= i;
scroll({
    top:0,
    behavior:'smooth'
})
}
                                   //search
var searchMood = 'title'    
function getSearch(id)
{
    var search = document.getElementById('search');
if(id=='searchTitle'){
    searchMood='title';
    search.placeholder = 'SEARCH BY TITLE'
}else{
    searchMood='category';
    search.placeholder= 'SEARCH BY CATEGORY'
}
//لتسهيل الكود 
//    search.placeholder= 'SEARCH BY'+searchMood;
search.focus()
search.value ='';
showData();
}
function searchData(value)
{
    var table ='';
    if(searchMood=='title')
    {
        for(var i=0 ; i<dataProducts.length;i++){
             if(dataProducts[i].title.includes(value.toLowerCase())){
                table += 
                `<tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxs}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button id='update' onclick="updateData(${i})">UPDATE</button></td>
                <td><button id='delet'   onclick="deletDate(${i})">DELET</button></td>
                </tr>`
              }
        }
    }else{
        for(var i=0 ; i<dataProducts.length;i++){
            if(dataProducts[i].category.includes(value.toLowerCase())){
               table += 
               `<tr>
               <td>${i}</td>
               <td>${dataProducts[i].title}</td>
               <td>${dataProducts[i].price}</td>
               <td>${dataProducts[i].taxs}</td>
               <td>${dataProducts[i].ads}</td>
               <td>${dataProducts[i].discount}</td>
               <td>${dataProducts[i].total}</td>
               <td>${dataProducts[i].category}</td>
               <td><button id='update' onclick="updateData(${i})">UPDATE</button></td>
               <td><button id='delet'   onclick="deletDate(${i})">DELET</button></td>
               </tr>`
             }
       }
    }
    document.getElementById('tbody').innerHTML =table;

}                        
//clean data
