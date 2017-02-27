Ext.define('srm.applicationRecord.store.MngAccessApplicationInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.applicationRecord.model.MngAccessApplicationInfo'],
	model: 'srm.applicationRecord.model.MngAccessApplicationInfo',
	pageSize: 99,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'mngAccessApplicationRecord/accessApplicationInfobg.do?method=addMngAccessApplicationInfo',
			update: 'mngAccessApplicationRecord/accessApplicationInfobg.do?method=updateMngAccessApplicationInfo',
			read: 'mngAccessApplicationRecord/accessApplicationInfobg.do?method=getMngAccessApplicationInfoList',
			destroy: 'mngAccessApplicationRecord/accessApplicationInfobg.do?method=deleteMngAccessApplicationInfo'
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
		property: 'info_id',
		direction: 'ASC'
	}]
});
