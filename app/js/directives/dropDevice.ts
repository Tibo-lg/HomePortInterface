/// 
/// Display the temperature graph
/// -------------------------------------------------------------------------------------------------------------------
/// <reference path='../_all.ts' />

module app.Directives {
  'use strict';

  export function dropDevice(): ng.IDirective {

    return {
      restrict: 'A',
      scope: { dropfct: '=', type: '=' },
      link(scope, element: JQuery, attrs: ng.IAttributes) {
	var handleDragOver = function(e){
	  if (e.preventDefault) {
	    e.preventDefault(); // Necessary. Allows us to drop.
	  }
	}

	var handleDragEnter = function(e){
	  this.classList.add('over');
	}

	var handleDragLeave = function(e){
	  this.classList.remove('over');
	}
	var handleDrop = function(e) {
	  // this / e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // stops the browser from redirecting.
	  }

	  //e.dataTransfer.getData('device');

	  scope.$apply(scope.dropfct(scope.type));

	  return false;
	}

	element.on('dragenter', handleDragEnter);
	element.on('dragover', handleDragOver);
	element.on('dragleave', handleDragLeave);
	element.on('drop', handleDrop);
      }
    }
  }

}
/** Register directive */
app.registerDirective('dropDevice', []);
