document.addEventListener('DOMContentLoaded',function(){var blockInfoDiv=document.getElementById('block-info');var ultimoHash='';function aggiungiDatiTicker(hash){if(hash!==ultimoHash){ultimoHash=hash;fetch(`https://blockstream.info/api/block/${hash}`).then(response=>response.json()).then(blockData=>{var blockElement=document.createElement('span');blockElement.textContent='Last Block - Hash: '+blockData.id+' | Altezza: '+blockData.height+' | Dimensione: '+blockData.size+' bytes | Orario: '+new Date(blockData.timestamp*1000).toLocaleString()+' | ';blockInfoDiv.innerHTML='';blockInfoDiv.appendChild(blockElement)}).catch(error=>console.error('Errore nel recuperare i dati del blocco:',error))}}
function verificaNuovoBlocco(){fetch('https://blockstream.info/api/blocks/tip/hash').then(response=>response.text()).then(hash=>{aggiungiDatiTicker(hash)}).catch(error=>console.error('Errore nel recuperare l\'hash del blocco:',error))}
verificaNuovoBlocco();setInterval(verificaNuovoBlocco,60000)});$(document).ready(function(){$(".hamburger").on('click',function(){$(".menu").toggleClass("menu--open")&&$(".hamburger").toggleClass("menu--open")});$(".menu__link").on('click',function(){$(".menu").toggleClass("menu--open")&&$(".hamburger").toggleClass("menu--open")})});ScrollReveal().reveal('.reveal',{distance:'80px',duration:600,easing:'cubic-bezier(.215, .61, .355, 1)',interval:500});ScrollReveal().reveal('.zoom',{duration:1500,easing:'cubic-bezier(.215, .61, .355, 1)',interval:200,scale:0.65,mobile:!1});document.addEventListener('DOMContentLoaded',function(){var banner=document.getElementById('tuo-banner');var bannerChiuso=!1;var elementoTarget=document.getElementById('cosa');function mostraBanner(){var posizioneTarget=elementoTarget.getBoundingClientRect().top;var altezzaFinestra=window.innerHeight;if(posizioneTarget<=altezzaFinestra&&!bannerChiuso){banner.style.display='block'}}
document.getElementById('chiudi-banner').addEventListener('click',function(){banner.style.display='none';bannerChiuso=!0});window.addEventListener('scroll',mostraBanner);mostraBanner()});document.addEventListener('DOMContentLoaded',function(){var themeSwitch=document.getElementById('theme-switch');var body=document.body;var savedTheme=localStorage.getItem('theme')||'dark-theme';body.classList.add(savedTheme);themeSwitch.addEventListener('click',function(){var newTheme=body.classList.contains('dark-theme')?'light-theme':'dark-theme';body.classList.replace(body.classList.item(0),newTheme);localStorage.setItem('theme',newTheme)})});function chiudiBanner(){document.querySelector('.banner-annuncio-head').style.display='none'}
const target=document.getElementById('type-effect');const phrases=['avvicinarsi a Bitcoin','orangepillare','condividere conoscenze','innovare insieme'];let phraseIndex=0;let letterIndex=0;let currentPhrase=[];let isDeleting=!1;let isEnd=!1;function type(){isEnd=!1;target.innerHTML=currentPhrase.join('');if(phraseIndex<phrases.length){if(!isDeleting&&letterIndex<=phrases[phraseIndex].length){currentPhrase.push(phrases[phraseIndex][letterIndex]);letterIndex++;target.innerHTML=currentPhrase.join('')}
if(isDeleting&&letterIndex<=phrases[phraseIndex].length){currentPhrase.pop(phrases[phraseIndex][letterIndex]);letterIndex--;target.innerHTML=currentPhrase.join('')}
if(letterIndex==phrases[phraseIndex].length){isEnd=!0;isDeleting=!0}
if(isDeleting&&letterIndex===0){currentPhrase=[];isDeleting=!1;phraseIndex++;if(phraseIndex==phrases.length){phraseIndex=0}}}
const spedUp=Math.random()*(80-50)+50;const normalSpeed=Math.random()*(300-200)+200;const time=isEnd?2000:isDeleting?spedUp:normalSpeed;setTimeout(type,time)}
type();document.addEventListener('DOMContentLoaded',function(){const flkty=new Flickity('.main-carousel',{});function updateCellStyles(){document.querySelectorAll('.carousel-cell').forEach(cell=>{cell.classList.remove('focus-gradient','left-gradient','right-gradient','zoom');const cellIndex=flkty.cells.indexOf(flkty.getCell(cell));if(cellIndex===flkty.selectedIndex){cell.classList.add('focus-gradient','zoom')}else if(cellIndex<flkty.selectedIndex){cell.classList.add('left-gradient')}else{cell.classList.add('right-gradient')}})}
updateCellStyles();flkty.on('change',function(){updateCellStyles()});document.querySelector('.carousel-prev').addEventListener('click',function(){flkty.previous()});document.querySelector('.carousel-next').addEventListener('click',function(){flkty.next()})});var container=document.getElementById("floating-container");var modal=document.getElementById("subscription-modal");var span=document.getElementsByClassName("close-button")[0];container.onclick=function(){if(container.classList.contains('closed')){container.classList.remove('closed');container.classList.add('open');modal.style.display='block'}else{container.classList.add('closed');container.classList.remove('open');modal.style.display='none'}};modal.onclick=function(event){event.stopPropagation()}
span.onclick=function(event){event.stopPropagation();container.classList.add('closed');container.classList.remove('open');modal.style.display='none'}