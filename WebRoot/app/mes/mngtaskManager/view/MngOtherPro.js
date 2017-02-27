Ext.define('srm.mes.mngtaskManager.view.MngOtherPro',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngOtherPro',
	initComponent:function(){	
		var me=this;
		Ext.apply(me,{    			
				items:[ {
			    	  xtype:'grid',
					  split:true,
					  flex:1,
					  itemId:'grid_appTaskProcess',
			  		  store: me.prostore,
			  		  columnLines:true,				  		 	   	  						
			  		  columns:[
		  							{text:'工序表主键',dataIndex: 'tp_id',flex:1,hidden:true},
		  							{text: '任务列表主键',dataIndex: 't_id',flex:1,hidden:true},		  							
		  							{text: '工序名称',dataIndex: 'process_name',flex:1},
		  							{text: '工序顺序',dataIndex: 'order_no',flex:1},
		  							{text: '标准工时(h)',dataIndex: 'stand_time',flex:1},
		  							{text: '工段编号',dataIndex: 'sec_id',flex:1,hidden:true},
		  							{text: '工段名称',dataIndex:'section_name',flex:1},	
		                            {text: '部件',dataIndex:'patter',flex:1},
		                            {text: '末级标识',dataIndex:'mjbz',flex:1,renderer:function(value){
		                                     if(value ==0){
		                                     	return "否";
		                                     }else if(value ==1){
		                                     	return "是";
		                                     }
		                            	}		                     
		                            }
		  		           		]			  		           
			       }
			]
        	
		});
		this.callParent(arguments);
	}
});