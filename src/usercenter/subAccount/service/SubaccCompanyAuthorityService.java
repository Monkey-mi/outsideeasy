package usercenter.subAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.subAccount.data.SubaccCompanyAuthorityMapper;
import usercenter.subAccount.model.SubaccCompanyAuthority;


@Service
public class SubaccCompanyAuthorityService {
	@Autowired
	private SubaccCompanyAuthorityMapper mapper;

	/**
	* @Description:查询出所有子账号下的公司
	* SubaccCompanyAuthorityService
	* getSubaccCompanyAuthorityList
	* @param params
	* @return List<SubaccCompanyAuthority>
	* @author chenlong
	* 2016-8-8 下午5:20:31
	 */
	public List<SubaccCompanyAuthority> getSubaccCompanyAuthorityList(Map<String,Object> params) {
		return mapper.getSubaccCompanyAuthorityList(params);
	}
	
	/**
	* @Description:子账号与公司质检的权限关系的添加
	* SubaccCompanyAuthorityService
	* addSubaccountCompanyAuthority
	* @param params void
	* @author chenlong
	* 2016-8-10 上午9:41:09
	*/
	public void addSubaccountCompanyAuthority(Map<String,Object> params){
		Integer sa_id = Integer.parseInt(params.get("sa_id").toString());//子账号的id
		Integer length = Integer.parseInt(params.get("lengthdd").toString());//选中的数组长度
		Integer lengthinit = Integer.parseInt(params.get("lengthd").toString());//已有关系的数组长度
		List<SubaccCompanyAuthority> list = mapper.getSubaccCompanyAuthority(params);//数据库中的已有的集合		
		for(int i =0;i<length;i++){//批量插入的解析处理
			Integer sub_id = Integer.parseInt(params.get("sub_id"+"["+i+"]").toString());//公司id	
			boolean flag = true;//判断是否不同添加的标记位				
		 for(SubaccCompanyAuthority subaccCompanyAuthority : list){	//删除list中的数据使用倒序删除
			 if(subaccCompanyAuthority.getCompany_id() == sub_id ){
				 if(subaccCompanyAuthority.getIs_delete() == 0){
					 flag = false;//说明已有的公司与子账号已有关联关系，不用再做处理	
					 break;
				 }else{
					 flag = false;//说明已有的公司与子账号已有关联关系，但状态位为1,做更新处理					
					 subaccCompanyAuthority.setIs_delete(0);					
					 mapper.updateSubaccCompanyAuthority(subaccCompanyAuthority);	
					 break;
				 }				
				}
			} 
		 if(flag){//表明该条公司需要添加与子账号的关联关系
			 params.put("company_id",sub_id);
			 mapper.addSubaccCompanyAuthority(params);
		 }
		}
		for(int i =0;i<lengthinit;i++){//批量插入的解析处理				
			int subinit_id = 0;	  
			SubaccCompanyAuthority subaccCompanyAuthority = new SubaccCompanyAuthority();
			String str = params.get("subinit_id"+"["+i+"]").toString();
			if(str.equals("false")){
		         int count = i-1;
		         subinit_id = Integer.parseInt(params.get("subinit_id"+"["+count+"]").toString());
				//说明已有的供应商与子账号已无关联关系，做状态删除处理	
		         subaccCompanyAuthority.setSa_id(sa_id);
		         subaccCompanyAuthority.setCompany_id(subinit_id);
		         subaccCompanyAuthority.setIs_delete(1);					
				 mapper.updateSubaccCompanyAuthority(subaccCompanyAuthority);		
			}									
		}	
	}
}
