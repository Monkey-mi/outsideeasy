Ext.define('srm.templet.view.MngTempletType',{
  	extend:'srm.ux.Window',
	alias:'widget.mngTempletType',
	width:580,
    height:600,
    anchorSize:95,
    modal : true,
	
	initComponent:function(){
		var me=this;
		me.typestore = Ext.create('srm.templet.store.MngTempletElementType');//元素类型表	
		Ext.apply(me.typestore.proxy.extraParams,{usePaging:true});	
//		me.detailstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDetail');
//		me.distributionstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDistribution');
	//	me.toBeDeleteFileArray=[];
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
	        						me.typestore.reload();//必须的，避免记录没有主键的情况
									Ext.Msg.alert('提示', '保存成功！');									
								},
								failure : function(batch, options) {
									Ext.Msg.alert('提示', '保存失败！');
									me.typestore.reload();
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
			//	flex:1,
				frame:true,
				split:true,
				title:'分类的类型',
				itemId:'grid_type',
				store:me.typestore,
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
								store : me.typestore,
								dock : 'bottom',
								displayInfo : true
						    }],		  		      
				 columns:[
				                    {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
								    {text:'主键ID',dataIndex: 'e_type_id',flex:1,hidden:true},
									{text: '类型名称',dataIndex: 'type_name',flex:1,editor:{maxLength:20,allowBlank:false}},														
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
		var grid=me.down('#grid_type');
		var rec = grid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
							Ext.Msg.alert('提示', '删除成功！');
							me.typestore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});