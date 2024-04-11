function get_functionForModal(data,i)
{ //Задаает массив элеметов для добавление в модальное окно
  arr = [];
  arr.push('Авторы:');
  arr.push(get_authors(data, i));
  arr.push('Описание работы:');
  arr.push(get_discriptions(data, i));
  arr.push('Ключевые слова:');
  arr.push(get_keyword_list(data, i));
  arr.push('Руководитель:');
  arr.push(get_work_supervisor(data, i));
  arr.push('Oecds:');
  arr.push(get_oecds(data, i));
  return arr;
}
function setModalData(popup,data, i)
{ //Задает Элементы в модальном окне
  arr = get_functionForModal(data, i);
  for (let j = 0; j < arr.length; j++) {
    p = document.createElement('p');
    p.innerText = arr[j];// get_authors(data, i);
    popup.appendChild(p);
  }
}


function get_page(data) { //Задает отрображение элементов для выбранной страницы
    if (document.getElementById('div_1') !== null)
        for (let i = 0; i < 10; i++) {
            if (document.getElementById(`div_${i}`))
                element = document.getElementById(`div_${i}`);
            element.remove();
        }
    if (document.getElementById('win1') !== null)
        for (let i = 0; i < 10; i++) {
            element = document.getElementById(`win1`);
            element.remove();
        }
    for (let i = 0; i < 10; i++) {
        //console.log(JSON.stringify(data[i]._source.name))
        pages = document.getElementById('pages');
        let div = document.createElement('div');
        div.classList.add('dataElement');
        div.id = 'div_' + i;
        //    <a href="#win${i}" class="button button-blue">№${i} ${data[i]._source.name}</a>
        //<a href="#x" class="overlay" id="win${i}"></a>
        //<div class="popup">
        //    Дата внутри
        //</div>
        //   ШАБЛОН ДЛЯ МОДАЛЬНОГ ОКНА
        if (data[i]._source.name) {
            pages.appendChild(div);
            a = document.createElement('a');
            a.href = `#win${i}`;
            a.classList.add("button");
            a.classList.add("button-blue");
            a.innerHTML = `№ ${i+1} ${data[i]._source.name}`;
            div.appendChild(a);
            aSub = document.createElement('a');
            aSub.href = '#x';
            aSub.classList.add("overlay");
            aSub.id = `win${i}`;
            div.appendChild(aSub);
            popup = document.createElement('div');
            popup.classList.add('popup');
            div.appendChild(popup);
            h1 = document.createElement('h1');
            h1.innerText = `${data[i]._source.name}`;
            popup.appendChild(h1);
            aClose = document.createElement('a');
            aClose.classList.add('close');
            aClose.href = '#close';
            popup.appendChild(aClose);
            setModalData(popup, data, i);
        }
    }
}