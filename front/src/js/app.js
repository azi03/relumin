var $ = require('jquery');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var Highcharts = require('react-highcharts');

var appRoutes = require('./routers/AppRoutes');
var ClusterActions = require('./actions/ClusterActions');
var UserActions = require('./actions/UserActions');

$(function(){
    if (window != window.parent) {
        // if access from iframe
        $('head').append('<style>.dis-iframe {display: none;}</style>');
        USER = {
            login: false,
            username: ''
        };
    }

    UserActions.getUsers();

    ClusterActions.getClusters({
        complete: function(){
            Router.run(appRoutes, function(Root) {
                React.render(<Root />,  document.getElementById('app'));
            });

            setInterval(function(){
                ClusterActions.getClusters();
                UserActions.getUsers();
            }, 1 * 60 * 1000);
        }
    });
});
