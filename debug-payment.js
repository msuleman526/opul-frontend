// Frontend debugging script - add this to your payment.html temporarily for debugging

function debugPaymentRequest() {
  console.log('🔍 Debugging Payment Request');
  console.log('============================');
  
  // Get current values
  const requestId = new URLSearchParams(window.location.search).get('requestId');
  const amount = parseFloat(new URLSearchParams(window.location.search).get('amount')) || 0;
  
  console.log('URL Parameters:');
  console.log('- requestId:', requestId);
  console.log('- amount:', amount);
  console.log('- currentPaymentMethod:', currentPaymentMethod);
  
  // Create the exact request that would be sent
  const requestData = {
    requestId: requestId,
    amount: amount,
    currency: 'USD',
    paymentMethod: currentPaymentMethod
  };
  
  console.log('\nRequest Data to be sent:');
  console.log(JSON.stringify(requestData, null, 2));
  
  // Validate the data
  console.log('\nValidation Check:');
  console.log('- requestId valid:', requestId ? '✅' : '❌ Missing');
  console.log('- amount valid:', amount > 0 ? '✅' : '❌ Invalid');
  console.log('- paymentMethod valid:', ['paypal', 'stripe'].includes(currentPaymentMethod) ? '✅' : '❌ Invalid');
  
  return requestData;
}

// Add this to your payment.html to test
async function testPaymentAPI() {
  const requestData = debugPaymentRequest();
  
  console.log('\n📡 Testing API call...');
  
  try {
    const response = await fetch(`${API_BASE}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();
    
    console.log('\n📥 API Response:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      console.log('\n❌ API Error Details:');
      if (data.errors) {
        data.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error}`);
        });
      }
    }
    
  } catch (error) {
    console.log('\n💥 Network Error:', error.message);
  }
}

// Call this function in your browser console to debug
console.log('🛠️ Debugging functions loaded!');
console.log('Run debugPaymentRequest() or testPaymentAPI() in console to debug');
