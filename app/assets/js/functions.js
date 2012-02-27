/**
 *
 * Global variable container
 *
 */
var APANELSCOM = {
	currentBanner: 0,
	zIndexCounter: 1
};



/**
 *
 * Document ready handler
 *
 */
$(function() {
	var userAgent = navigator.userAgent
	,	isIE6 = userAgent.indexOf('MSIE 6') > -1
	,	isIE7 = userAgent.indexOf('MSIE 7') > -1;
    
    // Setup carousel
    initBannerCarousel();
    
    var $body = $('body');
    
    if ($body.hasClass('contact')) {
    	if (!isIE6 && !isIE7) {
	    	// Setup styled droplists
	    	setupStyledDropLists();
	    }
	    
	    // Enquiry form validation
	    var $enqRequire = $('input, select', 'li.required');
	    
	    $enqRequire.after('<span class="required-feedback" />');
	    $enqRequire.on({
	        keyup: function (e) {
	        	if (e.keyCode !== 9) {
	        		var $this = $(this);
	        		validateField($this);
	            }
	    	}
	    });
    
	    var $enqForm = $('form');
	    $enqForm.on({
	        submit: function () {
	        	$enqRequire.each(function () {
	        		var $this = $(this);
	        		validateField($this);
	        	});
	        	
	        	if ($('li.required.error').length > 0) {
	        		var $alertText = 'Sorry, one or more of the fields has been missed or is filled out incorrectly.';
	        		alert($alertText);
	        		return false;
	        	};
	        }
	    });
    }
    
	// PNG fix
    if (isIE6) {
    	$(document).pngFix();
    }
});



/**
 *
 * Validates a form field
 *
 * @param {string} field
 *
 */
function validateField(field) {
	var	$this = field
	,	isValid = false
	,	$thisVal = $this.val();
	
	if ($this.attr('id') === 'contact-tel') {
		// Check if phone number is valid
		isValid = isValidPhoneNumber($thisVal);
	}
	else if ($this.attr('id') === 'contact-email') {
		// Check if email is valid
		isValid = isValidEmailAddress($thisVal);
	}
	else {
		// Else just check length
		if ($thisVal.length > 0) {
			isValid = true;
		};
	};
	
	if ($thisVal.length === 0) {
		$this.parent().removeClass('correct').addClass('error');	
	}
	else {
		if (isValid) {
			$this.parent().addClass('correct').removeClass('error');
		}
		else {
			$this.parent().addClass('error').removeClass('correct');
		}
	}
}



/**
 *
 * Creates the banner carousel
 *
 */
function initBannerCarousel() {
    var images = [['deal-banner.png', 'Massive Savings']]
    , i = 0
    , imagesLen = images.length
    , markup = ''
    , dotsMarkup = '<ul id="dots-holder"><li class="active" id="dot-0"><a rel="0" href="#">Go to Ad 1</a></li>';

    for (i; i < imagesLen; i++) {
        markup += '<img style="display:none;" src="assets/' + images[i][0] + '" alt="' + images[i][0] + '" title="' + images[i][0] + '" />'
        dotsMarkup += '<li id="dot-' + (i + 1) + '" class=""><a rel="' + (i + 1) + '" href="#">Go to Ad ' + (i + 1) + '</a></li>';
    }

    // Add the prev/next arrows
    markup += '<a id="banner-prev" href="#" title="Previous Banner"></a><a id="banner-next" href="#" title="Next Banner"></a>';

    // Add the dots
    dotsMarkup += '</ul>';
    markup += dotsMarkup;

    $('#banner').append(markup);

    $('#banner-prev').on({
        click: function() {
            var selectedBanner = (APANELSCOM.currentBanner - 1) < 0 ? imagesLen : APANELSCOM.currentBanner - 1;
            showBanner(selectedBanner);
            return false;
        }
    });

    $('#banner-next').on({
        click: function () {
            var selectedBanner = (APANELSCOM.currentBanner + 1) > imagesLen ? 0 : APANELSCOM.currentBanner + 1;
            showBanner(selectedBanner);
            return false;
        }
    });

    $('#dots-holder a').on({
        click: function () {
            showBanner($(this).attr('rel'));
            return false;
        }
    });
}



/**
 *
 * Shows a banner image
 *
 */
function showBanner(selectedBanner) {
    if (selectedBanner > -1) {
        APANELSCOM.currentBanner = selectedBanner;
       
        // Increment APANELSCOM.zIndexCounter
        APANELSCOM.zIndexCounter++;

        if (!$('#banner img').eq(selectedBanner).hasClass('current')) {
            // toggle the current class on the li
            $('#banner img').eq(selectedBanner).hide().css('z-index', APANELSCOM.zIndexCounter).fadeIn().addClass('current').siblings('img.current').removeClass('current');
            // and toggle the active class on the dots
            $('#dots-holder').css('z-index', APANELSCOM.zIndexCounter + 1).children('li').eq(selectedBanner).addClass('active').siblings('li.active').removeClass('active');
        };
    }
}



/**
 *
 * Sets up styled droplists
 *
 */
function setupStyledDropLists() {
    var i = 1
    ,   maxDropSize = 5
    ,   $realSelect = $('select')
    ,   realSelectLen = $realSelect.length
    ,   thisSel
    ,   $sel
    ,   selID
    ,   $currentValue
    ,   thisText
    ,   arrowDiv
    ,   nxtSelector
    ,   $nxtSel
    ,   $drpSel;
    
    for (i; i <= realSelectLen; i++) {
        thisSel = '#sel' + i;
        $sel = $($realSelect[i - 1]);
        $sel.attr('style', 'display:none;');
        $sel.prev().after('<a class="select" />');
        
        selID = 'sel' + i;
        $sel.prev().attr('rel', i).attr('id', selID);
       
        $currentValue = $(':selected', $sel).html();
       
        if ($currentValue === null) {
            $currentValue = $(':first-child', $sel).html();
        }
       
        thisText = 'text-holder' + i;
        arrowDiv = '<div class="text-holder" id="' + thisText + '" /><div class="arrow" rel="sel' + i + '" /><div class="dropdown-holder" rel="sel' + i + '" />';
        $(thisSel).html(arrowDiv);
       
        nxtSelector = thisSel + ' .dropdown-holder';
       
        $nxtSel = $(nxtSelector);
       
        $drpSel = $nxtSel;
       
        $nxtSel.html('text');
       
        thisText = '#' + thisText;
        $(thisText).html($currentValue);

       
        // Add a UL inside the dropdown
       
        $nxtSel.html('<ul />');
       
        var j = 1
        ,   $option
        ,   $options = $sel.children('option')
        ,   optionLen = $options.length;
        
        nxtSelector = thisSel + ' .dropdown-holder ul';
        $nxtSel = $(nxtSelector);
        
        for (j; j <= optionLen; j++) {
            $option = $($options[j - 1]);
            var isSelected = '';
            var isAll = '';
            
            if ($option.attr('selected') == 'selected') {
                isSelected = ' class="selected"';
            }
           
            if ($option.attr('disabled') == 'disabled') {
                isSelected = ' class="disabled"';
            }
            
            if ($option.hasClass('all-option')) {
                isAll = ' rel="all-option"';
                $nxtSel.addClass('has-all-option');
            }
           
            $thisOption = '<li' + isSelected + isAll + '><a rel="' + $option.val() + '">' + $option.html() + '</a></li>';
           
            $nxtSel.append($thisOption);
        }
       
        if (optionLen > maxDropSize) {
            $drpSel.addClass('big-list');
        }
           
        if ($sel.hasClass('wide-drop')) {
            $drpSel.addClass('wide-list');
        }
    }
    
	var $select = $('.select');
    
    $select.click(function (e) {        
        var $sel
        ,   i = 1
        ,   $thisSel = $(this)
        ,   selectLen = $select.length;
        
        for (i; i <= selectLen; i++) {
            $sel = $($select[i - 1]);
            
            if ($thisSel.attr('rel') !== $sel.attr('rel') && $sel.hasClass('open')) {
                $sel.removeClass('open');
            }
        }
        
        $thisSel.toggleClass('open');
        e.stopPropagation();
    });
    
    var $fakeOption = $('.select ul li a');
   
    /**
     *
     * Click event handler for a fake droplist option
     *
     */
    $fakeOption.on({
        click: function (e) {
			// Cache
		    var $this = $(this)
			,	messageString = ''
			,	$realFilter = $this.parent().parent().parent().parent().next('select')
		   	,	text = $this.text()
		   	,	value = $this.attr('rel');
		   	
			// Close the fake droplist
		    $this.closest('.select').removeClass('open');
		    
		    // Unselect selected options
		    var $options = $this.parent().parent().children('li').children('a');
		    
		    $options.each(function() {
		        if ($this != $(this)) {
		            $(this).parent().removeClass('selected');
		        }
		    });
		    
		    // Set the label text
		    $this.closest('.select').children('.text-holder').html(text);
		  
			// Toggle the tick on the option
		    $this.parent().toggleClass('selected');
		
			// Set the value on the real filter
			if ($realFilter) {
				$realFilter.val(value);
			}
		
		    $this = $(this);
		    
		    if ($this.parent().parent().children('.selected').length < 1) {
		        $this.parent().addClass('selected');
		    };
		
		    e.stopPropagation();
        }
    });
   
   
    // Blur the fake drop downs when you select another form element
    $('input, select, textarea').focus(function () {
        $select.removeClass('open');
    });
    
    // Blur the fake drop downs when you click elsewhere on the page
    $('body').click(function () {
        $select.removeClass('open');
    });
}



/**
 *
 * Validates a phone number
 *
 * @param {string} phoneNumber
 *
 * @return {boolean} whether or not the phone number is valid
 *
 */
function isValidPhoneNumber(phoneNumber) {
	var phoneNumberRegEx = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/i;
	return phoneNumberRegEx.test(phoneNumber);
};



/**
 *
 * Validates an email address
 *
 * @param {string} emailAddress
 *
 * @return {boolean} whether or not the email address is valid
 *
 */
function isValidEmailAddress(emailAddress) {
    if (emailAddress) {
        // Init vars
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        return pattern.test(emailAddress);
    };
};