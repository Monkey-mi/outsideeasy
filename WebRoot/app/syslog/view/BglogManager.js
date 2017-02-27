Ext.define('srm.syslog.view.BglogManager',{
	extend:'srm.ux.Panel',
	alias : 'widget.bgLogManager',
	initComponent:function(){
		var me=this;
		me.errorstore=Ext.create('srm.syslog.store.Srmlog');//日志		
		Ext.apply(me.errorstore.proxy.extraParams, {usePaging:true});
		Ext.apply(this,{
			items: [
		    {  
	         	region:'center',
	        	split: true,
	        	 flex:1,
	        	title:'操作日志',		    	 	  				      				    	
  				xtype:'gridpanel',
  				itemId:'grid_head',	
  				glyph : 0xf0c9,
  		  		store: me.errorstore,
  		  	    autoScroll:true,
  				columnLines:true,	  		
  				dockedItems:[{
					    xtype:'toolbar',dock:'top',itemId:'top_bar',
					    items:[	
					    {xtype:'textfield',fieldLabel:'快速查询',					  
					    itemId:'search',emptyText:'请输入账号名称...',labelWidth:60,width:260},						
		 				{xtype:'datefield',itemId:"start_time",fieldLabel:"起始时间",labelWidth:40,width:120},
		 				{xtype:'datefield',itemId:"end_time",fieldLabel:"结束时间",labelWidth:40,width:120},
		 				{text:'查询',glyph:0xf002,itemId:'btn_search1'},
						{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
						{text:'详情',glyph:0xf0e7,itemId:'btn_outline', disabled:true},
						"-"												   	  					   	  				 	  					
				]},{
					xtype : 'pagingbar',
                    stateId : "pagingbar"+Ext.id(),
		    		store:me.errorstore,
		    		dock:'bottom',
		    		displayInfo:true,
		    		defaultPageSize:25
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
  						    {text: '日志ID',dataIndex: 'logid',width:90,hidden:true  			},	
  						    {text: '登陆名',dataIndex: 'login_id',width:90 },
  							{text: '记录时间',dataIndex: 'logdtm',width:160,xtype:'datecolumn',format:'Y-m-d H:i:s'},	  		
  							{text: '客户端IP',dataIndex: 'clientip',width:90},	  						
  						    {text: '模块ID',dataIndex: 'mod_id',width:30 ,hidden:true  },
  						    {text: '模块名',dataIndex: 'mod_name',width:90 ,hidden:true  },
  						    {text: '方法路径',dataIndex: 's_path',width:300  },
  						    {text: '系统名',dataIndex: 's_name',width:90,hidden:true   },  				 	
  						    {text: '方法名',dataIndex: 's_method',width:90  },
  						    {text: '参数列表',dataIndex: 's_data',width:180  },	
  						    {text: '',dataIndex: 'request_html',hidden:true },	
  						    {text: '错误信息',dataIndex: 'error_message',width:180  }
  		           		]	  		           	  					   	  				   
	        }]
		});
		this.callParent(arguments); 
	}
});

