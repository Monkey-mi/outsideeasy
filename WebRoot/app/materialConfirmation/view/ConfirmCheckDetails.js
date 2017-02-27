Ext.define('srm.materialConfirmation.view.ConfirmCheckDetails',{
	extend:'srm.ux.Panel',
	alias:'widget.CheckDetails',
	
	initComponent:function(){
		var me = this;
		//检测情况
		me.confirmDetailStore=Ext.create('srm.materialConfirmation.store.MaterialCheckDetail');
		//检测类型
		me.checkClassStore=Ext.create('srm.materialConfirmation.store.MaterialCheckclass');
		me.checkClassStore.load();
		Ext.apply(me,{
			defaults:{padding:2,layout:'fit'},
			items:[{
				title:'物料与技术要求符合确认情况',
				//layout:'absolute',
				overflowY: 'auto',
    			overflowX:'auto',
    			
				tbar:[{text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,hidden:!me.canEdit,
					handler:function(){
						var grid=me.down('#grdCheckDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.materialConfirmation.model.MaterialCheckDetail',{confirmation_id:me.confirmation_id,checkclass_id:1,chec_date:new Date()});
						store.insert(0,r);}},
					{text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,hidden:!me.canEdit,
					handler:function(){
						var grid=me.down('#grdCheckDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
						
						store=me.down('#grdCheckDetails').getStore();
						store.sort();
					}}
//					,
//					{text:'刷新',glyph:0xf014,itemId:'btn_reflash',
//						handler:function(){
//							var grid=me.down('#grdCheckDetails');
//   							var store=grid.getStore();
//							store.refresh(this);
//						}}
					],
    			
				items:[{
					xtype:'grid',
					border:true,
					layout:'fit',
					itemId:'grdCheckDetails',
//					x:2,
//					y:2,
//					width:800
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
					store:me.confirmDetailStore
				}]
			}]
		});
		me.callParent(arguments);
	},
	/*根据主表ID加载详细表*/
	loadDetailData:function(confirmationid){
		var me=this;
		
		me.confirmation_id=-1;
		
	
		if(confirmationid>0)
		{
			me.confirmation_id=confirmationid;
			me.confirmDetailStore.load({
				params:{confirmation_id:me.confirmation_id}
			});
		}
		else
		{
			me.confirmDetailStore.load({
				params:{confirmation_id:0}
			});
		}
		
	},
	/*将主表ID赋值给详细表*/
	saveDetailData:function(confirmationid){
		var me=this;
		
		me.confirmation_id=confirmationid;
		//将主表的ID赋值给详细store
//		me.confirmDetailStore.each(function(record){
//  			record.set('confirmation_id',confirmationid);
//  		});
  		var recs= me.confirmDetailStore.getRange();
		
			for(var i=0;i<recs.length;i++)
			{
				
				recs[i].set('confirmation_id',confirmationid);
			}
	}
});