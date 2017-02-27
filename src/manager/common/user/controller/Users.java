package manager.common.user.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.user.model.UserInfo;
import manager.common.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.MD5Util;
import util.WebUtil;

/**
 * ClassName: Users
 * @Description: 用户、角色管理控制类
 * @author 华慧
 * @date 2015-9-7
 */
@Controller
@RequestMapping("user")
public class Users {
	@Autowired
	private UserService userService;
	@RequestMapping(value="/Users.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> users(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,userService);
	}
	
	@RequestMapping(value="/UserCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> UserCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, userService);
	}
	
	/**
	 * 账号是否已经使用*/
	@RequestMapping(value="/nameIsUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public String nameIsUsed(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String login_id = request.getParameter("name");
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("login_id", login_id);
		return userService.login_idIsUsed(params);
	}
    /**
	 * 邮箱是否被注册*/
	@RequestMapping(value="/emailIsUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public String emailIsUsed(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String email = request.getParameter("email");//获取email
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("email", email);
		return userService.emailIsUsed(params);
	}
    @RequestMapping(value="/addInvalidUser.do",method={RequestMethod.GET,RequestMethod.POST})
    public String  addInvalidUser(HttpServletRequest request,HttpServletResponse response){
        String url="login/please_activate.jsp";
    	String accountCode = request.getParameter("AccountCode");
        String accountPwd = request.getParameter("AccountPwd");
        String email=request.getParameter("AccountYouXiang");
        Date date=new Date();
        //新增用户，未激活的
        UserInfo ui=new UserInfo();
        ui.setLogin_id(accountCode);
        ui.setName(accountCode);
        ui.setPwd(MD5Util.encode2hex(accountPwd));
        ui.setBirthday(date);
        ui.setModify_dt(date);
        ui.setIs_valid("false");
        ui.setEmail(email);
        ui.setCreate_dt(date);
        userService.addInvalidUser(ui);
        return url;
    }
    @RequestMapping(value="/activate.do",method={RequestMethod.GET,RequestMethod.POST})
    public String  activate(HttpServletRequest request,HttpServletResponse response){
        String url="login/activate_failure.jsp";
    	String email = request.getParameter("email");//获取email
        String validateCode = request.getParameter("validateCode");//激活码
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("email", email);
        params.put("validateCode", validateCode);
        boolean success=userService.activate(params,request);
        if(success){
        	url="login/activate_success.jsp";
        }
        
        return url;
    }
    
    
}
