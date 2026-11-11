require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing products and admin user for clean seed
    await Product.deleteMany({});
    await User.deleteMany({ email: 'admin@sohelis.com' });

    console.log('[Seed] Cleared existing products and admin.');

    // Seed Admin User
    const adminUser = await User.create({
      name: "Soheli's Head Office",
      email: 'admin@sohelis.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`[Seed] Admin user created: ${adminUser.email}`);

    // Authentic Nakshi Kantha Products
    const products = [
      {
        name: 'সোহেলিস ক্লাসিক লাল নকশী কাঁথা শাড়ি (Classic Crimson Nakshi Kantha Sari)',
        category: 'Sari',
        price: 5200,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        description: 'প্রিমিয়াম সুতি ও তসর মিশ্রণে তৈরি নিখুঁত হাতে বোনা ট্র্যাডিশনাল পদ্ম ও কলকা মোটিফের লাল নকশী কাঁথা শাড়ি। আঁচলে ঘন কাঁথা স্টিচ ও সুতো কারুকাজ।',
        stock: 12,
        fabric: 'Pure Cotton & Tussar Blend',
        featured: true,
      },
      {
        name: 'কাজল কালো নকশী কাঁথা হাফ-সিল্ক শাড়ি (Midnight Noir Nakshi Half-Silk Sari)',
        category: 'Sari',
        price: 6800,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        description: 'গাঢ় কালো হাফ-সিল্ক কাপড়ে রঙিন রেশম সুতোর চমৎকার জ্যামিতিক ও ময়ূর নকশী কাঁথা কাজ। যেকোনো বিশেষ অনুষ্ঠান বা সান্ধ্যকালীন উৎসবের জন্য অনন্য।',
        stock: 8,
        fabric: 'Half-Silk with Silk Thread Stitch',
        featured: true,
      },
      {
        name: 'অফ-হোয়াইট প্যাস্টেল নকশী কাঁথা কটন শাড়ি (Pastel Ivory Nakshi Cotton Sari)',
        category: 'Sari',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        description: 'নরম অর্গানিক খাদি কটন ফ্যাব্রিকে সূক্ষ্ম প্যাস্টেল সুতোর নকশী কাঁথা ফিনিশিং। শান্ত ও আভিজাত্যপূর্ণ লুকের জন্য প্রতিদিন ও উৎসবে পরিধানযোগ্য।',
        stock: 15,
        fabric: 'Organic Khadi Cotton',
        featured: true,
      },
      {
        name: 'রয়াল ব্লু রেশমী নকশী কাঁথা থ্রি-পিস (Royal Blue Nakshi Kantha Three-Piece)',
        category: 'Three-Piece',
        price: 4800,
        image: 'https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=800&q=80',
        description: 'আভিজাত্যপূর্ণ রয়্যাল ব্লু জামা, সুতি ট্রাউজার এবং সম্পূর্ণ হাতে সেলাই করা ভারী নকশী কাঁথা ওড়না। আধুনিক কাটিং এর সাথে ঐতিহ্যবাহী মোটিফের মেলবন্ধন।',
        stock: 10,
        fabric: 'Linen Kurti with Cotton Kantha Dupatta',
        featured: true,
      },
      {
        name: 'টেরাকোটা গোল্ডেন নকশী কাঁথা থ্রি-পিস (Terracotta Golden Nakshi Three-Piece)',
        category: 'Three-Piece',
        price: 5400,
        image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
        description: 'মাটির গন্ধমাখা লালচে টেরাকোটা শেডের আরামদায়ক কুর্তি ও অ্যান্টিক গোল্ডেন সুতোর নিখুঁত নকশী কাঁথা ওড়না। শতভাগ গ্রামীণ কারিগরদের ভালোবাসা।',
        stock: 7,
        fabric: 'Handloom Cotton & Silk Thread',
        featured: true,
      },
      {
        name: 'সরিষা হলুদ নকশী কাঁথা টু-পিস সেট (Mustard Yellow Hand-Stitched Two-Piece)',
        category: 'Two-Piece',
        price: 3600,
        image: 'https://images.unsplash.com/photo-1596783074418-472714c62953?auto=format&fit=crop&w=800&q=80',
        description: 'উজ্জ্বল সরিষা হলুদ সুতি কুর্তি ও জমকালো নকশী কাঁথা দুপাট্টা। যেকোনো বসন্ত উৎসব, মেলা বা পারিবারিক আয়োজনে অসাধারণ মানানসই।',
        stock: 14,
        fabric: 'Pure Cotton',
        featured: false,
      },
      {
        name: 'এমেরাল্ড গ্রিন ট্র্যাডিশনাল নকশী কাঁথা শাড়ি (Emerald Green Heritage Nakshi Sari)',
        category: 'Sari',
        price: 5900,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        description: 'পান্না সবুজ রঙের জমিনে সাদা ও লাল সূক্ষ্ম কাঁথা ফোঁড়ের বৈচিত্র্যময় নকশা। গ্রামীণ শিল্পীদের কয়েক সপ্তাহের অক্লান্ত পরিশ্রমের সৃষ্টি।',
        stock: 6,
        fabric: 'Handloom Cotton Blend',
        featured: true,
      },
      {
        name: 'ল্যাভেন্ডার ড্রিম নকশী কাঁথা থ্রি-পিস (Lavender Dream Nakshi Three-Piece)',
        category: 'Three-Piece',
        price: 4900,
        image: 'https://images.unsplash.com/photo-1583391733975-0814a0f4439c?auto=format&fit=crop&w=800&q=80',
        description: 'হালকা ল্যাভেন্ডার প্যাস্টেল শেডে আধুনিক ফিউশন কাট কুর্তি ও নজরকাড়া নকশী কাঁথা ওড়না। আধুনিক তরুণীদের ফ্যাশন চাহিদায় শীর্ষ পছন্দ।',
        stock: 9,
        fabric: 'Breathable Cotton & Viscose Blend',
        featured: false,
      },
    ];

    await Product.insertMany(products);
    console.log(`[Seed] Successfully seeded ${products.length} Nakshi Kantha products!`);

    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();

