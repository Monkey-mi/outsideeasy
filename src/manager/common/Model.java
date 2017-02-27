package manager.common;

/**
 * 作为所有Model的基类
 * @author MMC
 */
public class Model {
	/**
	 * 当前数据库类型
	 * Mapper访问数据库时，根据这个属性体现数据库语法差异。
	 * 实际值为MYSQL{@link tps.bi.form.util.Const#DB_TYPE_MYSQL } ORACLE{@link tps.bi.form.util.Const#DB_TYPE_ORACLE } MSSQLSERVER{@link tps.bi.form.util.Const#DB_TYPE_MSSQLSERVER }
	 * @see tps.bi.form.util.Const#DB_TYPE
	 */
	private String DB_TYPE;
	private String row_permit;
	/**
	 * 设置数据库类型
	 * @param dB_TYPE 数据库类型字符串
	 */
	public void setDB_TYPE(String dB_TYPE) {
		DB_TYPE = dB_TYPE;
	}
	/**
	 * 获取当前数据库类型
	 * Mapper访问数据库时，根据这个属性体现数据库语法差异。
	 * 实际值为MYSQL{@link tps.bi.form.util.Const#DB_TYPE_MYSQL } ORACLE{@link tps.bi.form.util.Const#DB_TYPE_ORACLE } MSSQLSERVER{@link tps.bi.form.util.Const#DB_TYPE_MSSQLSERVER }
	 * @see tps.bi.form.util.Const#DB_TYPE
	 * @return 当前数据库类型
	 */
	public String getDB_TYPE() {
		return DB_TYPE;
	}
	/**
     * 获取行信息域权限
     * 当数据
     * 实际值为 +R 可读   +W 可写
     * @see tps.util.Const#RAED_PERMIT
     * @return 当前数据库类型
     */
    public String getRow_permit() {
        return row_permit;
    }
    /**
     * 设置行权限
     * @param rOW_PERMIT 行字段权限
     */
    public void setRow_permit(String row_permit) {
        this.row_permit = row_permit;
    }
}
	
