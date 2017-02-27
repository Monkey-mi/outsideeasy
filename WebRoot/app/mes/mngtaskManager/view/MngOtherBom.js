Ext.define('srm.mes.mngtaskManager.view.MngOtherBom',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngOtherBom',
	initComponent:function(){
		var me=this;			
		Ext.apply(me,{    			
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,
					  itemId:'grid_appTaskBom',
			  		  store: me.bomstore,
			  		  columnLines:true,			  			   	  		
			  		  columns:[		  								  						
		  		           		{text:'主键',dataIndex:'id',width:60},
								{text:'父留言主键',dataIndex:'parent_id',width:80},
								{text:'留言公司',dataIndex:'company_name',width:200},
								{text:'留言时间',dataIndex:'create_time',width:180,xtype:'datecolumn',format:'Y-m-d H:m:s'},
								{text:'留言内容',dataIndex:'com_message',width:300,
								   renderer: function(value, meta, record) {
				                      meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';   
				                      return value;   
				                   }
								}
		  		           		]		  		         
			       }
			]      	
		});
		this.callParent(arguments);
	}
	
});