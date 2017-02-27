package platform.company.data;

import java.util.List;
import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.AttchedOut;

public interface PfAttchedMapper {
	public List<AttchedOut> getAttchedOutList(Map<String,Object> params);
	
	/**
	 * @Description: 获取map格式的附件表信息
	 * PfAttchedMapper
	 * getAttchedMapListByCpId
	 * @param params
	 * @return List<AttchedOut>
	 * @author mishengliang
	 * 2016-10-31 上午9:19:51
	 */
	public List<Map<String, Object>> getAttchedMapListByCpId(Map<String,Object> params);
	public void updateAttchedById(Map<String,Object> params);
}
