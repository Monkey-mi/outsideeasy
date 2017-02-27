//导航标签页
Ext.define('srm.supplierManager.view.WestTab',{
	extend: 'Ext.tab.Panel',
	requires:['srm.basicdata.level.store.MaterialLevelTree',
			'srm.basicdata.materialClass.store.MaterialClassTree'],
	alias: 'widget.mng_WestTab',
	initComponent: function(){
		var me = this;
//		var levstore = Ext.create('Ext.data.TreeStore', {
//    	root: {
//        expanded: true,
//        children: [
//            { text: "I类材料", leaf: true },
//            { text: "II类材料",leaf: true },
//            { text: "III类材料", leaf: true },
//            { text: "IV类材料", leaf: true }
//        		]}
//		});
//		var matstore = Ext.create('Ext.data.TreeStore', {
//    	root: {
//        	expanded: true,
//        	children: [
//            { text: "管材",expanded: true, children:[{text:"铝管",leaf:true},{text:"铁管",leaf:true}] },
//            { text: "面辅料",  children: [
//             	{ text: "主面料", leaf: true },
//                { text: "网布", leaf: true },
//                { text: "拉链", leaf: true},
//                { text: "棉布", leaf: true }
//            	] },
//            { text: "五金",  children: [
//             	{ text: "紧固件", leaf: true },
//                { text: "冲压件", leaf: true },
//                { text: "蓬圈", leaf: true},
//                { text: "木棍", leaf: true }
//            	] }
//        	]}
//			});
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