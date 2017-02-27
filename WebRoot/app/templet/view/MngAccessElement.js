Ext.define('srm.templet.view.MngAccessElement',{
	extend:'srm.ux.Panel',
	alias:'widget.mngAccessElement',
	requires : [
	            'srm.ux.SearchCombobox'
	            ],
	
	
	initComponent:function(){
		var me=this;
		me.tlstore=Ext.create('srm.templet.store.MngAccessTempletElement');//模板中的字段元素表
		Ext.apply(me.tlstore.proxy.extraParams,{usePaging:true});	
        me.tystore=Ext.create('srm.templet.store.MngTypelist');//模板中的字段元素表
        me.constore=Ext.create('srm.templet.store.MngContrlist');//模板中的字段元素表
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
	        						me.tlstore.reload();//必须的，避免记录没有主键的情况
									Ext.Msg.alert('提示', '保存成功！');									
								},
								failure : function(batch, options) {
									Ext.Msg.alert('提示', '保存失败！');
									me.tlstore.reload();
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
			layout:{
				type:'border',
    			padding :2
				
			},
			items:[{
				region:'center',
				xtype:'gridpanel',
			//	flex:1,
				title:'模板中的字段元素',
				itemId:'grid_element',
				store:me.tlstore,
				columnLines:true,
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
								store : me.tlstore,
								dock : 'bottom',
								displayInfo : true
						    }],		  		      
				 columns:[
				                    {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
								    {text:'模板id',dataIndex: 'e_id',flex:1,hidden:true},
									{text: '元素名称',dataIndex: 'e_name',flex:1,editor:{maxLength:200,maxLengthText:'出勤时间长度为200',allowBlank:false}},
									{text: '字段类型',dataIndex: 'e_type_id',flex:1,editor:{xtype:'srm_searchcbo',
						itemId:'search',emptyText:'请输入前端类型或者id...',hideTrigger:false,store:me.tystore,displayField:'type_name',valueField:'e_type_id',allowBlank:false}},
									{text: '前端显示控件类型',dataIndex: 'controller_type_id',flex:1,editor:{xtype:'srm_searchcbo',
						itemId:'searchs',emptyText:'请输入前端类型或者id...',hideTrigger:false,store:me.constore,displayField:'controller_name',valueField:'controller_type_id',allowBlank:false}},
									{text: '验证类型',dataIndex: 'validate_type',flex:1,editor:{}},
									{text: '验证规则',dataIndex: 'validate_text',flex:1,editor:{maxLength:200,maxLengthText:'出勤时间长度为100'}},
									{text: '字段长度',dataIndex: 'e_length',flex:1,editor:{}},		  						
									{text: '小数位数',dataIndex: 'e_decimal_length',flex:1,editor:{}},
									{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'} 
		  		           		],
		  		           			   plugins: [rowEditing1]
			}
				]
			});
		this.callParent(arguments);
		
	},
	doDelete1: function() {
		var me = this;
		var grid=me.down('#grid_element');
		var rec = grid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
							Ext.Msg.alert('提示', '删除成功！');
							me.tlstore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});