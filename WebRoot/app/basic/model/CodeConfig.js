/**
 * 基础数据帮助配置
 */
Ext.define('srm.basic.model.CodeConfig',{
	extend:'Ext.data.Model',
	idProperty:'id',
	identifier:'negative',
	fields:[
	        {name:'id',type:'int'},
	        {name:'name'},
	        {name:'code_type'},
	        {name:'type'},
	        {name:'displayField'},
	        {name:'valueField'}
	        ]
});