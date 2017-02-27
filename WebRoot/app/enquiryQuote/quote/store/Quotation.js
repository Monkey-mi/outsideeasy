Ext.define('srm.enquiryQuote.quote.store.Quotation', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.quote.model.Quotation'],
	model: 'srm.enquiryQuote.quote.model.Quotation',
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
