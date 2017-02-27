/*经营状况与管理策略*/
Ext.define('srm.supplierManager.view.accessToEvaluate.evaluateDetails.EvaluateDetailsOne',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	alias:'widget.access_EvaluateDetailsOne',
	requires:['srm.supplierAccess.store.SupplierAccessUploadImg'],
	initComponent:function(){
		var me=this;
	//乘以权重后的得分
	//me.weightScore=0;
	//权重值
	
    me.scoreDetailsStore=Ext.create('srm.supplierManager.store.SupplierAccessScoreDetails');
    //me.imgStore=Ext.create('srm.supplierAccess.store.SupplierAccessUploadImg');
		Ext.apply(me,{
//			layout:{
//		     type: 'vbox',//垂直分布
//		     align: 'stretch'
//    		},
			layout:'anchor',
    		defaults:{padding:4},
    		
    		minHeight:500,
    		items:[{
    			anchor:'80%',
    			xtype:'container',
    			layout:{type:'hbox',align:'stretch'},
				items:[{
				xtype:'grid',
				//anchor:'90%',
				flex:1,
				border:true,
				
				//显示表格线
				columnLines : true,
				
				features:[{ftype:'summary'}],
				store:me.scoreDetailsStore,
				//width: 800,
				
				columns:[
					{header:'序号',xtype:'rownumberer',width:40,align:'center',height:30},
					{header:me.fitem_name,dataIndex:'item_name',flex:1,
						summaryType: 'count',
					summaryRenderer: function(value, summaryData, dataIndex) {
					return '<div style="text-align:right;">类别得分 :</div>';}},
    				{header:'<div style="text-align:center">拒绝</div>',align:'center', dataIndex: 'score1',xtype:'numbercolumn',width:100,
    					renderer:function(v){if(v==0) return '√';else return '';},
    					summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return 0;}},
    				{header:'<div style="text-align:center">差</div>',align:'center',dataIndex: 'score2',xtype:'numbercolumn',width:100,
    					renderer:function(v){if(v==2) return '√';else return '';},
    					summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							
		return Ext.util.Format.number(value,'0');}},
    				{header:'<div style="text-align:center">满意</div>',align:'center',dataIndex: 'score3',xtype:'numbercolumn',width:100,
    					renderer:function(v){if(v==4) return '√';else return '';},
    					summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							
		return Ext.util.Format.number(value,'0');}},
    				{header:'<div style="text-align:center">优秀</div>',align:'center',dataIndex: 'score4',xtype:'numbercolumn',width:100,
    					renderer:function(v){if(v==5) return '√';else return '';},
    					summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							
							
		return Ext.util.Format.number(value,'0');}}
    				]
			},
			{
			//权重值
				defaults:{xtype:'displayfield'},
				//style:'border:1px solid red;',
				items:[
//					{
//					itemId:'weightscoreId',
//					value:me.weightScore*me.weightValue,
//					width:100
//				},
					{
					itemId:'weightValueId',
					value:'权重√：'+me.weightValue,
					width:100
				}]
			}
    		]},{
				xtype:'grid',
				border:true,
				anchor:'100%',
				columnLines : true,
				store:me.scoreDetailsStore,
				columns:[
					{header:'序号',xtype:'rownumberer',width:40,align:'center'
//						,renderer: function(value, metaData, record, rowIndex, colIndex, store){
//							return '1.'+ Ext.util.Format.number(rowIndex+1,'0');
//						}
					},
					{header:'<div style="font-weight:bold;text-align:center">评估结果描述 :</div>',style:'background-color:#FFFFCC', dataIndex:'item_description',flex:1
						,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:26px;';   
                                          return value;   
                                     }
						},
    				{header:'<div style="font-weight:bold;text-align:center">评估过程中图示</div>',dataIndex: 'assess_view1',style:'background-color:#FFFFCC',width:320
    					,padding:0,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:26px;';
                                          if(value!=null&&value!='')
                                          {
                                          	var return_Str='<div style="height:300px;width:100%;overflow-x:hidden;">';
                                          	var array=value.split(',');
                                          	for(var i=0;i<array.length;i++)
                                          	{
                                          		if(!Ext.isEmpty(array[i])){
                                          			var file_path=encodeURIComponent(encodeURIComponent(array[i]));
   													var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
                                          			return_Str+='<img src="'+src+'" width="300"  height="300"/><br />';
                                          		}
                                          		
                                          	}
                                          	return_Str+='</div>';
                                          	return return_Str;
                                          }
                                          else{
                                          return value;}
                                     }},
    				
    				{header:'<div style="font-weight:bold;text-align:center">要因分析</div>',dataIndex: 'point_analyze',style:'background-color:#FFFFCC',width:160
    				,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:26px;';   
                                          return value;   
                                     }},
    				{header:'<div style="font-weight:bold;text-align:center">建议改善措施</div>',dataIndex: 'improve_act',style:'background-color:#FFFFCC',width:160
    				,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:26px;';   
                                          return value;   
                                     }
    					},
    				{header:'<div style="font-weight:bold;text-align:center">责任人</div>',dataIndex: 'responsible_person',style:'background-color:#FFFFCC',width:80
    				,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:26px;';   
                                          return value;   
                                     }},
    				{header:'<div style="font-weight:bold;text-align:center">计划完成时间</div>',dataIndex: 'plan_assess_date',xtype:'datecolumn',format:'Y-m-d',style:'background-color:#FFFFCC',width:100}
    				]
//    			,plugins: {
//					        ptype: 'cellediting',
//					        clicksToEdit: 1   
//					    }	
			}]
			
		});
		this.callParent(arguments);},
		//加载页面store
		loadScoreDetailsData:function(company_id){
			var me=this;
			
					var score=0;
			me.scoreDetailsStore.load({
				params:{
					company_id:company_id,
					item_fid:me.item_fid
				},
				callback:function(records, operation, success){
					
				}});
			//me.imgStore.load({})
		}
		,showImgData:function(scoreid)
		{
			var me=this;
			
			
//			var imgStore=Ext.create('srm.supplierAccess.store.SupplierAccessUploadImg');
//			imgStore.load(
//				{params:{score_id:scoreid},
//				callback:function(records, operation, success){
//					var htmlStr='<div style="border:1px solid red;width:400px;height:600px;">';
//					for(var i=0;i<records.length;i++)
//					{
//						var file_path=records[i].get('file_path');
//						if(file_path!=null&&file_path!='')
//						{
//							
//							htmlStr=htmlStr+'<img src="resources/upload/'+file_path+'" width="400"  height="400"/><br />';
//						}
//					}
//					
//				}});
			
			for(var i=0;i<me.imgStore.getCount();i++)
			{
				
				var record=me.imgStore.getAt(i);
				var file_path=record.get('file_path');
				if(file_path!=null&&file_path!='')
				{
					file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
					htmlStr+='<img src="'+src+'" width="400"  height="400"/><br />';
				}
			}
				htmlStr=htmlStr+'</div>';
			
			return htmlStr;
		}
});