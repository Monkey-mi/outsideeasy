/**
 * @Description: 
 * @param 
 * @return 
 * @author chenlong
 * @date 
 */
package manager.ipmanager.ipResponse;

/**
 * @Description: 返回所有账户的名称
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-6-30
 */
public class AllAccount {
   private int  id;
   private String allname;//所有账户的名称

public String getAllname() {
	return allname;
}
public void setAllname(String allname) {
	this.allname = allname;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
} 

}
