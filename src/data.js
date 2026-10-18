export const profile = {
  name: 'Dhanyatha D',
  title: 'Computer Science Student & Developer',
  email: 'dhanyatha05@gmail.com',
  location: 'Chennai, Tamil Nadu',
  github: 'https://github.com/Dhanyatha555',
  linkedin: 'https://linkedin.com/in/dhanyatha-d-4b8424326',
  resume: 'https://drive.google.com/file/d/1Pu68tl4PCmCj-RqTw6EA23E3xW_y3fgo/view?usp=sharing',
}

export const education = {
  degree: 'B.E. Computer Science and Engineering',
  institution: 'Panimalar Engineering College, Chennai',
  period: '2024 – 2028',
  status: 'Pre-final year',
  cgpa: '8.7 / 10',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const experience = [
  {
    role: 'Frontend Developer Intern',
    org: 'NIELIT Chennai',
    period: 'Jan 2026 – Mar 2026',
    location: 'Chennai, India',
    badge: 'Frontend Engineering',
    points: [
      'Built responsive web pages with HTML5, CSS3 and JavaScript, and improved cross-device compatibility across all major browsers.',
      'Delivered a fully functional movie listing website with a structured, user-friendly UI, using Flexbox, Grid and semantic HTML.',
      'Strengthened API integration and responsive design skills through iterative builds, reducing layout defects by redesigning the component hierarchy.',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox / Grid', 'REST APIs', 'Semantic HTML'],
  },
  {
    role: 'Python Developer Intern',
    org: 'Cognifyz Technologies',
    period: 'Apr 2025 – May 2025',
    location: 'Remote',
    badge: 'Python & Automation',
    points: [
      'Developed 5+ Python mini-projects covering automation, scripting and data processing.',
      'Built a web scraping pipeline with BeautifulSoup and Requests to extract, clean and structure data from multiple online sources.',
      'Improved debugging, logical reasoning and version control discipline through Git-managed, hands-on tasks.',
    ],
    tech: ['Python', 'BeautifulSoup', 'Requests', 'Web Scraping', 'Automation', 'Git'],
  },
]

export const projects = [
  {
    id: 'rag-pdf',
    title: 'Local PDF Analyzer / RAG Chatbot',
    category: 'AI / Generative AI',
    stack: ['Python', 'PyMuPDF', 'RAG', 'Vector Search'],
    summary: 'A local AI chatbot that answers questions about uploaded PDF documents using Retrieval-Augmented Generation (RAG) with verified source citations.',
    points: [
      'Extracts text with PyMuPDF, chunks documents, and retrieves relevant context using vector similarity search.',
      'Generates context-aware, grounded responses with verified page citations using local LLM inference.',
    ],
    tagColor: 'purple',
  },
  {
    id: 'nizhal',
    title: 'NIZHAL — Image Theft Prevention System',
    category: 'AI / Image Processing',
    stack: ['Python', 'Flask', 'ImageHash', 'Pillow', 'Stegano'],
    summary: 'Helps identify potentially unauthorized image reuse, redistribution, and tampering across digital platforms.',
    points: [
      'Implements perceptual hash comparison (pHash) and invisible watermarking to detect unauthorized image reuse.',
      'Features a Safe vs. Blocked gallery interface with similarity scoring and tamper detection.',
    ],
    tagColor: 'cyan',
  },
  {
    id: 'ecosphere',
    title: 'EcoSphere — ESG Sustainability Platform',
    category: 'Backend Development',
    stack: ['Django', 'Django REST Framework', 'MySQL', 'Python'],
    summary: 'An ESG platform for tracking sustainability and employee engagement (Backend development only).',
    points: [
      'Architected RESTful API endpoints for ESG dashboards, environmental metrics, and compliance reports.',
      'Engineered gamification engine with XP progression, milestone badges, and employee engagement feeds.',
    ],
    tagColor: 'emerald',
  },
  {
    id: 'water-leakage',
    title: 'Smart Water Leakage Detection & Control System',
    category: 'IoT / Embedded Systems',
    stack: ['ESP8266', 'IoT Sensors', 'C++', 'Automation'],
    summary: 'Detects water leakage and supports real-time remote monitoring and automated valve control.',
    points: [
      'Sensor-based pipeline monitoring detects abnormal flow surges and leaks with low latency.',
      'Enables real-time automated alerts and remote valve shutoff to prevent water loss.',
    ],
    tagColor: 'blue',
  },
  {
    id: 'phasejump',
    title: 'PhaseJump Endless Runner Game',
    category: '3D Graphics / Game Dev',
    stack: ['Three.js', 'JavaScript', 'WebGL', 'HTML5 Canvas'],
    summary: 'An immersive, fast-paced 3D cyberpunk endless runner built with Three.js. Navigate a neon highway, dodge obstacles and collect yellow data-cubes.',
    points: [
      'Built a 60 FPS WebGL game loop with procedural neon highway generation and collision physics.',
      'Features responsive keyboard and touch steering, dynamic speed scaling, and collectible yellow data-cubes.',
    ],
    tagColor: 'amber',
  },
]

export const skills = [
  {
    group: 'AI & Information Retrieval',
    icon: 'sparkles',
    items: [
      'Retrieval-Augmented Generation (RAG)',
      'Vector Embeddings',
      'Document Chunking',
      'PyMuPDF Extraction',
      'Perceptual Hashing (ImageHash)',
      'Invisible Watermarking (Stegano)',
    ],
  },
  {
    group: 'Backend & Cloud Systems',
    icon: 'cpu',
    items: [
      'Python',
      'Django & DRF',
      'Flask',
      'REST API Design',
      'MySQL',
      'Gamification & Analytics Architecture',
    ],
  },
  {
    group: '3D Graphics & Frontend',
    icon: 'layout',
    items: [
      'Three.js',
      'Vanta.js WebGL FX',
      'React',
      'JavaScript (ES6+)',
      'HTML5 Canvas',
      'CSS3 (Flexbox/Grid/Bento)',
      'Responsive UI/UX',
    ],
  },
  {
    group: 'IoT & Embedded Engineering',
    icon: 'database',
    items: [
      'ESP8266 Microcontrollers',
      'Sensor-based Leak Detection',
      'Remote Valve Actuation',
    ],
  },
  {
    group: 'Programming Languages',
    icon: 'code',
    items: ['Python', 'Java', 'C', 'JavaScript', 'SQL (MySQL)'],
  },
  {
    group: 'Developer Tools & Platforms',
    icon: 'terminal',
    items: ['Git & GitHub', 'VS Code', 'Jupyter Notebook', 'Eclipse'],
  },
]

export const achievements = [
  {
    title: 'IEEE WIE Hackathon Finalist',
    text: 'Recognized among the top teams. Organized by IEEE and Rajalakshmi Engineering College.',
    tag: 'Hackathon',
  },
  {
    title: 'Ideathon 2024 Finalist',
    text: 'Selected among finalists for innovative problem-solving and technical presentation skills.',
    tag: 'Competition',
  },
  {
    title: 'International Conference 2024',
    text: 'Presented AquaFix, an intelligent water management solution, at an academic conference.',
    tag: 'Research',
  },
  {
    title: 'Certifications',
    text: 'SWAYAM: Programming in Python (98% score). NPTEL: Database Management Systems and Programming in Java.',
    tag: 'Academic Honors',
  },
  {
    title: 'Debugging Contest',
    text: 'Participated at Saveetha Engineering College in speed debugging and code optimization.',
    tag: 'Technical Contest',
  },
]

export const activities = [
  {
    title: "Coder's Forum",
    text: 'Member at Panimalar Engineering College. Active in technical discussions, coding events and developer meetups.',
    role: 'Member',
  },
  {
    title: 'Hackathons & Coding Contests',
    text: 'Competed in multiple inter-college hackathons and debugging contests applying algorithms and software engineering principles.',
    role: 'Competitor',
  },
]
