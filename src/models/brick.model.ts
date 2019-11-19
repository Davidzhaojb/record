export class CachedModel {
    PlayMode: StorageLottery;
    PlayDetail: PlayDetailModel;
}

export class StorageLottery {
    LotteryCode: string;
    LotteryName: string;
}
export class PlayDetailModel {
    LotteryPlayDetailCode: string;
    LotteryPlayDetailName: string;
    LotteryPlayModeCode: string;
    State: string;
    SerialsID: number;
    AlgorithmCode: string;
    CardinalMoney: number;
    CardinalMoney1: number;
    Modulus: number;
    Modulus1: number;
    LimitBet: number;
    IsRewardFixed: boolean;
    IsAttached: boolean;
    PlayGroup: string;
    Algorithm: AlgorithmModel;
    PlayDetailAttacheds: PlayDetailAttachedModel[];
}
export class AlgorithmModel {
    AlgorithmCode: string;
    AlgorithmName: string;
    SerialsID: number;
    AlgorithmTypeCode: string;
    BetNumLength: number;
    TipInfo: string;
    PickExample: string;
    AlgorithmType: AlgorithmTypeModel;
}
export class PlayDetailAttachedModel {
    NumKey: string;
    LotteryPlayDetailCode: string;
    CardinalMoney: number;
    Modulus: number;
    SerialsID: number;
}
export class AlgorithmTypeModel {
    AlgorithmTypeCode: string;
    AlgorithmTypeName: string;
    State: string;
    LotteryTypeCode: string;
    SerialsID: number;
    PickMode: string;
    CanCommonRan: string;
}
