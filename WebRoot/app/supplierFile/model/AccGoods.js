Ext.define('srm.supplierFile.model.AccGoods', {
	extend: 'Ext.data.Model',
	idProperty: 'goods_id',
	identifier:'negative',
	fields: [
		{ name: 'goods_id', type: 'int' },
		{ name: 'goods_name' },
		{ name: 'goods_brand' },
		{ name: 'company_id', type: 'int' },
		{ name: 'mc_id', type: 'int' },
		{ name:'supplier_id'}
	]
});
