/**
 * <p>Table: t_order_delivery_register - </p>
 * @since 2017-02-22 02:01:12
 */
Ext.define('srm.mngOrderManager.model.MngOrderDeliveryRegister', {
	extend: 'Ext.data.Model',
	idProperty: 'register_id',
	fields: [
			{ name:'tablename',defaultValue:'t_order_delivery_register'},
			{ name: 'register_id', type: 'int' },
			{ name: 'delivery_number'},
			{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
			{ name: 'creator_id', type: 'int' },
			{ name: 'creator_name'},
			{ name: 'send_company_id', type: 'int' },
			{ name: 'send_cpyname_cn'},
			{ name: 'receive_company_id', type: 'int' },
			{ name: 'receive_cpyname_cn'},
			{ name: 'is_get', type: 'int' }
		
	]
});
