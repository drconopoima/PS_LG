const urls = [
  'https://s3.amazonaws.com/logtrust-static/test/test/data1.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data3.json',
  'https://s3.amazonaws.com/logtrust-static/test/test/data3.json'
]

const getAllData = async function() {
  const [ data1, data2, data3 ] = await Promise.all(urls.map(url => {
    return fetch(url)
    .then(response => response.json())
  }))
  console.log(data1)
  console.log(data2)
  console.log(data3)
}
