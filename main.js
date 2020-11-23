//初期設定
let key = 0;
let modal = document.getElementById('modal');
let newsave_data = document.getElementById('newsavebutton');
let newdataname = document.getElementById('dataname');
let newdateok = document.getElementById('okbutton');
// 要素追加
document.getElementById('button').onclick = function() {
   let new_text = document.getElementById('input-text').value;
   let li_content = document.createElement('li');
   li_content.classList.add(key);
   li_content.setAttribute('id','list');
   document.getElementById('content').appendChild(li_content);
   let elemLi = document.createElement('input');   
   elemLi.type ='text';
   elemLi.value = new_text;
   li_content.appendChild(elemLi);
   elemLi.classList.add('content');
   elemLi.classList.add(key);
   // elemLi.setAttribute('id',key)
   let new_sound = new Audio('decision7.mp3')
   new_sound.play();
   // コピーボタン追加
   let addButton = document.createElement('input');
   addButton.type = 'button';
   addButton.value = 'コピー'
   addButton.name = 'button-name';
   addButton.classList.add('button-class',key);
   addButton.setAttribute('id',key);
   li_content.appendChild(addButton);
   // 削除ボタン追加
   let remove_button = document.createElement('input');
   remove_button.type = 'button';
   remove_button.value = '削除'
   remove_button.classList.add('remove_button-class',key);
   remove_button.setAttribute('id',key);
   li_content.appendChild(remove_button)
   key++;
   // コピー
   $('.button-class').click(function(){
      let target_id = this.getAttribute('id');
      console.log(target_id);
      let textchange_target = document.getElementById(target_id);
      let target_a =  document.getElementsByClassName(target_id);
      let area = document.createElement('textarea');
      area.textContent = target_a[1].value;
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy');
      document.body.removeChild(area);
      var sound = new Audio('decision1.mp3')
      sound.play();
      textchange_target.classList.add('push-class');
      textchange_target.value = 'コピー完了';
      let textchange = function(){
         textchange_target.value = 'コピー'
         textchange_target.classList.remove('push-class');
      };
      setTimeout(textchange,1500);
   });
   // 削除
   $('.remove_button-class').click(function(){
      let remove_id = this.getAttribute('id');
      let remove_a = document.getElementsByClassName(remove_id); 
      $(remove_a).remove();
      let remove_sound = new Audio('cancel2.mp3');
      remove_sound.play();
   })
   
   
   
   
}
//セーブデータリストをクリック
function getId(num){
   let target_content = document.getElementsByClassName('content');
   let target_count = target_content.length;
   let savedetacount = localStorage.length;
   let num_value = num
   let array = [];
   let target_a;
   let obj;
   let i = 0;
   while (i < target_count) {
      // console.log(target_content[i].value)
      target_a = target_content[i].value
      obj = {target_a}
      array.push(obj);
      i++;
   } 
   let setjson = JSON.stringify(array);
   console.log(num_value)
   localStorage.setItem(num_value,setjson);
   localStorage.getItem(num_value);
   
   i = 0;
   
   var sound = new Audio('decision1.mp3')
   sound.play();
   while(i < savedetacount){
      let savenamelist = document.getElementById('savecontent');
      savenamelist.remove();
      i++;
   }
   modal.style.display = 'none'; 
   num = null;  
   newdataname.style.display='none';
   newdateok.style.display='none';
}

$('#save').click(function(){
   modal.style.display = "block";
   newsave_data.style.display = 'inline-block'
   let savelist = document.getElementById('savelist');
   let saveul = document.getElementById('saveul')
   let modal_text = document.getElementById('modal-text');
   modal_text.innerText = 'どのデータにセーブにしますか';
   saveul.style.display='block';
   // let newsave_data  = document.createElement("input");
   // newsave_data.type = "button";
   // newsave_data.value = '新しくデータを作る';
   // newsave_data.setAttribute('class','newsavebutton');
   // newsave_data.setAttribute('id','newsavebutton');
   // saveul.appendChild(newsave_data);
   

   //リストを表示させる
   let savecount = localStorage.length;
   if(savecount >= 0){
      let i = 0;
      while(i < savecount){
         let savename = localStorage.key(i);
         // console.log(savename);
         let savenamelist = document.createElement('li');
         let savenamecontent = document.createElement("a");
         let savedelete = document.createElement('input');
         savenamecontent.innerText = savename;
         savenamelist.setAttribute("class",'savecontent');
         savenamelist.setAttribute("innerText",savename)
         savenamelist.setAttribute('id','savecontent');
         savenamelist.setAttribute('onclick','getId(this.innerText);');
         savenamelist.appendChild(savenamecontent);
         savelist.appendChild(savenamelist);
         i++
      }
   } 
   $('#newsavebutton').click(function(){
      newsave_data.style.display = "none";
      newdataname.style.display = 'inline';
      newdateok.style.display = 'inline';
      // let newdataname = document.createElement('input');
      // // let newdateok = document.createElement('input');
      // newdataname.type = 'text';
      // newdateok.type = 'button'
      // newdataname.placeholder = 'セーブデータの名前';
      // newdateok.value = 'セーブ';
      // // newdateok.setAttribute('id','okbutton');
      // newdateok.setAttribute('class','okbutton');
      // // newdataname.setAttribute('class','dataname');
      // saveul.appendChild(newdataname);
      // saveul.appendChild(newdateok);
   })
   $('#okbutton').off('click');
   $('#okbutton').on('click',function(){
      let dataname = newdataname.value;
      let target_content = document.getElementsByClassName('content');
      let target_count = document.getElementsByClassName('content').length;
      let savedetacount = localStorage.length;
      let array = [];
      let i = 0;  
      let target_a 
      let obj
      while (i < target_count) {
         target_a = target_content[i].value
         obj = {target_a}
         array.push(obj);
         i++;
      } 
      let setjson = JSON.stringify(array);
      localStorage.setItem(dataname,setjson);
      localStorage.getItem(dataname);
      var sound = new Audio('decision1.mp3')
      sound.play();
      
      modal.style.display = 'none';
      newsave_data.style.display='none';
      newdataname.style.display='none';
      newdateok.style.display='none';
      
      i = 0;
      while(i < savedetacount){
         let savenamelist = document.getElementById('savecontent');
         savenamelist.remove();
         i++;
      }
      savedetacount = 0;
      
      // saveul.remove(newdateok);
      // saveul.remove(newsave_data);
   })       
})


$('#load').click(function(){
   // let newsave_data  = document.createElement("input");
   // newsave_data.type = "button";
   // newsave_data.value = '新しくデータを作る';
   // newsave_data.setAttribute('class','newsavebutton');
   // newsave_data.setAttribute('id','newsavebutton');
   // saveul.appendChild(newsave_data);
   i　=　0;
   let target = document.getElementsByClassName('content');
   let target_count =  target.length
   console.log(target_count);
   while(i<target_count){
      let list = document.getElementById('list');
      list.remove();
      i++;
   }
   
   //リストを表示させる
   let savecount = localStorage.length;
   if(savecount > 0){
      modal.style.display = "block";
      newsave_data.style.display = 'inline-block'
      let savelist = document.getElementById('savelist');
      let saveul = document.getElementById('saveul')
      let modal_ul = document.getElementById('modal-text')
      saveul.style.display='none';
      modal_ul.innerText ='どのデータをロードしますか？'
      let i = 0;
      while(i < savecount){
         let savename = localStorage.key(i);
         console.log(savename);
         let savenamelist = document.createElement('li');
         let savenamecontent = document.createElement("a");
         let savedelete = document.createElement('input');
         savenamecontent.innerText = savename;
         savenamelist.setAttribute("class",'savecontent');
         savenamelist.setAttribute("innerText",savename)
         savenamelist.setAttribute('id','savecontent');
         savenamelist.setAttribute('onclick','loaddeta(this)');
         savenamelist.appendChild(savenamecontent);
         savelist.appendChild(savenamelist);
         
         i++
      }
   } 
   else{
      window.alert('データがありません');
   }})
   
   function loaddeta(loadkey){
      
      
      modal.style.display = 'none';
      let getdate = localStorage.getItem(loadkey.innerText);
      let getcontent = JSON.parse(getdate);
      var sound = new Audio('decision1.mp3')
      sound.play();
      let target_count = getcontent.length;
      
      let i = 0;
      
      while (i<target_count) {
         let gettext = getcontent[i].target_a
         let li_content = document.createElement('li');
         li_content.classList.add(key)
         li_content.setAttribute('id','list')
         let elemLi = document.createElement('input');
         elemLi.type ='text';
         elemLi.value = gettext;
         li_content.appendChild(elemLi);
         elemLi.classList.add('content');
         elemLi.classList.add(key);
         // elemLi.setAttribute('id',key)
         li_content.append(elemLi);
         document.getElementById('content').appendChild(li_content);
         // li_content.appendChild(target);
         // let new_sound = new Audio('decision7.mp3')
         // new_sound.play();
         // コピーボタン追加
         let addButton = document.createElement('input');
         addButton.type = 'button';
         addButton.value = 'コピー'
         addButton.name = 'button-name';
         addButton.classList.add('button-class',key);
         addButton.setAttribute('id',key);
         li_content.appendChild(addButton);
         // 削除ボタン追加
         let remove_button = document.createElement('input');
         remove_button.type = 'button';
         remove_button.value = '削除'
         remove_button.classList.add('remove_button-class',key);
         remove_button.setAttribute('id',key);
         li_content.appendChild(remove_button)
         key++;
         i++
         
         
         
         
      } //while終わり
      let savedetacount = localStorage.length;
      i=0; 
      while(i < savedetacount){
         let savenamelist = document.getElementById('savecontent');
         savenamelist.remove();
         i++;
      }
      
      //コピー
      $('.button-class').click(function(){
         let target_id = this.getAttribute('id');
         console.log(target_id)
         let textchange_target = document.getElementById(target_id);
         let target_a =  document.getElementsByClassName(target_id);
         let area = document.createElement('textarea');
         console.log(target_a)
         area.textContent = target_a[1].value;
         document.body.appendChild(area)
         area.select()
         document.execCommand('copy');
         document.body.removeChild(area);
         var sound = new Audio('decision1.mp3')
         sound.play();
         textchange_target.classList.add('push-class');
         textchange_target.value = 'コピー完了';
         let textchange = function(){
            textchange_target.value = 'コピー'
            textchange_target.classList.remove('push-class');
         };
         setTimeout(textchange,1500);
      });
      // 削除
      $('.remove_button-class').click(function(){
         let remove_id = this.getAttribute('id');
         let remove_a = document.getElementsByClassName(remove_id); 
         $(remove_a).remove();
         let remove_sound = new Audio('cancel2.mp3');
         remove_sound.play();
      })
   };
   
   function detaremove(de){
      let savedetacount = localStorage.length;
      i=0; 
      while(i < savedetacount){
         let savenamelist = document.getElementById('savecontent');
         savenamelist.remove();
         i++;
      }
      
      let delete_deta = de.innerText;
      let remove_sound = new Audio('cancel2.mp3')
      localStorage.removeItem(delete_deta);
      remove_sound.play();
      modal.style.display ='none';


   }
   
   
   $('#remove').click(function(){
      modal.style.display ='block';
      let savecount = localStorage.length;
      if(savecount > 0){
         modal.style.display = "block";
         newsave_data.style.display = 'inline-block'
         let savelist = document.getElementById('savelist');
         let saveul = document.getElementById('saveul')
         let modal_ul = document.getElementById('modal-text')
         saveul.style.display='none';
         modal_ul.innerText ='どのデータを削除しますか？'
          i = 0;
         while(i < savecount){
            let savename = localStorage.key(i);
            // console.log(savename);
            let savenamelist = document.createElement('li');
            let savenamecontent = document.createElement("a");
            let savedelete = document.createElement('input');
            savenamecontent.innerText = savename;
            savenamelist.setAttribute("class",'savecontent');
            savenamelist.setAttribute("innerText",savename)
            savenamelist.setAttribute('id','savecontent');
            savenamelist.setAttribute('onclick','detaremove(this)');
            savenamelist.appendChild(savenamecontent);
            savelist.appendChild(savenamelist);
         i++
         }
      }else{
         alert('データがありません');
         modal.style.display ='none'
      }
})
   