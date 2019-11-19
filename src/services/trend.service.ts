import { Injectable } from '@angular/core';
import { StorageService } from './../providers/storage.service';
import { MarkSixCodeModel, MarkSixFiguresModel, MarkSixIssueBarterModel, ZodiacType, LonghuObj } from 'src/models/lotteryopen.model';
import { LotteryService } from 'src/services/lottery.service';
@Injectable()
export class TrendService {
    /**
     * @params 默认标题
     */
    public defaultTitle: any;
    /**
     * @params 彩种code
     */
    public lotteryCode = '';
    /**
     * @params 当前年
     */
    public markSixInfo;
    /**
     * @params 六合彩期号
     */
    public markSixStartIssue = '';
    public markSixFiguresList: MarkSixFiguresModel[];
    public newYear;

    /**
     * @params 最新期号
     */
    public lastIssueNo = '';
    /**
     * @params 最新开奖号码
     */
    public lastOpenNo = '';
    constructor(
        private storageService: StorageService,
        private lotteryServive: LotteryService,
    ) {
    }
    /**
     * @params 根据传入的年份获取对应的生肖信息
     * @author David 2019-09-19
     * @param {number} year
     * @returns
     * @memberof BettingOrderHelper
     */
    public getZodiacAndPoultryByYean(year: number) {
        const zodiacArr = [
            { zodiac: '鼠', isPoultry: false },
            { zodiac: '牛', isPoultry: true },
            { zodiac: '虎', isPoultry: false },
            { zodiac: '兔', isPoultry: false },
            { zodiac: '龙', isPoultry: false },
            { zodiac: '蛇', isPoultry: false },
            { zodiac: '马', isPoultry: true },
            { zodiac: '羊', isPoultry: true },
            { zodiac: '猴', isPoultry: false },
            { zodiac: '鸡', isPoultry: true },
            { zodiac: '狗', isPoultry: true },
            { zodiac: '猪', isPoultry: true }
        ];
        // 以鼠为开头所以，年份默认一个鼠年的年份 eg 1960年
        const zodiac = zodiacArr[((year - 1960) % 12)];
        return zodiac;
    }
    /**
     * @params 六合彩号码对应的色波和生肖
     * @param author David 2019-09-19
     */
    public getLetteryMarkSixColor(num) {
        const numberAttr = {
            1: { color: 'red' },
            2: { color: 'red' },
            3: { color: 'blue' },
            4: { color: 'blue' },
            5: { color: 'green' },
            6: { color: 'green' },
            7: { color: 'red' },
            8: { color: 'red' },
            9: { color: 'blue' },
            10: { color: 'blue' },
            11: { color: 'green' },
            12: { color: 'red' },
            13: { color: 'red' },
            14: { color: 'blue' },
            15: { color: 'blue' },
            16: { color: 'green' },
            17: { color: 'green' },
            18: { color: 'red' },
            19: { color: 'red' },
            20: { color: 'blue' },
            21: { color: 'green' },
            22: { color: 'green' },
            23: { color: 'red' },
            24: { color: 'red' },
            25: { color: 'blue' },
            26: { color: 'blue' },
            27: { color: 'green' },
            28: { color: 'green' },
            29: { color: 'red' },
            30: { color: 'red' },
            31: { color: 'blue' },
            32: { color: 'green' },
            33: { color: 'green' },
            34: { color: 'red' },
            35: { color: 'red' },
            36: { color: 'blue' },
            37: { color: 'blue' },
            38: { color: 'green' },
            39: { color: 'green' },
            40: { color: 'red' },
            41: { color: 'blue' },
            42: { color: 'blue' },
            43: { color: 'green' },
            44: { color: 'green' },
            45: { color: 'red' },
            46: { color: 'red' },
            47: { color: 'blue' },
            48: { color: 'blue' },
            49: { color: 'green' }
        };
        return numberAttr[num];
    }
    /**
     * @description: 计算所有开奖号码总和，计算冠亚和,冠亚大小，冠亚单双，总和大小，总和单双
     * @param author 2019-1-17 david
     */
    public countFiveNumber(val) {
        val.forEach((s, k) => {
            const tempArr = s.LotteryOpenNo.split(',');
            // 总和
            let sum = 0;
            // 冠亚单双
            let guanYaOddEven = '';
            // 冠亚大小
            let guanYabigsmall = '';
            // 总和大小
            let sunBigSmall = '';
            // 总和单双
            let sunOddEven = '';
            // 计算总和
            tempArr.forEach(element => {
                sum += Number(element);
            });
            val[k].TheSum = sum;
            // 字符串数组转数字数组
            const guanyahe = tempArr.map(Number);
            // 计算冠亚和(前两位开奖号码之和)
            const front2Total = guanyahe.reduce((pre, cur, index, arr) => {
                if (index > 1) {
                    return pre + 0;
                }
                return (pre + cur);
            });
            val[k].oneTwo = Number(front2Total);
            // 计算冠亚和值单双
            if (front2Total % 2 === 0) {
                guanYaOddEven = '双';
            } else {
                guanYaOddEven = '单';
            }
            val[k].oneTwoOddEven = guanYaOddEven;
            // 计算总和单双
            if (sum % 2 === 0) {
                sunOddEven = '双';
            } else {
                sunOddEven = '单';
            }
            val[k].TheSumOddEven = sunOddEven;
            // 计算冠亚和值大小
            // ---------------------------------------------------------------
            // 计算PK10冠亚和值的大小(冠亚和最大9+10=19，最小1+2=3，3-11小，12-19大)
            if (front2Total && s.LotteryOpenNo.split(',').length === 10) {
                if (front2Total > 11) {
                    guanYabigsmall = '大';
                } else {
                    guanYabigsmall = '小';
                }
                val[k].oneTwoBigSmall = guanYabigsmall;
            }
            // 计算五个号码球的总和大小(五个球彩种有11选五跟时时彩，两种情况分别判断)
            // 11选5总和最大值11+10+9+8+7=45，最小值01+02+03+04+05=15，小-->15-29  和-->30  大-->31-45

            if ((s.LotteryName.indexOf('11') >= 0 || s.LotteryName.indexOf('十一')) >= 0 && s.LotteryOpenNo.split(',').length === 5) {
                if (sum > 30) {
                    sunBigSmall = '大';
                } else if (sum === 30) {
                    sunBigSmall = '和';
                } else {
                    sunBigSmall = '小';
                }
                val[k].TheSumBigSmall = sunBigSmall;
            }
            // 时时彩计算总和大小，最大值9+9+9+9+9=45，最小0+0+0+0+0=0，大-->23-46，小-->0-22
            // 根据“11”,“十一”来区分十一选五跟时时彩
            if ((s.LotteryName.indexOf('11') === -1 && s.LotteryName.indexOf('十一')) === -1 && s.LotteryOpenNo.split(',').length === 5) {
                if (sum > 22) {
                    sunBigSmall = '大';
                } else {
                    sunBigSmall = '小';
                }
                val[k].TheSumBigSmall = sunBigSmall;
            }
            // 计算三个号码球总和大小
            // 三个号码彩种分为快三，福彩，排列三，pc蛋蛋，均可以有重复号
            // 快三最大为6，最小1，总和最大6+6+6=18，最小1+1+1=3，小-->3-10，大-->11-18
            if (s.LotteryName.indexOf('快3') >= 0 && s.LotteryOpenNo.split(',').length === 3) {
                if (sum > 10) {
                    sunBigSmall = '大';
                } else {
                    sunBigSmall = '小';
                }
                val[k].TheSumBigSmall = sunBigSmall;
            }
            // 福彩，排列三，pc蛋蛋最大为9，最小0，总和最大9+9+9=27，最小0+0+0=0，小-->0-13，大-->14-27
            if (s.LotteryName.indexOf('快3') === -1 && s.LotteryOpenNo.split(',').length === 3) {
                if (sum > 13) {
                    sunBigSmall = '大';
                } else {
                    sunBigSmall = '小';
                }
                val[k].TheSumBigSmall = sunBigSmall;
            }
        });
        return val;
    }
    /**
     * @params 处理六合彩 ，pc蛋蛋的东西
     * @param author David 2019-10-04
     */
    setMarksixIssueOpenNo(lotteryCode, openlist) {
        if (this.lotteryCode !== '95000' && this.lotteryCode !== '95010') {
            return;
        }
        // const markSixInfo = localStorage.getItem('markSixInfo');
        this.markSixInfo = this.storageService.read('markSixInfo');
        if (this.markSixInfo) {
            const markSixIssue = this.markSixInfo.LotteryIssues.find((s: MarkSixCodeModel) => s.LotteryCode === this.lotteryCode);
            this.setMarkSixIssue(markSixIssue, openlist);
        } else {
            this.lotteryServive.getSixSetting().subscribe(res => {
                if (res) {
                    // localStorage.setItem('markSixInfo', res.data);
                    this.storageService.write('markSixInfo', res.data);
                    const markSixIssue = res.data.LotteryIssues.find((s: MarkSixCodeModel) => s.LotteryCode === this.lotteryCode);
                    // this.setMarkSixIssue(markSixIssue);
                }
            });
        }
    }
    /**
     * @params 不清楚干啥的
     * @param author David 2019-10-04
     */
    setMarkSixIssue(markSixIssue, val) {
        this.markSixStartIssue = markSixIssue.StartIssue;
        if (this.lotteryCode === '95000' || this.lotteryCode === '95010') {
            this.markSixFiguresList = [];
            val.forEach(item => {
                let zodiacList = this.getNumberInfoArr();
                if (this.markSixStartIssue && (Number(item.IssueNo) < Number(this.markSixStartIssue))) {

                    zodiacList = this.getNumberInfoArr(true);
                }
                const tempArr = [];
                item.LotteryOpenNo.split(',').forEach((value) => {
                    // tslint:disable-next-line: no-use-before-declare
                    const figuresInfo = new MarkSixFiguresModel();
                    const zodiacInfo = zodiacList.find(s => s.num === value);
                    figuresInfo.figures = parseFloat(value);
                    figuresInfo.color = zodiacInfo.color;
                    figuresInfo.zodiac = zodiacInfo.zodiac;
                    figuresInfo.isPoultry = zodiacInfo.isPoultry;
                    tempArr.push(figuresInfo);
                });
                item.openNumList = tempArr;
            });
        }
        return val;
    }
    /**
     * @params 获取六合彩号码对应的生肖和颜色并返回一个数组
     * @param author David 2019-10-04
     */
    getNumberInfoArr(isLastYear: boolean = false) {
        const markSixInfo = this.storageService.read<MarkSixIssueBarterModel>('markSixInfo');
        let year = markSixInfo.LiuhecaiHXDate;
        if (isLastYear) {
            year = markSixInfo.LiuhecaiHXDate - 1;
        }
        let k = 1;
        const listMarkSixNumbers = [];
        // tslint:disable-next-line: no-use-before-declare
        let zodiacAndPoultry: ZodiacType = new ZodiacType();
        for (let m = year; m >= (year - 48); m--) {
            zodiacAndPoultry = this.getZodiacAndPoultryByYean(m);
            const numberInfo = {
                num: k,
                color: this.getLetteryMarkSixColor(k).color,
                zodiac: zodiacAndPoultry.zodiac,
                isPoultry: zodiacAndPoultry.isPoultry,
            };
            listMarkSixNumbers.push(numberInfo);
            k += 1;
        }
        return listMarkSixNumbers;
    }

    /**
     * @params PK10，时时彩，11选5龙虎计算
     * @param author David 2019-1-19
     */
    countLongHu(val) {
        const PK10 = [];
        const num5 = [];
        // PK10龙虎
        let arryPK10;
        // 时时彩，11选5龙虎
        const weishu = ['万个', '万十', '万百', '万千', '千个', '千十', '千百', '百个', '百十', '十个'];
        arryPK10 = val;
        arryPK10.forEach(s => {
            // pk10龙虎计算
            if (s.LotteryOpenNo.split(',').length === 10) {
                PK10.push(s.LotteryOpenNo.split(','));
                PK10.forEach((res, k) => {
                    const arrayPK10 = [];
                    const one = (res[9] - res[0] > 0) ? '虎' : '龙';
                    const twe = (res[8] - res[1] > 0) ? '虎' : '龙';
                    const three = (res[7] - res[2] > 0) ? '虎' : '龙';
                    const four = (res[6] - res[3] > 0) ? '虎' : '龙';
                    const five = (res[5] - res[4] > 0) ? '虎' : '龙';
                    arrayPK10.push(one, twe, three, four, five);
                    val[k].LongHuArrPK10 = arrayPK10;
                });
            } else if (s.LotteryOpenNo.split(',').length === 5) {
                // 11选5，时时彩 龙虎计算
                // 11选5没有重复号，没有和。 时时彩有重复号，有和
                num5.push(s.LotteryOpenNo.split(','));
                num5.forEach((res, k) => {
                    const arry5 = [];
                    const positionAttr = [];
                    const position0 = (res[0] - res[4] < 0) ? '虎' : (res[0] - res[4] > 0) ? '龙' : '和', // 万个龙虎
                        position1 = (res[0] - res[3] < 0) ? '虎' : (res[0] - res[3] > 0) ? '龙' : '和', // 万十龙虎
                        position2 = (res[0] - res[2] < 0) ? '虎' : (res[0] - res[2] > 0) ? '龙' : '和', // 万百龙虎
                        position3 = (res[0] - res[1] < 0) ? '虎' : (res[0] - res[1] > 0) ? '龙' : '和', // 万千龙虎
                        position4 = (res[1] - res[4] < 0) ? '虎' : (res[1] - res[4] > 0) ? '龙' : '和', // 千个龙虎
                        position5 = (res[1] - res[3] < 0) ? '虎' : (res[1] - res[3] > 0) ? '龙' : '和', // 千十龙虎
                        position6 = (res[1] - res[2] < 0) ? '虎' : (res[1] - res[2] > 0) ? '龙' : '和', // 千百龙虎
                        position7 = (res[2] - res[4] < 0) ? '虎' : (res[2] - res[4] > 0) ? '龙' : '和', // 百个龙虎
                        position8 = (res[2] - res[3] < 0) ? '虎' : (res[2] - res[3] > 0) ? '龙' : '和', // 百十龙虎
                        position9 = (res[3] - res[4] < 0) ? '虎' : (res[3] - res[4] > 0) ? '龙' : '和'; // 十个龙虎
                    positionAttr.push(position0, position1, position2, position3, position4,
                        position5, position6, position7, position8, position9);
                    weishu.forEach((r, v) => {
                        // tslint:disable-next-line: no-use-before-declare
                        const obj = new LonghuObj();
                        obj.value = positionAttr[v];
                        obj.position = r;
                        arry5.push(obj);
                    });
                    val[k].LongHuArr = arry5;
                    val[k].weiShu = weishu;
                });
            }
        });
        return val;
    }

    /**
     * @description: 计算所有号码大小,单双
     * @param {type} 2019-1-19 david
     */
    elevenFive(val) {
        let num3 = [];
        val.forEach((s, k) => {
            // 计算3位，5位球号码大小
            const bigSmall = [];
            if (s.LotteryOpenNo.split(',').length === 3 || s.LotteryOpenNo.split(',').length === 5) {
                num3 = s.LotteryOpenNo.split(',');
                let bigsmallcount;
                num3.forEach(element => {
                    if (element.length === 2) {
                        if (Number(element) < 6) {
                            bigsmallcount = '小';
                        } else {
                            bigsmallcount = '大';
                        }
                    } else if (element.length === 1) {
                        if (Number(element) < 5) {
                            bigsmallcount = '小';
                        } else {
                            bigsmallcount = '大';
                        }
                    }
                    bigSmall.push(bigsmallcount);
                    val[k].BigSmall = bigSmall;
                });
            }
            // 计算7位球号码大小
            if (s.LotteryOpenNo.split(',').length === 7) {
                const num7 = s.LotteryOpenNo.split(',');
                let bigsmallcount;
                num7.forEach(element => {
                    if (Number(element) > 24 && Number(element) < 49) {
                        bigsmallcount = '大';
                    } else if (Number(element) > 0 && Number(element) < 25) {
                        bigsmallcount = '小';
                    } else {
                        bigsmallcount = '和';
                    }
                    bigSmall.push(bigsmallcount);
                    val[k].BigSmall = bigSmall;
                });
            }
            // 计算10位球号码大小
            if (s.LotteryOpenNo.split(',').length === 10) {
                const num10 = s.LotteryOpenNo.split(',');
                let bigsmallcount;
                num10.forEach(element => {
                    if (Number(element) > 5) {
                        bigsmallcount = '大';
                    } else if (Number(element) < 6) {
                        bigsmallcount = '小';
                    }
                    bigSmall.push(bigsmallcount);
                    val[k].BigSmall = bigSmall;
                });
            }
            // 计算单双
            if (s.LotteryOpenNo.split(',').length) {
                const arryOddEven = [];
                const oddeven = s.LotteryOpenNo.split(',');
                oddeven.forEach(element => {
                    let oddseven;
                    if (Number(element) % 2 === 0) {
                        oddseven = '双';
                    } else {
                        oddseven = '单';
                    }
                    arryOddEven.push(oddseven);
                    val[k].OddEven = arryOddEven;
                });
            }
        });
        return val;
    }
    /**
     * @params 六合彩获取号码对应生肖
     * @param author David 2019-09-19
     */
    getSxByNum(num: number, IssueNo?: string) {
        let tempArr;
        let sx = '';
        const obj = {
            sx: '',
            color: ''
        };
        if (this.newYear && (Number(IssueNo) < Number(this.newYear)) && this.lotteryCode === '95000') {
            tempArr = this.getNumberInfoArr(true);
        } else {
            tempArr = this.getNumberInfoArr();
        }
        tempArr.filter(
            (res) => {
                if (res.num === num) {
                    sx = res.zodiac;
                    obj.sx = res.zodiac;
                    obj.color = res.color;
                }
            }
        );
        return obj;
    }
}

