Ext.define('srm.basicdata.file.view.MngBaseFileManager',{	
	extend:'srm.ux.Window',
    alias:'widget.mngBaseFileManager',
    
    height:480,
    width:720,
    anchorSize:95,
    modal : true,
    initComponent:function(){
    	var me =this;
    	me.store=Ext.create('srm.basicdata.file.store.MngBaseFileType');
 		Ext.apply(me.store.proxy.extraParams, {usePaging:true});
 		
 		me.treefstore=Ext.create('srm.basicdata.file.store.MngBaseFileTypeTree');
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
			        						me.treefstore.reload();
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
								var result=srm.Const.callServiceMethodSync('basefile/basefilebg.do?method=checkForAdd',{
									    type_name:e.newValues.type_name,
										f_id:rec.get('f_id')
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
								var result=srm.Const.callServiceMethodSync('basefile/basefilebg.do?method=checkForUpdate',{
										leaf:e.newValues.leaf,
										type_name:e.newValues.type_name,
										f_id:rec.get('f_id'),
										ft_id:rec.get('ft_id')
								});
								var result=Ext.decode(result);  
								if(result.resultType==1){
									return true;
								}else if(result.resultType==2){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}else if(result.resultType==3){					
									Ext.Msg.alert('提示',"有下级，不允许取消末级");
									return false;
								}
			        		}
			        		
						}
			        }
			});
 		
    	Ext.apply(me,{	
    	  layout:'border',
   	  	  items:[
   	  	   {
   	  	   		width:200,
		  		region:'west',
				split:true,				
				tools:[
			           {type:'refresh',tooltip:'刷新',itemId:'refile'}
			    ],
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_fileclass',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.treefstore
		   	  	
   	  	   },
	   	  	{
	   	  	xtype:'grid',
   	  	  	region:'center',
   	  	  	itemId:'grid_fileclass',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.store,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var tree=me.down('#tree_fileclass');
	 	 						var treeSelected=tree.getSelectionModel().getSelection()[0];
	 	 						if(Ext.isEmpty(treeSelected)){
	 	 							Ext.Msg.alert('提示','请先选中上级');
	 	 							return;
	 	 						}
	 	 						var f_id=treeSelected.get('id');
	 	 						var leaf=treeSelected.get('leaf');
	 	 						if(leaf==true){
	 	 							Ext.Msg.alert('提示','末级不可添加下级，请先取消末级');
	 	 							return;
	 	 						}
								var grid=me.down('#grid_fileclass');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var rec=Ext.create('srm.basicdata.file.model.MngBaseFileType',{
									oo:'000',
									f_id:f_id
								});
								me.store.insert(0, rec);
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
   	  	  			{header: 'id',dataIndex: 'ft_id',width:50},
   	  	  		    {header: '父id',dataIndex: 'f_id',width:50,hidden:true},
					{header: '文件类型名称',dataIndex: 'type_name',width:200,
						field:{allowBlank : false}
					},
					{header:'叶子',dataIndex:'leaf',width:40,
	    				renderer:function(value){
							if(value=="true"||value=="1"){
								return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
							}else {
								return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
							}
	   	  	  			},
	   	  	  			editor:{
	   	  	  				xtype:'checkbox'
	   	  	  			}
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
		var grid=me.down('#grid_fileclass');
		var rec = grid.getSelectionModel().getSelection()[0];
		var result=srm.Const.callServiceMethodSync('basefile/basefilebg.do?method=candeleted',{
				ft_id:rec.get('ft_id')
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
							Ext.Msg.alert('提示', '删除成功！');
							me.treefstore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});
