Ext.define('srm.enquiryQuote.enquiry.model.Enquiry', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'enquiry_id',
	fields: [
		{ name: 'enquiry_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name:'cpyname_cn'},
		{ name: 'enquiry_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'enquiry_item' },
		{ name: 'invoice' },
		{ name: 'tax_rate', type: 'float' },
		{ name: 'payment_way' },
		{ name: 'enddate', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'remark' },
		{ name: 'enquiry_person' },
		{ name: 'enquiry_status', type: 'int' }
	]
});
