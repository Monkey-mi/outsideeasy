Ext.define('srm.codegen.store.BaseSeq', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.codegen.model.BaseSeq'],
	model: 'srm.codegen.model.BaseSeq',
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
			create: 'codegen/BaseSeq.do?method=addBaseSeq',
			update: 'codegen/BaseSeq.do?method=updateBaseSeq',
			read: 'codegen/BaseSeq.do?method=getBaseSeqList',
			destroy: 'codegen/BaseSeq.do?method=deleteBaseSeq'
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
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
