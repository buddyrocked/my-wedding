$(document).ready(function(){
	setTimeout(function() {
		$('#preloader').addClass('active');
	}, 3000);

	setTimeout(function() {
		$('#main-section-msg').addClass('active');
	}, 4000);

    $('.jquery-background-video').bgVideo({fadeIn: 2000});

	var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });
    
    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;   
        //constrain the draggable element to move inside his container
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }

    $("#owl-about").owlCarousel({
        autoplay: true, //Set AutoPlay to 3 seconds
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        items : 1,
        nav: true,
        navText: ["prev","next"],
        dots: false,
        loop: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
                loop:false
            }
        }
    });

     $("#owl-vendor").owlCarousel({
        autoplay: true, //Set AutoPlay to 3 seconds
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        items : 1,
        nav: true,
        navText: ["prev","next"],
        dots: false,
        loop: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:4,
                nav:true,
                loop:false
            }
        }
    });

    $('#nav-1').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        ease:'swing'

    });

    $('#nav-2').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        ease:'swing'

    });
    jQuery(window).bind('scroll', function (){ 
        var scrollTop = jQuery('#trigger').offset().top;

        if (scrollTop > $('#our-story-section').offset().top) {
            $('.navbar-top-love').addClass('hide');
        } else {
            $('.navbar-top-love').removeClass('hide');
        }

        $('.animated').each(function(){
            anim = $(this).attr('data-anim');                
            if (scrollTop > $(this).offset().top) {                    
                animatex='up';
                $(this).removeClass('fadeOut');
                $(this).addClass(anim);
            }else{
                animatex='down';
                $(this).removeClass(anim);
                $(this).addClass('fadeOut');
            }
        });
    });

    var options = {
                zoom : 3,
                mapTypeId : 'Styled',
                //disableDefaultUI: true,
                mapTypeControlOptions : {
                    mapTypeIds : [ 'Styled' ]
                }
            };
    var styles = [{
        stylers : [ {
            hue : "#cccccc"
        }, {
            saturation : -100
        }]
    }, {
        featureType : "road",
        elementType : "geometry",
        stylers : [ {
            lightness : 100
        }, {
            visibility : "simplified"
        }]
    }, {
        featureType : "road",
        elementType : "labels",
        stylers : [ {
            visibility : "on"
        }]
    }, {
        featureType: "poi",
        stylers: [ {
            visibility: "off"
        }]
    }];

    var newMarker = null;
    var markers = [];

    var loadJSONParams = function(url, params) {
        if (window.XMLHttpRequest) {
            var request = new XMLHttpRequest();
        } else {
            var request = new ActiveXObject('Microsoft.XMLHTTP');
        }
        request.open('GET', url + "?year=" + encodeURIComponent(params), false);
        request.send();
        return eval(request.responseText);
    };
    // json for properties markers on map
    if($('#mapView').length > 0){
        //var props = loadJSONParams($('#mapView').attr('data-url'), 1);
        var props = [{
            title : 'Tanah Bapak H.Muhidin',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Sale',
            price : '$1,550,000',
            address : '39 Remsen St, Brooklyn, NY 11201, USA',
            bedrooms : '3',
            bathrooms : '2',
            area : '3430 Sq Ft',
            position : {
                lat : -6.278642,
                lng : 106.724254
            },
            markerIcon : 'marker-red-mini.png'
        }, {
            title : 'Tanah Bapak H.Mahmud',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Rent',
            price : '$1,750,000',
            address : '169 Warren St, Brooklyn, NY 11201, USA',
            bedrooms : '2',
            bathrooms : '2',
            area : '4430 Sq Ft',
            position : {
                lat : -6.277895,
                lng : 106.724372,
            },
            markerIcon : 'marker-yellow-mini.png'
        }, {
            title : 'Tanah Bapak H.Muhidin',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Sale',
            price : '$1,340,000',
            address : '38-62 Water St, Brooklyn, NY 11201, USA',
            bedrooms : '2',
            bathrooms : '3',
            area : '2640 Sq Ft',
            position : {
                lat : -6.276122,
                lng : 106.723950
            },
            markerIcon : 'marker-green-mini.png'
        }, {
            title : 'Tanah Ibu Hj.Nurlele',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Sale',
            price : '$1,930,000',
            address : 'Wunsch Bldg, Brooklyn, NY 11201, USA',
            bedrooms : '3',
            bathrooms : '2',
            area : '2800 Sq Ft',
            position : {
                lat : -6.273019,
                lng : 106.724851
            },
            markerIcon : 'marker-green-mini.png'
        }, {
            title : 'Tanah Babeh Sabeni',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Rent',
            price : '$2,350,000',
            address : '95 Butler St, Brooklyn, NY 11231, USA',
            bedrooms : '2',
            bathrooms : '2',
            area : '2750 Sq Ft',
            position : {
                lat : -6.274960,
                lng : 106.723574
            },
            markerIcon : 'marker-green-mini.png'
        }, {
            title : 'Tanah Engkong Abidin',
            image : '../style/images/1-1-thmb.jpg',
            type : 'For Sale',
            price : '$1,550,000',
            address : '39 Remsen St, Brooklyn, NY 11201, USA',
            bedrooms : '3',
            bathrooms : '2',
            area : '3430 Sq Ft',
            position : {
                lat : -6.275109,
                lng : 106.722791
            },
            markerIcon : 'marker-red-mini.png'
        }];

        // custom infowindow object
        var imagePath = '../style';
        var infobox = new InfoBox({
            disableAutoPan: false,
            maxWidth: 202,
            pixelOffset: new google.maps.Size(-101, -285),
            zIndex: null,
            boxStyle: {
                background: "url('" + imagePath + "/images/infobox-bg.png') no-repeat",
                opacity: 1,
                width: "202px",
                height: "245px"
            },
            closeBoxMargin: "28px 26px 0px 0px",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            pane: "floatPane",
            enableEventPropagation: false
        });

        // function that adds the markers on map
        var addMarkers = function(props, map) {
            $.each(props, function(i,prop) {
                var latlng = new google.maps.LatLng(prop.position.lat,prop.position.lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: new google.maps.MarkerImage( 
                        imagePath + '/images/' + prop.markerIcon,
                        null,
                        null,
                        null,
                        new google.maps.Size(18, 18)
                    ),
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                });
                var infoboxContent = '<div class="infoW">' +
                                        '<div class="propImg">' +
                                            '<img src="' + prop.image + '">' +
                                            '<div class="propBg">' +
                                                //'<div class="propPrice">' + prop.price + '</div>' +
                                                //'<div class="propType">' + prop.type + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="paWrapper">' +
                                            '<div class="propTitle">' + prop.title + '</div>' +
                                            '<div class="propAddress">' + prop.address + '</div>' +
                                        '</div>' +
                                        /*'<div class="propRating">' +
                                            '<span class="fa fa-star"></span>' +
                                            '<span class="fa fa-star"></span>' +
                                            '<span class="fa fa-star"></span>' +
                                            '<span class="fa fa-star"></span>' +
                                            '<span class="fa fa-star-o"></span>' +
                                        '</div>' +
                                        '<ul class="propFeat">' +
                                            '<li><span class="fa fa-moon-o"></span> ' + prop.bedrooms + '</li>' +
                                            '<li><span class="icon-drop"></span> ' + prop.bathrooms + '</li>' +
                                            '<li><span class="icon-frame"></span> ' + prop.area + '</li>' +
                                        '</ul>' +*/
                                        '<div class="clearfix"></div>' +
                                        '<div class="infoButtons">' +
                                            '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo btn-primary">Close</a>' +
                                            '<a href="' + prop.url + '" class="btn btn-sm btn-round btn-green viewInfo btn-primary">View</a>' +
                                        '</div>' +
                                     '</div>';

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infobox.setContent(infoboxContent);
                        infobox.open(map, marker);
                        map.panTo(this.getPosition());
                        map.setZoom(16);
                    }
                })(marker, i));

                google.maps.event.addListener(marker, 'rightclick', (function(marker, i) {
                    return function() {
                        map.setZoom(5);
                        map.setCenter(new google.maps.LatLng(-0.422504, 117.627799));
                    }
                })(marker, i));

                $(document).on('click', '.closeInfo', function() {
                    infobox.open(null,null);
                });

                markers.push(marker);
            });
        }

        var map;

        if (map) {
            google.maps.event.trigger(map, 'resize');
        }

        setTimeout(function() {
            $('body').removeClass('notransition');

            map = new google.maps.Map(document.getElementById('mapView'), options);
            var styledMapType = new google.maps.StyledMapType(styles, {
                name : 'Styled'
            });

            map.mapTypes.set('Styled', styledMapType);
            map.setCenter(new google.maps.LatLng(-0.422504, 117.627799));
            map.setZoom(5);

            if ($('#address').length > 0) {
                newMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(-6.596723, 106.803219),
                    map: map,
                    icon: new google.maps.MarkerImage( 
                        'images/marker-new.png',
                        null,
                        null,
                        // new google.maps.Point(0,0),
                        null,
                        new google.maps.Size(36, 36)
                    ),
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                });

                google.maps.event.addListener(newMarker, "mouseup", function(event) {
                    var latitude = this.position.lat();
                    var longitude = this.position.lng();
                    $('#latitude').text(this.position.lat());
                    $('#longitude').text(this.position.lng());

                    $('#company-latitude').val(this.position.lat());
                    $('#company-longitude').val(this.position.lng());                
                });
            }

            addMarkers(props, map);
        }, 300);

        // functionality for autocomplete address field
        if ($('#address').length > 0) {
            var address = document.getElementById('address');
            var addressAuto = new google.maps.places.Autocomplete(address);

            google.maps.event.addListener(addressAuto, 'place_changed', function() {
                var place = addressAuto.getPlace();

                if (!place.geometry) {
                    return;
                }
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
                newMarker.setPosition(place.geometry.location);
                newMarker.setVisible(true);
                $('#latitude').text(newMarker.getPosition().lat());
                $('#longitude').text(newMarker.getPosition().lng());

                $('#company-latitude').text(newMarker.getPosition().lat());
                $('#company-longitude').text(newMarker.getPosition().lng());

                return false;
            });
        }
    }

});