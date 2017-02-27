/*供应商具体信息主页面*/
Ext.define('srm.supplierFile.view.SupplierFileShow',{
	extend:'srm.ux.Window',
	alias:'widget.SupplierFileShow',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
	requires:[
		'srm.supplierFile.view.SupplierFileBaseShow',
		'srm.supplierFile.view.SupplierFileAttchedShow',
		'srm.supplierFile.view.SupplierFileMaterialShow',
		'srm.supplierFile.view.SupplierFileCheckFactoryShow'
	],
	listeners:{
		'close':function(panel){
			panel.destroy();
		}
	},
//	height:document.body.clientHeight,
//	width:document.body.clientWidth * 0.9>1000?document.body.clientWidth * 0.9:1000,
	isAdd:false,
	isEdit:false,
	initComponent:function(){
		//Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
		var  me=this;
		//公司注册附件
		me.registerAttchedStore=Ext.create('srm.supplierFile.store.SupplierFileAttched');
		Ext.apply(me,{
		layout:'fit',
		items:[{
			xtype:'tabpanel',
			autoScroll :'true',
			defaults:{padding:2},
			items:[{
		    		title:'供应商信息',
		    		isAdd:me.isAdd,
		    		isEdit:me.isEdit,
		    		reg_id:me.reg_id,
		    		store:me.store,
		    		itemId:'SupplierFileBaseShow',
		    		xtype:'SupplierFileBaseShow'
		    	},{
		    		//附件
						title:'认证文件',
						isAdd:me.isAdd,
		    			isEdit:me.isEdit,
		    			itemId:'SupplierFileAttchedShow',
						xtype:'SupplierFileAttchedShow',
						height:document.body.clientHeight,
						modFuncsDisabled:me.modFuncsDisabled
		    },{
				title:'物料确认',
				isAdd:me.isAdd,
    			isEdit:me.isEdit,
    			itemId:'SupplierFileMaterialShow',
				xtype:'SupplierFileMaterialShow',
				height:document.body.clientHeight,
				modFuncsDisabled:me.modFuncsDisabled
		    },{
		    	title:'验厂报告',
		    	isAdd:me.isAdd,
		    	isEdit:me.isEdit,
		    	itemId:'SupplierFileCheckFactoryShow',
		    	xtype:'SupplierFileCheckFactoryShow',
		    	height:document.body.clientHeight,
		    	modFuncsDisabled:me.modFuncsDisabled
		    }]
		}]
		
		});
		this.callParent(arguments);
		me.loadRec(me.supplierRec);
	},
	loadRec:function(rec){
		var me=this;
		//加载供应商基本信息
		me.down('#SupplierFileBaseShow').loadBaseData(rec);
		//加载附件信息
		me.down('#SupplierFileAttchedShow').loadGridData(rec);
		//加载物料确认信息
		me.down('#SupplierFileMaterialShow').loadMaterialData(rec);
		//加载验厂报告信息
		me.down('#SupplierFileCheckFactoryShow').loadCheckFactoryData(rec);
	},
});