import axios from 'axios'
import moment from 'moment'
import 'moment-timezone'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const today = moment().tz("Asia/Seoul").format('YYYYMMDD')
    const today2 = moment().tz("Asia/Seoul").format('YYYY년 MM월 DD일')

    axios({
        url: `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=M10&SD_SCHUL_CODE=8000047&MLSV_YMD=${today}&Type=json&KEY=${process.env.NEIS_KEY}`
    })
        .then(async r => {
            let { data } = r
            let result = {
                breakfast: '식단이 없습니다.',
                lunch: '식단이 없습니다.',
                dinner: '식단이 없습니다.',
                today: today2
            }
            if (data.mealServiceDietInfo == undefined) {
                await res.status(200).json(result)
                return
            }

            const clear = (menu) => {
                return (menu)
                    .replaceAll('<br/>', '')
                    .replaceAll('(', '')
                    .replaceAll(')', '')
                    .replaceAll('.', '')
                    .replace(/[0-9]/g, '')
                    .trim()
                    .replaceAll(' ', ', ')
            }

            let meal_data = data.mealServiceDietInfo[1].row
            for (let i = 0; i < 3; i++) {
                if (meal_data[i] == undefined) {
                    // 아래랑 코드 중복됨. 나중에 정리할 것.
                    result.breakfast = clear(result.breakfast)
                    result.lunch = clear(result.lunch)
                    result.dinner = clear(result.dinner)
                    await res.status(200).json(result)
                    return
                }
                if (meal_data[i].MMEAL_SC_CODE == 1) {
                    result.breakfast = meal_data[i].DDISH_NM
                } else if (meal_data[i].MMEAL_SC_CODE == 2) {
                    result.lunch = meal_data[i].DDISH_NM
                } else if (meal_data[i].MMEAL_SC_CODE == 3) {
                    result.dinner = meal_data[i].DDISH_NM
                }
            }

            result.breakfast = clear(result.breakfast)
            result.lunch = clear(result.lunch)
            result.dinner = clear(result.dinner)

            await res.status(200).json(result)
            return
        })
}
