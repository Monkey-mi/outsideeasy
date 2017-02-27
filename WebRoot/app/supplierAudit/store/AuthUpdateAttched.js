Ext.define('srm.supplierAudit.store.AuthUpdateAttched', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.AuthUpdateAttched'],
	model: 'srm.supplierAudit.model.AuthUpdateAttched',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/authUpdateAttched.do?method=addAuthUpdateAttched',
			update: 'supplier/authUpdateAttched.do?method=updateAuthUpdateAttched',
			read: 'supplier/authUpdateAttched.do?method=getAuthUpdateAttchedList',
			destroy: 'supplier/authUpdateAttched.do?method=deleteAuthUpdateAttched'
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
