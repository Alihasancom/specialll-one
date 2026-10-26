const slides=[...document.querySelectorAll('.slide')], dotsBox=document.getElementById('dots');let current=0;
slides.forEach((_,i)=>{const b=document.createElement('button');b.className='dot'+(i===0?' active':'');b.setAttribute('aria-label','Go to slide '+(i+1));b.onclick=()=>show(i);dotsBox.appendChild(b)});
const dots=[...dotsBox.children];function show(n){current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('.next').forEach(b=>b.onclick=()=>show(current+1));document.getElementById('prev').onclick=()=>show(current-1);document.getElementById('nextNav').onclick=()=>show(current+1);document.getElementById('replay').onclick=()=>show(0);
const audio=document.getElementById('audio'),music=document.getElementById('music');
audio.volume=0.22;
let trackReady=true, musicStartAttempted=false;
music.textContent='♫ Play music';
async function toggleMusic(){
  if(audio.paused){
    try{await audio.play();music.textContent='♫ Pause music';}
    catch(e){toast('Tap Play music again to start the song.');}
  }else{audio.pause();music.textContent='♫ Play music';}
}
music.onclick=toggleMusic;
audio.onplay=()=>music.textContent='♫ Pause music';
audio.onpause=()=>music.textContent='♫ Play music';
document.querySelectorAll('.next').forEach((b)=>b.addEventListener('click',()=>{
  if(!musicStartAttempted){
    musicStartAttempted=true;
    audio.play().then(()=>music.textContent='♫ Pause music').catch(()=>{music.textContent='♫ Play music';});
  }
}));
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3500)}
show(0);
// Tap seven falling hearts to unlock the birthday website.
const gate=document.getElementById('heartGate');
const heartField=document.getElementById('fallingHearts');
const heartCounter=document.getElementById('heartCount');
const unlockButton=document.getElementById('unlockButton');
let heartsCollected=0, heartSpawnTimer=null;
function spawnHeart(){
  if(!gate || !gate.isConnected) return;
  const h=document.createElement('button'); h.type='button'; h.className='heart-rain';
  h.textContent=['♡','♥','💗','💕'][Math.floor(Math.random()*4)];
  h.setAttribute('aria-label','Collect a falling heart');
  h.style.left=(4+Math.random()*88)+'%';
  h.style.animationDuration=(4.8+Math.random()*3.5)+'s';
  h.style.fontSize=(24+Math.random()*18)+'px';
  h.addEventListener('click',()=>{
    if(h.dataset.caught) return; h.dataset.caught='yes'; heartsCollected++; heartCounter.textContent=heartsCollected;
    h.textContent='✦'; h.style.animationPlayState='paused'; h.style.opacity='0'; h.style.transform='scale(1.8)';
    setTimeout(()=>h.remove(),180);
    if(heartsCollected>=7){unlockButton.disabled=false;unlockButton.textContent='Open your surprise ♡';toast('You collected all 7 hearts! Your surprise is ready. ❤️');}
  });
  heartField.appendChild(h); setTimeout(()=>h.remove(),8500);
}
for(let i=0;i<7;i++) setTimeout(spawnHeart,i*420);
heartSpawnTimer=setInterval(()=>{if(heartsCollected<7)spawnHeart();else clearInterval(heartSpawnTimer)},850);
unlockButton.addEventListener('click',()=>{if(heartsCollected<7)return;gate.remove();document.body.classList.remove('locked');show(0);});
