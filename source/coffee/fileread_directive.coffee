angular.module 'app'
  .directive 'fileread', [ ->
    {
      scope: fileread: '='
      link: (scope, element, attributes) ->
        element.bind 'change', (changeEvent) ->
          reader = new FileReader

          reader.onload = (loadEvent) ->
            scope.$apply ->
              console.log loadEvent
              scope.fileread = loadEvent.target.result
              return
            return

          reader.readAsDataURL changeEvent.target.files[0]
          return
        return

    }
  ]
  .directive 'onReadFile', ($parse) ->
    {
      restrict: 'A'
      scope: false
      link: (scope, element, attrs) ->
        fn = $parse(attrs.onReadFile)
        element.on 'change', (onChangeEvent) ->
          reader = new FileReader

          reader.onload = (onLoadEvent) ->
            scope.$apply ->
              fn scope, $fileContent: onLoadEvent.target.result
              return
            return

          reader.readAsText (onChangeEvent.srcElement or onChangeEvent.target).files[0]
          return
        return

    }
