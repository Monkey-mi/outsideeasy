package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.Competitor;


public interface CompetitorMapper {
	public List<Competitor> getCompetitorList(Map<String,Object> params);
	public void addCompetitor(Competitor obj);
	public void updateCompetitor(Competitor obj);
	public void deleteCompetitor(Competitor obj);
}
