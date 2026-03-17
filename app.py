# ============================================================
# app.py ΓÇö Career Recommender (Indian Edition)
# ============================================================

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

CAREER_DATA = {

    # ΓöÇΓöÇ TECH ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    "Data Scientist": {
        "description": "Analyze large datasets to find patterns and help companies make smart decisions using Python and statistics.",
        "salary": "Rs5,00,000 - Rs20,00,000/yr | Avg Rs11 LPA (AmbitionBox 2025)",
        "icon": "≡ƒôè",
        "field": "Tech",
        "learn": [
            "Python (NumPy, Pandas, Matplotlib)",
            "Machine Learning (Scikit-learn)",
            "SQL & Database Basics",
            "Statistics & Probability",
            "Tableau or Power BI for visualization"
        ],
        "scope": "Extremely high demand in India. Top companies like TCS, Infosys, Flipkart, and startups are hiring data scientists at all levels."
    },
    "Software Developer": {
        "description": "Build websites, apps, and software products. You write code to solve real-world problems.",
        "salary": "Rs4,00,000 - Rs20,00,000/yr | Fresher Rs6-8 LPA, Mid Rs12-18 LPA (Glassdoor 2026)",
        "icon": "≡ƒÆ╗",
        "field": "Tech",
        "learn": [
            "Python or Java or JavaScript",
            "Data Structures & Algorithms",
            "Git & GitHub",
            "REST APIs & Backend basics",
            "React or Node.js for web"
        ],
        "scope": "One of the most in-demand jobs in India. IT hubs like Bangalore, Hyderabad, and Pune offer thousands of openings yearly."
    },
    "AI/ML Engineer": {
        "description": "Design and train machine learning models and intelligent systems that can learn from data.",
        "salary": "Rs5,00,000 - Rs35,00,000/yr | Avg Rs15.2 LPA (AmbitionBox 2025)",
        "icon": "≡ƒñû",
        "field": "Tech",
        "learn": [
            "Python (TensorFlow, PyTorch, Keras)",
            "Deep Learning & Neural Networks",
            "Natural Language Processing (NLP)",
            "Computer Vision basics",
            "Cloud platforms (AWS, GCP)"
        ],
        "scope": "One of the fastest growing fields globally. India is producing world-class AI talent and companies are paying premium salaries."
    },
    "Cybersecurity Analyst": {
        "description": "Protect computer systems and networks from hackers and digital threats.",
        "salary": "Rs4,20,000 - Rs18,00,000/yr | Certified CEH/CISSP: Rs8-18 LPA (WorkStaff360 2025)",
        "icon": "≡ƒöÉ",
        "field": "Tech",
        "learn": [
            "Networking fundamentals (TCP/IP, DNS)",
            "Linux & Command Line",
            "Ethical Hacking basics (Kali Linux)",
            "Certifications: CEH, CompTIA Security+",
            "SIEM tools and log analysis"
        ],
        "scope": "India faces millions of cyberattacks yearly. Government and private sectors are urgently hiring cybersecurity professionals."
    },
    "Cloud Engineer": {
        "description": "Build and manage cloud infrastructure on platforms like AWS, Azure, and Google Cloud.",
        "salary": "Rs5,50,000 - Rs22,00,000/yr | AWS certified earn 20-30% more (Glassdoor 2025)",
        "icon": "Γÿü∩╕Å",
        "field": "Tech",
        "learn": [
            "AWS / Azure / Google Cloud Platform",
            "Linux & Bash scripting",
            "Docker & Kubernetes",
            "Terraform (Infrastructure as Code)",
            "Certifications: AWS Solutions Architect"
        ],
        "scope": "India's cloud market is growing at 30% per year. Cloud engineers are among the highest paid IT professionals."
    },
    "Systems Analyst": {
        "description": "Study how organizations use technology and recommend improvements to business systems.",
        "salary": "Rs4,00,000 - Rs12,00,000/yr | Avg Rs6.5 LPA (AmbitionBox 2025)",
        "icon": "≡ƒûÑ∩╕Å",
        "field": "Tech",
        "learn": [
            "Business Analysis fundamentals",
            "UML & System Design diagrams",
            "SQL & Databases",
            "Agile & Scrum methodology",
            "ERP systems (SAP basics)"
        ],
        "scope": "Strong demand in IT services companies and large enterprises across India. Good entry point into tech management roles."
    },
    "IT Support Specialist": {
        "description": "Help people and organizations resolve technical issues with computers and software.",
        "salary": "Rs2,50,000 - Rs7,50,000/yr  | Entry Rs35k-70k/month (WorkStaff360 2025)",
        "icon": "≡ƒ¢á∩╕Å",
        "field": "Tech",
        "learn": [
            "Windows & Linux operating systems",
            "Networking basics",
            "Hardware troubleshooting",
            "ITIL framework",
            "CompTIA A+ certification"
        ],
        "scope": "Every company needs IT support. Great starting career in tech with clear path to move into networking, cloud, or security roles."
    },

    # ΓöÇΓöÇ BUSINESS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    "Business Manager": {
        "description": "Lead teams and oversee business operations to achieve company goals.",
        "salary": "Rs6,00,000 - Rs24,00,000/yr | MBA holders avg Rs12 LPA (AmbitionBox 2025)",
        "icon": "≡ƒÅó",
        "field": "Business",
        "learn": [
            "MBA or Business Management degree",
            "Leadership & Team Management",
            "Financial basics & Budgeting",
            "Business Strategy frameworks",
            "MS Excel & Business Analytics"
        ],
        "scope": "Management roles are always in demand across all industries in India ΓÇö retail, tech, banking, healthcare, and more."
    },
    "Project Manager": {
        "description": "Plan, execute, and close projects while managing teams, budgets, and timelines.",
        "salary": "Rs6,00,000 - Rs22,00,000/yr | PMP certified earn 40% more (PMI India)",
        "icon": "≡ƒôï",
        "field": "Business",
        "learn": [
            "PMP or PRINCE2 Certification",
            "Agile & Scrum methodology",
            "Jira & Trello (project tools)",
            "Risk Management",
            "Stakeholder communication skills"
        ],
        "scope": "India's booming IT and infrastructure sectors need thousands of project managers. PMP certified managers earn significantly more."
    },
    "Marketing Specialist": {
        "description": "Create campaigns and strategies to promote products and grow a brand's audience.",
        "salary": "Rs3,30,000 - Rs20,00,000/yr | Digital marketing range (upGrad 2026)",
        "icon": "≡ƒôú",
        "field": "Business",
        "learn": [
            "Digital Marketing (Google, Meta Ads)",
            "SEO & Content Marketing",
            "Social Media Marketing",
            "Google Analytics & Data tools",
            "Canva & basic design tools"
        ],
        "scope": "Digital marketing is exploding in India with 800 million internet users. Every brand needs strong digital marketers."
    },
    "Entrepreneur": {
        "description": "Start and build your own business or startup, turning ideas into real products and services.",
        "salary": "Rs0 to No Ceiling | India has 100+ unicorns",
        "icon": "≡ƒÜÇ",
        "field": "Business",
        "learn": [
            "Business Model Canvas",
            "Basic Finance & Accounting",
            "Sales & Negotiation skills",
            "Product Management basics",
            "Startup ecosystem: funding, MVP, pitch"
        ],
        "scope": "India is the 3rd largest startup ecosystem globally. With 100+ unicorns, there has never been a better time to start a business in India."
    },
    "Financial Analyst": {
        "description": "Evaluate financial data to guide investment decisions and business strategy.",
        "salary": "Rs4,50,000 - Rs16,00,000/yr | CFA certified avg Rs12-20 LPA (AmbitionBox)",
        "icon": "≡ƒÆ╣",
        "field": "Business",
        "learn": [
            "Financial Modeling in Excel",
            "Accounting basics (P&L, Balance Sheet)",
            "CFA Level 1 certification",
            "Valuation techniques (DCF, Comparables)",
            "Bloomberg & financial data tools"
        ],
        "scope": "Strong demand in banking, NBFCs, and investment firms in Mumbai, Delhi, and Bangalore. CFA certification boosts salary by 40%+."
    },
    "HR Manager": {
        "description": "Manage recruitment, employee relations, and workplace culture in an organization.",
        "salary": "Rs4,00,000 - Rs15,00,000/yr | CHRO roles up to Rs40 LPA (Glassdoor 2025)",
        "icon": "≡ƒñ¥",
        "field": "Business",
        "learn": [
            "HR Management fundamentals",
            "Labor laws in India",
            "HRMS tools (Zoho, Darwinbox)",
            "Talent acquisition & interviewing",
            "MBA in HR or PGDHRM"
        ],
        "scope": "Every growing company needs HR professionals. India's corporate sector is expanding rapidly, creating strong demand for HR talent."
    },
    "Business Analyst": {
        "description": "Bridge the gap between business needs and technology solutions through data and process analysis.",
        "salary": "Rs4,50,000 - Rs14,00,000/yr | Avg Rs6.5 LPA (AmbitionBox 2025)",
        "icon": "≡ƒôê",
        "field": "Business",
        "learn": [
            "SQL & Excel (advanced)",
            "Business Analysis Body of Knowledge (BABOK)",
            "Power BI or Tableau",
            "Agile methodology",
            "CBAP certification"
        ],
        "scope": "High demand in IT services, banking, and e-commerce. Bridge role between tech and business makes BAs very valuable in India."
    },

    # ΓöÇΓöÇ ARTS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    "Creative Director": {
        "description": "Lead the visual and creative vision for brands, agencies, or media companies.",
        "salary": "Rs8,00,000 - Rs32,00,000/yr | Top agency CDs Rs25-40 LPA (Glassdoor 2025)",
        "icon": "≡ƒÄ¡",
        "field": "Arts",
        "learn": [
            "Advanced Adobe Creative Suite",
            "Brand Strategy & Identity design",
            "Leadership & Team management",
            "Campaign planning & execution",
            "Portfolio building on Behance"
        ],
        "scope": "India's advertising and media industry is worth Γé╣90,000 crore. Creative directors are among the highest paid in the creative sector."
    },
    "UX/UI Designer": {
        "description": "Design beautiful and user-friendly digital interfaces for apps and websites.",
        "salary": "Rs4,80,000 - Rs21,50,000/yr | Avg Rs7 LPA, top Rs13.7 LPA (AmbitionBox 2025)",
        "icon": "≡ƒÄ¿",
        "field": "Arts",
        "learn": [
            "Figma (industry standard tool)",
            "User Research & Wireframing",
            "Design Systems & Prototyping",
            "Interaction Design principles",
            "HTML & CSS basics (bonus)"
        ],
        "scope": "One of the most in-demand creative roles in India's tech sector. Every app and website needs UX designers. Startups pay very well."
    },
    "Graphic Designer": {
        "description": "Create visual content ΓÇö logos, posters, branding ΓÇö for businesses and media.",
        "salary": "Rs2,50,000 - Rs9,00,000/yr  | Freelancers earn Rs1-3L/month on Fiverr",
        "icon": "Γ£Å∩╕Å",
        "field": "Arts",
        "learn": [
            "Adobe Photoshop & Illustrator",
            "Canva for quick designs",
            "Typography & Color theory",
            "Logo & Brand identity design",
            "Motion graphics (After Effects basics)"
        ],
        "scope": "Huge freelance market in India. Platforms like Fiverr and Upwork allow Indian designers to earn in USD. Social media boom drives demand."
    },
    "Content Writer": {
        "description": "Write blogs, articles, scripts, and copy that informs, entertains, and converts readers.",
        "salary": "Rs2,50,000 - Rs10,00,000/yr | Strategists Rs4.3-21 LPA (upGrad 2026)",
        "icon": "≡ƒô¥",
        "field": "Arts",
        "learn": [
            "SEO Writing & Keyword research",
            "Copywriting fundamentals",
            "Content Strategy basics",
            "WordPress & CMS platforms",
            "AI tools: ChatGPT, Grammarly, Surfer SEO"
        ],
        "scope": "India is a global content outsourcing hub. Skilled English writers are in huge demand for US, UK, and Australian clients via freelancing."
    },
    "Animator": {
        "description": "Bring characters and stories to life using 2D or 3D animation for film, games, or media.",
        "salary": "Rs3,00,000 - Rs12,00,000/yr | OTT/Bollywood animators Rs8-12 LPA",
        "icon": "≡ƒÄ¼",
        "field": "Arts",
        "learn": [
            "Adobe Animate or Toon Boom (2D)",
            "Blender or Maya (3D)",
            "Storyboarding & Visual storytelling",
            "After Effects for motion graphics",
            "Game engines: Unity or Unreal (bonus)"
        ],
        "scope": "India's animation and VFX industry is growing 20% per year. Bollywood, OTT platforms, and gaming companies are hiring animators."
    },
    "Art Director": {
        "description": "Oversee the visual style of magazines, ads, film productions, and product packaging.",
        "salary": "Rs5,50,000 - Rs18,00,000/yr | Mumbai/Delhi ad agencies Rs12-18 LPA",
        "icon": "≡ƒû╝∩╕Å",
        "field": "Arts",
        "learn": [
            "Advanced Adobe Creative Suite",
            "Photography & Visual composition",
            "Print & Digital production knowledge",
            "Client presentation skills",
            "Brand guidelines & style guides"
        ],
        "scope": "Strong demand in advertising agencies, media houses, and fashion brands in Mumbai and Delhi. OTT platforms are creating new opportunities."
    },
    "Art Teacher": {
        "description": "Inspire and educate students in visual arts, drawing, painting, and design.",
        "salary": "Rs2,00,000 - Rs8,00,000/yr  | Online tutors on Unacademy earn Rs4-8 LPA",
        "icon": "≡ƒÅ½",
        "field": "Arts",
        "learn": [
            "B.Ed or Art Education degree",
            "Curriculum design for art",
            "Digital art tools for teaching",
            "Child psychology basics",
            "Online teaching platforms (Zoom, Google Classroom)"
        ],
        "scope": "Stable job with growing demand as schools add creative arts programs. Online tutoring on platforms like Unacademy and Vedantu pays well."
    },

    # ΓöÇΓöÇ SCIENCE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    "Research Scientist": {
        "description": "Conduct experiments and publish findings to advance human knowledge in your field.",
        "salary": "Rs5,60,000 - Rs18,00,000/yr | ISRO/DRDO start Rs56,100/month (Govt scale)",
        "icon": "≡ƒö¼",
        "field": "Science",
        "learn": [
            "Advanced degree (M.Sc / PhD)",
            "Research methodology & paper writing",
            "Python or R for data analysis",
            "Lab techniques relevant to your field",
            "Grant writing & funding applications"
        ],
        "scope": "India's R&D spending is growing. ISRO, DRDO, CSIR, and private pharma companies offer research roles. Academia pays well at senior levels."
    },
    "Biomedical Engineer": {
        "description": "Combine engineering and biology to design medical devices, prosthetics, and healthcare solutions.",
        "salary": "Rs3,50,000 - Rs12,00,000/yr | Siemens/Philips India Rs8-12 LPA mid-level",
        "icon": "≡ƒº¼",
        "field": "Science",
        "learn": [
            "Biology & Human anatomy",
            "Electronics & Circuit design",
            "Medical device regulations (FDA, MDR India)",
            "MATLAB & signal processing",
            "3D printing & prototyping"
        ],
        "scope": "India's medical devices market is growing rapidly. Companies like Siemens Healthineers and Philips hire biomedical engineers actively."
    },
    "Data Analyst (Science)": {
        "description": "Use mathematical and statistical tools to interpret scientific data and drive discoveries.",
        "salary": "Rs4,00,000 - Rs12,00,000/yr | Fresher Rs6-8 LPA, 3yr exp Rs12 LPA",
        "icon": "≡ƒº«",
        "field": "Science",
        "learn": [
            "Python (Pandas, SciPy, Matplotlib)",
            "R programming for statistics",
            "SQL for data querying",
            "Excel (advanced formulas & pivot tables)",
            "Power BI or Tableau"
        ],
        "scope": "Every industry needs data analysts ΓÇö pharma, healthcare, agriculture, and government agencies. Excellent entry-level job with quick salary growth."
    },
    "Environmental Scientist": {
        "description": "Study the environment and develop solutions to protect ecosystems and address climate change.",
        "salary": "Rs3,00,000 - Rs10,00,000/yr | ESG consultants earn Rs8-12 LPA corporate",
        "icon": "≡ƒîì",
        "field": "Science",
        "learn": [
            "Environmental Impact Assessment (EIA)",
            "GIS & Remote Sensing (ArcGIS, QGIS)",
            "Environmental law & policy in India",
            "Climate data analysis",
            "Sustainability & ESG reporting"
        ],
        "scope": "India's environmental regulations are tightening. Companies need environmental compliance officers. NGOs and UN bodies offer international roles."
    },
    "Bioinformatics Analyst": {
        "description": "Use programming and statistics to analyze biological data like DNA sequences.",
        "salary": "Rs4,00,000 - Rs14,00,000/yr | Biocon/Dr Reddys Rs8-14 LPA experienced",
        "icon": "≡ƒº¬",
        "field": "Science",
        "learn": [
            "Python & R for bioinformatics",
            "Genomics & Sequence analysis tools",
            "Bioinformatics databases (NCBI, UniProt)",
            "Machine learning for biology",
            "Linux command line"
        ],
        "scope": "India's pharma and biotech industries are booming. Companies like Dr. Reddy's, Biocon, and Sun Pharma need bioinformatics talent."
    },
    "Mathematician": {
        "description": "Solve abstract and applied problems using advanced mathematics in academia or industry.",
        "salary": "Rs4,50,000 - Rs16,00,000/yr | Actuaries Rs8-20 LPA (IAI India 2025)",
        "icon": "≡ƒôÉ",
        "field": "Science",
        "learn": [
            "Advanced Calculus & Linear Algebra",
            "Probability & Statistics",
            "Python or MATLAB for computation",
            "Operations Research",
            "Actuarial Science (for finance path)"
        ],
        "scope": "Strong demand in finance, insurance, data science, and academia. Actuarial mathematicians are among the highest paid in India's insurance sector."
    },
    "Lab Technician": {
        "description": "Perform experiments and tests in a laboratory to support scientific research.",
        "salary": "Rs1,80,000 - Rs5,50,000/yr  | Dr Lal/SRL Rs2.5-5.5 LPA, Govt labs higher",
        "icon": "ΓÜù∩╕Å",
        "field": "Science",
        "learn": [
            "B.Sc in relevant science field",
            "Lab safety & Good Lab Practice (GLP)",
            "Analytical instruments (HPLC, spectrometers)",
            "Quality control & documentation",
            "NABL accreditation knowledge"
        ],
        "scope": "Steady demand in hospitals, diagnostic labs, pharma companies, and research institutes. Pathology labs like Dr. Lal, SRL are major employers."
    },
}


# ============================================================
# CAREER RECOMMENDATION LOGIC
# ============================================================

def recommend_career(skills, interest):

    has_python        = "Python" in skills
    has_math          = "Math" in skills
    has_communication = "Communication" in skills
    has_drawing       = "Drawing" in skills
    has_leadership    = "Leadership" in skills
    has_analysis      = "Analysis" in skills
    has_creativity    = "Creativity" in skills
    has_writing       = "Writing" in skills
    has_biology       = "Biology" in skills
    has_design        = "Design" in skills

    if interest == "Tech":
        if has_python and has_math and has_analysis:
            return "AI/ML Engineer"
        elif has_python and has_math:
            return "Data Scientist"
        elif has_python and has_design:
            return "Software Developer"
        elif has_python:
            return "Software Developer"
        elif has_math and has_analysis:
            return "Systems Analyst"
        elif has_math:
            return "Cloud Engineer"
        elif has_communication and has_analysis:
            return "Cybersecurity Analyst"
        else:
            return "IT Support Specialist"

    elif interest == "Business":
        if has_leadership and has_communication and has_analysis:
            return "Entrepreneur"
        elif has_leadership and has_communication:
            return "Business Manager"
        elif has_leadership and has_math:
            return "Financial Analyst"
        elif has_leadership:
            return "Project Manager"
        elif has_communication and has_creativity:
            return "Marketing Specialist"
        elif has_communication and has_analysis:
            return "HR Manager"
        elif has_communication:
            return "Marketing Specialist"
        elif has_math and has_analysis:
            return "Financial Analyst"
        else:
            return "Business Analyst"

    elif interest == "Arts":
        if has_drawing and has_communication and has_leadership:
            return "Creative Director"
        elif has_drawing and has_design:
            return "UX/UI Designer"
        elif has_drawing and has_creativity:
            return "Animator"
        elif has_drawing and has_communication:
            return "Art Director"
        elif has_drawing:
            return "Graphic Designer"
        elif has_writing and has_communication:
            return "Content Writer"
        elif has_communication and has_creativity:
            return "Content Writer"
        else:
            return "Art Teacher"

    elif interest == "Science":
        if has_python and has_math and has_biology:
            return "Bioinformatics Analyst"
        elif has_python and has_math and has_analysis:
            return "Research Scientist"
        elif has_python and has_math:
            return "Data Analyst (Science)"
        elif has_biology and has_math:
            return "Biomedical Engineer"
        elif has_biology:
            return "Environmental Scientist"
        elif has_math and has_analysis:
            return "Mathematician"
        elif has_python:
            return "Bioinformatics Analyst"
        elif has_math:
            return "Mathematician"
        else:
            return "Lab Technician"

    return "Career Counselor"


# ============================================================
# ROUTES
# ============================================================
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    # Get data from React form
    raw_skills   = data.get("skills", "")
    raw_interest = data.get("interests", "")
    education    = data.get("educationLevel", "")
    work_style   = data.get("workStyle", "")

    # Convert interests string → one of your categories
    interest_map = {
        "tech": "Tech", "technology": "Tech", "coding": "Tech",
        "software": "Tech", "computer": "Tech", "programming": "Tech",
        "business": "Business", "entrepreneur": "Business",
        "finance": "Business", "marketing": "Business",
        "art": "Arts", "design": "Arts", "drawing": "Arts",
        "creative": "Arts", "animation": "Arts",
        "medicine": "Medicine", "biology": "Medicine",
        "doctor": "Medicine", "health": "Medicine", "nurse": "Medicine",
        "teach": "Education", "education": "Education",
        "law": "Law", "legal": "Law",
        "music": "Arts", "sports": "Sports",
        "environment": "Science", "science": "Science",
    }

    # Detect interest category from user's text
    interest_category = "Tech"  # default
    lower_interest = raw_interest.lower()
    for keyword, category in interest_map.items():
        if keyword in lower_interest:
            interest_category = category
            break

    # Convert skills string → list matching your skill keywords
    skill_map = {
        "python": "Python", "coding": "Python", "programming": "Python",
        "code": "Python", "software": "Python",
        "math": "Math", "maths": "Math", "mathematics": "Math",
        "statistics": "Math", "calculus": "Math",
        "communication": "Communication", "speaking": "Communication",
        "presenting": "Communication", "writing": "Writing",
        "leadership": "Leadership", "managing": "Leadership",
        "management": "Leadership", "team": "Leadership",
        "analysis": "Analysis", "analytical": "Analysis",
        "data": "Analysis", "research": "Analysis",
        "creativity": "Creativity", "creative": "Creativity",
        "design": "Design", "designing": "Design", "ui": "Design",
        "ux": "Design", "figma": "Design",
        "drawing": "Drawing", "sketch": "Drawing", "art": "Drawing",
        "illustration": "Drawing",
        "biology": "Biology", "bio": "Biology", "medicine": "Biology",
        "science": "Biology",
        "writing": "Writing", "content": "Writing", "blogging": "Writing",
    }

    skills_list = []
    lower_skills = raw_skills.lower()
    for keyword, skill in skill_map.items():
        if keyword in lower_skills and skill not in skills_list:
            skills_list.append(skill)

    # Call your existing function
    career_title = recommend_career(skills_list, interest_category)

    # Career details database
    career_details = {
        "AI/ML Engineer":        {"icon": "🤖", "field": "Technology",  "description": "Build intelligent systems and machine learning models that power the future.", "avg_salary": "₹8–25 LPA", "growth_outlook": "Very High", "education_path": "B.Tech CS/IT + ML specialisation or M.Tech AI"},
        "Data Scientist":        {"icon": "📊", "field": "Technology",  "description": "Analyse complex data to drive business decisions and uncover insights.", "avg_salary": "₹6–20 LPA", "growth_outlook": "Very High", "education_path": "B.Tech + Data Science certification or M.Sc Statistics"},
        "Software Developer":    {"icon": "💻", "field": "Technology",  "description": "Design and build software applications used by millions of people.", "avg_salary": "₹4–18 LPA", "growth_outlook": "High",      "education_path": "B.Tech CS/IT or BCA + strong portfolio"},
        "Systems Analyst":       {"icon": "🔧", "field": "Technology",  "description": "Analyse and improve IT systems and infrastructure for organisations.", "avg_salary": "₹4–12 LPA", "growth_outlook": "Moderate",  "education_path": "B.Tech IT or BCA + certifications"},
        "Cloud Engineer":        {"icon": "☁️",  "field": "Technology",  "description": "Build and manage cloud infrastructure on AWS, Azure or GCP.", "avg_salary": "₹5–20 LPA", "growth_outlook": "Very High", "education_path": "B.Tech + AWS/Azure certification"},
        "Cybersecurity Analyst": {"icon": "🔒", "field": "Technology",  "description": "Protect organisations from cyber threats and data breaches.", "avg_salary": "₹4–15 LPA", "growth_outlook": "Very High", "education_path": "B.Tech CS + CEH or CISSP certification"},
        "IT Support Specialist": {"icon": "🖥️", "field": "Technology",  "description": "Provide technical support and maintain IT systems.", "avg_salary": "₹2–6 LPA",  "growth_outlook": "Stable",    "education_path": "BCA or Diploma in IT + CompTIA certifications"},
        "Entrepreneur":          {"icon": "🚀", "field": "Business",    "description": "Build your own venture and create solutions that change industries.", "avg_salary": "Unlimited", "growth_outlook": "High",      "education_path": "Any degree + MBA or startup incubator"},
        "Business Manager":      {"icon": "📈", "field": "Business",    "description": "Lead teams and drive business growth across organisations.", "avg_salary": "₹5–18 LPA", "growth_outlook": "Moderate",  "education_path": "BBA + MBA from a reputed institute"},
        "Financial Analyst":     {"icon": "💰", "field": "Finance",     "description": "Analyse financial data and guide investment and business decisions.", "avg_salary": "₹4–15 LPA", "growth_outlook": "High",      "education_path": "B.Com/BBA + CA or CFA certification"},
        "Project Manager":       {"icon": "📋", "field": "Business",    "description": "Plan and lead projects from concept to delivery on time and budget.", "avg_salary": "₹5–20 LPA", "growth_outlook": "High",      "education_path": "Any degree + PMP certification"},
        "Marketing Specialist":  {"icon": "📣", "field": "Marketing",   "description": "Create campaigns and strategies that connect brands with their audience.", "avg_salary": "₹3–12 LPA", "growth_outlook": "High",      "education_path": "BBA Marketing or Mass Communication"},
        "HR Manager":            {"icon": "👥", "field": "Business",    "description": "Manage talent, culture and people operations in organisations.", "avg_salary": "₹4–14 LPA", "growth_outlook": "Moderate",  "education_path": "BBA/MBA HR specialisation"},
        "Business Analyst":      {"icon": "🔍", "field": "Business",    "description": "Bridge the gap between business needs and technology solutions.", "avg_salary": "₹4–15 LPA", "growth_outlook": "High",      "education_path": "BBA/B.Tech + MBA or BA certification"},
        "Creative Director":     {"icon": "🎨", "field": "Creative",    "description": "Lead the creative vision for brands, campaigns and design studios.", "avg_salary": "₹6–22 LPA", "growth_outlook": "Moderate",  "education_path": "BFA or B.Des from NID/NIFT"},
        "UX/UI Designer":        {"icon": "🖌️", "field": "Design",      "description": "Design beautiful, intuitive digital experiences for apps and websites.", "avg_salary": "₹4–16 LPA", "growth_outlook": "Very High", "education_path": "B.Des or self-taught with strong portfolio"},
        "Animator":              {"icon": "🎬", "field": "Creative",    "description": "Bring characters and stories to life through 2D/3D animation.", "avg_salary": "₹3–12 LPA", "growth_outlook": "High",      "education_path": "B.Des Animation or MAAC/Arena diploma"},
        "Art Director":          {"icon": "🖼️", "field": "Creative",    "description": "Direct the visual style of films, ads, magazines and digital media.", "avg_salary": "₹5–18 LPA", "growth_outlook": "Moderate",  "education_path": "BFA + experience in design or advertising"},
    }

    details = career_details.get(career_title, {
        "icon": "💼", "field": "General",
        "description": "A rewarding career path aligned with your unique skills.",
        "avg_salary": "Varies", "growth_outlook": "Good",
        "education_path": "Relevant degree + experience"
    })

    return jsonify([{
        "title": career_title,
        "icon": details["icon"],
        "field": details["field"],
        "description": details["description"],
        "avg_salary": details["avg_salary"],
        "growth_outlook": details["growth_outlook"],
        "education_path": details["education_path"],
        "match_score": 92
    }])


@app.route("/result", methods=["POST"])
def result():
    name     = request.form.get("name", "Student")
    skills   = request.form.getlist("skills")
    interest = request.form.get("interest", "")

    career_key  = recommend_career(skills, interest)
    career_info = CAREER_DATA.get(career_key, {
        "description": "An exciting career that matches your profile.",
        "salary": "Varies",
        "icon": "≡ƒîƒ",
        "field": interest,
        "learn": ["Research this field online", "Talk to professionals", "Take online courses"],
        "scope": "Great potential with the right skills and dedication."
    })

    # Split salary into amount and source note
    raw_salary = career_info.get("salary", "")
    if " | " in raw_salary:
        parts = raw_salary.split(" | ", 1)
        salary_amount = parts[0].replace("Rs", "Γé╣")
        salary_source = parts[1]
    else:
        salary_amount = raw_salary.replace("Rs", "Γé╣")
        salary_source = ""

    return render_template(
        "result.html",
        name=name,
        skills=skills,
        interest=interest,
        career=career_key,
        career_info=career_info,
        salary_amount=salary_amount,
        salary_source=salary_source
    )


if __name__ == "__main__":
    app.run(debug=True)
