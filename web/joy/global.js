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

/* GLOBAL VARIABLES */
var URLROOT = '/mykiradata/';
var URLAPPROOT = URLROOT + 'app/';
var URLAPIROOT = URLROOT + 'api/';
var URLAPITASK = URLROOT + 'task/';
/* EOF GLOBAL VARIABLES */

/* Joy Init API Call */
var JOYAPPCONTEXTCALL = URLAPIROOT + 'app'
/* EOF Joy Init API Call */

/* JAVASCRIPT & CSS INCLUDES */
var joyIncludes = {
    "js": [ 
        "joy-external/bootstrap/components/jquery/dist/jquery.min.js",
        "joy-external/jquery-ui/dist/jquery-ui.min.js",
        "joy-external/bootstrap/dist/js/bootstrap.min.js",
        "joy-external/bootstrap/components/metisMenu/dist/metisMenu.min.js",
        "joy-external/bootstrap/dist/js/bootstrap-menu.js",
        "joy-external/bootstrap/components/datatables/media/js/jquery.dataTables.min.js",
        "joy-external/bootstrap/components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js",
        "joy-external/bootstrap/components/datatables-responsive/js/dataTables.responsive.min.js",
        "joy-external/bootstrap/components/bootstrap-validator-master/dist/validator.min.js",
        "joy-external/bootstrap/components/bootbox/bootbox.min.js",
        "joy-external/bootstrap/components/select2/dist/js/select2.full.min.js",
        "joy-external/bootstrap/components/bootstrap-treeview-master/dist/bootstrap-treeview.min.js",
        "joy-external/Chart.js/dist/Chart.bundle.min.js",
        "joy-external/gauge.js/gauge.min.js",
        "joy/joy.js",
        "app/js/dgmmenu.js",
        "app/js/dgmtaskmenu.js",
        "joy/charts.js",
        "app/js/dgmCharts.js",
        "joy-external/bootstrap/components/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js",
        "joy-external/vis-4.17.0/vis.min.js"
    ],
    "styles": [ 
        "joy-external/bootstrap/dist/css/bootstrap.css",
        "joy-external/bootstrap/components/metisMenu/dist/metisMenu.min.css",
        "joy-external/bootstrap/components/font-awesome/css/font-awesome.min.css",
        "joy-external/bootstrap/components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css",
        "joy-external/bootstrap/components/datatables-responsive/css/responsive.dataTables.min.css",
        "joy-external/bootstrap/components/select2/dist/css/select2.min.css",
        "joy-external/bootstrap/components/select2/dist/css/select2-bootstrap.css",
        "joy-external/bootstrap/components/bootstrap-treeview-master/dist/bootstrap-treeview.min.css",
        "joy-external/jquery-ui/dist/jquery-ui.theme.min.css",
        "joy-external/bootstrap/components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
        "theme/css/noless.css",
        "joy-external/vis-4.17.0/vis.min.css",
        "theme/css/theme.css"
    ]
};
/* EOF JAVASCRIPT & CSS INCLUDES */
