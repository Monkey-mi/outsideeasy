package common.mongodb.data;

import java.util.List;
import java.util.Map;

import manager.webPublish.model.WebContentFile;

import common.mongodb.model.MogoFileVo;

public interface MogoFileMapper {
	public List<MogoFileVo> checkFileIsUse(Map<String,Object> params);
	public void deleteFileContact(Map<String,Object> params);
}
