function basic_valid( elem )
{
	var target          = $( elem ),
		target_input    = target.find( 'input' ),
		target_must     = target_input.data( 'must' ),
		target_sameas   = target_input.data( 'sameas' ),
		target_regex    = target_input.data( 'regex' ),
		target_modifier = target_input.data( 'modifier' ),
		target_hint     = target_input.data( 'hint' ),
		target_validity = target.find( '.validity' ),
		target_hintbox  = target.find( '.hintbox' )
	;
	if ( !target_must     ) target_must = false;
	if ( !target_sameas   ) target_sameas = null;
	if ( !target_regex    ) target_regex = '';
	if ( !target_modifier ) target_modifier = 'g';
	if ( !target_hint     ) target_hint = '';

	var valid = ( target_sameas === null ) ? target_input.val().match( new RegExp( target_regex , target_modifier ) ) : target_input.val() == $( 'input[name="' + target_sameas + '"]:eq(0)' ).val();
	if ( !target_must ) valid = valid || ( target_input.val() == '' );

	if ( !target_must && target_input.val() == "" ) {
		target_validity.find( 'icon' )
			.removeClass( 'glyphicon-ok-sign color-success' )
			.removeClass( 'glyphicon-remove-sign color-fail' )
		;
		target_hintbox
			.removeClass( 'color-success color-fail' )
			.html( '' )
		;
		return true;
	} else if ( valid ) {
		target_validity.find( 'icon' )
			.removeClass( 'glyphicon-remove-sign color-fail' )
			.addClass( 'glyphicon-ok-sign color-success' )
		;
		target_hintbox
			.removeClass( 'color-fail' )
			.addClass( 'color-success' )
			.html( '' )
		;
		return true;
	}else{
		target_validity.find( 'icon' )
			.removeClass( 'glyphicon-ok-sign color-success' )
			.addClass( 'glyphicon-remove-sign color-fail' )
		;
		target_hintbox
			.removeClass( 'color-success' )
			.addClass( 'color-fail' )
			.html( target_hint )
		;
		return false;
	}
}

$( document ).ready( function () {
	var target = $( 'div.basic-valid.input' );
	$.each( target , function ( i , elem ) {
		var self = $( elem );
		self
			.css( { 'position' : 'relative' } )
			.append( $( '<div class="validity"><icon class="glyphicon"></icon></div>' ).on( 'click' , function () { target.find( 'input' ).focus(); } ) )
			.append( '<span class="hintbox"/>' )
		;
		self.find( 'input' ).on( 'change keydown focusout' , function () {
			setTimeout( function () { basic_valid( self ); } , 50 );
		} );
		related = self.find( 'input' ).data( 'sameas' );
		$( 'input[name="' + related + '"]:eq(0)' ).on( 'change focusout' , function () {
			self.find( 'input' ).val( '' );
			setTimeout( function () { basic_valid( self ); } , 50 );
		});
	});
});