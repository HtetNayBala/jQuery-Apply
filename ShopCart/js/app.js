
//product Array
let productArr = [];

//Show products
function toShow(x){
    $('.product-box').empty();
    x.map(function(el){
        $('.product-box').append(`
            <div class="d-inline-block">
                <div class="card">
                    <img src="${el.image}" alt="">
                    <div class="card-body border border-1 pt-5" id="product-cb">
                        <h4 class="product-title text-nowrap overflow-hidden text-primary">${el.title}</h4>
                        <p class="product-para">${cutWords(el.description)}</p>
                        <div class="border border-1 mb-2"></div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="product-price">${el.price} $</div>
                            <div class="btn btn-outline-primary btn-sm cart-show-btn" custom-id="${el.id}">
                                <i class="fa-solid fa-cart-arrow-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
    })

};

 //Cart Show
 $('.product-box').delegate('.cart-show-btn','click',function(){
        let showBtnId = $(this).attr('custom-id');
        let catchProduct = productArr.filter(el=>el.id==showBtnId)[0];
        let cartId = $('.cart-leader').toArray().map(el=>el.getAttribute('cart-id'));
        
        //no to repeat Cart
        if(cartId.includes(showBtnId)){
            alert("Already Added!");
        }else{
            $('.cart-box').append(`
            <div class="cart-leader mb-3" cart-id="${showBtnId}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <img src="${catchProduct.image}" alt="">
                <button class="btn btn-outline-danger btn-sm del-btn">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="mb-2">
                <p class="mb-0">${catchProduct.title}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2 cart-btns-box">
                <div class="d-flex">
                    <button class="btn btn-outline-primary cart-minus-btn">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="form-control w-25 mx-1 input-value" value="1" min="1" input-value="${catchProduct.price}">
                    <button class="btn btn-outline-primary cart-plus-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div>$ <span class="cart-product-price">${Number(catchProduct.price).toFixed(2)}</span> </div>
            </div>
            <div class="divider"></div>
        </div>`)
        }
       
        totalPrice();

 });

//show Total Price of Chosen Total order products
function totalPrice(){
    let cartProductPriceLength = $('.cart-product-price').length;
    $('.total-order').html(cartProductPriceLength);

    if(cartProductPriceLength>0){
        let cartPrice = $('.cart-product-price').toArray().map(function(el){return el.innerHTML});
        let cartPriceTotal = cartPrice.reduce(function(x,y){
            return Number(x)+Number(y);
        });
    
        $('.total-box').html(`<div class="d-flex justify-content-between align-items-center">
            <div>
                <h4>Total</h4>
            </div>
            <h4>$ <span id="total-price">${Number(cartPriceTotal).toFixed(2)}</span></h4>
        </div>`)
    }else{
        $('.total-box').html("Choose Something!")
    };
   
};

//cart-plus-btn
$('.cart-box').delegate('.cart-plus-btn','click',function(){
    let inputVal = $(this).siblings('.input-value').val();
    let plusOne = Number(inputVal)+1;

    let plusInputVal = $(this).siblings('.input-value').val(plusOne).val();
    let inputPrice = $(this).siblings('.input-value').attr('input-value');

    let cartProductPrice = $(this).parent().siblings().find('.cart-product-price');
    let result = plusInputVal*inputPrice;
    cartProductPrice.html(result.toFixed(2));
    totalPrice();
});

//cart-minus-btn
$('.cart-box').delegate('.cart-minus-btn','click',function(){
  
        if($(this).siblings('.input-value').val()>1){
            let inputVal = $(this).siblings('.input-value').val();
            let plusOne = Number(inputVal)-1;
        
            let plusInputVal = $(this).siblings('.input-value').val(plusOne).val();
            let inputPrice = $(this).siblings('.input-value').attr('input-value');
        
            let cartProductPrice = $(this).parent().siblings().find('.cart-product-price');
            let result = plusInputVal*inputPrice;
            cartProductPrice.html(result.toFixed(2));
        }else{
            alert("At least must be one!")
        }
    
    totalPrice();
})


//cart delete btn working
$('.cart-box').delegate('.del-btn','click',function(){
    let want = $(this).parentsUntil('.cart-box').remove();
    totalPrice();
});

//Add Products
$.get('https://fakestoreapi.com/products',product=>{
    productArr = product;
    toShow(productArr);
});

//input with filter to show
$('#product-input').on('keyup',function(){
    let inputVal = $(this).val().toLowerCase().trim();
    let filterProduct = productArr.filter(function(el){
        let filterTitle = el.title.toLowerCase().indexOf(inputVal);
        let filterDescription = el.description.toLowerCase().indexOf(inputVal);
        let filterPrice = el.price;

        if(filterTitle>-1 || filterDescription>-1 || filterPrice == inputVal){
            return el;
        }
    });
    toShow(filterProduct);
});

//category with filter to show
$('#category-select').on('change',function(){
    let categorySelect = $(this).val();
    let filterCategory = productArr.filter(function(el){
        let elCat = el.category;
        if(categorySelect == elCat){
            return el;
        }
    });
    toShow(filterCategory);

    if(categorySelect == 0){
        toShow(productArr);
    }
});

//Add Categories
$.get('https://fakestoreapi.com/products/categories',(category)=>{
    category.map(function(el){
        $('#category-select').append(`
            <option value="${el}">${el}</option>
        `);
    }); 
});


//words cut to beautify
function cutWords(x,y=150){
    let xLength = x.length;
    if(xLength<y){
        return x;
    }else{
        let cutWords = x.substring(0,y);
        return cutWords;
    }
}



