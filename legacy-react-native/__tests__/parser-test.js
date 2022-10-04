
import parseTableNames from '../src/parser'

const toSortedArray = (set) => Array.from(set).sort()

test('simple query', () => {
  const query = 'select * from laundry;'
  const results = parseTableNames(query, 'main')

  expect(toSortedArray(results)).toBe(['main.laundry'])
})

test('namespaced query', () => {
  const query = 'select * from public.laundry;'
  const results = parseTableNames(query, 'main')

  expect(toSortedArray(results)).toBe(['public.laundry'])
})

test('namespaced query', () => {
  const query = `
    select * from a
      join b on b.id = a.b_id
      where b.foo = 1;
  `
  const results = parseTableNames(query, 'main')

  expect(toSortedArray(results)).toBe(['main.a', 'main.b'])
})
