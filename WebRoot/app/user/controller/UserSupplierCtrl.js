Ext.define('srm.user.controller.UserSupplierCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.user.store.TempSupplierFile',
				'srm.user.store.UserInfos',
				'srm.user.store.TempUserInfos'
				],
	views : [
				'srm.user.view.UserSupplierManager',
				'srm.user.view.SelUserWin'
			],
	refs : [
			{ref : 'userSupplierManager',selector : 'userSupplierManager'},
			{ref : 'sel_user_win',selector : 'sel_user_win'}
	],

	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited){
			return;
		}
		me.control({
					//初始化
					'userSupplierManager' : {
						afterrender : function(cmp) {
							me.mainView=me.getUserSupplierManager();
							me.supplierstore=me.mainView.supplierstore;
							me.userstore=me.mainView.userstore;
						}
					},
					'userSupplierManager #grd_SupplierFile' : {
						selectionchange:function(grid,recs){
							if(recs.length>0){
								me.userstore.load({params:{company_id:recs[0].get('company_id')}});
							}
						}
					},
					'userSupplierManager #grd_user button':{
						click:me.doClickAction
					},
					'sel_user_win button':{
						click:me.doupdateuser
					},
					//查询框回车事件
				'userSupplierManager  #search':{
					'keypress':function(field,key)
					{
						if(key.getKey()==13)
						{
							me.doQuery();
						}
					}
					}
					,
					'userSupplierManager #btn_search':{
						click:function()
						{
							me.doQuery();
						}
					}
				});
		// controller初始化完成
		this.isInited = true;
	},
	doClickAction:function(btn){
		var me=this;
		switch(btn.itemId){
			case 'BTN_ADD':
				var win=Ext.widget('sel_user_win',{
					itemId:'sel_user_win',
					closeable:true
				});
				win.show();
				break;
			case 'BTN_DEL':
				var user_recs=me.mainView.down('#grd_user').getSelectionModel().getSelection();
				if(user_recs.length==0){
					Ext.alert('提示','请选择用户');return;
				}
				var u_idarray=[];
				for(var i=0;i<user_recs.length;i++){
					u_idarray.push(user_recs[i].get('u_id'));
				}
				srm.Const.callServiceMethodSync('common/batch_update_company_id.do',{
						u_idarray:u_idarray.join(','),
						company_id:0,
						cpyname_cn:""
				 });
				me.userstore.reload();
				break;
			
		}
	},
	doupdateuser:function(btn){
		var me=this;
		var win=me.getSel_user_win();
		var griduser=win.down('#userinfo_grid');
		var userstore=win.store;//选择界面的store
		switch(btn.itemId){
			case 'ACT_SAVE':
				var recs=griduser.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.alert('提示','请选择用户');return;
				}
				var supplier_recs=me.mainView.down('#grd_SupplierFile').getSelectionModel().getSelection();
				if(supplier_recs.length!=1){
					Ext.alert('提示','请选择一个供应商');return;
				}
				var supplier_rec=supplier_recs[0];
				var u_idarray=[];
				for(var i=0;i<recs.length;i++){
					u_idarray.push(recs[i].get('u_id'));
				}
				srm.Const.callServiceMethodSync('common/batch_update_company_id.do',{
						u_idarray:u_idarray.join(','),
						company_id:supplier_rec.get('company_id'),
						cpyname_cn:supplier_rec.get('cpyname_cn')
				 });
				me.userstore.reload();
				win.close();
				break;
		}
	}
	/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getUserSupplierManager();
		var condition=panel.down('#supplierFilePanel').down('#search').getValue();
		
		Ext.apply(panel.supplierstore.proxy.extraParams,{condition:condition});
		panel.supplierstore.loadPage(1);
	}
});