// TechPath.ai content. Edit this file to update roadmaps, courses, universities, scholarships and checklists.
// Universities and scholarships start as "needs_verification". Change status to "verified" and add the date only after checking the official source.

const ROADMAPS = {
  "Computer Science": {
    summary: "Core computing: programming, algorithms, systems and software. A strong base for almost any tech career.",
    stages: [
      { term: "Year 1", focus: "Foundations", skills: ["Python or C++", "Discrete mathematics", "Git and the command line"], projects: ["Command-line to-do app", "Calculator with unit tests"] },
      { term: "Year 2", focus: "Data structures and web", skills: ["Data structures and algorithms", "HTML, CSS and JavaScript", "SQL"], projects: ["Library system with a database", "Personal portfolio site"] },
      { term: "Year 3", focus: "Specialise", skills: ["Object-oriented design", "Operating systems and networks basics", "One framework (Django, Flask or React)"], projects: ["REST API for a student app", "Team project using pull requests"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["System design basics", "Cloud fundamentals", "Coding interview practice"], projects: ["Final-year project", "Two open-source contributions"] }
    ],
    jobs: ["Software Engineer", "Backend Developer", "QA Engineer", "DevOps Engineer"],
    certs: ["Cloud fundamentals certificate from a major provider (optional)"]
  },
  "Software Engineering": {
    summary: "Design, build and maintain reliable software in teams, with a focus on process, testing and architecture.",
    stages: [
      { term: "Year 1", focus: "Programming", skills: ["Python or Java", "Problem solving", "Git"], projects: ["Small CLI tool with tests"] },
      { term: "Year 2", focus: "Software practice", skills: ["Object-oriented design", "Unit and integration testing", "SQL and databases"], projects: ["Inventory system with a test suite"] },
      { term: "Year 3", focus: "Architecture", skills: ["REST APIs", "Design patterns", "CI/CD basics"], projects: ["Microservice with Docker"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Agile and Scrum", "System design", "Interview practice"], projects: ["Final-year project built in sprints"] }
    ],
    jobs: ["Software Engineer", "Full-stack Developer", "Solutions Architect"],
    certs: ["Scrum or Agile fundamentals certificate (optional)"]
  },
  "Data Science": {
    summary: "Turn data into decisions using statistics, programming and visualisation.",
    stages: [
      { term: "Year 1", focus: "Foundations", skills: ["Python", "Statistics basics", "Spreadsheets for cleaning"], projects: ["Analyse a public dataset and write a report"] },
      { term: "Year 2", focus: "Data handling", skills: ["pandas and NumPy", "SQL for analysis", "Data visualisation"], projects: ["Dashboard for a local dataset"] },
      { term: "Year 3", focus: "Machine learning", skills: ["scikit-learn", "Model evaluation", "Feature engineering"], projects: ["Prediction model with a clear write-up"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Experiment design", "Communicating results", "SQL and statistics interviews"], projects: ["Final-year project on a real dataset"] }
    ],
    jobs: ["Data Analyst", "Data Scientist", "Business Intelligence Analyst"],
    certs: ["Data analysis certificates from recognised platforms (optional)"]
  },
  "Artificial Intelligence": {
    summary: "Build systems that learn from data, from classic machine learning to modern language and vision models.",
    stages: [
      { term: "Year 1", focus: "Foundations", skills: ["Python", "Linear algebra and probability", "Git"], projects: ["Linear regression from scratch"] },
      { term: "Year 2", focus: "Machine learning", skills: ["scikit-learn", "Data preparation", "Model evaluation"], projects: ["Classifier for a local problem"] },
      { term: "Year 3", focus: "Deep learning and language models", skills: ["PyTorch basics", "Using AI model APIs", "Local models with Ollama"], projects: ["Image classifier", "Document question-answering app"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Model deployment", "Responsible AI and privacy", "Interview practice"], projects: ["Final-year project that solves a local problem"] }
    ],
    jobs: ["Machine Learning Engineer", "AI Engineer", "Research Assistant"],
    certs: ["Introductory machine learning course certificate (optional)"]
  },
  "Cyber Security": {
    summary: "Protect systems, networks and data, and find weaknesses before attackers do.",
    stages: [
      { term: "Year 1", focus: "Foundations", skills: ["Networking basics", "Linux command line", "Python scripting"], projects: ["Home lab with two virtual machines"] },
      { term: "Year 2", focus: "Systems and web", skills: ["Operating system security", "OWASP Top 10", "Cryptography basics"], projects: ["Find and report bugs in a practice web app"] },
      { term: "Year 3", focus: "Offence and defence", skills: ["Penetration testing methods", "Log analysis", "Incident response"], projects: ["Capture-the-flag writeups"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Security standards", "Report writing", "Interview practice"], projects: ["Final-year project on a security tool"] }
    ],
    jobs: ["Security Analyst", "Penetration Tester", "SOC Analyst"],
    certs: ["Entry-level security certifications from recognised providers (optional)"]
  },
  "Web and Mobile Development": {
    summary: "Build the websites and apps people use every day, from the browser to the phone.",
    stages: [
      { term: "Year 1", focus: "Front end", skills: ["HTML, CSS and JavaScript", "Responsive design", "Git"], projects: ["Portfolio website"] },
      { term: "Year 2", focus: "Frameworks", skills: ["React or Vue", "Node.js", "APIs and JSON"], projects: ["Recipe app with a backend"] },
      { term: "Year 3", focus: "Mobile and full stack", skills: ["Flutter or React Native", "Databases", "Authentication"], projects: ["Mobile app that uses a live API"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Deployment", "Performance and accessibility", "Interview practice"], projects: ["Final-year project as a live product"] }
    ],
    jobs: ["Front-end Developer", "Mobile App Developer", "Full-stack Developer"],
    certs: ["Front-end or mobile certificate from a recognised platform (optional)"]
  },
  "Cloud and DevOps": {
    summary: "Run software reliably at scale: servers, containers, automation and monitoring.",
    stages: [
      { term: "Year 1", focus: "Linux and scripting", skills: ["Linux command line", "Bash", "Python"], projects: ["Backup script with a schedule"] },
      { term: "Year 2", focus: "Containers", skills: ["Docker", "Networking basics", "Git workflows"], projects: ["Containerise a web app"] },
      { term: "Year 3", focus: "Cloud and automation", skills: ["One cloud provider (AWS, Azure or GCP)", "CI/CD pipelines", "Infrastructure as code"], projects: ["Automated deployment pipeline"] },
      { term: "Year 4", focus: "Career and FYP", skills: ["Kubernetes basics", "Monitoring", "Interview practice"], projects: ["Final-year project on a deployed system"] }
    ],
    jobs: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    certs: ["Cloud foundational certificate from a major provider (optional)"]
  }
};

// Course catalogue: [name, category, level, weeks, official documentation]
const COURSES = [
  ["Python", "Programming", "Beginner", 6, "https://docs.python.org/3/tutorial/"],
  ["JavaScript", "Programming", "Beginner", 6, "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
  ["Java", "Programming", "Beginner", 8, "https://docs.oracle.com/en/java/"],
  ["C++", "Programming", "Intermediate", 8, "https://en.cppreference.com/w/"],
  ["Go", "Programming", "Intermediate", 4, "https://go.dev/doc/"],
  ["Rust", "Programming", "Advanced", 10, "https://doc.rust-lang.org/book/"],
  ["TypeScript", "Programming", "Intermediate", 4, "https://www.typescriptlang.org/docs/"],
  ["HTML and CSS", "Web", "Beginner", 3, "https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer"],
  ["React", "Web", "Intermediate", 6, "https://react.dev/learn"],
  ["Node.js", "Web", "Intermediate", 4, "https://nodejs.org/docs/latest/api/"],
  ["Django", "Web", "Intermediate", 6, "https://docs.djangoproject.com/"],
  ["Flask", "Web", "Beginner", 3, "https://flask.palletsprojects.com/"],
  ["Next.js", "Web", "Intermediate", 4, "https://nextjs.org/docs"],
  ["SQL and PostgreSQL", "Data", "Beginner", 4, "https://www.postgresql.org/docs/"],
  ["pandas and NumPy", "Data", "Beginner", 4, "https://pandas.pydata.org/docs/"],
  ["Data visualisation", "Data", "Beginner", 3, "https://matplotlib.org/stable/tutorials/"],
  ["Power BI", "Data", "Beginner", 3, "https://learn.microsoft.com/power-bi/"],
  ["scikit-learn", "AI and ML", "Intermediate", 6, "https://scikit-learn.org/stable/user_guide.html"],
  ["PyTorch", "AI and ML", "Advanced", 8, "https://pytorch.org/tutorials/"],
  ["TensorFlow and Keras", "AI and ML", "Advanced", 8, "https://www.tensorflow.org/tutorials"],
  ["Hugging Face courses", "AI and ML", "Intermediate", 4, "https://huggingface.co/learn"],
  ["Gemini API", "AI and ML", "Beginner", 2, "https://ai.google.dev/gemini-api/docs"],
  ["Ollama (local models)", "AI and ML", "Beginner", 2, "https://ollama.com/docs"],
  ["Linux command line", "Systems", "Beginner", 3, "https://www.gnu.org/software/bash/manual/"],
  ["Git and GitHub", "Systems", "Beginner", 2, "https://docs.github.com/en/get-started"],
  ["Docker", "Cloud and DevOps", "Intermediate", 4, "https://docs.docker.com/get-started/"],
  ["Kubernetes", "Cloud and DevOps", "Advanced", 8, "https://kubernetes.io/docs/tutorials/"],
  ["AWS fundamentals", "Cloud and DevOps", "Beginner", 4, "https://docs.aws.amazon.com/"],
  ["Networking basics", "Security", "Beginner", 4, "https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/"],
  ["OWASP Top 10", "Security", "Intermediate", 3, "https://owasp.org/www-project-top-ten/"],
  ["Wireshark", "Security", "Intermediate", 2, "https://www.wireshark.org/docs/"],
  ["Flutter", "Mobile", "Intermediate", 6, "https://docs.flutter.dev/"],
  ["Kotlin for Android", "Mobile", "Intermediate", 6, "https://developer.android.com/kotlin"],
  ["Swift", "Mobile", "Intermediate", 6, "https://www.swift.org/documentation/"],
  ["Unity", "Game development", "Intermediate", 8, "https://docs.unity3d.com/Manual/index.html"],
  ["Godot", "Game development", "Beginner", 6, "https://docs.godotengine.org/en/stable/"],
  ["Figma for UI design", "Design", "Beginner", 3, "https://help.figma.com/hc/en-us"],
  ["Data structures and algorithms", "Interview prep", "Intermediate", 12, "https://leetcode.com/explore/"],
  ["Competitive programming", "Interview prep", "Advanced", 12, "https://codeforces.com/"],
  ["Technical writing", "Career skills", "Beginner", 2, "https://developers.google.com/tech-writing"]
];

const FYP_STEPS = [
  "Choose an idea that fits your skills and the time you have",
  "Write a one-page problem statement",
  "Get your supervisor's approval on the idea and its scope",
  "Review existing work on the same problem",
  "List the requirements and sketch the design",
  "Build in small milestones and test each one",
  "Write the report while you build, not at the end",
  "Prepare the demo and a short presentation",
  "Submit before the deadline and keep backups of your code and report"
];

// Starter list of universities across Pakistan. Programs and details still need checking on each official site.
const UNIVERSITIES = [
  { name: "National University of Sciences and Technology (NUST)", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://nust.edu.pk" },
  { name: "COMSATS University Islamabad", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://www.comsats.edu.pk" },
  { name: "Quaid-i-Azam University", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://www.qau.edu.pk" },
  { name: "Air University", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://www.au.edu.pk" },
  { name: "International Islamic University Islamabad", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://www.iiu.edu.pk" },
  { name: "Institute of Space Technology", city: "Islamabad", province: "Islamabad Capital Territory", type: "Public", cs: true, url: "https://www.ist.edu.pk" },
  { name: "Bahria University", city: "Islamabad", province: "Islamabad Capital Territory", type: "Private", cs: true, url: "https://bahria.edu.pk" },
  { name: "Riphah International University", city: "Islamabad", province: "Islamabad Capital Territory", type: "Private", cs: true, url: "https://riphah.edu.pk" },
  { name: "Lahore University of Management Sciences (LUMS)", city: "Lahore", province: "Punjab", type: "Private", cs: true, url: "https://lums.edu.pk" },
  { name: "FAST-NUCES Lahore", city: "Lahore", province: "Punjab", type: "Private", cs: true, url: "https://nu.edu.pk" },
  { name: "University of Engineering and Technology (UET) Lahore", city: "Lahore", province: "Punjab", type: "Public", cs: true, url: "https://uet.edu.pk" },
  { name: "University of the Punjab", city: "Lahore", province: "Punjab", type: "Public", cs: true, url: "https://pu.edu.pk" },
  { name: "Information Technology University (ITU) Lahore", city: "Lahore", province: "Punjab", type: "Public", cs: true, url: "https://itu.edu.pk" },
  { name: "University of Lahore", city: "Lahore", province: "Punjab", type: "Private", cs: true, url: "https://uol.edu.pk" },
  { name: "Government College University Lahore", city: "Lahore", province: "Punjab", type: "Public", cs: true, url: "https://gcu.edu.pk" },
  { name: "University of Central Punjab", city: "Lahore", province: "Punjab", type: "Private", cs: true, url: "https://ucp.edu.pk" },
  { name: "Superior University", city: "Lahore", province: "Punjab", type: "Private", cs: true, url: "https://superior.edu.pk" },
  { name: "Bahauddin Zakariya University (BZU)", city: "Multan", province: "Punjab", type: "Public", cs: true, url: "https://bzu.edu.pk" },
  { name: "The Islamia University of Bahawalpur", city: "Bahawalpur", province: "Punjab", type: "Public", cs: true, url: "https://iub.edu.pk" },
  { name: "University of Engineering and Technology Taxila", city: "Taxila", province: "Punjab", type: "Public", cs: true, url: "https://uettaxila.edu.pk" },
  { name: "University of Agriculture Faisalabad", city: "Faisalabad", province: "Punjab", type: "Public", cs: true, url: "https://uaf.edu.pk" },
  { name: "Foundation University", city: "Rawalpindi", province: "Punjab", type: "Private", cs: true, url: "https://fui.edu.pk" },
  { name: "NED University of Engineering and Technology", city: "Karachi", province: "Sindh", type: "Public", cs: true, url: "https://neduet.edu.pk" },
  { name: "Institute of Business Administration (IBA) Karachi", city: "Karachi", province: "Sindh", type: "Public", cs: true, url: "https://iba.edu.pk" },
  { name: "FAST-NUCES Karachi", city: "Karachi", province: "Sindh", type: "Private", cs: true, url: "https://nu.edu.pk" },
  { name: "Habib University", city: "Karachi", province: "Sindh", type: "Private", cs: true, url: "https://habib.edu.pk" },
  { name: "DHA Suffa University", city: "Karachi", province: "Sindh", type: "Private", cs: true, url: "https://dsu.edu.pk" },
  { name: "SZABIST", city: "Karachi", province: "Sindh", type: "Private", cs: true, url: "https://szabist.edu.pk" },
  { name: "Mehran University of Engineering and Technology (MUET)", city: "Jamshoro", province: "Sindh", type: "Public", cs: true, url: "https://muet.edu.pk" },
  { name: "Sukkur IBA University", city: "Sukkur", province: "Sindh", type: "Public", cs: true, url: "https://iba-suk.edu.pk" },
  { name: "University of Engineering and Technology Peshawar", city: "Peshawar", province: "Khyber Pakhtunkhwa", type: "Public", cs: true, url: "https://uetpeshawar.edu.pk" },
  { name: "CECOS University", city: "Peshawar", province: "Khyber Pakhtunkhwa", type: "Private", cs: true, url: "https://cecos.edu.pk" },
  { name: "COMSATS University Abbottabad", city: "Abbottabad", province: "Khyber Pakhtunkhwa", type: "Public", cs: true, url: "https://abbottabad.comsats.edu.pk" },
  { name: "Balochistan University of IT, Engineering and Management Sciences (BUITEMS)", city: "Quetta", province: "Balochistan", type: "Public", cs: true, url: "https://buitms.edu.pk" },
  { name: "University of Balochistan", city: "Quetta", province: "Balochistan", type: "Public", cs: true, url: "https://um.edu.pk" },
  { name: "Gomal University", city: "Dera Ismail Khan", province: "Khyber Pakhtunkhwa", type: "Public", cs: true, url: "https://gu.edu.pk" }
];

const SCHOLARSHIPS = [
  { name: "HEC scholarship programmes", provider: "Higher Education Commission (HEC), Pakistan", notes: "National programmes, including need-based and merit-based options. Eligibility is set in each year's notice.", url: "https://www.hec.gov.pk", status: "needs_verification", verified: null },
  { name: "Ehsaas and provincial education support", provider: "Government of Pakistan and provincial governments", notes: "Check current need-based education support in your province. Programs change, so confirm the latest notice.", url: "https://www.hec.gov.pk", status: "needs_verification", verified: null },
  { name: "DAAD scholarships", provider: "German Academic Exchange Service (DAAD)", notes: "For international students planning to study in Germany. Each scholarship has its own eligibility and deadline.", url: "https://www.daad.de", status: "needs_verification", verified: null },
  { name: "Canada scholarship search", provider: "Government of Canada (Educanada)", notes: "Official starting point for studying in Canada. Check individual university and province funding too.", url: "https://www.educanada.ca", status: "needs_verification", verified: null }
];

const ABROAD = {
  "Canada": [
    "Shortlist programs by field, budget and intake dates",
    "Check which language test each program accepts (IELTS, TOEFL or PTE) and the minimum scores",
    "Get transcripts and certificates, and check whether they need attestation",
    "Write a statement of purpose and ask referees early",
    "Look for scholarships and check their deadlines, which are often earlier than admission deadlines",
    "Prepare proof of funds and check the current study permit requirements"
  ],
  "United Kingdom": [
    "Shortlist programs and check each course's entry requirements",
    "Check the English test requirement (IELTS or equivalent) and the minimum scores",
    "Get transcripts certified and translated if they are not in English",
    "Write a personal statement and ask referees",
    "Check scholarship options and their deadlines",
    "Plan the visa application and financial evidence using official government guidance"
  ],
  "Germany": [
    "Check whether the program is taught in English or German, and the language level required",
    "Check whether the university uses uni-assist or direct application",
    "Get transcripts and certificates, with certified translations where needed",
    "Prepare a motivation letter and a CV in the format the university expects",
    "Check semester start dates, which differ between universities",
    "Confirm the current proof-of-finances rule on official sources"
  ],
  "Malaysia": [
    "Shortlist programs and check each course's entry requirements",
    "Check the English test requirement and the minimum scores",
    "Get transcripts and certificates, with certified copies where needed",
    "Prepare a statement of purpose and references",
    "Check scholarship options and their deadlines",
    "Confirm the student visa steps and financial requirements on official sources"
  ]
};
