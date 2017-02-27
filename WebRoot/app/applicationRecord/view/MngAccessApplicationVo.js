Ext.define('srm.applicationRecord.view.MngAccessApplicationVo',{
	extend:'srm.ux.Panel',
	alias:'widget.mngAccessApplicationVo',
	initComponent:function(){
		var me=this;			
		Ext.apply(me,{    			
				items:[{
			    	  xtype:'grid',
					  split:true,
					  flex:1,
			  		  store: me.store,
			  		  columnLines:true,		
			  		  columns:[
		  							{text:'主键',dataIndex: 'info_id',flex:1,hidden:true},
		  							{text: '模板ID',dataIndex: 'templet_name',flex:1},		  						
		  							{text: '准入流水表ID',dataIndex: 'record_id',flex:1,hidden:true},
		  							{text: '内容',dataIndex: 'content',flex:3},
		  							{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d'}	  								  						
		  		           		],  		          
			       }
			]
        	
		});
		this.callParent(arguments);
	},	
});