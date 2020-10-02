let elements = [];
(function () {
    elements = $('.js-product__item');
    $('.js-delivery__tab').on('click', 'a' ,delivery);
    const elem = $('.js-delivery__tab a')[0];
    delivery.apply(elem, elem);
})();

function delivery() {
    let amount = 0;
    elements.each( (i,el) => {
        if(el.dataset.type === this.dataset.type ){
            amount++;
            el.style.display = "grid";
        } else {
          el.style.display = "none";
        }
    });
    $('.js-delivery__amount--num').html(amount);
}

function filter(type) {

}