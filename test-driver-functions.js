// Driver Dashboard Function Test
// Add this to browser console to test functions

console.log('🧪 Testing Driver Dashboard Functions');
console.log('=====================================');

// Test if functions are defined
const functions = [
  'loadAvailableRides',
  'forceRefreshRides', 
  'makeOffer',
  'toggleOnlineStatus',
  'logout',
  'showNotification'
];

functions.forEach(funcName => {
  if (typeof window[funcName] === 'function') {
    console.log(`✅ ${funcName}: Defined`);
  } else {
    console.log(`❌ ${funcName}: NOT DEFINED`);
  }
});

// Test calling loadAvailableRides
console.log('\n🧪 Testing loadAvailableRides function...');
try {
  if (typeof loadAvailableRides === 'function') {
    console.log('✅ loadAvailableRides function exists');
    console.log('ℹ️  Function will only load rides if driver is online');
  } else {
    console.log('❌ loadAvailableRides function missing');
  }
} catch (error) {
  console.log('❌ Error testing loadAvailableRides:', error.message);
}

// Test calling forceRefreshRides (bypasses online check)
console.log('\n🧪 Testing forceRefreshRides function...');
try {
  if (typeof forceRefreshRides === 'function') {
    console.log('✅ forceRefreshRides function exists');
    console.log('ℹ️  This function bypasses online check for debugging');
  } else {
    console.log('❌ forceRefreshRides function missing');
  }
} catch (error) {
  console.log('❌ Error testing forceRefreshRides:', error.message);
}
