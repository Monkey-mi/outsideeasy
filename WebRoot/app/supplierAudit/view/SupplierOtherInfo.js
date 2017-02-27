Ext.define('srm.supplierAudit.view.SupplierOtherInfo',{
	extend:'Ext.tab.Panel',
	alias:'widget.audit_SupplierotherInfo',
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		//发票抬头store
		me.invoicestore=Ext.create('srm.supplierAudit.store.AppInvoiceTitle');
		//公司银行账号
		me.bankAccountStore=Ext.create('srm.supplierAudit.store.AppBankAccount');
		Ext.apply(me,{
			defaults:{padding:5,layout:'fit'},	
			border:false,
			items:[{
				title:'银行账号',
	    		itemId:'plbankDetails',
	    		layout:'absolute',
	    		overflowY: 'auto',
	    		overflowX:'auto',
	    		items:[{
	    			xtype:'grid',
	    			itemId:'grdBankDetails',
    				border:true,
    				x:2,
    				y:2,
    				width:800,
    				columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">银行账号</div>',dataIndex:'account_code',editor:{},width:200},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype: 'checkcolumn',stopSelection: false,
		    				renderer:function(value){
									if(value=="true"||value=="1"){//是否默认
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    		store:me.bankAccountStore
	    		}]
			},
			{
				title:'发票抬头',
	    		itemId:'plinvoiceDetails',
	    		layout:'absolute',
	    		overflowY: 'auto',
	    		overflowX:'auto',
	    		items:[{
		    		xtype:'grid',
	    			itemId:'grdInvoiceDetails',
	    			border:true,
	    			x:2,
	    			y:2,
	    			width:800,
	    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40,align:'center'},
		    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',
							renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    		store:me.invoicestore
	    		}]
			}]
		});
		me.callParent(arguments);
	},
	loadOtherData:function(rec)
	{
		var me=this;
		if(rec.get('company_id')>0)
		{
			me.company_id=rec.get('company_id');
			//发票抬头store
			me.invoicestore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
		}
	}
	
});