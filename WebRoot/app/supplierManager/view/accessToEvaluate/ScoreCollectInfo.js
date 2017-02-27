/*分数汇总信息页面*/
Ext.define('srm.supplierManager.view.accessToEvaluate.ScoreCollectInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.access_ScoreCollectInfo',
	requires:['srm.supplierManager.view.accessToEvaluate.EvaluateCharts'
			],
	height:800,
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		
//		var myDataStore = Ext.create('Ext.data.JsonStore', {
//    		fields: ['EvaluateItem','maxNum','minNum', 'score'],
//    		data:[
//        {'EvaluateItem':'管理策略','maxNum':35,'minNum':32, 'score':91},
//        {'EvaluateItem':'持续改进','maxNum':40,'minNum':38,'score':95},
//        {'EvaluateItem':'生产过程区域','maxNum':35,'minNum':35,'score':100},
//        {'EvaluateItem':'采购和供应商开发','maxNum':18,'minNum':18,'score':100},
//        {'EvaluateItem':'原材料、成品储存和仓务管理','maxNum':15,'minNum':15,'score':100},
//        {'EvaluateItem':'设备保养','maxNum':45,'minNum':45,'score':100},
//        {'EvaluateItem':'技术和工艺工程','maxNum':40,'minNum':40,'score':100},
//        {'EvaluateItem':'产品文件(工艺与品质)','maxNum':40,'minNum':40,'score':100},
//        {'EvaluateItem':'研发','maxNum':30,'minNum':10,'score':33},
//        {'EvaluateItem':'不合格隔离','maxNum':10,'minNum':5,'score':50},
//        {'EvaluateItem':'生产质量和追溯','maxNum':80,'minNum':70,'score':88},
//        {'EvaluateItem':'测量设备校准','maxNum':20,'minNum':20,'score':100},
//        {'EvaluateItem':'文件记录保存','maxNum':20,'minNum':20,'score':100}]
//    });
		me.scoreSummaryStore=Ext.create('srm.supplierManager.store.AccessScoreSummary');
		me.gridCount=me.scoreSummaryStore.getCount()>0?me.scoreSummaryStore.getCount():1;
		me.keyAreaRealmum=0;
		me.keyAreaMaxmum=0;
		Ext.apply(me,{
			
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    		},
			items:[
//				{
//			//准入评估基本信息
//				xtype:'access_EvaluateBaseInfo'
//				//height:200
//			},
				{
				
//				//分数汇总
				flex:1,
				//title:'分数汇总',
				layout:{type:'hbox',align:'stretch'},
				items:[{
					flex:3,
					//width:600,
					layout:{type:'vbox',align:'stretch'},
					items:[{
					xtype:'grid',
					border:true,
					columnLines:true,
					
					features:[{ftype:'summary'}],
					store:me.scoreSummaryStore,
					columns:[{header:'',xtype:'rownumberer',width:40,align:'center'},
    						{header:'<div style="text-align:center">条款</div>',dataIndex:'fitem_name',flex:1,minWidth:160,
    						summaryType: 'count',
							summaryRenderer: function(value, summaryData, dataIndex) {
								return '<div style="font-weight:bold;">审核分数(1~13项)汇总</div>';}},
    						{header:'<div style="text-align:center">最大值</div>',dataIndex:'maxmum',align:'center', xtype: 'numbercolumn',format:'0,0',width:100
    							,renderer: function(value, metaData, record, rowIndex, colIndex, store) 
    								{
    								var item_id=record.get('fitem_id');
    								//if(rowIndex==6||rowIndex==7||rowIndex==10||rowIndex==11)
    								if(item_id==7||item_id==8||item_id==11||item_id==12)
    								{
    									
    									return Ext.String.format( '<div style="color:blue;background-color:#DEB887">{0}</div>',value);
    								}
    								else return value;
    									},
    						summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value,'0');}},
    						{header:'<div style="text-align:center">实际值</div>',dataIndex:'realmum',align:'center',xtype: 'numbercolumn',format:'0,0',width:100
    						,renderer: function(value, metaData, record, rowIndex, colIndex, store) 
    						{
    						var item_id=record.get('fitem_id');
    						//if(rowIndex==6||rowIndex==7||rowIndex==10||rowIndex==11)
    						if(item_id==7||item_id==8||item_id==11||item_id==12)
    						{
    							
    							return Ext.String.format( '<div style="color:blue;background-color:#DEB887">{0}</div>',value);}else return value;
    						},
    						summaryType: 'sum',
							summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value,'0');}},
    						{header:'<div style="text-align:center">分数%</div>',dataIndex:'score',align:'center',xtype: 'numbercolumn',format:'0,0',width:100,
    						renderer:function(v){
    							return Ext.util.Format.number(v,'0')+'%';},
    						summaryType: 'average',
							summaryRenderer: function(value, summaryData, dataIndex) {
								
							return   Ext.util.Format.number(value,'0')+'%';}}
    						]
    						},
//    						{
//    							flex:1,
//    							html:'<table style="width:100%;border:1px solid #CCCCCC;" cellpadding="0" cellspacing="0"><tbody><tr >' +
//    									'<td style="width:40px;height:26px;">' +
//    									'</td>' +
//    									'<td style="width:auto;">' +
//    									'<div style="text-align:left;">' +
//    									'<div style="font-weight:bold;">关键区域(7,8,11,12)分数总计：</div></div></td>' +
//    									'<td style="width:100px;">' +
//    									'<div id="keyMaxmundiv" style="text-align:center;">' +
//    									me.keyAreaMaxmum +
//    									'</div></td><td style="width:100px;">' +
//    									'<div id="keyRealmumdiv" style="text-align:center;">' +
//    									me.keyAreaRealmum +
//    									'</div></td><td style="width:100px;">' +
//    									'<div  style="text-align:center;">' +
//    									'0' +
//    									'</div></td></tr></tbody></table>'
//    						
//    						
//    						}
//    						,
    						{
    							//flex:1,
    							
    							layout:{type:'hbox'},
    							xtype:'container',
    							style:'border:1px solid #CCCCCC;text-align:center;',
    							defaults:{xtype:'displayfield'},
    							minWidth:510,
    							items:[
    							{
    								value:'',
    								width:40
    							},
    								{
    								
    								itemId:'keyId1',
    								style:'text-align:left;',
    								value:'<span style="font-weight:bold;">关键区域(7,8,11,12)分数总计：</span>',
    								
    								flex:1
    							},
    							{
    								itemId:'keyId2',
    								align:'center',
    								value:'',
    								
    								width:100
    							}
    							,{
    							 	itemId:'keyId3',
    								value:'',
    								align:'center',
    								width:100
    							 }
    							 ,{
    							
    							 	itemId:'keyId4',
    								value:'',
    								align:'center',
    								width:100
    							 }
    							 ]
    						}
    						]
		
				}
				
				,{
					//雷达图chart
//					width:650,
//					height:460,
					overflowX:'auto',
					flex:2,
					border:true,
					xtype:'access_EvaluateCharts',
					scoreSummaryStore:me.scoreSummaryStore
				}
				]
			}]
		});
	me.callParent(arguments);
	}
	,
	//加载当前供应商的评估分数汇总Store
	loadScoreSummaryData:function(company_id){
		var me=this;
		
		me.scoreSummaryStore.load({
				params:{
					company_id:company_id
				},
				callback:function(records, operation, success){
					for(var i=0;i<records.length;i++)
					{
						var itemid=records[i].get('fitem_id');
						if(itemid==7||itemid==8||itemid==11||itemid==12)
						{
						me.keyAreaRealmum+=records[i].get('realmum');
						me.keyAreaMaxmum+=records[i].get('maxmum');
						}
					
					}

					me.down('#keyId2').setValue(me.keyAreaMaxmum);
					me.down('#keyId3').setValue(me.keyAreaRealmum);
					if(me.keyAreaMaxmum>0)
					{
						var score=(me.keyAreaRealmum/me.keyAreaMaxmum)*100;
						var score2=Ext.util.Format.number(score,'0')+'%';
						
						me.down('#keyId4').setValue(score2);
					}
				}
			});
			
	}
	});