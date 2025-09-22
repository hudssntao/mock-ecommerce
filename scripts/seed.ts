import { Product } from "../src/db/entities/Product";
import { getEM, getORM } from "../src/db/orm";

const sampleProducts = [
  {
    name: 'MacBook Pro 16"',
    description:
      "Apple MacBook Pro 16-inch with M2 Pro chip, 16GB RAM, and 512GB SSD. Perfect for professional work and creative tasks. Features a stunning Liquid Retina XDR display with ProMotion technology, delivering exceptional color accuracy and brightness up to 1600 nits. The advanced thermal design ensures sustained performance during intensive workflows. Includes three Thunderbolt 4 ports, HDMI port, SDXC card slot, and MagSafe 3 charging. The Magic Keyboard provides a comfortable typing experience with backlit keys, while the Force Touch trackpad offers precise cursor control and pressure-sensing capabilities for enhanced productivity.",
    price: 2499.99,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1028&h=408&fit=crop",
  },
  {
    name: "iPhone 15 Pro",
    description:
      "Latest iPhone 15 Pro with titanium design, A17 Pro chip, and advanced camera system. Available in natural titanium. Features a revolutionary 48MP Main camera with 2x Telephoto capabilities, allowing for stunning photography in any lighting condition. The titanium construction makes it the lightest Pro model ever while maintaining incredible durability. Equipped with the Action Button for customizable shortcuts and USB-C connectivity for universal compatibility. The 6.1-inch Super Retina XDR display with ProMotion delivers smooth scrolling and responsive touch. Advanced computational photography features include Night mode portraits, Smart HDR 5, and Cinematic mode for professional-quality videos with shallow depth of field effects.",
    price: 999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1028&h=408&fit=crop",
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life. Features Sony's V1 processor and dual noise sensor technology that adapts to your environment in real-time. The 30mm drivers deliver rich, detailed audio across all frequencies with LDAC codec support for high-resolution wireless audio. Comfortable over-ear design with soft, pressure-relieving earpads perfect for extended listening sessions. Quick Attention mode lets you hear ambient sounds without removing the headphones, while Speak-to-Chat automatically pauses music when you start talking. Multipoint connection allows seamless switching between two Bluetooth devices, and the companion app provides extensive customization options for sound profiles and noise cancellation settings.",
    price: 399.99,
    imageUrl:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1028&h=408&fit=crop",
  },
  {
    name: "Samsung 4K Monitor",
    description:
      "32-inch 4K UHD curved monitor with HDR support, perfect for gaming and professional work. USB-C connectivity included. The 1800R curvature provides an immersive viewing experience that reduces eye strain during long work sessions. Supports HDR10+ with quantum dot technology for vibrant colors and deep contrasts. Features a 144Hz refresh rate with AMD FreeSync Premium Pro for smooth, tear-free gaming. The monitor includes multiple connectivity options: USB-C with 90W power delivery, DisplayPort 1.4, HDMI 2.1, and a built-in USB hub for peripherals. Height-adjustable stand with tilt, swivel, and pivot functionality ensures optimal ergonomics. The Eye Saver Mode and Flicker-Free technology protect your eyes during extended use, while Picture-by-Picture mode allows multitasking with multiple input sources simultaneously.",
    price: 549.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1028&h=408&fit=crop",
  },
  {
    name: "Mechanical Keyboard",
    description:
      "Premium mechanical keyboard with Cherry MX switches, RGB backlighting, and programmable keys for ultimate typing experience. Features genuine Cherry MX Blue switches that provide tactile feedback and audible click for satisfying keystrokes. Per-key RGB backlighting with 16.7 million colors and multiple lighting effects, including reactive typing, wave patterns, and custom profiles. Aluminum top plate construction ensures durability and premium feel, while the detachable USB-C cable offers flexibility for desk setup. Includes dedicated media keys, volume wheel, and programmable macro keys that can be customized through advanced software. N-key rollover and anti-ghosting technology ensure every keystroke is registered accurately during intense gaming sessions. Compatible with Windows and macOS, with additional keycaps included for different layouts and gaming optimization.",
    price: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=1028&h=408&fit=crop",
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking, customizable buttons, and long-lasting battery. Perfect for productivity. Features a high-precision 16,000 DPI sensor with adjustable sensitivity settings for different tasks, from detailed design work to fast-paced gaming. The contoured shape fits naturally in your hand, reducing fatigue during extended use. Six programmable buttons can be customized for shortcuts, macros, or application-specific functions through intuitive software. Dual connectivity options include 2.4GHz wireless with nano receiver and Bluetooth 5.0 for seamless device switching. The rechargeable battery lasts up to 70 days on a single charge, with fast charging providing a full day's use in just 3 minutes. Silent click technology reduces noise by 90% compared to traditional mice, making it ideal for quiet work environments and late-night productivity sessions.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1028&h=408&fit=crop",
  },
  {
    name: "iPad Air",
    description:
      "Powerful and versatile iPad Air with M1 chip, 10.9-inch Liquid Retina display, and support for Apple Pencil. The M1 chip delivers desktop-class performance with 8-core CPU and 8-core GPU, making it perfect for demanding creative apps, multitasking, and professional workflows. The 10.9-inch Liquid Retina display features P3 wide color gamut, True Tone technology, and anti-reflective coating for stunning visuals in any lighting condition. Compatible with Apple Pencil (2nd generation) for natural drawing, note-taking, and markup capabilities. Touch ID integrated into the top button provides secure authentication and Apple Pay support. USB-C connector enables fast charging and connection to external displays up to 6K resolution. Available in five gorgeous colors with all-day battery life up to 10 hours. The ultra-portable design weighs just 1.02 pounds while maintaining the durability and premium build quality Apple is known for.",
    price: 599.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1028&h=408&fit=crop",
  },
  {
    name: "AirPods Pro",
    description:
      "Active noise cancellation meets personalized spatial audio. Adaptive transparency and customizable fit for all-day comfort. Features the H2 chip that powers smarter noise cancellation, superior three-dimensional sound, and more efficient battery life. Adaptive Audio dynamically blends Active Noise Cancellation and Transparency modes based on your environment and activity. Personalized Spatial Audio with dynamic head tracking creates an immersive listening experience that places sound all around you. The redesigned driver and amplifier deliver richer bass, crystal-clear mids, and brilliant highs. Conversation Awareness automatically lowers media volume when you start speaking to someone nearby. Multiple ear tip sizes ensure a perfect seal for optimal sound quality and noise cancellation. Sweat and water resistant with IPX4 rating, perfect for workouts and outdoor activities. The MagSafe Charging Case provides up to 30 hours of total listening time with wireless charging capability.",
    price: 249.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1028&h=408&fit=crop",
  },
  {
    name: "Gaming Chair",
    description:
      "Ergonomic gaming chair with lumbar support, adjustable armrests, and premium PU leather. Built for long gaming sessions. Features a high-density foam cushioning system that maintains its shape and comfort even after hours of use. The adjustable lumbar support pillow reduces back strain and promotes healthy posture during extended gaming or work sessions. 4D armrests can be adjusted in height, width, depth, and angle to find the perfect position for your arms and shoulders. Premium PU leather upholstery is easy to clean and resistant to wear, while breathable mesh panels prevent overheating. The sturdy steel frame supports up to 330 lbs with a Class 4 gas lift cylinder for smooth height adjustment. 360-degree swivel and smooth-rolling casters provide excellent mobility. The chair reclines from 90 to 165 degrees with a locking mechanism, allowing you to find the perfect angle for gaming, working, or relaxing.",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1028&h=408&fit=crop",
  },
  {
    name: "Webcam 4K",
    description:
      "Ultra HD 4K webcam with auto-focus, noise reduction, and wide-angle lens. Perfect for streaming and video calls. Captures stunning 4K video at 30fps or smooth 1080p at 60fps with exceptional clarity and natural color reproduction. Advanced auto-focus technology ensures you stay sharp and in focus even when moving around your workspace. Dual stereo microphones with noise reduction technology filter out background noise for crystal-clear audio during calls and recordings. The 90-degree field of view is perfect for solo presentations or small group meetings, while digital zoom allows you to adjust the frame as needed. Compatible with all major video conferencing platforms including Zoom, Teams, Skype, and OBS Studio. Privacy shutter provides physical protection when the camera is not in use. Plug-and-play design works seamlessly with Windows, macOS, and Chrome OS without requiring additional drivers or software installation.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1028&h=408&fit=crop",
  },
  {
    name: "Portable SSD 1TB",
    description:
      "Ultra-fast portable SSD with 1TB storage, USB 3.2 connectivity, and compact design. Perfect for backup and file transfer. Delivers read speeds up to 1,050 MB/s and write speeds up to 1,000 MB/s, making file transfers lightning-fast compared to traditional hard drives. The shock-resistant design with no moving parts ensures your data stays safe even if dropped from up to 6.5 feet. Advanced thermal management prevents overheating during intensive data operations while maintaining peak performance. Hardware encryption with 256-bit AES keeps your sensitive files secure with password protection. The sleek aluminum housing dissipates heat efficiently while providing a premium feel that fits easily in your pocket or laptop bag. Compatible with Windows, macOS, Android, and gaming consoles through the included USB-C to USB-A cable. Backup software included for easy data migration and scheduled backups to protect your important files automatically.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1028&h=408&fit=crop",
  },
  {
    name: "Smartphone Stand",
    description:
      "Adjustable aluminum smartphone stand with anti-slip base. Compatible with all phone sizes and tablets. Crafted from premium aluminum alloy with a sleek, modern design that complements any desk setup or home decor. The multi-angle adjustment system allows you to find the perfect viewing angle for video calls, streaming, reading, or charging. Rubber padding protects your device from scratches while providing a secure grip that prevents sliding. The weighted anti-slip base with silicone pads keeps the stand stable on any surface, even when using touch gestures on your device. Foldable design makes it ultra-portable for travel, fitting easily into laptop bags or backpacks. Compatible with devices from 4 inches to 13 inches, including smartphones, tablets, e-readers, and even small laptops. The open design allows access to charging ports and buttons while your device is mounted, making it perfect for desk use, kitchen recipes, or bedside entertainment.",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1028&h=408&fit=crop",
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life. Perfect for outdoor use. Features advanced acoustic engineering with dual passive radiators and custom-tuned drivers that deliver rich, immersive sound in all directions. The IPX7 waterproof rating means it can withstand rain, splashes, and even brief submersion in water, making it ideal for pool parties, beach trips, and outdoor adventures. Bluetooth 5.0 connectivity provides stable connection up to 100 feet range with quick pairing and multi-device support. The built-in speakerphone with noise-canceling microphone ensures crystal-clear hands-free calls. PartyBoost technology allows you to connect multiple compatible speakers for even bigger sound. The rugged fabric exterior and shock-absorbing design protect against drops and impacts. USB-C fast charging gets you back to full power quickly, while the battery indicator keeps you informed of remaining playtime.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1028&h=408&fit=crop",
  },
  {
    name: "USB-C Hub",
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Essential for modern laptops. Expands a single USB-C port into seven essential connections: 4K HDMI output, three USB 3.0 ports, SD and microSD card readers, and 100W Power Delivery pass-through charging. The HDMI port supports 4K resolution at 60Hz for crystal-clear external displays, perfect for presentations, gaming, or extended desktop setups. USB 3.0 ports provide data transfer speeds up to 5Gbps, allowing you to connect multiple peripherals like keyboards, mice, external drives, and printers simultaneously. The card readers support UHS-I speeds for fast photo and video file transfers from cameras and other devices. Aluminum construction with advanced heat dissipation ensures stable performance during heavy use while maintaining a sleek, portable design. Plug-and-play compatibility with MacBook Pro, MacBook Air, iPad Pro, Chromebooks, and Windows laptops with USB-C ports.",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=1028&h=408&fit=crop",
  },
  {
    name: "Desk Lamp LED",
    description:
      "Adjustable LED desk lamp with multiple brightness levels, color temperature control, and USB charging port. Features 50 high-quality LEDs that provide flicker-free, eye-caring illumination perfect for reading, studying, or working late into the night. Five brightness levels and five color temperature modes (3000K-6500K) allow you to customize the lighting for any task or time of day. The flexible gooseneck design with 225-degree rotation and multi-angle adjustment lets you direct light exactly where you need it. Memory function remembers your preferred settings, while touch-sensitive controls make adjustments effortless. The built-in 5V/1A USB charging port keeps your smartphone or tablet powered while you work. Energy-efficient LED technology consumes 75% less energy than traditional incandescent bulbs while lasting up to 50,000 hours. The sturdy weighted base provides stability, and the modern minimalist design complements any workspace or home office setup.",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1028&h=408&fit=crop",
  },
  {
    name: "Smart Watch Series 9",
    description:
      "Advanced smartwatch with health monitoring, GPS tracking, and 18-hour battery life. Water resistant up to 50 meters. Features comprehensive health monitoring including continuous heart rate tracking, blood oxygen monitoring, sleep analysis, and stress level detection. Built-in GPS with GLONASS support provides accurate location tracking for outdoor activities like running, cycling, and hiking without needing your phone. The always-on Retina display remains visible in bright sunlight while conserving battery life through intelligent brightness adjustment. ECG app can detect irregular heart rhythms, while fall detection automatically contacts emergency services if needed. Fitness tracking supports over 60 workout types with automatic workout detection for popular activities. Digital Crown with haptic feedback provides intuitive navigation, while the side button offers quick access to frequently used apps. Compatible with thousands of apps and watch faces for complete customization. Magnetic charging cable provides fast, convenient charging to get you through your busiest days.",
    price: 399.99,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1028&h=408&fit=crop",
  },
  {
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Includes LED indicator and non-slip surface. Delivers up to 15W fast charging for compatible smartphones, 7.5W for iPhones, and 5W for standard Qi devices, automatically detecting the optimal charging speed for your device. Advanced safety features include over-voltage protection, temperature control, and foreign object detection to prevent overheating and ensure safe charging. The LED indicator provides clear status updates: blue for standby, green for charging, and red for any issues, while remaining dim enough not to disturb sleep. Premium silicone surface with anti-slip ring keeps your device securely positioned during charging, even with vibrations from notifications. Slim profile at just 0.4 inches thick fits seamlessly on nightstands, desks, or car dashboards. Case-friendly design works through most phone cases up to 5mm thick, eliminating the need to remove cases for charging. Includes 4-foot USB-C cable and wall adapter for immediate use out of the box.",
    price: 39.99,
    imageUrl:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1028&h=408&fit=crop",
  },
  {
    name: "Coffee Maker Premium",
    description:
      "Programmable coffee maker with thermal carafe, brew strength control, and automatic shut-off. Makes 12 cups. Features precision brewing technology that maintains optimal water temperature between 195°F-205°F for perfect coffee extraction every time. The double-wall thermal carafe keeps coffee hot for hours without a heating plate, preserving flavor and preventing burnt taste. Programmable 24-hour timer allows you to wake up to freshly brewed coffee, while the brew strength selector lets you choose between regular and bold flavors. Gold-tone permanent filter eliminates the need for paper filters while allowing essential oils to pass through for fuller flavor. Auto-pause and pour feature stops brewing temporarily when you remove the carafe, preventing drips and spills. The showerhead design ensures even water distribution over coffee grounds for consistent extraction. Easy-to-read LCD display with blue backlight shows time, brew strength, and programming status. Self-cleaning cycle with descaling alert maintains optimal performance and extends the machine's lifespan.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1028&h=408&fit=crop",
  },
  {
    name: "Electric Toothbrush",
    description:
      "Sonic electric toothbrush with 5 cleaning modes, pressure sensor, and 2-week battery life. Includes travel case. Delivers up to 31,000 brush strokes per minute with sonic technology that creates dynamic fluid action to reach deep between teeth and along the gumline. Five intelligent cleaning modes include Clean, White, Polish, Gum Care, and Sensitive, each optimized for specific oral care needs. Smart pressure sensor alerts you when brushing too hard to protect your gums and enamel from damage. The 2-minute timer with 30-second intervals guides you through dentist-recommended brushing technique for optimal cleaning. BrushSync technology tracks brush head usage and reminds you when it's time for replacement. The ergonomic handle with non-slip grip provides comfortable control even with wet hands. USB charging base provides up to two weeks of regular use on a single charge, perfect for travel. Premium travel case protects the toothbrush and includes space for two additional brush heads, making it ideal for business trips or vacations.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1028&h=408&fit=crop",
  },
  {
    name: "Yoga Mat Premium",
    description:
      "Non-slip yoga mat made from eco-friendly materials. Extra thick for comfort with alignment lines. Crafted from premium TPE (Thermoplastic Elastomer) material that's free from latex, PVC, and harmful chemicals, making it safe for you and the environment. The 6mm extra-thick cushioning provides superior joint protection and comfort during floor poses while maintaining stability for standing postures. Advanced non-slip texture on both sides ensures excellent grip on any surface, whether you're practicing on hardwood floors, tiles, or carpet. Alignment lines and center guide help you maintain proper form and positioning during poses, making it perfect for beginners and advanced practitioners alike. The closed-cell surface prevents moisture and bacteria absorption, making it easy to clean with just soap and water. Lightweight at just 2.5 pounds yet durable enough to withstand daily use and maintain its shape over time. Comes with a carrying strap for easy transport to classes or outdoor practice sessions. Available in multiple calming colors to match your personal style and practice preferences.",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1028&h=408&fit=crop",
  },
  {
    name: "Instant Pot 8-Quart",
    description:
      "Multi-use pressure cooker with 7-in-1 functionality. Slow cook, sauté, steam, and more. Perfect for families. Combines the functions of pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer in one convenient appliance. Advanced microprocessor technology with 14 built-in programs takes the guesswork out of cooking, automatically adjusting time, temperature, and pressure for perfect results. The 8-quart capacity feeds up to 8 people, making it ideal for family meals, meal prep, or entertaining guests. Pressure cooking reduces cooking time by up to 70% while preserving nutrients and intensifying flavors. Stainless steel inner pot with tri-ply bottom provides even heat distribution and is dishwasher safe for easy cleanup. Safety features include 10 proven mechanisms including overheat protection, safety lock, and anti-blockage vent. The large LED display with intuitive controls makes operation simple, while the delay start function lets you program meals up to 24 hours in advance. Includes recipe booklet with over 100 tested recipes to get you started.",
    price: 119.99,
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1028&h=408&fit=crop",
  },
  {
    name: "Smart Thermostat",
    description:
      "WiFi-enabled smart thermostat with learning capabilities, energy reports, and remote control via smartphone. Advanced machine learning algorithms study your schedule and preferences to automatically adjust temperature for optimal comfort and energy savings. The intuitive mobile app allows you to control your home's temperature from anywhere, receive energy usage reports, and get personalized tips for reducing utility bills. Geofencing technology detects when you're away and automatically adjusts settings to save energy, then welcomes you home to your preferred temperature. Compatible with most HVAC systems including gas, electric, oil, and heat pump systems with professional installation or easy DIY setup. The bright, full-color display shows current temperature, weather forecast, and system status at a glance. Smart scheduling allows you to create custom temperature programs for different days of the week, while vacation mode maintains energy efficiency during extended absences. Integration with popular smart home platforms enables voice control through Alexa, Google Assistant, and Apple HomeKit for hands-free operation.",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1028&h=408&fit=crop",
  },
  {
    name: "Electric Kettle",
    description:
      "Stainless steel electric kettle with temperature control, keep-warm function, and rapid boil technology. Features six preset temperature settings (160°F, 175°F, 185°F, 195°F, 200°F, and boiling) perfect for different types of tea, coffee, and other hot beverages. The precise temperature control ensures optimal flavor extraction whether you're brewing delicate green tea or bold black coffee. Rapid boil technology brings water to a boil 50% faster than stovetop methods, saving you time during busy mornings. Keep-warm function maintains your selected temperature for up to 30 minutes, so your water is ready when you are. The brushed stainless steel construction with BPA-free interior provides durability and pure taste without any plastic flavors. LED indicator lights show the current status and selected temperature, while the ergonomic handle stays cool to the touch for safe pouring. Auto shut-off and boil-dry protection provide safety and peace of mind. The 360-degree swivel base with cord storage keeps your countertop organized and allows for easy serving from any angle.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1028&h=408&fit=crop",
  },
  {
    name: "Noise Machine White",
    description:
      "Sound machine with 20 soothing sounds, timer function, and memory feature. Perfect for better sleep. Offers a carefully curated selection of high-quality sounds including white noise, pink noise, brown noise, nature sounds like rain and ocean waves, and ambient soundscapes recorded in pristine environments. Advanced audio processing ensures smooth, seamless loops without any jarring interruptions that could disturb your sleep. The timer function allows you to set automatic shut-off from 15 minutes to 8 hours, or run continuously throughout the night. Memory feature remembers your last used sound, volume, and timer settings for consistent sleep routines. Precise volume control with 32 levels lets you find the perfect sound level for your environment and sensitivity. The compact, portable design with battery power option makes it perfect for travel, hotel stays, or moving between rooms. Headphone jack provides private listening without disturbing others, while the USB port allows for firmware updates and potential sound library expansion. The sleek, modern design with soft-touch controls fits seamlessly into any bedroom decor.",
    price: 59.99,
    imageUrl:
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1028&h=408&fit=crop",
  },
  {
    name: "Massage Gun Pro",
    description:
      "Percussion massage gun with 6 speed levels, 4 massage heads, and long-lasting battery for muscle recovery. Delivers powerful percussive therapy with up to 3200 percussions per minute to penetrate deep into muscle tissue, increasing blood flow and reducing lactic acid buildup after workouts. Six adjustable speed levels from 1200-3200 PPM allow you to customize intensity for different muscle groups and sensitivity levels. Four interchangeable massage heads target specific needs: ball head for large muscle groups, bullet head for trigger points, fork head for spine and Achilles, and flat head for general use. The brushless motor operates quietly at under 45dB, making it perfect for use at home, gym, or office without disturbing others. Ergonomic design with anti-slip grip reduces hand fatigue during extended use, while the lightweight construction at just 2.2 pounds makes it easy to maneuver. Long-lasting lithium battery provides up to 6 hours of continuous use on a single charge, with LED battery indicator showing remaining power. Includes premium carrying case with foam inserts to protect the device and organize all attachments for travel or storage.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1028&h=408&fit=crop",
  },
  {
    name: "Bluetooth Earbuds",
    description:
      "True wireless earbuds with active noise cancellation, 8-hour battery, and IPX7 waterproof rating. Advanced hybrid active noise cancellation uses both feedforward and feedback microphones to eliminate up to 35dB of ambient noise, creating an immersive listening experience in any environment. Premium audio drivers deliver rich, balanced sound with deep bass, clear mids, and crisp highs across all music genres. Transparency mode lets you hear important ambient sounds when needed without removing the earbuds. The ergonomic design with multiple ear tip sizes ensures a secure, comfortable fit that stays in place during workouts or daily activities. Touch controls provide intuitive access to music playback, calls, and voice assistant activation. Fast charging provides 2 hours of playback with just 15 minutes in the case, while the total battery life reaches up to 32 hours with the charging case. IPX7 waterproof rating protects against sweat, rain, and accidental submersion, making them perfect for sports and outdoor activities. Bluetooth 5.2 connectivity ensures stable connection with low latency for seamless audio and video synchronization.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1028&h=408&fit=crop",
  },
  {
    name: "Smart Light Bulbs 4-Pack",
    description:
      "WiFi smart LED bulbs with 16 million colors, dimming, scheduling, and voice control compatibility. Transform any room with vibrant colors and adjustable white light from warm 2700K to cool 6500K, perfect for any mood or activity. The mobile app provides intuitive control over brightness, color, and scheduling from anywhere in the world. Create custom scenes and routines that automatically adjust lighting based on time of day, weather, or your daily schedule. Music sync feature pulses lights to the rhythm of your favorite songs for immersive entertainment experiences. Energy-efficient LED technology uses up to 80% less energy than traditional incandescent bulbs while lasting up to 25,000 hours. Circadian rhythm support gradually adjusts color temperature throughout the day to promote better sleep and natural wake cycles. Voice control compatibility with Alexa, Google Assistant, and Apple HomeKit allows hands-free operation. Group control lets you manage multiple bulbs simultaneously, while away mode randomly turns lights on and off to simulate presence for enhanced home security. Easy installation requires no hub or additional hardware - simply screw in and connect to your WiFi network.",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1028&h=408&fit=crop",
  },
  {
    name: "Portable Power Bank",
    description:
      "High-capacity 20,000mAh power bank with fast charging, multiple ports, and LED display showing battery level. Massive battery capacity can charge most smartphones 4-6 times, tablets 2-3 times, or provide emergency power for laptops and other USB-C devices. Advanced charging technology includes 18W Power Delivery and Quick Charge 3.0 support for lightning-fast charging speeds that can power up compatible devices up to 4x faster than standard chargers. Multiple output ports include two USB-A ports and one USB-C port, allowing you to charge up to three devices simultaneously. The intelligent LED display shows exact battery percentage remaining, eliminating guesswork about remaining power. Built-in safety protections include surge protection, short circuit prevention, and temperature control to keep your devices safe during charging. Premium aluminum construction provides durability while efficient heat dissipation prevents overheating during heavy use. Pass-through charging allows you to charge the power bank while it's charging your devices, perfect for overnight charging. Compact design fits easily in backpacks or laptop bags, making it ideal for travel, camping, or emergency preparedness.",
    price: 39.99,
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1028&h=408&fit=crop",
  },
  {
    name: "Gaming Headset RGB",
    description:
      "Professional gaming headset with 7.1 surround sound, noise-canceling mic, and customizable RGB lighting. Immersive virtual 7.1 surround sound technology provides precise directional audio that gives you a competitive edge in FPS games and creates cinematic experiences in single-player adventures. High-quality 50mm neodymium drivers deliver rich, detailed audio with powerful bass response and crystal-clear highs. The detachable noise-canceling microphone with real-time voice monitoring ensures clear communication with teammates while filtering out background noise. Memory foam ear cushions and adjustable headband provide hours of comfortable gaming without fatigue or pressure points. Customizable RGB lighting with multiple color zones and effects can be synchronized with your gaming setup through companion software. Durable aluminum frame construction withstands the rigors of intense gaming sessions while maintaining a lightweight feel. In-line audio controls provide quick access to volume adjustment, microphone mute, and RGB lighting without interrupting gameplay. Compatible with PC, PlayStation, Xbox, Nintendo Switch, and mobile devices through multiple connection options including USB and 3.5mm jack.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=1028&h=408&fit=crop",
  },
  {
    name: "Fitness Tracker",
    description:
      "Advanced fitness tracker with heart rate monitoring, sleep tracking, and 10-day battery life. Water resistant. Features 24/7 continuous heart rate monitoring with alerts for abnormal readings, helping you optimize workouts and monitor overall cardiovascular health. Comprehensive sleep analysis tracks light, deep, and REM sleep stages, providing detailed insights and personalized recommendations for better sleep quality. Built-in GPS tracks outdoor activities like running, cycling, and hiking without needing your smartphone, while automatically recognizing over 30 different exercise types. The color AMOLED display remains visible in bright sunlight and can be customized with dozens of watch faces to match your style. Smart notifications keep you connected with call, text, and app alerts, while the find my phone feature helps locate misplaced devices. Stress monitoring uses heart rate variability to detect stress levels and guide you through breathing exercises for relaxation. Women's health tracking monitors menstrual cycles and provides fertility insights. The silicone sport band is comfortable for all-day wear and easily replaceable with other band styles. 5ATM water resistance allows swimming and showering without worry.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1028&h=408&fit=crop",
  },
];

async function seedDatabase() {
  console.log("[seed] Starting database seeding...");

  try {
    const em = await getEM();

    const existingProductCount = await em.count(Product);
    if (existingProductCount > 0) {
      console.log(
        `[seed] Database already contains ${existingProductCount} products. Skipping seeding.`
      );
      console.log("[seed] To re-seed, clear the products table first.");
      return;
    }

    console.log("[seed] Creating products...");

    const products = sampleProducts.map((productData) => {
      const product = new Product();
      product.name = productData.name;
      product.description = productData.description;
      product.price = productData.price;
      product.imageUrl = productData.imageUrl;
      return product;
    });

    for (const product of products) {
      em.persist(product);
    }
    await em.flush();

    console.log(
      `[seed] Successfully seeded database with ${products.length} products!`
    );

    console.log("[seed] Seeded products:");
    products.forEach((product, index) => {
      console.log(`[seed] ${index + 1}. ${product.name} - $${product.price}`);
    });
  } catch (error) {
    console.error("[seed] Error seeding database:", error);
    throw error;
  } finally {
    const orm = await getORM();
    await orm.close();
    console.log("[seed] Database connection closed.");
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("[seed] Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[seed] Seeding failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };
