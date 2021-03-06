angular.module 'app'
  .controller 'appCtrl', ['$http', 'fCsv', 'Upload', ($http, fCsv, Upload)->
    vm = @
    vm.data = {}
    vm.lists = []
    vm.action = {}
    vm.checked = []
    vm.afterCompares = {}
    vm.csvHeader = []
    vm.winners = []
    vm.type = 'compare'

    # 上傳主要檔案
    vm.mainFile = ($fileContent)->
      jsonString = fCsv.toJson $fileContent
      vm.data.mainFile = JSON.parse jsonString
      vm.getArrayKey(vm.data.mainFile)

    # 比對檔案
    vm.compareFiles = ($fileContent)->
      jsonString = fCsv.toJson($fileContent)
      vm.data.compareFiles = JSON.parse jsonString
      vm.getArrayKey(vm.data.compareFiles)
      console.log jsonString, $fileContent

    # 反選 checked 全部
    vm.checkAll = (checked)->
      angular.forEach vm.lists, (item, key)->
        item.checked = checked

    vm.checkdata = ()->
      vm.afterCompares.data = []
      # 直接匯入資料
      angular.forEach vm.data.mainFile, (data1, key1)->
        data1.checked = false
        data1.data1 = true
        vm.afterCompares.data.push data1

      # 比對資料
      angular.forEach vm.data.compareFiles, (data2, key2)->
        isSame = false
        angular.forEach vm.afterCompares.data, (afterData, keyAfter)->
          if data2[vm.action.selected] is afterData[vm.action.selected]
            afterData.checked = true
            afterData.data2 = true
            isSame = true
        if !isSame
          data2.data2 = true
          data2.checked = false
          vm.afterCompares.data.push data2


    vm.getArrayKey = (jsonData)->
      vm.csvHeader = []
      vm.lists = helpers.getKey(jsonData, vm.lists)
      angular.forEach vm.lists, (item, key)->
        vm.csvHeader.push item.name
      vm.csvHeader.push 'Compare'
      console.log vm.csvHeader

    # 抽獎
    vm.importlLotteryList = () ->
      vm.afterCompares.data = vm.data.mainFile.map (data1, key1)->
        data1.winner = false
        return data1

    vm.getWinner = ()->
      length = vm.afterCompares.data.length
      number = Math.floor(Math.random() * length)
      winner = vm.afterCompares.data[number]
      thesame = vm.winners.some (item)->
        return item['$$hashKey'] == winner['$$hashKey']
      # 如果沒有相同的
      if !thesame
        vm.winners.push(winner)
      else if thesame && vm.winners.length isnt vm.afterCompares.data.length
        # 有相同的就再抽一次
        vm.getWinner()
      # console.log(number, winner, vm.winners, thesame, winner['$$hashKey'])

    return
  ]
