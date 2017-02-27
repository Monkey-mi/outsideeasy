Ext.define('srm.templet.view.MngTempletManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mngTempletManager',	
	initComponent:function(){
		var me=this;
		me.templetstore=Ext.create('srm.templet.store.MngAccessTemplet');//准入模板表		
	//	me.tlstore=Ext.create('srm.templet.store.MngAccessTempletElement');//模板中的字段元素表
		me.classtore = Ext.create('srm.templet.store.MngTempletClassify');//所属分类表
		me.headstore = Ext.create('srm.templet.store.MngAccessTempletHead');// 准入模板头表
		Ext.apply(me.headstore.proxy.extraParams,{usePaging:true});		
				
			
			Ext.apply(this,{
    		layout:{
    			type:'border',
    			padding :2
    		},			
    		items:[
		         {  
		        	region:'center',
		        	split: true,
		        	 flex:3,
		        	title:'准入模版',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_head',		
	  		  		store: me.headstore,
	  				columnLines:true,
	  				dockedItems:[
		  					              {xtype:'toolbar',dock:'top',itemId:'top_bar',
	   	  	  			            items:[
					  		           {text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD					  			             
					  		              },				  					   	  		           
								       {text: '编辑',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT, disabled:true
		   	  		    	             
								        }
			   	  		        ]},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.headstore,
								dock : 'bottom',
								displayInfo : true
						    }],
	  				        columns:[
	  				            {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
	  							{text:'主键ID',dataIndex: 'h_id',flex:1,hidden:true},
	  							{text: '模板头名称',dataIndex: 'table_name',flex:1},
	  							{text: '所属者',dataIndex: 'cpyname_cn',flex:1},
	  							{text: '版本号',dataIndex: 'version',flex:1},
	  							{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'	  			
	  						         }	  							 
	  		           		]	  		           	  					   	  				   
		        },
		        {
		        	xtype:'tabpanel',
		        	region:'south',
		        	split:true,
					 flex:2,	
					title:'详细信息',
					//layout:"column",
					items:[
					{
						xtype:'grid',
						title:'模版中的字段',
						split:true,
					    flex:1,	
					    itemId:'grid_templet',
			  		    store: me.templetstore,
			  		    columnLines:true,
			  		    columns:[
			  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
		  							{text:'模板id',dataIndex: 'templet_id',flex:1,hidden:true},
		  							{text: '模板头ID',dataIndex: 'h_id',flex:1,hidden:true},
		  							{text: '模板元素',dataIndex: 'e_name',flex:1},
		  							{text: '显示名称',dataIndex: 'templet_name',flex:1},
		  							{text: '是否必填项',dataIndex: 'is_must',flex:1,renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 0){
	  						            	return '否';
	  						            }else if(value == 1){
	  						            	return '是';
	  						            }	  						            	
	  						            }},
		  							{text: '排序字段',dataIndex: 'order_by',flex:1},
		  							{text: '所属分类',dataIndex: 'classify_name',flex:1},		  						
		  							{text: '界面占位比例%',dataIndex: 'seize_length',flex:1},
		  							{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'}  					
		  		           		]
					}				   
					       ]							        			        
    	}
    	]
    	});
    	this.callParent(arguments);    	
    }
});