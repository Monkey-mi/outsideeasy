Ext.define('srm.mngWebPublish.controller.WebPublishController', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.mngWebPublish.store.WebContent'
				],
	views:[
			'srm.mngWebPublish.view.WebPublishManager',
			'srm.mngWebPublish.view.WebPublishMainInfo',
			'srm.ux.ExtKindEditor'	
		],
	refs:[
		{ref:'WebPublishManager',selector:'WebPublishManager'},
		{ref:'WebPublishGrid',selector:'WebPublishManager #grid_web'},
		{ref:'WebPublishMainInfo',selector:'WebPublishMainInfo'},
		{ref:'WebPublishForm',selector:'WebPublishMainInfo #form_web'},
		{ref:'content' , selector:'WebPublishMainInfo #form_web extkindeditor[name=content]'}
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
			'WebPublishManager':{
				afterrender:function(cmp){					
					me.webStore = cmp.webStore;
					me.webStore.load({params:{content_type:[2].join(",")}});																						
				}
			},
			'WebPublishManager  button':{
				click:me.doAction
			},
			'WebPublishManager #grid_web':{
				itemdblclick : function(grid, rec) {
					me.EditWebInfo('BTN_EDT',false);
				}
			},
			'WebPublishMainInfo  button':{
				click:me.doEditAction
			}
		});
		me.isInited=true;
	},
	doAction:function(btn){
		var me = this;
		me.panel=me.getWebPublishManager();
		switch(btn.itemId){
		case 'btn_search':
			var condition=me.panel.down('#search').getValue();
			me.webStore.proxy.extraParams.condition=condition;
			me.webStore.load({params:{content_type:[2].join(",")}});
			break;
		case 'BTN_ADD':
		case 'BTN_EDT':
			this.EditWebInfo(btn.itemId,true);
			break;
		case 'BTN_DEL':
			this.DelWebInfo(btn.itemId,true);
			break;
		};
	},
	EditWebInfo:function(itemId,isEdit){
		var me=this; 
		var rec,isAdd;
		var grid=me.getWebPublishGrid();
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case 'BTN_ADD'://新增按钮
				rec=Ext.create('srm.mngWebPublish.model.WebContent');
				isAdd=true;
				isEdit=true;
				break;
			case 'BTN_EDT':
				rec=grid.getSelectionModel().getSelection()[0];
				isAdd=false;
			break;
		}
		var opentitle='新增网页';
		var openglyph=0xf234;
		if(!isAdd&&isEdit)
		{
			opentitle='修改网页';
			openglyph=0xf0f0;
		}else if(!isAdd||!isEdit){
			opentitle='查看网页';
			openglyph=0xf0f0;
		}
		
		var win=Ext.widget('WebPublishMainInfo',{
			//新增、修改页面
			itemId:'WebPublishMainInfo',
			title:opentitle,
			glyph:openglyph,
			isAdd:isAdd,
			isEdit:isEdit,
			closable:true
		});
		var form = me.getWebPublishForm();
		form.loadRecord(rec);
		win.show();
		me.getContent().setValue(rec.get("content"));
		if(!isAdd){
			form.down("#create_dt").setValue(rec.get("create_dt"));
		}
		},
		DelWebInfo:function(btn){
			var me = this;
			var selModel = me.getWebPublishGrid().getSelectionModel();
			if(!selModel.hasSelection()){
				Ext.Msg.alert('提示','请选择一条数据!');
				return;
			}
			var rec =selModel.getSelection()[0];
			Ext.Msg.confirm('提示','你确信要删除这条网页吗?',function fn(btn){
				if (btn == "yes") {	
					me.webStore.remove(rec);
					me.webStore.sync();
				}
			});
		},
		doEditAction:function(btn){
			var me = this;
			var edtWin=me.getWebPublishMainInfo();
			var form=edtWin.down("form");
			var isAdd = edtWin.isAdd;
			form.updateRecord();
			var rec=form.getRecord();
			var content=rec.get("content");
			var stringArr=content.split("img");
			var mogodbIdArr=[];
			for(var i=0;i<stringArr.length;i++){
				var string=stringArr[i];
				if(string.indexOf("src")!=-1){
					var mogodbId=string.substr(string.indexOf("fileId")+7,32);
					mogodbIdArr.push(mogodbId);
				}
			}
			switch(btn.itemId){
				case 'BTN_SAVE':
					if(form.getForm().isValid()&&form.getForm().isDirty()){
						if(isAdd){
						me.webStore.add(rec);	
						me.webStore.sync({
							success:function(e,batch){
								var newWeb=batch.operations.create[0];
								var webId=newWeb.get("web_id");
								srm.Const.callServiceMethodSync('webPublish/addWebFiles.do',{
									webId:webId,mogodbIdArr:mogodbIdArr.join(',')
								});
								Ext.Msg.alert('提示', '保存成功!');	
								edtWin.close();
								me.webStore.load({params:{content_type:[2].join(",")}});
							},
							failure : function(batch, options){
								Ext.Msg.alert('提示', '保存失败!');
								return;
							}
						});
						}else{	
							me.webStore.sync({
								success:function(e,batch){
									var updateWeb=batch.operations.update[0];
									var webId=updateWeb.get("web_id");
									srm.Const.callServiceMethodSync('webPublish/addWebFiles.do',{
										webId:webId,mogodbIdArr:mogodbIdArr.join(',')
									});
									Ext.Msg.alert('提示', '保存成功!');	
									edtWin.close();
									me.webStore.load({params:{content_type:[2].join(",")}});
								},
								failure : function(batch, options){
									Ext.Msg.alert('提示', '保存失败!');
									return;
								}
							});
						}			
					}
				break;
			};
		}
});