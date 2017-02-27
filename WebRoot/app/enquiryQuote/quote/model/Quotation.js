Ext.define('srm.enquiryQuote.quote.model.Quotation', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'quotation_id',
	fields: [
		{ name: 'quotation_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'cpyname_cn'},
		{ name: 'enquiry_detail_id', type: 'int' },
		{ name: 'quote_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'material_costs', type: 'float' },
		{ name: 'process_cost', type: 'float' },
		{ name: 'transportation', type: 'float' },
		{ name: 'other_item' },
		{ name: 'other_cost', type: 'float' },
		{ name: 'vat', type: 'float' },
		{ name: 'enquiry_price', type: 'float' },
		{ name: 'status', type: 'int' }
	]
});
