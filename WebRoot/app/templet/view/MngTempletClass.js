Ext.define('srm.templet.view.MngTempletClass',{
  	extend:'srm.ux.Window',
	alias:'widget.mngTempletClass',
	requires : [
	            'srm.ux.SearchCombobox'
	            ],
	width:580,
    height:600,
    anchorSize:95,
    modal : true,
	
	initComponent:function(){
		var me=this;
		me.classtore = Ext.create('srm.templet.store.MngTempletClassify');//所属分类表
		Ext.apply(me.classtore.proxy.extraParams,{usePaging:true});	
		me.headstore = Ext.create('srm.templet.store.MngHead');//所属模板头
	var rowEditing1=Ext.create('Ext.grid.plugin.RowEditing', {
	        clicksToMoveEditor: 1,
	        autoCancel: false,
	        itemId:'rowEditing1',
	        pluginId:'rowEditing1',
	        listeners: {		       			        	
	   
	        	//编辑时事件
	        	'edit':function(editor, e) {
	        		if(e.record.get('oo')=='000'){	
	        			e.record.phantom =true;//标记这条记录在store中不存在		        											        			
	        		} 
	        		e.grid.getStore().sync({
	        					success : function(e, batch) {		        						
	        						me.classtore.reload();//必须的，避免记录没有主键的情况
									Ext.Msg.alert('提示', '保存成功！');									
								},
								failure : function(batch, options) {
									Ext.Msg.alert('提示', '保存失败！');
									me.classtore.reload();
								}
	        			});		        		
	        		e.record.commit();
					},
					//取消编辑是触发
					'canceledit':function(editor, e){
						if(e.record.get('oo')=='000'){
							e.grid.getStore().remove(e.record);
						}
					}
											
	        }
	});
		Ext.apply(me,{
			 layout:'fit',
			items:[{
				xtype:'grid',
				frame:true,
				split:true,
				title:'分类的类型',
				itemId:'grid_class',
				store:me.classtore,
				dockedItems:[
		  					              {xtype:'toolbar',dock:'top',itemId:'top_bar',
	   	  	  			            items:[
					  		           {text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD					  			             
					  		              },				  					   	  		           
								         {text: '删除',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT, disabled:true,	
			  		            	handler:function(){
										me.doDelete1();
									}  
						        }
			   	  		        ]},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.classtore,
								dock : 'bottom',
								displayInfo : true
						    }],		  		      
				 columns:[
				                    {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
								    {text:'主键ID',dataIndex: 'classify_id',flex:1,hidden:true},
									{text: '分类名称',dataIndex: 'classify_name',flex:1,editor:{maxLength:20,allowBlank:false}},
									{text: '模板头Id',dataIndex: 'h_id',flex:1,editor:{xtype:'srm_searchcbo',
						itemId:'search',emptyText:'请输入模板头名称或者id...',hideTrigger:false,store:me.headstore,displayField:'table_name',valueField:'h_id',allowBlank:false}},															
									{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'} 
		  		           		],
		  		           			   plugins: [rowEditing1]
			}
				]
			});
		me.callParent(arguments);
		
	},
	doDelete1: function() {
		var me = this;
		var grid=me.down('#grid_class');
		var rec = grid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
							Ext.Msg.alert('提示', '删除成功！');
							me.classtore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});