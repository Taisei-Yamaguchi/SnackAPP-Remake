import { NextRequest, NextResponse } from 'next/server';

export const setAuthInfo = (res: NextResponse<unknown>, authInfo: { account: { id: number; username: string }; token: string }) => {
    res.cookies.set('authInfo', JSON.stringify(authInfo), {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
};  

export const getAuthInfo = (req: NextRequest) => {
    const authCookie = req.cookies.get('authInfo');
    if (authCookie && typeof authCookie === 'string') {
        return JSON.parse(authCookie);
    }
    return null;
};

// export const clearAuthInfo = (res: NextResponse<unknown>) => {
//     res.cookies.clear('authInfo', {
//         path: '/',
//     });
// };
