Ext.define('srm.basicdata.sFilter.view.SFilterManager',{	
	extend:'srm.ux.Window',
    alias:'widget.sFilterManager',
    
    height:480,
    width:720,
    anchorSize:95,
    modal : true,
    initComponent:function(){
    	var me =this;
    	me.store=Ext.create('srm.basicdata.sFilter.store.SFilter');
 		Ext.apply(me.store.proxy.extraParams, {usePaging:true});
 		
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
			        						me.store.reload();//必须的，避免记录没有主键的情况
			        						var result=srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateSysFilter',{
			        						});
											Ext.Msg.alert('提示', '保存成功！');
										},
										failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败！');
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
							if(e.record.get('oo')=='000'){			        							
								var rec=e.record;
								var result=srm.Const.callServiceMethodSync('sFilter/sFilter.do?method=checkForAdd',{
									filter_url:e.newValues.filter_url,
									remark:e.newValues.remark
										//f_id:rec.get('f_id')
								});
								var result=Ext.decode(result);  
								if(result.status==true){
									return true;
								}else if(result.status==false){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}
			        		}else{
			        			var rec=e.record;
								var result=srm.Const.callServiceMethodSync('sFilter/sFilter.do?method=checkForUpdate',{
									filter_url:e.newValues.filter_url,
									remark:e.newValues.remark,
									filter_id:rec.get('filter_id')
										
								});
								var result=Ext.decode(result);  
								if(result.status==true){
									return true;
								}else if(result.status==false){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}
			        		}
			        		
						}
			        }
			});
 		
    	Ext.apply(me,{	
    	  layout:'fit',
   	  	  items:[
	   	  	{
	   	  	xtype:'grid',
   	  	  	itemId:'grid_sfilter',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.store,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var grid=me.down('#grid_sfilter');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var rec=Ext.create('srm.basicdata.sFilter.model.SFilter',{
									oo:'000'
								
								});
								me.store.insert(0, rec);
								var result=srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateSysFilter',{
								});
								rowEditing.startEdit(rec); 
							}
				  		},				  		
		   	  		    {text: '删除',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								me.doDelete();
							}
		   	  		    }
		   	  		]},
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		 	plugins: [
  	  			rowEditing
   	  	  	],   	 
   	  	  	columns:[  	
   	  	  			{header: 'id',dataIndex: 'filter_id',width:50},
					{header: '路径',dataIndex: 'filter_url',flex:1,
						field:{allowBlank : false}
					},
   	  	  		    {header: '备注',dataIndex: 'remark',flex:1,field:{allowBlank : false}
					
				}
  	  	  	],
   	  	  	listeners: {
				selectionchange: function(grid, recs) {
					if (recs.length > 0) {
						me.down('#BTN_DEL').setDisabled(false);
					} else {
						me.down('#BTN_DEL').setDisabled(true);
					}
				}
			}
   	  	  			
   	  	  }]
   	  	  
		});		
 		me.callParent(arguments);
 	},
 	
 	doDelete: function() {
		var me = this;
		var grid=me.down('#grid_sfilter');
		var rec = grid.getSelectionModel().getSelection()[0];
		var result=srm.Const.callServiceMethodSync('sFilter/sFilter.do?method=candeleted',{
			filter_id:rec.get('filter_id')
		});
		var result=Ext.decode(result);  
		if(result.status==false){
			Ext.Msg.alert('提示',"有下级，不可删除");
			return false;
		}
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
						var result=srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateSysFilter',{
						});
							Ext.Msg.alert('提示', '删除成功！');
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});
