Ext.define('srm.mes.mngtaskManager.view.MngOtherLog',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngOtherLog',
	initComponent:function(){
		var me=this;				
		Ext.apply(me,{    			
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,
					  itemId:'grid_appLogisticsItem',
			  		  store: me.logstore,
			  		  columnLines:true,				  		 
			  		  columns:[
		  							{text:'物流记录主键',dataIndex: 'record_id',hidden:true},
		  							{text: '任务列表主键',dataIndex: 't_id',hidden:true},	
		  							{text: '发货方',dataIndex: 'send_company',hidden:true},
		  							{text: '发货号',dataIndex: 'send_id',width:80},	
		  							{text: '发货数量', dataIndex:  'send_count',width:100},
		  							{text: '物流类型',dataIndex: 'tpye',hidden:true},
		  							{text: '出发日期',dataIndex: 'start_date',width:160,xtype:'datecolumn',format:'Y-m-d  H:i:s'},								  												  							
		  							{text: '车牌号',dataIndex: 'licence_plate',width:120},
		  							{text: '司机',dataIndex: 'driver',width:100},
		  							{text:'联系方式',dataIndex: 'phone_number',width:120},
		  							{text: '确认状态',dataIndex: 'confirm_state',width:100,
		  								renderer: function(value,metaData,record,colIndex,store,view) { 
		  						            if(value =="1"){
		  						            	return '已确认收货';
		  						            }else if(value == "0"){
		  						            	return '未确认收货';
		  						            }}		  					   
		  						            },
		  						    {text: '确认收货时间', dataIndex: 'confirm_dt' , xtype: 'datecolumn', format: 'Y-m-d H:i:s',width:160},
		  							{text:'备注说明',dataIndex: 'remark',width:200},		  								                           
		                            {text: '创建时间', dataIndex: 'create_dt' , xtype: 'datecolumn', format: 'Y-m-d H:i:s',width:160}
		  		           		]		  		    
			       }
			]
        	
		});
		this.callParent(arguments);
	}	
});