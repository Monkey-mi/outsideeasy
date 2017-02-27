package manager.common.codegen.model;

import java.util.Date;

public class BaseSeq {
	private int			id;
	private int			cgr_id;
	private String			inst_code;
	private int			seed;
	private int			step;
	private int			step_jmp;
	private int			min_value;
	private int			max_value;
	private int			jmp_value;
	private int			jmp_len;
	private String			reset_mode;
	private Date			last_update;
	private int value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCgr_id() {
		return cgr_id;
	}
	public void setCgr_id(int cgr_id) {
		this.cgr_id = cgr_id;
	}
	public String getInst_code() {
		return inst_code;
	}
	public void setInst_code(String inst_code) {
		this.inst_code = inst_code;
	}
	public int getSeed() {
		return seed;
	}
	public void setSeed(int seed) {
		this.seed = seed;
	}
	public int getStep() {
		return step;
	}
	public void setStep(int step) {
		this.step = step;
	}
	public int getStep_jmp() {
		return step_jmp;
	}
	public void setStep_jmp(int step_jmp) {
		this.step_jmp = step_jmp;
	}
	public int getMin_value() {
		return min_value;
	}
	public void setMin_value(int min_value) {
		this.min_value = min_value;
	}
	public int getMax_value() {
		return max_value;
	}
	public void setMax_value(int max_value) {
		this.max_value = max_value;
	}
	public int getJmp_value() {
		return jmp_value;
	}
	public void setJmp_value(int jmp_value) {
		this.jmp_value = jmp_value;
	}
	public int getJmp_len() {
		return jmp_len;
	}
	public void setJmp_len(int jmp_len) {
		this.jmp_len = jmp_len;
	}
	public String getReset_mode() {
		return reset_mode;
	}
	public void setReset_mode(String reset_mode) {
		this.reset_mode = reset_mode;
	}
	public Date getLast_update() {
		return last_update;
	}
	public void setLast_update(Date last_update) {
		this.last_update = last_update;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	
}
