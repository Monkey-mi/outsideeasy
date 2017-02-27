Ext.define('srm.supplierManager.store.AppInvoiceTitle', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppInvoiceTitle'],
	model: 'srm.supplierManager.model.AppInvoiceTitle',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/invoiceTitle.do?method=addInvoiceTitle',
			update: 'supplier/invoiceTitle.do?method=updateInvoiceTitle',
			read: 'supplier/invoiceTitle.do?method=getInvoiceTitleList',
			destroy: 'supplier/invoiceTitle.do?method=deleteInvoiceTitle'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'invoice_title_id',
		direction: 'ASC'
	}]
});
