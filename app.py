# ============================================================
# app.py — Career Recommender (Indian Edition)
# ============================================================

from flask import Flask, render_template, request

app = Flask(__name__)


# ============================================================
# CAREER DATA — Indian Salaries + Learning Path
# ============================================================

CAREER_DATA = {

    # ── TECH ────────────────────────────────────────────────
    "Data Scientist": {
        "description": "Analyze large datasets to find patterns and help companies make smart decisions using Python and statistics.",
        "salary": "₹6,00,000 – ₹18,00,000/yr",
        "icon": "📊",
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
        "salary": "₹4,00,000 – ₹15,00,000/yr",
        "icon": "💻",
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
        "salary": "₹8,00,000 – ₹25,00,000/yr",
        "icon": "🤖",
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
        "salary": "₹5,00,000 – ₹16,00,000/yr",
        "icon": "🔐",
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
        "salary": "₹6,00,000 – ₹18,00,000/yr",
        "icon": "☁️",
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
        "salary": "₹4,50,000 – ₹10,00,000/yr",
        "icon": "🖥️",
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
        "salary": "₹2,50,000 – ₹6,00,000/yr",
        "icon": "🛠️",
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

    # ── BUSINESS ────────────────────────────────────────────
    "Business Manager": {
        "description": "Lead teams and oversee business operations to achieve company goals.",
        "salary": "₹6,00,000 – ₹18,00,000/yr",
        "icon": "🏢",
        "field": "Business",
        "learn": [
            "MBA or Business Management degree",
            "Leadership & Team Management",
            "Financial basics & Budgeting",
            "Business Strategy frameworks",
            "MS Excel & Business Analytics"
        ],
        "scope": "Management roles are always in demand across all industries in India — retail, tech, banking, healthcare, and more."
    },
    "Project Manager": {
        "description": "Plan, execute, and close projects while managing teams, budgets, and timelines.",
        "salary": "₹5,00,000 – ₹15,00,000/yr",
        "icon": "📋",
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
        "salary": "₹3,00,000 – ₹10,00,000/yr",
        "icon": "📣",
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
        "salary": "₹0 – Unlimited potential",
        "icon": "🚀",
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
        "salary": "₹4,00,000 – ₹12,00,000/yr",
        "icon": "💹",
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
        "salary": "₹4,00,000 – ₹12,00,000/yr",
        "icon": "🤝",
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
        "salary": "₹4,50,000 – ₹12,00,000/yr",
        "icon": "📈",
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

    # ── ARTS ────────────────────────────────────────────────
    "Creative Director": {
        "description": "Lead the visual and creative vision for brands, agencies, or media companies.",
        "salary": "₹8,00,000 – ₹25,00,000/yr",
        "icon": "🎭",
        "field": "Arts",
        "learn": [
            "Advanced Adobe Creative Suite",
            "Brand Strategy & Identity design",
            "Leadership & Team management",
            "Campaign planning & execution",
            "Portfolio building on Behance"
        ],
        "scope": "India's advertising and media industry is worth ₹90,000 crore. Creative directors are among the highest paid in the creative sector."
    },
    "UX/UI Designer": {
        "description": "Design beautiful and user-friendly digital interfaces for apps and websites.",
        "salary": "₹4,00,000 – ₹15,00,000/yr",
        "icon": "🎨",
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
        "description": "Create visual content — logos, posters, branding — for businesses and media.",
        "salary": "₹2,50,000 – ₹8,00,000/yr",
        "icon": "✏️",
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
        "salary": "₹2,50,000 – ₹8,00,000/yr",
        "icon": "📝",
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
        "salary": "₹3,00,000 – ₹10,00,000/yr",
        "icon": "🎬",
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
        "salary": "₹5,00,000 – ₹14,00,000/yr",
        "icon": "🖼️",
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
        "salary": "₹2,00,000 – ₹6,00,000/yr",
        "icon": "🏫",
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

    # ── SCIENCE ─────────────────────────────────────────────
    "Research Scientist": {
        "description": "Conduct experiments and publish findings to advance human knowledge in your field.",
        "salary": "₹5,00,000 – ₹15,00,000/yr",
        "icon": "🔬",
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
        "salary": "₹4,00,000 – ₹12,00,000/yr",
        "icon": "🧬",
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
        "salary": "₹4,00,000 – ₹10,00,000/yr",
        "icon": "🧮",
        "field": "Science",
        "learn": [
            "Python (Pandas, SciPy, Matplotlib)",
            "R programming for statistics",
            "SQL for data querying",
            "Excel (advanced formulas & pivot tables)",
            "Power BI or Tableau"
        ],
        "scope": "Every industry needs data analysts — pharma, healthcare, agriculture, and government agencies. Excellent entry-level job with quick salary growth."
    },
    "Environmental Scientist": {
        "description": "Study the environment and develop solutions to protect ecosystems and address climate change.",
        "salary": "₹3,00,000 – ₹9,00,000/yr",
        "icon": "🌍",
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
        "salary": "₹4,00,000 – ₹12,00,000/yr",
        "icon": "🧪",
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
        "salary": "₹4,00,000 – ₹12,00,000/yr",
        "icon": "📐",
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
        "salary": "₹1,80,000 – ₹5,00,000/yr",
        "icon": "⚗️",
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

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/result", methods=["POST"])
def result():
    name     = request.form.get("name", "Student")
    skills   = request.form.getlist("skills")
    interest = request.form.get("interest", "")

    career_key  = recommend_career(skills, interest)
    career_info = CAREER_DATA.get(career_key, {
        "description": "An exciting career that matches your profile.",
        "salary": "Varies",
        "icon": "🌟",
        "field": interest,
        "learn": ["Research this field online", "Talk to professionals", "Take online courses"],
        "scope": "Great potential with the right skills and dedication."
    })

    return render_template(
        "result.html",
        name=name,
        skills=skills,
        interest=interest,
        career=career_key,
        career_info=career_info
    )


if __name__ == "__main__":
    app.run(debug=True)