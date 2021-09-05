const gallery=document.querySelector('.gallery')
const searchBar=document.querySelector("#searchBar")
const createCard=(data)=>{
    const contentCard=document.createElement('div')
    contentCard.classList.add('content','card','my-3')
    let generes='';
    for(let str of data.show.genres){
        generes+=str+","
    }
    let Summary=""
    if(data.show.summary.length<400){
        Summary=data.show.summary
    }else{
        Summary=data.show.summary.slice(0,399)
        Summary+=". . ."
    }
    generes=generes.slice(0, -1)
    contentCard.innerHTML=`
                <a href="${data.show.url}" target="_blank">
                    <div class="content-overlay"></div>
                    <img class="content-image" src="${data.show.image.medium}">
                    <div class="content-details fadeIn-bottom">
                      <div class="d-flex justify-content-between align-items-end white">
                        <h2 class="fs-5">${data.show.name}</h2>
                          <h5>${data.show.rating.average==null?"N/A":data.show.rating.average}
                           <span class="gold">&starf;</span>
                           </h5>
                      </div>
                      <div>
                          <div>${data.show.language}</div>
                            <div>${generes}</div>
                      </div>
                      <div class="d-flex flex-column align-items-start">
                          <h5 class="p-0 my-2 fs-6 white">SUMMARY</h5>
                          <p class="m-0 p-0" id="summary">${Summary}</p>
                      </div>
                    </div>
                  </a>`
    return contentCard
}

const Search=async(query)=>{
    try{
        const config={params:{
            q:query,
        }}
    const res=await axios.get(`https://api.tvmaze.com/search/shows`,config)
    if(res.data.length==0){
        throw "No shows available : ("
    }
    for(let result of res.data){
        if(result.show.image){
        gallery.append(createCard(result))
        }
    }
   
    }catch(e){
        const err=document.createElement('div')
        err.innerHTML="Please try again"
        gallery.append(err)
    }
}

searchBar.addEventListener('submit',(e)=>{
    e.preventDefault();
    gallery.innerHTML=""
    Search(searchBar.elements.query.value)
    searchBar.elements.query.value=""
})

Search("Dark")