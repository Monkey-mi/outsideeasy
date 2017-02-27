package common.commonfake;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("CommonUse")
public class CommonUse {
	@RequestMapping(value = { "/aboutUs" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_aboutUs(ModelAndView modelAndView ){
		modelAndView.setViewName("/aboutUs");
		return modelAndView;
	}
	@RequestMapping(value = { "/agreement" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_agreement(ModelAndView modelAndView ){
		modelAndView.setViewName("/agreement");
		return modelAndView;
	}
	@RequestMapping(value = { "/searchCompany" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_searchCompany(ModelAndView modelAndView ){
		modelAndView.setViewName("/searchCompany");
		return modelAndView;
	}
	@RequestMapping(value = { "/accessInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_accessInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/accessInfo");
		return modelAndView;
	}
}
