package test.usercenter.saleManage;

public class SayHi {
	Adder adder;///实例化了一个adder，作用就是将两个字符串加在一起
	
	public String sayHi(String a, String b){
		adder = getAdder();///实例化了一个adder，作用就是将两个字符串加在一起
	    String result = "";
	    try{
	        result  = adder.add(a, b);
	        System.out.println("success"+">>>>>>>>>>>>");
	    }catch(Exception e){
	    	result = "Failed";
	    	System.out.println("Failed"+">>>>>>>>>>>>");
	    	e.printStackTrace();
	    }
	    return result;
	}
	
	public Adder getAdder(){
		return adder;
	}
	
	public void setAdder(Adder a){
		this.adder = a;
	}
}
