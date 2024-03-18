"use server"

import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/django_api/login';
import { logout } from '@/django_api/logout';
import { destroyCookie } from 'nookies'; 

type loginUser= {
    account:{id:number,username:string},
    token:string; 
}| null

interface CustomCookies {
    loginUser?: loginUser;
}


export async function POST(req: NextRequest) {
    try {
        const { formData } = await req.json();
        const data = await login(formData);
        console.log('Login', data.account);

        if (data.error) {
            throw new Error('Failed to login');
        }

        // save in Cookie
        const dataAsString = JSON.stringify(data);
        const res = NextResponse.json({ success: true, dataAsString }, { status: 200 });
        res.cookies.set("loginId", data.account.id.toString());
        res.cookies.set("loginUsername", data.account.username);
        res.cookies.set("loginToken", data.token);
        return res;
    } catch (error: any) {
        console.error('Login error:', error.message);
        // return res.json(data); 
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
       // Get user information from cookies
        const loginId = req.cookies.get("loginId")?.value;
        const loginUsername = req.cookies.get("loginUsername")?.value;
        const loginToken = req.cookies.get("loginToken")?.value;
        
        // Check if loginId, loginUsername, and loginToken are defined
        const account = (loginId && loginUsername) ? { id: loginId, username: loginUsername } : null;
        const token = loginToken || null;

        // Reconstruct the loginUser object
        const loginUser = {
            account,
            token
        };
        return NextResponse.json(loginUser, { status: 200 });
    } catch (error: any) {
        console.error('Error while fetching login user info:', error.message);
        return NextResponse.json({ success: false, error: 'Failed to fetch login user info' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const loginToken = req.cookies.get("loginToken")?.value;
        // Logout in Django
        const res = await logout(loginToken);
        // Clear session if logout successful in Client
        if (res.error) {
            throw new Error('Failed to logout');
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error while logging out:', error);

        return NextResponse.json({ success: false, error: 'Failed to logout' }, { status: 500 });
    }
}
