Ext.define('srm.basicdata.area.view.AreaManager',{	
	extend:'srm.ux.Panel',
    alias:'widget.areaManager',
    
    initComponent:function(){
    	var me =this;
    	me.store=Ext.create('srm.basicdata.area.store.Area');
 		Ext.apply(me.store.proxy.extraParams, {usePaging:true});
 		
 		me.treeStore=Ext.create('srm.basicdata.area.store.AreaTree');
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
			        						me.treeStore.reload();
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
								var result=srm.Const.callServiceMethodSync('area/area.do?method=checkForAdd',{
										area_name:e.newValues.area_name,
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
								var result=srm.Const.callServiceMethodSync('area/area.do?method=checkForUpdate',{
										area_name:e.newValues.area_name,
										f_id:rec.get('f_id'),
										area_id:rec.get('area_id')
								});
								var result=Ext.decode(result);  
								if(result.status==true){
									return true;
								}else if(result.status==false){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}
			        		}
			        		
						},	
						'beforeedit':function(editor, e, obj){
							if(e.record.get('oo')=='000'){
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='area_id'){
										column.field.setDisabled(false);
									}
							    });	        	
			        		}else{
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='area_id'){
										column.field.setDisabled(true);
									}
							    });
			        		}//if				
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
				title: '地区',
				tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_area',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.treeStore
		   	  	
   	  	   },
	   	  	{
	   	  	xtype:'grid',
   	  	  	region:'center',
   	  	  	itemId:'grid_area',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.store,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var tree=me.down('#tree_area');
	 	 						var treeSelected=tree.getSelectionModel().getSelection()[0];
	 	 						if(Ext.isEmpty(treeSelected)){
	 	 							Ext.Msg.alert('提示','请先选中上级');
	 	 							return;
	 	 						}
	 	 						var parentId=treeSelected.get('id');
								var grid=me.down('#grid_area');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var rec=Ext.create('srm.basicdata.area.model.Area',{
									oo:'000',
									f_id:parentId
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
   	  	  			{header: '区域代码',dataIndex: 'area_id',width:80,editor:{}},
					{header: '地区名称',dataIndex: 'area_name',width:160,editor:{maxLength:15}},
					{header: '上级编号',dataIndex: 'f_id',width:80},
					{header: '简称',dataIndex: 'shortName',width:100,editor:{maxLength:15}},
					{header: '级别',dataIndex: 'levelType',width:80,
						renderer: function(value,metaData,record,colIndex,store,view) { 
				            if(value==0){
				            	return '国家级';
				            }else if(value==1){
				            	return '省级';
				            }else if(value==2){
				            	return '市级';
				            }else{
				            	return '区县级';
				            }
				             
				       },
				       editor:{
				       	    xtype:'combo',
				       	    store:[
				       	    ['0','国家级'],['1','省级'],['2','市级'],['3','区县级']
				       	    ]
				       }
					},
					{header: '区域代码',dataIndex: 'cityCode',width:80,editor:{maxLength:4}},
					{header: '邮编',dataIndex: 'zipCode',width:80,editor:{maxLength:6}},
					{header: '全名',dataIndex: 'mergerName',width:200,editor:{maxLength:25},
						renderer: function(value,metaData,record,colIndex,store,view) { 
				            metaData.tdAttr = 'data-qtip="'+ value + '"'; 
				            return value; 
				       } 
					},
					{header: '经度',dataIndex: 'ing',width:100,editor:{maxLength:14}},
					{header: '纬度',dataIndex: 'lat',width:100,editor:{maxLength:14}},
					{header: '拼音',dataIndex: 'pinyin',width:100,editor:{maxLength:48}}
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
		var grid=me.down('#grid_area');
		var rec = grid.getSelectionModel().getSelection()[0];
		var result=srm.Const.callServiceMethodSync('area/area.do?method=candeleted',{
				area_id:rec.get('area_id')
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
							me.treeStore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});
