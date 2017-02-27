/*供应商具体信息主页面*/
Ext.define('srm.supplierManager.view.SupplierMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.SupplierMainInfo',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
//	height:document.body.clientHeight,
//	width:document.body.clientWidth * 0.9>1000?document.body.clientWidth * 0.9:1000,
	isAdd:false,
	isEdit:false,

	initComponent:function(){
		//Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
		var  me=this;
		//公司注册附件
		me.registerAttchedStore=Ext.create('srm.supplierManager.store.AppRegisterAttched');
		Ext.apply(me,{
			
		layout:'fit',
		items:[
		{
			xtype:'tabpanel',
			autoScroll :'true',
			defaults:{padding:2},
			items:[
	    	{
	    		title:'供应商信息',
	    		
	    		//height:800,
	    		//autoScroll:true,
	    		isAdd:me.isAdd,
	    		isEdit:me.isEdit,
	    		store:me.store,
	    		//不加，无权限时按钮能显示但不可用，加上则无权限时按钮都不显示
	    		//modFuncsDisabled:me.modFuncsDisabled,
	    		itemId:'supplierBaseInfo',
	    		xtype:'SupplierBaseInfo'
	    	},{
	    		//附件
					title:'认证文件',
					
					isAdd:me.isAdd,
	    			isEdit:me.isEdit,
	    			itemId:'supplierFileInfo',
					xtype:'SupplierFileInfo',
					height:document.body.clientHeight,
					hasAutority:me.modFuncsDisabled['BTN_SAVE']==0,
					modFuncsDisabled:me.modFuncsDisabled
	    	},{
	    		//采购询价单
	    		title:'报价单',
	//    		isAdd:me.isAdd,
	//    		isEdit:me.isEdit,
	    		xtype:'mng_PurchasingInquiryList',
	    		itemId:'mng_PurchasingInquiryList'
	    		//disable:me.isAdd
	    	}
	    	,{
	    		title:'准入评估',
	    		xtype:'access_EvaluateMain',
	    		itemId:'access_EvaluateMain'
	    		//show:!(me.isAdd||me.isEdit)
	    	},
	    	{
	    		title:'物料确认',
	    		xtype:'panel_materialConfirmInfo',
	    		itemId:'materialConfirmInfo',
	    		//boder布局需要在外层指定组件的高度，不然因重新加载时无法计算组件高度而无法显示
	    		height:document.body.clientHeight
	    		
	    	}
	    	]
		}
		]
		
		});
		this.callParent(arguments);
		me.loadRec(me.supplierRec);
	},
	loadRec:function(rec){
		var me=this;
		
		//新增时加载默认的附件
//		var files=Ext.create('Ext.data.Store',{
//    		fields:['file_name', 'create_dt', 'file_path'],
//    		data:{'items':[
//        		{"file_name":"营业执照", "create_dt":new Date(),"file_path":""},
//        		{"file_name":"税务登记证", "create_dt":new Date(),"file_path":""},
//        		{"file_name":"组织机构代码证", "create_dt":new Date(),"file_path":""}
//				]},
//			proxy:{
//				type:'memory',
//				reader:{type:'json',
//				rootProperty:'items'}
//			}
//			});
//		me.down('SupplierFileInfo').setGridData(files);
		//加载供应商基本信息
		me.down('#supplierBaseInfo').loadBaseData(rec);//down('#PanelBaseInfo').loadRecord(rec);
		//加载附件信息
		me.down('#supplierFileInfo').loadGridData(rec);
		//加载业务数据
		me.down('#supplierBaseInfo').down('#supplierBusInfo').loadbusData(rec);
		var companyid=rec.get('company_id');
		
		if(companyid!=null&&companyid>0)
		{
			//物料确认信息加载
			me.down("#materialConfirmInfo").loadMaterialConfrimData(companyid);
			
			//加载评估分数汇总数据
			me.down('#access_EvaluateMain').down('#access_EvaluateBaseInfo').down('#panelSupplierInfo').loadRecord(rec);
			me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#access_ScoreCollectInfo').loadScoreSummaryData(companyid);
			
			me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsOne').loadScoreDetailsData(companyid);
		
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsTwo').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsThree').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsFour').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsFive').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsSix').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsSeven').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsEight').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsNine').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsTen').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsEleven').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsTwelven').loadScoreDetailsData(companyid);
		me.down('#access_EvaluateMain').down('#access_EvaluateDetails').down('#evaluateDetailsThirteen').loadScoreDetailsData(companyid);
		
		me.down('#mng_PurchasingInquiryList').loadDate(rec);
		}
	}
});