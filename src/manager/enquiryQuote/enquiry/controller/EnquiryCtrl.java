package manager.enquiryQuote.enquiry.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.enquiryQuote.enquiry.service.EnquiryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("enquiry")
public class EnquiryCtrl {

	@Autowired
	private EnquiryService enquiryService;
	
	/**
	 *询价 */
	@RequestMapping(value="/enquiry.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tradeClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,enquiryService);
	}
}
