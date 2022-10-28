
const onClick = async function() {
  // post to openai API
  const input = $('#prompt').val();
  const tableNumber = $('#tableInput').val();
  if (!input) {
    alert('No prompt provided');
  } else if (!tableNumber) {
    alert('No table number selected');
  } else {
    $('.spinnerContainer').css("display", "flex");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    body: JSON.stringify({
      model: "image-alpha-001",
      prompt: input,
      num_images: 1,
      size: "1024x1024",
      response_format: "url"
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa("bearer:" + jank_secret),
    }
  })

  $('.spinnerContainer').css("display", "none");

  // wait for result
  if (!response.ok) {
    throw new Error(`Request failed with status ${reponse.status}`)
    alert('Something went wrong, complain to Oliver');
  }
  // get url from result
  const result = await response.json()
  const url = result.data[0].url;

  const submitRes = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify({
      url: url,
      table: tableNumber,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  });

  location.reload();
}

$('.generate').click(onClick);
$('.table-entry.filled').click(function(e) {
  const url = e.target.getAttribute('src');

  // display on screen
  $('#result').attr('src', url);
  $('#result').css("display", "flex");
})

$('#result').click(function() {
  $('#result').css("display", "none");
})
