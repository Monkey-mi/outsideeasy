//注册附件
Ext.define('srm.supplierFile.view.SupplierFileAttchedShow',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierFileAttchedShow',
	isAdd:false,
	isEdit:false,
	//overflowY: 'auto',
	//height:800,
	supplier_id:-1,
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		//附件store
		me.registerAttchedStore=Ext.create('srm.supplierFile.store.SupplierFileAttched');
		me.customAttchedStore=Ext.create('srm.supplierFile.store.SupplierFileAttched');
		me.toBeDeleteFileArray=[];
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				flex:1,
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				overflowX:'hidden',
				tbar:[{
					text:'上传',glyph:0xf055,itemId:'BTN_UPLOAD',
					hidden:!me.isEdit,
				}],
				items:[{
					flex:1,
					xtype:'grid',
					itemId:'fileGrid',
					border:false,
					store:me.registerAttchedStore,
					columns:[
					{header:'序号', xtype:'rownumberer',width:45},
					{header:'文件类型',dataIndex:'type_name',width:100},
					{header:'文件名称',dataIndex:'file_name',width:100},
					{header:'格式',dataIndex:'file_format',width:50},
					{header:'状态',dataIndex:'mogodb_id',width:60,
									renderer:function(v,metaData){
							            if(Ext.isEmpty(v)){
							            	return '<div style="color:red">未上传</div>';
							            }else{
							            	return '<div style="color:green">已上传</div>';
							            } 
							        }
								}
	
					,{header:'说明',dataIndex:'remark',width:100}
					,{
						header:'操作',xtype:'actioncolumn',width:60,
						items:[{
							tooltip:'下载',
							icon:'resources/images/icon/download.png',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								if(Ext.isEmpty(rec.get('mogodb_id')))
								{
									Ext.Msg.alert('提示','未上传，无法下载');return;
								}
								var src1='fileopt/downLoadFileFormMongo.do?filename='+rec.get('mogodb_id');
								window.open(src1, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
							}
						},{
							tooltip:'预览',
							icon:'resources/images/icon/application_view_list.png',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('mogodb_id');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('file_format').lastIndexOf('.');
	                            	var suffixStr=rec.get('file_format').substring(suffixIndex+1).toLowerCase();
	                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif'){
	                            		me.showPic(file_path,'PIC1');
	                            	}
	                            	else{
	                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
										return;
	                            	}
								}
								else{
									Ext.Msg.alert('提示','当前还没有上传文件');
									return;
								}
							}
						}
						]
					}
				]
			},
			{
			//预览图片
				xtype:'image',
				width:600,
				itemId:'PIC1',
				border:true,
				height:'100%',
				src:'',
				style:"position:absolute;left:0;top:0;"
			}
			]
			}
			
			]
			
		});
		this.callParent(arguments);		
   },
   //加载当前供应商的所有已上传附件
   loadGridData:function(rec){
		var me=this;
		supplier_id=rec.get('supplier_id');
		if(supplier_id>0){
			me.supplier_id=supplier_id;
			me.registerAttchedStore.load({
				params:{
					supplier_id:supplier_id
				},
				callback:function(records, operation, success){
						if(records[0]==null)
						{
							
						}
						
					}
			});
		}
	},
	//图片展示
   	showPic:function(file_path,id){
   				var me=this;
   				var panel=me.down('#'+id);
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src1='fileopt/downLoadFileFormMongo.do?filename='+file_path+'&isimg=true';
   					//var src='supplier/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplierAccess/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src1);
   					//panel.setHeight(390);
   				}
   	}
});