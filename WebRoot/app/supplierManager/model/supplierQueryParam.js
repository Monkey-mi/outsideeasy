Ext.define('srm.supplierManager.model.supplierQueryParam', {
	extend: 'Ext.data.Model',
	fields: [		
		//厂商名称
		{ name: 'checkbox_cpyname_cn'},
		{ name: 'cpyname_cn' },
		//厂商状态
		{ name: 'checkbox_apply_sts'},
		{ name: 'apply_sts'},
		//厂商类别
		{ name: 'checkbox_materialClass'},
		{ name: 'mc_id_1' },
		{ name: 'mc_id_2' },
		{ name: 'mc_id_3' },
		//操作员、审核员
		{ name: 'checkbox_operator'},
		{ name: 'operator'},
		
		{ name: 'auditor'},
		//注册地址省份
		{ name: 'checkbox_reg_addr' },
		{ name: 'reg_addr' },
		//行业性质、企业性质
		{ name: 'checkbox_industry_id' },
		{ name: 'industry_id' },
		
		{ name: 'nature_id'}
	]
});
