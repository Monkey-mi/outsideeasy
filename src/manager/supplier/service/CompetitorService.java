package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.CompetitorMapper;
import manager.supplier.model.BankAccount;
import manager.supplier.model.Competitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationCompetitorMapper;
import usercenter.saleManage.model.AccessApplicationCompetitor;
import util.BeanUtil;



@Service
public class CompetitorService {
	@Autowired
	private CompetitorMapper mapper;
	@Autowired
	private AccessApplicationCompetitorMapper accMapper;

	public List<Competitor> getCompetitorList(Map<String,Object> params) {
		return mapper.getCompetitorList(params);
	}
	public List<AccessApplicationCompetitor> getAccCompetitorList(Map<String,Object> params) {
		return accMapper.getAccessApplicationCompetitorList(params);
	}
	@Transactional
	public void addCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			mapper.addCompetitor(obj);
		}
	}
	@Transactional
	public void updateCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			mapper.updateCompetitor(obj);
		}
	}
	@Transactional
	public void deleteCompetitor(Competitor[] arr) {
		for(Competitor obj: arr) {
			mapper.deleteCompetitor(obj);
		}
	}
	public void addAccCompetitor(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Competitor item=(Competitor)BeanUtil.mapToObject(params,Competitor.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addCompetitor(item);
			params.put("AppCompetitorId", item.getCompetitor_id());
		}
		params.put("competitorName", params.get("competitor_name"));
		accMapper.addAccessApplicationCompetitor(params);
	}
	public void updateAccCompetitor(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Competitor item=(Competitor)BeanUtil.mapToObject(params,Competitor.class);
			item.setCompetitor_id(Integer.parseInt(params.get("app_competitor_id").toString()));
			mapper.updateCompetitor(item);
		}
		params.put("competitorId", params.get("competitor_id"));
		params.put("competitorName", params.get("competitor_name"));
		accMapper.updateAccessApplicationCompetitor(params);
	}
}
