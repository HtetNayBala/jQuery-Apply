//Main UI Products Show
function toShow(x){
    $('#card-box').empty();
    x.map(function(product){
        $('#card-box').append(            
            `<div class="d-inline-block">
            <div class="card border-0 me-1 mt-2 product-show-card" style="border:'none'" data-id='${product.id}'>
                        <img src="${product.image}" alt="" style="height: 200px;width: 200px;margin-bottom:-40px;margin-left:10px;z-index:1">
                        <div class="card-body border pt-5 pb-0">
                            <h4 class="header text-primary text-nowrap overflow-hidden">${product.title}</h4>
                            <p class="para">${toCut(product.description)}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <div class="text-primary">${Number(product.price).toFixed(2)}$</div>
                            <button class="btn btn-outline-primary cart-show-btn" data-id="${product.id}">
                                <i class="fa-solid fa-cart-arrow-down"></i>
                            </button>
                        </div>
            </div>
            </div>`
        )
    })
};

//to store products
let productArr = [];

let productInfo = productData;

//show Products 
productArr=productInfo;
toShow(productArr);


//cutting text from description
function toCut(x,y=150){
    if(x.length<=y){
        return x;
    }else{
       return x.substring(1,y);
    }
};

$('input').on('keyup',function(){
    let inputVal = $(this).val();
    if(inputVal.trim().length){
        let filterProduct = productArr.filter((element)=>{
            if(element.title.toLowerCase().indexOf(inputVal)>-1 || element.description.toLowerCase().indexOf(inputVal)>-1 || element.price == inputVal){
                return element;
            }
        });
        toShow(filterProduct);
    };
});

//add category data
let categoryInfo = categoryData;
    categoryInfo.map((cat)=>{
        $('#select').append(`<option value="${cat}">${cat}</option>`)
    })



//show products by <select option>
$('#select').change(function(){
    let optionVal = $(this).val();
   
    let productCategory = productArr.filter(function(element){
        if(element.category == optionVal){
            return element;
        };
    });
    toShow(productCategory);

    if(optionVal==0){
        toShow(productArr);
    };
    
});

//Total Cart Show
function cartTotal(){

    let priceLength = $('.cart-price').length;
     $('.shopping-cart-count').html(priceLength);

    let cartTotal = $('.cart-price').toArray().map(el=>el.innerHTML);

    //After delete every cart, show this
    if(cartTotal.length>0){
        let total = cartTotal.reduce((x,y)=>Number(x)+Number(y));
        $('.total-box').html(
            `<div class="d-flex justify-content-between align-items-center px-2">
                <h4>Total</h4>
                <h4 class="total-cost">${Number(total).toFixed(2)}</h4>
            </div>`
            );
    }else{
        $('.total-box').html("Choose something!")
    }
            
};

$('#card-box').delegate(
    $('.cart-show-btn').on('click',function(){
    let btnId = $(this).attr('data-id');
    let productId = productArr.filter(el=>el.id==btnId)[0];
    let productPrice = productId.price;
    showCart(btnId);

    $('.cart').append(`
        <div class="cart-child card p-1 border border-0 border-bottom mb-1" custom-id="${productId.id}">
            <div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div>
                        <img src="${productId.image}" alt="" style="height:50px">
                        <p>${productId.title}</p>
                    </div>
                    <div>
                        <button class="btn btn-outline-danger btn-sm del-btn">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <div class="form-row d-flex">
                        <button class="btn btn-outline-primary quantity-minus">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="form-control w-25 mx-1 quantity p-1" value="1" min="1" unitPrice="${productPrice}">
                        <button class="btn btn-outline-primary quantity-plus">  
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <p class="mb-0">
                        $ <span class="cart-price">${productPrice}</span>
                    </p>
                </div>
            </div>
    </div>`);


    cartTotal();
     //Delete cart Item
    $('.cart').delegate( $('.del-btn').on('click',function(){
        $(this).parentsUntil('.cart').remove();
        cartTotal();
   
    })   
    );
    
    $('.cart').delegate($('.quantity-plus').on('click',function(){
        let quantityVal = $(this).siblings('.quantity').val();
        let p = Number(quantityVal)+1;
        
        let unitPrice = $(this).siblings('.quantity').attr('unitPrice');
        let cartPrice = $(this).parent().parent().siblings('div').find('.cart-price');
    
        let qPlusVal = $(this).siblings('.quantity').val(p).val();
        cartPrice.html(qPlusVal*unitPrice);

        cartTotal();
    }));

    $('.cart').delegate($('.quantity-minus').on('click',function(){
        let quantityVal = $(this).siblings('.quantity').val();

        if(quantityVal>1){
            let p = Number(quantityVal)-1;
        
            let unitPrice = $(this).siblings('.quantity').attr('unitPrice');
            let cartPrice = $(this).parent().parent().siblings('div').find('.cart-price');
        
            let qMinusVal = $(this).siblings('.quantity').val(p).val();
            cartPrice.html(qMinusVal*unitPrice);
        }else{
            alert("At least, must be One")
        }
       
        cartTotal();
    }));

    $('.cart').delegate($('.quantity').on('keyup change',function(){
       if($(this).val()>1){
        let unitPrice = $(this).attr('unitPrice');
        let inputVal = $(this).val();
        let cartPrice = $(this).parent().parent().siblings('div').find('.cart-price');
        cartPrice.html(inputVal*unitPrice);
       }else{
           alert("At least, must be One!")
       }
       cartTotal();
    }))
})
);



//show carts without repeat
function showCart(x){
    let cartChildArr = $('.cart-child').toArray();
    
    cartChildArr.filter(el=>{
        let customId = el.getAttribute('custom-id');
        if(customId.includes(x)){
            alert("Added already and remove old one!");
            //  console.log($( `.cart-child[custom-id='${x}']` ));
            $( `.cart-child[custom-id='${x}']` ).remove();
        }
    });  
};








