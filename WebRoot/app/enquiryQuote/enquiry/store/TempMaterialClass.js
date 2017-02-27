Ext.define('srm.enquiryQuote.enquiry.store.TempMaterialClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.materialClass.model.MaterialClass'],
	model: 'srm.basicdata.materialClass.model.MaterialClass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:false
		},
		api: {
			read: 'materialClass/materialClass.do?method=getMaterialClassList'
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
		property: 'mc_id',
		direction: 'ASC'
	}]
});
