function getTypicalValue() {
    var uiTypical = document.getElementsByName("uiTypical");
    for(var i in uiTypical) {
      if(uiTypical[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getAtypicalValue() {
    var uiAtypical = document.getElementsByName("uiAtypical");
    for(var i in uiAtypical) {
      if(uiAtypical[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getNonanginalValue() {
    var uiNonanginal = document.getElementsByName("uiNonanginal");
    for(var i in uiNonanginal) {
      if(uiNonanginal[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getTinversionValue() {
    var uiTinversion = document.getElementsByName("uiTinversion");
    for(var i in uiTinversion) {
      if(uiTinversion[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getRegionWMAValue() {
    var uiRegionWMA = document.getElementsByName("uiRegionWMA");
    for(var i in uiRegionWMA) {
      if(uiRegionWMA[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getDMValue() {
    var uiDM= document.getElementsByName("uiDM");
    for(var i in uiDM) {
      if(uiDM[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getHTNValue() {
    var uiHTN = document.getElementsByName("uiHTN");
    for(var i in uiHTN) {
      if(uiHTN[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  function convertPredictedValue(predictedValue) {
    if (predictedValue === 1) {
        return "positive";
    } else if (predictedValue === 0) {
        return "negative";
    } else {
        return "unknown";}
    }
  function onClickedMakeDiagnosis() {
    console.log("Diagnose coronary artery disease button clicked");
    var yr = document.getElementById("uiAge");
    var bloodpressure = document.getElementById("uiBP");
    var triglyceride = document.getElementById("uiTG");
    var typical = getTypicalValue();
    var atype = getAtypicalValue();
    var nonangina = getNonanginalValue();
    var twave = getTinversionValue();
    var rwma = getRegionWMAValue();
    var diabetes = getDMValue();
    var hypertension = getHTNValue();
    var diagnose = document.getElementById("uiPredictCAD");
  
    var url = "http://127.0.0.1:5000/predict_cad";
    
  
    $.post(url, {
        typical_chest_pain: typical,
        region_rwma: rwma,
        atypical: atype,
        nonanginal: nonangina,
        tinversion: twave,
        tg: parseInt(triglyceride.value),
        bp: parseInt(bloodpressure.value),
        htn: hypertension,
        age: parseInt(yr.value),
        dm: diabetes
    },function(data, status) {
        console.log(data.diagnosis);
        diagnose.innerHTML = "</h2>" + convertPredictedValue(data.diagnosis) + "</h2>";
        console.log(status); 
    });
  }
  
window.onload = onPageLoad;