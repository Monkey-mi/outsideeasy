/*公司注册附件自定义上传表store*/
Ext.define('srm.supplier.store.CustomAttched', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.Attched'],
	model: 'srm.supplier.model.Attched',
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
			create: 'supplier/attched.do?method=addAttched',
			update: 'supplier/attched.do?method=updateAttched',
			read: 'supplier/attched.do?method=getAttchedList',
			destroy: 'supplier/attched.do?method=deleteAttched'
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
	sorters: [{
		property: 'id',
		direction: 'ASC'
	}]
});

