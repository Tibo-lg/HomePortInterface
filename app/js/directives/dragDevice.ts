/// 
/// Display the temperature graph
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
  'use strict';

  export function dragDevice(): ng.IDirective {

    return {
      restrict: 'A',
      scope: { dragfct: '=', devicetype: '=' },
      link(scope, element: JQuery, attrs: ng.IAttributes) {

	var handleDragStart= function(e){
	  this.style.opacity = 0.4;
	  scope.$apply(scope.dragfct(scope.devicetype));
	}

	var handleDragEnd = function(e){
	  this.style.opacity = 1;
	}

	element.on('dragstart', handleDragStart);
	element.on('dragend', handleDragEnd);
      }
    }
  }
}
/** Register directive */
app.registerDirective('dragDevice', []);
