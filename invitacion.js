'use strict';
const byId = id => document.getElementById(id);
const music = byId('music');
music.volume=.58;
function musicState(){const active=!music.paused;byId('music-toggle').setAttribute('aria-pressed',String(active));byId('music-toggle').setAttribute('aria-label',active?'Pausar música':'Reproducir música');byId('music-toggle').innerHTML=(active?'Ⅱ':'♫')+' <span>Música</span>';}
music.addEventListener('play',musicState);music.addEventListener('pause',musicState);
byId('enter').addEventListener('click',()=>{
 byId('enter').disabled=true;music.play().catch(musicState);byId('cover').classList.add('opening');
 setTimeout(()=>{byId('cover').classList.add('departing');byId('invitation').hidden=false;byId('controls').hidden=false;},650);
 setTimeout(()=>{byId('cover').hidden=true;document.body.classList.remove('sealed');window.scrollTo(0,0);document.querySelector('.main-name').focus({preventScroll:true});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.06});
 document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
 },1350);
});
byId('music-toggle').addEventListener('click',()=>{if(music.paused)music.play().catch(musicState);else music.pause();});
for(let n=0;n<18;n++){const el=document.createElement('span');el.className='floating-heart';el.textContent=n%3?'♡':'♥';el.style.cssText=`--x:${Math.random()*98}%;--heart-color:${['#bb6577','#ce918c','#a94e65'][n%3]};--size:${13+Math.random()*12}px;--speed:${14+Math.random()*13}s;--delay:-${Math.random()*25}s`;byId('romance-effects').append(el);}
for(let n=0;n<20;n++){const el=document.createElement('span');el.className='tiny-glow';el.textContent=n%2?'✧':'✦';el.style.cssText=`--x:${Math.random()*98}%;--y:${Math.random()*100}%;--size:${9+Math.random()*10}px;--speed:${3+Math.random()*5}s;--delay:-${Math.random()*8}s`;byId('romance-effects').append(el);}
byId('effects-toggle').addEventListener('click',()=>{const off=document.body.classList.toggle('effects-off');byId('effects-toggle').setAttribute('aria-pressed',String(!off));byId('effects-toggle').setAttribute('aria-label',off?'Activar animaciones':'Pausar animaciones');});
const departure=new Date('2026-10-18T10:00:00-04:00').getTime();
function updateCountdown(){const delta=Math.max(0,departure-Date.now());const values=[Math.floor(delta/86400000),Math.floor(delta/3600000)%24,Math.floor(delta/60000)%60,Math.floor(delta/1000)%60];byId('countdown').innerHTML=values.map((v,i)=>`<div><strong>${String(v).padStart(2,'0')}</strong><span>${['DÍAS','HORAS','MINUTOS','SEGUNDOS'][i]}</span></div>`).join('');if(!delta)document.querySelector('.countdown-note').textContent='Este capítulo ya forma parte de nuestra historia. ♡';}
updateCountdown();setInterval(updateCountdown,1000);
for(let n=0;n<34;n++){const day=document.createElement('span');if(n>=3){day.textContent=n-2;if(n===20){day.className='selected';day.setAttribute('aria-label','18 de octubre: mis quince años');}}else day.setAttribute('aria-hidden','true');byId('calendar-days').append(day);}
byId('song-form').addEventListener('submit',e=>{e.preventDefault();const song=byId('song').value.trim();if(!song){byId('song').focus();return;}window.open('https://wa.me/59177985994?text='+encodeURIComponent(`Hola, quiero sugerir esta canción para los quince de Mayli Luciana: ${song}`),'_blank','noopener,noreferrer');});
function publicURL(){if(location.protocol==='file:'||['127.0.0.1','localhost'].includes(location.hostname)){byId('share-status').textContent='El enlace para compartir estará listo cuando se publique la invitación.';return null;}return location.href.split('#')[0];}
async function copyLink(){const url=publicURL();if(!url)return;try{await navigator.clipboard.writeText(url);byId('share-status').textContent='Enlace copiado. Comparte esta carta con mucho cariño. ♡';}catch{byId('share-status').textContent='Puedes copiar el enlace desde la barra del navegador.';}}
byId('copy-link').addEventListener('click',copyLink);byId('share').addEventListener('click',async()=>{const url=publicURL();if(!url)return;if(navigator.share){try{await navigator.share({title:'Mayli Luciana · Mis 15 años',text:'Una carta especial para ti. Te espero el 18 de octubre para escribir juntos una tarde inolvidable.',url});}catch(e){if(e.name!=='AbortError')await copyLink();}}else await copyLink();});
