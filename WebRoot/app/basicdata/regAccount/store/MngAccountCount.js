Ext.define('srm.basicdata.regAccount.store.MngAccountCount', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.MngAccountCount'],
	model: 'srm.basicdata.regAccount.model.MngAccountCount',
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		api: {		
			read: 'mngregAccount/getAccountCountBg.do'
	
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
		property: 'u_id',
		direction: 'ASC'
	}]
});
