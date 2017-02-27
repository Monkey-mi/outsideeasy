Ext.define('srm.supplier.model.InvoiceTitle', {
	extend: 'srm.basic.model.Model',
	idProperty: 'invoice_title_id',
	identifier:'negative',
	fields: [
		{ name: 'invoice_title_id', type: 'int' },
		{ name: 'invoice_title_name' },
		{ name: 'company_id', type: 'int' },
		{ name: 'default_id',type:'boolean' }
	]
});
