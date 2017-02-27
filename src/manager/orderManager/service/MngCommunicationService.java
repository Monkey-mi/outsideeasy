package manager.orderManager.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.service.CompanyForPlateFormService;

import common.model.TreeModel;

import manager.orderManager.data.MngCommunicationMapper;
import manager.orderManager.model.MngCommunication;


@Service
public class MngCommunicationService {
	@Autowired
	private MngCommunicationMapper mapper;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;

	public List<MngCommunication> getMngCommunicationList(Map<String,Object> params) {
		return mapper.getMngCommunicationList(params);
	}
	public void addMngCommunication(MngCommunication[] arr) {
		for(MngCommunication obj: arr) {
			mapper.addMngCommunication(obj);
		}
	}
	public void updateMngCommunication(MngCommunication[] arr) {
		for(MngCommunication obj: arr) {
			mapper.updateMngCommunication(obj);
		}
	}
	public void deleteMngCommunication(MngCommunication[] arr) {
		for(MngCommunication obj: arr) {
			mapper.deleteMngCommunication(obj);
		}
	}
	
	public List<TreeModel> getCommunicationTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MngCommunication> list=getMngCommunicationList(params);
		
		for(MngCommunication cu:list) 
		{
			params.put("companyId", cu.getCompany_id());
			String cpName=companyForPlateFormService.getCompanyNameByCompanyId(params);
			TreeModel st=new TreeModel();
			st.setId(cu.getId());
			st.setParentId(cu.getParent_id());
			st.setText(cpName+":"+cu.getCom_message());
			st.setLeaf("false");
			st.setExpanded("true");
			st.setType("MngCommunication");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	/**
	* 后台交流合作的信息展示
	* @Description:
	* MngCommunicationService
	* getMngOrderCommunicationLists
	* @param params
	* @return List<MngCommunication>
	* @author chenlong
	* 2016-11-4 下午1:53:00
	 */
	public List<MngCommunication> getMngOrderCommunicationLists(Map<String,Object> params) {
		List<MngCommunication> list=new ArrayList<MngCommunication>();
		return getMngOrderCommunicationList(params,list);
	}
	/**
	* 交流合作的信息查询
	* @Description:
	* MngCommunicationService
	* getMngOrderCommunicationList
	* @param params
	* @param list
	* @return List<MngCommunication>
	* @author chenlong
	* 2016-11-4 下午1:52:47
	 */
	private List<MngCommunication> getMngOrderCommunicationList(Map<String,Object> params,List<MngCommunication> list) {
		List<MngCommunication> communications=getMngCommunicationList(params);//所有根节点
		for (MngCommunication communication : communications) {
			list.add(communication);
			params.put("parent_id", communication.getId());
			getMngOrderCommunicationList(params,list);
		}
		return list;
	}
}
