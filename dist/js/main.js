App = {



	//
	// Инициализация функций
	// --------------------------------------------------
	Init : function() {
		$(document).ready(function(){



			App.Fun.fancy();				// Fancybox
			App.Fun.menu();					// Главное меню



		});
		
	}, // <--- / Init


	//
	// Все функции
	// --------------------------------------------------
	Fun : {



		//
		// Fancybox
		// --------------------------------------------------
		fancy : function() {
			$('.fancybox').fancybox({
				prevEffect		: 'none',
				nextEffect		: 'none',
				closeBtn		: false,
				helpers		: {
					title	: { type : 'inside' },
					buttons	: {}
				}
			});
		},



		//
		// Главное меню
		// --------------------------------------------------
		menu : function() {


			//	Скрываем меню в мобильной версии при клике по контенту
			$('.header_wrap, .main_wrap, .footer').on('click', function() {
				if( $('#bs-example-navbar-collapse-1').hasClass('in') ) {
					$('#bs-example-navbar-collapse-1').collapse('toggle');
				}
			});


			//Фиксируем главное меню при скролинге
			Response.action(function(){

				if(Response.band(0, 767)) {	var offset_h = 156; }
				if(Response.band(768, 991)) { var offset_h = 124; }
				if(Response.band(992)) { var offset_h = 143; }


				$(window).scroll(function(){
					if( !($(window).scrollTop() < offset_h) ) {
						$('body').addClass('affix');
					} else {
						$('body').removeClass('affix');
					}
				});

			});
		}


	} // <--- / Fun
} // <--- / App
App.Init();