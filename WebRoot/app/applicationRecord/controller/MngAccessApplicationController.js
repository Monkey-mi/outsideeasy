/**
 * 准入申请审核
 */
Ext.define('srm.applicationRecord.controller.MngAccessApplicationController', 
{
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.applicationRecord.store.MngAccessApplicationRecord'			
				],
	views:[
				'srm.applicationRecord.view.MngAccessApplicationManager',
				'srm.applicationRecord.view.MngAccessApplicationInfo'	
	],
	refs:[
	            {ref:'mngAccessApplication',selector:'mngAccessApplication'},
	            {ref:'mngAccessInfo',selector:'mngAccessInfo'}
	            
	            
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
			'mngAccessApplication':{
				afterrender:function(cmp){		
					me.store =cmp.store;
					me.infostore =cmp.infostore;
					me.infoVo2store = cmp.infoVo2store;
					me.infoVo3store = cmp.infoVo3store;
					me.store.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				delete me.store.proxy.extraParams.condition;	
				delete me.store.proxy.extraParams.apply_sts;	
			},
			/**
			 * 点击模板显示模板下面的字段信息
			 */
			'mngAccessApplication  button':{
				click:me.doTempletAction
			},
			//查询框回车事件
			'mngAccessApplication #accessApplication #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mngAccessApplication #grd_accessApplication':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						//按钮可用
						me.setBtnStatus(false);			
					}
					else
					{
						//按钮不可用
						me.setBtnStatus(true);
					}
				},
				itemdblclick : function(grid, rec) {
					me.doAccessApplication();//条件展示内容
				}
			}
		});
		me.isInited=true;
	},	
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doTempletAction:function(btn){
	  var me = this;
	  switch(btn.itemId){
	  	case 'btn_search':		  
	  		me.doQuery(); //doQuery 查询
			break;
	  	case 'btn_reflash':
	  	    me.store.load(); 
	  	    break;
	  	case 'btn_view':
	  	    me.doAccessApplication();//点击展示内容
	  	    break;
	  	case 'btn_AuditPass':
	        me.doAccesssReview(1);//审核通过
	  	    break;
	  	case 'btn_AuditUnPass':
	  		 me.doAccesssReview(0);//审核不通过
	  	    break;
	  }
	},
	/**
	 * 点击展示内容
	 */
	doAccessApplication:function(){
		var me = this;
		panel = me.getMngAccessApplication();
		var grid= panel.down('#grd_accessApplication');		
		var recModel = grid.getSelectionModel();	
		var rec = recModel.getSelection()[0];
		if(!recModel.hasSelection()){
			Ext.Msg.alert('提示', '请先选择一条数据!');
			return;
		}
		var json=srm.Const.callServiceMethodSync('mngTempletClassify/mngTempletClassifybg.do?method=getMngTempletClassifyList');
	    me.infostore.load({
			params:{record_id:rec.get('record_id'),classify_name:json[0].classify_name}
		});
	    me.infoVo2store.load({
				params:{record_id:rec.get('record_id'),classify_name:json[1].classify_name}
			});
		me.infoVo3store.load({
				params:{record_id:rec.get('record_id'),classify_name:json[2].classify_name}
			});	
		var edtWin = Ext.widget('mngAccessInfo',{
			isAddNew: false,
			infostore1:me.infostore,
		    infostore2:me.infoVo2store,
			infostore3:me.infoVo3store
		});
		edtWin.loadData(rec);
		edtWin.show();
		var vo = me.getMngAccessInfo();
		var gridvo1 = vo.down('#grid_Info1');
		var gridvo2 = vo.down('#grid_Info2');
		var gridvo3 = vo.down('#grid_Info3');	
		gridvo1.setTitle(json[0].classify_name);
		gridvo2.setTitle(json[1].classify_name);
		gridvo3.setTitle(json[2].classify_name);	 
	},
	/**
	* doQuery 查询
	* @param btn
	* @return void
	* @author chenlong
	* 2016-8-3
	 */
	doQuery:function(btn){
		  var me = this;
		  var panel=me.getMngAccessApplication();
		  var condition=panel.down('#search').getValue();
		  var apply_stsSearch=panel.down('#applysts_search').getValue();		
		  me.store.proxy.extraParams.condition=condition;
		  me.store.proxy.extraParams.apply_sts=apply_stsSearch;
		  me.store.load();
	},
	/**
	* doAccesssReview 进行审批
	* @returns {Boolean}
	* @return Boolean
	* @author chenlong
	* 2016-8-3
	 */
	doAccesssReview:function(boo){
		  var me = this;
		  var panel=me.getMngAccessApplication();
		  var grid= panel.down('#grd_accessApplication');	
		  var recModel = grid.getSelectionModel();	
		  var recs = recModel.getSelection();//有可能多选
		  if(!recModel.hasSelection()){
				Ext.Msg.alert('提示', '请先选择一条数据!');
				return false;
			}
		  var access_array=[];
		  for(var i=0;i<recs.length;i++)
			{
				 var ip_state = recs[i].get('access_status');
				 if(ip_state == 3){
						Ext.Msg.alert('提示',"供应商"+"["+recs[i].get('submit_name')+"]"+ "当前的准入申请已经是通过状态");
						return false;
					}
				 if(ip_state == 4){
						Ext.Msg.alert('提示',"供应商"+"["+recs[i].get('submit_name')+"]"+ "当前的准入申请已经是未通过状态");
						return false;
					}
				 access_array.push(recs[i].get('record_id'));
			}
		  if(parseInt(boo)==1){
		    me.accessPass(access_array,recs);
	        } else if(parseInt(boo)==0){
	        me.accessNoPass(access_array,recs);
	        }
	},
	/**
	* accessPass 审核通过
	* @param access_array
	* @return void
	* @author chenlong
	* 2016-8-4
	 */
	accessPass:function(access_array,recs){
		 var me = this;
		 Ext.Msg.confirm("提示", "真的要通过选中的"+"["+recs.length+"]"+"个的准入申请吗?", function(btn) {
				if (btn == "yes") {		
					var json=srm.Const.callServiceMethodSync('mngAccessApplicationRecord/accessApplicationRecordbg.do?method=updateStateApplication',{//json去的是data[]中的数据
					access_array:access_array.join(',')	       
			     });    
					if(json =="success"){
					    Ext.Msg.alert('提示',"操作成功");
					    me.store.reload();
				        return ;
						}
					else{
						Ext.Msg.alert('提示',"系统错误！");
				        return ;
					}
				}
			});
	},
	/**
	* accessNoPass  审核不通过
	* @param access_array
	* @return void
	* @author chenlong
	* 2016-8-4
	 */
	accessNoPass:function(access_array,recs){
		 var me = this;
		 Ext.Msg.confirm("提示", "要审核不通过选中的"+"["+recs.length+"]"+"个的准入申请吗?", function(btn) {
				if (btn == "yes") {		
					var json=srm.Const.callServiceMethodSync('mngAccessApplicationRecord/accessApplicationRecordbg.do?method=updateStateApplication2',{//json去的是data[]中的数据
					access_array:access_array.join(',')	       
			     });    
					if(json =="success"){
					    Ext.Msg.alert('提示',"操作成功");
					    me.store.reload();
				        return ;
						}
					else{
						Ext.Msg.alert('提示',"系统错误！");
				        return ;
					}
				}
			});
	},
	//入驻审核管理页面按钮可不可见
	setBtnStatus:function(sts)
	{
		var me=this;
		var panel=me.getMngAccessApplication();
		panel.down('#btn_view').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	},
	//变更审核管理页面按钮可不可见
	setBtnStatus2:function(sts)
	{
		var me=this;
		var panel=me.getMngAccessApplication();
		panel.down('#btn_view').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	}
});