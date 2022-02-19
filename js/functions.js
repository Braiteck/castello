$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Кнопка 'Вверх'
	$('.buttonUp button').click((e) => {
		e.preventDefault()

		$('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function () {
		$(this).closest('.line').find('.input, textarea').focus()
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en': {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function (e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src: $(this).data('content'),
			type: 'inline',
			touch: false
		})
	})

	// Закрытие всплывающего окна по произвольной кнопке
	$('body').on('click', '.modal .close', function (e) {
		e.preventDefault()

		$.fancybox.close(true)
	})

	// Увеличение картинки
	$('.fancy_img').fancybox({
		mobile: {
			clickSlide: "close"
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)

		if ($(this).hasClass('update_price')) {
			updateCartPrice($(this).parents('tr'))
		}
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)

		if ($(this).hasClass('update_price')) {
			updateCartPrice($(this).parents('tr'))
		}
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)

			if ($(this).hasClass('update_price')) {
				updateCartPrice($(this).parents('tr'))
			}
		})
	})


	// Моб. версия
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	if (is_touch_device()) {
		$('header .cats .item > a.sub_link').addClass('touch_link')

		$('header .cats .item > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				$('header .cats .sub_cats').removeClass('show')
				$dropdown.addClass('show')
			}
		})


		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('.mob_header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



$(window).scroll(() => {
	// Кнопка 'Вверх'
	$(window).scrollTop() > $(window).innerHeight()
		? $('.buttonUp').fadeIn(300)
		: $('.buttonUp').fadeOut(200)
})



$(window).resize(() => {
	// Моб. версия
	$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')
})



// Вспомогательные функции
function updateCartPrice(context) {
	if (context) {
		let price = parseFloat(context.find('.price:not(.total)').data('price'))
		let amount = parseInt(context.find('.amount .input').val())
		let totalPrice = price * amount

		context.find('.price.total span').text(totalPrice.toLocaleString())
	}

	let totalCartPrice = 0

	$('.cart_info table td.price.total span').each(function () {
		totalCartPrice = (totalCartPrice + parseFloat($(this).text().replace(/\s+/g, '')))
	})

	$('.cart_info .bottom .total .price span').text(totalCartPrice.toLocaleString())
	$('.checkout_info .checkout_total .price span').text(totalCartPrice.toLocaleString())
}


const setHeight = (className) => {
	let maxheight = 0

	className.each(function () {
		const elHeight = $(this).outerHeight()

		if (elHeight > maxheight) maxheight = elHeight
	})

	className.outerHeight(maxheight)
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}