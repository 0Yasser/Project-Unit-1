


let outerData = [];
// --------------------------------------------------
// First fetch: movies that are currently on theaters
// --------------------------------------------------
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US&page=1&region=SA",
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("data", data);
    outerData = data.results;
    console.log("Now playing movies", outerData);
    useData();
  })
  .catch((err) => {
    console.log("error in 1st fetch");
  });

  function useData() {
	document.getElementById(
	  "carousel_inner"
	).innerHTML = `<div class="carousel-item active">
			<img src="${
		  "https://www.themoviedb.org/t/p/original" + outerData[0].backdrop_path
		}" class="d-block w-100" alt="${
	  outerData[0].original_title + "(" + outerData[0].release_date + ")"
	}" />
			<div class="carousel-caption d-block d-md-block">
			  <h5 style="text-shadow: 2px 2px 2px black, 0px 0px 2px black, -2px -2px 2px black;">${
		  outerData[0].title
		}</h5>
			  <p>
				
			  </p>
			</div>
		  </div>`;
	for (let i = 1; i < outerData.length; i++) {
	  //console.log("The data", outerData[i]);
	  document.getElementById(
		"carousel_inner"
	  ).innerHTML += `<div class="carousel-item ">
			<img src="${
		  "https://www.themoviedb.org/t/p/original" + outerData[i].backdrop_path
		}" class="d-block w-100" alt="${
		outerData[i].original_title + "(" + outerData[i].release_date + ")"
	  }" />
			<div class="carousel-caption d-block d-md-block">
			  <h5 style="text-shadow: 2px 2px 2px black, 0px 0px 2px black, -2px -2px 2px black;">${
		  outerData[i].title
		}</h5>
			  <p>
				
			  </p>
			</div>
		  </div>`;
	}
  }



let topRated = [];
// ------------------------------------
// Second fetch: The top rated movies
// ------------------------------------
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US&page=1&region=SA",
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("top rated", data.results);
    for (let i = 0, j = 0; i < data.results.length && j < 10; i++) {
      if (!outerData.includes(data.results[i])) {
        topRated[j] = data.results[i];
        j++;
      }
    }
    console.log("top-rated finally", topRated);
    useData2();
  })
  .catch((err) => {
    console.log("error in fetch 2");
  });

  function useData2() {
	for (let i = 0; i < topRated.length; i++) {
	  document.getElementById(
		"row"
	  ).innerHTML += `<div class="card" id="${topRated[i].id}" style="width: 18rem" onmouseover=mouseOver(this) onmouseleave=mouseLeave(this)>
		  <img src="${"https://www.themoviedb.org/t/p/w220_and_h330_face"+topRated[i].poster_path}" 
		  class="card-img-top" alt="..." onclick="toMoviePage(this)"/>
		  <div class="card-body">
		  <h3 style="text-align:center;">${topRated[i].title}</h3>
			<p class="card-text" style="text-align:center; font-size:24px; color: rgb(255, 129, 129);">
			  ${topRated[i].vote_average}/10
			</p>
		  </div>
		</div>`;
	}
  }




let popularActors=[];
// ---------------------------
//Third fetch: popular actors
// ---------------------------
fetch(
	"https://api.themoviedb.org/3/person/popular?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US&page=1",
	{
	  method: "GET",
	}
  )
	.then((response) => {
	  return response.json();
	})
	.then((data) => {
	  console.log("actors", data.results);
	  for (let i = 0,j=0; i < data.results.length; i++) {
		  if (i==2) 
		  continue;
		  popularActors[j] = data.results[i];
		  j++;
		
	  }
	  console.log("popular actors:", popularActors);
	  useData3();
	})
	.catch((err) => {
	  console.log("error in fetch 3");
	});

function useData3(){
	let curr;
	for (let i = 0; i < popularActors.length; i++) {
		//curr=popularActors[i].name;
		document.getElementById("main-page3").innerHTML
		+= `
		<div class="card" id="${popularActors[i].id}" style="width: 7rem; height:14rem" onmouseover=mouseOver(this) onmouseleave=mouseLeave(this)>
		<img onclick= toActorPage(this) src="${
      "https://www.themoviedb.org/t/p/w220_and_h330_face" +
      popularActors[i].profile_path
    }" class="card-img-top" alt="..."/>
		<div class="card-body">
		<h3>${popularActors[i].name}</h3>
		</div>
	  </div>
	  `;
	}
}


function mouseOver(num){num.style.background="#8b6565";}
function mouseLeave(num){
	if (document.getElementById("body").style.background == "#dcbbbb" ||
		document.getElementById("body").style.background == "rgb(220, 187, 187)") {num.style.background= "#2B0707"}
	else{num.style.background="#7d0000"}
}

function toMoviePage(num){
	sessionStorage.setItem("MovieID",num.parentElement.id);
	fetch(`https://api.themoviedb.org/3/movie/${num.parentElement.id}/watch/providers?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d`,
	{method:"GET",})
	.then(response=>{
		return response.json();
	})
	.then(data=>{console.log("go",data); sessionStorage.setItem("website",data.results.AR.link)})
	.catch(err=>{console.log("error in switching to movie ")})
	console.log("THE MOVIE ID: ",num.parentElement.id);
	
	window.location=sessionStorage.getItem("website");
}
function toActorPage(num){
	sessionStorage.setItem("ActorID",num.parentElement.id);
	console.log("THE ACTOR ID: ",num.parentElement.id);
	window.location="actor_page.html";
}




// function getWatchProviders(movie_id) {
// 	let streamingservice;
//   fetch(
//     `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d`,
//     { method: "GET" }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (data.results.US != undefined) {
// 		  streamingservice = data.results.US.link;
//         console.log("streaming serviceswwww", data.results.US.link);
//         return data.results.US.link;
//       }
//     })
//     .catch((err) => {
//       console.log("err");
//     });
// 	console.log("STREAMING SERVICE NAME",streamingservice)
// 	streamingservice!=null? window.location.href=streamingservice : null
//   return "";
// }



function changeColor() {
	console.log("card hover",document.getElementsByClassName("card:hover"));
  console.log("card1", document.getElementsByClassName("card")[0]);
  console.log("bbboody", document.getElementById("body"));

  let bdy = document.getElementById("body"),
    nvbar = document.getElementsByClassName("navbar"),
    card = document.getElementsByClassName("card"),
    cardHover = document.getElementsByTagName("card:hover"),
    carousel = document.getElementsByClassName(
      "carousel-caption d-block d-md-block"
    ),
    page2 = document.getElementsByClassName("main-page2"),
    page3 = document.getElementsByClassName("main-page3");
  if (
    document.getElementById("body").style.background == "#dcbbbb" ||
    document.getElementById("body").style.background == "rgb(220, 187, 187)"
  ) {
    bdy.style.background = "#2B0707";
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
      page3[i].style.color = "#000000";
    }
  } else {
    bdy.style.background = "#DCBBBB";
    bdy.style.color = "#160101";
    for (let i = 0; i < nvbar.length; i++) {
      nvbar[i].style.background = "#140303";
    }
    for (let i = 0; i < card.length; i++) {
      card[i].style.background = "#2B0707";
    }
    for (let i = 0; i < cardHover.length; i++) {
      cardHover[i].style.background = "#8b6565";
    }
    for (let i = 0; i < carousel.length; i++) {
      carousel[i].color = "#7d0000";
    }
    for (let i = 0; i < [page3].length; i++) {
      page3[i].style.color = "#ffffff";
    }
  }
}



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//--------------------------- Actor Page Part ----------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

let actorData;
function loadActor() {
  let id = sessionStorage.getItem("ActorID");
  fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=94fdf95ec5df5e5b7c80cad9b9f01e1d&language=en-US`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      actorData = data;
      console.log("actorData", actorData);
      document.getElementById("actor_name").innerHTML = `<h1>${actorData.name}</h1>`;
      document.getElementById("biography").innerHTML = actorData.biography;
      document.getElementById("birthday").innerHTML = actorData.birthday;
      document.getElementById("birthplace").innerHTML = actorData.place_of_birth;
      document.getElementById("actor_image").innerHTML = 
	  `<img src="${"https://www.themoviedb.org/t/p/original" + actorData.profile_path}"/>`
      for (let i = 0; i < actorData.also_known_as.length; i++) {
        document.getElementById("actor_names").innerHTML +=`<li>${actorData.also_known_as[i]}</li>`
      }
    })
    .catch((err) => {
      console.log("error in first fetch in actor page");
    });
}
