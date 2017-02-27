/**
 * <p>Table: t_order_delivery_attached - </p>
 * @since 2017-02-23 01:54:10
 */
Ext.define('srm.mngOrderManager.model.MngOrderDeliveryAttached', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [
			{ name:'tablename',defaultValue:'t_order_delivery_attached'},
			{ name: 'id', type: 'int' },
			{ name: 'file_type_id', type: 'int' },
			{ name: 'register_id', type: 'int' },
			{ name: 'file_name'},
			{ name: 'mogodb_id'},
			{ name: 'suffix_name'},
			{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
		
	]
});
