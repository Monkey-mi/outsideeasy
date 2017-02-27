Ext.define('srm.enquiryQuote.enquiry.model.EnquiryDistribution', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'distribution_id',
	fields: [
		{ name: 'distribution_id', type: 'int' },
		{ name: 'enquiry_id', type: 'int' },
		{ name: 'distribute_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'company_id', type: 'int' },
		{ name: 'cpyname_cn'}
	]
});