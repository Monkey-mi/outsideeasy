Ext.define('srm.supplier.store.BankAccount', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.BankAccount'],
	model: 'srm.supplier.model.BankAccount',
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
			create: 'supplier/bankAccount.do?method=addBankAccount',
			update: 'supplier/bankAccount.do?method=updateBankAccount',
			read: 'supplier/bankAccount.do?method=getBankAccountList',
			destroy: 'supplier/bankAccount.do?method=deleteBankAccount'
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
		property: 'account_id',
		direction: 'DESC'
	}]
});
