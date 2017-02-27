package manager.basicdata.currency.service;

import java.util.List;
import java.util.Map;

import manager.basicdata.currency.data.CurrencyMapper;
import manager.basicdata.currency.model.Currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class CurrencyService {
	@Autowired
	private CurrencyMapper mapper;


	public List<Currency> getCurrencyList(Map<String,Object> params) {
		return mapper.getCurrencyList(params);
	}
	public void addCurrency(Currency[] arr) {
		for(Currency obj: arr) {
			mapper.addCurrency(obj);
		}
	}
	public void updateCurrency(Currency[] arr) {
		for(Currency obj: arr) {
			mapper.updateCurrency(obj);
		}
	}
	public void deleteCurrency(Currency[] arr) {
		for(Currency obj: arr) {
			mapper.deleteCurrency(obj);
		}
	}
}
