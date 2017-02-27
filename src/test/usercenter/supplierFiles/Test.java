package test.usercenter.supplierFiles;

import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.Map;

import manager.supplier.model.SupplierFile;

import org.apache.commons.beanutils.PropertyUtilsBean;

public class Test {
	public static void main(String[] args) {
		SupplierFile supplierFile=new SupplierFile();
		Map<String, Object> map=beanToMap(supplierFile);
		System.out.println(map);
	}
	public static Map<String, Object> beanToMap(Object obj) { 
        Map<String, Object> params = new HashMap<String, Object>(0); 
        try { 
            PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean(); 
            PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(obj); 
            for (int i = 0; i < descriptors.length; i++) { 
                String name = descriptors[i].getName(); 
                if (!"class".equals(name)) { 
                    params.put(name, propertyUtilsBean.getNestedProperty(obj, name)); 
                } 
            } 
        } catch (Exception e) { 
            e.printStackTrace(); 
        } 
        return params; 
	}
}
