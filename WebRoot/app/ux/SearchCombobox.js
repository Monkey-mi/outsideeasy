Ext.define('srm.ux.SearchCombobox',{
	   extend:'Ext.form.field.ComboBox',
	   alias: 'widget.srm_searchcbo',
       displayField: '',
       typeAhead: false,
       hideLabel: false,
       hideTrigger:false,
       anchor: '100%',
       pageSize: 10,
       minChars:1,
       queryParam:'search',
	   initComponent : function() {
			var me=this;
			Ext.apply(me,{
			   xtype:'combo',
			   pageSize:me.pageSize,
		       store:Ext.apply(me.store,{pageSize:me.pageSize}),
			   listConfig: {
		            loadingText: '搜索中...',
		            emptyText: '没有匹配的项目.',
		            // Custom rendering template for each item
		            getInnerTpl: function() {
		            	return '{'+me.valueField+'}<span style="padding-left:10px">{'+me.displayField+'}</span>';
		                }
            	}
			});
			this.callParent(arguments);
		}
        
	
});