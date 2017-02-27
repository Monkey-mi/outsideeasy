Ext.define('srm.basic.model.Code',{
	extend: 'Ext.data.Model',
	idProperty :'cid',
	identifier:'negative',
	fields:[
	        {name:'cid',type:'int'},
	        {name:'type_code'},
	        {name:'code'},
	        {name:'name'},
	        {name:'value'},
	        {name:'order_seq',type:'int'},
	        {name:'attrib'},
	        {name:'def_1'},
	        {name:'def_2'},
	        {name:'def_3'}
	]
});