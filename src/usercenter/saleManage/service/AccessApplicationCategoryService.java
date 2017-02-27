package usercenter.saleManage.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.model.TreeModel;
import usercenter.purchaseManage.purchaseCategory.model.PurchaseCategory;
import usercenter.purchaseManage.purchaseCategory.service.PurchaseCategoryService;
import usercenter.saleManage.data.AccessApplicationCategoryMapper;
import usercenter.saleManage.model.AccessApplicationCategory;


@Service
public class AccessApplicationCategoryService {
	@Autowired
	private AccessApplicationCategoryMapper mapper;
	@Autowired
	private PurchaseCategoryService pcService;

	public List<AccessApplicationCategory> getAccessApplicationCategoryList(Map<String,Object> params) {
		return mapper.getAccessApplicationCategoryList(params);
	}
	public void addAccessApplicationCategory(Map<String,Object> params) {
			mapper.addAccessApplicationCategory(params);
	}
	public void updateAccessApplicationCategory(Map<String,Object> params) {
			mapper.updateAccessApplicationCategory(params);
	}
	public void deleteAccessApplicationCategory(Map<String,Object> params) {
			mapper.deleteAccessApplicationCategory(params);
	}
	public void deleteAccessApplicationCategoryByRecordId(Map<String,Object> params) {
		mapper.deleteAccessApplicationCategoryByRecordId(params);
	}
	/**
	 * @Description: 根据recordId更新supplierId
	 * AccessApplicationCategoryService
	 * updateSupplierIdByRecordId
	 * @param params void
	 * @author mishengliang
	 * 2016-11-25 上午10:44:08
	 */
	public void updateSupplierIdByRecordId(Map<String,Object> params) {
		mapper.updateSupplierIdByRecordId(params);
	}
	public void deleteAccessApplicationCategorys(Map<String, Object> params) {
		String arrayStr=params.get("category_ids").toString();
		String[] arrayId=arrayStr.split(",");
		for(int i=0;i<arrayId.length;i++){
			params.put("id", arrayId[i]);
			mapper.deleteAccessApplicationCategory(params);
		}
	}
	public void addAccessApplicationCategorys(Map<String, Object> params) {
		String arrayStr=params.get("category_ids").toString();
		String[] arrayId=arrayStr.split(",");
		for(int i=0;i<arrayId.length;i++){
			if(arrayId[i]!=""){
				params.put("category_id", arrayId[i]);
				mapper.addAccessApplicationCategory(params);
			}
		}
	}
	public String getAccessApplicationCategoryStr(Map<String, Object> params) {
		Map<String, Object> params1=new HashMap<String, Object>();
		List<PurchaseCategory> allList= new ArrayList<PurchaseCategory>();
		List<TreeModel> treeList=new ArrayList<TreeModel>();
		//组装前树集合
		List<TreeModel> treeList2=new ArrayList<TreeModel>();
		String str="";
		List<AccessApplicationCategory> categories=getAccessApplicationCategoryList(params);
		for (AccessApplicationCategory accessApplicationCategory : categories) {
			params1.put("category_id", accessApplicationCategory.getCategory_id());
			PurchaseCategory category=pcService.getCurrPurchaseCategorybyId(params1);
			if (category!=null) {
				allList.add(category);
			}
		}
		for(PurchaseCategory pc:allList)
		{
			TreeModel tm=new TreeModel();
			tm.setId(pc.getCategory_id());
			tm.setNature_id(pc.getPurchase_nature_id());
			tm.setText(pc.getCategory_name());
			tm.setParentId(pc.getF_id());
			tm.setOrder_by(pc.getOrder_by());
			tm.setExpanded(false);
			tm.setLeaf(true);
			tm.setNature_name(pc.getPurchase_nature_name());
			treeList2.add(tm);
		}
		Collections.sort(treeList2,new Comparator<TreeModel>(){  
			@Override
			public int compare(TreeModel o1, TreeModel o2) {
				 if(o1.getOrder_by() > o2.getOrder_by()){  
	                    return 1;  
	             }  
				return 0;
			}  
        });
		for(TreeModel node1:treeList2)
		{
			boolean mark=false;
			for(TreeModel node2:treeList2)
			{
				if(node1.getParentId()==node2.getId())
				{
					mark=true;
					if(node2.getChildren()==null)
					{
						node2.setChildren(new ArrayList<TreeModel>());
					}
					node2.getChildren().add(node1);
					node2.setLeaf(false);
					continue;
				}
			}
			if(!mark)
			{
				treeList.add(node1);
			}
		}
		for (int i = 0; i < treeList.size(); i++) {
			TreeModel node1= treeList.get(i);
			str+=node1.getText();
			if(node1.getChildren()!=null){
				str+="(";
				for (int j = 0; j < node1.getChildren().size(); j++) {
					TreeModel node2= node1.getChildren().get(j);
					str+=node2.getText();
					if(node2.getChildren()!=null){
						str+="(";
						for (int k= 0; k < node2.getChildren().size(); k++) {
							TreeModel node3= node2.getChildren().get(k);
							str+=node3.getText();
							if(k==node2.getChildren().size()-1){
							}else{
								str+=",";
							}
						}
						str+=")";
					}
					if(j==node1.getChildren().size()-1){
					}else{
						str+=",";
					}
				}
				str+=")";
			}
			if(i==treeList.size()-1){
			}else{
				str+=",";
			}
		}
		return str;
	}
}
