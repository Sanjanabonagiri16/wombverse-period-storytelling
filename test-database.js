// Test script to verify database connectivity
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zxcczifkldwuelhibbwm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y2N6aWZrbGR3dWVsaGliYndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjUzNjYsImV4cCI6MjA2NTU0MTM2Nn0.KsYrIB-R6_OdUTXd8jGH4fDwpvkBq2Pz1k2332YTZso";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testDatabase() {
  console.log('Testing database connection...');
  
  try {
    // Test 1: Basic connection
    console.log('\n1. Testing basic connection...');
    const { data, error } = await supabase
      .from('stories')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error);
      return;
    }
    console.log('✅ Basic connection successful');
    
    // Test 2: Check if stories table exists
    console.log('\n2. Checking stories table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('stories')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.error('❌ Stories table error:', tableError);
      return;
    }
    console.log('✅ Stories table exists and is accessible');
    
    // Test 3: Check if bookmarks table exists
    console.log('\n3. Checking bookmarks table...');
    const { data: bookmarksInfo, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*')
      .limit(0);
    
    if (bookmarksError) {
      console.log('⚠️  Bookmarks table error (might not exist):', bookmarksError.message);
    } else {
      console.log('✅ Bookmarks table exists and is accessible');
    }
    
    // Test 4: Check if reactions table exists
    console.log('\n4. Checking reactions table...');
    const { data: reactionsInfo, error: reactionsError } = await supabase
      .from('reactions')
      .select('*')
      .limit(0);
    
    if (reactionsError) {
      console.log('⚠️  Reactions table error (might not exist):', reactionsError.message);
    } else {
      console.log('✅ Reactions table exists and is accessible');
    }
    
    // Test 5: Check if comments table exists
    console.log('\n5. Checking comments table...');
    const { data: commentsInfo, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .limit(0);
    
    if (commentsError) {
      console.log('⚠️  Comments table error (might not exist):', commentsError.message);
    } else {
      console.log('✅ Comments table exists and is accessible');
    }
    
    // Test 6: Check RLS policies
    console.log('\n6. Testing RLS policies (this will fail without auth, which is expected)...');
    const { data: insertTest, error: insertError } = await supabase
      .from('stories')
      .insert({
        title: 'Test Story',
        content: 'Test content',
        emotion_tags: ['test'],
        privacy: 'public',
        category: 'other',
        is_anonymous: false,
        is_draft: true,
        user_id: '00000000-0000-0000-0000-000000000000' // Invalid user ID
      });
    
    if (insertError) {
      console.log('✅ RLS is working (expected error for invalid user):', insertError.message);
    } else {
      console.log('⚠️  RLS might not be properly configured');
    }
    
    console.log('\n🎉 Database tests completed!');
    console.log('\nNext steps:');
    console.log('1. Make sure you are signed in to the app');
    console.log('2. Check browser console for detailed error messages');
    console.log('3. Use the debug tools in the Create Story form');
    console.log('4. Run the database-setup.sql script if tables are missing');
    
  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

testDatabase(); 