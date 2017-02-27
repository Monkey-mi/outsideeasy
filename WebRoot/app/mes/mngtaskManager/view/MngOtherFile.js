Ext.define('srm.mes.mngtaskManager.view.MngOtherFile',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	overflowX:'auto',
	alias:'widget.mngOtherFile',
	initComponent:function(){
		var me=this;				
		Ext.apply(me,{    			
				items:[
			       {				 	
				    	  xtype:'grid',
						  split:true,
						  flex:1,
						  itemId:'grid_appTaskFile',
				  		  store: me.filestore,
				  		  columnLines:true,	
				  		tbar:[{
							text:'替换',itemId:'BTN_REPLACE',
							//hidden:true,
						}],
				  		  columns:[
			  							{text:'任务文件列表主键',dataIndex: 'tf_id',width:80},
			  							{text: '任务列表主键',dataIndex: 't_id',width:80,hidden:true},			  					
			  							{text: '文件名称',dataIndex: 'file_name',width:120},	  					
			  							{text: '文件类型名称',dataIndex: 'type_name',width:140},
			  						    {text: 'mongodb_id',dataIndex: 'object_id',width:80,
			  						    renderer:function(v,metaData){
						                  if(Ext.isEmpty(v)){
						            	    return '<div style="color:red">未上传</div>';
						                  }else{
						            	     return '<div style="color:green">已上传</div>';
						                   } 
						                  }},
			  							
			  							{text:'操作',xtype:'actioncolumn',width:80,
								         items:[
								        {
										icon:'resources/images/icon/download.png',
										tooltip:'下载',
										handler:function(grid,rowIndex,colIndex){
											var rec = grid.getStore().getAt(rowIndex);
											if(rec.get('tf_id')<=0 || Ext.isEmpty(rec.get('object_id'))){
												Ext.Msg.alert('提示','无附件');return;
											}									
											var file=encodeURIComponent(encodeURIComponent(rec.get('object_id')));
											window.open('appTaskFile/downLoadFileFormMongo.do?file='+file, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
										        }
											}]
										},
				                        {text: '文件后缀名', dataIndex: 'suffix_name',width:80},
				                        {text: '视频文件',dataIndex: 'view_no',width:80,
				                         renderer:function(v,metaData){
						                  if(Ext.isEmpty(v)){
						            	    return '<div style="color:red">无</div>';
						                  }else{
						            	     return '<div style="color:green">已上传</div>';
						                   } 
						                  }},
										{text: '操作',xtype:'actioncolumn',width:80,
										 items:[
								        {
										icon:'resources/images/icon/download.png',
										tooltip:'下载',
										handler:function(grid,rowIndex,colIndex){
											var rec = grid.getStore().getAt(rowIndex);
											if(Ext.isEmpty(rec.get('view_no'))){
												Ext.Msg.alert('提示','无附件');return;
											}									
											var file=encodeURIComponent(encodeURIComponent(rec.get('view_no')));
											window.open('appTaskFile/downLoadFileFormMongo.do?file='+file, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
										 }
								        }]},     
										{text: '记录id', dataIndex: 'record_id',width:80,hidden:true},    
										{text: '操作人员名', dataIndex: 'operator_name',width:80},      
										{text: '是否删除', dataIndex: 'is_delete',width:80,
										renderer: function(value,metaData,record,colIndex,store,view) { 
		  						            if(value =="0"){
		  						            	return '否';
		  						            }else if(value == "1"){
		  						            	return '是';
		  						            }}}
			  		           		]			  		         
				       }
			]
        	
		});
		this.callParent(arguments);
	}
});