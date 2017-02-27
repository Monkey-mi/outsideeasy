Ext.define('srm.user.view.BaseUserCtr',{
       extend:'Ext.tab.Panel',
       alias:'widget.user_ctr',
       requires:['srm.user.userctr.MngUserRole'
      			 ,'srm.user.userctr.MngUserModule'
      			 ],
       ctrArray:['user_role'
       				,'user_mofun'
       				],
       title:'用户权限信息',
       border:true,
       isEdit:true,
       initComponent:function(){
       	  var me=this;
       	  var items=me.createCtrContainers();
       	  Ext.apply(me,{
       	     items:items
       	  });
       	  me.callParent(arguments);
       	  me.doInit();
       },
       /**
        * 
        */
       changeOrg:function(ou_id,userOrg){
         var me=this;
          var actTab = me.getActiveTab();
          Ext.each(me.ctrArray,function(rec){
            var panel=me.down(rec);
            if(panel.changeOrg)
                panel.changeOrg(ou_id,userOrg);
            if(actTab.disabled&&!panel.disabled)
                me.setActiveTab(panel);
          });
       },
       /**
        * 初始化
        */
       doInit:function(model){
       	var me=this;
          Ext.each(me.ctrArray,function(rec){
             var panel=me.down(rec);
             if(panel.doInit)
                panel.doInit(model);
          });
       },
       /**
        * 
        * @return {}
        */
       createCtrContainers:function(){
       	 var me=this;
       	 var items=[];
      	 Ext.each(me.ctrArray,function(rec){  
       	   items.push({
       	     xtype:rec,
       	     isEdit:me.isEdit,
       	     currentUser:me.currentUser
       	 });
       	 });
       	 return items;
       },
       /**
        * 
        */
       SaveCtrs:function(user_id){
       	  var me=this;
       	  Ext.each(me.ctrArray,function(rec){
       	  	 var UserCtr=me.down(rec);
       	     if(UserCtr.SaveCtr)
       	        UserCtr.SaveCtr(user_id);
       	  });
       	 
       },
       /**
        * 
        */
       createPromise:function(promise){
       	 var me=this;
       	 me.promise=promise;
       	 me.promise.then(function(u_id){
       	 	me.currentUser.set('u_id',u_id);
       	 	me.SaveCtrs();
       	 });
       	 return me.promise;
       }
});