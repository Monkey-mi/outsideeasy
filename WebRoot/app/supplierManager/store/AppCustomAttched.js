/*公司注册附件自定义上传表store*/
Ext.define('srm.supplierManager.store.AppCustomAttched', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppRegisterAttched'],
	model: 'srm.supplierManager.model.AppRegisterAttched',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
