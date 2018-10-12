exports.ExerciseGroup = {
  name: 'ExerciseGroup',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    type: 'string',
    startDate: 'date?',
    completionDate: 'date?',
    pageIDs: 'string[]',
    results: 'ExerciseResult[]'
  }
}

exports.ExerciseResult = {
  name: 'ExerciseResult',
  properties: {
    user: 'User',
    pageID: 'string',
    challengeType: 'string',
    startTime: 'date',
    completionTime: 'date',
    pointsAwarded: 'double'
  }
}

exports.MasterUser = {
  name: 'MasterUser',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    email: 'string',
    password: 'string',
    users: 'User[]'
  }
}

exports.User = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    age: 'int',
    totalPoints: 'double',
    availablePoints: 'double',
    profileIcon: 'UserProfileIcon',
    collectables: 'UserProfileIcon[]',
    records: 'UserRecords',
    didCompleteWalkthrough: 'bool'
  }
}

exports.UserBookResult = {
  name: 'UserBookResult',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    bookID: 'string',
    startDate: 'date?',
    completionDate: 'date?',
    exerciseGroups: 'ExerciseGroup[]'
  }
}

exports.UserProfileIcon = {
  name: 'UserProfileIcon',
  properties: {
    shopID: 'string',
    user: 'User',
    purchasePrice: 'double',
    purchaseDate: 'date'
  }
}

exports.UserRecords = {
  name: 'UserRecords',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    bookResults: 'UserBookResult[]'
  }
}

