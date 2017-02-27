package util.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import manager.basicdata.sFilter.model.SFilter;
import manager.basicdata.sFilter.service.SFilterService;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import usercenter.common.model.TreeModel;
import usercenter.purchaseManage.purchaseCategory.service.PurchaseCategoryService;
import util.CacheData;

import common.sysmodule.service.SysRoleService;


public class InitDataListener implements ServletContextListener{
	
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		CacheData cache=CacheData.getInstance();
		cache.clear();
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		WebApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(sce.getServletContext());
		CacheData cache=CacheData.getInstance();
		
		
		List<String> str_list=new ArrayList<String>();
		SFilterService service= (SFilterService)context.getBean("SFilterService");
		SysRoleService sysRoleService=(SysRoleService)context.getBean("sysRoleService");
		//后端访问不受限的url
		List<SFilter> list=service.getSFilterList(new HashMap<String,Object>());
		
		for(SFilter sf:list){
			str_list.add(sf.getFilter_url());
		}
		//平台访问不受限的url
		Map<String,Object> params=new HashMap<String,Object>();
		List<String> plat_list=sysRoleService.getVisitorUrls(params);
		//合并
		str_list.addAll(plat_list);
		cache.put("SysFilter", str_list);
	}

}
