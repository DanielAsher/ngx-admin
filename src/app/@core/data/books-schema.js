exports.RealmBookShelf = {
  name: 'RealmBookShelf',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    books_: 'RealmStoryBook[]',
    exerciseBooks_: 'RealmExerciseBook[]'
  }
}

exports.RealmExerciseBook = {
  name: 'RealmExerciseBook',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    title: 'string',
    authors: 'string',
    language: 'string',
    publisher: 'string',
    coverImageURL: 'string',
    readingAge: 'int',
    pages_: 'RealmExercisePage[]'
  }
}

exports.RealmExercisePage = {
  name: 'RealmExercisePage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    text: 'string',
    pageNumber: 'int',
    imageURL: 'string',
    pointsValue: 'double',
    trickyWord1: 'string',
    trickyWord2: 'string',
    trickyWord3: 'string',
    imageWidth: 'int',
    imageHeight: 'int'
  }
}

exports.RealmStoryBook = {
  name: 'RealmStoryBook',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    title: 'string',
    authors: 'string',
    language: 'string',
    publisher: 'string',
    coverImageURL: 'string',
    readingAge: 'int',
    pageList: 'RealmStoryPage[]'
  }
}

exports.RealmStoryPage = {
  name: 'RealmStoryPage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    text: 'string',
    pageNumber: 'int',
    imageURL: 'string'
  }
}

