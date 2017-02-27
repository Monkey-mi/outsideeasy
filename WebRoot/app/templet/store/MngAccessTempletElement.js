Ext.define('srm.templet.store.MngAccessTempletElement', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngAccessTempletElement'],
	model: 'srm.templet.model.MngAccessTempletElement',
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
			create: 'mngAccessTempletElement/mngAccessTempletElementbg.do?method=addMngAccessTempletElement',
			update: 'mngAccessTempletElement/mngAccessTempletElementbg.do?method=updateMngAccessTempletElement',
			read: 'mngAccessTempletElement/mngAccessTempletElementbg.do?method=getMngAccessTempletElementList',
			destroy: 'mngAccessTempletElement/mngAccessTempletElementbg.do?method=deleteMngAccessTempletElement'
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
		property: 'e_id',
		direction: 'ASC'
	}]
});
