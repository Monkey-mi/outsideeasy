package platform.common.data;

import java.util.List;
import java.util.Map;

import platform.common.model.CurrencyForPlat;


public interface CurrencyForPlatMapper {
	public List<CurrencyForPlat> getCurrencyList(Map<String,Object> params);
	public void addCurrency(CurrencyForPlat obj);
	public void updateCurrency(CurrencyForPlat obj);
	public void deleteCurrency(CurrencyForPlat obj);
}
