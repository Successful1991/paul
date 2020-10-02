class Basket extends BasketElem {
    constructor(prop){
        super(prop);
        this.subtotal = 0;
        this.products = [];
        this.productsBasket = {};
    }

    init(){
        let self = this;
        $('.js-basket').on('click', () => {
            let basketList = this.getProductListStorage();
            if(!basketList) return;
            this.updateBasket(basketList);
            $('.minicard').addClass('open');
        });

        this.selectDate();
        let product = sessionStorage.getItem('product');
        const list =  (product !== null && product !== undefined && product) ? JSON.parse(product) : false;
        if(list) {
            this.productsBasket = list;
            let amount = 0;
            for(let i in list) {amount += list[i]}
            this.updateAmountBasket(amount);
        }

        $('.js-add__basket').on('click', e => self.addProduct(e.currentTarget) );

        // $('.js-basket__list').on('click', '.quantity__change', function () {
        //     let wrap = $(this).closest('.js-minicard__item');
        //     let block = $(this).closest('.js-minicard__item').find('.js-quantity__num');
        //     const val = +block.val() + Number(this.dataset.change);
        //     block.val( val );
        //
        //     if(val > +block[0].min && val < +block[0].max ){
        //         self.setProduct(wrap.data('id'), Number(this.dataset.change));
        //         self.updateAmountBasket(val);
        //
        //     }
        // });

        // $('.js-basket__list').on('click', '.js-product__remove', function (){
        //     self.clearProduct($(this).closest('.js-minicard__item').data('id'));
        // })
    }
    // session storage start
    checkProduct(id) {
        let product = sessionStorage.getItem('product');
        return (product !== null && product !== undefined && product[id]) ? JSON.parse(product) : false
    }

    getProductListStorage() {
        let product = sessionStorage.getItem('product');
        if(product){
            this.productsBasket = JSON.parse(product);
            return JSON.parse(product);
        }

        return false
    }

    setProduct(id, amount) {
        let product = this.checkProduct(id);
        if( product ){
            product[id] ? product[id] += Number(amount) : product[id] = Number(amount);
        } else {
            product = { [id]: Number(amount)};
        }
        sessionStorage.setItem('product', JSON.stringify(product));
        this.productsBasket = product;
        return product;
    }

    clearProduct(id) {
        if(id) {
            let product = this.checkProduct(id);
            delete product[id];
            delete this.productsBasket[id];
            sessionStorage.setItem('product', JSON.stringify(product) );
        } else {
            sessionStorage.removeItem('product');
            this.productsBasket = {};
        }
    }
// session storage end

    selectDate() {
        const date = new Date();
        let curDate = null;
        const picker = datepicker('.js-minicard__date',{
            dateSelected : date,
            showAllDates: true,
            startDate : new Date(date.getFullYear(), date.getMonth(), 1),
            maxDate: new Date (date.getTime() + (4 * 24 * 3600 * 1000)),
            minDate : date,
            startDay : 1 ,
            disableYearOverlay : true,
            formatter: (input, date, instance) => {

                let curDay = instance.dateSelected.getDate();
                let curMonth = instance.dateSelected.getMonth();

                let dataDay = (typeof curDay === 'string' && curDay.length > 2) || curDay < 10 ? '0' + curDay : curDay;
                let dataMonth = (typeof curMonth === 'string' && curMonth.length === 1) || curMonth < 9 ? '0' + (curMonth + 1) :  (curMonth + 1);
                input.value = dataDay + '.' + dataMonth + '.' + instance.dateSelected.getFullYear()
            },
            onSelect : instance => {
                if(instance.dateSelected) curDate = instance.dateSelected;
                instance.setDate(curDate);
                this.setDeliveryTime(instance.days[+instance.dateSelected.getDay() - 1]);
                // setTimeout(()=>instance.hide(),0)
            },
        });

        this.setDeliveryTime(picker.days[picker.dateSelected.getDay()-1])
    }

    setDeliveryTime(date) {
        const delivery = {
            weekday: {
                days : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                time: [{from: '8:00', to: '9:00'},{from: '9:00', to: '10:00'}]
            },
            weekend: {
                days : ['Sat','Sun'],
                time: [{from: '9:00', to: '10:00'},{from: '10:00', to: '11:00'}]
            }
        };

        for( let d in delivery) {
            if( delivery[d].days.includes(date) ){

                delivery[d].time.forEach( (el, i) => {
                    let option = document.createElement('option');
                    option.value = el.from;
                    option.text = `${el.from} - ${el.to}`;
                    if(i === 0){
                        option.selected = true;
                        $('.js-minicard__time').html('');
                    }

                    $('.js-minicard__time').append(option);
                });
            }
        };
    }

    checkDelivery(elem) {
        let delivery = 0;

        if(elem.dataset.value) delivery = +elem.dataset.value;
        let sum = +$('.js-minicard__price--subtotal').data('value') + delivery;

        $('.js-minicard__price--delivery').html(delivery).data('value', delivery);
        $('.js-total__sum').html(sum).data('value', sum );
    }

    updateSubTotal(subtotal) {
        $('.js-subtotal__sum').html(subtotal).data('value', subtotal);
        $('.js-minicard__price--subtotal').html(subtotal).data('value', subtotal);
    }
    updateTotal(subtotal) {
        const total = subtotal + Number($('.js-minicard__delivery [select]').data('value') || 0);
        $('.js-total__sum').html(total).data('value', total);
    }


    updateBasket(basketList) {
        this.subtotal = 0;
        this.products = [
            {
                id: 1,
                name: 'Summer Berry Layer Cake',
                desc: '466',
                price: 59,
                img: './assets/images/delivery/semi_naked_vanilla_cake.jpg'
            },{
                id: 2,
                name: 'Summer Cake',
                desc: '12',
                price: 6,
                img: './assets/images/delivery/semi_naked_vanilla_cake.jpg'
            },{
                id: 3,
                name: 'Layer Summer Layer',
                desc: '12',
                price: 456,
                img: './assets/images/delivery/semi_naked_vanilla_cake.jpg'
            },{
                id: 4,
                name: 'Berry Cake',
                desc: '12',
                price: 5875,
                img: './assets/images/delivery/semi_naked_vanilla_cake.jpg'
            },{
                id: 5,
                name: 'Summer Cake Summer Summer Summer Summer',
                desc: '12',
                price: 98,
                img: './assets/images/delivery/semi_naked_vanilla_cake.jpg'
            }];

        $('.js-basket__list').html('');
        this.products.filter(prod =>  (basketList[prod.id] )).forEach(
            el => {
                this.create('.js-basket__list',el,basketList[el.id] );
                this.subtotal += (el.price * basketList[el.id])
            }
        );

        this.updateSubTotal(this.subtotal);
        this.updateTotal(this.subtotal);
        // getProducts('url','POST',list =>{
        // 	$('.js-basket__list').html('');
        // this.products = list;
        // 	this.products.filter(prod => (basketList[prod.id] ))
        // 		.forEach(
        // 			el => $('.js-basket__list').append(createBasketElem(el)
        // 		));
        // 	$('.minicard').addClass('open');
        // });
    }

    // createBasketElem(el, amount) {
    //     return `<div class="minicard__item js-minicard__item" data-id=${el.id}><div class="product" >
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
    // }

    pay(e) {
        const t = this.getProductListStorage();
        $('.js-products__input').val( JSON.stringify(t) );
        ajax_form(e, 'POST',"./static/admin-ajax.php", this.clearForm.bind(this));
        $('.js-minicard-close').click();
    }

    clearForm(){
        this.clearProduct();
        this.updateAmountBasket(0);
        this.updateSubTotal(0);
        this.updateTotal(0);
    }

    addProduct(el) {
        const elem = $(el).closest('.js-product__item');
        let amount = $('.js-dt-quantity__num').length > 0 ? +$('.js-dt-quantity__num').val() : 1;
        const list = this.setProduct(elem.data('id'), amount);
        amount = 0;
        for(let i in list) {amount += list[i]}
        this.updateAmountBasket(amount);

        // createBasketElem(elem.id, elem.price, elem.name, elem.img, elem.link);
    }

    updateAmountBasket(amount) {
        $('.js-basket .basket__current').html( amount );
    }

    getProducts(url,method,callback) {
        $.ajax(url,{
            method: method,
            data: {action: 'product'},
            success: (responsive) => {
                callback(responsive);
            },
            error: ()=>{
                window.location.href = '/';
            }
        })
    }
}
