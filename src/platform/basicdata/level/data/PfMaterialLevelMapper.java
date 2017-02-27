package platform.basicdata.level.data;

import java.util.List;
import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.MaterialClassOut;
import com.outsideasy.ws.erp.supplier.vo.MaterialLevelOut;

public interface PfMaterialLevelMapper {
	public List<MaterialLevelOut> getMaterialLevelOutList(Map<String,Object> params);
	public List<MaterialClassOut> getMaterialClassOutList(Map<String,Object> params);
}
