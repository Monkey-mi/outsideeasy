package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderCheckDetails;

public interface MngOrderCheckDetailsMapper {
	public List<MngOrderCheckDetails> getMngOrderCheckDetailsList(Map<String,Object> params);
	public void addMngOrderCheckDetails(MngOrderCheckDetails obj);
	public void updateMngOrderCheckDetails(MngOrderCheckDetails obj);
	public void deleteMngOrderCheckDetails(MngOrderCheckDetails obj);
}