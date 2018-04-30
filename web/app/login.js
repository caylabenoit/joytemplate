/* 
 * Copyright (C) 2017 Benoit CAYLA (benoit@famillecayla.fr)
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

function cb_login_return(content) {
    if(content.status == 1) {
        $("#errormessages").hide();
        $$.setToken(content);
        $$.navigate("home");
    } else {
        $("#errormessages").show();
        $("#errormessages").html("Login failed, please retry");
    }
}

function login() {
    var postParams = {
        "user" : $("#joyuser").val(),
        "password" : $("#joypassword").val()
    };
    $$.ajax("POST", cb_login_return, $$.getLOGINCall(), postParams);
}

$$.form_afterLoad = function() {
    if ($$.getParameter('action') == "logout") {
        $$.delToken(); // remove the session cookie
    }
    $("#errormessages").hide();
    $("#src_logo_big").attr('src', $$.getURLRoot() + $$.getContext().parameters.logo);
    $("#app_name").html($$.getContext().parameters.appname);
    $("#version").html($$.getContext().parameters.version);
}

$$.init();