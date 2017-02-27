//注册附件
Ext.define('srm.supplierManager.view.SupplierFileInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierFileInfo',
	requires:['srm.supplierManager.view.SupplierFileUpLoad'],
	isAdd:false,
	isEdit:false,
	//overflowY: 'auto',
	//height:800,
	company_id:-1,
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		//附件store
		me.registerAttchedStore=Ext.create('srm.supplierManager.store.AppRegisterAttched');
		me.customAttchedStore=Ext.create('srm.supplierManager.store.AppCustomAttched');
		me.toBeDeleteFileArray=[];
		//附件编辑器
		var cellEditing_fujain=Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit : 1,
				autoCancel: false,
		        itemId:'cellEditing_fujain',
		        pluginId: 'cellEditing_fujain'
//		        listeners: {			        												
//					'beforeedit':function(editor, e, obj){
//						if(e.value=='营业执照' || e.value=='税务登记证' || e.value=='组织机构代码证'){
//							//Ext.Msg.alert('提示','当前文件名称不可修改');
//							return false;
//						}else{
//							return true;
//						}				
//					}
//		        }
		});
		//默认加载的上传资料模板
		
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			
			tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',hidden:true}
//			,"-",
////    			{text:'关闭',glyph:0xf00d,
////    				handler:function(){
////    					me.close();	}
////    			}
					
   			],
			items:[{
				flex:1,
				//附件表格
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				overflowX:'hidden',
				items:[{
					flex:1,
					xtype:'grid',
					itemId:'fileGrid',
					border:false,
					//style:'border:1px solid #CCC;',
				
				
				store:me.registerAttchedStore,
				//store: Ext.data.StoreManager.lookup('defaultStore'),
				
				//selmodel:Ext.create('Ext.selection.CheckboxModel'),
				
				columns:[
				{header:'序号', xtype:'rownumberer',width:40},
				{header:'文件名称',dataIndex:'file_name',flex:1,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
				{header:'格式',dataIndex:'file_format',width:100,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
				
				{header:'必传',dataIndex:'ismust',width:40,renderer:function(value){
   	  	  					if(value==true)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
				{header:'状态',dataIndex:'file_path',width:60,
								renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
							}

				,{header:'说明',dataIndex:'remark',width:100,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}}
				,{
					header:'操作',xtype:'actioncolumn',width:80,
					items:[
					{
						//上传
						icon:'resources/images/icon/add.png',
						tooltip:'上传',
						
						handler:function(grid,rowIndex,colIndex){
						//有权限
						if(me.hasAutority)
						{
						var rec = grid.getStore().getAt(rowIndex);
						company_id=rec.get("company_id");
						if(company_id<0 || company_id==null)
						{
							Ext.Msg.alert("提示", "请先添加并保存供应商基本信息");
				            return;
						}else if(rec.get('file_name')==null || rec.get('file_name')==""){
							Ext.Msg.alert("提示", "请先输入文件名");
				            return;
						}
						var isimg=false;
						
						if(rec.get('file_format')=='jpg/jpeg/png/gif/bmp')
						{
							
							isimg=true;
						}
						var win=Ext.widget('supplierFileUpLoad',{
							itemId:'supplierFileUpLoad',
							currentrec:rec,
							registerAttchedStore:me.registerAttchedStore,
							isimg:isimg,
							company_id:rec.get("company_id"),
							closable:true
						});
						win.show();
						}
						else
						{
							Ext.Msg.alert("提示", "您没有权限进行当前操作");
						}
						}
					},{
						//预览
						
						icon:'resources/images/icon/download.png',
						tooltip:'下载',
						
						handler:function(grid,rowIndex,colIndex){
							var rec = grid.getStore().getAt(rowIndex);
							if(Ext.isEmpty(rec.get('file_path')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');return;
							}
							
							var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
							window.open('supplier/downloadAttched.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						}
						
					},{
						//删除
						icon:'resources/images/icon/delete.gif',
						tooltip:'删除',
						hidden:true,
						handler:function(grid,rowIndex,colIndex){
							if(me.hasAutority)
							{
								Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 					if(btn=='yes')
			 					{
									var rec = grid.getStore().getAt(rowIndex);
									var store=grid.getStore();
//									me.toBeDeleteFileArray.push(rec.get('file_path'));
//									rec.set('file_path',null);
//									me.hiddenPic('PIC1');
							var patharray=[];
							patharray.push(rec.get('file_path'));
							srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
											patharray:patharray.join(',')
									});
									//删除附件记录
							rec.set('file_path',null);
							me.hiddenPic('PIC1');
							store.sync({
			 								success:function(){}
			 								,failure : function(batch, options) {
													Ext.Msg.alert('提示', '删除上传失败!');
													return;
												}
			 								
			 								});
			 					}
								});
							}
							else
							{
							Ext.Msg.alert("提示", "您没有权限进行当前操作");
							}
						}
					},
					{
						//预览
						icon:'resources/images/icon/application_view_list.png',
						tooltip:'预览',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('file_path');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC1');
                            	
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}
					}
					]
				}
//				,
//				{
//					header:'预览',dataIndex:'file_path',flex:1,padding:0,
//					renderer: function(value, meta, record) {
//                            meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
//                                        'white-space: nowrap;white-space:normal;line-height:26px;';
//                            
//                            if(value!=null&&value!='')
//                            {
//                            	var suffixIndex=value.lastIndexOf('.');
//                            	var suffixStr=value.substring(suffixIndex+1).toLowerCase();
//                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
//                            	{
//                                var return_Str='<div style="height:400px;width:100%;overflow-x:hidden;">';
//                                var file_path=encodeURIComponent(encodeURIComponent(value));
//                                
//   								var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
//   								//var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
//                                return_Str+='<img src="'+src+'" width="100%"  height="100%"/><br />';
//                                return_Str+='</div>';
//                                return return_Str;
//                            	}
//                            	else
//                            	{
//                            	return '';
//                            	}
//                             }
//                              else{return value;}          		
//                            }
//                }
				]
//				,plugins: [
//				  	  			cellEditing_fujain
//				   	  	  	]

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
			,{
				flex:1,
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				items:[{
				flex:1,
				xtype:'grid',
				itemId:'customGrid',
				tbar:[{
					text:'自定义添加',glyph:0xf055,itemId:'BTN_ADD',handler:function(){
						var grid=me.down('#customGrid');
   						var store=grid.getStore();
   						
   						var rec1=store.getAt(0);
   						if(rec1!=null)
   						{
   							company_id=rec1.get("company_id");
   						}
						var r = Ext.create('srm.supplierManager.model.AppRegisterAttched',{"company_id":company_id, "create_dt":new Date(),"file_path":"",ismust:false,remark:'',iscustom:true});
						
						//store.insert(store.getCount(),r);
						store.insert(0,r);
						
					}
				},
				{
					text:'删除',glyph:0xf014,itemId:'BTN_DEL',handler:function(){
						Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 			if(btn=='yes')
			 			{
			 			var grid=me.down('#customGrid');
						var store=grid.getStore();
						var recs=grid.getSelectionModel().getSelection();

						var patharray=[];
						for(var i=0;i<recs.length;i++){
							if(!Ext.isEmpty(recs[i].get('file_path')))
							{
								patharray.push(recs[i].get('file_path'));
							//me.toBeDeleteFileArray.push(recs[i].get('file_path'));
							}
								srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
											patharray:patharray.join(',')
									});
						}
									//删除附件记录
						
						store.remove(recs);
						
						store.sync({
			 								success:function(){}
			 								,failure : function(batch, options) {
													Ext.Msg.alert('提示', '自定义上传删除失败!');
													return;
												}
			 								
			 								});
						me.hiddenPic('PIC2');
			 			}});
						
					}
				}],
				columns:[{header:'序号', xtype:'rownumberer',width:40},
					{header:'文件名称',dataIndex:'file_name',flex:1,editor: {xtype: 'textfield',allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
					{header:'格式',dataIndex:'file_format',width:100,editor:{xtype:'combo',store:[['jpg/jpeg/png/gif/bmp','jpg/jpeg/png/gif/bmp'],['word','word'],['excel','excel'],['pdf','pdf'],['rar/zip','rar/zip']],allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
					{header:'状态',dataIndex:'file_path',width:60,
								renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
					},
					{
					header:'操作',xtype:'actioncolumn',width:80,
					items:[
					{
						//上传
						icon:'resources/images/icon/add.png',
						tooltip:'上传',
						handler:function(grid,rowIndex,colIndex){
						if(me.hasAutority){
						var rec = grid.getStore().getAt(rowIndex);
						cellEditing_fujain.completeEdit();
						
						company_id=rec.get("company_id");
						if(company_id<0 || company_id==null)
						{
							Ext.Msg.alert("提示", "请先添加并保存供应商基本信息");
				            return;
						}else if(rec.get('file_name')==null || rec.get('file_name')==""){
							Ext.Msg.alert("提示", "请先输入文件名");
				            return;
						}
						var isimg=false;
						if(Ext.isEmpty(rec.get('file_format')))
						{
							Ext.Msg.alert("提示", "请先选择上传格式");
				            return;
						}
						if(rec.get('file_format')=='jpg/jpeg/png/gif/bmp')
						{
							
							isimg=true;
						}
						var win=Ext.widget('supplierFileUpLoad',{
							itemId:'supplierFileUpLoad',
							currentrec:rec,
							customAttchedStore:me.customAttchedStore,
							isimg:isimg,
							company_id:rec.get("company_id"),
							closable:true
						});
						win.show();
						}
						else
						{
							Ext.Msg.alert("提示", "您没有权限进行当前操作");
						}
						}
					},{
						//预览
						
						icon:'resources/images/icon/download.png',
						tooltip:'下载',
						handler:function(grid,rowIndex,colIndex){
							var rec = grid.getStore().getAt(rowIndex);
							if(Ext.isEmpty(rec.get('file_path')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');return;
							}
							
							var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
							window.open('supplier/downloadAttched.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						}
						
					},{
						//删除
						icon:'resources/images/icon/delete.gif',
						tooltip:'删除',
						handler:function(grid,rowIndex,colIndex){
							if(me.hasAutority)
							{
								Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 					if(btn=='yes')
			 					{
			 						var store=grid.getStore();
							var rec = grid.getStore().getAt(rowIndex);
							//me.toBeDeleteFileArray.push(rec.get('file_path'));
							
							var patharray=[];
							if(!Ext.isEmpty(rec.get('file_path')))
							{
								
							patharray.push(rec.get('file_path'));
							srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
											patharray:patharray.join(',')
									});
									//删除附件记录
							rec.set('file_path',null);
							}
							
							store.sync({
			 								success:function(){}
			 								,failure : function(batch, options) {
													Ext.Msg.alert('提示', '自定义上传删除失败!');
													return;
												}
			 								
			 								});
				            
							me.hiddenPic('PIC2');
							}});
								}
							else
							{
							Ext.Msg.alert("提示", "您没有权限进行当前操作");
							}
						}
					},
					{
						//预览
						icon:'resources/images/icon/application_view_list.png',
						tooltip:'预览',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('file_path');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC2');
                            	
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}
					}
					]
				}
				//				,{
//					header:'预览',dataIndex:'file_path',flex:1,padding:0,
//					renderer: function(value, meta, record) {
//                            meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
//                                        'white-space: nowrap;white-space:normal;line-height:26px;';
//                            
//                            if(value!=null&&value!='')
//                            {
//                            	var suffixIndex=value.lastIndexOf('.');
//                            	var suffixStr=value.substring(suffixIndex+1).toLowerCase();
//                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
//                            	{
//                                var return_Str='<div style="height:400px;width:100%;overflow-x:hidden;">';
//                                var file_path=encodeURIComponent(encodeURIComponent(value));
//                                
//   								var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
//   								//var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
//                                return_Str+='<img src="'+src+'" width="100%"  height="100%"/><br />';
//                                return_Str+='</div>';
//                                return return_Str;
//                            	}
//                            	else
//                            	{
//                            	return '';
//                            	}
//                             }
//                              else{return value;}          		
//                            }
//                }
				]
				,plugins: [
				  	  			cellEditing_fujain
				   	  	  	]
				,store:me.customAttchedStore
			},{
			//预览图片
				xtype:'image',
				width:600,
				itemId:'PIC2',
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

		company_id=rec.get('company_id');
		if(me.isAdd==true)
		{
			//新增时默认给定必须上传的附件数据
			me.setDefaultData(company_id);
			
		}
		else{
			
			if(company_id>0)
			{
				
				me.company_id=company_id;
			//修改时加载数据库中当前供应商的所有附件
				me.registerAttchedStore.load({params:{
				 	company_id:company_id,
				 	iscustom:0
				},
				callback:function(records, operation, success)
				{
					if(records[0]==null)
					{
						me.setDefaultData(company_id);
					}
					
				}
				});
				me.customAttchedStore.load({params:{
				 	company_id:company_id,
				 	iscustom:1
				}});
			}
		}
		
	},
	//新增时设置默认的必须上传的附件
	setDefaultData:function(company_id){
		var me=this;
		
		//新增时加载默认的附件
		var array=[];
			var create_dt=new Date();
			var file1=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'营业执照',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file2=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'税务登记证',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file3=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'组织机构代码证',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file4=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'公司介绍',create_dt:create_dt,file_format:'word/pdf/excel/rar/zip',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file5=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'厂容厂貌',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file6=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'认证体系证书复印件',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file7=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'公司/工厂机器设备清单',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp/word/pdf/excel/rar/zip',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file8=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'代理商/贸易商需提供代理证明资质',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file9=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'同类产品国家认定机构检测报告或行业出具的等级证明、优质产品证书、知识产权证书复印件',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file10=Ext.create('srm.supplierManager.model.AppRegisterAttched',{company_id:company_id,file_name:'与院校、科研机构合作、交流情况(提供相关文件复印件)',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			array.push(file1);
			array.push(file2);
			array.push(file3);
			array.push(file4);
			array.push(file5);
			array.push(file6);
			array.push(file7);
			array.push(file8);
			array.push(file9);
			array.push(file10);
			me.registerAttchedStore.add(array);
	}
	//保存附件中的company_id值
	,SaveAttchedData:function(rec)
	{
		var me=this;
	
		me.registerAttchedStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  		});
  		me.customAttchedStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  		});
  		me.company_id=rec.get('company_id');
	}
	,//图片展示
   		showPic:function(file_path,id){
   				var me=this;
   				
   				var panel=me.down('#'+id);
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src);
   					//panel.setHeight(390);
   				}
   		}
   	//删除图片时，删除预览框中的图片
   	,hiddenPic:function(id)
   	{
   		var me=this;
   		var panel=me.down('#'+id);
   		panel.setSrc(null);
   	},
   	//删除上传的文件,在保存时执行
	deleteUploadFile:function(){
		var me=this;
		srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
				patharray:me.toBeDeleteFileArray.join(',')
		});
		me.toBeDeleteFileArray=[];//重置
	}
});