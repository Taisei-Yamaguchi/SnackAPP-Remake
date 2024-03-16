"use server"

import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/django_api/logout';

export async function DELETE(req: NextRequest) {
    try {
        const loginToken = req.cookies.get("loginToken")?.value;
        console.log(loginToken)
        // Logout in Django
        const res = await logout(loginToken);
        console.log(res)

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
