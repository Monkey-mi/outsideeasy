Ext.define('srm.enquiryQuote.enquiry.store.EnquiryDistribution', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.enquiryQuote.enquiry.model.EnquiryDistribution'],
	model: 'srm.enquiryQuote.enquiry.model.EnquiryDistribution',
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
			create: 'enquiry/enquiry.do?method=addEnquiryDistribution',
			update: 'enquiry/enquiry.do?method=updateEnquiryDistribution',
			read: 'enquiry/enquiry.do?method=getEnquiryDistributionList',
			destroy: 'enquiry/enquiry.do?method=deleteEnquiryDistribution'
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
		property: 'distribution_id',
		direction: 'ASC'
	}]
});
