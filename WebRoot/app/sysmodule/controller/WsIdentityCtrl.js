Ext.define('srm.sysmodule.controller.WsIdentityCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'
				,'srm.sysmodule.store.WsIdentity'
				,'srm.sysmodule.model.QueryParam'
				],
	views:[	
			'srm.sysmodule.view.MngWsIdentity',
			'srm.sysmodule.view.EditWsIdentity',
			'srm.sysmodule.view.WsIdentityQuery'
		],
	refs:[
		{ref:'mngWsIdentity',selector:'mngWsIdentity'},
		{ref:'editWsIdentity',selector:'editWsIdentity'}
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mngWsIdentity':{
				afterrender:function(cmp){
					me.panel=me.getMngWsIdentity();
					me.grdmain=me.panel.down('#grd_WsIdentity');
					me.grdstore=me.panel.store;
					
					me.panel.loadMain();
					me.query_rec=Ext.create('srm.sysmodule.model.QueryParam');
				},
				beforedestroy:function(th){
					delete me.grdstore.proxy.extraParams.condition;
				}
			},
			
			'mngWsIdentity #grd_WsIdentity':{
				selectionchange:function(grid,recs){
					if(recs.length>0){
						me.setBtnStatus(false);
					}else{
						me.setBtnStatus(true);
					}
				},
				itemdblclick:function(grid,rec){
					me.doMaintainAction(srm.Const.FUNC_ITEMID_BTN_EDT);
				}
			},
			'mngWsIdentity #function_btn button':{
				click:me.doAction
			},
			'editWsIdentity button':{
				click:me.doEditAction
			}
		});
		me.isInited=true;
	},
	setBtnStatus:function(status){
		var me=this;
		me.panel.down('#BTN_DEL').setDisabled(status);	
	},
	doAction:function(btn){
		var me=this;
		switch (btn.itemId){
			case srm.Const.FUNC_ITEMID_BTN_ADD:
			case srm.Const.FUNC_ITEMID_BTN_EDT:
				me.doMaintainAction(btn.itemId);
				break;
			case 'BTN_DEL':
				me.dodeleteAction();
				break;
			case 'btn_query':
				var win=Ext.widget('wsIdentityQuery',{
					itemId:'wsIdentityQuery',
					mainstore:me.grdstore,
					mainview:me.panel,
					rec:me.query_rec
				});
				win.show();
				break;
		}
	},
	doEditAction:function(btn){
		var me=this;
		var edtview=me.getEditWsIdentity();
		var form=edtview.down('form');
		switch(btn.itemId){
			case 'btn_confirm':
				//验证数据
			
				//保存数据
				var rec=form.getRecord();
				form.updateRecord(rec);
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(me.grdstore.indexOf(rec) >= 0&&rec.get('ws_id')>0){
						me.grdstore.sync({
								success : function(e, batch) {
									
								}
							});
						Ext.Msg.alert('提示','保存成功');
					}else{
						rec.phantom =true;//表示新增
						me.grdstore.add(rec);
		    			me.grdstore.sync(
							{
								success : function(e, batch) {
									 var newRec=batch.operations.create[0];
									 form.loadRecord(newRec);
								}
							}
						);
						Ext.Msg.alert('提示','保存成功');
					}	
				}
				break;
		}
	},
	doMaintainAction:function(type){
		var me=this;
		var rec;
		var isAdd=isEdit=false;
		switch(type){
			case srm.Const.FUNC_ITEMID_BTN_ADD:
					isAdd=true;
					isEdit=false;
					rec=Ext.create('srm.sysmodule.model.WsIdentity',{
						enabled:1
					});
					break;
			case srm.Const.FUNC_ITEMID_BTN_EDT:
					isAdd=false;
					rec=me.grdmain.getSelectionModel().getSelection()[0];
					isEdit=true;
					break;
			
		}
		if(isEdit && Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var win =Ext.widget('editWsIdentity',{
			itemId:'editWsIdentity',
			title : 'ws身份维护',
			isAdd : isAdd,
			isEdit : isEdit,
			rec:rec,
			mainstore:me.grdstore
		});
		win.loadData(rec,isAdd,isEdit);
		win.show();
	},
	
	dodeleteAction:function(){
		var me=this;
		var sel_recs = me.grdmain.getSelectionModel().getSelection();
		if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
			if (btn=="yes")
			{	
				me.grdstore.remove(sel_rec);
				me.grdstore.sync({
					success: function(batch,options) {
						 me.grdstore.reload();
					}
				});																	
			}//if (btn=="yes")
		});
	}
});