App = {



	//
	// Инициализация функций
	// --------------------------------------------------
	Init : function() {
		$(document).ready(function(){


			App.Fun.isotop_media();							// Изотоп медиа
			App.Fun.isotop_video();							// Изотоп видео
			App.Fun.fancy_video();							// Fancybox - в видео галерее
			App.Fun.fancy_media();							// Fancybox - Медиа галерея
			App.Fun.fancy();								// Fancybox
			App.Fun.calc();									// Калькулятор DTI
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
		// Медиа изотоп
		// --------------------------------------------------
		isotop_media : function() {
			var $container = $('#media-container');

			$container.isotope({
				itemSelector: '.media-item',
				layoutMode: 'fitRows'
			});	

			$('#media-filter').on( 'click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$container.isotope({ filter: filterValue });
				$('#media-filter').find('button').removeClass('active');
				$(this).addClass('active');
			});
		},



		//
		// Видео изотоп
		// --------------------------------------------------
		isotop_video : function() {
			var $container = $('#video-container');

			$container.isotope({
				itemSelector: '.video-item',
				layoutMode: 'fitRows'
			});	

			$('#video-filter').on( 'click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$container.isotope({ filter: filterValue });
				$('#video-filter').find('button').removeClass('active');
				$(this).addClass('active');
			});
		},



		//
		// Медиа галерея - воспроизведение
		// --------------------------------------------------
		fancy_media : function() {

			$('.media-action-image').fancybox({
				closeBtn		: false,
				helpers		: {
					title	: { type : 'inside' },
					buttons	: {}
				}
			});
			$('.media-action-pdf').fancybox();
			$('.media-action-link').on('click', function() {
				var link = $(this).data('fancybox-href');
				var newWin = window.open(link, '_blank');
			})

		},



		//
		// Видео галерея - воспроизведение
		// --------------------------------------------------
		fancy_video : function() {
			$('.video-item').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			});
		},



		//
		// Калькулятор DTI
		// --------------------------------------------------
		calc : function() {
			var answers = {
				norm : {
					answer_text : 'Ваш показатель в пределах нормы. Узнайте как избежать проблем в будущем.',
					link_text : 'Получить бесплатную консультацию'
				},

				kritik : {
					answer_text : 'Ваш показатель находится на критическом уровне. Вам необходима оптимизация Вашей задолженности',
					link_text : 'Оптимизировать задолженность'
				},

				opasno : {
					answer_text : 'Опасно критический. Вам необходима оптимизация Вашей задолженности',
					link_text : 'Оптимизировать задолженность'
				}
			}

			var $calc = $('#calc_btn'),
				$dohodInp = $('#dohod'),
				$rashodInp = $('#rashod'),
				$dtiOut = $('#calc-dti'),
				$answerOut = $('#calc-answer');
				$linkOut = $('#calc-link');

			var answer = 'Введите показатели';

			$calc.click(function(event) {
				event.preventDefault();
				$('#calc-inner').slideDown('slow/400/fast', function() {
					$calc.addClass('disabled');
				});
			});

			$dohodInp.keyup(function(event) {
				calcDti($(this).val(), $rashodInp.val());
			});	
			$rashodInp.keyup(function(event) {
				calcDti($dohodInp.val(), $(this).val());
			});	

			function isNumber(arg) {
				return !isNaN(+arg);
			}

			function calcDti (dohod, rashod) {
				var answer, link, dti_uroven;

				dohod = parseInt(dohod);
				rashod = parseInt(rashod);
				var dti = parseInt((rashod / dohod)*100);
				
				if (isNumber(dti)) {
					if(dti >= 0 && dti <= 30) {
						dti_uroven = 'norm';
					} else if(dti > 30 && dti <= 50) {
						dti_uroven = 'kritik';
					} else if (dti > 50) {
						dti_uroven = 'opasno';
					} else {
						answer = 'Введите показатели'
					}

					answer = answers[dti_uroven].answer_text;
					link = answers[dti_uroven].link_text;

					$dtiOut.text(dti+'%');
					$answerOut.text(answer);
					$linkOut.text(link);
				} else {
					$dtiOut.text('');
					$answerOut.text('');
					$linkOut.text('');
				}
				
			}	

		},



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

				if(Response.band(0, 767)) {	var offset_h = 199; }
				if(Response.band(768, 991)) { var offset_h = 124; }
				if(Response.band(992)) { var offset_h = 128; }


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
			
			if(!jQuery.browser.mobile) {
				var select = $( '#'+selectid );
				var stoltip = $('<span class="stoltip"></span>');
				if(select.length > 0) {
					var slider = $( "<div id='"+sliderid+"'></div>" ).insertAfter( select ).slider({
						min: 1,
						max: 4,
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
			} else {
				var mselect = $('<select name="minbeds" class="form-control"></select>');
				$( '#'+selectid )
					.find('option')
					.each(function(index, el) {
						$('<option value="'+$(el).val()+'">'+$(el).val()+'</option>').appendTo(mselect);
					});
				$( '#'+selectid ).after(mselect);
				$( '#'+selectid ).remove();	
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