Ext.define('srm.basicdata.industryClass.store.IndustryClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.industryClass.model.IndustryClass'],
	model: 'srm.basicdata.industryClass.model.IndustryClass',
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
			create: 'industryClass/IndustryClass.do?method=addIndustryClass',
			update: 'industryClass/IndustryClass.do?method=updateIndustryClass',
			read: 'industryClass/IndustryClass.do?method=getIndustryClassList',
			destroy: 'industryClass/IndustryClass.do?method=deleteIndustryClass'
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
		property: 'industry_id',
		direction: 'ASC'
	}]
});
