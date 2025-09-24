import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password } = await req.json();
        console.log(username, email, password);
    } catch (e) {
        console.log(e);
    }
};
