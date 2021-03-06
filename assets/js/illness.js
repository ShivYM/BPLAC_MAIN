/* var stepper2
var stepper3
var stepper4
var stepperForm
var stepperFormEl */

var form = document.getElementById("illness__form");
var form_Bank = document.getElementById("bank_form");
var listCheckBox = document.querySelector('#illness_upload_invalidCheck_1');
var file1 = document.getElementById('illness_file_Upload_1');
var file2 = document.getElementById('illness_file_Upload_2');
var file3 = document.getElementById('illness_file_Upload_3');
var file5 = document.getElementById('illness_file_Upload_5');
var file6 = document.getElementById('proof_BAO');

$('#privacy_consent_1').prop('checked', true);
$('#privacy_consent_2').prop('checked', true);

form.addEventListener('submit', handleForm);
form_Bank.addEventListener('submit', handleAccountInfo);

/* document.addEventListener('DOMContentLoaded', function () {
    stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true
    })
}) */


$(document).ready(function(event){
    disableFutureDates();
    disableFutureDatesDOB();
    setCountryCode();
});

/* Check Date should not be in future */
function futureDate(date) {
    /*   let id = evt.target.id;
      var date1 = document.getElementById(id).value; */
    var res = date.split('-');
    var year = res[0];
    var Month = Number(res[1]);
    var day = res[2];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = Number(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
    var yyyy = today.getFullYear();
    /* This is for safari, not good way to handle */
    if (day.length == 4) {
  
      if (day < yyyy) {
        return true;
      } else if (day > yyyy)
      {
        return false
      }
      else {
        if (day = yyyy)
        {
           if(Month < mm) {
                return true;
            }
            else if(Month == mm)
                {
                    if(year <= dd)
                {
                  return true;
                }else{
                  return false;
                }
            }
          else {
          return false;
        }
          
        }
        else{
          return false;
      }
  
      }
        
    } else {
      if (year < yyyy) {
        return true;
      } else if (year > yyyy)
      {
        return false
      }
      else {
        if (year == yyyy)
        {
           if(Month < mm) {
                return true;
            }
            else if (Month == mm)
            {
                if(day <= dd)
                {        
                  return true;
                }else{      
                  return false;
                }
            }else{
                return false;
            }
        } else {
          return false;
        }
      }
    }
  }
  
  
  function futureDateDOB(date) {
  /*   let id = evt.target.id;
    var date1 = document.getElementById(id).value; */
  var res = date.split('-');
  var year = res[0];
  var Month = res[1];
  var day = res[2];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
//   console.log("Logged-In Date:" + day, Month, year)
//   console.log("System Date:" + dd, mm, yyyy)
  
  /* This is for safari, not good way to handle */
  if (day.length == 4) {
    if ((day == yyyy) && (Month == mm) && (year == dd)) {
      return false;
    }
    else {
      return true;
    }
  } else {
    if ((year == yyyy) && (Month == mm) && (day == dd)) {
      return false;
    } else {
      return true;
    }
  }
  }


function disableFutureDates() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#field_DOA').attr('max', maxDate);
    $('#field_TOA').attr('max', maxDate);
    $('#field_POA').attr('max', maxDate);
}


function disableFutureDatesDOB() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var dobDate = day -1;
    var year = dtToday.getFullYear();
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + dobDate;
    $('#field_DOB').attr('max', maxDate);
  }
  


function setCountryCode() {
    $('#inlineFormCustomSelect').change(function() {
        $('select option')[0].value= $('select option:selected').val();
        $('select option')[0].innerHTML= '+' + $('select option:selected').val();
        $("select").val($('select option:selected').val());
        $("select option").css({"background-color":"","color":""});
    });
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reading file")
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const checkForVirus = (fileData) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "data": fileData, "type": "base64" });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    return fetch("https://staging.yellowmessenger.com/components/virus-scanner/scan", requestOptions);
}

listCheckBox.onchange = function () {
    if ($(listCheckBox).is(':checked')) {
        $('.feedback_label').show();
    } else {
        $('.feedback_label').hide();
    }
}

/* function loader() {
    var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
    var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'))
    var inputMailForm = document.getElementById('inputMailForm')
    var inputPasswordForm = document.getElementById('inputPasswordForm')
    var form = stepperFormEl.querySelector('.bs-stepper-content form')

    btnNextList.forEach(function (btn) {
        btn.addEventListener('click', function () {
            stepperForm.next()
        })
    })

    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        form.classList.remove('was-validated')
        var nextStep = event.detail.indexStep
        var currentStep = nextStep

        if (currentStep > 0) {
            currentStep--
        }

        var stepperPan = stepperPanList[currentStep]

        if ((stepperPan.getAttribute('id') === 'test-form-1' && !inputMailForm.value.length)
            || (stepperPan.getAttribute('id') === 'test-form-2' && !inputPasswordForm.value.length)) {
            event.preventDefault()
            form.classList.add('was-validated')
        }
    })
}
 */
/* 
 function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        $("#err_field_emailAddress").text('Invalid Email');
        $("#err_field_emailAddress").show();
        return false;
    }
    $("#err_field_emailAddress").text('');
    $("#err_field_emailAddress").hide();
    return true;
} */

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $(`#err_${evt.target.id}`).text('Only numbers allowed!');
        $(`#err_${evt.target.id}`).show();
        return false;
    }
    $(`#err_${evt.target.id}`).text('');
    $(`#err_${evt.target.id}`).hide();
    return true;
}

function checkSpcialChar(evt){
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(!((evt.charCode >= 65) && (evt.charCode <= 90) || (evt.charCode >= 97) 
    && (evt.charCode <= 122)|| (evt.charCode >= 48) && (evt.charCode <= 57) || (evt.charCode == 32) || (evt.charCode == 13))){
        $(`#err_${evt.target.id}`).text("special character is not allowed");
        $(`#err_${evt.target.id}`).show(); 
       return false;
    }
    $(`#err_${evt.target.id}`).text("");
    $(`#err_${evt.target.id}`).hide();
    return true;
}

function isNotNumber(evt) {
    $(`#err_${evt.target.id}`).text("");
    $(`#err_${evt.target.id}`).hide();
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || (evt.charCode == 13)) {
        $(`#err_${evt.target.id}`).text('');
        $(`#err_${evt.target.id}`).hide();
        return true;
    }
    validateNotNumber(evt)
    return false;
}

function validateNotNumber(evt) {
    let id = evt.target.id;
    $(`#err_${id}`).text("Numbers not allowed");
    $(`#err_${id}`).show();
    return;
}

function specialcharacterValidation(input) {
    var regex = /^[A-Za-z0-9 ]+$/
    var firstNameValid = regex.test(input);
    if (!firstNameValid) {
        return true;
    } else {
       return false;
    }
} 



function checkLength(evt, max_Length) {
    let id = evt.target.id;
    var val = document.getElementById(id).value;
    var length = val.length;
    if (length >= max_Length) {
        $(`#err_${id}`).text("Maximum " + max_Length + " characters allowed!");
        $(`#err_${id}`).show();
    }else {
        detection(evt);
    }
    
}

function detection(evt) {
    id = evt.target.id;
    document.getElementById(id).addEventListener('keydown', event => {
       if(event.key == 'Backspace') {
        $(`#err_${id}`).text("");
        $(`#err_${id}`).hide();
       }
    })
}


function check_Mobile_Length(evt, max_Length) {
    let id = evt.target.id;
    var val = document.getElementById(id).value;
    var length = val.length;
    if (length !== max_Length) {
        detection(evt);
    } else {
        console.log(length,max_Length)
        $(`#err_${id}`).text("Maximum " + max_Length + " number allowed!");
        $(`#err_${id}`).show();
    }
}

function numberValidation(input) {
    var regex =  /^([^0-9]*)$/;
    var firstNameValid = regex.test(input);
    if (!firstNameValid) {
        return true;
    } else {
       return false;
    }
} 


function onlyNumberValidate(input) {
    var regex =  /^[0-9]*$/;
    var firstNameValid = regex.test(input);
    if (firstNameValid) {
        return true;
    } else {
       return false;
    }
} 

function fieldCheckLength(field, maxLength) {
    var length = field.length;
    if (length > maxLength ) {
        return true;
    }
    else {
        return false;
    }
  }

function process(date){
   var parts = date.split("-");
    if(parts[2].length == 4)
    {
         return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    else{
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
}

//function passing all dates
function checkDob(dob, date1, date2, date3)
{
    if(process(dob) <= process(date1))// && (process(dob) >= process(date2)) && (process(dob) >= process(date3)))       
    {
        if(process(dob) <= process(date2))
        {   
            if(process(dob) <= process(date3))
            {   
                if(process(date1) <= process(date2))
                {
                    if(process(date1) <= process(date3))
                    { 
                        if(process(date3) <= process(date2))
                        {
                            return 1;
                        }
                        else{
                            return 2;
                        }
                    }
                    else{
                        return 3;
                    }
                }
                else{
                    return 4;
                }
                
            }
            else{
                return 5;
            }
        }
        else{
            return 6;
        }
    }
    else{
        return 7;
    }
    return 
}


function handleForm(event) {
    event.preventDefault();
    var field_firstName = $("#field_firstName").val();
    var field_middleName = $("#field_middleName").val();
    var field_MedicalConsultation = $("#field_MedicalConsultation").val();
    var field_lastName = $("#field_lastName").val();
    var field_lastName_Suffix = $("#field_lastName_Suffix").val();
    var field_DOB = $("#field_DOB").val();
    var field_mobileNum = $("#field_mobileNum").val();
    var field_emailAddress = $("#field_emailAddress").val();
    var field_homeAddress = $("#field_homeAddress").val();
    var field_DOA = $("#field_DOA").val();
    var field_TOA = $("#field_TOA").val();
    var field_POA = $("#field_POA").val();
    var specFirstName = specialcharacterValidation(field_firstName);
    var  specMiddleName = specialcharacterValidation(field_middleName);
    var specLastName = specialcharacterValidation(field_lastName);
    var numFirstName = numberValidation(field_firstName);
    var numMiddleName = numberValidation(field_middleName)
    var numLastName = numberValidation(field_lastName);
    var numMobile = onlyNumberValidate(field_mobileNum);
    var specLastNameSuffix = false;
    var numLastNameSuffix = false;
    var lenLastNameSuffix = false;

    if(field_lastName_Suffix  != 0) {
    specLastNameSuffix = specialcharacterValidation(field_lastName_Suffix);
    numLastNameSuffix = numberValidation(field_lastName_Suffix);
    lenLastNameSuffix = fieldCheckLength(field_lastName_Suffix, 3);
    }
    
    if(field_DOB.length !== 0) {
        var futDOB = futureDate(field_DOB);
        var futExistDOB = futureDateDOB(field_DOB);
    }

    if(field_DOA.length !== 0) {
        var futDOA = futureDate(field_DOA);
    }

    if(field_TOA.length !== 0) {
        var futTOA = futureDate(field_TOA);
    }

    if(field_POA.length !== 0) {
        var futPOA = futureDate(field_POA);
    }

    if (field_firstName.length === 0) {
        $("#err_field_firstName").text('Field is empty');
        $("#err_field_firstName").show();
    } else if(specFirstName == true ){
        $("#err_field_firstName").text('Special character is not allowed');
        $("#err_field_firstName").show();
    } else if(numFirstName) {
        $("#err_field_firstName").text('Number is not allowed');
        $("#err_field_firstName").show();
    }  else {
        $("#err_field_firstName").text('');
        $("#err_field_firstName").hide();
    }

    if (field_middleName.length === 0) {
        $("#err_field_middleName").text('Field is empty');
        $("#err_field_middleName").show();
    } else if(specMiddleName) {
        $("#err_field_middleName").text('Special character is not allowed');
        $("#err_field_middleName").show();
    } else if(numMiddleName) {
        $("#err_field_middleName").text('Number is not allowed');
        $("#err_field_middleName").show();
    } else {
        $("#err_field_middleName").text('');
        $("#err_field_middleName").hide();
    }

    if (field_MedicalConsultation.length === 0) {
        $("#err_field_MedicalConsultation").text('Field is empty');
        $("#err_field_MedicalConsultation").show();
    } else {
        $("#err_field_MedicalConsultation").text('');
        $("#err_field_MedicalConsultation").hide();
    }

    if (field_lastName.length === 0) {
        $("#err_field_lastName").text('Field is empty');
        $("#err_field_lastName").show();
    } else if (specLastName){
        $("#err_field_lastName").text('Special character is not allowed');
        $("#err_field_lastName").show();
    } else if (numLastName) {
        $("#err_field_lastName").text('Number is not allowed');
        $("#err_field_lastName").show();
    }   else {
        $("#err_field_lastName").text('');
        $("#err_field_lastName").hide();
    }

    if(field_lastName_Suffix.length === 0) {
      $("#err_field_lastName_Suffix").text('');
      $("#err_field_lastName_Suffix").hide();
    } else if (lenLastNameSuffix){
        $("#err_field_lastName_Suffix").text('Maximum 3 characters allowed!');
        $("#err_field_lastName_Suffix").show();
    } else if (specLastNameSuffix){
        $("#err_field_lastName_Suffix").text('Special character is not allowed');
        $("#err_field_lastName_Suffix").show();
    } else if (numLastNameSuffix) {
        $("#err_field_lastName_Suffix").text('Number not allowed');
        $("#err_field_lastName_Suffix").show();
    } else {
        $("#err_field_lastName_Suffix").text('');
        $("#err_field_lastName_Suffix").hide();
    }

    if (field_DOB.length === 0) {
        $("#err_field_DOB").text('Field is empty');
        $("#err_field_DOB").show();
    }  else if(!futDOB){
        $("#err_field_DOB").text('Future date is  not Accepted!');
        $("#err_field_DOB").show();
    } else if(!futExistDOB){
        $("#err_field_DOB").text('Current date is  not Applicable!');
        $("#err_field_DOB").show();
    } else {
        $("#err_field_DOB").text('');
        $("#err_field_DOB").hide();
    }

    if (field_mobileNum.length === 0) {
        $("#err_field_mobileNum").text('Field is empty');
        $("#err_field_mobileNum").show();
    } else if (!numMobile){
        $("#err_field_mobileNum").text('Only number is allowed!');
        $("#err_field_mobileNum").show();
    } else if (field_mobileNum.length !== 10) {
        $("#err_field_mobileNum").text('Minimum 10 number allowed!');
        $("#err_field_mobileNum").show();
    }  else {
        $("#err_field_mobileNum").text('');
        $("#err_field_mobileNum").hide();
    }

    if (field_emailAddress.length === 0) {
        $("#err_field_emailAddress").text('Field is empty');
        $("#err_field_emailAddress").show();
    } else {
        validateEmail(field_emailAddress);
        
    }

    if (field_homeAddress.length === 0) {
        $("#err_field_homeAddress").text('Field is empty');
        $("#err_field_homeAddress").show();
    } else {
        $("#err_field_homeAddress").text('');
        $("#err_field_homeAddress").hide();
    }

    if (field_DOA.length === 0) {
        $("#err_field_DOA").text('Field is empty');
        $("#err_field_DOA").show();
    }  else if(!futDOA){
        $("#err_field_DOA").text('Future date is  not Accepted!');
        $("#err_field_DOA").show();
    }   else {
        $("#err_field_DOA").text('');
        $("#err_field_DOA").hide();
    }

    if (field_TOA.length === 0) {
        $("#err_field_TOA").text('Field is empty');
        $("#err_field_TOA").show();
    }  else if(!futTOA){
        $("#err_field_TOA").text('Future date is  not Accepted!');
        $("#err_field_TOA").show();
    }  else {
        $("#err_field_TOA").text('');
        $("#err_field_TOA").hide();
    }

    if (field_POA.length === 0) {
        $("#err_field_POA").text('Field is empty');
        $("#err_field_POA").show();
    }  else if(!futPOA){
        $("#err_field_POA").text('Future date is  not Accepted!');
        $("#err_field_POA").show();
    } else {
        $("#err_field_POA").text('');
        $("#err_field_POA").hide();
    }

    if (!$('#invalidCheck_basic').is(':checked')) {
        $("#err_invalidCheck_basic").text('Please select the field');
        $("#err_invalidCheck_basic").show();
    } else {
        $("#err_invalidCheck_basic").text('');
        $("#err_invalidCheck_basic").hide();
    }

    if (!$('#invalidCheck_privacy').is(':checked')) {
        $("#err_invalidCheck_privacy").text('Please select the field');
        $("#err_invalidCheck_privacy").show();
    } else {
        $("#err_invalidCheck_privacy").text('');
        $("#err_invalidCheck_privacy").hide();
    }

    var comparingDob = 0;
    if((field_DOB.length != 0) && (field_DOA.length != 0) && (field_TOA.length != 0) && (field_POA.length != 0))
    {
        comparingDob = checkDob(field_DOB, field_DOA, field_TOA, field_POA);
            if(comparingDob == 0){
                /*nothing to do*/
        }else
            if(comparingDob == 1){
                /*nothing to do*/
            }else
                if(comparingDob == 2){
                    $("#err_field_TOA").text('Root cause date can not be lesser than doctor visit date');
                                        $("#err_field_TOA").show();

                }else
                    if(comparingDob == 3){
                        $("#err_field_POA").text('Doctor visit Date can not be lesser than symptom date');
                                        $("#err_field_POA").show();

                    }else
                        if(comparingDob == 4){
                            $("#err_field_TOA").text('Root cause date can not be lesser than symptom date');
                                        $("#err_field_TOA").show();

                        }else
                            if(comparingDob == 5){
                                        $("#err_field_POA").text('Doctor visit date can not be lesser than DOB');
                                        $("#err_field_POA").show();

                            }else
                                if(comparingDob == 6){
                                        $("#err_field_TOA").text('Root cause date can not be lesser than DOB');
                                        $("#err_field_TOA").show();
                                }else
                                    if(comparingDob == 7){
                                        $("#err_field_DOA").text('Symptom date can not be lesser than DOB');
                                        $("#err_field_DOA").show();
                                    }else{}
    }
  if (
    field_firstName.length !== 0 &&
    field_middleName.length !== 0 &&
    field_MedicalConsultation.length !== 0 &&
    field_lastName.length !== 0 &&
    field_DOB.length !== 0 &&
    field_mobileNum.length == 10 &&
    field_emailAddress.length !== 0 &&
    validateEmail(field_emailAddress) &&
    field_homeAddress.length !== 0 &&
    field_DOA.length !== 0 &&
    field_TOA.length !== 0 &&
    field_POA.length !== 0 &&
    $("#invalidCheck_basic").is(":checked") &&
    $("#invalidCheck_privacy").is(":checked") &&
    (specFirstName == false) &&
    (specMiddleName == false) &&
    (specLastName == false) &&
    (numFirstName == false) &&
    (numMiddleName == false) &&
    (numLastName == false) &&
    (numMobile == true) && 
    (futDOB == true) && 
    (futExistDOB == true) &&
    (futDOA == true) && 
    (futPOA == true) &&
    (futTOA == true)  && 
    (specLastNameSuffix == false) && 
    (numLastNameSuffix == false) &&
    (comparingDob == 1)
  ) {
    const data = {
      field_firstName,
      field_middleName,
      field_MedicalConsultation,
      field_lastName,
      field_lastName_Suffix,
      field_DOB,
      country_code: $("select#inlineFormCustomSelect option")
        .filter(":selected")
        .val(),
      field_mobileNum,
      field_emailAddress,
      field_homeAddress,
      field_DOA,
      field_TOA,
      field_POA,
      basic_checkbox: $("#invalidCheck_basic").is(":checked"),
      privacy_checkbox: $("#invalidCheck_privacy").is(":checked"),
    };

    $("#err_privacy_consent").text("");
    $("#err_privacy_consent").hide();
    $("#form_wrapper").hide();
    $("#stepper_intro").hide();
    $("#illness_data_privacy").hide();
    $("#step1").addClass("done");
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
    $("#requirements").show();
    $("#customer_Name").text(`Hi ${field_firstName}. Hang in there as we process your request. Expect an SMS from us within 1 to 2 working days on the status of your request.`);
    /* $('#requirements')[0].scrollIntoView(true); */

    console.log("Data -> ", data);
  } else {
    $("#popUp").modal("show");
  }
}

function dataReset() {
    let args = arguments;
    for(let i=0; i<args.length; i++) {
        $(`#${args[i]}`).val('');
    }
}

function removeErr(event) {
    $(`#err_${event.target.id}`).text('');
    $(`#err_${event.target.id}`).hide();
}

const proceedScan = async (fileObj, button, pageid) => {
  console.log(button);
  console.log("code is here");
  $(`#file_loader_icon_${button}`).show();
  let baseData = await toBase64(fileObj);
  const regex = /data:application\/pdf;base64,/gi;
  let newBaseData = baseData.replace(regex, "");
  checkForVirus(newBaseData)
    .then((response) => response.text())
    .then((result) => {
      let parsedJson = JSON.parse(result);
      console.log(parsedJson);
      if (parsedJson.hasVirus) {
        console.log("Netering");

        if(pageid == 1) {
            $("#warning_parent").show();
            $("#upload_warning").text(
                "We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed."
              );
        }
        if(pageid == 2) {
            $("#warning_parent_acct").show();
            $("#upload_warning_acct").text(
                "We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed."
              );
        }
        
        $(`#file_loader_icon_${button}`).hide();
        $(`#file_Upload_Tick_${button}`).hide();
        $(`#file_upload_cancle_${button}`).show();
       
        return;
      } else {
        $("#warning_parent").hide();
        $("#warning_parent_acct").hide();
        $(`#file_loader_icon_${button}`).hide();
        $(`#file_Upload_Tick_${button}`).show();
        $(`#file_upload_cancle_${button}`).hide();
        return;
      }
    })
    .catch((error) => {
      console.log("error", error);
        if(pageid == 1) {
            $("#warning_parent").show();
        }
        if(pageid == 2) {
            $("#warning_parent_acct").show();
        }
     
      $(`#file_loader_icon_${button}`).hide();
      $(`#file_Upload_Tick_${button}`).hide();
      $(`#file_upload_cancle_${button}`).show();
      $("#upload_warning").text(
        "Looks like the file you are trying to upload is Virus infected. Please upload a virus free document."
      );
      return;
    });
};

const fileCheck = (file,button, pageid) => {
    console.log(button);
  var _URL = window.URL || window.webkitURL;
  console.log("FILE OBJECT -> ", file);
  var img = new Image();
  console.log("Before on load --> ");
  img.onload = function () {
    console.log("inside image load --> ");
    console.log(this.width + " " + this.height);
    if (this.width < 400 && this.height < 400) {
        if(pageid == 1) {
            $(`#warning_parent`).show();
            $("#upload_warning").text("Sorry, we noticed that your uploaded documents are unreadable. Please re-upload a clearer copy of your documents to proceed.");
            console.log("Image is bad");
        }

        if(pageid == 2) {
            $('#warning_parent_acct').show();
            $("#upload_warning_acct").text("Sorry, we noticed that your uploaded documents are unreadable. Please re-upload a clearer copy of your documents to proceed.");
            console.log("Image is bad");
        }
     
      $(`#file_loader_icon_${button}`).hide();
      $(`#file_Upload_Tick_${button}`).hide();
      $(`#file_upload_cancle_${button}`).show();
      
    } else {
      console.log("This is right JPG");
      proceedScan(file,button);
    }
  };
  img.onerror = function () {
    console.log("inside image error");
    alert("not a valid file: " + file.type);
  };
  img.src = _URL.createObjectURL(file);
};


const isFileSizeValid = (file) => {
    if (file.size < 2097152) {
      return true;
    }
    return false;
  };

file1.onchange = async function (e) {
    $("#file_upload_cancle_1").hide();
    $("#file_Upload_Tick_1").hide();
    console.log("Starting");
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "pdf":
          var file = this.files[0];
          var buttonNum = 1;
          var pageId = 1;
          var sizevalid = isFileSizeValid(file,buttonNum);
          if (sizevalid) {
              if (ext == "jpg") {
                  fileCheck(file, buttonNum, pageId);
              }
              else {
                  proceedScan(file, buttonNum, pageId);
              }
          } else {
            $("#warning_parent").show();
            $("#file_loader_icon_1").hide();
            $("#file_Upload_Tick_1").hide();
            $("#file_upload_cancle_1").show();
            $("#upload_warning").text(
            "The file size of your documents should not be larger than 2MB. Please re-upload the correct file size to proceed."
            );
          }
        break;
      default:
        $("#warning_parent").show();
        $("#file_Upload_Tick_1").hide();
        $("#file_upload_cancle_1").show();
        $("#upload_warning").text(
          "Your documents should only be in .jpg, pdf formats and should not be larger than 2MB. Please re-upload in the correct format and file size to proceed. "
        );
        this.value = "";
    }
};

  file2.onchange = async function (e) {
    $("#file_upload_cancle_2").hide();
    $("#file_Upload_Tick_2").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "pdf":
          var file = this.files[0];
          var buttonNum = 2;
          var pageId = 1;
          var sizevalid = isFileSizeValid(file,buttonNum);
          if (sizevalid) {
              if (ext == "jpg") {
                  fileCheck(file, buttonNum, pageId);
              }
              else {
                  proceedScan(file, buttonNum, pageId);
              }
          } else {
            $("#warning_parent").show();
            $("#file_loader_icon_2").hide();
            $("#file_Upload_Tick_2").hide();
            $("#file_upload_cancle_2").show();
            $("#upload_warning").text(
            "The file size of your documents should not be larger than 2MB. Please re-upload the correct file size to proceed."
            );
          }
        break;
      default:
        $("#warning_parent").show();
        $("#file_Upload_Tick_2").hide();
        $("#file_upload_cancle_2").show();
        $("#upload_warning").text(
          "Your documents should only be in .jpg, pdf formats and should not be larger than 2MB. Please re-upload in the correct format and file size to proceed. "
        );
        this.value = "";
    }
};

  file3.onchange = async function (e) {
    $("#file_upload_cancle_3").hide();
    $("#file_Upload_Tick_3").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "pdf":
          var file = this.files[0];
          var buttonNum = 3;
          var pageId = 1 ;
          var sizevalid = isFileSizeValid(file,buttonNum);
          if (sizevalid) {
              if (ext == "jpg") {
                  fileCheck(file, buttonNum, pageId);
              }
              else {
                  proceedScan(file, buttonNum, pageId);
              }
          } else {
            $("#warning_parent").show();
            $("#file_loader_icon_3").hide();
            $("#file_Upload_Tick_3").hide();
            $("#file_upload_cancle_3").show();
            $("#upload_warning").text(
            "The file size of your documents should not be larger than 2MB. Please re-upload the correct file size to proceed."
            );
          }
        break;
      default:
        $("#warning_parent").show();
        $("#file_Upload_Tick_3").hide();
        $("#file_upload_cancle_3").show();
        $("#upload_warning").text(
          "Your documents should only be in .jpg, pdf formats and should not be larger than 2MB. Please re-upload in the correct format and file size to proceed. "
        );
        this.value = "";
    }
};

  file5.onchange = async function (e) {
    $("#file_upload_cancle_5").hide();
    $("#file_Upload_Tick_5").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "pdf":
          var file = this.files[0];
          var buttonNum = 5;
          var pageId = 1;
          var sizevalid = isFileSizeValid(file,buttonNum);
          if (sizevalid) {
              if (ext == "jpg") {
                  fileCheck(file, buttonNum, pageId);
              }
              else {
                  proceedScan(file, buttonNum, pageId);
              }
          } else {
            $("#warning_parent").show();
            $("#file_loader_icon_5").hide();
            $("#file_Upload_Tick_5").hide();
            $("#file_upload_cancle_5").show();
            $("#upload_warning").text(
            "The file size of your documents should not be larger than 2MB. Please re-upload the correct file size to proceed."
            );
          }
        break;
      default:
        $("#warning_parent").show();
        $("#file_Upload_Tick_5").hide();
        $("#file_upload_cancle_5").show();
        $("#upload_warning").text(
          "Your documents should only be in .jpg, pdf formats and should not be larger than 2MB. Please re-upload in the correct format and file size to proceed. "
        );
        this.value = "";
    }
};

file6.onchange = async function (e) {
    $("#file_upload_cancle_6").hide();
    $("#file_Upload_Tick_6").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "pdf":
          var file = this.files[0];
          var buttonNum = 6;
          var pageId = 2;
          var sizevalid = isFileSizeValid(file,buttonNum);
          if (sizevalid) {
              if (ext == "jpg") {
                  fileCheck(file, buttonNum, pageId);
              }
              else {
                  proceedScan(file, buttonNum, pageId);
              }
          } else {
            $("#warning_parent_acct").show();
            $("#file_loader_icon_6").hide();
            $("#file_Upload_Tick_6").hide();
            $("#file_upload_cancle_6").show();
            $("#upload_warning_acct").text(
            "The file size of your documents should not be larger than 2MB. Please re-upload the correct file size to proceed."
            );
          }
        break;
      default:
        $("#warning_parent_acct").show();
        $("#file_Upload_Tick_6").hide();
        $("#file_upload_cancle_6").show();
        $("#upload_warning_acct").text(
          " Your documents should only be in .jpg, pdf formats and should not be larger than 2MB. Please re-upload in the correct format and file size to proceed."
        );
        this.value = "";
    }
  };
  
function buttonSubmitClicked(event) {
    event.preventDefault();

    if (!file1.value || ($('#file_Upload_Tick_1').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Front)');
        $('#popUp').modal('show');
        return;
    }

    if (!file2.value || ($('#file_Upload_Tick_2').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Back)');
        $('#popUp').modal('show');
        return;
    }

    if (!file3.value || ($('#file_Upload_Tick_3').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Attending Physician’s Statement (APS)!');
        $('#popUp').modal('show');
        return;
    }

    if (!file5.value || ($('#file_Upload_Tick_5').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Hospital Statement of Account (SOA)!');
        $('#popUp').modal('show');
        return;
    }


   

    if (!$('#upload_invalidCheck_2').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box to confirm the accuracy of your submitted documents.');
        $("#warning_parent").show();
        $('#popUp').modal('show');
        return;
    }

    const upload_data = {
        upload_file_1: file1.value,
        upload_file_2: file2.value,
        upload_file_3: file3.value,
        upload_file_5: file5.value,
        aia_Philam_Life_Checkbox: $('#illness_upload_invalidCheck_1').is(':checked'),
        insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked')
    }

    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
    $('#requirements').hide();
    $('#payment').show();
    /* $('#payment')[0].scrollIntoView(true); */

    console.log('upload data --> ', upload_data);
}

function handleAccountInfo(event) {
    event.preventDefault();
    var field_AccountName = $("#field_AccountName").val();
    var field_AccountNumber = $("#field_AccountNumber").val();
    var field_Bank = $("#field_Bank").val();
    var field_Branch = $("#field_Branch").val();

    var speCharAccountName = specialcharacterValidation(field_AccountName);
    var numAccountName = numberValidation(field_AccountName);
    var numAccountNumber = onlyNumberValidate(field_AccountNumber);
   /*  var specCharBank = specialcharacterValidation(field_Bank);
    var numBank = numberValidation(field_Bank); */
  /*   var specCharBRANCH = specialcharacterValidation(field_Branch);
    var numBranch = numberValidation(field_Branch); */

    if (field_AccountName.length === 0) {
        $("#err_field_AccountName").text('Field is empty');
        $("#err_field_AccountName").show();
    } else if (speCharAccountName) {
        $("#err_field_AccountName").text('special character is not allowed');
        $("#err_field_AccountName").show();
    } else if (numAccountName) {
        $("#err_field_AccountName").text('Number not allowed');
        $("#err_field_AccountName").show();
    } else {
        $("#err_field_AccountName").text('');
        $("#err_field_AccountName").hide();
    }

    if (field_AccountNumber.length === 0) {
        $("#err_field_AccountNumber").text('Field is empty');
        $("#err_field_AccountNumber").show();
    } else if(!numAccountNumber) {
        $("#err_field_AccountNumber").text('Only number is allowed');
        $("#err_field_AccountNumber").show();
    }  else {
        $("#err_field_AccountNumber").text('');
        $("#err_field_AccountNumber").hide();
    }


    if(field_Bank.length <= 0 ){
        $("#err_field_Bank").text('Field is empty');
        $("#err_field_Bank").show();
    }  else {
        $("#err_field_Bank").text('');
        $("#err_field_Bank").hide();
    }

    if (field_Branch.length === 0) {
        $("#err_field_Branch").text('Field is empty');
        $("#err_field_Branch").show();
    }/*  else if(specCharBRANCH) {
        $("#err_field_Branch").text('special character is not allowed');
        $("#err_field_Branch").show();
    } else if(numBranch) {
        $("#err_field_Branch").text('Number is not allowed');
        $("#err_field_Branch").show();
    }  */else {
        $("#err_field_Branch").text('');
        $("#err_field_Branch").hide();
    }

    if (!file6.value) {
        $('#upload_feedback_label').show();
        $('#upload_feedback_label').text('Please upload your Bank Account Ownership');
    }

    if (field_AccountName.length !== 0 && field_AccountNumber.length !== 0 && field_Bank.length !== 0 && field_Branch.length !== 0 && file6.length !== 0 && (speCharAccountName == false) && (numAccountName == false) && (numAccountNumber == true) && (file6.value && (!$('#file_Upload_Tick_6').is(":hidden"))) ) {
        const data = {
            field_AccountName,
            field_AccountNumber,
            field_Bank,
            field_Branch,
            field_Currency: $("select#from_currency option").filter(":selected").val(),
            upload_file_6: file6.value
        }
        $("#step2").addClass("done");
        $("#step3").addClass("active");
        $("#step3>div").addClass("active");
        $("#step3").addClass("done");
        $('#account_details').hide();
        $('#process_confirmation').show();
        console.log('Data -> ', data)
    }else {
        $('#popUp').modal('show');
    }
}


function bankTranfer() {
    $('#payment').hide();
    $('#account_details').show();
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
}

function pickUp() {
    $('#payment').hide();
  /*   $('#process_confirmation').show(); */
    $("#pickUp").show();
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
}

function pickup_Bpi() {
    $("#pickUp").hide();
    $('#process_confirmation').show();
    $("#step2").addClass("done");
    $("#step3").addClass("active");
    $("#step3>div").addClass("active");
    $("#step3").addClass("done");
  }

  
function openlink() {
    window.open("https://www.google.com/maps/search/bpi+branch+locator/@14.6079731,120.9860096,14z/data=!3m1!4b1");
}



function validateEmail(my_email)
{
var ind0=my_email.indexOf("@");
var my_username=my_email.slice(0,ind0);
var ind=my_email.indexOf("@");
var my_domain=my_email.substr((ind+1));
var ind3 = my_domain.indexOf(".");
var my_final_domain = my_domain.slice(0,ind3);
var ind1=my_domain.indexOf(".");
var my_extension=my_domain.slice((ind1+1),my_domain.length);

var usernamesize = stringlength(my_username,2,30);
var domainsize = stringlength(my_final_domain,2,10);
var extension = stringlength(my_extension,2,3);
    

 var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(my_email) == false) {
    $("#err_field_emailAddress").text('Invalid Email');
    $("#err_field_emailAddress").show();
    return false;
  }else{
    if(!usernamesize)
        {
            $("#err_field_emailAddress").text('UserName should have minimum 2 and maximum 30 character');
            $("#err_field_emailAddress").show();
            return false;
        }else if(!domainsize)
        {
            $("#err_field_emailAddress").text('Domain should have minimum 2 and maximum 10 character');
            $("#err_field_emailAddress").show();
            return false;
        }else if(!extension)
        {
            $("#err_field_emailAddress").text('Extension should have minimum 2 and maximum 3 characters');
            $("#err_field_emailAddress").show();
            return false;
        }else {
          $("#err_field_emailAddress").text('');
          $("#err_field_emailAddress").hide();
          return true;
        }

  }
  
}


function stringlength(inputtxt, minlength, maxlength)
{ 
var field = inputtxt; 
var mnlen = minlength;
var mxlen = maxlength;

if(field.length<mnlen || field.length> mxlen)
{ 
return false;
}
else
{ 
return true;
}
}