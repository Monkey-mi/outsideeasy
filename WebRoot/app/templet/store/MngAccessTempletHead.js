Ext.define('srm.templet.store.MngAccessTempletHead', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngAccessTempletHead'],
	model: 'srm.templet.model.MngAccessTempletHead',
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
			create: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=addMngAccessTempletHead',
			update: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=updateMngAccessTempletHead',
			read: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=getMngAccessTempletHeadList',
			destroy: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=deleteMngAccessTempletHead'
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
		property: 'h_id',
		direction: 'ASC'
	}]
});
