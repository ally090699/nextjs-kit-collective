// src/app/api/user/update/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { isValidPhoneNumber } from 'libphonenumber-js';

const prisma = new PrismaClient();

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { firstname, lastname, password, confirmPassword, phone } = await request.json();

  // Basic validation
  if (firstname && (firstname.length < 2 || !/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(firstname))) {
    return NextResponse.json({ error: 'Invalid first name' }, { status: 400 });
  }

  if (lastname && (lastname.length < 2 || !/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(lastname))) {
    return NextResponse.json({ error: 'Invalid last name' }, { status: 400 });
  }

  if (password && (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/.test(password))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
  }

  if (password && confirmPassword && password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }

  if (phone && !isValidPhoneNumber(phone, 'CA')) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }

  try {
    const updateData = {};

    if (firstname) updateData.first_name = firstname;
    if (lastname) updateData.last_name = lastname;
    if (phone) updateData.phone_number = phone;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password_hash = hashedPassword;
    }

    const updatedUser = await prisma.users.update({
      where: { user_id: session.user.user_id },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}