/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.onReady(function(){
	Ext.tip.QuickTipManager.init();
	 //绑定所有的AJAX错误处理事件
    Ext.Ajax.on('requestexception',srm.Const.onAjaxResponse);
    Ext.Ajax.on('requestcomplete',srm.Const.onAjaxResponse);
    Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider()); 
	
	// 同步调用取得系统参数  
	srm.Util.init(function(){
			    Ext.application({
			    name: 'srm',
			    extend: 'srm.Application',
			    autoCreateViewport: 'srm.view.main.Main'
				
			    //-------------------------------------------------------------------------
			    // Most customizations should be made to srm.Application. If you need to
			    // customize this file, doing so below this section reduces the likelihood
			    // of merge conflicts when upgrading to new versions of Sencha Cmd.
			    //-------------------------------------------------------------------------
			});
	    });
	
});



