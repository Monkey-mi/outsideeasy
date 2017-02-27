/*认证变更审核不通过意见窗口*/
Ext.define('srm.supplierAudit.view.UpdateAuditOpinion',{
	extend:'srm.ux.Window',
	alias:'widget.win_update_auditOpinion',
	title:'不合格意见',
	width:500,
	height:200,
	frame:true,
	modal:true,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			xtype:'panel',
			
			items:[{
				xtype:'form',
				layout:'column',
				itemId:'updateAuditOpinionForm',
				
				items:[
				{
					padding:'20 0 0 10',
					xtype:'textareafield',
					name:'auth_opinion',
					fieldLabel:'审核意见',
					allowBlank:false,
					msgTarget : 'side',
					autoFitErrors : true,
					labelWidth:80,
					columnWidth:0.9
				}
				],
				buttons:[{text:'确定',glyph:0xf058,itemId:'btn_save'}]
			}]
		});
		me.callParent(arguments);
		me.down('#updateAuditOpinionForm').loadRecord(me.updateAuditOpinionRec);
	}
});