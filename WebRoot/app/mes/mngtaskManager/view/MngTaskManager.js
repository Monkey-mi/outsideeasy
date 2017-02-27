Ext.define('srm.mes.mngtaskManager.view.MngTaskManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mngtaskManager',	
	initComponent:function(){
		var me=this;
		me.taskstore = Ext.create('srm.mes.mngtaskManager.store.MngAppTask');//任务列表
		me.putstore = Ext.create('srm.mes.mngtaskManager.store.MngAppTaskOutput');//产量记录
		me.prostore = Ext.create('srm.mes.mngtaskManager.store.MngAppTaskProcess');//任务单工序
		me.bomstore = Ext.create('srm.mes.mngtaskManager.store.MngAppTaskBom');//BOM
		me.logstore = Ext.create('srm.mes.mngtaskManager.store.MngAppTaskLogistics');//物流信息
		me.qcstore = Ext.create('srm.mes.mngtaskManager.store.MngAppQc');//质检信息
		me.filestore = Ext.create('srm.mes.mngtaskManager.store.MngAppTaskFile');//文件列表
		me.sectionstore = Ext.create('srm.mes.mngtaskManager.store.MngProcessSection');//文件列表
		me.communstore = Ext.create('srm.mngOrderManager.store.MngOrderCommunication');//交流协作
			Ext.apply(this,{
    		layout:{
    			type:'border',
    			padding :2
    		},			
    		items:[
		         {  
		        	region:'center',
		        	split: true,
		        	 flex:3,
		        	title:'MES任务列表',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_appTask',		
	  		  		store: me.taskstore,
	  				columnLines:true,
	  				dockedItems:[	
	  				       {
						    xtype:'toolbar',dock:'top',itemId:'top_bar',
						    items:[
							{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'产品名称或任务单号或生产单号和关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
							{xtype:'combo',itemId:'state_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:180,
			 					store:[[5,'等待派单'],[10,'已派单'],[15,'生产中'],[20,'生产完成'],[25,'任务完结'],[30,'已取消']]
			 				},
							{text:'查询',glyph:0xf002,itemId:'btn_search'},					
							{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
							"-"																							   	  					   	  				 	  					
					       ]
				           },
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.taskstore,
								dock : 'bottom',
								displayInfo : true,
								defaultPageSize:25
						    }],
	  				        columns:[
	  				            {text:'序号',xtype:'rownumberer',align:'center',flex:0.2},
	  							{text:'任务列表主键',dataIndex: 't_id',flex:1,hidden:true},
	  							{text: 'ERP任务单号',dataIndex: 'rwdh',flex:0.8},
	  							{text: '产品名称',dataIndex: 'product_name',flex:1},
	  							{text: '任务单流水号',dataIndex: 'serial_no',flex:1,hidden:true},
	  							{text: '状态',dataIndex: 'state',flex:0.8,
	  								renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 5){
	  						            	return '等待派单';
	  						            }else if(value == 10){
	  						            	return '已派单';
	  						            }else if(value == 15){
	  						            	return '生产中';
	  						            }else if(value == 20){
	  						            	return '生产完成';
	  						            }else if(value == 25){
	  						            	return '任务完结';
	  						            }else if(value == 30){
	  						            	return '已取消';
	  						            }else{
	  						            	return '异常';
	  						            }}
	  						         },//任务单的状态有 0:未派发  1:派发中 3:生产中  4:生产完成  5:完成状态  2:终止
	  							{text: '派单单位',dataIndex: 'send_cpyname_cn',flex:1},
	  							{text: '接受单位id',dataIndex: 'receive_company',flex:1,hidden:true},
	  							{text: '接受单位',dataIndex: 'receive_cpyname_cn',flex:1},
	  							{text: '任务总数量',dataIndex: 'total_qty',flex:0.6},
	  							{text:'生产完工数量',dataIndex: 'produced_qty',flex:1,hidden:true},
	  							{text: '交货数量',dataIndex: 'confirmed_qty',flex:1,hidden:true},
	  							{text: '计划开工日期',dataIndex: 'plan_start',flex:0.8,xtype:'datecolumn',format:'Y-m-d'},
	  							{text: '计划完工日期',dataIndex: 'plan_complete',flex:0.8,xtype:'datecolumn',format:'Y-m-d'},
	  							{text: '质检方式',dataIndex: 'qc_type',flex:1,
	  							renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 1){
	  						            	return '入库后质检';
	  						            }else if(value == 2){
	  						            	return '入库前质检';
	  						            }}
	  						            },
	  							{text: '生产单号',dataIndex: 'scdh',flex:0.8}	 
	  		           		]	  		           	  					   	  				   
		        }		       
    	]
    	});
    	this.callParent(arguments);    	
    }
});