/**
 * 准入模板
 */
Ext.define('srm.templet.controller.MngTempletController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.templet.store.MngAccessTemplet',
				'srm.templet.store.MngTempletClassify',
				'srm.templet.store.MngAccessTempletHead'
				],
	views:[
				'srm.templet.view.MngTempletManager',
				'srm.templet.view.MngAccessTempletView',
				'srm.templet.view.MngEditerManager'				
	],
	refs:[
	            {ref:'mngTempletManager',selector:'mngTempletManager'}	,
	            {ref:'mngEditerManager',selector:'mngEditerManager'},
	            {ref:'mngAccessTempletView',selector:'mngAccessTempletView'}
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			/*
			 *主账户grid的初始化 
			 */
			'mngTempletManager':{
				afterrender:function(cmp){
					me.panel=me.getMngTempletManager();
					me.headstore = me.panel.headstore;	
					me.templetstore = me.panel.templetstore;
					me.classtore = me.panel.classtore;
					me.headstore.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				//delete me.substore.proxy.extraParams.nodeIdForGrid;				
			},
			/**
			 * 点击模板显示模板下面的字段信息
			 */
			'mngTempletManager #grid_head ':{
				selectionchange:function(grid,recs){
					if(recs.length>0){
						me.loadWorkinfo(recs[0]);	
					}else{
						Ext.Msg.alert('提示', '请先在准入模版列表中选择一条数据!');
					}
				}
			},
			/**
			 * 点击该页面的按钮要跳弹出框进行编辑
			 */
			'mngTempletManager #grid_head button':{
				click:me.doTempletAction
			},
			/**
			 * 点击编辑按钮编辑模板
			 */
			'mngEditerManager #grid_edithead button':{
				click:me.addTempletAction
			},
			/**
			 * 点击退出编辑页面
			 */
			'mngEditerManager #CLOSE':{
				Click:function(btn){
					var me=this;
					var edtview=me.getMngEditerManager();
					var form=edtview.down('form');
					edtview.close();
				} 
			},
			/**
			 * 点击编辑按钮编辑字段信息
			 */
			'mngAccessTempletView  button':{
				click:me.addInformationAction
			},
			/**
			 * 双击编辑
			 */
			'mngAccessTempletView #grid_editetemplet':{
				itemdblclick:me.editeAction
			}
		});
		me.isInited=true;
	},
	/**
	 * 双击进行编辑
	 */
	editeAction:function(){
		var me=this;
		var duna = me.getMngAccessTempletView();
		var maingrid = duna.down('#grid_editetemplet');
	    var regrec = maingrid.getSelectionModel().getSelection()[0];
			if(Ext.isEmpty(regrec)){
			  Ext.Msg.alert('提示','请先选中一条数据，再修改');
			  return;
			 }		  
		  var rowEditing=maingrid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();	
		  duna.clstore.load({params:{search:regrec.get('classify_id')}});
		  duna.menstore.load({params:{search:regrec.get('e_id')}});
		  rowEditing.startEdit(regrec);
	},
	/**
	 * 点击模板查询下列字段
	 * @param recs
	 */
	loadWorkinfo:function(recs){
		var me = this;	
		me.templetstore.load({
			params:{h_id:recs.get('h_id')}
		});
	},
	/**
	 * 点击编辑详信息，添加字段属性
	 * @param btn
	 */
	addInformationAction:function(btn){
		var me = this;
		var edtview=me.getMngEditerManager();
		var form=edtview.down('form');
		var regrec=form.getRecord();
		var panel = me.getMngAccessTempletView();
		var grid = panel.down('#grid_editetemplet');
		if(regrec.get('h_id')==-1){
			 Ext.Msg.alert('提示','请先添加模板再编辑详情信息');
			  return;
		}
		switch(btn.itemId){
		 case 'addbar1':
		  var h_id=regrec.get('h_id');		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.templet.model.MngAccessTemplet',{
				oo:'000',
				h_id:h_id
			});
			edtview.templetstore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;
		};
		
	},
	/**
	 * 增加准入模板
	 */
	addTempletAction :function(btn){
		 var me = this;
		 var edtview=me.getMngEditerManager();
		 var form=edtview.down('form');
		  switch(btn.itemId){
		  	case 'save':
		  	//保存数据
				var rec=form.getRecord();
				form.updateRecord(rec);
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(me.headstore.indexOf(rec) >= 0&&rec.get('h_id')>0){
						/*
						 * 检查能否更新
						 */
						var result=srm.Const.callServiceMethodSync('mngAccessTempletHead/mngAccessTempletHeadbg.do?method=checkUpdatebg',{
							owner:rec.get('owner'),
							h_id :rec.get('h_id'),
							version:rec.get('version')
						});
						if(result.status==false){
							Ext.Msg.alert('提示',"版本号["+rec.get('version')+"],"+ "你所添加的版本号已经存在,无法更新");
							return false;
						}
						me.headstore.sync({
								success : function(e, batch) {															
									me.headstore.load();
									Ext.Msg.alert('提示','保存成功，你现在还可以可以编辑模板字段信息');
								},
								failure : function(batch, e) {
									Ext.Msg.alert('提示', '保存失败！');									
								}
							});
					}else{
					rec.phantom =true;//表示新增
					/*
					 * 检查能否添加
					 */
					var result=srm.Const.callServiceMethodSync('mngAccessTempletHead/mngAccessTempletHeadbg.do?method=checkAddbg',{
						owner:rec.get('owner'),
						version:rec.get('version')
					});					
					if(result.status==false){
						Ext.Msg.alert('提示',"版本号["+rec.get('version')+"],"+ "你所添加的版本号已经存在,无法添加");
						return false;
					}
					me.headstore.add(rec);
	    			me.headstore.sync(
						{
							success : function(e, batch) {
								 me.headstore.reload();
								 Ext.Msg.alert('提示','保存成功!,你现在还可以可以编辑模板字段信息');
							},
					      failure : function(batch, e) {
								Ext.Msg.alert('提示', '保存失败！');															
							}
						}
					);
					}
				}
		  		
		  }
	},
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doTempletAction:function(btn){
	  var me = this;
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:
	  	me.doaddTemplet();//增加一个模板
	  	break;
	  	case srm.Const.FUNC_ITEMID_BTN_EDT:
	  	me.doediterTemplet();//编辑一个准入模板
	  	break;
	  }
	},
	/**
	 * 点击添加增加一个模板
	 */
	doaddTemplet:function(){
		var me = this;
		me.panel = me.getMngTempletManager();
		var grid= me.panel.down('#grid_head');
		var rec = Ext.create('srm.templet.model.MngAccessTempletHead',{
			oo:'000'		
		});
		templetstore1 = Ext.create('srm.templet.store.MngAccessTemplet'); 
		templetstore1.load();
		var edtWin = Ext.widget('mngEditerManager',{
			isAddNew: true,
			templetstore :  templetstore1
		//	supplierStore : me.supplierStore
		});
		edtWin.loadData(rec);
		edtWin.show();
	},
	/**
	 * 编辑一个准入模板
	 */
	doediterTemplet: function(){
		var me = this;
		me.panel = me.getMngTempletManager();
		var grid= me.panel.down('#grid_head');
		var recModel = grid.getSelectionModel();		
		var rec = recModel.getSelection()[0];
		
		if(!recModel.hasSelection()){
			Ext.Msg.alert('提示', '请先在z准入模板中选择一条数据!');
			return;
		}
		var edtWin = Ext.widget('mngEditerManager', {
			isAddNew : false,
			templetstore :  me.templetstore
		});
		edtWin.loadData(rec);
		edtWin.cnstore.load({params:{search:rec.get("owner")}});
		edtWin.show();
			
	}
	
});