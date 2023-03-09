//  alert('연결성공');
$(function() {
	const $snb = $('.snb')
	const $snbMnus = $('.snb a')
	const $gnb = $('.gnb')
	const $mnus = $('.gnb a')
	const $btnGnb = $('.btn-gnb')
	const $aside = $('aside')
	const $nav = $('nav')
	const $container = $('section > .slides > .slides-container')
	const $indicator = $('section > .slides > .slides-pagination > li > a')
	const $btnPrev = $('section > .slides > .slides-prev')
	const $btnNext = $('section > .slides > .slides-next')

	//1.메뉴 활성화 표시
	//sub 메뉴 활성화 표시
	$snbMnus.on('click', function(evt) {
		evt.preventDefault()

		$(this).parent().addClass('on').siblings().removeClass('on')
		$mnus.parent().removeClass('on')
	})

	//gnb 메뉴 활성화 표시
	$mnus.on('click', function(evt) {
		evt.preventDefault()

		$(this).parent().addClass('on').siblings().removeClass('on')
		$snbMnus.parent().removeClass('on')
	})

	$(window).on('scroll', function() {
		//1. 현재 스크롤바의 top값 추출
		let scrollTop = Math.ceil($(this).scrollTop())
		//2.맨 위로 가기 top버튼
		//view>0 이면 푸터가 화면에 노출되었다는 것을 의미
		const view = scrollTop + $(window).height() - $('footer').offset().top

		if (view > 0) {
			//푸터노출
			$aside.css('margin-bottom', view)
		} else {
			$aside.css('margin-bottom', 0)
		}

		//3.top버튼 노출처리
		if (scrollTop > 120) {
			$aside.fadeIn()
		} else {
			$aside.fadeOut()
		}
	})

	//4.모바일 전용 메뉴버튼
	$btnGnb.on('click', function() {
		$(this).toggleClass('clse')
		$nav.toggle()
	})

	//5.슬라이드

	let nowIdx = 0

	//다음버튼에 대한 click 이벤트 구문
	$btnNext.on('click', function(evt) {
		evt.preventDefault()

		if (nowIdx < 1) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')
		$container.stop().animate({ left: '-100%' }, 400, function() {
			const $slides = $('section> .slides > .slides-container > li')
			$slides.first().appendTo($container)
			$container.css({ left: 0 })
		})
	})

	//이전버튼에 대한 click 이벤트 구문
	$btnPrev.on('click', function(evt) {
		evt.preventDefault()

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 1
		}

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')

		const $slides = $('section > .slides > .slides-container > li') //li 4개
		$slides.last().prependTo($container) //첫번째 li로 이동
		$container.css({ left: '-100%' })
		$container.stop().animate({ left: 0 }, 400)
	})
})

$('.logo,aside').on('click', function(evt) {
	evt.preventDefault()
	$('html,body').animate({ scrollTop: 0 })
})
