Ext.define('srm.supplierManager.store.AppGoods', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppGoods'],
	model: 'srm.supplierManager.model.AppGoods',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/goods.do?method=addGoods',
			update: 'supplier/goods.do?method=updateGoods',
			read: 'supplier/goods.do?method=getGoodsList',
			destroy: 'supplier/goods.do?method=deleteGoods'
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
		property: 'goods_id',
		direction: 'ASC'
	}]
});
