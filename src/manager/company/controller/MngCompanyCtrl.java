package manager.company.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.company.service.MngCompanyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;


@Controller
@RequestMapping("company")
public class MngCompanyCtrl { 	
	
	@Autowired
	private MngCompanyService companyService;
	
	/*插入公司记录*/
	@RequestMapping(value="/addCompany.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addCompany(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String userName = request.getParameter("userName");
		String passWorld = request.getParameter("passWorld");
		String companyName = request.getParameter("companyName");
		String eMail = request.getParameter("eMail");
		String telNum = request.getParameter("telNum");
		
		//System.out.println("-------"+userName+"---------");
		
		return null;
	} 
	
/*	public Integer addCompany(CompanyList companyList){
		
		companyListService.addCompanyList(companyList);
		
		return null;
	}*/
	
	//供应商基本信息
		@RequestMapping(value="/company.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> company(HttpServletRequest request,HttpServletResponse response) throws Exception{
			
			return WebUtil.DynamicCallCURD(request,response,companyService);
		}
		
}
