Ext.define('srm.supplierFile.store.AccInvoiceTitle', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccInvoiceTitle'],
	model: 'srm.supplierFile.model.AccInvoiceTitle',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				create: 'supplier/invoiceTitle.do?method=addAccInvoiceTitle',
				update: 'supplier/invoiceTitle.do?method=updateAccInvoiceTitle',
				read: 'supplier/invoiceTitle.do?method=getAccInvoiceTitleList',
				destroy: 'supplier/invoiceTitle.do?method=deleteAccInvoiceTitle'
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
