Ext.define('srm.basicdata.regAccount.store.MngRegSupplier', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.SupplierFiles'],
	model: 'srm.basicdata.regAccount.model.SupplierFiles',
	proxy: {
		type: 'ajax',
		actionMethods : {  
			update : 'POST',
            read : 'POST' ,
            
        },
		api: {		
			update: 'mngregAccount/reAccountServiceBg.do?method=addMngRegAccout',
			read: 'mngregAccount/reAccountServiceBg.do?method=getRegaccountForSupplier'		
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
	sorters: [{
		property: 'supplier_id',
		direction: 'ASC'
	}]
});
