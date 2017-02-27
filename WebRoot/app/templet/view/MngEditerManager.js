Ext.define('srm.templet.view.MngEditerManager',{
	extend:'srm.ux.Window',
	alias:'widget.mngEditerManager',
	requires : ['srm.templet.view.MngAccessTempletView'	            
	            ],	
	width:980,
    height:600,
    modal : true,
	
	initComponent:function(){
		var me=this;
		me.cnstore = Ext.create('srm.templet.store.MngCompanyName');//公司名
			

		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2
				
			},
			buttons:[        
               {
                    text: '退出',
                    itemId:'CLOSE',
                    glyph:0xf057,
                    action:'ACT_CLOSE'
                }
            ],
			items:[{
				region:'center',
				xtype:'form',
				flex:1,
				title:'准入模板',
				bodyPadding: 10,
				itemId:'grid_edithead',
				store:me.headstore,
				layout: 'column',
				dockedItems:[
  					              {xtype:'toolbar',dock:'bottom',itemId:'top_bar',
	  	  			            items:[
			  		           {text: '保存',	glyph : 0xf016,		itemId:'save'
			  		              }				  			   	  		             						      
	   	  		        ]}
	   	  		   ],
			  	
	       		defaults:{labelWidth:80,xtype:'textfield',padding:3},
				items:
				[
					{fieldLabel:'主键ID',name:'h_id',hidden:true,columnWidth:1},
					{fieldLabel:'模板头名称',name:'table_name',maxLength:200,columnWidth:0.5,allowBlank:false},
					{fieldLabel:'所属者',name:'owner',columnWidth:0.5,xtype:'srm_searchcbo',
						itemId:'search',emptyText:'请输入公司名称或者id...',hideTrigger:false,store:me.cnstore,displayField:'cpyname_cn',valueField:'company_id',allowBlank:false},
					{fieldLabel:'版本号',name:'version',columnWidth:0.5,maxLength:50,allowBlank:false}
				//	{fieldLabel:'创建时间',name:'create_dt',columnWidth:1,hidden:true,xtype: 'datefield'}		
				]
			},
				{
					xtype:'tabpanel',
					flex:2,
					region:'south',
					title:'详细信息',
					items:[
							{
								xtype:'mngAccessTempletView',
								title:'模板中的字段',
								split:true,
							    flex:1,				
					  		    templetstore: me.templetstore					  
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