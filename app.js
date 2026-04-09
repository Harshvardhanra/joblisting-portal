// ---- Auth Helpers ----
function getCurrentUser(){
  return JSON.parse(localStorage.getItem('tb_current')||'null');
}
function requireAuth(role){
  const u=getCurrentUser();
  if(!u){ window.location.href='../index.html'; return null; }
  if(role && u.role!==role){ window.location.href='../index.html'; return null; }
  return u;
}
function logout(){
  localStorage.removeItem('tb_current');
  window.location.href='../index.html';
}

// ---- Jobs ----
function getJobs(){
  return JSON.parse(localStorage.getItem('tb_jobs')||'[]');
}
function saveJobs(jobs){
  localStorage.setItem('tb_jobs',JSON.stringify(jobs));
}
function getJobById(id){
  return getJobs().find(j=>j.id==id)||null;
}

// ---- Users ----
function getUsers(){
  return JSON.parse(localStorage.getItem('tb_users')||'[]');
}
function saveUsers(users){
  localStorage.setItem('tb_users',JSON.stringify(users));
}
function updateCurrentUser(data){
  const users=getUsers();
  const idx=users.findIndex(u=>u.email===data.email);
  if(idx>-1){ users[idx]={...users[idx],...data}; saveUsers(users); }
  localStorage.setItem('tb_current',JSON.stringify({...getCurrentUser(),...data}));
}

// ---- Toast ----
function showToast(msg, type='success'){
  let t=document.getElementById('global-toast');
  if(!t){ t=document.createElement('div'); t.id='global-toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent= (type==='success'?'✓ ':'✕ ') + msg;
  t.className='toast '+type+' show';
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ---- Modal ----
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

// ---- Sidebar User ----
function renderSidebarUser(){
  const u=getCurrentUser(); if(!u) return;
  const av=document.getElementById('sb-avatar');
  const nm=document.getElementById('sb-name');
  const rl=document.getElementById('sb-role');
  if(av) av.textContent=u.name.charAt(0).toUpperCase();
  if(nm) nm.textContent=u.name;
  if(rl) rl.textContent=u.role==='employer'?'Employer':'Job Seeker';
}

// ---- Date Fmt ----
function fmtDate(iso){
  return new Date(iso).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
}

// ---- Job Card HTML ----
function jobCardHTML(job, actions=''){
  const icons=['💼','🖥️','🎨','📊','🔬','📱','☁️','🏗️'];
  const icon=icons[job.id%icons.length];
  return `
  <div class="job-card" style="cursor:default">
    <div class="job-logo">${icon}</div>
    <div class="job-info">
      <div class="job-title">${job.title}</div>
      <div class="job-company">${job.company}</div>
      <div class="job-tags">
        <span class="tag tag-loc">📍 ${job.location}</span>
        <span class="tag tag-type">${job.type}</span>
        <span class="tag tag-salary">💰 ${job.salary}</span>
      </div>
    </div>
    <div class="job-actions">${actions}</div>
  </div>`;
}
