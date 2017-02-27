Ext.define('srm.enquiryQuote.quote.store.EnquiryDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.enquiry.model.EnquiryDetail'],
	model: 'srm.enquiryQuote.enquiry.model.EnquiryDetail',
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
			read: 'enquiry/enquiry.do?method=getEnquiryDetailList'
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
	sorters: [{
		property: 'item_order',
		direction: 'ASC'
	}]
});
