-- Seed test users with hashed passwords
-- Password for all users: "password123"
-- Using bcrypt hash from: https://bcrypt-generator.com/

-- Super Admin user
INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_active)
VALUES (
  'Super',
  'Admin',
  'superadmin@realestate.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '+201281378331',
  'super_admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;

-- Sub Admin user
INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_active)
VALUES (
  'Sub',
  'Admin',
  'subadmin@realestate.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '+201281378331',
  'sub_admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;

-- Regular user
INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_active)
VALUES (
  'Test',
  'User',
  'user@realestate.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '+201281378331',
  'user',
  true
) ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;

-- Owner user (Amr)
INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_active)
VALUES (
  'Amr',
  'Ahmed',
  'amrw4634@gmail.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  '+201281378331',
  'super_admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;
