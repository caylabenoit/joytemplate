/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.joyempty.auth;

import com.joy.C;
import com.joy.api.JoyApiRequest;
import com.joy.auth.FilterAuthenticate;

/**
 *
 * @author benoit
 */
public class dgmJoyEmptyFilter extends FilterAuthenticate {

    @Override
    protected String getPublicKey(JoyApiRequest request) {
        return request.getParameter(C.REQ_PARAM_USER_TAG).getValue();
    }
    
    @Override
    protected boolean checkLogin(JoyApiRequest request) {
        return (request.getParameter(C.REQ_PARAM_USER_TAG).getValue() != null && request.getParameter(C.REQ_PARAM_PWD_TAG).getValue() != null);
    }
    
}
