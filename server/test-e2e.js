const http = require('http');

// Helper to make HTTP requests
const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
};

const runE2ETests = async () => {
  console.log('====================================================');
  console.log("   SOHELI'S MERN E-COMMERCE END-TO-END TEST SUITE   ");
  console.log('====================================================\n');

  const { app, server } = require('./server');

  // Wait 1000ms for server to initialize
  await new Promise((r) => setTimeout(r, 1000));
  const port = server.address().port;

  let adminToken = '';
  let createdProductId = '';
  let placedOrderId = '';

  try {
    // 1. Health check
    console.log('[Test 1] GET /api/health');
    const healthRes = await request({
      hostname: '127.0.0.1',
      port,
      path: '/api/health',
      method: 'GET',
    });
    console.log(`Status: ${healthRes.status}, Body:`, healthRes.data);
    if (healthRes.status !== 200 || healthRes.data?.status !== 'ok') {
      throw new Error(`Health check failed with status: ${healthRes.status}`);
    }
    console.log('PASS: Health Check\n');

    // 2. Admin Login
    console.log('[Test 2] POST /api/auth/login');
    const loginRes = await request(
      {
        hostname: '127.0.0.1',
        port,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        email: 'admin@sohelis.com',
        password: 'admin123',
      }
    );
    console.log(`Status: ${loginRes.status}, User:`, loginRes.data?.user?.email);
    if (loginRes.status !== 200 || !loginRes.data?.user?.token) {
      throw new Error(`Admin login failed: ${JSON.stringify(loginRes.data || loginRes.raw)}`);
    }
    adminToken = loginRes.data.user.token;
    console.log('PASS: Admin Login with JWT token\n');

    // 3. Verify /api/auth/me
    console.log('[Test 3] GET /api/auth/me (Protected)');
    const meRes = await request({
      hostname: '127.0.0.1',
      port,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Status: ${meRes.status}, Role:`, meRes.data?.user?.role);
    if (meRes.status !== 200 || meRes.data?.user?.role !== 'admin') {
      throw new Error(`Get Me profile failed: ${JSON.stringify(meRes.data || meRes.raw)}`);
    }
    console.log('PASS: Protected Auth Profile Verified\n');

    // 4. GET /api/products
    console.log('[Test 4] GET /api/products');
    const productsRes = await request({
      hostname: '127.0.0.1',
      port,
      path: '/api/products',
      method: 'GET',
    });
    console.log(`Status: ${productsRes.status}, Product Count: ${productsRes.data?.count}`);
    if (productsRes.status !== 200 || !productsRes.data?.products?.length) {
      throw new Error(`Failed to fetch products: ${JSON.stringify(productsRes.data || productsRes.raw)}`);
    }
    console.log('Sample Product:', productsRes.data.products[0].name);
    console.log('PASS: Products Listing\n');

    // 5. Admin POST /api/products (Create new product)
    console.log('[Test 5] POST /api/products (Admin)');
    const newProductPayload = {
      name: 'টেস্ট ময়ূরপঙ্খী নকশী কাঁথা শাড়ি (Test Peacock Nakshi Sari)',
      category: 'Sari',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      description: 'টেস্টিং এর জন্য তৈরি এক্সক্লুসিভ ময়ূর মোটিফ নকশী কাঁথা শাড়ি।',
      stock: 5,
      fabric: 'Tussar Silk',
      featured: true,
    };
    const createProdRes = await request(
      {
        hostname: '127.0.0.1',
        port,
        path: '/api/products',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      },
      newProductPayload
    );
    console.log(`Status: ${createProdRes.status}, Product ID:`, createProdRes.data?.product?._id);
    if (createProdRes.status !== 201 || !createProdRes.data?.product?._id) {
      throw new Error(`Failed to create product: ${JSON.stringify(createProdRes.data || createProdRes.raw)}`);
    }
    createdProductId = createProdRes.data.product._id;
    console.log('PASS: Admin Created New Product\n');

    // 6. GET /api/products/:id
    console.log(`[Test 6] GET /api/products/${createdProductId}`);
    const singleProdRes = await request({
      hostname: '127.0.0.1',
      port,
      path: `/api/products/${createdProductId}`,
      method: 'GET',
    });
    console.log(`Status: ${singleProdRes.status}, Name:`, singleProdRes.data?.product?.name);
    if (singleProdRes.status !== 200) {
      throw new Error(`Failed to get product by ID: ${JSON.stringify(singleProdRes.data || singleProdRes.raw)}`);
    }
    console.log('PASS: Single Product Fetch\n');

    // 7. Customer Checkout: POST /api/orders
    console.log('[Test 7] POST /api/orders (Customer Order Submission)');
    const orderPayload = {
      customerName: 'নুসরাত জাহান',
      phone: '01819876543',
      address: 'রোড ৪, বাড়ি ১৬, উত্তরা সেক্টর ৭, ঢাকা',
      district: 'Dhaka',
      paymentMethod: 'Cash on Delivery',
      shippingFee: 80,
      notes: 'জরুরি ডেলিভারি প্রয়োজন',
      items: [
        {
          productId: createdProductId,
          name: newProductPayload.name,
          price: 5800,
          quantity: 2,
        },
      ],
    };
    const orderRes = await request(
      {
        hostname: '127.0.0.1',
        port,
        path: '/api/orders',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      orderPayload
    );
    console.log(`Status: ${orderRes.status}, Order ID:`, orderRes.data?.order?._id);
    console.log(`Total Amount: ৳ ${orderRes.data?.order?.totalAmount}`);
    if (orderRes.status !== 201 || !orderRes.data?.order?._id) {
      throw new Error(`Failed to place order: ${JSON.stringify(orderRes.data || orderRes.raw)}`);
    }
    placedOrderId = orderRes.data.order._id;
    console.log('PASS: Order Placed Successfully\n');

    // 8. Verify Stock Deduction (Was 5, ordered 2 -> should be 3)
    console.log('[Test 8] Verify Inventory Stock Deduction');
    const checkStockRes = await request({
      hostname: '127.0.0.1',
      port,
      path: `/api/products/${createdProductId}`,
      method: 'GET',
    });
    console.log(`Updated Stock for product: ${checkStockRes.data?.product?.stock} (Expected: 3)`);
    if (checkStockRes.data?.product?.stock !== 3) {
      throw new Error(`Stock deduction check failed. Expected 3, got: ${checkStockRes.data?.product?.stock}`);
    }
    console.log('PASS: Inventory Stock Accurately Deducted\n');

    // 9. Admin View Orders: GET /api/orders
    console.log('[Test 9] GET /api/orders (Admin Dashboard)');
    const allOrdersRes = await request({
      hostname: '127.0.0.1',
      port,
      path: '/api/orders',
      method: 'GET',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Status: ${allOrdersRes.status}, Orders Count: ${allOrdersRes.data?.count}`);
    console.log('Dashboard Stats:', allOrdersRes.data?.stats);
    if (allOrdersRes.status !== 200 || allOrdersRes.data?.count < 1) {
      throw new Error(`Failed to fetch orders for admin: ${JSON.stringify(allOrdersRes.data || allOrdersRes.raw)}`);
    }
    console.log('PASS: Admin Orders Retrieval & Dashboard Metrics\n');

    // 10. Admin Update Order Status: PUT /api/orders/:id/status
    console.log(`[Test 10] PUT /api/orders/${placedOrderId}/status (Change to Shipped)`);
    const updateStatusRes = await request(
      {
        hostname: '127.0.0.1',
        port,
        path: `/api/orders/${placedOrderId}/status`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      },
      { status: 'Shipped' }
    );
    console.log(`Status: ${updateStatusRes.status}, New Order Status:`, updateStatusRes.data?.order?.status);
    if (updateStatusRes.status !== 200 || updateStatusRes.data?.order?.status !== 'Shipped') {
      throw new Error(`Failed to update order status: ${JSON.stringify(updateStatusRes.data || updateStatusRes.raw)}`);
    }
    console.log('PASS: Order Status Transition\n');

    // 10b. Customer Track Order: GET /api/orders/track/:query
    console.log(`[Test 10b] GET /api/orders/track/${placedOrderId} (Customer Order Tracking)`);
    const trackRes = await request({
      hostname: '127.0.0.1',
      port,
      path: `/api/orders/track/${placedOrderId}`,
      method: 'GET',
    });
    console.log(`Status: ${trackRes.status}, Found: ${trackRes.data?.count} order(s), Status:`, trackRes.data?.orders?.[0]?.status);
    if (trackRes.status !== 200 || trackRes.data?.orders?.[0]?.status !== 'Shipped') {
      throw new Error('Customer order tracking check failed');
    }
    console.log('PASS: Customer Real-time Order Tracking\n');

    // 11. Admin Delete Test Product: DELETE /api/products/:id
    console.log(`[Test 11] DELETE /api/products/${createdProductId} (Admin Clean-up)`);
    const deleteRes = await request({
      hostname: '127.0.0.1',
      port,
      path: `/api/products/${createdProductId}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Status: ${deleteRes.status}, Message:`, deleteRes.data?.message);
    if (deleteRes.status !== 200) {
      throw new Error(`Failed to delete product: ${JSON.stringify(deleteRes.data || deleteRes.raw)}`);
    }
    console.log('PASS: Admin Product Deletion\n');

    console.log('====================================================');
    console.log('   ALL 11 END-TO-END TESTS PASSED SUCCESSFULLY!    ');
    console.log('====================================================');

    server.close();
    process.exit(0);
  } catch (error) {
    console.error('\nFAIL: Test suite encountered an error:', error);
    if (server && server.close) server.close();
    process.exit(1);
  }
};

runE2ETests();
