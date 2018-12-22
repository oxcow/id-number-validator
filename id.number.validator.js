'use strict';

/**
 * 身份证号码验证
 *
 * @param cardNo
 *            {String} 证件号码
 * @returns info {Object} 身份证信息.
 *
 */
var getIdCardInfo;

getIdCardInfo = cardNo => {

    /*
        isTrue: false, // 身份证号是否有效。默认为 false
        year: null,// 出生年。默认为null
        month: null,// 出生月。默认为null
        day: null,// 出生日。默认为null
        isMale: false,// 是否为男性。默认false
        isFemale: false // 是否为女性。默认false
    */
    let [isTrue, year, month, day, isMale, isFemale] = [false, null, null, null, false, false];

    if (cardNo) {

        const isEven = n => n % 2 === 0;

        if (15 === cardNo.length) {

            [year, month, day] = [1900 + +cardNo.substring(6, 8), +cardNo.substring(8, 10), +cardNo.substring(10, 12)]

            const birthday = new Date(year, month - 1, day);

            if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
                isTrue = true;
                isEven(cardNo.substring(14, 15)) ? isFemale = true : isMale = true;
            }

        } else if (18 === cardNo.length) {

            [year, month, day] = [+cardNo.substring(6, 10), +cardNo.substring(10, 12), +cardNo.substring(12, 14)];

            const birthday = new Date(year, month - 1, day);

            if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {

                const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];// 加权因子
                const Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];// 身份证验证位值.10代表X

                // 验证校验位
                let _cardNo = Array.from(cardNo); // reset: let _cardNo = [...cardNo];

                if (_cardNo[17].toLowerCase() === 'x') {
                    _cardNo[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
                }

                let sum = 0; // 声明加权求和变量
                for (let i = 0; i < 17; i++) {
                    sum += Wi[i] * _cardNo[i];// 加权求和
                }

                const i = sum % 11;// 得到验证码所位置

                if (+_cardNo[17] === Y[i]) {
                    isTrue = true;
                    isEven(+cardNo.substring(16, 17)) ? isFemale = true : isMale = true;
                }
            }
        }
    }

    if (!isTrue) [year, month, day, isMale, isFemale] = [];

    return {isTrue, year, month, day, isMale, isFemale};
};
