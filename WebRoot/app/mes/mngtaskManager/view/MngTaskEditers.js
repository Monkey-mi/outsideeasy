Ext.define('srm.mes.mngtaskManager.view.MngTaskEditers',{
	extend:'srm.ux.Window',
	alias:'widget.mngTaskEditers',
	requires : ['srm.mes.mngtaskManager.view.MngOtherTaskInfo',
	            'srm.mes.mngtaskManager.view.MngOtherPro',
	            'srm.mes.mngtaskManager.view.MngOtherBom',
	            'srm.mes.mngtaskManager.view.MngOtherLog',
	            'srm.mes.mngtaskManager.view.MngOtherFile',
	            'srm.mes.mngtaskManager.view.MngOtherQc',
	            'srm.mes.mngtaskManager.view.UpTaskQcFile',
	            'srm.mes.mngtaskManager.view.UpTaskFile',
	            'srm.mes.mngtaskManager.view.MngProcessSection',
	            'srm.mes.mngtaskManager.view.MngOtherBom',
	            'srm.mes.mngtaskManager.view.MngCommunication',
	            'srm.ux.SearchCombobox'
	            ],	
	width:1050,
    height:800,
    modal : true,
	 listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2
				
			},
			tbar:[{text:'关闭',glyph:0xf00d,
	    				handler:function(){
	    					me.close();	
	    			}
	    			}],
			items:[{
				region:'center',
				xtype:'form',
				flex:1,
				title:'MES信息',
				itemId:'grid_Task',
				store:me.taskstore,
				layout: 'column',
				defaults:{labelWidth : 100,
				xtype:'textfield',
				labelStyle : 'font-weight:nomal;text-align:left;color:#000',
				padding:'0 4 4 4',
				msgTarget : 'side',
				readOnly:true,
				autoFitErrors : true},
	       		
				items:
				[
					{fieldLabel:'任务列表主键',name:'t_id',hidden:true,columnWidth:1},
					{fieldLabel:'ERP任务单号',name:'rwdh',columnWidth:0.5},
					{fieldLabel:'任务单流水号',name:'serial_no',columnWidth:0.5,readOnly:true},
					{fieldLabel:'产品名称',name:'product_name',columnWidth:0.5,allowBlank:false},
					{fieldLabel:'派单单位',name:'send_cpyname_cn',columnWidth:0.5},
					{fieldLabel:'接受单位',name:'receive_cpyname_cn',columnWidth:0.5},
					{fieldLabel:'状态',name:'state',columnWidth:0.5,xtype: 'combo',        
   		 	            store: [
   		 	                    ['5','等待派单'],[10,'已派单'],['15','生产中'],['20','生产完成'],['25','任务完结'],
   		 	                    ['30','已取消']
   		 	                ]},
					{fieldLabel:'任务总数量',name:'total_qty',columnWidth:1/3},
					{fieldLabel:'生产完工数量',name:'produced_qty',columnWidth:1/3},
					{fieldLabel:'交货数量',name:'confirmed_qty',columnWidth:1/3},
					{fieldLabel:'计划开工日期',name:'plan_start',columnWidth:1/4,xtype: 'datefield'},
					{fieldLabel:'计划完工日期',name:'plan_complete',columnWidth:1/4,xtype: 'datefield'},
					{fieldLabel:'质检方式',name:'qc_type',columnWidth:1/4,xtype: 'combo',        
   		 	            store: [
   		 	                    ['1','入库后质检'],[2,'入库前质检']
			                ]},
					{fieldLabel:'生产单号',name:'scdh',columnWidth:1/4},
					{fieldLabel:'产品图片', name: 'product_pic',columnWidth:0.5,hidden:true },
					{fieldLabel:'创建时间', name: 'czsj' ,columnWidth:0.5 ,xtype: 'datefield', dateFormat: 'Y-m-d H:i:s'},
					{fieldLabel:'订单号', name: 'ddh' ,columnWidth:0.5},
					{fieldLabel:'派单时间', name: 'send_time',xtype: 'datefield',columnWidth:0.5 },
					{fieldLabel:'接单时间', name: 'receive_time',xtype: 'datefield',dateFormat: 'Y-m-d H:i:s',columnWidth:0.5 },
					{fieldLabel:'生产完成时间', name: 'finish_product_time',xtype: 'datefield',  dateFormat: 'Y-m-d H:i:s',columnWidth:0.5 },
					{fieldLabel:'任务完成时间', name: 'finish_task_time',xtype: 'datefield', dateFormat: 'Y-m-d H:i:s',columnWidth:0.5 },
					{fieldLabel:'合格数量', name: 'qualified_qty' ,columnWidth:0.5},
					{fieldLabel:'已发货总数', name: 'sendout_qty' ,columnWidth:0.5 },				
					{fieldLabel:'确认入库的货物', name: 'confirmed_qtyVo',columnWidth:0.5 },
					{fieldLabel:'操作文件', name: 'operator_file' ,columnWidth:0.5,hidden:true},
					{fieldLabel:'备注', name: 'remark' ,columnWidth:0.5},		
					{fieldLabel:'唯一标识码', name: 'UUID',columnWidth:0.5 ,hidden:true},
					{fieldLabel:'终止时间', name: 'stop_time', xtype: 'datefield', dateFormat: 'Y-m-d H:i:s' ,columnWidth:0.5},
					{fieldLabel:'终止理由',name: 'stopreason' ,columnWidth:0.25  },
					{fieldLabel:'逻辑删除', name: 'is_delete',columnWidth:0.25, xtype: 'combo',        
   		 	            store: [
   		 	                    ['0','否'],[2,'是']
			                ]}
				]
			},
			{
				xtype:'tabpanel',
				flex:1,
				region:'south',
				title:'详细信息',
				items:[
						{
							xtype:'mngOtherTaskInfo',
							title:'产量记录',																
				  		    putstore: me.putstore				
						},
					   {
						    title:'任务单工序',
						    xtype:'mngOtherPro',						  					
						    prostore: me.prostore

						  },
					  {
					       title:'BOM',
						   xtype:'mngOtherBom',				         							
						   bomstore: me.bomstore															  		  
							 },

					 {
						   title:'物流信息',
						   xtype:'mngOtherLog',						 			
						   logstore: me.logstore																  		 
					      },
					 {
					      title:'质检信息',
					       xtype:'mngOtherQc',					     						
						  qcstore: me.qcstore															  									   	  		  
					       },
				    {
				    	  title:'文件列表',
				    	  xtype:'mngOtherFile',						  						
						  filestore: me.filestore									
		                  },
		            {
				    	  title:'交流合作',
				    	  xtype:'mngCommunication',						  						
						  communstore: me.communstore									
		                  },
		            {
		                  title:'工段',
				    	  xtype:'mngProcessSection',						  						
						  sectionstore:me.sectionstore			                
		                  }
					  ]	
			}]
			});
		me.callParent(arguments);
		
	},
   loadData:function(rec){
	var me=this;
	me.down("form").loadRecord(rec);
}

});