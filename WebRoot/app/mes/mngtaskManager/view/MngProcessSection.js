Ext.define('srm.mes.mngtaskManager.view.MngProcessSection',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngProcessSection',
	initComponent:function(){
		var me=this;			
		Ext.apply(me,{    			
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,
					  itemId:'grid_appTaskSection',
			  		  store: me.sectionstore,
			  		  columnLines:true,			  			   	  		
			  		  columns:[
		  							{text:'工段编号',dataIndex: 'sec_id',hidden:true},
		  							{text: '任务列表主键',dataIndex: 't_id',hidden:true},		  			
		  							{text: '工段名',dataIndex: 'section_name',width:100},
		  							{text: '顺序',dataIndex: 'sx',width:100},
		  							{text: '末级标识',dataIndex: 'mjbz',width:100,
		  							renderer:function(value){
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