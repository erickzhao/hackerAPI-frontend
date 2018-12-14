import Account from '../api/account';
import Hacker from '../api/hacker';
import { IAccount, UserType, IHacker } from '../config/userTypes';

export function userCanAccessCreateApplicationPage(user: IAccount) {
    return user.confirmed && user.accountType === UserType.HACKER;
}

export async function isLoggedIn(): Promise<boolean> {
    try {
        const userInfo = await getUserInfo();
        return Boolean(userInfo);
    } catch (error) {
        return false;
    }
}

/**
 * Returns whether the current user is confirmed
 */
export async function isConfirmed(): Promise<boolean> {
    try {
        const response = await Account.getSelf();
        const user = response.data.data;
        return Boolean(user) && user.confirmed;
    } catch (error) {
        return false;
    }
}

export async function getUserInfo(): Promise<IAccount | null> {
    try {
        const response = await Account.getSelf();
        return response.data.data;
    } catch (error) {
        return null;
    }
}

export async function getHackerInfo(): Promise<IHacker | null> {
    try {
        const response = await Hacker.getSelf();
        return response.data.data;
    } catch (error) {
        return null;
    }
}
