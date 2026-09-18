import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'CONTENT_ADMIN'],
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Instance method to check a plaintext password against the stored hash
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

// Never send passwordHash back in any JSON response
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

export default mongoose.model('User', userSchema);
