import oracleObject from './index'

test('simple usage', () => {
  const result = {
    metaData: [
      { name: 'manager_id' },
      { name: 'department_id'},
      { name: 'department_name'}
    ],
    rows: [
      ['341235128', '3842', 'Finances'],
      ['967361384', '3984', 'Sales'],
      // ...
    ]
  }

  console.log(oracleObject(result))

})

test('converts the oracle object', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'}
    ],
    rows: [
      ['85736', 'Felipe'],
      ['94386', 'Larissa']
    ]
  }

  const clients = oracleObject(result)

  expect(clients).toEqual([
    { CD_CLIENT: '85736', NAME_CLIENT: 'Felipe' },
    { CD_CLIENT: '94386', NAME_CLIENT: 'Larissa' }
  ])

})

test('apply function to columns', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'},
      { name: 'ANOTHER_COLUMN'},
    ],
    rows: [
      ['85736', 'Felipe', null],
      ['94386', 'Larissa', 1]
    ]
  }

  const clients = oracleObject(result, (col: any) => {
    switch(col) {
      case 'CD_CLIENT': return 'code'
      case 'NAME_CLIENT': return 'name'
      default: return col.toLowerCase()
    }
  })

  expect(clients).toEqual([
    { code: '85736', name: 'Felipe' },
    { code: '94386', name: 'Larissa', another_column: 1 }
  ])

})

test('converts the oracle object', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'}
    ],
    rows: [
      ['85736', 'Felipe'],
      ['94386', 'Larissa']
    ]
  }

  const clients = oracleObject(result)

  expect(clients).toEqual([
    { CD_CLIENT: '85736', NAME_CLIENT: 'Felipe' },
    { CD_CLIENT: '94386', NAME_CLIENT: 'Larissa' }
  ])

})

test('accept null values', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'},
      { name: 'ANOTHER_COLUMN'},
    ],
    rows: [
      ['85736', null, null],
      ['94386', 'Larissa', 1]
    ]
  }
  
  const options = { allowNull: true }

  const clients = oracleObject(result, (col: any) => {
    switch(col) {
      case 'CD_CLIENT': return 'code'
      case 'NAME_CLIENT': return 'name'
      default: return col
    }
  }, options)

  expect(clients).toEqual([
    { code: '85736', name: null, ANOTHER_COLUMN: null },
    { code: '94386', name: 'Larissa', ANOTHER_COLUMN: 1 }
  ])

})


test('can be used with an object', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'},
      { name: 'ANOTHER_COLUMN'},
    ],
    rows: [
      ['85736', 'Felipe', null],
      ['94386', 'Larissa', 1]
    ]
  }

  const options = { defaultFn: (val: any) => val.toLowerCase() }

  const clients = oracleObject(result, { 
    'CD_CLIENT': 'code',
    'NAME_CLIENT': 'name'
  })

  expect(clients).toEqual([
    { code: '85736', name: 'Felipe' },
    { code: '94386', name: 'Larissa', ANOTHER_COLUMN: 1 }
  ])

})


test('can be used with an object with options', () => {

  const result = {
    metaData: [
      { name: 'CD_CLIENT' },
      { name: 'NAME_CLIENT'},
      { name: 'ANOTHER_COLUMN'},
    ],
    rows: [
      ['85736', 'Felipe', null],
      ['94386', 'Larissa', 1]
    ]
  }

  const options = { defaultFn: (val: any) => val.toLowerCase() }

  const clients = oracleObject(result, { 
    'CD_CLIENT': 'code',
    'NAME_CLIENT': 'name'
  },
  options)

  expect(clients).toEqual([
    { code: '85736', name: 'Felipe' },
    { code: '94386', name: 'Larissa', another_column: 1 }
  ])

})
