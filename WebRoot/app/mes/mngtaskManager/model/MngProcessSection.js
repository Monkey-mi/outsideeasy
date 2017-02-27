Ext.define('srm.mes.mngtaskManager.model.MngProcessSection', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'sec_id',
	fields: [
		{ name: 'sec_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'section_name' },
		{ name: 'sx', type: 'int' },
		{ name: 'mjbz', type: 'int' }
	]
});
