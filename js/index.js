const dayName=document.getElementById('day')
const dayNumber=document.getElementById('number-day')
const dayMonth=document.getElementById('month')
const city=document.getElementById('city')
const temp=document.getElementById('temp')
const imgtoday=document.getElementById('sun-day')
const text=document.getElementById('text-info')
const rining=document.getElementById('rining')
const wining =document.getElementById('wining')
const diraction=document.getElementById('dircation')
//towmory
const today=document.getElementsByClassName('day')
const sun =document.getElementsByClassName('sun')
const maxTemp =document.getElementsByClassName('max-temp')
const avergTem =document.getElementsByClassName('averg-tem')
const cloud =document.getElementsByClassName('text-info')
// search
const formInput=document.getElementById('form')
const input=document.getElementById('search')

//submit Data




// get weather Data 
async function  getWeatherData(city){
  const responsedata=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dce639dea6e74aeb8d900024250803&q=${city}&days=3`)
  let data= await responsedata.json()
  return data
}
function displayData(allData){
  let date=new Date()
  dayName.innerHTML=date.toLocaleDateString('en-us',{weekday:'long'})
  dayMonth.innerHTML=date.toLocaleDateString('en-us',{month:'long'})
  dayNumber.innerHTML=date.getDate()
  city.innerHTML=allData.location.name
  temp.innerHTML=allData.current.temp_c+'c'
  imgtoday.setAttribute('src',allData.current.condition.icon)
  text.innerHTML=allData.current.condition.text
  rining.innerHTML=allData.current.humidity
  wining.innerHTML=allData.current.wind_kph
  diraction.innerHTML=allData.current.wind_dir
}
function displayNextData(allData){
  let forecastday=allData.forecast.forecastday
  for(let i=0;i<2;i++){
    let newdate=new Date(forecastday[i+1].date)

      today[i].innerHTML=newdate.toLocaleDateString('en-us',{weekday:'long'})
      maxTemp[i].innerHTML=forecastday[i+1].day.maxtemp_c
      avergTem[i].innerHTML=forecastday[i+1].day. avgtemp_c
      cloud[i].innerHTML=forecastday[i+1].day.condition.text
      sun[i].setAttribute('src',forecastday[i+1].day.condition.icon)
    }

}
//all function 
async function allFuction(cityname='cairo'){

  let data= await getWeatherData(cityname)
  console.log(data);
  if(!data.error){

    displayData(data)
    displayNextData(data)
  }else
  {
    console.log(data.error);
    
  }
}
allFuction()
formInput.addEventListener('submit',(e)=>{
  e.preventDefault()
  allFuction(input.value)
})


