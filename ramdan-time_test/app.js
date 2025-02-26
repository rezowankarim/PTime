

/*----------------Tonmoy-------------------------*/  

const apiServerUrl = 'https://api.aladhan.com/v1';
const UrlcurrentIslamicYear = '/currentIslamicYear';
const UrlCurrentYearFirstRamadan = '/hToGCalendar';
const UrlPrayertimesInADateByCity = '/timingsByCity';

const GetCurrentHisryYear = async () => {
    const response = await fetch(apiServerUrl + UrlcurrentIslamicYear );
    return await response.json(); //extract JSON from the http response
  }

  const GetCurrentYearFirstRamadan = async () => {
    const response = await fetch(apiServerUrl + UrlCurrentYearFirstRamadan + '/9/' + currentHisryYear );
    return await response.json(); //extract JSON from the http response
  }

  var JsonrespnoseDhakaPrayerTime;

  const GetPrayerTimeByDate = async (date , cityName) => {
    
    if(!JsonrespnoseDhakaPrayerTime && cityName == 'Dhaka') {
        var respnoseDhakaPrayerTime = await fetch(apiServerUrl + UrlPrayertimesInADateByCity + '/' + GetDateStringFromDatetimeDDMMYY(date) + '?city='+cityName+'&country=BD&state=Asia&method=1' );
        JsonrespnoseDhakaPrayerTime = await respnoseDhakaPrayerTime.json(); //extract JSON from the http response
    }

    return SetIslamicFoundationIftarTime_2025( JsonrespnoseDhakaPrayerTime ,JSON.parse(JSON.stringify(JsonrespnoseDhakaPrayerTime))  , cityName);

    //return JsonrespnoseDhakaPrayerTime;
  }

  function SetIslamicFoundationIftarTime_2025(DhakajsonResponse ,jsonResponse, cityName) {
    var IFTime = ['18:02','18:03','18:03','18:04','18:04','18:05','18:05','18:06','18:06','18:06','18:07','18:07','18:08','18:08','18:08','18:09','18:08','18:10','18:10','18:10','18:11','18:11','18:11','18:12','18:12','18:13','18:13','18:14','18:14','18:15'];


    var parts = jsonResponse.data.date.hijri.date.split("-");
    var ramdanDate = new Date(parseInt(parts[2], 10),
                                                        parseInt(parts[1], 10) - 1,
                                                        parseInt(parts[0], 10) ) ;

    if(ramdanDate.getFullYear() == 1446) {

        if(cityName == 'Dhaka')
        {
            DhakajsonResponse.data.timings.Maghrib = IFTime[DhakajsonResponse.data.date.hijri.day];
            return DhakajsonResponse;
        }
        else if(cityName == 'Rajshahi'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 7 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Rangpur'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 3 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Sylhet'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() - 7 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Mymensingh'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() - 1 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Barisal'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 1 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Khulna'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 4 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Chittagong'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() - 5 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }

        else if(cityName == 'Islamabad'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 60 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Kolkata'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 30 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }
        else if(cityName == 'Delhi'){
            var adjusteTimeForDivision = AddTimeToDate( ramdanDate, jsonResponse.data.timings.Maghrib );
            adjusteTimeForDivision.setMinutes(adjusteTimeForDivision.getMinutes() + 30 );
            jsonResponse.data.timings.Maghrib = adjusteTimeForDivision.toTimeString().substr(0,5);
        }

        return jsonResponse;
    }
  };

  const timeString12hr = (dateString, timeString) => {
    return new Date(dateString+ 'T' + timeString + 'Z').toLocaleTimeString('en-US',
                                                                            {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                    );
  } ;

  const AddTimeToDate = (date, timeString) => {
    return new Date(date.toDateString()).addHours(timeString.split(':')[0]).addMins(timeString.split(':')[1]);
  } ;

  const GetDateStringFromDatetime = (dateWithTime) => {
     //return dateWithTime.toISOString().substring(0, 10);
     return dateWithTime.getFullYear() + '-' + (dateWithTime.getMonth() +1 ).pad()  + '-' +  dateWithTime.getDate().pad() ;
  }
  
  const GetDateStringFromDatetimeDDMMYY = (dateWithTime) => {
    //return dateWithTime.toISOString().substring(0, 10);
    return dateWithTime.getDate().pad() + '-' + (dateWithTime.getMonth() +1 ).pad()  + '-' +  dateWithTime.getFullYear() ;
 }

  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
Date.prototype.addMins= function(m){
    this.setMinutes(this.getMinutes()+m);
    return this;
}

    var currentHisryYear = -1;
    var ThisYearRamadanBeginInGregorian = new Date();
    var ThisYearRamadanEndInGregorian = new Date();
    var ThisYearRamadanGregorainDates = [];

    GetCurrentHisryYear().then(data => 
    {
        currentHisryYear = data.data;
        divCurrentHisryYear  = document.getElementById('currentHisryYear');
        divCurrentHisryYear.innerHTML = currentHisryYear;

        GetCurrentYearFirstRamadan().then(data => {
            ThisYearRamadanGregorainDates = data.data;
            // Adjust with Bangladesh Calender , added 1 day
            var parts = data.data[1].gregorian.date.split("-");
            ThisYearRamadanBeginInGregorian = new Date(parseInt(parts[2], 10),
                                                        parseInt(parts[1], 10) - 1,
                                                        parseInt(parts[0], 10) ) ;


            divThisYearRamadanBeginInGregorian  = document.getElementById('ThisYearRamadanBeginInGregorian');
            divThisYearRamadanBeginInGregorian.innerHTML = ThisYearRamadanBeginInGregorian;


            var parts = data.data[data.data.length - 1].gregorian.date.split("-");
            ThisYearRamadanEndInGregorian = new Date(parseInt(parts[2], 10),
                                                        parseInt(parts[1], 10) - 1,
                                                        parseInt(parts[0], 10) ) ;

            // Adjust with Bangladesh Calender , added 1 day
            ThisYearRamadanEndInGregorian.setDate( ThisYearRamadanEndInGregorian.getDate() +1 );
            if(ThisYearRamadanEndInGregorian.getFullYear() == 2025){
                // Adjust with Bangladesh Calender , added 1 day
                ThisYearRamadanEndInGregorian.setDate( ThisYearRamadanEndInGregorian.getDate() +1 );
            }

            divThisYearRamadanEndInGregorian  = document.getElementById('ThisYearRamadanEndInGregorian');
            divThisYearRamadanEndInGregorian.innerHTML = ThisYearRamadanEndInGregorian;

            // GetPrayerTimeByDate(ThisYearRamadanBeginInGregorian , 'Dhaka').then(data => {

            //     SehriTime = timeString12hr( GetDateStringFromDatetime(ThisYearRamadanBeginInGregorian), data.data.timings.Fajr );
                
            //     divSehriTime = document.getElementById('SehriTime');
            //     divSehriTime.innerHTML = SehriTime;

            //     IftarTime = timeString12hr( GetDateStringFromDatetime(ThisYearRamadanBeginInGregorian), data.data.timings.Maghrib );

            //     divIftarTime = document.getElementById('IftarTime');
            //     divIftarTime.innerHTML = IftarTime;

            // });

            //today = ThisYearRamadanBeginInGregorian; //Debug
            RamadanCountDown();

        });

    })
    .catch( error => {
        console.error('Error:', error);
    } );

  
    var today     = new Date(2025,2,2, 16,40,0), //year, month, day, hour , m ,s
    //var today     = new Date(),
    toDate    = today.getDate(),
    thisMonth = today.getMonth(),
    thisYear  = today.getFullYear();

    var RamadanCountDown = () => {
        document.getElementById("coming-time").style.display = 'none';
        document.getElementById("iftarTime").style.display = 'none';
        
        document.getElementById("todayDate1").innerHTML = toDate.toString();
        document.getElementById("todayDate2").innerHTML = (thisMonth+1).toString();
        document.getElementById("todayDate3").innerHTML = thisYear.toString();

        var todayDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() );

        if(todayDate < ThisYearRamadanBeginInGregorian ) {
            UpComingRamdanCounter();
        } else if(todayDate >= ThisYearRamadanBeginInGregorian && todayDate <= ThisYearRamadanEndInGregorian ) {
            DailyTimeLeftCounter();
        } else {
            NoEventRemainInThisYear();
        }

    };


    var UpComingRamdanCounter = ()=> {

        document.getElementById("coming-time").style.display = 'block';

        setInterval(function() {

            // Get todays date and time
            var now = today; //new Date().getTime(); //Debug //Todo
            now.setSeconds(now.getSeconds() + 1);
            
            // Find the distance between now an the count down date
            var distance = ThisYearRamadanBeginInGregorian - now;
            
            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var day = Math.floor(distance / (24 * 60 * 60 * 1000) );
            
            // Output the result in an element with id="demo"
            document.getElementById("day").innerHTML = day ;
            document.getElementById("hour").innerHTML = hours ;
            document.getElementById("minute").innerHTML = minutes;
            document.getElementById("second").innerHTML = seconds;
            
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("day").innerHTML = "";
            }
        }, 1000);

    }

    var DhakaIftarTime =0;
    var ChattogramTime =0;
    var MymensinghTime =0;
    var SylhetTime =0;
    
    var KhulnaTime =0;
    var BarisalIftarTime =0;
    var RajshahiTime =0;
    var RangpurTime =0;
  
    var IslamabadTime =0;
    var KolkataTime =0;
    var DelhiTime =0;


    var DailyTimeLeftCounter = async ()=> {
        document.getElementById("iftarTime").style.display = 'block';


        await GetPrayerTimeByDate(today , 'Dhaka').then(data => {

                //SehriTime = timeString12hr( GetDateStringFromDatetime(today), data.data.timings.Fajr );
                //divSehriTime = document.getElementById('DhakaTime');
                //divSehriTime.innerHTML = SehriTime;

                //DhakaIftarTime = timeString12hr( GetDateStringFromDatetime(today), data.data.timings.Maghrib );
                
                DhakaIftarTime = AddTimeToDate(today, data.data.timings.Maghrib );
                //divIftarTime.innerHTML = DhakaIftarTime;

            });

        await GetPrayerTimeByDate(today , 'Chittagong').then(data => {
            ChattogramTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Mymensingh').then(data => {
            MymensinghTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Sylhet').then(data => {
            SylhetTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });


        await GetPrayerTimeByDate(today , 'Khulna').then(data => {
            KhulnaTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Barisal').then(data => {
            BarisalIftarTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Rajshahi').then(data => {
            RajshahiTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Rangpur').then(data => {
            RangpurTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });


        await GetPrayerTimeByDate(today , 'Islamabad').then(data => {
            IslamabadTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });
        await GetPrayerTimeByDate(today , 'Kolkata').then(data => {
            KolkataTime = AddTimeToDate(today, data.data.timings.Maghrib );
            debugger;
        });
        await GetPrayerTimeByDate(today , 'Delhi').then(data => {
            DelhiTime = AddTimeToDate(today, data.data.timings.Maghrib );
        });

        setInterval(function() {

            // Get todays date and time
            var now = today; //new Date().getTime(); //Debug
            now.setSeconds(now.getSeconds() + 1);
            
            var totalDistance = 0;

            totalDistance = CalculateRemainTimeAndSet(DhakaIftarTime,now , 'DhakaTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(ChattogramTime ,now , 'ChattogramTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(MymensinghTime ,now , 'MymensinghTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(SylhetTime ,now , 'SylhetTime' );
            
            
            totalDistance = totalDistance + CalculateRemainTimeAndSet(KhulnaTime ,now , 'KhulnaTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(BarisalIftarTime ,now , 'BarisalTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(RajshahiTime ,now , 'RajshahiTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(RangpurTime ,now , 'RangpurTime' );

            totalDistance = totalDistance + CalculateRemainTimeAndSet(IslamabadTime ,now , 'IslamabadTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(KolkataTime ,now , 'KolkataTime' );
            totalDistance = totalDistance + CalculateRemainTimeAndSet(DelhiTime ,now , 'DelhiTime' );


            // If the count down is over, write some text 
            if (totalDistance <= 0) {
                clearInterval(x);
            }
        }, 1000);


    }

    var NoEventRemainInThisYear = ()=> {
        document.getElementById("iftarTime").style.display = 'none';
        document.getElementById("coming-time").style.display = 'none';
        
        document.getElementById("eid__welcome").style.display = 'block';

        var eidDay =  new Date(ThisYearRamadanEndInGregorian.getFullYear(),ThisYearRamadanEndInGregorian.getMonth(), ThisYearRamadanEndInGregorian.getDate() ) ;
        eidDay.setDate(eidDay.getDate() + 1);
        var todayDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() );
        if(todayDate.valueOf() == eidDay.valueOf()){
            document.getElementById("eidday").style.display = 'block';
            document.getElementById("AfterEidday").style.display = 'none';
        }
        else if(todayDate.valueOf() > eidDay.valueOf()){
            document.getElementById("eidday").style.display = 'none';
            document.getElementById("AfterEidday").style.display = 'block';
            document.getElementById("EiddayPrint").innerHTML = eidDay.toLocaleDateString();
        }

    }

    function CalculateRemainTimeAndSet(IftarTime, currentTime, divId) {

        // Find the distance between now an the count down date
        var distance = IftarTime - currentTime;
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //divIftarTime = document.getElementById(divId);
        //divIftarTime.innerHTML = hours + 'h ' +  minutes + 'm ' + seconds + 's' ;


        divIftarTimeHour = document.getElementById(divId+'1');
        divIftarTimeMin = document.getElementById(divId+'2');
        divIftarTimeSec = document.getElementById(divId+'3');
        if(divIftarTimeHour){
            divIftarTimeHour.innerHTML = hours ;
            divIftarTimeMin.innerHTML =  minutes ;
            divIftarTimeSec.innerHTML = seconds ;

        }


        if (distance < 0) {
            //divIftarTime.innerHTML = "--";
            divIftarTimeHour.innerHTML = "--";
            divIftarTimeMin.innerHTML = "--";
            divIftarTimeSec.innerHTML = "--";
            return 0;
        }
        return distance;

    }

/*-----------------------------------------*/  



