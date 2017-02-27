/*评估项明细*/
Ext.define('srm.supplierAccess.view.EvaluateItemDetails',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	alias:'widget.access_EvaluateItemDetails',

	initComponent:function(){
		var me=this;
		//me.evaluateItemStore = Ext.create('srm.supplierAccess.store.AccessBasetable');
    	//me.accessScore=Ext.create('srm.supplierAccess.store.SupplierAccessScore');
//    	me.accessScore.load(function(store,node,records,successful,eOpts)
//    	{
//    		//me.treepanelLoad(store,node,records,successful,eOpts)
//    	}
    	//);
		//评估准入图示上传
		me.accessUploadImgStore=Ext.create('srm.supplierAccess.store.SupplierAccessUploadImg');
		Ext.apply(me,{
			
			defaults:{padding:'4 4 0 8'},
			layout:{
					     type: 'vbox',
					     align: 'stretch'
					},
			
    		items:[{
    			xtype:'form',
    			itemId:'PanelEvaluateInfo',
    			layout:{type:'column'},
    			defaults : {
					
					labelWidth : 100,
					//多行文本框
					xtype:'textfield',
					//textareafield
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'0 0 5 0',
					msgTarget : 'side',
					autoFitErrors : true
				},
    			
				tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',disabled:true},{text:'删除',glyph:0xf014,itemId:'BTN_DEL',disabled:true}],
				
				items:[{
						itemId:'assess_score',
						name:'assess_score',
						 xtype: 'radiogroup',
            			fieldLabel: '评估得分',
           				 cls: 'x-check-group-alt',
            			items: [
                			{boxLabel: '拒绝', name: 'rb-score', inputValue: 0},
                			{boxLabel: '差', name: 'rb-score', inputValue: 2},
                			{boxLabel: '满意', name: 'rb-score', inputValue: 4},
                			{boxLabel: '优秀', name: 'rb-score', inputValue: 5, checked: true}
            			],
						columnWidth:1
					},
					{
						itemId:'item_description',
						name:'item_description',
						xtype:'textareafield',
						//grow: true,
        				fieldLabel:'评估结果描述',
        				columnWidth:1
					},
					{
						itemId:'point_analyze',
						name:'point_analyze',
						xtype:'textareafield',
        				fieldLabel:'要因分析',
        				columnWidth:1
					},
					{
						itemId:'improve_act',
						name:'improve_act',
						xtype:'textareafield',
        				fieldLabel:'建议改善措施',
        				columnWidth:1
					}
					,
					{
						itemId:'responsible_person',
						name:'responsible_person',
						xtype:'textfield',
        				fieldLabel:'责任人',
        				
        				columnWidth:1
					},
					{
						itemId:'plan_assess_date',
						name:'plan_assess_date',
						xtype:'datefield',
						format:'Y-m-d',
        				fieldLabel:'计划完成时间',
        				columnWidth:1
					}
				]
    		},
    		{
    			
	   	  	  	itemId:'panelEvaluatePic',
		    	flex:1,
	   	  	  	overflowY:'auto',
		    	layout:{ type: 'hbox',
        				align: 'stretch'},
		    	items:[{
		    		itemId:'evaluateGrid',
					xtype:'grid',
					border:1,
					minHeight:360,
					//flex:1,
					width:274,
					tbar:[
		    		{text:'添加图片',glyph:0xf055,itemId:'addPicture',
		    			handler:function(btn){
		    				var win=Ext.widget('edt_Img',{
		    					UploadImgStore:me.accessUploadImgStore,
		    					score_id:me.score_id,
		    					company_id:me.company_id,
		    					closable: true
		    				});
		    				win.show();
		    		}},
		    		{text:'删除图片',glyph:0xf014,itemId:'delPicture',disabled:true,handler:function(){
		    			Ext.Msg.confirm('提示','你确定要删除当前图片吗?',function(btn){
						if(btn=='yes')
						{
		    			var grid=me.down('#panelEvaluatePic').down('#evaluateGrid');
		    			var store=grid.getStore();
		    			var recs=grid.getSelectionModel().getSelection();
		    			var patharray=[];
						for(var i=0;i<recs.length;i++){
								patharray.push(recs[i].get('file_path'));
								}
						srm.Const.callServiceMethodSync('common/deleteFileByPath.do',{
											patharray:patharray.join(',')
									});
									//删除store中的记录
						store.remove(recs);
						}
		    			});
		    		}},{
		    			text:'下载图片',glyph:0xf019,itemId:'downloadPicture',disabled:true,handler:function(){
		    				var grid=me.down('#panelEvaluatePic').down('#evaluateGrid');
		    			
		    			var rec=grid.getSelectionModel().getSelection()[0];
		    			if(rec!=null&&rec.get('file_path')!=null&&rec.get('file_path')!='')
		    			{
							var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
							window.open('common/downloadFile.do?file_path='+file_path+'&isimg=true', 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		    			}
		    			else
		    			{
		    				Ext.Msg.alert('提示','请在列表中选择要下载的图片');
		    			}}
		    		}
		    		],
					store:me.accessUploadImgStore,
					
					columns:[
	   	  	  			{header:'序号', xtype:'rownumberer',width:40},
	   	  	  			{header: '评估图示 ',dataIndex: 'file_path',width:260}
	   	  	  			
		    		]
		    	},{
		    		itemId:'picture',
		    		style:'border:1px solid #CCC;',
		    		
		    		flex:1,
					items:[{
						itemId:'PIC',
						//autoScroll:true,
						xtype:'image',
						width:'100%',
						height:'100%',
						src:'',
						style:"position:absolute;left:0;top:0;"
						
					}]
		    	}]
    		}]	
		});
		this.callParent(arguments);
		},
		
		//图片展示
   		showPic:function(rec){
   				var me=this;
   				var panel=me.down('#PIC');
   				var file_path=rec.get('file_path');
   				if(file_path!=null&&file_path!=''){
					var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
   					var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src);
   				}else{
   					panel.setSrc(null);
   				}
   		}
		,
		//根据当前选择的评估项，给具体的评估业务赋值
		setAccessScoreData:function(id,parentId){
			var me=this;
			me.item_id=id;
			me.item_fid=parentId;
			
			var rec;
			Ext.apply(me.accessScore.proxy.extraParams,{item_id:me.item_id,item_fid:me.item_fid,company_id:me.company_id});
			//me.accessScore.load({params:{item_id:me.item_id,item_fid:me.item_fid}});
			me.accessScore.load({
				callback:function(records,operation,success){
					if(records.length<=0)
					{
						me.isAdd=true;
						rec=Ext.create('srm.supplierAccess.model.SupplierAccessScore',{
						company_id:me.company_id,
						item_id:me.item_id,
						item_fid:me.item_fid,
						item_description:'',
						point_analyze:'',
						improve_act:'',
						responsible_person:''
						
						});
						
						//置空附件store
						me.accessUploadImgStore.load({params:{score_id:-1}});
						//图片显示为空
						me.down('#PIC').setSrc(null);
						//单选按钮默认设置
						me.down('#assess_score').setValue({'rb-score':5});
					}
					else
					{
						me.isAdd=false;
						rec=records[0];
						
						
						//记录当前的评估流水编号，用于给上传图片的记录赋值
						me.score_id=rec.get('score_id');
						me.accessUploadImgStore.load({params:{score_id:rec.get('score_id')}});
						if(rec.get('assess_score')!=null)
						{
							
							me.down('#assess_score').setValue({'rb-score':rec.get('assess_score')});
							me.down('#PIC').setSrc(null);
						}
					}
					
					me.down('#PanelEvaluateInfo').loadRecord(rec);
					
				}
			});
			
			
			
		},
		//将评估明细流水编号保存到上传图片Store中的每一条记录中
		setScoreIdToImgStore:function(score_id)
		{
			var me=this;
			var recs= me.accessUploadImgStore.getRange();
			for(var i=0;i<recs.length;i++)
			{
				recs[i].set('score_id',score_id);
			}
			//新增保存回调函数成功后把isAdd改成false,以便在当前页面直接修改时为编辑状态
			me.isAdd=false;
		},
		//评估项Ext treepanel 加载时 默认选中第一条叶子节点,无效
	treepanelLoad:function(store,node,records,successful,eOpts){
		var me=this;
		var treepanel=me.down('treepanel');
		
		//var rec=treepanel.getSelectionModel().getSelection()[0];
		if(successful && records.length>0 && node){
			for(var i = 0; i<records.length;i++){
				var leafNode = getLeafNode(node);
				if(leafNode!=''){
					treepanel.getSelectionModel().select(leafNode);
					if(!leafNode.get('expanded')){
		    				leafNode.expand();
		    				return;
					}
				}
			}
		}
	},
	getLeafNode: function(node){
			var leafNode='';
			if(node){
				if(!node.isLeaf()&&node.hasChildNodes()){
					var childrenNodes = node.childNodes;
					for(var i = 0;i<childrenNodes.length;i++){
						var childrenNode = childrenNodes[i];
						leafNode = getLeafNode(childrenNode);
						if(leafNode==''||leafNode==null){
							continue;
						}
						return leafNode;
					}
				}else if(node.isLeaf()){
					return node;
				}
			}
			return leafNode;
		}
});