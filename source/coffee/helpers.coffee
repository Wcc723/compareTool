helpers =
  getKey: (jsonData, arr)->
    console.log jsonData
    for j of jsonData[0]
      if arr.length is 0
        sub_key = j
        arr.push { name: sub_key, checked: true }
      else
        isSame = false
        angular.forEach arr,(item, key)->
          if item.name is j
            isSame = true
        if !isSame
          arr.push { name: j, checked: true }
    console.log arr
    return arr
