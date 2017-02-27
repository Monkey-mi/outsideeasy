package usercenter.supplierFiles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;

import usercenter.externalTask.TaskResponse.StateCount;
import usercenter.subAccount.service.SubaccountSupplierInfoService;
import usercenter.supplierFiles.data.SupplierRegaccountInfoMapper;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.model.SupplierRegaccountInfo;
import usercenter.supplierFiles.response.SupplierRegaccountInfoVo;
import util.SessionUtil;


@Service
public class SupplierRegaccountInfoService {
	@Autowired
	private SupplierRegaccountInfoMapper mapper;
	@Autowired
	private SubaccountSupplierInfoService service;

	   /**
     * @Description: 查询出供应商列表
     * @param Map
     * @return List<SupplierRegaccountInfo>
     * @author chenlong
     * @date 2016-7-7
     */
	public List<SupplierRegaccountInfoVo> getSupplierRegaccountInfoList(Map<String,Object> params) {
		LoginAccount regAccout = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
		params.put("reg_id", regAccout.getLogin_id());//将账号id放入
		return mapper.getSupplierRegaccountInfoList(params);
	}

	/**
	 * 查询账号下的供应商列表
	* @Description:
	* SupplierRegaccountInfoService
	* getSupplierInfoList
	* @param params
	* @return List<SupplierRegaccountInfoVo>
	* @author chenlong
	* 2016-10-7 下午1:59:42
	 */
	public List<SupplierRegaccountInfoVo> getSupplierInfoList(Map<String,Object> params) {
		List<SupplierRegaccountInfoVo> list = new ArrayList<SupplierRegaccountInfoVo>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){//主账号
			params.put("reg_id", loginAccount.getLogin_id());//将账号id放入
			list = mapper.getSupplierListForSea(params);
		}else if(loginAccount.getAccount_type()==1){//子账号
			params.put("sa_id", loginAccount.getLogin_id());
			list = service.getSubaccountInforsea(params);
		}
		return list;		
	}
	/**
	 * @Description: 返回供应商的数量
	 * @param Map
	 * @return Integer
	 * @author chenlong
	 * @date  2016-7-7
	 */
	public Integer getSupplierRegaccountInfoCount(Map<String,Object> params){
		LoginAccount regAccout = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
		params.put("reg_id", regAccout.getLogin_id());//将账号id放入	
		return mapper.getSupplierRegaccountInfoCount(params);
	}
	 /**
     * @Description: 查询出供应商列表ID
     * @param Map
     * @return List<SupplierFiles>
     * @author chenlong
     * @date 2016-8-1
     */
	public List<SupplierRegaccountInfoVo> getSupplierReListID(Map<String,Object> params) {
		LoginAccount regAccout = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
		params.put("reg_id", regAccout.getLogin_id());//将账号id放入
		return mapper.getSupplierReListID(params);
	}
	public void addSupplierRegaccountInfo(SupplierRegaccountInfo[] arr) {
		for(SupplierRegaccountInfo obj: arr) {
			mapper.addSupplierRegaccountInfo(obj);
		}
	}
	public void updateSupplierRegaccountInfo(SupplierRegaccountInfo[] arr) {
		for(SupplierRegaccountInfo obj: arr) {
			mapper.updateSupplierRegaccountInfo(obj);
		}
	}
	public void deleteSupplierRegaccountInfo(SupplierRegaccountInfo[] arr) {
		for(SupplierRegaccountInfo obj: arr) {
			mapper.deleteSupplierRegaccountInfo(obj);
		}
	}
}
