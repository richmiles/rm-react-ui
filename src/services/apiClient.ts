import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiErrors } from '../types/ApiErrors';
import { AuthToken } from '../types/AuthToken';
import { RegistrationDto } from '../types/RegistrationDto';
import { LoginDto } from '../types/LoginDto';
import * as Sentry from "@sentry/react";
import { ForgotPasswordDto } from '../types/ForgotPasswordDto';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const storeTokenInLocalStorage = (authToken: AuthToken): void => {
    const expiresInMs = authToken.expiresIn * 1000;
    const tokenExpiresAt = Date.now() + expiresInMs;

    localStorage.setItem('authToken', authToken.token);
    localStorage.setItem('authTokenExpiresAt', tokenExpiresAt.toString());
}

const getTokenFromLocalStorage = (): AuthToken | null => {
    const token = localStorage.getItem('authToken');
    const tokenExpiresAt = localStorage.getItem('authTokenExpiresAt');

    if (!token || !tokenExpiresAt) {
        return null;
    }

    const expiresIn = parseInt(tokenExpiresAt) - Date.now();

    return {
        token,
        expiresIn,
    };
}


const refreshToken = async (authToken: AuthToken): Promise<AuthToken> => {
    const response = await apiClient.post<AuthToken>('auth/refreshtoken', authToken);
    const newAccessToken = response.data;
    storeTokenInLocalStorage(newAccessToken);
    return newAccessToken;
}

async function checkAndRefreshToken(): Promise<AuthToken | null> {
    const authToken = getTokenFromLocalStorage();
    if (!authToken) {
        throw new Error('No refresh token found');
    }

    if (authToken.expiresIn <= 0) {
        return await refreshToken(authToken);
    }
    return authToken;
}


const setAccessTokenHeader = async (): Promise<void> => {
    const accessToken = await checkAndRefreshToken();
    if (accessToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken.token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

export const getData = async <T>(url: string): Promise<AxiosResponse<T>> => {
    await setAccessTokenHeader();
    return await apiClient.get<T>(url);
}

export const postData = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    await setAccessTokenHeader();
    return await apiClient.post<T>(url, data);
}

export const login = async (credentials: LoginDto): Promise<AxiosResponse<AuthToken | ApiErrors>> => {
    const response = await apiClient.post<AuthToken>('auth/login', credentials);
    const authToken = response.data;
    storeTokenInLocalStorage(authToken);
    return response;
};

export const register = async (registrationData: RegistrationDto): Promise<AuthToken | ApiErrors> => {
    try{
    const response = await apiClient.post<AuthToken>('auth/register', registrationData);
    const authToken = response.data;
    storeTokenInLocalStorage(authToken);
    return authToken;
    } catch (error: any) {
        error = error as AxiosError;
        if (error.response?.status === 400) {
            var errorData = error.response.data as ApiErrors
            return errorData;
        } else {
            Sentry.captureException(error);
            console.error(error)
            return [{code: "500", description: "Something went wrong. Please try again later."}]
        }
    }
};

export const forgotPassword = async (data: ForgotPasswordDto): Promise<boolean> => {
    try {
        await apiClient.post('auth/forgot-password', data);
        return true;
    } catch (error: any) {
        Sentry.captureException(error);
        console.error(error)
        return false;
    }

  };
