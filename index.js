const { rejects } = require('assert');
const axios = require('axios')
const express = require('express')
const https = require('https');
const { resolve } = require('path');
const app = express()
const port = 3000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.static('public'));

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

const agent =  new  https.Agent({
    rejectUnauthorized: false
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
let id = 1
const search_url = 'https://rosrid.ru/api/base/search';
const uid = '10184556';
const start_date = '2022-01-01';
const end_date = '2023-12-31';

function set_payload(page,uid) { //Задает payload для запроса
  const payload = {
  search_query: null,
  critical_technologies: [],
  dissertations: false,
  full_text_available: false,
  ikrbses: false,
  nioktrs: false,
  organization: [uid],
  page: page,
  priority_directions: [],
  rids: false,
  rubrics: [],
  search_area: 'Во всех полях',
  sort_by: 'Дата регистрации',
  open_license: false,
  free_licenses: false,
  expert_estimation_exist: false,
  start_date: start_date,
  end_date: end_date
  };
  return payload;
}
function set_payloadForPages(page,uid,diss,nioktr,rid,nauch,sort) { //Задает payload для запроса
  const payload = {
  search_query: null,
  critical_technologies: [],
  dissertations: diss,
  full_text_available: false,
  ikrbses: nauch,
  nioktrs: nioktr,
  organization: [uid],
  page: page,
  priority_directions: [],
  rids: rid,
  rubrics: [],
  search_area: 'Во всех полях',
  sort_by: sort,
  open_license: false,
  free_licenses: false,
  expert_estimation_exist: false,
  start_date: start_date,
  end_date: end_date
  };
  return payload;
}

 function get_instance() {
  const instance =  axios.create({
    //Создает Инстанс
    baseURL: 'https://rosrid.ru',
    timeout: 1000,
    headers: {
      'authority': 'rosrid.ru',
      'pragma': 'no-cache',
      'cache-control': 'no-cache',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
      'accept': 'application/json, text/plain, */*',
      'sec-ch-ua-mobile': '?0',
      'content-type': 'application/json;charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
      'sec-ch-ua-platform': '"Linux"',
      'origin': 'https://rosrid.ru',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://rosrid.ru/global-search',
      'accept-language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7'
    }
  });
  return instance;
}
async function get_page(uid,diss,nioktr,rid,nauch,sort) {
  instance =  await get_instance();
  let und = await instance.post('api/base/search', set_payloadForPages(numbOfPage, uid,diss,nioktr,rid,nauch,sort), { https: agent })
    .then(function (response) {
      //console.log(response);
      //for (let i = 0; i < max_in_page;i++)
      // console.log(JSON.stringify(response.data.hits.hits[i]._source.name));
      return response.data;
    })
   
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return und;
}
async function get_page_by_id(id,uid) {
  instance =  await get_instance();
  let und = await instance.post('api/base/search', set_payload(id,uid), { https: agent })
    .then(function (response) {
      //console.log(response);
      //for (let i = 0; i < max_in_page;i++)
      // console.log(JSON.stringify(response.data.hits.hits[i]._source.name));
      return response.data;
    })
   
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return und;
    }
let numbOfPage = 1
let max_in_page = 10;
//let data = ['afasfasfaf'];
let q = [];
app.get(`/`, async (req, res) => {
   //let data = await get_page(uid);
  //console.log('data', data.hits.total);
  //res.send(`<p>СУКА ${data.hits.hits} </p>`);
  res.sendFile(__dirname+'/index.html');
});
  

app.get('/api/pages/:uid/:diss/:nioktr/:rid/:nauch/:sort', async (req, res) => {
  const { uid,diss,nioktr,rid,nauch,sort} = req.params;
  let data = await get_page(uid,diss,nioktr,rid,nauch,sort);
  console.log('data', data);
  res.json(data.hits.total);
});

app.get('/pages/:uid/:id', async (req, res) => {
  const { uid,id} = req.params;
  let data = await get_page_by_id(id,uid);
  res.json(data.hits.hits);
});
//});

 //function result(numbOfPage,res) {
  //Считает количевство страниц для добавления кнопок и добавлояет их
//payload.page = numbOfPage;

//console.log(data);
      //res.send(data[1]._source.name);
     // return data;
      //if (response.status == 200) {
      //  console.log(response.data.hits.total.value / 10);
       // countOfpages = response.data.hits.total.value / 10;
        //footer = document.createElement('footer')
        //document.body.append(footer);

        //let btn_min = document.createElement('button');
        //   btn_min.innerHTML = 'FirstPage';
        //   btn_min.classList.add('footer_btn');
        //   btn_min.id = `btn_0`;
        //   btn_min.addEventListener('click', () => {

            // When there is a "click"
            // it shows an alert in the browser
          //  change_page(1, countOfpages,footer);
         // })
      //footer.appendChild( btn_min);


      //  let cof = countOfpages;
      //  if (countOfpages > 5)
      //  {
       //   cof = 5
       // }
       // for (let i = 1; i <= 5; i++)
       // {
       //   let btn = document.createElement('button');
       //   btn.innerHTML = `${i}`;
       //   btn.id = `btn_${i}`;
       //   btn.classList.add('footer_btn');
       //   btn.addEventListener('click', () => {
            // When there is a "click"
            // it shows an alert in the browser
          //  change_page(i,countOfpages,footer);
       //   })         
       //   footer.appendChild(btn);
          //document.body.append(btn);
       // }

     //  let  btn_max = document.createElement('button');
     //     btn_max.innerHTML = 'LastPage';
     //     btn_max.classList.add('footer_btn');
     // btn_max.id = `btn_${Math.ceil(countOfpages)+1}`;
     //     btn_max.addEventListener('click', () => {
     //       // When there is a "click"
     //       // it shows an alert in the browser
     //       change_page(Math.ceil(countOfpages), countOfpages, footer);
     //     })
      //     console.log(btn_max);
      //     console.log(btn_min);
     //  footer.appendChild(btn_max);




      //  get_page(data);


        //if (numbOfPage < countOfpages) {
        //  res(numbOfPage + 1);
        //}
     //}
        //get_page(data, numbOfPage);
      
        
    
    
//}
//res(numbOfPage);