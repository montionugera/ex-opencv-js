export default {
  whitelist: [
    'วันจดทะเบียน',
    'จังหวัด',
    'น้ำหนักรวม',
    'รุ่นปี',
    'เลขถังแก๊ส',
    'แรงม้า',
    'ที่นั่ง',
  ],
  fields: {
    vehicle_register_date: {
      poly: [
        {
          x: 296,
          y: 158,
        },
        {
          x: 718,
          y: 158,
        },
        {
          x: 718,
          y: 218,
        },
        {
          x: 296,
          y: 218,
        },
      ],
    },
    vehicle_license_number: {
      priority: true,
      poly: [
        {
          x: 982,
          y: 159,
        },
        {
          x: 1390,
          y: 159,
        },
        {
          x: 1390,
          y: 215,
        },
        {
          x: 982,
          y: 215,
        },
      ],
    },
    vehicle_license_province: {
      synonym: [
        'กรุงเทพมหานคร',
        'สมุทรปราการ',
        'นนทบุรี',
        'ปทุมธานี',
        'พระนครศรีอยุธยา',
        'อ่างทอง',
        'ลพบุรี',
        'สิงห์บุรี',
        'ชัยนาท',
        'สระบุรี',
        'ชลบุรี',
        'ระยอง',
        'จันทบุรี',
        'ตราด',
        'ฉะเชิงเทรา',
        'ปราจีนบุรี',
        'นครนายก',
        'สระแก้ว',
        'นครราชสีมา',
        'บุรีรัมย์',
        'สุรินทร์',
        'ศรีสะเกษ',
        'อุบลราชธานี',
        'ยโสธร',
        'ชัยภูมิ',
        'อำนาจเจริญ',
        'บึงกาฬ',
        'หนองบัวลำภู',
        'ขอนแก่น',
        'อุดรธานี',
        'เลย',
        'หนองคาย',
        'มหาสารคาม',
        'ร้อยเอ็ด',
        'กาฬสินธุ์',
        'สกลนคร',
        'นครพนม',
        'มุกดาหาร',
        'เชียงใหม่',
        'ลำพูน',
        'ลำปาง',
        'อุตรดิตถ์',
        'แพร่',
        'น่าน',
        'พะเยา',
        'เชียงราย',
        'แม่ฮ่องสอน',
        'นครสวรรค์',
        'อุทัยธานี',
        'กำแพงเพชร',
        'ตาก',
        'สุโขทัย',
        'พิษณุโลก',
        'พิจิตร',
        'เพชรบูรณ์',
        'ราชบุรี',
        'กาญจนบุรี',
        'สุพรรณบุรี',
        'นครปฐม',
        'สมุทรสาคร',
        'สมุทรสงคราม',
        'เพชรบุรี',
        'ประจวบคีรีขันธ์',
        'นครศรีธรรมราช',
        'กระบี่',
        'พังงา',
        'ภูเก็ต',
        'สุราษฎร์ธานี',
        'ระนอง',
        'ชุมพร',
        'สงขลา',
        'สตูล',
        'ตรัง',
        'พัทลุง',
        'ปัตตานี',
        'ยะลา',
        'นราธิวาส',
      ],
      poly: [
        {
          x: 1564,
          y: 155,
        },
        {
          x: 2059,
          y: 155,
        },
        {
          x: 2059,
          y: 216,
        },
        {
          x: 1564,
          y: 216,
        },
      ],
    },
    vehicle_type: {
      poly: [
        {
          x: 182,
          y: 229,
        },
        {
          x: 893,
          y: 229,
        },
        {
          x: 893,
          y: 293,
        },
        {
          x: 182,
          y: 293,
        },
      ],
    },
    vehicle_body_type: {
      poly: [
        {
          x: 1358,
          y: 228,
        },
        {
          x: 1984,
          y: 228,
        },
        {
          x: 1984,
          y: 296,
        },
        {
          x: 1358,
          y: 296,
        },
      ],
    },
    vehicle_brand: {
      synonym: [
        'BMW',
        'CHEVROLET',
        'CITROEN',
        'DAEWOO',
        'KIA',
        'LAND ROVER',
        'MERCEDES-BENZ',
        'LEXUS',
        'MITSUBISHI',
        'OPEL',
        'PEUGEOT',
        'SAAB',
        'SKODA',
        'SUBARU',
        'VOLVO',
        'VOLKSWAGEN',
        'TR',
        'FORD',
        'HONDA',
        'NISSAN',
        'HYUNDAI',
        'ISUZU',
        'MAZDA',
        'TOYOTA',
        'ROVER',
        'JEEP',
        'SUZUKI',
        'TATA',
        'SSANGYONG',
        'PROTON',
        'ALFA ROMEO',
        'AUDI',
        'CHRYSLER',
        'HOLDEN',
        'MG',
        'MINI',
        'RENAULT',
        'CHERY',
        'SEAT',
      ],
      poly: [
        {
          x: 162,
          y: 301,
        },
        {
          x: 725,
          y: 301,
        },
        {
          x: 725,
          y: 369,
        },
        {
          x: 162,
          y: 369,
        },
      ],
    },
    vehicle_model: {
      priority: true,
      poly: [
        {
          x: 917,
          y: 309,
        },
        {
          x: 1538,
          y: 309,
        },
        {
          x: 1538,
          y: 368,
        },
        {
          x: 917,
          y: 368,
        },
      ],
    },
    vehicle_model_year: {
      poly: [
        {
          x: 1792,
          y: 302,
        },
        {
          x: 2056,
          y: 302,
        },
        {
          x: 2056,
          y: 368,
        },
        {
          x: 1792,
          y: 368,
        },
      ],
    },
    vehicle_color: {
      poly: [
        {
          x: 65,
          y: 378,
        },
        {
          x: 616,
          y: 378,
        },
        {
          x: 616,
          y: 444,
        },
        {
          x: 65,
          y: 444,
        },
      ],
    },
    vehicle_chassis_number: {
      priority: true,
      poly: [
        {
          x: 798,
          y: 380,
        },
        {
          x: 1533,
          y: 380,
        },
        {
          x: 1533,
          y: 446,
        },
        {
          x: 798,
          y: 446,
        },
      ],
    },
    vehicle_chassis_location: {
      poly: [
        {
          x: 1704,
          y: 380,
        },
        {
          x: 2056,
          y: 380,
        },
        {
          x: 2056,
          y: 447,
        },
        {
          x: 1704,
          y: 447,
        },
      ],
    },
    vehicle_engine_brand: {
      synonym: [
        'BMW',
        'CHEVROLET',
        'CITROEN',
        'DAEWOO',
        'KIA',
        'LAND ROVER',
        'MERCEDES-BENZ',
        'LEXUS',
        'MITSUBISHI',
        'OPEL',
        'PEUGEOT',
        'SAAB',
        'SKODA',
        'SUBARU',
        'VOLVO',
        'VOLKSWAGEN',
        'TR',
        'FORD',
        'HONDA',
        'NISSAN',
        'HYUNDAI',
        'ISUZU',
        'MAZDA',
        'TOYOTA',
        'ROVER',
        'JEEP',
        'SUZUKI',
        'TATA',
        'SSANGYONG',
        'PROTON',
        'ALFA ROMEO',
        'AUDI',
        'CHRYSLER',
        'HOLDEN',
        'MG',
        'MINI',
        'RENAULT',
        'CHERY',
        'SEAT',
      ],
      poly: [
        {
          x: 311,
          y: 456,
        },
        {
          x: 974,
          y: 456,
        },
        {
          x: 974,
          y: 517,
        },
        {
          x: 311,
          y: 517,
        },
      ],
    },
    vehicle_engine_number: {
      poly: [
        {
          x: 1328,
          y: 455,
        },
        {
          x: 1997,
          y: 455,
        },
        {
          x: 1997,
          y: 521,
        },
        {
          x: 1328,
          y: 521,
        },
      ],
    },
    vehicle_engine_location: {
      poly: [
        {
          x: 119,
          y: 528,
        },
        {
          x: 611,
          y: 528,
        },
        {
          x: 611,
          y: 599,
        },
        {
          x: 119,
          y: 599,
        },
      ],
    },
    vehicle_fuel_type: {
      synonym: ['เบนซิน', 'ดีเซล'],
      poly: [
        {
          x: 792,
          y: 523,
        },
        {
          x: 1234,
          y: 523,
        },
        {
          x: 1234,
          y: 598,
        },
        {
          x: 792,
          y: 598,
        },
      ],
    },
    vehicle_gas_number: {
      poly: [
        {
          x: 1456,
          y: 532,
        },
        {
          x: 2039,
          y: 532,
        },
        {
          x: 2039,
          y: 598,
        },
        {
          x: 1456,
          y: 598,
        },
      ],
    },
    vehicle_piston: {
      poly: [
        {
          x: 188,
          y: 643,
        },
        {
          x: 340,
          y: 643,
        },
        {
          x: 340,
          y: 703,
        },
        {
          x: 188,
          y: 703,
        },
      ],
    },
    vehicle_displacement: {
      poly: [
        {
          x: 467,
          y: 643,
        },
        {
          x: 648,
          y: 643,
        },
        {
          x: 648,
          y: 704,
        },
        {
          x: 467,
          y: 704,
        },
      ],
    },
    vehicle_hp: {
      poly: [
        {
          x: 775,
          y: 640,
        },
        {
          x: 924,
          y: 640,
        },
        {
          x: 924,
          y: 704,
        },
        {
          x: 775,
          y: 704,
        },
      ],
    },
    vehicle_shaft: {
      poly: [
        {
          x: 1149,
          y: 624,
        },
        {
          x: 2047,
          y: 624,
        },
        {
          x: 2047,
          y: 708,
        },
        {
          x: 1149,
          y: 708,
        },
      ],
    },
    vehicle_car_weight: {
      poly: [
        {
          x: 355,
          y: 715,
        },
        {
          x: 606,
          y: 715,
        },
        {
          x: 606,
          y: 777,
        },
        {
          x: 355,
          y: 777,
        },
      ],
    },
    vehicle_shaft_weight: {
      poly: [
        {
          x: 1415,
          y: 717,
        },
        {
          x: 1832,
          y: 717,
        },
        {
          x: 1832,
          y: 782,
        },
        {
          x: 1415,
          y: 782,
        },
      ],
    },
    vehicle_gvw: {
      poly: [
        {
          x: 354,
          y: 790,
        },
        {
          x: 605,
          y: 790,
        },
        {
          x: 605,
          y: 850,
        },
        {
          x: 354,
          y: 850,
        },
      ],
    },
    vehicle_seat_number: {
      poly: [
        {
          x: 970,
          y: 785,
        },
        {
          x: 1165,
          y: 785,
        },
        {
          x: 1165,
          y: 852,
        },
        {
          x: 970,
          y: 852,
        },
      ],
    },
    vehicle_short_type: {
      poly: [
        {
          x: 1017,
          y: 228,
        },
        {
          x: 1130,
          y: 228,
        },
        {
          x: 1130,
          y: 295,
        },
        {
          x: 1017,
          y: 295,
        },
      ],
    },
  },
}
