class SchoolMeal{

  educationOfficeCode:string;
  schoolCode:string;
  apiKey?:string;
  constructor(educationOfficeCode:string,schoolCode:string,apiKey?:string){
    this.educationOfficeCode = educationOfficeCode;
    this.schoolCode = schoolCode;
    if(apiKey){this.apiKey = "&KEY="+apiKey;}else{this.apiKey="";}
  }

  GetNextWeekday():string{
    let today = new Date();
    let nextDayDate = new Date();
    if(today.getDay()==6){
      //토요일
      nextDayDate.setDate(today.getDate() + 2);
    }else if(today.getDay()==5){
      //금요일
      nextDayDate.setDate(today.getDate() + 3);
    }else{
      nextDayDate.setDate(today.getDate() + 1);
    };
    let nextDayYear= nextDayDate.getFullYear();
    let nextDayMonth = ("0" + (1 + nextDayDate.getMonth())).slice(-2);
    let nextDayDay = ("0" + nextDayDate.getDate()).slice(-2);
    let nextDayString= nextDayYear+ "" + nextDayMonth + ""+ nextDayDay;
    return(nextDayString);
  }
  
  GetLink():string{
    return(
      "https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json"+this.apiKey+"&ATPT_OFCDC_SC_CODE="+this.educationOfficeCode+"&SD_SCHUL_CODE="+this.schoolCode+"&MLSV_YMD=" + this.GetNextWeekday()
    );
  }
  
  GetNextdaySchoolMeal():Promise<Array<string>>{
    return fetch(this.GetLink())
      .then((response) => {
        return(response.json());
      })
      .then((response) => {
        return (response.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>"));
      })
      .catch(function(error){throw new Error(error);});
  }
}
