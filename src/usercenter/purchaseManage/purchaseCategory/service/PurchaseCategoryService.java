package usercenter.purchaseManage.purchaseCategory.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.basicdata.materialClass.model.MaterialClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.purchaseManage.purchaseCategory.data.PurchaseCategoryMapper;
import usercenter.purchaseManage.purchaseCategory.model.PurchaseCategory;
import usercenter.common.model.TreeModel;


@Service
public class PurchaseCategoryService {
	@Autowired
	private PurchaseCategoryMapper mapper;


	public List<PurchaseCategory> getPurchaseCategoryList(Map<String,Object> params) {
		return mapper.getPurchaseCategoryList(params);
	}
	public void addPurchaseCategory(Map<String,Object> params) {
			Map<String,Object> map=new HashMap<String, Object>(); 
			if (Integer.parseInt(params.get("f_id").toString())==0) {
				params.put("purchase_nature_id", 0);
			}else {
				map.put("category_id", params.get("f_id"));
				PurchaseCategory purchaseCategory=mapper.getCurrPurchaseCategorybyId(map);
				params.put("purchase_nature_id", purchaseCategory.getPurchase_nature_id());
			}
			mapper.addPurchaseCategory(params);
	}
	public void updatePurchaseCategory(Map<String,Object> params) {
			mapper.updatePurchaseCategory(params);
	}
	public void deletePurchaseCategory(Map<String,Object> params) {
		Map<String,Object> params1=new HashMap<String, Object>();
		Map<String,Object> params2=new HashMap<String, Object>();
		PurchaseCategory category=mapper.getCurrPurchaseCategorybyId(params);
		params1.put("f_id", category.getF_id());
		params1.put("order_by", category.getOrder_by());
		List<PurchaseCategory> categories=mapper.getPurchaseCategoryListForOrderBy(params1);//找到所有同级的并且排在要删除的类目后面的
		if(categories.size()>0){
			for (PurchaseCategory purchaseCategory : categories) {
				params2.put("category_id", purchaseCategory.getCategory_id());
				params2.put("order_by", (purchaseCategory.getOrder_by()-1));
				mapper.updatePurchaseCategory(params2);
			}
		}
		mapper.deletePurchaseCategory(params);
	}
	
	/**
	 * 根据当前节点获取采购类目集合
	 * @param params 指定节点
	 * @return List<TreeModel>
	 * @author yangliping
	 * @date 2016-7-8 10:18:05
	 */
	public List<TreeModel> getPurchaseCategoryTree(Map<String,Object> params){
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		String reqcurrId=params.get("category_id").toString();
		int currNodeId=-1;
		if(reqcurrId!=null&&!reqcurrId.equals(""))
		{
			currNodeId=Integer.parseInt(params.get("category_id").toString()) ;
		}
		//组装集合对象
		stlist=setTreeData(currNodeId,stlist,0);
		return stlist;
	}
	/**
	 * 获取采购类目树，返回包含children子节点的树形机构模型
	 * @param params 指定节点
	 * @return {data:[{List<TreeModel>}]}
	 * @author yangliping
	 * @date 2016-7-12 11:01:11
	 */
	public List<TreeModel> getPurchaseCategoryTree2Json(Map<String,Object> params){
		List<TreeModel> treeList=new ArrayList<TreeModel>();
		//组装前树集合
		List<TreeModel> treeList2=new ArrayList<TreeModel>();
		List<PurchaseCategory> allList=mapper.getPurchaseCategoryList(params);
		
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
			tm.setCanAdd(true);
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
					if(node2.getParentId()!=0){
						node1.setCanAdd(false);
					}
					continue;
				}
			}
			if(!mark)
			{
				treeList.add(node1);
			}
		}
		return treeList;
	}
	
	/**
	 * 拼接返回子父级先后顺序的list集合
	 * @param currId
	 * @param treeList
	 * @return List<TreeModel>
	 * @author yangliping
	 * @data 2016-7-8 11:34:07
	 */
	public List<TreeModel> setTreeData(int currId,List<TreeModel> treeList,int depth){
		//当前节点无效
		if(currId==-1)
		{
			return treeList;
		}
		//根目录，本身没有，查找f_id=0
		else if(currId==0)
		{
			//获取所有直接子级
			Map<String,Object> childParams=new HashMap<String,Object>();
			childParams.put("f_id", currId);
			List<PurchaseCategory> clist=mapper.getCurrPurchaseCategorybyFId(childParams);
			for(PurchaseCategory child:clist)
			{
				setTreeData(child.getCategory_id(),treeList,depth+1);
			}
			return treeList;
		}
		else
		{
			Map<String,Object> newParams=new HashMap<String,Object>();
			newParams.put("category_id", currId);
			//获取当前节点数据
			PurchaseCategory currNode=mapper.getCurrPurchaseCategorybyId(newParams);
			
			if(currNode!=null)
			{
				TreeModel currtm=new TreeModel();
				currtm.setId(currNode.getCategory_id());
				currtm.setParentId(currNode.getF_id());
				currtm.setText(currNode.getCategory_name());
				currtm.setOrder_by(currNode.getOrder_by());
				currtm.setLeaf(currNode.getLeaf());
				currtm.setDepth(depth);
				if(depth==1)
				{
					currtm.setExpanded(true);
				}
				else
				{
					currtm.setExpanded(false);
				}
				//获取所有直接子级
				Map<String,Object> childParams=new HashMap<String,Object>();
				childParams.put("f_id", currId);
				List<PurchaseCategory> clist=mapper.getCurrPurchaseCategorybyFId(childParams);
				if(clist.size()>0)
				{
					currtm.setLeaf(false);
					//currtm.setExpanded();
				}
				else
				{
					currtm.setLeaf(true);
					//currtm.setExpanded();
				}
				treeList.add(currtm);
				for(PurchaseCategory child:clist)
				{
					setTreeData(child.getCategory_id(),treeList,depth+1);
				}
			}
		
			return treeList;
		}
	}
	public void updatePurchaseCategoryOrder(Map<String, Object> params) {
		mapper.updatePurchaseCategoryOrder(params);
	}
	/**
	 * @Description:根据当前类目ID找到父类目
	 * PurchaseCategoryService
	 * getParentCategoryById
	 * @param params
	 * @return PurchaseCategory
	 * @author yukai
	 * 2016-9-9 下午2:28:53
	 */
	public PurchaseCategory getParentCategoryById(Map<String, Object> params) {
		return mapper.getParentCategoryById(params);
	}
	/**
	 * @Description:更新子类目采购性质
	 * PurchaseCategoryService
	 * updateChildrenCategoryNature
	 * @param params void
	 * @author yukai
	 * 2016-9-9 下午2:37:02
	 */
	public void updateChildrenCategoryNature(Map<String, Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("purchase_nature_id", params.get("purchase_nature_id"));
		List<TreeModel> list=getPurchaseCategoryTree(params);
		for (TreeModel treeModel : list) {
			map.put("category_id", treeModel.getId());
			updatePurchaseCategory(map);
		}
	}
	/**
	 * @Description:根据当前类目ID找到该类目
	 * PurchaseCategoryService
	 * getCurrPurchaseCategorybyId
	 * @param params
	 * @return PurchaseCategory
	 * @author yukai
	 * 2016-9-9 下午2:28:53
	 */
	public PurchaseCategory getCurrPurchaseCategorybyId(Map<String, Object> params) {
		return mapper.getCurrPurchaseCategorybyId(params);
	}
	/**
	 * @Description:检查当前类目能否添加子分类
	 * PurchaseCategoryService
	 * checkCategoryForAdd
	 * @param params
	 * @return boolean
	 * @author yukai
	 * 2016-9-9 上午9:30:58
	 */
	public boolean checkCategoryForAdd(Map<String, Object> params) {
		boolean flag=true;
		PurchaseCategory purchaseCategory=mapper.getParentCategoryById(params);
		if (purchaseCategory!=null) {
			params.put("category_id", purchaseCategory.getCategory_id());
			PurchaseCategory purchaseCategory1=mapper.getParentCategoryById(params);
			if (purchaseCategory1!=null) {
				flag=false;
			}
		}
		return flag;
	}
	
	public List<PurchaseCategory> getPurchaseCategoryListByFids(Map<String,Object> params){
		//JSONObject json = new JSONObject();
		String fidArrayString=params.get("fidArray").toString();
		String[] fidArray=fidArrayString.split(",");
		List<PurchaseCategory> allList=new ArrayList<PurchaseCategory>();
		List<PurchaseCategory> list=new ArrayList<PurchaseCategory>();
		for(int i=0;i<fidArray.length;i++)
		{
			params.put("f_id", fidArray[i]);
			list=mapper.getCurrPurchaseCategorybyFId(params);
			for(int j=0;j<list.size();j++)
			{
				if(!allList.contains(list.get(j)))
				{
					allList.add(list.get(j));
				}
			}
//			if(!list.isEmpty())
//			{
//				
//				allList.addAll(list);
//			}
			
		}
		
		return allList;
	}
	/**
	 * @Description:根据f_id查询所有子级、孙子级数目
	 * PurchaseCategoryService
	 * getCategoryCountByFid
	 * @param params
	 * @return Integer
	 * @author wangjialin
	 * 2016-11-3 上午10:52:51
	 */
	public Integer getCategoryCountByFid(Map<String,Object> params){
		int count=0;
		List<PurchaseCategory> categories=mapper.getCurrPurchaseCategorybyFId(params);
		count+=categories.size();
		for (PurchaseCategory category : categories) {
			params.put("f_id", category.getCategory_id());
			count+=mapper.getCurrPurchaseCategorybyFId(params).size();
		}
		return count;
	}
	/**
	 * @Description:根据f_id查询所有子级、孙子级及数目
	 * PurchaseCategoryService
	 * getPurchaseCategoryListByFid
	 * @param params
	 * @return List<PurchaseCategory>
	 * @author wangjialin
	 * 2016-11-3 上午10:52:38
	 */
	public List<PurchaseCategory> getPurchaseCategoryListByFid(
			Map<String, Object> params) {
		List<PurchaseCategory> categorys=mapper.getCurrPurchaseCategorybyFId(params);
		for (PurchaseCategory category : categorys) {
			params.put("f_id", category.getCategory_id());
			int count=getCategoryCountByFid(params);
			category.setCount(count);
		}
		return categorys;
	}
}
