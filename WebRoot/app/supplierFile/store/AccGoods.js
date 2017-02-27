Ext.define('srm.supplierFile.store.AccGoods', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccGoods'],
	model: 'srm.supplierFile.model.AccGoods',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				create: 'supplier/goods.do?method=addAccGoods',
				update: 'supplier/goods.do?method=updateAccGoods',
				read: 'supplier/goods.do?method=getAccGoodsList',
				destroy: 'supplier/goods.do?method=deleteAccGoods'
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
