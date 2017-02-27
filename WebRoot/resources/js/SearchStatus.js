Ext.Loader.setConfig({
    enabled: true,
    paths: {'srm':'app'}  //指定命名空间的实际目录,要和上面的name、appFolder对应
});
Ext.require(['srm.def.Const'
             ,'srm.def.ui.ErrorWin']);
Ext.onReady(function(){
	Ext.require(['srm.register.view.SearchStatusView']);
	Ext.onReady(function(){
		Ext.Ajax.on('requestexception',srm.Const.onAjaxResponse);
		Ext.Ajax.on('requestcomplete',srm.Const.onAjaxResponse);
		Ext.tip.QuickTipManager.init();
		var win=Ext.widget('searchStatusView',{renderTo:Ext.getBody()});
		win.show();
	});
	
});