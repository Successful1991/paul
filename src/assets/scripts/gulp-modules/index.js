@@include('./libs.js');

let basket;
let configForm = {
	input: 'js-form__input',
	active: 'active',
	loader: {
		class: 'form__loader',
		addClass: 'active'
	},
	success: {
		location: '/message',
		class: 'send__success',
		addClass: 'active',
	},
	error: {
		class: 'js-result-text',
		addClass: 'js-no-valid',
		dataAttr: 'errormessage'
	}
};

(function ($) {
	function loader() {
		$(".loader-wrap").delay(2500).fadeOut(500);
	}

	loader();
	basket = new Basket();
	const wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		live: true
	});

	function sayHi() {
	  wow.init();
	}

	setTimeout(sayHi, 2500);

	// валидация формы 
	// $('.main-form__input').on('focus', function () {
	// 	$(this).parent().addClass('js-input-focus');
	// }).blur(function () {
	// 	if ($(this).val() === '') {
	// 		$(this).parent().removeClass('js-input-focus');
	// 	}
	// });

	$('.js-call-form').on('click', function (e) {
		e.preventDefault();
		ajax_form(e, 'POST',"./static/admin-ajax.php", clearPopup);
	});

	function clearPopup() {
		location.href = '/thanks'
	}

	// $('#js-call-form').on('submit', function (event) {
	// 	event.preventDefault();
	// 	ajax_form(event, 'POST',"/wp-admin/form.php");
	// });
	//
	// $('#js-form-contact').on('submit', function (event) {
	// 	event.preventDefault();
	// 	ajax_form(event, 'POST',"/wp-admin/form.php");
	// });
	//
	// $('#js-form-pay').on('submit', function (event) {
	// 	event.preventDefault();
	// 	ajax_form(event, 'POST',"/wp-admin/form.php");
	// });
	//
	// $('#js-form-applay1').on('submit', function (event) {
	// 	event.preventDefault();
	// 	ajax_form(event, 'POST',"/wp-admin/form.php");
	// });
	//
	// $('#js-form-applay2').on('submit', function (event) {
	// 	event.preventDefault();
	// 	ajax_form(event, 'POST',"/wp-admin/form.php");
	// });

	// function ajax_form(e) {
	// 	event.preventDefault();
	// 	var err = [];
	// 	let serverAnsver = {};
	// 	var rulesPattern = {
	// 		email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
	// 		tel: /^\+38\(\d{3}\)\d{7}$/
	// 	};
	// 	var validatorMethods = {
	// 		empty: function (el) {
	// 			return (el === '') ? true : false;
	// 		},
	// 		pattern: function (el, pattern) {
	// 			return pattern.test(el);
	// 		},
	// 		contains: function (el1, el2) {
	// 			return (el1 == el2) ? false : true;
	// 		},
	// 		check: function (el) {
	// 			return (el.checked) ? false : true;
	// 		},
	// 		max: function (el) {
	// 			return (el.length > 5) ? true : false;
	// 		}
	// 	}
	// 	var removeAnimationClass = function (selector, classAnimation) {
	// 		selector.addClass(classAnimation);
	// 		selector.on("animationend", function () {
	// 			selector.removeClass(classAnimation);
	// 		});
	// 	}
	// 	var pushError = function (key) {
	// 		err.push(key);
	// 	}
	// 	var showError = function (key) {
	// 		var errorMessage = $(this).next().data("errormessage"); // добавляем в input сообщение об ошибке из dataAttr и class
	// 		var inputText = $(this).next().find('.main-form__text');
	// 		($(this).closest('.main-form-block').hasClass('js-input-focus')) ? removeAnimationClass(inputText, 'shake-focus'): removeAnimationClass(inputText, 'shake')
	//
	// 		inputText.text(errorMessage);
	// 		$(this).addClass('js-no-valid');
	// 		pushError(key)
	// 	}
	// 	var showDefaultMessage = function () {
	// 		var defaultMessage = $(this).next().data("defaultmessage"); // при клике на input убираем сообщение и class
	// 		$(this).next().find('.main-form__text').text(defaultMessage);
	//
	// 		$(this).removeClass('js-no-valid');
	// 	}
	// 	var str = $("#" + e.id).serialize();
	// 	//var x = document.forms[e.id]["name"].value;
	// 	//var y = document.forms[e.id]["tel"].value;
	// 	//	console.log(str);
	//
	//
	// 	var errors = true; // по умолчанию ошибок в форме нет
	// 	$(e).find('.main-form__input-requaired').each(function () {
	// 		var rule = $(this).data("rule").split(' ');
	// 		if ($(this).data("patterns") != undefined) {
	// 			var pattern = $(this).data("patterns").split(' ');
	// 		}
	// 		if ($(this).data("compare") != undefined) {
	// 			var compare = $(this).data("compare").split(' ');
	// 		}
	//
	// 		rule.forEach((el) => {
	//
	//
	// 			switch (el) {
	// 				case 'pattern':
	// 					pattern.forEach((elPat) => {
	// 						errors = !validatorMethods[el]($.trim($(this).val()), rulesPattern[elPat]);
	// 						if (errors) showError.call($(this), elPat);
	// 					});
	// 					break;
	// 				case 'contains':
	// 					var compareElemOne = $('#' + compare[0]).val();
	// 					var compareElemTwo = $('#' + compare[1]).val();
	// 					errors = validatorMethods[el](compareElemOne, compareElemTwo);
	// 					if (errors) showError.call($(this), el);
	// 					break;
	// 				case 'check':
	// 					errors = validatorMethods[el]($(this)[0]);
	// 					if (errors) showError.call($(this), el);
	// 					break;
	// 				default:
	// 					errors = validatorMethods[el]($.trim($(this).val()));
	// 					if (errors) showError.call($(this), el);
	// 			}
	// 		})
	//
	// 		$(".main-form__input").on("mouseup", showDefaultMessage);
	//
	// 	});
	// 	if (err.length == 0) {
	// 		// get(str, "./static/val.php", true, (data) => {
	// 		// 	serverAnsver = data.error;
	// 		// 	for (let key in serverAnsver) {
	// 		// 		showErrorMessage.call(e, key, serverAnsver[key])
	// 		// 	};
	//
	// 		// 	if (serverAnsver.length == 0) {
	// 		// 		get(str, "./static/val.php", true, () => {
	// 					$.ajax({
	// 							method: "POST",
	// 							url: "./static/val.php",
	// 							data: str+='&action=app',
	// 							beforeSend: function () {
	// 								$(e).find('button.js-main-form__button').text('Отправка...') // замена текста в кнопке при отправке
	// 								$('body').css('cursor', 'wait')
	// 							},
	// 							error: function () {
	// 								$(e).find('button.js-main-form__button').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
	// 							}
	// 						})
	// 						.done(function (msg) {
	// 							$('.form-succses').addClass('form-succses-active');
	// 							$(e).find('.main-form__input-requaired').each(function (el) {
	// 								$(this).val('');
	// 								showDefaultMessage.call($(this));
	// 							});
	// 							$(e).find('.main-form-block.requaired').removeClass('js-input-focus');
	// 							$('body').css('cursor', 'default');
	// 							//location.replace('/message/');
	// 							$(e).find('button.js-main-form__button').text('Отправить');
	// 						});
	// 		// 		});
	// 		// 	}
	// 		// });
	//
	// 	}
	//
	// 	function showErrorMessage(elem, text) {
	// 		const element = $(this).find(`[data-type="${elem}"] .main-form__text`);
	// 		const inp = element.closest('.requaired').find('.main-form__input-requaired');
	// 		inp.addClass('js-no-valid');
	// 		removeAnimationClass(element, 'shake-focus')
	// 		element.text(text);
	// 	}
	// }

	// function get(sand, url, parse, callback) {
	// 	$.ajax({
	// 		url: url,
	// 		type: 'post',
	// 		data: sand,
	// 		global: false,
	// 		async: true,
	// 		success: function (data) {
	// 			var data = (parse) ? JSON.parse(data) : data
	// 			callback(data)
	// 		},
	// 		error: function (jqXHR, status, errorThrown) {
	// 			console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
	// 		}
	// 	});
	// }

	// POPUP FORMS
	function initPopup(elem, type) {
		console.log('initPopup', $(elem));
		$(elem).magnificPopup({
			// type: 'inline',
			type: type,
			preloader: false,
			removalDelay: 500,
			// mainClass: 'mfp-with-anim',
			callbacks: {
				open: function () {
					$('.js-close-btn').on('click', function (event) {
						event.preventDefault();
						$.magnificPopup.close();
					});
				},
				beforeOpen: function () {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true
		});
	}

	initPopup('.js-call-form-popup', 'inline');
	initPopup('.js-menu','image');
	// initPopup('.js-item2');
	// initPopup('.js-item3');
	// initPopup('.js-item4');

	//telMask
	// var telMask = function () {
	// 	jQuery(function ($) {
	// 		$.mask.definitions['#'] = '[0-9]';
	// 		$.mask.definitions['9'] = '';
	//
	// 	});
	// };
	// telMask();
	$(".inputTelMask").mask("+(38) 0** ***-**-**");

	//plus minus
	// const number = $('.js-choose');
	//
	// number.each(function() {
	//   const max_number = +$(this).attr('data-max-number');
	//   const input = $(this).find('input');
	//   const plus = $(this).find('.js-choose-plus');
	//   const minus = $(this).find('.js-choose-minus');
	//   const tr = $(this).closest('.js-tr-parent');
	//   let totalPriceEl;
	//   let basePriceEl;
	//   let totalPrice;
	//   let basePrice;
	//   // console.log(input.val());
	//
	//   if (tr[0]) {
	//     totalPriceEl = tr.find('.js-tr-total');
	//     basePriceEl = tr.find('.js-tr-price');
	//     basePrice = parseFloat(basePriceEl.text(), 2);
	//   }
	//
	//   plus.on('click', function() {
	//     let val = +input.val();
	//     if (val >= max_number) {
	//       return false;
	//     } else {
	//       val += 1;
	//       input.val(val);
	//       console.log(input.val());
	//     }
	//     totalPriceEl ? totalPriceEl.val((val * basePrice).toFixed(2)) : null;
	//   });
	//
	//   minus.on('click', function() {
	//     let val = +input.val();
	//     if (val > 1) {
	//       val -= 1;
	//       input.val(val);
	//       console.log(input.val());
	//     } else {
	//       return false;
	//     }
	//     totalPriceEl ? totalPriceEl.val((val * basePrice).toFixed(2)) : null;
	//   });
	// });
	$('.js-open-form-popup').on('click','.js-choose__change', function (e) {
		let block = $(e.delegateTarget).find('.js-choose-num');
		const val = +block.val() + Number(this.dataset.change);

		if(val >= +block[0].min && val <= +block[0].max ){
			block.val( val );
		}
	});

	$('.js-btn-menu').on('click', function() {
		$('.header__menu').addClass('open');
		$('body').addClass('overflow');
	});

	$('.js-close-menu').on('click', function() {
		$('.header__menu').removeClass('open');
		$('body').addClass('overflow');
	});

	$('.js-minicard-close').on('click', function () {
		$('.minicard').removeClass('open');
	});

	//pay
	// $('.check').on('click', function () {
	//     if ( $(this).is(':checked') ) {
	//        var textPay =  $(this).siblings().data('pay');
	//        $('.js-pay').removeClass('is-hidden');
	//        $('.js-pay-link').text(textPay);
	//     } else {
	//     }
	// });
	formSelectDate();
	$('.js-minicard__delivery').on('change', function (e) {basket.checkDelivery(this)});

	$('#payProduct').on('submit', e => {
		e.preventDefault();
		basket.pay(e)
	});

	basket.init();
})(jQuery);

function ajax_form(e,methods,url,callback) {
	event.preventDefault();
	const form = $(e.target).closest("form");
	let str = `action=app&${form.serialize()}`;

	let errors = false; // по умолчанию ошибок в форме нет
	console.log(str);
	$(form).find('.'+configForm.input).each(function() {
		if(!validateForm(this)) errors = true;
	});

	$('.'+configForm.input).on("mouseup",delMessageErrorForm);
	if (!errors) {
		console.log(true);
		$.ajax({
			method: methods,
			url: url,
			data: JSON.stringify(str),
			beforeSend: function() {
				$('.'+configForm.loader.class).addClass(configForm.active);
				// $(form).find('button > span').text('Отправка...') // замена текста в кнопке при отправке
			},
			error: function() {
				$('.'+configForm.loader.class).removeClass(configForm.active);
				// $(form).find('button > span').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
			}
		})
			.done(responsive => {
				const data = JSON.parse(responsive);
				// success();
				successSendMesage();
				if (data) {
					//$(e).find('.result-text').removeClass('error');
					$(form)[0].reset();
					callback();
					// window.location.href = configForm.success.location
				} else {
					//$(e).find('.result-text').addClass('error');
					$('.'+configForm.loader.class).removeClass(configForm.active);
					$(form).find('.'+configForm.error.class).html(data.message);
				}
				if (data.message) {
					$(form).find('.'+configForm.error.class).html(data.message).fadeIn();
					setTimeout(function() {
						$(e).find('.'+configForm.error.class).fadeOut();
					},2000)
				}
			});
	} else {
		console.log(false);
		$('.'+configForm.loader.class).removeClass(configForm.active);
	}
}

function validateForm(self) {
	let elem = $(self);
	// const regular = new RegExp(/^[a-zA-Zа-яА-Я ёЁ`']{2,}$/);
	// const regularTel = new RegExp(/\(?([0-9]{3})\)?(?:[ .-])([0-9]{2}[ .-]?)([0-9]{2}[ .-]?)([0-9]{3})/);

	switch (elem.attr('name')) {
		case 'phone':
			return validateTel(elem);
		case 'name':
			return validateName(elem);
		case 'mail':
			return validateMail(elem);
		case 'date':
			return validateDate(elem);
		default :
			return true
	}
	// if (
	// 	( elem.attr('name') === 'tel' && ( elem.val().length < 5 || !regularTel.test(elem.val()) )) ||
	// 	( elem.attr('name') === 'name' && ( ($.trim(elem.val()).length < 2) || !regular.test(elem.val()) ))
	// // (elem.attr('name') !== 'tel' && !regular.test(elem.val()) )
	// ) {
	// 	var errorMessage = $(self).data(configForm.error.dataAttr); // добавляем в input сообщение об ошибке из dataAttr и class
	// 	elem.next().text(errorMessage);
	// 	elem.addClass(configForm.error.addClass);
	// 	return true
	// }
	// return false
}

function delMessageErrorForm() {
	// $(this).next().data(configForm.error.dataAttr); // при клике на input убираем сообщение и class
	$(this).next().text('');
	$(this).removeClass(configForm.error.addClass);
}

function successSendMesage() {
	$('.'+configForm.success.class).addClass(configForm.success.addClass);
	setTimeout(function() {
		$('.popup-wrap').removeClass(configForm.active);
		$('.'+configForm.success.class).removeClass(configForm.success.addClass);
	},2000);
}

function validateName(elem) {
	const regular = new RegExp(/^[a-zA-Zа-яА-Я ёЁ`']{2,}$/);
	if(  $.trim(elem.val()).length < 2 || !regular.test(elem.val())  ) {
		elem.next().text(elem.data(configForm.error.dataAttr)); // добавляем в input сообщение об ошибке из dataAttr и class
		elem.addClass(configForm.error.addClass);
		return false
	}
	return true;
}

function validateTel(elem) {
	const regular = new RegExp(/\(?([0-9]{3})\)?(?:[ .-])([0-9]{3}[ .-]?)([0-9]{2}[ .-]?)([0-9]{2})/);
	if(  elem.val().length < 5 || !regular.test($.trim(elem.val()))  ) {
		elem.next().text(elem.data(configForm.error.dataAttr)); // добавляем в input сообщение об ошибке из dataAttr и class
		elem.addClass(configForm.error.addClass);
		return false
	}
	return true;
}
function validateMail(elem) {
	const regular = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
	if(  elem.val().length < 5 || !regular.test(elem.val())  ) {
		elem.next().text(elem.data(configForm.error.dataAttr)); // добавляем в input сообщение об ошибке из dataAttr и class
		elem.addClass(configForm.error.addClass);
		return false
	}
	return true;
}

function validateDate(elem) {
	const regular = new RegExp(/^((\d{2}\.){2}\d{4})$/);
	if( !regular.test(elem.val())  ) {
		elem.next().text(elem.data(configForm.error.dataAttr)); // добавляем в input сообщение об ошибке из dataAttr и class
		elem.addClass(configForm.error.addClass);
		return false
	}
	return true;
}


function formSelectDate() {
	const date = new Date();
	let curDate = null;
	const picker = datepicker('.js-popup__date',{
		dateSelected : date,
		showAllDates: true,
		startDate : new Date(date.getFullYear(), date.getMonth(), 1),
		maxDate: new Date (date.getTime() + (61 * 24 * 3600 * 1000)),
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
			this.setPopupTime(instance.days[+instance.dateSelected.getDay() - 1]);
			// setTimeout(()=>instance.hide(),0)
		},
	});

	// this.setDeliveryTime(picker.days[picker.dateSelected.getDay()-1])
}


function setPopupTime(date) {
	const delivery = {
		weekday: {
			days : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
			time: [
				{from: '08:00', to: '08:30'},
				{from: '08:30', to: '09:00'},
				{from: '09:00', to: '09:30'},
				{from: '09:30', to: '10:00'},
				{from: '10:00', to: '10:30'},
				{from: '10:30', to: '11:00'},
				{from: '11:00', to: '11:30'},
				{from: '11:30', to: '12:00'},
				{from: '12:00', to: '12:30'},
				{from: '12:30', to: '13:00'},
				{from: '13:00', to: '13:30'},
				{from: '13:30', to: '14:00'},
				{from: '14:00', to: '14:30'},
				{from: '14:30', to: '15:00'},
				{from: '15:00', to: '15:30'},
				{from: '15:30', to: '16:00'},
				{from: '16:00', to: '16:30'},
				{from: '16:30', to: '17:00'},
				{from: '17:00', to: '17:30'},
				{from: '17:30', to: '18:00'},
				{from: '18:00', to: '18:30'},
				{from: '18:30', to: '19:00'},
				{from: '19:00', to: '19:30'},
				{from: '19:30', to: '20:00'},
				{from: '20:00', to: '20:30'},
				{from: '20:30', to: '21:00'}]
		},
		weekend: {
			days : ['Sat','Sun'],
			time: [
				{from: '09:00', to: '09:30'},
				{from: '09:30', to: '10:00'},
				{from: '10:00', to: '10:30'},
				{from: '10:30', to: '11:00'},
				{from: '11:00', to: '11:30'},
				{from: '11:30', to: '12:00'},
				{from: '12:00', to: '12:30'},
				{from: '12:30', to: '13:00'},
				{from: '13:00', to: '13:30'},
				{from: '13:30', to: '14:00'},
				{from: '14:00', to: '14:30'},
				{from: '14:30', to: '15:00'},
				{from: '15:00', to: '15:30'},
				{from: '15:30', to: '16:00'},
				{from: '16:00', to: '16:30'},
				{from: '16:30', to: '17:00'},
				{from: '17:00', to: '17:30'},
				{from: '17:30', to: '18:00'},
				{from: '18:00', to: '18:30'},
				{from: '18:30', to: '19:00'},
				{from: '19:00', to: '19:30'},
				{from: '19:30', to: '20:00'},
				{from: '20:00', to: '20:30'},
				{from: '20:30', to: '21:00'},
				{from: '21:00', to: '21:30'},
				{from: '21:30', to: '22:00'},
				{from: '22:00', to: '22:30'},
				{from: '22:30', to: '23:00'}
				]
		}
	};

	for( let d in delivery) {
		if( delivery[d].days.includes(date) ){

			delivery[d].time.forEach( (el, i) => {
				let option = document.createElement('option');
				option.value = el.from;
				option.text = `${el.from}`;
				// option.text = `${el.from} - ${el.to}`;
				if(i === 0){
					option.selected = true;
					$('.js-form__time').html('');
				}

				$('.js-form__time').append(option);
			});
		}
	};
}