Ext.define('srm.user.model.UserInfo', {
	extend: 'Ext.data.Model',
	identifier:'negative',
	idProperty: 'u_id',
	fields: [
	         {name:'u_id',type:'int'},
	         {name:'login_id'},
	         {name:'pwd'},
	         {name:'u_type'},
	         {name:'login_type'},
	         {name:'login_def'},
	         {name:'name'},
	         {name:'sex'},
	         {name:'birthday',		type:'date',	dateFormat: 'Y-m-d H:i:s'},
	         {name:'tel'},
	         {name:'email'},
	         {name:'post'},
	         {name:'address'},
	         {name:'create_dt' ,	type:'date',	dateFormat: 'Y-m-d H:i:s' },
	         {name:'modify_dt' ,	type:'date',	dateFormat: 'Y-m-d H:i:s' },
	         {name:'last_login' ,	type:'date',	dateFormat: 'Y-m-d H:i:s' },
	         {name:'nickname'},
	         {name:'nick_portrait',type:'int'},
	         {name:'is_valid', defaultValue:'true'}
	         ,{name:'company_id',type:'int'}
	         ,{name:'cpyname_cn'}
	         ,{name:'orgnization'}
	        ]
	
});