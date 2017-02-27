package com.outsideasy.activemq.service;

import java.io.Serializable;

import javax.jms.JMSException;
import javax.jms.MapMessage;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class QSender {
	//队列名
	private static final String QUEUENAME = "outside.order";
	@Autowired
	@Qualifier("jmsQueueTemplate")
	private JmsTemplate jmsTemplate;//通过@Qualifier修饰符来注入对应的bean
	
	/**
	 * 发送一条消息到指定的队列（目标）
	 * @params s 序列化对象 和 receiver 中的getObject对应
	 */
	public void orderSend(final Serializable s){
			jmsTemplate.send(QUEUENAME, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createObjectMessage(s);
			}
		});
	}
}
