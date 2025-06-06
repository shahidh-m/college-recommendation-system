🎓 College Guidance System

📌 Overview
The College Guidance System is designed to **help students filter and find colleges based on their **cutoff marks, course preferences, caste category, and district location**.  
The system ensures dynamic, accurate recommendations** based on previous years' data, making college selection **simpler and more accessible.

## 📌 Features  
✅ Cutoff-Based College Recommendations**  
✅ Course & District Selection for Filtering**  
✅ Caste-Based Matching for Accuracy**  
✅ AI Chatbot for College Queries (Placement, Location, Fee Details)**  
✅ Frontend UI for User Input and Interaction**  
✅ Backend API Processing for Data Retrieval**  
✅ Real-Time Filtering Logic to Adjust Cutoff Range**  

---

📌 Tech Stack Used  

🔹 **Frontend (React.js)**
- **React.js** → Handles UI for college selection and filtering  
- **React Router** → Enables smooth navigation between pages  
- **Bootstrap / CSS** → Provides structured styling and responsive design  

🔹 **Backend (Node.js & Express.js)**
- **Node.js & Express.js** → Manages API requests and college data retrieval  
- **Axios** → Handles HTTP requests efficiently  
- **REST API** → Fetches relevant college recommendations dynamically  

🔹 **Database & College Data Handling**
- **CSV-based Database / JSON File** → Stores cutoff marks and college details  
- **MongoDB (Optional)** → Can be integrated for scalable storage  



📌 Setup Instructions  
🔹 **Clone the Repository**
```bash
git clone https://github.com/shahidh-m/College_Guidance_web_app.git
cd College_Guidance_web_app

🔹 Install Dependencies
bash
npm install
🔹 Run Frontend
bash
npm start
🔹 Run Backend
bash
cd backend
npm install
node server.js
📌 How It Works
1️⃣ Students enter cutoff marks, caste, district, and course preferences 2️⃣ System filters colleges matching the input criteria 3️⃣ If fewer than 5 colleges match, the cutoff range is dynamically adjusted 4️⃣ Students can ask questions via chatbot to get details on placements, accreditation, etc. 5️⃣ Recommendations include official college website links

📌 Future Improvements
✅ Real-Time College Data Updates
✅ Mobile App Integration
✅ Expanded College Database
✅ AI-Powered Counseling for Admission Guidance
