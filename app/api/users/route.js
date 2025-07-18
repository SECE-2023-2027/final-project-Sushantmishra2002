import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

// POST /api/users (register)
export async function POST(req) {
  const { name, email, phone, dob, password } = await req.json();
  if (!name || !email || !dob || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Age validation (must be 14+)
  const dobDate = new Date(dob);
  const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age < 14) {
    return NextResponse.json({ error: 'You must be at least 14 years old' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection('users').findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { name, email, phone, dob, password: hashed, createdAt: new Date() };
  await db.collection('users').insertOne(user);
  return NextResponse.json({ message: 'User registered successfully' });
}
