let uid1 = '';


async function get_pages(uid,diss,nioktr,rid,nauch,sort) {
  saw = await  axios.get(`/api/pages/${uid}/${diss}/${nioktr}/${rid}/${nauch}/${sort}`)
        .then(function (response) {
            // handle success
            //let d = document.createElement('div');
            //d.innerText = response.data.value;
            //document.body.append(d);
            console.log('responceByUID', response.data.value);
            return response.data.value;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    return saw;
}

async function get_page_by_id(id,uid) {
  saw = await  axios.get(`/pages/${uid}/${id}`)
        .then(function (response) {
            // handle success
            //let d = document.createElement('div');
            //d.innerText = response.data.value;
            //document.body.append(d);
            console.log('responceByid', response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    return saw;
}



async function pagesbyUid(uid)
{
    uid1 = uid;
    
    let res = await get_pages(uid);
    
    //console.log('diss',diss.checked);
    console.log('res', res);
    createPages(res);
}


async function change_page(i,uid)
{   let vuz = document.getElementById('vuz-select').value;
    let res = await get_page_by_id(i,vuz);
    await get_page(res.data);
    console.log('resID', i);
    createPages(i)




}
let RRRRR = 0;

async function show()
{
    let diss = document.getElementById('diss').checked;
    let nioktr = document.getElementById('nioktr').checked;
    let rid = document.getElementById('rid').checked;
    let nauch = document.getElementById('nauch').checked;
    let vuz = document.getElementById('vuz-select').value;
    let sort = document.getElementById('sort-select').value;
    console.log('diss.checked', diss);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    let res = await get_pages(vuz, diss, nioktr, rid, nauch, sort);
    //Analysis(res);\
    //showAnalysis();
    RRRRR = res;
    createPages(1);
    if (document.getElementById('pages'))
        document.getElementById('pages').remove();
    
}
async function show2()
{
    let diss = document.getElementById('diss').checked;
    let nioktr = document.getElementById('nioktr').checked;
    let rid = document.getElementById('rid').checked;
    let nauch = document.getElementById('nauch').checked;
    let vuz = document.getElementById('vuz-select').value;
    let sort = document.getElementById('sort-select').value;
    console.log('diss.checked', diss);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    let res = await get_pages(vuz, diss, nioktr, rid, nauch, sort);
    //Analysis(res);\
    showAnalysis();
    //RRRRR = res;
    //createPages(1);
    //if (document.getElementById('pages'))
    //    document.getElementById('pages').remove();
    
}
function createPages(currentP)
{
    console.log('RRRRR', RRRRR);
    let res = RRRRR;
    j = 0;
    res = res / 10;
    res = Math.floor(res);
    console.log('res', res);
    if (document.getElementById(`${1}`) !== null)
        while(document.getElementById(`${j + 1}`)!==null)
    {
        if (document.getElementById(`${j + 1}`) !== null)
                element = document.getElementById(`${j + 1}`);
            element.remove();
            j++
        }
    
      if (document.getElementById('btns'))
        document.getElementById('btns').remove();
    
    
        div = document.createElement('div')
        div.id = 'pages';
        document.body.append(div);
        divb = document.createElement('div')
        divb.id = 'btns';
        document.body.append(divb);
        
    
    
    
    if (document.getElementById('first'))
        document.getElementById('first').remove();
            
    if (document.getElementById('last'))
        document.getElementById('last').remove();
            
        btn = document.createElement('button');
        btn.addEventListener('click', () => { return change_page(1, uid1); });
    console.log('uid1', uid1);
    btn.innerText = 'Первая';
    btn.id = 'first';
    divb.appendChild(btn);

    

    //for (let i = 0; i <= res; i++) {
    //    btn = document.createElement('button');
    //    btn.addEventListener('click', () => { return change_page(i + 1, uid1); });
    //    console.log('uid1', uid1);
    //    btn.innerText = i + 1;
    //    btn.id = i + 1;
    //    divb.appendChild(btn);
    //    
    //}
    
        let min_page = currentP - 2;
        let max_page = currentP + 2;
        if (min_page < 1) {
          min_page = 0;
          max_page = 4;
    }
    console.log('res', res);
        if (max_page > res)
        {
          max_page = Math.ceil(currentP);
          min_page = Math.ceil(currentP) - 4;
        } 
          for (let i = min_page; i <= max_page; i++) {
        btn = document.createElement('button');
        btn.addEventListener('click', () => { return change_page(i + 1, uid1); });
        console.log('uid1', uid1);
        btn.innerText = i + 1;
        btn.id = i + 1;
        divb.appendChild(btn);
        
    }
btnl = document.createElement('button');
    btnl.addEventListener('click', () => { return change_page(res+1 , uid1); });
    console.log('uid1', uid1);
    btnl.innerText = 'Последняя';
    btnl.id = 'last';
    divb.appendChild(btnl);

}




listUniversirty = [10184556,10192406,10178176,10109220]


//for (let i = 1; i <= 4; i++) {
//    btn = document.getElementById(`btn${i}`);
//    btn.addEventListener('click', () => {
//        return pagesbyUid(listUniversirty[i - 1]);
//    });
//}


btnSub = document.getElementById('getDATA');
btnSub.addEventListener('click', () => {
    return show();
});
btnSub = document.getElementById('getDATA2');
btnSub.addEventListener('click', () => {
    return show2();
});



function Analysis(res) {
    if (document.getElementById('myChart'))
        document.getElementById('myChart').remove();
    let chart = document.getElementById('chart');
    let canvas = document.createElement('canvas')
    canvas.id = 'myChart';
    chart.appendChild(canvas);
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Кубгу', 'Кубгту', 'Кубгаy', 'Кубгму'],
            datasets: [{
                label: '# Работ по параметрам',
                data: res,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function showAnalysis()
{
    let diss = document.getElementById('diss').checked;
    let nioktr = document.getElementById('nioktr').checked;
    let rid = document.getElementById('rid').checked;
    let nauch = document.getElementById('nauch').checked;
    let vuz = document.getElementById('vuz-select').value;
    let sort = document.getElementById('sort-select').value;
    console.log('diss.checked', diss);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);
    console.log('diss.checked', diss.checked);

    let res=[];
    for (keys in listUniversirty) {
        res[keys] = await get_pages(listUniversirty[keys], diss, nioktr, rid, nauch, sort);
        console.log('keys', keys);
    }
    Analysis(res);
    //RRRRR = res;
    //createPages(1);
    //if (document.getElementById('pages'))
    //    document.getElementById('pages').remove();
    
}