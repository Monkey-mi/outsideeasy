package manager.enquiryQuote.quote.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.enquiryQuote.quote.service.QuotationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("quote")
public class QuotationCtrl {

	@Autowired
	private QuotationService quotationService;
	/**
	 *报价 */
	@RequestMapping(value="/quotation.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> quotation(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,quotationService);
	}
}
