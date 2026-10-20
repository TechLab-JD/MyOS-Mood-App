const root=document.getElementById('MoodApp');
if(root){
  const $=id=>root.querySelector('#'+id);const MOODS=['😢','🙁','😐','🙂','😄'];
  const today=new Date().toISOString().slice(0,10);let sel=3,data={};
  try{data=JSON.parse(localStorage.getItem('myos.mood')||'{}');}catch(e){}
  if(data[today])sel=data[today].m;
  function save(){try{localStorage.setItem('myos.mood',JSON.stringify(data));}catch(e){}}
  function pick(){const p=$('md-pick');p.innerHTML='';MOODS.forEach((e,i)=>{const b=document.createElement('button');b.textContent=e;if(i===sel)b.classList.add('on');b.onclick=()=>{sel=i;pick();};p.appendChild(b);});}
  function hist(){const h=$('md-hist');h.innerHTML='';for(let i=0;i<14;i++){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);const rec=data[k];
    const row=document.createElement('div');row.className='md-day';
    row.innerHTML='<span class="d">'+k.slice(5)+'</span><span class="e">'+(rec?MOODS[rec.m]:'·')+'</span><span class="n"></span>';
    if(rec&&rec.note)row.querySelector('.n').textContent=rec.note;h.appendChild(row);}}
  $('md-save').onclick=()=>{data[today]={m:sel,note:$('md-note').value.trim()};save();hist();};
  if(data[today])$('md-note').value=data[today].note||'';
  pick();hist();
}
