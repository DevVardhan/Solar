import 'dotenv/config';
import readline from 'readline';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';

function ask(question, hidden = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Print the prompt text normally first
    rl.output.write(question);

    if (hidden) {
      // After the prompt, mute further output so typed characters
      // (and the newline echo) don't show on screen.
      rl._writeToOutput = function () {};
    }

    rl.question('', (answer) => {
      rl.close();
      console.log('');
      resolve(answer.trim());
    });
  });
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log('=== Create Super Admin ===\n');
  const name = await ask('Name: ');
  const email = await ask('Email: ');
  const password = await ask('Password (min 8 chars): ', true);

  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.error('A user with this email already exists.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    passwordHash,
    role: 'SUPER_ADMIN',
    active: true,
  });

  console.log(`Super Admin "${email}" created successfully.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to create Super Admin:', err.message);
  process.exit(1);
});
