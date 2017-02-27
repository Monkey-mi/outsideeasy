package common.mongodb.dao;

import org.springframework.stereotype.Repository;

import common.mongodb.model.FileBean;
@Repository
public class FileOptDao extends MongoGenDao<FileBean> {
	
	@Override
	protected Class<FileBean> getEntityClass() {
		// TODO Auto-generated method stub
		return FileBean.class;
	}
	
	
}
