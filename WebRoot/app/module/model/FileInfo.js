Ext.define('srm.module.model.FileInfo',{
	extend:'Ext.data.Model',
	identifier:'negative',
	idProperty :'filename',
	fields:[
		{name:'chunkSize'},
		{name:'length'},
		{name:'filename'},
		{name:'aliases'},
		{name:'contentType'},
		{name:'uploadDate',type:'date',dateFormat:'Y-m-d H:i:s'}
		]
	
});