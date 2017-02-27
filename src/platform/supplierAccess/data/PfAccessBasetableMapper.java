package platform.supplierAccess.data;

import java.util.List;
import java.util.Map;

import platform.supplierAccess.model.PfAccessBasetable;

public interface PfAccessBasetableMapper {
	public List<PfAccessBasetable> getPfAccessBasetableList(Map<String,Object> params);
}
