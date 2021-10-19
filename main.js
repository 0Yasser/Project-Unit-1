

let outerData=[];
/*
fetch(
  "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "38000d653cmsheefe9dacb439421p17252ajsnb0679c256a4c",
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("data", data);
    outerData = data.slice(0, 2);
    outerData[0] = outerData[0].substring(7, outerData[0].length - 1);
    outerData[1] = outerData[1].substring(7, outerData[1].length - 1);
    console.log(outerData);
    cont();
  })
  .catch((err) => {
    console.error(err);
  });

function cont() {
  for (let i = 0; i < outerData.length; i++) {
    fetch(
      `https://imdb8.p.rapidapi.com/title/get-details?tconst=${outerData[i]}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            "38000d653cmsheefe9dacb439421p17252ajsnb0679c256a4c",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("The data", data);
		document.getElementById("carousel_inner").innerHTML+=
		`<div class="carousel-item ">
		<img src="${data.image.url}" class="d-block w-100" alt="${data.title+"-"+data.year+"("+data.titleType+")"}" />
		<div class="carousel-caption d-block d-md-block">
		  <h5>${data.title}</h5>
		  <p>
			Some representative placeholder content for the first slide.
		  </p>
		</div>
	  </div>`
		// document.getElementById("cards").innerHTML+=``
		// document.getElementById("carouselExampleCaptions").innerHTML+=``
		
      })
      .catch((err) => {
        console.error("err");
      });
  }
  
}
*/
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US&page=1&region=US"//"https://api.themoviedb.org/3/movie/76341?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d"
,{
	method: "GET",
})
.then((response)=>{
	return response.json();
})
.then((data)=>{
	outerData=data.results.slice(0,9);
	console.log("outer data",outerData);
	useData();
})
.catch((err)=>{
	console.err("err");
})

let upcomingMovies=[];
fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US&page=1"
,{
	method: "GET",
})
.then((response)=>{
	return response.json();
})
.then((data)=>{
	console.log("upcomings",data.results);
	for (let i = 0,j=0; i < data.results.length && j<9; i++) {

		if(!outerData.includes(data.results[i])){
			upcomingMovies[j]=data.results[i];
			j++;
		}
	}
	console.log("upcoming finally",upcomingMovies);
	useData2();
})
.catch((err)=>{
	//console.err("err");
})

function useData(){
	for (let i = 0; i < outerData.length; i++) {
		  //console.log("The data", outerData[i]);
		  document.getElementById("carousel_inner").innerHTML+=
		  `<div class="carousel-item ">
		  <img src="${"https://www.themoviedb.org/t/p/w220_and_h330_face"+outerData[i].poster_path}" class="d-block w-100" alt="${outerData[i].original_title+"("+outerData[i].release_date+")"}" />
		  <div class="carousel-caption d-block d-md-block">
			<h5 style="text-shadow: 2px 2px 2px black, 0px 0px 2px black, -2px -2px 2px black;">${outerData[i].title}</h5>
			<p>
			  Some representative placeholder content for the first slide.
			</p>
		  </div>
		</div>`;
		//console.log(outerData[i].title)
		  // document.getElementById("cards").innerHTML+=``
		  // document.getElementById("carouselExampleCaptions").innerHTML+=``  
	}
  }
  function useData2(){
	for (let i = 0; i < upcomingMovies.length; i++){
		document.getElementById("row").innerHTML+=`<div class="card" style="width: 18rem">
		<img src="${"https://www.themoviedb.org/t/p/w220_and_h330_face"+upcomingMovies[i].poster_path}" class="card-img-top" alt="..." />
		<div class="card-body">
		<h3>${upcomingMovies[i].title}</h3>
		  <p class="card-text">
			${upcomingMovies[i].overview}
		  </p>
		</div>
	  </div>`;
	}
  }



function changeColor() {
  console.log("card1", document.getElementsByClassName("card")[0]);
  console.log("bbboody", document.getElementById("body"));

  let bdy = document.getElementById("body"),
    nvbar = document.getElementsByClassName("navbar"),
    card = document.getElementsByClassName("card"),
	cardHover = document.getElementsByClassName("card:hover"),
	carousel = document.getElementsByClassName("carousel-caption d-block d-md-block"),
    page2 = document.getElementsByClassName("main-page2"),
    page3 = document.getElementsByClassName("main-page3");
  if (
    document.getElementById("body").style.background == "#dcbbbb" ||
    document.getElementById("body").style.background == "rgb(220, 187, 187)"
  ) {
    bdy.style.background = "#3c0303";
	bdy.style.color = "#dcbbbb";
    for (let i = 0; i < nvbar.length; i++) {
      nvbar[i].style.background = "#160101";
    }
    for (let i = 0; i < card.length; i++) {
      card[i].style.background = "#7d0000";
    }
	for (let i = 0; i < cardHover.length; i++) {
		cardHover[i].style.background = "#8b6565";
	  }
	for (let i = 0; i < carousel.length; i++) {
		carousel[i].color = "#160101";
	  }
    for (let i = 0; i < [page3].length; i++) {
      page3[i].style.color = "#ffffff";
    }
  } else {
    bdy.style.background = "#DCBBBB";
	bdy.style.color = "#160101";
    for (let i = 0; i < nvbar.length; i++) {
      nvbar[i].style.background = "#2B0707";
    }
    for (let i = 0; i < card.length; i++) {
      card[i].style.background = "#3c0303";
    }
	for (let i = 0; i < cardHover.length; i++) {
		cardHover[i].style.background = "#8b6565";
	  }
	for (let i = 0; i < carousel.length; i++) {
		carousel[i].color = "#7d0000";
	  }
    for (let i = 0; i < [page3].length; i++) {
      page3[i].style.color = "#000000";
    }
  }
}
