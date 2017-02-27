package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderQualitycheck;

public interface MngOrderQualitycheckMapper {
	public List<MngOrderQualitycheck> getMngOrderQualitycheckList(Map<String,Object> params);
	public void addMngOrderQualitycheck(MngOrderQualitycheck obj);
	public void updateMngOrderQualitycheck(MngOrderQualitycheck obj);
	public void deleteMngOrderQualitycheck(MngOrderQualitycheck obj);
}