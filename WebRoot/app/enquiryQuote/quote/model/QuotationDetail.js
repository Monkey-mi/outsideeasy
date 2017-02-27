Ext.define('srm.enquiryQuote.quote.model.QuotationDetail', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'quodetail_id',
	fields: [
		{ name: 'quodetail_id', type: 'int' },
		{ name: 'quotation_id', type: 'int' },
		{ name: 'item_order', type: 'int' },
		{ name: 'item_name' },
		{ name: 'item_description' },
		{ name: 'qty', type: 'float' },
		{ name: 'uom' },
		{ name: 'unit_price', type: 'float' },
		{ name: 'total_prcie', type: 'float' }
	]
});
