/*物料确认样品明细列表页面*/
Ext.define('srm.materialConfirmation.view.MaterialSample',{
	extend:'srm.ux.Panel',
	alias:'widget.MaterialSample',
	initComponent:function(){
		var me = this;
		//样品明细
		me.materialSampleStore=Ext.create('srm.materialConfirmation.store.MaterialSample');
		//检测情况
		me.checkDetailStore=Ext.create('srm.materialConfirmation.store.MaterialCheckDetail');
		//检测类型
		me.checkClassStore=Ext.create('srm.materialConfirmation.store.MaterialCheckclass');
		me.checkClassStore.load();
		var rowEditing1=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing1',
			pluginId: 'rowEditing1',
			listeners: {
				'edit':function(editor,e){
					
					e.store.sync({
						success:function(batch,options){
//							me.materialSampleStore.reload();
//							Ext.Msg.alert('提示','保存成功！');
						},
						failure:function(batch,options)
						{
						Ext.Msg.alert('提示','保存失败！');
						}
					});
					e.record.commit();
				},
				'canceledit':function(editor,e)
				{
					
					var id=e.record.get('sample_id');
					
					if(id==null||id<=0)
					{
						
						e.store.remove(e.record);
					}
				},
				'validateedit':function(editor,e,eOpts)
				{
					
					if(e.newValues.material_name==null||e.newValues.material_name=='')
					{
						Ext.Msg.alert('提示','请输入品名与规格！');
						return false;
					}
					if(e.newValues.material_num<=0)
					{
						Ext.Msg.alert('提示','样品数量必须大于零！');
						return false;
					}
					else
						return true;
				}
			}
		});
		var rowEditing2=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing2',
			pluginId: 'rowEditing2',
			listeners: {
				'edit':function(editor,e){
					
					e.grid.getStore().sync({
						success:function(batch,options){
							me.checkDetailStore.load({params:{sample_id:e.record.get('sample_id')}});
							me.checkDetailStore.sort([{property:'checkclass_id',direction:'ASC'}]);
						},
						failure:function(batch,options)
						{
						Ext.Msg.alert('提示','保存失败！');
						}
					});
					
					e.record.commit();
					
				},
				'canceledit':function(editor,e)
				{
					var id=e.record.get('check_id');
					
					var cancelRec=e.record;
					if(id==null||id<=0)
					{
						e.store.remove(cancelRec);
					}
				}
			}
		});
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				//物料确认明细表
				title:'物料样品明细',
				itemId:'samplePanel',
				//region:'center',
				flex:1,
				layout:'fit',
				overflowY: 'auto',
    			overflowX:'auto',
    			tbar:[{text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,hidden:!me.canEdit,
							handler:function(){
								var samplegrid=me.down('#sampleGrid');
								var store=samplegrid.getStore();
								var rowEditing=samplegrid.getPlugin('rowEditing1');
								rowEditing.cancelEdit();
								var rec=Ext.create('srm.materialConfirmation.model.MaterialSample',
									{confirmation_id:me.confirmation_id,createon:new Date()});
								store.insert(store.getCount(),rec);
								rowEditing.startEdit(rec);
							}},
						{text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,hidden:!me.canEdit,
							handler:function(){
								Ext.Msg.confirm("提醒", "你确定要删除当前样品及其检测情况吗?", function(btn){
									if(btn=='yes')
									{
										var samplegrid=me.down('#sampleGrid');
										var samplestore=samplegrid.getStore();
   										var currenrec=samplegrid.getSelectionModel().getSelection()[0];
   										//检测情况
   										var checkgrid=me.down('#confirmCheckGrid');
   										var checkstore=checkgrid.getStore();
   										var checkRecs=me.checkDetailStore.getRange();
   										for(var i=0;i<checkRecs.length;i++)
   										{
   											
   											var checkrec=checkRecs[i];
   										
   											if(checkrec.get('sample_id')==currenrec.get('sample_id'))
   											{
   												checkstore.remove(checkrec);
   											}
   										}
   										samplestore.remove(currenrec);
									}
								});
							}}
						],
				items:[{
					xtype:'grid',
					itemId:'sampleGrid',
					
					plugins: [
  	  						rowEditing1
   	  	  					],
   	  	  			columns:[
   	  	  				{header:'序号',xtype:'rownumberer',width:40,align:'center'},
		    			{header:'品名与规格',dataIndex:'material_name',editor:{xtype:'textfield',allowBlank: false},flex:1},
		    			{header:'样品数量',dataIndex:'material_num',editor:{xtype:'numberfield'},width:80,align:'center'},
		    			{header:'图号/版本号',dataIndex:'version',editor:{xtype:'textfield'},width:150},
		    			{header:'客户名称',dataIndex:'customer_name',editor:{xtype:'textfield'},width:150},
		    			{header:'产品名称/型号',dataIndex:'product_name',editor:{xtype:'textfield'},width:150},
		    			{header:'有无特性要求',dataIndex:'haskey_point',editor:{xtype:'combo',store:[['0','没有'],['1','有']]},align:'center',width:100,
		    				renderer:function(value){if(value=='0') return '没有';else return '有';}},
		    			{header:'特性要求',dataIndex:'key_point',editor:{xtype:'textfield'},width:160},
		    			{header:'添加检测',xtype:'actioncolumn',width:100,hidden:!me.canEdit,
							items:[{
								icon:'resources/images/icon/add.png',
								tooltip:'添加样品与技术要求符合确认情况',
								handler:function(grid,rowIndex,colIndex){
									
									
									var rec = grid.getStore().getAt(rowIndex);
									
									var sampleid=rec.get('sample_id');
									if(sampleid==null||sampleid<=0)
									{
										Ext.Msg.alert("提示", "请先保存当前样品明细");
										return;
									}
									else
									{
										var checkgrid=me.down('#confirmCheckGrid');
										var checkstore=checkgrid.getStore();
										
										var rowEditing2=checkgrid.getPlugin('rowEditing2');
										rowEditing2.cancelEdit();
										var checkrec=Ext.create('srm.materialConfirmation.model.MaterialCheckDetail',
											{sample_id:sampleid,material_name:rec.get('material_name'),checkclass_id:1,chec_date:new Date()});
										
										checkstore.insert(0,checkrec);
										
										rowEditing2.startEdit(checkrec);
									}
								}
							}]}
   	  	  			],
   	  	  			store:me.materialSampleStore
					}]
				
			},{
				//物料检测明细表，与上一个gird是子父级关系
				title:'物料与技术要求符合确认情况',
				itemId:'confirmCheckPanel',
				//region:'south',
				flex:2,
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
					columns:[{header:'序号',xtype:'rownumberer',width:40,align:'center'},
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
					{header:'检测人',dataIndex:'check_person',editor:{xtype:'textfield'},width:100},
					{header:'备注',dataIndex:'remark',editor:{xtype:'textfield'},width:160}
					],
//					features:[{
//						groupHeaderTpl:'品名与规格:{name}',
//						ftype:'grouping'
//						}],
					plugins: [
  	  						rowEditing2
   	  	  					],
					store:me.checkDetailStore
				}]
				
			}]
		});
		me.callParent(arguments);
	},
	/*将主表ID赋值给样品明细表*/
	setconfirmationIdToSimply:function(confirmationid){
		var me=this;
		
		me.confirmation_id=confirmationid;

  		var recs= me.materialSampleStore.getRange();
		
			for(var i=0;i<recs.length;i++)
			{
				
				recs[i].set('confirmation_id',confirmationid);
			}
	},
	/*根据主表ID加载详细表*/
	loadDetailData:function(confirmationid){
		var me=this;
		
		me.confirmation_id=-1;
		
		if(confirmationid>0)
		{
		
			me.confirmation_id=confirmationid;
			me.materialSampleStore.load({
				params:{confirmation_id:me.confirmation_id},
				callback:function(records,operation,success){
					if(records.length>0)
					{
						//默认取第一条样品数据，加载检测明细
						var rec=records[0];
						
						me.checkDetailStore.load({
							params:{sample_id:rec.get('sample_id')}
						});
						
						
						me.checkDetailStore.sort([{property:'checkclass_id',direction:'ASC'}]);
					}
					else
					{
					me.checkDetailStore.load({
						params:{sample_id:0}
					});
					}
				}
			});
		}
		else
		{
			
			me.materialSampleStore.load({
				params:{confirmation_id:0}
			});
			me.checkDetailStore.load({
				params:{sample_id:0}
			});
		}
		
	}
});