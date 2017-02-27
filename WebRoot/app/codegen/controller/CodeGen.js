Ext.define('srm.codegen.controller.CodeGen',{
	extend : 'Ext.app.Controller',
	requires:['srm.codegen.store.BaseSeq',
			  'srm.codegen.store.CgrDetail',
			  'srm.codegen.store.CodegenRule',
			  'srm.util.AppUtil'
			],
	views : [ 'srm.codegen.view.MngCodeGen', 
			  'srm.codegen.view.EditCodeGen' 
				 ],
	refs : [{ref:'mngGrid',selector:'MngCodeGen #grdCodeRule'}],
	init : function() {
		var me=this;
		// controller只初始化一次
		if (this.isInited)
			return;

		this.control({
			'MngCodeGen':{
				afterrender:function(cmp){
					me.grdStore=cmp.down('grid').getStore();
					me.grdStore.load();
				}
			},
			'MngCodeGen #grdCodeRule':{
				'itemdblclick':function(selModel,rec){
				  		if(rec){
				  		var win=Ext.widget('edtCodeGen',{isAddNew:false,rec:rec});
				  		win.show();
				  		}	
				},
				'selectionchange':function(grid,recs){
					if(recs.length>0)
					  me.setBtnStatus(recs[0]);
				}
			},
			'MngCodeGen button':{
				'click':me.doAction
			},
			'edtCodeGen button':{
				'click':me.doEditAction
			}
		});
		
		// controller初始化完成
		this.isInited = true;
	},
	setBtnStatus:function(rec){
		var me=this;
		if(!rec.get('is_valid')){
			me.getMngGrid().down('#BTN_ENABLED').setDisabled(false);
			me.getMngGrid().down('#BTN_DISABLED').setDisabled(true);
		}else{
			me.getMngGrid().down('#BTN_ENABLED').setDisabled(true);
			me.getMngGrid().down('#BTN_DISABLED').setDisabled(false);
		}
	},
	doAction:function(btn){
		var me=this;
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:
	  		var rec=Ext.create('srm.codegen.model.CodegenRule',{
	  			'create_dt':new Date(),
	  			'creator':srm.Util.currentUser.name,
	  			'is_valid':'false'
	  		});
	  		var win=Ext.widget('edtCodeGen',{isAddNew:true,rec:rec});
	  		win.show();
	  		break;
	  	case srm.Const.FUNC_ITEMID_BTN_EDT:
	  		var rec=me.getMngGrid().getSelectionModel().getSelection()[0];
	  		if(rec){
	  		var win=Ext.widget('edtCodeGen',{isAddNew:false,rec:rec});
	  		win.show();
	  		}
	  		break;
	  	case srm.Const.FUNC_ITEMID_BTN_DEL:
	  		var rec=me.getMngGrid().getSelectionModel().getSelection()[0];
	  		if(rec){
	  			if(rec.get('is_valid')){
			      Ext.Msg.alert('提示','该条规则,目前正在使用中不能删除，请先做停用处理');
	              return;
				}
				Ext.Msg.confirm('提示','删除编码规则【'+rec.get('name')+'】将可能使得依赖该规则的业务无法获得正确的编码，您确定吗?',
				     	function fn(id){
							if(id==Ext.Msg.buttonIds[1]){
								me.grdStore.remove(rec);
								me.grdStore.sync();
							}
				});
	  		}
	  		break;
	  	case 'BTN_ENABLED':
	  	case 'BTN_DISABLED':
	  		var rec=me.getMngGrid().getSelectionModel().getSelection()[0];
	  		var is_valid=rec.set('is_valid');
	  		var msg=is_valid?'停用':'启用';
	  		
	  		if(is_valid)
	  			 Ext.Msg.confirm('提示','停用编码规则['+rec.get('name')+']将可能使得依赖该规则的业务无法获得正确的编码，您确定吗?',
                	function fn(btn){
                		if(btn=='yes'){
                			rec.set('is_valid',!is_valid);
                			me.grdStore.sync({
					  		  success:function(){
					  		  	srm.AppUtil.clearCgrCacheByCode(rec.get('code'));
					  		  	me.setBtnStatus(rec);
					  		  	Ext.Msg.alert('提示',msg+'成功!');
					  		  },
					  		  failure:function(batch,options){
					  		  	Ext.Msg.alert('提示',msg+'失败!');
					  		  }
					  		});
                		}
                	});
	  		else{
		  		rec.set('is_valid',!is_valid);	
		  		me.grdStore.sync({
		  		  success:function(){
		  		  	srm.AppUtil.clearCgrCacheByCode(rec.get('code'));
		  		  	me.setBtnStatus(rec);
		  		  	Ext.Msg.alert('提示',msg+'成功!');
		  		  },
		  		  failure:function(batch,options){
		  		  	Ext.Msg.alert('提示',msg+'失败!');
		  		  }
		  		});
	  			}
	  		 
	  		break;
	  	case srm.Const.FUNC_ITEMID_BTN_REFRESH:
	  		me.grdStore.reload();
	  }	
	},
	doEditAction:function(btn){
		var me=this;
			var win=btn.up('window');
			var grid=win.down('grid');
		switch(btn.action){
			case 'ACT_ADDROW':
				var newRec=Ext.create('srm.codegen.model.CgrDetail',{
					'cgr_id':win.getCgrRec().get('cgr_id'),
					'order_seq':grid.getStore().getCount()+1
				});
				grid.getStore().add(newRec);
				break;
//			case 'ACT_INSTROW':
//				break;
			case 'ACT_DELROW':
				var rec=grid.getSelectionModel().getSelection()[0];
				if(rec)
				Ext.Msg.confirm('提示','你确定要删除序号为【'+rec.get('order_seq')+'】的记录吗？',function(btn){
					if(btn=='yes')
					{
						grid.store.remove(rec);
					}
				});
				break;
			case 'ACT_CLOSE':
				win.close();
				break;
			case 'ACT_SAVE':
				win.doSave(function(){
					me.grdStore.reload();
				});
				break;
		}
	}
});