Ext.define('srm.basic.model.CodeType',{
	extend:'Ext.data.Model',
	idProperty :'tcid',
	identifier:'negative',
	fields:[
	        {name:'tcid',type:'int'},
	        {name:'type_code'},
	        {name:'name'},
	        {name:'attrib'},
	        {name:'def_1'},
	        {name:'def_2'},
	        {name:'remark'},
	        {name:'con_type'},
	        {name:'suit_type'}
	]
});