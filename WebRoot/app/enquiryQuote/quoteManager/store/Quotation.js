Ext.define('srm.enquiryQuote.quoteManager.store.Quotation', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.quoteManager.model.Quotation'],
	model: 'srm.enquiryQuote.quoteManager.model.Quotation',
	pageSize: 15,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'quote/quotation.do?method=addQuotation',
			update: 'quote/quotation.do?method=updateQuotation',
			read: 'quote/quotation.do?method=getQuotationList',
			destroy: 'quote/quotation.do?method=deleteQuotation'
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
		property: 'quotation_id',
		direction: 'ASC'
	}]
});
