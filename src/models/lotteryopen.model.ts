export class LonghuObj {
    constructor() {
        this.value = null;
        this.position = null;
    }
    value: string;
    position: string;
}
export class MarkSixIssueBarterModel {
    constructor() {
        this.LiuhecaiHXDate = null;
        this.LotteryIssues = null;
    }
    LiuhecaiHXDate: number;
    LotteryIssues: MarkSixCodeModel[] = [];
}
export class MarkSixCodeModel {
    constructor() {
        this.LotteryCode = null;
        this.StartIssue = null;
    }
    LotteryCode: string;
    StartIssue: string;
}
export class MarkSixFiguresModel {
    constructor() {
        this.figures = null;
        this.color = null;
        this.zodiac = null;
        this.isPoultry = false;
    }
    figures: number;
    color: string;
    zodiac: string;
    isPoultry: boolean; // 是否家禽
}
export class ZodiacType {
    constructor() {
        this.zodiac = null;
        this.isPoultry = false;
    }
    zodiac: string;
    isPoultry: boolean;
}
export class BrickModel {
    constructor() {
        this.BlockTime = null;
        this.HasMorePlayModeType = null;
        this.ID = null;
        this.IsAuto = null;
        this.IsFire = null;
        this.IsHot = null;
        this.IsNew = null;
        this.IsRecommend = null;
        this.LotteryCode = null;
        this.LotteryName = null;
        this.LotteryOpen = null;
        this.LotteryPlayMode = null;
        this.LotteryPlayModeCode = null;
        this.LotteryPlayModeName = null;
        this.LotteryType = null;
        this.LotteryTypeCode = null;
        this.LotteryTypeName = null;
        this.NumLength = null;
        this.OfficialWeb = null;
        this.OpenLength = null;
        this.PlayMode = null;
        this.PlayModes = null;
        this.Propertys = null;
        this.RecommendSerials = null;
        this.RewardDown = null;
        this.RewardUp = null;
        this.SerialsID = null;
        this.State = null;
    }
    BlockTime: number;
    HasMorePlayModeType: number;
    ID: number;
    IsAuto: number;
    IsFire: boolean;
    IsHot: boolean;
    IsNew: boolean;
    IsRecommend: boolean;
    LotteryCode: string;
    LotteryName: string;
    LotteryOpen: null;
    LotteryPlayMode: null;
    LotteryPlayModeCode: string;
    LotteryPlayModeName: string;
    LotteryType: string;
    LotteryTypeCode: null;
    LotteryTypeName: string;
    NumLength: number;
    OfficialWeb: null;
    OpenLength: number;
    PlayMode: null;
    PlayModes: null;
    Propertys: null;
    RecommendSerials: number;
    RewardDown: number;
    RewardUp: number;
    SerialsID: number;
    State: string;
}
