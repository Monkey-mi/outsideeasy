Ext.define('srm.supplierAudit.store.AuthcationUpdate', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.AuthcationUpdate'],
	model: 'srm.supplierAudit.model.AuthcationUpdate',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/authcationUpdate.do?method=addAuthcationUpdate',
			update: 'supplier/authcationUpdate.do?method=updateAuthcationUpdate',
			read: 'supplier/authcationUpdate.do?method=getAuthcationUpdateList',
			destroy: 'supplier/authcationUpdate.do?method=deleteAuthcationUpdate'
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
		property: 'auth_update_id',
		direction: 'ASC'
	}]
});
