package manager.basicdata.taxmanClass.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.taxmanClass.model.TaxmanClass;



public interface TaxmanClassMapper {
	public List<TaxmanClass> getTaxmanClassList(Map<String,Object> params);
	public void addTaxmanClass(TaxmanClass obj);
	public void updateTaxmanClass(TaxmanClass obj);
	public void deleteTaxmanClass(TaxmanClass obj);
}
