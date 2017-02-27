Ext.define('srm.module.view.MogodbFileView',{
	extend:'srm.ux.Panel',
	alias : 'widget.MogodbFileView',
	title:'mongodb管理',
	layout: 'border',
	
	initComponent:function(){
		var me=this;
		me.store = Ext.create('srm.module.store.MogodbFile');
		this.items= [{
		        region: 'center',
		        xtype: 'tabpanel',
		        items:[{
		        	title: 'Mongo 文件查询',
		            layout:{type:'vbox',align:'stretch'},
		            items:[{
		            	xtype:'grid',
		            	itemId:'fileGrid',
		            	flex:1,
		            	store:me.store,
		            	 dockedItems:[
	 					              {xtype:'toolbar',dock:'top',itemId:'top_bar',
		  	  			            items:[
		  	  			                  {text : '筛选',glyph : 0xf002,itemId : 'btn_query'},
		  	  			                  {text : '清理',glyph : 0xf014,itemId : 'btn_del'},
		  	  			                  {text : '替换',itemId : 'btn_replace'}
		   	  		        ]},
		   	  		   {
						    xtype : 'pagingbar',
	                       stateId : "pagingbar"+Ext.id(),
	                       store:me.store,
							dock : 'bottom',
							displayInfo : true
					    }],
		            	columns:[{
		            		xtype:'rownumberer',
		            		width:40
		            	},{
		            		header:'文件名称',
		            		width:200,
		            		dataIndex:'aliases'
		            	},{
		            		header:'文件长度',
		            		width:120,
		            		dataIndex:'length'
		            	},{
		            		header:'上下文类型',
		            		width:200,
		            		dataIndex:'contentType'
		            	},{
		            		header:'是否图片',
		            		width:100,
		            		dataIndex:'isimg',
		            		renderer: function(value,metaData,record,colIndex,store,view) { 
							      if(value == 0){
							      	return '否';
							      }else if(value == 1){
							      	return '是';
							      }	  						            	
							}
		            	},{
		            		header:'使用类别',
		            		width:200,
		            		dataIndex:'useTypeName'
		            	},{
		            		header:'公司名',
		            		width:200,
		            		dataIndex:'comName'
		            	},{
		            		header:'公司ID',
		            		width:120,
		            		dataIndex:'comID'
		            	},{
		            		header:'上传者',
		            		width:100,
		            		dataIndex:'userName'
		            	},{
		            		header:'上传日期',
		            		width:160,
		            		dataIndex:'uploadDate',
		            		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
		            	},
		            	{
	    					xtype:'actioncolumn',
	    					header:'操作',
	    					width:120,
	    					items: [{
	    						icon:'resources/images/icon/download.png',
								tooltip:'下载',
				                handler: function(grid, rowIndex, colIndex) {
				                    var rec = grid.getStore().getAt(rowIndex);
				                    window.location.href="fileopt/downLoadFileFormMongo.do?filename="+rec.get('filename');
				                }
				            },{
				            	icon:'resources/images/icon/delete.gif',
				                tooltip: '删除',
				                handler: function(grid, rowIndex, colIndex) {
				                    var rec = grid.getStore().getAt(rowIndex);
				                   Ext.Ajax.request({
				                   	  url:"fileopt/deleteFile.do",
				                   	  method:'post',
				                   	  params:{'filename':rec.get('filename')},
				                   	 success:function(response){
				                   	 		grid.getStore().remove(rec);
									 }
				                   });
				                }
				            }]
		            	}	
		            	]
		            	
		            }]
		        }
		        ]
		        	
		    }];
		
		this.callParent();
	}
});

