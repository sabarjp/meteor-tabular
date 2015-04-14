/*! DataTables Semantic UI integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Semantic UI. This requires Semantic UI and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Semantic UI. 
 */
(function(window, document, undefined){

var factory = function( $, DataTable ) {
"use strict";


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'two column row dataTables_filter'<'column'l><'column right aligned'<'ui search'f>>r>" +
		"<'sixteen wide column't>" +
		"<'two column row'<'column'i><'column'p>>",

	renderer: 'semanticUi',

	oLanguage: {
		sInfo: 'Showing _START_ to _END_ (of _TOTAL_)',
		sInfoEmpty: 'Showing 0 entries',
		sInfoFiltered: '(filtered from _MAX_ total)',
		sLengthMenu: 'Display _MENU_',
		sSearch: '',
		sSearchPlaceholder: 'Search...'
	},

	/* we want to take advantage of semantic responsive table */
	bAutoWidth: false
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "ui stackable sixteen column grid",
	sFilterInput:  "prompt",
	sFilter:       "ui input",
	sLengthSelect: "ui dropdown",
	sLength:       "ui input"
} );



/* Semantic UI filter render */
DataTable.ext.renderer.header.semanticUi = function ( settings, cell, column, classes ){
	$(settings.nTable).on('order.dt.DT', function (e, ctx, sorting, columns){
		if(settings != ctx){
			return;
		}

		var colIdx = column.idx;

		cell.removeClass(column.sSortingClass + ' ' + classes.sSortAsc + ' ' +
			classes.sSortDesc
		)
		.addClass(columns[colIdx] == 'asc' ? 
			classes.sSortAsc : columns[colIdx] == 'desc' ?
				classes.sSortDesc : 
					column.sSortingClass
		);
	});
};

/* Semantic UI paging button renderer */
DataTable.ext.renderer.pageButton.semanticUi = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var btnDisplay, btnClass, btnPrefixIconClass, btnSuffixIconClass;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') ) {
				api.page( e.data.action ).draw( false );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';
				btnPrefixIconClass = '';
				btnSuffixIconClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&hellip;';
						btnClass = 'item' + ' disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + ' item' + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + ' item' + (page > 0 ?
							'' : ' disabled');
						btnPrefixIconClass = 'left arrow icon';
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + ' item' + (page < pages-1 ?
							'' : ' disabled');
						btnSuffixIconClass = 'right arrow icon';
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + ' item' + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'item active' : 'item';
						break;
				}

				if ( btnDisplay ) {
					node = $('<a>', {
							'class': classes.sPageButton+' '+btnClass,
							'aria-controls': settings.sTableId,
							'tabindex': settings.iTabIndex,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<i>', {
								'class': btnPrefixIconClass
							} )
						)
						.append( btnDisplay )
						.append( $(' <i>', {
								'class': btnSuffixIconClass
							} )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);
				}
			}
		}
	};

	attach(
		$(host).empty().html('<div class="ui borderless pagination menu"/>').children('div'),
		buttons
	);
};


/*
 * TableTools Semantic UI compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Semantic UI
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn btn-default",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a Semantic UI compatible drop down
	$.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}

}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);

