package usercenter.purchaseManage.supplierManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;



import usercenter.purchaseManage.supplierManager.data.SupplierMaterialcheckMapper;
import usercenter.purchaseManage.supplierManager.model.SupplierMaterialcheck;


@Service
public class SupplierMaterialcheckService {
	@Autowired
	private SupplierMaterialcheckMapper mapper;
	@Autowired 
	private FileOptService fileOptService;
	/**
	 * @Description:通过账号获取物料报告列表
	 * SupplierMaterialcheckService
	 * getSupplierMaterialcheckList
	 * @param params
	 * @return List<SupplierMaterialcheck>
	 * @author yukai
	 * 2016-12-19 上午9:45:42
	 */
	public List<SupplierMaterialcheck> getSupplierMaterialcheckListByAccount(Map<String,Object> params) {
		return mapper.getSupplierMaterialcheckListByAccount(params);
	}
	/**
	 * @Description:根据id查询物料报告
	 * SupplierMaterialcheckService
	 * getSupplierMaterialcheckById
	 * @param params
	 * @return SupplierMaterialcheck
	 * @author yukai
	 * 2016-12-19 上午11:28:23
	 */
	public SupplierMaterialcheck getSupplierMaterialcheckById(Map<String,Object> params) {
		return mapper.getSupplierMaterialcheckById(params);
	}
	/**
	 * @Description:新增物料报告
	 * SupplierMaterialcheckService
	 * addSupplierMaterialcheck
	 * @param params void
	 * @author yukai
	 * 2016-12-19 上午11:27:29
	 */
	public void addSupplierMaterialcheck(Map<String,Object> params) {
			mapper.addSupplierMaterialcheck(params);
	}
	/**
	 * @Description:修改物料报告
	 * SupplierMaterialcheckService
	 * updateSupplierMaterialcheck
	 * @param params void
	 * @author yukai
	 * 2016-12-19 上午11:27:54
	 */
	public void updateSupplierMaterialcheck(Map<String,Object> params) {
			mapper.updateSupplierMaterialcheck(params);
	}
	/**
	 * @Description:删除物料报告
	 * SupplierMaterialcheckService
	 * deleteSupplierMaterialcheck
	 * @param params void
	 * @author yukai
	 * 2016-12-19 上午11:27:42
	 */
	public void deleteSupplierMaterialcheck(Map<String,Object> params) {
		SupplierMaterialcheck supplierMaterialcheck=getSupplierMaterialcheckById(params);
		fileOptService.deleteFileByName(supplierMaterialcheck.getMogodb_id());//删除MODB文件
		mapper.deleteSupplierMaterialcheck(params);
	}
}
