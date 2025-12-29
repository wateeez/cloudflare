// Main JS file
// ------------------ Admin Login ------------------
async function login() {
  const pass = document.getElementById('pass').value;
  const res = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ password: pass })
  });
  alert(res.ok ? 'Logged in successfully' : 'Wrong password');
}

// ------------------ Upload Artwork ------------------
const uploadForm = document.getElementById('uploadForm');
uploadForm.onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  if (res.ok) {
    alert('Artwork uploaded successfully');
    loadWorks();
    uploadForm.reset();
  } else {
    alert('Upload failed');
  }
};

// ------------------ Load Artworks ------------------
async function loadWorks() {
  const res = await fetch('/works');
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = data.map(w => `
    <div style="margin-bottom:15px">
      <img src="https://YOUR_R2_URL/${w.image}" width="150"><br>
      <input value="${w.caption}" onchange="edit(${w.id}, this.value)">
      <button onclick="del(${w.id})"> Delete</button>
    </div>
  `).join('');
}

// ------------------ Edit Caption ------------------
async function edit(id, caption) {
  await fetch('/edit', {
    method: 'POST',
    body: JSON.stringify({ id, caption })
  });
}

// ---------
