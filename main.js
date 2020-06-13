let key = 0;
// 要素追加
document.getElementById('button').onclick = function() {
   let new_text = document.getElementById('input-text').value;
   let li_content = document.createElement('li');
   li_content.classList.add(key);
   // li_content.setAttribute('id',key)
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
      $('#save').click(function(){
         let save_target = document.getElementById('save');
         var sound = new Audio('decision1.mp3')
         sound.play();
         save_target.classList.add('save-class')
         save_target.value = 'セーブ完了';
         let target_content = document.getElementsByClassName('content');
         let target_count = document.getElementsByClassName('content').length;
         let array = [];
         let i = 0;
         let target_a 
         let obj
         while (i < target_count) {
            // console.log(target_content[i].value)
            target_a = target_content[i].value
            obj = {target_a}
            array.push(obj);
            i++;
         } 
         let setjson = JSON.stringify(array);
         localStorage.setItem('date',setjson);
         localStorage.getItem('date')
         let textchange_save = function(){
            save_target.classList.remove('save-class');
            save_target.value = 'セーブ';
         }
         setTimeout(textchange_save,1000);
      });

      $('#load').click(function(){
         let getdate = localStorage.getItem('date');
         let getcontent = JSON.parse(getdate);
         if(getcontent == null){
            window.alert('データがありません');
         }else{
            var sound = new Audio('decision1.mp3')
            sound.play();
            let load_target = document.getElementById('load');
            load_target.classList.add('load-class');
            load_target.value = 'ロード完了'
            
            let target_count = getcontent.length;
            let i = 0;
            let target = document.getElementById('content');
            let textchange_target =function(){
               load_target.classList.remove('load-class');
               load_target.value = 'ロード';
            }
            setTimeout(textchange_target,1000)
            while (i<target_count) {
            let gettext = getcontent[i].target_a
            let li_content = document.createElement('li');
            li_content.classList.add(key)
            let elemLi = document.createElement('input');
            elemLi.type ='text';
            elemLi.value = getcontent[i].target_a;
            li_content.appendChild(elemLi);
            elemLi.classList.add('content');
            elemLi.classList.add(key);
            // elemLi.setAttribute('id',key)
            li_content.append(elemLi);
            document.getElementById('content').appendChild(li_content);
            // li_content.appendChild(target);
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
            i++
         } //while終わり
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
         })}
      });
      
      $('#remove').click(function(){
         localStorage.removeItem('date');
      })