class BasketElem {
    constructor(prop){
        this.wrap = prop;
    }
    create(wrap,el, amount) {
        let self = this;
        let elem = this.createHtml(el, amount);
        $(wrap).append(elem);
        $(elem).on('click','.quantity__change', function () {
            let price = el.price;
            // let wrap = $(this).closest('.js-minicard__item');
            let block = $(elem).find('.js-quantity__num');
            const val = +block.val() + Number(this.dataset.change);

            if(val >= +block[0].min && val <= +block[0].max ){
                block.val( val );
                self.setProduct( elem.dataset.id, Number(this.dataset.change));
                self.updateAmountBasket(val);
                $(elem).find('.js-product__price').html(price * val);
                self.subtotal += (Number(this.dataset.change) * price);
                self.updateSubTotal(self.subtotal);
                self.updateTotal(self.subtotal);
            }
        });

        $(elem).on('click', '.js-product__remove', function (){
            let price = el.price;
            self.clearProduct($(elem).data('id'));
            self.subtotal -= ($(elem).find('.js-quantity__num').val() * price);
            self.updateSubTotal(self.subtotal);
            self.updateTotal(self.subtotal);
            $(elem).remove();
        })
    }

    createHtml(el, amount){
        const elem = document.createElement('div');
        elem.classList = "minicard__item js-minicard__item";
        elem.dataset.id = el.id;
        elem.innerHTML = `<div class="product" >
		<a class="product__img" href=${el.link}><img src=${el.img}></a>
		<div class="product__info">
		<div class="product__top">
		<div class="product__name">${el.name}</div>
	<div class="product__price"> <span class="js-product__price">${el.price * amount}</span>₴</div>
	</div>
	<div class="quantity__name">Quantity</div>
		<div class="product__center">
		<div class="quantity js-quantity">
		<div class="quantity__change" data-change="-1">-</div>
		<input class="quantity__num js-quantity__num" type="number" min="1" max="100" step="1" value=${amount}>
		<div class="quantity__change" data-change="1">+</div>
		</div>
		<div class="product__remove js-product__remove">Remove Item</div>
	</div>
	</div>
	</div>`;
        return elem
    //     return `<div class="minicard__item js-minicard__item" data-id=${el.id}>
    //         <div class="product" >
	// 	<a class="product__img" href=${el.link}><img src=${el.img}></a>
	// 	<div class="product__info">
	// 	<div class="product__top">
	// 	<div class="product__name">${el.name}</div>
	// <div class="product__price">${el.price * amount}<span>₴</span></div>
	// </div>
	// <div class="quantity__name">Quantity</div>
	// 	<div class="product__center">
	// 	<div class="quantity js-quantity">
	// 	<div class="quantity__change" data-change="-1">-</div>
	// 	<input class="quantity__num js-quantity__num" type="number" min="1" max="100" step="1" value=${amount}>
	// 	<div class="quantity__change" data-change="1">+</div>
	// 	</div>
	// 	<div class="product__remove js-product__remove">Remove Item</div>
	// </div>
	// </div>
	// </div>
	// </div>`
    }

}