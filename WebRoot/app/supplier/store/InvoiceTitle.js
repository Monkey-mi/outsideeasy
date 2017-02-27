Ext.define('srm.supplier.store.InvoiceTitle', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.InvoiceTitle'],
	model: 'srm.supplier.model.InvoiceTitle',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'invoice_title_id',
		direction: 'DESC'
	}]
});
