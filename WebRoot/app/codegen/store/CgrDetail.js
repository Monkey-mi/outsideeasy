Ext.define('srm.codegen.store.CgrDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.codegen.model.CgrDetail'],
	model: 'srm.codegen.model.CgrDetail',
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
			create: 'codegen/CgrDetail.do?method=addCgrDetail',
			update: 'codegen/CgrDetail.do?method=updateCgrDetail',
			read: 'codegen/CgrDetail.do?method=getCgrDetailList',
			destroy: 'codegen/CgrDetail.do?method=deleteCgrDetail'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
