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

/**
 * includes all the Javascript files into the DOM
 * @param {type} backRootPath path to the root folder
 */
function includeAllJS() {
    for (var i=0; i<joyIncludes.js.length; i++) {
        document.write("<SCRIPT type='text/javascript' src='" + URLROOT + joyIncludes.js[i]+"'></SCRIPT>" );
    }
}

/**
 * includes all the CSS files into the DOM
 * @param {type} backRootPath path to the root folder
 */
function includeAllCSS() {
    for (var i=0; i<joyIncludes.styles.length; i++) {
        document.write("<LINK href='" + URLROOT + joyIncludes.styles[i]+"' rel='stylesheet' type='text/css' />" );
    }
}
