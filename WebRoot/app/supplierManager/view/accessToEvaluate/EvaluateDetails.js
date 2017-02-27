/*13项评估审核信息页面*/
Ext.define('srm.supplierManager.view.accessToEvaluate.EvaluateDetails',{
	extend:'Ext.tab.Panel',
	requires:['srm.supplierManager.view.accessToEvaluate.ScoreCollectInfo'
			,'srm.supplierManager.view.accessToEvaluate.evaluateDetails.EvaluateDetailsOne'],
	alias:'widget.access_EvaluateDetails',
	initComponent:function(){
		var  me=this;
		Ext.apply(me,{
			defaults:{padding:2},
			
    	items:[
    	{
    		title:'分数汇总',
    		xtype:'access_ScoreCollectInfo',
    		itemId:'access_ScoreCollectInfo'
    	},{
    		//
				title:'经营状况与管理策略',
				itemId:'evaluateDetailsOne',
				item_fid:1,
				weightValue:1,
				fitem_name:'经营状况与管理策略',
				xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'持续改进',
			itemId:'evaluateDetailsTwo',
    		item_fid:2,
    		weightValue:2,
			fitem_name:'持续改进',
			xtype:'access_EvaluateDetailsOne'
    	}
    	,{
    		//
				title:'生产过程区域',
				itemId:'evaluateDetailsThree',
    			item_fid:3,
    			weightValue:1,
				fitem_name:'生产过程区域',
				xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'采购和供应商开发',
    		itemId:'evaluateDetailsFour',
    		item_fid:4,
    		weightValue:1.2,
			fitem_name:'采购和供应商开发',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'原材料、成品储存和仓务管理',
    		itemId:'evaluateDetailsFive',
    		item_fid:5,
    		weightValue:1,
			fitem_name:'原材料、成品储存和仓务管理',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'设备保养',
    		itemId:'evaluateDetailsSix',
    		item_fid:6,
    		weightValue:1.5,
			fitem_name:'设备保养',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'技术和工艺工程',
    		itemId:'evaluateDetailsSeven',
    		item_fid:7,
    		weightValue:2,
			fitem_name:'技术和工艺工程',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'产品文件',
    		itemId:'evaluateDetailsEight',
    		item_fid:8,
    		weightValue:2,
			fitem_name:'产品文件',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'研发 ',
    		itemId:'evaluateDetailsNine',
    		item_fid:9,
    		weightValue:1.5,
			fitem_name:'研发',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'不合格管理',
    		itemId:'evaluateDetailsTen',
    		item_fid:10,
    		weightValue:1,
			fitem_name:'不合格管理',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'生产质量和追溯',
    		itemId:'evaluateDetailsEleven',
    		item_fid:11,
    		weightValue:2,
			fitem_name:'生产质量和追溯',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'质量控制设备和过程控制',
    		itemId:'evaluateDetailsTwelven',
    		item_fid:12,
    		weightValue:2,
			fitem_name:'质量控制设备和过程控制',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'文件记录保存',
    		itemId:'evaluateDetailsThirteen',
    		item_fid:13,
    		weightValue:1,
			fitem_name:'文件记录保存',
			xtype:'access_EvaluateDetailsOne'
    	}]
		});
		this.callParent(arguments);}
});