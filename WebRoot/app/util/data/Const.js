/**
 * 数据仓库常数
 */
Ext.define('srm.util.data.Const',{
	CONFIG_TYPE:'typeCode',
	DICTIONARY:'dictionary',
	/**    
	 * storeid集合
	 */
	CODETYPE_STOREID:"code_type",
	CODECONFIG_STOREID:"code_config",
	USERINFO:'userinfo',
	ROLE:'role',
	CODE_CONFIG:'code_config',
	ORG_UNIT:'org_unit',
	requires:['srm.role.store.Roles'],
	/**
	 * 初始化
	 */
	init:function(){
		var me=this;
		var dataArray =[
				   {name:'组织',code:me.ORG_UNIT,xtype:'',store:'srm.org.store.OrgUnit',displayField:'ou_name',valueField:'ou_code'},
				   {name:'角色',code:me.ROLE,xtype:'',store:'srm.role.store.Roles',displayField:'role_name',valueField:'role_id'},
				   {name:'基础数据列表',code:me.CODE_CONFIG,xtype:'',store:'srm.basic.store.CodeConfigs',displayField:'name',valueField:'code'}
                  ];
        me.Config=Ext.create('Ext.data.Store',{
            fields:['name','code','xtype','store',"displayField","valueField","storeId"],
            data:dataArray
        });
	}
},function(){
	srm.DataConst=srm.util.data.Const=new srm.util.data.Const();
	srm.DataConst.init();
});