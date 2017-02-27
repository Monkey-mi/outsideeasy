/**
 * <p>Table: t_order_check_details - </p>
 * @since 2017-02-22 05:30:17
 */
Ext.define('srm.mngOrderManager.model.MngOrderCheckDetails', {
	extend: 'Ext.data.Model',
	idProperty: 'check_detail_id',
	fields: [
			{ name:'tablename',defaultValue:'t_order_check_details'},
			{ name: 'check_detail_id', type: 'int' },
			{ name: 'check_id', type: 'int' },
			{ name: 'order_detail_id', type: 'int' },
			{ name: 'check_number', type: 'int' },
			{ name: 'check_result'},
			{ name: 'check_vote'},
			{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
		
	]
});
