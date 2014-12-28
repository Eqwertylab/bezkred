App = {



	//
	// Инициализация функций
	// --------------------------------------------------
	Init : function() {
		$(document).ready(function(){



			App.Fun.fancy();				// Fancybox
			App.Fun.menu();					// Главное меню
			App.Fun.form_slider('minbeds', 'slider1');			// Слайдер в форме-конфигураторе таба 1 (id селекта, id слайдера) 
			App.Fun.form_slider('minbeds2', 'slider2');			// Слайдер в форме-конфигураторе таба 1 (id селекта, id слайдера) 



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
		},



		//
		// Слайдер в форме-конфигураторе
		// --------------------------------------------------
		form_slider : function(selectid,sliderid) {
			var stoltip = $('<span class="stoltip"></span>');
			var select = $( '#'+selectid );
			var slider = $( "<div id='"+sliderid+"'></div>" ).insertAfter( select ).slider({
				min: 1,
				max: 6,
				range: "min",
				value: select[ 0 ].selectedIndex + 1,
				slide: function( event, ui ) {
					select[ 0 ].selectedIndex = ui.value - 1;
					$(stoltip)
						.text(select.val());
				},
				create: function( event, ui ) {
					var thishandle = $('#' + sliderid + ' .ui-slider-handle');
					$(stoltip)
						.text(select.val())
						.appendTo(thishandle);
				}
			});
			$( selectid ).change(function() {
				slider.slider( "value", this.selectedIndex + 1 );
			});
		}


	} // <--- / Fun
} // <--- / App
App.Init();