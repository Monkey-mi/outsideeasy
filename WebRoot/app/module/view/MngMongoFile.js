Ext.define('srm.module.view.MngMongoFile',{
	extend:'srm.ux.Panel',
	alias : 'widget.mngMongoFile',
	title:'mongodb管理',
	layout: 'border',
	
	initComponent:function(){
		var me=this;
		me.server_url=srm.Util.getwebroot();//'http://localhost:8080/';
		//console.log("me.server_url:"+me.server_url);
		me.videoobj='<object id="FPlayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
			        				'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" ' +
			        				'width="800" height="600">'+
									'<param name="movie" value="'+me.server_url+'tools/Flvplayer.swf" />'+
    								'<param name="quality" value="high" />'+
    								'<param name="allowFullScreen" value="true" />'+
	   								'<param name="FlashVars" value="vcastr_file={0}" />'+
    								'<embed src="'+me.server_url+'tools/Flvplayer.swf" allowfullscreen="true" {1} ' +
//    								'	flashvars="vcastr_file={0}" ' +
    								'quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
    								'type="application/x-shockwave-flash" width="500" height="100%"></embed>' +
 								'</object>';
		
		me.strHtml='<div id="fplayer_div"  style="width:100%;height:100%;background-color:Black;" align="middle">' + me.videoobj +
					'</div>';
		this.items= [{
		        region: 'west',
		        xtype: 'panel',
		        html:"示例",
		        title: 'west',
		        width: 150
		    },{
		        region: 'center',
		        xtype: 'tabpanel',
		        items:[{
		        	title: 'Mongo 文件上传示例',
		            layout:{type:'vbox',align:'stretch'},
		            items:[{
		            	xtype:'grid',
		            	itemId:'fileGrid',
		            	flex:1,
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
		            	],
		            	store:Ext.create('srm.module.store.FileInfos')
		            },{
		            	xtype:'form',
		            	flex:1,
		            	itemId:'fileForm',
		            	padding:5,
		            	border:false,
		//            	defaults:{xtype:'filefield',padding:5},
		            	layout:'form',
		            	items:[{
						        xtype: 'filefield',
						        name: 'file',
						        fieldLabel: '文件名称',
						        msgTarget: 'side',
						        allowBlank: false,
						        anchor: '100%',
						        buttonText: '选择文件...'
						    }],
		            	buttons:[{text:'保存',action:'act_save'},{text:'清空',action:'act_clear'}]
		            }]
		        },
		        {
		        	
			        	title:'Mongo视频播放演示',
			        	padding:5,
			        	itemId:'mongoVideo',
			        	layout:{type:'vbox',align:'stretch'},
			        	tbar:[{text:'上传视频',itemId:'btnVideo'}],
			        	items:[{
			        		title:'视频播放',
			        		flex:1,
			        		itemId:'playPanel',
			        		html:me.strHtml
			        	}]
		        }
		        ]
		        	
		    }];
		
		this.callParent();
	},
	updateVideo:function(videofile){
		var me=this;
		var tempobj= Ext.String.format(me.videoobj,videofile,videofile);
		var dh = Ext.DomHelper;
        dh.overwrite("fplayer_div",tempobj);
        
	}
});

