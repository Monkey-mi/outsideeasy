Ext.define('srm.platformdata.mngIp.view.IpManager',{
     extend:"srm.ux.Panel",
     alias:'widget.ipManager',
     requires : [
	            'srm.ux.SearchCombobox',
	            'srm.ux.SearchCombobox2'
	            ],
     initComponent:function(){
     	var me = this;
     	me.ipstore = Ext.create('srm.platformdata.mngIp.store.IpAddress');//IP地址 
     	Ext.apply(me.ipstore.proxy.extraParams,{usePaging:true});
     	me.restore = Ext.create('srm.platformdata.mngIp.store.allName');//账户名称
     	var rowEditing=Ext.create('Ext.grid.plugin.RowEditing', {
	        clicksToMoveEditor: 1,
	        autoCancel: false,
	        itemId:'rowEditing',
	        pluginId: 'rowEditing',
	        listeners: {		       			        	
	        	//编辑时事件
	        	'edit':function(editor, e) {
	        		if(e.record.get('oo')=='000'){			
	        			e.record.phantom =true;//标记这条记录在store中不存在		        											        			
	        		}      		
	        		e.grid.getStore().sync({
	        					success : function(e, batch) {		        						
	        						me.ipstore.reload();//必须的，避免记录没有主键的情况
									Ext.Msg.alert('提示', '保存成功！');									
								},
								failure : function(batch, options) {
									Ext.Msg.alert('提示', '保存失败！');
									me.ipstore.reload();
								}
	        			});		        		
	        		e.record.commit();
					},
					//取消编辑是触发
					'canceledit':function(editor, e){
						if(e.record.get('oo')=='000'){
							e.grid.getStore().remove(e.record);
						}
					},
					'validateedit':function(editor,e,obj){							
					}						
	        }
	});
     	Ext.apply(this,{
     	layout:{
     		type:"border",
     		padding :2
     	},
     		items:[
     		 {
     		   region:'center',
     		   split: true,
     		   flex:1,
     		   title:'IP地址',
     		   xtype:'gridpanel',
     		   itemId:'grid_ip',
     		   store : me.ipstore,
     		   columnLines:true,
  		       dockedItems:[
     		               {xtype:'toolbar',dock:'top',itemId:'top_bar',
	   	  	  			            items:[
	   	  	  			            {xtype:'srm_searchcbo2',fieldLabel:'快速查询',					  
	   	 						    itemId:'search',emptyText:'请输入账号名称...',hideTrigger:false,store:me.restore,displayField:'allname',valueField:'allname',labelWidth:60,width:260},	   	 							
	   	 			 				{text:'查询',glyph:0xf002,itemId:'btn_search1'},
	   	 							{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
					  		        {text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD					  			             
					  		              },				  		
			   	  		            {text: '失效',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_DEL, disabled:true		   	  		    	             
								        }
								        
			   	  		        ]},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.ipstore,
								dock : 'bottom',
								displayInfo : true
						    }   
     		   ],
     		   plugins: [rowEditing],
     		   columns:[
     		      {text:'主键ID',dataIndex: 'adress_id',flex:1,hidden:true},
	  			  {text: '账号名称',dataIndex: 'login_id',flex:1,editor:{maxLength:20,allowBlank : false,xtype:'srm_searchcbo',
						itemId:'search',emptyText:'请输入账号名称...',hideTrigger:false,store:me.restore,displayField:'id',valueField:'allname'}},
	  			  {text: 'ip的状态',dataIndex: 'ip_state',flex:0.5,editor:{maxLength:20,xtype: 'combo',        
   		 	            store: [
   		 	                    ['0','临时'],[1,'常用'],['-1','失效']
   		 	                ]},
	  			  renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 0){
	  						            	return '临时';
	  						            }else if(value == 1){
	  						            	return '常用';
	  						            }else if(value == -1){
	  						            	return '失效';
	  						            }}
	  						            },
	  			  {text: 'ip地址',dataIndex: 'ip_address',flex:1,editor:{regex:/^\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\b$/,
                   regexText:'ip格式不正确', allowBlank : false }},
	  			  {text: '创建时间',dataIndex: 'create_time',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'}     		   
     		   ]   		  
     		  }
     		
     		]
     		
     	});
     	 this.callParent(arguments);
     }   
});