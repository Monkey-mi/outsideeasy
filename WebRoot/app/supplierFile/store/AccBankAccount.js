Ext.define('srm.supplierFile.store.AccBankAccount', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccBankAccount'],
	model: 'srm.supplierFile.model.AccBankAccount',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
				create: 'supplier/bankAccount.do?method=addAccBankAccount',
				update: 'supplier/bankAccount.do?method=updateAccBankAccount',
				read: 'supplier/bankAccount.do?method=getAccBankAccountList',
				destroy: 'supplier/bankAccount.do?method=deleteAccBankAccount'
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
