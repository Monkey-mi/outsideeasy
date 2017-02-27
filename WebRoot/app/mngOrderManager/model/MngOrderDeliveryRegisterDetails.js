/**
 * <p>Table: t_order_delivery_register_details - </p>
 * @since 2017-02-22 03:34:45
 */
Ext.define('srm.mngOrderManager.model.MngOrderDeliveryRegisterDetails', {
	extend: 'Ext.data.Model',
	idProperty: 'detail_id',
	fields: [
			{ name:'tablename',defaultValue:'t_order_delivery_register_details'},
			{ name: 'detail_id', type: 'int' },
			{ name: 'register_id', type: 'int' },
			{ name: 'order_detail_id', type: 'int' },
			{ name: 'pur_order_id', type: 'int' },
			{ name: 'order_bh'},
			{ name: 'agreement_bh'},
			{ name: 'go_type', type: 'int' }
		
	]
});
