package usercenter.subAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.subAccount.data.SubaccountSupplierInfoMapper;
import usercenter.subAccount.model.SubaccountSupplierInfo;
import usercenter.supplierFiles.response.SupplierRegaccountInfoVo;


@Service
public class SubaccountSupplierInfoService {
	@Autowired
	private SubaccountSupplierInfoMapper mapper;

	/**
	 * @Description: 查询出子账号的供应商关联关系
	 * @param List<SubaccountSupplierInfo>
	 * @return 
	 * @author chenlong
	 * @date 2016-7-11
	 */
	public List<SubaccountSupplierInfo> getSubaccountSupplierInfoList(Map<String,Object> params) {
		return mapper.getSubaccountSupplierInfoList(params);
	}
	/**
	 * 查询出子账号的供应商关联关系
	* @Description:
	* SubaccountSupplierInfoService
	* getSubaccountInforsea
	* @param params
	* @return List<SupplierRegaccountInfoVo>
	* @author chenlong
	* 2016-10-7 下午2:15:57
	 */
	public List<SupplierRegaccountInfoVo> getSubaccountInforsea(Map<String,Object> params) {
		return mapper.getSubaccountInforsea(params);
	}
	/**
	 * @Description: 添加子账号与供应商的关联关系
	 * @param Map
	 * @return 
	 * @author chenlong
	 * @date 2016-7-11
	 */
	public void addSubaccountSupplierInfo(Map<String,Object> params){
		Integer sa_id = Integer.parseInt(params.get("sa_id").toString());
		Integer length = Integer.parseInt(params.get("lengthdd").toString());//选中的数组长度
		Integer lengthinit = Integer.parseInt(params.get("lengthd").toString());//已有关系的数组长度
		List<SubaccountSupplierInfo> list = mapper.getSubpplierInfoList(params);//数据库中的已有的集合		
		for(int i =0;i<length;i++){//批量插入的解析处理
			Integer sub_id = Integer.parseInt(params.get("sub_id"+"["+i+"]").toString());	
			boolean flag = true;//判断是否不同添加的标记位				
		 for(SubaccountSupplierInfo subaccountSupplierInfo : list ){	//删除list中的数据使用倒序删除
			 if(subaccountSupplierInfo.getSupplier_id() == sub_id ){
				 if(subaccountSupplierInfo.getIs_delete() == 0){
					 flag = false;//说明已有的供应商与子账号已有关联关系，不用再做处理
					 break;
				 }else{
					 flag = false;//说明已有的供应商与子账号已有关联关系，但状态位为1,做更新处理					
					 subaccountSupplierInfo.setIs_delete(0);					
					 mapper.updateSubaccountSupplierInfo(subaccountSupplierInfo);	
					 break;
				 }				
				}
			}
		 if(flag){//表明该条供应商需要添加与子账号的关联关系
			 params.put("supplier_id",sub_id);
			 params.put("is_delete",0);
			 mapper.addSubaccountSupplierInfo(params);
		 }
		}
		for(int i =0;i<lengthinit;i++){//批量插入的解析处理				
			int subinit_id = 0;	  
			SubaccountSupplierInfo subaccountSupplierInfo = new SubaccountSupplierInfo();
			String str = params.get("subinit_id"+"["+i+"]").toString();
			if(str.equals("false")){
				         int count = i-1;
				         subinit_id = Integer.parseInt(params.get("subinit_id"+"["+count+"]").toString());
						//说明已有的供应商与子账号已无关联关系，不用再做处理	
						 subaccountSupplierInfo.setSa_id(sa_id);
						 subaccountSupplierInfo.setSupplier_id(subinit_id);
						 subaccountSupplierInfo.setIs_delete(1);					
						 mapper.updateSubaccountSupplierInfo(subaccountSupplierInfo);		
						 }									
		}	
	}

}
