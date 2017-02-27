Ext.define('srm.basicdata.file.store.MngBaseFileType', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.file.model.MngBaseFileType'],
	model: 'srm.basicdata.file.model.MngBaseFileType',
	pageSize: 50,
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
			create: 'basefile/basefilebg.do?method=addMngBaseFileType',
			update: 'basefile/basefilebg.do?method=updateMngBaseFileType',
			read: 'basefile/basefilebg.do?method=getMngBaseFileTypeList',
			destroy: 'basefile/basefilebg.do?method=deleteMngBaseFileType'
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
		property: 'ft_id',
		direction: 'ASC'
	}]
});
