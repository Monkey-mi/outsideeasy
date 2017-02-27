Ext.define('srm.module.model.MogodbFile',{
	extend:'Ext.data.Model',
	identifier:'negative',
	idProperty :'filename',
	fields:[
		{name:'chunkSize'},
		{name:'length'},
		{name:'filename'},
		{name:'aliases'},
		{name:'contentType'},
		{name:'uploadDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'isimg'},
		{name:'useType'},
		{name:'comName'},
		{name:'comID'},
		{name:'userName'},
		{name:'useTypeName'}
		]
	
});