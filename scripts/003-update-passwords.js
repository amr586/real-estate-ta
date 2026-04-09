import crypto from 'crypto';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function updatePasswords() {
  const password = 'password123';
  const hashedPassword = await hashPassword(password);
  
  console.log('Generated hash:', hashedPassword);
  
  // Update all test users with the new password hash
  const users = [
    'superadmin@realestate.com',
    'subadmin@realestate.com', 
    'user@realestate.com',
    'amrw4634@gmail.com'
  ];
  
  for (const email of users) {
    await sql`UPDATE users SET password_hash = ${hashedPassword} WHERE email = ${email}`;
    console.log(`Updated password for: ${email}`);
  }
  
  console.log('All passwords updated successfully!');
  console.log('Password for all users: password123');
}

updatePasswords().catch(console.error);
