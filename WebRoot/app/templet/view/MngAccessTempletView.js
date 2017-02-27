Ext.define('srm.templet.view.MngAccessTempletView',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	alias:'widget.mngAccessTempletView',
		requires : [
	            'srm.ux.SearchCombobox'
	            ],
	initComponent:function(){
		var me=this;
		me.clstore = Ext.create('srm.templet.store.MngClassfifylist');// 模板类型	
		me.menstore = Ext.create('srm.templet.store.MngElementlist');// 模板元素
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
	        		var h_id = e.record.get('h_id');
	        		e.grid.getStore().sync({
	        					success : function(e, batch) {		        						
	        						me.templetstore.reload({params:{h_id:h_id}});//必须的，避免记录没有主键的情况
									Ext.Msg.alert('提示', '保存成功！');									
								},
								failure : function(batch, options) {
									Ext.Msg.alert('提示', '保存失败！');
									me.templetstore.reload();
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
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,	
					  itemId:'grid_editetemplet',
			  		  store: me.templetstore,
			  		  columnLines:true,	
			  		  dockedItems:[
  					              {xtype:'toolbar',dock:'top',itemId:'top_bar1',
	  	  			            items:[
			  		           {text: '新增',	glyph : 0xf016,		itemId:'addbar1'
			  		              },				  		
	   	  		               {text: '删除',	glyph : 0xf014,	itemId:'deletebar1', disabled:true,	
			  		            	handler:function(){
										me.doDelete1();
									}  
						        }			  		          					      
	   	  		        ]}
	   	  		   ],
	   	  		   listeners: {
					selectionchange: function(grid, recs) {
						if (recs.length > 0) {
							me.down('#deletebar1').setDisabled(false);
						} else {
							me.down('#deletebar1').setDisabled(true);
						}
					}
				   },
			   		  columns:[
			   		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
								    {text:'模板id',dataIndex: 'templet_id',flex:1,hidden:true},
									{text: '模板头ID',dataIndex: 'h_id',flex:1,hidden:true},
									{text: '模板元素ID',dataIndex: 'e_id',flex:1,editor:{xtype:'srm_searchcbo',
						itemId:'search',emptyText:'请输入模板元素名称或者id...',hideTrigger:false,store:me.menstore,displayField:'e_name',valueField:'e_id',allowBlank:false}},
									{text: '显示名称',dataIndex: 'templet_name',flex:1,editor:{maxLength:200,allowBlank:false}},
									{text: '是否必填项',dataIndex: 'is_must',flex:1,renderer: function(value,metaData,record,colIndex,store,view) { 
								      if(value == 0){
								      	return '否';
								      }else if(value == 1){
								      	return '是';
								      }	  						            	
								      },editor:{maxLength:20,xtype: 'combo',        
					   		 	            store: [
					   		 	                    ['0','否'],[1,'是']
					   		 	                ]}},
									{text: '排序字段',dataIndex: 'order_by',flex:1,editor:{allowBlank:false}},
									{text: '所属分类id',dataIndex: 'classify_id',flex:1,editor:{xtype:'srm_searchcbo',
						itemId:'searchs',emptyText:'请输入类型名称或者id...',hideTrigger:false,store:me.clstore,displayField:'classify_name',valueField:'classify_id',allowBlank:false}},		  						
									{text: '界面占位比例%',dataIndex: 'seize_length',flex:1,editor:{allowBlank:false}},
									{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s',hidden:true} 
		  		           		],
				   plugins: [rowEditing1]
		  		     
			       }
			]
        	
		});
		this.callParent(arguments);
	},
	doDelete1: function() {
		var me = this;
		var grid=me.down('#grid_editetemplet');
		var rec = grid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
							Ext.Msg.alert('提示', '删除成功！');
							me.templetstore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}

});