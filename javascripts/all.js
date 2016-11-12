angular.module('app', ['fCsv', 'ngFileUpload', 'ngCsv']);

angular.module('app').controller('appCtrl', [
  '$http', 'fCsv', 'Upload', function($http, fCsv, Upload) {
    var vm;
    vm = this;
    vm.data = {};
    vm.lists = [];
    vm.action = {};
    vm.checked = [];
    vm.afterCompares = {};
    vm.csvHeader = [];
    vm.mainFile = function($fileContent) {
      var jsonString;
      jsonString = fCsv.toJson($fileContent);
      vm.data.mainFile = JSON.parse(jsonString);
      return vm.getArrayKey(vm.data.mainFile);
    };
    vm.compareFiles = function($fileContent) {
      var jsonString;
      jsonString = fCsv.toJson($fileContent);
      vm.data.compareFiles = JSON.parse(jsonString);
      vm.getArrayKey(vm.data.compareFiles);
      return console.log(jsonString, $fileContent);
    };
    vm.checkdata = function() {
      vm.afterCompares.data = [];
      angular.forEach(vm.data.mainFile, function(data1, key1) {
        data1.checked = false;
        return vm.afterCompares.data.push(data1);
      });
      return angular.forEach(vm.data.compareFiles, function(data2, key2) {
        var isSame;
        isSame = false;
        angular.forEach(vm.afterCompares.data, function(afterData, keyAfter) {
          if (data2[vm.action.selected] === afterData[vm.action.selected]) {
            return afterData.checked = true;
          }
        });
        if (!isSame) {
          data2.checked = false;
          return vm.afterCompares.data.push(data2);
        }
      });
    };
    vm.getArrayKey = function(jsonData) {
      vm.csvHeader = [];
      vm.lists = helpers.getKey(jsonData, vm.lists);
      angular.forEach(vm.lists, function(item, key) {
        return vm.csvHeader.push(item.name);
      });
      vm.csvHeader.push('Compare');
      return console.log(vm.csvHeader);
    };
  }
]);

angular.module('app').directive('fileread', [
  function() {
    return {
      scope: {
        fileread: '='
      },
      link: function(scope, element, attributes) {
        element.bind('change', function(changeEvent) {
          var reader;
          reader = new FileReader;
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              console.log(loadEvent);
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    };
  }
]).directive('onReadFile', function($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn;
      fn = $parse(attrs.onReadFile);
      element.on('change', function(onChangeEvent) {
        var reader;
        reader = new FileReader;
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {
              $fileContent: onLoadEvent.target.result
            });
          });
        };
        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});

var helpers;

helpers = {
  getKey: function(jsonData, arr) {
    var isSame, j, sub_key;
    console.log(jsonData);
    for (j in jsonData[0]) {
      if (arr.length === 0) {
        sub_key = j;
        arr.push({
          name: sub_key,
          checked: true
        });
      } else {
        isSame = false;
        angular.forEach(arr, function(item, key) {
          if (item.name === j) {
            return isSame = true;
          }
        });
        if (!isSame) {
          arr.push({
            name: j,
            checked: true
          });
        }
      }
    }
    console.log(arr);
    return arr;
  }
};
