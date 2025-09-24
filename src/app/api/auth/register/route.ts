import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { validateEmail, validatePassword } from '@/lib/validateAuth';

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        // Простая валидация (можно доработать)
        if (!username || !email || !password) {
            return NextResponse.json(
                {
                    message: 'Все поля обязательны',
                    label: ['username', 'email', 'password'],
                },
                { status: 400 },
            );
        }

        // Валидация email
        if (!validateEmail(email)) {
            return NextResponse.json(
                { message: 'Некорректный email', label: 'email' },
                { status: 400 },
            );
        }

        // Валидация пароля
        if (!validatePassword(password)) {
            return NextResponse.json(
                {
                    message:
                        'Пароль должен быть не меньше 6 символов, содержать хотя бы одну заглавную букву и одну цифру',
                    label: 'password',
                },
                { status: 400 },
            );
        }

        // Проверка, существует ли пользователь
        const exists = db
            .prepare('SELECT id FROM users WHERE email = ?')
            .get(email);
        if (exists) {
            return NextResponse.json(
                { message: 'Пользователь уже зарегистрирован', label: 'email' },
                { status: 409 },
            );
        }

        // Хэш пароля
        const hash = await bcrypt.hash(password, 10);

        // Сохраняем пользователя
        const stmt = db.prepare(
            'INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)',
        );
        const info = stmt.run(email, username, hash);

        return NextResponse.json(
            { id: info.lastInsertRowid, email, username },
            { status: 201 },
        );
    } catch (e: any) {
        console.error('Ошибка регистрации:', e);
        return NextResponse.json(
            { message: 'Ошибка сервера' },
            { status: 500 },
        );
    }
}
