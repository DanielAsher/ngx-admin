exports.Account = {
  name: 'Account',
  properties: {
    provider: 'string',
    providerId: 'string'
  }
}

exports.Permission = {
  name: 'Permission',
  properties: {
    user: 'User',
    realmFile: 'RealmFile',
    mayRead: 'bool',
    mayWrite: 'bool',
    mayManage: 'bool',
    updatedAt: 'date'
  }
}

exports.RealmFile = {
  name: 'RealmFile',
  primaryKey: 'path',
  properties: {
    path: 'string',
    realmType: 'string',
    syncLabel: 'string',
    owner: 'User',
    createdAt: 'date'
  }
}

exports.User = {
  name: 'User',
  primaryKey: 'userId',
  properties: {
    userId: 'string',
    isAdmin: 'bool',
    accounts: 'Account[]',
    metadata: 'UserMetadataRow[]'
  }
}

exports.UserMetadataRow = {
  name: 'UserMetadataRow',
  properties: {
    key: 'string',
    value: 'string'
  }
}

