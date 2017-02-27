Ext.define('srm.basicdata.regAccount.view.MngAccountCountView',{
	extend:'srm.ux.Panel',
	alias:'widget.mngAccountCountView',	
	requires : [
	            'srm.ux.SearchCombobox2'
	            ],
	initComponent:function(){
		var me=this;	
		me.accstore = Ext.create('srm.basicdata.regAccount.store.MngAccountCount');//子账户的表	
	    me.restore = Ext.create('srm.platformdata.mngIp.store.allName');//账户名称
			Ext.apply(this,{
    		layout:{
    			type:'border',
    		},
    		
    		items:[   	
		         {  
		         	region:'center',
		        	split: true,
		        	flex:3,
		        	title:'在线账户',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_head',		
	  		  		store: me.accstore,
	  				columnLines:true,	
	  				dockedItems:[
			  					      {
						    xtype:'toolbar',dock:'top',itemId:'top_bar',
						    items:[
						    {text:'在线人数:0',itemId:'onine',width:140},
						    {xtype:'srm_searchcbo2',itemId:'search',fieldLabel:'快速查询',					  
						    itemId:'search',emptyText:'请输入账号名称...',hideTrigger:false,store:me.restore,displayField:'allname',valueField:'allname',labelWidth:60,width:260},
							{xtype:'combo',itemId:'state_search',fieldLabel:'账户类型',labelWidth:60,labelAlign:'right',width:180,
			 					store:[[1,'主账号'],[2,'子账号'],[3,'后台账号']]
			 				},
			 				{text:'查询',glyph:0xf002,itemId:'btn_search1'},
							{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
							{text:'强制下线',glyph:0xf0e7,itemId:'btn_outline', disabled:true},
							"-"												   	  					   	  				 	  					
					]
				},	   
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.accstore,
								dock : 'bottom',
								displayInfo : true
						    }],
				    listeners: {
					selectionchange: function(grid, recs) {
						if (recs.length > 0) {
							me.down('#btn_outline').setDisabled(false);					
						} else {
							me.down('#btn_outline').setDisabled(true);
						}
					}
				   },
	  				        columns:[
	  				            {text:'序号',xtype:'rownumberer',align:'center',width:90},	  															  						
	  						    {text: '用户名',dataIndex: 'name',width:90	  			
	  						         },		   
	  							{text: '登录时间',dataIndex: 'login_time',width:200,xtype:'datecolumn',format:'Y-m-d H:i:s'},	  		
	  							{text: '账户类型',dataIndex: 'type',width:90,renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 2){
	  						            	return '子账号';
	  						            }else if(value == 1){
	  						            	return '主账户';
	  						            }else if(value == 3){
	  						            	return '后台账户';
	  						            }	  						            	
	  						            }}   
	  		           		]	  		           	  					   	  				   
		        }	       
    	]
    	});
    	this.callParent(arguments);    	
    }
});