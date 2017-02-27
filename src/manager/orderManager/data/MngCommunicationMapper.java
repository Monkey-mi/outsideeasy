package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngCommunication;


public interface MngCommunicationMapper {
	public List<MngCommunication> getMngCommunicationList(Map<String,Object> params);
	public void addMngCommunication(MngCommunication obj);
	public void updateMngCommunication(MngCommunication obj);
	public void deleteMngCommunication(MngCommunication obj);
}
