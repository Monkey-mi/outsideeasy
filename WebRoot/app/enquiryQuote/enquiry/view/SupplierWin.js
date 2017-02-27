Ext.define('srm.enquiryQuote.enquiry.view.SupplierWin',{
	extend:'srm.ux.Window',
    alias:'widget.supplierWin',
    iconCls:'box',
    width:540,
    height:680,
    modal : true,
    title:'供应商选择',
    initComponent:function(){
    	var me =this;
		me.supplierstore=Ext.create('srm.enquiryQuote.enquiry.store.SupplierFile');
    	Ext.apply(me,{  		
    	  layout:'fit',
   	  	  items:[
   	  	  	{
	   	  	  	itemId:'grid_supplier',
	   	  	  	xtype:'grid',
	   	  	  	autoScroll :'true',
	   	  	  	store:me.supplierstore, 
	   	  	  	multiSelect:true,
	   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
	   	  	  	enableDragDrop: true,
	   	  	  	viewConfig:{  
					  enableTextSelection:true
				 }, 
	   	  	  	tbar:[
			      {
			    	  	xtype : 'textfield',
			    	  	fieldLabel:'供应商名',
						itemId : 'cpyname_cn',	
						name:'cpyname_cn',
						hiddenLabel : true,
						enableKeyEvents :true,
						width:220,
						emptyText:'供应商名' ,
						listeners:{
							keyup:me.onKeyup
						}
					}, {
						xtype : 'button',
						text : '搜索',
						iconCls:'query',
						itemId:'search',
						handler:me.doSearch
					}
			      ],
   	  			dockedItems:[
   	  			{
		    		xtype : 'pagingbar',
                    stateId : 'pagingbar-supplierWin-1',
		    		store:me.supplierstore,
		    		dock:'bottom',
		    		displayInfo:true
			    }],
	    		columns:[
	   	  	  		{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',flex:1},
   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160}
	   	  	    ],
	   	  	    listeners:{
	   	  	    	'beforedestroy':function(){
	   	  	    		delete me.supplierstore.proxy.extraParams.cpyname_cn;
	   	  	    	}
	   	  	    }
   	  	  }
   	  	  ],  	  	 	
			buttons:[{text:'确认',glyph:0xf0c7,itemId:'BTN_SAVE'},{text:'关闭',glyph:0xf00d,handler:function(){
					me.close();
				}
		  	}]
		});		
 		me.callParent(arguments);
 	},
	loadData:function(){
		var me=this;				
		me.supplierstore.loadPage(1);
	},
	doSearch:function(){
		var me=this;
		var cpyname_cn=me.down('#grid_supplier').down('#cpyname_cn').getValue();
		Ext.apply(me.supplierstore.proxy.extraParams, {'cpyname_cn':cpyname_cn});
		me.supplierstore.loadPage(1);
	},
	onKeyup:function(field,e){
		var me=this.up('edt_BagMain_erp');
		if (e.getKey() == e.ENTER) {
            me.doSearch();
        }
	}
});
