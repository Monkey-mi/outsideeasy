Ext.define('srm.applicationRecord.store.MngAccessApplicationRecord', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.applicationRecord.model.MngAccessApplicationRecord'],
	model: 'srm.applicationRecord.model.MngAccessApplicationRecord',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'mngAccessApplicationRecord/accessApplicationRecordbg.do?method=addMngAccessApplicationRecord',
			update: 'mngAccessApplicationRecord/accessApplicationRecordbg.do?method=updateMngAccessApplicationRecord',
			read: 'mngAccessApplicationRecord/accessApplicationRecordbg.do?method=getMngAccessApplicationRecordList',
			destroy: 'mngAccessApplicationRecord/accessApplicationRecordbg.do?method=deleteMngAccessApplicationRecord'
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
		property: 'record_id',
		direction: 'ASC'
	}]
});
