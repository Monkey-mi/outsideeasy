package platform.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import platform.common.data.CurrencyForPlatMapper;
import platform.common.model.CurrencyForPlat;

@Service
public class CurrencyForPlatService {
	@Autowired
	private CurrencyForPlatMapper mapper;


	public List<CurrencyForPlat> getCurrencyForPlatList(Map<String,Object> params) {
		return mapper.getCurrencyList(params);
	}
	public void addCurrency(CurrencyForPlat[] arr) {
		for(CurrencyForPlat obj: arr) {
			mapper.addCurrency(obj);
		}
	}
	public void updateCurrency(CurrencyForPlat[] arr) {
		for(CurrencyForPlat obj: arr) {
			mapper.updateCurrency(obj);
		}
	}
	public void deleteCurrency(CurrencyForPlat[] arr) {
		for(CurrencyForPlat obj: arr) {
			mapper.deleteCurrency(obj);
		}
	}
}
