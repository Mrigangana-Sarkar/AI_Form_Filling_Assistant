let extractedEntities = {};
let filledForm = null;

/* ================= Status Helper ================= */
function showStatus(message, type) {
  const statusDiv = document.getElementById("statusMessage");
  statusDiv.textContent = message;
  statusDiv.className = `status-message status-${type}`;
  statusDiv.style.display = "block";
}

/* ================= Upload & Extract ================= */
async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first");
    return;
  }

  showStatus("⏳ Uploading document and processing OCR + AI extraction...", "processing");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:6001/api/extract", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Extraction failed");
    }

    extractedEntities = await res.json();

    document.getElementById("extractedData").textContent =
      JSON.stringify(extractedEntities, null, 2);

    document.getElementById("extractedSection").style.display = "block";

    showStatus("✅ Processing complete! Details extracted successfully.", "success");

    loadForms();

  } catch (err) {
    console.error(err);
    showStatus("❌ Error while processing the document. Please try again.", "error");
  }
}

/* ================= Load Forms ================= */
async function loadForms() {
  const res = await fetch("http://localhost:6001/api/forms");
  const data = await res.json();

  const formsDiv = document.getElementById("forms");
  formsDiv.innerHTML = "";

  data.forms.forEach(form => {
    const btn = document.createElement("button");
    btn.textContent = form.formName;
    btn.style.marginRight = "10px";
    btn.onclick = () => autoFill(form.formId);
    formsDiv.appendChild(btn);
  });

  document.getElementById("formsSection").style.display = "block";
}

/* ================= Auto-Fill ================= */
async function autoFill(formId) {
  showStatus("⏳ Auto-filling selected form...", "processing");

  try {
    const res = await fetch("http://localhost:6001/api/auto-fill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extracted_entities: extractedEntities,
        form_id: formId
      })
    });

    const data = await res.json();
    filledForm = data.filledForm;

    document.getElementById("formTitle").textContent = filledForm.formName;

    const fieldsDiv = document.getElementById("fields");
    fieldsDiv.innerHTML = "";

    filledForm.fields.forEach(field => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label><b>${field.fieldLabel}</b></label><br>
        <input value="${field.value || ""}" style="width:100%;margin-bottom:10px">
      `;
      fieldsDiv.appendChild(div);
    });

    document.getElementById("filledFormSection").style.display = "block";
    showStatus("✅ Form auto-filled successfully!", "success");

  } catch (err) {
    console.error(err);
    showStatus("❌ Failed to auto-fill form.", "error");
  }
}

/* ================= Download JSON ================= */
function downloadJSON() {
  if (!filledForm) {
    alert("No form data available");
    return;
  }

  const blob = new Blob(
    [JSON.stringify(filledForm, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "filled_form.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

