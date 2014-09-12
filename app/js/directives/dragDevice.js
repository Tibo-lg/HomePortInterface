///
/// Display the temperature graph
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />
var app;
(function (app) {
    (function (Directives) {
        'use strict';

        function dragDevice() {
            return {
                restrict: 'A',
                scope: { dragfct: '=', devicetype: '=' },
                link: function (scope, element, attrs) {
                    var handleDragStart = function (e) {
                        this.style.opacity = 0.4;
                        scope.$apply(scope.dragfct(scope.devicetype));
                    };

                    var handleDragEnd = function (e) {
                        this.style.opacity = 1;
                    };

                    element.on('dragstart', handleDragStart);
                    element.on('dragend', handleDragEnd);
                }
            };
        }
        Directives.dragDevice = dragDevice;
    })(app.Directives || (app.Directives = {}));
    var Directives = app.Directives;
})(app || (app = {}));

/** Register directive */
app.registerDirective('dragDevice', []);
