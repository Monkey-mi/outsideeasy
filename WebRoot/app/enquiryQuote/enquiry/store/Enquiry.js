Ext.define('srm.enquiryQuote.enquiry.store.Enquiry', {
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
			create: 'enquiry/enquiry.do?method=addEnquiry',
			update: 'enquiry/enquiry.do?method=updateEnquiry',
			read: 'enquiry/enquiry.do?method=getEnquiryList',
			destroy: 'enquiry/enquiry.do?method=deleteEnquiry'
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
