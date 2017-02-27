Ext.define('srm.materialConfirmation.view.ConfirmDetails',{
	extend:'srm.ux.Panel',
	requires:['srm.basicdata.materialClass.store.MaterialClassTreeChk',
			'Ext.ux.TreePicker'],
	alias:'widget.material_confirmDetails',
	initComponent:function(){
		var me = this;
		//物料确认明细
		me.confirmDetailStore=Ext.create('srm.materialConfirmation.store.MaterialConfirmationDetails');
		//检测情况明细
		me.confirmcheckStore=Ext.create('srm.materialConfirmation.store.MaterialCheckDetail');
		
		//检测类型
		me.checkClassStore=Ext.create('srm.materialConfirmation.store.MaterialCheckclass');
		me.checkClassStore.load();
		//材料类别树
		me.treepickerStore=Ext.create('srm.basicdata.materialClass.store.MaterialClassTreeChk');
		//材料类别
		me.materialClassStore=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore.load();
		var rowEditing1=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing',
			pluginId: 'rowEditing',
			listeners: {
				'edit':function(editor,e){
					e.record.commit();
//					e.grid.getStore().sync({
//						success:function(batch,options){
//							me.confirmDetailStore.reload();
//							Ext.Msg.alert('提示','保存成功！');
//						},
//						failure:function(batch,options)
//						{
//						Ext.Msg.alert('提示','保存失败！');
//						}
//					});
				},
				'canceledit':function(editor,e)
				{
					var id=e.record.get('confirmdetail_id');
					if(id==null||id<=0)
					{
						e.grid.getStore.remove(e.record);
					}
				}
			}
		});
		var rowEditing2=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing',
			pluginId: 'rowEditing',
			listeners: {
				'edit':function(editor,e){
					e.record.commit();
					e.grid.getStore().sync({
						success:function(batch,options){
							me.confirmcheckStore.reload();
							Ext.Msg.alert('提示','保存成功！');
						},
						failure:function(batch,options)
						{
						Ext.Msg.alert('提示','保存失败！');
						}
					});
				},
				'canceledit':function(editor,e)
				{
					var id=e.record.get('check_id');
					if(id==null||id<=0)
					{
						e.grid.getStore.remove(e.record);
					}
				}
			}
		});
		Ext.apply(me,{
			layout:'border',
			items:[{
				//物料确认明细表
				title:'物料确认明细',
				itemId:'confirmDetailPanel',
				region:'center',
				flex:1,
				layout:'fit',
				overflowY: 'auto',
    			overflowX:'auto',
    			tbar:[{text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,hidden:!me.canEdit,
							handler:function(){
								var detailsgrid=me.down('#confirmDetailGrid');
								var store=detailsgrid.getStore();
								var rowEditing=detailsgrid.getPlugin('rowEditing1');
								rowEditing.cancelEdit();
								var rec=Ext.create('srm.materialConfirmation.model.MaterialConfirmationDetails',
									{confirmation_id:me.confirmation_id});
								store.insert(store.getCount(),rec);
								rowEditing.startEdit(rec);
							}},
						{text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,hidden:!me.canEdit,
							handler:function(){}}
						],
				items:[{
					xtype:'grid',
					itemId:'confirmDetailGrid',
					
					plugins: [
  	  						rowEditing1
   	  	  					],
   	  	  			columns:[
   	  	  				{header:'<div style="text-align:center">材料类别</div>',dataIndex:'mc_id',width:150,
		    				editor:{
		    					xtype : 'treepicker',    
							    displayField : 'text',
							    valueField: 'id',
							    store:me.treepickerStore,
							    rootVisible:false,
							    maxPickerWidth:240 
		    				}
		    				,
		    				renderer:function(value, metaData, record, rowIndex, colIndex, store){
		    					var return_value='';
		    					//todo:待修改
								me.materialClassStore.load();
								var rec=me.materialClassStore.findRecord('mc_id',value);
								if(!Ext.isEmpty(rec))
								{
									return_value=rec.get('mc_name');
								}
								return return_value;
		   	  	  			}
		    			},
		    			{header:'品名与规格',dataIndex:'material_name',editor:{xtype:'textfield'},flex:1},
		    			{header:'样品数量',dataIndex:'material_num',editor:{xtype:'numberfield'},width:60},
		    			{header:'图号/版本号',dataIndex:'version',editor:{xtype:'textfield'},width:100},
		    			{header:'客户名称',dataIndex:'customer_name',editor:{xtype:'textfield'},width:100},
		    			{header:'产品名称/型号',dataIndex:'product_name',editor:{xtype:'textfield'},width:100},
		    			{header:'有无特性要求',dataIndex:'haskey_point',editor:{xtype:'combo',store:[['0','没有'],['1','有']]},width:60,
		    				renderer:function(value){if(value=='0') return '没有';else return '有';}},
		    			{header:'特性要求',dataIndex:'key_point',editor:{xtype:'textfield'},width:100}
		    			
   	  	  			],
   	  	  			store:me.confirmDetailStore
					}]
				
			},{
				//物料检测明细表，与上一个gird是子父级关系
				title:'物料与技术要求符合确认情况',
				itemId:'confirmCheckPanel',
				region:'south',
				flex:1,
				layout:'fit',
				tbar:[
						{text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,hidden:!me.canEdit,
							handler:function(){
								var grid=me.down('#confirmCheckGrid');
   								var store=grid.getStore();
   								var recs=grid.getSelectionModel().getSelection();
								store.remove(recs);
							}}
						],
				items:[{
					xtype:'grid',
					itemId:'confirmCheckGrid',
					split:true,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[{header:'序号',xtype:'rownumberer',width:40},
					{header:'检测类型',dataIndex:'checkclass_id',editor:{
						xtype:'combo',
						//editable:false,
						store:me.checkClassStore,
						displayField:'checkclass_name',
						valueField:'checkclass_id'
						},
						renderer:function(value, metaData, record, rowIndex, colIndex, store){
							var classrecord=me.checkClassStore.findRecord('checkclass_id',value);
							
							if(classrecord!=null)
							{return classrecord.get('checkclass_name');}
							else return value;
					}},
					{header:'检验项目',dataIndex:'check_item',editor:{xtype:'textfield'},flex:1},
					{header:'标准要求',dataIndex:'check_request',editor:{xtype:'textfield'},flex:1},
					{header:'实测数据/报告',dataIndex:'check_report',editor:{xtype:'textfield'},flex:1},
					{header:'检测结果',dataIndex:'check_result',width:100,
						editor:{xtype:'combo',store:[['0','OK'],['1','NG']]},
						renderer:function(value){if(value=='0') return 'OK';else return 'NG';}},
					{header:'检测人',dataIndex:'check_person',editor:{xtype:'textfield'},width:100}
					],
					features:[{ftype:'grouping'}],
					plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1   
					    },
					store:me.confirmcheckStore
				}]
				
			}]
		});
	me.callParent(arguments);
	}
});