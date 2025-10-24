// Course types and interfaces
export interface CourseSpecifications {
  [key: string]: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  video?: string; // Optional video preview
  videos?: string[]; // Multiple course videos for premium courses
  description: string;
  detailedDescription: string;
  category: string;
  features: string[];
  specifications: CourseSpecifications;
  inStock: boolean;
}

// Helper function to get course image with fallback
export const getProductImage = (productId: number, imageIndex: number = 1): string => {
  // Используем единое изображение для всех курсов C++ программирования
  return `/images/img_1.jpg`;
};

// Helper function to get all available images for a course
export const getProductImages = (productId: number): string[] => {
  // Для всех курсов используем C++ programming изображения
  return [getProductImage(productId)];
};

// Helper function to get course video preview
export const getProductVideo = (productId: number): string | undefined => {
  if (productId === 1) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (1).mp4";
  }
  if (productId === 2) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (2).mp4";
  }
  if (productId === 3) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (3).mp4";
  }
  if (productId === 4) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (4).mp4";
  }
  if (productId === 5) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (5).mp4";
  }
  if (productId === 6) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (6).mp4";
  }
  if (productId === 7) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (7).mp4";
  }
  if (productId === 8) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (8).mp4";
  }
  if (productId === 9) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (9).mp4";
  }
  if (productId === 10) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (10).mp4";
  }
  if (productId === 11) {
    return "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (11).mp4";
  }
  return undefined;
};

// Helper function to get course videos (for premium courses with multiple videos)
export const getProductVideos = (productId: number): string[] | undefined => {
  // Courses 5-7: 3 videos each
  if (productId === 5) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (12).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (13).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (14).mp4"
    ];
  }
  if (productId === 6) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (15).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (16).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (17).mp4"
    ];
  }
  if (productId === 7) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (18).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (19).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (20).mp4"
    ];
  }
  
  // Courses 8-10: 5 videos each
  if (productId === 8) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (21).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (22).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (23).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (24).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (25).mp4"
    ];
  }
  if (productId === 9) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (15).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (16).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (17).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (18).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (19).mp4"
    ];
  }
  if (productId === 10) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (20).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (21).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (22).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (23).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (24).mp4"
    ];
  }
  
  // Course 11: 8 videos (premium - uses more videos from the course)
  if (productId === 11) {
    return [
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (19).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (20).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (21).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (22).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (23).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (24).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (25).mp4",
      "/videos/Practical C Programming Beginner Course Zach Hughes Skillshare (26).mp4"
    ];
  }
  
  return undefined;
};

export const products: Product[] = [
  {
    id: 1,
    name: "C++ Programming Welcome & Setup",
    price: 6.99,
    image: getProductImage(1),
    images: getProductImages(1),
    video: getProductVideo(1),
    description: "Introduction to C++ programming with development environment setup and hello world program basics.",
    detailedDescription: "Master the fundamentals of C++ programming. Learn development environment setup, understand basic C++ syntax, and get started with your programming journey. Perfect foundation for aspiring C++ developers.",
    category: "C++ Basics",
    features: [
      "C++ development environment setup",
      "Code::Blocks IDE installation", 
      "Hello World program anatomy",
      "Basic C++ syntax introduction",
      "Getting started guide"
    ],
    specifications: {
      "Duration": "3 minutes 27 seconds",
      "Level": "Complete Beginner",
      "Language": "English",
      "Focus": "C++ Setup & Basics",
      "Access": "6 months",
      "Certificate": "Basic completion badge"
    },
    inStock: true
  },
  {
    id: 2,
    name: "Data Types and Variables",
    price: 9.99,
    image: getProductImage(2),
    images: getProductImages(2),
    video: getProductVideo(2),
    description: "Master C++ data types and variable declarations for efficient programming and memory management.",
    detailedDescription: "Deep dive into C++ data types with comprehensive training on int, float, double, char, bool, and string variables. Learn memory management, variable scope, and efficient data handling for professional C++ development.",
    category: "C++ Fundamentals",
    features: [
      "All C++ data types mastery",
      "Variable declaration techniques",
      "Memory management basics",
      "Variable scope understanding",
      "Professional coding practices"
    ],
    specifications: {
      "Duration": "6 minutes 43 seconds",
      "Level": "Beginner",
      "Focus": "Data Types & Variables",
      "Topics": "Memory, scope, declarations",
      "Access": "8 months",
      "Support": "Community forum access"
    },
    inStock: true
  },
  {
    id: 3,
    name: "C++ Input and Output Operations",
    price: 19.99,
    image: getProductImage(3),
    images: getProductImages(3),
    video: getProductVideo(3),
    description: "Learn C++ input/output operations and stream handling for effective user interaction and data processing.",
    detailedDescription: "Master C++ I/O operations with comprehensive training on cout, cin, stream formatting, and user input validation. Learn professional techniques for effective console interaction and data processing.",
    category: "C++ I/O Operations",
    features: [
      "Console output mastery (cout)",
      "User input techniques (cin)",
      "Stream formatting control",
      "Input validation methods",
      "Professional I/O practices"
    ],
    specifications: {
      "Duration": "8 minutes 5 seconds",
      "Level": "Beginner",
      "Focus": "Input/Output Operations",
      "Tools": "cout, cin, streams, formatting",
      "Access": "10 months",
      "Bonus": "I/O examples library"
    },
    inStock: true
  },
  {
    id: 4,
    name: "C++ Control Structures and Logic",
    price: 29.99,
    image: getProductImage(4),
    images: getProductImages(4),
    video: getProductVideo(4),
    description: "Master C++ control structures - the foundation of all program logic and decision-making algorithms.",
    detailedDescription: "Learn the essential C++ control structures that form the foundation of all programming logic. Master if statements, switch statements, and conditional expressions through proven programming patterns used by professional C++ developers worldwide.",
    category: "Control Structures",
    features: [
      "If statement mastery",
      "Switch statement logic",
      "Conditional expressions",
      "Program flow control",
      "Professional logic patterns"
    ],
    specifications: {
      "Duration": "13 minutes 46 seconds",
      "Level": "Intermediate", 
      "Focus": "Control structures, logic, decisions",
      "Techniques": "If/else, switch, conditionals",
      "Access": "8 months",
      "Bonus": "Logic pattern templates"
    },
    inStock: true
  },
  {
    id: 5,
    name: "C++ Loops and Practical Programming",
    price: 39.99,
    image: getProductImage(5),
    images: getProductImages(5),
    video: getProductVideo(5),
    videos: getProductVideos(5),
    description: "Master C++ loops for efficient programming and build your first practical program application.",
    detailedDescription: "Master the powerful C++ loop structures with comprehensive training. This course includes 3 detailed video modules covering while loops, do-while loops, for loops, and building your first practical program with professional programming techniques used by industry developers.",
    category: "Loops & Practice",
    features: [
      "3 comprehensive video modules",
      "While and do-while loop mastery",
      "For loop optimization",
      "Practical program development",
      "Industry-standard patterns",
      "Live coding exercises"
    ],
    specifications: {
      "Duration": "12 minutes 6 seconds",
      "Videos": "3 comprehensive modules",
      "Level": "Advanced",
      "Focus": "Loops, iteration, practical programming",
      "Projects": "Live coding exercises",
      "Access": "10 months",
      "Bonus": "Loop pattern templates"
    },
    inStock: true
  },
  {
    id: 6,
    name: "C++ Arrays and Data Structures",
    price: 49.99,
    image: getProductImage(6),
    images: getProductImages(6),
    video: getProductVideo(6),
    videos: getProductVideos(6),
    description: "Learn C++ arrays and data structures - essential for organizing data and building efficient algorithms.",
    detailedDescription: "Master C++ data structures with comprehensive training. This course includes 3 detailed video modules covering arrays, data organization techniques, and professional data structure applications for efficient programming.",
    category: "Data Structures",
    features: [
      "3 detailed video modules",
      "Array manipulation mastery",
      "Data organization strategies",
      "Memory management principles",
      "Professional data handling",
      "Live coding examples"
    ],
    specifications: {
      "Duration": "11 minutes 34 seconds",
      "Videos": "3 detailed modules",
      "Level": "Intermediate",
      "Focus": "Arrays, data structures, memory",
      "Applications": "Array sorting, searching, manipulation",
      "Access": "12 months",
      "Support": "Data structure templates"
    },
    inStock: true
  },
  {
    id: 7,
    name: "C++ File Operations and Advanced I/O",
    price: 59.99,
    image: getProductImage(7),
    images: getProductImages(7),
    video: getProductVideo(7),
    videos: getProductVideos(7),
    description: "Master advanced C++ file operations including file input/output, stream manipulation, and data persistence.",
    detailedDescription: "Master advanced C++ I/O with comprehensive training on file operations, stream manipulation, and data persistence. This course includes 3 detailed video modules covering file output, file input, and advanced input/output manipulation for professional data handling applications.",
    category: "Advanced I/O",
    features: [
      "3 comprehensive video modules",
      "File output operations mastery",
      "Advanced file input techniques",
      "Stream manipulation control",
      "Professional data persistence",
      "I/O error handling mastery"
    ],
    specifications: {
      "Duration": "9 minutes 25 seconds",
      "Videos": "3 detailed modules",
      "Level": "Intermediate",
      "Focus": "File I/O, streams, data persistence",
      "Applications": "File handling, data storage, streams",
      "Access": "12 months",
      "Bonus": "File operation templates"
    },
    inStock: true
  },
  {
    id: 8,
    name: "C++ Functions and Modular Programming",
    price: 69.99,
    image: getProductImage(8),
    images: getProductImages(8),
    video: getProductVideo(8),
    videos: getProductVideos(8),
    description: "Master C++ functions and modular programming with comprehensive training on function design, parameters, and code organization.",
    detailedDescription: "Master C++ functions with comprehensive training. This course includes 5 detailed video modules covering function creation, parameter passing, pass by reference, function overloading, and professional code organization methods for effective software development.",
    category: "Functions & Modularity",
    features: [
      "5 detailed video modules",
      "Function design fundamentals",
      "Parameter passing mastery",
      "Pass by reference techniques",
      "Function overloading methods",
      "Modular programming mastery"
    ],
    specifications: {
      "Duration": "5 minutes 2 seconds",
      "Videos": "5 detailed modules",
      "Level": "Advanced",
      "Focus": "Functions, parameters, modularity",
      "Techniques": "Function design, overloading",
      "Access": "12 months",
      "Bonus": "Function templates library"
    },
    inStock: true
  },
  {
    id: 9,
    name: "C++ String Handling & Random Numbers",
    price: 79.99,
    image: getProductImage(9),
    images: getProductImages(9),
    video: getProductVideo(9),
    videos: getProductVideos(9),
    description: "Master advanced C++ string manipulation and random number generation for dynamic program functionality.",
    detailedDescription: "Master advanced C++ string operations with comprehensive training. This premium course includes 5 comprehensive video modules covering string functions, string manipulation, random number generation, and professional text processing techniques.",
    category: "Advanced Programming",
    features: [
      "5 comprehensive video modules",
      "String functions mastery",
      "String manipulation techniques",
      "Random number generation",
      "Professional text processing",
      "Dynamic content creation"
    ],
    specifications: {
      "Duration": "13 minutes 56 seconds",
      "Videos": "5 comprehensive modules",
      "Level": "Advanced",
      "Focus": "Strings, random numbers, text processing",
      "Techniques": "String manipulation, randomization",
      "Access": "15 months",
      "Bonus": "String processing templates"
    },
    inStock: true
  },
  {
    id: 10,
    name: "C++ Practical Program Development",
    price: 89.99,
    image: getProductImage(10),
    images: getProductImages(10),
    video: getProductVideo(10),
    videos: getProductVideos(10),
    description: "Master practical C++ program development and advanced input/output manipulation for real-world applications.",
    detailedDescription: "Master practical C++ development with comprehensive training on real-world programming. This premium course includes 5 detailed video modules covering Practical Program #2, advanced input/output manipulation, and professional development techniques for building complete applications.",
    category: "Practical Programming",
    features: [
      "5 detailed video modules",
      "Practical program development",
      "Advanced I/O manipulation",
      "Real-world application building",
      "Professional coding patterns",
      "Complete project development"
    ],
    specifications: {
      "Duration": "16 minutes 59 seconds",
      "Videos": "5 detailed modules", 
      "Level": "Advanced",
      "Focus": "Practical programming, I/O manipulation",
      "Techniques": "Real applications, advanced patterns",
      "Access": "15 months",
      "Bonus": "Complete project templates"
    },
    inStock: true
  },
  {
    id: 11,
    name: "Complete C++ Mastery + Hangman Game Project",
    price: 99.99,
    image: getProductImage(11),
    images: getProductImages(11),
    video: getProductVideo(11),
    videos: getProductVideos(11),
    description: "Master all aspects of C++ programming plus complete game development with the classic Hangman game project.",
    detailedDescription: "Achieve complete C++ programming mastery with comprehensive training plus game development. This premium course includes 8 comprehensive video modules covering all C++ fundamentals, advanced techniques, professional workflows, and a complete Hangman game project used by successful C++ developers worldwide.",
    category: "Complete Mastery",
    features: [
      "8 comprehensive video modules",
      "Complete C++ programming mastery",
      "All programming fundamentals covered",
      "Complete Hangman game project",
      "Game development techniques",
      "Professional project structure",
      "Advanced programming workflows",
      "Real-world application mastery"
    ],
    specifications: {
      "Duration": "7 minutes 1 second",
      "Videos": "8 comprehensive modules",
      "Level": "Expert",
      "Coverage": "All C++ + complete game project",
      "Skills": "Complete C++ & game development mastery", 
      "Access": "18 months",
      "Bonus": "Complete C++ toolkit & game project templates"
    },
    inStock: true
  }
];
