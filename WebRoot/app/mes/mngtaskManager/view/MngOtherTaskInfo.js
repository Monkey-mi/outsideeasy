Ext.define('srm.mes.mngtaskManager.view.MngOtherTaskInfo',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngOtherTaskInfo',
	initComponent:function(){
		var me=this;				
		Ext.apply(me,{    			
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,	
					  itemId:'grid_appTaskOutput',
			  		  store: me.putstore,
			  		  columnLines:true,			
			   		  columns:[
		  							{text:'产量记录主键',dataIndex: 'record_id',flex:1,hidden:true},
		  							{text: '任务列表主键',dataIndex: 't_id',flex:1,hidden:true},
		  							{text:'创建时间', dataIndex:'create_dt', xtype: 'datecolumn',format: 'Y-m-d H:i:s',flex:1 },
		  							{text: '出勤时间(h)',dataIndex: 'work_time'},		  			
		  							{text: '日期',dataIndex: 'scrq',flex:1,xtype:'datecolumn',format:'Y-m-d'},
		  							{text: '出勤人数',dataIndex: 'worker_no',flex:1},
		  							{text: '产量(件)',dataIndex: 'yield_qty',flex:1},
		  							{text:'锁定字段', dataIndex:'locked',flex:1,renderer:function(value){
		  								if(value==0){
		  									return "否" ;
		  								}else{
		  									return "是" ;
		  								}
		  							}
		  							},
		  							{text:'工段编号', dataIndex:'sec_id',flex:1,hidden:true},
		  							{text:'工段名',dataIndex:'section_name',flex:1}
		  		           		]		  		     
			       }
			]
        	
		});
		this.callParent(arguments);
	}
});