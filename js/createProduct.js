let openEditor;

// showing products on all-products page 
const createProduct = (data) =>{

    openEditor = () =>{
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = `/allProducts/${data.id}`;
        console.log(location.href)

    }



    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
        <div class="product-card">
            <div class="product-image">
                ${data.draft ? `<span class="tag">draft</span> `: ''}
                <img src="img/card-images/3.jpg" alt="" class="product-thumb">
                <button class ="card-action-btn edit-btn" onclick= "openEditor()"><img src="img/edit.png" alt="" class="src"></button>
                <button class ="card-action-btn open-btn" onclick = "location.href = '/${data.id}'"><img src="img/open.png" alt="" class="src"></button>
                <button class ="card-action-btn delete-popup-btn" onclick = "openDeletePopup('${data.id}') " ><img src="img/delete.png" alt="" class="src"></button>
            </div>
            <div class="product-info">
                <h2 class="product-brand">${data.name}</h2>
                <p class="product-short-des">${data.shortDes}</p>
                <span class="price">${data.sellPrice}</span>
                <span class="actual-price">${data.actualprice}</span>
            </div>
      </div>    
    
    `;
}

const openDeletePopup = (id) =>{
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () =>{
        deleteAlert.style.display = null;
    })

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () =>{ 
        deleteItem(id);
    })
}

const deleteItem = (id) =>{
    console.log(id);
    fetch('/delete-product', {
        method : 'post',
        headers : new Headers({"Content-Type" : "application/json"}),
        body : JSON.stringify({id : id })
    })
    .then(res=> res.json())
    .then(data => {
        if (data == 'success'){
            location.reload();
        }else{
            showAlert('Some error occured while deleting the product.Try again.')

        }
    })
}