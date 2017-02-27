Ext.define('srm.supplierManager.store.AppBankAccount', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppBankAccount'],
	model: 'srm.supplierManager.model.AppBankAccount',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'account_id',
		direction: 'ASC'
	}]
});
