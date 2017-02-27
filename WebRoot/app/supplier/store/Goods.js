Ext.define('srm.supplier.store.Goods', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.Goods'],
	model: 'srm.supplier.model.Goods',
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'goods_id',
		direction: 'DESC'
	}]
});
