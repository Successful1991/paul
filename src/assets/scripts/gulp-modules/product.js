
(function() {
    $('.js-dt-dropdown').on('click','.dt-dropdown__top', function (e) {
        let el = $(this).closest('.dt-dropdown');
        if(el.hasClass('dt-dropdown--active')){
            el.css('height', '46px')
        } else{
            el.css('height', el[0].scrollHeight)
        }
        $(this).closest('.dt-dropdown').toggleClass('dt-dropdown--active');
    });


    $('.js-dt-quantity').on('click', '.dt-quantity__change', function () {
        const amount = +$('.js-dt-quantity__num').val() + Number(this.dataset.change);
        $('.js-dt-quantity__num').val(
            Math.min(Math.max(amount, +$('.js-dt-quantity__num')[0].min), +$('.js-dt-quantity__num')[0].max)
        )
    });

    // adaptive
    if(document.documentElement.clientWidth <= 770) {
        console.log('sup');
        $('.dt-accord-content').append($('.dt-dropdown__wrap'))
    }

    // basket.clearProduct();
    // $('.js-dt-product__add').on('click', function () {
    //     console.log(basket);
    //     basket.setProduct(  $('.js-dt-quantity__num').data('id'), $('.js-dt-quantity__num').val());
    //     // checkProduct(this.dataset.id, $('.js-dt-quantity__num').val());
    //     // window.sessionStorage.setItem('product',{
    //     //     id: this.dataset.id,
    //     //     amount: this.val()
    //     // });
    // })
})();