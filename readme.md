# 🧠 AI-Powered Government Form Filling Assistant

An intelligent system that automatically extracts information from government documents (PDF/images) using OCR and AI, and auto-fills multiple government forms with high accuracy using smart field mapping.

---

## 📌 Project Overview

Government form filling is often time-consuming and error-prone. This project automates the process by extracting key details from uploaded documents and intelligently mapping them to different government form templates.

---

## 🚀 Key Features

- Upload scanned PDF or image documents  
- OCR-based text extraction  
- AI-powered entity extraction  
- Deterministic validation using regex  
- Intelligent form field mapping  
- Editable auto-filled forms  
- Download filled forms as JSON and PDF  

---

## 🏗️ System Architecture

The system is divided into two main components:

- **Frontend**
  - File upload interface
  - Status messages for processing
  - Form selection and preview
  - Download options (JSON / PDF)

- **Backend**
  - OCR processing
  - AI-based entity extraction
  - Validation and normalization
  - Intelligent form mapping
  - REST APIs using Flask

---


---

## 🧠 Entity Extraction Workflow

1. OCR extracts raw text from uploaded documents  
2. AI model attempts structured entity extraction  
3. Extracted data is validated and normalized  
4. Regex-based fallback ensures reliability  
5. Final structured entities are returned  

---

## 🧩 Form Mapping Logic

Form mapping is performed sequentially using three strategies:

1. **Direct Mapping**
   - Matches form `dataSource` with extracted entities

2. **Fuzzy Mapping**
   - Uses string similarity when direct mapping fails

3. **Field ID Mapping**
   - Final fallback when fuzzy mapping fails

---

## 🛠️ Tools and Technologies Used

- **Python** – Backend programming language  
- **Flask** – REST API framework  
- **HTML** – Frontend structure  
- **CSS** – Styling and layout  
- **JavaScript** – Frontend logic  
- **EasyOCR** – Optical character recognition  
- **PyMuPDF** – PDF to image conversion  
- **Groq LLM API** – AI entity extraction  
- **Regular Expressions** – Validation and fallback  
- **JSON** – Data exchange and templates  
- **jsPDF** – PDF generation  

---



