App = {



	//
	// Инициализация функций
	// --------------------------------------------------
	Init : function() {
		$(document).ready(function(){



			App.Fun.fancy();								// Fancybox
			App.Fun.menu();									// Главное меню
			App.Fun.form_slider('minbeds', 'slider1');		// Слайдер в форме-конфигураторе таба 1 (id селекта, id слайдера) 
			App.Fun.form_slider('minbeds2', 'slider2');		// Слайдер в форме-конфигураторе таба 2 
			//App.Fun.map.mload('App.Fun.map.options1');		// Схемы проезда 1
			//App.Fun.map.mload('App.Fun.map.options2');		// Схемы проезда 2




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
			if(select.length > 0) {
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
			
		},



		//
		// Карта проезда
		// --------------------------------------------------
		map :  {
			mload : function(options) {

				// Асинхронная загрузка
				function loadScript(options) {
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBh5SYPMcTOOaKK267F1GGeUv9b3EUUf5U&sensor=false&callback="+options;
					document.body.appendChild(script);
				};
				//API Load
				window.onload = loadScript(options);
			},

			options1 : function() {
				var map;
				var myMapLatlng = new google.maps.LatLng(59.968361, 30.299276);
				var mapOptions = {
					zoom: 16,
					center: myMapLatlng,
					scrollwheel: false
				};

				//  Карта
				map = new google.maps.Map(document.getElementById('map1'), mapOptions);

				var myLatlng = new google.maps.LatLng(59.968197,30.299285);


				//  Маркер
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'БЦ "Резон" ул.Всеволода Вишневского 12а'
				});

				//  Устанавливаем карту в нужное нам положение
				map.setCenter(myMapLatlng);

			},

			options2 : function() {
				var map;
				//	Центр карты
				var myMapLatlng = new google.maps.LatLng(55.785914, 37.736029);
				var mapOptions = {
					zoom: 16,
					center: myMapLatlng,
					scrollwheel: false
				};

				//  Карта
				map = new google.maps.Map(document.getElementById('map2'), mapOptions);


				//	Позиция маркера
				var myLatlng = new google.maps.LatLng(55.785033, 37.736040);


				//  Маркер
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'Москва ул.Борисовская 1'
				});

				//  Устанавливаем карту в нужное нам положение
				map.setCenter(myMapLatlng);
			}


		}			
	} // <--- / Fun
} // <--- / App
App.Init();