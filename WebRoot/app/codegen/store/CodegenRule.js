Ext.define('srm.codegen.store.CodegenRule', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.codegen.model.CodegenRule'],
	model: 'srm.codegen.model.CodegenRule',
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
			create: 'codegen/CodegenRule.do?method=addCodegenRule',
			update: 'codegen/CodegenRule.do?method=updateCodegenRule',
			read: 'codegen/CodegenRule.do?method=getCodegenRuleList',
			destroy: 'codegen/CodegenRule.do?method=deleteCodegenRule'
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
		property: 'cgr_id',
		direction: 'ASC'
	}]
});
