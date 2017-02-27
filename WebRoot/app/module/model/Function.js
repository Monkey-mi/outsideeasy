Ext.define('srm.module.model.Function',{
	extend:'Ext.data.Model',
	identifier:'negative',
	idProperty :'f_id',
	fields:[
	        {name:'f_id',type:'int'},
	        {name:'mod_id',type:'int'},
	        {name:'code'},
	        {name:'name'},
	        {name:'type'},
	        {name:'order_seq',type:'int'}
	]
});