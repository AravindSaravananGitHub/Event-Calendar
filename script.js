
//console.log("Hai I'm Working");

const holidays=[
    {
      "hdate": "01-01-2023",
      "holidays": "New Year Day"
    },
    {
      "hdate": "15-01-2023",
      "holidays": "Pongal"
    },
    {
      "hdate": "16-01-2023",
      "holidays": "Thiruvalluvar Day"
    },
    {
      "hdate": "17-01-2023",
      "holidays": "Uzhavar Thirunal"
    },
    {
      "hdate": "26-01-2023",
      "holidays": "Republic Day"
    },
    {
      "hdate": "05-02-2023",
      "holidays": "Thai Poosam"
    },
    {
      "hdate": "22-03-2023",
      "holidays": "Telugu New Year Day"
    },
    {
      "hdate": "01-04-2023",
      "holidays": "Annual closing of Accounts for Commercial Banks and Co-operative Banks"
    },
    {
      "hdate": "04-04-2023",
      "holidays": "Mahaveer Jayanthi"
    },
    {
      "hdate": "07-04-2023",
      "holidays": "Good Friday"
    },
    {
      "hdate": "14-04-2023",
      "holidays": "Tamil New Years Day and Dr.B.R.Ambedkars Birthday"
    },
    {
      "hdate": "22-04-2023",
      "holidays": "Ramzan (Idul Fitr)"
    },
    {
      "hdate": "01-05-2023",
      "holidays": "May Day"
    },
    {
      "hdate": "29-06-2023",
      "holidays": "Bakrid(Idul Azha)"
    },
    {
      "hdate": "29-07-2023",
      "holidays": "Muharram"
    },
    {
      "hdate": "15-08-2023",
      "holidays": "Independence Day"
    },
    {
      "hdate": "06-09-2023",
      "holidays": "Krishna Jayanthi"
    },
    {
      "hdate": "17-09-2023",
      "holidays": "Vinayakar Chathurthi"
    },
    {
      "hdate": "28-09-2023",
      "holidays": "Milad-un-Nabi"
    },
    {
      "hdate": "02-10-2023",
      "holidays": "Gandhi Jayanthi"
    },
    {
      "hdate": "23-10-2023",
      "holidays": "Ayutha Pooja"
    },
    {
      "hdate": "24-10-2023",
      "holidays": "Vijaya Dasami"
    },
    {
      "hdate": "12-11-2023",
      "holidays": "Deepavali"
    },
    {
      "hdate": "25-12-2023",
      "holidays": "Christmas"
    }
  ];

const calander=document.getElementById('calender');
const place_month=document.getElementById('month-name');
const place_year=document.getElementById('year-number');

let navigation=0;
let clicked=null;

let events=localStorage.getItem("events")?JSON.parse(localStorage.getItem("events")):[];
const week_words=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function calanderLoading(){

    //console.log(holidays);
    let full_date=new Date();

    if(navigation!=0){
        full_date.setMonth(new Date().getMonth()+navigation);
    }

    let date=full_date.getDate();
    let day=full_date.getDay();
    let month=full_date.getMonth();
    let year=full_date.getFullYear();
    //console.log(date,day,month,year);
    place_month.innerText=`${full_date.toLocaleDateString("en-us",{
        month:"long"
    })} `;
    place_year.innerText=`${year}`;

    calander.innerHTML="";

    const daysInMonth=new Date(year,month+1,0).getDate();
    //console.log(daysInMonth);
    const firstDayOfMonth=new Date(year,month,1);
    //console.log(firstDayOfMonth);
    const dateText=firstDayOfMonth.toLocaleDateString("en-us",{
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
    });
    //console.log(dateText);

    const dayString=dateText.split(", ")[0];
    //console.log(dayString);
    const emptyDays=week_words.indexOf(dayString);
    //console.log(emptyDays);

    for(let i=1;i<=daysInMonth+emptyDays;i++){
        const daybox=document.createElement("div");
        daybox.classList.add("day");
        if(i>emptyDays){
            daybox.innerText=i-emptyDays;

            let dt=(i-emptyDays)<10?"0"+(i-emptyDays):(i-emptyDays);
            let mon=(month+1)<10?"0"+(month+1):(month+1);
            const dateFormet=`${dt}-${mon}-${year}`;
            //console.log(dateFormet);

            // Event Day
            let eventOfTheDay=events.find((e)=>e.date==dateFormet);
            //console.log(eventOfTheDay);

            // Holiday
            let holidayOfTheDay=holidays.find((e)=> e.hdate==dateFormet);
            //console.log(holidayOfTheDay);

            if(i-emptyDays===date && navigation==0){
                daybox.id="currentday";
            }

            if(eventOfTheDay){
                const evnetDiv=document.createElement("div");
                evnetDiv.classList.add("event");
                evnetDiv.innerText=eventOfTheDay.title;
                daybox.appendChild(evnetDiv);
            }
            if(holidayOfTheDay){
                const holidayDiv=document.createElement("div");
                holidayDiv.classList.add("holiday");
                holidayDiv.innerText=holidayOfTheDay.holidays;
                daybox.appendChild(holidayDiv);
            }

            daybox.addEventListener('click',()=>{
                showModel(dateFormet);
            });
        }
        else{
            daybox.classList.add("plane");
        }
        calander.appendChild(daybox);
    }
}

function buttons(){
    const btnNext=document.querySelector(".forward-button");
    const btnBack=document.querySelector(".back-button");
    const closebtn=document.querySelectorAll(".btn-close");
    const btndelete=document.getElementById("btn-delete");
    const btnsave=document.getElementById("btn-save");
    const txtTitle=document.getElementById("txt-title");

    btnNext.addEventListener('click',()=>{
        navigation++;
        calanderLoading();
    });

    btnBack.addEventListener('click',()=>{
        navigation--;
        calanderLoading();
    });

    model.addEventListener('click',closeModel);

    closebtn.forEach((btn)=>{
        btn.addEventListener('click',closeModel);
    });

    btndelete.addEventListener('click',()=>{
        events=events.filter((e)=> e.date !== clicked);
        localStorage.setItem("events",JSON.stringify(events));
        closeModel();
    });

    btnsave.addEventListener('click',()=>{
        if(txtTitle.value){
            txtTitle.classList.remove("error");
            events.push({
                date:clicked,
                title:txtTitle.value.trim()
            });
            txtTitle.value="";
            localStorage.setItem("events",JSON.stringify(events));
            closeModel();
        }
        else{
            txtTitle.classList.add("error");
        }
    });

}
const model=document.getElementById('model');
const viewEventDisplay=document.getElementById('viewevent');
const addEventDisplay=document.getElementById('addevent');
function showModel(dateFormet){
    clicked=dateFormet;
    let eventOfTheDay=events.find((e)=>e.date==dateFormet);
    if(eventOfTheDay){
        // Event Exist.
        viewEventDisplay.style.display="block";
        document.querySelector('#eventText').innerText=eventOfTheDay.title;
    }
    else{
        // Add Event.
        addEventDisplay.style.display="block";
    }
    model.style.display="block";
}

function closeModel(){
    viewEventDisplay.style.display="none";
    addEventDisplay.style.display="none";
    model.style.display="none";
    clicked=null;
    calanderLoading();
}

buttons();
calanderLoading();