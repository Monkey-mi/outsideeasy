Ext.define('srm.enquiryQuote.quote.store.QuotationDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.quote.model.QuotationDetail'],
	model: 'srm.enquiryQuote.quote.model.QuotationDetail',
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
			create: 'quote/quotation.do?method=addQuotationDetail',
			update: 'quote/quotation.do?method=updateQuotationDetail',
			read: 'quote/quotation.do?method=getQuotationDetailList',
			destroy: 'quote/quotation.do?method=deleteQuotationDetail'
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
		property: 'item_order',
		direction: 'ASC'
	}]
});
