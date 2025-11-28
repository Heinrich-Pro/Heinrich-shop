import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parsing to avoid needing 'dotenv' package
try {
  const envPath = path.resolve(process.cwd(), '.env');
  console.log('📂 CWD:', process.cwd());
  console.log('📄 Looking for .env at:', envPath);
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file found!');
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    console.log('📝 File content length:', envConfig.length);
    
    envConfig.split(/\r?\n/).forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
        process.env[key] = value;
        if (key.includes('SUPABASE')) {
             console.log(`🔑 Loaded key: ${key}`);
        }
      }
    });
  } else {
    console.error('❌ .env file NOT found at:', envPath);
    // Try listing files in CWD
    console.log('📂 Files in CWD:', fs.readdirSync(process.cwd()));
  }
} catch (e) {
  console.warn('⚠️ Error reading .env file:', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use Service Role Key to bypass RLS policies for this test
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

console.log('🔑 Using key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE (Admin)' : 'ANON (Public)');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testing connection to:', supabaseUrl);
  
  try {
    // 1. Check public.users table
    const { data: users, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' });

    if (error) {
      console.error('❌ Query failed:', error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log(`📊 Found ${count} users in 'public.users' table.`);
      if (users && users.length > 0) {
        console.log('📋 User List:');
        users.forEach(u => console.log(`   - ${u.email} (Role: ${u.role})`));
      } else {
        console.log('⚠️ Table is empty or RLS is blocking access (if not using Service Key).');
      }
    }

    // 2. Check auth.users (requires Service Role)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();
        if (authError) {
             console.error('❌ Auth Admin Query failed:', authError.message);
        } else {
             console.log(`🔐 Found ${authUsers.length} users in 'auth.users' (Supabase Auth).`);
             authUsers.forEach(u => console.log(`   - ${u.email} (ID: ${u.id})`));
        }
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testConnection();
