function toShow(x){
    x.map(function(product){
        $('#card-box').append(            
            `<div class="d-inline-block">
            <div class="card border-0 me-1 mt-2" style="border:'none'">
                        <img src="${product.image}" alt="" style="height: 200px;width: 200px;margin-bottom:-40px;margin-left:10px;z-index:1">
                        <div class="card-body border pt-5 pb-0">
                            <h4 class="header text-primary text-nowrap overflow-hidden">${product.title}</h4>
                            <p class="para">${toCut(product.description)}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <div class="text-primary">${product.price}$</div>
                            <button class="btn btn-outline-primary">
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

$.get( "https://fakestoreapi.com/products", function(data) {
        data.map(function(item){
            productArr = item;
            console.log(productArr)
        });

    });


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
    productArr.filter(function(item){
        if(item.text().toLowerCase().indexOf(inputVal)>-1){
            toShow(productArr);
        }
    })
})