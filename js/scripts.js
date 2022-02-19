$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		responsive: {
			0: {
				nav: false
			},
			1024: {
				nav: true
			}
		},
		onTranslate: (event) => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: (event) => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	// Карусель в тексте
	$('.text_block .carousel').owlCarousel({
		loop: false,
		smartSpeed: 500,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 1,
				margin: 20
			},
			480: {
				items: 2,
				margin: 20
			},
			768: {
				items: 3,
				margin: 20
			},
			1024: {
				items: 4,
				margin: 20
			}
		},
		onInitialized: (event) => {
			setTimeout(() => {
				$(event.target).find('.owl-nav button').css('top', ($(event.target).find('.thumb').outerHeight() * 0.5))
			}, 100)
		},
		onResized: (event) => {
			setTimeout(() => {
				$(event.target).find('.owl-nav button').css('top', ($(event.target).find('.thumb').outerHeight() * 0.5))
			}, 100)
		}
	})


	// Карусель товаров
	$('.products .slider').owlCarousel({
		loop: false,
		smartSpeed: 500,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 2,
				margin: 20
			},
			768: {
				items: 3,
				margin: 20
			},
			1024: {
				items: 4,
				margin: 20
			}
		},
		onInitialized: (event) => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)

				$(event.target).find('.owl-nav button').css('top', ($(event.target).find('.thumb').outerHeight() * 0.5))
			}, 100)
		},
		onResized: (event) => {
			setTimeout(() => {
				productHeight($(event.target), $(event.target).find('.slide').length)

				$(event.target).find('.owl-nav button').css('top', ($(event.target).find('.thumb').outerHeight() * 0.5))
			}, 100)
		}
	})


	// Товар в избранное
	$('.product .favorite_btn, .product_info .buy .favorite_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			// добавление
			$(this).toggleClass('active')
		} else {
			// удаление
			$(this).toggleClass('active')
		}
	})


	// Боковая колонка - категории
	$('aside .cats .cat > * .icon').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('a')

		if (!parent.hasClass('active')) {
			parent.toggleClass('active')
			parent.next().fadeIn(300)
		} else {
			parent.toggleClass('active')
			parent.next().fadeOut(200)
		}
	})

	$('aside .cats .sub_cats .sub_link').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).toggleClass('active').next().slideDown(300)
		} else {
			$(this).toggleClass('active').next().slideUp(200)
		}
	})


	// Боковая колонка - фильтр
	$('aside .mob_filter_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).toggleClass('active').next().slideDown(300)
		} else {
			$(this).toggleClass('active').next().slideUp(200)
		}
	})

	$priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 200000,
		from: 15000,
		to: 150000,
		step: 100,
		onChange: function (data) {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		}
	}).data("ionRangeSlider")

	$('.filter .price_range .input').keyup(function () {
		$priceRange.update({
			from: parseFloat($('.filter .price_range input.from').val().replace(/\s+/g, '')),
			to: parseFloat($('.filter .price_range input.to').val().replace(/\s+/g, ''))
		})
	})

	$('.filter .reset_btn').click(function () {
		$('.filter input').removeAttr('checked')

		$priceRange.reset()
	})


	// Страница товара - слайдер
	$('.product_info .images .big .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		smartSpeed: 500,
		dots: false,
		nav: true,
		onTranslate: event => {
			let parent = $(event.target).closest('.images')

			parent.find('.thumbs button').removeClass('active')
			parent.find('.thumbs button:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.product_info .images .thumbs button').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.images')

		parent.find('.big .slider').trigger('to.owl.carousel', $(this).data('slide-index'))
	})


	// Корзина - удаление товара
	$('.cart_info table td.delete button').click(function (e) {
		e.preventDefault()

		$(this).closest('tr').remove()
		updateCartPrice()
	})


	// Оформление заказа
	$('#delivery_method').change(function () {
		let _self = $(this)

		setTimeout(() => {
			let delivery = _self.val()

			$('.checkout_info .form .delivery_method').hide()
			$('.checkout_info .form .delivery_method.delivery_method' + delivery).fadeIn(300)
		})
	})


	// Личный кабинет
	$('.lk_info .edit_info_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_info')

		parent.find('.links button').removeClass('active')
		$(this).addClass('active')

		parent.find('.pass_form').hide()
		parent.find('.pesonal_form').addClass('active').fadeIn()
		parent.find('.pesonal_form .input').prop('readonly', false)
	})

	$('.lk_info .pesonal_form .cancel_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_info')

		parent.find('.links button').removeClass('active')

		parent.find('.pesonal_form').removeClass('active')
		parent.find('.pesonal_form .input').prop('readonly', true)
	})


	$('.lk_info .edit_pass_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_info')

		parent.find('.links button').removeClass('active')
		$(this).addClass('active')

		parent.find('.pesonal_form').hide()
		parent.find('.pass_form').fadeIn()
	})

	$('.lk_info .pass_form .cancel_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_info')

		parent.find('.links button').removeClass('active')

		parent.find('.pass_form').hide()
		parent.find('.pesonal_form').fadeIn()
	})


	// Личный кабинет - история
	$('.lk_history .item .head').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		if (parent.hasClass('active')) {
			parent.removeClass('active').find('.data').slideUp(300)
		} else {
			$('.lk_history .data').slideUp()
			$('.lk_history .item').removeClass('active')

			parent.addClass('active').find('.data').slideDown(300)
		}
	})


	// Отправка форм
	$('body').on('submit', '.form.custom_submit', function (e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#success_modal',
			type: 'inline',
			touch: false,
			afterShow: (instance, current) => {
				setTimeout(() => { $.fancybox.close() }, 3000)
			}
		})
	})

	// Отправка форм - Подписка на рассылку
	$('.subscribe form').submit(function (e) {
		e.preventDefault()

		$.fancybox.open({
			src: '#subscribe_success_modal',
			type: 'inline',
			touch: false,
			afterShow: (instance, current) => {
				setTimeout(() => { $.fancybox.close() }, 3000)
			}
		})
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name, .sizes').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))
		setHeight($products.slice(start, finish).find('.sizes'))

		start = start + step
		finish = finish + step
	})
}