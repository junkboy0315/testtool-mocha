const expect = require('chai').expect;

function calcAge(birthday, today) {
    // その年の誕生日を迎えたと仮定し、年齢を仮計算する
    const diffYear = today.getFullYear() - birthday.getFullYear()

    // 小数点以下（1年以下の単位、つまり月日時間）の差をミリ秒単位で計算したのち、
    // その差が1年間に占める割合を計算する
    const YEAR_AS_MILLISEC = 1000 * 60 * 60 * 24 * 30 * 12;
    const time_from = new Date(birthday);
    const time_to = new Date(today);
    time_from.setFullYear(1970)
    time_to.setFullYear(1970)
    const diffTime = (time_to.getTime() - time_from.getTime()) / YEAR_AS_MILLISEC

    // 小数点以下の差を、仮計算した年齢に加算又は減算する
    let result = diffYear + diffTime

    // 小数点第9位以下を切り捨てる
    result = Math.floor(result * 100000000) / 100000000

    return result
}

describe("index.js", () => {
    const TODAY = new Date("2010-04-01T12:00+09:00");

    it("can calc age", () => {
        const expectedResults = [
            ['1999-12-31T00:00+09:00', 10.24027777],
            ['2000-03-31T00:00+09:00', 10.00416666],
            ['2000-04-01T11:59+09:00', 10.00000192],
            ['2000-04-01T12:00+09:00', 10.00000000],
            ['2000-04-01T13:00+09:00', 9.99988425],
            ['2000-04-02T00:00+09:00', 9.99861111],
            ['2000-12-31T00:00+09:00', 9.24027777],
        ]

        expectedResults.forEach((data) => {
            const birthday = new Date(data[0])
            expect(calcAge(birthday, TODAY)).to.equal(data[1])
        })
    })
})