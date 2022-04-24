import {formatDate} from "../misc";

test('formatDate formats the date to look nice', () => {
    const [y, m, d] = [2020, 11, 10];
    const expectedResult = 'Dec 20'

    const date = formatDate(new Date(y, m, d))

    expect(typeof date).toBe('string')
    expect(date).toStrictEqual(expectedResult);
})

