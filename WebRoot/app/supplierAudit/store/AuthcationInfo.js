Ext.define('srm.supplierAudit.store.AuthcationInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.AuthcationInfo'],
	model: 'srm.supplierAudit.model.AuthcationInfo',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/authcationInfo.do?method=addAuthcationInfo',
			update: 'supplier/authcationInfo.do?method=updateAuthcationInfo',
			read: 'supplier/authcationInfo.do?method=getAuthcationInfoList',
			destroy: 'supplier/authcationInfo.do?method=deleteAuthcationInfo'
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
		property: 'auth_id',
		direction: 'ASC'
	}]
});
