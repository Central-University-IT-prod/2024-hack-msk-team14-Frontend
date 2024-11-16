import type {integer} from "vscode-languageserver-types";



export type EventShortData = {
    id: string,
    name: string,
    isPayed: boolean,
    sum: number
}
export type LoginResponse = {
    token: string,
    isNew: boolean
}
export type TgUser = {
    telegramId: string,
    firstName: string,
    lastName: string,
    username: string | undefined
}

export type SumDebt = {
    youOwe: number,
    theyOwe: number
}

export type EventItem = {
    id: string,
    groupId: string,
    name: string,
    price: number,
    quantity: number,
    lender: Lender
}

export type EventMember = {
    userId: number,
    eventId: string,
    event: EventApi,
    debts: Array<DebtApi>,
    lendItems: Array<EventItem>,
    user: TgUser
}

export type Lender = {
    userId: number,
    eventId: string,
    event: EventApi,
    debts: DebtApi,
    lendItems: EventItem,
    user: TgUser
}

export type EventApi = {
    id: string,
    name: string,
    creator: TgUser,
    lockedDate: string,
    itemGroups: Array<ItemGroup>,
    lendType: string,
    totalSum: number,
    members: Array<Lender>
}

export type DebtApi = {
    id: string,
    sum: number,
    item: EventApi,
    member: Lender,
    paid: boolean
}

export type ItemGroup = {
    id: string,
    name: string,
    createDate: string,
    items: Array<EventItem>
}