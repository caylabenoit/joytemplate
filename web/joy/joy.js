/*
 * Copyright (C) 2016 Benoit CAYLA (benoit@famillecayla.fr)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(){  

/************** Page Parameters Management ******************/

function classParameter(name, value) {
    this.name = name;
    this.value = value;
}

/************** Joy Page Object ******************/

function JoyPage () {
    var context = null;
    var JOY_SESSION_COOKIE_NAME = 'JOYSESSIONCOOKIENAME';
    
    this.getContext = function() { return context; };
    this.setContext = function(cxt) { context = cxt; };
    this.getURLRoot = function() { return URLROOT; };
    function getURLApp() { return URLAPPROOT; };
    this.getURLApi = function() { return URLAPIROOT; };
    this.getURLTask = function() { return URLAPITASK; };

    this.getAPICall = function(api, params) {
        var paramlist ='';
        if (params != null) {
            paramlist ='?';
            for(var k in params)
                paramlist+= encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + '&';
        }
        return this.getURLApi() + api + paramlist;
    };
    
    this.getLOGINCall = function() {
        return this.getURLRoot() + "auth";
    }
    
    this.getTASKCall = function(task) {
        return this.getURLTask() + task;
    };
    
    function createXHR () {
        var request = false;
            try {
                request = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err2) {
                try {
                    request = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (err3) {
                    try {
                        request = new XMLHttpRequest();
                    } catch (err1) {
                        request = false;
                    }
                }
            }
        return request;
    };

    /**
     * set token as cookie with the informations returnd by joy login (json object)
     * @param {type} cookie like { user : "", token : "" }
     */
    this.setToken = function (cookie) {
        var content = cookie.user + "|" + cookie.token;
        this.setSessionCookie(content);
    }
    
    /**
     * Return the session token (in the cookie)
     * @returns {unresolved} data like { user : "", token : "" }
     */
    this.getToken = function () {
        return this.getSessionCookie();
    }

    this.delToken = function () {
        this.delCookie(JOY_SESSION_COOKIE_NAME);
    }
    

    /**
     * AJAX asynchronous Call through all http methods
     * Example : 
     *  $$.ajax("GET", cb_chartPolar, [rest url]);
     *  $$.ajax("POST", cb_chartPolar, [rest url], { "param1" : "val1", "param2": "val2" });
     * @param {type} m = GET or POST
     * @param {type} cb callback function to call
     * @param {type} url    rest URL call
     * @param {type} valObj list all the parameters in json format here (not in the URL direclty)
     */
    this.ajax = function(m, cb, url, valObj) {
        // Get the session cookie
        var myCookie = this.getToken();
        if (myCookie == null) { 
            // NO SESSION ...
        }
        
        // effective AJAX Call
	var myxhr = createXHR();
	var values ='?';
	for(var k in valObj)
            values+= encodeURIComponent(k) + '=' + encodeURIComponent(valObj[k]) + '&';
	if(m !== 'POST') {
            url+=values;
            values= null;
	}
	myxhr.open(m,url,true);
	if(m === 'POST') {
            values=values.substring(1, values.length-1);
            myxhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
        myxhr.setRequestHeader("Authorization", myCookie);
	myxhr.send(values);
	myxhr.onreadystatechange = function() {
            if(myxhr.readyState==4){
                switch(myxhr.status) {
                    case 200: cb(eval("(" + myxhr.responseText + ")")); break;
                    case 403, 404, 503 :  cb(null); break;
                    case 401: JOY.navigate("login"); break; // Redirect login page
                    default:  cb(null);	
		}
            }
	}
    };

    this.setSessionCookie = function(valeur) {
        this.setCookie(JOY_SESSION_COOKIE_NAME, valeur, 1);
    }
    
    this.getSessionCookie = function() {
        return this.getCookie(JOY_SESSION_COOKIE_NAME);
    }
    
    /**
     * Create a new cookie
     * @param {type} nom
     * @param {type} valeur
     * @param {type} jours
     * @returns {undefined}
     */
    this.setCookie = function(nom, valeur, jours) {
        if (jours) {
            var date = new Date();
            date.setTime(date.getTime()+(jours*24*60*60*1000));
            var expire = "; expire="+date.toGMTString();
        }
        // Aucune valeur de jours spécifiée
        else var expire = "";
        document.cookie = nom+"="+valeur+expire+"; path=/";
    }

    this.getCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
    }
    
    this.delCookie = function(nom) {
        this.setCookie(nom, "", -1);
    }

    /**
     * Returns the URL for a given configuration tag
     * @param {type} tag  to retrieve the URL
     * @param {type} params parameters in JSON format
     * @returns {unresolved}
     */
    function getNaviURL (tag, params) {
        var navis = context.navi;
        for (var i=0; i< navis.list.length; i++) {
            if (navis.list[i].tag == tag) {
                var url =  getURLApp() + navis.list[i].url;
            	var values ='?';
                for (var k in params)
                    values+= encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + '&';
                return url + values;
            }
        }
        return navis.default;
    };

    /**
     * return a complete HREF html link with $$.navigate onlick way of nagigating
     * @param {type} tag        joy tag navi
     * @param {type} params     nafigation parameters (json format)
     * @param {type} text       text link
     * @param {type} cssAttributes   CSS attributes like class, styles, etc.
     * @returns {String}
     */
    this.getAHref = function(tag, params, text, cssAttributes) {
        var href = "";
        if (params != null) {
            var paramStr = "{";
            for (var k in params)
               paramStr += k + ":'" + params[k] + "',";
           
            paramStr = paramStr.substring(0, paramStr.length-1) + "}";
            href = "<A href='#' " + (cssAttributes==null?"":"" + cssAttributes) + " onclick=\"$$.navigate('" + tag + "', " + paramStr + ");\">" + text + "</a>";
        } else
            href =  "<A href='#' " + (cssAttributes==null?"":"" +cssAttributes) + " onclick=\"$$.navigate('" + tag + "');\">" + text + "</a>";
        return href;
    }

    /**
     * Navigate to the tag destination
     * @param {type} tag  to retrieve the URL
     * @param {type} params params parameters in JSON format
     * @returns {undefined}
     */
    this.navigate = function(tag, params) {
        window.open(getNaviURL(tag, params), "_self");
    };
}

// To override directly into the page code
JoyPage.prototype.form_beforeLoad = function() {};  // Manage things to do before load the JS in the page (getting context, etc.)
JoyPage.prototype.form_afterLoad = function() {};   // Manage things to do after getting the Joy context

// Page Parameter management
JoyPage.prototype.getParameters = function() {
    var search = document.location.search;
    var paramsTemp = search.substring(1, search.length); // remove the ? character
    var params =  paramsTemp.split("&");
    var finalPairs = new Array();
    
    for (var i=0; i < params.length; i++) {
        var p = params[i].split("=");
        finalPairs[i] = new classParameter(p[0], p[1]);
    }
    return finalPairs;
}

JoyPage.prototype.getParameter = function(name) {
    var myRequest = this.getParameters();
    if (myRequest == null)
        return null;
    for (var i=0; i < myRequest.length; i++) 
        if (myRequest[i].name == name) {
            return myRequest[i].value;
        }
    return null;
};

JoyPage.prototype.init = function() {
    this.form_beforeLoad();
    this.ajax("GET", this.form_joy_afterLoad, JOYAPPCONTEXTCALL, null);
}

/**
 * Transform all the <i class="glyfe"> into real glyphe
 * @param {type} params
 */
JoyPage.prototype.setAllGlyphes = function() {
    var glyphes = this.getContext().parameters.ApplicationIconsBSGlyphe;
    var goodGlyphe = "";
    
    // Search for all the <i> with the class specified
    var allI = document.getElementsByTagName("I");
    for (var j=0; j < allI.length; j++) {
        var currentClassTag = allI[j].className;
        if (currentClassTag != null) {
            // Check if it's a glyphe
            goodGlyphe = "";
            for (var i=0; i < glyphes.length; i++) {
                if (glyphes[i].name == currentClassTag) 
                    goodGlyphe = glyphes[i].value;
            }
            if (goodGlyphe != "") {
                allI[j].classList.add("fa");
                allI[j].classList.add(goodGlyphe);
                allI[j].classList.add("fa-fw");
            }
        }
    }
}

JoyPage.prototype.getGlyphe = function(name) {
    var glyphes = this.getContext().parameters.ApplicationIconsBSGlyphe;
    for (var i=0; i < glyphes.length; i++) {
        if (glyphes[i].name == name) {
            return glyphes[i].value;
        }
    }
    return null;
}

/**
 * automacically set to the <SPAN> text to all the span elements with the same id as the id in the singles joy array
 * @param {type} singles values
 */
JoyPage.prototype.setJoyDataSingles = function(singles) {
    var spans = document.getElementsByTagName("span");
    for (var i=0; i < spans.length; i++) {
        for (var j=0; j < singles.length; j++) {
            if (spans[i].id.toUpperCase() == singles[j].name.toUpperCase()) {
                spans[i].innerHTML = singles[j].value;
            }
        }
    }
}

/**
 * Retrieve a specific value from a dataset in JSON format
 * example : {"name":"ICON","value":"pin.png"},{"name":"IMGICO","value":"pin.png"}
 * @param {type} content    json dataset
 * @param {type} fieldname  field to get (ex. ICON)
 * @returns {Window.value}  value
 */
JoyPage.prototype.getData = function(content, fieldname) {
    for (var i=0; i < content.length; i++) {
        if (content[i].name.toUpperCase() == fieldname.toUpperCase())
            return content[i].value;
    }
    return null;
}

JoyPage.prototype.form_joy_afterLoad = function(content) {
    JOY.setContext(content);
    // Glyphes
    JOY.setAllGlyphes();
    // call customized function (in page)
    JOY.form_afterLoad();
};

/**
 * Dynamically build the combobox items with the JSON Object (coming from standard Joy REST API get Entity)
 * @param {type} selectID   ID of the <select> tag
 * @param {type} data       JSON object which contains data (coming from a GET REST  Entity
 * @param {type} orderText  Index or fieldname of the text (displayed) value
 * @param {type} orderValue Index or fieldname of the value/id (not displayed)
 * @returns {undefined}     Nothing
 */
JoyPage.prototype.fillComboboxFromJoyEntity = function(selectID, data, orderText, orderValue) {
    var oText, oValue;
    var idx_value, idx_text;
    var cboObject = document.getElementById(selectID);
    this.emptyCombobox(selectID);
    
    if (typeof orderText === 'string') {
        for (var j=0; j< data.colnames.length; j++) 
            if (data.colnames[j].toUpperCase() == orderText.toUpperCase())
                idx_text = j;
    } else
        if (orderText == null) idx_text = 1; else idx_text = orderText;

    if (typeof orderValue === 'string') {
        for (var k=0; k< data.colnames.length; k++) 
            if (data.colnames[k].toUpperCase() == orderValue.toUpperCase())
                idx_value = k;
    } else
        if (orderValue == null) idx_value = 1; else idx_value = orderValue;

    for (var i=0; i < data.rowcount; i++) {
        var myoption = document.createElement("option");
        myoption.text = data.rows[i].items[idx_text].value;
        myoption.value = data.rows[i].items[idx_value].value;
        cboObject.add(myoption, null);
    }
}

JoyPage.prototype.fillComboboxFromJoyVector = function(selectID, data, withemptyoption) {
    var cboObject = document.getElementById(selectID);
    this.emptyCombobox(selectID);
    for (var i=0; i < data.itemcount; i++) {
        var myoption = document.createElement("option");
        myoption.text = data.items[i].name;
        myoption.value = data.items[i].value;
        cboObject.add(myoption, null);
    }
    // Add an empty value to the list if requested
    if (withemptyoption == true) {
        var o = $("<option/>", {value: 0, text: " "});
        $('#' + selectID).append(o);
    }
}

JoyPage.prototype.emptyCombobox = function(selectID) {
    var cboObject = document.getElementById(selectID);
    while (cboObject.options.length > 0) {                
        cboObject.remove(0);
    }   
}

/**
 * Insert a wait message dynamically during a div load (hiden while end_waitMessage is not called).
 * @param {type} contenerID    Div Contener (would be a bootstrap panel)
 * @returns {undefined}     Nothing
 */
JoyPage.prototype.displayWaitIntoContainer = function (contenerID) {
    // Hide all the elements into the container
    var nodes = document.getElementById(contenerID).childNodes;
    for (i=0; i<nodes.length; i++) {
        if (nodes[i].nodeType == 1) // it's a element
            nodes[i].style.display="none"; // hide the working div
    }
    
    // create the please wait message
    var divImg = document.createElement("DIV");
    divImg.classList.add("divTaskImage");
    divImg.id = "wait_" + contenerID;
    
    var divTxt = document.createElement("DIV");
    divTxt.classList.add("divTaskDesc");
    
    var content = document.createTextNode(" Please wait ...");
    divTxt.appendChild(content);
    divImg.appendChild(divTxt);

    document.getElementById(contenerID).appendChild(divImg);
};

/**
 * remove the wait message dynamically
 * @param {type} contenerID    Div Contener (would be a bootstrap panel)
 * @returns {undefined}     Nothing
 */
JoyPage.prototype.removeWaitIntoContainer = function(contenerID) {
    var nodes = document.getElementById(contenerID).childNodes;
    for (i=0; i<nodes.length; i++) {
        if (nodes[i].nodeType == 1) {// it's a element
            if (nodes[i].style.display=="none") { // it's hidden
                var panelItem = document.getElementById("wait_" + contenerID);
                if (nodes[i] != null && panelItem != null) {
                    nodes[i].style.display="initial";
                    panelItem.style.display="none";
                }
            }
        }
    }
};

JoyPage.prototype.getFormattedErrorMessages = function(content) {
    var message = "";
    if (content.status != 'OK') {
        for (var i=0; i<content.messages.length; i++) 
            message += content.messages[i] + '\n';
    }
    return message;
}


/* JOY unique Object instance */
var JOY = new JoyPage ();

if(!window.$$){window.$$=JOY;} 
})();