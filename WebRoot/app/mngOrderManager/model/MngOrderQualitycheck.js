/**
 * <p>Table: t_order_qualitycheck - </p>
 * @since 2017-02-22 05:24:18
 */
Ext.define('srm.mngOrderManager.model.MngOrderQualitycheck', {
	extend: 'Ext.data.Model',
	idProperty: 'check_id',
	fields: [
			{ name:'tablename',defaultValue:'t_order_qualitycheck'},
			{ name: 'check_id', type: 'int' },
			{ name: 'checkor_id', type: 'int' },
			{ name: 'checkor_name'},
			{ name: 'check_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
			{ name: 'source_type', type: 'int' },
			{ name: 'delivery_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
			{ name: 'delivery_number'},
			{ name: 'pur_company_id', type: 'int' },
			{ name: 'sup_company_id', type: 'int' },
			{ name: 'supplier_id', type: 'int' },
			{ name: 'send_cpyname_cn' },
			{ name: 'receive_cpyname_cn'}
			
			
		
	]
});
