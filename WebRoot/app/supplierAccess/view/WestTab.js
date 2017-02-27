//导航标签页
Ext.define('srm.supplierAccess.view.WestTab',{
	extend: 'Ext.tab.Panel',
	requires:['srm.basicdata.level.store.MaterialLevelTree',
			'srm.basicdata.materialClass.store.MaterialClassTree'],
	alias: 'widget.mng_AcessWestTab',
	initComponent: function(){
		var me = this;
		me.levstore=Ext.create('srm.basicdata.level.store.MaterialLevelTree');
		me.levstore.load();
		me.matstore=Ext.create('srm.basicdata.materialClass.store.MaterialClassTree');
		me.matstore.load();
		Ext.apply(me,{
		 defaults:{layout:'fit'},
		 tabPosition:'bottom',
		 items: [{
		 		title:'分层等级',
	   	  	  	xtype:'treepanel',
	   	  	  	itemId:'levelclass',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.levstore,
		    	rootVisible:false
		    	}
		    	,{
		    	title:'材料类别',
	   	  	  	xtype:'treepanel',
	   	  	  	itemId:'materialclass',
	   	  	  	width:200,
		    	useArrows: true,
		    	rootVisible:false,
		    	store:me.matstore
		    }
		    ]
		});
		me.callParent(arguments);
   }
});