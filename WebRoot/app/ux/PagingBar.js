
Ext.define('srm.ux.PagingBar', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.pagingbar',
    displayInfo: false,
    prependButtons: false,
    displayMsg : '显示 {0}-{1}条,共 {2}条',
    emptyMsg : '没有数据',
    beforePageText : '第',
    afterPageText : '页,共 {0}页',
    afterSize : '条/页',
    firstText : '第一页',
    prevText : '上一页',
    nextText : '下一页',
    lastText : '最后一页',
    refreshText : '刷新',
    defaultPageSize : 20,
    stateId : '',
    
    loadPageSize:function(){
    	var me = this;
        var savedPageSize = me.defaultPageSize;
        try{
        	if(!Ext.isEmpty(me.stateId))
                savedPageSize = Ext.state.Manager.get(tp_login_id+'_'+me.stateId);
        }catch(e){
        }
        savedPageSize = Ext.isEmpty(savedPageSize)?me.defaultPageSize:savedPageSize;
        return savedPageSize;
    },
    savePageSize:function(pageSize){
    	var me = this;
    	try{
            if(!Ext.isEmpty(me.stateId))
                Ext.state.Manager.set(tp_login_id+'_'+me.stateId,pageSize);
        }catch(e){
        }
    },
    getPagingItems: function() {
        var me = this;

        var items = me.callParent(arguments);
        Ext.Array.insert(items, items.length, 
        	[
	           {
	           	xtype: 'numberfield',
	               itemId: 'inputSize',
	               name: 'inputSize',
	               cls: Ext.baseCSSPrefix + 'tbar-page-number',
	               allowDecimals: false,
	               minValue: 1,
	               maxValue: 1000,
	               hideTrigger: true,
	               enableKeyEvents: true,
	               keyNavEnabled: false,
	               selectOnFocus: true,
	               submitValue: false,
	               // mark it as not a field so the form will not catch it when getting fields
	               isFormField: false,
	               width: 30,
	               margins: { top: 0, right: -5, bottom: 0, left: 0 },
	               listeners: {
	                   scope: me,
	                   blur: me.setPageSize
	               }
	           },
           	   me.afterSize
           ]);
        return items;
      
    },

    /**
     * @override
     */
    onLoad : function(){
    	var me = this;
    	count = me.store.getCount();
        isEmpty = count === 0;
        me.store.pageSize = me.loadPageSize();
        me.oldPageSize = me.store.pageSize;
    	me.child('#inputSize').setDisabled(isEmpty).setValue(me.store.pageSize);
    	me.callParent(arguments);
    },
    /**
     * @public
     */
    setPageSize : function(){
    	var me = this,
        pageData = me.getPageData(),
        v = me.child('#inputSize').getValue();
        
	    if(v>0&&v!=me.oldPageSize){
	    	me.savePageSize(v);
	    	me.store.pageSize = v;
	        me.store.removeAll();
	        me.store.loadPage(1);
	        me.defaultPageSize=v;
	    }
    }
});