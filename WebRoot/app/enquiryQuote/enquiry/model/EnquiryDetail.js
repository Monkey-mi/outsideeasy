Ext.define('srm.enquiryQuote.enquiry.model.EnquiryDetail', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'enquiry_detail_id',
	fields: [
		{ name: 'enquiry_detail_id', type: 'int' },
		{ name: 'enquiry_id', type: 'int' },
		{ name:'item_order'},
		{ name: 'pro_name' },
		{ name: 'mc_id', type: 'int' },
		{ name: 'qty', type: 'float' },
		{ name: 'unit' },
		{ name: 'delivery_cycle' },
		{ name: 'description' },
		{ name: 'attched' }
	]
});
