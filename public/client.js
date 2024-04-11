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
}

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
    let res = await get_pages(vuz,diss,nioktr,rid,nauch,sort);
    createPages(res);
    
}

function createPages(res)
{



    j = 0;
    res = res / 10;
    if (document.getElementById(`${1}`) !== null)
        while(document.getElementById(`${j + 1}`)!==null)
    {
        if (document.getElementById(`${j + 1}`) !== null)
                element = document.getElementById(`${j + 1}`);
            element.remove();
            j++
    }
    
    for (let i = 0; i < res; i++) {
        btn = document.createElement('button');
        btn.addEventListener('click', () => { return change_page(i + 1, uid1); });
        console.log('uid1', uid1);
        btn.innerText = i + 1;
        btn.id = i + 1;
        document.body.append(btn);
        
    }
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

p = document.createElement('p')
p.innerText = 'Сука';
document.body.append(p);
