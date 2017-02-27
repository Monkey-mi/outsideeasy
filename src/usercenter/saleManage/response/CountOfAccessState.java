package usercenter.saleManage.response;

public class CountOfAccessState {
	private int toBeReceivedInvite;//待接收客户邀请
	private int toBeSubmittedAccess;//待提交准入申请
	private int toBeReturnedAccess;//待处理退回申请
	private int toBeConfirmedCheckInform;//待确认验厂通知
	public int getToBeReceivedInvite() {
		return toBeReceivedInvite;
	}
	public void setToBeReceivedInvite(int toBeReceivedInvite) {
		this.toBeReceivedInvite = toBeReceivedInvite;
	}
	public int getToBeSubmittedAccess() {
		return toBeSubmittedAccess;
	}
	public void setToBeSubmittedAccess(int toBeSubmittedAccess) {
		this.toBeSubmittedAccess = toBeSubmittedAccess;
	}
	public int getToBeReturnedAccess() {
		return toBeReturnedAccess;
	}
	public void setToBeReturnedAccess(int toBeReturnedAccess) {
		this.toBeReturnedAccess = toBeReturnedAccess;
	}
	public int getToBeConfirmedCheckInform() {
		return toBeConfirmedCheckInform;
	}
	public void setToBeConfirmedCheckInform(int toBeConfirmedCheckInform) {
		this.toBeConfirmedCheckInform = toBeConfirmedCheckInform;
	}
	
}
