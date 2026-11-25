const EMAIL="mishytechie@gmail.com";
const $=s=>document.querySelector(s);

/* routing */
const pages=["home","about","skills","projects","games","contact"];
function route(){
  const p=pages.includes(location.hash.slice(1))?location.hash.slice(1):"home";
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.id==="v-"+p));
  document.querySelectorAll("nav a").forEach(a=>{a.hash==="#"+p?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current")});
  window.scrollTo(0,0);
}
addEventListener("hashchange",route);

/* theme */
$("#theme").onclick=()=>{
  const d=document.documentElement,dark=getComputedStyle(d).colorScheme==="dark";
  d.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("theme",d.dataset.theme)}catch(e){}
};
try{const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}

/* footer year updates itself */
$("#yr").textContent=new Date().getFullYear();

/* help desk ticket */
const T={
"Slow computer":["IT support","Check Task Manager for heavy apps","Look at startup programs and free disk space","Run updates and a malware scan","Upgrade RAM or SSD if it’s still slow"],
"No Wi-Fi":["IT support","Check other devices on the same network","Restart the router, then the device","Forget and rejoin the network","Test with a cable to rule out the adapter"],
"Need a website":["Web design","Learn your goal and audience","Sketch the pages on paper","Build a mobile-first version","Publish and test on real phones"],
"Need a logo":["Graphic design","Ask about your brand and who it’s for","Draw three rough directions","Refine the one you choose","Deliver every file format you’ll need"],
"Repetitive task":["AI automation","Map the steps you repeat","Find which steps a tool can do","Build a small automation","Add a check so you can trust it"]};
let n=1;
Object.keys(T).forEach(k=>{
  const b=document.createElement("button");b.className="chip";b.textContent=k;
  b.onclick=()=>{
    n++;$("#tk-id").textContent="Ticket #"+String(n).padStart(4,"0");
    const [cat,...s]=T[k];
    $("#tk-out").innerHTML=`<h3 style="margin:0 0 .3rem">${k}</h3><span class="tag">Routed to: ${cat}</span><ol>${s.map(x=>`<li>${x}</li>`).join("")}</ol>`;
  };
  $("#tk-btns").append(b);
});

/* skills */
const S=[
["IT support","Troubleshooting",5,"Finding the root cause, not just clearing the symptom."],
["IT support","Windows and macOS",4,"Setup, updates, user profiles and common error fixes."],
["IT support","Networking basics",3,"Wi-Fi, IP addresses, DNS and router checks."],
["IT support","Accounts and email",4,"Password resets, permissions and mailbox issues."],
["IT support","Hardware repair",3,"Diagnosing and swapping parts in laptops and desktops."],
["IT support","Remote support",4,"Guiding people through fixes calmly, in plain language."],
["IT support","Ticketing and documentation",4,"Clear ticket notes and how-to guides so fixes can be repeated."],
["Web design","HTML, CSS, JavaScript",4,"Clean, responsive pages that load fast."],
["Web design","GitHub and hosting",3,"Version control and publishing with GitHub Pages."],
["Web design","Responsive layout",4,"Pages that work on phones, tablets and desktops."],
["Graphic design","Logos and branding",3,"Simple marks that work at any size."],
["Graphic design","Social and print graphics",3,"Posters, banners and post templates."],
["AI automation","Python",3,"Scripts that clean data, rename files and automate daily tasks."],
["AI automation","Workflow automation",3,"Connecting apps so repeat tasks run themselves."],
["AI automation","Prompt design",4,"Writing clear instructions that give reliable results."],
["AI automation","APIs and webhooks",2,"Connecting tools so they send data to each other."],
["Learning","Cybersecurity",2,"Currently learning: threats, safe setup and how to protect users."]];
let sf="All";
function drawSkills(){
  $("#sk-g").innerHTML="";
  S.filter(s=>sf==="All"||s[0]===sf).forEach(s=>{
    const b=document.createElement("button");b.className="card skill";b.setAttribute("aria-expanded","false");
    b.innerHTML=`<span class="tag">${s[0]}</span><h3 style="margin:.5rem 0 0">${s[1]}</h3><div class="lvl" aria-label="Level ${s[2]} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=s[2]?"f":""}"></i>`).join("")}</div><p class="more">${s[3]}</p>`;
    b.onclick=()=>b.setAttribute("aria-expanded",b.getAttribute("aria-expanded")==="false");
    $("#sk-g").append(b);
  });
}
["All","IT support","Web design","Graphic design","AI automation","Learning"].forEach(l=>{
  const b=document.createElement("button");b.className="chip";b.textContent=l;
  b.onclick=()=>{sf=l;drawSkills();$("#sk-f").querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b))};
  b.setAttribute("aria-pressed",l===sf);$("#sk-f").append(b);
});
drawSkills();

/* projects */
const P=[
["Web design","This portfolio","A single-page site hosted on GitHub Pages, built from scratch.","https://mishy-techie.github.io/PersonalPortfolio/"],
["IT support","PC Quick Fix Toolkit","A free one-file Windows tool that fixes common PC problems and explains the results in plain English.","https://mishy-techie.github.io/PCQuickfixToolkit/"],
["IT support","IT support knowledge base","Short how-to articles for the most common support requests.","https://github.com/mishy-techie/ItSupportKnowledgeBase"],
["AI automation","Automation scripts","Python scripts that take care of repetitive everyday tasks.","https://github.com/mishy-techie/AutomationScripts"]];
P.forEach(p=>{
  const d=document.createElement("div");d.className="card";
  d.innerHTML=`<span class="tag">${p[0]}</span><h3 style="margin:.5rem 0">${p[1]}</h3><p style="color:var(--muted)">${p[2]}</p><a class="btn ghost" href="${p[3]}" target="_blank" rel="noopener">View project</a>`;
  $("#pr-g").append(d);
});

/* games */
const G=[
["Tic-tac-toe","The classic three-in-a-row game.","https://mishy-techie.github.io/tic-tac-toe/"],
["Rock paper scissors","Pick your move and beat the computer.","https://mishy-techie.github.io/rock-paper-scissors/"],
["Treasure number","A number guessing game.","https://mishy-techie.github.io/treasure-number/"]];
G.forEach(g=>{
  const d=document.createElement("div");d.className="card";
  d.innerHTML=`<h3>${g[0]}</h3><p style="color:var(--muted)">${g[1]}</p><button class="btn">Play here</button> <a class="btn ghost" href="${g[2]}" target="_blank" rel="noopener">Open in new tab</a><div class="frame"></div>`;
  const btn=d.querySelector("button"),box=d.querySelector(".frame");
  btn.onclick=()=>{
    if(box.firstChild){box.innerHTML="";btn.textContent="Play here";return}
    box.innerHTML=`<iframe src="${g[2]}" title="${g[0]}" loading="lazy"></iframe>`;btn.textContent="Close game";
  };
  $("#gm-g").append(d);
});

/* contact: sends through FormSubmit, which forwards the message to EMAIL */
$("#c-mail").textContent=EMAIL;$("#c-mail").href="mailto:"+EMAIL;
$("#cf").onsubmit=async e=>{
  e.preventDefault();
  const st=$("#c-st"),btn=$("#c-s"),f=e.target;
  btn.disabled=true;st.style.color="var(--muted)";st.textContent="Sending…";
  const d=Object.fromEntries(new FormData(f));
  d._subject="Portfolio message from "+(d.name||"a visitor");
  d._replyto=d.email;d._template="table";
  try{
    const r=await fetch("https://formsubmit.co/ajax/"+EMAIL,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});
    const j=await r.json();
    if(!r.ok||j.success==="false"||j.success===false)throw new Error(j.message||"failed");
    f.reset();st.style.color="var(--ok)";st.textContent="Message sent. Thank you, I’ll reply soon.";
  }catch(err){
    st.style.color="#D64545";st.textContent="Message not sent. Check your connection, or email me directly using the link below.";
  }
  btn.disabled=false;
};
route();
