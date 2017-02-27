Ext.define('srm.basicdata.companyClass.store.CompanyClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.companyClass.model.CompanyClass'],
	model: 'srm.basicdata.companyClass.model.CompanyClass',
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
			usePaging:true
		},
		api: {
			create: 'companyClass/companyClass.do?method=addCompanyClass',
			update: 'companyClass/companyClass.do?method=updateCompanyClass',
			read: 'companyClass/companyClass.do?method=getCompanyClassList',
			destroy: 'companyClass/companyClass.do?method=deleteCompanyClass'
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
		property: 'nature_id',
		direction: 'ASC'
	}]
});
