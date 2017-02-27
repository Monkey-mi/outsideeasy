Ext.define('srm.mes.mngtaskManager.controller.MngtaskController', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',					
				'srm.mes.mngtaskManager.store.MngAppTask'						
				],
	views:[
			'srm.mes.mngtaskManager.view.MngTaskManager',
			'srm.mes.mngtaskManager.view.MngTaskEditers'

		],
	refs:[
		{ref:'mngtaskManager',selector:'mngtaskManager'},
		{ref:'mngTaskEditers',selector:'mngTaskEditers'}
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
			'mngtaskManager':{
				afterrender:function(cmp){										
					me.taskstore = cmp.taskstore;	
					me.putstore = cmp.putstore;
		            me.prostore = cmp.prostore;
		            me.bomstore = cmp.bomstore;
		            me.logstore = cmp.logstore;
		            me.qcstore = cmp.qcstore;
		            me.filestore = cmp.filestore;
		            me.sectionstore = cmp.sectionstore;
		            me.communstore = cmp.communstore;
					me.taskstore.load();																							
				}
			},
				/*
				 * 释放缓存值
				 */
				beforedestroy:function(){	
					delete me.store.proxy.extraParams.condition;	
				    delete me.store.proxy.extraParams.apply_sts;
				},
			'mngtaskManager #grid_appTask':{
					itemdblclick:function(grid, rec){
						me.doTaskDetalis(rec);//任务单的详情
					}
				},
				/**
				 * 搜索
				 */
			'mngtaskManager #grid_appTask button':{
				 click:me.dobtnSearch
				  
			},
			'mngtaskManager #grid_appTask #search':{	        		         
				   //查询框回车事件
				 'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.panel=me.getMngtaskManager();
						var condition=me.panel.down('#search').getValue();
			            var apply_stsSearch=me.panel.down('#state_search').getValue();
						me.taskstore.proxy.extraParams.condition=condition;
						me.taskstore.proxy.extraParams.apply_sts=apply_stsSearch;
						me.taskstore.loadPage(1); 
					}
				}
	        },
	        'mngTaskEditers #grid_appTaskFile button':{
				 click:me.dobtnReplace
				  
			},
		});
		me.isInited=true;
	},
	/**
	 * 搜索任务单
	 * @param {} bth
	 */
	dobtnSearch:function(bth){
		var me = this;
		me.panel=me.getMngtaskManager();
		switch(bth.itemId){
			case 'btn_search':
			var condition=me.panel.down('#search').getValue();
			var apply_stsSearch=me.panel.down('#state_search').getValue();
			me.taskstore.proxy.extraParams.condition=condition;
			me.taskstore.proxy.extraParams.apply_sts=apply_stsSearch;
			me.taskstore.loadPage(1); 	
			break;
		    case 'btn_reflash':
		    me.taskstore.loadPage(1); 
		  	break;
		}
	},
	/**
	 * 查看订单的详情
	 * @param {} rec
	 */
    doTaskDetalis:function(rec){
    	var me = this;
    	me.loadWorkinfo(rec);
    	var win=Ext.widget('mngTaskEditers',{
					addNew:true,
					qcstore:me.qcstore,
					bomstore:me.bomstore,
					filestore:me.filestore,
					logstore:me.logstore,
					putstore:me.putstore,
					prostore:me.prostore,
					sectionstore:me.sectionstore,
					communstore:me.communstore
					});
		win.loadData(rec);
		win.show();
    },
	/*
	 * 加载与MES任务列表相关的其他表内容
	 */
	loadWorkinfo: function(task_rec){
		var me = this;	
		me.qcstore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.bomstore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.filestore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.logstore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.putstore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.prostore.load({
			params:{t_id:task_rec.get('t_id')}
		});
		me.sectionstore.load({
		    params:{t_id:task_rec.get('t_id')}
		 });
		me.communstore.load({
		    params:{t_id:task_rec.get('t_id'),
		    parent_id:0,
			module_type:0}
		 });
	},
	/*
	 * 任务单文件替换
	 */
	dobtnReplace:function(bth){
		var me = this;	 
		var editPanel=me.getMngTaskEditers();
		var fileGrid=editPanel.down("#grid_appTaskFile");
		var rec=fileGrid.getSelectionModel().getSelection()[0];
		switch(bth.itemId){
		    case 'BTN_REPLACE':
		    	var win =Ext.create('srm.mes.mngtaskManager.view.ReplaceTaskFile',{
					title:'替换任务单文件',
					glyph:0xf0f0,
					closable:true,
					store:me.filestore,
					mogodbId:rec.get('object_id')
				});
				win.show();
		  	break;
		}
	},
});