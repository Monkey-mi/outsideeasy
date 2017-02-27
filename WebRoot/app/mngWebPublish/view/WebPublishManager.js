Ext.define('srm.mngWebPublish.view.WebPublishManager',{
	extend:'srm.ux.Panel',
	alias:'widget.WebPublishManager',
	initComponent:function(){
		var me=this;
		me.webStore = Ext.create('srm.mngWebPublish.store.WebContent');
			Ext.apply(this,{
    		layout:{
    			type:'border',
    			padding :2
    		},			
    		items:[
		         {  
		        	region:'center',
		        	split: true,
		        	title:'网页列表',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_web',		
	  		  		store: me.webStore,
	  				columnLines:true,
	  				dockedItems:[{
	   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
	   	  	  			items:[ 
	   	  	  			{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入网页标题或者创建人关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
		 				{text:'查询',glyph:0xf002,itemId:'btn_search'},	
	   	   	  		    {text: '新增',glyph:0xf234,itemId:'BTN_ADD'},
	   	   	  		    {text: '修改',glyph:0xf0f0,itemId:'BTN_EDT',	disabled:true},
	   	   	  		    {text: '删除',glyph:0xf014,itemId:'BTN_DEL',	disabled:true}
	   	  	  			]
	  					},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.webStore,
								dock : 'bottom',
								defaultPageSize:25,
								displayInfo : true
						    }],
	  				        columns:[
	  							{text:'网页列表主键',dataIndex: 'web_id',flex:1},
	  							{text: '网页标题',dataIndex: 'web_title',flex:1},
	  							{text: '所属页面',dataIndex: 'content_type',flex:1,
	  								renderer:function(value){
			   	  	  					var sts='';
			   	  	  					if(value==2){
			   	  	  					sts='帮助中心';
			   	  	  					}
			   	  	  					return sts;
			   	  	  			}},
			   	  	  			{text: '所属模块',dataIndex: 'module_name',flex:1},
	  							{text: '创建人',dataIndex: 'creator',flex:1},
	  							{text:'创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'},
	  							{text:'修改时间',dataIndex: 'update_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'}
	  		           		]	  		           	  					   	  				   
		        }
    	]
    	});
    	this.callParent(arguments);  	
    }
});