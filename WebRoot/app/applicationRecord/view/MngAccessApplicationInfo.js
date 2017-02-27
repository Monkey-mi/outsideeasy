Ext.define('srm.applicationRecord.view.MngAccessApplicationInfo',{
	extend:'srm.ux.Window',
	alias:'widget.mngAccessInfo',
	requires : [          
                'srm.applicationRecord.view.MngAccessApplicationVo'       
	            ],	
	width:980,
    height:600,
    modal : true,
	
	initComponent:function(){
		var me=this;	
		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2				
			},
			items:[{
				region:'center',
				xtype:'form',
				flex:1,
				title:'准入申请',
				bodyPadding: 10,
				itemId:'grid_head',
				store:me.store,
				layout: 'column',
			  	
	       		defaults:{labelWidth:80,xtype:'textfield',padding:3},
				items:
				[
					{fieldLabel:'主键ID',name:'record_id',hidden:true,columnWidth:1},
					{fieldLabel:'提交人',name:'submit_name',maxLength:200,columnWidth:0.5},
					{fieldLabel:'接收人',name:'receive_name',columnWidth:0.5},
					{fieldLabel:'创建时间',name:'create_dt',columnWidth:0.5,xtype: 'datefield'},
					{fieldLabel:'准入申请状态',name:'access_status',hidden:true},
					{fieldLabel:'准入邀请表ID',name:'receive_invite_id',columnWidth:0.5}	,
					{fieldLabel:'模板头ID',name:'h_id',columnWidth:0.5}
				]
			},
				{
					xtype:'tabpanel',
					flex:2,
					region:'south',
					title:'准入资料',
					items:[
							{
								title:'',
								xtype:'mngAccessApplicationVo',	
								itemId:'grid_Info1',
								store: me.infostore1					  
							},
							{
								title:'',
								xtype:'mngAccessApplicationVo',	
								itemId:'grid_Info2',
								store: me.infostore2				  
							},								
							{
								title:'',
								xtype:'mngAccessApplicationVo',	
								itemId:'grid_Info3',
								store: me.infostore3					  
							}					  
						]
				}]
			});
		me.callParent(arguments);
		
	},
   loadData:function(rec){
	var me=this;
	me.down("form").loadRecord(rec);
}

});