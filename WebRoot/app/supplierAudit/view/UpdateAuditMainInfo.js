Ext.define('srm.supplierAudit.view.UpdateAuditMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.update_AuditMainInfo',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			items:[
			{
				xtype:'tabpanel',
				autoScroll :'true',
				defaults:{padding:2},
				items:[
				{
					title:'基本信息',
					itemId:'updateAuditBaseInfo',
	    			xtype:'update_auditBaseInfo'
	    			
				},{
					title:'变更的公司证照',
					itemId:'updateAuditAttchedFile',
					xtype:'update_audit_AttchedFileInfo'
				}
				]
			}]
			
		});
		me.callParent(arguments);
		me.loadRec(me.updateSupplierRec);
	},
	loadRec:function(rec)
	{
		var me=this;
		me.down('#updateAuditBaseInfo').loadBaseData(rec);
		
		me.down('#updateAuditAttchedFile').loadfileData(rec.get('auth_update_id'));
	}
	
});