Ext.define('srm.basicdata.regAccount.store.MngCompanyInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.MngCompanyInfo'],
	model: 'srm.basicdata.regAccount.model.MngCompanyInfo',
	proxy: {
		type: 'ajax',
		actionMethods : {     
            read : 'POST'           
        },
		api: {			
			read: 'mngregAccount/reAccountServiceBg.do?method=getMngCompanyInfoList'
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
		property: 'company_id',
		direction: 'ASC'
	}]
});
