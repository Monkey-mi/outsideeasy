Ext.define('srm.mes.mngtaskManager.view.MngOtherQc',{
	extend:'srm.ux.Panel',
	overflowY: 'auto',
	overflowX:'auto',
	alias:'widget.mngOtherQc',
	initComponent:function(){
		var me=this;				
		Ext.apply(me,{    			
				items:[ {
			    	  xtype:'grid',
					  split:true,
					  flex:1,
					  itemId:'grid_appQc',
			  		  store: me.qcstore,
			  		  columnLines:true,				  	   	  		
			  		  columns:[
			  		                {text:'批次号',dataIndex:'send_id',flex:1}, 
		  							{text:'质检信息主键',dataIndex: 'qc_id',flex:1,hidden:true},
		  							{text: '任务列表主键',dataIndex: 't_id',flex:1,hidden:true},		  			
		  							{text: '物流记录主键',dataIndex: 'record_id',flex:1,hidden:true},
		  							{text: '质检货物',dataIndex: 'qc_goods',flex:1,hidden:true},									  																	  						
		  							{text: '质检方',dataIndex: 'qc_operator',flex:1},
		  							{text: '不合格品数量',dataIndex:'unqualified_no',flex:1},  								  							
	                                {text:'质检数量',dataIndex:'qc_count',flex:1}, 
	                               	                               			
		  							{text:'附件',dataIndex: 'qc_file',flex:1,
		  							renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						            }},
						            {text:'操作',xtype:'actioncolumn',flex:1,
								        items:[
								      {
										icon:'resources/images/icon/download.png',
										tooltip:'下载',
										handler:function(grid,rowIndex,colIndex){
											var rec = grid.getStore().getAt(rowIndex);
											if(rec.get('qc_id')<=0 || Ext.isEmpty(rec.get('qc_file'))){
												Ext.Msg.alert('提示','无附件');return;
											}									
											var file=encodeURIComponent(encodeURIComponent(rec.get('qc_file')));
											window.open('appQc/downLoadFileFormMongo.do?file='+file, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
										}
								       }]
							         },
							        {text:'质检时间',dataIndex:'qc_time',flex:1.5,xtype:'datecolumn',format:'Y-m-d  H:i:s'},
							        {text:'创建时间',dataIndex:'create_dt',flex:1.5,xtype:'datecolumn',format:'Y-m-d  H:i:s'},
							        	{text:'质检说明',dataIndex:'qc_remark',flex:1}
		  		           		]
	  		        
			       }
			]
        	
		});
		this.callParent(arguments);
	}

});