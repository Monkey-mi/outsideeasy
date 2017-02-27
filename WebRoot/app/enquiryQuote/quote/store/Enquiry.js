Ext.define('srm.enquiryQuote.quote.store.Enquiry', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.enquiry.model.Enquiry'],
	model: 'srm.enquiryQuote.enquiry.model.Enquiry',
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
			read: 'enquiry/enquiry.do?method=getEnquiryListForSupplier'
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
		property: 'enquiry_id',
		direction: 'ASC'
	}]
});
