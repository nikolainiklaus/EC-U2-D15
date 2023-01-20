const url = "https://striveschool-api.herokuapp.com/api/movies";
const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id); //this can either an id or null

const submitMovie = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const movieToSubmit = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      imageUrl: document.getElementById("imageUrl").value,
      category: document.getElementById("category").value,
    };
    console.log(movieToSubmit);

    let res = await fetch("https://striveschool-api.herokuapp.com/api/movies", {
      method: "POST",
      body: JSON.stringify(movieToSubmit),
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQyMTEyNjIsImV4cCI6MTY3NTQyMDg2Mn0._NrIlwNUTDudWXp8c9pcyhgEgrjanVrYaqwpDw3Sd1E",
      },
    });
    if (res.ok) {
      console.log("submitted");
      location.assign("index.html");
    } else {
      console.log("some problem has occured");
    }
  } catch (error) {}
};

const editMovie = async () => {
  try {
    let res = await fetch(url + "/" + id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQyMTEyNjIsImV4cCI6MTY3NTQyMDg2Mn0._NrIlwNUTDudWXp8c9pcyhgEgrjanVrYaqwpDw3Sd1E",
      },
    });
    console.log(res);
    const movie = await res.json();
    console.log(movie);
    if (res.ok) {
      let { name, description, imageUrl } = await res.json();
      console.log("Ok");
      console.log(name);
    }
  } catch (error) {}
};
