package common.error.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("error")
public class ErrorCtrl {

	@RequestMapping(value = { "/noSecurity" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_noSecurity(ModelAndView modelAndView ){
		modelAndView.setViewName("/error/noSecurity");
		return modelAndView;
	}
	@RequestMapping(value = { "/subAccountNoSecurity" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_subAccountNoSecurity(ModelAndView modelAndView ){
		modelAndView.setViewName("/error/subAccountNoSecurity");
		return modelAndView;
	}
}
