Ext.define('srm.templet.store.MngAccessTemplet', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngAccessTemplet'],
	model: 'srm.templet.model.MngAccessTemplet',
	pageSize: 999,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'mngAccessTemplet/mngAccessTempletbg.do?method=addMngAccessTemplet',
			update: 'mngAccessTemplet/mngAccessTempletbg.do?method=updateMngAccessTemplet',
			read: 'mngAccessTemplet/mngAccessTempletbg.do?method=getMngAccessTempletList',
			destroy: 'mngAccessTemplet/mngAccessTempletbg.do?method=deleteMngAccessTemplet'
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
		property: 'templet_id',
		direction: 'ASC'
	}]
});
