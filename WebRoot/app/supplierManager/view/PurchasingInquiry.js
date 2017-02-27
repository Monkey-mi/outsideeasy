//采购询价单明细页面
Ext.define('srm.supplierManager.view.PurchasingInquiry',{
	extend:'Ext.tab.Panel',
	alias:'widget.PurchasingInquiryDetails',
	requires:['srm.supplierManager.view.purchasingInquiry.GeneralTemplate',
				'srm.supplierManager.view.purchasingInquiry.CaiheTemplate',
				'srm.supplierManager.view.purchasingInquiry.HechenggeTemplate',
				'srm.supplierManager.view.purchasingInquiry.MianliaoTemplate',
				'srm.supplierManager.view.purchasingInquiry.WangbuTemplate',
				'srm.supplierManager.view.purchasingInquiry.ZhixiangTemplate'],
	initComponent:function(){
		var  me=this;
		Ext.apply(me,{
			defaults:{padding:2},
			
    	items:[
    	{
    		title:'通用版',
    		xtype:'Pi_GeneralTemplate'
    	},{
    		//
				title:'彩盒',
				xtype:'Pi_CaiheTemplate'
    	},{
    		
    		title:'合成革',
    		xtype:'Pi_HechenggeTemplate'
    	}
    	,{
    		//
				title:'面料',
				xtype:'Pi_MianliaoTemplate'
    	},{
    		
    		title:'网布',
    		xtype:'Pi_WangbuTemplate'
    	},{
    		
    		title:'纸箱',
    		xtype:'Pi_ZhixiangTemplate'
    	}]
		});
		this.callParent(arguments);
		
	}
});